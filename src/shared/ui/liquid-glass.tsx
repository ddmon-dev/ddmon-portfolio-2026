import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/classnames';

/**
 * 리퀴드 글래스 — Chromium의 `backdrop-filter: url()`로 배경을 굴절시키는 SVG 필터.
 *
 * frost(blur)와 굴절(url)을 같은 backdrop-filter 속성에 넣으면 Safari가 url() 때문에 선언 전체를
 * 버려 blur까지 사라진다. 그래서 둘을 분리한다 — 단, 굴절 레이어를 frost div "안"에 중첩하면
 * 부모 backdrop-filter가 자식의 페이지 샘플링을 끊으므로(Chromium에서 굴절 깨짐), frost와 굴절을
 * backdrop-filter 없는 표면의 **형제 오버레이**로 둔다.
 *
 * 사용법:
 *   1) 문서에 `<LiquidGlassFilter />`를 한 번만 렌더(루트 레이아웃).
 *   2) `<LiquidGlass className={...layout}>...children</LiquidGlass>`.
 */

const FILTER_ID = 'liquid-glass';

/**
 * 굴절용 변위 맵(displacement map) — 2D 베벨 + 중립 테두리 프레임.
 * R=가로/G=세로 변위, 128(0.5)이 중립(변위 없음). 두 축을 mix-blend-mode:screen으로 합친다.
 *
 * 맨 가장자리(offset 0·1)는 128(중립)로 두고, 변위 피크를 안쪽으로 inset한다.
 * 베벨 부호는 가장자리에서 **안쪽** 배경을 끌어오는 방향(좌 +x·우 -x, 상 +y·하 -y) — 렌즈가 안으로 수축.
 * → 렌즈가 요소 밖 배경을 끌어오지 않아 가장자리 접힘(다이아몬드 아티팩트)이 사라진다.
 * 세로는 요소가 짧아(높이) 변위(최대 ~12px)보다 큰 inset이 필요하므로 0.25/0.75로 더 깊게 잡는다.
 * 중앙 0.4~0.6은 128로 평평 → 안쪽 띠에서만 굴절.
 */
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

/** 굴절 SVG 필터 정의. 문서에 한 번만 렌더한다(레이아웃에 영향 없는 0-size SVG). */
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
        {/* 맵을 흐려 그라디언트 stop의 기울기 불연속(주름)을 제거. */}
        <feGaussianBlur in="mapRaw" stdDeviation="6" result="map" />
        {/* 색수차: R/G/B를 서로 다른 굴절 강도로 변위시킨 뒤 채널만 추출해 screen으로 재합성. */}
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

/**
 * 글래스 표면. 자체 backdrop-filter는 두지 않고(자식 굴절 샘플링을 끊지 않도록) 틴트만 가진다.
 * frost/굴절은 형제 오버레이로 깔고, children은 그 위에 올린다.
 *
 * 테두리는 `border`로 두지 않는다 — border가 있으면 absolute 기준 박스(padding box)가 안쪽으로
 * 밀려 backdrop 오버레이가 박스를 다 못 덮고, 둥근 캡에서 blur 안 닿는 빈틈이 생긴다.
 * 대신 레이아웃에 영향 없는 상단 링 오버레이로 테두리를 그린다.
 * `className`으로 둥글기·여백·flex 레이아웃을 주입한다(둥글기는 오버레이가 rounded-[inherit]로 상속).
 */
export function LiquidGlass({
  className,
  children,
  ...rest
}: ComponentProps<'div'>) {
  return (
    <div
      // relative z-0: 음수 z 오버레이를 담을 stacking context는 만들되, backdrop root는 만들지 않는다
      // (isolate/filter/opacity 등은 backdrop root가 되어 오버레이가 페이지 대신 표면 내부만 샘플링하게 됨).
      className={cn(
        'relative z-0 shadow-[0_2px_6px_-1px_rgba(0,0,0,0.08)]',
        className
      )}
      {...rest}
    >
      {/* 굴절(아래): url()만 → Chromium 전용. Safari/FF는 무시. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-background/35"
        style={{ backdropFilter: `url(#${FILTER_ID})` }}
      />
      {/* frost(위): blur+saturate. 굴절 위에 얹어 알약 전체를 균일하게 흐린다 —
          캡에서 굴절이 알약 밖 안 흐린 배경을 끌어와 생기던 "투명한 굴절"을 덮는다.
          url 없음 → Safari/FF 포함 모든 브라우저 동작. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        style={{
          backdropFilter: 'blur(1px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(3px) saturate(1.6)',
        }}
      />
      {children}
      {/* 테두리 링: 레이아웃/기준 박스에 영향 없도록 콘텐츠 위 오버레이로 그린다. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/50"
      />
    </div>
  );
}
