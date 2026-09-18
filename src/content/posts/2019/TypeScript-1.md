---
title: "TypeScript (1)"
date: 2019-06-12
description: "TypeScriptJavaScript는 모듈 기능을 지원하지 않고, 동적 타입 언어라는 단점 때문에 대형 프로젝트를 진행하기에 불편한 점이 많았다. 따라서 JavaScript의 단점을 보완하고자 하는 AltJS(Alternative) 언어들이 출시되었다. 브라우저는…"
tags: ["TypeScript"]
categories: ["TypeScript"]
path: "2019/06/12/TypeScript-1"
legacy: true
thumbnail: "/gallery/thumbnails/typescript.png"
---

## TypeScript

JavaScript는 모듈 기능을 지원하지 않고, 동적 타입 언어라는 단점 때문에 대형 프로젝트를 진행하기에 불편한 점이 많았다. 따라서 JavaScript의 단점을 보완하고자 하는 AltJS(Alternative) 언어들이 출시되었다. 브라우저는 JavaScript만을 인식하므로 AltJS 를 사용하더라도 JavaScript로 Compile해야한다.

TypeScript도 AltJS 중 하나로, JavaScript의 Superset(상위 호환)이라는 특징을 가진다. TypeScript는 ES5의 Superset이므로 기존 JavaScript 문법을 그대로 사용할 수 있다. 또한 Babel 등의 Transpiler를 사용하지 않아도 ES6의 새로운 기능을 기존 브라우저에서 실행할 수 있다. TypeScript의 가장 주된 장점은 Static Type을 지원한다는 것이다.

Angular가 TypeScript를 정식 채용하고 ECMAScript의 업그레이드되는 기능을 지속적으로 추가할 예정으로 많은 주목을 받고 있다.

## TypeScript 장점

### 1\. 정적 타입

TypeScript의 가장 큰 장점은 정적 타입을 지원하는 것이다. 변수의 타입이 없고 할당되는 값에 따라 타입이 정해지는 동적 타입 언어인 JavaScript는 type check를 해야하는 불편함이 있다.

```ts
function sum(a: number, b: number) {
    return a + b;
}
```

TypeScript는 명시적으로 정적 타입을 지정해 개발자의 의도대로 코드를 작성할 수 있다. 이는 코드의 가독성을 높여 효율적인 디버깅이 가능하다.

### 2\. 도구의 지원

IDE 기능을 사용할 수 있다.

### 3\. 강력한 객체지향 프로그래밍 지원

### 4\. ES6 / ES Next 지원

Babel 없이도 ES6과 그 이상 버전을 지원하고 Babel보다 신기술에 빠르게 대응한다는 장점이 있다.

### 5\. Angular

Angular에서 TypeScript를 강력하게 지원한다.

> #### HTML code 내부에서 JavaScript를 보는 것과, JavaScript code 내부에서 HTML을 보는 것의 차이
> 
> JavaScript 내부에서 HTML element를 보면, 즉 querySelector를 사용해서 HTML Element에 접근하고 무언가 수행하면 Angular의 기본 원칙에 어긋난다. Angular는 기본적으로 HTML이 JavaScript에 영향을 받는 방식으로 HTML이 수정되어도 JavaScript code가 영항받지 않는다.
