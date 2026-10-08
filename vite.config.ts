import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { execSync } from 'node:child_process'

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

export default defineConfig({
  define: {
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
