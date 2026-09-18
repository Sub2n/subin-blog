---
title: "32. REST API"
date: 2019-05-27
description: "REST(Representational State Transfer) APIopen API를 이용하기 위해서 문서를 찾아다닐 때 가장 많이 본 단어가 RESTful API이다. REST는 웹의 장점을 최대한 활용할 수 있는 architecture로 처음 소개되었으며…"
tags: ["REST API", "자바스크립트"]
categories: ["JavaScript"]
path: "2019/05/27/32-REST-API"
legacy: true
thumbnail: "/gallery/thumbnails/javascript.png"
---

## REST(Representational State Transfer) API

open API를 이용하기 위해서 문서를 찾아다닐 때 가장 많이 본 단어가 RESTful API이다. REST는 웹의 장점을 최대한 활용할 수 있는 architecture로 처음 소개되었으며 HTTP 프로토콜을 의도에 맞게 디자인하도록 유도하는 방법론이다. REST의 기본 원칙에 충실한 서비스 디자인을 RESTful이라고 한다.

### 1\. REST API 중심 규칙

#### 1) URI는 정보의 자원을 표현해야 한다.

리소스명으로 동사보다는 명사를 사용

URI는 자원을 표현하는 데 중점 두어야 함

#### 2) 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)로 표현한다.

```
# bad
GET /books/delete/1

# good
DELETE /books/1
```

### 2\. HTTP Method

주로 5자리 Method를 사용해서 **CRUD** (Create, Read, Update, Delete) 구현

| Method | Action | 역할 |
| :-- | --- | --- |
| GET | index/retireve | 모든/특정 리소스 조회 |
| POST | create | 리소스 생성 |
| PUT | update all | 모든 리소스 갱신 |
| PATCH | update | 리소스 갱신 |
| DELETE | delete | 리소스 삭제 |

### 3\. Configuring the REST API

#### REST의 3요소

| 구성 요소 | 내용 | 표현 방법 |
| --- | --- | --- |
| Resource | Resource | HTTP URI |
| Verb | Actions on Resources | HTTP Method |
| Representations | Details of actions on resources | HTTP Message **Pay Load** |

REST는 Self-descriptiveness(자체 표현 구조)로 구성되어 REST API만으로 Request를 이해할 수 있다.
