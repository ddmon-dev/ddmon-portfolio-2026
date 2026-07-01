import type { ComponentType } from 'react';
import {
  ApacheOriginal,
  Css3Original,
  FigmaOriginal,
  FramermotionOriginal,
  GitOriginal,
  GithubOriginal,
  Html5Original,
  JavascriptOriginal,
  MongodbOriginal,
  NextjsOriginal,
  NginxOriginal,
  PhpOriginal,
  PostcssOriginal,
  PostgresqlOriginal,
  PrismaOriginal,
  PuppeteerOriginal,
  ReactOriginal,
  SupabaseOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
  XdOriginal,
  ZustandOriginal,
} from 'devicons-react';
import {
  AwsIcon,
  ClaudeIcon,
  DrizzleIcon,
  HonoIcon,
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
  php: { label: 'PHP', Icon: PhpOriginal },
  g5: { label: '그누보드5' },
  mongodb: { label: 'MongoDB', Icon: MongodbOriginal },
  apache: { label: 'Apache', Icon: ApacheOriginal },
  nginx: { label: 'Nginx', Icon: NginxOriginal },
  tailwind: { label: 'Tailwind CSS', Icon: TailwindcssOriginal },
  puppeteer: { label: 'Puppeteer', Icon: PuppeteerOriginal },
  framermotion: { label: 'Framer Motion', Icon: FramermotionOriginal },
  git: { label: 'Git', Icon: GitOriginal },
  github: { label: 'GitHub', Icon: GithubOriginal },
  zustand: { label: 'Zustand', Icon: ZustandOriginal },
  tanstackquery: { label: 'TanStack Query', Icon: TanstackQueryIcon },
  postcss: { label: 'PostCSS', Icon: PostcssOriginal },
  postgresql: { label: 'PostgreSQL', Icon: PostgresqlOriginal },
  hono: { label: 'Hono', Icon: HonoIcon },
  claudecode: { label: 'Claude Code', Icon: ClaudeIcon },
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
  shadcnui: 'shadcn',
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

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full size-[1em]',
        'bg-secondary-dark text-secondary-foreground',
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
