// ============================================================
// SEO 중앙 관리 모듈
// ------------------------------------------------------------
// ⚠️ 핵심 원칙: lastmod/lastReviewed에 new Date()를 절대 쓰지 않는다.
//   Google 공식 문서: "lastmod가 항상 현재 시각이면 신뢰할 수 없는
//   신호로 판단해 무시한다" → 콘텐츠가 실제로 바뀐 날짜만 기록.
//
// 콘텐츠를 실제로 수정한 배포 시점에 해당 섹션의 날짜만 갱신할 것.
// ============================================================

// 섹션별 콘텐츠 최종 수정일 (실제 콘텐츠 변경 시에만 갱신)
export const CONTENT_LASTMOD = {
  main: '2026-09-29',        // 메인/의료진/가격/예약/오시는길
  treatments: '2026-09-29',  // 진료과목 17개
  faq: '2026-05-15',         // FAQ 170개
  area: '2026-09-29',        // 지역 페이지 14개
  combo: '2026-04-08',       // 지역×진료 조합 112개
  intent: '2026-04-15',      // 의도형 키워드 448개
  compare: '2026-04-15',     // 비교 페이지 64개
  pillar: '2026-04-15',      // 필러 가이드 9개
  symptom: '2026-04-29',     // 증상 페이지 93개
  audience: '2026-09-29',    // 대상자 페이지 31개
  emergency: '2026-09-29',   // 응급 페이지 9개
  locality: '2026-05-15',    // 세부지역 122개
  dictionary: '2026-03-23',  // 치과용어사전 248개
} as const

// 의료 콘텐츠 최종 감수일 (전문의 감수 시점 — Schema.org lastReviewed용)
export const MEDICAL_LAST_REVIEWED = '2026-08-18'

// ============================================================
// 메타 설명 보강: 요약이 70자 미만이면 화면 본문 앞 문장을 이어 붙여 155자 이내로 (사실 문장만, 새 문구 없음)
// ============================================================
export function plainText(src: string): string {
  return String(src || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')      // 마크다운 이미지
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')    // 마크다운 링크 → 텍스트
    .replace(/^[#>*\-•\s]+/gm, '')                // 제목·인용·목록 기호
    .replace(/[*_`]+/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function fitMetaDesc(parts: Array<string | null | undefined>, max = 155): string {
  let out = ''
  for (const raw of parts) {
    const t = plainText(raw || '')
    if (!t || out.includes(t)) continue
    if (!out) { out = t } else {
      // 뒤 조각은 문장 단위로 필요한 만큼만
      const sents = t.split(/(?<=[.!?])\s+/)
      for (const sn of sents) {
        if (out.length >= 90) break
        out = `${out} ${sn.trim()}`
      }
    }
    if (out.length >= 90) break
  }
  if (out.length <= max) return out
  const cut = out.slice(0, max)
  const end = Math.max(cut.lastIndexOf('다.'), cut.lastIndexOf('요.'), cut.lastIndexOf('. '))
  if (end >= 70) return cut.slice(0, end + (cut[end] === '.' ? 1 : 2)).trim()
  const sp = cut.lastIndexOf(' ')
  return (sp >= 70 ? cut.slice(0, sp) : cut.slice(0, max - 1)).replace(/[\s,·—-]+$/, '') + '…'
}

/** 요약이 충분히 길면(70자+) 그대로, 짧거나 없으면 본문 앞 문장으로 보강 */
export function metaDescFrom(summary: string | null | undefined, body: string | null | undefined, fallback = ''): string {
  let s = plainText(summary || '')
  if (s.length >= 70) return s.length <= 155 ? s : fitMetaDesc([s])
  // 40자 미만 요약은 '○○ 차이' 같은 제목형 조각이라 문장 앞에 붙이면 어색 → 본문 문장만 사용
  if (s.length < 40 && plainText(body || '')) s = ''
  else if (s && !/[.!?。]$/.test(s)) s = `${s}.`
  return fitMetaDesc([s, body, fallback]) || fallback
}

// 사이트맵 인덱스 lastmod = 가장 최근 섹션 수정일
export const SITEMAP_INDEX_LASTMOD = Object.values(CONTENT_LASTMOD).sort().reverse()[0]

// ============================================================
// IndexNow (Bing / Naver / Seznam / Yandex 즉시 색인 프로토콜)
// ============================================================
// 키 검증: https://kndent.kr/{KEY}.txt 에서 키 본문이 응답되어야 함
export const INDEXNOW_KEY = 'a7f3e9c2b8d14e6f9a0c5b3d7e8f2a1c'

export const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',      // 공용 (모든 참여 엔진에 전파)
  'https://www.bing.com/indexnow',           // Bing 직접
  'https://searchadvisor.naver.com/indexnow' // Naver 직접
]

// IndexNow 기본 제출 대상 (핵심 페이지)
export const INDEXNOW_DEFAULT_URLS = [
  '/',
  '/treatments/implant',
  '/treatments/wisdom-tooth',
  '/treatments/invisalign',
  '/treatments/digital-prosthesis',
  '/pricing',
  '/faq',
  '/doctors',
  '/directions',
  '/blog',
]
