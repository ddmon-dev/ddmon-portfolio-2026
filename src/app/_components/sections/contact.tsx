import Link from 'next/link';
import type { Icon } from '@phosphor-icons/react';
import {
  GithubLogoIcon,
  PhoneIcon,
  EnvelopeSimpleIcon,
  AtIcon,
  ArrowSquareOutIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Section } from '../ui/section';

export function ContactSection() {
  return (
    <Section
      title="contact"
      description={
        <>
          담당자님, 열람해주셔서 감사합니다. <br />
          이제 귀사의 팀에서 함께 성과를 내고 싶습니다. <br />
          시간을 내셔도 괜찮으시다면, 연락 부탁드립니다.
        </>
      }
      className="text-center pb-40"
    >
      <ul className="flex justify-center gap-0">
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
    </Section>
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
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col justify-center items-center gap-2 text-center size-56 rounded-full border border-foreground text"
    >
      <Icon weight="thin" className="text-5xl" />
      <span className="sr-only">{label}</span>
      <span className="font-secondary">{value}</span>
    </Link>
  );
}
