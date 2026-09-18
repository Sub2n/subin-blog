export const SITE = {
  title: '수빈 개발블로그',
  brand: 'subin.log',
  description: '프론트엔드와 에이전트 개발을 하며 배운 것을 짧게 기록합니다.',
  author: 'Subin Park',
  url: 'https://sub2n.github.io',
  github: 'https://github.com/Sub2n',
  repo: 'https://github.com/Sub2n/subin-blog',
  locale: 'ko-KR',
};

// GitHub Discussions 댓글(giscus). 저장소에서 Discussions를 켜고
// https://giscus.app 에서 값을 받아 채우면 글 아래에 댓글이 붙습니다.
export const GISCUS: null | {
  repo: `${string}/${string}`;
  repoId: string;
  category: string;
  categoryId: string;
} = null;
