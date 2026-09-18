---
title: "Angular Form"
date: 2019-07-03
description: "Angular FormAngular Form은 Template-driven Forms와 Ractive Forms를 제공한다. Template-driven Forms 간단한 form (Form Control 한두개)을 구성할 때 사용 Reactive Forms 복잡한…"
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/07/03/Angular-Form"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Angular Form

Angular Form은 Template-driven Forms와 Ractive Forms를 제공한다.

#### Template-driven Forms

-   간단한 form (Form Control 한두개)을 구성할 때 사용

#### Reactive Forms

-   복잡한 form을 구성할 때 사용

Form은 Client side에서 중요한 역할을 한다. 사용자의 입력을 서버로 전송하고 페이지를 전환할 수 있는 element이다. Server는 많은 Client 요청을 처리하므로 form을 통해서 받은 사용자 입력의 유효성 검사(validation)를 Client side에서 하는 것이 기본이다.

## Template-driven Forms

-   Template-driven Form은 Component template에서 Directive를 사용해서 Form을 구성하는 방식
-   각 field의 형식이나 validation 검증 규칙을 모두 template에서 정의
-   Template-driven Form은 NgForm, NgModel, NgModelGroup Directive 중심으로 동작
    
    ```ts
    // app.module.ts
    import { FormsModule } from '@angular/forms';
    
    @NgModule({
      imports: [FormsModule],
    })
    ```
    

### NgForm Directive

-   Template-driven Form 전체를 관리하는 Directive
    
-   root module에 FormsModule 추가하면 NgForm Directive 선언하지 않아도 모든 form element에 자동으로 적용되어 Template-driven Form으로 동작
    
-   HTML standard form의 validation을 사용하지 않고 Template-driven Form의 validation을 사용하려면 아래와 같이 form element에 `novalidate` Attribute를 추가한다. **최신 Angular는 FormsModule을 import하면 `novalidate`가 자동으로 추가된다.**
    
    ```html
    <form novalidate></form>
    ```
    
-   반대로 NgForm Directive를 사용하지 않고 HTML standard form을 사용하려면 `ngNoForm`을 추가한다.
    
    ```html
    <form ngNoForm></form>
    ```
    

> #### HTML Standard Form과 Template-driven Form의 차이
> 
> -   HTML Standard Form은 submit button 클릭시 form data를 서버로 전송하고 페이지를 전환
>     
> -   NgForm Directive가 적용된 Template-driven Form은 submit event를 Intercept해서 submit의 기본 동작을 막음
>     
>     -   대신 submit시 ngSubmit event를 사용해서 onSubmit event handler 사용
> 
> ```html
> <form #f="ngForm" (ngSubmit)="onNgSubmit(f)" novalidate>
> </form>
> ```

> -   `#f="ngForm"`으로 Native DOM 대신 NgForm Instance를 Template 참조 변수에 할당한다.
> -   Native DOM 요소와 다르게 ngForm Instance는 ng-valid, ng-touched 등 유용한 프로퍼티를 제공한다.
> -   NgForm Directive는 NgForm Instance 생성시 자신이 적용된 Form 요소의 값이나 validation 검증 산태를 추적할 수 있는 FormGroup Instance를 생성한 후 NgForm Instance의 property로 할당한다.

```html

<form #f="ngForm" (ngSubmit)="onSubmit(f)">
  <input
         type="text"
         placeholder="email"
         name="email"
         pattern="^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$"
         ngModel
         required
         #email="ngModel"
         />
  <input
         type="password"
         placeholder="password"
         name="password"
         pattern="^[a-zA-Z0-9]{4,10}$"
         ngModel
         required
         #password="ngModel"
         />
  <button [disabled]="f.invalid">Submit</button>
</form>
```

Form의 Input 요소들에 `ngModel`을 추가해야 Form의 Form Control로 등록된다.

## Reactive Forms

