import { Container } from '@/shared/ui/container';
import { ProjectCard } from './card';
import { ProjectDetailBody } from './detail-body';
import { parseProjectMarkdown } from './parse-markdown.mjs';
import { type Project } from './types';

/**
 * slug 하나에 대응하는 md를 로드해 완성된 Project로 조립한다.
 * frontmatter(meta)가 프로젝트 데이터의 단일 소스이고, slug은 파일명에서 온다.
 * md는 fs가 아니라 import로 읽는다(raw-loader, next.config.ts 참조) — 모듈 그래프에
 * 포함되어 dev에서 md 수정 시 HMR이 동작한다.
 */
async function loadProject(slug: string): Promise<Project> {
  const { default: markdown } = await import(`@/data/projects/${slug}.md`);
  const { meta, body } = parseProjectMarkdown(markdown);

  return { slug, ...meta, content: <ProjectDetailBody markdown={body} /> };
}

/**
 * 주요 프로젝트 갤러리. slug 목록을 받아 각 md를 로드·조립해 카드 그리드로 렌더한다.
 * 로드가 서버에서 끝나므로 마크다운 파서/렌더가 클라이언트 번들에 포함되지 않는다.
 */
export async function ProjectGallery({
  title,
  slugs,
}: {
  title: string;
  slugs: string[];
}) {
  const projects = await Promise.all(slugs.map(loadProject));

  return (
    <Container as="section" className="space-y-8">
      <h2 className="text-4xl font-bold">{title}</h2>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 max-sm:grid-cols-1">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
