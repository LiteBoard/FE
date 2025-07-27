import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("accessToken", token);
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
};

export const getAccessToken = () => accessToken;

// 초기화 시 로컬스토리지에서 복원
if (typeof window !== "undefined") {
  const token = localStorage.getItem("accessToken");
  if (token) accessToken = token;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Refresh Token이 쿠키로 자동 포함되도록 설정
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
    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
      const token = newAccessToken.replace("Bearer ", "");
      setAccessToken(token);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // AccessToken 재발급
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/reissue`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.headers["authorization"];
        if (newAccessToken) {
          const token = newAccessToken.replace("Bearer ", "");
          setAccessToken(token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (e) {
        clearAccessToken();
        // window.location.href = "/login"; // 자동 리다이렉트 제거
        // 에러를 그대로 전달하여 컴포넌트에서 처리하도록 함
      }
    }

    return Promise.reject(error);
  }
);

export default api;