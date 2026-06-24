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
    facts: {
      period: '2024.06 – 2024.09 · 이후 유지보수',
      product: 'Brand Site · OMS · Admin',
      contribution: 'PM 보조 · FE 단독 구현 · DB/배포/운영 대응',
      team: '디자이너 1명 협업(브랜드 시안) · 개발 단독',
      scope:
        'FE · OMS/어드민 요구사항 정의·화면 설계 · DB 설계 · 배포 · 고객사 커뮤니케이션',
      url: 'https://panoramafilm.co.kr',
      status: '운영 중 · 유지보수 지속',
      operation: '2년 운영 · 72개 시공점 사용',
    },
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
    facts: {
      period: '2023.07 ~ 현재 (V1 Next.js 13 → V2 Next.js 15·shadcn)',
      team: '개발 단독 · UI/디자인 직접',
      scope:
        '기획 · UI/디자인 · FE · DB 설계 · MySQL→MongoDB 마이그레이션 · 배포 · 운영',
      status: '운영 중 · 퇴사 후에도 유지보수 지속',
    },
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
    facts: {
      period: '2025.11 ~ 현재 (지속 유지·발전)',
      team: '개발 단독 · 본인 IP',
      scope:
        'FE 아키텍처 · CRUD/폼 추상화 · 인증 · DB 스키마 설계 · 거래처 어드민 이식',
      status: '본인 자산 · 거래처 어드민 3곳 + 내부 도구에 이식 · 지속 발전',
    },
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
    facts: {
      period: '2025.12 (약 2주)',
      team: '개발 단독 · 기획·개발·디자인(보증서 PDF 시안만 제공)',
      scope:
        '요구사항 정의 · 공개 조회 사이트 + 어드민 2앱 FE · Supabase·공개 API · 배포',
      url: 'https://sgcbf.co.kr',
      status: '운영 중',
    },
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
    facts: {
      period: '2026.02 ~ 현재 (레거시 → React+Hono 전면 재작성)',
      team: '개발 단독 · 본인 IP (디자인 시안 없음)',
      scope:
        'FE · 시스템 아키텍처 판단 · 도메인/데이터 모델링 · self-hosted 운영 · AI 드리븐 구현·디렉션',
      status: '운영 중 · 일 들어올 때 매일 실사용(견적·프로젝트·세무)',
    },
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
    facts: {
      period: '2024.08 (약 1개월)',
      team: '개발 단독 · PC 디자인 시안 제공',
      scope:
        'FE · 복합 검색 UI 설계 · 관리자 CMS · 데이터 정규화·DB 설계 · 셀프호스팅 배포',
      url: 'https://vitalkorea-vip.kr',
      status: '운영 중',
    },
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
    facts: {
      period: '2024.12 ~ 2025.05 (재직 중 구축)',
      team: '디자이너 1명·3D 영상작업자 1명 협업 · 개발 단독',
      scope:
        'FE(스크롤 인터랙션·다국어) · 반응형 직접 해석 · 어드민 CMS 설계·개발 · Supabase 연동 · 배포',
      url: 'https://angel-robotics.com',
      status: '운영 중',
    },
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
    facts: {
      period: '2025.02 – 2025.06',
      team: '디자이너 1명 협업 · PM 겸 개발 단독',
      scope:
        'PM · 기획 · 디자인 기획(디렉션) · FE(다국어·회원 인증) · 어드민 CMS 설계 · 반응형 직접 해석',
      url: 'https://mrev.co.kr',
      status: '운영 중',
    },
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
    facts: {
      period: '2024.03 ~ 현재',
      team: '디자이너 협업(메인·소개 시안) · 개발 단독',
      scope:
        'FE · 스크롤 인터랙션/모션 · 포트폴리오 브라우징 UX · 화면 직접 설계 · 데이터 연동 · 온라인 문의 · 배포·운영',
      url: 'https://korea3d.co.kr',
      status: '운영 중',
    },
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
