---
title: "First-class Function"
date: 2019-04-22
description: "First-class Function 프로그래밍 언어 중 함수를 다른 변수와 동일하게 다루는 언어를 함수우선순위(First-class Functions) 가졌다고 표현한다. 함수를 다른 함수의 argument로 사용하고, 함수에서 함수를 return하거나 변수의…"
tags: ["Fisrt-class Function"]
categories: ["Computer Engineering"]
path: "2019/04/22/First-class-Function"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

# First-class Function

-   프로그래밍 언어 중 함수를 다른 변수와 동일하게 다루는 언어를 함수우선순위(First-class Functions) 가졌다고 표현한다.
-   함수를 다른 함수의 argument로 사용하고, 함수에서 함수를 return하거나 변수의 값으로 함수를 할당할 수 있다.

1.  변수에 함수를 할당
    
    ```js
    const foo = function() {
        console.log("foobar");
    }
    // 변수를 사용하여 호출
    foo();
    ```
    

2.  함수를 인자로 전달
    
    ```js
    function sayHello() {
        return "Hello, ";
    }
    function greeting(helloMessage, name) {
      console.log(helloMessage() + name);
    }
    // `sayHello`를 `greeting` 함수에 인자로 전달
    greeting(sayHello, "JavaScript!");
    ```
    

-   다른 함수에 인자로 전달된 함수를 Call Back 함수라고 한다.
-   다른 언어들과 같이 sayHello()를 호출하면 바로 실행되지만, 위와 같이 greeting(satHello, “)의 인자로 전달된 sayHello의 경우 greeting 함수의 helloMessage parameter로 전달된 후에, 필요한 경우 helloMessage()에서 호출된다.
-   전달된 이후 나중에 호출되기 때문에 CallBack 함수라고 불린다.

3.  함수를 return 값으로 전달 (함수 return)
    
    ```js
    function sayHello() {
        return function() {
          console.log("Hello!");
        }
    }
    ```
    
    -   함수가 함수를 반환하는 예시문. JavaScript에서는 함수를 변수처럼 취급하므로 함수를 return할 수 있다.
    -   Higher-Order Function : 함수를 반환하는 함수
