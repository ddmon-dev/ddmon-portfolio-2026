import Image from 'next/image';
import ProfileImage from '@/assets/profile-img-6.png';
import { cn } from '@/shared/utils/classnames';
import { Container } from '@/shared/ui/container';
import { STACK_LOGOS, StackLogo } from '@/shared/ui/stack-logo';
import { ProfileSideDecoration } from '../ui/profile-side-decoration';
import { CAREERS, TECH_STACK_GROUPS } from '../data/profile';

export function ProfileSection({ recipient }: { recipient?: string }) {
  return (
    <div>
      <div className="hidden max-md:block max-md:bg-secondary max-md:overflow-hidden">
        <Image
          src={ProfileImage}
          alt=""
          className="relative z-10 w-full mx-auto max-md:w-[400px] max-md:h-[420px] max-md:object-cover max-md:object-top max-sm:max-w-[350px] max-sm:h-[370px]"
        />
      </div>
      <Container
        as="section"
        className="grid grid-cols-2 max-md:grid-cols-1 max-md:border-b max-md:border-border max-md:pb-12"
      >
        <div className="relative max-md:hidden">
          <div className="absolute size-full pr-8">
            <ProfileSideDecoration />
          </div>
          <div className="pt-15">
            <Image src={ProfileImage} alt="" className="relative z-10 w-full" />
          </div>
        </div>
        <div className="space-y-20 pt-30 max-md:space-y-16 max-md:pt-10 max-sm:space-y-12 max-sm:pt-8">
          <div className="space-y-8 max-sm:space-y-6">
            <h1 className="text-4xl/11 [&>b]:text-primary max-lg:text-3xl">
              안녕하세요
              {recipient && (
                <>
                  , <br />
                  <b>{recipient}</b> 채용담당자님.
                </>
              )}{' '}
              <br />
              <b className="font-secondary font-semibold">
                Frontend{' '}
                <span className="font-normal text-foreground!">Developer</span>
              </b>{' '}
              <br />
              <b>이동희</b>의{' '}
              <span className={cn(recipient && 'font-bold text-primary')}>
                포트폴리오
              </span>
              입니다.
            </h1>

            <p className="max-sm:break-normal max-sm:text-justify">
              주어진 범위의 구현에 머무르지 않고, 프로젝트의 맥락을 이해하며{' '}
              <br className="max-lg:hidden" />
              필요한 문제를 해결합니다. 개발 조직이 없는 환경에서 퍼블리셔로 웹
              개발을 시작해, 에이전시 프로젝트 수행부터 사내 프로젝트의
              설계·개발·운영, 웹 개발 프로세스 구축까지 업무 범위를
              확장해왔습니다.
              <br />
              <br />
              프로젝트 전반을 혼자 책임지고 완성해온 경험을 바탕으로,{' '}
              <br className="max-sm:hidden" />
              {recipient ? `${recipient}에서` : '개발 조직 안에서'} 설계와
              기술적 판단을 논의하고 검증하며 팀의 성과에 기여하고자 합니다.
            </p>
          </div>

          <Article title="기술스택" subtitle="Tech stacks">
            <div className="space-y-5">
              {TECH_STACK_GROUPS.map(group => (
                <div key={group.label} className="space-y-2">
                  <h4 className="text-sm font-secondary font-medium text-ash">
                    {group.label}
                  </h4>
                  <ul className="grid grid-cols-5 gap-1.5 max-sm:grid-cols-4">
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
    </div>
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
