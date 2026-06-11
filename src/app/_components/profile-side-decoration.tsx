'use client';

import { useEffect, useRef } from 'react';

/**
 * 프로필 좌측 장식 — 초저대비 도트 텍스처. 좌측으로 갈수록 옅어진다.
 * 스크롤 중에는 화면 세로 중앙 높이의 캔버스 우측 변을 중심으로
 * 도트가 반원형으로 은은하게 커졌다가, 멈추면 서서히 가라앉는다.
 * 색은 --primary 토큰을 단일 출처로 사용하고, 우측 패딩으로 본문과 간격을 둔다.
 * 순수 장식이라 aria-hidden, prefers-reduced-motion이면 정적으로 유지.
 */
const CFG = {
  fallbackColor: '#f26619', // --primary 토큰을 못 읽을 때 폴백
  dotGap: 16, // px — 도트 간격
  dotRadius: 1.2, // px — 도트 반지름
  dotOpacity: 0.32, // 도트 기본 불투명도. 좌→우로 추가 페이드
  influence: 180, // px — 반원 효과 반경
  growScale: 2.2, // 중심에서 도트 반지름 최대 배율
  opacityBoost: 0.2, // 중심에서 더해지는 불투명도
  follow: 0.12, // 중심점/세기 보간 계수. 낮을수록 느리게 따라온다
  scrollIdleMs: 60, // ms — 이 시간 동안 스크롤이 없으면 효과를 거둔다
};

export function ProfileSideDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;
    const cfg = CFG;

    let cssW = 0;
    let cssH = 0;
    // 그려지는 중심 높이/세기(y, strength)가 목표값(ty, target)을 lerp로 쫓아간다
    const focus = { y: 0, ty: 0, strength: 0, target: 0 };
    let raf = 0;
    let idleTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle =
        getComputedStyle(canvas).getPropertyValue('--primary').trim() ||
        cfg.fallbackColor;
      const { y, strength } = focus;
      for (let yy = cfg.dotGap / 2; yy < cssH; yy += cfg.dotGap) {
        for (let xx = cfg.dotGap / 2; xx < cssW; xx += cfg.dotGap) {
          const fade = xx / cssW; // 좌측으로 갈수록 페이드
          let radius = cfg.dotRadius;
          let alpha = cfg.dotOpacity * fade;
          if (strength > 0.001) {
            const dist = Math.hypot(xx - cssW, yy - y); // 중심은 우측 변 위
            const near = Math.max(0, 1 - dist / cfg.influence);
            const t = near * near * strength; // 제곱 falloff로 중심만 또렷하게
            radius += cfg.dotRadius * (cfg.growScale - 1) * t;
            alpha = Math.min(1, alpha + cfg.opacityBoost * fade * t);
          }
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(xx, yy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function resize() {
      ({ width: cssW, height: cssH } = canvas.getBoundingClientRect());
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function tick() {
      focus.y += (focus.ty - focus.y) * cfg.follow;
      focus.strength += (focus.target - focus.strength) * cfg.follow;
      draw();

      const settled =
        Math.abs(focus.target - focus.strength) < 0.003 &&
        Math.abs(focus.ty - focus.y) < 0.3;
      if (settled && focus.target === 0) {
        focus.strength = 0;
        draw();
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function wake() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function onScroll() {
      // 화면 세로 중앙을 캔버스 좌표로 환산한 높이가 효과의 중심
      const rect = canvas.getBoundingClientRect();
      focus.ty = window.innerHeight / 2 - rect.top;
      const within =
        focus.ty > -cfg.influence && focus.ty < cssH + cfg.influence;
      if (within && focus.strength < 0.01) {
        // 진입 시 잔상 없이 현재 높이에서 시작
        focus.y = focus.ty;
      }
      focus.target = within ? 1 : 0;
      wake();

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        focus.target = 0;
        wake();
      }, cfg.scrollIdleMs);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      window.removeEventListener('scroll', onScroll);
    };
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
