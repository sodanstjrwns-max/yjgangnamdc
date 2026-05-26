// ============================================================================
// 지역 × 진료 조합 SEO 페이지 (Programmatic SEO 슈퍼업그레이드 2026-05)
// ============================================================================
// 목적: "영주 임플란트", "봉화 사랑니", "안동 인비절라인" 등
//       지역명+핵심진료 조합 검색어로 Google 1페이지 노출
// 전략: 13지역 × 8핵심진료 = 104개 고유 랜딩페이지 자동 생성
//       각 페이지마다 고유 콘텐츠 + 풍부한 Schema + 지역 맞춤 FAQ
// URL: /area/:region/:treatment
// ============================================================================

interface AreaSlim {
  name: string
  slug: string
  driveTime: string
  driveKm: string
  routeDesc: string
  routeHighway?: string
  priority: number
  lat: number
  lng: number
  landmarks: string[]
  population?: string
}

// 지역 데이터 (area.ts와 동기화 — slug 매핑용)
const areaMap: Record<string, AreaSlim> = {
  '영주시':       { name: '영주시',       slug: 'yeongju',           driveTime: '시내',         driveKm: '-',    routeDesc: '영주시내 어디서든 자가용 10분 이내',                                routeHighway: '중앙고속도로 영주IC에서 약 5분',  priority: 1, lat: 36.8057, lng: 128.7410, landmarks: ['영주역','영주시청','택지 사거리'], population: '약 10만 명' },
  '영주역':       { name: '영주역',       slug: 'yeongju-station',   driveTime: '약 10분',      driveKm: '약 4km',  routeDesc: 'KTX 영주역에서 택시 약 10분',                                       routeHighway: 'KTX 중앙선 영주역 하차',           priority: 1, lat: 36.8168, lng: 128.7177, landmarks: ['영주역','KTX 영주역'] },
  '풍기':         { name: '풍기',         slug: 'punggi',            driveTime: '약 15분',      driveKm: '약 12km', routeDesc: '풍기읍에서 28번 국도를 이용해 약 15분',                              routeHighway: '28번 국도 또는 중앙고속도로 풍기IC', priority: 1, lat: 36.8762, lng: 128.7260, landmarks: ['풍기인삼시장','풍기온천','소백산'], population: '약 1.5만 명' },
  '봉화':         { name: '봉화',         slug: 'bonghwa',           driveTime: '약 30분',      driveKm: '약 25km', routeDesc: '봉화읍에서 36번 국도를 이용해 약 30분',                              routeHighway: '36번 국도 영주 방면',              priority: 2, lat: 36.8930, lng: 128.7320, landmarks: ['봉화군청','청량산','분천역'],   population: '약 3만 명' },
  '예천':         { name: '예천',         slug: 'yecheon',           driveTime: '약 35분',      driveKm: '약 30km', routeDesc: '예천읍에서 28번 국도를 이용해 약 35분',                              routeHighway: '28번 국도 또는 중앙고속도로 영주IC', priority: 2, lat: 36.6570, lng: 128.4530, landmarks: ['예천군청','회룡포','삼강주막'], population: '약 5.5만 명' },
  '안동':         { name: '안동',         slug: 'andong',            driveTime: '약 40분',      driveKm: '약 45km', routeDesc: '안동시내에서 중앙고속도로를 이용해 영주IC까지 약 30분',                routeHighway: '중앙고속도로 안동IC → 영주IC',     priority: 2, lat: 36.5684, lng: 128.7294, landmarks: ['안동 하회마을','안동역','도산서원'], population: '약 15만 명' },
  '단양':         { name: '단양',         slug: 'danyang',           driveTime: '약 40분',      driveKm: '약 40km', routeDesc: '단양읍에서 5번 국도 → 죽령터널 → 풍기 경유 약 40분',                routeHighway: '5번 국도 죽령터널 또는 중앙고속도로 풍기IC', priority: 3, lat: 36.9847, lng: 128.3654, landmarks: ['단양 고수동굴','도담삼봉','죽령'], population: '약 2.8만 명' },
  '영덕':         { name: '영덕',         slug: 'yeongdeok',         driveTime: '약 1시간',     driveKm: '약 70km', routeDesc: '영덕읍에서 36번 국도를 이용해 봉화 경유 → 영주 약 1시간',             routeHighway: '36번 국도 → 봉화 경유 → 영주',    priority: 3, lat: 36.4153, lng: 129.3657, landmarks: ['영덕 블루로드','강구항'],          population: '약 3.5만 명' },
  '울진':         { name: '울진',         slug: 'uljin',             driveTime: '약 1시간 20분', driveKm: '약 90km', routeDesc: '울진읍에서 36번 국도 → 봉화 경유 → 영주 약 1시간 20분',              routeHighway: '36번 국도 → 봉화 경유 → 영주',    priority: 3, lat: 36.9930, lng: 129.4004, landmarks: ['울진 금강소나무숲길','덕구온천'], population: '약 4.8만 명' },
  '영주혁신도시': { name: '영주혁신도시', slug: 'yeongju-innovation', driveTime: '약 10분',      driveKm: '약 5km',  routeDesc: '영주혁신도시에서 영주 시내 방면으로 약 10분',                         priority: 1, lat: 36.8200, lng: 128.7500, landmarks: ['한국도로공사','농식품공무원교육원'], population: '약 1만 명' },
  '부석':         { name: '부석',         slug: 'buseok',            driveTime: '약 25분',      driveKm: '약 20km', routeDesc: '부석면에서 영주 시내 방면으로 약 25분',                                priority: 2, lat: 36.9960, lng: 128.6830, landmarks: ['부석사','소수서원','선비촌'] },
  '순흥':         { name: '순흥',         slug: 'sunheung',          driveTime: '약 20분',      driveKm: '약 15km', routeDesc: '순흥면에서 영주 시내 방면으로 약 20분',                                priority: 2, lat: 36.8790, lng: 128.6590, landmarks: ['소수서원','선비촌'] },
  '상주':         { name: '상주',         slug: 'sangju',            driveTime: '약 50분',      driveKm: '약 60km', routeDesc: '상주에서 중앙고속도로를 이용해 약 50분',                              routeHighway: '중앙고속도로 점촌함창IC → 영주IC', priority: 3, lat: 36.4107, lng: 128.1591, landmarks: ['상주 경천대','낙동강 자전거길'], population: '약 9.5만 명' },
  '문경':         { name: '문경',         slug: 'mungyeong',         driveTime: '약 50분',      driveKm: '약 55km', routeDesc: '문경에서 중앙고속도로를 이용해 약 50분',                              routeHighway: '중앙고속도로 점촌함창IC → 영주IC', priority: 3, lat: 36.5867, lng: 128.1867, landmarks: ['문경새재','문경온천'],          population: '약 7만 명' },
}

