import { ProjectGallery, DetailSection, type Project } from './project-card';

/**
 * 주요 프로젝트 섹션은 메이져 프로젝트만 보여줄 것
 * 카드를 클릭하면, 모달로 상세 내용을 펼쳐줄 것
 * 모달이 열리는 모션은 카드가 모달로 확장되는 효과로
 * 마이크로 인터렉션을 아주 강하게 깎자. 열린 상태에서 이전/다음으로 좌우 슬라이드 탐색.
 *
 * NOTE: 카드/상세 콘텐츠는 일단 하드코딩한다. 이미지는 현재 panoramafilm.png 하나만
 * 확보되어 있어 공통 사용하며, 프로젝트별 스크린샷 확보 후 교체한다.
 *
 * 메타(title/category/image/skills)는 데이터로, 상세 본문(content)은 JSX로 작성한다.
 */

const placeholderImage = {
  src: '/panoramafilm.png',
  alt: '',
  width: 1438,
  height: 809,
};

const selectedProjects: Project[] = [
  {
    title: '파노라마 필름',
    category: '홈페이지 / 웹앱',
    image: { ...placeholderImage, alt: '파노라마 필름 프로젝트' },
    skills: ['Next.js', 'Supabase', 'Tailwind', 'Nginx'],
    content: (
      <>
        <DetailSection title="Overview">
          <p>
            프리미엄 자동차 필름 브랜드 사이트와 시공점 발주·보증서 발급 시스템,
            관리자 어드민으로 구성된 B2B 웹 서비스입니다.
          </p>
        </DetailSection>
        <DetailSection title="Role">
          <p>
            브랜드 사이트 반응형 구현부터 발주·어드민 화면 설계, DB 설계, 비즈니스
            로직, 배포, 고객사 커뮤니케이션까지 단독으로 담당했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Problem">
          <p>
            지역거점회원과 시공점회원으로 나뉘는 권한 구조와 발주·보증서 플로우를
            데이터 모델로 풀어내야 했고, 카카오 알림톡 연동 이슈로 Vercel에서
            self-hosting 환경으로 배포를 전환해야 했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Solution">
          <p>
            상품 발주, 장바구니, 발주 관리, 보증서 발급 및 PDF 출력, 브랜드 사이트
            내 보증서 조회, 게시판, 매출 통계를 구현하고, 가비아 클라우드 서버에
            Nginx 기반 self-hosting 환경을 구성해 운영했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Tech Stack">
          <p>
            Next.js 14, React, Supabase(Auth/DB/Storage/RPC), Tailwind CSS, Gabia
            Cloud, Nginx, Kakao Alimtalk
          </p>
        </DetailSection>
      </>
    ),
  },
  {
    title: '백신정보포털',
    category: '데이터 포털 / CMS',
    image: { ...placeholderImage, alt: '백신정보포털 프로젝트' },
    skills: ['Next.js', 'Supabase', 'Server Actions'],
    content: (
      <>
        <DetailSection title="Overview">
          <p>
            백신 연구개발·상용화에 필요한 지원시설, 행사, 교육 정보를 제공하는
            데이터 포털과 관리자 CMS입니다.
          </p>
        </DetailSection>
        <DetailSection title="Role">
          <p>
            PC 디자인을 제외한 반응형 UI 구현, 프론트엔드 개발, 관리자 CMS, DB 구조
            설계와 데이터 정규화, 프로젝트 기획·관리를 담당했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Problem">
          <p>
            한 시설이 비임상·임상·위탁생산 등 여러 카테고리에 동시에 속하고,
            카테고리마다 상세 속성과 필터 조건이 달라 단순 게시판이 아닌 복합 데이터
            탐색 구조가 필요했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Solution">
          <p>
            지원시설 데이터를 정규화하고, 국내/해외·지역·구분·생물안전등급·인증 등
            다양한 조건으로 탐색 가능한 정보 구조와 UI를 설계했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Tech Stack">
          <p>
            Next.js 14, React, Supabase, Server Actions, Tailwind CSS, Gabia Cloud
          </p>
        </DetailSection>
      </>
    ),
  },
  {
    title: '엔젤로보틱스 홈페이지',
    category: '브랜드 / 제품 홈페이지',
    image: { ...placeholderImage, alt: '엔젤로보틱스 홈페이지 프로젝트' },
    skills: ['Next.js', 'React', 'Supabase'],
    content: (
      <>
        <DetailSection title="Overview">
          <p>
            웨어러블 로봇 기업의 브랜드·제품 홈페이지 구축 프로젝트입니다. 디자인을
            제외한 개발 전반을 담당했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Role">
          <p>
            프론트엔드 개발, 반응형 UI 구현, Supabase 연동, 관리자 기능, 배포를
            담당했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Problem">
          <p>
            PC 중심 디자인에 일부 모바일 화면만 제공되어, 웹·스크롤 인터랙션에
            최적화되지 않은 디자인을 실제 브라우저 환경에 맞게 재구성해야 했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Solution">
          <p>
            메인·제품 페이지의 스크롤 애니메이션과 섹션 전환을 구현하고, 태블릿·
            모바일 반응형 화면을 직접 해석해 브랜드 감각과 사용성을 함께 살렸습니다.
          </p>
        </DetailSection>
        <DetailSection title="Tech Stack">
          <p>Next.js, React, Supabase, Tailwind CSS</p>
        </DetailSection>
      </>
    ),
  },
  {
    title: 'RGB Managers',
    category: '사내 운영 시스템',
    image: { ...placeholderImage, alt: 'RGB Managers 프로젝트' },
    skills: ['Next.js', 'MongoDB', 'Puppeteer'],
    content: (
      <>
        <DetailSection title="Overview">
          <p>
            기존 PHP 기반 프로젝트 관리툴을 Next.js·MongoDB 기반 사내 운영 시스템으로
            개편한 프로젝트입니다. 사내 20명 이내가 실제 업무에 사용했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Role">
          <p>
            별도 디자인 없이 업무 흐름을 직접 파악해 UI·기능을 설계하고, 기존 MySQL
            데이터를 MongoDB로 마이그레이션했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Problem">
          <p>
            기존 도구는 게시판 형태의 프로젝트 기록에 가까워, 프로젝트 현황과
            구성원·포트폴리오·고객·문의·견적서를 함께 관리하기 어려웠습니다.
          </p>
        </DetailSection>
        <DetailSection title="Solution">
          <p>
            프로젝트·구성원·포트폴리오·문의·고객·견적서 관리와 견적서 PDF 출력을
            하나의 흐름으로 묶었습니다. v1(Next.js 13)으로 빠르게 도입 후 v2(Next.js
            15)로 UI와 서버 로직을 개편하며 지속 확장했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Tech Stack">
          <p>Next.js 13 → 15, React, MongoDB Atlas, Puppeteer, Gabia Cloud</p>
        </DetailSection>
      </>
    ),
  },
];

