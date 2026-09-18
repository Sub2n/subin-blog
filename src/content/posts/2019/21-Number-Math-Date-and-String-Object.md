---
title: "21. Number, Math and String Object"
date: 2019-05-15
description: "1. Number wrapper objectNumber 객체 : primitive type number를 다룰 때 유용한 프로퍼티와 메소드를 제공하는 wrapper 객체. 변수 또는 객체의 프로퍼티의 값이 숫자라면 Number 객체를 별도로 생성하지 않고 Number…"
tags: ["Math", "Number", "String", "Wrapper", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/15/21-Number-Math-Date-and-String-Object"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# 1\. Number wrapper object

Number 객체 : primitive type number를 다룰 때 유용한 프로퍼티와 메소드를 제공하는 wrapper 객체. 변수 또는 객체의 프로퍼티의 값이 숫자라면 Number 객체를 별도로 생성하지 않고 Number 객체의 프로퍼티와 메소드를 사용할 수 있다.

Primitive type이 wrapper 객체의 메소드를 사용할 수 있는 이유: primitive type으로 wrapper 객체의 프로퍼티나 메소드를 호출할 때 일시적으로 해당 타입과 연관된 wrapper 객체로 변환해 프로토타입 객체를 공유하기 때문.

## 1.1 Number Constructor

Number 객체는 Number() 생성자 함수를 통해 생성한다.

```js
const x = new Number(123);
const y = new Number('123');
const z = new Number('string');

console.log(x); // 123
console.log(y); // 123
console.log(z); // NaN
```

new 연산자 없이 Number() 함수를 사용하면 Number 객체가 아니라 primitive type number를 반환한다.

```js
const x = Number(123);
const y = Number('123');
const z = Number('string');

console.log(x); // 123
console.log(y); // 123
console.log(z); // NaN
```

이를 이용해 형변환을 할 수 있다.

## 1.2. Number Property

Number 객체의 프로퍼티는 static property로, Number 객체를 생성할 필요 없이 Number.propertyName의 형태로 사용한다.

> #### Static Property
> 
> Static method는 생성자 함수로 인스턴트 객체를 만들지 않아도 생성자 함수의 메소드로 직접 호출 가능하며, 생성자 함수가 생성한 인스턴스 객체에서는 사용할 수 없다.

### 1.2.1. Number.EPSILONES6

Number.EPSILON은 JavaScript에서 표현할 수 있는 가장 작은 수를 나타낸다. EPSILON은 컴퓨터에서 부동소숫점을 표현하는 데에 한계가 있기 때문에 발생하는 오차이다.

컴퓨터가 표현할 수있는 어떤 임의의 수와, 그 바로 다음으로 표현할 수 있는 수와의 차이를 EPSILON이라고 한다.

컴퓨터에서 부동소숫점 수를 비교할 때는 Number.EPSILON을 사용하여 두 수의 차이가 최소 오차인 Number.EPSILON보다 작으면 같은 수로 인정한다.

```js
console.log(0.1 + 0.2 === 0.3); // false
// 0.1 + 0.2 = 0.30000000000000004

function isEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

### 1.2.2. Number.MAX\_VALUEES1

Number.MAX\_VALUE는 JavaScript에서 사용 가능한 가장 큰 숫자를 반환한다. MAX\_VALUE보다 큰 숫자는 Infinity이다.

```js
Number.MAX_VALUE; // 1.7976931348623157e+308
const num = Number.MAX_VALUE + 1; // num = Number.MAX_VALUE
console.log(Infinity > Number.MAX_VALUE); // true
```

### 1.2.3. Number.MIN\_VALUEES1

Number.MIN\_VALUE는 JavaScript에서 사용 가능한 가장 작은 숫자를 반환한다. MIN\_VALUE는 0에 가장 가까운 양수 값이다. MIN\_VALUE보다 작은 숫자는 0으로 변환된다.

```js
Number.MIN_VALUE; // 5e-324

function MinEpsilon() {
 if (Number.MIN_VALUE > Number.EPSILON) {
	console.log('MIN_VALUE > EPSILON');
 } else if (Number.MIN_VALUE < Number.EPSILON) {
	console.log('MIN_VALUE < EPSILON');
 } else console.log('MIN_VALUE = EPSILON');
}

MinEpsilon(); // MIN_VALUE < EPSILON
```

### 1.2.4. Number.POSITIVE\_INFINITYES1

Number.POSITIVE\_INFINITY는 양의 무한대 `Infinity`를 반환한다.

```js
Number.POSITIVE_INFINITY // Infinity
```

### 1.2.5. Number.NEGATIVE\_INFINITYES1

Number.NEGTIVE\_INFINITY는 음의 무한대 `-Infinity`를 반환한다

```js
Number.NEGATIVE_INFINITY // -Infinity
```

### 1.2.6. Number.NaNES1

Number.NaN은 Not-a-Number를 나타내는 숫자값이다. Number.NaN 프로퍼티는 window.NaN 프로퍼티와 같다. NaN의 type은 number임을 명심하자.

```js
Number('abc'); // NaN
typeof NaN; // number
```

> #### isNaN method
> 
> NaN은 ==나 === 연산자로 NaN인지 판변할 수 없다. 어떤 숫자가 NaN인지 알기 위해서는 isNaN 메소드를 써야하는데, 2가지 종류가 있으며 다르게 동작하니 알아두면 좋다.
> 
> -   isNaN() (window.isNaN) : built-in 메소드로, 특이한 형변환을 수행한다.
>     -   argument가 Number 형이 아닐 경우 값을 순간적으로 Number로 형변환 한 후 NaN인지 검사한다.
>     -   즉, argument가 Number로 강제 형변환 될 경우의 NaN 여부를 반환한다.
> -   Number.isNaN() : 위의 global isNaN()의 보다 엄격한 버전으로, 주어진 값이 NaN인지 검사한다.
>     -   개선된 점으로 argument가 Number 형이고 값이 NaN일 때만 true를, 아니면 false를 반환한다.
>     -   즉, argument를 강제로 Number 형으로 변환하지 않고 Number 형이 아닌 argument를 전달받을 경우 false를 반환한다.

## 1.3. Number Method

Number 객체의 메소드

### 1.3.1. Number.isFinite(testValue: number): boolean ES6

Number.isFinite() 메소드는 parameter에 전달된 값이 정상적인 유한수인지를 검사하고 결과를 Boolean으로 리턴한다.

Number.isFinite()는 전역 함수 isFinite()와 달리 argument를 숫자로 강제 형변환 하지 않는다. 숫자가 아닌 argument가 들어오면 언제나 false를 리턴한다.

```js
Number.isFinite(Infinity); // false
Number.isFinite(NaN); // false
Number.isFinite(Number.EPSILON); // true
Number.isFinite(0); // true
Number.isFinite('0'); // false

// isFinite()와 Number.isFinite()
isFinite(null); // true
Number.isFinite(null); // false
```

### 1.3.2. Number.isInteger(testValue: number): boolean ES6

Number.isInteger() 메소드는 parameter에 전달된 값이 정수(Integer)인지 검사하고 결과를 Boolean으로 리턴한다. 이 또한 검사 전에 argument를 강제로 Number 형으로 변환하지 않는다.

```js
Number.isInteger(3.14); // false
Number.isInteger(3.0000); // true
Number.isInteger(3); // true
Number.isInteger(NaN); // false
Number.isInteger('string'); // false
```

### 1.3.3. Number.isNaN(testValue: number): boolean ES6

Number.isNaN() 메소드는 parameter에 전달된 값이 NaN인지를 검사하고 결과를 Boolean으로 리턴한다. 검사 전에 argument를 숫자로 변환하지 않는다. global isNaN()과 다르다.

```js
Number.isNaN(true); // false
Number.isNaN(null); // false
Number.isNaN(Infinity); // false
Number.isNaN(37); // false
Number.isNaN(NaN); // true
Number.isNaN('string'); // false
```

### 1.3.4. Number.isSafeInteger(testValue: number): boolean ES6

Number.isSafeInteger() 메소드는 parameter에 전달된 값이 정수 표현 범위 내의 안전한 정수 값인지 검사하고 결과를 Boolean으로 리턴한다. 역시 검사 전에 argument를 숫자로 변환하지 않는다.

안전한 정수 값은 -(253 - 1) 이상 (253 - 1) 이하의 정수를 말한다.

```js
Number.isSafeInteger(2**53); // false
Number.isSafeInteger(2**53 - 1); // true
Number.isSafeInteger(-(2**53)); // false
Number.isSafeInteger(-(2**53 - 1)); // true
Number.isSafeInteger(Infinity); // false
```

### 1.3.5. Number.prototype.toExponential(fractionDigits?: number): string ES3

Number.prototype.toExponential() 메소드는 호출 대상을 지수 표기법으로 변환하여 문자열로 리턴한다. 지수 표기법(Exponential Notation)이란 큰 숫자를 표기할 때 e(Exponent) 앞에 있는 숫자에 10의 n 제곱을 하는 형식으로 수를 나타내는 방식이다.

```
12345 = 1.2345e+3

0.0000891 = 8.91e-5
```

```js
0.0000891.toExponential() // "8.91e-5"
12345.toExponential() // SyntaxError: Invalid or unexpected token
12345 .toExponential() // "1.2345e+4"
12345.0.toExponential() // "1.2345e+4"
```

`12345.toExponential()`이 SyntaxError를 발생시키는 이유는 무엇일까? 다른 객체와 달리 숫자값 뒤의 `.`는 2가지 의미를 가진다.

1.  부동소숫점의 소숫점 구분 기호
2.  객체 프로퍼티에 접근하기 위한 마침표 표기법(Dot Notation)

자바스크립트 엔진은 숫자 뒤의 `.`를 부동 소숫점 숫자의 일부로 해석한다. 따라서 12345.`toExponential()`이 숫자가 아니기 때문에 문법 오류로 SyntaxError가 발생하는 것이다.

그렇다면 `12345 .toExponential()`이 에러를 발생시키지 않는 이유는 무엇일까? `.`가 숫자 바로 뒤에 오는 것이 아니기 때문에 객체 프로퍼티 접근을 위한 Dot Notation으로 해석했기 때문이다.

```js
Object         .prototype === Object.prototype; // true
Object.                 prototype === Object.prototype; //true
Object         .     prototype === Object.prototype; // true
// 띄어쓰기는 Dot Notation에 영향을 주지 않지만 굳이 그렇게 써야할 필요가 없다.
```

정수 리터럴에 Number.prototype의 메소드를 사용할 경우 아래처럼 괄호로 묶는 것이 권장된다.

```js
(12345).toExponential()
```

### 1.3.6. Number.prototype.toFixed(fractionDigits?: number): string ES3

Number.prototype.toFixed() 메소드는 parameter로 지정된 소숫점 자리를 반올림해서 문자열로 리턴한다.

```js
const num = 12345.6789;

// default: 0
// 소숫점 이하 반올림
console.log(num.toFixed()); // '12346'
// 소숫점 이하 1자리수에서 반올림
console.log(num.toFixed(1)); // '12345.7'
// 소숫점 이하 2자리수에서 반올림
console.log(num.toFixed(2)); // '12345.68'
// 소숫점 이하 3자리수에서 반올림
console.log(num.toFixed(3)); // '12345.679'
// 소숫점 이하 4자리수에서 반올림
console.log(num.toFixed(4)); // '12345.6789'
```

## 1.3.7. Number.prototype.toPrecision(precision?: number): string ES3

Number.prototype.toPrecision() 메소드는 parameter로 지정된 전체 자릿수(소숫점 자리 아님)까지만 유효하도록 나머지 자릿수를 반올림해서 문자열로 리턴한다. 표현할 수 없는 경우 지수 표기법(Exponential Notation)으로 결과를 반올림한다.

```js
const num = 12345.6789;

// default: 전체 자릿수
// 전체 자릿수 유효
console.log(num.toPrecision()); // '12345.6789'
// 전체 1 자릿수만 유효
console.log(num.toPrecision(1)); // '1e+4'
// 전체 2 자릿수만 유효
console.log(num.toPrecision(2)); // '1.2e+4'
// 전체 3 자릿수만 유효
console.log(num.toPrecision(3)); // '1.23e+4'
// 전체 4 자릿수만 유효
console.log(num.toPrecision(4)); // '1.235e+4'
// 전체 5 자릿수만 유효
console.log(num.toPrecision(5)); // '12346'
```

### 1.3.8. Number.prototype.toString(radix?: number): string ES1

Number.prototype.toString() 메소드는 숫자를 문자열로 변환해서 리턴한다. radix로 진법(2 ~ 36: 기본 10진수)을 지정할 수 있지만 생략 가능하다.

```js
const num = 17;

console.log(num.toString()); // '17'
console.log(num.toString(2)); // '10001'
console.log(num.toString(8)); // '21'
console.log(num.toString(16)); // '11'
```

### 1.3.9. Number.prototype.valueOf(): number ES1

Number.prototype.valueOf() 메소드는 Number 객체의 primitive value를 리턴한다.

```js
const numObj = new Number('30');
const num = numObj.valueOf();

typeof numObj; // object
typeof num; // number
```

# 2\. Math Object

Math Object : 수학 상수와 함수를 위한 프로퍼티와 메소드를 제공하는 built-in 객체.

Math 객체의 프로퍼티와 메소드는 전부 static 프로퍼티와 메소드이다. 생성자 함수 또한 존재하지 않아 직접 Math.property, Math.method()로 호출하면 된다.

## 2.1. Math Property

## 2.1.1.Math.PI

Math.PI는 PI값(π)을 리턴한다.

```js
Math.PI; // 3.141592653589793
```

## 2.2. Math Method

### 2.2.1. Math.abs(x: number): number ES1

Math.abs() 메소드는 숫자의 절댓값(Absolute Value)을 리턴한다. Number.prototype의 메소드처럼 엄격한 type 검사를 하지 않는다.

```js
Math.abs(-1); // 1
Math.abs('-1'); // 1
Math.abs(-Infinity); // Infinity
Math.abs('-Infinity'); // Infinity
Math.abs(null); // 0
Math.abs([]); // 0
Math.abs({}); // 0
Math.abs(undefined); // NaN
Math.abs('string'); // NaN
Math.abs(); // NaN
```

### 2.2.2. Math.round(x: number): number ES1

Math.round() 메소드는 숫자를 가장 인접한 정수로 올림 또는 내림 한다.

```js
Math.round(10.4); // 10
Math.round(10.499999999999999); // 10
Math.round(10.4999999999999992); // 11
Math.round(-10.5); // -10
Math.round(-10.500000000000001); // -11
Math.round(-10.6); // -11
```

### 2.2.3. Math.sqrt(x: number): number ES1

Math.sqrt() 메소드는 숫자의 양의 제곱근(square root)을 리턴한다.

```js
Math.sqrt(16); // 4
Math.sqrt(-16); // NaN
Math.sqrt('16'); // 4
Math.sqrt(Infinity); // Infinity
Math.sqrt(null); // 0
Math.sqrt([]); // 0
Math.sqrt({}); // NaN
```

### 2.2.4. Math.ceil(x: number): number ES1

Math.ceil() 메소드는 숫자를 자신과 가장 가까우면서 큰 정수로 올림한다. Ceil은 천장을 뜻하니 올림한다고 생각하자.

```js
Math.ceil(3.14); // 4
Math.ceil(-3.14); // -3
```

### 2.2.5. Math.floor(x: number): number ES1

Math.floor() 메소드는 숫자를 자신과 가장 가까우면서 작은 정수로 내림한다. Floor는 바닥을 뜻한다.

```js
Math.floor(3.14); //3
Math.floor(-3.14); // -4
```

### 2.2.6. Math.random(): number ES1

Math.random() 메소드는 0 이상 1 미만의 임의의 숫자를 리턴한다. 0은 포함하지만 1은 포함하지 않는다는 것에 유의하자. Math.random() 메소드의 결과에 원하는 숫자를 곱해서 PesudoRandom 수를 자유자재로 얻을 수 있다.

```js
Math.random(); // 0 이상 1 미만의 소수

// 1부터 10까지의 랜덤 정수
Math.floor(Math.random() * 10 + 1);
Math.ceil(Math.random() * 10);
```

### 2.2.7. Math.pow(x: number, y: number): number ES1

Math.pow(base, exponent) 메소드는 첫번째 argument를 밑(base), 두번째 argument를 지수(exponent)로 한 거듭제곱을 리턴한다.

```js
Math.pow(2, 8); // 256

// ES7 Exponentiation Operator
2 ** 8; // 256
```

### 2.2.8. Math.max(… values: number\[\]): number ES1

Math.max() 메소드는 argument들 중 가장 큰 수를 리턴한다.

```js
Math.max(1, 2, 3, 4, 5); // 5
Math.max([1, 2, 3, 4, 5]); // NaN

const arr = [1,2,3,4,5];
Math.max.apply(null, arr); // 5

// ES6 Spread Opertator
Math.max( ... arr); // 5
```

Math.max 의 argument로 배열을 전달할 수 없기 때문에 Function.prototype.apply() 메소드를 이용해서 배열 argument를 전달할 수 있었다.

그러나 ES6에서는 Spread Operator의 도입으로 apply() 메소드를 사용하지 않아도 배열을 열거된 list argument처럼 풀어서 전달할 수 있다.

### 2.2.9. Math.min(… values: number\[\]): number ES1

Math.min() 메소드는 argument들 중 가장 작은 수를 리턴한다. 사용법은 Math.max와 같다.

# 3\. String Object
