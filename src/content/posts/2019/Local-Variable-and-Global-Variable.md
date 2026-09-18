---
title: "Local Variable and Global Variable"
date: 2019-04-22
description: "전역변수 (global variable) / 지역변수 (local variable) 변수의 scope와 lifetime 변수는 선언하는 순간부터 속한 scope 내에서 lifetime을 가진다. 즉, 특정 범위의 코드가 실행되고 있을 때는 메모리에 존재하지만, 실행이…"
tags: ["Python", "global variable", "local variavble"]
categories: ["Computer Engineering"]
path: "2019/04/22/Local-Variable-and-Global-Variable"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

# 전역변수 (global variable) / 지역변수 (local variable)

1.  변수의 scope와 lifetime

-   변수는 선언하는 순간부터 속한 scope 내에서 lifetime을 가진다. 즉, 특정 범위의 코드가 실행되고 있을 때는 메모리에 존재하지만, 실행이 끝나면 이 변수는 메모리에서 사라진다.

2.  변수의 선언 위치
    
    a. Block 외부 : block({})으로 감싸진 main 함수와 여러 함수들의 외부 공간에 변수를 선언할 수 있다.
    
    b. Block 내부 : block 내부에 변수를 선언할 수 있다. C는 block의 최상단에 모든 지역변수를 선언해야한다.
    
    c. 함수의 parameter : 함수의 매개변수는 그 함수의 block 내에서 선언된 변수와 동일한 효과를 갖는다.
    
3.  전역변수 (a case)
    

-   Block 외부에 선언되는 변수. 전역 변수는 프로그램이 시작되는 순간부터 종료되는 순간까지 메모리를 차지하고 있으며 사라지지 않는다.
    
-   C라면 `main()` 위, `#include <stdio.h>`와 함수 원형 밑 그 사이에 선언
    
-   전역변수는 어느 block에서도 언제든지 접근이 가능하다 > sycncrinize 고려
    

4.  지역변수 (b case, c case)

-   지역변수는 block 내부에서 선언되는 변수이다. { } 안에 선언되어있다면 무조건 지역변수
    
-   지역변수는 선언된 block 내부로 scope가 한정되며 그 block의 실행이 끝나면 lifetime 또한 소멸된다.
    
-   함수의 parameter로서 선언되는 local variable도 이와 같다. 함수 body 내에서 선언되는 것과 똑같다.
