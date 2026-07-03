import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { StackBadges } from '@/shared/ui/stack-badges';

export type ProjectListItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  contribution: string[];
  stacks: string[];
  href: string;
};

export function ProjectList({ items }: { items: ProjectListItem[] }) {
  return (
    <ul className="divide-y divide-ash-light border-y border-ash-light">
      {items.map(item => (
        <li key={item.id}>
          <Row item={item} />
        </li>
      ))}
    </ul>
  );
}

function Row({ item }: { item: ProjectListItem }) {
  const content = (
    <div className="group grid grid-cols-[288px_1fr] items-center gap-x-7 py-5 relative overflow-hidden hover:opacity-70 transition-opacity max-sm:grid-cols-1 max-sm:gap-y-4">
      <Image
        src={item.image}
        alt={`${item.title} 스크린샷`}
        width={576}
        height={360}
        sizes="(max-width: 640px) 100vw, 288px"
        className="aspect-16/10 w-full shrink-0 rounded-2xl bg-ash-lighter/20 border border-border object-cover"
      />
      <div className="flex-1 space-y-3 max-sm:px-2">
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-ash-darker group-hover:underline">
            {item.title}
          </h3>
          <p className="text-base text-ash-dark">{item.description}</p>
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1">
            {item.contribution.map(cont => (
              <Badge
                key={cont}
                shape="pill"
                variant="outline"
                className="px-2.5 py-1 text-xs"
              >
                {cont}
              </Badge>
            ))}
          </div>
          <StackBadges stacks={item.stacks} />
        </div>
      </div>
    </div>
  );

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  );
}
