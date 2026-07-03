import { type Project } from './ui/project-gallery';

const placeholderImage = {
  src: '/projects/panoramafilm.jpg',
  alt: '',
  width: 1438,
  height: 809,
};

type ProjectData = Omit<Project, 'content'>;

export const majorProjectSlugs: string[] = [
  'panorama-film',
  'rgb-managers',
  'admin-framework',
  'sgc-bf',
  'lxa-work-manager',
];

export type OtherProject = {
  slug: string;
  title: string;
  category: string;
  description: string;
  stacks: string[];
  href?: string;
};

export const otherProjects: OtherProject[] = [
  {
    slug: 'golfzon-smartcaddie',
    title: '골프존 스마트캐디',
    category: '다국어 제품 소개 사이트 / 어드민',
    description:
      'GPS 기반 스마트워치 골프 어시스턴트 앱 스마트캐디의 다국어 소개 사이트와 어드민',
    stacks: ['Next.js', 'React', 'TypeScript', 'Supabase', 'GSAP', 'Tailwind'],
    href: 'https://smartcaddie.io',
  },
  {
    slug: 'golfzon-cloud',
    title: '골프존클라우드',
    category: 'B2B SaaS 소개 사이트 / 어드민',
    description:
      '골프장 운영을 위한 예약·정산·경기관제 등 클라우드 SaaS 플랫폼 소개 사이트와 어드민',
    stacks: ['Next.js', 'React', 'Supabase', 'NextAuth', 'GSAP', 'Tailwind'],
  },
  {
    slug: 'mr',
    title: '(주)엠알 홈페이지',
    category: '다국어 기업·제품 사이트 / CMS',
    description:
      '의료기기 기업의 다국어 사이트와 구매 의료진 전용 교육 콘텐츠 게이트를 PM 겸 단독 개발',
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
    href: 'https://mrev.co.kr',
  },
  {
    slug: 'angel-robotics',
    title: '엔젤로보틱스 홈페이지',
    category: '브랜드·제품 사이트 / CMS',
    description:
      '웨어러블 로봇 기업의 다국어 브랜드 사이트를 스크롤 인터랙션과 운영자 CMS로 리뉴얼',
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
    href: 'https://angel-robotics.com',
  },
  {
    slug: 'vaccine-portal',
    title: '백신정보포털',
    category: '데이터 포털 / CMS',
    description:
      '한글 문서로 흩어진 백신 R&D 지원시설 정보를 조건별 검색 포털과 운영자 CMS로 재구성',
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Server Actions',
      'Tailwind',
      'Nginx',
    ],
    href: 'https://vitalkorea-vip.kr',
  },
  {
    slug: 'rgb-3d',
    title: 'KOREA3D',
    category: '브랜드 사이트 / 인터랙션',
    description: '영상 사업 브랜드 사이트를 기획부터 인터랙션, 운영까지 단독으로 구축',
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
    href: 'https://korea3d.co.kr',
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
