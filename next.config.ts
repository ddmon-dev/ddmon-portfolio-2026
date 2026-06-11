import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // 배럴 import에서 사용하는 아이콘 모듈만 로드 (기본 최적화 목록에 없는 패키지)
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  // 모바일 실기기에서 LAN IP로 dev 서버 접속 시 cross-origin 차단 해제.
  // Next.js 16은 localhost 외 origin의 dev 리소스(HMR/청크) 요청을 기본 차단한다.
  allowedDevOrigins: ['172.30.1.*'],
};

export default nextConfig;
