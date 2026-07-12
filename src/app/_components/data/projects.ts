import type { ProjectListItem } from '../ui/project-list';

export const projects: ProjectListItem[] = [
  {
    id: 'smartcaddie',
    image: '/projects/smartcaddie.png',
    title: '골프존 스마트캐디 홈페이지',
    description:
      'GPS 기반 스마트워치 골프 어시스턴트 앱 스마트캐디의 다국어 소개 사이트와 어드민',
    contribution: ['프론트엔드', '어드민'],
    stacks: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'GSAP',
      'Tailwind',
      'Shadcn',
    ],
    href: 'https://smartcaddie.io',
  },
  {
    id: 'golfzoncloud',
    image: '/projects/golfzoncloud.png',
    title: '골프존클라우드 홈페이지',
    description:
      '골프장 운영을 위한 예약·정산·경기관제 등 클라우드 SaaS 플랫폼 소개 사이트와 어드민',
    contribution: ['프론트엔드', '어드민'],
    stacks: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'GSAP',
      'Tailwind',
      'Shadcn',
    ],
    href: 'https://golfzoncloud.com',
  },
  {
    id: 'angel-robotics',
    image: '/projects/angel-robotics.png',
    title: '엔젤로보틱스 홈페이지',
    description:
      '웨어러블 로봇 기업의 다국어 브랜드 사이트를 스크롤 인터랙션과 운영자 CMS로 리뉴얼',
    contribution: ['프론트엔드', '어드민'],
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Framer Motion',
      'Tailwind',
      'Shadcn',
    ],
    href: 'https://angel-robotics.com',
  },
  {
    id: 'v-portal',
    image: '/projects/v-portal.png',
    title: '백신정보포털',
    description:
      '한글 문서로 흩어진 백신 R&D 지원시설 정보를 조건별 검색 포털과 운영자 CMS로 재구성',
    contribution: ['PM', '기획', '단독 개발', '어드민'],
    stacks: ['Next.js', 'React', 'Supabase', 'Tailwind', 'Nginx'],
    href: 'https://vitalkorea-vip.kr',
  },
  {
    id: 'mr',
    image: '/projects/mr.png',
    title: '(주)엠알 홈페이지',
    description:
      '의료기기 기업의 다국어 사이트와 구매 의료진 전용 교육 콘텐츠 게이트를 PM 겸 단독 개발',
    contribution: ['PM', '기획', '단독 개발', '어드민'],
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Framer Motion',
      'Tailwind',
      'Shadcn',
    ],
    href: 'https://mrev.co.kr',
  },
  {
    id: 'rgb3d',
    image: '/projects/rgb3d.png',
    title: 'RGB3D 브랜드 홈페이지',
    description:
      '영상 사업 브랜드 사이트를 기획부터 인터랙션, 운영까지 단독으로 구축',
    contribution: ['PM', '기획', '단독 개발'],
    stacks: [
      'Next.js',
      'React',
      'Framer Motion',
      'Zustand',
      'MongoDB',
      'CSS Modules',
    ],
    href: 'https://korea3d.co.kr',
  },
];
