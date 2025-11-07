import { Container } from '@/shared/ui/container';
import { Section } from './ui';

export function CareerInfo() {
  return (
    <Section
      title='Careers'
      description='나의 경력'
    >
      <Container>
        <ul>
          <li className='grid grid-cols-[300px_1fr] gap-8'>
            <h3>2020.02 - 2025.05 (5년 4개월)</h3>
            <div>
              <p>알지비커뮤니케이션즈</p>
              <ul>
                <li>수주 프로젝트 기획 및 관리</li>
                <li>수주 프로젝트 프론트엔드 개발 / 유지보수</li>
                <li>자사 공식 홈페이지 및 브랜드 홈페이지 기획 및 개발 / 유지보수</li>
                <li>자사 내부 관리 시스템 기획 및 개발 / 유지보수</li>
              </ul>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  );
}

export function StudyInfo() {
  return (
    <Section
      title='Study'
      description='나의 학습 경험'
    >
      <Container>
        <ul>
          <li className='grid grid-cols-[300px_1fr] gap-8'>
            <h3>2020.02 - 2025.05</h3>
            <div>
              <p>그린컴퓨터아카데미</p>
              <ul>
                <li>프론트엔드 개발자 양성과정 수료</li>
              </ul>
            </div>
          </li>
          <li className='grid grid-cols-[300px_1fr] gap-8'>
            <h3>2010.02 - 2015.08</h3>
            <div>
              <p>경희대학교</p>
              <ul>
                <li>경영학부 경영학과 졸업</li>
              </ul>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
