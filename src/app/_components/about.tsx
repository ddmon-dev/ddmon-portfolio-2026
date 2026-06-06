import { Container } from '@/shared/ui/container';
import { StackChip } from './ui/stack-badges';

export function About() {
  return (
    <Container as="section" className="grid grid-cols-2">
      <div>
        <h2 className="text-4xl font-bold">About Me</h2>
      </div>
      <div className="space-y-8">
        <p>
          안녕하세요, 저는 이동희입니다. 저는 프론트엔드 개발자로, 주도적 문제
          해결사입니다. 저는 회사의 목표와 운영 맥락을 이해하고, 기능의
          우선순위와 구현 방식을 현실적으로 판단할 수 있는 프론트엔드
          개발자입니다.
        </p>
        <Article title="Highlight">
          <ul className="grid grid-cols-3 divide-x divide-border border border-border">
            {[
              {
                count: 5,
                tag: '년+',
                label: '웹 개발 경력',
              },
              {
                count: 150,
                tag: '건+',
                label: '프로젝트',
              },
              {
                count: 100,
                tag: '%',
                label: '완료율',
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex flex-col text-center px-3 py-6 space-y-1"
              >
                <span className="text-4xl space-x-1">
                  <strong>{item.count}</strong>
                  <small className="text-[0.5em]">{item.tag}</small>
                </span>
                <span className="text-muted-foreground">{item.label}</span>
              </li>
            ))}
          </ul>
        </Article>
        <Article title="Skills">
          <ul className="flex flex-wrap gap-4">
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Supabase</li>
            <li>PHP</li>
            <li>GnuBoard5</li>
            <li>MongoDB</li>
            <li>Apache</li>
            <li>Nginx</li>
            <li>AI-assisted development</li>
            <li>Design-to-code</li>
            <li>Responsive UI</li>
            <li>Interaction implementation</li>
            <li>Template and workflow system building</li>
          </ul>
        </Article>
        <Article title="Experience">
          <ul className="space-y-2">
            <li>알지비커뮤니케이션즈</li>
            <li>2020.02 - 2025.05</li>
            <li>웹 / 멀티미디어팀</li>
            <li>웹 개발 및 퍼블리싱</li>
            <li>사원 입사, 1년 만에 대리 승진, 이후 2년 만에 과장 승진</li>
            <li>디자인 에이전시 내 유일한 웹 개발 담당자</li>
          </ul>
        </Article>
      </div>
    </Container>
  );
}

type ArticleProps = {
  title: string;
  children: React.ReactNode;
};

function Article({ title, children }: ArticleProps) {
  return (
    <article className="space-y-4">
      <h3 className="text-2xl font-bold">{title}</h3>
      {children}
    </article>
  );
}
