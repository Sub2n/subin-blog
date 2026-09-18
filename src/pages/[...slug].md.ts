import type { APIRoute } from 'astro';
import { getPosts, postPath } from '../lib/posts';
import { SITE } from '../config';

// 글마다 마크다운 원문을 그대로 제공한다. 에이전트와 LLM이 HTML 대신 읽어 가는 용도.
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: postPath(post).replace(/^\/|\/$/g, '') },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props;
  const fm = [
    '---',
    `title: ${JSON.stringify(post.data.title)}`,
    `date: ${post.data.date.toISOString().slice(0, 10)}`,
    post.data.tags.length ? `tags: [${post.data.tags.map((t: string) => JSON.stringify(t)).join(', ')}]` : null,
    `url: ${SITE.url}${postPath(post)}`,
    '---',
  ].filter(Boolean).join('\n');
  return new Response(`${fm}\n\n# ${post.data.title}\n\n${post.body ?? ''}`, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
