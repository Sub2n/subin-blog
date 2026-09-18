---
title: "12. Scope"
date: 2019-05-08
description: "The scope determines the extent to which the identifier can be referenced. A scope is a data structure that keeps the binding of identifiers and…"
tags: ["Scope", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/08/12-Scope"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

The scope determines the extent to which the identifier can be referenced. A scope is a data structure that keeps the binding of identifiers and values, and is managed by the JavaScript engine.

# What is Scope?

The range in which the variable is valid. That is, the extent to which other code can refer to the variable itself. The scope is created by the location **where the variable is declared**.

When there are variables with the same name in different scopes, JavaScript engine must decide which variable to reference at runtime. JavaScript uses the scope to determine which variables to reference. That is, **the scope is the rule that the JavaScript engine uses to search for variables to reference.**

By default, JavaScript supports function-level scopes rather than block-level scopes. Variables declared with `var` form a function-level scope. However, variables declared with `let` or `const` form a block-level scopes.

If there is no scope, the name of the variable in the program should be unique.

> #### Duplicate declaration of `var` keyword variable
> 
> Variables declared with the `var` keyword allow duplicate declarations within the same scope.
> 
> ```js
> function foo() {
>     var x = 1;	
>     
>     // This statement operates like x = 2;
>     // So reassignment occurs.
>     var x = 2;	//2
>     
>     console.log(x); //2
> }
> foo();
> ```

> Variables declared as `let` or `const` do not allow duplicate declarations, so it is better to use them.

# Types of scope

Code can be distinguished as global and local.

|  | Global | Local |
| :-- | :-: | :-: |
| Explanation | Outermost area of code | Inside of function body |
| Scope | Global scope | Local scope |
| Vaiable | Global variable | Local variable |

The variable is determined by its declared location (global or local) to the scope in which it is valid.

-   A variable declared in global is a global variable having a global scope
-   A variable declared in local is a local variable having a local scope.

Declaring a variable in global is a global variable with a global scope. Global variables can be referenced anywhere. In other words, global variables are valid in the global scope.

Local variables can be referenced only in the declared region and sub-region (nested function). In other words, local variables are valid in their local and subregional scopes.

# Scope Chain

Scopes are created by functions. Functions can be nested, so the local scope of a function can also be nested. This means that **the scope has a hierarchical structure by nesting of functions**.

The local scope of the outer function is the top scope of the nested function.

**The scope chain** refers to a structure in which the scopes from the deepest local scope to the global scope of the overlap are hierarchically connected.

When referring to a variable, the JavaScript engine starts at the scope of the code that references the variable, moves to the top scope, and searches for the declared variable.

# Function-level Scope

-   Most programming language like C, Java
    -   Block-level scope
    -   All code blocks (if, for, while, try / catch, etc.), not just the function body, create the local scope.
-   Variables declared with the `var` keyword
    -   **Function-level scope**
    -   Accept only the code block of the **function** as the local scope.

The `let` and `const` keywords introduced in ES6 support block level scopes.

# Lexical Scope

-   Dynamic Scope
    -   The function’s top scope is determined by **where the function is called.**
-   **Lexical Scope** / Static Scope
    -   The function’s top scope is determined by **where the function is defined.**
    -   Most programming languages follow the lexical scope.

JavaScript follows a lexical scope. So it determines the top scope depending on where it is defined.

# Implicit Global Variable

If declare a variable without `var` keyword, it becomes a global variable.

```js
function foo() {
    i = 0;	//implicit global variable
}

// var i = 0 is a duplicate declaration
for (var i = 0; i < 5; i++) {
    foo();
    console.log(i);
}	// infinite loop
```

Global variables are so dangerous!
