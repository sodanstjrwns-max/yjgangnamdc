import { hubAnchor } from './hub-link'
// ============================================================================
// 세부 지역(동·읍·면) × 핵심진료 SEO 페이지 (Hyper-Local SEO 시즌 4)
// ============================================================================
// 목적: "가흥동 임플란트", "휴천동 치과", "풍기읍 사랑니",
//       "춘양 치과", "예천 풍양 임플란트" 등 동·읍·면 단위 hyper-local 검색 정복
// 전략: 32개 세부지역 × 6개 핵심진료 = 192개 추가 SEO 페이지
// URL: /local/:locality/:treatment 와 /local/:locality (인덱스)
// ============================================================================

interface LocalityInfo {
  slug: string                  // URL slug (영문)
  name: string                  // 표시명 (예: '가흥동')
  parentRegion: string          // 상위 지역명 (예: '영주시')
  parentSlug: string            // 상위 지역 slug (combo.ts와 매핑)
  type: '동' | '읍' | '면' | '리'
  driveTime: string             // 강남치과까지 소요시간
  driveKm: string               // 거리
  routeDesc: string             // 길찾기 설명
  landmarks: string[]           // 랜드마크
  searchKeywords: string[]      // 진입 키워드
  priority: 1 | 2 | 3           // 우선순위 (1=핵심, 2=중요, 3=확장)
}

