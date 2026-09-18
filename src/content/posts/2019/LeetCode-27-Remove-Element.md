---
title: "LeetCode 27. Remove Element"
date: 2019-04-16
description: "LeetCode 27. Remove ElementInput 배열의 요소를 제거하기 : in-place Algorithm"
tags: ["Algorithm", "javaScript"]
categories: ["Algorithm", "LeetCode"]
path: "2019/04/16/LeetCode-27-Remove-Element"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [LeetCode 27. Remove Element](https://leetcode.com/problems/remove-element/)

Input 배열의 요소를 제거하기 : in-place Algorithm

> Given an array nums and a value val, remove all instances of that value in-place and return the new length.
> 
> Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
> 
> The order of elements can be changed. It doesn’t matter what you leave beyond the new length.

> Example 1:
> 
> Given nums = \[3,2,2,3\], val = 3,
> 
> Your function should return length = 2, with the first two elements of nums being 2.
> 
> It doesn’t matter what you leave beyond the returned length.

> Example 2:
> 
> Given nums = \[0,1,2,2,3,0,4,2\], val = 2,
> 
> Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.
> 
> Note that the order of those five elements can be arbitrary.
> 
> It doesn’t matter what values are set beyond the returned length.

### 요구조건

1.  배열 nums에서 val의 값을 가진 element를 제거한다.
2.  [in-place](https://en.wikipedia.org/wiki/In-place_algorithm) algorithm으로 연산해야 한다.

이번 문제는 [LeetCode 26. Remove Duplicates from Sorted Array](https://sub2n.github.io/2019/04/15/LeetCode-26-Remove-Duplicates-from-Sorted-Array/)를 오해해서 풀었을 때와 거의 흡사해서 푸는 데에 시간이 오래 걸리지 않았다.

### 해결책

1.  혼자 풀었을 때는 for문에서 nums.length를 검사할 때, nums.length가 splice로 인해서 줄어든 길이를 인식하지 못한다고 생각하여 if문의 마지막에 length = nums.length로 재정의를 했다.  
    스터디원들과 대화를 하며 nums를 직접 접근하고 변형하는 것이므로 그럴 필요가 없다는 것을 알았다.
2.  배열 nums의 길이만큼 for문을 돌며 val과 같은 element를 만나면 배열에서 제거한다.  
    i번 째 loop에서 index = i 자리의 원소가 사라져, i+1번째 원소가 앞으로 당겨지므로, splice 연산 뒤에 i에서 1을 빼준다.

### javaScript Solution

![my Solution Submit Page](https://user-images.githubusercontent.com/48080762/56204600-c219da80-6082-11e9-91ef-d4603cc75146.png)

: Runtime 60 ms | Memory Usage 34.6 MB

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(let i = 0; i < nums.length; i++){
        if(val == nums[i]){
            nums.splice(i, 1);
            i =- 1;
        }
    }
    return nums.length;
};
```

### 배운 점

-   array.splice method에 대해서 제대로 알게 되었다. 원소를 제거하는 것 뿐만 아니라 그 자리에 여러 element를 넣을 수도 있는 유용한 method다.
    
-   여러 명과 알고리즘에 대해 이야기하면 생각지 못한 풀이가 나오는 것이 재밌다.
