---
title: "4. Variable"
date: 2019-04-30
description: "What is variable?Application uses data. And the variable is core concept for managing data. Computer is computing machine. To do simple operation…"
tags: ["Hoisting", "Variable", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/04/30/4-Variable"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# What is variable?

Application uses data. And the variable is core concept for managing data.

Computer is computing machine. To do simple operation like sum of 1 and 2, computer should memorize these operand 1 and 2 in register. Computer uses memory to memorze the data.

> ## Memory
> 
> Memory is a collection of memory cells that can store data. Size of one cell is 1byte(8bit) and computer read or wirte data by one cell, 1 byte size. Each memory cell has its own address. That address means location of memory space and can be represented from 0 to memory size.

Computer can simply compute 1 + 2, but how to use this result of sum? What you need at this point is the variable. To store data in memory and read to use data from memory, programming language provide variable.

**Variable** refers name of memory space or memory space itself. Simply, variable is mechanism that store and refer data values.

Through variable, developer can store, refer and change value wihout access to memory directly.

Just, like it.

```js
var result = 1 + 2;
```

![variable in memory](https://user-images.githubusercontent.com/48080762/56947343-cf959100-6b67-11e9-8bde-d3e9553a4bf1.png)

In JavaScript, `var` means variable. In that code, ‘result’ is a name of the variable and 3 is a value of the variable. Storing value in variable is called **assignment** and reading data from variable is called **reference**.

The variable name is the name given to the memory space where the value is stored for the person.

# Declaration of variable

Variable name is the name given to memory space. To use a variable, variable must be declared. Use `var`, `let`, `const` keywords to declare variable.

Before ES6 introduced `let` and `const` keywords, `var` was the only method to declare variable.

> ## Keyword
> 
> Keyword is kind of command that defines the actions performed by JavaScript engines that execute JavaScript code. When JavaScript engine meets

```js
var soup;
```

After declaring a variable, the variable never been assigned. Therefore, the memory space allocated by the variable declaration may be considered to be empty, but the allocated memory space is implicitly allocated with the value `undefined` by the JavaScript engine. This is a unique feature of JavaScript.

> ## undefined
> 
> `undefined` is primitive value of JavaScript.

JavaScript engine operates declaration of variable by 2 phases.

1.  Declaration phase : Register the variable name to tell the JavaScript engine the existence of the variable.
2.  Initialization phase : Allocates memory space to store the value and implicitly assigns `undefined`.

Variable declaration using the `var` keyword proceeds both in the declaration phase and in the initialization phase. `var soup;` registers the variable name soup through the declaration phase, and initializes it by assigning `undefined` to the variable score through the initialization step.

In general, **initialization** refers to assigning a value first after a variable is declared. JavaScript automatically do implicit initialization to `undefined`. Therefore, even if you declare a variable and do not assign any value, the variable has a value of `undefined`.

If you do not go through the initialization phase, the reserved memory space may still contain values that were previously used by other applications. These values are called **garbage values**. Therefore, garbage value can be obtained by referring to a variable value immediately after allocating memory space and not allocating a value.

Declarations are required to use variables. Not just variables, but all identifiers (functions, classes, etc.). If you access the identifier without declaration, a ReferenceError is raised. ReferenceError is a error that occurs when the JavaScript engine tries to reference a value through an identifier but can not find the registered identifier.

# Variable Declaration run time and Hoisting

```js
console.log(soup);

var soup;
```

In C, the avobe code will occur compile error because it access to the variable before its declaration. But in JavaScript print `undefined` instead of ReferenceError.

Variable declaration is processed **before the run-time** that source code execute in line step. In other words, JavaScript engine estimate entire source code in advance. At this time, it finds all of declaration(variable declaration, function declaration), declare and initialize identifiers. After that run source codes sequentially except declarations.

## What is Hoisting?

Hoist means to lift something. It is a variable that is hoisted in JavaScript.

Hoist means that the definition of a variable is separated into declarations and allocations according to its scope.  
Declarations execute before other codes so it seems like declarations are hoisted to top of the source code. In JavaScript, all of variable declarations are hoisted.

**Warning**

Function hoisting hoists function declarations too, but not hoist the value of variables. So think separate declarations and assignment is important. It’s relevant with run-time and parsing-time.

```js
foo();
function foo(){
  console.log('ok');
};
// Ok

foo();
var foo = function foo(){
  console.log('ok');
};
// Syntax error!
```

# Assignment of Values

```js
var soup; // Variable Declaration
soup = 3; // Assignment value

var soup = 3; // Variable declaration and assigment
```

Variable declaration is executed at parsing-time and assignment is executed in run-time, affter the parsing-time. Of course when declare variable, it is initialized to `undefined`.

```js
console.log(soup);  // undefined

var soup = 3;       // Variable declaration and assigment

console.log(soup);  // 3
```

So soup is re-initialized to 3.

# Reassignment of Value

```js
var soup = 3; // Declaration and Assignment
soup = 5; // Reassignment
```

Variable that declared by `var` keyword can be reassigned. Reassignment is that variable discards the current value and store new value.

Reassignment changes old value to new value. If the reassignment is not possible, it is called a **constant** not a variable. A constant is a value that does not change once set. In other words, constants are variables that can be assigned only once.

> ## const keyword
> 
> Introduced from ES6, variable that declared by `const` is prohibited reassignment. But `const` keyword does not only used for constant.

# Identifier Naming Convention

An identifier is a unique name that can identify any data. The identifier shall conform to the following naming conventions.

-   Identifiers can include letters, numbers, underscore ( \_ ), and dollar sign ($), except for special characters.
-   However, identifiers must begin with a letter, underscore ( \_ ), or dollar sign ($), except for special characters. It is not allowed to start with a number.
-   Reserved words can not be used as identifiers.

Since the variable name is an identifier, the above naming rules must be followed. There are 4 naming conventions that are often used to distinguish words at a time when naming identifiers composed of one or more English words.

```js
// camelCase
var firstName;

// snake_case
var first_name;

// PascalCase
var FirstName;

// typeHungarianCase
var strFirstName;          // type + identifier
var $elem = $('.myClass'); // jQuery
```

Any naming convention may be used if it is consistent. The most common is to **use a camel case for the name of a variable or function** and **a Pascal case for the name of a constructor function or class**.

In order to improve the readability of the entire code, it is advantageous to follow the above naming convention.

---

Reference

[Data type & Variable](https://poiemaweb.com/js-data-type-variable)
