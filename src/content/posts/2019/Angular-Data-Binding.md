---
title: "Angular Data Binding"
date: 2019-06-17
description: "Interpolation Property Binding[propertyName] = &quot;expression&quot; &quot; &quot; 내부에는 string이 아니라 expression(표현식)이 오는 곳이므로 주의하자. Attribute and…"
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/06/17/Angular-Data-Binding"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Interpolation

## Property Binding

`[propertyName] = "expression"`

`" "` 내부에는 string이 아니라 expression(표현식)이 오는 곳이므로 주의하자.

> #### Attribute and Property
> 
> Attribute는 HTML Element의 attribute이고 Property는 DOM node object인 HTML Element 객체의 property이다. 초기에 HTML Attribute가 초기값으로 그려지고 Property는 실시간으로 변경되는 DOM 최신값을 반영한다.
> 
> ```html
> <input value="Initial Value" [value]="Property Value">
> ```

> 앞의 value는 attribute이고 \[value\]는 property이다. Property는 최신값이므로 실행시 “Property Value”가 view에 보여지게 된다.

## Attribute Binding

`[attr.attName] = "expression"`

Property와 달리 `attr.`를 붙여줘야 한다.

HTML Element의 Property와 Attribute는 항상 1 대 1로 대응하지 않는다. HTML Element 별로 어떤 Attribute와 Property가 있는지 알고 있어야 한다.

## Class Binding

Class binding은 2가지 방법으로 사용할 수 있다.

##### `[class.className] = "expression"`

expression의 평가 결과가 true일 때는 class를 적용하고, false일 때는 class를 적용하지 않는다. classList.add와 remove를 간단하게 할 수 있다.

##### `[class]="className List"`

class에 className List를 적용한다.

```ts
classNames = 'active red block';
```

여러 Class를 조건 별로 다룰 때에는 Angular의 built-in ngClass Directive를 사용하는 것이 좋다.

## Style Binding

`[style.styleProp]="expression"`

```html
// style property 이름은 camelExpression과 kebab-expression 모두 사용
<div [style.fontSize.px] = "'64'">..</div>
<div [style.font-size.px]="'64'">..</div>
```

## Event Binding

`(event)="event handler()"`

함수 **호출문**을 써야 한다.

```html
<button (click)="onClick()">..</button>
```

## Two-way Data Binding

Property와 event binding을 한 번에

```html
<input type="text" (input)="changeVal($event.target.value)"
       [value]="value"></input>
<button (click)="remove()">X</button>
```

```ts
export class AppComponent {
  value= '';
  
  changeVal(value: string) {
    this.value = value;
  }
  
  remove() {
    this.value = '';
  }
}
```

input event로 인해서 AppComponent class의 value가 바뀌면 그 바뀐 value에 의해서 또 HTMLInputElement의 value도 영향을 받는다.

이런 상황을 양방향 데이터 바인딩으로 작성할 수 있다.

```html
<input type="text" [(ngModel)]="value">
```

위 와 같이 고치면 input tag에 대해서 input event 발생시 AppCoㅊㅌ mponent의 value도 변경되고, AppComponent의 value가 변경되면 view에;ㅀ 반영된다.

ngModel을 사용하기 위해서는 FormsModule을 모듈에 등록해야 한다.
