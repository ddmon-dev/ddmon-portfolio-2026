import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  PhoneIcon,
  PhoneOutgoingIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Section } from './section';
import { ContactItem } from './contact-item';
import { CopyEmailItem } from './copy-email-item';
import { CONTACT } from '../data/contact';

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
              hoverIcon={ArrowUpRightIcon}
              label={CONTACT.github.label}
              value={CONTACT.github.value}
              href={CONTACT.github.href}
            />
          </li>
          <li>
            <CopyEmailItem value={CONTACT.email.value} />
          </li>
          <li>
            <ContactItem
              icon={PhoneIcon}
              hoverIcon={PhoneOutgoingIcon}
              label={CONTACT.phone.label}
              value={CONTACT.phone.value}
              href={CONTACT.phone.href}
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
