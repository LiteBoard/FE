# @LiteBoard/api

공통 axios 인스턴스 패키지입니다.

## 사용법

```ts
import api from '@LiteBoard/api';

api.get('/user/me').then((res) => {
  // ...
});
```

- baseURL은 환경변수 `NEXT_PUBLIC_API_URL`을 사용합니다.
- 인터셉터, 토큰 자동 첨부 등 공통 로직을 이곳에서 관리하세요.
