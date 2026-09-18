---
title: "Angular NgModule"
date: 2019-07-08
description: "ModuleAngular의 모듈은 관련이 있는 구성 요소(Component, Directive, Pipe, Service)를 하나의 단위로 묶는 메커니즘 모듈은 관련이 있는 구성 요소들로 구성된 integrated functional block으로…"
tags: ["Angluar"]
categories: ["JavaScript", "Angular"]
path: "2019/07/08/Angular-NgModule"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Module

**Angular의 모듈**은 **관련이 있는 구성 요소(Component, Directive, Pipe, Service)를 하나의 단위로 묶는 메커니즘**

모듈은 관련이 있는 구성 요소들로 구성된 integrated functional block으로 Application을 구성하는 하나의 단위를 말함

모듈은 다른 모듈과 결합할 수 있으며 Angular는 여러 모듈을 조합해서 Application을 구성한다.

초기 속도가 느린 SPA의 단점을 해결하기 위해서 모듈을 분리하고 Lazy Loading하는 방법이 있다.

Angular는 최소한 하나의 모듈, root Module인 app.module.ts를 갖는다.

NgModule은 `@NgModule` Decorator로 장식된 class이다.

![Shared module](https://poiemaweb.com/img/shared-module.png)

-   Feature Module
    
    하나의 View 가 하나의 Feature Module
    
-   Shared Module
    
    여러 Feature Module에서 import되어 사용되는 Shared Module
    
-   Core Module
    
    Application 전체에서 사용하거나 하나의 Feature Module에서 사용하는 Service
    

Component 하나로만 이루어진 단순한 view여도 view 단위로 모듈을 나누기로 했으면 나눠야함

## @NgModule Decorator

#### Metadata

Decorator에 전달하는 Metadata는 Angular에 Module code를 어떻게 compile하고 실행할지를 설명한다.

#### declarations

Component, Direcive, Pipe를 선언하면 선언된 구성요소는 Module에서 사용할 수 있다.

#### imports

Module에서 사용하는 다른 Module을 선언한다. Module은 다른 Module를 사용할 수 있다.

#### providers

Injectable object, 즉 Service를 선언한다. Root Module에 선언된 Service는 Application 전역에서 사용할 수 있다.

최신 버전 Angular에서는 ng generate service로 생성한 service는 @Injectable Decorator의 Metadata에 proviededIn: ‘root’로 들어감

#### bootstrap

CSS Bootstrap 아님

**Root Module에서 사용하는 Property**로 Application의 entry point인 Root Component(AppComponent) 선언

## Shared Module

```bash
ng generate module shared
// ng g m shared
```

Shared Module은 Application 전역에서 사용되는 Component, Directive, Pipe 등으로 구성된다.

## Core Module

```bash
ng generate module core
```

Core Module은 Application 전역에서 사용되는 Data Service, Authentication Service, Authentication Guard 등으로 구성된다.

```ts
import { CoreModule} from '../core.module.ts';

@Injectable({
  providedIn: CoreModule
})
```
