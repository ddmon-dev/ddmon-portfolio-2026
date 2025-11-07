import { Container } from '@/shared/ui/container';
import { Button } from '@/shared/ui/button';
import { DownloadIcon } from 'lucide-react';

export function IntroHero() {
  return (
    <div className='py-24'>
      <Container className='space-y-6'>
        <h1 className='text-5xl font-semibold leading-tight'>
          안녕하세요.
          <br />
          <b className='text-muted-foreground'>코더</b>가 아닌, <br />
          <strong>
            프론트엔드 <span className='text-blue-500'>개발자</span>
          </strong>{' '}
          <br />
          <strong className='text-green-500'>이동희</strong>입니다.
        </h1>
        <p className='pl-1'>
          기획안대로, 디자인 시안대로 구현만 하는 코더가 아닌, <br />
          프로덕트 레벨, 비즈니스 관점에서 함께 고민하는 프론트엔드 개발자 이동희입니다.
        </p>
        <Button>
          이력서 다운로드 <DownloadIcon />
        </Button>
      </Container>
    </div>
  );
}
