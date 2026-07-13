import type { ComponentType } from 'react';
import ApacheOriginal from 'devicons-react/icons/ApacheOriginal';
import Css3Original from 'devicons-react/icons/Css3Original';
import FigmaOriginal from 'devicons-react/icons/FigmaOriginal';
import FramermotionOriginal from 'devicons-react/icons/FramermotionOriginal';
import GitOriginal from 'devicons-react/icons/GitOriginal';
import GithubOriginal from 'devicons-react/icons/GithubOriginal';
import Html5Original from 'devicons-react/icons/Html5Original';
import JavascriptOriginal from 'devicons-react/icons/JavascriptOriginal';
import MongodbOriginal from 'devicons-react/icons/MongodbOriginal';
import MysqlOriginal from 'devicons-react/icons/MysqlOriginal';
import NextjsOriginal from 'devicons-react/icons/NextjsOriginal';
import NginxOriginal from 'devicons-react/icons/NginxOriginal';
import PhpOriginal from 'devicons-react/icons/PhpOriginal';
import PostcssOriginal from 'devicons-react/icons/PostcssOriginal';
import PostgresqlOriginal from 'devicons-react/icons/PostgresqlOriginal';
import PrismaOriginal from 'devicons-react/icons/PrismaOriginal';
import PuppeteerOriginal from 'devicons-react/icons/PuppeteerOriginal';
import ReactOriginal from 'devicons-react/icons/ReactOriginal';
import SupabaseOriginal from 'devicons-react/icons/SupabaseOriginal';
import TailwindcssOriginal from 'devicons-react/icons/TailwindcssOriginal';
import TypescriptOriginal from 'devicons-react/icons/TypescriptOriginal';
import UbuntuOriginal from 'devicons-react/icons/UbuntuOriginal';
import XdOriginal from 'devicons-react/icons/XdOriginal';
import ZustandOriginal from 'devicons-react/icons/ZustandOriginal';
import {
  AuthjsIcon,
  AwsIcon,
  BetterAuthIcon,
  ClaudeIcon,
  DrizzleIcon,
  HonoIcon,
  KakaoIcon,
  ReactHookFormIcon,
  ShadcnIcon,
  TanstackQueryIcon,
} from '@/shared/ui/brand-icons';
import { cn } from '@/shared/utils/classnames';

type DeviconProps = { size?: number | string; className?: string };

type StackLogoEntry = {
  label: string;
  Icon?: ComponentType<DeviconProps>;
};

export const STACK_LOGOS = {
  html: { label: 'HTML5', Icon: Html5Original },
  css: { label: 'CSS3', Icon: Css3Original },
  js: { label: 'JavaScript', Icon: JavascriptOriginal },
  react: { label: 'React', Icon: ReactOriginal },
  nextjs: { label: 'Next.js', Icon: NextjsOriginal },
  ts: { label: 'TypeScript', Icon: TypescriptOriginal },
  supabase: { label: 'Supabase', Icon: SupabaseOriginal },
  authjs: { label: 'Auth.js', Icon: AuthjsIcon },
  betterauth: { label: 'Better Auth', Icon: BetterAuthIcon },
  php: { label: 'PHP', Icon: PhpOriginal },
  g5: { label: '그누보드5' },
  mongodb: { label: 'MongoDB', Icon: MongodbOriginal },
  mysql: { label: 'MySQL', Icon: MysqlOriginal },
  ubuntu: { label: 'Ubuntu', Icon: UbuntuOriginal },
  apache: { label: 'Apache', Icon: ApacheOriginal },
  nginx: { label: 'Nginx', Icon: NginxOriginal },
  tailwind: { label: 'Tailwind CSS', Icon: TailwindcssOriginal },
  puppeteer: { label: 'Puppeteer', Icon: PuppeteerOriginal },
  framermotion: { label: 'Framer Motion', Icon: FramermotionOriginal },
  git: { label: 'Git', Icon: GitOriginal },
  github: { label: 'GitHub', Icon: GithubOriginal },
  zustand: { label: 'Zustand', Icon: ZustandOriginal },
  rhf: { label: 'React Hook Form', Icon: ReactHookFormIcon },
  tanstackquery: { label: 'TanStack Query', Icon: TanstackQueryIcon },
  postcss: { label: 'PostCSS', Icon: PostcssOriginal },
  postgresql: { label: 'PostgreSQL', Icon: PostgresqlOriginal },
  hono: { label: 'Hono', Icon: HonoIcon },
  claudecode: { label: 'Claude Code', Icon: ClaudeIcon },
  kakaomap: { label: 'Kakao Map API', Icon: KakaoIcon },
  shadcn: { label: 'shadcn/ui', Icon: ShadcnIcon },
  figma: { label: 'Figma', Icon: FigmaOriginal },
  xd: { label: 'Adobe XD', Icon: XdOriginal },
  prisma: { label: 'Prisma', Icon: PrismaOriginal },
  drizzle: { label: 'Drizzle', Icon: DrizzleIcon },
  aws: { label: 'AWS', Icon: AwsIcon },
} satisfies Record<string, StackLogoEntry>;

export type StackId = keyof typeof STACK_LOGOS;

const STACK_ALIASES: Record<string, StackId> = {
  javascript: 'js',
  typescript: 'ts',
  gnuboard5: 'g5',
  tailwindcss: 'tailwind',
  reactquery: 'tanstackquery',
  reacthookform: 'rhf',
  nextauth: 'authjs',
  shadcnui: 'shadcn',
  kakaomapapi: 'kakaomap',
  adobexd: 'xd',
  drizzleorm: 'drizzle',
};

export function resolveStackId(skill: string): StackId | null {
  const key = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (key in STACK_LOGOS) return key as StackId;
  return STACK_ALIASES[key] ?? null;
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

  return <FallbackStackLogo className={className} />;
}

function FallbackStackLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      width="1em"
      height="1em"
      className={cn('shrink-0', className)}
    >
      <circle cx="10" cy="10" r="10" className="fill-secondary-dark" />
      <path
        className="fill-secondary-foreground"
        transform="translate(4.4 4.4) scale(0.56)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
      />
    </svg>
  );
}
