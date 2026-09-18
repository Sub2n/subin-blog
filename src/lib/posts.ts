import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** 발행된 글을 최신순으로 */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => !data.draft || import.meta.env.DEV);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** 글의 사이트 내 경로 (항상 슬래시로 끝남) */
export function postPath(post: Post): string {
  const p = post.data.path ?? `posts/${post.id}`;
  return `/${p.replace(/^\/+|\/+$/g, '')}/`;
}

/** 원문 마크다운 경로 */
export function postMarkdownPath(post: Post): string {
  return postPath(post).replace(/\/$/, '') + '.md';
}

/** Hexo와 같은 방식의 태그 슬러그: 공백·쉼표·슬래시를 하이픈으로 */
export function tagSlug(tag: string): string {
  return tag.trim().replace(/[\s,/]+/g, '-').replace(/^-+|-+$/g, '');
}

export function formatDate(d: Date, style: 'long' | 'short' | 'month' = 'long'): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  if (style === 'short') return `${m}.${day}`;
  if (style === 'month') return `${y}.${m}`;
  return `${y}-${m}-${day}`;
}

/** 한글 기준 분당 500자 정도로 계산 */
export function readingMinutes(body: string | undefined): number {
  const text = (body ?? '').replace(/```[\s\S]*?```/g, '').replace(/\s+/g, '');
  return Math.max(1, Math.round(text.length / 500));
}

export function groupByMonth(posts: Post[]): { month: string; posts: Post[] }[] {
  const groups: { month: string; posts: Post[] }[] = [];
  for (const post of posts) {
    const month = formatDate(post.data.date, 'month');
    const last = groups[groups.length - 1];
    if (last && last.month === month) last.posts.push(post);
    else groups.push({ month, posts: [post] });
  }
  return groups;
}

export function tagCounts(posts: Post[]): { tag: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'));
}

/** 본문에서 마크다운 기호를 걷어내고 단어 경계에서 자른 요약 */
export function excerpt(body: string | undefined, max = 150): string {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const i = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf('다.'));
  return (i > max * 0.5 ? cut.slice(0, i + 1) : cut).trim() + '…';
}
