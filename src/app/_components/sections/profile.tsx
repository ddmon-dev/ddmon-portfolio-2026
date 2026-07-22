import Image from 'next/image';
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/shared/ui/container';
import { STACK_LOGOS, StackLogo } from '@/shared/ui/stack-logo';
import { ProfileSideDecoration } from '../ui/profile-side-decoration';
import { ContactItem } from '../ui/contact-item';
import { CopyEmailItem } from '../ui/copy-email-item';
import { CAREERS, TECH_STACK_GROUPS } from '../data/profile';
import { CONTACT } from '../data/contact';

export function ProfileSection({ recipient }: { recipient?: string }) {
  return (
    <div>
      <div className="hidden max-md:block bg-linear-to-t from-foreground/5 to-transparent overflow-hidden border border-t-0 border-border rounded-b-4xl">
        <Image
          src="/profile-img-mo.webp"
          alt=""
          width={1225}
          height={1200}
          sizes="280px"
          className="relative z-10 w-full mx-auto max-md:w-70"
        />
      </div>
      <Container className="grid grid-cols-2 max-md:grid-cols-1 max-md:border-b max-md:border-border max-md:pb-12">
        <div className="max-md:hidden pr-8">
          <div className="relative h-full">
            <div className="absolute size-full">
              <ProfileSideDecoration />
            </div>
            <div className="pt-28 max-lg:pt-24">
              <div className="relative z-10 ml-auto mr-4 size-65 overflow-hidden rounded-full bg-ash-50 border border-border/30 max-lg:size-57.5">
                <Image
                  src="/profile-img-pc.webp"
                  alt=""
                  width={531}
                  height={531}
                  priority
                  sizes="290px"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-20 pt-38 max-lg:pt-32 max-md:space-y-16 max-md:pt-8 max-sm:pt-6">
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
              <b>이동희</b>의 <br />
              <b>포트폴리오</b>
              입니다.
            </h1>

            <ul className="flex flex-col gap-2 -mx-2 p-4 rounded-4xl border border-border max-w-94 [&>li]:w-full max-lg:max-w-none">
              <li>
                <ContactItem
                  compact
                  icon={GithubLogoIcon}
                  hoverIcon={ArrowUpRightIcon}
                  label={CONTACT.github.label}
                  value={CONTACT.github.value}
                  href={CONTACT.github.href}
                />
              </li>
              <li>
                <CopyEmailItem compact value={CONTACT.email.value} />
              </li>
            </ul>

            <p className="max-sm:break-normal max-sm:text-justify">
              주어진 범위의 구현에 머무르지 않고, 프로젝트의 맥락을 이해하며{' '}
              <br className="max-lg:hidden" />
              필요한 문제를 해결합니다. 개발 조직이 없는 환경에서 퍼블리셔로 웹
              개발을 시작해, 에이전시 프로젝트 수행부터 사내 프로젝트의
              설계·개발·운영, 웹 개발 프로세스 구축까지 업무 범위를
              확장해왔습니다.
              <br />
              <br />
              프로젝트의 설계부터 개발·운영까지 직접 책임져온 경험을 바탕으로,{' '}
              <br className="max-lg:hidden" />
              {recipient ? `${recipient}에서` : '개발 조직 안에서'} 설계와
              기술적 판단을 논의하고 검증하며 팀의 성과에 기여하고자 합니다.
            </p>
          </div>

          <Section title="기술스택" subtitle="Tech stacks">
            <div className="space-y-5">
              {TECH_STACK_GROUPS.map(group => (
                <article key={group.label} className="space-y-2">
                  <h3 className="text-sm font-secondary font-medium text-ash">
                    {group.label}
                  </h3>
                  <ul className="grid grid-cols-5 gap-1.5 max-sm:grid-cols-4">
                    {group.stacks.map(stack => (
                      <li
                        key={stack}
                        className="flex flex-col items-center gap-2 pt-5 pb-3 px-2 rounded-xl bg-ash-50 border border-ash-lighter"
                      >
                        <StackLogo stack={stack} className="text-3xl" />
                        <span className="text-xs font-secondary text-center text-ash">
                          {STACK_LOGOS[stack].label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section title="경력사항" subtitle="Career">
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
                    <h3>
                      <span className="block font-bold">{career.company}</span>
                      {career.role && (
                        <span className="block text-sm text-muted-foreground font-normal">
                          {career.role}
                        </span>
                      )}
                    </h3>
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
          </Section>
        </div>
      </Container>
    </div>
  );
}

type SectionProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="space-y-4">
      {title && (
        <h2 className="text-2xl font-medium font-secondary text-ash-dark">
          {title}
          {subtitle && (
            <small className="ml-[0.5em] text-ash font-normal text-[0.6em]">
              {subtitle}
            </small>
          )}
        </h2>
      )}
      {children}
    </section>
  );
}
