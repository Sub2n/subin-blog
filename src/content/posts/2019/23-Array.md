---
title: "23. Array"
date: 2019-05-19
description: "자바스크립트에서는 배열(Array)도 객체이다. 배열은 Array 생성자로 생성된 Array type의 객체이며 프로토타입 객체로 Array.prototype을 가진다."
tags: ["Array", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/19/23-Array"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

자바스크립트에서는 배열(Array)도 객체이다. 배열은 Array 생성자로 생성된 Array type의 객체이며 프로토타입 객체로 Array.prototype을 가진다.

# 1\. Creation of Array

## 1.1. Array Literal

Array literal은 0개 이상의 값을 쉼표(,)로 구분하여 대괄호(\[\])로 묶는다. 배열은 index를 가지며, 첫번째 값은 index 0으로 읽을 수 있다. 존재하지 않는 index로 접근하면 `undefined`를 리턴한다.

배열은 순회할 수 있으므로 길이를 나타내는 length 프로퍼티를 가진다.

```js
const arr = [];

console.log(arr[1]); // undefined
console.log(arr.length); // 0
```

객체가 프로퍼티의 키와 값을 가지고 프로퍼티 키로 값에 접근하는 반면 배열은 요소의 index로 요소의 값에 접근할 수 있다. Index는 0부터 시작한다.

다른 프로그래밍 언어와 다르게 자바스크립트의 배열은 서로 다른 데이터 타입의 원소들을 함께 포함할 수 있다.

## 1.2. Array() Constructor Function

배열은 보통 배열 리터럴 방식으로 생성하지만 Array 생성자 함수를 사용해서 생성할 수도 있다.
