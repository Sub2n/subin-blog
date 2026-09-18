---
title: "CodeWars 6kyu. Multiples of 3 or 5"
date: 2019-04-17
description: "CodeWars 6kyu. Multiples of 3 or 53 또는 5의 배수의 합 구하기"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/17/CodeWars-6kyu-Multiples-of-3-or-5"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Multiples of 3 or 5](https://www.codewars.com/kata/multiples-of-3-or-5/train/javascript)

3 또는 5의 배수의 합 구하기

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
> 
> Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.
> 
> Note: If the number is a multiple of both 3 and 5, only count it once.
> 
> Courtesy of ProjectEuler.net

### 요구조건

어떤 자연수 number 미만의 3 또는 5의 배수를 찾는 문제

### 해결책

1.  input number가 3 또는 5로 나누어 떨어지면 sum에 더하는 방식이다. 문제가 너무 간단하게 풀려서 새로운 방법으로 생각 해보기로 했다.
2.  number를 3, 5로 나누면 그 몫의 개수만큼만 for loop을 돌며 추가한다. 5로 나눈 몫이 항상 3으로 나눈 몫보다 작기 때문에 한 번 더 검사를 해주었다.

### javaScript Solution 1

```js
function solution(number){
  var sum = 0;
  for (var i = 0; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}
```

### javaScript Solution 2

```js
function solution(number){
  var sum = 0;
  var threeMultiples = number/3;
  var fiveMultiples = number/5;
  for(var i=1; i< threeMultiples; i++){
    if(i%5 != 0) sum += i*3;
    if(i < fiveMultiples) sum += i*5;
  }
  return sum;
}
```
