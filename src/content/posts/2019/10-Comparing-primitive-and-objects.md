---
title: "10. Comparing primitive and objects"
date: 2019-05-07
description: "Difference between primitive type and object type Primitive Type Object Type immutable value mutable value stored as value itself stored as reference…"
tags: ["immutable", "mutable", "object", "pass by reference", "pass by value", "primitive", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/07/10-Comparing-primitive-and-objects"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

## Difference between primitive type and object type

| Primitive Type | Object Type |
| :-: | :-: |
| immutable value | mutable value |
| stored as value itself | stored as reference value (memory address of an object) |
| Pass by value | Pass by reference |

# Primitive Value

## Immutable Value

-   The value of primitive type is an **immutable value**. (Read only, can not change)
-   Can not change value doesn’t mean can not reassign value.
-   Variable can be reassigned a new value, but the value can not be changed.
-   When reassigning a new value to a variable, instead of changing the value stored in the memory space pointed to by the variable, assign a value to the new memory space and make the variable refer to the new memory space. This is because the primitive value is immutable.
-   If the primitive value is a mutable value, the memory address referenced by the variable will not change when reassigning the variable.
-   immutability : Since the primitive value is an immutable value, when the value of the variable is changed, the new value is stored in the new memory space, and the memory space is referred to. This property is called the **immutability** of the primitive value.

> ## Immutable? constant?
> 
> In programming language, variable is a mechanism that store and refer data values. So, constant is also variable but can not assign more than once.
> 
> Variables, and constants are memory spaces that can hold values, and the concept of mutable, immutable is about whether the value can change.
> 
> ```js
> //Constants declared with the const keyword are not reassigned.
> const obj = {};
> 
> obj.a = 1;
> console.log(obj); // {a: 1}
> ```

> Objects declared as `const` can be changed. This is because you are not reassigning a new object to `const`. That is, the constant is only a variable for which reassignment is prohibited.

## String and Immutability

-   String is immutable because it’s also primitive type of JavaScript.
    
-   String is an array-like object.
    
    > ### Array-like Object
    > 
    > An array-like object is an object that is not an array, but can be treated like an array. A string can access each character through an index like an array, or it can be traversed by a for statement. This means that the string can be an object with a length property.
    
-   You can not change `str[0]`, but error doesn’t occur. Just ignore it.
    

![String is immutable value](https://user-images.githubusercontent.com/48080762/57296797-dba1c580-7108-11e9-83bd-86e735652c18.png)

-   But, it is of course possible to reassign the new string. Because it is not a change to the existing string but a new assignment of the new string.
-   The string gives the confidence that the value does not change without reassignment.

## Pass by value

What happens when a variable is assigned to a variable?

If assigned variable is primitive type, the assigned variable value is copied and passed. It’s **pass by value**.

```js
var score = 80;
var mine = score;
```

Variable `score` and `mine` have a value 80, but it’s a separate value in memory. The value 80 in `mine` is not same as 80 in `score`. This is because the memory space of the variables `mine` and `score` is different and each contains a value.

![Pass by Value](https://user-images.githubusercontent.com/48080762/57297341-57e8d880-710a-11e9-9007-36ec715ebcf7.png)

Thus, reassigning another value to the variable `score` does not affect the value of the variable `mine`.

# Object

-   An object is a collection of properties consisting of key and value. A property whose value is a function is called a method.
-   Since the number of properties is not fixed and the object can be added and deleted dynamically, the size of the memory space can not be preset in advance like the primitive value.

> ## How JavaScript manages objects
> 
> Unlike with an class-based object-oriented language, JavaScript can create an object without class and dynamically add a property and method even after an object have been created.
> 
> For this reason, almost modern JavaScript engine uses a function-based dictionary-like structure to score a location of object property in memory.
> 
> This is theoretically more costly and inefficient than object management in class-based object-oriented programming languages such as Java. So V8 JavaScript engine uses hidden class method. A hidden class operates like class in Java.

## Mutable Value

The value of an object (reference) type, that is, an object is a mutable value.

A variable that has been assigned a primitive value has its primitive value as its value.

But, the variable that the object is assigned has a **reference value** as a value. The reference value is **the address of the memory space** in which the created object is stored, itself.

```js
var student = {
    name: 'Park'
};
```

![Assignment of an object](https://user-images.githubusercontent.com/48080762/57298300-d181c600-710c-11e9-96ba-119ba0ffc866.png)

-   `student` variable has a **address of the memory space** where a created object is stored. This is a **reference value**. A variable can access the object by this reference value.
    
-   When evaluating a variable that assigns an object, it returns the object by accessing the actual object through the reference value rather than returning the reference value stored in memory.
    
-   An object pointed by a variable can be added dynamically after it has been created, updated, or deleted. In other words, an object is a **mutable value**.
    
-   Objects can be very large and change fluidly, so instead of reallocating each time as a primitive value and changing the memory address, it changes the object itself to be referenced directly.
    
-   In other words, copying an object as a primitive value (a deep copy) is **expensive and inefficient**, so it copies the reference value.
    
    > ### Shallow copy and Deep copy
    > 
    > -   Shallow copy : copying reference values
    > -   Deep copy : copying and recreating the object itself as a primitive value. The larger the object, the higher the cost.
    

-   A side effect of storing an object’s reference value is that an object can be referenced by multiple identifiers.
    
    ```js
    var student = {
        name: 'Park'
    };
    var teacher = student;
    
    teacher.age = 35;
    
    console.log(teacher);
    console.log(student);
    ```
    
    ![Referenced by multiple identifiers](https://user-images.githubusercontent.com/48080762/57299503-b06ea480-710f-11e9-8dd4-19c322cbf727.png)
    
    -   The property is added only to the object of the teacher variable, but the changes are shared because the objects referenced by the student and teacher are the same.

## Pass by Reference

If you assign a variable that points to an object to another variable, the original reference value is copied and passed. This is called **pass by reference.**

![Pass by Reference](https://user-images.githubusercontent.com/48080762/57299971-d34d8880-7110-11e9-8fc7-1ee9d64a5f13.png)

As shown in the figure above, since the memory address of the same object is referenced, `student` and `teacher` refer to the same object and change it.
