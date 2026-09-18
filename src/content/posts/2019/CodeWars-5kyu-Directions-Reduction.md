---
title: "CodeWars 5kyu. Directions Reduction"
date: 2019-04-20
description: "CodeWars 6kyu. Dubstep뒤죽박죽 방향 지시를 효율적으로 만들기"
tags: ["TIL"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/20/CodeWars-5kyu-Directions-Reduction"
legacy: true
thumbnail: "/gallery/thumbnails/yellow.png"
---

## [CodeWars 6kyu. Dubstep](https://www.codewars.com/kata/dubstep/train/javascript)

뒤죽박죽 방향 지시를 효율적으로 만들기

Instruction이 길어 생략하도록 하겠다. 위의 링크를 참조하도록 하자.

### 요구조건

1.  북쪽으로 갔다가 남쪽으로, 동쪽으로 갔다가 서쪽으로. 움직이지 않는 것만 못한 비효율적인 지시를 제거하는 문제다.
    
2.  \[NORTH + SOUTH\], \[EAST + WEST\] 와 같이 두 방향이 인접해야지만 제거할 수 있다.
    
3.  \[SOUTH, EAST, WEST, NORTH\]와 같은 경우, 첫번째로 EAST + WEST가 사라지고 나면 SOUTH + NORTH가 인접하게 되므로 이것 또한 제거해 효율적인 지시를 내려야 한다.
    

### 해결책

이전에 LeetCode에서 두어번 풀어보았던 in-place 알고리즘이 떠올랐다. input을 담을 자료구조를 따로 만들지 않고 input 자체에 연산을 하는 작업이다. Call by reference로 parameter를 넘겨줄 때만 유효한 알고리즘이다.

1.  input arr의 item이 한개 이하라면 그냥 arr를 return한다.
    
2.  각 대응되는 direction들을 dictionary의 key와 value로 mapping한다.
    
3.  for문을 돌며 만약 서로 대응되는 방향이 인접해있다면 그 둘을 arr에서 잘라내고, i를 초기화해서 처음부터 다시 arr를 순회한다.
    

### javaScript Solution

```js
function dirReduc(arr){

  if(arr.length <= 1) return arr;
  
  var direction = {"NORTH": "SOUTH",
                  "EAST": "WEST",
                  "SOUTH": "NORTH",
                  "WEST": "EAST"};
                  
  for(var i = 0; i < arr.length; i++){
    if(direction[arr[i]] == arr[i+1]){
      arr.splice(i, 2);
      i = -1;
    }
  }
```
