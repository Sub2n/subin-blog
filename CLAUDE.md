# subin-blog

박수빈의 개발 블로그 소스. Astro 7 정적 사이트이며 https://sub2n.github.io/ 로 배포된다.

## 구조
- `src/content/posts/**/*.md` — 글. frontmatter 스키마는 `src/content.config.ts`.
  - `2019/` 는 Hexo 시절 글(`legacy: true`, `path`로 옛 주소 유지). 수정하지 않는다. 다시 만들려면 `npm run migrate:hexo`.
  - 새 글은 `src/content/posts/<연도>/<slug>.md`. 주소는 `/posts/<연도>/<slug>/`.
- `src/pages/[...slug].astro` — 글 페이지. `[...slug].md.ts` 는 같은 주소 + `.md` 로 원문 제공.
- `src/lib/posts.ts` — 정렬·경로·태그 슬러그·요약 등 공용 함수. 경로 규칙은 여기서만 바꾼다.
- `src/styles/global.css` — 디자인 토큰과 전체 스타일 (시안 A '기록장'). 컴포넌트별 CSS 없음.
- `src/config.ts` — 사이트 이름, 작성자, giscus 설정.

## 명령
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run deploy:local` — 빌드 후 `../Sub2n.github.io` 에 복사해 커밋·푸시 (토큰 불필요)
- GitHub Actions(`.github/workflows/deploy.yml`)는 `DEPLOY_TOKEN` 시크릿이 있어야 동작

## 글 frontmatter
```yaml
---
title: "제목"
date: 2026-09-18
tags: ["claude-code", "dx"]   # 태그는 소문자 kebab-case, 3개 이하
description: "한 줄 요약 (없으면 본문 앞부분을 사용)"
draft: false                   # true면 빌드에서 제외 (dev에서는 보임)
---
```

## 글쓰기 규칙
- 제목은 문장형으로, 무엇을 배웠는지 드러나게. ("MCP 서버 처음 만들며 헷갈렸던 것 세 가지")
- 첫 문단에 문제 상황을 쓰고, 해결과 원리를 소제목(`##`)으로 나눈다. 코드는 최소 재현만.
- 마크다운 처리기는 Sätteri(GFM). 스마트 따옴표는 꺼져 있다. 코드 블록은 언어를 명시한다.
- `/til`, `/post` 스킬로 초안을 만든다.

## 주의
- Astro 7 컴파일러는 닫지 않은 태그를 에러로 처리한다.
- 예전 주소(`/2019/...`)와 `/rss2.xml`, `/archives/`, `/categories/` 리다이렉트를 깨지 않는다.
