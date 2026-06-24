import { type ReactNode } from 'react';
import { StackBadges } from './stack-badges';
import { type ProjectFacts } from './types';

/**
 * 상세 다이얼로그 최상단(히어로와 본문 사이)의 at-a-glance 팩트 박스.
 * 채용 담당자가 가장 먼저 확인하는 "언제, 얼마 동안, 혼자였는지, 지금도
 * 운영 중인지"에 답하는 영역으로, 기술 스택(Used stack) 표시도 흡수한다.
 * 필드 구성 기준은 `docs/project-detail-structure.md`의 팩트 박스 섹션.
 */
export function ProjectFactBox({
  facts,
  stacks,
}: {
  facts: ProjectFacts;
  stacks: string[];
}) {
  const hasCondensedContribution = Boolean(facts.contribution);
  const statusText = facts.operation ?? facts.status;
  const contributionText = facts.contribution ?? facts.team;

  return (
    <dl className="grid grid-cols-1 gap-y-4">
      {facts.period && <FactItem label="기간">{facts.period}</FactItem>}

      {statusText && (
        <FactItem label={facts.operation ? '운영' : '상태'}>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {statusText}
          </span>
        </FactItem>
      )}

      {facts.product && <FactItem label="형태">{facts.product}</FactItem>}

      {contributionText && (
        <FactItem label={facts.contribution ? '기여' : '팀 / 담당'}>
          {contributionText}
        </FactItem>
      )}

      {facts.url && (
        <FactItem label="공개 URL">
          <a
            href={facts.url}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-primary"
          >
            {facts.url.replace(/^https?:\/\//, '')}
          </a>
        </FactItem>
      )}

      {!hasCondensedContribution && facts.scope && (
        <FactItem label="담당 범위">
          {facts.scope}
        </FactItem>
      )}

      <FactItem label="기술 스택">
        <StackBadges
          stacks={stacks}
          full
          className="justify-start gap-3 text-3xl"
        />
      </FactItem>
    </dl>
  );
}

function FactItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[100px_1fr] text-sm">
      <dt className="font-secondary font-semibold text-muted-foreground uppercase">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
