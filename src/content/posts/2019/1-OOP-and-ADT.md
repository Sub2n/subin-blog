---
title: "1. OOP and ADT"
date: 2019-04-29
description: "Object-oriented DesignObject-oriented design has fundamnental defferences from structured programming design methods. The two methods are similar in…"
tags: ["ADT", "Abstraction", "Encapsulation", "OOP"]
categories: ["Computer Engineering", "Data Structure"]
path: "2019/04/29/1-OOP-and-ADT"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

# Object-oriented Design

Object-oriented design has fundamnental defferences from structured programming design methods. The two methods are similar in that they develop complex systems with divide and conquer, but differ in how to divide a given task.

## Algorithmic Decomposition vs Object-oriented Decomposition

Traditional programming techniques used to algoritmicc decomposition. Algorithmic or functional decomposition treats software as a process and breaks it down into modules that represent the steps of the process. These modules are implemented in language syntax such as procedure of Pascal, subprogram of FORTRAN, function in C. Data Structure to implement the program is of secondary concern and should be considered only after the project has been divided into functional modules.

Object-oriented decomposition views software as set of Well-defined objects that model software well for entity in applications. These objects form software sysyem by interaction. Functional decomposition should be considered after system decomposied to objects.

The majot positive of object-oriented design is reuse of software. This enables flexible software systems that can change and evolve as the requirements of the system change.

## Basic concept of Object-oriented Programming

Definition : An object is an entity that performs calculations and has states. So object can be considered compination of data and operations.

Definition : OOP has methods such as ..

1.  An object is basic building block.
2.  Each object is instance of some type(class).
3.  Classes are connected each other by inheritance. (Programming not using inheritance does not considered as object-oriented programming)

Definition : Called object-oriented language if some language has a function like ..

1.  Support object
2.  All objects are involved in class
3.  Support inheritance

A language support 1, 2 not 3 called “object-based language”. (JavaScript)

# Data Abstraction and Encapsulation

The concept of abstraction and encapsulation is used to human-machine interaction.

Definition : Data encapsulation(or Information Hiding) hides the detailed implementation of data objects from the outside world.

Definition : Data abstraction is the separation of specification and implementation of data objects.

C++ has `char`, `int`, `float`, `double` as a default data type. These data types are modified if `short`, `long`, `signed`, `unsigned` keywords are used. All programming languages provide at least a minimum of predefined data types, plus the ability to create new user-defined types.

Definition : Data type is set of objects and operations of that objects.

Whatever program addresses default data type or user-defined data type, object and operation must be considered.

Definition : ADT(Abstraction Data Type) is a data type in which the specifications of objects and the specifications of operations on these objects are separated from the representation of the objects and the implementation of the operations.

To emphasize the separation of specification and implementation, the ADT definition of the object will begin first. In this way, people can understand the essential elements of an object without a complex description of the representation of the object and the actual implementation of the operation.

---

ADT NaturalNumber is  
Object : from 0 to MAXINT  
Functions :  
All x, y in NaturalNumber
