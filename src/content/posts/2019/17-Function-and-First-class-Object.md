---
title: "17. Function and First-class Object"
date: 2019-05-12
description: "1. First-class Object자바스크립트에서 함수는 객체이며 값처럼 사용할 수 있다. 값처럼 사용할 수 있는 객체를 일급 객체라고 한다. 자바스크립트의 함수는 일급 객체(first-class object)이다."
tags: ["First-class object", "일급 객체", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/12/17-Function-and-First-class-Object"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# 1\. First-class Object

자바스크립트에서 함수는 객체이며 값처럼 사용할 수 있다. 값처럼 사용할 수 있는 객체를 일급 객체라고 한다. 자바스크립트의 함수는 일급 객체(first-class object)이다.

### First-class Object

-   런타임에 무명의 리터럴로 생성할 수 있다.
-   변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
-   함수의 매개변수로 전달될 수 있다.
-   함수의 반환값으로 사용될 수 있다.

```js
// 1. 무명의 리터럴로 생성할 수 있다.
// 2. 변수나 자료 구조에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 함수 객체를 객체에 저장할 수 있다.
const predicates = { increase, decrease };

function makeCounter(predicate) {
  let num = 0;

  // 4. 함수의 반환값으로 사용할 수 있다.
  return function () {
    num = predicate(num);
    return num;
  };
}

// 3. 함수의 매개변수에게 전달할 수 있다.
// makeCounter의 매개변수에게 함수 객체를 전달
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// makeCounter의 매개변수에게 함수 객체를 전달
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

자바스크립트의 함수는 일급객체의 조건을 모두 만족하는 일급 객체이다. 따라서 함수는,

-   무명의 리터럴로 생성할 수 있으므로 어디에서나 정의할 수 있다.
-   함수를 변수나 자료구조의 값으로 할당할 수 있다.
-   함수를 값처럼 매개변수로 전달할 수 있다.
-   함수에서 함수를 반환할 수 있다.

자바스크립트의 함수가 일급 객체이므로 함수형 프로그래밍을 할 수 있다.

> ### Functional Programming
> 
> 함수형 프로그래밍이랑 Pure function과 보조 함수의 조합을 통해 외부 상태를 변경하는 side-effect를 최소화하여 immutability를 지향하는 프로그래밍 패러다임이다.
> 
> 함수형 프로그래밍 패러다임에서 함수를 매개변수에 전달하거나 반환하는 함수를 Hign Order Function이라고 한다.

함수는 객체이지만 일반 객체와 달리 호출할 수 있다. 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.

# 2\. Property of Function Object

![Function Object Properties](https://user-images.githubusercontent.com/48080762/57577077-034ab200-74aa-11e9-9242-6def63879626.png)

![Object Property](https://user-images.githubusercontent.com/48080762/57577086-4573f380-74aa-11e9-9a26-734acab4b018.png)

함수 객체와 일반 객체를 각각 콘솔에 찍어보면 함수 객체에는 일반 객체에 없는 프로퍼티들이 있다. 함수 객체 내에는 arguments, caller, length, name, prototype 프로퍼티가 존재한다. \_\_ proto \_\_ 프로퍼티는 함수 객체, 일반 객체에 모두 존재한다.

```js
function add() {};

// function object의 Data property들
Object.getOwnPropertyDescriptor(add, 'arguments');
// {value: null, writable: false, enumerable: false, configurable: false}

Object.getOwnPropertyDescriptor(add, 'caller');
// {value: null, writable: false, enumerable: false, configurable: false}

Object.getOwnPropertyDescriptor(add, 'length');
// {value: 0, writable: false, enumerable: false, configurable: true}

Object.getOwnPropertyDescriptor(add, 'name');
// {value: "add", writable: false, enumerable: false, configurable: true}

Object.getOwnPropertyDescriptor(add, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}

// __proto__는 function object가 아닌, Object.prototype으로부터 상속받은 Accessor property이다.
Object.getOwnPropertyDescriptor(add, '__proto__');
// undefined

Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

-   함수 객체의 데이터 프로퍼티 : argunemts, caller, length, name, prototype
-   \_\_ proto \_\_는 접근자 프로퍼티로, Object.prototype객체의 프로퍼티를 상속받은 것.

## 2.1 arguments Property

arguments 프로퍼티의 value는 arguments 객체이다. arguments 객체는 함수 호출 시 전달된 argument들의 정보를 담고 있는 iterable array-like object이며, 함수 내부에서만 참조 가능하다.

> #### arguments Property
> 
> 함수 객체의 arguments property는 일부 브라우저에서 지원하고 있으나 ES3부터 표준에서 페지되었다. arguments 프로퍼티를 통해서가 아니라 함수 내부에서 지역 변수처럼 사용할 수 있는 **arguments 객체를 직접 참조**하는 것이 좋다.

#### arguments Object

![arguments object](https://user-images.githubusercontent.com/48080762/57577250-ef08b400-74ad-11e9-820a-d6bf77e6ae79.png)

-   argument들을 value로 가진다. 0, 1, 2 등 key는 argumet의 전달 순서를 나타낸다.
-   callee: 호출된 함수, 즉 arguments 객체를 생성한 함수를 가리킨다.
-   length: argument의 개수
-   Symbol(Symbol.iteraor): arguments object를 순회 가능한 iterable 자료 구조로 만들기 위한 프로퍼티.

arguments object는 parameter의 개수를 확정할 수 없는 **가변 인자 함수 (Variable Argument Function)**를 구현할 때 유용하게 사용한다.

```js
function sum() {
    let result = 0;
    
    // arguments 객체는 length property를 가진 array-like object이므로 iterable하다.
    for (let i = 0; i < arguments.length; i++)
        result += arguments[i];
    
    return result;
}
```

**Array-like Object**란 length property를 가진 객체로, 실제 배열이 아니지만 for 문 등으로 순회할 수 있는 객체를 말한다. 배열이 아니므로 배열 메소드를 사용하면 에러가 발생한다.

arguments object에 reduce, for…each 등 고차 함수를 사용하기 위해 배열로 변환한 후 사용하기도 한다.

ES6에서는 argument를 배열로 사용하기 위해 Rest parameter를 도입했다.

## 2.2. caller Property

caller property는 ECMAScript spec에 포함되지 않은 비표준 프로퍼티이다. 함수 객체의 caller property는 함수 자신을 호출한 함수를 가리킨다.

```js
function foo(func) {
  return func();
}

function bar() {
  return 'caller : ' + bar.caller;
}

// 브라우저에서의 실행 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // caller : null

// Node.js에서의 실행 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // caller : function (exports, require, module, __filename, __dirname) {전역 코드 전체}
```

## 2.3 length Property

함수 객체의 length property는 함수 정의 시 선언한 매개변수의 개수를 가리킨다.

```js
function add(a, b, c) {
	return a + b +c;
}

console.log(add.length)	//3
```

arguments Object의 length property와 Function Object의 length property의 값은 다름을 알고 넘어가자.

-   arguments Object’s length property : 넘겨받은 argument의 개수
    
-   Function Object’s length property : 함수에 정의된 parameter의 개수
    

## 2.4. name Property

함수 객체의 name property는 함수명을 나타낸다. ES6에서 정식 표준이 되었다.

익명 함수의 경우 ES5에서 name property는 빈 문자열이지만 ES6에서는 함수 객체를 가리키는 변수명을 값으로 갖는다. (함수 선언문일 경우 함수명과 동일한 변수명, 익명 함수 표현식일 경우 함수 표현식을 할당한 변수명)

## 2.5. \_*proto\_* Accessor Property

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 갖는다. \[\[Prototype\]\] 내부 슬롯은 프로토타입 객체를 가리킨다.

\_*proto\_* property는 \[\[Prototype\]\] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티.

```js
const obj = { key: 'value' };

console.log(obj.__proto__ === Object.prototype);	// true

console.log(obj.hasOwnProperty('key'));	// true
console.log(obj.hasOwnProperty('__proto__'));	// false
```

## 2.6. prototype Property

prototype Property는 함수 객체만이 소유하는 프로퍼티이다.

prototype Property는 함수가 객체를 생성하는 생성자 함수로 사용될 때 생성자 함수가 생성할 객체의 프로토타입 객체를 가리킨다.

즉,

-   **prototype** Data Property는 **함수가 생성자로 동작하여 생성할 instatnce의 prototype 객체**를 가리키고
-   **\_*proto\_*** Accessor Property는 **자신을 생성한 생성자 함수의 prototype 객체**, 즉 **자신이 상속받은 prototype 객체**를 가리킨다.

```js
function Circle(radius) {
  this.radius = radius;
}

const circle2 = new Circle(2);

console.log(Circle.prototype === circle2.__proto__); // true

function Person(name) {
	this.name = name;
}

console.log(Person.__proto__ === Circle.__proto__);	// true
```
