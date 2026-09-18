---
title: "22. Regular Expression"
date: 2019-05-19
description: "Regular Expression정규 표현식은 문자열에서 특정 내용을 찾거나 바꾸거나 뽑아내는 데에 사용된다. 아이디나 이메일, 비밀번호 등의 유효성 검사에 정규 표현식을 사용할 수 있다. 자주 사용하는 정규 표현식은 간단한 구글 검색으로 찾을 수 있지만, 표현식…"
tags: ["RegExp", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/19/22-Regular-Expression"
legacy: true
thumbnail: "/gallery/thumbnails/yellow.png"
---

# Regular Expression

정규 표현식은 문자열에서 특정 내용을 찾거나 바꾸거나 뽑아내는 데에 사용된다.

아이디나 이메일, 비밀번호 등의 유효성 검사에 정규 표현식을 사용할 수 있다. 자주 사용하는 정규 표현식은 간단한 구글 검색으로 찾을 수 있지만, 표현식 구성법에 대해서 우선 정리해볼 것이다.

## How to make Regular Expression?

정규 표현식을 생성하는 가장 간단한 방법은 리터럴 표기법이다.

RegExp.prototype.exec, RegExp.prototype.test, String.prototype.match, String.prototype.replace, String.prototype.search, String.prototype.split 등의 메소드에서 정규 표현식을 사용할 수 있다.

```js
// '/(pattern)/(flag: i, g, m)'

const targetStr = 'I like koala.'
const regExp = /k/ig;	// 정규 표현식

// RegExp.prototype methods
console.log(regExp.exec(targetStr)); // ["k", index: 4, input: "I like koala.", groups: undefined]
console.log(regExp.test(targetStr)); // true

// String.prototype methods
console.log(targetStr.match(regExp)); // (2) ["k", "k"]
console.log(targetStr.replace(regExp, 'K')); // I liKe Koala.
console.log(targetStr.search(regExp)); // 4
console.log(targetStr.splitgExp)); // (3) ["I li", "e ", "oala."]
```

## 1.1. Flag

정규 표현식의 플래그에는 다음과 같은 종류가 있다.

-   i
    -   Ignore Case
    -   대소문자를 구별하지 않고 검색
-   g
    -   Globl
    -   문자열 내의 모든 패턴을 검색
-   m
    -   Multi Line
    -   문자열의 행이 바뀌더라도 계속 검색

플래그는 옵션으로, 플래그를 사용하지 않으면 첫번째 매칭된 대상만 검색하고 끝낸다.

## 1.2. Pattern

정규 표현식의 패턴으로 검색할 문자열을 지정한다. 패턴은 특별한 의미를 가진 Meta Character 또는 기호로 표현할 수 있다.

1.  `.` : 임의의 문자 한 개
2.  \[A-Z\] : A ~ Z가 한 번 이상 반복되는 문자열. `[]` 안에 `-` 쓰면 범위 지정
3.  `*` / `+`
    -   `*` : 0개 이상 반복되는 패턴
    -   `+` : 1개 이상 반복되는 패턴
4.  `[]` : \[\] 내의 문자는 or로 동작
5.  `{2, 3}` : 2 ~ 3 자리
6.  \\d, \\D
    -   \\d : 숫자
    -   \\D : 숫자가 아닌 문자
7.  \\w, \\W
    -   \\w : 알파벳과 숫자
    -   \\W : 알파벳과 숫자가 아닌 문자
8.  \\s
    -   여러가지 공백 문자 (space, tab 등) \[\\t\\r\\n\\v\\f\]
9.  `^`
    -   `[^]`는 not
    -   `[]` 밖의 `^`는 문자열의 처음을 의미
10.  `$`
     -   문자열의 끝을 의미

## 1.3. Well Used Reguler Expression

특정 단어로 시작하는지 검사

```js
// 문자열이 'http'로 시작하는지 검사
const regexr = /^http/;
```

특정 단어로 끝나는지 검사

```js
// 문자열이 'html'로 끝나는지 검사
const regexr = /html$/;
```

아이디 유효성 검사

```js
// 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4 ~10자리인지 검사
// {4,10}: 4 ~ 10자리
const regexr = /^[A-Za-z0-9]{4,10}$/;
```

메일 주소 유효성 검사

```js
const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
```

핸드폰 번호 유효성 검사

```js
const regexr = /^\d{3}-\d{3,4}-\d{4}$/;
```

특수 문자 포함 여부 검사

```js
// A-Za-z0-9 이외의 문자가 있는지 검사
let regexr = /[^A-Za-z0-9]/gi;

// 아래 방식도 동작한다. 이 방식의 장점은 특수 문자를 선택적으로 검사할 수 있다.
regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
```
