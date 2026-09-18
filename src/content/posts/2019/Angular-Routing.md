---
title: "Angular Routing"
date: 2019-07-10
description: "SEO(Search Engine Optimization)SPA(Single Page Application)의 단점으로 부각되는 SEO 문제를 해결하기 위해서 각 page마다 고유한 URL을 부여하는 Routing 기능이 Angular Framework에도 제공한다.…"
tags: ["Angular", "Routing"]
categories: ["JavaScript", "Angular"]
path: "2019/07/10/Angular-Routing"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## SEO(Search Engine Optimization)

SPA(Single Page Application)의 단점으로 부각되는 SEO 문제를 해결하기 위해서 각 page마다 고유한 URL을 부여하는 Routing 기능이 Angular Framework에도 제공한다.

> ### Angular Universal
> 
> SSR(Server Side Rendering)을 할 수 있도록 하는 Angular Module

## Angular Routing

Routing은 Source에서 Destination까지의 경로를 결정하는 기능이다.

Application에서 Routing이란 어떤 View에서 다른 View로 View를 전환하는 Navigation을 관리하는 기능을 의미한다.

a Element의 `href` attribute를 이용하면 브라우저의 주소창 URL이 바뀌며 새로운 html 페이지를 렌더링한다. 이 과정에서 화면 깜빡임이 발생한다. 이를 보완하기 위한 AJAX는 브라우저 주소창의 주소가 변경되지 않아 브라우저의 뒤로가기, 앞으로가기 등의 history 관리가 되지 않는다. 하나의 주소로 동작하는 AJAX 방식은 SEO도 되지 않는다.

Angular는 위의 문제점을 보완한 2가지의 Location strategy를 제공한다.

-   PathLocationStrategy : HTML5 History pushState 기반 Navigation Strategy
-   HashLocationStrategy : Hasy 기반 Navigation Strategy

Angular의 Default Location Strategy는 Path Location Strategy이다.

> #### Type Alias
> 
> ```ts
> export declare type Routes = Route[];
> ```

> Route type 배열을 Routes type으로 선언하는 것처럼 type 이름 짓는 방식

### Routing Module

```ts
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  IndexComponent,
  HomeComponent,
  ServiceComponent,
  AboutComponent,
  NotFoundComponent
} from './pages';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent }
  { path: 'service', component: ServiceComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule {}
```

Routes type의 routes에 `path`와 `component` 프로퍼티를 가진 객체를 배열의 원소로 넣어주면 path가 바뀔 때마다 해당 path에 맞는 component를 보여준다.

path에 `/` 는 생략한다.

path `**`는 wild card로, 위에 설정된 경로가 아닌 모든 경로로 접근할 경우 이동하는 페이지다. 꼭 맨 마지막에 작성해야한다.

`redirectTo`와 `pathMatch: 'full'`은 path가 정확히 일치할 때 해당 경로로 redirect한다. pathMatch를 설정해주지 않으면 일부만 일치해도 이동하므로 둘을 같이 써주는 것이 좋다.

### Navigation

```html
<nav>
  <a routerLink = "/">Logo</a>
  <a routerLink = "/home">Home</a>
	<a routerLink = "/service">Service</a>
  <a routerLink = "/about">About</a>
</nav>
```

a tag의 `href` attribute 대신 Angular에서 제공하는 Directive `routerLink`를 사용해서 path를 지정한다.

### routerLinkActive

```html
<nav>
  <a routerLink = "/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Logo</a>
  <a routerLink = "/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
	<a routerLink = "/service" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Service</a>
  <a routerLink = "/about" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">About</a>
</nav>
```

정확히 일치하는 routerLink가 Active일 때 설정된 active class가 적용된다.

-   \[routerLinkActiveOptions\]=”{ exact: true }”
    
    path가 정확히 일치할 때만 Active 적용
    
-   routerLinkActive=”className”
    
    routerLink가 active되면 설정한 class 활성화
    

### Module 만들기 Tip

```bash
ng g m module-name --routing
```

Routing module을 포함한 module을 만들어준다.

-   모듈 분리시 app.module.ts에서
    
    import에 AppModule이 가장 밑으로 가게 Module import
