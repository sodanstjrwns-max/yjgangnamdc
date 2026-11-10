// ===== 글 끝 상담 블록 (2026-11-10) =====
// 정보 글(용어 사전·블로그·가이드·증상·비교·대상) 본문 끝의 상담 연결 버튼. 측정 표시는 data-cta="article-end".
//  - 용어 사전 상세에는 글 끝 상담 블록이 없어 articleEndCta() 를 넣는다(dictionary.ts).
//  - 블로그 상세는 이미 있는 블록의 버튼에 속성만 달았다(blog.ts).
//  - 가이드·증상·비교·대상 페이지도 블록이 이미 있다. 이 템플릿 파일들은 마지막 커밋일이 곧 사이트맵 lastmod
//    (vite.config.ts SRC_FILES)라서 파일을 고치지 않고, layout() 이 본문을 받을 때 markArticleEndCta() 로 속성만 단다.
//  - 카카오 채널은 없는 병원이라 버튼을 만들지 않는다. 문구는 일반 정보 고지 + 문의 안내만(효과·결과 약속 금지).

import { naverMark } from '../lib/icons'
import { HOURS_LINES } from '../lib/hours'

export const ARTICLE_END_CTA = 'article-end'
const CTA_ATTR = `data-cta="${ARTICLE_END_CTA}"`
const CLINIC_TEL = '054-636-8222'
// 네이버 플레이스(지도) — layout.ts NAVER_MAP_URL 과 같은 주소
const NAVER_PLACE_URL = 'https://map.naver.com/p/entry/place/1099573867'

/** 글 끝 상담 블록 (제목 1줄 · 설명 1줄 · 버튼 3개). 흰 바탕 위 옅은 틸 면 — 기존 .royal-accent-bg·.btn-* 만 사용 */
export function articleEndCta(): string {
  // 줄바꿈은 문장·항목 단위로만 (inline-block 덩어리)
  const hours = HOURS_LINES.map(l => `<span class="inline-block">${l.day} ${l.time.replace(/\s+/g, '')}</span>`).join('')
  return `
      <!-- 글 끝 상담 블록 (2026-11-10) -->
      <aside class="mt-10 rounded-2xl royal-accent-bg px-6 py-7 md:px-10 md:py-9" aria-label="진료 문의 안내">
        <p class="font-serif text-2xl font-semibold text-charcoal leading-snug">직접 확인이 필요하다면</p>
        <p class="mt-3 text-[15px] text-gray-600 leading-relaxed"><span class="inline-block">이 글은 일반 정보입니다.</span> <span class="inline-block">내 상태는 진료실에서 확인해야 정확합니다.</span> <span class="inline-block">진료 시간 안에 강남치과의원으로 문의하세요.</span></p>
        <p class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-gray-500"><i class="far fa-clock text-royal/60" aria-hidden="true"></i><span class="sr-only">진료 시간</span>${hours}</p>
        <div class="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <a href="/reservation" ${CTA_ATTR} class="btn-primary"><i class="fas fa-calendar-check" aria-hidden="true"></i>상담 예약</a>
          <a href="tel:${CLINIC_TEL}" ${CTA_ATTR} class="btn-subtle" aria-label="전화 문의 ${CLINIC_TEL}"><i class="fas fa-phone text-royal" aria-hidden="true"></i>${CLINIC_TEL}</a>
          <a href="${NAVER_PLACE_URL}" ${CTA_ATTR} class="btn-subtle" target="_blank" rel="noopener noreferrer nofollow" aria-label="네이버 플레이스에서 강남치과의원 보기 (새 창)">${naverMark(13)}네이버 플레이스</a>
        </div>
      </aside>`
}

// 본문 끝에 예약·전화 블록이 이미 있는 프로그램형 정보 글 (상세 페이지만 — /guide, /symptom 같은 목록은 제외)
const MARK_PATHS = /^\/(guide|symptom|compare|audience)\/[^/]+/

/** 이미 있는 글 끝 블록의 예약·전화 버튼(본문에서 마지막 /reservation 링크와 마지막 tel: 링크)에 data-cta 를 단다 */
export function markArticleEndCta(content: string, pagePath: string): string {
  if (!MARK_PATHS.test(pagePath || '')) return content
  let out = content
  for (const needle of ['<a href="/reservation"', '<a href="tel:']) {
    const i = out.lastIndexOf(needle)
    if (i < 0) continue
    const end = out.indexOf('>', i)
    if (end < 0 || out.slice(i, end).includes('data-cta=')) continue
    out = `${out.slice(0, i)}<a ${CTA_ATTR}${out.slice(i + 2)}`
  }
  return out
}
