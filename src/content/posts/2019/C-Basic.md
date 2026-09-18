---
title: "C# Basic"
date: 2019-07-22
description: "CObject-oriented Language다른 객체 지향 언어와 마찬가지로 Class와 Instance Attribute, Method 등의 개념이 존재한다."
tags: ["C#", "Unity"]
categories: ["Computer Engineering", "Computer Graphics"]
path: "2019/07/22/C-Basic"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

# C

#### Object-oriented Language

다른 객체 지향 언어와 마찬가지로 Class와 Instance Attribute, Method 등의 개념이 존재한다.

#### C# Script 생성시 초기 화면

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HelloWorld : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
```

-   MonoBehaviour : Unity의 기본 Class 😪 [docs.unity](https://docs.unity3d.com/kr/530/ScriptReference/MonoBehaviour.html)
-   Update method : frame마다 매번 실행됨

#### Data Type

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HelloWorld : MonoBehaviour
{
    int iValue;
    double dValue;
    float fValue;
    bool bValue;
    string sValue;

    // Start is called before the first frame update
    void Start()
    {
        iValue = 50;
        dValue = 100.123;
        fValue = 100.23f;
        bValue = true;
        sValue = "Hello World";
    }

    // Update is called once per frame
    void Update()
    {
        print("Integer Value: " + iValue);
        print("Double Value: " + dValue);
        print("Float Value: " + fValue);
        print("Boolean Value: " + bValue);
        print("String Value: " + sValue);
    }
}
```

-   float type은 number + f로 써야함

#### Moving Object

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HelloWorld : MonoBehaviour
{
    float speed = 20.0f;
    Rigidbody rb;
    public bool isGrounded;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    void OnCollisionStay()
    {
        isGrounded = true;
    }

    // Update is called once per frame
    void Update()
    {
        float position1 = Input.GetAxis("Vertical");
        float position2 = Input.GetAxis("Horizontal");

        position1 = position1 * speed * Time.deltaTime;
        position2 = position2 * speed * Time.deltaTime;
    
        transform.Translate(Vector3.forward * position1);
        transform.Translate(Vector3.right * position2);

        if (Input.GetKeyDown(KeyCode.Space) && isGrounded == true)
        {
            rb.AddForce(new Vector3(0, 5, 0), ForceMode.Impulse);
            isGrounded = false;
        }
    }
}
```

어설프게 키보드로 움직이는 코드
