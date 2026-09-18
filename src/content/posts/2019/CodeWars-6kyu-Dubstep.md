---
title: "CodeWars 6kyu. Dubstep"
date: 2019-04-18
description: "CodeWars 6kyu. Dubstep덥스텝 제목을 Decoding 하기"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/18/CodeWars-6kyu-Dubstep"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Dubstep](https://www.codewars.com/kata/dubstep/train/javascript)

덥스텝 제목을 Decoding 하기

> Polycarpus works as a DJ in the best Berland nightclub, and he often uses dubstep music in his performance. Recently, he has decided to take a couple of old songs and make dubstep remixes from them.

> Let’s assume that a song consists of some number of words (that don’t contain WUB). To make the dubstep remix of this song, Polycarpus inserts a certain number of words “WUB” before the first word of the song (the number may be zero), after the last word (the number may be zero), and between words (at least one between any pair of neighbouring words), and then the boy glues together all the words, including “WUB”, in one string and plays the song at the club.

> For example, a song with words “I AM X” can transform into a dubstep remix as “WUBWUBIWUBAMWUBWUBX” and cannot transform into “WUBWUBIAMWUBX”.

> Recently, Jonny has heard Polycarpus’s new dubstep track, but since he isn’t into modern music, he decided to find out what was the initial song that Polycarpus remixed. Help Jonny restore the original song.

> Input
> 
> The input consists of a single non-empty string, consisting only of uppercase English letters, the string’s length doesn’t exceed 200 characters

> Output
> 
> Return the words of the initial song that Polycarpus used to make a dubsteb remix. Separate the words with a space.

> Examples

```js
songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB")
  // =>  WE ARE THE CHAMPIONS MY FRIEND
```

### 요구조건

1.  input으로 200자를 넘지 않고 비어있지 않은 string 하나가 들어오면 WUB가 끼어들어가있지 않은 원래의 song 제목으로 decoding해 return 한다.
    
2.  각 단어는 space로 나눠져야 한다.
    

### 해결책

여러가지 방법으로 해결했다. Regular Expression을 활용해 string을 처리했다.

1.  replace method와 RegEx를 사용해 song에 존재하는 모든 “WUB”를 “ “(space)로 대체한다. 단어 사이에 space가 여러개 있을 수 있으니 하나 이상의 space(\\s+)로 string을 배열로 조각낸 후, 각 단어를 다시 space를 사이에 넣어 join한다.

1-1. 이렇게 되면 string의 시작과 끝에 존재하는 공백이 처리되지 않는다. 처음 Solution 1을 작성할 때는 trim() method를 몰랐으므로 직접 if문으로 처리했다.

2.  filter() method와 새로운 function 문법 => 를 써보고 싶어 작성한 Suolution
    
3.  정규 표현식과 trim method를 활용해 코드의 길이를 줄였다.
    

### javaScript Solution 1

```js
function songDecoder(song){

  let result = song.replace(/WUB/gi, ' ').split(/\s+/).join(' ');

  if(result[0] === ' '){
    result = result.slice(1);
  } if(result[result.length-1] === ' '){
    result = result.slice(0, -1);
  }
  
  return result;
}
```

### javaScript Solution 2

```js
function songDecoder(song){
  return song.replace(/WUB/g, ' ').split(' ').filter(word=>word!='').join(' ');
;
}
```

### javaScript Solution 3

![my Solution Submit](https://user-images.githubusercontent.com/48080762/56358001-46519680-6218-11e9-804a-facea4d24994.png)

```js
function songDecoder(song){
  return song.replace(/(WUB)+/g," ").trim();
}
```

### Regular Expression

-   ^x : 문자열의 시작이 x
-   x$ : 문자열의 끝이 x
-   .x : x로 끝나는 임의의 문자
-   x+ : x가 1번 이상 반복
-   x\* : x가 0번 이상 반복
-   x? : x가 존재하거나 존재하지 않음
-   x{n} : x를 n번 반복한 문자를 찾음
-   x{n,} : x를 n번 이상 반복한 문자를 찾음
-   x{n, m} : x를 n번 이상, m번 이하 반복하는 문자를 찾음

#### Flags

-   g (Global) : 문자열 내에 존재하는 모든 패턴을 찾음
-   i (Ignore Case) : 대소문자 구분 없이 찾음
-   m (Multi Line) : 문자열의 행이 바뀌어도 찾음

```js
// 객체초기화(Object initializer) 방법
var regExp = /정규표현식/[Flag];
```
