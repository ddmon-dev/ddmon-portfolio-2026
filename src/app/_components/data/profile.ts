import { StackId } from '@/shared/ui/stack-logo';

type TechStackGroup = {
  label: string;
  stacks: StackId[];
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    label: 'Frontend',
    stacks: [
      'nextjs',
      'react',
      'js',
      'ts',
      'tailwind',
      'shadcn',
      'zustand',
      'rhf',
      'tanstackquery',
      'framermotion',
    ],
  },
  {
    label: 'Database · Backend · Infra 경험',
    stacks: [
      'supabase',
      'authjs',
      'postgresql',
      'mysql',
      'mongodb',
      'nginx',
      'apache',
      'ubuntu',
      'php',
    ],
  },
  {
    label: 'Workflow',
    stacks: ['git', 'github', 'figma', 'claudecode'],
  },
];

type Career = {
  company: string;
  start: string;
  end: string;
  role?: string;
  points: string[];
};

export const CAREERS: Career[] = [
  {
    company: '프리랜서 웹 개발',
    start: '2025.06',
    end: '현재',
    role: '프리랜서',
    points: [
      '파노라마 필름 B2B 발주 서비스의 후속 기능 개선 · 유지보수',
      '골프존 클라우드 · 스마트캐디 홈페이지 및 운영 어드민 개발',
      '솔라가드 건축용 필름 보증서 관리 서비스 개발',
      '솔라가드 한국 본사 홈페이지 유지보수',
      '내부 개발용 어드민 보일러플레이트 구축',
      '내부용 프리랜서 업무 관리 서비스 설계 및 개발',
      '알지비커뮤니케이션즈 프로젝트 유지보수 및 기술 커뮤니케이션 지원',
    ],
  },
  {
    company: '알지비커뮤니케이션즈',
    start: '2020.02',
    end: '2025.05',
    role: '웹/멀티미디어팀 · 과장',
    points: [
      '고객사 홈페이지·전자카탈로그 약 120건 구축 및 유지보수',
      '기업형 홈페이지 공통 개발 템플릿 구축 및 제작 프로세스 표준화',
      '전자카탈로그 공통 제작 템플릿 구축 및 React 기반 고도화',
      'Next.js 기반 고객사 웹 프로젝트 5건 설계·개발·유지보수',
      'Next.js 기반 사내 백오피스와 자사 홈페이지 설계·개발·유지보수',
      'GitHub 기반 형상관리 도입 및 개발·시연용 웹 서버 구축·관리',
      '고객사 프로젝트 PM, 외주 개발 관리, 기술 커뮤니케이션 및 팀원 실무 지원',
    ],
  },
];
