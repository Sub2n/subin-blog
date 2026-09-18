---
title: "24. Higher Order Function"
date: 2019-05-20
description: "고차 함수(Higher order function)함수를 인자(paremeter)로 전달받거나 함수를 결과로 반환하는 함수. 고차 함수는 parameter로 받은 함수를 필요한 시점에 호출하거나 클로저를 생성해서 리턴한다. 자바스크립트에서 함수는 FIrst-class…"
tags: ["Higher Order Function", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/20/24-Higher-Order-Function"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

#### 고차 함수(Higher order function)

함수를 인자(paremeter)로 전달받거나 함수를 결과로 반환하는 함수.

고차 함수는 parameter로 받은 함수를 필요한 시점에 호출하거나 **클로저**를 생성해서 리턴한다. 자바스크립트에서 함수는 FIrst-class object이므로 값처럼 parameter 로 전달하고 리턴할 수 있다.

고차 함수는 외부에서 전달되는 보조 함수(Helper function)에 따라서 다른 동작을 수행할 수 있다. 함수는 선언된 위치의 스코프를 기억하므로 고차 함수가 클로저를 리턴하고 끝나도 클로저에 의해 참조되고 있는 고차 함수 내부의 변수는 소멸하지 않는다. 이렇게 클로저가 참조하고 있어 스코프가 유지되는 변수를 자유 변수(Free variable)라고 한다.

```js
function makeAdder(x) {
  var y = 1;
  return function(z) {
    y = 100;
    return x + y + z;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);
```

#### 함수형 프로그래밍

-   불변성(Immutability) 지향 : 외부 상태 변경이나 가변(mutable) 데이터를 피함
-   순수 함수(Pure function) 사용 : 외부 상태를 변경하지 않는 순수 함수를 통해서 side effect를 최대한 억제

고차 함수는 순수 함수와 보조 함수의 조합을 통해 프로그램의 안정성을 높이는 함수형 프로그래밍에 기반을 두고 있다.

## 1\. Array.prototype.sort()

숫자 배열 정렬

```js
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열 오름차순 정렬
// 비교 함수의 반환값이 0보다 작은 경우, a를 우선하여 정렬한다.
points.sort(function (a, b) { return a - b; });
// ES6 화살표 함수
// points.sort((a, b) => a - b);
console.log(points); // [ 1, 2, 5, 10, 25, 40, 100 ]

// 숫자 배열에서 최소값 취득
console.log(points[0]); // 1

// 숫자 배열 내림차순 정렬
// 비교 함수의 반환값이 0보다 큰 경우, b를 우선하여 정렬한다.
points.sort(function (a, b) { return b - a; });
// ES6 화살표 함수
// points.sort((a, b) => b - a);
console.log(points); // [ 100, 40, 25, 10, 5, 2, 1 ]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100
```

객체 배열 정렬

```js
const todos = [
  { id: 4, content: 'JavaScript' },
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
];

// 비교 함수
function compare(key) {
  return function (a, b) {
    // 프로퍼티 값이 문자열인 경우, - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
    return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0);
  };
}

// id를 기준으로 정렬
todos.sort(compare('id'));
console.log(todos);

// content를 기준으로 정렬
todos.sort(compare('content'));
console.log(todos);
```

## 2\. Array.prototype.forEach(callback(currentValue\[, index\[, array\]\])\[, thisArg\])

> ### Parameter
> 
> **`callback`(currentValue\[, index, array\])**
> 
> -   `currentValue` : 현재 처리할 요소 값
> -   `index`(option) : 현재 처리할 요소의 인덱스
> -   `array`(option) : forEach()를 호출한 배열
> 
> **`thisArg` (option)**
> 
> ​ `callback`이 실행될 때 `this`로 사용할 값
> 
> ### Return Value
> 
> `undefined`

-   forEach 메소드는 for 문 대신 사용 가능
-   for 문보다 성능이 좋지는 않지만 가독성이 좋으므로 사용이 권장된다.
-   break 문을 사용할 수 없어 중단 없이 배열의 모든 요소를 순회한다.
-   IE 9 이상에서 정상 동작

```js
const numbers = [1, 2, 3, 4, 5];
let pows = [];

numbers.forEach((item) => pows.push(item ** 2));

console.log(pows);
```

-   forEach 메소드는 this를 수정할 수 없지만 callback 함수는 세 번째 인자로 넘겨받은 원본 배열과 forEach 메소드의 두번째 인자로 넘겨받은 this를 수정할 수 있다.

```js
function Square() {
  this.array = [];
}

Square.prototype.multiply = function (arr) {
  console.log(this); // multiply가 메소드로 호출되었으므로 this는 square 객체 : Square { array: [] }
  arr.forEach(function (item, index, array2) {
    console.log(this);	// Square { array: [] } (1.에서 바인딩된 this)
    console.log(array2); // [1, 2, 3]
    this.array.push(item * item);
  }, this);	// 1. this를 callback의 this로 바인딩
};

const square = new Square(); // Square { array: [] }
square.multiply([1, 2, 3]);
console.log(square.array); // [ 1, 4, 9 ]
```

## 3\. Array.prototype.map(callback(currentValue\[, index\[, array\]\])\[, thisArg\])

> ### Parameter
> 
> **`callback`(currentValue\[, index, array\])**
> 
> -   `currentValue` : 현재 처리할 요소 값
> -   `index`(option) : 현재 처리할 요소의 인덱스
> -   `array`(option) : forEach()를 호출한 배열
> 
> **`thisArg` (option)**
> 
> ​ `callback`이 실행될 때 `this`로 사용할 값
> 
> ### Return Value
> 
> 배열의 각 요소에 대해 실행한 callback의 **리턴 값**(리턴 필수)으로 이루어진 새로운 배열

## 4\. Array.prototype.filter(callback(currentValue\[, index\[, array\]\])\[, thisArg\])

> ### Parameter
> 
> **`callback`(currentValue\[, index, array\])**
> 
> -   `currentValue` : 현재 처리할 요소 값
> -   `index`(option) : 현재 처리할 요소의 인덱스
> -   `array`(option) : forEach()를 호출한 배열
> 
> **`thisArg` (option)**
> 
> ​ `callback`이 실행될 때 `this`로 사용할 값
> 
> ### Return Value
> 
> `callback` 테스트를 통과한 요소로 이루어진 새로운 배열. 조건에 부합하지 않아 리턴된 요소가 없으면 빈 배열을 리턴

```js
const result = [1, 2, 3, 4, 5].filter(function (item, index, self) {
  console.log(`[${index}] = ${item}`);
  return item % 2; // return true인 item만 새로운 배열에 추가한다.
});

console.log(result); // [ 1, 3, 5 ]
```

## 5\. Array.prototype.reduce(callback\[, initialValue\])

> ### Parameter
> 
> `callback`
> 
> -   `accumulator` : accumulator(누산기)는 callback의 리턴값을 누적한다. imitialValue가 제공된 경우에는 initialValue로 초기화되어 시작하고, 아닌 경우 callback의 이전 리턴값이다.
> -   `currentValue` : 현재 처리할 요소 값
> -   `currentIndex`(option) : 현재 처리할 요소의 인덱스. initialValue가 제공된 경우 0. 아니면 1부터 시작
> -   `array`(option) : reduce()를 호출한 배열
> 
> `initialValue`(option)
> 
> ​ `callback`의 최초 호출에서 첫번째 argument에 제공하는 초기값. 초기값을 제공하지 않을 경우 배열의 첫번쨰 요소를 사용. (빈 배열에서 초기값 없이 reduce() 호출시 에러)
> 
> ### Return Value
> 
> 누적 계산 결과 값

```js
const arr = [1, 2, 3, 4, 5];

/*
previousValue: 이전 콜백의 반환값
currentValue : 현재 처리할 배열 요소의 값
currentIndex : 현재 처리할 배열 요소의 인덱스
array        : 메소드를 호출한 배열
*/
const sum = arr.reduce(function (previousValue, currentValue, currentIndex, array) {
  console.log(previousValue + '+' + currentValue + '=' + (previousValue + currentValue));
  return previousValue + currentValue; // 결과는 다음 콜백의 첫번째 인자로 전달된다
});
/*
1+2=3
3+3=6
6+4=10
10+5=15
*/

console.log(sum); // 15: 1~5까지의 합

const max = arr.reduce(function (prev, cur) {
  return prev > cur ? prev : cur;
});

console.log(max); // 5: 최대값
```

## 6\. Array.prototype.some(callback \[, thisArg\]): boolean

배열 내 **일부 요소**가 콜백 함수의 테스트를 통과하는지 확인해서 결과를 boolean으로 반환한다.

## 7\. Array.prototype. every(callback \[, thisArg\]): boolean

배열 내 **모든 요소**가 콜백 함수의 테스트를 통과하는지 확인해서 결과를 boolean으로 반환한다.

## 8\. Array.prototype.find(callback\[, thisArg\])

> ### Parameter
> 
> **`callback`**
> 
> -   `element` : 현재 처리할 요소
> -   `index`(option) : 현재 처리할 요소의 인덱스
> -   `array`(option) : find()를 호출한 배열
> 
> **`thisArg` (option)**
> 
> ​ `callback`이 실행될 때 `this`로 사용할 객체
> 
> ### Return Value
> 
> `callback` 테스트를 통과한 첫번째 요소의 값. 못 찾으면 `undefined`

---

## Object.assign(target, …sources)

> ### Parameter
> 
> `target` : 대상 객체
> 
> `sources` : 하나 이상의 source 객체
> 
> ### Return Value
> 
> target(대상 객체)

동일한 키가 존재할 경우 target 객체의 프로퍼티는 source 객체의 프로퍼티로 덮어쓰여진다.

Object.assign() 메소드는 enumarable한 source 객체의 프로퍼티만 target 객체의 프로퍼티로 덮어쓴다. source 객체의 프로퍼티가 `null`이나 `undefined`이어도 에러를 내지 않는다.

> ### Parameter
> 
> **`callback`(currentValue\[, index, array\])**
> 
> -   `currentValue` : 현재 처리할 요소 값
> -   `index` : 현재 처리할 요소의 인덱스
> -   `array` : forEach()를 호출한 배열
> 
> **`thisArg` (option)**
> 
> `callback`이 실행될 때 `this`로 사용할 값
> 
> ### Return Value
> 
> `undefined`
