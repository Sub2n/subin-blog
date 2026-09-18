---
title: "28. Module"
date: 2019-05-22
description: "원래 모듈화를 하거나 파일을 분리하면 각 모듈, 파일 별로 개별적인 스코프를 가져야하는데 자바스크립트는 파일을 분리해서 함께 사용할 때 하나의 전역 스코프만을 가진다. 즉, 여러 개의 js 파일에서 식별자 명이 겹칠 경우 의도한 바와 다르게 동작할 수 있다. 이전에는…"
tags: ["Modlue", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/22/28-Module"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

원래 모듈화를 하거나 파일을 분리하면 각 모듈, 파일 별로 개별적인 스코프를 가져야하는데 자바스크립트는 파일을 분리해서 함께 사용할 때 하나의 전역 스코프만을 가진다. 즉, 여러 개의 js 파일에서 식별자 명이 겹칠 경우 의도한 바와 다르게 동작할 수 있다.

이전에는 각 파일을 IIFE(Imediately Invoked Function Expression)로 감쌌으나 근본적인 해결책은 아니다. 특정 클래스나 함수를 외부에 노출시키고 싶지 않을 때는 클로저를 사용해서 선택적으로 노출했다.

ES6에서 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능이 추가되었다. script tag에 `type="module"` 어트리뷰트 추가시 해당 자바스크립트 파일은 모듈로 동작하며 파일 스코프를 가진다. 모듈화된 자바스크립트 파일을 사용할 때는 확장자 명을 `.mjs`라고 한다.

그러나 아직까지 문법이 엄격하고 구형 브라우저(IE 등)에서는 ES6 모듈을 지원하지 않는 문제가 있다. 그러니까 아직은 바벨 / 웹팩 등을 사용해서 개발해야한다.

> 바벨: ES6 이상의 문법을 사용해서 코딩하더라도 ES5의 문법으로 다운그레이드해서 구형 브라우저에서 돌아갈 수 있게 함
> 
> 웹팩: 여러 파일을 import하면 하나의 파일로 압축해줌

### 1\. File Scope

```js
// lib.js
var x = 10;
```

```js
// app.js
console.log(x);
```

모듈을 사용하지 않을 경우 정상적으로 코드가 돌아가지만 `type="module"` 사용시 각 파일마다 스코프가 분리되어 app.js에서 lib.js의 x에 접근할 수 없다.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script type="module" src="./lib.js"></script>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

### 2\. export Keyword

ES6의 모듈을 쓰면 각각 파일이 파일 스코프를 가지기 때문에 다른 파일에 공개할 변수나 함수, 클래스 앞에 `export` 키워드를 붙여서 선택적으로 노출할 수 있다.

```js
// lib.js
export let x = 10;
```

### 3\. import Keyword

다른 파일에서 `export` 키워드로 노출한 변수, 함수, 클래스 등을 `import` 키워드를 사용함으로써 사용할 수 있다.

```js
// app.js
import { x } from './lib.js';
console.log(x);
```

모듈에서 하나만 export할 때는 default 키워드를 사용할 수 있음

```js
// lib.js
function (x) {
    return x;
}
export default;
```

default 키워드로 export한 모듈은 import할 때 {} 없이 받아올 수 있다.

```js
// app.js
import y from './lib.js';
```
