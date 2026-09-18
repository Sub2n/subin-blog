---
title: "30. Event"
date: 2019-05-22
description: "1. Event브라우저의 이벤트는 사용자의 동작에 따라 어느 시점에 발생할 지 미리 알 수 없고 순서 또한 예측할 수 없다. 브라우저에서는 이벤트를 감지할 수 있고 이벤트 발생 시 통지를 해서 사용자와 웹 페이지의 Interaction이 가능케 한다. 이벤트 발생시…"
tags: ["Event", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/22/30-Event"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

### 1\. Event

브라우저의 이벤트는 사용자의 동작에 따라 어느 시점에 발생할 지 미리 알 수 없고 순서 또한 예측할 수 없다. 브라우저에서는 이벤트를 감지할 수 있고 이벤트 발생 시 통지를 해서 사용자와 웹 페이지의 Interaction이 가능케 한다.

이벤트 발생시 실행될 함수를 등록할 수 있다. 이벤트와 함수를 연결하면 함수는 이벤트 발생 전에는 실행되지 않다가 이벤트가 발생하면 실행된다. 이런 함수를 Event Handler 또는 Event Listener라고 한다.

> #### Synchronous & Asynchronous Processing Model
> 
> -   Synchronous
>     -   프로세스가 직렬적, 즉 순차적으로 task를 처리하는 처리 모델
>     -   따라서 중간에 시간이 오래 걸리는 작업이 있으면 다음 작업은 대기한다.
>     -   서버에서 데이터를 요청받아야할 I/O 작업이 실행될 경우에 이후의 작업들은 Block되어 대기한다. 이를 I/O Blocking이라고 한다.
> -   Asynchronous
>     -   Non-Blocking Process Model이라고도 하는 Asyncoronous 처리 모델
>     -   어떤 task가 종료되지 않은 상태라고 해도 대기하지 않고(Non-Blocking) 즉시 다음 task로 넘어간다.
>     -   대부분의 Event를 Asncronous하게 처리한다.

### 2\. Event Loop and Concurrency

브라우저는 Single-thread에서 Event-driven 방식으로 동작한다.

#### Single-thread

Single thread는 하나의 thread만을 사용하기 때문에 어느 한 순간에 하나의 task만을 처리할 수 있다는 것을 의미한다. 그러나 브라우저를 사용하는 사용자는 동시에 여러 웹 애플리케이션을 실행하고 있는 것처럼 느낄 것이다. **Event Loop**가 자바스크립트의 동시성(Concurrency)을 지원하기 때문이다.

#### Call Stack

스택은 LIFO(Last In First Out)으로 마지막에 들어온 task가 먼저 실행된다. 자바스크립트는 하나의 Call Stack을 사용한다. 이는 어떤 task가 종료하기 전에 다른 task는 수행될 수 없음을 의미한다.

#### Heap

Dynamic하게 생성된 Object Instance가 할당되는 영역

#### Event Queue(Task Queue)

Asynchronous process function의 callback 함수, asynchronous event handler, Timer 함수의 callback 함수가 보관되는 영역.

Event Loop에 의해 Call Stack이 비었을 때 순차적으로 Call Stack으로 이동해서 실행된다.

이벤트 발생시 이벤트 핸들러는 Event Queue에 들어갔다가 Call Stack이 비면 Event Loop에 의해서 Call Stack에 진입해 실행된다.

#### Event Loop

Event Loop는 Call Stack의 task와 Event Queue의 task를 주기적으로 확인한다. Call Stack이 비어있는 시점에 Event Queue 내의 Task를 Call Stcak으로 이동시켜 실행하게 한다.

Event Loop가 빠르게 돌며 task를 순간순간 전환하기 때문에 사용자는 여러개의 task를 동시에 실행하고 있다고 느끼는 것이다. 이렇게 한 번에 하나의 task을 처리하면서 마치 동시에 처리하는 것처럼 동작시키는 방법을 Pseudo Parallel이라고 한다.

### 3\. Type of Events

[Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

### 4\. Register Event Handler

-   인라인 이벤트 핸들러
-   이벤트 팬들러 프로퍼티
-   addEventListener 메소드

#### 4.1. Inline Event Handler

```html
<button class="btn" onclick="foo()">Click me!</button>
<script>
  const $button = document.querySelector('.btn');

  function foo() {
    console.log('Clicked!');
  }
</script>
```

HTML element의 이벤트 핸들러 attribute에 inline으로 핸들러를 등록

#### 4.2. Event Handler Property

![EventHandler Property](https://user-images.githubusercontent.com/48080762/58231568-4c381b80-7d72-11e9-8e07-7d111af4fe39.png)

```html
<button class="btn">Click me!</button>
<script>
  const $button = document.querySelector('.btn');
  $button.onclick = function () {
    console.log('Clicked!');
  };
</script>
```

HTML과 JavaScript 코드가 섞이지 않지만 한 개의 Event Handler 프로퍼티에 하나의 Event Handler만을 바인딩할 수 있다.

#### 4.3. addEventListener Method

```html
<button class="btn">Click me!</button>
<script>
  const $button = document.querySelector('.btn');
  $button.addEventListener('click', function() {
    console.log('Clicked!');
  });
</script>
```

EventTarget.addEventListener(eventType, functionName\[, useCapture\])

-   EventTarget : 대상 element
-   `eventTarget`: 대상 element에 바인딩될 이벤트 (String)
-   `fuinctionName`: 이벤트 발생 시 호출될 함수 명, 또는 함수 정의
-   `useCapture`(option): capture 사용 여부
    -   Dafault: false (Bubbling)
    -   true: capturing

addEventListener의 장점

1.  하나의 이벤트에 여러 개의 이벤트 핸들러를 추가할 수 있다.
2.  캡처링을 사용할 수 있다.
3.  HTML element 뿐만 아니라 DOM 요소(HTML, XML, SVG)에도 동작한다.

IE9 이상에서 동작하므로 IE8 이하에서는 attachEvent 메소드를 사용한다.

### 5\. `this` in Event Handler

1.  **Inline Event Handler**
    
    이벤트 핸들러가 일반 함수로 호출되므로 내부의 this는 **전역 객체 window**이다.
    
2.  **Event Handler Property**
    
    이벤트 핸들러가 메소드이므로 내부의 this는 **이벤트에 바인딩된 element**를 가리킨다. event 객체의 currentTarget 프로퍼티 값과 같다.
    
3.  **addEventListener Method**
    
    이벤트 핸들러 내의 this는 addEventListener 메소드를 호출한 element, 즉 **이벤트 리스너에 바인딩된 element**를 가리킨다. **event 객체의 currentTarget 프로퍼티 값**과 같다.
    

이벤트 핸들러 property와 addEventListener method로 등록한 이벤트 핸들러 내부의 this = 이벤트 리스너에 **바인딩된 element** = event.currentTarget

### 6\. Event Flow

#### Event Propagation

HTML element에 이벤트가 발생할 경우 속한 계층을 따라서 이벤트가 전파(Event Propagation)된다.

-   Event Capturing : child element에서 발생한 이벤트가 parent element부터 시작해서 이벤트를 발생시킨 child element까지 도달하는 것
-   Event Bubbling : child element에서 발생한 이벤트가 parent element까지 전이되는 것

버블링과 캡처링은 둘 중 하나만 발생하는 것이 아니라 **캡처링으로 시작해 버블링으로 끝난다.**

addEventListener 메소드의 세번째 argument를 true로 주면 캡처링으로 이동하는 이벤트를 캐치하고, flase 또는 주지 않으면 default로 버블링으로 이동하는 이벤트를 캐치한다.

### 7\. Event Object

이벤트 발생시 event 객체가 동적으로 생성되어 이벤트를 처리할 핸들러에 argument로 전달된다.

```js
function eventHandler(e) {
    console.log(e.clientX, e.clientY);
}
addEventListener('click', eventHandler);
```

#### Event.target

e.target은 **실제로 이벤트를 발생시킨 element**를 가리킨다. Event.target은 this와 반드시 일치하지 않는다.

#### Event.currentTarget

**이벤트에 바인딩된 DOM element**를 가리킨다. addEventListener로 지정한 이벤트 핸들러 내부의 this와 일치한다.

#### Event.type

발생한 이벤트의 종류를 나타내는 문자열을 리턴한다.

#### Event.cancelable

element의 기본 동작을 취소시킬 수 있는지를 나타낸다. => Boolean

#### Event.eventPhase

이벤트가 event flow 상에서 어떤 event phase에 있는지 리턴한다.

| Return | Meaning |
| --- | --- |
| 0 | No Event |
| 1 | Capturing Phase |
| 2 | Target |
| 3 | Bubbling Phase |

### 8\. Event Elegation

여러 child element의 이벤트를 캐치하고 싶을 때 이벤트 위임을 이용해서 parent element에 이벤트 핸들러를 바인딩한다.

또한 어떤 ul element에 동적으로 child li element들이 추가되는 경우, 동적으로 추가되는 element는 DOM에 아직 존재하지 않으므로 이벤트 핸들러를 바인딩할 수 없다. 이런 경우에도 parent element인 ul에 이벤트 핸들러를 바인딩해 event elegation을 사용한다.

이벤트 위임(Event Delegation)은 다수의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 대신 하나의 부모 요소에 이벤트 핸들러를 바인딩하는 방법이다.

Event Delegation은 이벤트가 Event flow에 의해서 bubbling이 되기 때문에 가능한 것이다.

실제로 이벤트를 발생시킨 element는 event.target으로 찾는다.

### 9\. Change Default Operation

Event object는 element의 default 동작을 가지며 element의 parent element들이 이벤트에 대응하는 방법을 변경할 수 있도록하는 메소드를 가진다.

#### Event.preventDefault()

form을 submit하거나 link를 클릭하면 default로 다른 페이지로 이동하는데, 이처럼 element가 가진 default 동작을 막는 메소드가 preventDefault()이다.

```html
<!DOCTYPE html>
<html>
<body>
  <a href="http://www.google.com">go</a>
  <script>
  document.querySelector('a').addEventListener('click', function (e) {
    console.log(e.target, e.target.nodeName);

    // a 요소의 기본 동작을 중단한다.
    e.preventDefault();
  });
  </script>
</body>
</html>
```

#### Event.stopPropagation()

Event flow 상의 어떤 한 element에서 이벤트를 처리한 후에, 더이상 이벤트가 전파되는 것을 중단하게끔 하는 메소드이다. 주로 child와 parent에 동일한 event에 대한 핸들러가 각각 다르게 등록되어있는 경우에 사용한다. child에서 일어난 event에서 op1을 동작해야 하는데 parent로 이벤트가 전파되어 op2가 동작되면 안되기 때문이다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%;}
  </style>
</head>
<body>
  <p>버튼을 클릭하면 이벤트 전파를 중단한다. <button>버튼</button></p>
  <script>
    const body = document.querySelector('body');
    const para = document.querySelector('p');
    const button = document.querySelector('button');

    // default: 버블링
    body.addEventListener('click', function () {
      console.log('Handler for body.');
    });

    // default: 버블링
    para.addEventListener('click', function () {
      console.log('Handler for paragraph.');
    });

    // default: 버블링
    button.addEventListener('click', function (event) {
      console.log('Handler for button.');

      // 이벤트 전파를 중단
      event.stopPropagation();
    });
  </script>
</body>
</html>
```

### preventDefault & stopPropagation

default 동작과 bubbling/capturing을 동시에 중단시킬 수 있는 방법이 있다.

이벤트 핸들러 내에서 `return false;`를 하면 되는데, 이 방법은 jQuery를 사용하거나 inline event handler로 이벤트 핸들러를 return할 때만 동작한다.

```html
<!DOCTYPE html>
<html>
<body>
  <a href="http://www.google.com" onclick='return handleEvent()'>go</a>
  <script>
  function handleEvent() {
    return false;
  }
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
  <div>
    <a href="http://www.google.com">go</a>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
  <script>

  // within jQuery
  $('a').click(function (e) {
    e.preventDefault(); // OK
  });

  $('a').click(function () {
    return false; // OK --> e.preventDefault() & e.stopPropagation().
  });

  // pure js
  document.querySelector('a').addEventListener('click', function(e) {
    // e.preventDefault(); // OK
    return false;       // NG!!!!!
  });
  </script>
</body>
</html>
```
