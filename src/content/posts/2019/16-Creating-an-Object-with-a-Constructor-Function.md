---
title: "16. Creating an Object with a Constructor Function"
date: 2019-05-10
description: "객체 리터럴 표기법은 가장 일반적이고 간단한 객체 생성 방법이다. 객체는 객체 리터럴 표기법 외에도 다양한 방법으로 생성할 수 있다. 객체를 생성하기 위한 용도로 사용되는 함수를 생성자 함수라고 한다."
tags: ["Object", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/10/16-Creating-an-Object-with-a-Constructor-Function"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

객체 리터럴 표기법은 가장 일반적이고 간단한 객체 생성 방법이다. 객체는 객체 리터럴 표기법 외에도 다양한 방법으로 생성할 수 있다.

객체를 생성하기 위한 용도로 사용되는 함수를 생성자 함수라고 한다.

# 1\. Object Constructor Function

객체 리터럴 표기법은 분명 간단한 방법이지만, 같은 구조를 가진 객체를 **여러 개** 만들어야할 경우가 있다.

new 연선자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 생성한 빈 객체에 프로퍼티와 메소드를 추가한다.

```js
const student = new Object();

student.name = 'Park';
student.sayHello = function () {
    console.log('Hi! I am ' + this.name);
}
```

Object 생성자 함수는 함수 **객체**이므로 프로퍼티와 메소드를 갖는다. 앞서 살펴본 `Object.getOwnPropertyDescriptor()` 또한 Object 생성자 함수의 메소드이다.

Constructor 함수는 new 연산자와 함께 호출해서 Object(instance)를 생성하는 함수이다. 생성자 함수에 의해 생성된 객체는 instance라고 한다.

> ### Instance
> 
> 생성자 함수도 객체이므로 생성자 함수나 클래스가 생성한 객체를 다른 객체와 구분하기 위해 실체라는 의미로 인스턴스라고 한다.

## 1.1. Built-in Constructor Function (Wrapper Object)

자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp 등의 built-in(intrinsic) 생성자 함수를 제공한다. 이들은 전역객체(window)의 메소드이다. 자바스크립트에서 **함수는 객체**이므로 Built-in 생성자 함수는 객체로서 메소드도 가진다.

```js
const obj = new Object('str');	//가능하지만 잘 안 씀
const strObj = new String('str');
const numObj = new Number(123);
```

String, Number 생성자 함수로 형변환도 가능하지만 잘 안 쓴다.

> ### Wrapper Object
> 
> 원시 값을 객체처럼 쓰면 자바스크립트 엔진이 **원시값 타입의 객체로 순간 바꾸고 평가한 후 다시 원시 값으로 되돌린다**. 이 때 원시값 타입의 객체를 wrapper object라고 부른다.

# 2\. Constructor Function

객체 리터럴로 객체를 생성하는 경우 프로퍼티 구조가 동일해도 매번 같은 프로퍼티와 메소드를 작성해야하는 문제가 있다. 객체 리터럴은 한 번 평가되어 값을 만드므로 재사용할 수 없으며 동일한 코드의 중복 또한 문제가 된다.

## 2.1 Advantages of object creation by constructor function

생성자 함수로 객체를 생성하면 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

생성자 함수는 일반 함수와 동일한 방법으로 **미리 정의한 후**에, **new 연산자와 함께 호출했을 때만 생성자 함수로 동작한다**.

생성자 함수는 보통 Pascal case로 naming 한다. (ex. Object, Circle, String 등)

```js
// Constructor Function
function Circle(radius) {
    // this indicates the instance that the constructor function will create.
    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;  
    };
}

// instance creation
const circle1 = new Circle(5);
const circle2 = new Circle(10);
```

new 연산자 없이 함수를 호출하면, 일반 함수로 호출되는 것이므로 this는 전역 객체(window)가 된다.

> ### this
> 
> `this`는 객체 자신의 프로퍼티나 메소드를 참조하기 위한 Self-regerencing variable이다. `this`가 가리키는 객체는 함수 호출 방식에 따라 동적으로 결정된다.
> 
> | Function call | Object `this` points to |
> | :-: | :-: |
> | As a normal function | Global object (window) |
> | As a method | **Object** that called a method |
> | As a constructor function | **Instance** that a constructor function will create in the future. |

```js
function foo () {
    console.log(this);
}

// Called as a general function
foo ();	// window

// Called as a method
const obj = { foo };	// ES6 property shorthand
obj.foo();	// obj

// Called as a constructor function
const inst = new foo();	// inst
```

## 2.3. Internal method \[\[Call\]\] and \[\[Constructor\]\]

함수 객체는 일반 객체와 달리 내부 메소드로 \[\[Call\]\]과 \[\[Constructor\]\]를 가진다.

내부 메소드 \[\[Call\]\]은 함수가 일반 함수로 호출되었을 때 실행되고, 내부 메소드 \[\[Constructor\]\]는 함수가 생성자 함수로 호출되었을 때 실행된다.

내부 메소드 \[\[Call\]\]이 구현되어 있는 객체를 callable, \[\[Constuctor\]\]가 구현되어 있는 객체는 constructor, \[\[Constructor\]\]가 구현되어 있지 않은 객체는 non-constructor라고 부른다.

단, arrow function은 constructor function으로 생성할 수 없다. ES6의 메소드 축약 표현으로 선언한 메소드 또한 non-constructor이다. 따라서 모든 함수는 callable이지만 모두 constructor인 것은 아니다.

## 2.4. constructors and non-constructors

자바스크립트 엔진은 함수 생성시 FunctionCreate라는 abstract operation을 사용한다.

Abstract operation FunctionCreate는 함수 정의가 평가될 때 호출된다. 함수 정의 방식에 따라서 FunctionCreate의 kind parameter에 함수의 종류를 나타내는 문자열이 전달된다.

| Kinds | Strings |
| :-: | :-: |
| 일반 함수 정의(함수 선언문, 함수 표현식) 평가 | Normal |
| 화살표 함수 정의 평가 | Arrow |
| 메소드 정의 평가 | Method |

일반 함수로 정의된 함수만 constructor, Arrow나 Method는 con-constructor이다.

이 때 주의해야할 점은 ES6의 메소드 축약 표현만을 메소드 정의로 인정한다는 것이다.

## 2.5. How the Constructor Function Works

생성자 함수의 역할은 인스턴스를 생성하는 것과 생성된 인스턴스의 프로퍼티 값을 초기화하는 것이다.

생성자 함수가 호출되면,

1.  자바스크립트 내부에서 빈 객체를 만들고 `this`에 할당한다. (this binding)
2.  내부 코드를 실행한 후 `this`를 return한다. 즉, `this`는 생성자 함수로 생성하는 instance가 된다.

```js
function Person(name) {
    // 1. create empty object and bind it to this. this = {}
    
    // 2. run internal codes (create property)
    this.name = name;
    
    // 3. return this
}

console.log(new Person('Park'));	// Person {name: 'Park'}
```

## 2.6. new Operator

new 연산자와 함께 constructor인 함수를 호출하면 함수는 생성자 함수로 동작한다. 이 때 함수 객체의 내부 메소드 \[\[Constructor\]\]가 호출된다. 함수 내부의 this는 생성자 함수가 생성할 instance를 가리킨다.

new 연산자 없이 함수를 호출하면 함수 객체의 내부 메소드 \[\[Call\]\]이 호출된다. 이 때 함수 내부의 this는 전역 객체 window를 가리킨다.

## 2.7. new.target

new 연산자 없이 생성자 함수를 호출하는 것을 방지하기 위해서 ES6에서 new.target을 지원한다.

new.target은 함수 내부에서 지역 변수와 같이 사용되는 meta property이다. (IE는 new.target을 지원하지 않음!)

함수가 new 연산자와 함께 호출되면 new.target은 함수 자신을 가리키고, new 연산자 없이 호출된 함수 내부의 new.target은 undefined이다.

new 연산자와 함께 호출된 생성자 함수로부터 생성된 instance는 프로토타입에 의해 생성자 함수와 연결된다.
