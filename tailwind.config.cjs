// 영주 강남치과의원 — 비주얼 시스템 v3 "필름: 일상으로의 복귀" (2026-11-05, 다크 + 세리프 Hahmlet)
// 팔레트: 먹색 바탕(bg) + 상아 글자(fg) + 로고 틸 한 가지(royal=teal). 그라데이션 글씨·네온·파티클·커서 금지.
// 옛 하위페이지의 text-charcoal/bg-white/text-gray-*/bg-lavender 가 그대로 다크 톤을 입도록 같은 이름을 뒤집어 재정의한다.
// (gray 스케일은 반전: gray-50 = 가장 어두운 면, gray-900 = 상아 글자. white 는 글자용 상아, bg-white 는 tailwind.css 끝에서 어두운 면으로 덮는다)
// 프로그램형 페이지(가이드·비교·증상·응급)가 쓰던 emerald/blue/purple/indigo 는 틸 스케일로, green/amber/red/orange 는 어두운 틴트 + 밝은 글자로 뒤집는다.
// Tailwind 3.4.17 = cdn.tailwindcss.com 과 같은 버전. 사이트맵 통계·검색엔진 Ping 유틸 페이지도 이 CSS 를 쓴다.
const tealScale = { 50: '#0F2325', 100: '#112E2F', 200: '#154443', 300: '#1C6A68', 400: '#168F8C', 500: '#10AFB2', 600: '#10AFB2', 700: '#5BD6D8', 800: '#8FE3E4', 900: '#BFEBEA', 950: '#DDF5F5' }
const dark = (tint, mid, light) => ({ 50: tint[0], 100: tint[1], 200: tint[2], 300: tint[3], 400: mid, 500: mid, 600: mid, 700: light[0], 800: light[1], 900: light[2], 950: light[3] })
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './public/static/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // 로고 틸(#10AFB2)이 어두운 바탕에서는 그대로 기본값. 50~300 은 어두운 틸 면, 900 은 밝은 틸 글자
        royal: { 50: '#0F2325', 100: '#112E2F', 200: '#154443', 300: '#1C6A68', 400: '#168F8C', DEFAULT: '#10AFB2', dark: '#3CC6C8', 900: '#BFEBEA' },
        teal: { DEFAULT: '#10AFB2', 2: '#5BD6D8', 3: '#0A6E6B' },
        charcoal: { DEFAULT: '#F3F0E9', light: '#DAD6CD', 800: '#CFCBC2', 700: '#B5B1A8' },
        ink: { DEFAULT: '#F3F0E9', 2: '#CFCBC2', 3: '#9A978F', 4: '#6B6964' },
        lavender: { DEFAULT: '#141819', light: '#111415', dark: '#181C1E' },
        snow: { DEFAULT: '#111415', 50: '#0D1011', 100: '#141819' },
        paper: { DEFAULT: '#0A0C0D', 2: '#111415', 3: '#181C1E' },
        deep: { DEFAULT: '#060708', 2: '#0D1011' },
        brass: '#C9A86A',
        white: '#F3F0E9',
        gray: {
          50: '#111415', 100: '#141819', 200: '#1F2426', 300: '#2E3437', 400: '#7E8489',
          500: '#9A978F', 600: '#ABA8A0', 700: '#CFCBC2', 800: '#DAD6CD', 900: '#F3F0E9', 950: '#FFFFFF',
        },
        emerald: tealScale, blue: tealScale, indigo: tealScale, purple: tealScale, sky: tealScale, cyan: tealScale, violet: tealScale,
        green: dark(['#10261A', '#143320', '#1A4A2E', '#23603C'], '#3DD68C', ['#6FE3AB', '#9EEEC7', '#C9F6DF', '#E4FBEE']),
        amber: dark(['#2A2210', '#3A2E12', '#5A4716', '#7A6020'], '#E5B04A', ['#F2C66B', '#F7D88E', '#FBE7B5', '#FDF3D9']),
        orange: dark(['#2C1E12', '#3E2A16', '#5E3F1E', '#7F5528'], '#F08A3C', ['#F5A866', '#F9C494', '#FCDDBF', '#FDEEDF']),
        red: dark(['#2B1412', '#3C1A16', '#5A241F', '#7A2F28'], '#E06B5A', ['#F08B7C', '#F6ABA0', '#FAC9C2', '#FDE5E1']),
        rose: dark(['#2B1416', '#3C1A1D', '#5A2428', '#7A2F35'], '#E06B7A', ['#F08B98', '#F6ABB4', '#FAC9CF', '#FDE5E8']),
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['Hahmlet', '"Noto Serif KR"', '"Apple SD Gothic Neo"', 'serif'],
        serif: ['Hahmlet', '"Noto Serif KR"', '"Apple SD Gothic Neo"', 'serif'],
        mono: ['"Pretendard Variable"', 'Pretendard', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
}
