/**
 * 한국 전화번호 포맷팅 유틸리티
 * 
 * 작성 원리:
 * 1. Strategy Pattern: 전화번호 타입별로 다른 포맷팅 규칙 적용
 * 2. 정규식 기반 포맷팅: filter(Boolean).join("-") 패턴으로 동적 하이픈 삽입
 * 3. 길이별 동적 패턴: 서울(02)과 지역번호는 길이에 따라 다른 패턴 사용
 * 4. 타입 안정성: enum과 interface로 명확한 타입 정의
 * 
 * 전화번호 타입별 길이 규칙:
 * - MOBILE (010-019): 11자리 (3-4-4) - 01012345678 → 010-1234-5678
 * - SEOUL (02): 9-10자리 (2-3-4 또는 2-4-4) - 0212345678 → 02-1234-5678
 * - LOCAL (031-064): 10-11자리 (3-3-4 또는 3-4-4) - 0615155231 → 061-515-5231
 * - INTERNET (070): 11자리 (3-4-4) - 07012345678 → 070-1234-5678
 * - SPECIAL (15XX, 16XX): 8-12자리 (4-4-4) - 15881234 → 1588-1234
 */

export enum PhoneType {
  MOBILE = 'mobile',
  SEOUL = 'seoul', 
  LOCAL = 'local',
  INTERNET = 'internet',
  SPECIAL = 'special'
}

interface PhonePattern {
  maxLength: number;
  format: [number, number, number];
  formattedMaxLength: number;
}

const PHONE_PATTERNS: Record<PhoneType, PhonePattern> = {
  [PhoneType.MOBILE]: {
    maxLength: 11,
    format: [3, 4, 4],
    formattedMaxLength: 13
  },
  [PhoneType.SEOUL]: {
    maxLength: 10,
    format: [2, 4, 4],
    formattedMaxLength: 12
  },
  [PhoneType.LOCAL]: {
    maxLength: 11,
    format: [3, 4, 4], 
    formattedMaxLength: 13
  },
  [PhoneType.INTERNET]: {
    maxLength: 11,
    format: [3, 4, 4],
    formattedMaxLength: 13
  },
  [PhoneType.SPECIAL]: {
    maxLength: 12,
    format: [4, 4, 4],
    formattedMaxLength: 14
  }
};

const PHONE_REGEX_PATTERNS = {
  [PhoneType.MOBILE]: /^(\d{3})(\d{0,4})(\d{0,4})$/,
  [PhoneType.SEOUL]: {
    short: /^(\d{2})(\d{0,3})(\d{0,4})$/,
    long: /^(\d{2})(\d{0,4})(\d{0,4})$/
  },
  [PhoneType.LOCAL]: {
    short: /^(\d{3})(\d{0,3})(\d{0,4})$/,
    long: /^(\d{3})(\d{0,4})(\d{0,4})$/
  },
  [PhoneType.INTERNET]: /^(\d{3})(\d{0,4})(\d{0,4})$/,
  [PhoneType.SPECIAL]: /^(\d{4})(\d{0,4})(\d{0,4})$/
} as const;

function getPhoneType(phoneNumber: string): PhoneType {
  if (phoneNumber.startsWith('02')) {
    return PhoneType.SEOUL;
  }
  
  if (phoneNumber.startsWith('070')) {
    return PhoneType.INTERNET;
  }
  
  if (/^01[01679]/.test(phoneNumber)) {
    return PhoneType.MOBILE;
  }
  
  if (/^0[3-6]/.test(phoneNumber)) {
    return PhoneType.LOCAL;
  }
  
  if (/^(15|16|18)/.test(phoneNumber)) {
    return PhoneType.SPECIAL;
  }
  
  return PhoneType.MOBILE;
}

function applyFormatWithRegex(phoneNumber: string, phoneType: PhoneType): string {
  let pattern: RegExp;
  
  if (phoneType === PhoneType.SEOUL) {
    pattern = phoneNumber.length === 9 
      ? PHONE_REGEX_PATTERNS[PhoneType.SEOUL].short 
      : PHONE_REGEX_PATTERNS[PhoneType.SEOUL].long;
  }
  else if (phoneType === PhoneType.LOCAL) {
    pattern = phoneNumber.length === 10
      ? PHONE_REGEX_PATTERNS[PhoneType.LOCAL].short
      : PHONE_REGEX_PATTERNS[PhoneType.LOCAL].long;
  } 
  else {
    pattern = PHONE_REGEX_PATTERNS[phoneType] as RegExp;
  }
  
  return phoneNumber.replace(pattern, (_, g1: string, g2: string, g3: string) => 
    [g1, g2, g3].filter(Boolean).join("-")
  );
}

/**
 * @example
 * formatPhoneNumber('01012345678') // '010-1234-5678'
 * formatPhoneNumber('0212345678') // '02-1234-5678' 
 * formatPhoneNumber('0615155231') // '061-515-5231'
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');
  if (!phoneNumber) return '';
  
  const phoneType = getPhoneType(phoneNumber);
  const pattern = PHONE_PATTERNS[phoneType];
  const limitedPhoneNumber = phoneNumber.slice(0, pattern.maxLength);
  
  return applyFormatWithRegex(limitedPhoneNumber, phoneType);
}

export function unformatPhoneNumber(value: string): string {
  return value.replace(/[^\d]/g, '');
}

export function isValidPhoneNumber(value: string): boolean {
  const phoneNumber = unformatPhoneNumber(value);

  const regexes = [/^01[01679]\d{8}$/, /^02\d{7,8}$/, /^0(3[1-3]|4[1-4]|5[1-5]|6[1-4])\d{7,8}$/, /^0(50|70)\d{8}$/];

  return regexes.some(regex => regex.test(phoneNumber));
}

export function getPhoneNumberMaxLength(value: string): number {
  if (!value) return 13;

  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneType = getPhoneType(phoneNumber);
  const pattern = PHONE_PATTERNS[phoneType];
  
  return pattern.formattedMaxLength;
}
