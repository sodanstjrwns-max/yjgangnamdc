// ===== "영주 {진료}" 하위 페이지 사진 카드 (2026-10-14) =====
// /area/yeongju/* 8개 중 병원 주력(구강외과·디지털 보철) 기준 핵심 6개를 홈·허브(/area/영주시)에 사진 카드로 노출.
// 한 페이지 = 고유 대표 사진 1장 → og:image(1200×630 jpg) · 본문 H1 아래 첫 <img>(1200×630 webp) ·
// MedicalWebPage.image/primaryImageOfPage · sitemap-combo.xml image:image 네 곳에 같은 사진을 쓴다.
// 카드 썸네일은 같은 사진의 600×600 정사각 크롭. 한 줄 설명은 허브·진료 데이터의 기존 문장만 사용.
// 사진 출처: 원내 실사(public/static/photos/xfkmnFB6·yzSmZXZD) 2장 + 진료 소재 AI 이미지 4장(인물 없음, tools/subpage-cards/gen/yjgangnamdc/ 원본 보관).

const SITE = 'https://kndent.kr'

export interface YeongjuCard {
  slug: string        // /area/yeongju/{slug}
  name: string        // 카드 제목 = "영주 {진료}"
  tag: string
  line: string        // 기존 문구에서 가져온 한 줄
  title: string       // 페이지 <title>
  alt: string         // 대표 사진 alt (페이지 주제)
}

export const YEONGJU_CORE_CARDS: YeongjuCard[] = [
  { slug: 'implant', name: '영주 임플란트', tag: 'IMPLANT', line: '3D CT로 뼈의 높이·두께와 신경 위치를 확인한 뒤 식립 위치를 계획합니다.', title: '영주 임플란트 | 뼈·신경 위치 확인과 식립 계획 — 영주 강남치과의원', alt: '영주 임플란트 — 강남치과의원 진료실 유닛 체어와 진료 장비' },
  { slug: 'wisdom-tooth', name: '영주 사랑니 발치', tag: 'WISDOM TOOTH', line: '누워 있거나 묻힌 사랑니는 촬영으로 신경과의 거리를 보고 발치합니다.', title: '영주 사랑니 발치 | 매복 사랑니와 신경 거리 확인 — 영주 강남치과의원', alt: '영주 사랑니 발치 — 수술 기구가 준비된 진료실과 파노라마 X-ray 화면' },
  { slug: 'bone-graft', name: '영주 뼈이식 임플란트', tag: 'BONE GRAFT', line: '뼈가 부족해 바로 심기 어려운 경우 뼈이식을 함께 계획합니다.', title: '영주 뼈이식 임플란트 | 뼈가 부족할 때 확인할 점 — 영주 강남치과의원', alt: '영주 뼈이식 임플란트 — 뼈 높이·두께를 확인하는 3D CT 촬영 장비' },
  { slug: 'digital-prosthesis', name: '영주 디지털 보철', tag: 'CEREC', line: 'PrimeScan으로 입안을 스캔하고 CEREC MC X로 싱글 크라운을 원내에서 깎아 만듭니다.', title: '영주 디지털 보철 | 스캔·원내 제작 크라운 과정 — 영주 강남치과의원', alt: '영주 디지털 보철 — 구강 스캐너와 원내 밀링기로 만드는 세라믹 크라운' },
  { slug: 'invisalign', name: '영주 인비절라인', tag: 'INVISALIGN', line: 'iTero 스캔으로 치아 이동 계획을 3D로 미리 확인합니다.', title: '영주 인비절라인 | 3D 이동 계획과 내원 간격 — 영주 강남치과의원', alt: '영주 인비절라인 — 강남치과의원 1:1 상담실' },
  { slug: 'cosmetic', name: '영주 심미보철', tag: 'AESTHETIC', line: '라미네이트, 올세라믹, 지르코니아 크라운 중 치아 상태에 맞는 방법을 고릅니다.', title: '영주 심미보철 | 라미네이트·올세라믹 선택 기준 — 영주 강남치과의원', alt: '영주 심미보철 — 세라믹 크라운·라미네이트와 색상 가이드' },
]

// 카드에 없는 나머지 2개 하위 페이지 제목(꼬리 단축, 서로 다르게)
const OTHER_TITLES: Record<string, string> = {
  'cavity': '영주 충치치료 | 충치 깊이에 따른 치료 방법 — 영주 강남치과의원',
  'whitening': '영주 치아미백 | 변색 원인 확인과 미백 방법 — 영주 강남치과의원',
}

export const yeongjuCardImg = (slug: string) => ({
  og: `/static/img/cards/yeongju-${slug}-1200x630.jpg`,
  body: `/static/img/cards/yeongju-${slug}-1200.webp`,
  thumb: `/static/img/cards/yeongju-${slug}-600.webp`,
})

