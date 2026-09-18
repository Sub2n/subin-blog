// Hexo(Icarus)로 빌드된 HTML(../Sub2n.github.io)을 마크다운으로 되돌린다.
// 사용: node scripts/migrate-hexo.mjs [빌드된_사이트_경로]
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { globSync } from 'node:fs';
import { join, dirname } from 'node:path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const SRC = process.argv[2] ?? '../Sub2n.github.io';
const OUT = 'src/content/posts';

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
  hr: '---',
});
td.use(gfm);
// 제목 안의 앵커 링크(<a class="headerlink">)는 버린다
td.addRule('headerlink', {
  filter: (node) => node.nodeName === 'A' && /\bheaderlink\b/.test(node.getAttribute('class') ?? ''),
  replacement: () => '',
});
// <a id="more"> (Hexo 요약 구분자) 제거
td.addRule('more', {
  filter: (node) => node.nodeName === 'A' && node.getAttribute('id') === 'more',
  replacement: () => '',
});
// 이미지: alt와 src만 남긴다
td.addRule('img', {
  filter: 'img',
  replacement: (_c, node) => {
    const src = node.getAttribute('src') ?? '';
    const alt = (node.getAttribute('alt') ?? '').replace(/\n/g, ' ');
    return src ? `![${alt}](${src})` : '';
  },
});

function normalizeLang(l) {
  const map = { js: 'js', javascript: 'js', ts: 'ts', typescript: 'ts', plain: '', text: '', '': '' };
  return map[l.toLowerCase()] ?? l.toLowerCase();
}

/** 단어 경계에서 자르고 말줄임표를 붙인다 */
function clip(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf('. '), cut.lastIndexOf('다.'));
  return (i > max * 0.5 ? cut.slice(0, i + 1) : cut).trim() + '…';
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function yamlStr(s) {
  return JSON.stringify(s);
}

const files = globSync('20*/**/index.html', { cwd: SRC }).sort();
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const seen = new Map();
let count = 0;
for (const rel of files) {
  const html = readFileSync(join(SRC, rel), 'utf8');
  const $ = cheerio.load(html);
  const article = $('.card-content.article').first();
  if (!article.length) { console.warn('skip (no article):', rel); continue; }

  const title = article.find('h1.title').first().text().trim();
  const iso = article.find('time[datetime]').first().attr('datetime') ?? '';
  const date = iso.slice(0, 10);
  const categories = article.find('a[href^="/categories/"]').map((_, a) => $(a).text().trim()).get();
  const tags = article.find('a[href^="/tags/"]').map((_, a) => $(a).text().trim()).get();
  const thumb = $('.card-image img.thumbnail').first().attr('src');
  const description = clip(($('meta[name="description"]').attr('content') ?? '').replace(/\s+/g, ' ').trim(), 150);

  const content = article.find('> .content').first();
  content.find('a[id="more"]').remove();
  // Hexo 코드 블록(<figure class="highlight lang"><table>...)을 <pre><code>로 바꿔 turndown이 펜스로 만들게 한다
  content.find('figure.highlight').each((_, fig) => {
    const $fig = $(fig);
    const lang = ($fig.attr('class') ?? '').split(/\s+/).filter((c) => c && c !== 'highlight')[0] ?? '';
    const codeEl = $fig.find('td.code pre').first().length ? $fig.find('td.code pre').first() : $fig.find('pre').first();
    const lines = codeEl.find('.line');
    let code = lines.length ? lines.map((_, l) => $(l).text()).get().join('\n') : codeEl.text();
    // 원문에서 인용문 안에 코드를 넣느라 모든 줄이 "> "로 시작하면 그 접두어는 걷어낸다
    const codeLines = code.split('\n');
    if (codeLines.every((l) => l.trim() === '' || /^>\s?/.test(l))) code = codeLines.map((l) => l.replace(/^>\s?/, '')).join('\n');
    const cls = normalizeLang(lang) ? ` class="language-${normalizeLang(lang)}"` : '';
    $fig.replaceWith(`<pre><code${cls}>${escapeHtml(code.replace(/\s+$/, ''))}</code></pre>`);
  });
  const md = td.turndown(content.html() ?? '').replace(/\n{3,}/g, '\n\n').trim();

  const path = rel.replace(/\/index\.html$/, ''); // 2019/06/25/Angular-RxJS
  const slug = path.split('/').pop();
  const year = path.slice(0, 4);
  let file = `${year}/${slug}.md`;
  if (seen.has(file)) { file = `${year}/${path.slice(5, 10).replace('/', '')}-${slug}.md`; }
  seen.set(file, path);

  const fm = [
    '---',
    `title: ${yamlStr(title)}`,
    `date: ${date}`,
    description ? `description: ${yamlStr(description)}` : null,
    `tags: [${tags.map(yamlStr).join(', ')}]`,
    categories.length ? `categories: [${categories.map(yamlStr).join(', ')}]` : null,
    `path: ${yamlStr(path)}`,
    'legacy: true',
    thumb ? `thumbnail: ${yamlStr(thumb)}` : null,
    '---',
  ].filter(Boolean).join('\n');

  const dest = join(OUT, file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, `${fm}\n\n${md}\n`);
  count++;
}
console.log(`migrated ${count} posts → ${OUT}`);
