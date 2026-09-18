---
title: "CodeWars 6kyu. Consecutive strings"
date: 2019-05-07
description: "CodeWars 6kyu. Consecutive stringsFind longest k consecutive strings"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/05/07/CodeWars-6kyu-Consecutive-strings"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Consecutive strings](https://www.codewars.com/kata/consecutive-strings/javascript)

Find longest k consecutive strings

> You are given an array strarr of strings and an integer k. Your task is to return the first longest string consisting of k consecutive strings taken in the array.

> Example:
> 
> longest\_consec(\[“zone”, “abigail”, “theta”, “form”, “libe”, “zas”, “theta”, “abigail”\], 2) –> “abigailtheta”

> n being the length of the string array, if n = 0 or k > n or k <= 0 return “”.

> Note
> 
> consecutive strings : follow one after another without an interruption

## JavaScript Solution

```js
function longestConsec(strarr, k) {
    if (strarr.length == 0 || k > strarr.length || k <= 0) return '';
    
    let longStr = '';
    
    let newStr = '';
    
    for (let i = 0; i < strarr.length; i++){
      newStr = strarr.slice(i, i+k);
      if (newStr.join('').length > longStr.length ){
        longStr = newStr.join('');
      }
    }
    
    return longStr;
}
```
