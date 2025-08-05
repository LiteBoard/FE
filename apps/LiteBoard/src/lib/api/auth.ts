import api from './axios';

export async function getAccessTokenWithRefreshToken() {
  // Refresh-Token 쿠키로 Access Token 발급
  // 쿠키는 자동으로 전송되므로 별도 설정 불필요
  const res = await api.get('/auth/token');
  return res;
}

export async function reissueAccessToken() {
  // Access Token 재발급 (Refresh-Token 쿠키 사용)
  const res = await api.post('/auth/reissue');
  return res;
} 