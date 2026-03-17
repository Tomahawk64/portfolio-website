/**
 * @jest-environment node
 */

/**
 * Unit tests for the mailer escapeHtml helper (extracted for testing).
 * Run with: npm test
 */

// Inline the function under test (mirrors src/lib/mailer.ts)
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

describe('escapeHtml', () => {
  it('escapes ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapes less-than and greater-than', () => {
    expect(escapeHtml('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('escapes double quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("it's fine")).toBe('it&#039;s fine');
  });

  it('returns plain string unchanged', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('prevents XSS in email payloads', () => {
    const malicious = '<img src=x onerror="steal(document.cookie)">';
    const escaped = escapeHtml(malicious);
    expect(escaped).not.toContain('<');
    expect(escaped).not.toContain('>');
  });
});
