import {
  ProjectGallery,
  ProjectDetailContent,
  type Project,
} from './ui/project-gallery';
import { majorProjectSlugs } from './projects.data';
import { parseProjectMarkdown } from './ui/project-gallery/project-markdown.mjs';

/**
 * slug 하나에 대응하는 md를 로드해 완성된 Project로 조립한다.
 * frontmatter(meta)가 프로젝트 데이터의 단일 소스이고, slug은 파일명에서 온다.
 */
async function loadProject(slug: string): Promise<Project> {
  const { default: markdown } = await import(`@/data/projects/${slug}.md`);
  const { meta, body } = parseProjectMarkdown(markdown);

  return { slug, ...meta, content: <ProjectDetailContent markdown={body} /> };
}

export async function SelectedProjectsSection() {
  const projects = await Promise.all(majorProjectSlugs.map(loadProject));

  return <ProjectGallery title="주요 프로젝트" projects={projects} />;
}
