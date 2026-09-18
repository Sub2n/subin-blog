---
title: "Call by Value, Call by Reference and Call by Object Reference"
date: 2019-04-22
description: "우선 Parameter와 Argument의 차이를 짚고 가도록 한다. ParameterThe names given in the function definition are called Parameters. ArgumentThe values supplied in the…"
tags: ["C", "Call by Object Reference", "Call by Reference", "Call by Value", "Python"]
categories: ["Computer Engineering"]
path: "2019/04/22/Call-by-Value-Call-by-Reference-and-Call-by-Object-Reference"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

우선 Parameter와 Argument의 차이를 짚고 가도록 한다.

## Parameter

The names given in the function definition are called Parameters.

## Argument

The values supplied in the function call are called Arguments.

# Call by Value

-   함수를 호출할 때, 변수의 값을 복사하여 argument로 넘기는 것
    
    ```c
    #include <stdio.h>
    
    void change_value(int x, int val) {
      x = val;
      printf("x : %d in change_value \n", *x);
    }
    
    int main(void) {
      int x = 10;
      change_value(x, 20);
      printf("x : %d in main \n", x);
    }
    ```
    
    ![Call by Value](https://user-images.githubusercontent.com/48080762/56498729-04895e80-653e-11e9-9fcc-11c71a94318b.png)
    
    -   위 코드에서는 단순히 x에 10이라는 값이 복사되어 들어가기 때문에, change\_value(x, 20)에서 x를 변경하더라도 main 함수에서의 x에 영향을 미치지 못한다.

# Call by Reference

-   함수를 호출할 때 변수의 값을 넘기는 것이 아니라, 변수의 주소(변수의 위치)를 복사하여 함수에 넘긴다.
    
-   넘겨받은 주소로 실제 변수에 접근하고 값을 변경할 수 있다.
    
    ```c
    #include <stdio.h>
    
    void change_value(int * x, int val) {
      *x = val;
      printf("x : %d in change_value \n", *x);
    }
    
    int main(void) {
      int x = 10;
      change_value(&x, 20);
      printf("x : %d in main \n", x);
    }
    ```
    
    ![Call by Reference](https://user-images.githubusercontent.com/48080762/56498618-76ad7380-653d-11e9-9dce-3b56346565ce.png)
    
-   주소값을 전달 (참조값을 전달) : 주소값을 알고 있으면 해당 memory 주소에 저장되어있는 값을 참조할 수 있다.
    
-   \*x가 x를 참조하고 있다 : 가리키고 있다.
    
    이를 이해하기 위해서는 pointer에 대한 이해가 필요하다.
    
-   Pointer
    
    ```c
    int *pnum;
    int num = 12345;
    pnum = &num //num의 주소값을 return하여 pnum에 저장
    ```
    
    -   변수를 만들 때 변수 이름 앞에 \*를 붙이면 pointer 변수 됨
    -   &연산자: &오른쪽에 오는 피연산자의 주소값을 반환
    -   \*연산자: 포인터가 가리키는 메모리 공간에 접근할 때 사용되는 연산자. 포인터 변수를 이용해 포인터 변수가 가리키는 변수의 값을 바꿀 수도 있다.

# Call by Assignment (Call by Object Reference)

> The actual parameters (arguments) to a function call are introduced in the local symbol table of the called function when it is called; thus, arguments are passed using call by value (where the value is always an object reference, not the value of the object). \[1\] When a function calls another function, a new local symbol table is created for that call.

이 문장이 나를 얼마나 헷갈리게 했는지 모른다. 그러니까 Python에서는 function의 argument가 call by value로 넘어오는데, 그 value는 언제나 object의 값이 아닌 object의 reference라는 것이다.

> Actually, call by object reference would be a better description, since if a mutable object is passed, the caller will see any changes the callee makes to it (items inserted into a list).

정확하게는 call by object reference라는 설명이 더 맞다. 왜냐면 mutable 객체가 넘어올 때에는 call by reference처럼 원본 값을 변경할 수 있기 때문이다.

-   파이썬은 모든 것이 object이고, Object에는 두 종류가 있다.

1.  Immutable object
    -   int, float, str, tuple
    -   Immtable 객체가 함수의 인자로 전달되면, 처음에는 call by reference로 받지만 값이 변경되면 call by value로 동작한다.
    -   즉, 함수 내에서 formal parameter 값이 바뀌어도 actual parameter에는 영향이 없다.
    -   함수 내부에서 값을 변경할 수 없다!
    -   그래서 tuple은 변경하려면 함수에서 element와 tuple 인자로 넘겨 아예 새로 할당해줘야 함
2.  Mutable object
    -   list, dict, set
    -   Mutable 객체가 함수의 인자로 넘어가면 call by reference도 동작한다. 즉, object referene가 전달되어 actual parameter의 값에 영향을 미칠 수도 있다.
    -   새로운 객체를 할당하는 게 아니라면, 함수 내부에서 값을 변경할 수 있다!

## 정리

-   Python은 함수를 실행할때 Call by reference같은 느낌으로 reference를 넘겨준다. 하지만 이때 넘겨주는 것은 변수(Variable)의 reference가 아니라 변수가 담고 있는 자료(Data)의 reference이다.
-   자료가 mutable하다면 변경해도 reference가 보존되므로 결과적으로 Call by reference처럼 보일 것이고, 자료가 immutable하다면 결과적으로 Call by value처럼 보일 것이다.
