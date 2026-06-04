/**
 * 기술 스택 단일 소스.
 * 숙련도 티어(Good/Normal/Soso)별 tech id 목록을 정의한다.
 * 실제 로고/라벨 매핑은 `@/shared/ui/tech-logo`의 TECH_LOGOS 레지스트리에 둔다.
 *
 * 콘텐츠 기준: docs/portfolio-content.md > 기술 스택
 */

export type TechId =
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'supabase'
  | 'php'
  | 'gnuboard5'
  | 'mongodb'
  | 'apache'
  | 'nginx';

export type TechTier = {
  /** 티어 식별자 */
  id: 'good' | 'normal' | 'soso';
  /** 표시 라벨 */
  label: string;
  /** 해당 티어에 속한 기술 */
  techs: TechId[];
};

export const TECH_STACK: TechTier[] = [
  {
    id: 'good',
    label: 'Good',
    techs: ['html', 'css', 'javascript', 'react', 'nextjs'],
  },
  {
    id: 'normal',
    label: 'Normal',
    techs: ['typescript', 'supabase', 'php', 'gnuboard5'],
  },
  {
    id: 'soso',
    label: 'Soso',
    techs: ['mongodb', 'apache', 'nginx'],
  },
];
