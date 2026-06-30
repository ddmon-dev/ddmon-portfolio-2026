import { type ReactNode } from 'react';
import { cn } from '@/shared/utils/classnames';
import { StackBadges } from './stack-badges';
import { type ProjectFacts } from './types';

const LABELS = {
  period: '기간',
  operation: '상태',
  product: '형태',
  contribution: '기여도',
};

export function ProjectFactBox({
  facts,
  stacks,
}: {
  facts: ProjectFacts;
  stacks: string[];
}) {
  return (
    <dl className="grid grid-cols-1 gap-y-2">
      <FactItem label={LABELS.period}>{facts.period}</FactItem>
      <FactItem label={LABELS.operation}>{facts.operation}</FactItem>
      <FactItem label={LABELS.product}>{facts.product}</FactItem>
      <FactItem label={LABELS.contribution}>{facts.contribution}</FactItem>

      {facts.url && (
        <FactItem label="URL">
          <a
            href={facts.url}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 text-blue-500 hover:text-blue-400"
          >
            {facts.url.replace(/^https?:\/\//, '')}
          </a>
        </FactItem>
      )}

      <FactItem label="SKILLS" className="pt-1" labelClassName="sm:pt-0.5">
        <StackBadges stacks={stacks} />
      </FactItem>
    </dl>
  );
}

function FactItem({
  label,
  children,
  className,
  labelClassName,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn('grid grid-cols-[90px_1fr]', className)}>
      <dt className={cn('font-medium uppercase', labelClassName)}>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
