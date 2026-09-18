---
title: "19. Global Object"
date: 2019-05-15
description: "전역 객체는 어떤 객체보다도 먼저 생성하고 어느 객체에도 속하지 않는 최상위 객체. client side 환경(브라우저)에서는 window server side 환경에서는 global 객체"
tags: ["window", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/15/19-Global-Object"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

전역 객체는 어떤 객체보다도 먼저 생성하고 어느 객체에도 속하지 않는 최상위 객체.

-   client side 환경(브라우저)에서는 window
    
-   server side 환경에서는 global 객체
    

전역 객체는

-   개발자가 의도적으로 생성할 수 없다.
-   전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.
-   전역 객체는 Object, String, Number,Boolean, Function, Array RegExp, Date, Math, Promise 등 모든 built-in 객체를 프로퍼티로 가지고 있다.
-   브라우저의 window 객체는 DOM, BOM, Canvas, XMLHttpRequest, Fetch, SVG, Web Storage 등 Client side Web API를 프로퍼티로 소유한다.
-   var 키워드로 선언한 전역 변수와 암묵적 전역 변수, 전역 함수는 전역 객체의 프로퍼티가 된다. (단, let이나 const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.)
-   전역 객체의 프로퍼티와 메소드는 window를 생략하고 참조/호출 할 수 있으므로 전역 함수처럼 사용할 수 있다.

# 1\. Global Property

전역 프로퍼티는 전역 객체의 프로퍼티이다.

## 1.1. Infinity

Infinity 프로퍼티는 양/음의 무한대를 나타내는 Number Infinity를 갖는다. 숫자를 0으로 나누면 NaN이 될 것 같지만 무한대를 나타낸다.

```js
console.log(4/0);	// Infinity
console.log(4/-0);	// -Infinity
console.log(typeof Infinity);	// number
```

## 1.2. NaN

NaN(Not-a-Number) 프로퍼티는 숫자가 아님을 나타내는 Number NaN을 갖는다.

```js
console.log(Number('string'));	// NaN
console.log(1 * 'string'); // NaN
console.log(typeof NaN);	// number
```

## 1.3. undefined

undefined 프로퍼티는 primitive type undefined를 값으로 갖는다.

# 2\. Global Function

전역 함수는 전역 객체의 메소드이다. 애플리케이션 전역에서 호출할 수 있다.

## 2.1. eval

문자열로 코드를 주면 그 코드를 실행하는데, 평가시 자신의 스코프를 만들고 상위 스코프로 변형시켜 비용이 많이 든다.

## 2.2. isFinite

parameter에 전달된 값이 정상적인 유한수인지 검사해서 Boolean을 리턴한다. 숫자가 아닌 값 전달받으면 숫자 타입으로 변환 후 검사를 수행한다.

## 2.3. isNaN

parameter에 전달된 값이 NaN인지 검사해서 Boolean을 리턴한다. 숫자가 아닌 값 전달받으면 숫자 타입으로 변환 후 검사를 수행한다.

## 2.4. parseFloat

parameter에 전달된 **String을 부동소숫점 숫자(floating point number)로** 변환하여 반환한다.

## 2.5. parseInt

parameter에 전달된 **String을 정수형 숫자(Integer)로** parsing하여 리턴한다. 리턴값은 10진수이다.

10진수 숫자를 10진수가 아닌 수의 문자열로 변환하고 싶을 때는 Number.prototype.toString 메소드를 사용한다.

```js
const x = 10;

console.log(x.toString(2));	// '1010'
console.log(x.toString(8));	// '12'
console.log(x.toString(16));	// 'a'
console.log(x.toString());	// '10'
```

## 2.6. encodeURI / decodeURI

encodeURI 함수는 paremeter로 전달된 URI(Uniform Resource Identifier)를 인코딩한다.

> #### URI (Uniform Resource Identifier)
> 
> 인터넷에 있는 자원을 나타내는 유일한 주소. URI의 하위 개념으로 URL, URN이 있다.
> 
> -   Scheme(protocol) : 통신 방식
> -   Host : 찾아갈 server의 주소
>     -   localhost : 컴퓨터 한 대에서 client와 server를 동시에 돌릴 때 server를 의미. Port 번호로 server에 고유 번호를 매김
> -   Port : port 번호
> -   Path : file 경로
>     -   REST API : 서버와 통신시 메소드 호출방식처럼 사용
> -   Query Parameter : ?key=value&key=value&key=value
> -   Fragment : # page 내 이동에서 씀

인코딩이랑 URI의 문자들을 Escape 처리 하는 것을 의미한다. Escape 처리는 네트워크를 통해 정보를 공유할 때 ASCII Character-set으로 변환하는 것이다. 한글은 %EC%9E%90 등과 같이 인코딩 된다.

decodeURI 함수는 paremeter로 전달된 encoded URI을 전달받아 escape 처리 되기 전으로 디코딩한다.
