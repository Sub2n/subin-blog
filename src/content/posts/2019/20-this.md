---
title: "20. this"
date: 2019-05-15
description: "1. this Keywordthis는 객체가 자신의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수(Self-referencing variable)이다. 함수 호출시 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. arguments 객체와…"
tags: ["this", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/15/20-this"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# 1\. this Keyword

this는 객체가 자신의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수(Self-referencing variable)이다. 함수 호출시 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. arguments 객체와 this는 함수 내부에서 지역 변수처럼 사용할 수 있다. this가 가리키는 값은 **함수 호출 방식에 의해 동적으로 결정**된다.

C++, Java와 같은 클래스 기반 언어에서 this는 항상 클래스로부터 생성되는 인스턴스를 가리킨다. 그러나 자바스크립트의 this는 함수가 호출되는 방식에 따라서 this에 바인딩될 객체가 동적으로 결정된다.

> #### Binding
> 
> 바인딩이란 식별자와 값을 연결하는 과정을 의미한다.

객체 리터럴은 할당 단계에 평가되므로 객체의 식별자를 this 대신 사용할 수 있지만, 일반적이지 않다. 생성자를 이용해서 객체를 생성할 때는 인스턴트를 가리킬 식별자를 미리 알 수 없기 때문이다.

this는 객체의 프로퍼티나 메소드를 참조하기 위한 변수이므로 객체의 메소드 또는 생성자 함수에서만 의미가 있다. strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩 된다. 적용되지 않을 경우 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.

> #### strict mode
> 
> ‘use strict’; strict mode는 자바스크립트 언어의 문법을 보다 엄격히 적용하여 기존에는 무시되던 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

# 2\. Function call types and this Binding

**스코프**의 경우 렉시컬 스코프(Lexical Scope)는 **함수 정의가 평가되어 함수 객체가 생성되는 시점**에 상위 스코프가 결정된다. **this**에 바인딩될 객체는 **함수 호출 시점**에 결정된다.

함수 호출 방식은 다음과 같다.

1.  일반 함수 호출 : this는 window
2.  메소드 호출 : this는 메소드를 호출한 객체
3.  생성자 함수 호출 : this는 생성할 instance
4.  Function.prototype.apply/call/bind 메소드에 의한 간접 호출

## 2.1. General Function Call

**일반 함수로 호출된 함수 내부의 this**에는 **전역 객체(Global Object)**가 바인딩된다.

전역 함수는 물론 **중첩 함수를 일반 함수로 호출했을 때에도 함수 내부의 this에는 전역 객체가 바인딩**된다. 일반 함수에서는 this로 객체의 프로퍼티나 메소드를 참조할 일이 없으므로 this에 의미가 없다.

```js
function foo() {
    console.log('foo this: ', this);	// window
    function bar() {
        console.log('bar this: ', this);	// window
    }
    bar();
}
foo();
```

메소드 내에서 정의한 중첩 함수일지라도 **일반 함수로 호출되면 중첩 함수의 this는 전역 객체**이다.

```js
const obj = {
  foo() {
    console.log('foo this: ', this);	// {foo: f}
    function bar() {
      console.log('bar this: ', this);	// window
    }
    // 메소드 내부에서 정의한 중첩 함수라도 일반 함수로 호출하면 this에 전역 객체가 바인딩된다.
    bar();
  }
};

obj.foo();
```

마찬가지로 콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 정리하면 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.

메소드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메소드의 this 바인딩과 일치시키기 위한 방법은 다음과 같다.

1.  this를 변수에 저장하고 콜백 함수의 this를 변수로 대체
    
    ```js
    const obj = {
      value: 100,
      foo() {
        cosnt that = this;
        setTimeout(function () {
            console.log(that.value); // 100
        }, 100)
      }
    };
    ```
    

2.  Function.prototype.apply, Function.prototype.call, Function.prototype.bind 메소드 이용
    
    ```js
    const obj = {
      value: 100,
      foo() {
        // bind method의 argument를 콜백 함수의 this로 바인딩한다.
        setTimeout(function () {
            console.log(this.value); // 100
        }.bind(this), 100)
      }
    };
    ```
    

## 2.2. Method Call

**메소드 내부의 this는 메소드를 호출한 객체**, 즉 메소드 호출시 (.) 연산자 앞에 오는 객체에 바인딩된다.

메소드를 소유한 객체가 아닌, 메소드를 호출한 객체에 바인딩된다는 것을 주의해야 한다.

```js
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person('Park');

const you = {
    name: 'Kim'
};

you.getName = me.getName;

console.log(me.getName()); // "Park"
console.log(you.getName()); // "Kim"
```

## 2.3. Constructor Function Call

생성자 함수 내부의 this에는 생성자 함수가 생성할 instance가 바인딩된다.

생성자 함수는 객체(instance)를 생성하는 함수로, new 연산자와 함께 호출되면 빈 객체를 만들고 this에 바인딩한다. 연산을 하며 this 객체를 완성시킨 후 this를 리턴한다.

함수가 new 연산자와 함께 호출되지 않아 일반 함수로 동작할 경우 this는 전역 객체를 가리킨다.

## 2.4. Indirect Call by Function.prototype.apply / call / bind method

### apply, call

Function.prototype의 메소드 apply와 call은 argument로 this와 arguments list를 전달받아 함수를 호출한다. Function 생성자 함수를 constructor 프로퍼티로 가리키는 모든 함수가 Function.prototype.apply와 call을 상속받아 사용할 수 있다.

```js
/**
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용될 객체
 * @param argsArray - 함수에게 전달할 인수 리스트 배열
 * @returns 호출된 함수의 반환값
 */
Function.prototype.apply(thisArg, [argsArray]))
```

```js
/**
 * 주어진 this 바인딩과 인수 리스트를 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용될 객체
 * @param arg1, arg2, ... - 함수에게 전달할 인수 리스트
 * @returns 호출된 함수의 반환값
 */
Function.prototype.call(thisArg, arg1, arg2, ...))
```

두 메소드의 차이는,

-   apply 메소드는 호출할 함수의 arguments를 배열로 묶어 전달한다.
-   call 메소드는 호출할 함수의 arguments를 쉼표로 구분한 리스트 형식으로 전달한다.

apply와 call은 호출할 함수에 argument를 전달하는 방식만 다를 뿐, this로 사용할 객체와 argument를 전달하며 함수를 호출한다.

#### bind

bind 메소드는 메소드의 this와, 메소드 내부의 중첩함수 또는 콜백 함수의 this가 불일치하는 문제를 해결할 때 사용된다. 콜백 함수 foo는 외부 함수 callName을 돕는 헬퍼 함수(보조 함수)의 역할을 해야하기 때문에 외부 함수 내부의 this와 콜백함수 내부의 this가 다르면 문제가 발생한다.

이 때 bind 메소드를 사용해서 this를 일치시킨다. apply와 call 메소드 또한 사용할 수 있다.

```js
function Person(name) {
    this.name = name;
}

Person.prototype.callName = function (callback) {
    callback.bind(this)();
    // callback.apply(this);
    // callback.apply(this);
}

function foo() {
    console.log(this.name);
}
```

bind로 this를 전달한 callback을 실행할 수도 있고, apply나 call로 this를 전달하며 동시에 호출할 수도 있다.

정리하면 this 바인딩은 다음과 같이 실행된다.

| 함수 호출 방식 | this 바인딩 |
| :-: | :-: |
| 일반 함수 호출 | 전역 객체 |
| 메소드 호출 | 메소드를 호출한 객체 |
| 생성자 함수 호출 | 생성자 함수가 생성할 instance |
| Function.prototype.apply/call/bind 메소드에 의한 간접 호출 | Function.prototype.apply/call/bind 메소드에 argument로 전달한 객체 |

## 3\. this in Arrow Function

일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.

화살표 함수는 **함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정**된다. 동적으로 결정되는 일반 함수와는 달리 **화살표 함수의 this 언제나 상위 스코프의 this를 가리킨다.** 이를 **Lexical this**라 한다.

```js
$completedAll.addEventListener('click', (e) => {
    console.log(this); // window
    completeAllTodos(e.target);
});

$completedAll.addEventListener('click', function (e) {
    console.log(this); // $completedAll
    completeAllTodos(e.target);
  });
```
