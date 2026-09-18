---
title: "CodeWars 6kyu. Find The Parity Outlier"
date: 2019-05-01
description: "CodeWars 6kyu. Find The Parity OutlierFind one odd / even number in last all even / odd numbers."
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/05/01/CodeWars-6kyu-Find-The-Parity-Outlier"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Find The Parity Outlier](https://www.codewars.com/kata/5526fc09a1bbd946250002dc)

Find one odd / even number in last all even / odd numbers.

> You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this “outlier” N.

> Examples

```
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
```

## First Solution

![Solution1 submit](https://user-images.githubusercontent.com/48080762/57058944-b1f23400-6ced-11e9-882d-2e346bbc23af.png)

```js
function findOutlier(integers){
  var isOdd = true;
  if (integers[0]%2 == 0){
    // even
    if (integers[1]%2 == 0){
      // even even
      isOdd = false;
    } else{
      // even odd
      if(integers[2]%2 ==0){
        // if even odd even, return odd
        return integers[1];
      } else{
        // else if even odd odd, return even
        return integers[0];
      }
    }
  } else{
    // odd
    if (integers[1]%2 == 0){
      // odd even
      if (integers[2]%2 == 0){
        // if odd even even, return odd
        return integers[0];
      } else{
        // if odd even odd, return even
        return integers[1];
      }
    }
  }
  
  if(isOdd == true){
    for(var i=2; i<integers.length; i++){
      if(integers[i]%2 == 0) return integers[i];
    }
  } else{
    for(var i=2; i<integers.length; i++){
        if(integers[i]%2 != 0) return integers[i];
      }
  }
}
```

## Second Solution

![Solution2 submit](https://user-images.githubusercontent.com/48080762/57058974-d0f0c600-6ced-11e9-9735-00208b67e603.png)

```js
function findOutlier(integers){
  var even = integers.filter(a=>a%2==0);
  var odd = integers.filter(a=>a%2!=0);
  
  return even.length == 1 ? Number(even) : Number(odd);
}
```
