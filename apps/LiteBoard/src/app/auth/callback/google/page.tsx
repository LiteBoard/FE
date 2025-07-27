"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithGoogle, getAccessTokenWithRefreshToken } from "@LiteBoard/api/auth";
import { setAccessToken } from "@LiteBoard/api";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    const authenticate = async () => {
      try {
        if (!code) {
          setError("구글 인증 코드가 없습니다.");
          setIsLoading(false);
          return;
        }

        // 1. 로그인 및 Refresh-Token 쿠키 저장
        await loginWithGoogle(code, state ?? undefined);

        // 2. Refresh-Token 쿠키로 Access Token 발급 요청
        const response = await getAccessTokenWithRefreshToken();
        const authHeader = response.headers["authorization"];

        if (authHeader?.startsWith("Bearer ")) {
          const token = authHeader.replace("Bearer ", "");
          setAccessToken(token);
          router.replace("/");
        } else {
          setError("Access Token 발급에 실패했습니다.");
        }
      } catch (err: any) {
        console.error("Google login error:", err);
        setError(
          `로그인에 실패했습니다. ${err.response?.data?.message || err.message || err}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, [code, state, router]);

  // 로딩 UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">구글 로그인 처리 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  // 에러 UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">로그인 실패</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.replace("/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}
