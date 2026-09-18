---
title: "Angular Basics"
date: 2019-06-14
description: "AngularAngular는 SPA(Single Page Application) 개발을 위한 Google의 Open source JavaScript Framework. Framework and LibraryLibrary는 관련있는 함수를 모아놓아 개발자가 사용할 수…"
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/06/14/Angular-Basics"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Angular

Angular는 SPA(Single Page Application) 개발을 위한 Google의 Open source JavaScript **Framework**.

> #### Framework and Library
> 
> Library는 관련있는 함수를 모아놓아 개발자가 사용할 수 있는 도구이다. 즉, Library는 개발자에 의해 사용된다.
> 
> Framework는 클래스와 인터페이스의 집합으로 Application의 Flow를 쥐고 있다. 개발자가 Framework 틀 내부에서 작업하는 것이다.

전통적인 웹 개발에서 JavaScript는 HTML/CSS에 의존한다. 의존한다는 것은 HTML/CSS에 접근해서 조작하는 방식으로 JavaScript 코드가 작성되었다는 것을 뜻한다. 이는 HTML/CSS가 변경되면 JavaScript 코드도 영향을 받음을 의미한다.

Angular는 HTML/CSS가 JavaScript에 의존하도록, 즉 JavaScript 코드의 상태 데이터 (State)에 바인딩해서 상태가 변경될 때마다 Rendering되도록 한다. HTML/CSS를 JavaScript의 Rendering 함수 내부의 문자열로 관리하면 앞서 말한 동작이 가능하다.

## Advantages of Angular

1.  컴포넌트 기반 개발(CBD: Component Based Development) 로 생산성이 좋다. Web에서 컴포넌트 기반 개발이 어려운 이유는 CSS가 서로에게 영향을 주기 때문인데, Component 별로 CSS를 분리해내는 게 중요하다.
2.  TypeScript 사용으로 정적 타이핑, ES6과 ESNext의 기능을 지원한다.
3.  Angular는 대부분의 모던 브라우저를 지원한다. IE는 9 이상을 지원한다.

## Angular Project

#### app.component

Application의 root Component로, 실행 기본 page. (index.html처럼)

![app.component](https://user-images.githubusercontent.com/48080762/59484774-13d9b800-8eae-11e9-9762-ee95824f338f.png)

##### app.component.spec.ts

test specification

##### ng build 후 map file

디버깅용

#### app.module

전체 모듈을 관리하므로 component 추가시 module에 추가됨

![app.module](https://user-images.githubusercontent.com/48080762/59485300-379dfd80-8eb0-11e9-987c-8154db2b8663.png)

Component 생성 후 module file의 declarations에 추가해줘야함

#### Generate Component Shortcut

```
ng g c service -s -t --skip-tests (-S)
```

![shortcut](https://user-images.githubusercontent.com/48080762/59485613-78e2dd00-8eb1-11e9-86da-a3d210def751.png)

#### ng generate

| component | UI를 만들기 위해서 존재 |
| --- | --- |
| sercive | component와 직접적인 연관이 없는 state 관리 |

component가 활성화된다 => component가 메모리에 올라가면 view가 보임

```js
System.out.print('이거슨 java');
console.log('이거슨 JavaScript');
printf('이거슨 C');
cout<<'이거슨 c++';
print('이거슨 python');
```