// ===== 세부 지역 데이터 (32개) =====
const localityData: Record<string, LocalityInfo> = {
  // ===== 영주시 동 단위 (8개) — 시내 차로 5~15분 =====
  'gahung-dong': {
    slug: 'gahung-dong', name: '가흥동', parentRegion: '영주시', parentSlug: 'yeongju', type: '동',
    driveTime: '약 5분', driveKm: '약 2km',
    routeDesc: '가흥동에서 영주 시내 방면으로 차로 약 5분',
    landmarks: ['가흥교', '영주여중', '가흥체육공원', '가흥아파트'],
    searchKeywords: ['가흥동 치과', '가흥동 임플란트', '영주 가흥동 치과', '가흥 치과', '가흥1동 치과'],
    priority: 1
  },
  'hucheon-dong': {
    slug: 'hucheon-dong', name: '휴천동', parentRegion: '영주시', parentSlug: 'yeongju', type: '동',
    driveTime: '약 5분', driveKm: '약 1.5km',
    routeDesc: '휴천동에서 영주 시내 방면으로 차로 약 5분',
    landmarks: ['휴천체육공원', '영주문화회관', '영주역 인접'],
    searchKeywords: ['휴천동 치과', '휴천동 임플란트', '영주 휴천동 치과', '휴천 치과', '휴천1동 치과', '휴천2동 치과', '휴천3동 치과'],
    priority: 1
  },
  'sangmang-dong': {
    slug: 'sangmang-dong', name: '상망동', parentRegion: '영주시', parentSlug: 'yeongju', type: '동',
    driveTime: '약 7분', driveKm: '약 2.5km',
    routeDesc: '상망동에서 영주 시내 방면으로 차로 약 7분',
    landmarks: ['상망동 행정복지센터', '상망초등학교', '서천교'],
    searchKeywords: ['상망동 치과', '상망동 임플란트', '영주 상망동 치과'],
    priority: 1
  },
  'hamang-dong': {
    slug: 'hamang-dong', name: '하망동', parentRegion: '영주시', parentSlug: 'yeongju', type: '동',
    driveTime: '약 7분', driveKm: '약 2.5km',
    routeDesc: '하망동에서 영주 시내 방면으로 차로 약 7분',
    landmarks: ['하망동 행정복지센터', '영주시청 인접', '서천변'],
    searchKeywords: ['하망동 치과', '하망동 임플란트', '영주 하망동 치과', '하망1동 치과', '하망2동 치과'],
    priority: 1
  },
  'yeongju-dong': {
    slug: 'yeongju-dong', name: '영주동', parentRegion: '영주시', parentSlug: 'yeongju', type: '동',
    driveTime: '약 3분', driveKm: '약 1km',
    routeDesc: '영주동(원도심)에서 강남치과까지 차로 약 3분',
    landmarks: ['영주1동 행정복지센터', '구도심', '중앙시장'],
    searchKeywords: ['영주동 치과', '영주1동 치과', '영주2동 치과', '영주동 임플란트', '원도심 치과'],
    priority: 1
  },
  'jangsu-myeon': {
    slug: 'jangsu-myeon', name: '장수면', parentRegion: '영주시', parentSlug: 'yeongju', type: '면',
    driveTime: '약 15분', driveKm: '약 12km',
    routeDesc: '장수면에서 영주 시내 방면으로 차로 약 15분',
    landmarks: ['장수면사무소', '장수초등학교', '소룡사'],
    searchKeywords: ['장수면 치과', '영주 장수면 치과', '장수면 임플란트'],
    priority: 2
  },
  'munsu-myeon': {
    slug: 'munsu-myeon', name: '문수면', parentRegion: '영주시', parentSlug: 'yeongju', type: '면',
    driveTime: '약 15분', driveKm: '약 10km',
    routeDesc: '문수면에서 영주 시내 방면으로 차로 약 15분',
    landmarks: ['문수면사무소', '문수역', '월호리'],
    searchKeywords: ['문수면 치과', '영주 문수면 치과', '문수면 임플란트'],
    priority: 2
  },
  'pyeongeun-myeon': {
    slug: 'pyeongeun-myeon', name: '평은면', parentRegion: '영주시', parentSlug: 'yeongju', type: '면',
    driveTime: '약 25분', driveKm: '약 20km',
    routeDesc: '평은면에서 영주 시내 방면으로 차로 약 25분',
    landmarks: ['평은역', '평은면사무소'],
    searchKeywords: ['평은면 치과', '영주 평은면 치과'],
    priority: 2
  },

  // ===== 풍기읍 세부 (영주시 산하) — 차로 15~25분 =====
  'punggi-eup': {
    slug: 'punggi-eup', name: '풍기읍', parentRegion: '영주시', parentSlug: 'punggi', type: '읍',
    driveTime: '약 15분', driveKm: '약 12km',
    routeDesc: '풍기읍에서 28번 국도를 이용해 강남치과까지 약 15분',
    landmarks: ['풍기인삼시장', '풍기온천', '소백산국립공원', '풍기IC'],
    searchKeywords: ['풍기읍 치과', '풍기 치과', '풍기읍 임플란트', '풍기 임플란트', '풍기 인삼시장 치과'],
    priority: 1
  },

  // ===== 봉화 세부 읍·면 (4개) =====
  'bonghwa-eup': {
    slug: 'bonghwa-eup', name: '봉화읍', parentRegion: '봉화군', parentSlug: 'bonghwa', type: '읍',
    driveTime: '약 30분', driveKm: '약 25km',
    routeDesc: '봉화읍에서 36번 국도를 이용해 영주 강남치과까지 약 30분',
    landmarks: ['봉화군청', '봉화역', '청량산'],
    searchKeywords: ['봉화읍 치과', '봉화 치과', '봉화읍 임플란트', '봉화군청 치과'],
    priority: 1
  },
  'chunyang-myeon': {
    slug: 'chunyang-myeon', name: '춘양면', parentRegion: '봉화군', parentSlug: 'bonghwa', type: '면',
    driveTime: '약 50분', driveKm: '약 45km',
    routeDesc: '춘양면에서 36번 국도 → 봉화 → 영주 약 50분',
    landmarks: ['춘양역', '국립백두대간수목원', '춘양면사무소'],
    searchKeywords: ['춘양면 치과', '춘양 치과', '봉화 춘양 치과', '춘양 임플란트'],
    priority: 2
  },
  'beopjeon-myeon': {
    slug: 'beopjeon-myeon', name: '법전면', parentRegion: '봉화군', parentSlug: 'bonghwa', type: '면',
    driveTime: '약 40분', driveKm: '약 35km',
    routeDesc: '법전면에서 봉화 → 영주 강남치과까지 약 40분',
    landmarks: ['법전역', '법전면사무소'],
    searchKeywords: ['법전면 치과', '봉화 법전 치과'],
    priority: 3
  },
  'mulya-myeon': {
    slug: 'mulya-myeon', name: '물야면', parentRegion: '봉화군', parentSlug: 'bonghwa', type: '면',
    driveTime: '약 35분', driveKm: '약 30km',
    routeDesc: '물야면에서 봉화 → 영주 약 35분',
    landmarks: ['물야면사무소', '오전약수탕'],
    searchKeywords: ['물야면 치과', '봉화 물야 치과'],
    priority: 3
  },

  // ===== 예천 세부 읍·면 (3개) =====
  'yecheon-eup': {
    slug: 'yecheon-eup', name: '예천읍', parentRegion: '예천군', parentSlug: 'yecheon', type: '읍',
    driveTime: '약 35분', driveKm: '약 30km',
    routeDesc: '예천읍에서 28번 국도를 이용해 영주 강남치과까지 약 35분',
    landmarks: ['예천군청', '예천역', '예천시장'],
    searchKeywords: ['예천읍 치과', '예천 치과', '예천군청 치과', '예천읍 임플란트'],
    priority: 1
  },
  'pungyang-myeon': {
    slug: 'pungyang-myeon', name: '풍양면', parentRegion: '예천군', parentSlug: 'yecheon', type: '면',
    driveTime: '약 45분', driveKm: '약 40km',
    routeDesc: '풍양면에서 예천읍 경유 → 영주 약 45분',
    landmarks: ['풍양면사무소', '삼강주막', '회룡포'],
    searchKeywords: ['풍양면 치과', '예천 풍양 치과', '풍양면 임플란트'],
    priority: 2
  },
  'gamcheon-myeon': {
    slug: 'gamcheon-myeon', name: '감천면', parentRegion: '예천군', parentSlug: 'yecheon', type: '면',
    driveTime: '약 30분', driveKm: '약 28km',
    routeDesc: '감천면에서 영주 강남치과까지 차로 약 30분',
    landmarks: ['감천면사무소', '감천초등학교'],
    searchKeywords: ['감천면 치과', '예천 감천 치과'],
    priority: 3
  },

  // ===== 안동 세부 읍·면 (3개) =====
  'pungsan-eup': {
    slug: 'pungsan-eup', name: '풍산읍', parentRegion: '안동시', parentSlug: 'andong', type: '읍',
    driveTime: '약 40분', driveKm: '약 40km',
    routeDesc: '풍산읍에서 영주 강남치과까지 차로 약 40분',
    landmarks: ['풍산읍사무소', '안동하회마을', '안동KTX역 인접'],
    searchKeywords: ['풍산읍 치과', '안동 풍산 치과', '풍산 치과', '풍산 임플란트'],
    priority: 2
  },
  'iljik-myeon': {
    slug: 'iljik-myeon', name: '일직면', parentRegion: '안동시', parentSlug: 'andong', type: '면',
    driveTime: '약 50분', driveKm: '약 50km',
    routeDesc: '일직면에서 안동 → 영주 약 50분',
    landmarks: ['일직면사무소'],
    searchKeywords: ['일직면 치과', '안동 일직 치과'],
    priority: 3
  },
  'bukhu-myeon': {
    slug: 'bukhu-myeon', name: '북후면', parentRegion: '안동시', parentSlug: 'andong', type: '면',
    driveTime: '약 35분', driveKm: '약 32km',
    routeDesc: '북후면에서 영주 방면으로 약 35분',
    landmarks: ['북후면사무소', '학가산'],
    searchKeywords: ['북후면 치과', '안동 북후 치과'],
    priority: 3
  },

  // ===== 단양 세부 (3개) =====
  'danyang-eup': {
    slug: 'danyang-eup', name: '단양읍', parentRegion: '단양군', parentSlug: 'danyang', type: '읍',
    driveTime: '약 40분', driveKm: '약 40km',
    routeDesc: '단양읍에서 5번 국도 → 죽령터널 → 풍기 → 영주 약 40분',
    landmarks: ['단양군청', '단양역', '도담삼봉', '고수동굴'],
    searchKeywords: ['단양읍 치과', '단양 치과', '단양읍 임플란트', '단양군청 치과'],
    priority: 1
  },
  'maepo-eup': {
    slug: 'maepo-eup', name: '매포읍', parentRegion: '단양군', parentSlug: 'danyang', type: '읍',
    driveTime: '약 30분', driveKm: '약 28km',
    routeDesc: '매포읍에서 죽령 경유 영주까지 약 30분',
    landmarks: ['매포역', '매포읍사무소', '시멘트공장'],
    searchKeywords: ['매포읍 치과', '단양 매포 치과', '매포 치과'],
    priority: 2
  },
  'yeongchun-myeon': {
    slug: 'yeongchun-myeon', name: '영춘면', parentRegion: '단양군', parentSlug: 'danyang', type: '면',
    driveTime: '약 55분', driveKm: '약 55km',
    routeDesc: '영춘면에서 단양읍 경유 영주까지 약 55분',
    landmarks: ['영춘면사무소', '영춘초등학교'],
    searchKeywords: ['영춘면 치과', '단양 영춘 치과'],
    priority: 3
  },

  // ===== 문경 세부 (2개) =====
  'mungyeong-eup': {
    slug: 'mungyeong-eup', name: '문경읍', parentRegion: '문경시', parentSlug: 'mungyeong', type: '읍',
    driveTime: '약 50분', driveKm: '약 55km',
    routeDesc: '문경읍에서 중앙고속도로 → 영주IC까지 약 50분',
    landmarks: ['문경새재', '문경온천', '문경읍사무소'],
    searchKeywords: ['문경읍 치과', '문경 치과', '문경읍 임플란트', '문경새재 치과'],
    priority: 2
  },
  'jeomchon-dong': {
    slug: 'jeomchon-dong', name: '점촌동', parentRegion: '문경시', parentSlug: 'mungyeong', type: '동',
    driveTime: '약 50분', driveKm: '약 60km',
    routeDesc: '점촌동(문경 시내)에서 중앙고속도로 점촌함창IC → 영주IC 약 50분',
    landmarks: ['점촌역', '점촌중앙시장', '문경시청'],
    searchKeywords: ['점촌동 치과', '점촌 치과', '문경 점촌 치과', '점촌 임플란트'],
    priority: 2
  },

  // ===== 상주 세부 (1개) =====
  'hamchang-eup': {
    slug: 'hamchang-eup', name: '함창읍', parentRegion: '상주시', parentSlug: 'sangju', type: '읍',
    driveTime: '약 45분', driveKm: '약 55km',
    routeDesc: '함창읍에서 점촌함창IC → 영주IC까지 약 45분',
    landmarks: ['함창읍사무소', '함창역', '함창중앙시장'],
    searchKeywords: ['함창읍 치과', '상주 함창 치과', '함창 치과', '함창 임플란트'],
    priority: 2
  },

  // ===== 영양/청송/의성 일부 (확장 권역, 3개) =====
  'yeongyang-eup': {
    slug: 'yeongyang-eup', name: '영양읍', parentRegion: '영양군', parentSlug: 'yeongyang', type: '읍',
    driveTime: '약 1시간 10분', driveKm: '약 65km',
    routeDesc: '영양읍에서 안동 경유 → 영주 약 1시간 10분',
    landmarks: ['영양군청', '영양고추유통공사', '두들마을'],
    searchKeywords: ['영양읍 치과', '영양 치과', '영양군 치과', '영양읍 임플란트'],
    priority: 3
  },
  'cheongsong-eup': {
    slug: 'cheongsong-eup', name: '청송읍', parentRegion: '청송군', parentSlug: 'cheongsong', type: '읍',
    driveTime: '약 1시간 20분', driveKm: '약 75km',
    routeDesc: '청송읍에서 안동 경유 → 영주 약 1시간 20분',
    landmarks: ['청송군청', '주왕산국립공원', '청송사과'],
    searchKeywords: ['청송읍 치과', '청송 치과', '청송군 치과'],
    priority: 3
  },
  'uiseong-eup': {
    slug: 'uiseong-eup', name: '의성읍', parentRegion: '의성군', parentSlug: 'uiseong', type: '읍',
    driveTime: '약 1시간', driveKm: '약 60km',
    routeDesc: '의성읍에서 안동 경유 → 영주 약 1시간',
    landmarks: ['의성군청', '의성마늘', '의성역'],
    searchKeywords: ['의성읍 치과', '의성 치과', '의성군 치과', '의성 임플란트'],
    priority: 3
  },
}

