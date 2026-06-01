import { Container } from '@/shared/ui/container';

export function IntroHero() {
  return (
    <div className="pt-40">
      <Container className="grid grid-cols-2">
        <div></div>
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl/14 [&>strong]:text-orange-500">
            안녕하세요 <br />
            <strong>주도적</strong> 문제<strong>해결사</strong> <br />
            <strong>FE</strong> 개발자 <br />
            <strong>이동희</strong>입니다.
          </h1>
        </div>
      </Container>
    </div>
  );
}
