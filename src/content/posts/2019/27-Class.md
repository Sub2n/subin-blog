---
title: "27. Class"
date: 2019-05-21
description: "자바스크립트는 Prototype-based 객체지향 언어이다. Prototype-based 프로그래밍은 클래스 없이 프로토타입과 클로저 등으로 상속, 캡슐화 등의 개념을 구현할 수 있다. 대부분의 객체 지향 언어가 클래스 기반인 점을 고려하여 ES6에서 클래스를…"
tags: ["Class", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/21/27-Class"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

자바스크립트는 Prototype-based 객체지향 언어이다. Prototype-based 프로그래밍은 클래스 없이 프로토타입과 클로저 등으로 상속, 캡슐화 등의 개념을 구현할 수 있다.

대부분의 객체 지향 언어가 클래스 기반인 점을 고려하여 ES6에서 클래스를 도입했다. 그러나 그 **클래스도 사실은 함수**이고 기존의 프로토타입 기반 객체지향 패턴으로 동작한다.

### 1\. Calss Definition

ES6 클래스는 다른 언어들과 같이 class 키워드를 사용해 정의한다.

```js
class Student {
    // constructor
    constructor(name) {
        this._name = name;
    }
    // default method definition: class's prototype method
    sayHello() {
        console.log(`Hi! ${this._name}`);
    }
}

const mimi = new Student('Mimi');
mimi.sayHello(); // Hi! Mimi
```

표현식으로도 클래스를 정의할 수 있으나 일반적이지 않다. 클래스 표현식에서 사용한 클래스 이름은 외부 코드에서 접근할 수 없기 때문이다. 클래스가 함수처럼 동작하는 것은 사실 클래스도 함수이기 때문이다.

### 2\. Creation of Instance

Class의 instance를 생성하기 위해서는 new 연산자와 함께 constuctor를 호출한다. 클래스 선언식으로 정의한 클래스의 이름은 constructor와 동일하다.

```js
class Foo {}

const foo = new Foo();

console.log(Foo === Foo.prototype.constructor); // true
console.log(Foo === Object.getPrototypeOf(foo).constructor); // true

const foo2 = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
```

new 연산자를 사용하지 않고 constructor를 호출하면 TypeError가 발생한다. 즉, **클래스의 constructor는 new 연산자 없이 호출할 수 없다.** new 연산자 없이 호출시 오류 없이 생성자 대신 일반 함수로 호출되던 생성자 함수와 다른 점이다.

### 3\. Constructor

constructor는 인스턴스를 생성하고 클래스 필드를 초기화하는 특수한 메소드이다.

> #### Class Field
> 
> \= Data Member, Member Variable. 클래스 내부의 캡슐화된 변수. Instance의 프로퍼티 또는 Static 프로퍼티를 Class field 라고 한다.

-   class 내에는 최대 한 개의 constructor만 존재할 수 있다.
-   new 연산자와 constructor로 인스턴스 생성시 constructor의 파라미터로 전달한 값으로 클래스의 필드를 초기화한다.
-   class 내부에 constructor 정의를 생략하면 default로 `constructor() {}` 가 동작한다. 즉, 빈 객체 { }를 생성한다.
-   constructor는 인스턴스의 생성과 동시에 클래스 필드의 생성과 초기화를 실행한다.

```js
class Foo {}
class Bar {
    constructor(num) {
        this.num = num;
    }
}

const foo = new Foo();
console.log(foo); // Foo {}

const bar = new Bar(200);
console.log(bar); // Bar {num: 200}
```

### 4\. Class Field

클래스 내부에는 메소드만 선언할 수 있다. 모든 프로퍼티(인스턴스의 멤버 변수)는 **반드시 constructor 내부에 선언**해야 한다.

> #### Class Field Declarations Proposal
> 
> 아직 표준은 아니지만 stage3 단계에 Class FIeld 선언 관련된 표준안이 있다.
> 
> -   Field Declaration
> -   Private Field
> -   Static Public Fields
> 
> ```js
> class Foo {
>   x = 1; // 생성자 함수 밖에서도 field 선언 가능
>   #p = 2; // private field
>   static y = 3; // Static puplic field
>   // 현재 field declaration만 chrome에 구현됨
> }
> ```

```js
class Student {
    // default 값 설정
    constructor(name = '') {
        this._name = name;
    }
    
    sayHello() {
        console.log(`Hi! ${this._name}`);
    }
}
```

constructor 내부의 this는 클래스가 생성할 인스턴스이다. constructor는 this, 즉 생성할 인스턴스에 선언한 프로퍼티를 바인딩한다. 이런 방식으로 constructor는 클래스가 생성할 인스턴스와 인스턴스의 프로퍼티를 생성하고 초기화한다.

클래스 프로퍼티는 언제나 `public`이다. 생성된 인스턴스를 통해서 클래스 외부에서도 클래스 내부의 프로퍼티에 접근할 수 있다.

ES6의 클래스는 다른 객체지향 언어처럼 private, public, protect 등의 Access Modifier(접근 제한자)를 지원하지 않는다.

### 5\. Hoisting

클래스는 ES6에서 추가 도입된 `let`, `const`와 같이 Hoisting 되지 않는 것처럼 동작한다. 선언 이전에 참조하면 ReferenceError가 발생한다.

> #### Hoisting 되지 않는 것처럼 동작한다는 것
> 
> ```js
> // x 선언 없이 참조
> console.log(x); // ReferenceError: x is not defined
> ```

> 코드 전역에서 x의 선언 없이 x를 참조하면 x is not defined, 즉 정의되지 않았다는 참조 에러가 뜬다.
> 
> 그러나 let으로 선언하기 전에 x를 참조하면 다르게 동작한다.
> 
> ```js
> // x를 참조하고 밑에서 let 키워드로 선언
> x; // ReferenceError: Cannot access 'x' before initialization
> let x = 10;
> ```

> 위와 같이 x가 정의되지 않았다고 하지 않고, initialization 전에 x에 접근할 수 없다는 참조 에러가 뜬다. 왜일까?
> 
> `var` 키워드와 다르게 `let`, `const` 키워드는 런타임 이전에 자바스크립트 엔진이 선언문을 미리 실행할 때, 1. 선언 단계(Declaration Phase)와 2. 초기화 단계(Initialization Phase)가 함께 진행되지 않는다. `let`, `const` 키워드로 선언한 변수는 1. 선언 단계만 미리 실행되어 스코프에 변수 명이 등록되지만 2. 초기화 단계는 런타임에 선언문이 실행될 때 실행된다. 2. 초기화 단계는 변수의 값을 위한 메모리 공간을 할당하고 undefined라는 값을 암묵적으로 넣어주는 것이다. 이런 초기화 단계를 진행하지 않았으니 참조 에러가 나는 것이다.
> 
> ```js
> // 클래스 Gee를 선언하기 전에 참조
> const f = new Gee(); // ReferenceError: Cannot access 'Gee' before initialization
> class Gee {};
> ```

> 마찬가지로 class도 `let`이나 `const` 키워드로 선언한 변수처럼 동작한다. 호이스팅을 하지 **않는 것처럼** 동작한다고 하는 이유는, 런타임 이전에 1. 선언 단계가 진행되어 정말로 선언되지 않은 변수를 참조했을 때 발생하는 is not defined와는 다른 에러가 발생하기 때문이다.
> 
> ES6의 class도 사실은 함수이지만, function 키워드로 선언한 함수 선언식은 호이스팅 되는 반면 class로 선언한 함수는 호이스팅 되지 않는다. 즉, 선언만 해놓고 초기화를 하지 않아 호이스팅되지 않는 것처럼 동작한다.
> 
> `let`이나 `const` 나 class 등의 선언문 이전을 TDZ(Temporal Dead Zone)이라고 한다. 선언만 되고 초기화되지 않아 참조할 수 없는 구간을 말한다.

### 6\. getter, setter

객체 지향 언어에서 클래스를 사용하는 목적은 내부 상태(내부 데이터)에 접근하는 방법을 제한하고 최소한의 인터페이스를 제공해서 데이터의 캡슐화를 구현하기 위함이다. 접근자 프로퍼티 (getter, setter)를 사용하는 이유도 이와 같다. 클래스 내의 프로퍼티를 참조할 때는 get 함수, 프로퍼티를 설정할 때는 set 함수만을 이용할 수 있도록 구현해야 한다.

#### 6.1. getter

getter는 클래스 프로퍼티에 접근할 때 사용한다. getter는 메소드 이름 앞에 `get` 키워드를 사용해서 정의한다. 이 때 메소드 이름은 클래스 프로퍼티 키처럼 사용된다. 즉, getter는 호출하는 것이 아니라 **프로퍼티처럼 참조하는 것이고, 참조할 때 메소드가 호출**된다. getter는 데이터를 얻기위해(get) 사용하므로 반드시 무언가를 리턴해야 한다.

#### 6.2. setter

setter는 클래스 프로퍼티에 값을 할당할 때 사용한다. setter는 메소드 이름 앞에 `set` 키워드를 사용해서 정의한다. get 메소드와 마찬가지로 메소드 이름은 클래스 **프로퍼티 키로 사용되어 참조되는 형식으로 메소드를 호출**한다. setter는 데이터를 할당하기 위해서 호출하는 것이므로 메소드를 사용해서 할당할 때 set 메소드가 호출된다.

```js
class Student {
    // default 값 설정
    constructor(firstname = '', lastname = '') {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    
    get fullName() {
        return `${this.firstname} ${this.lastname}`;
    }
    
    set fullName(fullname) {
        [this.firstname, this.lastname] = fullname.split(' ');
    }
}

const mimi = new Student('Mimi', 'Kim'); 

// 메소드를 직접 호출하는 것이 아니라 프로퍼티에 접근하는 방식으로 getter, setter를 내부적으로 호출한다.
console.log(mimi.fullName); // Mimi Kim (getter)

mimi.fullName = 'Mimi Park';	// setter

console.log(mimi.fullName); // Mimi Park (getter)
```

### 7\. Static Method

Class는 static 메소드를 정의할 때 `static` 키워드를 사용한다. 정적 메소드는 인스턴스가 아니라 클래스 이름으로 호출하는 메소드이다.

```js
class Foo {
  constructor(prop) {
    this.prop = prop;
  }

  static staticMethod() {
    /*
    정적 메소드는 this를 사용할 수 없다.
    정적 메소드 내부에서 this는 클래스의 인스턴스가 아닌 클래스 자신을 가리킨다.
    */
    return 'staticMethod';
  }

  prototypeMethod() {
    return this.prop;
  }
}

console.log(Foo.staticMethod()); // staticMethod
```

정적 메소드는 클래스의 인스턴스 생성 없이 클래스 이름으로 호출하며 클래스의 인스턴스로는 호출할 수 없다.

### 8\. Class Inheritance

#### 8.1. `extends` Keyword

`extends` 키워드는 parent 클래스를 생속받는 child 클래스를 정의할 때 사용한다.

```js
// parent class
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    
    getDiameter() {
        return 2 * this.radius;
    }
    
    getArea() {
        return Math.PI * (this.radius ** 2);
    }
}

// child class
class Cylinder extends Circle {
  constructor(radius, height) {
    super(radius);
    this.height = height;
  }

  // parent class Circle의 getArea overriding
  getArea() {
    return (this.height * super.getPerimeter()) + (2 * super.getArea());
  }

  // 자신의 메소드 정의
  getVolume() {
    return super.getArea() * this.height;
  }
}

// Cylinder class는 Circle class를 상속한다.
Cylinder.__proto__ === Circle // true
// Cylinder의 prototype은 Circle의 prototype을 상속한다.
Cylinder.prototype.__proto__ === Circle.prototype
```

#### 8.2. `super` Keyword

`super` 키워드는 **parent 클래스를 참조**하거나 **parent 클래스의 constructor를 호출**할 때 사용한다.

1.  super 클래스가 메소드로 사용될 때는 parent 클래스의 constructor를 호출한다. **child 클래스의 constructor에서 super()를 호출하지 않으면 this에 대한 ReferenceError가 발생한다.**
    
    child 클래스의 인스턴스를 만들 때 parent 클래스의 인스턴스를 우선 만들고 상속한다.
    
    ```js
    // parent 클래스의 constructor를 호출한다.
    class Cylinder extends Circle {
      constructor(radius, height) {
        // super가 parent class의 constructor처럼 사용됨
        super(radius);
        this.height = height;
      }
    ```
    
    ![super](https://user-images.githubusercontent.com/48080762/58225537-6c111480-7d5d-11e9-9cbb-45fc8d66a2ff.png)
    
    ECMAScript의 스펙을 살펴보면 super가 argument를 전달받으며 호출될 때는 내부적으로 자신의 parent 클래스의 constructor를 호출하여 constructor가 리턴한 this 객체를 child 클래스 constructor의 this(child 클래스가 생성할 인스턴스)에 바인딩한다.
    
2.  super 클래스가 객체로 사용될 때는 parent 클래스를 참조한다.
    
    ```js
    // super가 parent class Circle처럼 사용됨
    
    // parent class Circle의 getArea overriding
      getArea() {
        return (this.height * super.getPerimeter()) + (2 * super.getArea());
      }
    
      // 자신의 메소드 정의
      getVolume() {
        return super.getArea() * this.height;
      }
    }
    ```
    

#### 8.3. Inheritance of Static Method and Prototype Method

Child 클래스의 static 메소드 내부에서 super 키워드를 사용하면 parent 클래스의 static 메소드를 호출할 수 있다. child 클래스는 프로토타입 체인에서 parent 클래스의 정적 메소드를 참조할 수 있기 때문이다.

그러나 child 클래스의 일반 메소드(prototype 메소드) 내부에서는 super 키워드를 사용해서 parent 클래스의 static 메소드를 호출할 수 없다. 이는 child 클래스의 **인스턴스**는 프로토타입 체인에 의해 parent 클래스의 static 메소드를 참조할 수 없기 때문이다. child 클래스의 인스턴스는 프로토타입 체인 상에 parent 클래스가 아니라 parent 클래스의 prototype만 가지고 있다.

```js
class Foo {
  constructor(prop) {
    this.prop = prop;
  }

  static staticMethod() {
    /*
    정적 메소드는 this를 사용할 수 없다.
    정적 메소드 내부에서 this는 클래스의 인스턴스가 아닌 클래스 자신을 가리킨다.
    */
    return 'staticMethod';
  }

  prototypeMethod() {
    return this.prop;
  }
}

class Bar extends Foo {
    static staticMethod2() {
        return super.staticMethod();
    }
    
    prototypeMethod() {
        return super.staticMethod();
    }
}

console.log(Bar.staticMethod2()); // staticMethod

const bar = new Bar();

console.log(bar.prototypeMethod()); // TypeError: (intermediate value).staticMethod is not a function
```
