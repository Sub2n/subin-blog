---
title: "Recursion"
date: 2019-04-23
description: "Recursion (재귀) 함수 호출 도중에 자기 자신을 다시 호출하는 것 Base case가 필수 (기초, 종료, 탈출 조건) Base case가 없으면 무한으로 자기 자신을 호출해서 stack overflow가 된다. 재귀함수를 만드는 방법 패턴을 찾는다. 즉,…"
tags: ["Algorithm", "Recursion"]
categories: ["Computer Engineering", "Algorithm"]
path: "2019/04/23/Recursion"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

# Recursion (재귀)

1.  함수 호출 도중에 자기 자신을 다시 호출하는 것
    
2.  Base case가 필수 (기초, 종료, 탈출 조건)
    
    Base case가 없으면 무한으로 자기 자신을 호출해서 stack overflow가 된다.
    

## 재귀함수를 만드는 방법

1.  패턴을 찾는다. 즉, 점화식(Induction)을 만든다.
2.  Base case를 만든다.

## 예제1: Factorial !

-   Basis
    
    0! = 1! = 1
    
-   Induction Step
    
    n! = (n-1) \* (n-2) \* (n-3) \* … 3 \* 2 \* 1
    

```python
def factorial(n):
    if n <= 1:
        return 1
    else:
        return n*factorial(n-1)
```

## 예제2: Fibonacci

-   Basis
    
    fib(0) = fib(1) = 1
    
-   Induction Step
    
    fib(n) = fib(n-1) + fib(n-2)
    

```python
def fib(n):
    if n <= 1:
        return 1
    else:
        return fib(n-1) + fib(n-2)
```

## Fibonacci Dynamic Programming

1.  Memorization (Top Down)

```python
f = [-1 for _ in range(100)]
def fib_memorize(n):
    if f[n] > -1:
        return f[n]
    elif n <= 1:
        f[n] = 1
    else:
        f[n] = fib_memorize(n-1) + fib_memorize(n-2)
    return f[n]
```

2.  Bottom Up

```python
f2 = [-1 for _ in range(100)]
def fib_bottup(n):
    f2[0] = f[1] = 1
    for i in range(2, n+1):
        f[n] = f[n-1] + f[n-2]
    return f[n]
```

## 예제3: Hanoi Tower

[Play Tower of Hanoi](https://www.mathsisfun.com/games/towerofhanoi.html)

```python
def hanoi(n, _from, _by, _to):
    # base case
    if n==1:
        print(f'{n}번째 쟁반을 {_from}에서 {_to}로 옮긴다.')
        return
    hanoi(n-1, _from, _to, _by)
    print(f'{n}번째 쟁반을 {_from}에서 {_to}로 옮긴다.')
    hanoi(n-1, _by, _from, _to)
```
