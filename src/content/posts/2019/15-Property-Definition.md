---
title: "15. Property Definition"
date: 2019-05-09
description: "1. What is Property Definition?프로퍼티 정의란 프로퍼티 어트리뷰트의 값을 정의하여 프로퍼티의 상태를 관리하는 것이다. 예를 들면 프로퍼티 값을 갱신 가능하도록 할 것인지(writable), 프로퍼티를 열거 가능하도록 할…"
tags: ["자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/09/15-Property-Definition"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

# 1\. What is Property Definition?

프로퍼티 정의란 프로퍼티 어트리뷰트의 값을 정의하여 프로퍼티의 상태를 관리하는 것이다. 예를 들면 프로퍼티 값을 갱신 가능하도록 할 것인지(writable), 프로퍼티를 열거 가능하도록 할 것인지(enumarable), 재정의 가능하도록 할 것인지(configurable)를 정의할 수 있다.

객체 리터럴이 평가되거나 프로퍼티가 동적 생성될 때 프로퍼티가 생성된다. 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

```js
const obj = {};

//Dynamic creation of properties. The JavaScript engine creates the property and defines the property's attributes as the default.
obj.prop = 10;

var descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
console.log(descriptor);
// {value: 10, writable: true, enumerable: true, configurable: true}
```

프로퍼티 동적 생성은 프로퍼티가 존재하지 않을 때 프로퍼티를 생성하여 추가하는 것이다.

프로퍼티 정의는 프로퍼티 어트리뷰트를 정의하는 것을 말한다. 프로퍼티 어트리뷰트는 프로퍼티의 상태를 나타낸다.

프로퍼티의 상태란 프로퍼티의,

-   value
-   writable
-   enumerable
-   configurable

프로퍼티 어트리뷰트는 `Object.getOwnPropertyDescriptor` 메소드를 사용해 참조할 수 있다. 이 메소드는 프로퍼티 어트리뷰트를 객체로 표현한 PropertyDescriptor 객체를 반환한다. 존재하지 않는 프로퍼티나, 상속받은 프로퍼티에 대한 PropertyDescriptor를 요구하면 undefined가 반환된다.

프로퍼티가 동적 생성될 때 자바스크립트 엔진은 프로퍼티 어트리뷰트를 기본값으로 정의한다. 이미 정의된 프로퍼티 어트리뷰트를 재정의할 수도 있다.

# 2\. Internal Slot / Method

Internal slot and internal method는 ECMAScript 스펙에서 요구하는 객체 관련 내부 상태와 내부 동작을 정의한 것이다. ECMAScript 스펙에서 `[[...]]`로 감싼 이름들이 내부 슬롯과 내부 메소드이다.

Internal slot과 method는 자바스크립트 엔진의 내부 구현 사양을 정의한 것이므로 외부에 노출되지 않는다.

객체의 프로퍼티 키로 프로퍼티 값에 접근할 때 `[[Get]]` 내부 메소드가 내부적으로 호출된다. `[[Get]]` 내부 메소드는 다음과 같이 동작한다.

1.  프로퍼티 키가 유효한지 확인한다. (문자열 또는 심볼)
2.  프로토타입 체인에서 프로퍼티를 검색한다.

> ### Prototype and Prototype Chain
> 
> 프로토타입은 어떤 객체의 parent 객체 역할을 하는 객체이다. 프로토타입은 Child 객체에게 자신의 프로퍼티와 메소드를 상속한다. Prototype객체의 프로퍼티나 메소드를 상속받은 child 객체는 parent 객체의 프로퍼티나 메소드를 자유롭게 사용한다.
> 
> 프로토타입 체인은 프로토타입 객체가 연결되어있는 상속 구조이다. 어떤 객체의 프로퍼티나 메소드에 접근하려고 할 때, 해당 객체에 접근하려는 프로퍼티나 메소드가 없다면 프로토타입 체인을 따라 상위(부모) 객체의 프로퍼티나 메소드를 차례대로 검색한다.

3.  검색된 프로퍼티가 Data property라면 프로퍼티 값(데이터 프로퍼티의 프로퍼티 어트리뷰트 \[\[Value\]\])의 값을 그대로 반환한다.
4.  만약 검색된 프로퍼티가 Accessor property라면 접근자 프로퍼티의 프로퍼티 어트리뷰트 \[\[Get\]\]의 값, 즉 getter 함수를 호출하고 그 결과를 반환한다.

함수 객체에는 \[\[Call\]\]이라는 고유한 internal method가 있다. \[\[Call\]\]은 함수를 호출하면 내부적으로 호출된다. 이는 일반 객체에는 없는 함수 객체만의 고유한 internal method이다.

> ### Abstract Operation
> 
> ECMAScript 스펙에서 Abstract operation으로 구현 방향을 제시한다. ECMAScript의 내부 동작을 이해하기 위해서 읽으면 좋음..

# 3\. Accessor Property

프로퍼티는 Data property와 Accessor property로 구분할 수 있다.

-   Data property
    -   키와 값으로 구성된 일반 프로퍼티. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티이다.
-   Accessor property
    -   자체적으로는 값을 갖지 않고 다른 data property의 값을 읽거나 저장할 때 사용되는 Accessor function으로 구성된 프로퍼티

Accessor function은 getter / setter 함수라고도 부른다.

```js
const student = {
    // Data property
    name: 'Park',
    
    // Accessor property
    get infoName() {
        return this.name;
    },
    set infoName(newName) {
        this.name = newName;
    }
};

// A reference to a property value through a data property.
console.log(student);	// {name: "Park", age: 25}

// Setting Property Values with Accessor Properties
// If store the value in the accessor property infoName, the setter function is called.
student.infoName = 'Kim';
console.log(student);	// {name: "Kim", age: 25}

// Getting Property Values with Accessor Properties
console.log(student.infoName);	// Kim
```

student 객체의 name은 일반적인 데이터 프로퍼티이다.

get infoName은 getter 함수, set infoName은 setter 함수이고 함수의 이름인 infoName이 바로 접근자 프로퍼티이다. 접근자 프로터티는 값(\[\[Value\]\] attribute)을 가지지 않고 데이터 프로퍼티의 값을 읽거나(get) 저장(set)할 때 동작한다.

Accessor property infoName으로 프로퍼티 값에 접근하면 내부적으로 \[\[Get\]\] internal method가 호출되어 다음과 같이 동작한다.

1.  프로퍼티 키가 유효한지 확인한다. (문자열 또는 숫자인지)
2.  프로토타입 체인에서 프로퍼티를 검색한다.
3.  검색된 infoName 프로퍼티가 data property인지 accessor property인지 확인한다. infoName은 Accessor property이다.
4.  Accessor property infoName의 프로퍼티 어트리뷰트 \[\[Get\]\]의 값, 즉 getter 함수를 호출해 결과를 반환한다. 프로퍼티 infoName의 프로퍼티 어트리뷰트 \[\[Get\]\]의 값은 Object.getOwnPropertyDescriptor 메소드가 반환하는 프로퍼티 디스크립터(PropertyDescriptor) 객체의 get 프로퍼티 값과 같다.

Accessor property와 data property의 구별 방법

```js
// The __proto__ of a generic object is an accessor property.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// The prototype of a function object is a data property.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}
```

Accessor property와 data property의 property descriptor object의 프로퍼티가 다르다.

# 4\. Property Attribute

모든 프로퍼티는 자신의 상태와 동작을 정의한 내부 슬롯 / 메소드를 가진다. 이것들을 property attribute라고 한다. Property attribute는 자바스크립트 엔진이 프로퍼티를 생성할 때 default로 자동 정의된다.

-   Data Property Attributes
    
    | Property Attribute | Description | Property of Property Descriptor Object |
    | :-: | :-: | :-: |
    | \[\[Value\]\] | \- 프로퍼티 키로 프로퍼티 값에 접근하면 내부 메소드 \[\[Get\]\]에 의해 반환되는 값  
    \- 프로퍼티 키로 프로퍼티 값을 저장하면 \[\[Value\]\]에 값을 저장한다. 이때 프로퍼티가 없으면 프로퍼티를 생성하고 생성된 프로퍼티의 \[\[Value\]\]에 값을 저장한다. | value |
    | \[\[Writable\]\] | \- 프로퍼티 값의 변경 가능 여부. Boolean  
    \- \[\[Writable\]\]의 값이 false인 경우, 해당 프로퍼티의 \[\[Value\]\]의 값을 변경할 수 없다. | writable |
    | \[\[Enumarable\]\] | \- 프로퍼티의 열거 가능 여부. Boolean  
    \- \[\[Enumerable\]\]의 값이 false인 경우, 해당 프로퍼티는 for…in 문이나 Object.keys 메소드 등으로 열거할 수 없다. | enumerable |
    | \[\[Configurable\]\] | \- 프로퍼티의 재정의 가능 여부. Boolean  
    \- \[\[Configurable\]\]의 값이 false인 경우, 해당 프로퍼티의 삭제와 프로퍼티 어트리뷰트 값의 변경이 금지된다.  
    \- 단, \[\[Writable\]\]이 true인 경우, \[\[Value\]\]의 변경과 \[\[Writable\]\]을 false로 변경하는 것은 허용된다. | configurable |
    

-   Accessor Property Attributes
    
    | Property Attribute | Description | Property of Property Descriptor Object |
    | :-: | :-: | :-: |
    | \[\[Get\]\] | \- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수  
    \- 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 \[\[Get\]\]의 값인 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환 | get |
    | \[\[Set\]\] | \- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수  
    \- 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 \[\[Set\]\]의 값인 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환 | set |
    | \[\[Enumerable\]\] | Same as Data Property’s \[\[Enumerable\]\] | enumerable |
    | \[\[Configurable\]\] | Same as Data Property’s \[\[Configurable\]\] | configurable |
