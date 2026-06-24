import { type Project } from './ui/project-gallery';

const placeholderImage = {
  src: '/projects/panoramafilm.png',
  alt: '',
  width: 1438,
  height: 809,
};

type ProjectData = Omit<Project, 'content'>;

export const majorProjects: ProjectData[] = [
  {
    slug: 'panorama-film',
    title: '솔라가드 파노라마 필름',
    category: '홈페이지 / 웹앱',
    image: { ...placeholderImage, alt: '파노라마 필름 프로젝트' },
    stacks: ['Next.js', 'React', 'Supabase', 'Tailwind', 'Zustand', 'Nginx'],
  },
  {
    slug: 'rgb-managers',
    title: 'RGB Managers',
    category: '사내 운영 시스템',
    image: { ...placeholderImage, alt: 'RGB Managers 프로젝트' },
    stacks: [
      'Next.js',
      'React',
      'MongoDB',
      'NextAuth',
      'Server Actions',
      'Tailwind',
      'shadcn/ui',
      'Puppeteer',
    ],
  },
  {
    slug: 'admin-template',
    title: 'Next.js 어드민 템플릿',
    category: '재사용 기반',
    image: { ...placeholderImage, alt: 'Next.js 어드민 제작 템플릿' },
    stacks: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'NextAuth',
      'Tailwind',
      'shadcn/ui',
      'React Hook Form',
      'zod',
    ],
  },
  {
    slug: 'sgc-bf',
    title: '솔라가드 건축필름 보증서',
    category: '품질보증서 시스템 / 웹앱',
    image: {
      ...placeholderImage,
      alt: '솔라가드 건축필름 보증서 시스템 프로젝트',
    },
    stacks: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'NextAuth',
      'Server Actions',
      'React PDF',
      'Tailwind',
    ],
  },
  {
    slug: 'lxa-work-manager',
    title: 'Work Manager',
    category: '업무 운영 시스템 / 본인 IP',
    image: { ...placeholderImage, alt: 'Work Manager 프로젝트' },
    stacks: [
      'React',
      'Vite',
      'TypeScript',
      'Hono',
      'Drizzle ORM',
      'PostgreSQL',
      'Better Auth',
      'TanStack Query',
      'Claude Code',
    ],
  },
];

export const otherProjects: ProjectData[] = [
  {
    slug: 'vaccine-portal',
    title: '백신정보포털',
    category: '데이터 포털 / CMS',
    image: { ...placeholderImage, alt: '백신정보포털 프로젝트' },
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Server Actions',
      'Tailwind',
      'Nginx',
    ],
  },
  {
    slug: 'angel-robotics',
    title: '엔젤로보틱스 홈페이지',
    category: '브랜드·제품 사이트 / CMS',
    image: { ...placeholderImage, alt: '엔젤로보틱스 홈페이지 프로젝트' },
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Server Actions',
      'Framer Motion',
      'Lenis',
      'NextAuth',
      'Tailwind',
    ],
  },
  {
    slug: 'mr',
    title: '(주)엠알 홈페이지',
    category: '다국어 기업·제품 사이트 / CMS',
    image: { ...placeholderImage, alt: '(주)엠알 홈페이지 프로젝트' },
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Server Actions',
      'NextAuth',
      'Framer Motion',
      'CKEditor',
      'Tailwind',
    ],
  },

  {
    slug: 'rgb-3d',
    title: 'KOREA3D',
    category: '브랜드 사이트 / 인터랙션',
    image: { ...placeholderImage, alt: 'KOREA3D 영상 브랜드 사이트 프로젝트' },
    stacks: [
      'Next.js',
      'React',
      'Framer Motion',
      'Zustand',
      'MongoDB',
      'Server Actions',
      'React Hook Form',
      'CSS Modules',
    ],
  },
];

export const systemsProjects: ProjectData[] = [
  {
    slug: 'react-ecatalog-template',
    title: 'React 전자카탈로그 템플릿',
    category: '제작 템플릿',
    image: { ...placeholderImage, alt: 'React 전자카탈로그 템플릿' },
    stacks: ['React', 'Framer Motion', 'Swiper'],
  },
  {
    slug: 'homepage-template',
    title: '홈페이지 제작 템플릿',
    category: '제작 체계',
    image: { ...placeholderImage, alt: '홈페이지 제작 템플릿' },
    stacks: ['PHP', 'GnuBoard5', 'jQuery'],
  },
];
