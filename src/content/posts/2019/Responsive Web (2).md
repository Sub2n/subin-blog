---
title: "Responsive Web (2)"
date: 2019-04-16
description: "Responsive Web"
tags: ["HTML, CSS"]
categories: ["HTML/CSS"]
path: "2019/04/16/Responsive Web (2)"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Responsive Web

### `<picture>` element

-   Can I Use `<picture>`?
    
    > [CanIUse.com](https://caniuse.com/#search=picture)
    
-   `<picture>` 문법
    
    -   `<img>`를 fallback으로 첨부해야한다. `<picture>` 는 `<img>` tag가 없으면 인식되지 않는다!
        
        ```css
        img {display: block; margin: 0 auto;}
        ```
        

```
<picture>
  <source media="(min-width: 650px)" srcset="images/kitten-stretching.png">
  <source media="(min-width: 465px)" srcset="images/kitten-sitting.png">
  <img src="images/kitten-curled.png" alt="a cute kitten">
</picture>
```

### Pixel density descriptor

-   1x, 1.5x, 2x 그리고 3x와 같은 픽셀 밀도 서술자(Pixel density descriptor)들을 사용하여 고해상도 디스플레이 지원을 추가합니다.
-   새로 추가된 srcset 속성은 `<img>`와 `<source>` 엘리먼트 모두에 적용됩니다.
-   letina부터는 2x 나오고 Android는 1.5x 등 정수가 아니고 소숫점으로 증가

### Image 반응형으로 만들기

1.  wrapper를 만들고, 그 안에 `<img>` max-width: 100%;
    
2.  height: auto;
    
    ```html
     <style>
     .rwd-wrapper{
       width: 30%;
       border: 5px solid blueviolet;
     }
     .rwd-wrapper img{
       max-width: 100%;
       height: auto;
     }
     </style>
     </head>
     <body>
       <div class="rwd-wrapper">
         <img src="images/image-src.png" alt="">
       </div>
    </body>
    ```
    
3.  srcset 속성을 사용해서 Pixel density 설정  
    ![0416](https://user-images.githubusercontent.com/48080762/56205794-bd0a5a80-6085-11e9-818e-61f08070d206.png)
    
    ```html
    <div class="rwd-wrapper">
    <img src="images/image-src.png" alt=""
      srcset="images/image-1x.png 1x,
              images/image-2x.png 2x,
              images/image-3x.png 3x,
              images/image-4x.png 4x">
    </div>
    ```
    
4.  Viewport 별로 Art Direction 설정하기
    

-   `<picture>`의 `<source media="">`로 조건 줌
    
    ![0416_(2)](https://user-images.githubusercontent.com/48080762/56206390-3bb3c780-6087-11e9-80bb-76530aeaa9cb.png)
    

```html
<picture>
  <source media="(max-width: 650px)" srcset="images/small.jpg">
  <source media="(min-width: 651px) and (max-width: 999px)" srcset="images/media.jpg">
  <source media="(min-width: 1000px)" srcset="images/large.jpg">
  <img class="rwd-img" src="images/normal.jpg" alt="">
</picture>
```

### Background image를 반응형으로 만들기

1.  image 원본 size를 알아내야한다. > 가로, 세로 비율을 계산해야함
    
2.  height를 0으로 하고, padding을 세로로 원본 image의 비율에 맞게 준다.
    
    ```css
    .rwd-bg{
    
      width: 100%;
      height: 0 !important;
      padding-top: calc(3280 / 4928 * 100%);
      background: url("images/light.jpg") no-repeat;
      background-size: 100% 100%;
    }
    ```
    
3.  width 크기를 변경할 때는 새로운 wrapper를 만들어 그 wrapper의 width를 줄인다.
    

```css
.wrapper{
  width: 50%;
}
.rwd-bg{
  width: 100%;
  height: 0 !important;
  padding-top: calc(3280 / 4928 * 100%);
  background: url("images/light.jpg") no-repeat;
  background-size: 100% 100%;
}
```

```html
<div class="wrapper">
  <div class="rwd-bg"></div>
</div>
```

-   .rwd-bg는 parent인 wrapper의 width 100%만큼 차지하므로 wrapper의 크기가 줄어들면 같이 줄어든다.

### Background-size: cover, contain

[CSS Trick Background-size 참고 사이트](https://css-tricks.com/almanac/properties/b/background-size/)

![image](https://user-images.githubusercontent.com/48080762/56206784-22f7e180-6088-11e9-8067-52e42f347f14.png)

-   cover : 이미지가 일부 잘리더라도 화면을 꽉 채우게 가장 작은 축을 기준으로 cover함
-   contain : 가로든, 세로든 가장 긴 축을 기준으로 화면에 잘리지 않게 하는 기법

### Media query로 해상도 별 배경 image 다르게 하기

-   dpi : dot per inch - 1inch 당 들어가는 pixel 수
-   CSS는 1inch 당 96px이니까 192dpi는 2x임

```css
@media all and (min-resolution: 192dpi){
  .rwd-bg{
    background-image: url("images/unsplash.jpg");
  }
}
```
