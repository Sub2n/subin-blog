---
title: "26. Destructuring"
date: 2019-05-21
description: "Destructuring구조화된 배열 / 객체를 풀어서(destructure) 개별적인 변수에 할당하는 것. 배열 / 객체 리터럴에서 필요한 값을 추출해서 변수에 할당하거나 리턴할 때 유용"
tags: ["Destructuring", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/21/26-Destructuring"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

### Destructuring

구조화된 배열 / 객체를 풀어서(destructure) 개별적인 변수에 할당하는 것. 배열 / 객체 리터럴에서 필요한 값을 추출해서 변수에 할당하거나 리턴할 때 유용

### 1\. Array Destructuring

ES6의 배열 디스트럭처링은 배열의 각 요소를 배열에서 추출해 변수 리스트에 할당한다. 배열 인덱스를 기준으로 추출, 할당한다.

이 때 할당 연산자(=)의 왼 쪽에 **배열 형태의 변수 리스트**가 와야한다.

```js
// ES6

const arr = [1, 2, 3];

const [one, two, three] = arr;
// const [one, two, three] = [1, 2, 3];

console.log(one, two, three); // 1 2 3
```

배열의 인덱스를 기준으로 **오른쪽의 배열**에서 왼쪽의 **변수 리스트**로 할당된다. 그러므로 변수의 **순서가 중요**하다.

```js
let x, y, z;

[x, y] = [1, 2]; 
console.log([x, y]); // [1, 2]

[x, y] = [1, 2, 3]; 
console.log([x, y]); // [1, 2]

[x, y] = [1]; 
console.log([x, y]); // [1, undefined]

// default 설정
[x, y = 3, z = 4] = [1];
console.log([x, y, z]); // [1, 3, 4]
```

### 2\. Object Destructuring

ES6의 객체 디스트럭처링은 객체의 각 프로퍼티를 객체로부터 추출해서 변수 리스트에 할당한다. 할당 기준은 **프로퍼티 키**이다. 할당 연산자 왼쪽에는 **객체 형태의 변수 리스트**가 필요하다.

```js
// ES6 Destructuring
const obj = { firstName: 'Subin', lastName: 'Park' };

const {firstName, lastName } = obj;

console.log(firstName, lastName); // Subin Park
```

객체 destructing의 경우 할당 기준이 프로퍼티 키이므로 **프로퍼티 키를 명시해주지 않으려면 변수명과 프로퍼티 키가 같아야 한다**. 순서는 상관 없다.

```js
const { prop1: p1, prop2: p2 } = { prop1: 'a', prop2: 'b' };
// 변수명을 prop1, prop2가 아닌 p1, p2로 하기 위해서 pro1: p1 등으로 구분해줌
console.log(p1, p2); // a, b
console.log({ prop1: p1, prop2: p2 }); // { prop1: 'a', prop2: 'b' }

// Shorthand(변수명을 프로퍼티 명과 같게 함) & default 설정
const { prop1, prop2, prop3 = 'c' } = { prop1: 'a', prop2: 'b' };
console.log({ prop1, prop2, prop3 }); // {prop1: "a", prop2: "b", prop3: "c"}
```

객체 디스트럭처링으로 객체에서 필요한 프로퍼티 키의 값만을 추출해낼 수 있다.

```js
const parts = [
    { id: 1, department: 'Human Resource', checked: false },
    { id: 2, department: 'Development', checked: true },
    { id: 3, department: 'Management', checked: false }    
];
// parts 배열의 객체 element 중에서 checked 프로퍼티의 값만을 checked라는 이름의 변수(parameter)로 받는다.
const checkedParts = parts.filter(({checked}) => checked);
console.log(checkedParts); //  { id: 2, department: 'Development', checked: true }
```

위의 예제에서 filter 함수의 callback은 argument 로 parts의 객체 element를 하나씩 받는다. parameter에 {checked} 를 정의했다는 것은 내부적으로

```js
{ checked } = { id: 1, department: 'Human Resource', checked: false };
```

가 실행되는 것과 같다. callback 함수 내에서는 checked라는 parameter 변수에 객체 element의 checked 프로퍼티의 값이 할당되어있다. 따라서 filter 실행시배열의 element 중 checked 프로퍼티의 값을 할당한 변수 checked 가 true인 객체 element만 필터링된다.

```js
const student = {
    name: 'Park',
    address: {
        zipCode: '12345',
        city: 'NewYork'
    }
};

const { address: { city } } = student;
// 왼 쪽의 city 변수에 student 객체의 address 프로퍼티의 값 객체의 city 프로퍼티의 값 'NeyWork'이 할당됨 (프로퍼티 추출)
console.log(city); // 'NewYork'
```
