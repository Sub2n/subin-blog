import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { getPosts, postPath, postMarkdownPath, formatDate } from '../lib/posts';

// https://llmstxt.org — 사이트 요약과 글 목록을 마크다운으로 제공
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${SITE.description} 글은 모두 한국어이며, 각 글은 URL 끝의 슬래시를 \`.md\`로 바꾸면 마크다운 원문을 받을 수 있습니다.`,
    '',
    `- 작성자: ${SITE.author} (${SITE.github})`,
    `- 피드: ${SITE.url}/rss.xml`,
    '',
    '## 글',
    '',
    ...posts.map(
      (p) => `- [${p.data.title}](${SITE.url}${postMarkdownPath(p)}): ${formatDate(p.data.date)}${p.data.tags.length ? ' · ' + p.data.tags.join(', ') : ''}`,
    ),
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