-   Template이 아닌 Component class에서 form element의 상태를 관리하는 객체인 Form Model을 구성하는 방식
-   Template-driven Form 보다 복잡한 form을 구성할 때 사용

```ts
// app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule],
})
```

-   Reactive Form은 FormGroup, FormControl, FormArray를 중심으로 동작
    
    ```ts
    import { Component, OnInit } from '@angular/core';
    import { FormGroup, FormControl } from '@angular/forms';
    
    @Component({
      selector: 'app-root',
      template: `
        <form [formGroup]="userForm">
          <input type="text" placeholder="userid" formControlName="userid" />
          <input type="password" placeholder="userpw" formControlName="userpw" />
          <button>Login</button>
        </form>
      `,
      styles: []
      })
    export class AppComponent implements OnInit {
      userForm: FormGroup;
    
      constructor() {}
    
      ngOnInit() {
        this.userForm = new FormGroup({
          userid: new FormControl(),
          userpw: new FormControl()
        });
      }
    }
    ```
    
    -   FormGroup Instance가 template의 form을 관리하도록 mapping
        
        ```html
        <form [formGroup]="userForm"></form>
        ```
        

-   FormGroup의 FormControl을 생성해서 input element와 mapping
    
    ```html
    <input type="text" placeholder="userid" formControlName="userid" />
          <input type="password" placeholder="userpw" formControlName="userpw" />
    ```
    

-   FormControl
    
    ![FormControl](https://user-images.githubusercontent.com/48080762/60700010-2e450580-9f31-11e9-8607-eb9497584ce9.png)
    
-   FormControl 이름으로 getter 만들기
    
    ```ts
    import { Component, OnInit } from '@angular/core';
    import { FormGroup, FormControl, Validators } from '@angular/forms';
    
    @Component({
      selector: 'app-root',
      template: `
        <form [formGroup]="userForm">
          <input type="text" placeholder="userid" formControlName="userid" />
          <em *ngIf="userid.errors?.required && userid.touched">아이디를 입력해주세요</em>
          <em *ngIf="userid.errors?.pattern && userid.touched">아이디를 형식에 맞게 입력해주세요</em>
          <input type="password" placeholder="userpw" formControlName="userpw" />
          <button>Login</button>
        </form>
        <pre>userForm.value: {{ userForm.value | json }}</pre>
        <pre>userForm.valid: {{ userForm.valid }}</pre>
      `,
      styles: []
      })
    export class AppComponent implements OnInit {
      userForm: FormGroup;
    
      constructor() {}
    
      ngOnInit() {
        this.userForm = new FormGroup({
          userid: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')]),
          userpw: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')])
        });
    
        console.dir(this.userForm);
      }
    
      get userid() {
        return this.userForm.get('userid');
      }
    }
    ```
    
-   비밀번호 확인을 위한 Custom Validation method
    
    ```html
    <--! template -->  
    <div formGroupName="passwordGroup">
            <input type="password" placeholder="password" formControlName="password" />
            <input type="password" placeholder="confirm password" formControlName="confirmPassword" />
    </div>
    ```
    

```ts
// component.ts
ngOnInit() {
    this.userForm = new FormGroup({
      userid: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')]),
      passwordGroup: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z]{4,10}')
          ]),
          confirmPassword: new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z]{4,10}')
          ])
        },
        PasswordValidator.match
      )
    });
  }
```

```ts
// password-validator.ts
import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
  static match(passwordGroup: AbstractControl) {
    const password = passwordGroup.get('password').value;
    const confirmPassword = passwordGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { match: { password, confirmPassword } };
  }
}
```

-   `AbstractControl` 모든 Control의 조상
    
    ```ts
    // new FormGroup 대신 FormBuilder 사용 시
    ngOnInit() {
      this.userForm = this.fb.group({
          userid: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')]],
          passwordGroup: this.fb.group(
            {
              password: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')]],
              comfirmPassword: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,10}')]]
            },
            { validator: PasswordValidator.match }
          )
        });
    }
    ```
