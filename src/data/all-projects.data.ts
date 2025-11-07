export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  skills: string[];
  link?: string;
}

export const ALL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    startDate: '2024.05',
    endDate: '2024.08',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://www.google.com',
  },
  {
    id: '2',
    name: 'Project 2',
    startDate: '2024.09',
    endDate: '2024.12',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://www.google.com',
  },
  {
    id: '3',
    name: 'Project 3',
    startDate: '2025.01',
    endDate: '2025.04',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://www.google.com',
  },
  {
    id: '4',
    name: 'Project 4',
    startDate: '2025.05',
    endDate: '2025.08',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://www.google.com',
  },
  {
    id: '5',
    name: 'Project 5',
    startDate: '2025.09',
    endDate: '2025.12',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://www.google.com',
  },
  {
    id: '6',
    name: 'Project 6',
    startDate: '2026.01',
    endDate: '2026.04',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    link: 'https://www.google.com',
  },
];
