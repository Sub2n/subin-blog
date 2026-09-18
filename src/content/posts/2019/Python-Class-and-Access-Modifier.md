---
title: "Python Class and Access Modifier"
date: 2019-04-24
description: "Python Class1234567891011121314151617181920212223242526272829303132333435363738class Account: # constructor # 객체를 생성할 때 \"반드시\" 한 번 호출한다. def…"
tags: ["Access Modifier", "Class", "OOP", "Python"]
categories: ["Python"]
path: "2019/04/24/Python-Class-and-Access-Modifier"
legacy: true
thumbnail: "/gallery/thumbnails/python.png"
---

# Python Class

```python
class Account:
    # constructor
    # 객체를 생성할 때 "반드시" 한 번 호출한다.
    def __init__(self, cus_name, init_balance):
        # instance member
        self.name = cus_name
        self.balance = init_balance
        
    # descructor
    # 객체가 소멸될 때 "반드시" 한 번 호출
    def __del__(self):
        pass
    
    # instance method(operator)
    def deposit(self, money):
        if money < 0:
            print('0보다 작은 값을 저금할 수 없습니다.')
            return False
        
        self.balance += money        
        print(f'잔고 {self.balance}')
        return True
    
    def withdraw(self, money):
        if money > self.balance:
            print('잔고보다 출금하려는 돈이 더 많습니다.')
            return False
        
        self.balance -= money
        print(f'잔고 {self.balance}')
        return money
    
    def transfer(self, other, money):
        self.balance -= money
        # 다른 object의 member에 바로 접근하지 않는다!! (private없어서 접근 할 수는 있음(뭐임?))
        # 다른 object의 member는 "반드시" 상대 object의 method를 호출해서 접근해야 한다. - Message Passing
        other.deposit(money)
        print(f'잔고 {self.balance}')
```

## Object : abstraction method (추상화 도구)

-   관련 있는 변수(member)와 기능(operator, method)를 묶어서 하나의 object로 만든다.
-   Operator를 통해서만 member에 접근할 수 있다.

## Class와 Instance, object의 차이

-   클래스(class)란 똑같은 무엇인가를 계속해서 만들어낼 수 있는 설계 도면 같은 것이고(과자 틀), 객체(object)란 클래스에 의해서 만들어진 피조물(과자틀에 의해서 만들어진 과자)을 뜻한다.
-   class에 의해서 만들어진 Object를 instance라고도 한다. 그렇다면 Object와 Instance의 차이는 무엇일까?  
    이렇게 생각해 보자. a = Cookie() 이렇게 만들어진 a는 Object이다. 그리고 a라는 Object는 Cookie의 Instance이다.
-   즉, Instance라는 말은 특정 Object(a)가 어떤 Class(Cookie)의 객체인지를 관계 위주로 설명할 때 사용된다. 즉, “a는 instance” 보다는 “a는 object”라는 표현이 어울리며, “a는 Cookie의 object” 보다는 “a는 Cookie의 instance”라는 표현이 훨씬 잘 어울린다.

## Public, Private and Protected | Python Access Modifier

C++, Java와 같이 클래식한 object-oriented 언어에서는 public, private, protected와 같은 키워드로 class의 member에 대한 접근을 제어한다. Class의 Private member는 class 외부에서 접근이 불가능하며 class 내부에서만 접근될 수 있다.

Class 내의 Public member는 class 외부에서도 접근할 수 있다. 같은 class의 object는 public method를 호출하도록 요구된다. Private instance variable과 public method를 함께 써야지만 데이터 encapsulation의 원칙에 따르는 것이다.

Class의 protected member는 오직 해당 class와 그 class를 상속받은 child class만이 접근할 수 있다. 이는 parent class가 child class에게 특정한 리소스를 상속할 수 있게 한다.

그런데 Python은 instance variable과 method에 대해서 접근 제한을 하는 방식이 따로 없다. Python vaiable이나 method의 이름 앞에 한개 또는 2개의 \_(underscore)를 붙여서 protected와 private으로 구분하기로 약속한다.

### Public Attributes

```python
class Account:
    def __init__(self, cus_name, init_balance):
        # instance member
        self.name = cus_name
        self.balance = init_balance
```

### Protected Attribute

```python
class Account:
    def __init__(self, cus_name, init_balance):
        # instance member
        self._name = cus_name
        self._balance = init_balance
```

### Private Attribute

```python
class Account:
    def __init__(self, cus_name, init_balance):
        # instance member
        self.__name = cus_name
        self.__balance = init_balance
```

그런데 웃긴 건, underscore로 name mangling한 private variable을 class 외부에서 접근이 가능하다는 것이다. 다음의 방법을 사용하면 된다.

```python
myAccount = Account('subin', 10000)
myAccount._Account__balance
```

정말 필요하다면 접근할 수 있지만, Python에서는 접근하지 말 것을 권고하고 있다.

---

참고 자료

-   [점프 투 파이썬](https://wikidocs.net/28)
-   [TutorialsTeacher](https://www.tutorialsteacher.com/python/private-and-protected-access-modifiers-in-python)
