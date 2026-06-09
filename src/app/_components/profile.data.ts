import { StackId } from '@/shared/ui/stack-logo';

type Highlight = {
  count: number;
  tag: string;
  label: string;
};

export const HIGHLIGHTS: Highlight[] = [
  {
    count: 5,
    tag: '년+',
    label: '웹 개발 경력',
  },
  {
    count: 150,
    tag: '건+',
    label: '프로젝트',
  },
  {
    count: 100,
    tag: '%',
    label: '완료율',
  },
];

export const TECH_STACKS: StackId[] = [
  'html',
  'css',
  'js',
  'react',
  'nextjs',
  'ts',
  'php',
  'g5',
  'mongodb',
  'apache',
  'nginx',
];

type Carreer = {
  company: string;
  start: string;
  end: string;
  role?: string;
  points: string[];
};

export const CARREERS: Carreer[] = [
  {
    company: '프리랜서', // 프리랜서... 라는 표현 말고 다른 표현 없을까..
    start: '2025.06',
    end: 'Current',
    // 내용 보완
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
    role: '웹팀 · 과장',
    points: [
      '고객사 웹 프로젝트 개발 및 유지보수',
      '홈페이지 개발 및 제작 템플릿 구축',
      '전자카탈로그 개발 및 제작 템플릿 구축',
      '웹 제작 · 개발 프로세스 표준화',
      '자사 백오피스(사내 운영 도구) 개발 및 유지보수',
      '자사 홈페이지 개발 및 운영 · 유지보수',
      '자사 웹 인프라(호스팅 · 도메인 · 서버) 구축 및 운영',
      '고객사 프로젝트 매니지먼트 · 고객사 커뮤니케이션',
    ],
  },
];
