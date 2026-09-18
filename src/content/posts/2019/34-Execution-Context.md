---
title: "34. Execution Context"
date: 2019-06-05
description: "실행 컨텍스트(Execution Context)는 실행 가능한 코드를 평가하고 실행하기 위해 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다. Context는 문맥, 맥락이라는 뜻이다. 프로그램에도 맥락이 있다. 예를 들면 식별자가 어느 스코프에서…"
tags: ["실행 컨텍스트", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/06/05/34-Execution-Context"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

**실행 컨텍스트(Execution Context)**는 **실행 가능한 코드를 평가**하고 **실행하기 위해 필요한 환경을 제공**하고 **코드의 실행 결과를 실제로 관리**하는 영역이다.

Context는 문맥, 맥락이라는 뜻이다. 프로그램에도 맥락이 있다. 예를 들면 식별자가 어느 스코프에서 사용되었는지에 따라서 다른 값을 참조한다.

## 1\. Executable Code

실행 가능한 코드(Executable Code)를 4가지 유형으로 구분한다.

| Executable Code | Explaination |
| --- | :-- |
| Global code | 전역에 존재하는 Text code. 전역에 정의된 함수나 클래스의 내부 코드는 포함되지 않음 |
| Function code | 함수 내부에 존재하는 Text code. 함수 내부에 중첩된 함수나 클래스의 내부 코드는 포함되지 않음 |
| Eval code | Built-in 전역 함수인 eval 함수에 argument로 전달된 Text code |
| Module code | 모듈 내부에 존재하는 Text code. 모듈 내부의 함수나 클래스의 내부 코드는 포함되지 않음 |

#### 전역 코드 Global Code

전역 코드는 전역 스코프를 생성해야하며 전역 객체와 연결되어야 한다. 이를 위해서 **전역 코드가 평가되면 전역 실행 컨텍스트가 생성**된다.

`var` 키워드로 선언한 전역 변수는 전역 객체(window)의 프로퍼티가 된다. 그러나 전역 스코프를 통해서도 검색이 가능해야한다. `let`과 `const` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되는 것이 아니라 전역 스코프에 등록된다.

#### 함수 코드 Function Code

함수 코드는 지역 스코프를 생성해야하며 생성된 지역 스코프는 스코프 체인의 최상위인 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결되어야 한다. 이를 위해서 **함수 코드가 평가되면 함수 실행 컨텍스트가 생성**된다.

## 2\. Evaluation and Execution of Executable Code

모든 Executable code는 실행하기 전에 평가 과정을 거친다.

#### 1\. 코드의 평가 과정

코드의 평가 과정에서 **실행 컨텍스트가 생성**된다.

변수, 함수, 클래스 등의 **선언문이 우선 평가되고 그 결과가 실행 컨텍스트에 등록**된다.

> #### Evaluation and Hoisting
> 
> `var` 키워드로 선언한 변수 선언문은 평가되어 변수명(식별자)이 실행 컨텍스트에 등록된다. 이 때 1. 선언 단계(Declaration Phase)로 변수명을 등록하고 2. 초기화 단계(Initialazation Phase)로 변수명에 `undefined`를 할당한다. 이는 자바스크립트 엔진에 변수의 존재를 알려 변수를 관리하도록 한다.
> 
> `let`이나 `const` 키워드로 선언한 변수 선언문은 평가되어 실행 컨텍스트에 등록될 때 1. 선언 단계만 거친다. 2. 초기화 단계로 `undefined`를 할당하는 것이 아니라 자바스크립트 엔진이 알고 있는 특별한 값을 할당하여 초기화 이전에 해당 값을 참조하면 `ReferenceError: Cannot access 'x' before initialization`을 발생시킨다. `let`이나 `const` 키워드로 선언한 변수의 **2\. 초기화 단계는 코드의 실행 중 선언문을 실행시킬 때 이루어진다.**
> 
> 함수 선언문의 경우 함수명과 동일한 변수명을 실행 컨텍스트에 등록하고, 즉시 함수 객체를 생성해서 변수명에 할당한다.
> 
> 함수 호출시 진행되는 함수 코드의 평가에서는 parameter와 내부 코드의 선언문을 평가한다. 이 때 parameter는 `var` 키워드로 선언한 변수로 취급되어 `undefined`로 초기화된다. 또한 함수 내부에서 지역 변수처럼 사용할 수 있는 arguments 객체도 생성되어 지역 스코프에 등록된다. arguments 객체는 유사배열객체(Array-like Object)로, spread 연산자를 사용해서 배열로 만들어 사용할 수 있다.

#### 2\. 코드의 실행

코드의 평가 과정이 끝나면 선언문을 제외한 코드가 순차적으로 실행된다. 이 때 할당문 등 코드 실행에 필요한 정보를 실행 컨텍스트에서 가져온다. 코드의 실행 결과는 실행 컨텍스트에서 관리된다.

코드 실행 중 식별자를 만나면 우선 해당 실행 컨텍스트의 스코프에서 검색하고, 없으면 전역 스코프까지 올라간다. console 같은 식별자의 경우 전역 스코프에 등록되지 않았다. 그러나 ReferenceError가 나지 않는다. 이는 전역 스코프에서 식별자를 못 찾을 시 전역 객체의 프로퍼티를 검색하기 때문이다. 전역 객체의 프로퍼티는 마치 전역 스코프에 등록된 식별자처럼 동작한다.

## 3\. Role of Execution Context

#### 1\. 전역 코드 평가

전역 코드를 한 줄씩 실행하기 이전에 전역 코드가 평가된다. 평가 과정에서 변수 선언문과 함수 선언문이 평가된다. 그 결과로 전역 변수와 전역 함수가 전역 스코프에 등록된다. `var` 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 객체의 프로퍼티가 된다. `let`이나 `const` 키워드로 선언된 전역 변수는 전역 객체의 프로퍼티가 아니라 전역 스코프의 식별자로 등록된다.

#### 2\. 전역 코드 실행

전역 코드 평가가 끝나면 전역 코드를 순차적으로 실행한다. 전역 변수에 값이 할당되고 함수가 호출된다. 함수가 호출되면 전역 코드의 실행이 멈추고 호출된 함수 내부로 진입한다.

#### 3\. 함수 코드 평가

함수 내부로 진입하면 함수 내부 코드를 실행하기 이전에 함수 코드가 평가된다. 이 때 parameter와 지역 변수 선언문이 평가된다. 그 결과로 parameter와 지역 변수는 지역 스코프에 등록된다. arguments 객체도 생성되어 스코프에 등록된다.

#### 4\. 함수 코드 실행

함수 코드가 순차적으로 실행되고 종료되면 함수를 빠져나와 함수 호출 다음의 전역 코드를 실행한다.

결국 실행 컨텍스트가 해야하는 역할은 다음과 같다.

1.  선언에 의해 생성된 모든 식별자(변수, 함수, 클래스 등)를 스코프를 구분해서 등록하고 상태 변화(식별자에 바인딩된 값의 변화)를 지속적으로 관리해야 한다.
2.  스코프 중첩 관계에 의해서 스코프 체인을 형성해야 한다. 스코프 체인을 통해서 상위 스코프로 이동하며 식별자를 검색할 수 있어야 한다.
3.  함수 호출 등으로 현재 실행중인 코드의 실행 순서를 변경할 수 있어야 하며 다시 되돌아갈 수 있어야 한다.

**실행 컨텍스트(Execution Context)는 실행 가능한 코드를 평가하고 실행하기 위해 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.**

다시 말해, 실행 컨텍스트는 식별자(변수, 함수, 클래스, this 등)를 등록하고 관리하기 위한 **스코프와 실행 순서 관리를 구현한 내부 매커니즘**으로 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.

## 4\. Execution Context Stack

Stack은 LIFO(Last In First Out) 방식의 자료구조이다. Stack의 가장 윗부분을 Top이라고 하고, 데이터를 넣는 것을 push, 꺼내는 것을 pop이라고 한다.

함수 호출 등에 따라서 생성되는 실행 컨텍스트는 Stack 자료구조로 관리된다. 이를 실행 컨텍스트 스택이라고 한다. 우리가 익히 알고 있는 Call Stack이 Execution context stack이다.

```js
cosnt x = 1;

funtcion foo() {
    const y = 2;
    function bar() {
        const z = 3;
        console.log(x + y + z);
    }
    bar();
}

foo();
```

#### **1\. 전역 코드의 평가와 실행**

자바스크립트 엔진은 자바스크립트 파일을 로드하고 실행하기 이전에 평가 과정을 거치며 전역 실행 컨텍스트를 생성한다. 전역 객체는 전역 실행 컨텍스트 이전에 생성되어있다. 그러므로 전역 코드를 평가할 때 `var` 키워드 등으로 선언한 변수를 전역 객체의 프로퍼티로 추가할 수 있는 것이다. 전역 실행 컨텍스트는 생성되는 즉시 Execution Context Stack에 push된다. 이 때 전역 변수 x와 전역 함수 foo는 전역 실행 컨텍스트에 등록된다. 이후에 전역 코드가 실행되며 x에 값이 할당되고 foo가 호출된다.

#### 2\. foo 함수의 평가와 실행

전역 함수 foo가 호출되면 전역 코드의 실행이 멈추고 control이 foo 함수 내부로 이동한다. 자바스크립트 엔진은 foo 함수 내부의 함수 코드를 평가해서 foo 함수 실행 컨텍스트를 생성하고 Execution Context Stack에 push한다. foo 함수 평가가 끝나고 실행을 하다가 중첩 함수 bar를 만나면 bar를 호출한다.

#### 3\. bar 함수의 평가와 실행

중첩 함수 bar가 호출되면 foo 코드의 실행이 멈추고 control이 bar 함수 내부로 이동한다. 자바스크립트 엔진은 bar 함수 내부의 함수 코드를 평가해서 bar 함수 실행 컨텍스트를 생성하고 Execution Context Stack에 push한다. bar 함수는 실행을 마치고 종료한다.

#### 4\. foo 함수 코드로 복귀

#### 5\. 전역 코드로 복귀

## 5\. Lexical Environment

**Lexical Environment는 식별자가 선언되는 환경,** 즉 **렉시컬 스코프**를 의미한다. 렉시컬 환경은 스코프와 식별자를 관리한다.

실행 컨텍스트는 LexicalEnvorinment 컴포넌트와 VariableEnvironment 컴포넌트로 구성된다. 생성 초기에 두 컴포넌트는 하나의 동일한 렉시컬 환경을 참조한다. with 문을 사용하지 않으면 둘은 언제나 동일한 렉시컬 환경을 참조한다.

![img](https://poiemaweb.com/assets/fs-images/22-7.png)

![img](https://poiemaweb.com/assets/fs-images/22-8.png)

1.  EnvironmentRecord : 환경 레코드. 스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소. 환경 레코드는 Executable Code의 종류에 따라 내용이 다르다. 예를 들어 전역 코드의 경우 전역 객체와 연결되어야하고 함수 코드는 그렇지 않다.
2.  Outer Lexical Enciromnent Reference : 외부 렉시컬 환경을 가리키는 참조를 저장. 해당 실행 컨텍스트를 생성한 Executable code를 포함하는 상위 코드의 렉시컬 환경을 말한다. 이를 통해서 One-way linked list인 스코프 체인을 구현한다.
3.  ThisBinding : this 바인딩. 렉시컬 환경의 this에 바인딩된 객체(ThisBinding)를 나타낸다. this 바인딩은 Abstract operation ResolveThisBinding을 통해 결정할 수 있다.

결국 스코프 체인은 각 실행 컨텍스트의 Lexical Environment의 link로 구성된 Linked List이다.

## 6\. Creation of Executable Context and Identifier Search Process

```js
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  function bar (b) {
    const z = 5;
    console.log(a + b + x + y + z);
}
  bar(10);
}

foo(20); // 42
```

#### 1\. 전역 객체 생성

전역 객체는 생성자 함수를 제공하지 않으므로 의도적으로 생성할 수 없다. 전역 객체는 애플리케이션 로딩시 전역 코드가 평가되기 이전에 생성된다. 전역 객체에는 전역 프로퍼티와 전역 함수, builtin 객체가 추가되며 Client Side인 경우 CIient-side Web API를 포함한다.

#### 2\. 전역 코드 평가

##### 1\. 전역 실행 컨텍스트 생성

전역 실행 컨텍스트를 생성하고 즉시 실행 컨텍스트 스택에 생성된 전역 실행 컨텍스트를 push한다.

##### 2\. 전역 렉시컬 환경 생성

전역 Lexical Environment를 생성하고 전역 실행 컨텍스트의 LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트에 바인딩한다. Lexical Environment는 EnvironmentRecord, OuterLexicalEnvironmentReference, ThisBinding의 3가지 컴포넌트로 구성된다.

##### 2.1. 전역 환경 레코드 생성 Global Environment Record

전역 환경 레코드(Global Environment Record)는 함수 환경 레코드와는 다르게, 객체 환경 레코드(Object Environment Record)와 선언적 환경 레코드(Declarative Environment Record)로 구성되어 있다. Object Environment Record와 Declarative Environment Record는 서로 협력해 전역 스코프와 전역 객체를 관리한다.

###### 2.1.1. 객체 환경 레코드 생성 Object Environment Record

`var` 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수는 Object Environment Record에 등록되고 관리된다.

정확히 말하면 Object Environment Record는 bindingObject라는 객체와 연결되는데, Object Environment Record에 등록한 식별자는 bindingObject의 프로퍼티가 된다. Global Environment Record의 경우 Object Environment Record의 bindingObject는 전역 객체(window)이다.

따라서 `var` 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 객체의 프로퍼티가 된다. 등록된 식별자를 Global Environment Record의 Object Environment Record에서 검색하면 전역 객체의 프로퍼티를 검색해서 반환한다. 따라서 `var x = 1`과 같이 선언한 변수는 `x` 또는 `window.x`로 검색할 수 있는 것이다. 전역 함수 또한 마찬가지이다.

###### 변수 호이스팅과 함수 호이스팅

`var` 키워드로 선언한 변수는 Object Environment Record에 바인딩된 bindingObject에 변수 식별자를 등록(1. 선언 단계)한 다음, 암묵적으로 undefined로 초기화(2. 초기화 단계)한다.

함수 선언문으로 정의한 함수는 평가되면 함수명과 동일한 이름의 식별자를 Object Environment Record에 등록하고, 함수 객체를 생성해서 즉시 할당한다. 그래서 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있는 것이다.

###### 2.1.2. 선언적 환경 레코드 생성 Declarative Environment Record

`let`, `const` 키워드로 선언된전역 변수는 Declarative Environment Record에 등록되고 관리된다. `let`, `const` 키워드로 선언한 변수는 1. 선언 단계와 2. 초기화 단계가 분리되어 진행된다. 평가 단계에서는 선언 단계만 진행되어 식별자가 등록이 되고, 초기화 단계는 실행 시간에 선언문을 실행할 때 진행되므로 선언문 실행 이전까지를 TDZ(Temporal Dead Zone)라고 한다. 이들은 전역 객체의 프로퍼티가 아니라 Global Lexical Environment의 Declarative Environment Record에 등록되어 관리된다.

##### 2.2. 외부 렉시컬 환경에 대한 참조 할당 Outer Lexical Envronment Reference

전역(Global)은 코드의 가장 외부이므로 Global Lexical Environment의 Outer Lexical Environment Reference는 null이다. 즉, Global Lexical Environment은 모든 Scope Chain의 최상위 종점이 된다.

##### 2.3. this 바인딩 ThisBinding

Global Environment Record의 this에는 전역 객체(브라우저에서는 window)가 바인딩된다.

#### 3\. 전역 코드 실행

평가를 마친 전역 코드는 한 줄씩 순차적으로 실행된다. 선언문을 제외한 할당문 등이 실행되어 전역 변수 x, y에 값이 할당되고 함수 foo가 실행된다. 변수 x, y에 값을 할당하는 과정에서 우선 식별자 검색을 거친다. 현재 running execution context인 Global Execution Context의 Lexical Environment의 Environment Record에서 식별자를 검색한다. `var` 키워드로 선언된 변수 x는 Object Environment Record에 바인딩된 객체인 window의 프로퍼티로 존재하고 있으며, `const` 키워드로 선언된 변수 y는 Declarative Environment Record에 등록되어있다. `var` 키워드로 선언한 변수와 같이 Object Environment Record에 등록된 함수 foo를 검색해 실행한다. 이때 스코프 체인 상에서 식별자를 끝내 찾지 못하면 ReferenceError가 발생한다.

> #### 식별자 검색과 프로퍼티 검색
> 
> 식별자 검색은 Scope chain 상에 식별자가 없을 때 ReferenceError를 발생시킨다.
> 
> 그러나 프로퍼티 검색은 Prototype chain에 찾는 식별자가 없으면 에러 대신 undefined를 리턴한다.

#### 4\. 함수 코드 평가

##### 1\. 함수 실행 컨텍스트 생성

foo 함수 호출문이 실행되면 우선 foo 함수 실행 컨택스트가 생성되고 Execution Context Stack에 push된다.

##### 2\. 함수 Lexical Environment 생성

foo Funtion Lexical Environment를 생성하고 foo 함수 실행 컨텍스트의 LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트에 바인딩한다.

Lexical Environment는 Environment Record, Outer Lexical Environment Reference, this Binding으로 구성된다.

##### 2-1. 함수 Environment Record 생성

Function Environment Record는 함수의 parameter, arguments 객체, 함수 내에 선언된 변수와 함수 등의 식별자를 등록하고 관리한다.

##### 2-1. Outer Lexical Environment Reference 할당

**함수는 함수 정의가 평가되어 함수 객체가 생성될 때, 현재 실행 중인 실행 컨텍스트의 Lexical Environment를 함수 객체의 내부 슬롯 `[[Environment]]`에 저장한다.**

즉, 생성된 함수 객체가 호출되어 평가될 때 생성되는 함수 실행 컨텍스트의 Lexical Environment의 OuterLexicalEnvironmentReference 컴포넌트의 참조는 해당 함수 객체의 내부 슬롯 `[[Environment]]`에 저장된 Lexical Environment와 같다.

##### 2-3. this 바인딩

일반적으로 this는 호출되는 방식에 따라서 다르게 바인딩된다.

this를 참조하는 순간 추상 연산 ResolveThisBinding 메소드가 도는데,

화살표 함수의 경우 선언된 코드가 실행중인 **실행 컨텍스트의 Lexical Environment의 this, 즉 Lexical this**를 자신의 this로 바인딩한다.

일반 함수로 호출되는 함수의 this는 전역 객체

생성자 함수로 호출되는 함수의 this는 함수가 생성할 instance

메소드로 호출되는 함수의 this는 메소드를 호출한 객체가 된다.

#### 5\. 함수 코드 실행

평가가 끝난 함수는 순차적으로 실행된다. 이 때 식별자는 현재 running execution context의 Environment Record에서 우선 검색하고, 없을 경우 Outer Lexical Environment의 Environment Record로 넘어가며 검색한다.

## 7\. Execution Context and Block-level Scope

[ECMAScript block spec](http://tc39.es/ecma262/#sec-block-runtime-semantics-evaluation)

스코프는 렉시컬 환경으로 구현된다. 즉, 블록 레벨 스코프를 만들기 위해서는 Block 렉시컬 환경을 만들어야한다. 그러나 실행 컨텍스트는 4가지 실행 가능한 코드(Executable Code)만이 생성할 수 있다. 그러므로 블록문이 평가될 때는 실행 컨텍스트가 아닌 Lexical Environment만 생성한다.

Block: { Statement }가 평가될 때 일어나는 일은 다음과 같다.

1.  변수 oldEnv에 running execution context의 LexicalEnvironment를 담는다.
    
2.  변수 blockEnv = NewDeclarativeEnvironment(oldEnv)
    
    -   NewDeclarativeEnvironment(E)
    
    1.  env = new LexicalEnvironment
    2.  envRec = 바인딩 안 된 new declarative Environment Record
    3.  env의 EnvironmentRecord = envRec
    4.  env의 OuterLexicalEnvironmentReference = E
    5.  env를 리턴
    
    즉 현재 실행중인 실행 컨텍스트의 Lexical Environment를 OuterLexicalEnvironment로 하는 새로운 Block Lexical Environment를 생성해 blockEnv에 담는다. 이 Lexical Environment의 Environment Record 컴포넌트로 Declarative Environment Record를 가진다.
    
3.  BlockDeclarationInstantiation(StatementList, blockEnv) 수행
    
    Block 또는 CaseBlock이 평가되면 새로운 Declarative Environment Record가 생성되고 블록에서 선언 된 각 block scoped 변수, 상수, 함수 또는 클래스에 대한 바인딩이 환경 레코드에서 인스턴스화된다.
    
    -   BlockDeclarationInstantiation ( code, env )
        1.  envRec = env의 EnvironmentRecord (Deciarative)
        2.  code에서 각 선언문 평가하며 식별자와 값을 바인딩해서 envRec에 추가한다.
4.  running execution context의 LexicalEnvironment를 새로 생성한 blockEnv로 지정한다. (blockEnv에는 내부 코드가 평가되어 식별자가 등록된 상태)
    
5.  StatementList(block 문 내부의 문들)을 평가하고 결과를 blockValue에 넣는다.
    
6.  running execution context의 LexicalEnvironment를 oldEnv (blockEnv의 상위 Env)로 다시 돌려놓는다.
    
7.  block 문의 실행 결과인 blockValue를 리턴한다.
    

쉽게 말하면 블록 문을 실행하면 현재 실행 컨텍스트는 변화하지 않는다. 대신 새로운 Block LexicalEnvironment를 생성해서 현재 실행중인 실행 컨텍스트의 LexicalEnvironment로 잠시 대체한다. 원래의 LexicalEnvironment는 oldEnv에 저장해놓는다. 새로 생성한 blovkEnv는 oldEnv를 상위 스코프로 삼는다. blockEnv를 LexicalEnvironment로 참조하는 상태에서 블록 문을 실행한 후에 현재 실행중인 실행 컨텍스트의 LexicalEnvironment를 다시 oldEnv, 즉 블록문을 실행하기 전의 LexicalEnvironment로 돌려놓는다.

## Before Closure

클로저를 이해하기 위해서는 실행 컨텍스트에 대한 선행 지식이 요구된다. 실행 컨텍스트와 스코프 체인, 프로토 타입을 이해하고 있어야 풀 수 있는 아래 문제를 먼저 풀고 넘어가자. foo 함수의 호출 결과는 무엇일까?

```js
function foo() {
  console.log(x);
}

Object.prototype.x = 1;

foo();
```

#### Object.prototype에 x 프로퍼티 추가

![window object inherits Object.prototype](https://user-images.githubusercontent.com/48080762/59080999-cd70e000-8926-11e9-906a-e7f5e7fec911.png)

전역 객체 window 또한 객체(object)이므로 Object.prototype을 상속받는다.

![and Object is window's builtin object property](https://user-images.githubusercontent.com/48080762/59081249-107f8300-8928-11e9-82e8-68316f16c4c3.png)

자바스크립트 엔진은 객체의 프로퍼티에 접근할 때 `[[Get]]` 내부 메소드를 호출한다. `[[Get]]` 내부 메소드는 프로토타입 체인에서 프로퍼티를 검색하고 값을 리턴한다. 객체의 프로퍼티에 접근해서 값을 할당할 때는 `[[Set]]` 내부 메소드를 호출하는데, 똑같이 프로토타입 체인에서 프로퍼티를 검색한다. 그러나 `[[Set]]` 내부 메소드는 검색한 프로퍼티가 없으면 프로퍼티를 추가하고 할당하는 역할까지 한다.

Object.prototype에 x라는 프로퍼티가 없었으므로 `[[Set]]` 내부 메소드가 Object.prototype에 x 프로퍼티를 추가하고 1을 할당한다.

#### foo 함수 실행

식별자 x를 찾기 위해서는 스코프 체인에서 검색을 한다. 따라서 **우선 실행 컨텍스트 스택의 top인 실행중인 실행 컨텍스트(running execution context)의 환경 레코드에서 x를 검색**한다. foo 함수의 실행 컨텍스트에는 식별자 x가 존재하지 않으므로 foo 함수의 OuterLexicalEnvironmentReference로 참조하는, 즉 상위 스코프인 Global Lexical Environment의 환경 레코드로 이동해서 검색을 시작한다. Global(전역)의 경우 환경 레코드가 Object, Declarative 2개의 컴포넌트로 구성된다. Declarative Environment Record에도 x가 없으므로 Object Environment Record에 바인딩된 **window 객체의 프로퍼티 중에 x가 있는지 검색**한다. 이 때 **x는 프로퍼티로 검색되는 것이므로 프로토타입 체인에서 검색**된다. window 객체는 Object.prototype을 상속한다고 했다. 그러므로 1이 할당된 x가 검색되는 것이다.

여기서 알아야할 것은 스코프 체인과 프로토타입 체인은 별개가 아니라 서로 협력하는 관계라는 것이다.
