'use client';

import { useEffect, useRef } from 'react';

/**
 * 프로필 좌측 장식 — 정적 초저대비 도트 텍스처. 좌측으로 갈수록 옅어진다.
 * 색은 --primary 토큰을 단일 출처로 사용하고, 우측 패딩으로 본문과 간격을 둔다.
 * 순수 장식이라 aria-hidden.
 */
const CFG = {
  fallbackColor: '#f26619', // --primary 토큰을 못 읽을 때 폴백
  dotGap: 16, // px — 도트 간격
  dotRadius: 1.2, // px — 도트 반지름
  dotOpacity: 0.32, // 도트 기본 불투명도. 좌→우로 추가 페이드
};

export function ProfileSideDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;
    const { fallbackColor, dotGap, dotRadius, dotOpacity } = CFG;

    function draw() {
      const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle =
        getComputedStyle(canvas).getPropertyValue('--primary').trim() ||
        fallbackColor;
      for (let yy = dotGap / 2; yy < cssH; yy += dotGap) {
        for (let xx = dotGap / 2; xx < cssW; xx += dotGap) {
          ctx.globalAlpha = dotOpacity * (xx / cssW); // 좌측으로 갈수록 페이드
          ctx.beginPath();
          ctx.arc(xx, yy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <div aria-hidden className="relative w-full">
      {/* 우측 패딩으로 본문과 간격 확보. 캔버스는 콘텐츠 박스를 채운다. */}
      <div className="absolute inset-0 pr-5">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  );
}
