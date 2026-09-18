---
title: "LeetCode 26. Remove Duplicates from Sorted Array"
date: 2019-04-15
description: "LeetCode 26. Remove Duplicates from Sorted Array정렬된 배열에서 중복되는 값 제거 : in-place Algorithm"
tags: ["Algorithm", "javaScript"]
categories: ["Algorithm", "LeetCode"]
path: "2019/04/15/LeetCode-26-Remove-Duplicates-from-Sorted-Array"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [LeetCode 26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

정렬된 배열에서 중복되는 값 제거 : in-place Algorithm

> Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.
> 
> Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

> Example 1:  
> Given nums = \[1,1,2\],
> 
> Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.
> 
> It doesn’t matter what you leave beyond the returned length.

> Example 2:  
> Given nums = \[0,0,1,1,1,2,2,3,3,4\],
> 
> Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.
> 
> It doesn’t matter what values are set beyond the returned length.

### 요구조건

1.  배열 nums에서 중복되지 않는 원소의 수를 return한다.
2.  배열 nums는 중복되지 않는 수로 앞부분이 정렬되어야한다.

문제는 위의 설명과 같이 nums라는 number형 array를 입력받아 중복되는 element 대신 다음 element를 그 자리에 오게 하는 것이다. 나는 처음에 중복된 element를 제거한 새로운 배열을 return해 여러 번 오류가 났었다.

이 문제의 핵심은 nums 배열이 referance로 넘어온다는 것이다. 즉, 새로운 배열을 만들지 않고 원본 nums의 값을 바꿔야한다.

솔루션을 도출하기까지 나를 헷갈리게 한 것은 한 element를 제거하고 나면 nums의 index부터 길이가 매번 변화한다는 것이다. 처음에 그 부분을 캐치하지 못해 여러 번 오류가 났다.

### 해결책

1.  처음에 문제를 완벽하게 이해하지 못해서, nums 배열의 중복을 완전히 제거하는 것인줄로만 알았다. 그래서 `array.splice` method를 이용해서 중복되는 부분을 제거했다.
2.  첫번째 Solution을 제출한 후 다른 사람들의 풀이를 보고 문제를 다시 제대로 이해했다.

### javaScript Solution 1

: Runtime 92 ms | Memory Usage 37.3 MB

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    var prev= nums[0];
    for(var i = 1; i < nums.length; i++){
        if(nums[i] == prev){
            prev = nums[i];
            nums.splice(i, 1);
            i -= 1;
        } else{
            prev = nums[i];
            continue;
        }
    }
};
```

### javaScript Solution 2

: Runtime 72 ms | Memory Usage 37.3 MB

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums.length == 0) return 0;
    let prev = 0;
    for(let i = 1; i < nums.length; i++){
       if(nums[i] != nums[prev]){
           prev++;
           nums[prev] = nums[i];
       }
    }
    return prev+1;
}
```

### 배운 점

영어라고 해서 대충 Example만 보고 바로 문제를 풀려고 하는 습관을 고쳐야겠다. 문제를 제대로 해석하고, 알고리즘을 짜는 것이 훨씬 효율적인 것 같다.
