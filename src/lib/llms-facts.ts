// ===== llms.txt · llms-full.txt 맨 위 '병원 정보' 표준 블록 (2026-11-10, SEO·AEO 1차 정비) =====
// AI 검색이 인용하는 사실(이름·주소·전화·진료 시간·의료진·주요 주소·공개 진료비)을 한곳에 같은 순서로 둔다.
// 값은 전부 사이트에 이미 있는 데이터에서 가져온다: 진료 시간=lib/hours.ts, 의료진=pages/doctors.ts,
// 진료 분야=진료 17종 제목, 진료비=/pricing 화면과 같은 공개 항목(수가 편집기에서 비공개로 돌린 항목은 들어오지 않는다).
// 없는 항목(야간 진료, 데이터 기준일)은 줄을 만들지 않는다.

import { HOURS_LINES } from './hours'
import { DOCTOR_LIST } from '../pages/doctors'

const SITE = 'https://kndent.kr'
// 아래 세 값은 layout.ts(푸터·병원 구조화 데이터)·directions.ts 화면 문구와 같다
const CLINIC_NAME_FULL = '강남치과의원 (Gangnam Dental Clinic)'
const CLINIC_ADDRESS = '경북 영주시 대학로 217, 2층 (택지 사거리 모모제인 건물)'
const CLINIC_TEL = '054-636-8222'
const NEAREST_STATION = '영주역(KTX) 하차 후 택시 약 10분'
// "영주 치과" 대표 허브 (/area/영주시 — canonical 과 같은 인코딩 주소)
const HUB_URL = `${SITE}/area/${encodeURIComponent('영주시')}`

type PriceCatLike = { title: string; ins?: boolean; items: { name: string; desc?: string; price: string; ins?: boolean }[] }

// 주요 비급여 항목 — 수가표 항목명 앞부분으로 찾는다. 공개 목록에 없으면 그 줄은 빠진다.
const KEY_PRICE_NAMES = ['Neo 임플란트', '뼈이식 (단순)', '지르코니아 크라운', '라미네이트', '인비절라인 (단순)', '고정식 교정']

const flat = (t: string) => String(t || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

function keyPriceLines(cats: PriceCatLike[] | undefined): string[] {
  if (!cats || !cats.length) return []
  const items = cats.filter(c => !c.ins).flatMap(c => c.items.filter(i => !i.ins))
  const lines: string[] = []
  for (const key of KEY_PRICE_NAMES) {
    const it = items.find(i => flat(i.name).startsWith(key))
    if (!it || !/\d/.test(it.price || '')) continue
    lines.push(`  - ${flat(it.name)}${it.desc ? ` (${flat(it.desc)})` : ''}: ${flat(it.price)}`)
  }
  return lines.length >= 3 ? lines : []
}

/** '## 병원 정보' 블록. treatments=진료 제목 목록, cats=/pricing 화면과 같은 공개 수가 목록 */
export function llmsFactBlock(opts: { treatments?: string[]; cats?: PriceCatLike[] }): string {
  const hours = HOURS_LINES.map(l => `${l.day} ${l.time.replace(/\s+/g, '')}`).join(' · ')
  const doctors = DOCTOR_LIST.map(d => `${d.name}(${d.title}·${d.specialty})`).join(', ')
  const fields = (opts.treatments || []).map(flat).filter(Boolean)
  const prices = keyPriceLines(opts.cats)
  const out = [
    '## 병원 정보',
    `- 이름: ${CLINIC_NAME_FULL}`,
    fields.length ? `- 진료 분야: 치과 — ${fields.join(', ')}` : '',
    `- 주소: ${CLINIC_ADDRESS} / 가까운 역: ${NEAREST_STATION}`,
    `- 전화: ${CLINIC_TEL}`,
    `- 진료 시간: ${hours}`,
    `- 의료진: ${doctors}`,
    `- 예약: ${SITE}/reservation`,
    `- 진료 안내: ${SITE}/treatments / 비용 안내: ${SITE}/pricing / 의료진: ${SITE}/doctors / 지역 안내(허브): ${HUB_URL} / 자주 묻는 질문: ${SITE}/faq`,
    ...(prices.length ? [`- 주요 비급여 진료비 (${SITE}/pricing 공개 항목과 같은 값, 실제 비용은 진단 후 확정):`, ...prices] : []),
  ]
  return out.filter(Boolean).join('\n') + '\n'
}

/** 제목·한 줄 소개(맨 위 '# ' 줄들) 바로 아래에 블록을 끼운다. 기존 내용은 그대로 아래에 남는다 */
export function withFactBlock(text: string, block: string): string {
  const i = text.indexOf('\n\n')
  if (i < 0) return `${block}\n${text}`
  return `${text.slice(0, i + 2)}${block}\n${text.slice(i + 2)}`
}
