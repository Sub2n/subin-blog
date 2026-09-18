---
title: "CodeWars 5kyu Maximum subarray sum"
date: 2019-04-25
description: "CodeWars 5kyu. Maximum subarray sumReturn maximum sum of subarrays"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/25/CodeWars-5kyu-Maximum-subarray-sum"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 5kyu. Maximum subarray sum](https://www.codewars.com/kata/maximum-subarray-sum/train/javascript)

Return maximum sum of subarrays

> The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

> maxSequence(\[-2, 1, -3, 4, -1, 2, 1, -5, 4\])
> 
> // should be 6: \[4, -1, 2, 1\]
> 
> Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

> Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.

## Requirement

1.  Should return maximum sum of any subarrays including empty list.
    
2.  Return 0 when all of list’s element is negative numbers.
    

## Solution

I used Dynamic Programming - Bottom up approach to solve this problem. Because I learned on some online lectures about Dynamic Programming recently.

1.  First I catched that all the start and end element in subarray is positive numbers. So I decided to put all positive numbers’ index in positive\_index list.
    
2.  Make a 2 dementional array, sum\[\]\[\] to keep the sum of subarrays.
    
3.  Drew the recurrance Induction of this problem.
    
    -   Basis
        -   sum\[i\]\[i\] = arr\[positive\_index\[i\]\]
        -   sum\[i\]\[i+1\] = arr\[positive\_index\[i\]\] to arr\[positive\_index\[j\]\] (i < positive\_index.length - 1)
    -   Inductive Step
        -   sum\[i\]\[j\] = sum\[i\]\[j-1\] + sum\[j-1\]\[j\] - arr\[positive\_index\[j-1\]\]

## javaScript Solution

![Submit](https://user-images.githubusercontent.com/48080762/56734293-5f6cc100-679d-11e9-8f72-280c1b4514ae.png)

```js
var maxSequence = function(arr){
  var positive_index = []
 
  arr.filter(function positive_check(element, index){
    if(element>0){
      positive_index.push(index);
    }
  })
  
  if (positive_index.length == 0) return 0;
  
  var sum = Array(positive_index.length).fill(null).map(() => Array(positive_index.length));
  var max = Number.MIN_SAFE_INTEGER;

  for(var i=0; i<positive_index.length; i++){
    sum[i][i] = arr[positive_index[i]];
    if(max < sum[i][i]){
        max = sum[i][i];
    }
    if(i+1<positive_index.length){
      sum[i][i+1] = arr.slice(positive_index[i], positive_index[i+1]+1).reduce((a,b)=>a+b);
      if(max < sum[i][i+1]){
        max = sum[i][i+1];
      }
    }
  }
  
  for(var i=0; i< positive_index.length; i++){
    for(var j=i+2; j< positive_index.length; j++){
      sum[i][j] = sum[i][j-1] + sum[j-1][j] - arr[positive_index[j-1]];
      if(max < sum[i][j]){
        max = sum[i][j];
      }
    }
  }
  return max;
}
```

## PPT slides

Made presentations for my algorithm study group

![슬라이드1](https://user-images.githubusercontent.com/48080762/56733714-e7ea6200-679b-11e9-8020-a289b67f909b.PNG)  
![슬라이드2](https://user-images.githubusercontent.com/48080762/56733777-06e8f400-679c-11e9-80d9-9800ff74138e.PNG)  
![슬라이드3](https://user-images.githubusercontent.com/48080762/56733780-08b2b780-679c-11e9-867b-ebac97ab6a38.PNG)  
![슬라이드4](https://user-images.githubusercontent.com/48080762/56733783-0a7c7b00-679c-11e9-9204-664edfe5be0b.PNG)  
![슬라이드5](https://user-images.githubusercontent.com/48080762/56733711-e3be4480-679b-11e9-89f3-c1c7631adb50.PNG)  
![슬라이드6](https://user-images.githubusercontent.com/48080762/56733728-ee78d980-679b-11e9-9439-f0a9e7189cfe.PNG)  
![슬라이드7](https://user-images.githubusercontent.com/48080762/56733730-f173ca00-679b-11e9-9faf-89258b8786a4.PNG)  
![슬라이드8](https://user-images.githubusercontent.com/48080762/56733737-f59fe780-679b-11e9-8932-9983e4cd734a.PNG)  
![슬라이드9](https://user-images.githubusercontent.com/48080762/56733740-f769ab00-679b-11e9-883e-bc4b2a41275c.PNG)  
![슬라이드10](https://user-images.githubusercontent.com/48080762/56733742-f9cc0500-679b-11e9-948e-0cf731d6700c.PNG)  
![슬라이드11](https://user-images.githubusercontent.com/48080762/56733745-fafd3200-679b-11e9-9a82-5883417827df.PNG)  
![슬라이드12](https://user-images.githubusercontent.com/48080762/56733757-fcc6f580-679b-11e9-9674-1f630f832fb5.PNG)  
![슬라이드13](https://user-images.githubusercontent.com/48080762/56733765-fe90b900-679b-11e9-9d97-3b839add0674.PNG)  
![슬라이드14](https://user-images.githubusercontent.com/48080762/56733770-005a7c80-679c-11e9-9fd8-253cac494e0c.PNG)  
![슬라이드15](https://user-images.githubusercontent.com/48080762/56733774-02bcd680-679c-11e9-8d56-627fb0df85a4.PNG)
