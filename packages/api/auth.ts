import api from './axios';

export async function loginWithGoogle(code: string, state?: string) {
  // 구글 로그인을 위한 새로운 엔드포인트 (서버에서 구현 필요)
  const res = await api.post('/auth/google', {
    code,
    state,
    provider: 'google',
  });
  return res;
}

export async function getAccessTokenWithRefreshToken() {
  // Refresh-Token 쿠키가 자동으로 포함됨
  const res = await api.get('/auth/token');
  return res;
}

export async function reissueAccessToken() {
  // Access Token 재발급
  const res = await api.post('/auth/reissue');
  return res;
}
