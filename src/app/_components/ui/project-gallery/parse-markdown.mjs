import { load } from 'js-yaml';

const frontmatterPattern = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;

/**
 * @typedef {import('./types').ProjectFacts} ProjectFacts
 * @typedef {import('./types').ProjectImage} ProjectImage
 * @typedef {import('./types').ProjectLinks} ProjectLinks
 * @typedef {Omit<import('./types').Project, 'slug' | 'content'>} ProjectMeta
 * @typedef {{ meta: ProjectMeta; body: string }} ParsedProjectMarkdown
 */

const requiredFactKeys = /** @type {const} */ ([
  'period',
  'operation',
  'product',
  'contribution',
]);

/**
 * 프로젝트 상세 마크다운에서 YAML frontmatter(프로젝트 메타)와 본문을 분리한다.
 * frontmatter는 이 프로젝트 데이터의 단일 소스이므로, 필수 필드가 빠지면
 * 어느 필드가 문제인지 담아 throw 한다(빌드/렌더 시점에 즉시 드러난다).
 * slug은 파일명에서 파생하므로 여기서 다루지 않는다(호출측이 주입).
 *
 * @param {string} markdown
 * @returns {ParsedProjectMarkdown}
 */
export function parseProjectMarkdown(markdown) {
  const match = markdown.match(frontmatterPattern);

  if (!match) {
    throw new Error('프로젝트 md에 frontmatter가 없습니다.');
  }

  const data = load(match[1]);
  const meta = validateProjectMeta(data);
  const body = markdown.slice(match[0].length).trimStart();

  return { meta, body };
}

/**
 * @param {unknown} data
 * @returns {ProjectMeta}
 */
function validateProjectMeta(data) {
  if (!isRecord(data)) {
    throw new Error('frontmatter가 객체가 아닙니다.');
  }

  return {
    title: requireString(data, 'title'),
    category: requireString(data, 'category'),
    image: parseImage(data.image),
    stacks: parseStacks(data.stacks),
    ...(data.links !== undefined && { links: parseLinks(data.links) }),
    facts: parseFacts(data.facts),
  };
}

/**
 * @param {unknown} value
 * @returns {ProjectImage}
 */
function parseImage(value) {
  if (!isRecord(value)) {
    throw new Error('image가 객체가 아닙니다.');
  }

  return {
    src: requireString(value, 'image.src'),
    alt: typeof value.alt === 'string' ? value.alt : '',
    width: requireNumber(value, 'image.width'),
    height: requireNumber(value, 'image.height'),
  };
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function parseStacks(value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('stacks는 비어있지 않은 배열이어야 합니다.');
  }

  return value.map((stack, i) => {
    if (typeof stack !== 'string' || !stack.trim()) {
      throw new Error(`stacks[${i}]가 문자열이 아닙니다.`);
    }
    return stack;
  });
}

/**
 * @param {unknown} value
 * @returns {ProjectLinks}
 */
function parseLinks(value) {
  if (!isRecord(value)) {
    throw new Error('links가 객체가 아닙니다.');
  }

  /** @type {ProjectLinks} */
  const links = {};
  if (value.site !== undefined) links.site = requireString(value, 'links.site');
  if (value.repo !== undefined) links.repo = requireString(value, 'links.repo');
  return links;
}

/**
 * @param {unknown} value
 * @returns {ProjectFacts}
 */
function parseFacts(value) {
  if (!isRecord(value)) {
    throw new Error('facts가 객체가 아닙니다.');
  }

  const missing = requiredFactKeys.filter(
    key => typeof value[key] !== 'string' || !value[key].trim()
  );

  if (missing.length > 0) {
    throw new Error(
      `facts 필수 항목 누락: ${missing.join(', ')}` +
        ' (값이 숫자로 해석됐다면 따옴표로 감싸세요. 예: period: "2025.12")'
    );
  }

  return {
    period: /** @type {string} */ (value.period),
    operation: /** @type {string} */ (value.operation),
    product: /** @type {string} */ (value.product),
    contribution: /** @type {string} */ (value.contribution),
  };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} label
 * @returns {string}
 */
function requireString(obj, label) {
  const value = obj[label.split('.').pop()];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label}가 비어있지 않은 문자열이어야 합니다.`);
  }
  return value;
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} label
 * @returns {number}
 */
function requireNumber(obj, label) {
  const value = obj[label.split('.').pop()];
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`${label}가 숫자여야 합니다.`);
  }
  return value;
}
