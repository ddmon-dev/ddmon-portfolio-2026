import { Container } from '@/shared/ui/container';

export function ProfileInfo() {
  return (
    <section className='py-16'>
      <Container className='grid grid-cols-[2fr_2.5fr] gap-12'>
        <div className='bg-secondary'></div>
        <div className='space-y-6'>
          {/* Heading */}
          <div className='space-y-2'>
            <h2 className='text-2xl font-bold'>I'm DDmon, a web developer.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          </div>
          {/* Description */}
          <div className='space-y-2'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga corrupti et illo sit
              ipsum saepe, sed, nisi iure cum veritatis dignissimos molestiae facere officiis
              laborum? Placeat adipisci atque blanditiis hic. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Eum at repudiandae animi ad laborum unde, consectetur
              temporibus, in consequuntur et, alias quis beatae error tenetur officiis eius nobis
              recusandae. Aspernatur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptas aliquam,
              esse animi blanditiis corporis ad officiis rerum reprehenderit cumque atque soluta,
              explicabo accusantium accusamus expedita iusto. Autem, totam consectetur.
            </p>
          </div>
          {/* Skills */}
          <Skills
            skills={[
              'HTML',
              'CSS',
              'JavaScript',
              'React',
              'Next.js',
              'Tailwind CSS',
              'TypeScript',
              'Node.js',
              'Express',
            ]}
          />
        </div>
      </Container>
    </section>
  );
}

function Skills({ skills }: { skills: string[] }) {
  return (
    <div>
      <h3 className='text-lg font-bold'>Skills</h3>
      <div className='flex flex-wrap gap-1'>
        {skills.map(skill => (
          <span
            key={skill}
            className='bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm'
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
