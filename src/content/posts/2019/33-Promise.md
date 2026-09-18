---
title: "33. Promise"
date: 2019-05-27
description: "What is Promise?자바스크립트는 비동기 처리를 위해서 callback 함수 패턴을 사용한다. 그러나 callback 패턴은 가독성이 나쁘고 에러의 예외 처리가 곤란하다. ES6에서 Asynchronous processing을 위한 패턴으로 Promise를…"
tags: ["Promise", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/27/33-Promise"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

## What is Promise?

자바스크립트는 비동기 처리를 위해서 callback 함수 패턴을 사용한다. 그러나 callback 패턴은 가독성이 나쁘고 **에러의 예외 처리가 곤란**하다. ES6에서 Asynchronous processing을 위한 패턴으로 Promise를 도입했다.

Promise는 비동기 처리를 하고 Response가 오면 해야할 일을 약속하는 것이다.

## 1\. Disadvantages of Callback Pattern

### 1.1. Callback Hell

자바스크립트의 Asynchronous Processing Model(non-blocking)은 task를 parallel 처리해서 다른 task가 blocking되지 않는다는 장점이 있다.

그러나 callback 패턴을 사용하면 processing 순서를 위해서 여러 개의 callback 함수가 nesting되어 프로그래밍의 복잡도가 높아진다. 그래서 Callback Hell이 발생한다.

비동기 함수(asynchronous function)의 경우 언제 Request에 대한 Response가 올지 알 수 없으므로 비동기 함수의 처리 결과를 가지고 무언가를 해야할 경우 해당 함수의 callback 함수 내에서 처리해야한다. 이로 인해서 중첩이 계속되어 callback hell이 발생한다.

### 1.2. Error Handling Limits

```js
try {
  setTimeout(() => { throw 'Error!'; }, 1000);
} catch (e) {
  console.log('에러를 캐치하지 못한다..');
  console.log(e);
}
```

setTimeout의 argument로 넘겨주는 callback 함수는 setTimeout이 아닌 다른 곳에서 실행된다. setTimeout은 비동기 함수이므로 호출되는 즉시 종료되어 Call Stack에서 제거된다.

Exception(예외)는 Caller 방향으로 전파되는데, setTimeout의 callback 함수의 Caller는 setTimeout 함수가 아니므로 catch block에서 exception이 캐치되지 않는다.

이러한 문제를 보완하기 위해서 ES6에서 Promise를 도입했다. IE를 제외한 대부분의 브라우저가 Promise를 지원한다.

## 2\. Creation of Promise

Promise constructor function은 비동기 작업을 수행할 callback 함수를 argument로 전달받는다. 이 callback 함수는 resolve, reject 함수를 argument로 전달받는다.

```js
const promise = new Promise((resolve, reject) => {
	// Asynchronous process
	if (/* Asynchronous process Fulilled */) {
        resolve('result');
    } else {
        /* Asynchronous process Rejected */
        reject('failure reason');
    }
});
```

Promise는 비동기 처리의 state 정보를 가진다.

| State | Meaning | Implementation |
| --- | --- | --- |
| pending | 비동기 처리 수행 전 | resolve / reject 함수 호출 전 |
| fulfilled | 비동기 처리 수행됨 (성공) | resolve 함수 호출된 상태 |
| rejected | 비동기 처리 수행됨 (실패) | reject 함수 호출된 상태 |
| settled | literally 비동기처리 수행됨 (성공 또는 실패) | resolve 또는 reject 함수 호출된 상태 |

## 4\. Post-processing Method of the Promise

Promise로 구현된 비동기 함수는 Promise object를 리턴해야한다. Promise로 구현된 비동기 함수를 호출하는 promise consumer는 Promise object의 후속 처리 메소드(then, catch)를 통해서 해당 비동기 함수의 결과 또는 에러메시지를 받아서 처리한다. Promise object의 state에 따라서 후속 처리 메소드를 chaining 방식으로 호출한다.

> #### then
> 
> then 메소드는 두 개의 콜백 함수를 argument로 전달받는다. **첫 번째 callback 함수는 성공**(fulfilled, resolve 함수가 호출된 상태) 시 호출되고 **두 번째 callback은 실패**(rejected, reject 함수가 호출된 상태) 시 호출된다.
> 
> ```js
> p.then(onFulfilled, onRejected);
> p.then(function(value) {
>   // fulfilled
>   }, function(reason) {
>   // rejected
> });
> ```

> `onFulfilled`
> 
> ​ Promise가 성공했을 때 호출되는 function. **Fulfillment value** (수행 결과) (Promise의 resolve argument에 넘겨준 response) 하나를 argument로 받는다. Promise를 리턴한다.
> 
> `onRejected`
> 
> ​ Promise가 거부되었을 때 호출되는 function. **Rejected reason** (에러 이유) (Promise의 regect argument에 넘겨준 error mesagge) 하나를 argument로 받는다. Promise를 리턴한다.

> #### catch
> 
> **예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출**된다.
> 
> ```js
> p.catch(onRejected);
> 
> p.catch(function(reason) {
>    // rejected
> });
> ```

> `onRejected`
> 
> ​ Promise가 거부되었을 때 호출되는 function. Rejected reason을 argument로 받는다.

### 5\. Error Handling of Promise

```js
const $result = document.querySelector('.result');
const render = content => { $result.innerHTML = JSON.stringify(content, null, 2) };

const promiseAjax = (method, url, callback, payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));  // undefined를 strungify하면 undefined (string 아님)
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status >= 200 && xhr.status < 400) { // 200: GET ok, 201: POST ok
                // 성공 => resolve
                resolve(JSON.parse(xhr.response));
            } else { // 실패 => reject
                reject(`${xhr.status} ${xhr.statusText}`);
            }
        };
    });
};

promiseAjax('GET', 'http://localhost:3000/todos')
      .then(render)
      .catch(error => console.log(`ERROR!: ${error}`));
```

비동기 함수 promiseAjax 내부의 비동기 처리시 발생한 에러 메시지는 promiseAjax이 리턴하는 Promise object의 then 메소드의 두번째 argument callback 함수나 catch 메소드로 처리한다.

catch 메소드는 then의 두번째 argument callback 함수와 똑같이 에러를 처리하지만, then 뒤에 호출되어 then 내부에서 발생한 에러도 캐치할 수 있다. 따라서 **에러 처리는 catch 메소드를 사용하는 게 효율적**이다.

> #### Async & Await 이용
> 
> ```js
> (async function() {
>     try {
>         const res = await promiseAjax('GET', 'http://localhost:3000/todos');
>         render(res);
>     } catch(e) {
>         console.log(`ERROR!: ${e}`);
>     }
> }());
> ```

> Promise에 async와 await를 이용하면 try, catch로 에러처리를 할 수 있다.

## 6\. Promise Chaining

Promise는 후속 처리 메소드를 Chainning해서 여러 개의 Promise를 연결하여 사용할 수 있다. Callback Hell을 해결한다.

여러 개의 Promise를 연결한다는 것은, Promise object의 후속 처리 메소드인 then이나 catch가 또 다른 Promise object를 리턴하도록 하는 것이다.

```js
// promiseAjax 함수가 리턴하는 Promise callback에서 JSON.parse 안 하고 리턴할 경우
promiseAjax('GET', 'http://localhost:3000/todos')
    .then(JSON.parse)
	.then(render)
    .catch(error => console.error(`ERROR!: ${error}`));
```

### 7\. Static Methods of Promise

Promise는 주로 생성자로 사용되지만 4가지 Static method를 갖는다.

### 7.1. Promise.resolve / Promise.reject

Promise.resolve와 Promise.reject 메소드는 존재하는 값을 **Promise로 wrapping**하기 위해 사용

Static method resolve는 argument로 전달된 값을 resolve하는 Promise를 생성

```js
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1, 2, 3]
```

Static method reject는 argument로 전달된 값을 reject하는 Promise를 생성

```js
const rejectedPromise = Promise.reject(new Error('Error!'));
rejectedPromise.catch(console.log);	// Error: Error!
```

### 7.2. Promise.all

Promise.all 메소드는 argument로 Promise가 담겨 있는 Iterable을 받는다. 그리고 전달 받은 Promise들을 parallel로 처리하고 결과를 전달받은 순서대로 resolve하는 새로운 Promise를 리턴한다. Promise.all은 Promise가 순서대로 처리되지 않아도 모든 Promise 처리가 완료될 때가지 기다려 순서대로 resolve한다. 즉, **처리 순서를 보장**한다.

Promise 처리가 하나라도 실패하면 **가장 먼저 실패한 Promise가 reject한 에러를 reject하는 Promise를 즉시 리턴**한다.

### 7.3. Promise.race

Promise.race 메소드는 Promise.all 메소드와 비슷게 argument로 Promise가 담겨있는 Iterable을 전달받지만, Promise.all과 다르게 **가장 먼저 처리된 Promise가 resolve한 결과를 resolve하는 새로운 Promise를 리턴**한다.
