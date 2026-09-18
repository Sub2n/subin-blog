---
title: "35. Closure"
date: 2019-06-07
description: "Purpose of Closure: Maintain Status클로저의 주된 목적은 안전한 상태 유지를 하는 것이다. 다른 객체지향 프로그래밍 언어의 경우 private, public, protect 등의 접근 제한자(Access Specifier)를 제공하지만…"
tags: ["자바스크립트"]
categories: ["JavaScript"]
path: "2019/06/07/35-Closure"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

## Purpose of Closure: Maintain Status

클로저의 주된 목적은 **안전한** 상태 유지를 하는 것이다. 다른 객체지향 프로그래밍 언어의 경우 private, public, protect 등의 접근 제한자(Access Specifier)를 제공하지만 자바스크립트에는 그런 기능이 없다. (ES6의 Class에 private이 도입된다고 하지만 아직 완벽하게 적용되지 않음) 자바스크립트의 클로저를 사용하면 상태를 안전하게 유지할 수 있다.

## What is Closure?

> “A closure is the combination of a function and the lexical environment within which that function was declared.”
> 
> 클로저는 함수와 그 함수가 선언된 Lexical Environment의 조합이다.

### 함수가 선언된 Lexical Environment

함수 내부에서 정의된 함수를 중첩 함수(nested function)라고 한다. 함수 정의는 평가되어 함수 객체가 된다. **함수 객체는 생성되는 시점에 실행중인 실행 컨텍스트(running execution context)의 LexicalEnvironment를 자신의 상위 스코프로 가진다.** 함수 객체의 내부 슬롯 `[[Environment]]`에 running execution context의 LexicalEnvironment이 저장된다. 즉, 함수는 호출과 무관하게 선언된 위치에서 평가되어 함수 객체가 될 때 자신의 상위 스코프를 `[[Environment]]`에 저장한다. 이는 함수 객체가 소멸되기 전까지 유지되며 함수가 호출될 때마다 참조하여 상위 스코프로 삼는다. 함수가 호출되어 실행 컨텍스트가 생성될 때 Lexical Environment의 OuterLexicalEnvironmentReference에 그 함수의 `[[Environment]]`에 저장된 Lexical Environment의 참조값을 저장한다. 이렇게 함수가 어디서 호출되는지에 상관 없이 **정의된 위치로 스코프를 결정하는 것을 Lexical Scope**(또는 Static Scope)라고 한다.

스코프의 실체는 렉시컬 환경이다.

### 함수 객체의 내부 슬롯 `[[Environment]]`

모든 함수 객체는 자신의 내부 슬롯 `[[Environment]]`에 상위 스코프의 참조, 즉 생성될 때 실행중이던 실행 컨텍스트의 Lexical Environment의 참조를 저장한다.

그리고 함수가 호출되어 평가될 때 생성되는 실행 컨텍스트의 OuterLexicalEnvironmentReference로 `[[Environment]]` 내부 슬롯에 저장해놓은 Lexical Environment를 바인딩해 스코프 체인을 구성한다.

## Closure and Lexical Environment

자바스크립트에서 함수는 1급 객체(First-class Object)이므로 값처럼 취급된다. 따라서 함수에서 함수 객체를 argument로 받거나 리턴하는 것이 가능하다. 함수를 argument로 받거나 리턴하는 함수를 고차 함수(Higher Order Function)라고 한다.

