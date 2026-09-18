---
title: "Python 3.7.3 | Jupyter 설치"
date: 2019-04-18
description: "Window Python 3.7.3 및 Jupyter 설치파이썬을 공부하기 위해 작업환경을 우선 구축하기로 한다. Python 3.7.3 설치 Python 최신 릴리즈인 3.7.3 다운로드 페이지로 이동한다. Download for Windows의 Python…"
tags: ["Python"]
categories: ["Python"]
path: "2019/04/18/Python-3-7-3-Jupyter-설치"
legacy: true
thumbnail: "/gallery/thumbnails/python.png"
---

# Window Python 3.7.3 및 Jupyter 설치

파이썬을 공부하기 위해 작업환경을 우선 구축하기로 한다.

## Python 3.7.3 설치

1.  Python 최신 릴리즈인 [3.7.3 다운로드](https://www.python.org/downloads/release/python-373/) 페이지로 이동한다.

![www.python.org/download](https://user-images.githubusercontent.com/48080762/56359343-45226880-621c-11e9-9d8d-12cfb3d12b59.png)

2.  Download for Windows의 Python 3.7.3 버튼을 누르면 자동으로 설치 실행 파일이 다운로드 된다.
    
3.  다운받은 `python-3.7.3.exe` 파일을 관리자 권한으로 실행 후, 설치를 진행한다. PATH를 자동으로 생성하는 것이 좋다!
    
4.  다운로드가 완료되면 cmd 창을 열어 `python --version` 명령어로 설치가 제대로 되었는지 확인한다.
    
    ![python 설치 확인](https://user-images.githubusercontent.com/48080762/56359512-bd892980-621c-11e9-8241-1fc8a260c10b.png)
    

## Jupyter 설치

위의 Python 설치 4단계에서, cmd 명령으로 확인을 정상적으로 마쳤다면 추가적인 명령 한 줄로 Jupyter를 설치할 수 있다.

1.  cmd 창에 `pip install jupyter`를 입력한다.  
    ![jupyter 설치](https://user-images.githubusercontent.com/48080762/56359642-1c4ea300-621d-11e9-9c40-cd5fd89b9a24.png)

여기까지 하면 Python 사용을 위한 간단한 작업 환경 구성이 완료된다.
