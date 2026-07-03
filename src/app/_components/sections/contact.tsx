import Link from 'next/link';
import type { Icon } from '@phosphor-icons/react';
import {
  GithubLogoIcon,
  PhoneIcon,
  AtIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Section } from '../ui/section';

export function ContactSection() {
  return (
    <div className="overflow-hidden bg-foreground">
      <Section
        title="contact"
        description={
          <>
            담당자님, 포트폴리오를 열람해주셔서 감사합니다. <br />
            이제 귀사의 팀에서 함께 성과를 내고 싶습니다. <br />
            시간을 내셔도 괜찮으시다면, 연락 부탁드립니다.
          </>
        }
        className="text-center pb-30"
        headerClassName="relative z-10"
      >
        <div className="relative z-0">
          <div className="absolute z-0 bottom-4/9 left-1/2 -translate-x-1/2 overflow-hidden w-screen h-[200vw] max-md:bottom-[78%]">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 size-[300vw] rounded-full border bg-background max-md:size-[1500px]" />
          </div>
          <ul className="relative z-10 flex justify-center max-md:flex-col max-md:items-center max-md:gap-2 max-md:[&>li]:w-full max-md:[&>li]:max-w-xs max-md:[&>li]:-my-px">
            <li>
              <ContactItem
                icon={GithubLogoIcon}
                label="Github"
                value="github.com/dd2mon"
                href="https://github.com/dd2mon"
              />
            </li>
            <li>
              <ContactItem
                icon={AtIcon}
                label="E-mail"
                value="ldhman91@gmail.com"
                href="mailto:ldhman91@gmail.com"
              />
            </li>
            <li>
              <ContactItem
                icon={PhoneIcon}
                label="Call"
                value=""
                href="tel:"
              />
            </li>
          </ul>
        </div>
        <p className="text-background text-center mt-20 max-lg:mt-15 max-md:mt-10">
          &copy; ㅇㄷㅎ all rights reserved.
        </p>
      </Section>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: Icon;
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith('http');

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flex flex-col justify-center items-center gap-5 text-center size-70 rounded-full shadow-[0px_-5px_10px_rgb(0,0,0,0.05)] bg-background overflow-hidden max-lg:size-58 max-lg:gap-3 max-md:w-full max-md:h-auto max-md:p-3 max-md:flex-row max-md:justify-start"
    >
      <span className="size-19 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center shrink-0 max-lg:size-16 max-md:size-12">
        <Icon
          weight="thin"
          className="text-5xl max-lg:text-4xl max-md:text-2xl"
        />
      </span>
      <span className="sr-only">{label}</span>
      <span className="font-secondary">{value}</span>
    </Link>
  );
}
