---
title: "CodeWars 6kyu. Take a Number And Sum Its Digits Raised To The Consecutive Powers And ..."
date: 2019-04-26
description: "CodeWars 6kyu. Take a Number And Sum Its Digits Raised To The Consecutive Powers And ….¡Eurekal!!Return a number that sum of each digit powered of…"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/26/CodeWars-6kyu-Take-a-Number-And-Sum-Its-Digits-Raised-To-The-Consecutive-Powers-And-¡Eurekals"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Take a Number And Sum Its Digits Raised To The Consecutive Powers And ….¡Eurekal!!](https://www.codewars.com/kata/5626b561280a42ecc50000d1)

Return a number that sum of each digit powered of its own number of digit.

> The number 89 is the first integer with more than one digit that fulfills the property partially introduced in the title of this kata. What’s the use of saying “Eureka”? Because this sum gives the same number.
> 
> In effect: 89 = 8^1 + 9^2
> 
> The next number in having this property is 135.
> 
> See this property again: 135 = 1^1 + 3^2 + 5^3
> 
> We need a function to collect these numbers, that may receive two integers a, b that defines the range \[a, b\] (inclusive) and outputs a list of the sorted numbers in the range that fulfills the property described above.

> Let’s see some cases:
> 
> sumDigPow(1, 10) == \[1, 2, 3, 4, 5, 6, 7, 8, 9\]
> 
> sumDigPow(1, 100) == \[1, 2, 3, 4, 5, 6, 7, 8, 9, 89\]

> If there are no numbers of this kind in the range \[a, b\] the function should output an empty list.
> 
> sumDigPow(90, 100) == \[\]

## 해결책

1.  Put the numbers that fulfill the property to eureka\[\].
    
2.  Used String type casting to use split and reduce method to each number.
    

## javaScript Solution

![Submit screen](https://user-images.githubusercontent.com/48080762/56872698-fddf7780-6a66-11e9-8718-743e7f71933a.png)

```js
function sumDigPow(a, b) {
 eureka = [];
 for(i=a; i <=b; i++){
   digits = String(i).split('');
   if(i == digits.reduce(function(accumulator, currentValue, currentIndex){
     return accumulator + currentValue**(currentIndex+1);
   }, 0)){
     eureka.push(i);
   }
 }
 return eureka;
}
```
