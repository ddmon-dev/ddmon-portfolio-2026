import type { ComponentType } from 'react';
import {
  ApacheOriginal,
  Css3Original,
  FramermotionOriginal,
  Html5Original,
  JavascriptOriginal,
  JqueryOriginal,
  MongodbOriginal,
  NextjsOriginal,
  NginxOriginal,
  PhpOriginal,
  PuppeteerOriginal,
  ReactOriginal,
  SupabaseOriginal,
  SwiperOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
} from 'devicons-react';
import type { TechId } from '@/data/tech-stack.data';
import { cn } from '@/shared/utils/classnames';

type DeviconProps = { size?: number | string };

type TechLogoEntry = {
  /** 표시 라벨 */
  label: string;
  /** devicons-react 컬러 아이콘 컴포넌트. 없으면 범용 폴백 아이콘을 쓴다. */
  Icon?: ComponentType<DeviconProps>;
};

/**
 * tech id → 로고 매핑 단일 레지스트리.
 * devicons-react에 존재하는 기술은 컬러 아이콘을, 없는 기술은 범용 폴백을 쓴다.
 */
export const TECH_LOGOS: Record<TechId, TechLogoEntry> = {
  html: { label: 'HTML', Icon: Html5Original },
  css: { label: 'CSS', Icon: Css3Original },
  javascript: { label: 'JavaScript', Icon: JavascriptOriginal },
  react: { label: 'React', Icon: ReactOriginal },
  nextjs: { label: 'Next.js', Icon: NextjsOriginal },
  typescript: { label: 'TypeScript', Icon: TypescriptOriginal },
  supabase: { label: 'Supabase', Icon: SupabaseOriginal },
  php: { label: 'PHP', Icon: PhpOriginal },
  // GnuBoard5는 devicon에 없어 범용 폴백 아이콘으로 표기한다.
  gnuboard5: { label: 'GnuBoard5' },
  mongodb: { label: 'MongoDB', Icon: MongodbOriginal },
  apache: { label: 'Apache', Icon: ApacheOriginal },
  nginx: { label: 'Nginx', Icon: NginxOriginal },
  tailwind: { label: 'Tailwind', Icon: TailwindcssOriginal },
  jquery: { label: 'jQuery', Icon: JqueryOriginal },
  puppeteer: { label: 'Puppeteer', Icon: PuppeteerOriginal },
  framermotion: { label: 'Framer Motion', Icon: FramermotionOriginal },
  swiper: { label: 'Swiper', Icon: SwiperOriginal },
};

/**
 * 자유 문자열 스킬명을 TechId로 해석한다. 소문자+영숫자만 남겨 정규화하면
 * 'Next.js' → 'nextjs', 'Framer Motion' → 'framermotion'처럼 TechId와 맞아떨어진다.
 * 매칭되는 로고가 없으면 null(범용 폴백 글리프로 표기) 을 돌려준다.
 */
export function resolveTechId(skill: string): TechId | null {
  const key = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
  return key in TECH_LOGOS ? (key as TechId) : null;
}

export function TechLogo({
  tech,
  size = 48,
  className,
}: {
  /** null이면(해석 실패) 범용 폴백 글리프를 그린다. */
  tech: TechId | null;
  size?: number;
  className?: string;
}) {
  const entry = tech ? TECH_LOGOS[tech] : undefined;

  if (entry?.Icon) {
    return (
      <span
        className={cn('inline-flex shrink-0', className)}
        style={{ width: size, height: size }}
      >
        <entry.Icon size={size} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        'bg-secondary-dark text-on-secondary',
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <CodeBracketIcon size={Math.round(size * 0.56)} />
    </span>
  );
}

/**
 * 공식 로고가 없는 기술을 위한 범용 폴백 글리프(code-bracket).
 * 외부 아이콘 의존 없이 인라인 SVG로 두어 서버 컴포넌트에서도 쓴다.
 */
function CodeBracketIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
      />
    </svg>
  );
}
