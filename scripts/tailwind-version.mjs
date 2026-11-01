// Tailwind 빌드 CSS 의 ?v= 내용 해시 확인용(고정 ?v= 금지). css:build 직후 실행.
// 실제 ?v= 는 vite.config.ts 의 __TAILWIND_CSS_V__ 가 빌드 때 같은 방식(sha256 앞 10자)으로 계산한다.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../public/static/tailwind.css', import.meta.url))
console.log(`tailwind.css ?v=${createHash('sha256').update(css).digest('hex').slice(0, 10)}`)
