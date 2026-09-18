---
title: "3. JavaScript Develop Environment and Execute"
date: 2019-04-30
description: "Before this chapter, What is Web API?While the most common scripting language ECMAscript (more widely known as JavaScript) is developed by Ecma, a…"
tags: ["Node.js", "Web Browser", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/04/30/3-JavaScript-Develop-Environment-and-Execute"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# Before this chapter, What is Web API?

While the most common scripting language ECMAscript (more widely known as JavaScript) is developed by Ecma, a great many of the APIs made available in browsers have been defined at W3C.

## What is scripting?

A script is program code that doesn’t need pre-processing(e.g. compiling) before being run.

In the context of Web browser, scripting usually refers to program code written in **JavaScript** that is **executed by browser when a page is downloaded**, or in response to an **event triggered** by the user.

Scripting can make Web pages more dynamic.  
For Example, without reloading a new version of a page it may

-   allow modifications to the content of that page : DHTML(Dynamic HTML)
-   allow content to be added to or sent from that page : AJAX(Asyncronous JavaScript and XML)

## What scripting interfaces are available ?

The most basic scripting interface developed by W3C is the **DOM**, the Document Object Model which allows programs and scripts to dynamically access and update the content, structure and stype of documents. DOM specifications form the core of DHTML.

Modifications of the content using the DOM by the user and by scripts trigger events that developers can make use of to build rich user interface.

A number of more advanced interfaces are being standardized, for instance:

-   **XMLHttpRequest** makes it possible to load additional content from the Web without loading a new document, a core component of AJAX,
-   **the Geolocation API** makes the user’s current location available to browser-based applications,
-   several APIs make the integration of Web applications with the local file system and storage seamless.

# Execution Environment of JavaScript

All browsers have JavaScript engine that can inpterpreter and execute JavaScript. Not only browser but also Node.js has JavaScript engine. So JavaScript can operate in both browser and Node.js environment. Basically code that operate in browser also operate in Node.js environment too.

But the browser and Node.js have different purpose. The main purpose of browser is execute HTML, CSS, JavaScript to rendering web page on screen, but the other one is provide server development envorinment. So both of browser and Node.js can operate ECMAScript(core of JavaScript) but additional features provided by Node.js and browser and ECMAScript are incompatible.

1.  Node.js environment
    -   ES + Node.js API (file control)
2.  Browser
    -   Rendering HTML, CSS
    -   JavaScript : ES + Web API (created by browser vendors and managed by W3C) (DOM API, event) only browser can execute

As such, the browser supports ECMAScript and client side Web APIs such as DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, and Web worker. Node.js does not support client side Web APIs and supports ECMAScript and Node.js-specific APIs.

# Web Browser

## How does a Web Browser work?

Most programming languages run on Operating System, but JavaScript in Web application runs with HTML and CSS in a browser. So efficient JavaScript programming is available when considering Web browser environment.

Core function of Web browser is that request the Web page user want and represent the response from server in browser.

1.  Web browser receives HTML, CSS, JavaScript, and image files from the server.
2.  HTML and CSS files are parsed by the rendering enginde’s HTML parser and CSS parser,
3.  converted into DOM tree and CSSOM tree,
4.  and combined into a Render Tree. Browser represent Web pages by this Render tree.

JavaScript is processed by JavaScript engine, not the Rendering engine.

1.  HTML parser stops DOM construction process when meet the script tag, and passes control to the JavaScript engine to execute JavaScript code.
2.  Control passed JavaScript engine loads, parses and executes the JavaScript code in script tag or JavaScript file defined in script tag’s src attribute.
3.  Interpreter that used in most modern Web browser doesn’t compile like typical compiler language but compiles and executes a part of source code in complex way.

## Interperter

-   Translates program one statement at a time.
-   It takes less amount of time to analyze the source code but the overall execution time is slower.
-   No intermediate object code is generated, hence are memory efficient.
-   Continues translating the program until the first error is met, in which case it stops. Hence debugging is easy.
-   Programming language like Python, Ruby use interpreters.

## Compiler

-   Scans the entire program and translates it as a whole into machine code.
-   It takes large amount of time to analyze the source code but the overall execution time is comparatively faster.
-   It takes large amount of time to analyze the source code but the overall execution time is comparatively faster.
-   It generates the error message only after scanning the whole program. Hence debugging is comparatively hard.
-   Programming language like C, C++ use compilers.

Source code is composed of simple strings. So interpret string codes to make the **AST(Abstrack Syntax Tree)** that has syntax and semantics.

-   Tokenizing  
    Separate the source code into tokens, the smallest unit of meaning, by lexical analysis.
-   Parsing  
    Syntactically analysis the set of tokens to create AST.
-   Execute code  
    Created AST is converted to byte code or optimized machine code and run by interpreter.

If execution of JavaScript is finished, pass control to HTML parser and resume DOM creation from the time when browser stopped.

As such, browsers process HTML, CSS, and JavaScript **synchronously**. This means creation of DOM can be delayed by blocking from script tag. So the position of script tag has important meaning.

You should put script code at bottom of HTML file. It prevent error that can be occured when JavaScript touch DOM before DOM creation completed.

# Node.js

A client side, or simple web application that works on a web browser, can be developed with just a browser. However, as the project grows in size, it is necessary to introduce external libraries such as React and jQuery, or to use several tools such as Babel, Webpack, ESLint, etc. Node.js and npm are required.

## Node.js and npm

Node.js, announced by Ryan Dahl in 2009 is a JavaScript runtime environment built with Chrome V8 JavaScript engine. Simply, Node.js is JavaScript execution environment that enable JavaScript to run in addition to browser.

npm(node package manager) is JavaScript package manager. Itself a repository include packaged modules available in Node.js and provide CLI to install and management.

---

Reference

[JavaScript Web API](https://www.w3.org/standards/webdesign/script)

[Hello world](https://poiemaweb.com/js-hello-world)
