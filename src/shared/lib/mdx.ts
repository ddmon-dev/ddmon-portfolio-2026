import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PROJECT_ORDER } from '@/data/major-projects/projects.config';

const PROJECTS_PATH = path.join(process.cwd(), 'src/data/major-projects');

export interface ProjectMetadata {
  id: string;
  name: string;
  summary: string;
  startDate: string;
  endDate: string;
  skills: string[];
  links?: {
    url: string;
    label: string;
  }[];
}

export interface Project extends ProjectMetadata {
  content: string;
}

/**
 * 모든 프로젝트를 로드합니다.
 * PROJECT_ORDER 배열 순서대로 반환됩니다.
 */
export function getAllProjects(): Project[] {
  // 디렉토리가 없으면 빈 배열 반환
  if (!fs.existsSync(PROJECTS_PATH)) {
    return [];
  }

  const files = fs.readdirSync(PROJECTS_PATH);

  // 모든 MDX 파일을 읽어서 Map으로 저장
  const projectsMap = new Map<string, Project>();

  files
    .filter(file => file.endsWith('.mdx'))
    .forEach(file => {
      const filePath = path.join(PROJECTS_PATH, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      const project = {
        ...(data as ProjectMetadata),
        content,
      };

      projectsMap.set(project.id, project);
    });

  // PROJECT_ORDER 순서대로 반환
  return PROJECT_ORDER.map(id => projectsMap.get(id)).filter(
    (project): project is Project => project !== undefined
  );
}

/**
 * ID로 특정 프로젝트를 가져옵니다.
 */
export function getProjectById(id: string): Project | null {
  const projects = getAllProjects();
  return projects.find(p => p.id === id) || null;
}
