---
title: "Python Data Type and Data Structure | Jupyter 사용방법"
date: 2019-04-18
description: "Jupyter 사용법 | Python Data TypeJupyter notebook window 사용을 기준으로 Window PowerShell을 실행한다. pwd로 현재 폴더를, ls로 현재 폴더에 존재하는 file들을 확인 후 mkdir 폴더이름 command로…"
tags: ["Python"]
categories: ["Python"]
path: "2019/04/18/Python-Data-Type-and-Data-Structure-Jupyter-사용방법"
legacy: true
thumbnail: "/gallery/thumbnails/python.png"
---

# Jupyter 사용법 | Python Data Type

## Jupyter notebook

1.  window 사용을 기준으로 Window PowerShell을 실행한다.
    
2.  `pwd`로 현재 폴더를, `ls`로 현재 폴더에 존재하는 file들을 확인 후 `mkdir 폴더이름` command로 python file을 만들고 실습할 폴더 하나를 생성한다.
    
3.  나는 python-basic이라는 폴더를 만들고 `cd python-basic` 명령으로 해당 폴더로 이동했다.
    
4.  만든 폴더로 이동한 후 cmd에 `jupyter notebook` command를 입력한다.
    
    ![PowerShell에 jupyter notebook 입력](https://user-images.githubusercontent.com/48080762/56360433-97b15400-621f-11e9-9328-7bc93b0eb4d0.png)
    
5.  조금 기다리다보면 (10초 이상 소요) 브라우저 새 창으로 jupyter notebook이 실행된다.
    
    ![jupyter notebook 실행화면](https://user-images.githubusercontent.com/48080762/56360962-1b1f7500-6221-11e9-848b-cfdefbca5d82.png)
    
6.  그림과 같이 우측의 new button을 눌러 새로운 python file을 생성한다.
    
    ![create new python file](https://user-images.githubusercontent.com/48080762/56360884-ea3f4000-6220-11e9-8425-de0b1699311f.png)
    
7.  그럼 새로운 탭에 생성된 file이 보여진다.
    
    ![untitled.ipynb](https://user-images.githubusercontent.com/48080762/56361029-4609c900-6221-11e9-9e4b-3add1af431fa.png)
    
8.  제목을 수정하고 실습을 시작하면 된다!
    

-   method 이름을 치고 `Shift + Tab`을 하면 function의 signature를 확인할 수 있다.
    
    ![function signature 확인 단축키 : shift + tab](https://user-images.githubusercontent.com/48080762/56361146-954ff980-6221-11e9-8607-ac367aaa5ab7.png)
    
-   object (variable)을 입력한 상태에서 `Tab` 키를 누르면 사용 가능한 method들을 확인할 수 있다.
    
    ![method 확인 단축키 : tab](https://user-images.githubusercontent.com/48080762/56361198-b1ec3180-6221-11e9-8bf0-1efaada1f834.png)
    
-   instruction을 작성한 후 `Shift + Enter`를 누르면 해당 line이 실행된다.
    
-   어떤 line에 focus가 있는 상태에서, `ESC + m`을 누르고 `Enter`를 치면 markdown으로 작성할 수 있다.
    

## Python Data Type

1.  Number Type : Int, Float
    
    ![Python Number Type](https://user-images.githubusercontent.com/48080762/56361443-52425600-6222-11e9-97b1-371dc1abd277.png)
    
    javaScript와 다르게 C처럼 int, float등 정수형과 실수형을 구분한다.
    
2.  String
    

-   character와 string의 구분 없이 str type을 가진다.

![String](https://user-images.githubusercontent.com/48080762/56498247-d30f9380-653b-11e9-9411-aa3ed46d0be6.png)

## Python Data Structure

### Mutable and Immutable Object

### Mutable object (변경 가능 객체)

1.  list
2.  dictionary
3.  set

### Immutable object (변경 불가능 객체)

1.  int, float 등 숫자는 immutable : 값을 덮어쓰는 것이 아니라 새로운 memory 공간에 할당하고 그 값을 가리킨다. 이름 객체가 값 객체를 가리키는 것을 binding이라고 한다.
2.  string
3.  Tuple

## Dynamic Typing

![Dynamic Typing](https://user-images.githubusercontent.com/48080762/56497145-5ed2f100-6537-11e9-91f6-df0d42532653.png)

Python은 Dynamic typing 언어로, C / C++ 같은 정적 타이핑 언어처럼 자료형을 미리 선언하지 않아도 알아서 동적으로 자료형을 할당할 수 있다.

## Data Assignment

![Memory Assignment (C / Python)](https://user-images.githubusercontent.com/48080762/56498081-31884200-653b-11e9-86f8-1cc9eb29c9a1.png)

-   C : char a = 10;
    -   A라는 이름을 가진 공간에 10의 값이 저장된다.
    -   20으로 변경시 같은 메모리 공간의 값을 변경한다.
-   Python : a = 10;
    -   10이라는 값을 가진 객체가 생기고, a라는 이름을 가진 객체가 10을 가리키게 된다.
    -   만약 a=20으로 재할당할 경우 20이라는 값을 가진 객체가 생기고 a는 20을 가리켜, 10은 자신을 가리키는 객체가 없으므로 제거된다.
    -   20으로 변경시 10의 메모리공간을 건드리지 않고 새로운 공간을 만든다.
-   Integer, float등 number type은 immutable 객체

### Python 성질

1.  모든 것이 객체  
    : integer가 그냥 4 byte가 아니라 객체로 필요한 것들이 붙어있어 크기를 더 차지함
2.  Overflow  
    : overflow 되는 대신 4 byte를 8 byte로 늘림. 대신 경계검사 하므로 속도 저하

### Language Abstraction

-   Hardware 의존적인 Assembly 언어에서 벗어나 하드웨어 독립적인 C언어로 Coding하고 각 하드웨어 별 어셈블러로 해석하게끔 함 ▶ 하드웨어 추상화 (각 어셈블러가 어떻게 동작하는지 몰라도 C로 코딩하면 됨)
-   Assembly : low level language
-   C / C++ : hardware abstraction 됐으나 memory abstraction X ▶ 메모리를 직접 할당, 해제
-   Java / C# : 언어 자체에서 메모리 할당, 해제 ▶ garbage collection. Memory abstraction O 그러나 Data Type은 선언해줘야함
-   Python / javaScript : Data type abstraction. Interpreter Language
-   Level은 abstraction level을 말하는 것이지 급을 나누는 것이 아님
-   성능은 C/C++ 생산성은 Python
