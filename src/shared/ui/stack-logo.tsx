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
import { cn } from '@/shared/utils/classnames';

type DeviconProps = { size?: number | string; className?: string };

type StackLogoEntry = {
  label: string;
  Icon?: ComponentType<DeviconProps>;
};

/**
 * 기술 스택 → 로고/라벨 매핑 단일 레지스트리.
 * devicons-react에 있는 스택은 컬러 아이콘을, 없는 스택은 범용 폴백을 쓴다.
 * StackId는 이 레지스트리의 키에서 파생되므로 여기가 스택의 단일 소스다.
 */
export const STACK_LOGOS = {
  html: { label: 'HTML', Icon: Html5Original },
  css: { label: 'CSS', Icon: Css3Original },
  javascript: { label: 'JavaScript', Icon: JavascriptOriginal },
  react: { label: 'React', Icon: ReactOriginal },
  nextjs: { label: 'Next.js', Icon: NextjsOriginal },
  typescript: { label: 'TypeScript', Icon: TypescriptOriginal },
  supabase: { label: 'Supabase', Icon: SupabaseOriginal },
  php: { label: 'PHP', Icon: PhpOriginal },
  gnuboard5: { label: 'GnuBoard5' },
  mongodb: { label: 'MongoDB', Icon: MongodbOriginal },
  apache: { label: 'Apache', Icon: ApacheOriginal },
  nginx: { label: 'Nginx', Icon: NginxOriginal },
  tailwind: { label: 'Tailwind', Icon: TailwindcssOriginal },
  jquery: { label: 'jQuery', Icon: JqueryOriginal },
  puppeteer: { label: 'Puppeteer', Icon: PuppeteerOriginal },
  framermotion: { label: 'Framer Motion', Icon: FramermotionOriginal },
  swiper: { label: 'Swiper', Icon: SwiperOriginal },
} satisfies Record<string, StackLogoEntry>;

export type StackId = keyof typeof STACK_LOGOS;

/**
 * 자유 문자열 스킬명을 StackId로 해석한다. 소문자+영숫자만 남겨 정규화하면
 * 'Next.js' → 'nextjs', 'Framer Motion' → 'framermotion'처럼 StackId와 맞아떨어진다.
 * 매칭되는 로고가 없으면 null(범용 폴백 글리프로 표기) 을 돌려준다.
 *
 * 전제: StackId는 이 정규화 키와 1:1이어야 한다(구분 문자를 모두 지우므로, 새 스택 추가 시
 * 다른 스택과 정규화 결과가 겹치지 않는지 확인할 것).
 */
export function resolveStackId(skill: string): StackId | null {
  const key = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
  return key in STACK_LOGOS ? (key as StackId) : null;
}

export function StackLogo({
  stack,
  className,
}: {
  stack: StackId | null;
  className?: string;
}) {
  const entry: StackLogoEntry | undefined = stack
    ? STACK_LOGOS[stack]
    : undefined;

  if (entry?.Icon) {
    return <entry.Icon className={cn(className)} size="1em" />;
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full size-[1em]',
        'bg-secondary-dark text-on-secondary',
        className
      )}
      aria-hidden
    >
      <CodeBracketIcon size="0.56em" />
    </span>
  );
}

function CodeBracketIcon({
  size,
  className,
}: {
  size?: string | number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      width={size}
      height={size}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
      />
    </svg>
  );
}
