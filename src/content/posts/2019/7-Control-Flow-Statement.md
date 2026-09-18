---
title: "7. Control Flow Statement"
date: 2019-05-03
description: "Controls the flow of code that runs sequentially from top to bottom. Control statements make the flow of code difficult to understand, which detracts…"
tags: ["자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/03/7-Control-Flow-Statement"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

-   Controls the flow of code that runs sequentially from top to bottom.
    
-   Control statements make the flow of code difficult to understand, which detracts from readability.
    
-   Should suppress the use of control statements with using high order functions (map, filter, reduce, forEach)
    

# Block Statement / Compound Statement

-   0 or more statements enclosed in curly braces `{}`
    
-   In other languages, a block creates a scope, but JavaScript creates a function-level scope. Therefore, variables created in block are global variables.
    
-   Block statements (code blocks) are treated as one execution unit.
    
-   A semicolon (;) is usually appended to the end of the statement, but no semicolon at the end of the block statement.
    
    # Conditional Statement
    
-   Determine whether to execute a code block based on the evaluation result of a given conditional expression.
    
    > ### Conditional expression
    > 
    > Expression that can be evaluated as boolean value
    
-   JavaScript provides 2 conditional statements as if..else statements and switch statement
    

### if … else Statement

```js
if (Conditional expression) {
  // This code block is executed if the conditional expression is true.
} else {
  // This code block is executed if the conditional expression is false.
}
```

Most if … else statement can be replaced with the ternary conditional operator discussed in [6\. Operators](https://sub2n.github.io/2019/05/01/6-Operator/1).

### switch Statement

```js
switch (Expression) {
  case Expression1:
   	// The statement to be executed if the expression in the switch statement matches expression 1;
    break;
  case Expression2:
    // The statement to be executed if the expression in the switch statement matches expression 2;
    break;
  default:
    // The statement to be executed when there is no case statement with an expression that matches the expression in the switch statement;
}
```

-   If the code can be represented by if…else, the use of the switch should be avoided whenever possible.
-   Evaluates a given conditional expression and moves the execution order to a case statement with an expression that matches the value.
-   Used when there are more cases than if…else statements.
-   If do not use a break statement in a case, all the cases are checked sequentially to the default due to the **fall through** property of the switch.

# Loop Statement

Loop statement executes the code block repeatedly until the conditional expression is false.

## for Statement

The for statement executes the code block repeatedly until the conditional expression is determined to be false.

```js
for (declaration statement or assignment statement; conditional expression; Increase / decrease expression){
	// Statements that will be executed when conditional expression return true;
}
```

```js
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

## while Statement

The while statement repeatedly executes the code block repeatedly if the evaluation result of the given conditional expression is true.

```js
while (conditional expression){
    // Escape condition is needed
}
```

## do while Statement

It’s the same as while, but once it runs and checks the conditional

# break Statement

The break statement exits the code block.

Actually it escapes the label statement, the for loop (for, for … in, for … of, while, do … while) or the code block of the switch statement.

If a break statement is used in addition to the label statement, the loop statement, or the code block of the switch statement, SyntaxError occurs.

# continue Statement

-   If continue is encountered, the code will stop running and move to the increment or decrement statement of the loop
-   The statements under continue are not executed.
