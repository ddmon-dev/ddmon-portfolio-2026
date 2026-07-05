'use client';

import { useEffect, useRef } from 'react';

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

export function ProfileSideDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

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
        CFG.fallbackColor;
      const { y, strength } = focus;
      for (let yy = CFG.dotGap / 2; yy < cssH; yy += CFG.dotGap) {
        const noise =
          0.5 +
          0.5 *
            (Math.sin(yy * 0.021) * 0.5 +
              Math.sin(yy * 0.047 + 1.7) * 0.3 +
              Math.sin(yy * 0.083 + 4.2) * 0.2);
        const depth = 1 + CFG.fadeWobble * noise;
        for (let xx = cssW - CFG.dotRadius; xx > 0; xx -= CFG.dotGap) {
          const fade = Math.pow(
            Math.min(1, xx / (cssW * CFG.fadeWidth)),
            depth
          );
          const dist = Math.hypot(xx - cssW, yy - y);
          let radius = CFG.dotRadius;
          let alpha = CFG.dotOpacity * fade;
          if (strength > 0.001) {
            const near = Math.max(0, 1 - dist / CFG.influence);
            const t = near * near * strength;
            radius += CFG.dotRadius * (CFG.growScale - 1) * t;
            alpha = Math.min(1, alpha + CFG.opacityBoost * fade * t);
          }
          if (ripple.active) {
            const near = Math.max(0, 1 - dist / ripple.r);
            const fadeOut = 1 - ripple.r / CFG.rippleMaxRadius;
            const t = Math.min(1, near * near * fadeOut * CFG.rippleIntensity);
            radius += CFG.dotRadius * (CFG.growScale - 1) * t;
            alpha = Math.min(1, alpha + CFG.opacityBoost * fade * t);
          }
          if (alpha < 0.01) continue;
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
      focus.y += (focus.ty - focus.y) * CFG.follow;
      focus.strength += (focus.target - focus.strength) * CFG.follow;
      if (ripple.active) {
        ripple.r += CFG.rippleSpeed;
        if (ripple.r > CFG.rippleMaxRadius) ripple.active = false;
      }
      draw();

      const settled =
        Math.abs(focus.target - focus.strength) < 0.003 &&
        Math.abs(focus.ty - focus.y) < 0.3;
      if (settled && !ripple.active) {
        focus.strength = focus.target;
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

    function stopIdlePulse() {
      window.clearTimeout(pulseTimer);
      pulseTimer = 0;
      ripple.active = false;
    }

    function pulse() {
      ripple.active = true;
      ripple.r = 0;
      wake();
      pulseTimer = window.setTimeout(pulse, CFG.idlePulseIntervalMs);
    }

    function onScroll() {
      const rect = canvas.getBoundingClientRect();
      focus.ty = window.innerHeight / 2 - rect.top;
      const within =
        focus.ty > -CFG.influence && focus.ty < cssH + CFG.influence;
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
          pulseTimer = window.setTimeout(pulse, CFG.idlePulseDelayMs);
        }
      }, CFG.scrollIdleMs);
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

  return <canvas ref={canvasRef} className="block size-full" />;
}
