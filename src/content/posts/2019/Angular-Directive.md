---
title: "Angular Directive"
date: 2019-06-24
description: "DirectiveDirective는 DOM의 모양이나 동작 등을 관리하기 위한 명령이다. HTML Element 또는 Attribute 형태로 사용한다. Directive를 사용하는 HTML Element를 Directive 내에서 Host element라고 부르며,…"
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/06/24/Angular-Directive"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Directive

Directive는 DOM의 모양이나 동작 등을 관리하기 위한 명령이다. HTML Element 또는 Attribute 형태로 사용한다.

Directive를 사용하는 HTML Element를 Directive 내에서 Host element라고 부르며, Directive 내부에서 host element의 event를 처리하거나 style 등을 변경할 수 있다.

```ts
@Directive({
  selector: '[textBlue]'
  })
export class TextBlueDirective {
  constructor(public el: ElementRef, public renderer: Renderer2) {}

  @HostListener('mouseenter') onMouse() {
    this.setColor('blue');
  }

  @HostListener('mouseleave') offMouse() {
    this.setColor(null);
  }

  setColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
```

Directive class의 constructor에서 주입된 parameter는 class의 class field가 되어 class 전역에서 사용할 수 있다. 이를 constructor에 ElementRef instance가 Dependency Intect(의존성 주입)되었다고 한다.

-   @Directive : meta data 객체에 Directive에 필요한 정보(selector등)를 입력한다.
    
    | selector property | 설명 |
    | :-- | :-- |
    | selector: ‘foo’ | foo element에 Directive가 적용된다. |
    | selector: ‘.foo’ | .foo class가 선언된 element에 Directive가 적용된다. |
    | selector: \[foo\] | foo attribute가 선언된 element에 Directive가 적용된다. |
    | selector: \[foo=bar\] | foo attribute의 값이 bar로 선언된 element에 Directive가 적용된다. |
    | selector: :not(foo) | foo element를 제외한 모든 element에 Directive가 적용된다. |
    | selector: ‘foo, bar’ | foo 또는 bar element에 Directive가 적용된다. |
    
    Directive의 selector는 attribute로 이용하는 것이 일반적이다. Component는 Directive를 상속받은 것으로 selector 규칙이 동일하게 적용된다.
    
-   ElementRef: host element를 감싼 wrapper object
    
-   el.nativeElement: host element
    
-   Renderer2: Angular에서는 el.nativeElement의 style 프로퍼티를 직접 변경하는 것이 아니라 Renderer2를 이용하는 것이 권장된다.
    
-   @HostListener : host element에서 발생한 event에 대한 event listener를 정의할 때 사용하는 데코레이터.
    

### Directive로 data 보내기 | property binding

```ts
// app.component.ts

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <p [color]="color" textColor>Hello</p>
  `,
  styles: []
  })
export class AppComponent {
  color = 'red';
}
```

```ts
// text-color.directive.ts

@Directive({
  selector: '[textColor]'
  })
export class TextColorDirective {
  @Input() color: string;

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  @HostListener('mouseenter') onMouse() {
    this.setColor(this.color);
  }

  @HostListener('mouseleave') offMouse() {
    this.setColor(null);
  }

  setColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
```
