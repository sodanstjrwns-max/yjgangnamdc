// ===== "영주 치과" 허브 내부 링크 (2026-10-08) =====
// 사이트 안의 관련 페이지가 대표 키워드 허브(/area/영주시)로 앵커 "영주 치과" 링크를 보낸다.
// 규칙: 한 페이지에 허브 링크 최대 2개(전역 푸터 1 + 본문 1), nofollow 금지, 허브 자신에는 넣지 않음.

export const HUB_PATH = `/area/${encodeURIComponent('영주시')}`
export const HUB_ANCHOR = '영주 치과'

const esc = (t: string) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function hubAnchor(cls = 'text-royal font-bold hover:underline'): string {
  return `<a href="${HUB_PATH}" class="${cls}">${HUB_ANCHOR}</a>`
}

/** slug 문자열 → 0..n-1 고정 값 (글마다 같은 문형이 반복되지 않도록) */
function slugHash(s: string, n: number): number {
  let h = 0
  for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h % n
}

/** 블로그 상세 본문 끝 지역 안내 1문장 (문형 4개 중 slug 해시로 고정) */
export function blogHubSentence(slug: string, topic?: string): string {
  const a = hubAnchor()
  const t = topic ? esc(topic) : ''
  const forms = [
    `강남치과의원은 ${a}를 찾는 영주·봉화·예천 주민분들께 ${t ? `${t} 진료와 ` : ''}내원 방법을 안내하고 있습니다.`,
    `영주에서 ${t ? `${t} ` : '치과 '}상담을 받을 곳을 찾고 계신다면 ${a} 안내에서 위치·진료시간·의료진을 한 번에 확인하실 수 있습니다.`,
    `대학로 217 택지 사거리에 있는 강남치과의원의 주차·진료시간·찾아오는 길은 ${a} 페이지에 정리해 두었습니다.`,
    `이 글의 내용을 직접 상담받고 싶은 영주 주민분은 ${a} 안내에서 진료 일정과 오시는 길을 먼저 확인해 보세요.`,
  ]
  return forms[slugHash(slug, forms.length)]
}

/** 블로그 상세: 작성자 박스 위 지역 안내 블록 */
export function blogHubBlock(slug: string, topic?: string): string {
  return `
      <!-- 지역 안내: "영주 치과" 허브 링크 (2026-10-08) -->
      <p class="mt-10 text-[15px] text-gray-600 leading-relaxed bg-snow-50 border border-gray-100 rounded-2xl px-5 py-4"><i class="fas fa-map-marker-alt text-royal/60 mr-2" aria-hidden="true"></i>${blogHubSentence(slug, topic)}</p>`
}