export function yeongjuCard(slug: string): YeongjuCard | undefined {
  return YEONGJU_CORE_CARDS.find(c => c.slug === slug)
}

/** /area/yeongju/{slug} 페이지 제목 (없으면 null → 기존 템플릿 제목) */
export function yeongjuComboTitle(slug: string): string | null {
  return yeongjuCard(slug)?.title || OTHER_TITLES[slug] || null
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// 사이트 토큰(2026-11-05 리디자인: 종이 #F5F3EC · 잉크 #14202A · 틸 #0E8F8B · 황동 라벨)에 맞춘 카드 전용 스타일 — 한 번만 출력(마크업·ItemList 는 불변)
const CARD_CSS = `<style>
.yj-cards{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:16px;list-style:none;margin:0;padding:0}
@media(min-width:560px){.yj-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:1024px){.yj-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}}
.yj-card{display:flex;flex-direction:column;height:100%;background:#fff;border:1px solid #D9D5C9;border-radius:14px;overflow:hidden;color:inherit;text-decoration:none;box-shadow:0 1px 0 rgba(20,32,42,.04),0 14px 32px -24px rgba(20,32,42,.28);transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease,border-color .3s ease}
.yj-card:hover,.yj-card:focus-visible{transform:translateY(-4px);border-color:rgba(14,143,139,.35);box-shadow:0 24px 56px -26px rgba(20,32,42,.42)}
.yj-card-img{position:relative;display:block;aspect-ratio:1/1;overflow:hidden;background:#ECE9E0}
.yj-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.yj-card:hover .yj-card-img img{transform:scale(1.04)}
.yj-card-no{position:absolute;left:12px;top:12px;padding:4px 8px;border-radius:4px;background:rgba(255,255,255,.9);font-family:'IBM Plex Mono',ui-monospace,Menlo,monospace;font-size:10px;font-weight:500;letter-spacing:.12em;color:#B48C4E}
.yj-card-body{display:flex;flex-direction:column;gap:6px;padding:16px 18px 18px}
.yj-card-title{font-family:Freesentation,'Pretendard Variable',Pretendard,sans-serif;font-size:1.12rem;font-weight:700;color:#14202A;line-height:1.3;letter-spacing:-.02em}
.yj-card:hover .yj-card-title{color:#0E8F8B}
.yj-card-line{font-size:.86rem;line-height:1.65;color:#66737C}
.yj-card-more{margin-top:4px;font-size:.78rem;font-weight:600;color:#0E8F8B}
.yj-combo-figure{margin:0 0 2.25rem;border-radius:14px;overflow:hidden;border:1px solid #D9D5C9;background:#ECE9E0;max-width:960px}
.yj-combo-figure img{display:block;width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover}
</style>`

/** 사진 카드 그리드(6장). idPrefix는 같은 페이지에서 id 중복 방지 */
export function yeongjuCardGrid(idPrefix: string): string {
  return `${CARD_CSS}
  <ul class="yj-cards" role="list">
    ${YEONGJU_CORE_CARDS.map((c, i) => {
      const img = yeongjuCardImg(c.slug)
      return `<li><a class="yj-card" href="/area/yeongju/${c.slug}" aria-labelledby="${idPrefix}-${c.slug}">
      <span class="yj-card-img"><img src="${img.thumb}" width="600" height="600" loading="lazy" decoding="async" alt="${esc(c.name)}"><span class="yj-card-no" aria-hidden="true">0${i + 1} · ${c.tag}</span></span>
      <span class="yj-card-body"><strong class="yj-card-title" id="${idPrefix}-${c.slug}">${esc(c.name)}</strong><span class="yj-card-line">${esc(c.line)}</span><span class="yj-card-more" aria-hidden="true">자세히 보기 →</span></span>
    </a></li>`
    }).join('\n    ')}
  </ul>`
}

/** 화면 카드와 1:1인 ItemList (같은 순서·이름·URL·사진) */
export function yeongjuCardItemListLd(pageUrl: string, name: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#yeongju-cards`,
    "name": name,
    "numberOfItems": YEONGJU_CORE_CARDS.length,
    "itemListElement": YEONGJU_CORE_CARDS.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "url": `${SITE}/area/yeongju/${c.slug}`,
      "image": `${SITE}${yeongjuCardImg(c.slug).thumb}`
    }))
  }
}

/** 하위 페이지 H1 바로 아래 대표 사진(og와 같은 사진·같은 크롭) */
export function yeongjuComboFigure(slug: string): string {
  const c = yeongjuCard(slug)
  if (!c) return ''
  return `${CARD_CSS}<figure class="yj-combo-figure"><img src="${yeongjuCardImg(slug).body}" width="1200" height="630" alt="${esc(c.alt)}" fetchpriority="high" decoding="async"></figure>`
}
