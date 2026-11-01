import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

// 사이트맵 lastmod 용 "실제 수정일" = 각 콘텐츠 소스 파일의 마지막 커밋일 (빌드 시점 git, 2026-10-08)
// git 을 못 쓰는 환경이면 빈 값 → src/seo.ts 의 수동 날짜로 폴백. new Date() 는 쓰지 않는다.
const SRC_FILES: Record<string, string> = {
  main: 'src/pages/main.ts',
  doctors: 'src/pages/doctors.ts',
  pricing: 'src/pages/pricing.ts',
  reservation: 'src/pages/reservation.ts',
  directions: 'src/pages/directions.ts',
  allPages: 'src/index.tsx',
  treatments: 'src/pages/treatments.ts',
  faq: 'src/pages/faq.ts',
  area: 'src/pages/area.ts',
  combo: 'src/pages/combo.ts',
  intent: 'src/pages/intent.ts',
  compare: 'src/pages/compare.ts',
  pillar: 'src/pages/pillar.ts',
  symptom: 'src/pages/symptom.ts',
  audience: 'src/pages/audience.ts',
  emergency: 'src/pages/emergency.ts',
  locality: 'src/pages/locality.ts',
}
function gitDate(path: string): string {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${path}"`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : ''
  } catch { return '' }
}
const SRC_DATES = Object.fromEntries(Object.entries(SRC_FILES).map(([k, p]) => [k, gitDate(p)]))

// 홈 스크롤 몰입 연출 정적 파일의 내용 해시 (?v= 캐시 버스팅 — 고정 버전 문자열 금지)
const fileHash = (f: string) => createHash('sha256').update(readFileSync(f)).digest('hex').slice(0, 10)

export default defineConfig({
  define: {
    __IMMERSIVE_CSS_V__: JSON.stringify(fileHash('public/static/immersive.css')),
    __IMMERSIVE_JS_V__: JSON.stringify(fileHash('public/static/immersive.js')),
    // Tailwind 빌드 CSS(2026-11-01 CDN → 빌드): npm run build 가 css:build 를 먼저 실행하므로 항상 새 CSS 의 해시
    __TAILWIND_CSS_V__: JSON.stringify(fileHash('public/static/tailwind.css')),
    __SRC_DATES__: JSON.stringify(SRC_DATES)
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
