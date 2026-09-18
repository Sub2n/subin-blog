---
title: "8. Type Coercion and Short-Circuit Evaluation"
date: 2019-05-04
description: "What is Type coercion? Explicit coercion / Type casting: developer intentionally converting value types 123var x = 10;var str = x.toString();…"
tags: ["자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/04/8-Type-Coercion-and-Short-Circuit-Evaluation"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# What is Type coercion?

-   Explicit coercion / Type casting: developer intentionally converting value types
    
    ```js
    var x = 10;
    
    var str = x.toString();
    ```
    
-   Implicit coercion / Type coercion: Type automatically converted by the JavaScript engine regardless of developer intent.
    
    ```js
    var x = 10;
    
    var str = x + '';
    
    // x = Number 10, str = Sring 10
    ```
    
    > ### Does reassignment occur when type coercion occur?
    > 
    > No. It only takes a moment to type when evaluating expressions.
    

The developer can use implicit type conversion intentionally.

# Implicit type coercion

The JavaScript engine performs implicit type coercion when evaluating expressions, taking into account the context of the code.

```js
'10' + 2  // '102'
5 * '10'  // 50
!0         // true
if(1) {}   // if(true)
```

When an implicit type coercion occurs, it automatically converts the type to one of the primitive types such as string, number, or boolean.

## Coercion to String type

```js
// Number type
0 + ''              // "0"
-0 + ''             // "0"
1 + ''              // "1"
-1 + ''             // "-1"
NaN + ''            // "NaN"
Infinity + ''       // "Infinity"
-Infinity + ''      // "-Infinity"

// Boolean type
true + ''           // "true"
false + ''          // "false"

// null type
null + ''           // "null"

// undefined type
undefined + ''      // "undefined"

// Symbol type
(Symbol()) + ''     // TypeError: Cannot convert a Symbol value to a string

// onject type
({}) + ''           // "[object Object]"
Math + ''           // "[object Math]"
[] + ''             // ""
[10, 20] + ''       // "10,20"
(function(){}) + '' // "function(){}"
Array + ''          // "function Array() { [native code] }"
```

## Coercion to Number type

```js
// String type
+''             // 0
+'0'            // 0
+'1'            // 1
+'string'       // NaN

// Boolean type
+true           // 1
+false          // 0

// null type
+null           // 0

// undefined type
+undefined      // NaN

// Symbol type
+Symbol()       // TypeError: Cannot convert a Symbol value to a number

// object type
+{}             // NaN
+[]             // 0
+[10, 20]       // NaN
+(function(){}) // NaN
```

## Coercion to Boolean type

When evaluating a non-boolean value with a boolean, there are only 6 values that evaluate to false.

-   Falsy value
    -   false
    -   undefined
    -   null
    -   0, -0
    -   NaN
    -   ‘’ (empty string)
-   Truthy value
    -   non-falsy values

```js
// The following conditional statements all execute code blocks.
if (!false)     console.log(false + ' is falsy value');
if (!undefined) console.log(undefined + ' is falsy value');
if (!null)      console.log(null + ' is falsy value');
if (!0)         console.log(0 + ' is falsy value');
if (!NaN)       console.log(NaN + ' is falsy value');
if (!'')        console.log('' + ' is falsy value');
```

# Explicit type coercion

-   Call the wrapper object constructor used to create the Wrapper object without new
    
    ```js
    String(1);		// '1'
    Number('1');	// 1
    ```
    

-   Using the built-in method provided by JavaScript
    
    ```js
    (1).toString();	// '1'
    parseInt('-1');	// -1
    ```
    
-   Using implicit type coercion
    
    ```js
    1 + '';			// '1'
    + '-1';			// -1
    '-1' * 1;		// -1
    ```
    

# Short-Circuit Evaluation

The logical AND operator `&&` and the logical OR operator `||` return the operand that determined the logical evaluation. This is called **short-circuit evaluation**.

-   Logical OR operator `||`
    
    ```js
    'Cat' || 'Dog'	// 'Cat'
    ```
    
    -   The logical OR operator `||` returns true even if only one of the two operands evaluates to true.
    -   The OR operator `||` returns the first operand that determines the result of the logical operation, that is, the string ‘Cat’.
-   Logical AND operator `&&`
    
    ```js
    'Cat' && 'Dog'	// 'Dog'
    ```
    
    -   The AND operator `&&` returns `true` when both operands evaluate to true.
    -   The logical AND operator `&&` returns the second operand that determined the result of the logical operation, the string ‘Dog’.
-   Short evaluation means that `&&` and `||` return the operand that determined the logical evaluation.
    
-   Used to reduce TypeErrors
    
    ```js
    var elem = null;
    
    console.log(elem.value);              // TypeError: Cannot read property 'value' of null
    console.log(elem && elem.value); // null
    
    if (elem) console.log(elem.value);
    ```
