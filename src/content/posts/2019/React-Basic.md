---
title: "React Basic"
date: 2019-07-13
description: "React &amp; Angular 비교React Facebook이 만든 Frontend Framework 오로지 View만 관리 Facebook, Netflix, Airbnb 등 Angular 구글이 만든 Frontend Framework Framework로서 많은…"
tags: ["React"]
categories: ["JavaScript", "React"]
path: "2019/07/13/React-Basic"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## React & Angular 비교

#### React

-   Facebook이 만든 Frontend Framework
-   오로지 View만 관리
-   Facebook, Netflix, Airbnb 등

#### Angular

-   구글이 만든 Frontend Framework
-   Framework로서 많은 기능 내장 (Router, Auth, animation 등)

#### 필요 Skill

|  | React | Angular |
| :-: | :-: | :-: |
| **TypeScript** | 선택 | 필수 |
| **RxJS** | 선택 | 필수 |
| **상태관리** | Redux / Mobx | Angular Service |

## Framework 쓰는 이유

#### 생산성과 효율성 ↑

## Start React

```bash
npx create-react-app my-app
```

-   `serviceWorker.js`와 `menifest.js`로 Progressive Web App

#### public

-   index.html
-   menifest.js

#### src

-   App.js
    
-   index.js
    
-   serviceWorker.js
    

```bash
yarn start
```

## JSX & 가상 DOM

### JSX(JavaScript Like XML)

-   React의 Element를 생성하는 방법
-   `{ }`로 감싸고 JavaScript Code 작성
-   CSS class 적용 위해서 class =” “ 대신 className=” “ 사용
-   function 은 render 내장되어 return하면 되지만 class에서는 JSX를 return하는 render함수를 사용해야함

### Functional Component

Life Cycle이 없음

Parent Component로부터 Props를 받기만 함

### Class Component

자체 Life Cycle이 있음

### 가상 돔 (Virtual DOM)

Real DOM의 상태를 Memory에 저장해서 ReactDOM 등의 Library를 이용해 Real DOM과 동기화 하는 방법

## props & state

Parent Component에서 Child로 data 전송시

```js
// parent.js

constructor() {
  this.state = {
    text: ''
  }
}

setText = (content = '') => {
	// Child가 전달한 content를 state에 반영
  this.setState({
    test: content
  });
}

render() {
  return (
  	<Child title="Hi" text={this.setText}>
	)
}
```

```js
// child.js
export defualt class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    return (
    	<div>
      	{ props.title }
      	<button onClick={() => this.props.text('test')}>
      </div>
    )
  }
}
```

-   React는 화살표 함수 써야 this 전달 용이
