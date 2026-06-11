// next.config.ts의 turbopack rules에서 *.md를 raw-loader로 처리하므로
// md 모듈은 원문 문자열을 default export한다.
declare module '*.md' {
  const content: string;
  export default content;
}
