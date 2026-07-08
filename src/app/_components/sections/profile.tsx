import Image from 'next/image';
import ProfileImage from '@/assets/profile-img-6.png';
import { Container } from '@/shared/ui/container';
import { STACK_LOGOS, StackLogo } from '@/shared/ui/stack-logo';
import { ProfileSideDecoration } from '../ui/profile-side-decoration';
import { CAREERS, STRENGTHS, TECH_STACK_GROUPS } from '../data/profile';

export function ProfileSection() {
  return (
    <Container as="section" className="grid grid-cols-2 max-md:grid-cols-1">
      <div className="relative">
        <div className="absolute size-full pr-5 max-sm:hidden">
          <ProfileSideDecoration />
        </div>
        <div className="pt-20">
          <Image
            src={ProfileImage}
            alt=""
            className="relative z-10 w-full mix-blend-multiply"
          />
        </div>
      </div>
      <div className="space-y-14 pt-40 max-md:pt-14">
        <h1 className="text-5xl/14 [&>b]:text-primary">
          안녕하세요 <br />
          <b>혼자서도 끝까지</b>, <br />
          <b>구조</b>로 완성하는 <br />
          FE 개발자 <b>이동희</b>입니다.
        </h1>

        <p>
          6년간 개발 조직이 없는 환경에서 고객사 홈페이지, 어드민, 사내 운영
          도구를 화면 설계부터 배포·유지보수까지 혼자 완성해왔습니다. 반복되는
          등록·수정 흐름, 검색/필터, 관리 화면은 공통 구조와 템플릿으로 정리해
          다음 프로젝트의 기반으로 만들어왔고, 그 위에서 React와 Next.js 기반
          실서비스를 구축해 지금도 운영하고 있습니다. 이제는 제품팀 안에서
          동료들과 설계와 코드 품질을 논의하며, UI 중심 프론트엔드 개발자로 더
          깊게 성장하고자 합니다.
        </p>

        <Article title="주요 강점" subtitle="Strengths">
          <ul className="space-y-1.5">
            {STRENGTHS.map(strength => (
              <li
                key={strength.title}
                className="rounded-xl border border-ash-lighter bg-ash-50 px-5 py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-4 max-sm:space-y-1.5"
              >
                <h4 className="font-semibold text-ash-darker">
                  {strength.title}
                </h4>
                <p className="text-sm leading-relaxed text-ash-dark">
                  {strength.description}
                </p>
              </li>
            ))}
          </ul>
        </Article>

        <Article title="기술스택" subtitle="Tech stacks">
          <div className="space-y-5">
            {TECH_STACK_GROUPS.map(group => (
              <div key={group.label} className="space-y-2">
                <h4 className="text-sm font-secondary font-medium text-ash">
                  {group.label}
                </h4>
                <ul className="grid grid-cols-5 gap-1.5">
                  {group.stacks.map(stack => (
                    <li
                      key={stack}
                      className="flex flex-col items-center gap-2 pt-5 pb-3 rounded-xl bg-ash-50 border border-ash-lighter"
                    >
                      <StackLogo stack={stack} className="text-3xl" />
                      <span className="text-xs font-secondary text-center text-ash">
                        {STACK_LOGOS[stack].label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Article>

        <Article title="경력사항" subtitle="Career">
          <div className="pt-1">
            {CAREERS.map(career => (
              <article
                key={career.company}
                className="group relative space-y-3.5 pl-8 pb-10 last:pb-0"
              >
                <i
                  aria-hidden
                  className="absolute size-[15px] rounded-full border-4 border-secondary-light top-1 left-0 bg-background z-1 group-first:border-primary"
                />
                <i
                  aria-hidden
                  className="absolute top-1 left-[7px] w-px h-full bg-border z-0 group-last:hidden"
                />
                <div className="border-b border-border pb-2 flex justify-between items-center gap-3">
                  <h4>
                    <span className="block font-bold">{career.company}</span>
                    {career.role && (
                      <span className="block text-sm text-muted-foreground font-normal">
                        {career.role}
                      </span>
                    )}
                  </h4>
                  <span className="shrink-0 tabular-nums font-secondary text-sm text-muted-foreground">
                    {career.start} – {career.end}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-foreground/80 pl-3.5">
                  {career.points.map(point => (
                    <li key={point} className="flex gap-2.5 relative">
                      <span
                        aria-hidden
                        className="absolute top-[0.75em] right-full -translate-x-2 -translate-y-1/2 size-1 shrink-0 rounded-full bg-ash/70"
                      />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Article>
      </div>
    </Container>
  );
}

type ArticleProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

function Article({ title, subtitle, children }: ArticleProps) {
  return (
    <article className="space-y-4">
      {title && (
        <h3 className="text-2xl font-medium font-secondary text-ash-dark">
          {title}
          {subtitle && (
            <small className="ml-[0.5em] text-ash font-normal text-[0.6em]">
              {subtitle}
            </small>
          )}
        </h3>
      )}
      {children}
    </article>
  );
}
