---
title: "Development Environment Setting"
date: 2019-06-03
description: "npm (node package manager) and Modularization자바스크립트는 웹페이지의 보조적인 기능을 수행하기 위해 만들어진 언어로, 다른 범용 프로그래밍 언어와는 달리 모듈 기능이 없다. 모듈이란 애플리케이션을 구성하는 개별적인 요소를 말한다.…"
tags: ["Babel", "Node.js", "Webpack", "npm"]
categories: ["JavaScript"]
path: "2019/06/03/npm"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

## npm (node package manager) and Modularization

자바스크립트는 웹페이지의 보조적인 기능을 수행하기 위해 만들어진 언어로, 다른 범용 프로그래밍 언어와는 달리 모듈 기능이 없다.

모듈이란 애플리케이션을 구성하는 개별적인 요소를 말한다. 일반적으로 파일 단위로 분리된다. 모듈을 기능별로 분리해서 개발의 효율성과 유지보수성이 좋아진다.

그러나 자바스크립트는 파일을 나누었다고 해도 모듈을 로드했을 때 하나의 전역 스코프로 합쳐진다. 즉, 파일 스코프를 지원하지 않는다. 모듈은 그리고 모듈 내부에서 외부로 선택적으로 노출할 수 있는 기능이 있어야 하는데 자바스크립트는 그런 기능이 없었다.

ES6에서 자바스크립트에서도 `<script type="module"></script>`와 같이 모듈을 지원하지만, 2019년 6월 현재까지는 최신브라우저에서만 지원을 하므로 사용할 수 없다.

또한 대형 애플리케이션을 만들 때 모듈의 개수가 백 단위를 넘어갈 때 하나하나를 순서에 맞춰서 import하기 어렵다. 이런 문제를 Webpack과 같은 module bundler를 사용해서 하나의 파일로 만들어(module bundling) 해결할 수 있다.

Babel은 크로스브라우징을 위한 다운그레이드 작업 등의 전처리를 해준다.

Node.js에서는 CommonJS spec을 받아들여 RequireJS 로 모듈화를 구현하고 있다.

### npm

npm은 자바스크립트 패키지 매니저로, Node.js에서 사용할 수 있는 모듈을 패키지화 해서 모아둔 **저장소 역할**과 패키지 설치 및 관리를 위한 **CLI를 제공**한다. 여기서 패키지란 여러 모듈의 구조를 가지고 모여있는 것을 의미한다. 누구나 자신의 패키지를 공개할 수 있으므로 install할 때는 신뢰성 있는 패키지인지 확인해야 한다.

#### node-emoji 설치

![npm emoji install](https://user-images.githubusercontent.com/48080762/58779464-ff293480-8610-11e9-8a00-ae1ae039983a.png)

package.json이 없어서 안 깔림

![Again](https://user-images.githubusercontent.com/48080762/58779663-95f5f100-8611-11e9-8f76-36b0280b4cb9.png)

깔림

[Babel Webpack 개발 환경 구축 1](https://poiemaweb.com/es6-babel-webpack-1)

[Babel Webpack 개발 환경 구축 2](https://poiemaweb.com/es6-babel-webpack-2)