// slug → 지역 키 역매핑
const areaSlugToKey: Record<string, string> = Object.entries(areaMap).reduce((acc, [k, v]) => {
  acc[v.slug] = k
  // 한글 키도 지원 (URL 디코딩된 형태)
  acc[k] = k
  return acc
}, {} as Record<string, string>)

interface TreatmentInfo {
  slug: string                // URL용 (영문)
  koSlug: string              // 한글 별칭 (예: '임플란트')
  name: string                // 진료명
  shortName: string           // 짧은 이름
  icon: string                // FontAwesome
  category: 'core' | 'sub'    // 핵심/보조
  hero: string                // 메인 카피
  description: string         // 1-2줄 설명
  price?: string              // 가격
  duration?: string           // 치료기간/내원횟수
  features: string[]          // 핵심 특징 4-6개
  whyHere: string[]           // 우리 치과 선택 이유 (3-4개)
  keywords: string[]          // 진료별 롱테일 키워드 (지역명 결합용)
  faqs: { q: (area: string) => string; a: (area: string, driveTime: string) => string }[]
  procedureName: string       // MedicalProcedure schema name
  procedureType: string       // schema.org procedureType
  bodyLocation: string        // 시술 부위
  relatedSlugs: string[]      // 연관 진료
}

// 8개 핵심 진료 (지역 검색 빈도 높은 순)
const treatmentData: Record<string, TreatmentInfo> = {
  'implant': {
    slug: 'implant', koSlug: '임플란트', name: '임플란트', shortName: '임플란트', icon: 'fa-tooth', category: 'core',
    hero: '구강악안면외과 전문의 직접 수술 · 3D CT 정밀 진단',
    description: 'Neo/Osstem 임플란트 1개 130만원(맞춤 어버트먼트+지르코니아 크라운 포함). 뼈이식·상악동 거상술까지 원스톱.',
    price: '1개 130만원 (어버트먼트+지르코니아 크라운 포함)',
    duration: '3~6개월 (뼈 상태에 따라 다름)',
    features: [
      '구강악안면외과 전문의 2인 직접 수술',
      '3D CT + 디지털 임플란트 가이드 정밀 식립',
      '뼈이식 · 상악동 거상술 동시 가능',
      'Neo/Osstem 정품 임플란트 사용',
      '맞춤 어버트먼트 + 지르코니아 크라운 포함',
      '5년 정기검진 무료'
    ],
    whyHere: [
      '영주 유일 구강악안면외과 전문의 2인 상주',
      '뼈가 부족해도 뼈이식·상악동 수술로 임플란트 가능',
      '대학병원급 장비(3D CT, PrimeScan, CEREC) 완비',
      '대구·서울까지 가지 않아도 동일 수준 진료'
    ],
    keywords: ['임플란트', '임플란트 가격', '임플란트 잘하는곳', '임플란트 추천', '임플란트 비용', '뼈이식 임플란트', '상악동 임플란트', '구강외과 임플란트'],
    faqs: [
      {
        q: (a) => `${a}에서 임플란트 잘하는 치과는 어디인가요?`,
        a: (a, d) => `${a}에서 ${d} 거리의 영주 강남치과의원이 가장 가까운 구강악안면외과 전문의 치과입니다. 전문의 2인이 직접 수술하며, 3D CT 기반 디지털 가이드 임플란트, 뼈이식, 상악동 거상술까지 원스톱으로 가능합니다. Neo/Osstem 임플란트 1개 130만원(맞춤 어버트먼트+지르코니아 크라운 포함).`
      },
      {
        q: (a) => `${a}에서 임플란트 가격은 어느 정도인가요?`,
        a: (a) => `영주 강남치과의원은 ${a} 지역 환자분께도 동일하게 Neo/Osstem 임플란트 1개 130만원(맞춤 어버트먼트+지르코니아 크라운 포함)입니다. 뼈이식 추가 시 단순 50만원, 복합 80만원, 상악동 거상술 치조정 80만원·측방 150만원이 추가될 수 있습니다. CT 촬영 후 정확한 비용을 안내드립니다.`
      },
      {
        q: (a) => `${a}에서 뼈가 부족한데 임플란트 가능한가요?`,
        a: (a, d) => `가능합니다. ${a}에서 ${d} 거리의 영주 강남치과의원은 구강악안면외과 전문의가 직접 뼈이식·상악동 거상술을 시행합니다. 이는 일반치과에서 의뢰 없이 직접 수술 가능한 영역으로, 영주 지역에서 유일하게 전문의 2인이 상주하는 곳입니다.`
      },
      {
        q: (a) => `임플란트 수술 후 ${a}에서 사후관리는 어떻게 받나요?`,
        a: (a, d) => `임플란트 식립 후 골유합(2~6개월)까지는 정기 점검이 필요합니다. ${a}에서 ${d} 거리이므로 충분히 정기 내원 가능하며, 5년 무료 정기검진을 제공합니다. 응급 상황 시 054-636-8222로 전화 주시면 당일 진료 가능합니다.`
      }
    ],
    procedureName: '치과 임플란트 수술',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Jaw',
    relatedSlugs: ['bone-graft', 'sinus-lift', 'digital-prosthesis']
  },
  'invisalign': {
    slug: 'invisalign', koSlug: '인비절라인', name: '인비절라인 투명교정', shortName: '인비절라인', icon: 'fa-teeth', category: 'core',
    hero: '인비절라인 인증의 직접 진료 · iTero 3D 스캐너 시뮬레이션',
    description: '인비절라인 퍼스트 400만원, 단순 650만원, 복잡 700만원. 4~8주 간격 내원으로 멀리서도 가능.',
    price: '퍼스트 400만원 · 단순 650만원 · 복잡 700만원',
    duration: '6개월~2년 (치아 상태별)',
    features: [
      '인비절라인 인증의(Invisalign Certified) 직접 진료',
      'iTero 디지털 스캐너 3D 시뮬레이션',
      '교정 결과 미리보기 (ClinCheck)',
      '4~8주 간격 내원 (원거리 환자 친화적)',
      '식사·양치 시 분리 가능 (위생적)',
      '교정 검사비 20만원, 월 5만원 별도'
    ],
    whyHere: [
      '인비절라인 본사 인증의 직접 진료',
      'iTero 스캐너로 본뜨기 없이 편안한 진단',
      '교정 결과 3D로 미리 시뮬레이션 확인',
      '4~8주 간격 내원으로 원거리 환자도 부담 없음'
    ],
    keywords: ['인비절라인', '투명교정', '교정 가격', '치아교정', '교정 잘하는곳', '인비절라인 가격', '인증의', '교정 추천'],
    faqs: [
      {
        q: (a) => `${a}에서 인비절라인 받을 수 있는 치과가 있나요?`,
        a: (a, d) => `${a}에서 ${d} 거리의 영주 강남치과의원이 인비절라인 인증의가 직접 진료하는 가장 가까운 치과입니다. iTero 디지털 스캐너로 본뜨기 없이 3D 시뮬레이션을 제공하며, 교정 결과를 미리 확인할 수 있습니다.`
      },
      {
        q: (a) => `${a}에서 교정 다니려면 자주 가야 하나요?`,
        a: (a, d) => `인비절라인은 4~8주에 한 번 내원하면 됩니다. ${a}에서 ${d} 거리이므로 충분히 다니실 수 있습니다. 일반 철사 교정과 달리 매달 가지 않아도 되어 원거리 환자분들이 선호하는 교정 방식입니다.`
      },
      {
        q: (a) => `${a}에서 인비절라인 비용은 얼마인가요?`,
        a: (a) => `영주 강남치과의원은 ${a} 환자분께도 동일하게 인비절라인 퍼스트 400만원, 단순 650만원, 복잡 700만원입니다. 교정 검사비 20만원과 월 관리비 5만원이 별도이며, 분할납부 가능합니다.`
      },
      {
        q: (a) => `${a}에서 청소년/성인 교정 둘 다 가능한가요?`,
        a: (a) => `네, 모두 가능합니다. 인비절라인은 영구치 완성 후 청소년부터 50대 이상 성인까지 폭넓게 적용됩니다. 인비절라인 인증의가 ${a} 환자분의 치아 상태와 생활 패턴에 맞춰 최적의 교정 계획을 수립합니다.`
      }
    ],
    procedureName: '인비절라인 투명교정',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Mouth',
    relatedSlugs: ['cosmetic', 'whitening']
  },
  'wisdom-tooth': {
    slug: 'wisdom-tooth', koSlug: '사랑니', name: '사랑니 발치', shortName: '사랑니 발치', icon: 'fa-hand-holding-medical', category: 'core',
    hero: '구강외과 전문의 직접 시술 · 3D CT 신경관 분석',
    description: '매복 사랑니도 안전하게. 3D CT로 신경관 위치 정밀 분석 후 최소 절개 발치. 건강보험 적용.',
    price: '건강보험 적용 (난이도별 차등)',
    duration: '1회 (10~40분, 매복도에 따라)',
    features: [
      '구강악안면외과 전문의 직접 발치',
      '3D CT로 신경관 위치 정밀 분석',
      '최소 절개 · 최소 출혈 발치 술식',
      '완전매복 사랑니도 안전하게',
      '건강보험 적용 (난이도별 차등 적용)',
      '발치 후 통증·붓기 최소화 프로토콜'
    ],
    whyHere: [
      '구강악안면외과 전문의가 직접 시술',
      '3D CT 정밀 진단으로 신경 손상 위험 최소화',
      '매복·수평 사랑니도 대학병원 안 가도 됨',
      '응급 발치 가능 (예약 없이 당일 진료)'
    ],
    keywords: ['사랑니', '사랑니 발치', '매복 사랑니', '사랑니 비용', '사랑니 잘 빼는곳', '사랑니 추천', '구강외과 사랑니'],
    faqs: [
      {
        q: (a) => `${a}에서 사랑니 발치는 어디서 받아야 하나요?`,
        a: (a, d) => `매복 사랑니나 신경관에 가까운 사랑니는 구강악안면외과 전문의에게 받는 것이 안전합니다. ${a}에서 ${d} 거리의 영주 강남치과의원은 구강외과 전문의 2인이 3D CT로 신경관을 정밀 분석한 후 발치합니다.`
      },
      {
        q: (a) => `${a}에서 매복 사랑니도 발치 가능한가요?`,
        a: (a) => `네, 완전 매복·수평 매복 사랑니도 영주 강남치과의원에서 발치 가능합니다. ${a} 환자분이 대구·대학병원까지 가지 않으셔도, 구강악안면외과 전문의가 직접 시술합니다. 3D CT로 하치조신경관과의 거리를 정밀 분석 후 안전한 술식을 적용합니다.`
      },
      {
        q: (a) => `${a}에서 사랑니 발치 비용은?`,
        a: (a) => `사랑니 발치는 건강보험 적용 항목으로, 난이도에 따라 본인부담 1~5만 원 선입니다. 매복도가 높을 경우 X-ray·CT 비용이 추가될 수 있으며, ${a} 환자분도 동일 보험 기준이 적용됩니다.`
      },
      {
        q: (a) => `${a}에서 ${a} 출발 당일 사랑니 빼고 갈 수 있나요?`,
        a: (a, d) => `네, ${a}에서 ${d} 거리이므로 당일 진료 가능합니다. 054-636-8222로 미리 전화 주시면 진료 시간을 잡아드리며, 응급 발치는 예약 없이도 가능합니다. 발치 후 1~2시간 안정 후 귀가 가능합니다.`
      }
    ],
    procedureName: '사랑니 발치',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Tooth',
    relatedSlugs: ['implant', 'bone-graft']
  },
  'digital-prosthesis': {
    slug: 'digital-prosthesis', koSlug: '디지털보철', name: '디지털 보철 (CEREC)', shortName: '디지털 보철', icon: 'fa-bolt', category: 'core',
    hero: 'CEREC MC X + PrimeScan + SpeedFire · 정밀 싱글 크라운',
    description: 'PrimeScan 디지털 스캔으로 본뜨기 없이 편안하게. CEREC MC X로 정밀 크라운 제작.',
    price: '지르코니아 크라운 50만원',
    duration: '1~2회 내원',
    features: [
      'CEREC MC X 디지털 밀링 머신',
      'PrimeScan 디지털 인상 채득 (본뜨기 X)',
      'SpeedFire 고속 소결로',
      '싱글 크라운 정밀 제작',
      '구역질 없는 디지털 스캔',
      '자연치아와 동일한 색·형태'
    ],
    whyHere: [
      '대학병원급 CEREC 풀패키지 시스템',
      '본뜨기 없는 편안한 진료 (구역 환자 만족도 높음)',
      '내원 횟수 최소화 (원거리 환자 친화적)',
      '디지털 데이터로 정밀 색·형태 맞춤'
    ],
    keywords: ['디지털 보철', 'CEREC', '크라운', '세락', '지르코니아 크라운', '디지털 크라운', '싱글 크라운', '크라운 가격'],
    faqs: [
      {
        q: (a) => `${a}에서 CEREC 디지털 크라운 가능한 치과가 있나요?`,
        a: (a, d) => `${a}에서 ${d} 거리의 영주 강남치과의원이 CEREC MC X 디지털 시스템을 보유한 가장 가까운 치과입니다. PrimeScan으로 본뜨기 없이 디지털 스캔만으로 크라운을 제작합니다.`
      },
      {
        q: (a) => `${a}에서 본뜨기 없이 크라운 만들 수 있나요?`,
        a: (a) => `네, 영주 강남치과의원은 PrimeScan 디지털 스캐너로 본뜨기(인상 채득) 없이 크라운을 제작합니다. ${a} 환자분 중 구역질이 심하신 분도 편안하게 진료받으실 수 있습니다.`
      },
      {
        q: (a) => `${a}에서 크라운 가격은 얼마인가요?`,
        a: (a) => `영주 강남치과의원의 지르코니아 크라운은 ${a} 환자분께도 동일하게 50만원입니다. PFM(메탈) 크라운, 골드 크라운 등 재료별로 가격이 다르며, 신경치료가 동반될 경우 추가 비용이 있을 수 있습니다.`
      },
      {
        q: (a) => `${a}에서 멀어서 자주 못 오는데 크라운 가능한가요?`,
        a: (a, d) => `${a}에서 ${d} 거리이지만 디지털 보철은 보통 1~2회 내원으로 완성됩니다. 본뜨기→임시→완성에 보통 2회면 되어 ${a} 환자분도 부담 없이 진행 가능합니다.`
      }
    ],
    procedureName: 'CEREC 디지털 크라운',
    procedureType: 'https://schema.org/MedicalProcedure',
    bodyLocation: 'Tooth',
    relatedSlugs: ['crown', 'implant', 'cosmetic']
  },
  'cosmetic': {
    slug: 'cosmetic', koSlug: '심미보철', name: '심미보철 (라미네이트·올세라믹)', shortName: '심미보철', icon: 'fa-gem', category: 'core',
    hero: '라미네이트 60만원 · 올세라믹 크라운 · 자연치아와 구분 불가',
    description: '라미네이트, 올세라믹, 지르코니아 크라운으로 자연스러운 미소 디자인.',
    price: '라미네이트 60만원 · 지르코니아 50만원',
    duration: '2~3회 내원',
    features: [
      'CEREC 디지털 시스템 기반 정밀 제작',
      '라미네이트 60만원 (앞니 심미 개선)',
      '올세라믹 크라운 (자연색 재현)',
      '지르코니아 크라운 50만원 (강도+심미)',
      '디지털 시뮬레이션으로 결과 미리보기',
      '치아 삭제 최소화 술식'
    ],
    whyHere: [
      '디지털 시뮬레이션으로 결과 사전 확인',
      'CEREC 정밀 제작으로 자연치아와 구분 불가',
      '치아 삭제 최소화 (Minimal Prep)',
      '내원 횟수 최소화'
    ],
    keywords: ['심미보철', '라미네이트', '올세라믹', '지르코니아', '앞니 라미네이트', '심미치료', '라미네이트 가격', '심미 크라운'],
    faqs: [
      {
        q: (a) => `${a}에서 라미네이트 잘하는 치과가 있나요?`,
        a: (a, d) => `${a}에서 ${d} 거리의 영주 강남치과의원이 CEREC 디지털 라미네이트 시스템을 갖춘 가장 가까운 치과입니다. 라미네이트 1개 60만원으로, 앞니 4~6개 작업이 가장 많습니다.`
      },
      {
        q: (a) => `${a}에서 라미네이트 가격은 얼마인가요?`,
        a: (a) => `라미네이트는 ${a} 환자분께도 동일하게 1개 60만원입니다. 앞니 6개(라미네이트 4개+올세라믹 크라운 2개) 조합도 자주 시행하며, 디지털 시뮬레이션을 통해 결과를 미리 확인하실 수 있습니다.`
      },
      {
        q: (a) => `${a}에서 라미네이트는 얼마나 가나요?`,
        a: (a) => `라미네이트는 평균 10~15년 사용 가능하며, 관리 상태에 따라 더 오래 사용 가능합니다. ${a} 환자분도 정기 스케일링 시 함께 점검받으시면 됩니다.`
      },
      {
        q: (a) => `${a}에서 치아 삭제 적게 하는 라미네이트 가능한가요?`,
        a: (a) => `네, 영주 강남치과의원은 디지털 시뮬레이션 기반 Minimal Prep(최소 삭제) 술식을 적용합니다. ${a} 환자분의 치아 상태에 따라 무삭제 라미네이트도 검토 가능합니다.`
      }
    ],
    procedureName: '심미보철 (라미네이트·올세라믹)',
    procedureType: 'https://schema.org/MedicalProcedure',
    bodyLocation: 'Tooth',
    relatedSlugs: ['digital-prosthesis', 'whitening', 'invisalign']
  },
  'bone-graft': {
    slug: 'bone-graft', koSlug: '뼈이식', name: '뼈이식 임플란트', shortName: '뼈이식', icon: 'fa-bone', category: 'sub',
    hero: '구강악안면외과 전문의 전문 영역 · 뼈 부족도 임플란트 가능',
    description: '뼈가 부족해도 안전하게 뼈이식 후 임플란트. 단순 50만원, 복합 80만원.',
    price: '단순 뼈이식 50만원 · 복합 80만원',
    duration: '뼈이식 후 3~6개월 회복 후 임플란트',
    features: [
      '구강악안면외과 전문의 직접 수술',
      '자가골·동종골·합성골 맞춤 선택',
      '3D CT 기반 정밀 뼈량 측정',
      '단순 뼈이식 50만원 / 복합 80만원',
      '임플란트와 동시 시술 가능 (Immediate)',
      '상악동 거상술 동시 시행 가능'
    ],
    whyHere: [
      '뼈이식은 구강외과 전문의의 전문 영역',
      '대학병원급 3D CT로 뼈량 정밀 측정',
      '뼈이식+임플란트 원스톱 처리',
      '대학병원에 의뢰할 필요 없이 현장 시술'
    ],
    keywords: ['뼈이식', '뼈이식 임플란트', '뼈이식 가격', '잇몸뼈 부족', '잇몸뼈 이식', '치조골 이식', '골이식'],
    faqs: [
      {
        q: (a) => `${a}에서 뼈이식 임플란트 가능한 치과는?`,
        a: (a, d) => `뼈이식은 구강악안면외과 전문의의 전문 영역입니다. ${a}에서 ${d} 거리의 영주 강남치과의원은 전문의 2인이 직접 뼈이식 후 임플란트까지 원스톱으로 처리합니다.`
      },
      {
        q: (a) => `${a}에서 잇몸뼈가 부족한데 임플란트 가능한가요?`,
        a: (a) => `네, ${a} 환자분도 잇몸뼈가 부족하셔도 뼈이식 후 임플란트가 가능합니다. 영주 강남치과의원에서는 단순 뼈이식 50만원, 복합 뼈이식 80만원에 시행하며, 자가골·동종골·합성골 중 환자 상태에 맞게 선택합니다.`
      },
      {
        q: (a) => `${a}에서 뼈이식과 임플란트 동시 가능한가요?`,
        a: (a) => `대부분 가능합니다(Immediate Implantation). 3D CT로 뼈량을 정밀 측정 후 동시 시술 여부를 결정하며, ${a} 환자분의 내원 부담을 줄이기 위해 가능한 경우 동시 시술을 우선 권장합니다.`
      },
      {
        q: (a) => `뼈이식 후 회복은 얼마나 걸리나요?`,
        a: (a, d) => `뼈이식 후 3~6개월 정도 골유합 기간이 필요합니다. ${a}에서 ${d} 거리이므로 1~3개월 간격 정기 점검이 가능하며, 응급 시 054-636-8222로 연락 주시면 됩니다.`
      }
    ],
    procedureName: '치조골 이식술',
    procedureType: 'https://schema.org/SurgicalProcedure',
    bodyLocation: 'Jaw',
    relatedSlugs: ['implant', 'sinus-lift']
  },
  'cavity': {
    slug: 'cavity', koSlug: '충치치료', name: '충치치료', shortName: '충치치료', icon: 'fa-tooth', category: 'sub',
    hero: '레진·인레이·신경치료·크라운 · 디지털 정밀 진단',
    description: '충치 깊이에 따른 단계별 치료. 당일 레진부터 신경치료·크라운까지.',
    price: '레진 8~15만원 (보험 적용 시 차이)',
    duration: '1~3회 내원 (충치 단계별)',
    features: [
      '레진 · 인레이 · 크라운 단계별 치료',
      '디지털 X-ray + 구강스캔 정밀 진단',
      '당일 레진 치료 가능',
      '심부 충치 시 신경치료 후 크라운',
      '소아·청소년·성인 모두 가능',
      '미세현미경 정밀 시술'
    ],
    whyHere: [
      '디지털 진단으로 미세 충치까지 발견',
      '당일 치료로 ${a} 환자 부담 최소화',
      'CEREC 시스템으로 인레이/크라운 빠른 제작',
      '재발 방지 예방 프로그램'
    ],
    keywords: ['충치치료', '충치', '레진', '인레이', '충치 비용', '충치치료 가격', '아말감', '복합레진'],
    faqs: [
      {
        q: (a) => `${a}에서 충치치료 잘하는 치과 있나요?`,
        a: (a, d) => `${a}에서 ${d} 거리의 영주 강남치과의원은 디지털 X-ray와 구강스캔으로 미세한 충치까지 정밀 진단합니다. 당일 레진 치료부터 심부 충치 시 신경치료·크라운까지 단계별로 가능합니다.`
      },
      {
        q: (a) => `${a}에서 충치치료 비용은 얼마인가요?`,
        a: (a) => `레진 충전은 일반적으로 8~15만 원 선이며, 만 12세 이하는 광중합 복합레진이 건강보험 적용됩니다. ${a} 환자분도 동일 기준이며, 충치 크기·위치에 따라 비용이 결정됩니다.`
      },
      {
        q: (a) => `${a}에서 어린이 충치도 치료 가능한가요?`,
        a: (a, d) => `네, ${a}에서 ${d} 거리의 영주 강남치과의원에서는 소아 충치치료도 가능합니다. 광중합 복합레진(만 12세 이하 보험 적용), 실란트(예방 처치), 불소 도포까지 종합적으로 진행합니다.`
      },
      {
        q: (a) => `${a}에서 당일 충치치료 가능한가요?`,
        a: (a, d) => `네, ${a}에서 ${d} 거리이므로 미리 054-636-8222로 예약하시면 당일 레진 치료가 가능합니다. 신경치료가 필요한 심부 충치는 2~3회 내원이 필요합니다.`
      }
    ],
    procedureName: '충치 치료',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Tooth',
    relatedSlugs: ['resin', 'root-canal', 'crown']
  },
  'whitening': {
    slug: 'whitening', koSlug: '치아미백', name: '치아미백', shortName: '미백', icon: 'fa-sun', category: 'sub',
    hero: '전문의 관리 미백 · 전체 미백 60만원',
    description: '전문가 미백, 자가 미백, 듀얼 미백. 안전하고 효과적인 미백.',
    price: '전체 미백 60만원',
    duration: '1~3회 (전문가 미백)',
    features: [
      '전문의 관리 하 안전한 미백',
      '전문가 미백 (병원 내 시술)',
      '자가 미백 (홈케어 트레이)',
      '듀얼 미백 (병원+홈케어)',
      '시린 증상 최소화 프로토콜',
      '미백 후 관리 가이드'
    ],
    whyHere: [
      '전문의가 직접 미백 농도 조절',
      '시린 증상 최소화 프로토콜 적용',
      '미백 후 정기 관리 가능',
      '라미네이트 대안 검토 동시 가능'
    ],
    keywords: ['치아미백', '미백', '전문가 미백', '자가 미백', '미백 가격', '치아 미백 비용', '미백 추천'],
    faqs: [
      {
        q: (a) => `${a}에서 치아 미백 받을 수 있나요?`,
        a: (a, d) => `${a}에서 ${d} 거리의 영주 강남치과의원에서 전문가 미백, 자가 미백, 듀얼 미백 모두 가능합니다. 전체 미백 60만원으로 진행되며, 미백 전 충치·잇몸 상태를 먼저 점검합니다.`
      },
      {
        q: (a) => `${a}에서 미백 비용은 얼마인가요?`,
        a: (a) => `전체 미백 60만원으로 ${a} 환자분께도 동일하게 적용됩니다. 부분 미백, 자가 미백, 듀얼 미백 등 옵션에 따라 비용이 다르며, 상담 시 정확한 안내를 받으실 수 있습니다.`
      },
      {
        q: (a) => `미백하면 시린데 괜찮나요?`,
        a: (a) => `미백 후 일시적인 시린 증상은 정상적인 반응입니다. 영주 강남치과의원은 시린 증상 최소화 프로토콜(저농도·점진적 진행)을 적용하며, 시린 치아 환자분에게는 자가 미백을 더 권장합니다.`
      },
      {
        q: (a) => `${a}에서 미백과 라미네이트 중 어떤 게 좋을까요?`,
        a: (a) => `치아 변색 정도에 따라 다릅니다. 가벼운 변색은 미백, 심한 변색이나 형태 개선이 필요하면 라미네이트가 적합합니다. ${a} 환자분도 상담 시 두 옵션을 비교 안내해드립니다.`
      }
    ],
    procedureName: '치아 미백',
    procedureType: 'https://schema.org/TherapeuticProcedure',
    bodyLocation: 'Tooth',
    relatedSlugs: ['cosmetic', 'scaling']
  }
}