// ===== 핵심 진료 (6개 — combo.ts의 8개 중 가장 검색량 많은 6개로 압축) =====
interface LocalTreatment {
  slug: string
  ko: string
  shortDesc: string
  price: string
  icon: string
}

const localTreatments: Record<string, LocalTreatment> = {
  'implant': { slug: 'implant', ko: '임플란트', shortDesc: '뼈이식까지 원스톱, 구강외과 전문의 직접 수술', price: '1개 130만원~', icon: 'fa-tooth' },
  'invisalign': { slug: 'invisalign', ko: '인비절라인', shortDesc: '투명교정 인증의, iTero 디지털 스캐너', price: '단순 650만원~', icon: 'fa-teeth-open' },
  'wisdom-tooth': { slug: 'wisdom-tooth', ko: '사랑니발치', shortDesc: '매복 사랑니까지 구강외과 전문의 직접 발치', price: '보험 적용 가능', icon: 'fa-tooth' },
  'digital-prosthesis': { slug: 'digital-prosthesis', ko: '디지털 보철', shortDesc: 'CEREC MC X 당일 크라운 가능', price: '지르코니아 50만원~', icon: 'fa-microscope' },
  'cosmetic': { slug: 'cosmetic', ko: '심미보철', shortDesc: '라미네이트 · 지르코니아 · 미백', price: '라미네이트 60만원~', icon: 'fa-smile' },
  'cavity': { slug: 'cavity', ko: '충치치료', shortDesc: '아말감/레진/인레이 모두 가능', price: '보험 적용 가능', icon: 'fa-tooth' },
}

