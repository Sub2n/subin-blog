---
title: "9. Object Literal"
date: 2019-05-05
description: "What is Object?JavaScript is an object-based programming language and almost “everything” that makes up JavaScript is an object. The rest of the…"
tags: ["자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/05/9-Object-Literal"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# What is Object?

JavaScript is an object-based programming language and almost “everything” that makes up JavaScript is an object. The rest of the values (functions, arrays, regular expressions, etc.) are all objects except primitive types.

Object / reference type is a complex data structure that consists of several types of values (primitive type values or other objects) in a single unit.

| Primitive value | Object |
| :-: | :-: |
| immutable value | mutable value |
| pass by value | pass by reference |

**Object** is a set of properties that consist of keys and values.

Any value that is available in JavaScript can be used as the value of the property. Functions in JavaScript are first-class objects, so they can be treated as values.

JavaScript functions are first-class objects, so they can be used as property values. If the property value is a function, it is called a **method** to distinguish it from a normal function.

-   Attributes are refer to additional information of an object.
-   Properties are describing the characteristics of an object.

An object is a set of methods, which means properties that refer to data and behavior that can refer to and manipulate data.

# Create Object by Object Literal

Class-based object-oriented languages such as C ++ and Java pre-define classes and create objects by calling the constructor with the new operator at the point in time. However, JavaScript is a prototype-based object-oriented language that creates objects differently.

Then how JavaScript creates object?

-   Object literal
-   Object constructor function
-   Constructor function
-   Object.create method
-   Class (ES6)

The most basic and general method is using object literal.

```js
// empty object
var empty = {};

// At the time of assignment, the object literal is interpreted and the resulting object is created.
var student = {
    name: 'Park',
    hello: function () {
        Console.log('Hello. I'm ${this.name}.');
	}
};
```

The `{}` used to create the object is not a block of code. It is an object literal because it ends with a `;`.

You can create a property as soon as you create the object by including the property in an object literal, or you can dynamically add a property after you create the object.

# Property

An object is a set of properties. A property consists of a key and a value.

The values that can be used for property key and property values are as follows.

-   Property key : all strings include empty string or symbol value
-   Property value : all values in JavaScript

Quotes can be omitted if the property key is a name that conforms to the identifier naming convention, that is, a valid name that can be used in JavaScript.

```js
var student = {
    name: 'Park'
};

// Dynamically add property key
student['age'] = 25;

console.log(student); 	// {name: "Park", age: 25}
```

Property keys are allowed to be duplicated, and in the event of duplication, the last declared key is valid.

# Method

If the property value is a function, it is called a method to distinguish it from a normal function. In other words, a method means a function restricted to an object.

```js
var circle = {
  radius: 5, // ← property
  getDiameter: function () { // ← method
    return 2 * this.radius; // this pointing circle
  }
};

console.log(circle.getDiameter());  // 10
```

`this` is a reference variable that points to the object that called it.

# Access of Property

You can access the properties in such a way,

-   Dot notation
-   Bracket notation

```js
var student = {
	name: 'Park'
};

console.log(student.name);		// Access by dot notaion
console.log(student['name'];	// Access by bracket notation
```

If the property key follows the identifier naming convention, 2 notations are both available. If not, only bracket notation is available.

If the property key is not a name that does conform to the identifier naming convention, that is, not a valid name that can be used in JavaScript, must use square bracket notation. However, the quotation marks `''` can be omitted if the property key is a string of numbers.

# Update Property Value

If assign a value to an existing property, the property value is updated.

```js
var student = {
    name: 'Park'
};

student.name = 'Kim';

console.log(student);	// {name: "Kim"}
```

# Dynamic property creation

```js
var student = {
    name: 'Park'
};

student.age = '22';

console.log(student); // {name: "Park", age: "22"}
```

Can add, modify, and delete properties after object creation is complete.

# New ES6 Object Literal Functions

## Property shorthand

```js
let x = 1, y = 2;

const obj = { x, y };   // { x:1, y: 2 }
```

## Property key dynamic creation

```js
// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 프로퍼티 키 동적 생성
var obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

## Method shorthand

```js
// ES6
const obj = {
    name: 'Park',
    // 메소드 축약 표현
    sayHi(other) {
        console.log(`Hi, ${other}! I'm ${this.name}`);
    }
};

obj.sayHi('Sam'); // Hi, Sam! I'm Park
```
