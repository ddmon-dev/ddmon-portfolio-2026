export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export type ProjectFacts = {
  period: string;
  operation: string;
  product: string;
  contribution: string;
};

export type ProjectLinks = {
  site?: string;
  repo?: string;
};

export type ProjectMeta = {
  title: string;
  category: string;
  image: ProjectImage;
  stacks: string[];
  links?: ProjectLinks;
  facts: ProjectFacts;
};

export type Project = ProjectMeta & {
  id: string;
  body: string;
};