// ===== Export Helpers =====

// 화면 FAQ와 FAQPage 스키마를 한 배열로 — 문항·답변 1:1 일치 (답변 HTML의 <strong> 등은 스키마에서 태그만 제거)
type LocFaq = { q: string; a: string }
const stripTags = (h: string) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
function renderLocFaqs(faqs: LocFaq[]): string {
  return faqs.map((f) => `
        <div>
          <p class="font-bold text-gray-900">Q. ${f.q}</p>
          <p class="text-gray-700 mt-1">A. ${f.a}</p>
        </div>`).join('')
}
function locFaqSchema(faqs: LocFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": stripTags(f.q),
      "acceptedAnswer": { "@type": "Answer", "text": stripTags(f.a) }
    }))
  }
}

export function getLocalitySlugs(): string[] {
  return Object.keys(localityData)
}

export function getLocalityTreatmentSlugs(): string[] {
  return Object.keys(localTreatments)
}

export function getLocalityInfo(slug: string): LocalityInfo | null {
  return localityData[slug] || null
}

// 사이트맵 생성용 — 우선순위별 정렬
export function getAllLocalityPaths(): { localitySlug: string; treatmentSlug?: string; priority: number }[] {
  const paths: { localitySlug: string; treatmentSlug?: string; priority: number }[] = []
  Object.entries(localityData).forEach(([locSlug, loc]) => {
    // 인덱스 (지역만)
    paths.push({ localitySlug: locSlug, priority: loc.priority })
    // 진료별 — priority 1은 6개 진료 전부, priority 2는 3개, priority 3은 1개
    const treatmentCount = loc.priority === 1 ? 6 : loc.priority === 2 ? 3 : 1
    const treatmentSlugs = Object.keys(localTreatments).slice(0, treatmentCount)
    treatmentSlugs.forEach(tSlug => {
      paths.push({ localitySlug: locSlug, treatmentSlug: tSlug, priority: loc.priority })
    })
  })
  return paths
}

// ===== Page Generators =====

