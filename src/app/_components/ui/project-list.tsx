import { StackBadges } from '@/shared/ui/stack-badges';

export type ProjectListItem = {
  id: string;
  title: string;
  description: string;
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
    <div className="group grid grid-cols-[288px_1fr] items-center gap-x-8 py-5 relative overflow-hidden hover:opacity-70 transition-opacity max-sm:grid-cols-1 max-sm:gap-y-4">
      <img
        src=""
        alt=""
        className="aspect-16/10 w-full shrink-0 rounded-2xl bg-ash-lighter/20 border border-border"
      />
      <div className="flex-1 space-y-3 max-sm:px-2">
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-ash-darker group-hover:underline">
            {item.title}
          </h3>
          <p className="text-base text-ash-dark">{item.description}</p>
        </div>
        <StackBadges stacks={item.stacks} />
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
