---
title: "CodeWars 6kyu. Build a pile of Cubes"
date: 2019-05-09
description: "CodeWars 6kyu. Build a pile of CubesFind the largest number of cubes can be piled."
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/05/09/CodeWars-6kyu-Build-a-pile-of-Cubes"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Build a pile of Cubes](https://www.codewars.com/kata/build-a-pile-of-cubes/javascript)

Find the largest number of cubes can be piled.

> Your task is to construct a building which will be a pile of n cubes. The cube at the bottom will have a volume of n^3, the cube above will have volume of (n-1)^3 and so on until the top which will have a volume of 1^3.
> 
> You are given the total volume m of the building. Being given m can you find the number n of cubes you will have to build?
> 
> The parameter of the function findNb (find\_nb, find-nb, findNb) will be an integer m and you have to return the integer n such as n^3 + (n-1)^3 + … + 1^3 = m if such a n exists or -1 if there is no such n.

> Examples:
> 
> findNb(1071225) –> 45  
> findNb(91716553919377) –> -1  
> mov rdi, 1071225  
> call find\_nb ; rax <– 45
> 
> mov rdi, 91716553919377  
> call find\_nb ; rax <– -1

## 접근법

Σ k3 (k = 1~n) == ((n \* (n+1))/2))\*\*2 가 m보다 작아야 한다.

따라서 n == Math.sqrt(2 \* Math.sqrt(m)) 에 근사한 값으로 설정한 후 m보다 커질 때까지 반복한다.

## JavaScript Solution

![Solution Submit](https://user-images.githubusercontent.com/48080762/57434636-5c320480-7276-11e9-9045-4b17910f48f8.png)

```js
function findNb(m) {
    let n = parseInt(Math.sqrt(2 * (Math.sqrt(m)))) - 1;
    while ( ((n * (n+1))/2) ** 2 < m ) {
      n++;
    }
    return ((n * (n+1))/2) ** 2 > m ? -1 : n;
}
```
