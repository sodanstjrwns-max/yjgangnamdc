// ===== 치과 용어 사전 보강 원고 (2026-10-08) =====
// D1 dictionary 행(용어명·분류·짧은 요약)은 그대로 두고, 상세 본문을 이 데이터로 덧씌운다(원격 D1 쓰기 없음).
// 용어 유형(type)별로 섹션 순서·소제목이 다르다 — 템플릿 유사도를 낮추기 위함.
//   disease: cause → signs → treat → prevent      procedure: when → steps → after → consider
//   material: uses → traits → care                 device: principle → experience → safety
//   anatomy: structure → role → clinical → care    admin: scope → process → tips
//   appliance: who → use → care                    habit: why → how → caution
// 검증: 용어당 본문 750~1,200자, 같은 유형 내 문자 5-gram Jaccard 0.30 미만, 의료광고 금지어 없음.
import b1 from './batch-1.json'
import b2 from './batch-2.json'
import b3 from './batch-3.json'
import b4 from './batch-4.json'
import b5 from './batch-5.json'
import b6 from './batch-6.json'

export interface DictSection { key: string; h: string; p?: string[]; li?: string[] }
export interface DictEnriched {
  slug: string
  type: 'disease' | 'procedure' | 'material' | 'device' | 'anatomy' | 'admin' | 'appliance' | 'habit'
  lead: string
  sections: DictSection[]
  faqs: { q: string; a: string }[]
  treatments: string[]
  related: string[]
}

const ALL = ([] as DictEnriched[]).concat(b1 as any, b2 as any, b3 as any, b4 as any, b5 as any, b6 as any)
export const DICT_ENRICHED: Record<string, DictEnriched> = Object.fromEntries(ALL.map(e => [e.slug, e]))
