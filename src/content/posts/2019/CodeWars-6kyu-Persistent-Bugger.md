---
title: "CodeWars 6kyu. Persistent Bugger"
date: 2019-04-19
description: "CodeWars 6kyu. Persistent Bugger각 자릿수의 곱이 한자릿수가 되는 횟수를 구하기"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/19/CodeWars-6kyu-Persistent-Bugger"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Persistent Bugger](https://www.codewars.com/kata/persistent-bugger/train/javascript)

각 자릿수의 곱이 한자릿수가 되는 횟수를 구하기

> Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

> For example:

```js
persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                      // and 4 has only one digit

persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                       // 1*2*6 = 12, and finally 1*2 = 2

persistence(4) === 0 // because 4 is already a one-digit number
```

### 해결책

split()을 사용해서 숫자를 각각 문자열 배열의 원소로 떼어내면 쉬울 것 같았는데 나는 고전적인 방법으로 숫자 그대로를 parsing하고 싶었다. 그래서 이전 LeetCode의 Palindrome 문제를 풀 때 사용한 숫자의 pop 기법을 이용해 한자리씩 숫자를 분리했다.

### javaScript Solution 1

```js
let pop = 0; let count;
let mult, nums;
   
function mul(num){
  mult = 1;
  while(num > 0){
      pop = num%10;
      num = (num-pop)/10;
      mult *= pop;
   }
  nums = mult;
}

function persistence(num) {
   if(num < 10) return 0;
   count = 0;
   nums = num;
   do{
     count++;
     mul(nums);
   }while(mult >= 10)
   
   return count;
}
```