// 세부 지역 인덱스 페이지 (예: /local/gahung-dong — 가흥동 모든 진료 안내)
export function localityPage(slug: string): { html: string; title: string; description: string; keywords: string; schemas: any[] } | null {
  const loc = localityData[slug]
  if (!loc) return null

  const allTreatments = Object.values(localTreatments)

  // Title/Description — 검색 친화적
  const title = `${loc.name} 치과 | 영주 강남치과의원 (차로 ${loc.driveTime}) · 구강외과 전문의`
  const description = `${loc.parentRegion} ${loc.name}에서 영주 강남치과의원까지 ${loc.driveTime}(${loc.driveKm}). ${loc.routeDesc}. 임플란트 1개 130만원, 인비절라인, 사랑니발치, 디지털보철. 구강악안면외과 전문의 2인 직접 진료. ☎ 054-636-8222`
  const keywords = [
    ...loc.searchKeywords,
    `${loc.name} 임플란트`, `${loc.name} 치과 추천`, `${loc.name} 치과 잘하는곳`,
    `${loc.name} 사랑니`, `${loc.name} 인비절라인`, `${loc.parentRegion} ${loc.name} 치과`,
    `${loc.name} 구강외과`, `${loc.name} 치과 가격`
  ].join(', ')

  const treatmentCardsHtml = allTreatments.map(t => `
    <a href="/local/${slug}/${t.slug}" class="block bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg rounded-xl p-5 transition group">
      <div class="flex items-start gap-3">
        <i class="fas ${t.icon} text-3xl text-blue-600 group-hover:scale-110 transition"></i>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900 mb-1">${loc.name} ${t.ko}</h3>
          <p class="text-sm text-gray-600 mb-2">${t.shortDesc}</p>
          <p class="text-sm font-bold text-blue-700">${t.price}</p>
        </div>
        <i class="fas fa-arrow-right text-gray-300 group-hover:text-blue-600 transition"></i>
      </div>
    </a>
  `).join('\n')

  const landmarkHtml = loc.landmarks.map(l => `<span class="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm mr-2 mb-2">${l}</span>`).join('')

  const hubFaqs: LocFaq[] = [
    { q: `${loc.name}에서 영주 강남치과까지 얼마나 걸리나요?`, a: `자가용으로 ${loc.driveTime}, 거리로는 ${loc.driveKm}입니다. ${loc.routeDesc}.` },
    { q: `${loc.name}에서 임플란트하러 굳이 영주까지 가야 할 이유가 있나요?`, a: `영주 강남치과는 ${loc.parentRegion} 일대에서 보기 드문 <strong>구강악안면외과 전문의 2인</strong>이 상주하는 치과입니다. 뼈가 부족해도 뼈이식·상악동(위턱 공간) 거상술이 동시 가능하고, 3D CT 정밀 진단 + 디지털 가이드로 식립 정확도가 높습니다. 대구·서울까지 가지 않아도 동일 수준의 진료를 받을 수 있습니다.` },
    { q: `${loc.name}에서 사랑니 뽑으러 가도 되나요? 매복 사랑니도 가능한가요?`, a: `네. 영주 강남치과는 구강악안면외과 전문의가 직접 발치합니다. 단순 사랑니부터 매복 사랑니(뿌리가 신경에 가까운 경우 포함)까지 모두 가능합니다. 보험 적용됩니다.` },
    { q: `${loc.name}에서 가는 길이 복잡하지 않나요?`, a: `${loc.routeDesc}. 네이버 지도/카카오맵에 "영주 강남치과의원" 검색하시면 가장 빠른 길로 안내됩니다. 주차장 완비.` },
  ]
  const html = `
<main class="bg-gradient-to-b from-blue-50 to-white">
  <section class="max-w-5xl mx-auto px-4 py-10">
    <nav class="text-sm text-gray-500 mb-4" aria-label="breadcrumb">
      <a href="/" class="hover:text-blue-600">홈</a> ›
      <a href="/local" class="hover:text-blue-600">지역별 안내</a> ›
      <span class="text-gray-900">${loc.name} 치과</span>
    </nav>

    <header class="mb-8" id="locality-hero">
      <p class="text-blue-600 font-bold mb-2"><i class="fas fa-map-marker-alt mr-1"></i>${loc.parentRegion} ${loc.name}</p>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-3" data-speakable>${loc.name} 치과 — 영주 강남치과의원</h1>
      <p class="text-lg text-gray-700 leading-relaxed" data-speakable>
        ${loc.name}에서 차로 <strong>${loc.driveTime}</strong>(${loc.driveKm}) 거리의 <strong>구강악안면외과 전문의 치과</strong>.
        ${loc.name} 주민을 위한 임플란트, 인비절라인, 사랑니발치, 디지털보철, 심미보철, 충치치료 종합 진료 제공합니다.
      </p>
      <p class="text-sm text-gray-600 mt-3"><i class="fas fa-circle-info text-blue-500 mr-1" aria-hidden="true"></i>병원 위치·진료시간·의료진 전체 안내는 ${hubAnchor('text-blue-700 font-bold hover:underline')} 페이지에 있습니다.</p>
    </header>

    <div class="grid md:grid-cols-3 gap-4 mb-10">
      <div class="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
        <p class="text-xs text-gray-500 mb-1"><i class="fas fa-car mr-1"></i>소요시간</p>
        <p class="text-2xl font-bold text-gray-900">${loc.driveTime}</p>
        <p class="text-sm text-gray-600 mt-1">${loc.driveKm}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
        <p class="text-xs text-gray-500 mb-1"><i class="fas fa-route mr-1"></i>경로</p>
        <p class="text-sm font-medium text-gray-900 leading-snug">${loc.routeDesc}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
        <p class="text-xs text-gray-500 mb-1"><i class="fas fa-landmark mr-1"></i>주요 랜드마크</p>
        <div>${landmarkHtml}</div>
      </div>
    </div>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-5" id="locality-treatments">${loc.name}에서 가장 많이 받는 진료 6선</h2>
      <div class="grid md:grid-cols-2 gap-4">
        ${treatmentCardsHtml}
      </div>
    </section>

    <section class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 mb-12">
      <h2 class="text-2xl font-bold mb-3">${loc.name} 주민이 영주 강남치과를 선택하는 이유</h2>
      <ul class="space-y-2 text-blue-50">
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i><strong>구강악안면외과 전문의 2인</strong> 직접 수술 — ${loc.parentRegion}/주변에 없는 희소 자원</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i><strong>3D CT + 디지털 임플란트 가이드</strong> 정밀 식립</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i><strong>뼈이식·상악동(위턱 공간) 거상술</strong> 동시 가능 — ${loc.name}에서 대구·서울 안 가도 됨</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i><strong>CEREC MC X 당일 크라운</strong> 시스템</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i><strong>인비절라인 인증의</strong> — iTero 스캐너로 5분 만에 시뮬레이션</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i>${loc.driveTime}만에 도착 — 시간 효율 최고</li>
      </ul>
      <div class="mt-6">
        <a href="tel:054-636-8222" class="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg mr-3">
          <i class="fas fa-phone mr-1"></i>054-636-8222
        </a>
        <a href="/reservation" class="inline-block bg-white hover:bg-blue-50 text-blue-700 font-bold px-6 py-3 rounded-lg">
          <i class="fas fa-calendar mr-1"></i>온라인 예약
        </a>
      </div>
    </section>

    <section class="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6 mb-8">
      <h2 class="text-xl font-bold text-yellow-900 mb-3"><i class="fas fa-question-circle mr-2"></i>자주 묻는 질문</h2>
      <div class="space-y-4">${renderLocFaqs(hubFaqs)}
      </div>
    </section>

    <section class="text-center text-gray-600 text-sm py-4">
      <p>📍 영주 강남치과의원 · 경북 영주시 대학로 217, 2층 (택지 사거리 모모제인 건물)</p>
      <p class="mt-1">📞 054-636-8222 · 진료 월~금 09:00~17:30 (점심 13:00~14:00)</p>
    </section>
  </section>
</main>
  `

  // ===== Schemas =====
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "지역별 안내", "item": "https://kndent.kr/local" },
        { "@type": "ListItem", "position": 3, "name": `${loc.name} 치과`, "item": `https://kndent.kr/local/${slug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "영주 강남치과의원",
      "url": `https://kndent.kr/local/${slug}`,
      "telephone": "+82-54-636-8222",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "대학로 217, 2층",
        "addressLocality": "영주시",
        "addressRegion": "경상북도",
        "postalCode": "36111",
        "addressCountry": "KR"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": `${loc.parentRegion} ${loc.name}`,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": loc.parentRegion
        }
      },
      "medicalSpecialty": ["Dentistry", "OralAndMaxillofacialSurgery", "Orthodontics", "CosmeticDentistry"]
    },
    locFaqSchema(hubFaqs),
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "url": `https://kndent.kr/local/${slug}`,
      "description": description,
      "audience": {
        "@type": "MedicalAudience",
        "geographicArea": {
          "@type": "AdministrativeArea",
          "name": `${loc.parentRegion} ${loc.name}`
        }
      },
      "about": [
        { "@type": "MedicalProcedure", "name": "임플란트" },
        { "@type": "MedicalProcedure", "name": "인비절라인" },
        { "@type": "MedicalProcedure", "name": "사랑니 발치" }
      ]
    }
  ]

  return { html, title, description, keywords, schemas }
}

