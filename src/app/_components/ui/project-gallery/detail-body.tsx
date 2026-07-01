import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * 프로젝트 상세 본문(마크다운 문자열)을 다이얼로그 톤으로 렌더하는 서버 컴포넌트.
 * 마크다운 렌더가 서버에서 끝나고 결과 트리만 RSC payload로 내려가므로
 * 클라이언트 번들에 react-markdown이 포함되지 않는다.
 *
 * 입력은 frontmatter를 걷어낸 본문이다(gallery의 loadProject가 parse-markdown으로 분리).
 * 통째로 단일 트리로 렌더하며, 히어로가 사실상 h1이므로 본문 최상위 헤딩은 `##`(h2)부터 쓴다.
 */

/** 다이얼로그 본문(leading-relaxed text-ash-dark) 위에 얹는 마크다운 요소 스타일. */
const markdownComponents: Components = {
  h2: (props) => (
    <h2
      className="mt-8 text-lg font-bold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 text-base font-semibold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-4 text-sm font-semibold text-ash-darker first:mt-0"
      {...props}
    />
  ),
  p: (props) => <p className="mt-3 first:mt-0" {...props} />,
  ul: (props) => (
    <ul className="mt-3 list-disc space-y-1 pl-5 first:mt-0" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-3 list-decimal space-y-1 pl-5 first:mt-0" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-ash-darker" {...props} />
  ),
  a: (props) => (
    <a
      className="underline underline-offset-2 transition-colors hover:text-primary"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-ash-lighter px-1 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-3 border-l-2 border-border pl-4 text-ash first:mt-0"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-6 border-border" {...props} />,
  table: (props) => (
    <div className="mt-3 overflow-x-auto first:mt-0">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border px-3 py-2 text-left font-semibold text-ash-darker"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-ash-light px-3 py-2" {...props} />
  ),
};

export function ProjectDetailBody({ markdown }: { markdown: string }) {
  return (
    <div className="leading-relaxed text-ash-dark">
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </Markdown>
    </div>
  );
}
