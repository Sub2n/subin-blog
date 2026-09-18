---
title: "11. Function"
date: 2019-05-08
description: "What is a Function?수학에서 함수는 input을 받아 output을 내보내는 일련의 과정(series of processes)을 정의한 것이다. 프로그래밍 언어에서 함수는 input을 받아 output을 내보내는 일련의 과정을 문(statement)들로…"
tags: ["Function", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/08/11-Function"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# What is a Function?

수학에서 함수는 input을 받아 output을 내보내는 일련의 과정(series of processes)을 정의한 것이다.

프로그래밍 언어에서 함수는 input을 받아 output을 내보내는 일련의 과정을 문(statement)들로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것이다.

함수의 구성 요소로는,

-   parameter(매개변수) : input을 함수 내부로 전달받는 변수
-   argument(인수) : input
-   return value(반환값) : output

함수는 식별자로 함수명을 사용한다.

함수는 함수를 정의함으로써 생성된다. 생성된 함수를 실행시키기 위해서는 함수를 호출해야한다.

# Why use a function?

함수를 사용해야 하는 이유는 다음과 같다.

-   동일한 작업을 반복적으로 수행할 때 함수를 호출해 **코드를 재사용**하기 위해서 사용
-   중복되는 코드를 제가해서 **유지보수의 효율성**을 높이기 위해서 사용
-   함수의 이름으로 기능을 명시해 코드의 **가독성을 높일 수 있다**.

# Function Literal

Just as objects are created as object literals, functions can also be created as function literals. Function literal consists of function keyword, function name, list of parameters and function body. A **function literal is evaluated to create a function object**.

-   Function name
    -   Since the function name is an identifier, it must conform to the identifier naming rules.
    -   A function name is an identifier that can be referenced **only within a function body**.
    -   The function name can be omitted. A function with a function name is called a ***named function***, and a function without a function name is called an ***anonymous function***.
-   List of parameters
    -   Wrap 0 or more parameters in parentheses and separate them with commas.
    -   Parameters are assigned arguments.
    -   Parameters are treated the same as variables in the function body.
-   Function body
    -   It is a block of code that defines the statements to be executed in batches as a unit of execution when the function is called.
    -   The function body is executed by a function call.

A function literal is evaluated to produce a value, which is an object. In other words, **the function of JavaScript is an object.**

Unlike regular objects, functions can be called and have unique properties. All function objects have `[[Call]]`.

# Definition of Function

There are 4 ways to define a function.

-   Function Declaration / Function Statement
    
    ```js
    function add(x, y) {
        return x + y;
    }
    ```
    

-   Function Expression
    
    ```js
    var add = function (x, y) {
        return x + y;
    }
    ```
    

-   Function Constructor
    
    ```js
    var add = new Function('x', 'y', 'return x + y');
    ```
    

-   Arrow Function (ES6)
    
    ```js
    var add = (x, y) => x + y;
    ```
    

Each method defines a function, but there is an important difference.

## Function Declaration

The function declaration has the same format as the function literal, but **the function name can not be omitted.** This is because the JavaScript engine needs to create variables with function names.

```js
// Function Declaration
function add(x, y) {
    return x + y;
}

//Function Call
add(2, 3); //5
```

The function name is an identifier that can be referenced only within the function body.

However, when you call a function outside a function, you use the function name.

When a function declaration is executed to create a function object, a variable is needed to assign the function object. This is because the function object can not be stored in memory unless it is allocated anywhere.

Therefore, the JavaScript engine

1.  Implicitly declares an identifier of the same name as the function name
2.  Assigns the created function object to the identifier.

```js
// This is the pseudo code when the above function add statement is executed.

// variable add is an identifier created by the JavaScript engine with the same name as the function name implicitly. 

var add = function add(x, y) {
    return x + y;
};

add(2, 3);
```

Function name can only be referenced within a function, and implicitly created **variable** name can be referenced **in the scope where the function is defined**.

![Pseudo Code](https://user-images.githubusercontent.com/48080762/57363047-21b76180-71bb-11e9-9fa1-d67593e265e4.png)

This pseudo code is the following function expression. That is, the JavaScript engine converts function declarations into function expressions to create function objects.

## Function Expression

### First-class object

An object that can be assigned to a variable, such as a value, which can be the value of a property or an element of an array.

Function in JavaScript is a first-class object. It means that a function can be freely used as a value.

A function object created with a function literal can be assigned to a variable. This way of defining a function is called a **function expression**.

```js
// Function Expression
var add = function (x, y) {
    return x + y;
};

add(2, 3);
```

Unlike function declarations, function literals can omit function names. It is common to use anonymous functions in function expressions.

Since a function name is an identifier that can be referenced only by a function body, even if a named function is used, the function must be called with the variable name to which the function object is assigned.

## Function Creation time and Function Hoisting

Function declarations and function expressions seem to behave similarly, because the JavaScript engine implicitly declares the variable as a function name in the function declaration statement and allocates the created object.  
However, function declaration is non-expression statement, and function expression is an expression statement. Therefore, there is an important difference.

The point at which the function is created is when the JavaScript engine evaluates the function declaration to create the function object.

-   **Function declaration statements are executed before runtime** because they are declarations themselves.
    
-   However, **function expressions are executed at run-time** because they are assignment statements that assign function literals to variables.
    

That is, the function created by the function declaration statement and the function generated by the function expression are created at different times.

Functions created with function declarations are executed and hoisted before runtime, but functions created with function expressions are not hoisted.

Unlike variable hoisting, in the case of function hoisting, a function object is referenced instead of undefined.

## Function Constructor

> ## Constructor Function
> 
> A constructor function is a function that creates an object.

The `function` constructor function, which is a built-in function provided by JavaScript, receives a parameter list and a function body as a string. It is called with the `new` operator and returns the created function object.

```js
// Function Constructor
var add = new Function('x', 'y', 'return x + y');

add(2, 3);
```

However, creating a function as a function constructor is not common. These functions behave differently from function declarations or function expressions.

Do not use it!

## Arrow Function

An arrow function introduced in ES6 can make a function simply without a `function` keyword.

```js
// Arrow Function
const add = (x, y) => x + y;

add(2, 3);
```

The arrow function is not available in all situations.

# Function Call

```js
// Function Call
add(2, 3);
```

-   `add` : Variable name referring to function object, not function name
-   `( )` : Function call operator
-   `2, 3` : Arguments to be assigned to the parameter

Calling a function stops the current execution flow and passes control to the called function. At this point, arguments are assigned to the parameters and the statements in the function body begin to execute.

# Parameter and Argument

-   Parameter
    -   Declare when defining a function
    -   Treated as variables in the function body
    -   When a function is called, the parameter is implicitly created in the function body, initialized to undefined, and then an argument is assigned.
    -   The scope of the parameter is inside the function.
-   Argument
    -   If the argument is passed less than the parameter, the missing parameter has the value undefined. (No error)
    -   If the argument is passed in more than the parameter, the excess argument is ignored and kept in the arguments object.

# Argument Check

```js
function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number')
    	throw new TypeError('Non-number type value has assigned to parameter.');
    
    return x + y;
}

add(2);			// TypeError: Non-number type value has assigned to parameter.
add('a', 'b');	// TypeError: Non-number type value has assigned to parameter.
```

It is necessary to check whether the argument is passed properly in the JavaScript function. Because..

-   JavaScript functions do not check that the number of parameters and arguments match.
-   Because JavaScript is a dynamic type language, functions do not specify the type of parameters in advance.

# Number of parameters

The smaller the number of parameters, the better. A function with 0 parameters is ideal. The more parameters, the more things to consider when using the function, which leads to errors.

Also, if the number or sequence of parameters changes, all the code that calls the function must be modified.

The ideal function should only do one thing and make it as small as possible. In addition to functions, classes and other functional units must be as clear and small as possible too.

# External State Changes and Functional Programming

Since functions are objects, they follow pass by reference. Passing a value to a function’s parameters is called as **Call by value** and **Call by reference**, but the behavior is the same as **Pass by value** and **Pass by reference**.

As we saw in [10\. Comparing primitive and objects](https://sub2n.github.io/2019/05/07/10-Comparing-primitive-and-objects/), there is a side effect in which the original object is changed by reference values passed from inside the function body to outside of the function. This is called change of external state.

-   Pure function : functions that do not change any external state (No side effect)
-   Impure function : functions that change the external state inside a function (Side effect)

![External State Change](https://user-images.githubusercontent.com/48080762/57363055-2714ac00-71bb-11e9-9810-7770c44966c8.png)

Functional programming is a programming paradigm that avoids state changes by suppressing the use of variables and solves complexity by eliminating conditional statements and loops in the logic through the combination of pure and auxiliary functions. Variable values can be changed by someone at any time, and conditional statements or loop statements can make the flow of logic difficult to understand, which can impair readability and become a root cause of errors.

Functional programming is a way to avoid errors and increase the stability of programs by minimizing side effects through pure functions.

## Return Statement

The function returns the execution result through a return statement consisting of the `retur`n keyword and the return value.

When the return statement is executed, execution of the function is aborted and the function body is exited.

If do not write anything after the `return` keyword or write a return statement, `undefined` is returned implicitly.

## Types of various Functions

### IIFE ( Immediately Invoke Function Expression)

A function that *executes concurrently with the definition* of a function. It is common to use anonymous functions and can not be called again once.

```js
// Anonymous immediately invoke function
(function(){
    var a = 2;
    var b = 3;
    return a + b;
}());
```

Even if a named function is used, the function name can not be referenced outside of the function and can not be called again.

An immediate function must be enclosed in the group operator `()`. Otherwise, it will not be identified and an error will occur.

If put the code in the immediate function, collision of the variable name or the function name can be prevented. An immediate execution function is used for this purpose.

### Recursive Function

A recursive call is to call itself. A function that calls itself is called a recursive function.

When creating a recursive function, a base case with an escape condition must be included. Stack overflow occurs when a function is called without escaping.

Most of what can be implemented as recursive functions can be implemented as loops.

### Nested Function / Inner Function

A function defined inside a function is called a nested function (or inner function). A nested function acts as a helper function of an outer function that contains itself.

A nested function can access variables of an outer function, but an outer function can not access variables of a nested function. The nesting of functions means the nesting of the scope.

### Callback Function

Because JavaScript functions are first-class objects, can pass functions as arguments to functions.

```js
// Function that recieves calback function
function print(f) {
    var string = 'Good';
    // Determine when to call the callback function passed in parameter and call the function
    return f(string);
}

// It calls the print function and passes the callback function
var upper = print(function (str) {
    return str.toUpperCase();
});

// It calls the print function and passes the callback function
var lower = print(function (str) {
    return str.toLowerCase();
});

console.log(upper, lower);	//GOOD good
```

The function passed to the print function as an argument is called a **callback function**. The callback function calls the function that receives the callback function as an argument by determining the point of call.

Using a callback function is like pushing a nested function depending on your needs and circumstances.

Just as a nested function acts as a helper function to help an outer function, the callback function is passed to the function to serve as a helper function. However, since the nested function is fixed and can not be replaced, the callback function can be freely replaced because it is injected as an argument outside the function.

When you pass a callback function from the outside, you can create a function that performs various actions depending on the callback function.

That is, it is useful to use the callback function in situations where it is changed instead of being fixed like a nested function.

Callback functions are mainly used for **event handling**, Ajax communication, and higher-order functions.
