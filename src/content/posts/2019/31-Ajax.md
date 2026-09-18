---
title: "31. Ajax"
date: 2019-05-26
description: "1. Ajax (Asynchronous JavaScript and XML)브라우저에서 웹페이지를 요청하거나 링크를 클릭하면 서버에서 요청받은 페이지(HTML)을 반환한다. 이 때 HTML에서 로드하는 CSS나 JavaScript 파일도 함께 반환한다. 서버에서…"
tags: ["Ajax", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/26/31-Ajax"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

### 1\. Ajax (Asynchronous JavaScript and XML)

브라우저에서 웹페이지를 요청하거나 링크를 클릭하면 서버에서 요청받은 페이지(HTML)을 반환한다. 이 때 HTML에서 로드하는 CSS나 JavaScript 파일도 함께 반환한다. 서버에서 웹페이지를 받으면 브라우저는 파일을 렌더링해서 화면에 표시한다. **URI이 바뀌면 전체 화면 렌더링을 다시해야해**서 화면이 깜빡하는 문제가 있다.

#### Ajax(Asynchronous JavaScript and XML)

-   XML : JSON이 나오기 이전에 서버와 Data를 주고받기 위해 사용됨

자바스크립트를 이용해서 Asynchronous하게 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식

Ajax는 서버로부터 웹페이지를 받아서 **화면 전체를 다시 그리는 것이 아니라, 페이지 일부만 갱신**할 수 있게 한다.

페이지 전체를 로드해서 렌더링할 필요가 없으므로 퍼포먼스가 빨라지고 화면 표시 효과가 부드러워진다.

### 2\. JSON (JavaScript Object Notation)

**JSON**은 클라이언트와 서버 간 데이터 교환을 위한 규칙. 즉, **데이터 포맷**이다.

JSON은 일반 텍스트 포맷보다 효과적으로 데이터를 구조화할 수 있다.

XML 포맷보다 가볍고 사용하기 간편하고 가독성이 우수하다.

자바스크립트의 객체 리터럴과 비슷하지만 **JSON은 순수한 텍스트**로 구성된 규칙이 있는 Data Structure이다. JSON은 String이다.

```json
{
    "id": 1,
    "name": "Park",
    "checked": true
}
```

**JSON에서 Key는 반드시 `" "`로 둘러싸야 한다.** (‘ ‘ 사용 불가)

#### 2.1. JSON.stiringify

JSON.stringify 메소드는 객체를 JSON 형식 string으로 변환한다.

```js
function init() {
  const hospitalKey = 'hospital';
  const partskey = 'parts';
    ...
  localStorage.setItem(hospitalkey,JSON.stringify(hospital));
  localStorage.setItem(partskey, JSON.stringify(parts));
}
```

#### 2.1. JSON.parse

JSON.parse 메소드는 JSON 형식 data string을 객체로 변환한다.

```js
function checkSelectedPart(part) {
    const parts = JSON.parse(localStorage.getItem(partskey));
    let checkedPart;
    parts.forEach(element => {
        if (element.id === part) {
            element.checked = true;
            checkedPart = element;
        } else {
            element.checked = false;
        }
    });
    localStorage.setItem(partskey, JSON.stringify(parts));
    showParts(checkedPart);
}
```

서버에서 브라우저로 전송하는 JSON 데이터는 모두 string이다. 이 string을 자바스크립트의 객체로 사용하기 위해서는 Internal Object인 JSON의 static 메소드 JSON.parse를 사용한다.

JSON.stringify가 encoding / serialization이면 JSON.parse는 decoding / deserialization이다.

### 3\. XMLHttpRequest

브라우저는 **XMLHttpRequest 객체를 이용해 Ajax Request를 생성하고 전송**한다. 서버가 브라우저의 Request에 Response하면 Ajax Request를 생성했던 XMLHttpRequest 객체가 결과를 처리한다.

### 3.1. Ajax Request

```js
// XMLHttpRequest 객체의 생성
var xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 open. open하며 method와 action 지정
// 상대주소는 html 출처 server 기준. 다른 출처로 요청하면 동일출처원칙에 어긋담
xhr.open('GET', '/users');
// Request를 전송한다
xhr.send();
```

#### XMLHttpRequest.open

new 연산자로 XMLHttpRequest 객체의 인스턴스를 생성 후, XMLHttpRequest.open 메소드를 사용해서 서버로 보낼 Request를 오픈한다.

**XMLHttpRequest.open(method, url\[, async\])**

-   method
    -   HTTP method
    -   “GET”, “POST”, “PUT”, “DELETE”
-   url
    -   Request를 보낼 URL
-   async
    -   default true로 asynchronous 동작
    -   false면 synchronous => blocking 발생

#### XMLHttpRequest.send

XMLHttpRequest.send 메소드로 준비된 Request를 서버에 전달한다.

Request의 method가,

-   GET일 때 : 데이터를 URL의 일부인 **query string으로** 서버로 전송. Pay Load 없고 URL에 넣어 보내므로 send(null)
-   POST일 때 : **데이터(Pay Load)**를 **Request Body에 담아서** 서버로 전송

XMLHttpRequest.send 메소드에는 Request Body에 담아서 서버로 전송할 arguments를 전달할 수 있다.

```js
xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob()); // file 등 binary contents 보내는 방법
// xhr.send({ form: 'data' });
// xhr.send(document);
```

Request Method가 POST가 아니라 GET일 때는 send 메소드의 argument는 무시되고 request body는 null로 설정됨

#### XMLHttpRequest.setRequestHeader

XMLHttpRequest.setRequestHeader 메소드는 HTTP Request Header의 값을 설정한다. 헤더 설정 전에 **반드시 XMLHttpRequest.open 메소드로 Request를 오픈**한 상태여야 한다.

#### Content-type

Request Body에 담아 전송할 데이터의 MIME-type 정보 표현 (contents type)

> #### MIME-type(Multipurpose Internet Mail Extensions)
> 
> 클라이언트에 전송된 문서의 다양성을 알려주기 위한 매커니즘. 웹에서 파일의 확장자는 별 의미가 없으므로 각 문서와 함께 올바른 MIME-type을 전송하도록 서버가 정한다. 브라우저는 MIME-type을 사용해서 리소스를 내려받은 후 해야 할 기본 동작을 결정한다.

자주 사용되는 MIME-type

| Type | Subtype |
| :-: | :-: |
| text Type | text/plain, text/html, text/css, text/javascript |
| Application Type | application/json, application/x-www-form-urlencode |
| Type to upload a File | multipart/formed-data |

```js
// json으로 전송
xhr.open('POST', '/users');
// 서버로 전송할 데이터의 MIME-type 지정
xhr.setRequestHeader('Content-type', 'application/json');
```

#### Accept

HTTP 클라이언트가 서버에 요청할 때 서버로부터 **받을 데이터의 MIME-type을 Accept로 지정** 가능.

```js
// 클라이언트가 Request시 서버가 Send back할 데이터의 MIME-type 지정
xhr.setRequestHeader('Accept', 'application/json');
```

### 3.2. Ajax Response

XMLHttpRequest.onreadystatechange는 요청한 Request에 대해서 서버가 보낸 Response를 감지하고 callback 함수를 실행한다. XHLHttpRequest.readyState 프로퍼티가 변경될 때마다 onreadystatechange 이벤트 핸들러가 호출된다.

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();
// Asynchronous Request open
xhr.open('GET', 'data/test.json');
// send Request
xhr.send();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 이벤트 핸들러 호출
xhr.onreadystatechange = function (e) {
  // 이 함수는 Response가 클라이언트에 도달하면 호출된다.
};
```

**XMLHttpRequest.readyState**로 서버가 보낸 Response가 클라이언트에 도착했는지 알 수 있다.

XMLHttpRequest.readyState의 값은 아래와 같다.

| Value | State | Description |
| :-: | :-: | :-: |
| 0 | UNSENT | XMLHttpRequest.open() 메소드 호출 이전 |
| 1 | OPENED | XMLHttpRequest.open() 메소드 호출 완료 |
| 2 | HEADERS\_RECEIVED | XMLHttpRequest.send() 메소드 호출 완료 |
| 3 | LOADING | 서버 응답 중(XMLHttpRequest.responseText 미완성 상태) |
| 4 | DONE | 서버 응답 완료 |

**XMLHttpRequest.status**로 Response를 분석할 수 있다.

### 4\. Web Server

> #### Web Server
> 
> HTML, CSS, JavaScript, img, XML 등 client가 요청하는 Static file(resource)를 제공
> 
> #### Application Server
> 
> Static resource를 제공할 수 있는 기능은 물론 REST API를 처리할 수 있다.

웹서버(Web Server)는 브라우저와 같은 클라이언트로부터 HTTP 요청을 받아들이고 HTML 문서와 같은 웹 페이지를 반환하는 컴퓨터 프로그램이다.

Node.js로 간단한 웹서버를 생성해서 Ajax 실습을 해보자.

![Express Server](https://user-images.githubusercontent.com/48080762/58472479-4a5ec580-8181-11e9-81b9-ec94d9c68ccd.png)

[http://localhost:3000](http://localhost:3000/)에서 Hello World!를 표시하면 성공

### 5\. Ajax Example

#### 5.1. Load HTML

위에서 만든 webserver-express의 루트인 public 폴더에 data/data.html 파일을 준비한 후, 아래 html 파일을 만들고 실행해본다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://poiemaweb.com/assets/css/ajax.css">
  </head>
  <body>
    <div id="content"></div>

    <script>
      // XMLHttpRequest 객체의 생성
      const xhr = new XMLHttpRequest();

      // 비동기 방식으로 Request를 오픈
      xhr.open('GET', 'data/data.html');

      // Request를 전송한다
      xhr.send();
      console.dir(xhr);

      // Event Handler
      xhr.onreadystatechange = function () {
        // 서버 응답 완료
        if (xhr.readyState === XMLHttpRequest.DONE) {
          // 정상 응답
          if (xhr.status === 200) {
            console.log(xhr.responseText);

            document.getElementById('content').innerHTML = xhr.responseText;
          } else {
            console.log(`[${xhr.status}] : ${xhr.statusText}`);
          }
        }
      };
    </script>
  </body>
</html>
```

정상 실행 되었을 때의 log이다. 서버에 요청해서 응답받은 data/data.html을 xhr.responseText로 취득한다.

![Success](https://user-images.githubusercontent.com/48080762/58473668-251f8680-8184-11e9-9c0a-59110cbc12af.png)

xhr.open(‘GET’, ‘data/data2.html’)로 코드를 수정해서 없는 file을 요청하면 Request의 status는 404, statusText는 Not Found이다.

![Fail](https://user-images.githubusercontent.com/48080762/58473745-5b5d0600-8184-11e9-90c6-354839bec8e9.png)

#### 5.2. Load JSON

다음은 위에서처럼 html을 통째로 받아오는 것이 아니라 JSON 객체를 전달받아 parsing하고 필요한 정보를 뽑아서 렌더링하는 예제이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://poiemaweb.com/assets/css/ajax.css">
  </head>
  <body>
    <div id="content"></div>

    <script>
      // XMLHttpRequest 객체의 생성
      var xhr = new XMLHttpRequest();

      // 비동기 방식으로 Request를 오픈
      xhr.open('GET', 'data/data.json');

      // Request를 전송
      xhr.send();

      xhr.onreadystatechange = function () {
        // 서버 응답 완료
        if (xhr.readyState === XMLHttpRequest.DONE) {
          // 정상 응답
          if (xhr.status === 200) {
            console.log(xhr.responseText);

            // Deserializing (String → Object)
            responseObject = JSON.parse(xhr.responseText);

            // JSON → HTML String
            let newContent = '<div id="tours"><h1>Guided Tours</h1><ul>';

            responseObject.tours.forEach(tour => {
              newContent += `<li class="${tour.region} tour">
                  <h2>${tour.location}</h2>
                  <span class="details">${tour.details}</span>
                  <button class="book">Book Now</button>
                </li>`;
            });

            newContent += '</ul></div>';

            document.getElementById('content').innerHTML = newContent;
          } else {
            console.log(`[${xhr.status}] : ${xhr.statusText}`);
          }
        }
      };
    </script>
  </body>
</html>
```

#### 5.3. Load JSONP

> #### Same-origin Policy (동일출처원칙)
> 
> 보안상의 이유로 다른 도메인(http, https / 다른 port)로 요청하는 Cross-domain Request는 제한된다.

동일출처원칙을 우회하는 방법 세가지

1.  웹서버의 프록시파일
    
    Proxy (원격 서버로부터 데이터를 수집하는 별도 기능)를 서버에 추가
    
2.  JSONP
    
    이해 안 감
    
3.  **Cross-Origin Resource Sharing (CORS)**  
    서버에서 처리하니까 백엔드에 요청하면 됨