export function SelectedProjects() {
  return <ProjectGallery title="Selected Projects" projects={selectedProjects} />;
}

/**
 * 시스템 & 템플릿 섹션은 내용 주요 프로젝트와는 다른 형태로 가는 것도 고려해봐야함 (너무 단조로워질 경우)
 * 해당 내용은 산출물 자체보다 Why & How가 중요
 */

const systemsProjects: Project[] = [
  {
    title: 'React 전자카탈로그 템플릿',
    category: '제작 템플릿',
    image: { ...placeholderImage, alt: 'React 전자카탈로그 템플릿' },
    skills: ['React', 'Framer Motion', 'Swiper'],
    content: (
      <>
        <DetailSection title="Why">
          <p>
            플래시 기반 전자카탈로그가 HTML 환경으로 전환되던 시기, 프로젝트마다
            구조가 달라 제작 효율과 유지보수성이 떨어지는 문제를 해결하기 위해
            만들었습니다.
          </p>
        </DetailSection>
        <DetailSection title="How">
          <p>
            페이지 전환, 애니메이션, 네비게이션, 다국어, 모바일 세로형 전환 등 반복
            케이스를 패턴화하고, 템플릿 코어를 건드리지 않고 페이지 파일만 추가해
            퍼블리싱할 수 있는 구조로 설계했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Result">
          <p>
            React를 잘 모르는 후임도 사용할 수 있는 제작 구조가 되어, 후임 제작분
            포함 50건 이상에 활용되었습니다.
          </p>
        </DetailSection>
      </>
    ),
  },
  {
    title: '홈페이지 제작 템플릿',
    category: '제작 체계',
    image: { ...placeholderImage, alt: '홈페이지 제작 템플릿' },
    skills: ['PHP', 'GnuBoard5', 'jQuery'],
    content: (
      <>
        <DetailSection title="Why">
          <p>
            게시판·문의 폼이 필요한 기업형 홈페이지를 매번 외주에 맡기지 않고
            내부에서 처리하기 위해, 반복 제작 업무를 표준화했습니다.
          </p>
        </DetailSection>
        <DetailSection title="How">
          <p>
            그누보드의 관리자·게시판 기능은 유지하되 홈페이지 프론트는 별도 폴더
            구조로 분리해, 퍼블리셔가 PHP를 거의 신경 쓰지 않고 정해진 패턴대로
            게시판·문의 폼을 붙일 수 있게 했습니다.
          </p>
        </DetailSection>
        <DetailSection title="Result">
          <p>
            개발 경험이 많지 않은 퍼블리셔도 작업 가능한 구조가 되어, 회사의 다수
            홈페이지 제작에 기본 구조로 활용되었습니다.
          </p>
        </DetailSection>
      </>
    ),
  },
];

export function SystemsAndTemplates() {
  return (
    <ProjectGallery title="Systems & Templates" projects={systemsProjects} />
  );
}
