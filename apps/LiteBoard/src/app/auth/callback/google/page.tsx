"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code) {
      // 실제 서비스에서는 try-catch, 로딩/에러 처리 등 추가 필요
      fetch("/api/auth/google/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, state }),
      })
        .then(async (res) => {
          if (res.ok) {
            // 로그인 성공 시 메인 페이지 등으로 이동
            router.replace("/");
          } else {
            // 에러 처리
            alert("로그인에 실패했습니다.");
            router.replace("/login");
          }
        })
        .catch(() => {
          alert("로그인 중 오류가 발생했습니다.");
          router.replace("/login");
        });
    } else {
      // code가 없으면 에러 처리
      alert("구글 인증 코드가 없습니다.");
      router.replace("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">구글 로그인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
} 