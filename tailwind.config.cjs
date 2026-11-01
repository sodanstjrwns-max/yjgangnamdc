// 기존 CDN 인라인 tailwind.config(src/layout.ts)와 같은 테마를 빌드 단계에서 사용한다(2026-11-01 CDN → 빌드 CSS).
// Tailwind 3.4.17 = cdn.tailwindcss.com 과 같은 버전. 사이트맵 통계·검색엔진 Ping 유틸 페이지(기본 테마)도 이 CSS 를 쓴다(extend 라 기본 색 그대로).
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './public/static/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        royal: { 50: '#F3FBFB', 100: '#E2F5F5', 200: '#C3EBEB', 300: '#93DBDC', 400: '#4BC3C5', DEFAULT: '#10AFB2', dark: '#0C8385', 900: '#085759' },
        charcoal: { DEFAULT: '#1C1C1E', light: '#2a2a2a', 800: '#333333', 700: '#444444' },
        lavender: { DEFAULT: '#F3FBFB', light: '#F7FCFC', dark: '#E2F5F5' },
        snow: { DEFAULT: '#FFFFFF', 50: '#FAFBFC', 100: '#F5F6F8' },
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
      },
    },
  },
}
