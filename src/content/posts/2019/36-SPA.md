---
title: "36. SPA"
date: 2019-06-10
description: "SPA (Single Page Application)Single Page Application은 모던 웹 패러다임으로, 기본적으로 하나의 페이지로 구성된다. 하나의 페이지라는 것은 html 파일이 하나라는 뜻이다. 기존의 Sever-side 렌더링과 비교할 때 배포가…"
tags: ["Routing", "SPA", "Single Page Application", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/06/10/36-SPA"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

## SPA (Single Page Application)

Single Page Application은 모던 웹 패러다임으로, 기본적으로 하나의 페이지로 구성된다. 하나의 페이지라는 것은 html 파일이 하나라는 뜻이다. 기존의 Sever-side 렌더링과 비교할 때 배포가 간단하고 **Native application과 유사한 UX를 제공할 수 있다는 장점**이 있다.

전통적인 웹 방식은 link tag를 사용해서 새로운 페이지를 요청한다. 새로운 페이지(html)를 요청할 때마다 필요한 static resource가 다운로드되고 전체 페이지를 다시 렌더링해야하므로 새로고침이 발생된다.

> #### <a> tag
> 
> <a> tag 클릭시 href attribute의 url의 page로 이동한다. 즉, 화면 전환이 일어나 새로운 html이 렌더링된다. 화면 전환시 화면이 깜빡거리는 웹의 특성은 Native App과 비교해 단점으로 언급되어왔다.

SPA는 기본적으로 Web Application에 필요한 모든 static resource를 처음 한 번에 다운로드한다. 이후에 새로운 페이지를 요청하면 갱신에 필요한 데이터만 전달받고 변경이 필요한 부분만 렌더링하므로 트래픽이 감소하고 Native application과 유사한 UX를 제공한다.

특히 모바일 사용이 증가하고 있는 요즘 SPA는 트래픽의 감소와 속도, 사용성, 반응성 등 **사용자 경험(UX) 향상** 면에서 가치를 갖는다. Mobile First 전략에 부합한다.

그러나 모든 Software Architecture에는 trade-off가 존재하므로 SPA 또한 구조적인 단점을 갖는다.

#### 초기 구동 속도가 느리다.

SPA는 Web Application에 필요한 모든 static resource를 최초 한 번에 다운로드 하므로 초기 구동 속도가 상대적으로 느리다. 그러나 한 번 다운로드가 이루어진 이후에는 모든 resource를 가지고 있으므로 속도가 향상된다.

#### SEO(Search Engine Optimization) Issue

SPA는 Server Rendering 방식이 아닌, 자바스크립트 기반 비동기 모델(Client Rendering 방식)이다. 따라서 SEO가 단점으로 꼽힌다. 그러나 Angular 또는 React 등의 SPA 프레임워크는 Server Side Rendering을 지원하는 SEO 대응 기술이 존재하고 있다.

> ### Web Page vs. Web Application
> 
> 일반적인 정보를 제공하는 단순한 웹 사이트는 Web Page
> 
> 사용자가 웹 사이트에서 **일 (데이터를 입력, 저장, 수정, 삭제 등등)**을 하면 Web Application

## Routing

Routing은 source에서 destination까지의 경로를 결정하는 기능이다. **Application의 routing**은 사용자가 task를 수행하기 위해서 어떤 화면(view)에서 다른 화면으로 화면을 전환하는 Navigation을 관리하기 위한 기능을 의미한다.

일반적으로 **사용자가 요청한 URL 또는 Event를 해석하고 새로운 페이지로 전환하기 위한 데이터를 얻기 위해서 서버에 필요한 데이터를 요청하고 화면을 전환하는 행위**를 말한다.

#### 브라우저가 화면을 전환하는 경우 3

1.  브라우저 주소창에 URL을 입력해서 해당 페이지로 이동
    
2.  웹 페이지의 링크를 클릭해서 해당 페이지로 이동할 수 있다.
    
3.  브라우저의 뒤로가기, 앞으로가기 버튼으로 사용자가 방문한 웹페이지 history의 뒤, 앞으로 이동
    
    ```js
    window.history.back();
    window.history.forward();
    window.history.go();
    ```
    

AJAX Request에 의해서 서버로부터 받은 데이터로 화면을 생성하는 경우, 브라우저 주소창의 URL은 변경되지 않는다. URL이 변경되지 않으면 사용자의 history를 관리할 수 없고 이는 SEO 이슈가 된다. **history 관리를 위해서는 각 페이지가 브라우저의 주소창에서 구별할 수 있는 유일한 URL을 소유해야 한다.**

## SPA and Routing

### 1\. HashBang Method

html 내에서 element의 id 앞에 #를 붙이면 **페이지 리소스를 다시 요청하지 않는다**. 그러나 주소창의 uri는 변경되므로 **페이지마다 고유한 uri를 만들어 history를 이용할 수 있다**.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>SPA</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/index.js" defer></script>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#service">Service</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
  <div class="app-root">Loading...</div>
</body>
</html>
```

```js
(function () {
  const root = document.querySelector('.app-root');

  function render(data) {
    const json = JSON.parse(data);
    root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
  }

  function renderHtml(html) {
    root.innerHTML = html;
  }

  function get(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();

      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) resolve(req.response);
          else reject(req.statusText);
        }
      };
    });
  }

  // switch 문 대신 쓰는 방법
  const routes = {
    '': function () {
      get('/data/home.json').then(render);
    },
    'service': function () {
      get('/data/service.json').then(render);
    },
    'about': function () {
      get('/data/about.html').then(renderHtml);
    },
    otherwise() {
      root.innerHTML = `${location.hash} Not Found`;
    }
  };

  function router() {
    // url의 hash를 취득
    const hash = location.hash.replace('#', '');
    // property 참조 방식 1. o.prop 2. o['prop']
    (routes[hash] || routes.otherwise)();
  }

  // 네비게이션을 클릭하면 uri의 hash가 변경된다. 주소창의 uri가 변경되므로 history 관리가 가능하다.
  // 이때 uri의 hash만 변경되면 서버로 요청을 수행하지 않는다.
  // 따라서 uri의 hash가 변경하면 발생하는 이벤트인 hashchange 이벤트를 사용하여 hash의 변경을 감지하여 필요한 AJAX 요청을 수행한다.
  // hash 방식의 단점은 uri에 불필요한 #이 들어간다는 것이다.
  window.addEventListener('hashchange', router);

  // DOMContentLoaded은 HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
  // 새로고침이 클릭되었을 때, 웹페이지가 처음 로딩되었을 때, 현 페이지(예를들어 loclahost:5003/#service)를 요청하므로 index.html이 재로드되고 DOMContentLoaded 이벤트가 발생하여 router가 호출된다.
  window.addEventListener('DOMContentLoaded', router);
}());
```

결국 HashBang의 목적은 주소창의 uri가 바뀌어도 서버로 해당 uri를 요청하지 않는 것인데, HTML5에서 이를 지원하는 기능을 도입했다.

#### DOMContentLoaded and load

**DOMContentLoaded 이벤트**는 DOM이 만들어지면 발생하는 이벤트로 load 이벤트보다 먼저 발생한다.

**load 이벤트**는 모든 리소스를 다 load했을 때 발생하는 이벤트이다.

### 2\. PJAX Method

HTML5의 Histroy API인 [pushState](https://developer.mozilla.org/ko/docs/Web/API/History_API)와 [popstate 이벤트](https://developer.mozilla.org/ko/docs/Web/Reference/Events/popstate)를 사용한 PJAX 방식이다. pushState와 popstate은 IE 10 이상에서 동작한다.

```js
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>PJAX</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/index.js" defer></script>
</head>
<body>
  <nav>
    <ul id="navigation">
      <li><a href="/">Home</a></li>
      <li><a href="/service">Service</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
  <div class="app-root">Loading...</div>
</body>
</html>
```

이는 Server Side Rendering (Server에서 html을 주는 것)방식과 AJAX 방식이 혼합된 것이다. 그러나 브라우저의 새로고침 버튼을 클릭하면 요청이 서버로 전달된다. 따라서 복잡한 처리가 요구된다.

모던 웹 SPA를 구현하기 위해서는 프레임워크를 사용하는 게 좋을 것 같다.
