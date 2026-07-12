import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/classnames';

const FILTER_ID = 'liquid-glass';

const displacementMap = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="x" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgb(128,0,0)"/>
        <stop offset="0.08" stop-color="rgb(255,0,0)"/>
        <stop offset="0.4" stop-color="rgb(128,0,0)"/>
        <stop offset="0.6" stop-color="rgb(128,0,0)"/>
        <stop offset="0.92" stop-color="rgb(0,0,0)"/>
        <stop offset="1" stop-color="rgb(128,0,0)"/>
      </linearGradient>
      <linearGradient id="y" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="rgb(0,128,0)"/>
        <stop offset="0.25" stop-color="rgb(0,255,0)"/>
        <stop offset="0.4" stop-color="rgb(0,128,0)"/>
        <stop offset="0.6" stop-color="rgb(0,128,0)"/>
        <stop offset="0.75" stop-color="rgb(0,0,0)"/>
        <stop offset="1" stop-color="rgb(0,128,0)"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#x)"/>
    <rect width="100" height="100" fill="url(#y)" style="mix-blend-mode:screen"/>
  </svg>`
)}`;

export function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute size-0">
      <filter
        id={FILTER_ID}
        x="0"
        y="0"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={displacementMap}
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          result="mapRaw"
        />
        <feGaussianBlur in="mapRaw" stdDeviation="6" result="map" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="22"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dR"
        />
        <feColorMatrix
          in="dR"
          type="matrix"
          values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="cR"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="18"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dG"
        />
        <feColorMatrix
          in="dG"
          type="matrix"
          values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="cG"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="14"
          xChannelSelector="R"
          yChannelSelector="G"
          result="dB"
        />
        <feColorMatrix
          in="dB"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
          result="cB"
        />
        <feBlend in="cR" in2="cG" mode="screen" result="cRG" />
        <feBlend in="cRG" in2="cB" mode="screen" />
      </filter>
    </svg>
  );
}

export function LiquidGlass({
  className,
  children,
  ...rest
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative z-0 shadow-[0_0_7px_0_rgba(0,0,0,0.08)]',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-background/35"
        style={{ backdropFilter: `url(#${FILTER_ID})` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        style={{
          backdropFilter: 'blur(1px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(3px) saturate(1.6)',
        }}
      />
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/50"
      />
    </div>
  );
}
