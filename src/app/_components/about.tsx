import { Container } from '@/shared/ui/container';
import { STACK_LOGOS, StackLogo, type StackId } from '@/shared/ui/stack-logo';

type Experience = {
  company: string;
  start: string;
  end: string;
  role?: string;
  points: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: '프리랜스 웹 개발',
    start: '2025.06',
    end: '현재',
    points: [
      '골프존 클라우드 · 스마트캐디 홈페이지/어드민 개발',
      '솔라가드 건축용 필름 보증서 관리 서비스 개발',
      '웹 프로젝트 유지보수 및 고객사 기술 커뮤니케이션 지원',
      '서버 침해 사고 원인 분석 및 서버 이전 대응',
    ],
  },
  {
    company: '알지비커뮤니케이션즈',
    start: '2020.02',
    end: '2025.05',
    role: '웹/멀티미디어팀 · 사원 → 대리 → 과장',
    points: [
      '고객사 웹 프로젝트 개발 및 유지보수',
      '홈페이지 개발 및 제작 템플릿 구축',
      '전자카탈로그 개발 및 제작 템플릿 구축',
      '웹 제작 · 개발 프로세스 표준화',
      '자사 백오피스(사내 운영 도구) 개발 및 유지보수',
      '자사 홈페이지 개발 및 운영 · 유지보수',
      '자사 웹 인프라(호스팅 · 도메인 · 서버) 구축 및 운영',
      '고객사 프로젝트 매니지먼트 · 고객사 커뮤니케이션',
    ],
  },
];

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
          <ul className="grid grid-cols-5 gap-1 gap-y-6 border border-border p-4 py-8">
            {(
              [
                'html',
                'css',
                'js',
                'react',
                'nextjs',
                'ts',
                'php',
                'g5',
                'mongodb',
                'apache',
                'nginx',
              ] as StackId[]
            ).map(stack => (
              <li key={stack} className="flex flex-col items-center gap-3">
                <StackLogo stack={stack} className="text-4xl" />
                <span className="text-sm font-medium text-muted-foreground">
                  {STACK_LOGOS[stack].label}
                </span>
              </li>
            ))}
          </ul>
        </Article>
        <Article title="Experience">
          <div className="space-y-8">
            {EXPERIENCES.map(exp => (
              <article key={exp.company} className="space-y-3">
                <header className="space-y-0.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-bold">{exp.company}</h4>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {exp.start} – {exp.end}
                    </span>
                  </div>
                  {exp.role && (
                    <p className="text-sm text-muted-foreground">{exp.role}</p>
                  )}
                </header>
                <ul className="space-y-1.5 border-t border-border pt-3 text-sm text-foreground/80">
                  {exp.points.map(point => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="text-primary">
                        ·
                      </span>
                      <span>{point}</span>
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
