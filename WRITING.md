# 글쓰기 가이드

이 블로그의 글은 **짧게, 사실만, 내 말투로** 쓴다.

## 글 종류는 두 가지

| | TIL | 정리글 |
|---|---|---|
| 언제 | 막힌 거 하나 풀었을 때 | 한 주제를 끝까지 이해했을 때 |
| 길이 | 5~15줄 | 소제목 3~6개 |
| 만들기 | `/til 오늘 배운 거` | `/post 주제` (개요 먼저 확인) |
| 예 | "Vitest 브라우저 모드는 jsdom과 이벤트 순서가 다르다" | "Angular Signals로 옮기며 RxJS를 남긴 자리" |

## 구조

1. **첫 문단: 무슨 일이 있었나.** 뭘 하다가 어디서 막혔는지 2~3문장.
2. **`##` 소제목: 원인 → 해결.** 소제목 하나에 주장 하나.
3. **코드는 최소 재현만.** 언어 표시 필수. 15줄 넘으면 나눈다.
4. **참고 링크는 문장 끝에.** "이 글을 보고 해결했다: [링크]"
5. **내용이 끝나면 글도 끝.** "정리", "앞으로", "느낀 점" 같은 마무리 섹션은 없다.

## 말투

- 평서체. "~했다", "~이다", "~해봐야겠다".
- 문장은 짧게. 한 문장에 한 가지.
- 영어 용어는 그대로 쓴다. Observable, HttpClient, frontmatter.
- 불릿을 아끼지 않는다. 설명이 세 개 이상 나열되면 불릿.
- 감상은 한 줄까지. "setTimeout을 이렇게 쓸 수 있다니." 정도면 충분하다.
- 쓰지 않는 것: 독자에게 말 거는 문장("~해 보세요"), 서론("오늘은 ~에 대해 알아보자"), 과장("완벽하게", "놀랍게도").

## frontmatter

```yaml
---
title: "Vitest 브라우저 모드는 jsdom과 이벤트 순서가 다르다"
date: 2026-09-20
tags: ["vitest", "testing"]        # 소문자 kebab-case, 3개 이하, 기존 태그 재사용
description: "한 줄 요약. 검색 결과와 공유 카드에 쓰인다. 없으면 본문 앞부분."
draft: true                         # 발행할 때 false
---
```

- 파일 위치: `src/content/posts/<연도>/<slug>.md`
- 주소: `/posts/<연도>/<slug>/`
- slug는 영문 소문자 kebab-case, 5단어 이하.
- 제목은 배운 결과가 드러나는 문장. "Vitest 삽질기" 말고 "Vitest 브라우저 모드는 jsdom과 이벤트 순서가 다르다".

## 발행

```sh
npm run dev            # http://localhost:4321 에서 확인
# draft: false 로 바꾸고
git add -A && git commit -m "글: 제목"
git push               # 소스 저장소
npm run deploy:local   # sub2n.github.io 에 반영 (1~2분)
```

기존 태그 보기:
```sh
grep -rh "^tags:" src/content/posts --include=*.md | sort | uniq -c | sort -rn | head -30
```
