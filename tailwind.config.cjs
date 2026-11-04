// 영주 강남치과의원 — 비주얼 시스템 v2 "도면: 한 번에, 정확하게" (2026-11-05 전면 리디자인)
// 팔레트: 뼈빛 종이(paper) + 흑연 잉크(ink) + 로고 틸 한 가지(royal=teal). 그라데이션 글씨·네온·파티클·커서 금지.
// 옛 하위페이지의 text-royal/bg-lavender/text-charcoal/text-gray-* 가 그대로 새 톤을 입도록 같은 이름을 재정의한다.
// Tailwind 3.4.17 = cdn.tailwindcss.com 과 같은 버전. 사이트맵 통계·검색엔진 Ping 유틸 페이지도 이 CSS 를 쓴다.
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './public/static/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // 로고 틸(#10AFB2)을 기준으로 종이 위 대비가 나오게 한 단계 깊인 틸이 기본값
        royal: { 50: '#EEF6F5', 100: '#DCEDEC', 200: '#B6DCDA', 300: '#7FC4C2', 400: '#3FAAA8', DEFAULT: '#0E8F8B', dark: '#0A6E6B', 900: '#084F4D' },
        teal: { DEFAULT: '#0E8F8B', 2: '#0A6E6B', 3: '#10AFB2' },
        charcoal: { DEFAULT: '#14202A', light: '#1E2E3A', 800: '#28394A', 700: '#3A4852' },
        ink: { DEFAULT: '#14202A', 2: '#3A4852', 3: '#66737C', 4: '#9AA5AC' },
        lavender: { DEFAULT: '#ECE9E0', light: '#F5F3EC', dark: '#E2DED3' },
        snow: { DEFAULT: '#FFFFFF', 50: '#F5F3EC', 100: '#ECE9E0' },
        paper: { DEFAULT: '#F5F3EC', 2: '#ECE9E0', 3: '#E2DED3' },
        deep: { DEFAULT: '#0E2A32', 2: '#143944' },
        brass: '#B48C4E',
        gray: {
          50: '#F5F3EC', 100: '#ECE9E0', 200: '#D9D5C9', 300: '#B9BDBF', 400: '#8E989F',
          500: '#66737C', 600: '#4D5B65', 700: '#3A4852', 800: '#223240', 900: '#14202A', 950: '#0E161D',
        },
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['Freesentation', '"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
}