// 세부 지역 × 진료 조합 페이지 (예: /local/gahung-dong/implant)
export function localityTreatmentPage(localitySlug: string, treatmentSlug: string): { html: string; title: string; description: string; keywords: string; schemas: any[] } | null {
  const loc = localityData[localitySlug]
  const t = localTreatments[treatmentSlug]
  if (!loc || !t) return null

  const title = `${loc.name} ${t.ko} | 영주 강남치과의원 (차로 ${loc.driveTime}) · ${t.price}`
  const description = `${loc.parentRegion} ${loc.name}에서 ${t.ko}는 영주 강남치과의원. ${t.shortDesc}. ${t.price}. ${loc.driveTime}(${loc.driveKm}) 거리, ${loc.routeDesc}. 구강악안면외과 전문의 2인 직접 진료. ☎ 054-636-8222`
  const keywords = [
    `${loc.name} ${t.ko}`, `${loc.name} ${t.ko} 가격`, `${loc.name} ${t.ko} 잘하는곳`,
    `${loc.name} ${t.ko} 추천`, `${loc.name} ${t.ko} 비용`,
    `${loc.parentRegion} ${loc.name} ${t.ko}`, `${loc.name} ${t.ko} 후기`,
    ...loc.searchKeywords.map(k => `${k} ${t.ko}`).slice(0, 3)
  ].join(', ')

  // 다른 진료 5개 (현재 제외)
  const otherTreatments = Object.values(localTreatments).filter(x => x.slug !== treatmentSlug)
  const otherCardsHtml = otherTreatments.map(ot => `
    <a href="/local/${localitySlug}/${ot.slug}" class="block bg-white border border-gray-200 hover:border-blue-500 rounded-lg p-3 transition">
      <i class="fas ${ot.icon} text-blue-600 mr-2"></i>
      <span class="font-medium text-gray-800">${loc.name} ${ot.ko}</span>
    </a>
  `).join('\n')

  const txFaqs: LocFaq[] = [
    { q: `${loc.name}에서 ${t.ko}하러 영주 강남치과까지 가는 게 효율적인가요?`, a: `네. ${loc.driveTime}이면 도착하고, ${loc.parentRegion} 일대에서 가장 가까운 <strong>구강악안면외과 전문의 치과</strong>입니다. 대구·서울에 가는 시간(2~3시간)에 비해 압도적으로 효율적입니다.` },
    { q: `${loc.name}에 다른 치과도 있는데 굳이 영주까지?`, a: `일반 치과는 ${loc.name} 동네에서도 충분하지만, <strong>${t.ko}처럼 정밀이 필요한 진료</strong>는 구강악안면외과 전문의가 있는 치과가 안전합니다. 영주 강남치과는 전문의 2인이 직접 진료하며, 3D CT/디지털 가이드/CEREC 등 대학병원급 장비를 운영합니다.` },
    { q: `${loc.name}에서 진료비 외 추가 비용 부담은?`, a: `${t.price}. 진료비 외 추가비용은 없습니다. 부분/전체 보험 적용 여부는 상담 시 정확히 안내드립니다.` },
    { q: `${loc.name}에서 한 번 가면 몇 번 더 와야 하나요?`, a: `${t.ko}는 보통 ${t.slug === 'implant' ? '3~6개월에 4~5회 내원' : t.slug === 'invisalign' ? '6개월~2년에 8~12회 내원' : t.slug === 'wisdom-tooth' ? '발치 1회 + 발사/소독 1~2회' : t.slug === 'digital-prosthesis' ? '당일 1회로 완료 가능 (CEREC)' : t.slug === 'cosmetic' ? '진단 + 시술 2~3회' : '1~2회'}이 필요합니다. ${loc.driveTime} 거리니까 부담스럽지 않습니다.` },
  ]
  const html = `
<main class="bg-gradient-to-b from-blue-50 to-white">
  <section class="max-w-5xl mx-auto px-4 py-10">
    <nav class="text-sm text-gray-500 mb-4" aria-label="breadcrumb">
      <a href="/" class="hover:text-blue-600">홈</a> ›
      <a href="/local" class="hover:text-blue-600">지역별 안내</a> ›
      <a href="/local/${localitySlug}" class="hover:text-blue-600">${loc.name}</a> ›
      <span class="text-gray-900">${t.ko}</span>
    </nav>

    <header class="mb-8">
      <p class="text-blue-600 font-bold mb-2">
        <i class="fas fa-map-marker-alt mr-1"></i>${loc.parentRegion} ${loc.name}
        <span class="text-gray-400 mx-2">·</span>
        <i class="fas fa-car mr-1"></i>${loc.driveTime}
      </p>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-3" data-speakable>
        <i class="fas ${t.icon} text-blue-600 mr-2"></i>
        ${loc.name} ${t.ko}
      </h1>
      <p class="text-2xl text-blue-700 font-bold mb-4">${t.price}</p>
      <p class="text-lg text-gray-700 leading-relaxed" data-speakable>
        ${loc.name}에서 ${t.ko}를 찾으신다면 차로 <strong>${loc.driveTime}</strong> 거리의 <strong>영주 강남치과의원</strong>.
        ${t.shortDesc}. 구강악안면외과 전문의 2인이 상주하는 ${loc.parentRegion} 일대 희소 치과입니다.
      </p>
      <p class="text-sm text-gray-600 mt-3"><i class="fas fa-circle-info text-blue-500 mr-1" aria-hidden="true"></i>${t.ko} 진료 위치·주차·진료시간은 ${hubAnchor('text-blue-700 font-bold hover:underline')} 안내에서 확인하실 수 있습니다.</p>
    </header>

    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 mb-10">
      <h2 class="text-2xl font-bold mb-3"><i class="fas fa-medal mr-2 text-yellow-300"></i>${loc.name} 주민이 영주 강남치과에서 ${t.ko}하는 이유</h2>
      <ul class="space-y-2 text-blue-50">
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i><strong>구강악안면외과 전문의 2인</strong>이 직접 진료</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i>3D CT · iTero · CEREC MC X · PrimeScan 등 대학병원급 장비</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i>${loc.driveTime}만에 도착 — ${loc.parentRegion}에서 가장 가까운 전문의 치과</li>
        <li><i class="fas fa-check-circle text-yellow-300 mr-2"></i>${t.ko} 외 임플란트·사랑니·인비절라인 등 종합 진료 원스톱</li>
      </ul>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="tel:054-636-8222" class="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg">
          <i class="fas fa-phone mr-1"></i>054-636-8222
        </a>
        <a href="/reservation" class="inline-block bg-white hover:bg-blue-50 text-blue-700 font-bold px-6 py-3 rounded-lg">
          <i class="fas fa-calendar mr-1"></i>온라인 예약
        </a>
        <a href="/treatments/${t.slug}" class="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold px-6 py-3 rounded-lg">
          <i class="fas fa-book mr-1"></i>${t.ko} 상세 안내
        </a>
      </div>
    </div>

    <section class="grid md:grid-cols-2 gap-6 mb-10">
      <div class="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500">
        <h3 class="text-lg font-bold mb-3"><i class="fas fa-car mr-2 text-blue-600"></i>${loc.name}에서 오시는 길</h3>
        <p class="text-gray-700 mb-2"><strong>거리:</strong> ${loc.driveKm}</p>
        <p class="text-gray-700 mb-2"><strong>소요시간:</strong> ${loc.driveTime}</p>
        <p class="text-gray-700"><strong>경로:</strong> ${loc.routeDesc}</p>
        <p class="text-gray-500 text-sm mt-3"><i class="fas fa-info-circle mr-1"></i>주변 랜드마크: ${loc.landmarks.join(' · ')}</p>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6 border-t-4 border-green-500">
        <h3 class="text-lg font-bold mb-3"><i class="fas fa-tags mr-2 text-green-600"></i>${t.ko} 비용 안내</h3>
        <p class="text-2xl font-bold text-gray-900 mb-2">${t.price}</p>
        <p class="text-gray-700 text-sm">${t.shortDesc}</p>
        <a href="/pricing" class="inline-block mt-3 text-green-700 font-bold hover:underline">전체 가격표 보기 →</a>
      </div>
    </section>

    <section class="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6 mb-8">
      <h2 class="text-xl font-bold text-yellow-900 mb-4"><i class="fas fa-question-circle mr-2"></i>${loc.name} ${t.ko} FAQ</h2>
      <div class="space-y-4">${renderLocFaqs(txFaqs)}
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-2xl font-bold text-gray-900 mb-5">${loc.name} 다른 진료도 함께 받기</h2>
      <div class="grid md:grid-cols-2 gap-3">
        ${otherCardsHtml}
      </div>
    </section>

    <section class="text-center text-gray-600 text-sm py-4">
      <p>📍 영주 강남치과의원 · 경북 영주시 대학로 217, 2층 (택지 사거리 모모제인 건물)</p>
      <p class="mt-1">📞 054-636-8222 · 진료 월~금 09:00~17:30 (점심 13:00~14:00)</p>
    </section>
  </section>
</main>
  `

  // ===== Schemas =====
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "지역별 안내", "item": "https://kndent.kr/local" },
        { "@type": "ListItem", "position": 3, "name": `${loc.name}`, "item": `https://kndent.kr/local/${localitySlug}` },
        { "@type": "ListItem", "position": 4, "name": t.ko, "item": `https://kndent.kr/local/${localitySlug}/${treatmentSlug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "name": `${loc.name} ${t.ko}`,
      "description": `${loc.parentRegion} ${loc.name} 주민을 위한 ${t.ko} - ${t.shortDesc}`,
      "procedureType": "https://schema.org/SurgicalProcedure",
      "url": `https://kndent.kr/local/${localitySlug}/${treatmentSlug}`,
      "performer": {
        "@type": "Dentist",
        "name": "영주 강남치과의원",
        "telephone": "+82-54-636-8222"
      }
    },
    locFaqSchema(txFaqs),
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "url": `https://kndent.kr/local/${localitySlug}/${treatmentSlug}`,
      "description": description,
      "audience": {
        "@type": "MedicalAudience",
        "geographicArea": {
          "@type": "AdministrativeArea",
          "name": `${loc.parentRegion} ${loc.name}`
        }
      },
      "about": {
        "@type": "MedicalProcedure",
        "name": t.ko
      }
    }
  ]

  return { html, title, description, keywords, schemas }
}

