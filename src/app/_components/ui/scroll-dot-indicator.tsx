'use client';

import { useEffect, useRef } from 'react';

const CFG = {
  fallbackColor: '#f26619',
  dotGap: 8,
  dotRadius: 0.8,
  fadeWobble: 1.6,
  fadeWidth: 0.6,
  influence: 80,
  growScale: 3,
  opacityBoost: 0.5,
  follow: 0.12,
};

export function ScrollDotIndicator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    let cssW = 0;
    let cssH = 0;
    const focus = { y: 0, ty: 0 };
    let raf = 0;

    function draw() {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle =
        getComputedStyle(canvas).getPropertyValue('--primary').trim() ||
        CFG.fallbackColor;
      const spread = CFG.influence / 2;
      for (let yy = CFG.dotGap / 2; yy < cssH; yy += CFG.dotGap) {
        const noise =
          0.5 +
          0.5 *
            (Math.sin(yy * 0.021) * 0.5 +
              Math.sin(yy * 0.047 + 1.7) * 0.3 +
              Math.sin(yy * 0.083 + 4.2) * 0.2);
        const depth = 1 + CFG.fadeWobble * noise;
        const dy = yy - focus.y;
        const bellExtent =
          cssW * 0.5 * Math.exp(-(dy * dy) / (2 * spread * spread));
        for (let xx = cssW - CFG.dotRadius; xx > 0; xx -= CFG.dotGap) {
          const near = Math.max(0, 1 - (cssW - xx) / bellExtent);
          if (near <= 0) continue;
          const fade = Math.pow(
            Math.min(1, xx / (cssW * CFG.fadeWidth)),
            depth
          );
          const alpha = Math.min(1, CFG.opacityBoost * fade * near);
          if (alpha < 0.01) continue;
          const radius = CFG.dotRadius * (1 + (CFG.growScale - 1) * near);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(xx, yy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function scrollbarY() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? (window.scrollY / max) * cssH : 0;
    }

    function resize() {
      ({ width: cssW, height: cssH } = canvas.getBoundingClientRect());
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      focus.ty = scrollbarY();
      focus.y = focus.ty;
      draw();
    }

    function tick() {
      focus.y += (focus.ty - focus.y) * CFG.follow;
      draw();
      if (Math.abs(focus.ty - focus.y) < 0.3) {
        focus.y = focus.ty;
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
      focus.ty = scrollbarY();
      wake();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 z-40 h-dvh w-24 sm:hidden"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
