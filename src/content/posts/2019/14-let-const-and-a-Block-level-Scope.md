---
title: "14. let, const and a Block-level Scope"
date: 2019-05-09
description: "1. Problems with Variables declared with the var keywordES5까지 변수를 선언할 수 있는 유일한 키워드는 var 하나였다. var 키워드로 선언된 변수는 다른 언어와는 구별되는 특징을 가진다."
tags: ["자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/09/14-let-const-and-a-Block-level-Scope"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# 1\. Problems with Variables declared with the `var` keyword

ES5까지 변수를 선언할 수 있는 유일한 키워드는 `var` 하나였다. `var` 키워드로 선언된 변수는 다른 언어와는 구별되는 특징을 가진다.

## 1.1. Allow Duplicate Variable Declaration

`var` 키워드로 선언한 변수는 중복 선언이 가능하다.

```js
var x = 1;
// No Error
var x = 10;
console.log(x); //10
```

같은 스코프 내에서 변수를 중복 선언하면 나중에 선언된 변수는 선언문이 아닌 할당문처럼 동작한다. 이 때 에러가 발생하지 않기 때문에 중복 선언을 인지하기 힘들다. 이로 인해 의도치 않게 변수값이 변경될 수 있다.

## 1.2. Function-level Scope

`var` 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 따라서, if문이나 for문 등에서 선언한 `var` 변수는 모두 전역 변수가 된다.

대부분의 프로그래밍 언어는 block-level scope이기 때문에 function-level scope를 이용하는 것은 전역 변수를 남발할 가능성을 높인다.

## 1.3. Variable Hoisting

`var`키워드로 선언한 변수는 변수 호이스팅에 의해 변수 선언문이 스코프의 가장 위로 끌어 올려진 것처럼 동작한다. 즉, 선언 이전에 `var` 변수를 참조해도 에러가 나지 않는다. 이는 프로그램의 흐름을 해치고 가독성을 떨어뜨린다.

# 2\. `let` keyword

`var` 키워드의 단점들을 보완하기 위해 ES6에서 `var`와 `const` 키워드가 추가되었다. 이들은 `var` 키워드와 같이 변수를 선언할 때 사용된다.

## 2.1. Ban Duplicate Variable Declaration

`let` 키워드로 선언한 변수를 중복 선언하면 `var`와 달리 SyntaxError가 발생한다.

```js
let x = 1;

let x = 10;	// SyntaxError: Identifier 'x' has already been declared
```

## 2.2. Block-level Scope

`var` 키워드로 선언한 변수는 함수의 코드 블록만을 지역 스코프로 인정하는 함수 레벨 스코프를 따른다. 그러나 `let` 키워드로 선언한 변수는 모든 코드 블록 `{}`을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

```js
let foo = 1;	// global variable
{
    let foo = 3;	// local variable
    let bar = 4;	// local variable
    
    console.log(foo); 	// 3
	console.log(bar);	// 4
}
console.log(foo); 	// 1
console.log(bar);	// ReferenceError: bar is not defined
```

## 2.3. Variable Hoisting

`let` 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```js
console.log(foo);	// ReferenceError: foo is not defined
let foo;
```

그렇다면 `let` 키워드로 선언한 선언문은는 런타임 이전에 실행되지 않는 것일까?

일반적으로 `var` 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 declaration phase와 initialization phase가 **한 번에** 진행된다.

![var declaration](https://user-images.githubusercontent.com/48080762/57504827-02424500-7331-11e9-960b-75e673a99ae3.png)

1.  Declaration phase : Execution context의 lexical environment에 있는 스코프에 변수 식별자를 등록하여 변수의 존재를 알린다.
2.  Initialization phase : declaration phase가 끝나는 즉시 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 undefined로 변수를 할당해 초기화한다.

`let` 키워드로 선언한 변수는 “Declaration phase”와 “Initialization Phase”가 **분리되어 진행**된다. 즉, 런타임 이전에 암묵적으로 declaration phase가 먼저 실행되지만 **initialization phase는 런타임에 변수 선언문에 도달했을 때 실행**된다.

![let declaration](https://user-images.githubusercontent.com/48080762/57430144-acef3080-7269-11e9-987d-75b1881b029a.png)

initialization phase가 실행되기 이전에 변수에 접근하려고 하면 reference error가 발생한다. 아직 변수를 위한 메모리 공간이 확보되지 않았기 때문이다. 따라서 스코프의 시작 지점부터 **변수 선언문을 만나서** initialization phase가 시작되기 전까지는 변수를 참조할 수 없다.

> ### TDZ (Temporal Dead Zone)
> 
> 스코프의 시작 지점부터 Initialization phase 시작 지점까지의 구간

`let` 키워드로 선언한 변수는 hoisting이 되지 않는 게 아니라, 선언문을 만났을 때 initialization phase를 진행하는 것이다.

## 2.4. Global Object and `let`

**전역 객체(Global Object)**는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 브라우저 환경에서는 window 객체, Node.js 환경에서는 global 객체를 말한다.

**`var` 키워드로 선언한 전역 변수와, 키워드 없이 선언하고 값을 할당한 암묵적 전역변수, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.**

```js
var x = 1;
y = 2;
function foo() {}

console.log(window.x === x);		// true
console.log(window.y === y);		// true
console.log(window.foo === foo);	// true
```

전역 객체의 프로퍼티는 전역 변수처럼 사용할 수 있다. 전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.

그러나 `let` 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다. `let` 전역 변수는 전역 렉시컬 환경의 선언적 환경 레코드 내에 존재하게 된다.

```js
let x = 1;

console.log(window.x);	// undefined
```

# 3\. `const` Keyword

`const` 키워드는 상수(변하지 않는 고정된 값)를 선언하기 위해 사용한다. `let` 과 `const` 는 동일한 특징이 많다. 차이점을 살펴보자.

## 3.1. Declaration and Initialization

`let` 키워드로 선언한 변수와 달리 `const` 키워드로 선언한 변수는 재할당이 금지된다.

```js
const PI = 3.14;

PI = 3.141492;	// TypeError: Assignment to constant variable.
```

`const` 키워드로 선언한 변수는 반드시 선언과 할당이 동시에 이루어져야 한다. 이후로는 재할당을 할 수 없다.

`const` 키워드로 선언한 변수 또한 block-level scope를 갖는다.

## 3.2. Constant

변수를 만들고 재할당을 하지 않을 거라면 상수를 적극적으로 쓰는 게 좋다. 고정된 값을 상수로 만들어 쓰면 코드의 가독성을 높일 수 있다. 상수는 프로그램 전체에서 사용하므로, 유지보수에 효율적이다.

## 3.3. `const` Keyword and Object

`const` 키워드로 선언한 변수에 primitive value를 할당한 경우, primitive value는 immutable value이고 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법이 없다.

`const` 키워드로 선언한 변수에 객체를 할당한 경우, 재할당이 금지되는 것은 마찬가지이다. 그러나 객체는 mutable value이므로 `const` 키워드로 선언된 변수에 할당된 객체는 변경이 가능하다.

즉, `const` 키워드는 재할당을 금지할 뿐 immutable을 의미하지 않는다. immutable과 mutable은 상수와 변수의 개념이 아닌, 값의 변경에 대한 개념이다.

# 4\. `var` vs. `let` vs. `const`

변수 선언에는 기본적으로 `const`를 사용하고 `let`은 재할당이 필요한 경우에 사용하는 것이 좋다.

-   ES6 사용시 `var` 키워드 사용하지 않는다.
-   재할당이 필요한 경우에만 `let` 키워드를 사용하고, 변수의 스코프를 최소화 한다.
-   객체와 변경을 하지 않을 원시 값에는 `const` 키워드를 사용한다.
-   `var` 와 `let`/`const`를 함께 쓰지 않는다.
