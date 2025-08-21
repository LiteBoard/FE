import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
  setCookie('accessToken', token);
};

export const setRefreshToken = (token: string) => {
  refreshToken = token;
  setCookie('refreshToken', token);
};

export const clearAccessToken = () => {
  accessToken = null;
  refreshToken = null;
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
};

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => {
  // 메모리에 없으면 쿠키에서 다시 확인
  if (!refreshToken && typeof window !== 'undefined') {
    const tokenFromCookie = getCookie('refreshToken') as string | null;
    if (tokenFromCookie) {
      refreshToken = tokenFromCookie;
    }
  }
  return refreshToken;
};

// 초기화 시 쿠키에서 복원
if (typeof window !== 'undefined') {
  const accessTokenFromCookie = getCookie('accessToken') as string | null;
  const refreshTokenFromCookie = getCookie('refreshToken') as string | null;

  if (accessTokenFromCookie) accessToken = accessTokenFromCookie;
  if (refreshTokenFromCookie) refreshToken = refreshTokenFromCookie;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// 요청 인터셉터: AccessToken 붙이기
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 토큰 재발급 처리
api.interceptors.response.use(
  (response) => {
    // 응답 헤더에 새 토큰이 있을 경우 갱신
    const newAccessToken = response.headers['authorization'];
    if (newAccessToken) {
      const token = newAccessToken.replace('Bearer ', '');
      setAccessToken(token);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 에러 코드 발생 시 리프래시 갱신 로직 수행
    if (error.response?.data.code === 'TOKEN401' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // AccessToken 재발급
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
          {},
          {
            headers: {
              'Refresh-Token': getRefreshToken() || '',
            },
            withCredentials: true,
          }
        );

        const newAccessToken = res.headers['authorization'];
        if (newAccessToken) {
          const token = newAccessToken.replace('Bearer ', '');
          setAccessToken(token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (e) {
        console.error(e);
        clearAccessToken();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
