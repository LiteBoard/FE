'use client';

import { Button, GoogleIcon } from '@LiteBoard/ui';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // TODO: Google 로그인 로직 구현
    console.log('Google 로그인 시도');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-white">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(177, 248, 250, 0.5) 0%, rgba(49, 130, 246, 0.03) 70%, rgba(255,255,255,0) 100%)',
          opacity: 0.4,
        }}
      />
      {/*상단 텍스트 프레임*/}
      <div className="flex flex-col gap-[44px] absolute top-[180px]">
        <div className="flex flex-col items-center gap-[16px]">
          <span className="text-text-H2 text-neutral-900">
            LiteBaord에 오신 것을 환영합니다!
          </span>
          <p className="text-neutral-500 text-text-B1M">
            시작하려면 로그인 하세요
          </p>
        </div>
        <Button 
          onClick={handleGoogleLogin}
          variant="outline"
          className="flex flex-row gap-[8px] z-50 !bg-neutral-white border border-neutral-200 hover:border-neutral-300 hover:!bg-neutral-50 transition-colors duration-200"
        >
          <GoogleIcon size={24}/>
          <p className="text-neutral-700 text-text-T1">Google로 계속</p>
        </Button>
      </div>
    </div>
  );
}
