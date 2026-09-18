---
title: "LeetCode 28. Implement strStr()"
date: 2019-04-17
description: "LeetCode 28. Implement strStr()strStr()을 구현하기 : javaScript, C"
tags: ["Algorithm"]
categories: ["Algorithm", "LeetCode"]
path: "2019/04/17/LeetCode-28-Implement-strStr"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [LeetCode 28. Implement strStr()](https://leetcode.com/problems/implement-strstr/)

strStr()을 구현하기 : javaScript, C

> Implement strStr().
> 
> Return the index of the first occurrence of needle in haystack, or -1 > if needle is not part of haystack.
> 
> Example 1:
> 
> Input: haystack = “hello”, needle = “ll”  
> Output: 2  
> Example 2:
> 
> Input: haystack = “aaaaa”, needle = “bba”  
> Output: -1

### 요구조건

1.  string haystack에서 needle이 처음으로 등장하는 index를 반환한다. 존재하지 않으면 -1을 반환한다.

### 해결책

1.  javaScript의 indexOf() method를 이용해 해결했다.
2.  method를 쓰지 않고 C로 해결해보려고 했는데 한 1년 C를 쓰지 않았다고 기능이 기억이 나지 않아 여러 번 찾아봐야 했다. 포인터 개념도 다시 한 번 훑어봐야겠다.

### javaScript Solution

![Submit 1 : javaSript](https://user-images.githubusercontent.com/48080762/56282327-dd9be880-6149-11e9-95f8-ba96c666a2c4.png)

: Runtime 56 ms | Memory Usage 33.8 MB

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === "") return 0;
    return haystack.indexOf(needle);
};
```

### C Solution

![Submit 2 : C](https://user-images.githubusercontent.com/48080762/56284645-10e17600-6150-11e9-85ea-a202348ec60b.png)

: Runtime 1300 ms | Memory Usage 7 MB

```c
int strStr(char* haystack, char* needle) {
  if(needle[0] == '\0') return 0;
  int index = -1;
  int hayLen = strlen(haystack);
  int neeLen = strlen(needle);
  
  for(int i=0; i< hayLen; i++){
      if(haystack[i] == needle[0]){
          index = i;
          for(int j=1; j < neeLen ; j++){
              if(i+j >= hayLen || haystack[i+j] != needle[j]){
                  index = -1;
                  break;
              }
          }  
      }  
      if(index > -1) return index;
  }
  return -1;
}
```
