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
    stacks: ['Next.js', 'Supabase', 'Server Actions'],
  },
  {
    slug: 'angel-robotics',
    title: '엔젤로보틱스 홈페이지',
    category: '브랜드 / 제품 홈페이지',
    image: { ...placeholderImage, alt: '엔젤로보틱스 홈페이지 프로젝트' },
    stacks: ['Next.js', 'React', 'Supabase'],
  },
  {
    slug: 'rgb-managers',
    title: 'RGB Managers',
    category: '사내 운영 시스템',
    image: { ...placeholderImage, alt: 'RGB Managers 프로젝트' },
    stacks: ['Next.js', 'MongoDB', 'Puppeteer'],
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
      'zod',
      'shadcn/ui',
    ],
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
