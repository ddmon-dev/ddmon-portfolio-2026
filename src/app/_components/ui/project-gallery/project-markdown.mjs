const frontmatterPattern = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;

/**
 * @typedef {import('./types').ProjectFacts} ProjectFacts
 * @typedef {{ body: string; facts?: Partial<ProjectFacts> }} ParsedProjectMarkdown
 */

/**
 * 프로젝트 상세 마크다운에서 YAML frontmatter의 facts 블록과 본문을 분리한다.
 * 현재 포트폴리오 콘텐츠 용도에 맞춰 중첩 객체 1단계와 문자열 값만 지원한다.
 *
 * @param {string} markdown
 * @returns {ParsedProjectMarkdown}
 */
export function parseProjectMarkdown(markdown) {
  const match = markdown.match(frontmatterPattern);

  if (!match) {
    return { body: markdown, facts: undefined };
  }

  const facts = parseFacts(match[1]);
  const body = markdown.slice(match[0].length).trimStart();

  return {
    body,
    facts: Object.keys(facts).length > 0 ? facts : undefined,
  };
}

/**
 * @param {string} frontmatter
 * @returns {Partial<ProjectFacts>}
 */
function parseFacts(frontmatter) {
  /** @type {Record<string, string>} */
  const facts = {};
  let inFacts = false;

  for (const line of frontmatter.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    if (/^facts:\s*$/.test(line)) {
      inFacts = true;
      continue;
    }

    if (inFacts && /^\S/.test(line)) {
      break;
    }

    if (!inFacts) continue;

    const entry = line.match(/^\s{2}([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!entry) continue;

    const [, key, rawValue] = entry;
    facts[key] = parseScalar(rawValue);
  }

  return facts;
}

/**
 * @param {string} value
 */
function parseScalar(value) {
  const trimmed = value.trim();
  const quoted = trimmed.match(/^(['"])([\s\S]*)\1$/);

  return quoted ? quoted[2] : trimmed;
}
