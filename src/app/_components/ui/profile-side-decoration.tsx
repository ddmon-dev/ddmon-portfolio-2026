'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/shared/utils/classnames';

const CFG = {
  fallbackColor: '#f26619',
  dotGap: 16,
  dotRadius: 1.2,
  dotOpacity: 0.32,
  fadeWobble: 1.6,
  fadeWidth: 0.6,
  influence: 180,
  growScale: 2.2,
  opacityBoost: 0.2,
  follow: 0.12,
  scrollIdleMs: 60,
  idlePulseDelayMs: 1000,
  idlePulseIntervalMs: 1200,
  rippleSpeed: 9,
  rippleMaxRadius: 420,
  rippleIntensity: 2,
};

export function ProfileSideDecoration({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;
    const cfg = CFG;

    let cssW = 0;
    let cssH = 0;
    const focus = { y: 0, ty: 0, strength: 0, target: 0 };
    const ripple = { active: false, r: 0 };
    let raf = 0;
    let idleTimer = 0;
    let pulseTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle =
        getComputedStyle(canvas).getPropertyValue('--primary').trim() ||
        cfg.fallbackColor;
      const { y, strength } = focus;
      for (let yy = cfg.dotGap / 2; yy < cssH; yy += cfg.dotGap) {
        const noise =
          0.5 +
          0.5 *
            (Math.sin(yy * 0.021) * 0.5 +
              Math.sin(yy * 0.047 + 1.7) * 0.3 +
              Math.sin(yy * 0.083 + 4.2) * 0.2);
        const depth = 1 + cfg.fadeWobble * noise;
        for (let xx = cssW - cfg.dotRadius; xx > 0; xx -= cfg.dotGap) {
          const fade = Math.pow(
            Math.min(1, xx / (cssW * cfg.fadeWidth)),
            depth
          );
          const dist = Math.hypot(xx - cssW, yy - y);
          let radius = cfg.dotRadius;
          let alpha = cfg.dotOpacity * fade;
          if (strength > 0.001) {
            const near = Math.max(0, 1 - dist / cfg.influence);
            const t = near * near * strength;
            radius += cfg.dotRadius * (cfg.growScale - 1) * t;
            alpha = Math.min(1, alpha + cfg.opacityBoost * fade * t);
          }
          if (ripple.active) {
            const near = Math.max(0, 1 - dist / ripple.r);
            const fadeOut = 1 - ripple.r / cfg.rippleMaxRadius;
            const t = Math.min(1, near * near * fadeOut * cfg.rippleIntensity);
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
      if (ripple.active) {
        ripple.r += cfg.rippleSpeed;
        if (ripple.r > cfg.rippleMaxRadius) ripple.active = false;
      }
      draw();

      const settled =
        Math.abs(focus.target - focus.strength) < 0.003 &&
        Math.abs(focus.ty - focus.y) < 0.3;
      if (settled && focus.target === 0 && !ripple.active) {
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

    function stopIdlePulse() {
      window.clearTimeout(pulseTimer);
      pulseTimer = 0;
      ripple.active = false;
    }

    function pulse() {
      ripple.active = true;
      ripple.r = 0;
      wake();
      pulseTimer = window.setTimeout(pulse, cfg.idlePulseIntervalMs);
    }

    function onScroll() {
      const rect = canvas.getBoundingClientRect();
      focus.ty = window.innerHeight / 2 - rect.top;
      const within =
        focus.ty > -cfg.influence && focus.ty < cssH + cfg.influence;
      if (within && focus.strength < 0.01) {
        focus.y = focus.ty;
      }
      focus.target = within ? 1 : 0;
      wake();

      stopIdlePulse();
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        focus.target = 0;
        wake();
        if (within) {
          pulseTimer = window.setTimeout(pulse, cfg.idlePulseDelayMs);
        }
      }, cfg.scrollIdleMs);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      stopIdlePulse();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={cn('block size-full', className)} />
  );
}
