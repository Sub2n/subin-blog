// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://sub2n.github.io',
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (page) => !/\/(search|404)\/?$/.test(page) }),
    pagefind(),
  ],
  markdown: {
    // 따옴표/대시 자동 치환은 코드가 많은 글에서 오히려 방해가 되어 끔
    processor: satteri({ features: { smartPunctuation: false } }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
  redirects: {
    '/archives/': '/',
    '/categories/': '/tags/',
    '/rss2.xml': '/rss.xml',
  },
});
