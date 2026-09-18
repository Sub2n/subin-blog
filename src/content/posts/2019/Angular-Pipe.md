---
title: "Angular Pipe"
date: 2019-06-21
description: "AngularJS에는 60여개의 built-in Pipe가 있었으나 Angular는 9개의 built-in pipe를 지원한다. 나머지 기능은 pipe를 직접 구현하여 사용할 수 있다. pipe meaning date 날짜 형식 변환 json JSON 형식 변환…"
tags: ["Angular", "Pipe"]
categories: ["JavaScript", "Angular"]
path: "2019/06/21/Angular-Pipe"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

AngularJS에는 60여개의 built-in Pipe가 있었으나 Angular는 9개의 built-in pipe를 지원한다. 나머지 기능은 pipe를 직접 구현하여 사용할 수 있다.

| pipe | meaning |
| :-- | :-- |
| [date](https://angular.io/api/common/DatePipe) | 날짜 형식 변환 |
| [json](https://angular.io/api/common/JsonPipe) | JSON 형식 변환 |
| [uppercase](https://angular.io/api/common/UpperCasePipe) | 대문자 변환 |
| [lowercase](https://angular.io/api/common/LowerCasePipe) | 소문자 변환 |
| [currency](https://angular.io/api/common/CurrencyPipe) | 통화 형식 변환 |
| [percent](https://angular.io/api/common/PercentPipe) | 퍼센트 형식 변환 |
| [decimal](https://angular.io/api/common/DecimalPipe) | 자리수 형식 변환 |
| [slice](https://angular.io/api/common/SlicePipe) | 문자열 추출 |
| [async](https://angular.io/api/common/AsyncPipe) | 비동기 객체 출력 |

new Date() 등으로 생성한 객체에 pipe를 사용하면 깔끔한 형식으로 출력할 수 있다.

객체 배열 형식으로 된 data를 확인하며 코딩할 때 `<pre>{ data | json }</pre>`로 data를 확인할 수 있다.

Category가 있는 경우 category 별로 filtering해서 데이터를 보여줄 수도 있다.

```ts
// filter.pipe.ts

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], active: NavItem): any {
    if (active === 'All') return todos;
    return active === 'Active'
      ? todos.filter(todo => !todo.completed)
      : todos.filter(todo => todo.completed);
  }
}
```

```html
<!-- todos.component.html -->
<li *ngFor="let todo of (todos | filter: navState)">
  ....
</li>
```

Angular는 template을 렌더링할 때 사용하는 data의 Reference value가 바뀌어야 상태 감지를 해서 재렌더링을 하며 pipe를 실행한다. 따라서 상태가 변경될 때는 명시적으로 재할당을 해주는 게 좋다. 재할당을 하지 않고 일부분만을 변경할 경우 pipe에 option을 주어야 한다.

```ts
@ Pipe({
  name: 'filter',
  pure: false
})
```

`pure: false` option을 주면 Reference value가 바뀌지 않더라도 상태를 감지하지만 퍼포먼스가 안 좋아진다. 재할당을 하자.
