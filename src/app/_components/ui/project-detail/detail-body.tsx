import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents: Components = {
  h2: props => (
    <h2
      className="mt-14 mb-2 flex items-center gap-2 text-[1.375rem] font-semibold tracking-tight text-ash-darker first:mt-0 before:shrink-0 before:font-semibold before:text-primary before:content-[counter(section,decimal-leading-zero)] before:[counter-increment:section] after:h-px after:min-w-8 after:flex-1 after:bg-border"
      {...props}
    />
  ),
  h3: props => (
    <h3
      className="mt-8 text-lg font-semibold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  h4: props => (
    <h4
      className="mt-6 text-base font-semibold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  p: props => (
    <p className="mt-2 first:mt-0 break-normal text-justify" {...props} />
  ),
  ul: props => (
    <ul
      className="mt-2 list-disc space-y-2 pl-5 marker:text-ash first:mt-0"
      {...props}
    />
  ),
  ol: props => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-5 marker:font-medium marker:text-ash first:mt-0"
      {...props}
    />
  ),
  strong: props => (
    <strong className="font-semibold text-ash-darker" {...props} />
  ),
  a: props => (
    <a
      className="text-primary-dark underline underline-offset-2 transition-colors hover:text-primary"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  code: props => (
    <code
      className="rounded-md bg-ash-lighter px-1.5 py-0.5 font-mono text-[0.85em] text-ash-darker"
      {...props}
    />
  ),
  blockquote: props => (
    <blockquote
      className="mt-4 rounded-r-md border-l-[3px] border-primary bg-ash-50 px-4 py-3 text-ash-dark first:mt-0"
      {...props}
    />
  ),
  hr: props => <hr className="my-10 border-border" {...props} />,
  table: props => (
    <div className="mt-4 overflow-x-auto first:mt-0">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: props => (
    <th
      className="border-b-2 border-ash-light px-3 py-2 text-left font-semibold text-ash-darker"
      {...props}
    />
  ),
  td: props => (
    <td className="border-b border-ash-light px-3 py-2.5" {...props} />
  ),
};

export function ProjectDetailBody({ markdown }: { markdown: string }) {
  return (
    <div className="leading-[1.75] text-ash-dark [counter-reset:section]">
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </Markdown>
    </div>
  );
}
