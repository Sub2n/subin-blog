---
title: "2. What is JavaScript?"
date: 2019-04-29
description: "1. Creation of JavaScriptIn 1995, the Netscape Communications decided to introduce a lightweight programming language to dynamically express static…"
tags: ["ECMA", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/04/29/2-What-is-JavaScript"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# 1\. Creation of JavaScript

In 1995, the Netscape Communications decided to introduce a lightweight programming language to dynamically express static HTML. So JavaScript developed by Brendan Eich.

JavaScript was mounted on Netscape Navigator 2 which is web browser of Netscape Communications, named “Mocha” in March, 1996. In September, renamed to “LiveScript” and finally named as “JavaScript” in December.

So JavaScript is now the standard programming language for all browsers. But JavaScript has not grown smoothly

# 2\. Fragmentation and Standardization of JavaScript

In August 1996, Microsoft added a derived version of JavaScript, “JScript”, to Internet Explorer 3.0. But the problem is that JScript and JavaScript are not standardized and are moderately compatible. In other words, they have competitively begun adding features that only work with their browsers to gain market share in their browsers.

This has led to cross-browsing issues where webpages are not working properly, and it has become extremely difficult to develop webpages that work across all browsers.

Thus, the need for stadard of JavaScript which works same in all browser has begun to be raised. For this, Netscape Communications requested standardization of JavaScript to ECMA International in November 1996.

| Version | Release | Specification |
| --- | --- | --- |
| ES1 | 1997 | First version |
| ES2 | 1998 | Application of the same standards as ISO/IEC 16262 international standards |
| ES3 | 1999 | Regular Expression, try … catch Exception |
| ES5 | 2009 | Standard released with HTML5. JSON, strict mode, accessor property(getter, setter), improved array manipulation (forEach, map, filter, reduce, some, every) |
| ES6 (ECMAScript 2015) | 2015 | let, const, class, arrow function expression(=>), template literal, destructuring assignment, spread operator, rest parameter, Symbol, Promise, Map/Set, iterator/generator, module import/export |
| ES7 (ECMAScript 2016) | 2016 | Exponential operator(\*\*), Array.prototype.includes, String.prototype.includes |
| ES8 (ECMAScript 2017) | 2017 | async/await, Object static method(Object.values, Object.getOwnPropertyDescriptors) |
| ES9 (ECMAScript 2018) | 2018 | Object Rest/Spread Property |

# 3\. History of JavaScript

Early JavaScript was used for limited purposes to perform the supplementary functions of webpages. During this time, most logics were run primarily on Web servers and browsers were simply rendering HTML and CSS delivered from the server.

> ## Rendering?
> 
> Rendering refers to interpreting data expressed in HTML and CSS and expressing it visually on a browser.

In 1999, Ajax(Asynchronous JavaScript and XML), a communication function that allows server and browser to exchange data asynchronously using JavaScript, has emerger under the name of XMLHttpRequest.

Previous webpages worked by receiving complete HTML from the server and rendering the entire web page. So when screen switches, it received a new HTML file from server and started rendering a whole web page again from beginning.

This is a disadvantageous way because unnecessary data communication occurs when receive HTML including unchanged parts from a server and browser should be rendering that whole HTML again including unchanged parts. This causes the screen to flash momentarily when a screen transition occurs, which has been accepted as the limit for web applications.

The advent of Ajax changed the previous paradigm. In other words, it make possible to do not rendering again the parts unnecessary to change and rendering only the part need to change by receiving only a necessary data from server. This enables fast performance and smooth screen transitions similar to desktop applications in web browsers.

In 2005, Google Maps, which operates on JavaScript and Ajax in a web browser, has shown performance and smooth screen transitions that are comparable to desktop applications.

In 2006, the advent of jQuery made it easier to control the rather cumbersome DOM(Document Object Model) and resolved cross-browsing issues to some extent. jQuery quickly secured a large user base. This resulted in the mass production of developers who preferred jQuery, which was easier to learn and more intuitive than JavaScript.

In 2008, V8 JavaScript Engine from google made more fast performance in web browser. With the advent of the V8 JavaScript engine, JavaScript has become a web application development programming language that can provide a user experience(UX) similar to that of desktop applications.

In 2009, the Node.js that enable operate JavaScript in an environment other than a browser emerged. JavaScript is now a standard for web programming languages that cover not only front-end but also back-end areas.

# 4\. JavaScript and ECMAScript

## ECMAScript

ECMAScript refers ECMA-262, which standard specification of JavaScript and defines core syntax such as the type, value, objace and property, function, built-in object, etc. Each

## JavaScript

JavaScript is typically a programming language that encompasses ECMAScript as a core and client side Web API, which is supported separately by the browser.

## Web API

DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker, etc.

Apart from ECMAScript, the client side Web API is managed as a separate specification by the World Wide Web Consortium (W3C).

# 5\. Characteristics of JavaScript

JavaScript is one of the components that compose the web with HTML and CSS, and is the only programming language that works with a web browser. It use basic syntax from C, prototype-based inheritance from Self, first-class function from Scheme.

JavaScript is interpreter language that developer not have to do compile work. Almost modern JavaScript engines(V8 by Chrome, Spidermonkey by FireFox, JavaScriptCore by Safari, Chakra by Microsoft Edge) combined advantage of interpreter and compiler to resole disadvantage of slow interpreter.

Actually JavaScript complie but not make executable file. So JavaScript is interpreter lanuage.

JavaScript is a multi-paradigm programming language that supports imprerative, functional, and prototype-based object-oriented programming.

---

Reference

[자바스크립트란?](https://poiemaweb.com/js-introduction)
