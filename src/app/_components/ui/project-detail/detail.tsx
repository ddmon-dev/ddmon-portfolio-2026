import { type Project } from './types';
import { ProjectHero } from './hero';
import { ProjectFactBox } from './fact-box';
import { ProjectDetailBody } from './detail-body';

export function ProjectDetail({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article>
      <div className="h-70">
        <ProjectHero project={project} index={index} />
      </div>

      <div className="divide-y divide-border">
        <div className="p-6 max-sm:p-5">
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
