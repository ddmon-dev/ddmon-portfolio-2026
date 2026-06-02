import Image from 'next/image';
import { Container } from '@/shared/ui/container';
import { cn } from '@/shared/utils/classnames';

/**
 * 주요 프로젝트 섹션은 메이져 프로젝트만 보여줄 것
 * 카드를 클릭하면, 모달로 상세 내용을 펼쳐줄 것
 * 모달이 열리는 모션은 카드가 모달로 확장되는 효과로
 * 마이크로 인터렉션을 아주 강하게 깎자
 *
 * 프로젝트 목록
 * - 파노라마 필름
 * - 백신정보포털
 * - 엔젤로보틱스 홈페이지
 * - 솔라가드 건축용 필름 보증서 발급 서비스
 * - 알지비 커뮤니케이션즈 백오피스 서비스
 * - 알지비 커뮤니케이션즈 영상 브랜드 사이트
 * - 엠알 홈페이지
 * - 리틀어썸 워크매니저
 */

export function SelectedProjects() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Selected Projects</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8">
        <li>
          <ProjectCard />
        </li>
        <li>
          <ProjectCard />
        </li>
        <li>
          <ProjectCard />
        </li>
      </ul>
    </Container>
  );
}

/**
 * 시스템 & 템플릿 섹션은 내용 주요 프로젝트와는 다른 형태로 가는 것도 고려해봐야함 (너무 단조로워질 경우)
 * 해당 내용은 산출물 자체보다 Why & How가 중요
 * - 홈페이지 개발 프레임워크 구축
 * - 전자카탈로그 개발 프레임워크 구축
 */

export function SystemsAndTemplates() {
  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">Systems & Templates</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8">
        <li>
          <ProjectCard />
        </li>
        <li>
          <ProjectCard />
        </li>
        <li>
          <ProjectCard />
        </li>
      </ul>
    </Container>
  );
}

function ProjectCard() {
  return (
    <div className="cursor-pointer space-y-4">
      <Image
        src="/panoramafilm.png"
        alt=""
        width="1438"
        height="809"
        className="aspect-video bg-black/30 object-cover"
      />
      <div className="space-y-3">
        <div className="px-2 space-y-1">
          <h3 className="text-lg/5 font-bold">파노라마 필름</h3>
          <p className="">홈페이지 / 웹앱</p>
        </div>
        <p className="flex flex-wrap gap-x-1">
          {['Next.js', 'Supabase', 'Nginx'].map(item => (
            <SkillBadge key={item}>{item}</SkillBadge>
          ))}
        </p>
      </div>
    </div>
  );
}

function SkillBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex justify-center items-center py-1 px-2.5 rounded-full text-sm shrink-0 overflow-hidden',
        'bg-black text-white',
        'max-w-22',
        className
      )}
    >
      <span className="block truncate">{children}</span>
    </span>
  );
}
