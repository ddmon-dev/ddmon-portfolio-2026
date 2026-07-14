# 프론트엔드 개발자 이동희의 포트폴리오입니다

안녕하세요, 프론트엔드 개발자 이동희입니다.

다수의 지원서류를 검토하시느라 고생하시는 채용 담당자분들의 UX를 고려하였습니다. 피로하고 걸리적거리는 애니메이션보다 읽기 편한 사이트로 구성하였습니다. 스크롤 하시고, 읽으시고, 클릭하세요. 메뉴를 찾느라 에너지를 낭비하지 않으셨으면 좋겠습니다.

## 기술 스택

- **Next.js 16.2.6** (App Router, React Compiler)
- **React 19.2.4** / **TypeScript 5**
- **Tailwind CSS v4** — `@theme inline` 기반 디자인 토큰, PostCSS 플러그인만 사용(`tailwind.config` 없음)
- **vaul** — `BottomSheet` 컴포넌트 구현
- **react-markdown** + **remark-gfm** — 케이스 스터디 본문 렌더
- **js-yaml** — 케이스 스터디 frontmatter 파싱
- **class-variance-authority**, **tailwind-merge**, **@radix-ui/react-slot** — UI 프리미티브

## 프로젝트 구조

FSD 패턴을 Next.js App Router와 병행하였습니다. 페이지 전용 컴포넌트는 해당 라우트 폴더의 `_components/`에 두고, 공유 컴포넌트와 유틸리티는 `shared/`에 배치하였습니다.

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

## 설계 사항

- **네비게이션을 늘리지 않는 프로젝트 상세** — 갤러리 카드를 누르면 인터셉팅 라우트가 페이지 이동을 가로채 하단 시트로 상세를 엽니다. 새로고침·URL 직접 진입은 인터셉트되지 않고 SSG 풀페이지로 렌더돼, 시트가 뜨지 않는 경우까지 자연스럽게 이어집니다.

- **콘텐츠를 빠르게 고치는 케이스 스터디 파이프라인** — 케이스 스터디를 fs가 아니라 import로 읽어 HMR을 트리거하도록 했습니다. `next.config.ts`에서 `*.md`를 raw-loader로 문자열 모듈화해, 개발 서버에서 실시간으로 화면을 보며 콘텐츠를 작성할 수 있도록 했습니다.
