// ============================================================
// 인라인 SVG 아이콘 (2026-11-05 리디자인) — 홈·헤더·푸터·하단바에서 Font Awesome 대신 쓰는 1.6px 선 아이콘.
//  - 문자열 템플릿 페이지라 그대로 문자열로 낸다. 크기는 CSS 가 정하고 size 로 고정할 수도 있다.
// ============================================================

const P: Record<string, string> = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  pin: '<path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  logout: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l5 4-5 4M20 12H9"/>',
  login: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M9 8l5 4-5 4M14 12H3"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h13"/>',
  map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  won: '<path d="M3 7l3 10 3-8 3 8 3-10M2 11h20M2 14h20"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7"/><path d="M12 17h.01"/>',
  blog: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h10M7 17h6"/>',
  car: '<path d="M5 16l1.5-5h11L19 16M3 16h18v3H3zM7 19v2M17 19v2"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',
  tooth: '<path d="M12 4c-2-1.5-6-1.5-7 2-1 3.5 1 7 2 12 .5 2 2 2 2.5 0 .5-2 1-4 2.5-4s2 2 2.5 4c.5 2 2 2 2.5 0 1-5 3-8.5 2-12-1-3.5-5-3.5-7-2z"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M3 12h18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  external: '<path d="M7 17 17 7M8 7h9v9"/>',
}

/** 선 아이콘 문자열 */
export function icon(name: string, opts: { size?: number; cls?: string } = {}): string {
  const d = P[name] || P.arrow
  const extra = (opts.cls ? ` class="${opts.cls.replace(/"/g, '')}"` : '') + (opts.size ? ` width="${Number(opts.size)}" height="${Number(opts.size)}"` : '')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${d}</svg>`
}

/** 네이버 'N' 마크 (면) */
export const naverMark = (size = 16) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="${size}" height="${size}" aria-hidden="true" focusable="false"><path d="M13.54 10.68 6.17 2H2v16h4.46V9.32L13.83 18H18V2h-4.46v8.68z" fill="currentColor"/></svg>`

/** 카카오 말풍선 (면) */
export const kakaoMark = (size = 18) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false"><path d="M12 3C6.48 3 2 6.58 2 10.98c0 2.83 1.86 5.3 4.66 6.7l-.98 3.63c-.08.3.26.54.52.37l4.3-2.86c.49.05.99.08 1.5.08 5.52 0 10-3.58 10-7.92S17.52 3 12 3z" fill="currentColor"/></svg>`
