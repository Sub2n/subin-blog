---
title: "Angular JWT"
date: 2019-07-12
description: "Angular Guard로그인에 성공한 사용자만 접속할 수 있는 페이지를 구현해야할 때가 있다. 이런 때에는 Angular Guard를 이용한 Authentication을 한다. Guard는 Service의 일종이다."
tags: ["Angular"]
categories: ["JavaScript", "Angular"]
path: "2019/07/12/Angular-JWT"
legacy: true
thumbnail: "/gallery/thumbnails/html.png"
---

## Angular Guard

로그인에 성공한 사용자만 접속할 수 있는 페이지를 구현해야할 때가 있다. 이런 때에는 Angular Guard를 이용한 Authentication을 한다.

Guard는 Service의 일종이다.

### Generate Guard

```bash
ng g g Auth
```

-   CanActivate

### AuthGuard

```ts
// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
  // canActivate: boolean을 implements 해야함
  canActivate() {
    // 일단 token 있으면 진입 가능하게 함
    if (localStorage.getItem('my-token')) return true;
		
    // 없으면 login으로 이동하고 return false
    this.router.navigate(['login']);
    return false;
  }
}
```

### Guard 적용할 Component

```ts
// community-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityComponent } from './components/community.component';
import { PhotoComponent } from './components/photo.component';
import { KnowhowComponent } from './components/knowhow.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'community', component: CommunityComponent, canActivate: [AuthGuard] },
  { path: 'community/photo', component: PhotoComponent },
  { path: 'community/knowhow', component: KnowhowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class CommunityRoutingModule {}
```

## Angular JWT (JSON Web Authentication)

http Protocol은 stateless로, Server는 Client의 상태(state)를 기억하지 않는다. 로그인 유지를 위해서 Client 측에서 Session과 Cookie를 이용했다.

요즘은 보안을 위해 JWT(JSON Web Token)을 이용한다.

1.  Browser가 id와 pw로 Server에 login 함
2.  Server가 Browser로 JWT 전송
3.  Browser가 Server로 JWT을 Authorization Header에 담아 전송
4.  Server가 JWT의 signature 확인하고 JWT를 Decoding해서 User Information을 얻는다.

JWON Web Token은 `header.payload.signature`로 이루어진다.

SIgnature는 Header의 encoding 값과 Palyload의 encoding 값을 합쳐 주어진 Private Key로 Hash 해서 생성한다.

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

SHA256은 네트워크 보안 수업 시간에 공부했던 건데 이렇게 실제로 사용되고 있는 것을 보니 감회가 새롭다.
