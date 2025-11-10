/**
 * 프로젝트 표시 순서
 * 배열 순서대로 화면에 표시됩니다.
 * 순서를 변경하려면 이 배열의 순서만 바꾸면 됩니다.
 */
export const PROJECT_ORDER = ['panoramafilm', 'vitalkorea-portal', 'project-3'] as const;

export type ProjectId = (typeof PROJECT_ORDER)[number];
