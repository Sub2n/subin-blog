---
title: "LeetCode 5. Longest Palindromic Substring"
date: 2019-04-22
description: "LeetCode 5. Longest Palindromic Substring가장 긴, 거꾸로 해도 똑같은 Substring을 찾는 문제"
tags: ["Algorithm"]
categories: ["Algorithm", "LeetCode"]
path: "2019/04/22/LeetCode-5-Longest-Palindromic-Substring"
legacy: true
thumbnail: "/gallery/thumbnails/yellow.png"
---

## [LeetCode 5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)

가장 긴, 거꾸로 해도 똑같은 Substring을 찾는 문제

> Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

> Example 1:
> 
> Input: “babad”
> 
> Output: “bab”
> 
> Note: “aba” is also a valid answer.

> Example 2:
> 
> Input: “cbbd”
> 
> Output: “bb”

### 요구 조건

요구 조건은 간단하다. 한 가지 용어만 정리하고 가면 된다.

Palindrome : “aba” “dccd”와 같이 reverse한 결과와 원본이 같은 단어를 말한다.

주어지는 input의 substring 중 가장 긴 palindromic substring을 return하는 문제다.

### 해결책

그러나 Solution은 간단하지 않았다. Palindromic Substring은 길이도 주어지지 않았고, 앞 뒤가 똑같은지 확인하기 위해서 비교해야할 변수가 많았다.

가장 중요한 건 효율성이다. 어떻게 하면 최소한의 비교로 가장 긴 Palindrome을 찾아낼 수 있을 지 오랫동안 고민했다.

이미 확인한 string은 다시 확인하지 않기 위해 Dynamic Programming을 이용하려고 했으나 실패했다.

`P[i][j] = P[i+1][j-1] and S[i] == S[j]`

이 완벽해보이는 알고리즘을 이용해 해답을 찾으려고 했지만 내가 부족한지 자꾸 i+1, j-1이 이전에 계산이 되지 않아 원하는 답이 나오지 않았다.

아래 두 해답은 다른 사람들의 Solution을 참고한 것이다.

## Python Solution 1

Runtime 5496 ms | Memory Usage 13.3 MB

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        long = ""
        if len(s) <= 1:
            return s
        
        for i in range(len(s)):
            for j in range(len(s), i, -1):
                if len(long) >= j-i:
                    continue
                elif s[i:j] == s[i:j][::-1]:
                    long = s[i:j]

        return long
```

정말 단순히, s의 모든 substring이 palindromic한지 검사하는 알고리즘이다.

## Python Solution 2

Runtime 68 ms | Memory Usage 13.3 MB

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if len(s) <= 1:
            return s
        i,l=0,0
        for j in range(len(s)):
            if s[j-l: j+1] == s[j-l: j+1][::-1]:
                i, l = j-l, l+1
                # print(s[i: i+l])
            elif j-l > 0 and s[j-l-1: j+1] == s[j-l-1: j+1][::-1]:
                i, l = j-l-1, l+2
                # print(s[i: i+l])
        return s[i: i+l]
```

이 Solution은 놀라웠다.

1.  가장 긴 substring의 시작 index를 i에, 길이는 l에 저장한다.
2.  j로 s를 순회하면서 s\[j-l-1:j+1\], 즉 j를 기준으로 l+1만큼의 길이를 가진 (저장된 l의 길이보다 2 더 큰) substring이 palindrome인지 검사한다. 맞으면 i와 l을 update한다.
3.  된다! 그리고 이해도 쉽게 된다.

## 느낀 점

문제를 보는 능력을 기르려면 한참 멀었다는 생각이 들었다. 더 좋은 Solution을 많이 접하고 공부해야겠다.