// 인덱스 페이지 (/local — 모든 세부 지역 목록)
export function localityIndexPage(): { html: string; title: string; description: string; keywords: string } {
  const grouped: Record<string, LocalityInfo[]> = {}
  Object.values(localityData).forEach(loc => {
    if (!grouped[loc.parentRegion]) grouped[loc.parentRegion] = []
    grouped[loc.parentRegion].push(loc)
  })

  const groupHtml = Object.entries(grouped).map(([region, locs]) => `
    <section class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i>${region}
        <span class="ml-3 text-sm font-normal text-gray-500">${locs.length}개 지역</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-3">
        ${locs.map(loc => `
          <a href="/local/${loc.slug}" class="block bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-lg p-4 transition">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-gray-900">${loc.name}</h3>
                <p class="text-xs text-gray-500 mt-1">${loc.type} · ${loc.driveTime} · ${loc.driveKm}</p>
              </div>
              <i class="fas fa-arrow-right text-gray-300"></i>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `).join('')

  const html = `
<main class="bg-gray-50">
  <section class="max-w-6xl mx-auto px-4 py-10">
    <nav class="text-sm text-gray-500 mb-4">
      <a href="/" class="hover:text-blue-600">홈</a> ›
      <span class="text-gray-900">지역별 안내</span>
    </nav>

    <header class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-3" data-speakable>지역별 치과 안내</h1>
      <p class="text-lg text-gray-700" data-speakable>
        영주시 동 단위부터 봉화·예천·안동·단양·문경·상주 읍·면까지 — <strong>${Object.keys(localityData).length}개 세부 지역</strong>별 진료 안내
      </p>
    </header>

    ${groupHtml}

    <section class="bg-blue-600 text-white rounded-xl p-8 text-center mt-10">
      <h2 class="text-2xl font-bold mb-3">어디서 오시든 환영합니다</h2>
      <p class="mb-5 text-blue-100">구강악안면외과 전문의 2인 직접 진료 · 3D CT · CEREC · iTero</p>
      <a href="tel:054-636-8222" class="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-3 rounded-lg text-lg">
        <i class="fas fa-phone mr-1"></i>054-636-8222
      </a>
    </section>
  </section>
</main>
  `

  return {
    html,
    title: '지역별 치과 안내 | 영주·봉화·예천·안동·단양·문경·상주 32개 세부지역 — 영주 강남치과의원',
    description: '영주시 동 단위부터 봉화·예천·안동·단양·문경·상주 읍·면까지 32개 세부 지역별 치과 진료 안내. 가흥동·휴천동·풍기·봉화읍·예천읍·풍산읍·단양읍·문경읍·점촌·함창 등. 구강악안면외과 전문의 2인 직접 진료. ☎ 054-636-8222',
    keywords: '지역별 치과, 가흥동 치과, 휴천동 치과, 풍기 치과, 봉화 치과, 예천 치과, 안동 치과, 단양 치과, 문경 치과, 점촌 치과, 함창 치과, 풍산 치과, 매포 치과, 영양 치과, 청송 치과, 의성 치과'
  }
}
