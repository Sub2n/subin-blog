import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // 예전 Hexo 주소를 유지할 때만 사용 (예: 2019/06/25/Angular-RxJS)
    path: z.string().optional(),
    legacy: z.boolean().default(false),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { posts };
