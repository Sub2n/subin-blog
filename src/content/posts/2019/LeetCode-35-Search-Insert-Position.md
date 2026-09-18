---
title: "LeetCode 35. Search Insert Position"
date: 2019-04-18
description: "LeetCode 35. Search Insert PositionInsert할 Position을 찾는 문제 : C++, Binary Search 사용"
tags: ["Algorithm"]
categories: ["Algorithm", "LeetCode"]
path: "2019/04/18/LeetCode-35-Search-Insert-Position"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [LeetCode 35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)

Insert할 Position을 찾는 문제 : C++, Binary Search 사용

> Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
> 
> You may assume no duplicates in the array.

> Example 1:
> 
> Input: \[1,3,5,6\], 5
> 
> Output: 2

> Example 2:
> 
> Input: \[1,3,5,6\], 2
> 
> Output: 1

> Example 3:
> 
> Input: \[1,3,5,6\], 7
> 
> Output: 4

> Example 4:
> 
> Input: \[1,3,5,6\], 0
> 
> Output: 0

### 요구조건

input으로 들어오는 정렬된 배열 nums와 target으로, target이 nums에 있다면 그 index를 return하고 없다면 순서상 target이 있어야할 자리의 index를 return한다.

### 해결책

처음 문제를 접하고 바로 Binary Search를 사용해야겠다고 생각했다. 원래는 값을 찾으면 return하고 없으면 -1을 return하지만, 이 문제에서는 target이 있어야 할 자리를 return하므로 end + 1을 return했다.

### C++ Solution

![my C++ Solution Submit Page](https://user-images.githubusercontent.com/48080762/56357984-3a65d480-6218-11e9-96a4-27e53817b42a.png)

: Runtime 8 ms | Memory Usage 8.7 MB

```c++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        if(target <= nums[0]) return 0;
        int start = 0;
        int end = nums.size() - 1;
        int mid;
        while(start <= end){
            mid = (start + end) / 2;
            if(target == nums[mid]) return mid;
            else if(target < nums[mid]){
                end = mid -1;
            }else {
                start = mid+1;
            }
        }
        if(start > end) return end+1;
        return -1;
    }
};
```