// slug → 진료 키 역매핑 (영문 + 한글 모두 지원)
const treatmentSlugMap: Record<string, string> = Object.values(treatmentData).reduce((acc, t) => {
  acc[t.slug] = t.slug
  acc[t.koSlug] = t.slug
  return acc
}, {} as Record<string, string>)

// ============================================================================
// 핵심 함수: 조합 페이지 HTML + 스키마 생성
// ============================================================================
export function comboPage(regionParam: string, treatmentParam: string): { html: string; title: string; description: string; keywords: string; schemas: object[]; canonicalUrl: string } | null {
  const regionKey = areaSlugToKey[decodeURIComponent(regionParam)] || decodeURIComponent(regionParam)
  const area = areaMap[regionKey]
  if (!area) return null

  const treatmentKey = treatmentSlugMap[decodeURIComponent(treatmentParam)] || decodeURIComponent(treatmentParam)
  const treatment = treatmentData[treatmentKey]
  if (!treatment) return null

  // ===== SEO 메타 =====
  const title = `${area.name} ${treatment.shortName} – 영주 강남치과의원 | 구강외과 전문의 직접 진료 (차로 ${area.driveTime})`
  const description = `${area.name}에서 ${treatment.shortName} 진료를 찾으신다면 영주 강남치과의원으로 오세요. ${treatment.description} ${area.name}에서 차로 ${area.driveTime} 거리. 054-636-8222.`

  // 롱테일 키워드 자동 생성 (지역명 × 진료 키워드 조합)
  const comboKeywords: string[] = []
  treatment.keywords.forEach(kw => {
    comboKeywords.push(`${area.name} ${kw}`)
  })
  // 기본 키워드도 추가
  comboKeywords.push(
    `${area.name} 치과`, `${area.name} ${treatment.koSlug}`, `${area.name} ${treatment.shortName} 가격`,
    `${area.name} ${treatment.shortName} 추천`, `${area.name} ${treatment.shortName} 잘하는곳`,
    `영주 ${treatment.shortName}`, `${area.name}에서 가까운 ${treatment.shortName}`,
    '강남치과의원', '구강악안면외과 전문의'
  )
  const keywords = comboKeywords.join(', ')

  // FAQ 생성 (지역명 동적 치환)
  const faqs = treatment.faqs.map(f => ({
    q: f.q(area.name),
    a: f.a(area.name, area.driveTime)
  }))

  // 연관 진료
  const relatedTreatments = treatment.relatedSlugs
    .map(s => treatmentData[s])
    .filter(Boolean)

  // 다른 지역 ↔ 같은 진료 링크 (Internal Linking)
  const otherRegionsForTreatment = Object.entries(areaMap)
    .filter(([k]) => k !== regionKey)
    .sort(([, a], [, b]) => a.priority - b.priority)
    .slice(0, 12)

  // 같은 지역 ↔ 다른 진료 링크 (Internal Linking)
  const otherTreatmentsForRegion = Object.values(treatmentData).filter(t => t.slug !== treatment.slug)

  // ===== 스키마 (슈퍼 풀패키지) =====
  const canonicalUrl = `https://kndent.kr/area/${area.slug}/${treatment.slug}`
  const schemas: object[] = [
    // 1) FAQPage Schema (AEO 핵심)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": `${area.name} ${treatment.shortName} 자주 묻는 질문 – 강남치과의원`,
      "description": `${area.name}에서 ${treatment.shortName} 진료를 찾는 환자분들이 가장 많이 묻는 질문`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    // 2) MedicalProcedure (진료별 전문성)
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "@id": `${canonicalUrl}#procedure`,
      "name": treatment.procedureName,
      "alternateName": [treatment.koSlug, treatment.name, `${area.name} ${treatment.shortName}`],
      "procedureType": treatment.procedureType,
      "bodyLocation": treatment.bodyLocation,
      "description": treatment.description,
      "url": canonicalUrl,
      "performer": {
        "@type": "Dentist",
        "@id": "https://kndent.kr/#organization",
        "name": "강남치과의원"
      },
      "howPerformed": treatment.features.join(' | '),
      "preparation": "3D CT 촬영 후 정밀 진단 → 상담 → 시술 → 사후 관리",
      "followup": `${area.name}에서 ${area.driveTime} 거리이므로 정기 점검 가능. 054-636-8222.`
    },
    // 3) MedicalWebPage + Speakable (음성검색 대응)
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": canonicalUrl,
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "inLanguage": "ko-KR",
      "dateModified": "2026-05-26",
      "lastReviewed": "2026-05-26",
      "reviewedBy": {
        "@type": "Physician",
        "name": "이태형",
        "@id": "https://kndent.kr/doctors/lee-taehyung#physician"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-speakable]", "h1", ".combo-summary", ".faq-answer"]
      },
      "about": [
        { "@id": `${canonicalUrl}#procedure` },
        { "@id": "https://kndent.kr/#organization" }
      ],
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": `${area.name} 거주 환자`,
        "geographicArea": {
          "@type": "AdministrativeArea",
          "name": area.name
        }
      },
      "specialty": ["Oral and Maxillofacial Surgery", "Implantology", "Prosthodontics"]
    },
    // 4) LocalBusiness + areaServed (지역 SEO 핵심)
    {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": "https://kndent.kr/#organization",
      "name": "강남치과의원",
      "alternateName": [`${area.name} ${treatment.shortName}`, `${area.name} 치과`, "영주 강남치과", "Gangnam Dental Clinic"],
      "image": "https://kndent.kr/static/photos/3gQUD6CP.jpg",
      "url": "https://kndent.kr",
      "telephone": "+82-54-636-8222",
      "email": "gndentalclinic@naver.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "대학로 217, 모모제인 건물 2층",
        "addressLocality": "영주시",
        "addressRegion": "경상북도",
        "postalCode": "36099",
        "addressCountry": "KR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 36.8057, "longitude": 128.7410 },
      "hasMap": "https://map.naver.com/p/entry/place/1099573867",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:30" }
      ],
      "priceRange": "₩₩",
      "areaServed": [
        { "@type": "City", "name": area.name, "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
        {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": area.lat, "longitude": area.lng },
          "geoRadius": area.priority === 1 ? "15000" : area.priority === 2 ? "30000" : "60000",
          "description": `${area.name} 중심 반경 ${area.priority === 1 ? '15km' : area.priority === 2 ? '30km' : '60km'} 지역 진료`
        }
      ],
      "medicalSpecialty": ["Oral and Maxillofacial Surgery", "Implantology", "Prosthodontics", "Orthodontics", "Cosmetic Dentistry"],
      "availableService": [{ "@id": `${canonicalUrl}#procedure` }],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "120", "bestRating": "5" }
    },
    // 5) BreadcrumbList (검색결과 빵부스러기)
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": area.name, "item": `https://kndent.kr/area/${area.slug}` },
        { "@type": "ListItem", "position": 3, "name": `${area.name} ${treatment.shortName}`, "item": canonicalUrl }
      ]
    },
    // 6) Offer (가격 정보 — 검색결과에 가격 노출)
    ...(treatment.price ? [{
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": `${area.name} ${treatment.shortName} – 강남치과의원`,
      "description": treatment.price,
      "priceCurrency": "KRW",
      "url": canonicalUrl,
      "availability": "https://schema.org/InStock",
      "areaServed": area.name,
      "seller": { "@id": "https://kndent.kr/#organization" }
    }] : [])
  ]

  // ===== HTML 본문 =====
  const html = `
  <!-- Hero (Speakable) -->
  <section class="relative pt-28 pb-20 overflow-hidden bg-white">
    <div class="orb orb-royal w-[600px] h-[600px] top-[-200px] right-[-150px] opacity-25"></div>
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
    <div class="royal-line-h absolute bottom-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <!-- Breadcrumb -->
      <nav class="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 flex-wrap">
          <li><a href="/" class="hover:text-royal">홈</a></li>
          <li><i class="fas fa-chevron-right text-[8px] text-gray-300"></i></li>
          <li><a href="/area/${area.slug}" class="hover:text-royal">${area.name}</a></li>
          <li><i class="fas fa-chevron-right text-[8px] text-gray-300"></i></li>
          <li><a href="/treatments/${treatment.slug}" class="hover:text-royal">${treatment.shortName}</a></li>
          <li><i class="fas fa-chevron-right text-[8px] text-gray-300"></i></li>
          <li class="text-royal font-semibold">${area.name} ${treatment.shortName}</li>
        </ol>
      </nav>

      <div class="section-label section-label-royal mb-7"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>${area.name} 지역 환자 안내</div>

      <h1 class="display-xl text-charcoal mb-6 leading-[1.08]" data-speakable="true">
        <span class="royal-grad-text">${area.name} ${treatment.shortName}</span><br>
        영주 강남치과의원
      </h1>

      <p class="text-gray-500 text-lg md:text-xl max-w-3xl leading-relaxed mb-3 combo-summary" data-speakable="true">
        <i class="fas fa-tooth text-royal mr-2"></i>${treatment.hero}
      </p>
      <p class="text-gray-500 text-base md:text-lg max-w-3xl leading-relaxed mb-10 combo-summary" data-speakable="true">
        <i class="fas fa-map-marker-alt text-royal mr-2"></i><strong>${area.name}</strong>에서 차로 <strong>${area.driveTime}</strong>${area.driveKm !== '-' ? ` (약 ${area.driveKm})` : ''}. ${area.routeHighway ? `${area.routeHighway}.` : ''}
      </p>

      <!-- Key Info Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
        <div class="card-premium p-4 md:p-5">
          <div class="text-[10px] text-gray-400 mb-1 font-bold tracking-wider">${area.name}에서</div>
          <div class="text-xl md:text-2xl font-extrabold text-royal">${area.driveTime}</div>
          <div class="text-[10px] text-gray-400 mt-1">${area.driveKm !== '-' ? area.driveKm : '시내'}</div>
        </div>
        ${treatment.price ? `
        <div class="card-premium p-4 md:p-5">
          <div class="text-[10px] text-gray-400 mb-1 font-bold tracking-wider">가격</div>
          <div class="text-base md:text-lg font-extrabold text-charcoal leading-tight">${treatment.price.split('·')[0].trim()}</div>
          <div class="text-[10px] text-gray-400 mt-1">상세 비용 별도 안내</div>
        </div>` : ''}
        <div class="card-premium p-4 md:p-5">
          <div class="text-[10px] text-gray-400 mb-1 font-bold tracking-wider">진료의</div>
          <div class="text-base md:text-lg font-extrabold text-charcoal leading-tight">구강외과<br>전문의 2인</div>
          <div class="text-[10px] text-gray-400 mt-1">직접 시술</div>
        </div>
        <div class="card-premium p-4 md:p-5">
          <div class="text-[10px] text-gray-400 mb-1 font-bold tracking-wider">진료시간</div>
          <div class="text-base md:text-lg font-extrabold text-charcoal leading-tight">평일<br>09:00–17:30</div>
          <div class="text-[10px] text-gray-400 mt-1">토·일 휴무</div>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row gap-3">
        <a href="tel:054-636-8222" class="btn-primary !py-4 !px-8"><i class="fas fa-phone"></i>054-636-8222</a>
        <a href="/reservation" class="btn-subtle"><i class="fas fa-calendar-check text-royal"></i>온라인 상담 예약</a>
        <a href="/area/${area.slug}" class="btn-subtle"><i class="fas fa-map text-royal"></i>${area.name} 오시는 길</a>
      </div>
    </div>
  </section>

  <!-- 지역 + 진료 요약 (긴 설명) -->
  <section class="py-16 section-snow">
    <div class="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="md:col-span-2">
          <h2 class="display-md text-charcoal mb-6"><span class="royal-grad-text">${area.name}</span> 주민분들이<br>${treatment.shortName} 진료로 영주 강남치과의원을 찾는 이유</h2>
          <div class="prose prose-lg text-gray-500 leading-relaxed space-y-4">
            <p data-speakable="true">${area.name}${area.population ? `(인구 ${area.population})` : ''}에서 ${treatment.shortName} 진료를 찾으신다면, 영주 강남치과의원은 ${area.driveTime} 거리에서 구강악안면외과 전문의의 정밀 진료를 제공하는 최적의 선택입니다. ${treatment.description}</p>
            <p data-speakable="true">${area.routeDesc}. ${area.routeHighway ? `${area.routeHighway}을 이용하시면 더 편리합니다.` : ''} 건물 후면 지상·지하 주차장을 무료로 이용하실 수 있어, ${area.name}에서 자가용으로 방문하시기 편합니다.</p>
            ${area.landmarks.length > 0 ? `<p data-speakable="true">${area.name} 인근의 ${area.landmarks.slice(0, 3).join(', ')} 지역에서도 동일한 거리로 접근 가능하며, 많은 ${area.name} 환자분들이 ${treatment.shortName} 진료를 위해 영주 강남치과의원을 이용하고 계십니다.</p>` : ''}
          </div>
        </div>
        <aside class="card-premium p-6 h-fit md:sticky md:top-24">
          <div class="text-[10px] text-gray-400 mb-3 font-bold tracking-wider">${area.name} ↔ 강남치과의원</div>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="flex items-start gap-3"><i class="fas fa-car text-royal mt-1"></i><div><div class="font-bold text-charcoal">${area.driveTime}</div><div class="text-xs text-gray-400">${area.driveKm !== '-' ? area.driveKm : '시내'}</div></div></li>
            ${area.routeHighway ? `<li class="flex items-start gap-3"><i class="fas fa-road text-royal mt-1"></i><div><div class="font-bold text-charcoal text-xs">교통</div><div class="text-xs text-gray-500">${area.routeHighway}</div></div></li>` : ''}
            <li class="flex items-start gap-3"><i class="fas fa-parking text-royal mt-1"></i><div><div class="font-bold text-charcoal text-xs">주차</div><div class="text-xs text-gray-500">건물 후면 지상·지하 무료</div></div></li>
            <li class="flex items-start gap-3"><i class="fas fa-phone text-royal mt-1"></i><div><div class="font-bold text-charcoal text-xs">전화</div><a href="tel:054-636-8222" class="text-xs text-royal font-bold">054-636-8222</a></div></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <!-- 진료 특징 (Features) -->
  <section class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-14">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>진료 특징</div>
        <h2 class="display-md text-charcoal">${treatment.shortName}의<br><span class="royal-grad-text">핵심 진료 시스템</span></h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${treatment.features.map((f, i) => `
        <div class="card-premium p-6 flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center flex-shrink-0">
            <span class="text-white font-extrabold text-sm">${i + 1}</span>
          </div>
          <div>
            <p class="text-sm md:text-base text-charcoal font-semibold leading-relaxed">${f}</p>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Why Choose Us (지역 맞춤 이유) -->
  <section class="py-20 section-snow">
    <div class="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-12">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>WHY 강남치과의원</div>
        <h2 class="display-md text-charcoal"><span class="royal-grad-text">${area.name}</span>에서 ${area.driveTime}<br>그래도 와야 하는 이유</h2>
      </div>
      <div class="space-y-4">
        ${treatment.whyHere.map((w, i) => `
        <div class="card-premium p-6 flex items-start gap-5">
          <div class="w-12 h-12 rounded-2xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow-sm">
            <i class="fas fa-check text-white"></i>
          </div>
          <div class="flex-1">
            <div class="text-xs text-gray-400 mb-1 font-bold">REASON ${String(i + 1).padStart(2, '0')}</div>
            <p class="text-base md:text-lg text-charcoal font-bold leading-relaxed">${w.replace('${a}', area.name)}</p>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- FAQ (지역×진료 맞춤) -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-14">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FAQ</div>
        <h2 class="display-md text-charcoal"><span class="royal-grad-text">${area.name} 환자분</span>이<br>${treatment.shortName}에 대해 자주 묻는 질문</h2>
      </div>
      <div class="space-y-3">
        ${faqs.map((f, i) => `
        <details class="card-premium group" ${i === 0 ? 'open' : ''}>
          <summary class="flex items-center justify-between p-6 cursor-pointer select-none">
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <span class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><span class="text-white text-xs font-bold">Q</span></span>
              <h3 class="font-bold text-charcoal text-sm md:text-base">${f.q}</h3>
            </div>
            <i class="fas fa-chevron-down text-gray-300 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4"></i>
          </summary>
          <div class="px-6 pb-6 pt-0">
            <div class="pl-12 text-gray-500 text-sm leading-relaxed faq-answer" data-speakable="true">${f.a}</div>
          </div>
        </details>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 연관 진료 (Internal Linking) -->
  ${relatedTreatments.length > 0 ? `
  <section class="py-16 section-snow">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <h2 class="display-md text-center text-charcoal mb-3">${area.name}에서 함께 자주 찾으시는 진료</h2>
      <p class="text-center text-gray-400 text-sm mb-10">${treatment.shortName}와 함께 진행하면 좋은 진료들</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${relatedTreatments.map(t => `
        <a href="/area/${area.slug}/${t.slug}" class="card-premium p-6 hover:shadow-xl transition-all group">
          <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center mb-4">
            <i class="fas ${t.icon} text-white"></i>
          </div>
          <h3 class="font-extrabold text-charcoal text-base mb-2">${area.name} ${t.shortName}</h3>
          <p class="text-xs text-gray-500 leading-relaxed mb-4">${t.description.split('.')[0]}.</p>
          <span class="text-xs text-royal font-bold group-hover:underline">자세히 보기 <i class="fas fa-arrow-right ml-1"></i></span>
        </a>
        `).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- 같은 진료 × 다른 지역 (Internal Linking SEO Hub) -->
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-10">
        <h2 class="display-md text-charcoal">다른 지역에서도<br><span class="royal-grad-text">${treatment.shortName}</span> 진료받으러 오십니다</h2>
        <p class="text-gray-400 text-sm mt-4">${area.name} 외 다른 지역 ${treatment.shortName} 안내</p>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        ${otherRegionsForTreatment.map(([k, v]) => `
        <a href="/area/${v.slug}/${treatment.slug}" class="px-4 py-2 rounded-full bg-royal/[0.05] border border-royal/[0.1] text-sm text-royal font-medium hover:bg-royal/[0.12] hover:border-royal/[0.2] transition-all duration-300">
          ${v.name} ${treatment.shortName}
          <span class="text-gray-400 text-xs ml-1">${v.driveTime}</span>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 같은 지역 × 다른 진료 -->
  <section class="py-16 section-snow">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-10">
        <h2 class="display-md text-charcoal"><span class="royal-grad-text">${area.name}</span>에서 받을 수 있는<br>다른 진료들</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        ${otherTreatmentsForRegion.map(t => `
        <a href="/area/${area.slug}/${t.slug}" class="px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-600 font-medium hover:text-royal hover:border-royal/30 transition-all duration-300">
          <i class="fas ${t.icon} text-royal mr-2 text-xs"></i>${area.name} ${t.shortName}
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-28 bg-white relative overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
        <i class="fas ${treatment.icon} text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6"><span class="royal-grad-text">${area.name} ${treatment.shortName}</span><br>지금 상담 예약하세요</h2>
      <p class="text-gray-400 text-lg mb-10" data-speakable="true">${area.name}에서 ${area.driveTime}이면 도착합니다.<br>구강악안면외과 전문의 2인이 직접 상담드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `

  return { html, title, description, keywords, schemas, canonicalUrl }
}

// ============================================================================
// Sitemap용 모든 조합 키 노출
// ============================================================================
export function getAllComboPaths(): { regionSlug: string; treatmentSlug: string; priority: number }[] {
  const paths: { regionSlug: string; treatmentSlug: string; priority: number }[] = []
  for (const area of Object.values(areaMap)) {
    for (const treatment of Object.values(treatmentData)) {
      paths.push({
        regionSlug: area.slug,
        treatmentSlug: treatment.slug,
        priority: area.priority === 1 ? (treatment.category === 'core' ? 1 : 2) : area.priority === 2 ? (treatment.category === 'core' ? 2 : 3) : 3
      })
    }
  }
  return paths
}

// 지역 slug 목록
export function getAreaSlugs(): string[] {
  return Object.values(areaMap).map(a => a.slug)
}

// 진료 slug 목록
export function getTreatmentSlugs(): string[] {
  return Object.values(treatmentData).map(t => t.slug)
}

// 진료 정보 (다른 페이지에서 활용 가능)
export function getTreatmentInfo(slug: string): { slug: string; koSlug: string; shortName: string; icon: string } | null {
  const key = treatmentSlugMap[slug]
  const t = key ? treatmentData[key] : null
  if (!t) return null
  return { slug: t.slug, koSlug: t.koSlug, shortName: t.shortName, icon: t.icon }
}

// 지역 정보
export function getAreaInfo(slug: string): { slug: string; name: string; driveTime: string } | null {
  const key = areaSlugToKey[slug]
  const a = key ? areaMap[key] : null
  if (!a) return null
  return { slug: a.slug, name: a.name, driveTime: a.driveTime }
}
