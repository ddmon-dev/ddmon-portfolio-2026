# 이동희 포트폴리오

프론트엔드 개발자 이동희(DDmon)의 개인 포트폴리오 사이트. 채용 담당자와 프론트엔드 실무자가 빠르게 훑어볼 수 있는 스캔형 구성을 목표로 한다.

## 기술 스택

- **Next.js 16.2.6** (App Router, React Compiler)
- **React 19.2.4** / **TypeScript 5**
- **Tailwind CSS v4** — `@theme inline` 기반 디자인 토큰, PostCSS 플러그인만 사용(`tailwind.config` 없음)
- **vaul** — 하단 시트(bottom sheet)
- **react-markdown** + **remark-gfm** — 케이스 스터디 본문 렌더
- **js-yaml** — 케이스 스터디 frontmatter 파싱
- **class-variance-authority**, **tailwind-merge**, **@radix-ui/react-slot** — UI 프리미티브

## 디렉터리 구조

Feature-Sliced Design(FSD)의 변형을 Next.js App Router와 결합했다.

```
src/
  app/                  # App Router 라우트 + 페이지 전용 컴포넌트
    _components/         # 라우트 세그먼트에서 제외되는 private 폴더
      data/              # 도메인 데이터 (아카이브, 케이스 스터디 *.md)
      ui/                # 앱 전용 UI (갤러리, 프로젝트 상세/시트, 푸터)
      sections/          # 홈 섹션 조립
    case-study/[slug]/   # 케이스 스터디 상세 — SSG 풀페이지
    @modal/              # 병렬 라우트 슬롯 — 인터셉팅 하단 시트
    layout.tsx           # 루트 레이아웃
    globals.css          # Tailwind import + 테마 토큰
  shared/                # 도메인 비의존 재사용 레이어
    ui/                  # Container, Button, Badge, bottom-sheet 등
    utils/               # cn() 등 유틸
  fonts/                 # next/font/local 로 로드한 한글 폰트 (Pretendard, SUIT)
```

## 설계 결정

- **FSD 변형 배치** — 페이지 전용 컴포넌트는 해당 라우트 폴더의 `_components/`에 두고, 공유되면서 **도메인 비의존**인 것만 `shared/`로 승격한다. 브랜딩·네비가 박힌 컴포넌트는 전 라우트가 써도 도메인 종속이므로 `app/_components/ui/`에 남긴다.

- **프로젝트 상세: 인터셉팅 라우트 + 하단 시트** — 갤러리 카드의 소프트 내비게이션은 병렬 라우트 슬롯(`@modal/(.)case-study/[slug]`)이 가로채 vaul 기반 하단 시트로 띄우고, 직접 URL 진입·새로고침은 SSG 풀페이지(`case-study/[slug]`)로 렌더한다. vaul 직접 의존은 `shared/ui/bottom-sheet/`로 격리하고, 라우트 결합 로직(열림 상태·`router.back()`·포커스 복원)만 도메인 쪽에서 담당한다.

- **케이스 스터디 콘텐츠는 fs가 아니라 import로 읽는다** — `next.config.ts`의 turbopack 규칙이 `*.md`를 raw-loader로 문자열 모듈화하므로, 콘텐츠를 동적 import한 뒤 frontmatter를 js-yaml로 파싱한다. frontmatter가 프로젝트 메타(제목·스택·이미지·링크)의 단일 소스이고, dev에서 md 수정 시 HMR이 동작한다.

- **디자인 토큰 단일화** — 색·폰트·시트 지오메트리를 `globals.css`의 CSS 변수로 정의하고 Tailwind 클래스와 스크립트가 같은 변수를 참조한다. 회색은 `ash`, 강조는 `primary`(오렌지)/`secondary` 토큰 계열로 통일한다.

- **React Compiler** — `reactCompiler: true`로 메모이제이션을 컴파일러에 위임하고, 수동 `useMemo`/`useCallback`을 남발하지 않는다.

## 로컬 실행

Node.js 24.x 기준.

```bash
npm install
npm run dev      # 개발 서버 — http://localhost:4000
npm run build    # 프로덕션 빌드
npm run start    # 빌드된 서버 실행
npm run lint     # ESLint (flat config)
```
