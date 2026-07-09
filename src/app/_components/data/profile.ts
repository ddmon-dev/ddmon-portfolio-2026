import { StackId } from '@/shared/ui/stack-logo';

type TechStackGroup = {
  label: string;
  stacks: StackId[];
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    label: 'Frontend',
    stacks: [
      'js',
      'ts',
      'react',
      'nextjs',
      'tailwind',
      'shadcn',
      'zustand',
      'rhf',
      'tanstackquery',
      'framermotion',
      'html',
      'css',
    ],
  },
  {
    label: 'Data · Backend 경험',
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
    end: 'Current',
    role: '개인사업자 · 2026.03~',
    points: [
      '파노라마 필름 OMS 포인트 내역 관리 기능 개발 및 프로젝트 유지보수',
      '골프존 클라우드 · 스마트캐디 홈페이지 및 운영 어드민 개발',
      '솔라가드 건축용 필름 보증서 관리 서비스 개발',
      '솔라가드 한국 본사 홈페이지 유지보수',
      '내부 개발용 어드민 프레임워크 구축',
      '내부용 프리랜서 업무 관리 서비스 설계 및 개발',
      '서버 침해 사고의 원인·피해 범위 분석 및 서비스 환경 재구축·이전 대응',
      '알지비커뮤니케이션즈 프로젝트 유지보수 및 기술 커뮤니케이션 지원',
    ],
  },
  {
    company: '알지비커뮤니케이션즈',
    start: '2020.02',
    end: '2025.05',
    role: '웹/멀티미디어팀 · 과장',
    points: [
      '고객사 홈페이지·전자카탈로그 140여 건 개발 및 유지보수',
      '홈페이지·전자카탈로그 공통 개발 템플릿 구축 및 제작 프로세스 표준화',
      'Next.js 기반 고객사 웹 서비스 7건 설계·개발·운영',
      '사내 백오피스 및 자사 홈페이지 설계·개발·운영',
      '호스팅·도메인·웹 서버 환경 구축 및 운영',
      '고객사 프로젝트 PM, 외주 개발 관리 및 기술 커뮤니케이션',
    ],
  },
];
