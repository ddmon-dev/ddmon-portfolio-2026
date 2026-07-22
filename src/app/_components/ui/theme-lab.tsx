'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/classnames';

const INK = '#18181b';

const THEMES = [
  {
    key: 'current',
    label: '현재 오렌지',
    group: '오렌지 변주',
    base: '#f26619',
    light: '#ff9a4d',
    dark: '#ea580c',
    foreground: '#ffffff',
  },
  {
    key: 'burnt',
    label: '번트 오렌지',
    group: '오렌지 변주',
    base: '#c2410c',
    light: '#ea580c',
    dark: '#9a3412',
    foreground: '#ffffff',
  },
  {
    key: 'vermilion',
    label: '버밀리언',
    group: '오렌지 변주',
    base: '#e8442e',
    light: '#ff7a5c',
    dark: '#c93217',
    foreground: '#ffffff',
  },
  {
    key: 'coral',
    label: '코랄',
    group: '오렌지 변주',
    base: '#f0604d',
    light: '#ff8a78',
    dark: '#d43a24',
    foreground: '#ffffff',
  },
  {
    key: 'terracotta',
    label: '테라코타',
    group: '오렌지 변주',
    base: '#c65d3b',
    light: '#e07b56',
    dark: '#a34527',
    foreground: '#ffffff',
  },
  {
    key: 'amber',
    label: '앰버',
    group: '오렌지 변주',
    base: '#f59e0b',
    light: '#fbbf24',
    dark: '#b45309',
    foreground: INK,
  },
  {
    key: 'red',
    label: '레드',
    group: '웜',
    base: '#dc2626',
    light: '#ef4444',
    dark: '#b91c1c',
    foreground: '#ffffff',
  },
  {
    key: 'rose',
    label: '로즈',
    group: '웜',
    base: '#e11d48',
    light: '#fb7185',
    dark: '#be123c',
    foreground: '#ffffff',
  },
  {
    key: 'burgundy',
    label: '버건디',
    group: '웜',
    base: '#9f1239',
    light: '#e11d48',
    dark: '#881337',
    foreground: '#ffffff',
  },
  {
    key: 'magenta',
    label: '마젠타',
    group: '웜',
    base: '#db2777',
    light: '#f472b6',
    dark: '#be185d',
    foreground: '#ffffff',
  },
  {
    key: 'fuchsia',
    label: '푸시아',
    group: '웜',
    base: '#c026d3',
    light: '#e879f9',
    dark: '#a21caf',
    foreground: '#ffffff',
  },
  {
    key: 'gold',
    label: '골드',
    group: '웜',
    base: '#eab308',
    light: '#facc15',
    dark: '#a16207',
    foreground: INK,
  },
  {
    key: 'brown',
    label: '브라운',
    group: '웜',
    base: '#9c5b2d',
    light: '#c07a45',
    dark: '#7a4520',
    foreground: '#ffffff',
  },
  {
    key: 'lime',
    label: '라임',
    group: '그린',
    base: '#65a30d',
    light: '#84cc16',
    dark: '#4d7c0f',
    foreground: '#ffffff',
  },
  {
    key: 'green',
    label: '그린',
    group: '그린',
    base: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    foreground: '#ffffff',
  },
  {
    key: 'emerald',
    label: '에메랄드',
    group: '그린',
    base: '#059669',
    light: '#34d399',
    dark: '#047857',
    foreground: '#ffffff',
  },
  {
    key: 'forest',
    label: '포레스트',
    group: '그린',
    base: '#166534',
    light: '#22c55e',
    dark: '#14532d',
    foreground: '#ffffff',
  },
  {
    key: 'teal',
    label: '틸',
    group: '그린',
    base: '#0d9488',
    light: '#2dd4bf',
    dark: '#0f766e',
    foreground: '#ffffff',
  },
  {
    key: 'cyan',
    label: '시안',
    group: '쿨',
    base: '#0891b2',
    light: '#22d3ee',
    dark: '#0e7490',
    foreground: '#ffffff',
  },
  {
    key: 'sky',
    label: '스카이',
    group: '쿨',
    base: '#0284c7',
    light: '#38bdf8',
    dark: '#0369a1',
    foreground: '#ffffff',
  },
  {
    key: 'cobalt',
    label: '코발트 블루',
    group: '쿨',
    base: '#2563eb',
    light: '#5b8bf5',
    dark: '#1d4ed8',
    foreground: '#ffffff',
  },
  {
    key: 'navy',
    label: '네이비',
    group: '쿨',
    base: '#1e40af',
    light: '#3b82f6',
    dark: '#1e3a8a',
    foreground: '#ffffff',
  },
  {
    key: 'indigo',
    label: '인디고',
    group: '쿨',
    base: '#4f46e5',
    light: '#818cf8',
    dark: '#4338ca',
    foreground: '#ffffff',
  },
  {
    key: 'violet',
    label: '바이올렛',
    group: '쿨',
    base: '#7c3aed',
    light: '#a78bfa',
    dark: '#6d28d9',
    foreground: '#ffffff',
  },
  {
    key: 'purple',
    label: '퍼플',
    group: '쿨',
    base: '#9333ea',
    light: '#c084fc',
    dark: '#7e22ce',
    foreground: '#ffffff',
  },
  {
    key: 'ink',
    label: '잉크',
    group: '뉴트럴',
    base: '#18181b',
    light: '#3f3f46',
    dark: '#09090b',
    foreground: '#ffffff',
  },
  {
    key: 'slate',
    label: '슬레이트',
    group: '뉴트럴',
    base: '#475569',
    light: '#64748b',
    dark: '#334155',
    foreground: '#ffffff',
  },
  {
    key: 'stone',
    label: '스톤',
    group: '뉴트럴',
    base: '#57534e',
    light: '#78716c',
    dark: '#44403c',
    foreground: '#ffffff',
  },
] as const;

