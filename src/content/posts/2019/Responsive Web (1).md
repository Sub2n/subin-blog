---
title: "Responsive Web (1)"
date: 2019-04-16
description: "반응형 웹 | Responsive Web Design 웹 환경의 변화 : Mobile Device의 등장 초기 모바일 환경을 위해 mobile 화면을 별도 구성 &gt; 비용과 유지보수 측면에서 risk 크다."
tags: ["HTML, CSS"]
categories: ["HTML/CSS"]
path: "2019/04/16/Responsive Web (1)"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## 반응형 웹 | Responsive Web Design

-   웹 환경의 변화 : Mobile Device의 등장
-   초기 모바일 환경을 위해 mobile 화면을 별도 구성 > 비용과 유지보수 측면에서 risk 크다.

### One Source Multi Use : 반응형 웹의 필요성 대두

-   Contents는 물처럼 어느 그릇에나 담길 수 있어야한다.
-   Contents의 본질을 가지고 Markup 후 CSS로 디자인만 달리 할 수 있어야한다.

### Flexible vs Adaptive

-   RWD(반응형 웹 디자인) : flexible(latout이 고무줄처럼 유연하게 늘었다 줄었다 하는 것), adaptive(viewport에 따라서 layout이 각각 고정되는 것) > 둘 다Device viewport에 반응하는 design
-   AWD(적응형 웹 디자인)
-   Flexible : 모든 환경에서 유연하게 움직임
-   Adaptive : Web viewport에서는 고정형, tablet이나 mobile에서는 flexible design 채택

### DeskTop First vs Mobile First

-   Mobile First 권장
-   Desktop CSS 먼저 불러온 후 Mobile로 재적용하면 mobile 환경에서 data 많이 듦 > 성능문제

### Flexible Layout

-   Target / Context = Result ( 900px / 960px = 0.9375 \* 100% = 93.75%!)
-   Target이 context 안에서 차지하는 영역
-   고정적인 pixel 단위 사용 최대한 지양
-   %, viewport, em 등 유연한 단위 사용을 지향

### Media Queries

```css
@charset "utf-8"
/* All Device */
/* Mobile Device */
@media all and (min-width: 768px){
  /* 사용자 해상도가 768px 이상일 때 실행됨 */
}
```

-   all : 어떤 device든 들어올 수 있다는 뜻 (printer 용 CSS 따로 정의할 수 있음)
-   코드 중복, 복잡도 증가 > CSS가 복잡해짐!
-   Sass (CSS 전처리기) > build하면 CSS code로 떨어짐
    -   Sass
    -   Scss

### Responsive Image

```css
img{
  max-width: 100%;
  height: auto;
}
```

-   max-width: 100% > 부모 크기를 기준으로 100%, 원본크기 이상은 늘어나지 않게 함
-   height: auto > 원본 사이즈 비율을 기준으로 auto (width가 반 줄어들면 얘도 반 줄어들음)

• 용량으로 인한 성능, 속도 고려 필요

