'use client';

import { useState } from 'react';
import { Section } from './ui';
import { Button } from '@/shared/ui/button';

const SKILLS_DATA = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'Supabase', 'Zustand'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VSCode', 'Figma', 'Notion'],
  },
];

export function MySkills() {
  return (
    <Section
      title='기술 스택 및 도구'
      description='아래 기술 스택 및 도구를 사용합니다.'
    >
      <SkillList skillsData={SKILLS_DATA} />
    </Section>
  );
}

function SkillList({ skillsData }: { skillsData: { category: string; items: string[] }[] }) {
  const skillCategories = skillsData.map(skill => skill.category);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allSkills = skillsData.flatMap(skill => skill.items);
  const selectedSkills =
    skillsData.find(skill => skill.category === selectedCategory)?.items || allSkills;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className='w-full max-w-lg mx-auto space-y-12'>
      <nav className='flex justify-center gap-1.5'>
        <Button
          onClick={() => setSelectedCategory(null)}
          variant={selectedCategory === null ? 'default' : 'secondary'}
        >
          All
        </Button>
        {skillCategories.map(category => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            variant={selectedCategory === category ? 'default' : 'secondary'}
          >
            {category}
          </Button>
        ))}
      </nav>
      <div className='flex flex-wrap justify-center gap-1'>
        {selectedSkills.map(skill => (
          <span
            key={skill}
            className='flex items-center justify-center size-18 rounded-full bg-primary text-primary-foreground text-sm overflow-hidden'
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
