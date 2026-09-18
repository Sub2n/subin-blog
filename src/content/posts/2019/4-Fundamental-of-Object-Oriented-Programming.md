---
title: "4 Fundamental of Object Oriented Programming"
date: 2019-04-24
description: "추상화 | Abstraction ? 추상화란, 복잡한 로직을 가지고 있는 기능에서 그것을 다루기 위해 필요한 최소한의 핵심만을 추출해내는 것을 말한다. 정의만 들으면 어렵다. TV 전원을 예로 들어 생각해보자. 새로 산 TV의 설명서를 보면 TV를 켜려면 전원 버튼을…"
tags: ["Abstraction", "Encapsulation", "Inheritance", "OOP", "Polymorphisim", "자바스크립트"]
categories: ["Computer Engineering"]
path: "2019/04/24/4-Fundamental-of-Object-Oriented-Programming"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

## 추상화 | Abstraction ?

-   추상화란, 복잡한 로직을 가지고 있는 기능에서 그것을 다루기 위해 필요한 최소한의 핵심만을 추출해내는 것을 말한다. 정의만 들으면 어렵다.
    
    TV 전원을 예로 들어 생각해보자. 새로 산 TV의 설명서를 보면 TV를 켜려면 전원 버튼을 누르라고 되어있다. 사용자는 전원 버튼을 누르면 쉽게 TV를 켤 수 있다.
    
    그러나 실제로 TV의 전원 버튼을 누르는 순간 내부 전기회로에서는 복잡한 기능이 실행될 것이다. 사용자는 그것을 알 수 없고, 알 필요도 없다. TV 제작 회사에서 TV에 대한 추상화를 시켜 사용자가 쉽게 TV를 동작시킬 수 있도록 한 것이다.
    
-   함수를 보통 function, routine, procedure 라고 부른다. 이 때, procedure 단위로 추상화를 하고 procdural하게 진행하는 프로그램을 절차 지향 프로그램이라고 한다. 그러나 프로그램이 거대해지고, 코드가 길어지자 프로그램을 객체(object)로 추상화하는 방법론이 나왔고 그걸 적용한 게 객체 지향 프로그램이다.
    

### 절차 지향 Procedural Programming : procedure 단위 추상화

### 객체 지향 Object Oriented Programming : Object 단위 추상화

## Function Abstraction

-   Function Signature (Interface) : function name, parameter, return calue
-   Implementation : operations
-   함수의 명세(Function Signature)와 내부구현(Implementation)을 분리하는 것

# 4 Fundamental of Object Oriented Programming

## Encapsulation

Encapsulation은 모든 object가 그 state(private variables)를 class내부에 private으로 보유하고 있을 때 지켜진다. 다른 object들은 그 state에 직접 접근할 필요 없이, 해당 object의 public object(method)를 호출한다. 결과적으로 object는 자신의 state를 method를 통해 관리한다.

## Abstraction

추상화는 encapsulation을 자연스럽게 확장한 것으로 볼 수 있다.  
추상화를 적용한다는 것은, 각 object를 사용할 때 오직 high-level machanism만을 공개해야한다는 것이다. 이 mechanism은 내부 implementation을 숨기고, 오직 관련된 객체의 operation으로만 접근할 수 있다. 즉, 사용자는 class의 method가 어떻게 작동하는지 알 필요 없이 제공된 interface(method name, parameter, return value)만 알고 사용할 수 있다.

## Inheritance

대부분의 object는 비슷하고 공통된 logic을 공유한다. 상속을 통해 중복되는 코드를 최대한 방지하는 것이 inheritance의 핵심이다. Parent class로부터 child class를 만들 수 있으며, child class는 parent class의 모든 영역을 재사용할 수 있는 특권을 가진다. Parent class의 기능에 자신만의 method를 추가하거나 재정의(override)할 수 있다.

## Polymorphism | One Interface and Multiple Implementations.

다형성. 우리가 parent class와 그로부터 상속받은 여러 child class를 가지고 있을 때, 이 모든 class를 collection처럼 한번에 쓰고 싶을 때가 있을 것이다. Polymorphism은 class를 이렇게 사용할 수 있게 하는 방법 제공한다. Parent class에 interface method를 선언하고(implementation은 하지 않는다!) child class에서 그 method의 implementation을 담당하는 것이다.

> 상속은 많은 형태의 변화를 가능케 한다. Parent class를 상속하는 child class는 parent class로 정의될 수 있다. (ex. Child C = new Parent(); )

## Function OverLoading : 이름은 같지만 signature(parameter 수, data type)는 다른 method를 중복으로 선언하는 것

method 이름은 같아야 한다. Parameter 수는 달라야 하며, 같다면 data type이 달라야 한다.

## Method OverRiding : 부모 클래스의 method 동작 방법을 재정의하여 우선적으로 사용하는 것.

override 하고자 하는 method가 상위 클래스에 존재해야 한다. Method 이름이 같아야 하며, parameter 개수, data type, return type 등 모든 signature를 동일하게 사용한다. 달라지는 것은 내부 구현 뿐이다.

부르는 object만 달라질뿐 method 이름을 동일하게 하면 하나의 method로 여러 기능을 실행할 수 있다.

---

참고 자료 [How to explain object-oriented programming concepts to a 6-year-old](https://medium.freecodecamp.org/object-oriented-programming-concepts-21bb035f7260)
