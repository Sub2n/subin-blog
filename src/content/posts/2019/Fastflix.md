---
title: "Fastflix"
date: 2019-08-14
description: "FastflixWeb FrontEnd, BackEnd, iOS 세 팀이 협업한 Netflix Clone Project 패스트캠퍼스 프론트엔드 개발 스쿨의 파이널 프로젝트로 진행했다. 팀원박수빈, 한현진, 정수영 역할나는 프론트엔드의 팀장을 맡았다. 팀장으로써의 역할…"
tags: ["TIL"]
categories: ["TIL"]
path: "2019/08/14/Fastflix"
legacy: true
thumbnail: "/gallery/thumbnails/fastflix.png"
---

# Fastflix

Web FrontEnd, BackEnd, iOS 세 팀이 협업한 Netflix Clone Project

패스트캠퍼스 프론트엔드 개발 스쿨의 파이널 프로젝트로 진행했다.

## 팀원

**박수빈**, 한현진, 정수영

## 역할

나는 프론트엔드의 팀장을 맡았다.

### 팀장으로써의 역할

![Fastflix FlowChart](https://user-images.githubusercontent.com/48080762/62991049-1befad00-be89-11e9-98be-57a0ea6fd964.png)

![Fastflix WireFrame](https://user-images.githubusercontent.com/48080762/62991052-1c884380-be89-11e9-8e55-79c834a4c913.png)

Netflix를 분석하고 flow chart와 wire frame을 작성했다. 설계 부분에서는 소프트웨어 공학 수업에서 배운 설계 방법이 많은 도움이 됐다. 요구분석을 통해 Requirment List를 도출하고 Requirment List를 바탕으로 팀원 간 역할을 부여했다.

![Requirment List](https://user-images.githubusercontent.com/48080762/62991185-95879b00-be89-11e9-85f7-0aae3e36e318.png)

한 달 규모의 프로젝트를 리드해본 적이 없었기에 초반에 부담이 컸다. 어떻게 해야 팀원들과 잘 협업해서 좋은 결과물을 낼 수 있을 지가 가장 큰 고민이었다. 고민 끝에 각자의 역량에 맞게 역할을 분담하고 Gantt Chart를 이용해 스케줄을 관리했다.

![Gantt Chart](https://user-images.githubusercontent.com/48080762/62991782-fd3ee580-be8b-11e9-9d47-d80c7fa315c7.png)

처음에는 4명이 팀이 되어 시작했는데, 그 중 2명은 개발에 자신이 없는 태도를 보여 간단한 Component를 하나씩 맡겼다. 현진이는 핵심 기능이라고 할 수 있는 Netflix의 Slider 구현을 맡았다. Gantt Chart를 이용한 스케줄 관리는 스프린트 미팅 때 강사님께도 칭찬을 들었다.

남은 내 몫은 팀원들이 맡은 Component를 구현할동안 **다른 모든 것들**을 구현하는 거였다.

### 구현에서의 역할

![Components](https://user-images.githubusercontent.com/48080762/62991060-214cf780-be89-11e9-838d-e031083e81d5.png)

팀원 한 분이 중간에 하차를 해서 Profile에 관련된 구현을 내가 맡았다. 현진이가 모든 Slider를 작업하고, 수영님이 비디오 플레이어의 외관을 꾸몄다. (데이터 바인딩은 내가 했다^^;)

밑의 작업들을 내가 진행했다.

-   Component 분리
    
-   Routing 및 Routing Animation 구현
    
-   팀원들이 작업할 수 있는 환경을 만들기 위해 Home과 Movie의 HTML/CSS을 우선 작업
    
-   Authentication Guard로 로그인 하지 않은 유저의 접근 제한
    
-   로그인을 하지 않은 유저가 보게 될 초기 화면 구현 (초기 페이지에서 회원가입과 로그인이 가능)
    
-   4단계로 이루어진 회원가입 기능 구현
    
-   2중 로그인 기능 구현 (1. 계정으로 로그인 2. 프로필로 로그인)
    
-   Server의 API가 완성됨에 따라 HttpClient 통신을 제공하는 Angular Service 구현
    
-   검색 기능 구현 (사용자가 검색어를 입력할 때마다 화면에 검색 결과 반영)
    
-   Slider, Watch Component 등으로의 Data Binding
    
-   각 유저 별로 영화를 좋아요, 싫어요, 내가 찜 한 목록에 추가하기 기능 구현
    
-   프로필 생성, 수정, 삭제 기능 구현
    

## 역경

프로젝트는 다사다난했다. 처음에는 구현할 게 많게 느껴져 구현이 어려울 거라고 생각했지만, 모든 문제는 사람이 만들었다. 프로젝트 진행 중반 쯤에 각 팀마다 하차자가 나왔다. FrontEnd에서 한 명, BackEnd에서 한 명이 하차했다. BackEnd에서 하차하는 팀원이 Github Organization 레포지토리를 삭제하는 일이 있었다.

![충격과공포](https://user-images.githubusercontent.com/48080762/62992033-eb117700-be8c-11e9-8206-44dc6e2dafb3.png)

이 때 2주동안 열심히 심어놓은 잔디들이 날아갔다. 다행히 레포지토리가 복구되어 잔디도 복구했지만 이 경험을 통해서 사람이 가장 무섭고 위험하다는 것을 깨달았다.

그 외에 힘들었던 것은, 팀원 간 역량 차이가 많이 나서 일의 분배가 균등하지 않았다는 것이다. 나보다 나이가 10살은 많은 팀원을 통제하기도 힘이 들었다. 나는 그들이 하지 못 하는 일을 하기에 바빴다. 막바지에 가서는 나와 현진이 2명이서 프로젝트를 완성한 꼴이 되었다. 조별과제 절망편이다. 어쩌면 교수님들은 인생을 배우라는 의미에서 조별과제를 내주시는 걸지도 모른다.

## 성과

![Home](https://user-images.githubusercontent.com/48080762/62991472-c1575080-be8a-11e9-8e06-8e93377c4548.png)

아주 예쁜 Fastflix 웹 페이지가 완성되었다. 도메인을 구매해 웹에 올렸다.

✨ [http://www.fastflix.co.kr](http://www.fastflix.co.kr/) ✨

위의 힘들었던 점들로부터 많은 것을 배우고 성장한 것이 가장 큰 성과라고 할 수 있겠다. 또한 BackEnd에 대한 흥미가 높아져 부스트코스 웹 프로그래밍 강의를 들으며 BackEnd 공부를 하고자 한다.

의미 있는 데이터를 받아서 화면에 표시하는 일이 굉장히 재미있었다. 한 달 간 팀을 리드해본 경험도 쌓았다. Git을 능숙하게 다를 수 있게 되었고, 프로젝트 진행 시 커뮤니케이션의 중요성을 배우고 협업을 위한 도구 사용에 대해서도 배웠다.

프로젝트를 진행하며 많이 성장했고 다음에는 더 잘 할 수 있을 거라는 자신감이 생겼다. 좋은 경험이었다!
