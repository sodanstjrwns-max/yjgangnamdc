// ============================================================
// 진료 시간 계산 (서버: KST) — 헤더 상태 칩·히어로 시간 카드의 초기 표시. 클라이언트 app.js 가 30초마다 같은 규칙으로 갱신한다.
//  - 평일 09:00–17:30, 접수 마감 17:00, 점심 13:00–14:00, 토·일·공휴일 휴무 (네이버 플레이스·기존 안내 문구 기준).
//  - 공휴일은 서버에서 판별하지 않는다(안내 문구에서 '토·일·공휴일 휴무'로 고지).
// ============================================================

export const HOURS = {
  open: 9, close: 17.5, lastCall: 17, lunchStart: 13, lunchEnd: 14,
}

export const WEEK = [
  { key: 'mon', label: '월', open: true },
  { key: 'tue', label: '화', open: true },
  { key: 'wed', label: '수', open: true },
  { key: 'thu', label: '목', open: true },
  { key: 'fri', label: '금', open: true },
  { key: 'sat', label: '토', open: false },
  { key: 'sun', label: '일·공휴', open: false },
] as const

export const HOURS_LINES = [
  { day: '월–금', time: '09:00 – 17:30' },
  { day: '접수 마감', time: '17:00' },
  { day: '점심시간', time: '13:00 – 14:00' },
  { day: '토·일·공휴일', time: '휴진' },
]

export function kstNow(): { day: number; h: number; m: number } {
  const t = new Date(Date.now() + 9 * 3600 * 1000)
  return { day: t.getUTCDay(), h: t.getUTCHours(), m: t.getUTCMinutes() }
}

const pad = (n: number) => String(n).padStart(2, '0')

/** 지금 상태 — 0=일 … 6=토. state: open | lunch | lastcall | before | after | closed */
export function todayStatus() {
  const { day, h, m } = kstNow()
  const idx = day === 0 ? 6 : day - 1
  const weekday = idx <= 4
  const now = h + m / 60
  let state: 'open' | 'lunch' | 'lastcall' | 'before' | 'after' | 'closed' = 'closed'
  if (weekday) {
    if (now < HOURS.open) state = 'before'
    else if (now < HOURS.lunchStart) state = 'open'
    else if (now < HOURS.lunchEnd) state = 'lunch'
    else if (now < HOURS.lastCall) state = 'open'
    else if (now < HOURS.close) state = 'lastcall'
    else state = 'after'
  }
  const text = {
    open: '진료중 · 접수 17:00까지',
    lunch: '점심시간 · 14:00 진료 재개',
    lastcall: '접수 마감 · 17:30 진료 종료',
    before: '오늘 09:00 진료 시작',
    after: '오늘 진료 종료',
    closed: '휴진 · 월요일 09:00 진료',
  }[state]
  const short = {
    open: '지금 진료중', lunch: '점심시간', lastcall: '접수 마감', before: '진료 시작 전', after: '오늘 진료 종료', closed: '오늘 휴진',
  }[state]
  return {
    idx, state, open: state === 'open', text, short,
    clock: `${pad(h)}:${pad(m)}`,
    label: WEEK[idx].label,
    sub: weekday ? '오늘 09:00 – 17:30 · 점심 13:00 – 14:00' : '토·일·공휴일 휴진 · 평일 09:00 – 17:30',
  }
}
