---
title: "CodeWars 6kyu. Playing with digits"
date: 2019-05-02
description: "CodeWars 6kyu. Playing with digitsPlay with digits 😊"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/05/02/CodeWars-6kyu-Playing-with-digits"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Playing with digits](https://www.codewars.com/kata/playing-with-digits/train/javascript)

Play with digits 😊

I changed the type of input n to cycle through each digit.

```js
function digPow(n, p){
  let digitSum = 0;
  let strNum = String(n);
  for(let i in strNum){
    digitSum += strNum[i]**p;
    p++;
  }
  return Number.isInteger(digitSum/n) ? digitSum/n : -1;
}
```

![Submit screen](https://user-images.githubusercontent.com/48080762/57058695-4196e300-6cec-11e9-9f36-2b196d64fba6.png)