```js
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// 함수 outer를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 함수 outer의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop된다. (life cycle 마감)
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

③에서 outer 함수는 중첩 함수 inner를 리턴하고 종료한다. 함수가 종료하면 실행 컨텍스트가 실행 컨텍스트 스택에서 pop된다. 소멸되는 것이다. 일반적인 함수의 경우 실행 컨텍스트가 소멸할 때 Lexical Environment도 같이 소멸한다.

그러나 위의 outer 함수처럼 **자신의 중첩 함수를 리턴하며 종료하는 경우**, outer의 실행 컨텍스트는 소멸하더라도 중첩 함수 inner가 내부 슬롯 `[[Environment]]`로 outer의 Lexical Environment를 참조하고 있으므로 Reference Count가 남아있는 **outer의 Lexical Environment는 소멸하지 않는다**.

따라서 inner 함수가 호출되어 inner 실행 컨텍스트를 생성할 때마다 outer의 Lexical Environment를 자신의 상위 스코프로 삼고 outer의 변수를 참조할 수 있는 것이다. outer의 x와 같은 변수를 자유 변수(free variable)라고 한다.

outer는 종료했으므로 outer의 Lexical Environment에 접근할 수 있는 것은 참조값을 가지고 있는 inner 함수 뿐이다. 따라서 outer 내부의 상태가 안전하게 유지된다.

이론적으로 모든 함수는 기본적으로 클로저이지만, 모던 브라우저에서는 상위 스코프의 식별자를 참조하지 않는 중첩 함수의 경우 해당 함수의 외부 Lexical Environment를 유지하지 않는다. 또한 외부 함수 내부에서 호출되는 등, 외부 함수와 life cycle을 함께 하는 중첩 함수도 클로저라고 하지 않는다.  
따라서 일반적으로 **클로저**는 **자신의 외부 함수보다 오래 살아남고**, 자신이 기억하는 **상위 스코프의 식별자를 참조하는 함수**를 말한다.

## Usage of Closure

클로저는 상태를 안전하게 유지하기 위해서 사용한다. 즉, 상태가 의도치 않게 변경되지 않도록 정보 은닉(Information hiding)을 통해 캡슐화(Encapsulation) 하는 것이다.

어떤 상태를 안전하게 유지하기 위해서는 그 상태에 접근할 수 있는 방법을 제한해야한다. 즉, 상태 변경을 위해서 사용하는 메소드를 제외한 다른 외부로부터 상태를 숨겨야 한다.

```html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const counter = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      // 클로저를 메소드로 갖는 객체를 반환한다.
      // 객체 리터럴은 스코프를 만들지 않는다.
      // 따라서 아래 메소드들의 상위 스코프는 즉시 실행 함수의 스코프이다.
      return {
        // num: 0, // 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
        increase() {
          $counter.textContent = ++num; // 상태 변경
        },
        decrease() {
          if (num <= 0) return;
          $counter.textContent = --num; // 상태 변경
        }
      };
    }());

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
```

위의 스크립트가 실행되면 IIFE(즉시 실행 함수)가 호출되고 **리턴문이 실행될 때 리턴하는 객체가 생성된다**. **객체가 생성될 때 객체의 메소드인 increase와 decrease 함수 객체 또한 생성된다**. 이 때 increase와 decrease 함수는 자신이 정의될 때의 running execution context인 IIFE 실행 컨텍스트의 Lexical Environment를 `[[Environment]]`에 기억한다. 그러므로 IIFE는 한 번 호출되고 종료했지만 리턴되어 counter 변수에 저장된 객체의 메소드로서 increase, decrease 함수가 호출될 때마다 IIFE의 Lexical Environment에 등록된 num에 접근하고 상태를 변경할 수 있는 것이다. 다시 말하면 increase, decrease 함수 외에는 num에 접근할 방법이 없으므로 num의 상태가 안전하게 유지된다.

이를 생성자 함수로 바꾸면 객체의 프로퍼티는 public이므로 다음과 같이 구현해야 한다.

```html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const Counter = (function () {
      // ① 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      function Counter() {
        // this.num = 0; // ② 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
      }

      Counter.prototype.increase = function () {
        $counter.textContent = ++num;
      };

      Counter.prototype.decrease = function () {
        if (num <= 0) return;
        $counter.textContent = --num;
      };

      return Counter; // Counter.prototype에 method 정의했으므로 Counter 함수 객체만 리턴
    }());

    const counter = new Counter();

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
```

생성자 함수의 프로퍼티가 아니라 자유 변수로 상태를 안전하게 유지한다. Counter.prototype의 메소드는 IIFE에서 정의되었으므로 IIFE의 변수 num에 접근할 수 있다.

#### 함수형 프로그래밍

변수의 사용을 가급적 자제하고, 상태 변화를 최소화 시키는 방법으로 프로그래밍 한다. mutable data를 피하고 **immutable을 지향**하는 함수형 프로그래밍에서 프로그래밍의 안정성을 높이기 위해 클로저는 적극적으로 사용된다. mutable value는 참조값이 전달되므로(Pass by reference) shared data가 되어 상태 변화의 위험성이 높아진다. 또한 외부 상태가 아니라 자신의 지역변수만을 변경시키는 pure function (순수 함수)의 사용을 지향한다.

```js
// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 클로저로서 카운트 상태를 유지하기 위한 자유 변수 counter을 기억한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인자로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인자로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
```

## Closure Mistake

```js
const arr = [];
for (var i = 0; i < 5; i++) {
    arr[i] = function() {
        return i;
    }
}
for (var j = 0; i < 5; j++) {
    console.log(arr[j]()); // 5 5 5 5 5
}
```

위 예제의 실행 결과는 5 5 5 5 5이다. 이유는 `var` 키워드로 선언한 i는 block-level scope를 지원하지 않기 때문이다. 즉, for문의 block이 scope를 만들지 않아서 arr의 element에 저장된 함수 객체들이 자신의 상위 스코프로 전역 렉시컬 환경을 기억한다.

이는 for 문 내부의 선언문에 `let` 키워드를 사용함으로써 보완할 수 있다.

```js
const arr = [];
for (let i = 0; i < 5; i++) {
    arr[i] = () => i;
}
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]()); // 0 1 2 3 4
}
```

for 문은 자바스크립트 엔진에 의해 평가될 때 내부 선언문이 `let`인지, `var`인지, expression인지에 따라서 다르게 동작한다. `let` 키워드로 선언된 선언문일 경우 block-level scope를 만들어야하므로 LOOP Lexical Environment를 우선 생성하고 i를 환경 레코드에 등록한다. 그리고 나서 for문의 body를 평가하고 실행하는데 한 반복 당 하나의 per Iteration Lexical Environment를 생성하고, i의 값이 유효한지 검사하고, statement를 실행한 후 다음 반복을 위한 per Iteration Lexical Environment를 생성하고 increment를 진행한다. 이를 반복한다. 따라서 각 Iteration에서 생성된 함수는 각각 다른 Lexical Environment를 자신의 `[[Environment]]`로 참조하고 있기 때문에 원하는 결과를 얻을 수 있는 것이다.

비슷하게 Iterable에 사용할 수 있는 for of 문, 객체의 프로퍼티 순회에 사용할 수 있는 for in 문 내부의 선언문에 `const` 키워드를 사용할 수 있다.

```js
const o = { a: 1, b: 2 };
for (const key in o) {
    console.log(o[key]);
}

const arr = [ 1, 2, 3 ];
for (const item of arr) {
    console.log(item);
}
```

이는 for of, for in 문의 선언부의 선언문은 for문 body 가장 상단에서 실행되는 것과 같이 동작하기 때문이다. 즉, 반복하는 횟수만큼 선언된다.
