---
title: "TypeScript (2)"
date: 2019-06-12
description: "TypeScript의 주요 기능 타입 선언 Class Interface Generic"
tags: ["TypeScript"]
categories: ["TypeScript"]
path: "2019/06/12/TypeScript-2"
legacy: true
thumbnail: "/gallery/thumbnails/typescript.png"
---

#### TypeScript의 주요 기능

1.  [타입 선언](https://sub2n.github.io/2019/06/12/TypeScript-2/#Type-Declaration)
2.  [Class](https://sub2n.github.io/2019/06/12/TypeScript-2/#Class)
3.  [Interface](https://sub2n.github.io/2019/06/12/TypeScript-2/#Interface)
4.  [Generic](https://sub2n.github.io/2019/06/12/TypeScript-2/#Generic)

## Type Declaration

```ts
let num: number;
let num2 = 2;  // 선언과 동시에 할당할 때는 바로 그 type으로 지정됨
```

```ts
function mult(x: number, y: number): number {
    return x * y;
}
```

Parameter의 type을 모두 명시해준 경우 Return type은 추론이 가능하므로 생략이 가능하다. Type은 any가 나오지 않게끔만 지정하면 된다.

`void`: return을 하지 않는다. 사실은 `undefined`가 return되지만 `void`라고 한다.

#### Types of TypeScript

**From JavaScript:** boolean, null, undefined, number, string, symbol, object

**Added in TypeScript:** array, tuple, enum, any, void, never

> ### void와 never 차이
> 
> never는 함수가 종료하지 않아 결코 return하지 않을 때 사용된다. 무한루프 혹은 Error 메시지를 throw할 때 return type이 never이다.
> 
> void는 return 값이 없을 뿐이지 함수는 종료한다.

#### array

```ts
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // Generic Array Type
```

#### tuple

```ts
let tuple: [string, number];
tuple = ['hello', 10];
tuple.push('good', 30);
```

배열인데 고정된 element의 수만큼 type을 미리 선언한다.

#### enum

```ts
enum Season {Spring, Summer, Fall, Winter};
let s1: Season = Season.Spring;
```

## Class

TypeScript가 지원하는 Class는 ES6의 Class와 유사하지만 몇 가지 고유한 확장 기능을 가진다.

### 1\. Class Definition

ES6 Class와 다르게 constructor 외부, 즉 **Class body에 Class field를 미리 선언해야 한다.** 그렇지 않으면 Error가 발생한다.

```ts
class Circle {
    // Class field 미리 선언
    radius: number;
    
    constructor(radius: number) {
        this.radius = radius;
    }
}
```

constructor의 parameter에 Access Identifier를 사용하면 아래와 같이 선언할 수 있다.

```ts
class Circle {
    constructor(public radius) {
        // this.radius = radius;도 안 해줘도 됨
    }
}
```

### 2\. Access Identifier

-   public : Class 내부, Child Class 내부, Class Instance에서 접근 가능
-   protected: Class 내부, Child Class 내부에서 접근 가능
-   private: Class 내부에서만 접근 가능

Access identifier를 지정해주지 않으면 암묵적으로 public이 된다. 따라서 public으로 지정하고자 하는 Member variable과 method는 access identifier를 생략한다.

constructor parameter를 선언할 때 public를 붙이면 할당까지 이루어지고 Class 내부의 member variable이 된다. public을 쓰지 않으면 constructor 내부에서만 참조 가능한 지역 변수가 된다.

### 3\. readonly Keyword

`readonly`가 선언된 클래스 프로퍼티는 선언할 때 또는 생성자 내부에서만 값을 할당할 수 있다. 그 외의 경우에는 값을 할당할 수 없고 오직 읽기만 가능한 상태가 된다. 상수를 선언할 때 사용한다.

### 4\. static Keyword

메소드 뿐만 아니라 프로퍼티도 static으로 지정할 수 있다.

### 5\. Abstract Class

Abstract class는 **하나 이상의 abstract method를 포함**하며 일반 method도 가질 수 있다. Abstract method란 구현 없이 method 이름과 type만이 선언된 method를 말한다. 선언시 `abstract` 키워드를 사용한다.

Abstract class는 **직접 instance를 생성할 수 없고 상속만을 위해 사용된다.** **Abstract class를 상속한 class는 반드시 abstract class의 abstract method를 구현해야 한다.**

Interface는 모든 method가 abstract이다.

## Interface

Interface는 일반적으로 type check를 위해서 사용된다. 변수, 함수, 클래스에 사용할 수 있다.

Interface는 여러가지 type을 갖는 property로 이루어진 새로운 type을 정의하는 것과 같다. Interface에 선언된 property와 method의 구현을 강제해서 일관성을 유지할 수 있게 한다.

### 1\. Variable and Interface

```ts
// Definition of interface
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

// 변수의 type으로 interface Todo를 선언
let todo: Todo;

// 변수 todo는 Todo interface를 따라야한다.
todo = { id: 1, content: 'typescript', completed: false };

// 함수 parameter를 interface Todo로 선언
function addTodo(todo: Todo) {
  ...
}
```

필요에 따라서 새로운 타입을 생성하는 것과 같다. 함수의 parameter 선언시에도 interface를 사용하여 전달되는 argument의 type 형식을 제한할 수 있다.

### 2\. Function and Interface

```ts
// 함수 인터페이스의 정의
interface SquareFunc {
  (num: number): number;
}

// 함수 인테페이스를 구현하는 함수는 인터페이스를 따라야 한다.
const squareFunc: SquareFunc = function (num: number) {
  return num * num;
}

console.log(squareFunc(10)); // 100
```

잘 안 씀

### 3\. Class and Interface

```ts
// 인터페이스의 정의
interface IPerson {
  name: string;
  sayHello(): void;
}

/*
인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.
*/
class Person implements IPerson {
  // 인터페이스에서 정의한 프로퍼티의 구현
  constructor(public name: string) {}

  // 인터페이스에서 정의한 추상 메소드의 구현
  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

function greeter(person: IPerson): void {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```

### 4\. Duck Typing

Interface를 implements해서 구현하지 않아도, 해당 interface 내부의 property나 method를 모두 구현하면 type check에서 통과된다.

```ts
interface IDuck { // 1
  quack(): void;
}

class MallardDuck implements IDuck { // 3
  quack() {
    console.log('Quack!');
  }
}

class RedheadDuck { // 4
  quack() {
    console.log('q~uack!');
  }
}

function makeNoise(duck: IDuck): void { // 2
  duck.quack();
}

makeNoise(new MallardDuck()); // Quack!
makeNoise(new RedheadDuck()); // q~uack! // 5
```

Interface IDuck을 명시적으로 implements하지 않은 RedheadDuck의 instance도 IDuck 내부를 완벽하게 구현했다면 type이 IDuck으로 인정된다.

즉, implements 여부가 아니라 interface 구현 여부가 check된다.

### 5\. Optional Property in Interface

Interface 내부에서 `?`가 붙은 property는 구현을 생략해도 된다.

```ts
interface StudentInfo {
	name: string;
	number: string;
	age? : number;
	address? : string;
}
```

## Generic

C나 C++ 등 정적 타입 언어에서는 함수 또는 클래스를 정의할 때 parameter나 return 값의 타입을 선언해야 한다. TypeScript도 정적 타입 언어이므로 정의 시점에 타입을 선언해야하는데, 함수 또는 클래스를 정의할 때 parameter나 return type을 선언하기 어려운 경우가 있다.

TypeScript는 선언시 타입을 지정하지 않으면 any타입이 되어 type check를 할 수 없게 된다. Stack이나 Queue를 구현하는 경우 배열에 어떤 type을 담을 것인지 정의할 때 확정짓기 어렵다. 이런 경우에 Generic을 사용한다.

```ts
class Stack<T> {
  protected data: Array<T> = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T {
    return this.data.pop();
  }
}
```

위의 class Stack을 정의할 때 타입을 따로 지정하지 않고 `<T>`를 사용했다. `<T>`는 Type Paremeter이며 Type의 약자이다. 어느 type이던 사용할 수 있음을 의미한다.

Generic은 선언 시점이 아니라 생성 시점에 타이블 명시해서 다양항 타입을 사용할 수 있도록 하는 기법이다.

```ts
function sort<T>(items: T[]): T[] {
  return items.sort();
}
```

위는 함수에서 Generic을 사용한 것이다. 어떤 type으로 이루어지는지는 모르지만 배열을 parameter로 받아서 sorting한 배열을 리턴한다.
