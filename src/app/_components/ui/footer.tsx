import Link from 'next/link';
import type { Icon } from '@phosphor-icons/react';
import {
  GithubLogoIcon,
  PhoneIcon,
  AtIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Section } from './section';

export function Footer({ recipient }: { recipient?: string }) {
  return (
    <footer className="bg-secondary bg-horizon [--horizon-radius:150vw] [--horizon-bottom:348px] max-lg:[--horizon-bottom:307px] max-md:[--horizon-radius:750px] max-md:[--horizon-bottom:340px]">
      <Section
        title="contact"
        description={
          <>
            {recipient ? `${recipient} 채용담당자님` : '담당자님'}, 포트폴리오를
            열람해주셔서 감사합니다. <br />
            이제 귀사의 팀에서 함께 성과를 내고 싶습니다. <br />
            시간을 내셔도 괜찮으시다면, 연락 부탁드립니다.
          </>
        }
        className="pt-20 pb-30"
      >
        <ul className="flex justify-center max-md:flex-col max-md:items-center max-md:gap-2 max-md:[&>li]:w-full max-md:[&>li]:max-w-xs max-md:[&>li]:-my-px">
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
        <p className="text-background text-center mt-20 max-lg:mt-15 max-md:mt-10">
          Designed &amp; built by 이동희 &copy; {new Date().getFullYear()}
        </p>
      </Section>
    </footer>
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
      className="flex flex-col justify-center items-center gap-5 text-center size-70 rounded-full shadow-[0px_-5px_10px_rgb(0,0,0,0.05)] bg-background overflow-hidden max-lg:size-58 max-lg:gap-3 max-md:w-full max-md:h-auto max-md:p-2 max-md:flex-row max-md:justify-start"
    >
      <span className="size-19 bg-secondary/90 text-secondary-foreground rounded-full flex items-center justify-center shrink-0 max-lg:size-16 max-md:size-12">
        <Icon
          weight="thin"
          className="text-5xl max-lg:text-4xl max-md:text-3xl"
        />
      </span>
      <span className="sr-only">{label}</span>
      <span className="font-secondary">{value}</span>
    </Link>
  );
}
