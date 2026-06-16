import {
  ProjectGallery,
  ProjectDetail,
  type Project,
} from './ui/project-gallery';

/**
 * 주요 프로젝트 섹션은 메이져 프로젝트만 보여줄 것
 * 카드를 클릭하면, 모달로 상세 내용을 펼쳐줄 것
 * 모달이 열리는 모션은 카드가 모달로 확장되는 효과로
 * 마이크로 인터렉션을 아주 강하게 깎자. 열린 상태에서 이전/다음으로 좌우 슬라이드 탐색.
 *
 * NOTE: 이미지는 현재 panoramafilm.png 하나만 확보되어 있어 공통 사용하며,
 * 프로젝트별 스크린샷 확보 후 교체한다.
 *
 * 메타(title/category/image/stacks)는 여기서 데이터로 관리하고, 상세 본문은
 * `src/data/projects/<slug>.md` 마크다운으로 작성한다 (ProjectDetail이 렌더).
 */

const placeholderImage = {
  src: '/projects/panoramafilm.png',
  alt: '',
  width: 1438,
  height: 809,
};

type ProjectMeta = Omit<Project, 'content'>;

/** slug와 같은 이름의 md(`src/data/projects/<slug>.md`)를 상세 본문으로 연결한다. */
function withDetail(metas: ProjectMeta[]): Project[] {
  return metas.map((meta) => ({
    ...meta,
    content: <ProjectDetail slug={meta.slug} />,
  }));
}

const selectedProjects: Project[] = withDetail([
  {
    slug: 'panorama-film',
    title: '파노라마 필름',
    category: '홈페이지 / 웹앱',
    image: { ...placeholderImage, alt: '파노라마 필름 프로젝트' },
    stacks: [
      'Next.js',
      'React',
      'Supabase',
      'Server Actions',
      'Tailwind',
      'Zustand',
      'Nginx',
      'Kakao Alimtalk',
    ],
    facts: {
      period: '2024.06 – 2024.09 (4개월)',
      team: '디자이너 1명 협업(브랜드 시안) · 개발 단독',
      scope:
        'FE · OMS/어드민 요구사항 정의·화면 설계 · DB 설계 · 배포 · 고객사 커뮤니케이션',
      url: 'https://panoramafilm.co.kr',
      status: '운영 중 · 유지보수 지속',
    },
  },
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
]);

export function SelectedProjectsSection() {
  return (
    <ProjectGallery title="Selected Projects" projects={selectedProjects} />
  );
}

/**
 * 시스템 & 템플릿 섹션은 내용 주요 프로젝트와는 다른 형태로 가는 것도 고려해봐야함 (너무 단조로워질 경우)
 * 해당 내용은 산출물 자체보다 Why & How가 중요
 */

const systemsProjects: Project[] = withDetail([
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
]);

export function SystemsAndTemplatesSection() {
  return (
    <ProjectGallery title="Systems & Templates" projects={systemsProjects} />
  );
}
