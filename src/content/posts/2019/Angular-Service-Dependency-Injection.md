---
title: "Angular Service & Dependency Injection"
date: 2019-06-25
description: "ServiceComponent는 View를 구성하고 관리하는 역할을 해야한다. 그러나 View를 구성하다보면 필요한 데이터를 가져오기 위해서 서버와 통신을 하는 등의 부가 기능이 필요하게 된다. 이런 기능을 Component에서 하지 않고 Service로 분리한다.…"
tags: ["Angular", "Dependency Injection", "Service"]
categories: ["JavaScript", "Angular"]
path: "2019/06/25/Angular-Service-Dependency-Injection"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Service

Component는 View를 구성하고 관리하는 역할을 해야한다. 그러나 View를 구성하다보면 필요한 데이터를 가져오기 위해서 서버와 통신을 하는 등의 부가 기능이 필요하게 된다. 이런 기능을 Component에서 하지 않고 Service로 분리한다.

Component의 관심사와 Application 전역의 관심사를 분리하는 것이다. 이렇게 기능을 분리하면 Application의 복잡도가 낮아지고 서비스를 재사용할 수 있다. 또한 의존도가 낮아져 유지보수성이 좋아진다.

## Dependency Injection

Service는 Dependency Injection이 가능한 class이다. @Injectable 데코레이터로 정의한다.

Dependency Injection이란 말 그대로 의존성(dependency)을 주입(inject)한다는 것이다.

어떤 Component에서 Service의 method를 사용하는 경우 둘은 **의존 관계(Dependency relationship)**에 있다고 한다. Component 내부에서 Service class의 instance를 생성하는 경우 둘은 **강한 결합(Tight Coupling)**을 하고 있는 것이다. 반면 Component에서 직접 Service를 생성하는 것이 아니라 constructor의 parameter로 선언하여 Angular가 생성한 Service instance를 주입받는 것은 **느슨한 결합(Loose Coupling)**이다.

Tight Coupling은 많은 문제를 일으킨다. 하나의 Service의 생성 방법 등에 변동이 있을 경우 해당 Service와 의존 관계에 있는 모든 Component가 영향을 받는다.

재사용과 유지보수가 효율적인 프로그램을 만들기 위해서는 객체 사이의 **의존 관계를 최소화**해야 한다. 필요에 의해 의존 관계가 있을 경우 Tight Coupling은 지양해야 한다.

Dependency Injection은 Design pattern 중 하나로, tight coupling에서 loose coupling으로 전환하는 방법이다.

```ts
class A {
  // dependency의 instance를 직접 생성하지 않고 외부 환경에 요구
  constructor(private dependency: B) {
  }

  foo() { this.dependency.bar(); }
}

class B {
  bar() { console.log('bar'); }
}
```

A class처럼 constructor에서 instance를 parameter로 받는 경우, A class에서는 해당 instance의 생성 방법을 알 필요가 없다.

```ts
// greeting.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' /* @Injectable 프로바이더 */
})
export class GreetingService {
  sayHi() { return 'Hi!'; }
}
```

Angular에서 Dependency Injection을 받기 위해서는 @Injectable 데코레이터에 meta data로 `providedIn: 'root'`를 설정해야 한다. 해당 선언이 된 Service는 전역에서 Injectable하다.

또는 해당 Service를 주입받을 Component에서 @Compinent 데코레이터에 meta data로 `providers: [GreetingService]`를 설정해주면 된다. 이 Component를 포함한 Child component 들에서만 Injectable하다.
