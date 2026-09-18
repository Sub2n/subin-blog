---
title: "CodeWars 6kyu. Decode the Morse code"
date: 2019-04-29
description: "CodeWars 6kyu. Decode the Morse codeDecode Morse code to plain text"
tags: ["Algorithm"]
categories: ["Algorithm", "CodeWars"]
path: "2019/04/29/CodeWars-6kyu-Decode-the-Morse-code"
legacy: true
thumbnail: "/gallery/thumbnails/algorithm.png"
---

## [CodeWars 6kyu. Decode the Morse code](https://www.codewars.com/kata/decode-the-morse-code/train/javascript)

Decode Morse code to plain text

> The Morse code encodes every character as a sequence of “dots” and “dashes”. For example, the letter A is coded as ·−, letter Q is coded as −−·−, and digit 1 is coded as ·−−−−. The Morse code is case-insensitive, traditionally capital letters are used. When the message is written in Morse code, a single space is used to separate the character codes and 3 spaces are used to separate words. For example, the message HEY JUDE in Morse code is ···· · −·−− ·−−− ··− −·· ·.

> NOTE: Extra spaces before or after the code have no meaning and should be ignored.

> In addition to letters, digits and some punctuation, there are some special service codes, the most notorious of those is the international distress signal SOS (that was first issued by Titanic), that is coded as ···−−−···. These special codes are treated as single special characters, and usually are transmitted as separate words.
> 
> Your task is to implement a function that would take the morse code as input and return a decoded human-readable string.

```js
decodeMorse('.... . -.--   .--- ..- -.. .')
//should return "HEY JUDE"
```

1.  Each word distinguished by `" "` (3 spaces)
2.  Free to use the preloaded Morse code table as a dictionary. By `MORSE_CODE['.--']`

## javaScript Solution

![Submit screen](https://user-images.githubusercontent.com/48080762/56873375-eefbc380-6a6c-11e9-864d-86e29c152aea.png)

```js
decodeMorse = function(morseCode){
  var words = morseCode.split("   ");
  var string = ""
  
  for (var i in words){
    if(words[i] != ''){
      var word = words[i].split(" ");
      for(var j in word){
        if(word[j] != ''){
          string += MORSE_CODE[word[j]];
        }
      }
      if(i < words.length-1){
        string += " "
      }
    }  
  }
```
