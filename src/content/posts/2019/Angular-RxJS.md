---
title: "Angular RxJS"
date: 2019-06-25
description: "Reactive Programming Reactive Programming is programming with asynchronous data streams. You can listen to that stream and react accordingly.…"
tags: ["Observable", "Reactive Programming"]
categories: ["JavaScript", "Angular"]
path: "2019/06/25/Angular-RxJS"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Reactive Programming

> **Reactive Programming is programming with asynchronous data streams.** **You can listen to that stream and react accordingly.**

**Reactive Programming은 비동기적 데이터 스트림을 처리하는 프로그래밍 패러다임**이다. Data stream이란 연속적인 데이터의 흐름을 말한다. Reactive Programming은 모든 것을 stream으로 본다. Event, AJAX 요청 등 모든 data stream을 시간 순서에 의해 전달되는 stream으로 처리한다.

최근 참여한 FrontEndgame 컨퍼런스에서 Functional Programming과 Reactive Programming을 융합한 FRP에 대한 발표가 있었는데 이제 Reactive Programming을 공부해본다.

여태까지는 입력받는 Data가 synchronous한지 asynchronous한지에 따라서 처리하는 방법이 달라진다. 입력이 string일 때와 Promise/event 등일 때는 코딩하는 방법이 달라진다. Reactive Programming은 data를 async, sync로 구분하지 않고 data를 stream으로 보는 것이다. Data consumer는 Data producer가 연속적으로 생성하고 방출하는 data stream의 상태 변화에 반응하는 방식으로 동작한다.

## Observable & Observer

> **An observer subscribes to an Observable. An Observable emits items or sends notifications to its observers by calling the observers’ methods.**

Data producer와 Data consumer 사이에 data stream을 전송하는 방법에는 두가지가 있다.

1.  Pull-scenario: Data consumer가 producer에게 data를 연속적으로 요청해서 획득한다. 이는 애플리케이션이 외부 환경에서 데이터를 끌어오는 방식이다.
2.  Push-scenario: Data producer가 일정 시간 단위로 계속해서 data를 내보내면(emit) Data consumer가 producer를 관찰하고 있다가 data를 획득한다. 이는 외부 환경에서 애플리케이션으로 데이터를 밀어넣는 방식이다.

**Observable**: 외부 환경에서 애플리케이션 내부로 data stream을 생성하고 emit(방출)하는 객체

**Observer**: Observable이 emit한 Notification(Observable이 emit할 수 있는 push 기반 event 값)을 획득해서 사용하는 객체

즉 Observer는 Data consumer이고 Observable은 Data producer이다. **Observer는 Observable을 구독(subscribe)한다.** 보통 Observable과 Observer는 일대다 관계를 가진다.

Observable은 ES7에 제안되어있는 비동기 데이터 처리를 위한 표준으로, Reactive Programming은 Observer pattern을 더 심화한 패턴이다.

> #### Observer Pattern
> 
> ![observer-pattern](https://poiemaweb.com/img/observer-pattern.png)
> 
> Subject는 data member로 자신을 관찰하고 있는 Observer의 모음인 ObserverCollection을 유지한다. register/unregister로 Observer를 관리한다. 상태가 변화하면 자신의 ObserverCollection에 등록된 Observer들에게 noftify(status)로 상태 변화를 알린다. 상태 변화를 알리는 notify 메소드 내부에서 Observer의 Update(status)로 상태를 갱신한다.
> 
> ```js
> class Subject {
> 	ObserverCollection = [];
> 
> 	register(Observer) {
>       this.ObserverCollection = [Observer, ...this.ObserverCollection];
>     }
> 
> 	unregister(Observer) {
>       this.ObserverCollection = this.ObserverCollection.filter(o => o !== Observer);
>     }
> 
> 	notify(status) {
>       this.ObserverCollection.forEach(o => o.update(status));
>     }
> }
> 
> class MySubject extends Subject {
>     constructor() {
>       super();
>       this._state;
>     }
>   
>     set state(status) {
>       this._state = status;
>       this.notify(this.state);
>     }
> }
> 
> class Observer {
>     constructor() {
>       this.state = ''
>     }
>     update(status) {
>       this.state = status;
>       console.log(this.state);
>     }
> }
> ```

## HttpClient

HttpClient의 method를 호출하고 subscribe하지 않으면, 즉 Observable에 대한 Observer가 없으면 아무 일도 일어나지 않는다. subscribe method를 통해서 Observer가 Observable을 바라보게 해야 get Request 등이 동작하기 시작한다.

#### json server query

```js
// ?_sort=id&_order=desc
const params = new HttpParams()
	.set('_sort', 'id')
	.set('_order', 'desc');
this.http.get<Todo[]>(apiUrl, { params })
	.subscribe(todos => this.todos = todos);
```

#### Cold Observable & Hot Observable

subscribe하기 전에는 동작하지 않는 Observable을 Cold Observable이라고 하며 Observer와 일 대 일 unicast 관계를 가진다.

Hot Observable은 생성과 동시에 subscribe 여부와 상관 없이 바로 data stream을 emit한다. 구독하는 모든 Observer에게 data를 emit하는 multicast이다. RxJS의 Observable은 기본적으로 Cold Observable이다.

요청이 중복 발생되는 것을 방지하기 위해서 shareReplay()를 사용해 Cold Observable을 Hot Observable로 만들 수 있다.

#### HttpIntercepter

Login이 성공하면 main page로 이동하고, 성공하지 않으면 login page에 머무르는 Application을 생각해보자. 이 때 사용자가 /main으로 main page에 바로 접근할 경우 해당 사용자가 login 완료된 상태인지는 Token으로 검사해야 한다.

> #### JWT (JSON Wen Token)
> 
> Authentication에 Token의 유효 기간을 이용하는 방식. Server가 JSON Token을 보내주면 Client 측에서 localStorage 또는 cookie에 담는다.

Login 완료 후 main page로 이동할 때, Routing이 발생할 때마다 Token을 header에 담아서 보내는 처리가 필요하다. 그러나 매번 header를 setting하기가 번거로우므로 HttpIntercepter를 사용하면 HTTP Request 전후에 특정 기능을 실행할 수 있다.
