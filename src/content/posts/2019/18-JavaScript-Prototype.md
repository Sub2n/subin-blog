---
title: "18. JavaScript Prototype"
date: 2019-05-12
description: "JavaScript는 명령형 (Imperative) 함수형 (Functional) 프로토타입 기반 (Prototype-based) 객체지향 프로그래밍 을 지원하는 멀티 패러다임 프로그래밍 언어. 프로토타입은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 방식이다…"
tags: ["Prototype", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/12/18-JavaScript-Prototype"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

JavaScript는

-   명령형 (Imperative)
-   함수형 (Functional)
-   프로토타입 기반 (Prototype-based) 객체지향 프로그래밍

을 지원하는 멀티 패러다임 프로그래밍 언어.

프로토타입은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 방식이다.

자바스크립트는 객체 기반 프로그래밍 언어로, 자바스크립트를 이루고 있는 거의 모든 것이 객체이다.

# 1\. Object-Oriented Programming

이전에 포스팅한 객체 지향 프로그래밍 포스팅을 참고

[4 Fundamental of Object Oriented Programming](https://sub2n.github.io/2019/04/24/4-Fundamental-of-Object-Oriented-Programming/)

객체지향 프로그래밍은 프로그래밍을 명령어 또는 함수의 목록으로 보는 명령형 프로그래밍의 절차지향적 관점에서 벗어나 **프로그램을 여러개의 독립적 객체들의 집합으로 표현**하려는 프로그래밍 패러다임을 말한다.

객체지향 프로그래밍에는 몇 가지 원칙이 있다.

-   추상화 (abstraction) : 다양한 속성 중에서 프로그램에 필요한 속성만을 간추려내어 표현하는 것을 추상화라고 한다. 불필요한 정보는 숨기고 필요한 정보만을 표현함으로써 공토
-   캡슐화 (encapsulation) : 모든 객체가 자신의 상태(state, private variavles)를 클래스 내부에 private으로 보유함으로써 지켜진다. 내부 상태를 내부 메소드로만 접근할 수 있게 한다.
-   **상속 (inheritance)** : 객체지향 프로그래밍의 핵심 개념으로 부모 객체의 프로퍼티를 자식 개체가 상속받아 그대로 사용할 수 있는 것을 말한다.
-   다형성 (polymorpism) : 부모 객체가 선언한 interface 메소드를 자식 객체가 재정의(overiding) 함으로써 하나의 interface로 상황에 따라 기능을 달리 하는 것을 말한다.

# 2\. Inheritance and Prototype

자바스크립트의 상속은 프로토타입(prototype)을 기반으로 구현된다.

상속을 사용해야 하는 이유는,

1.  동일한 프로퍼티 구조를 갖는 객체를 여러개 만들 때 모든 인스턴스가 동일한 메소드를 중복 소유하는 것은 메모리적 관점에서 비효율적이기 때문이다. 상속을 사용하면 하나의 프로토타입을 생성해 모든 인스턴스가 공유할 수 있다.
2.  인스턴스를 생성할 때마다 메소드를 생성하므로 퍼포먼스적으로도 비효율적이다. 상속은 코드의 재사용이란 관점에서 유용하다. 공통적으로 사용할 프로퍼티나 메소드를 프로토타입에 미리 구현해놓으면 생성되는 인스턴스는 메소드 생성 없이 미리 구현된 프로토타입의 프로퍼티를 사용할 수 있다.

```js
function Circle(radius) {
    this.radius = radius;
}

// Add getGeometer method to Circle's prototype object(prototype).
// The prototype is bound to the prototype property of the Circle constructor function.
Circle.prototype.getGeometer = function () {
    return 2 * this.radius;
};

const circle1 = new Circle(2);
const circle2 = new Circle(5);

// All instances of Circle constuctor have same prototype(Circle constuctor function's prototype proeprety).
console.log(Object.getPrototypeOf(circle1) === Object.getPrototypeOf(circle2)) // true
console.log(Object.getPrototypeOf(circle1) === Circle.prototype) // true
```

# 3\. prototype Object

**Prototype Object(prototype)는 Object간의 상속을 구현하기 위해 사용된다**. 프로토타입은 어떤 object의 Parent obect 역할을 하는 객체로, 다른 객체에 Shared property를 제공한다. Prototype을 상속받은 Child object는 Parent object의 프로퍼티를 자신의 프로퍼티처럼 사용할 수 있다.

모든 객체는 `[[Prototype]]` 내부 슬롯을 가지며, 내부 슬롯의 값으로 프로토타입 객체의 참조를 저장한다. 프로토타입은 객체의 생성 방식에 의해 결정된다.

객체 리터럴로 생성된 객체의 프로토타입은 **Object.prototype**이고, 생성자 함수에 의해 생성된 객체의 프로토타입은 **자신을 생성한 함수의 prototype 프로퍼티**이다.

**모든 객체는 하나의 프로토타입을 가지며 모든 프로토타입은 생성자 함수와 연결되어 있다.** 이는 객체와 프로토타입, 생성자 사이를 연결한다.

![Prototype Connection](https://user-images.githubusercontent.com/48080762/57820069-2042f600-77c6-11e9-8292-68c91244925a.png)

-   Constructor Function : prototype property가 prototype object를 가리킴
-   Constructor Function.prototype Object : constructor property가 constructor function를 가리킴
-   Obejct : \_\_ proto \_\_ Accessor property로 자신을 생성한 함수의 prototype Obect에 접근할 수 있음 (내부 슬롯 `[[Prototype]]`이 가리키고 있음)

## 3.1. Object’s \_*proto\_* Accessor Property

모든 객체는 \_\_ proto \_\_ 접근자 프로퍼티를 통해 자신의 프로토타입 (`[[Prototype]]` 내부 슬롯)에 접근할 수 있다.

#### \_*proto\_* is an Accessor Property

내부 슬롯은 프로퍼티가 아니므로 직접 접근할 수 없고 제공하는 접근자 프로퍼티를 통해서 접근할 수 있다. 접근자 프로퍼티는 접근자 함수로 구성된 프로터티다. [프로퍼티 정의 포스팅 참고](https://sub2n.github.io/2019/05/09/15-Property-Definition/)

![__proto__](https://user-images.githubusercontent.com/48080762/57598149-05397180-758d-11e9-88f0-6b24cffc4ef4.png)

Object.prototype의 \_*proto\_* 접근자 프로퍼티는 자신의 getter, settter 함수(get `__proto__`, set `__proto__`)를 통해 `[[Prototype]]` 내부 슬롯의 값, 즉 프로토타입을 가져오거나 저장한다.

> #### Internal Method \[\[GetPrototypeOf\]\] & \[\[SetPrototypeOf\]\]
> 
> get \_\_ proto \_\_는 자신의 프로토타입 취득시 \[\[GetPrototypeOf\]\] 내부 메소드를 호출
> 
> set \_\_ proto \_\_는 새로운 프로토타입 할당시 \[\[SetPrototypeOf\]\] 내부 메소드를 호출

#### 코드 내에서 \_*proto\_* 접근자 프로퍼티 직접 사용 자제

코드 내에서 \_*proto\_* 직접 사용하는 것 대신 Object.getPrototypeOf, Object.setPrototypeOf 메소드를 사용하는 것을 권장한다.

```js
function Person(name) {
	this.name = name;
}

console.log(Object.getPrototypeOf(Person) === Person.__proto__);	// true
```

#### \_*proto\_* 접근자 프로퍼티는 상속을 통해 사용됨

\_*proto\_* 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아닌, Object.prototype으로부터 상속받은 프로퍼티이다. 모든 객체는 상속을 통해서 Object.prototype.\_\_ proto \_\_ 접근자 프로퍼티를 사용할 수 있다.

![Object.prototype](https://user-images.githubusercontent.com/48080762/57592782-75d39480-7573-11e9-887c-c49eef672893.png)

> #### Prototype Chain
> 
> 모든 객체는 프로토타입 계층 구조인 프로토타입 체인에 묶여있다. 자바스크립트는 객체의 프로퍼티(메소드 포함)에 접근하려고 할 때 \_*proto\_* 접근자 프로퍼티가 가리키는 링크를 따라서 부모 프로토타입의 프로퍼티를 검색한다. 프로토타입 체인의 최상위 객체는 Object.prototype이다. 모든 객체는 Object.prototype 객체를 상속하므로 Object.prototype의 프로퍼티를 사용할 수 있다.

#### \_*proto\_* 접근자 프로퍼티를 통해서 프로토타입에 접근하는 이유

\_*proto\_* 접근자 프로퍼티를 통해서 프로토타입에 접근하면 객체들이 서로가 자신의 프로토타입이 되어 순환 참조적 프로토타입 체인이 만들어지지 않도록 에러를 발생시킨다. 프로토타입 체인이 cyclic하게 되면 프로퍼티 검색시 무한 루프에 빠진다.

즉, Object.prototype의 set \_*proto\_*() (setter function)이 객체가 프로토타입을 상호참조할 때 에러를 발생시킨다.

## 3.2. Function Object’s prototype Property

함수 객체는 \_*proto\_* 접근자 프로퍼티 외에 prototype 프로퍼티도 소유한다.

\_\_proto\_\_는 모든 객체가 가지는 자신의 프로토타입 접근자 프로퍼티이고, prototype 프로퍼티는 함수 객체가 자신이 생성할 인스턴스에 할당하는 프로토타입이다.

| 구분 | prototype 프로퍼티 | \_*proto\_* 접근자 프로퍼티 |
| :-: | :-: | :-: |
| 소유 | 함수 객체 | 모든 객체 |
| 값 | 프로토타입의 참조값 | 프로토타입의 참조값 |
| 사용 주체 | 생성자 함수 | 모든 객체 |
| 사용 목적 | 자신이 생성할 객체의 프로토타입을 할당하기 위해 사용 | 자신의 프로토타입에 접근하기 위해서 사용 |

## 3.3. Prototype’s constructor Property and the Constructor Function

함수 객체가 소유한 prototype 프로퍼티는 상속할 프로토타입을 가리킨다. 모든 프로토타입은 constructor 프로퍼티를 갖는다. constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.

![constructor Property & prototype Property](https://user-images.githubusercontent.com/48080762/57821160-75810680-77ca-11e9-8aad-04f7dbfc2800.png)

**생성자 함수가 생성될 때 암묵적으로 프로토타입과 생성자 함수 간의 연결이 이루어진다.**

# 4\. Constructor Functions and Prototypes of Objects Created by Literal Notation

생성자 함수로 만들지 않은 객체도 Object.prototype을 상속받아야하므로 Object constructor function과도 연결된다.

프로토타입과 생성자 함수는 언제나 pair로 존재해야 하기 때문에 리터럴 표기법에 의해 생성된 객체는 엄밀히 말하면 생성자 함숭 의해 생성된 객체가 아니지만, 생성자 함수의 프로토타입과 연결된다.

| Literal Notation | Constructor Function | Prototype |
| :-: | :-: | :-: |
| Object Literal | Object | Object.prototype |
| Function Literal | Function | Function.prototype |
| Array Literal | Array | Array.prototype |
| RegExp Literal | RegExp | RegExp.prototype |

# 5\. When will prototypes be created?

위에서 리터럴 표기법에 의해서 생성된 객체도 생성자 함수와 연결되는 것을 알아보았다. 생성자 함수는 사용자 정의 생성자 함수와 자바스크립트 built-in 생성자 함수로 구분할 수 있다. **프로토타입은 생성자 함수가 생성되는 시점에 생성된다.**

## 5.1. User Defined Constructor Function and Prototype Creation

화살표 함수나 ES6의 메소드 축약 표현으로 정의하지 않고 일반적으로 정의(함수 선언문, 함수 표현식)한 함수는 내부 메소드 `[[Constructor]]`가 구현되어 new 연산자와 함께 호출하면 생성자 함수로 호출할 수 있다.

생성자 함수로 호출할 수 있는 constructor는 함수 객체가 생성될 때 프로토타입도 함께 생성된다. 함수 객체는 함수 정의가 평가될 때 생성된다.

```js
// 함수 정의는 Hoisting되어 런타임 이전에 함수 객체를 생성하므로 Student.prototype도 함께 생성되어있다.
console.log(Student.prototype);

function Student(name) {
    this.name = name;
}
```

> #### 함수의 생성 시점
> 
> -   함수 선언문으로 정의한 함수
>     
>     함수 선언문으로 정의한 함수는 자바스크립트 엔진이 런타임 이전에 모든 선언문을 미리 실행할 때 평가되어 함수 객체가 된다. 이 때 생성된 함수 객체는 암묵적으로 함수명과 동일한 이름을 가진 변수에 할당된다.
>     
> -   함수 표현식으로 정의한 함수
>     
>     함수 표현식으로 정의한 함수는 런타입에 변수에 할당될 때, 즉 런타임에 할당문이 실행되는 시점에 평가되어 함수 객체가 된다.
>     

## 5.2. Built-in Constructor Function and Prototype Creation

Object, Function, Number, String, Array, RegExp, Date, Promise 등과 같은 built-in 생성자 함수도 마찬가지로 built-in 생성자 함수가 생성되는 시점에 프로토타입이 같이 생성된다. 모든 built-in 생성자 함수는 전역 객체(window)가 생성되는 시점에 생성된다. 전역 객체는 웹 애플리케이션 실행시 가장 처음으로 생성된다.

웹 애플리케이션 실행시 전역 객체 window 가 만들어지고, built-in 생성자 함수들이 만들어짐과 동시에 프로토타입 객체도 생성되어 built-in 생성자 함수의 prototype 프로퍼티에 바인딩된다.

# 6\. How to Create an Object and Determine its Prototype

객체는 다양한 방식으로 생성할 수 있다.

-   객체 리터럴
-   Object 생성자 함수
-   생성자 함수
-   Object.create 메소드
-   클래스 (ES6)

객체 리터럴로 생성하는 방식이 가장 간단한 객체 생성 방식이다. 객체 생성방식은 여러가지지만 모두 추상 연산 ObjectCreate에 의해 생성된다.

추상 연산 ObjectCreate는 필수로 자신이 생성할 객체의 프로토타입을 argument로 전달받는다. 추상 연산 ObjectCreate는 객체를 생성한 후 인수로 전달받은 프로토타입을 자신이 생성한 객체의 `[[Prototype]]` 내부 슬롯에 할당한 후, 생성한 객체를 반환한다.

ObjectCreate의 proto parameter로 전달될 argument는 객체가 생성되는 시점에, 객체 생성 방식에 따라서 결정된다.

## 6.1. Prototype of Object Created by Object Literal

자바스크립트 엔진은 객체 리터럴을 평가해서 객체를 생성할 때 추상 연산 ObjectCreate를 호출한다. 이 때 ObjectCreate에 전달되는 프로토타입은 Object.prototype이다.

즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다.

```js
const obj = {};

// 객체 리터럴에 의해 생성된 객체의 프로토타입은 Object.prototype이다.
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
// 객체 리터럴의 생성자 함수는 Object 생성자 함수와 연결된다.
console.log(obj.constructor === Object); // true
```

## 6.2. Prototype of Object Created by Object Constructor Function

Object 생성자 함수를 호출하여 객체를 생성하면 빈 객체가 생성된다. Object 생성자 함수를 호출하면 객체 리터럴을 평가할 때와 같이 추상 연산 ObjectCeate를 호출한다.

이 때 추상 연산 ObjectCreate에 전달되는 프로토타입은 Object.prototype이다.

```js
const obj = new Object;

// Object 생성자 함수에 의해 생성된 객체의 프로토타입은 Object.prototype이다.
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(obj.constructor === Object); // true
```

## 6.3. Prototype of Object Created by Constructor Function

new 연산자와 함께 생성자 함수를 호출해서 인스턴스를 생성하면 역시나 추상 연산 ObjectCreate를 호출한다.

이 때 추상 연산 ObjectCreate에 전달되는 프로토타입은 호출된 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체이다.

즉, 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩된 객체이다.

```js
function Student(name) {
    this.name = name;
}

const me = new Student('Park');

// 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩된 객체이다.
console.log(Object.getPrototypeOf(me) === Student.prototype); // true
console.log(me.constructor === Student); // true
```

생성자 함수의 prototype 프로퍼티에 바인딩된 프로토타입 객체는 프로퍼티와 메소드를 동적으로 추가할 수 있다.

# 7\. Prototype Chain

```js
function Student(name) {
    this.name = name;
}

// Student.prototype에 메소드 추가
Student.prototype.callMyName = function () {
	console.log(`Hi! I'm ${this.name}.`);
};

const me = new Student('Park');

console.log(me.hasOwnProperty('name')); // true
console.log(me.hasOwnProperty('callMyName')); // false
```

위의 예제에서 name 프로퍼티는 Student의 인스턴스인 me의 고유 프로퍼티이지만, callMyName은 me 프로토타입의 프로퍼티이므로 hasOwnProperty가 false를 리턴한다.

![Object 'me'](https://user-images.githubusercontent.com/48080762/57827129-17abe900-77e1-11e9-8512-e30fa7dd32ba.png)

그런데 hasOwnProperty는 어느 객체의 메소드인데 별다른 정의 없이 호출할 수 있는 것일까? hasOwnProperty는 Object.prototype의 메소드로, 모든 객체가 Object.prototype을 상속하므로 호출할 수 있다.

![Prototype Chain of me](https://user-images.githubusercontent.com/48080762/57827185-5d68b180-77e1-11e9-92f2-cb18be530e24.png)

조금 복잡해보이는 me 객체, me 객체의 prototype, Object.prototype의 관계를 그림으로 표현하면 아래와 같다.

![Prototype Chain](https://user-images.githubusercontent.com/48080762/57827738-7f633380-77e3-11e9-92b8-ccf1ba0c77ab.png)

자바스크립트 엔진은 객체의 프로퍼티에 접근하려고 할 때 해당 객체에서 우선 프로퍼티를 검색하고, 없으면 \_*proto\_* 접근자 프로퍼티가 가리키는 프로토타입 객체의 프로퍼티를 순차적으로 검색한다. 이렇게 연결된 프로토타입들을 프로토타입 체인이라고 한다. **프로토타입 체인은 자바스크립트가 객체 지향 프로그래밍의 상속을 구현하는 메커니즘**이다.

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. Object.prototype을 프로토 타입 체인의 종점(End ofprototype chain)이라고 한다. Object.prototype의 `[[Prototype]]`에 \_\_proto\_\_로 접근하면 null이다.

프로퍼티 체인의 끝까지 올라가 검색했는데도 프로퍼티를 찾지 못 할 경우 에러가 아니라 `undefined`를 리턴한다.

식별자의 검색은 함수의 중첩 관계로 이루어진 스코프의 계층적인 구조에서 이루어지고, 프로퍼티의 검색은 객체 간의 상속 관계로 이루어진 프로토타입의 계층적인 구조에서 이루어진다.

# 8\. Static Property/Method

Static 프로퍼티(메소드 포함)는 생성자 함수로 인스턴트를 생성하지 않아도 참조하거나 호출할 수 있는 프로퍼티를 말한다. Static 메소드 내부에는 this를 쓸 필요가 없다.

```js
// Constructor Function
function Student(name) {
    this.name = name;
}

Student.staticProp = 'static property';

Student.staticMethod = function () {
    console.log('static method');
};

Student.staticProp; // 'static property'
Student.staticMethod(); // 'static method'

const me = new Student('Park');

me.staticMethod(); // Uncaught TypeError: me.staticMethod is not a function
```

Student 생성자 함수는 객체이므로 자신의 프로퍼티와 메소드를 소유할 수 있다. 생성자 함수가 소유한 프로퍼티와 메소드를 정적 프로퍼티, 정적 메소드(Static property, method)라고 부른다. Static 프로퍼티와 메소드는 생성자 함수가 생성한 인스턴스로는 참조하거나 호출할 수 없다.

이는 프로토타입 체인을 이해하고 있다면 당연한 결과이다. 위 예제에서 인스턴스 객체 me가 프로퍼티를 검색하는 프로토타입 체인에는 Student의 staticProp와 staticMethod()가 없기 때문이다.

프로토타입 객체에 정의되어있는 메소드를 Prototype Method, 생성자 함수에 정의되어있는 메소드를 Static Method라고 한다.

# 8\. Property Existance Check : `in` Operator

in 연산자는 객체 내에 프로퍼티가 존재하는지 확인해 Boolean 값을 반환한다.

```js
const student = {
    name: 'Park',
    grade: '3'
};

console.log('name' in student); // true
console.log('grade' in student); // true
console.log('address' in student); // false
```

in 연산자는 확인의 대상이 되는 객체 (student)의 프로퍼티 뿐만 아니라 그 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다. 그 객체의 고유 프로퍼티만 검색하고 싶다면 Object.hasOwnProperty(prototype)을 사용한다.

# 9\. Property Enumeration

객체의 모든 프로퍼티를 순회하려면 for…in 문을 사용한다. for…in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다.

```js
const student = {
    name: 'Park',
    grade: '3',
    address: 'Seoul',
    age: 22
};

for (const prop in student) {
    console.log(`${prop}: ${student[prop]}`);
}
// name: Park,
// grade: 3,
// address: Seoul,
// age: 22
```

for…in 문은 객체의 프로퍼티 개수만큼 반복해서 prop에 student의 프로퍼티를 할당한다. in 연산자와 마찬가지로 순회 대상 객체의 프로퍼티 뿐만 아니라 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다. 그러나 왜 Object.prototype의 프로퍼티들은 열거되지 않았을까?

Object.prototype의 프로퍼티들의 프로퍼티 어트리뷰트 `[[Enumarable]]`의 값이 false로, 열거할 수 없도록 정의된 프로퍼티이기 때문이다.

배열에는 for…in 문 대신 일반적인 for문이나 for…of, Array.prototype.forEach 메소드를 사용하는 게 좋다.

# 10\. Disallow use of Object.prototypes builtins directly

[ESLint: no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins)

ECScript 5.1에서 Object.create가 도입되면서 특정한 `[[Prototype]]`을 지정하여 객체를 생성할 수 있게 되었다.

```js
const parent = { a: 1 };
// parent 객체를 상속받는 child 객체를 생성한다.
const child = Object.create(parent);
```

그러나 만약 Object.create()의 argument를 null로 호출할 경우 생성된 객체는 프로토타입 체인에 홀로 존재하게 된다. 즉, Object.prototype의 메소드에 접근할 수 없다.

```js
const obj = Object.create(null);

console.log(Object.getPrototypeOf(obj)); // null

// obj가 Object.prototype을 상속받지 않았으므로 obj.hasOwnProperty는 undefined이다.
obj.hasOwnProperty('bar'); // TypeError: obj.hasOwnProperty is not a function

// Object.prototype의 static method를 호출하였으므로 정상 호출된다.
Object.prototype.hasOwnProperty.call(obj, 'bar'); // false
```

게다가 Object.prototype을 상속한 객체라고 할지라도 자신의 고유 메소드로 Object.prototype의 builtin 메소드를 overriding 할 수 있다. 이를 자바스크립트에서는 Property Shadowing이라고 한다. C++에서는 Polymorphism을 구현하는 방식이 상속받은 객체의 overriding이다.

Object.prototype의 builtin 메소드를 인스턴스에서 재정의한 경우에도 의도치 않은 동작이 발생할 수 있으니, Object.prototype의 builtin 메소드는 Object.prototype의 static 메소드로서 호출하는 것이 좋다.
