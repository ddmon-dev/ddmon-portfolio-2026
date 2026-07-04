import Image from 'next/image';
import ProfileImage from '@/assets/profile-img-6.png';
import { Container } from '@/shared/ui/container';
import { STACK_LOGOS, StackLogo } from '@/shared/ui/stack-logo';
import { ProfileSideDecoration } from '../ui/profile-side-decoration';
import { CARREERS, HIGHLIGHTS, TECH_STACKS } from '../data/profile';

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
          <b>주도적</b> 문제<b>해결사</b> <br />
          <b>FE</b> 개발자 <br />
          <b>이동희</b>입니다.
        </h1>

        <p>
          안녕하세요, 저는 이동희입니다. 저는 프론트엔드 개발자로, 주도적 문제
          해결사입니다. 저는 회사의 목표와 운영 맥락을 이해하고, 기능의
          우선순위와 구현 방식을 현실적으로 판단할 수 있는 프론트엔드
          개발자입니다.
        </p>

        <Article title="Highlight">
          <ul className="grid grid-cols-3 border border-ash-lighter rounded-xl bg-ash-50">
            {HIGHLIGHTS.map((item, index) => (
              <li
                key={index}
                className="group relative flex flex-col text-center px-3 pt-6 pb-5"
              >
                <span className="text-4xl text-ash-dark space-x-0.5">
                  <strong className="inline-block font-secondary font-semibold">
                    {item.count}
                  </strong>
                  <small className="inline-block text-[0.5em] font-semibold translate-y-[-0.1em]">
                    {item.tag}
                  </small>
                </span>
                <span className="text-ash-dark text-sm font-medium mt-1">
                  {item.label}
                </span>
                <i
                  aria-hidden
                  className="absolute top-1/2 right-0 -translate-y-1/2 w-px h-2/3 bg-ash-light group-last:hidden"
                />
              </li>
            ))}
          </ul>
        </Article>

        <Article title="기술스택" subtitle="Tech stacks">
          <ul className="grid grid-cols-5 gap-1.5">
            {TECH_STACKS.map(stack => (
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
        </Article>

        <Article title="경력사항" subtitle="Carreer">
          <div className="pt-1">
            {CARREERS.map(carreer => (
              <article
                key={carreer.company}
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
                    <span className="block font-bold">{carreer.company}</span>
                    {carreer.role && (
                      <span className="block text-sm text-muted-foreground font-normal">
                        {carreer.role}
                      </span>
                    )}
                  </h4>
                  <span className="shrink-0 tabular-nums font-secondary text-sm text-muted-foreground">
                    {carreer.start} – {carreer.end}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-foreground/80 pl-3.5">
                  {carreer.points.map(point => (
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