type ThemeKey = (typeof THEMES)[number]['key'];

const GROUPS = [...new Set(THEMES.map(t => t.group))];

const STORAGE_KEY = 'theme-lab';

function applyTheme(key: ThemeKey) {
  const style = document.documentElement.style;
  if (key === 'current') {
    style.removeProperty('--primary');
    style.removeProperty('--primary-light');
    style.removeProperty('--primary-dark');
    style.removeProperty('--primary-foreground');
    return;
  }
  const theme = THEMES.find(t => t.key === key)!;
  style.setProperty('--primary', theme.base);
  style.setProperty('--primary-light', theme.light);
  style.setProperty('--primary-dark', theme.dark);
  style.setProperty('--primary-foreground', theme.foreground);
}

export function ThemeLab() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeKey>(() => {
    if (typeof window === 'undefined') return 'current';
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return THEMES.find(t => t.key === saved)?.key ?? 'current';
  });

  useEffect(() => {
    applyTheme(active);
  }, [active]);

  const select = (key: ThemeKey) => {
    setActive(key);
    sessionStorage.setItem(STORAGE_KEY, key);
  };

  const activeTheme = THEMES.find(t => t.key === active)!;

  return (
    <div className="fixed right-4 top-4 z-100 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="테마 전환"
        suppressHydrationWarning
        className="size-10 cursor-pointer rounded-full border-2 border-background shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: activeTheme.base }}
      />
      {open && (
        <div className="max-h-[calc(100dvh-5rem)] w-60 space-y-3 overflow-y-auto rounded-2xl border border-border bg-background p-3 shadow-xl">
          <p className="text-xs text-ash">
            적용 중:{' '}
            <span className="font-semibold text-ash-darker">
              {activeTheme.label}
            </span>
          </p>
          {GROUPS.map(group => (
            <div key={group} className="space-y-1.5">
              <p className="text-[11px] font-medium text-ash">{group}</p>
              <div className="grid grid-cols-6 gap-1.5">
                {THEMES.filter(t => t.group === group).map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => select(t.key)}
                    aria-label={t.label}
                    title={t.label}
                    className={cn(
                      'size-8 cursor-pointer rounded-full transition-transform hover:scale-110',
                      active === t.key &&
                        'ring-2 ring-ash-darker ring-offset-2 ring-offset-background'
                    )}
                    style={{ backgroundColor: t.base }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
