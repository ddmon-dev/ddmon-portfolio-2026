import { StackBadges } from '@/app/_components/ui/project-gallery/stack-badges';
import { cn } from '@/shared/utils/classnames';
import type { OtherProject } from '@/app/_components/projects.data';
import { OtherProjectThumbnail } from './other-project-thumbnail';

export function OtherProjectList({ items }: { items: OtherProject[] }) {
  return (
    <ul className="divide-y divide-ash-light">
      {items.map(item => (
        <li key={item.slug}>
          <Row item={item} />
        </li>
      ))}
    </ul>
  );
}

function Row({ item }: { item: OtherProject }) {
  const content = (
    <div className="flex items-center gap-5 py-5">
      <div className="aspect-16/10 w-32 shrink-0 overflow-hidden rounded-sm bg-primary/15 ring-1 ring-black/5">
        <OtherProjectThumbnail label={item.title} href={item.href} />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <h3 className="font-bold text-ash-darker">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.category}</p>
          <p className="mt-1 text-sm text-ash-dark">{item.description}</p>
        </div>
        <StackBadges stacks={item.stacks} />
      </div>
    </div>
  );

  if (!item.href) {
    return <div className="px-2">{content}</div>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('block rounded-lg px-2 transition-colors hover:bg-ash-50')}
    >
      {content}
    </a>
  );
}
