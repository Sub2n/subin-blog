---
title: "25. Enhanced Object property"
date: 2019-05-21
description: "ES6에서 객체 리터럴 프로퍼티 기능이 확장되었다. 1. Object Property Value ShorthandES5에서는 프로퍼티 값으로 변수를 할당하더라도 프로퍼티 키와 값을 써주어야 한다. 12345678910var x = 1;var y = 2;var obj…"
tags: ["ES6", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/21/25-Enhanced-Object-property"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

ES6에서 객체 리터럴 프로퍼티 기능이 확장되었다.

### 1\. Object Property Value Shorthand

ES5에서는 프로퍼티 값으로 변수를 할당하더라도 프로퍼티 키와 값을 써주어야 한다.

```js
var x = 1;
var y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); // {x: 1, y: 2}
obj.x === obj['x']; // true
```

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우에는 프로퍼티 키를 생략할 수 있다. (Property Shorthand) 프로퍼티 키는 변수의 이름으로 자동 생성된다.

```js
let x = 1;
let y = 2;

const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
obj.x === obj['x'] // true
```

### 2\. Dynamic Property Keys

ES5에서는 변수를 사용해서 프로퍼티 키를 생성하기 위해서는 두 단계를 거쳐야했지만 ES6에서는 프로퍼티 키를 동적으로 생성할 수 있다.

```js
// ES5
var pass = 'pw'
var obj = {
    id: 1
};
obj[pass] = '1234';
```

```js
// ES6
const pass = 'pw'
const obj = {
    id: 1,
    [pass]: '1234'
};
```

### 3\. Object Method Shorthand

ES5와 다르게 ES6에서는 메소드를 선언할 때 function 키워드를 생략하고 메소드 축약 표현을 사용할 수 있다.

```js
// ES6
const obj = {
    name: 'Park',
    getName() {
        console.log(this.name);
    }
};

obj.getName(); // Park
```

ES6의 화살표 함수(Arrow Function)와 메소드 축약 표현으로 생성된 함수는 constructor를 가지지 않는 non-constructor이다.

### 4\. Inheritance by \_*proto\_* Property

ES5에서 어떤 객체를 상속받기 위해서는 Object.create() 함수를 사용한다. Object.create의 argument로 전달하는 객체를 생성되는 객체의 프로토타입으로 지정하는 것이다. 이를 프로토타입 패턴 상속이라고 한다.

ES6에서는 객체 리터럴 내부에서 \_*proto\_* 프로퍼티를 직접 바인딩해서 상속을 표현할 수 있다.

```js
const parent = {
    name: 'parent',
    getName() {
    	console.log(this.name);
	}
}

const child = {
    __proto__: parent,
    name: 'child'
};

parent.getName(); // parent
child.getName(); // child
```
