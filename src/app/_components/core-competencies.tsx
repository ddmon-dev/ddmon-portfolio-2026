import { Section } from './ui';

export function CoreCompetencies() {
  return (
    <Section
      title='핵심 역량'
      description='나는 어떤 핵심 역량을 어필할 것인가?'
    >
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-secondary aspect-square' />
        <div className='bg-secondary aspect-square' />
        <div className='bg-secondary aspect-square' />
      </div>
    </Section>
  );
}
