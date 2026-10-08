// ===== 사이트 통합 검색 페이지 =====
// SEO 목적: WebSite SearchAction 스키마의 실제 타깃 (Google Sitelinks Search Box 자격)
// 검색 대상: 정적 페이지 인덱스 + D1 (blog_posts, notices, dictionary)

// 정적 페이지 검색 인덱스 (주요 페이지 수동 큐레이션)
interface SearchEntry {
  url: string
  title: string
  desc: string
  category: string
  keywords: string // 검색 매칭용 (소문자)
}

export const STATIC_SEARCH_INDEX: SearchEntry[] = [
  // 핵심 페이지
  { url: '/', title: '강남치과의원 홈', desc: '영주 구강악안면외과 전문의 2인 치과', category: '핵심', keywords: '홈 메인 강남치과 영주치과' },
  { url: '/doctors', title: '의료진 소개', desc: '구강악안면외과 전문의 2인 프로필', category: '핵심', keywords: '의료진 원장 의사 전문의 프로필' },
  { url: '/doctors/lee-taehyung', title: '이태형 대표원장', desc: '구강악안면외과 전문의, 고려대 구로병원', category: '핵심', keywords: '이태형 대표원장 구강외과' },
  { url: '/doctors/choi-minhye', title: '최민혜 원장', desc: '구강악안면외과 전문의, 인제대 백병원', category: '핵심', keywords: '최민혜 원장 구강외과' },
  { url: '/pricing', title: '진료 비용 안내', desc: '임플란트·교정·보철 등 비급여 진료비', category: '핵심', keywords: '비용 가격 진료비 수가 얼마' },
  { url: '/reservation', title: '예약/상담', desc: '전화 예약 및 온라인 상담 신청', category: '핵심', keywords: '예약 상담 신청 전화' },
  { url: '/directions', title: '오시는 길', desc: '경북 영주시 대학로 217, 주차 안내', category: '핵심', keywords: '오시는길 위치 주소 주차 지도 찾아오기' },
  { url: '/faq', title: '자주 묻는 질문 (FAQ)', desc: '진료 관련 질문 170개 모음', category: '핵심', keywords: 'faq 질문 궁금 문의' },
  // 진료과목
  { url: '/treatments/implant', title: '임플란트', desc: '구강외과 전문의 직접 수술, 130만원', category: '진료', keywords: '임플란트 인공치아 식립 뼈이식' },
  { url: '/treatments/digital-prosthesis', title: 'CEREC 디지털 보철', desc: '싱글 크라운 정밀 제작', category: '진료', keywords: '디지털보철 세렉 cerec 크라운 보철 당일' },
  { url: '/treatments/invisalign', title: '인비절라인 투명교정', desc: '인증의 직접 진료, iTero 스캐너', category: '진료', keywords: '인비절라인 투명교정 교정 치아교정' },
  { url: '/treatments/wisdom-tooth', title: '사랑니 발치', desc: '매복 사랑니 포함 전문의 발치', category: '진료', keywords: '사랑니 발치 매복 수술' },
  { url: '/treatments/cosmetic', title: '심미보철·라미네이트', desc: '지르코니아 크라운, 라미네이트', category: '진료', keywords: '심미보철 라미네이트 앞니 심미' },
  { url: '/treatments/cavity', title: '충치치료', desc: '레진·인레이·크라운 단계별 치료', category: '진료', keywords: '충치 치료 썩은이 카리에스' },
  { url: '/treatments/root-canal', title: '신경치료', desc: '자연치아 보존 신경치료', category: '진료', keywords: '신경치료 근관치료 엔도' },
  { url: '/treatments/crown', title: '크라운', desc: '지르코니아·골드 크라운', category: '진료', keywords: '크라운 씌우기 보철' },
  { url: '/treatments/resin', title: '레진 치료', desc: '충치 부위 레진 충전', category: '진료', keywords: '레진 충전 때우기' },
  { url: '/treatments/whitening', title: '치아미백', desc: '전문가 미백 시스템', category: '진료', keywords: '미백 화이트닝 하얀이' },
  { url: '/treatments/scaling', title: '스케일링', desc: '치석 제거, 연 1회 보험 적용', category: '진료', keywords: '스케일링 치석 잇몸관리' },
  { url: '/treatments/gum', title: '잇몸치료', desc: '치주염·치은염 치료', category: '진료', keywords: '잇몸 치주 치은염 치주염 피' },
  { url: '/treatments/tmj', title: '턱관절 치료', desc: '턱관절 장애 진단·치료', category: '진료', keywords: '턱관절 tmj 턱 통증 딱딱' },
  { url: '/treatments/bone-graft', title: '뼈이식', desc: '임플란트 위한 골이식술', category: '진료', keywords: '뼈이식 골이식 골재생' },
  { url: '/treatments/sinus-lift', title: '상악동(위턱 공간) 거상술', desc: '상악 임플란트 고난이도 수술', category: '진료', keywords: '상악동(위턱 공간) 거상술 사이너스' },
  { url: '/treatments/denture', title: '틀니', desc: '부분·전체 틀니, 보험 적용', category: '진료', keywords: '틀니 의치 덴쳐' },
  { url: '/treatments/prevention', title: '예방치료', desc: '불소도포·실란트', category: '진료', keywords: '예방 불소 실란트 검진' },
  // 지역
  { url: '/area/영주시', title: '영주시 치과', desc: '영주 시내 접근성 안내', category: '지역', keywords: '영주 영주시' },
  { url: '/area/풍기', title: '풍기 치과', desc: '풍기에서 15분', category: '지역', keywords: '풍기' },
  { url: '/area/봉화', title: '봉화 치과', desc: '봉화에서 30분', category: '지역', keywords: '봉화' },
  { url: '/area/예천', title: '예천 치과', desc: '예천에서 35분', category: '지역', keywords: '예천' },
  { url: '/area/안동', title: '안동 치과', desc: '안동에서 40분', category: '지역', keywords: '안동' },
  { url: '/area/단양', title: '단양 치과', desc: '단양에서 40분', category: '지역', keywords: '단양' },
  { url: '/area/영주혁신도시', title: '영주혁신도시 치과', desc: '혁신도시에서 10분', category: '지역', keywords: '혁신도시 영주혁신도시' },
  // 콘텐츠 허브
  { url: '/blog', title: '블로그', desc: '치과 건강 정보 칼럼', category: '콘텐츠', keywords: '블로그 칼럼 글' },
  { url: '/dictionary', title: '치과 용어사전', desc: '치과 용어 231개 해설', category: '콘텐츠', keywords: '용어 사전 용어사전 뜻' },
  { url: '/symptom', title: '증상별 안내', desc: '증상으로 찾는 치료법', category: '콘텐츠', keywords: '증상 아파요 시려요 통증' },
  { url: '/emergency/영주', title: '영주 응급치과', desc: '치과 응급상황 대처법', category: '콘텐츠', keywords: '응급 급해요 야간 주말' },
]

