---
title: "Quick Sort"
date: 2019-04-24
description: "Quick Sort Divide and Conquer Algorithm Use Recursion 정렬해야할 list, 시작점 start와 끝점 end를 넘겨 받는다. left = start, right = end로 정한다. 양방향의 left와 right를 pivot…"
tags: ["Algorithm", "Quick sort"]
categories: ["Computer Engineering", "Algorithm"]
path: "2019/04/24/Quick-Sort"
legacy: true
thumbnail: "/gallery/thumbnails/computer.png"
---

# Quick Sort

-   Divide and Conquer Algorithm
    
-   Use Recursion
    

![Initialize](https://user-images.githubusercontent.com/48080762/56641764-00318280-66b1-11e9-926a-c54f4184fc99.png)

0.  정렬해야할 list, 시작점 start와 끝점 end를 넘겨 받는다. left = start, right = end로 정한다.
    
1.  양방향의 left와 right를 pivot 방향으로 움직이며 pivot 값과 left, right index의 element 값을 비교한다.
    
2.  left의 element 값이 pivot 보다 크고, right의 element 값이 pivot보다 작을 때 둘을 교환하고 각 index를 하나씩 이동한다.(left면 +1, right면 -1)
    
3.  left와 right가 교차되기 전까지 반복하면서 sorting한다.
    
4.  한 번 교차되면 while문을 빠져나오는데, 이 때 pivot을 기준으로 왼쪽은 pivot보다 작은 값들로, 오른쪽은 pivot보다 큰 값들로만 이루어져있다.
    
5.  Recursion으로 pivot을 포함하지 않고 왼쪽과 오른쪽을 각각 다시 돌려준다. 이 때 base case는 start가 end와 같아지거나 교차하면 return하는 것이다.
    

-   코드를 보는 게 더 이해가 쉬울 것 같다. 그림으로 그려보며 진행하는 게 가장 도움이 된다.
    
    ```python
    def quickSort(li, start, end):
        if start >= end:
            return
        left = start
        right = end
        pivot = li[(left+right)//2]
        
        while left <= right:
            while li[left] < pivot:
                left += 1
            while li[right] > pivot:
                right -= 1
            if left <= right:
                li[left], li[right] = li[right], li[left]
                left += 1
                right -= 1
                
        quickSort(li, start, right-1)
        quickSort(li, left, end)
    ```
    
    ```python
    import random
    
    while True:
        num_data=int(input('데이터 개수(0이면 종료):'))
        if not num_data:
            break
        data=[random.randint(1, 100) for _ in range(num_data)]
        print(data)
        quickSort(data, 0, len(data)-1)
        print(data)
    ```
    
-   \[Quick sort에 관련된 TED edu 영상\] What’s the fastest way to alphabetize your bookshelf?
    
    [![What's the fastest way to alphabetize your bookshelf](https://img.youtube.com/vi/WaNLJf8xzC4/0.jpg)](https://youtu.be/WaNLJf8xzC4)
    
-   문제는 pivot을 어떻게 결정할 것이냐이다. Pivot이 정렬해야할 list의 모든 값들의 평균치일 때는 n/2번을 비교하는 것으로 가장 좋지만, 예를 들어 최솟값이나 최댓값을 기준으로 pivot이 선택될 경우 n번을 계산해야한다.
    
-   pivot을 정렬된 list의 가운데 값으로 결정하는 것이 Best case지만, 정렬을 하기 위해서 pivot을 사용하는 것이므로 실현될 수 없는 이야기이다.
    
-   Quick Sort의 Time Complexity는 O(nlogn)으로, average case일 때를 기준으로 한다. Pivot을 random pivot으로 둘 경우 확률적으로 avarage case를 만족한다.
    
-   li의 start와 end와 mid를 정렬한 결과의 중간 값을 return한다. Random Pivot을 이용하기 위해 코드를 수정했다.
    

```python
def getMiddleIndex(li, start, mid, end):
    """
    list의 맨 처음 값, 끝 값, 중간 값 정렬시 가운데 값의 index 반환
    """
    indices = [start, mid, end]
    
    if li[indices[0]] > li[indices[1]]:
        indices[0], indices[1] = indices[1], indices[0]
    if li[indices[1] > li[indices[2]]]:
        indices[1], indices[2] = indices[2], indices[1]
    if li[indices[0]] > li[indices[1]]:
        indices[0], indices[1] = indices[1], indices[0]
        
    return indices[1]
```

### 전체 반영한 결과

```python

def getMiddleIndex(li, start, mid, end):
    """
    list의 맨 처음 값, 끝 값, 중간 값 정렬시 가운데 값의 index 반환
    """
    indices = [start, mid, end]
    
    if li[indices[0]] > li[indices[1]]:
        indices[0], indices[1] = indices[1], indices[0]
    if li[indices[1] > li[indices[2]]]:
        indices[1], indices[2] = indices[2], indices[1]
    if li[indices[0]] > li[indices[1]]:
        indices[0], indices[1] = indices[1], indices[0]
        
    return indices[1]

def quickSort(li, start, end):
    if start >= end:
        return
    left = start
    right = end
    mid = (left+right)//2
    
    #추가된 코드
    mid_index = getMiddleIndex(li, start, mid, end)
    li[mid_index], li[mid] = li[mid], li[mid_index]
    
    pivot = li[mid]
    
    while left <= right:
        while li[left] < pivot:
            left += 1
        while li[right] > pivot:
            right -= 1
        if left <= right:
            li[left], li[right] = li[right], li[left]
            left += 1
            right -= 1
            
    quickSort(li, start, right-1)
    quickSort(li, left, end)
```
