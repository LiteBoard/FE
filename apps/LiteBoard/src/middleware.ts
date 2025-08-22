import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isFileRequest = pathname.match(/\.\w+$/);
  const cookieStore = await cookies();

  // 정적 파일 요청 제외
  if (isFileRequest) {
    return NextResponse.next();
  }

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const token = accessToken?.value || refreshToken?.value;

  // 루트 경로 접근 시 토큰이 있으면 메인 페이지로 리다이렉트
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(token ? '/mywork' : '/login', request.url)
    );
  }

  // 로그인 페이지 접근 시 토큰이 있으면 메인 페이지로 리다이렉트
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/mywork', request.url));
  }

  // 팀 페이지와 내 업무 페이지 접근 시 토큰이 없으면 로그인 페이지로 리다이렉트
  const protectedPaths = ['/team', '/mywork'];
  if (protectedPaths.some((p) => pathname.startsWith(p)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/team', '/mywork'],
};
