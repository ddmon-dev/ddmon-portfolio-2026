import { type Project } from './types';
import { ProjectHero } from './hero';
import { ProjectFactBox } from './fact-box';
import { ProjectDetailBody } from './detail-body';

export function ProjectDetail({
  project,
  index,
  titleAs,
}: {
  project: Project;
  index: number;
  titleAs?: 'h1' | 'h3';
}) {
  return (
    <article>
      <div className="h-70">
        <ProjectHero project={project} index={index} titleAs={titleAs} />
      </div>

      <div className="divide-y divide-border">
        <div className="bg-ash-50 p-6 max-sm:p-5">
          <ProjectFactBox
            facts={project.facts}
            stacks={project.stacks}
            links={project.links}
          />
        </div>

        <div className="p-6 max-sm:p-5">
          <ProjectDetailBody markdown={project.body} />
        </div>
      </div>
    </article>
  );
}
