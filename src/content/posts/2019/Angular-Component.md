---
title: "Angular Component"
date: 2019-06-14
description: "Angular Application은 component를 중심으로 구성되는만큼 component는 Angular의 핵심 개념이다. Component는 application의 화면을 구성하는 View를 생성하고 관리한다. Component는 template의 중첩…"
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/06/14/Angular-Component"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

Angular Application은 component를 중심으로 구성되는만큼 component는 Angular의 핵심 개념이다.

Component는 application의 화면을 구성하는 View를 생성하고 관리한다.

Component는 template의 중첩 관계에 의해서 tree 구조를 갖는다. 여러 component 사이의 통신과 상태 관리를 위해서 Service가 있다.

#### @Compnonent : decorator

#### Component Metadata

![component metadata](https://user-images.githubusercontent.com/48080762/59491021-0679f900-8ec1-11e9-9db7-31c3af5cce5d.png)

#### export class

![export class](https://user-images.githubusercontent.com/48080762/59491315-6e304400-8ec1-11e9-9e53-ddff4b4861e9.png)

#### Add Component to app.module.ts

![component declaration](https://user-images.githubusercontent.com/48080762/59491403-a172d300-8ec1-11e9-8961-b685478fd3d6.png)

#### Parent에서 Child로 data 보내는 법 : Property Binding

parent Component는 자신의 template에 Child Component를 담고 있으므로 Child Component를 알 수 있다. 따라서 data를 쉽게 전송할 수 있다.

1.  Parent Component에서 Child의 Property로 값을 전달한다.
    
    ```ts
    // app.component.ts
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-root',
      template: `
        <!--The content below is only a placeholder and can be replaced.-->
        <app-hello [hi]="greeting"></app-hello>
      `,
      styles: []
    })
    export class AppComponent {
      greeting = 'hello';  
    }
    ```
    
2.  Child에서 @Input decorator로 Proterty value를 전달받는다.
    
    ```ts
    // hello.component.ts
    import { Component, Input } from "@angular/core";
    
    @Component({
      // metadata
      selector: 'app-hello',
      template: `<h1>{{hi}}</h1>`,
      styles: [``]
    })
    export class HelloComponent {
      // class Field
      @Input() hi: string;
    }
    ```
    

#### Child Component에서 Parent Component로 data 보내는 법 : Event 발생

Child Component는 Parent Component를 모르므로 Event를 발생시켜 Parent Component에서 Event를 Handling하는 방식으로 data를 전송한다.

1.  @Output, EventEmitter를 이용해서 Child Component에서 Event를 발생시킨다.
    
    ```ts
    import { Component, Input, Output, EventEmitter } from "@angular/core";
    
    @Component({
      // metadata
      selector: 'app-hello',
      template: `
        <h1>{{hi}}</h1>
        <button (click)="greeting.emit('Hello')">greeting</button>
      `,
      styles: [``]
    })
    export class HelloComponent {
      // class Field
      @Input() hi: string;
      @Output() greeting = new EventEmitter<string>();
    }
    ```
    
    @Output으로 선언한 method는 emit으로 argument를 전달할 수 있다.
    
2.  Parent Component에서는 Event Handler를 이용해서 Event를 처리한다.
    
    ```ts
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-root',
      template: `
        <!--The content below is only a placeholder and can be replaced.-->
        <app-hello
          [hi]="greeting"
          (greeting)="changeGreet($event)"
        ></app-hello>
      `,
      styles: []
    })
    export class AppComponent {
      greeting = 'Hi~~!!!!';
      changeGreet(greet: string) {
        this.greeting = greet;
      }
    }
    ```
    
    `<app-hello>` 내부에서 event greeting의 event handler를 등록하고 class 내부에서 정의한다. $event로 parameter에 argument 값을 받아온다.
    

## Content Projection

Child Component의 selector tag 사이에 HTML content를 넣을 수 있다.

```html
<!-- parent -->
<app-child>
	<h1>
    Content from parent
  </h1>
</app-child>
```

```html
<!-- child -->
<div>
  <ng-content></ng-content>
</div>
```

Child component의 template에 `<ng-content></ng-content>`가 Parent component에서 전달한 template으로 치환된다.
