export const PROJECT_ORDER = [
  'panoramafilm',
  'vitalkorea-portal',
  'angel-robotics',
  'medical-revolution',
  'rgb-korea3d',
  'rgb-planner',
  'rgb-homepage-framework',
  'rgb-ecat-framework',
] as const;

export type ProjectId = (typeof PROJECT_ORDER)[number];
