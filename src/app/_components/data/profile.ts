import { StackId } from '@/shared/ui/stack-logo';

type Strength = {
  title: string;
  description: string;
};

export const STRENGTHS: Strength[] = [
  {
    title: '프로젝트 완성력',
    description:
      '화면 설계부터 데이터 구조, 배포, 운영까지 도맡아 일정 안에 완성하고, 납품 이후의 유지보수까지 책임져왔습니다.',
  },
  {
    title: '운영 화면 구현',
    description:
      '어드민, CMS, 검색/필터, 등록·수정 흐름처럼 실제 운영자가 매일 쓰는 화면과 기능을 다뤄왔습니다.',
  },
  {
    title: '구조화와 재사용',
    description:
      '반복되는 CRUD, 관리 모듈, UI 패턴을 공통 구조로 정리해 다음 프로젝트에 빠르게 적용할 수 있는 기반을 만들어왔습니다.',
  },
];

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
    company: '프리랜스 웹 개발',
    start: '2025.06',
    end: 'Current',
    points: [
      '골프존 클라우드 · 스마트캐디 홈페이지/어드민 개발',
      '솔라가드 건축용 필름 보증서 관리 서비스 개발',
      '웹 프로젝트 유지보수 및 고객사 기술 커뮤니케이션 지원',
      '서버 침해 사고 원인 분석 및 서버 이전 대응',
    ],
  },
  {
    company: '알지비커뮤니케이션즈',
    start: '2020.02',
    end: '2025.05',
    role: '웹/멀티미디어팀 · 사원 → 대리 → 과장',
    points: [
      '고객사 웹 프로젝트 개발 및 유지보수',
      '홈페이지 · 전자카탈로그 제작 템플릿 구축 및 프로세스 표준화',
      '자사 백오피스(사내 운영 도구) 및 자사 홈페이지 개발 · 운영',
      '자사 웹 인프라(호스팅 · 도메인 · 서버) 구축 및 운영',
      '고객사 프로젝트 매니지먼트 및 커뮤니케이션',
    ],
  },
];
