'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessTokenWithRefreshToken, setAccessToken } from '@/lib/api';
import { setRefreshToken } from '@/lib/api/axios';
import { useUserStore } from '@/lib/store/user';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

  useEffect(() => {
    const authenticate = async () => {
      try {
        // 서버가 쿠키로 Refresh Token을 설정했으므로
        // 별도 파라미터 없이 Access Token 요청
        const response = await getAccessTokenWithRefreshToken();
        console.log('구글 로그인 response', response);

        // HTTP 상태 코드 200 확인
        if (response.status === 200) {
          const authHeader = response.headers['authorization'];
          const refreshToken = response.headers['refresh-token'];

          setUser({
            id: response.data.id,
            nickname: response.data.nickname,
            profileUrl: response.data.profileUrl,
          });

          if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            setAccessToken(token);
            setRefreshToken(refreshToken);

            router.replace('/mywork');
          } else {
            setError('Access Token 발급에 실패했습니다.');
          }
        } else {
          setError(`서버 응답 오류: ${response.status}`);
        }
      } catch (err) {
        console.error('Google login error:', err);

        // Axios 에러 타입 체크
        if (err && typeof err === 'object' && 'response' in err) {
          const axiosError = err as {
            response?: { status?: number; data?: { message?: string } };
          };
          if (axiosError.response?.status === 401) {
            setError(
              '로그인이 완료되지 않았습니다. 서버에서 Refresh Token을 설정하지 못했습니다.'
            );
          } else {
            setError(
              `로그인에 실패했습니다. ${axiosError.response?.data?.message ?? '알 수 없는 오류'}`
            );
          }
        } else {
          const errorMessage = err instanceof Error ? err.message : String(err);
          setError(`로그인에 실패했습니다. ${errorMessage}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [router, setUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">구글 로그인 처리 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">로그인 실패</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={() => router.replace('/login')}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
