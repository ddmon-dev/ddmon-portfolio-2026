/**
 * URL 검색 파라미터를 안전하게 문자열로 변환합니다.
 *
 * Next.js의 searchParams는 string | string[] | undefined 타입이므로
 * 배열인 경우 첫 번째 값만 사용하고, undefined인 경우 기본값을 반환합니다.
 *
 * @param value - URL 검색 파라미터 값 (string, string 배열, 또는 undefined)
 * @param defaultValue - value가 없거나 빈 값일 때 사용할 기본값 (기본: '')
 * @returns 안전하게 변환된 문자열
 *
 * @example
 * ```typescript
 * // 단일 값
 * getSearchString('hello') // 'hello'
 *
 * // 배열 값 (첫 번째만 사용)
 * getSearchString(['hello', 'world']) // 'hello'
 *
 * // undefined 또는 빈 값
 * getSearchString(undefined) // ''
 * getSearchString(undefined, 'default') // 'default'
 *
 * // Next.js searchParams 사용 예시
 * const search = getSearchString(sp?.search);
 * const page = getSearchString(sp?.page, '1');
 * ```
 */

export function getSearchString(value: string | string[] | undefined, defaultValue = ''): string {
  if (!value) return defaultValue;

  if (Array.isArray(value)) {
    return value[0] || defaultValue;
  }

  return value;
}