• Mobile Responsive Web test site: [Troy - Responsive web tester](http://troy.labs.daum.net/)

• 현재 기기의 Pixel Ratio 알 수 있는 사이트: [myDevice.io](https://www.mydevice.io/)

![image](https://user-images.githubusercontent.com/48080762/56208226-95b68c00-608b-11e9-8756-f2d60d03cf86.png)

• 다양한 Image Format 대응

-   SVG : Vector 형식 이미지
-   WebP : 구글 제안

• 해결

-   `<img>`의 srcset, sizes 속성
-   `<picture>` 해상도 따라 조절하는 신규 요소 : `<picture>` 모를 때를 대비한 fallback image 있어야함

### 반응형 이미지

```css
.rwd-container{
  width: 50%;
  box-sizing: border-box;
  border: 10px solid #000;
}
.rwd-container img, .rwd-container video{
  width: 100%;
  height: auto;
}
```

-   `<img>`가 parent container의 width가 줄어들 때마다 같이 줄어든다.
-   `<video>`도 가능. 그러나 모두 크기 조절을 위해 wrapping해야한다.

### `<iframe>`을 반응형으로 만들기

1.  `<iframe>` 삽입  
    ![image](https://user-images.githubusercontent.com/48080762/56208391-fe056d80-608b-11e9-975a-2e38fda0438c.png)
    
    ```html
    <div class="rwd-iframe">
      <iframe src="https://www.youtube.com/embed/2S24-y0Ij3Y?controls=0" allowfullscreen></iframe>
    </div>
    ```
    
    ```css
    .rwd-iframe{
      border: 10px solid #00f;
      width: 80%;
    }
    .rwd-iframe iframe{
      width: 100%;
      height: auto;
    }
    ```
    

-   `<img>`나 `<video>`처럼 하면 안 먹음
    
-   `<iframe>`은 wrapping `<div>` 2개 필요함
    
    ![0416(3)](https://user-images.githubusercontent.com/48080762/56209006-77519000-608d-11e9-84d0-ef20de16e460.png)
    

2.  비율별 module화
    
    ```css
    .rwd-iframe{
      position: relative;
      padding-top: calc(9 / 16 * 100%);
      background: pink;
      width: 100%;
    }
    .rwd-3-4{
      padding-top: calc(3 / 4 * 100%);
    }
    .rwd-9-16{
      padding-top: calc(9 / 16 * 100%);
    }
    ```
    
    ```html
    <div class="rwd-container">
      <div class="rwd-iframe rwd-9-16">
        <iframe src="https://www.youtube.com/embed/2S24-y0Ij3Y?controls=0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="rwd-container">
      <div class="rwd-iframe rwd-3-4">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.021471174445!2d127.05441626516713!3d37.54323347980236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca49534790c57%3A0xc115101cbaecb40e!2z7JWE7YGs67C466as7ISc67mE7Iqk!5e1!3m2!1sko!2skr!4v1555310320240!5m2!1sko!2skr" allowfullscreen></iframe>
      </div>
    </div>
    ```
    

## GRID

### Container에 display: grid 적용

```css
.container{
  display: grid;
}
```

### Grid-template

```css
.container{
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
```

![image](https://user-images.githubusercontent.com/48080762/56209235-fc3ca980-608d-11e9-9e6b-9425c3574448.png)

-   Grid는 FireFox에서 개발자도구로 보는 것이 가장 편하다!

### Grid fraction

```css
.container{
  background: yellow;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
}
```

![image](https://user-images.githubusercontent.com/48080762/56209296-1fffef80-608e-11e9-9732-5b78ace04632.png)

### Grid 배치

```css
.items4{
  background: lime;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

![image](https://user-images.githubusercontent.com/48080762/56209326-373edd00-608e-11e9-9923-8356fdcfff6c.png)

-   Start나 end 중 하나를 지정해주지 않으면 자동으로 한 칸만큼을 차지한다.
    
-   단축표기법
    
    ```css
    .items4{
      background: lime;
        /* start / end */
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
    ```
    

### 여러 track 차지하기

```css
.items2{
  background: orange;
  grid-column: 1 / 4;
  grid-row: 2 / 3;
}
```

![image](https://user-images.githubusercontent.com/48080762/56209366-58073280-608e-11e9-99d1-509abe78941f.png)

### Grid-area

```css
.items2{
  background: orange;
  /* row-start / column-start / row-end / column-end */
  grid-area: 2 / 1 / 3 / 4;
}
```

### Grid template areas

-   Grid item에 name 주고 container에서 grid-template-areas로 위치 잡기
-   [Grid 속성 요약](https://uid.gitbook.io/css-grid/css-grid-guide/css-grid-properties-summary)

```css
.container{
  background: yellow;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-template-areas: "item2 . item1" 
          "item4 item4 item3"
}
```

![image](https://user-images.githubusercontent.com/48080762/56209461-93a1fc80-608e-11e9-9d71-ed756b4acf3c.png)

-   Grid IE 환경 코드로 autoprefix
    
    [Auto Prefixer](https://autoprefixer.github.io/) 🌟
    
-   Grid calculator
    
    [Grid Calculator](http://gridcalculator.dk/) 🌟
    
    ![image](https://user-images.githubusercontent.com/48080762/56209537-cb10a900-608e-11e9-892a-a5662fb10e4e.png)
    
    column 크기 65px, gutter 20px, page width와 column width 소수점 안 나오게 조정
    

### Grid column, gutter(gap) 설정

```css
.container{
  background: yellow;
  display: grid;
  grid-template-columns: repeat(12, 65px);
  grid-column-gap: 20px; 
}
```

: repeat(반복 횟수, 크기) method 사용  
![image](https://user-images.githubusercontent.com/48080762/56209587-ea0f3b00-608e-11e9-9a34-2405d22f2135.png)

-   Grid area 잡기 : DeskTop Version

```css
.container{
  max-width: 1000px;
  margin: 0 auto;
  background: silver;
  display: grid;
  grid-template-columns: repeat(12, 65px);
  /* grid-template-rows: ; */
  grid-column-gap: 20px; 
}
.header{
  background: pink;
  grid-area: 1 / 1 / 2 / 13;
}
.navigation{
  background: skyblue;
  grid-area: 2 / 1 / 3 / 13;
}
.book{
  background: lime;
  grid-area: 3 / 1 / 4 / 5;
}
.news{
  background: orange;
  grid-area: 3 / 5 / 4 / 13;
}
.board{
  background: blanchedalmond;
  grid-area: 4 / 1 / 5 / 5;
}
.favorite{
  background: gold;
  grid-area: 4 / 10 / 5 / 13;
}
.twitter{
  background: brown;
  grid-area: 4 / 5 / 5 / 10;
}
.footer{
  background: teal;
  grid-area: 5 / 1 / 6 / 13;
}
```

![image](https://user-images.githubusercontent.com/48080762/56209649-04491900-608f-11e9-96a4-a5385f8e784c.png)

-   Grid area 잡기 : Mobile Device
    
    ```css
    /* Mobile Device */
    @media all and (max-width: 999px){
      .container{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 0 20px;
      }
    }
    ```
    
    -   알파, 오메가 margin 따로 없으니까 좌우 padding으로 줌
    -   Margin 빼고 나머지 부분을 4등분하려고 fr 단위 사용
    
    ![image](https://user-images.githubusercontent.com/48080762/56209752-3c505c00-608f-11e9-98d6-a366f46b1e2c.png)
    
    ```css
    /* Mobile Device */
    @media all and (max-width: 999px){
      .container{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;
        padding: 0 20px;
        grid-template-areas: "header header header header"
        "nav nav nav nav"
        "book book news news"
        "board board favorite favorite"
        "twitter twitter twitter twitter"
        "footer footer footer footer"
      }
      .header{
        background: yellow;
        grid-area: header;
      }
      .navigation{
        background: pink;
        grid-area: nav;
      }
      .book{
        background: skyblue;
        grid-area: book;
      }
      .news{
        background: lime;
        grid-area: news;
      }
      .board{
        background: purple;
        grid-area: board;
      }
      .favorite{
        background: orange;
        grid-area: favorite;
      }
      .twitter{
        background: aqua;
        grid-area: twitter;
      }
      .footer{
        background: hotpink;
        grid-area: footer;
      }
    }
    ```
