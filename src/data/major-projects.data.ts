export interface Project {
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

export const MAJOR_PROJECTS: Project[] = [
  {
    id: 'panoramafilm',
    name: '파노라마필름',
    summary: '파노라마필름 브랜드 홈페이지 및 대리점 구매 시스템 개발',
    startDate: '2024.06',
    endDate: '2024.08',
    skills: ['Next.js', 'Post CSS', 'Tailwind CSS', 'Supabase', 'Vercel', 'Apache', 'Ubuntu'],
    links: [
      {
        url: 'https://www.panoramafilm.co.kr',
        label: '파노라마필름 홈페이지',
      },
    ],
  },
  {
    id: '2',
    name: 'Project 2',
    summary: '파노라마필름 브랜드 홈페이지 및 대리점 구매 시스템 개발',
    startDate: '2024.09',
    endDate: '2024.12',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: '3',
    name: 'Project 3',
    summary: '파노라마필름 브랜드 홈페이지 및 대리점 구매 시스템 개발',
    startDate: '2025.01',
    endDate: '2025.04',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
];
