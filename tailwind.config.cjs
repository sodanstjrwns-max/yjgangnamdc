// 영주 강남치과의원 — 비주얼 시스템 v3.1 "필름: 일상으로의 복귀 · 하얀 바탕" (2026-11-06)
// 이태형 원장 11/6 요청 "하얀 바탕이 더 낫다" → v3 의 레이아웃·서체(Hahmlet)·연출은 그대로, 색만 밝은 바탕으로.
// 팔레트: 흰 바탕 + 먹 글자 + 로고 틸 한 가지(royal=teal). 그라데이션 글씨·네온·파티클·커서 금지. 베이지(종이) 톤 쓰지 않음.
// 옛 하위페이지의 text-royal/bg-lavender/text-charcoal/text-gray-* 가 그대로 새 톤을 입도록 같은 이름을 재정의한다.
// 프로그램형 페이지(가이드·비교·증상)가 쓰던 emerald/blue/purple/indigo 는 로고 틸 스케일로 맞춘다(amber·red·green 등 경고색은 기본값 그대로).
// Tailwind 3.4.17 = cdn.tailwindcss.com 과 같은 버전. 사이트맵 통계·검색엔진 Ping 유틸 페이지도 이 CSS 를 쓴다.
const tealScale = { 50: '#EEF7F7', 100: '#D8EEEE', 200: '#B0DDDC', 300: '#7FC7C6', 400: '#3FAFAD', 500: '#129B98', 600: '#0E8F8B', 700: '#0A6E6B', 800: '#085856', 900: '#074645', 950: '#032827' }
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    './public/static/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // 로고 틸(#10AFB2)을 흰 바탕 위 대비가 나오게 한 단계 깊인 틸이 기본값
        royal: { 50: '#EEF7F7', 100: '#D8EEEE', 200: '#B0DDDC', 300: '#7FC7C6', 400: '#3FAFAD', DEFAULT: '#0E8F8B', dark: '#0A6E6B', 900: '#074645' },
        teal: { DEFAULT: '#0E8F8B', 2: '#0A6E6B', 3: '#10AFB2' },
        charcoal: { DEFAULT: '#15191C', light: '#262C30', 800: '#2E353A', 700: '#3D454A' },
        ink: { DEFAULT: '#15191C', 2: '#3D454A', 3: '#687176', 4: '#9AA2A7' },
        lavender: { DEFAULT: '#F2F4F4', light: '#F7F8F8', dark: '#E6E9EA' },
        snow: { DEFAULT: '#FFFFFF', 50: '#F7F8F8', 100: '#F2F4F4' },
        paper: { DEFAULT: '#FFFFFF', 2: '#F5F6F6', 3: '#ECEEEF' },
        deep: { DEFAULT: '#0E2A32', 2: '#143944' },
        brass: '#A88447',
        gray: {
          50: '#F7F8F8', 100: '#F0F1F2', 200: '#E3E5E7', 300: '#CDD1D4', 400: '#9AA1A6',
          500: '#6B7378', 600: '#50585D', 700: '#3B4247', 800: '#262C30', 900: '#15191C', 950: '#0B0E10',
        },
        emerald: tealScale, blue: tealScale, indigo: tealScale, purple: tealScale, sky: tealScale, cyan: tealScale, violet: tealScale,
      },
      // 진료 안내 히어로 오버레이 from-white/92 (기본 단계에 없어 클래스가 안 만들어지던 기존 버그, 2026-11-06)
      opacity: { 92: '0.92' },
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