// 검색 실행 (정적 인덱스)
export function searchStatic(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const terms = q.split(/\s+/)
  return STATIC_SEARCH_INDEX
    .map(e => {
      const haystack = `${e.title} ${e.desc} ${e.keywords}`.toLowerCase()
      let score = 0
      for (const t of terms) {
        if (e.title.toLowerCase().includes(t)) score += 10
        else if (haystack.includes(t)) score += 3
      }
      return { entry: e, score }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(r => r.entry)
}

// 검색 결과 페이지 HTML
export function searchPage(query: string, staticResults: SearchEntry[], dbResults: { url: string; title: string; desc: string; category: string }[]): string {
  const all = [
    ...staticResults.map(e => ({ url: e.url, title: e.title, desc: e.desc, category: e.category })),
    ...dbResults
  ]
  const resultsHtml = all.length > 0 ? all.map(r => `
    <a href="${r.url}" class="block bg-white rounded-2xl border border-gray-100 p-6 hover:border-royal/30 hover:shadow-lg transition-all group">
      <div class="flex items-center gap-2 mb-2">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${r.category === '핵심' ? 'bg-royal/10 text-royal' : r.category === '진료' ? 'bg-amber-50 text-amber-600' : r.category === '지역' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}">${r.category}</span>
        <span class="text-gray-300 text-xs">${r.url}</span>
      </div>
      <h3 class="text-charcoal font-bold text-lg group-hover:text-royal transition-colors">${r.title}</h3>
      <p class="text-gray-400 text-sm mt-1">${r.desc}</p>
    </a>`).join('') : `
    <div class="text-center py-16">
      <p class="text-5xl mb-4">🔍</p>
      <p class="text-charcoal font-bold text-lg mb-2">"${query}" 검색 결과가 없습니다</p>
      <p class="text-gray-400 text-sm mb-8">다른 검색어로 시도하거나 아래 바로가기를 이용해보세요.</p>
      <div class="flex flex-wrap justify-center gap-2">
        ${['임플란트', '사랑니', '비용', '교정', '예약'].map(k => `<a href="/search?q=${encodeURIComponent(k)}" class="px-4 py-2 rounded-full bg-royal/5 text-royal text-sm font-bold hover:bg-royal/10 transition-colors">${k}</a>`).join('')}
      </div>
    </div>`

  return `
  <section class="relative subpage-hero pt-40 pb-12 overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-5">
      <h1 class="display-md text-charcoal mb-6">사이트 검색</h1>
      <form action="/search" method="get" role="search" class="relative">
        <input type="search" name="q" id="search-input" value="${query.replace(/"/g, '&quot;')}" placeholder="궁금한 진료, 증상, 비용을 검색하세요"
          class="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 focus:border-royal focus:outline-none text-lg" autofocus>
        <button type="submit" aria-label="검색" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl royal-grad text-white flex items-center justify-center"><i class="fas fa-search"></i></button>
      </form>
      ${query ? `<p class="text-gray-400 text-sm mt-4">"<strong class="text-charcoal">${query}</strong>" 검색 결과 <strong class="text-royal">${all.length}</strong>건</p>` : ''}
    </div>
  </section>
  <section class="py-12 bg-snow-50 min-h-[40vh]" aria-label="검색 결과">
    <div class="max-w-3xl mx-auto px-5 space-y-3">
      ${query ? resultsHtml : `
      <div class="text-center py-8">
        <p class="text-gray-400 text-sm mb-6">인기 검색어</p>
        <div class="flex flex-wrap justify-center gap-2">
          ${['임플란트 비용', '사랑니 발치', '인비절라인', '스케일링', '치아미백', '틀니', '잇몸치료', '예약'].map(k => `<a href="/search?q=${encodeURIComponent(k)}" class="px-4 py-2 rounded-full bg-white border border-gray-200 text-charcoal text-sm font-bold hover:border-royal hover:text-royal transition-colors">${k}</a>`).join('')}
        </div>
      </div>`}
    </div>
  </section>`
}
