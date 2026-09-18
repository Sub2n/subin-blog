---
title: "Angular Built-in Directive"
date: 2019-06-18
description: "What is Directive?지시, 명령. View에 관련한 명령을 내리는 모든 것을 directive라고 한다. Component의 공통된 기능을 외부로 내보낸다. Dependency Injectivetype 지정하면 Angular가 class Instance를…"
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/06/18/Angular-Built-in-Directive"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## What is Directive?

지시, 명령. View에 관련한 명령을 내리는 모든 것을 directive라고 한다.

Component의 공통된 기능을 외부로 내보낸다.

> #### Dependency Injective
> 
> type 지정하면 Angular가 class Instance를 생성한다.

### Component Directive

Component의 템플릿 표시를 위한 Directive. @Component

### Attribute Directive

ngClass, ngStyle 등

#### ngClass

여러 개의 Class를 추가하고 제거할 때 간편하다. String, Array, Object 형태로 바인딩할 수 있다.

```html
<div [ngClass] = "'active red'"></div> <!-- string -->
<div [ngClass] = ""['active', 'red']"></div> <!-- array -->
<div [ngClass] = "{'active': true, 'red': false}"></div> <!-- object -->
```

#### ngStyle

여러 개의 Inline Style을 추가하고 제거한다.

```html
<div [ngStyle]="{ color: 'red', 'width.px': 100 }"></div>
```

> #### Host Element
> 
> Attribute가 사용된 Element

### Structural Directives

구조 디렉티브는 DOM 요소를 조건에 따라서 추가/삭제(ngIf, ngSwitch)하거나 반복 생성(ngFor)할 때 사용한다.
