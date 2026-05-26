// ============================================================================
// 🚀 SEO 슈퍼업그레이드 시즌 2 — 의도(Intent) 키워드 페이지
// ============================================================================
// 목적: 환자의 검색 의도(추천/가격/비용/잘하는곳)에 정확히 매칭되는 페이지
// 전략: 14지역 × 8진료 × 4의도 = 448개 페이지 (롱테일 + 상업적 의도)
// URL: /intent/:region/:treatment/:intent
//   예: /intent/yeongju/implant/price → "영주 임플란트 가격"
//   예: /intent/bonghwa/wisdom-tooth/recommend → "봉화 사랑니 추천"
//   예: /intent/andong/invisalign/best → "안동 인비절라인 잘하는곳"
//   예: /intent/punggi/implant/cost → "풍기 임플란트 비용"
// ============================================================================

import { getAreaInfo, getTreatmentInfo, getAreaSlugs, getTreatmentSlugs } from './combo'

// 4가지 검색 의도 정의
interface IntentInfo {
  slug: string
  koLabel: string           // 검색어 형태 (예: "가격")
  longLabel: string         // 풀 라벨 (예: "가격 안내")
  searchVerb: string        // 검색자 행동 (예: "비용을 알고 싶은")
  pageHeading: (region: string, treatment: string) => string
  metaDescription: (region: string, treatment: string, info: any) => string
  contentFocus: 'price' | 'recommend' | 'cost' | 'best'
  variants: string[]        // 동의어 키워드 변형 (롱테일)
}

const intentData: Record<string, IntentInfo> = {
  'price': {
    slug: 'price',
    koLabel: '가격',
    longLabel: '가격·비용 안내',
    searchVerb: '가격을 비교하고 싶은',
    pageHeading: (r, t) => `${r} ${t} 가격`,
    metaDescription: (r, t, i) =>
      `${r}에서 ${t} 가격을 찾으신다면 영주 강남치과의원의 투명한 가격 안내를 확인하세요. ${i.priceLine} 추가 비용·할인·분할납부까지 자세히 안내. ${r}에서 차로 ${i.driveTime}. 054-636-8222.`,
    contentFocus: 'price',
    variants: ['가격', '가격표', '가격 안내', '가격대', '얼마']
  },
  'cost': {
    slug: 'cost',
    koLabel: '비용',
    longLabel: '비용 상세 안내',
    searchVerb: '총 비용을 알고 싶은',
    pageHeading: (r, t) => `${r} ${t} 비용`,
    metaDescription: (r, t, i) =>
      `${r} ${t} 비용 안내. ${i.priceLine} 추가비, 보험 적용 여부, 카드 할부 등 전체 비용 구조를 ${r} 환자분께 투명하게 공개합니다. 영주 강남치과의원. 054-636-8222.`,
    contentFocus: 'cost',
    variants: ['비용', '치료비', '진료비', '총비용', '본인부담']
  },
  'recommend': {
    slug: 'recommend',
    koLabel: '추천',
    longLabel: '추천 안내',
    searchVerb: '믿을 만한 치과를 찾는',
    pageHeading: (r, t) => `${r} ${t} 추천`,
    metaDescription: (r, t, i) =>
      `${r} ${t} 추천 치과 — 영주 강남치과의원. 구강악안면외과 전문의 2인이 직접 진료. ${i.population ? `${r}(인구 ${i.population})` : r} 환자분이 선택하는 이유. 차로 ${i.driveTime}. 054-636-8222.`,
    contentFocus: 'recommend',
    variants: ['추천', '잘하는곳', '믿을만한 곳', '소문난 곳', '평판 좋은 곳']
  },
  'best': {
    slug: 'best',
    koLabel: '잘하는곳',
    longLabel: '잘하는 치과 안내',
    searchVerb: '실력 있는 치과를 찾는',
    pageHeading: (r, t) => `${r} ${t} 잘하는 곳`,
    metaDescription: (r, t, i) =>
      `${r}에서 ${t} 잘하는 치과를 찾으신다면 영주 강남치과의원입니다. 구강악안면외과 전문의 2인 · 대학병원급 장비 · ${i.driveTime} 거리. 054-636-8222.`,
    contentFocus: 'best',
    variants: ['잘하는곳', '잘하는 곳', '실력', '전문의', '명의']
  }
}

// 진료별 가격/비용 데이터
const treatmentPricing: Record<string, { priceLine: string; details: { label: string; price: string; note?: string }[]; additionalCosts: string[]; insurance: string; payment: string[]; freeServices: string[] }> = {
  'implant': {
    priceLine: 'Neo/Osstem 임플란트 1개당 130만원 (맞춤 어버트먼트 + 지르코니아 크라운 포함).',
    details: [
      { label: 'Neo/Osstem 임플란트 (1개)', price: '130만원', note: '맞춤 어버트먼트 + 지르코니아 크라운 포함' },
      { label: '단순 뼈이식', price: '50만원', note: '필요 시 추가' },
      { label: '복합 뼈이식', price: '80만원', note: '큰 결손 시' },
      { label: '상악동 거상술 (치조정)', price: '80만원', note: 'Crestal Approach' },
      { label: '상악동 거상술 (측방)', price: '150만원', note: 'Lateral Approach' },
      { label: '3D CT 촬영', price: '진단 시 포함', note: '정밀 진단용' }
    ],
    additionalCosts: ['임플란트 보철 변경 시 재료비', '재수술 시 보철비'],
    insurance: '만 65세 이상 임플란트는 평생 2개 건강보험 적용 (본인부담 약 30%).',
    payment: ['일시불 (5% 할인 가능)', '카드 무이자 할부 (3·6·10개월)', '병원 자체 분할납부 (최대 6개월)'],
    freeServices: ['5년 정기검진 무료', '식립 후 1년 X-ray 점검 무료', '구강위생 관리 안내']
  },
  'invisalign': {
    priceLine: '인비절라인 퍼스트 400만원, 단순 650만원, 복잡 700만원.',
    details: [
      { label: '인비절라인 퍼스트', price: '400만원', note: '청소년 1차 (혼합치열기)' },
      { label: '인비절라인 라이트', price: '450만원', note: '경미한 부정교합' },
      { label: '인비절라인 단순', price: '650만원', note: '일반 부정교합' },
      { label: '인비절라인 복잡', price: '700만원', note: '복잡한 케이스' },
      { label: '교정 검사비', price: '20만원', note: 'iTero 3D 스캔 포함' },
      { label: '월 관리비', price: '5만원', note: '내원 시' }
    ],
    additionalCosts: ['미니튜브(Attachment) 부착 / 제거', '리테이너(유지장치)', '교정 후 미백·심미 관리'],
    insurance: '치아교정은 비급여 (건강보험 미적용)',
    payment: ['일시불 (5% 할인)', '카드 무이자 할부 (3·6·12개월)', '분할납부 (최대 12개월)'],
    freeServices: ['초기 교정 상담 무료', 'iTero 3D 시뮬레이션 무료', '교정 후 리테이너 1년 점검']
  },
  'wisdom-tooth': {
    priceLine: '사랑니 발치는 건강보험 적용 항목 (난이도별 차등).',
    details: [
      { label: '단순 사랑니 발치', price: '본인부담 1~2만원', note: '건강보험 적용' },
      { label: '복잡 사랑니 발치 (수평 매복)', price: '본인부담 3~5만원', note: '건강보험 적용' },
      { label: '완전 매복 사랑니', price: '본인부담 4~7만원', note: '건강보험 + 수술비' },
      { label: '3D CT 촬영', price: '약 4~5만원', note: '신경관 위치 분석 필요 시' },
      { label: '발치 후 처방약', price: '약 5천~1만원', note: '진통제·항생제' }
    ],
    additionalCosts: ['수면 진정 (선택)', '봉합사 제거 1회 추가', '재내원 진료비 (필요 시)'],
    insurance: '사랑니 발치는 건강보험 적용 (난이도별 본인부담금 차등).',
    payment: ['현금', '카드 (일시불·할부)'],
    freeServices: ['발치 후 통증 관리 안내', '식이 가이드 제공']
  },
  'digital-prosthesis': {
    priceLine: '지르코니아 크라운 50만원 (CEREC 디지털 정밀 제작).',
    details: [
      { label: '지르코니아 크라운', price: '50만원', note: 'CEREC 디지털 제작' },
      { label: '올세라믹 크라운', price: '45~55만원', note: '심미성 우수' },
      { label: 'PFM (도재금속) 크라운', price: '35만원', note: '강도+심미' },
      { label: '골드 크라운', price: '재료비 별도', note: '시세 변동' },
      { label: '디지털 스캔', price: '진료비 포함', note: 'PrimeScan 사용' }
    ],
    additionalCosts: ['신경치료 동반 시 추가비', '코어(기둥) 제작비', '임시 크라운'],
    insurance: '비급여 (재료별 본인 부담).',
    payment: ['카드 일시불·할부', '분할납부 (최대 3개월)'],
    freeServices: ['크라운 1년 보증', '재시멘트 (재부착) 1회 무료', '정기 점검 무료']
  },
  'cosmetic': {
    priceLine: '라미네이트 60만원, 지르코니아 50만원.',
    details: [
      { label: '라미네이트 (1개)', price: '60만원', note: '앞니 심미 개선' },
      { label: '올세라믹 크라운', price: '45~55만원' },
      { label: '지르코니아 크라운', price: '50만원' },
      { label: '디지털 시뮬레이션', price: '진료비 포함', note: '결과 미리보기' },
      { label: 'Minimal Prep 라미네이트', price: '60~70만원', note: '치아 삭제 최소화' }
    ],
    additionalCosts: ['치아 변색 동반 시 미백 비용', '임시 라미네이트', '재제작 시 비용'],
    insurance: '비급여 (심미 목적).',
    payment: ['카드 할부 (3·6개월)', '분할납부'],
    freeServices: ['1년 보증 (탈락·파절 시)', '정기 점검 무료']
  },
  'bone-graft': {
    priceLine: '단순 뼈이식 50만원, 복합 뼈이식 80만원.',
    details: [
      { label: '단순 뼈이식', price: '50만원', note: '소량 결손' },
      { label: '복합 뼈이식', price: '80만원', note: '큰 결손 / GBR' },
      { label: '자가골 이식', price: '별도 견적', note: '본인 뼈 사용' },
      { label: '동종골 / 합성골', price: '재료비 포함', note: '안전성 검증된 재료' },
      { label: '3D CT 정밀 진단', price: '진단 시 포함' }
    ],
    additionalCosts: ['임플란트 비용 별도', '상악동 거상술 시 추가비'],
    insurance: '비급여 (임플란트 부수 시술).',
    payment: ['임플란트와 통합 결제 가능', '카드 할부'],
    freeServices: ['뼈이식 후 1년 관리', '재수술 시 50% 할인']
  },
  'cavity': {
    priceLine: '레진 충전 8~15만원 (만 12세 이하 보험 적용).',
    details: [
      { label: '복합레진 충전 (성인)', price: '8~15만원', note: '치아 크기·위치별 차등' },
      { label: '광중합 복합레진 (만 12세 이하)', price: '본인부담 ~2만원', note: '건강보험 적용' },
      { label: '인레이 (금)', price: '재료비별', note: '내구성 우수' },
      { label: '인레이 (세라믹)', price: '30~40만원', note: 'CEREC 제작' },
      { label: '신경치료 + 크라운', price: '근관 8~15만원 + 크라운', note: '심부 충치' }
    ],
    additionalCosts: ['신경치료 동반 시 추가', '크라운 필요 시 추가'],
    insurance: '레진은 만 12세 이하 보험 적용. 신경치료·아말감은 보험 적용.',
    payment: ['현금·카드 일시불', '카드 할부 (필요 시)'],
    freeServices: ['충치 예방 안내', '6개월 후 정기 점검 안내']
  },
  'whitening': {
    priceLine: '전체 미백 60만원.',
    details: [
      { label: '전문가 미백 (병원 시술)', price: '40~60만원', note: '1~3회' },
      { label: '자가 미백 (홈케어)', price: '20~30만원', note: '트레이 + 약제' },
      { label: '듀얼 미백 (전문가 + 홈)', price: '60만원', note: '최고 효과' },
      { label: '내부 미백 (치아 1개)', price: '10만원', note: '신경치료한 치아 변색' }
    ],
    additionalCosts: ['시린 증상 완화 약제', '미백 후 관리 키트'],
    insurance: '비급여 (심미 목적).',
    payment: ['카드 일시불·할부'],
    freeServices: ['미백 후 관리 가이드', '식이 안내 제공']
  }
}

// 진료별 신뢰 신호 (Trust Signal)
const treatmentTrust: Record<string, { credentials: string[]; equipment: string[]; cases: string[]; differentiation: string[] }> = {
  'implant': {
    credentials: ['구강악안면외과 전문의 2인 (이태형·최민혜 원장)', '고려대·인제대 백병원 레지던트 수료', '대한구강악안면성형재건외과학회 인정의'],
    equipment: ['3D CT (정밀 진단)', 'PrimeScan 디지털 스캐너', '디지털 임플란트 가이드', 'Neo/Osstem 정품 임플란트'],
    cases: ['뼈이식 동반 임플란트 다수 시술 경험', '상악동 거상술 정기 시행', '전체 임플란트(All-on-4/6) 가능'],
    differentiation: ['영주 유일 전문의 2인 상주', '뼈이식·상악동 거상술 직접 가능', '5년 정기검진 무료']
  },
  'invisalign': {
    credentials: ['Invisalign Certified Doctor (본사 인증의)', 'iTero Element 인증 의료기관', '교정학 임상 수료'],
    equipment: ['iTero Element 5D 디지털 스캐너', 'ClinCheck 3D 시뮬레이션', '인비절라인 전용 어태치먼트'],
    cases: ['청소년 퍼스트 케이스', '성인 부정교합 교정 다수', '임플란트 전 교정 케이스'],
    differentiation: ['본뜨기 없는 디지털 스캔', '4~8주 간격 내원 (원거리 친화)', '결과 미리보기 제공']
  },
  'wisdom-tooth': {
    credentials: ['구강악안면외과 전문의 직접 시술', '대학병원 레지던트 수료', '매복 사랑니 다수 임상'],
    equipment: ['3D CT (신경관 정밀 분석)', '미세 발치 기구', '응급 발치 시스템'],
    cases: ['완전매복 · 수평매복 사랑니', '신경관 인접 사랑니', '소아 청소년 사랑니'],
    differentiation: ['대학병원 안 가도 됨', '응급 당일 발치 가능', '발치 후 통증 최소화 프로토콜']
  },
  'digital-prosthesis': {
    credentials: ['CEREC 정식 트레이닝 수료', '디지털 보철 임상 다수', '프리미엄 보철 시술'],
    equipment: ['CEREC MC X 밀링 머신', 'PrimeScan 디지털 스캐너', 'SpeedFire 고속 소결로'],
    cases: ['싱글 크라운 다수', '연속 크라운 케이스', '임플란트 크라운'],
    differentiation: ['본뜨기 없음 (구역 X)', '내원 횟수 최소화 (1~2회)', '자연치아와 동일한 색']
  },
  'cosmetic': {
    credentials: ['심미보철 임상 다수', 'CEREC 인증', '디지털 스마일 디자인'],
    equipment: ['CEREC 디지털 시스템', '디지털 스마일 시뮬레이션', 'Minimal Prep 술식'],
    cases: ['앞니 4~6개 라미네이트', '올세라믹 크라운 케이스', '결혼·취업 전 심미 케이스'],
    differentiation: ['결과 미리보기 (시뮬레이션)', '치아 삭제 최소화', '1년 보증']
  },
  'bone-graft': {
    credentials: ['구강악안면외과 전문의 전문 영역', '뼈이식 다수 임상', '재건 수술 가능'],
    equipment: ['3D CT (뼈량 정밀 측정)', '자가골·동종골·합성골 라인업', 'GBR (Guided Bone Regeneration)'],
    cases: ['상악동 거상술 동반', '치조골 결손 재건', '임플란트 동시 식립'],
    differentiation: ['대학병원 의뢰 불필요', '임플란트와 원스톱', '뼈이식 후 1년 관리']
  },
  'cavity': {
    credentials: ['보존학 임상 다수', '미세현미경 활용', '예방치과 인증'],
    equipment: ['디지털 X-ray', '미세현미경', 'CEREC 인레이 제작'],
    cases: ['소아·청소년 광중합 레진', '성인 인레이/크라운', '신경치료 동반 케이스'],
    differentiation: ['디지털 미세 충치 진단', '당일 레진 가능', '재발 방지 프로그램']
  },
  'whitening': {
    credentials: ['전문의 직접 미백 관리', '시린 증상 최소화 프로토콜', '미백 임상 다수'],
    equipment: ['전문가 미백 약제', '홈케어 트레이 맞춤 제작', 'LED 가속 시스템'],
    cases: ['결혼 전 미백', '취업 면접 미백', '내부 미백 (변색 치아)'],
    differentiation: ['전문의 직접 농도 조절', '시린 증상 최소화', '관리 가이드 제공']
  }
}

// ============================================================================
// Intent Page 생성 함수
// ============================================================================
export function intentPage(regionParam: string, treatmentParam: string, intentParam: string): { html: string; title: string; description: string; keywords: string; schemas: object[]; canonicalUrl: string } | null {
  const area = getAreaInfo(regionParam)
  const treatment = getTreatmentInfo(treatmentParam)
  const intent = intentData[intentParam]
  const pricing = treatmentPricing[treatmentParam]
  const trust = treatmentTrust[treatmentParam]

  if (!area || !treatment || !intent || !pricing || !trust) return null

  const heading = intent.pageHeading(area.name, treatment.shortName)
  const title = `${heading} – 영주 강남치과의원 | 구강악안면외과 전문의 직접 진료 (${area.driveTime})`

  // 지역 정보 보강
  const areaContext = { population: '', driveTime: area.driveTime }
  const description = intent.metaDescription(area.name, treatment.shortName, { ...pricing, ...areaContext, driveTime: area.driveTime })

  // 키워드 자동 생성 (의도 변형 × 지역 × 진료)
  const keywords: string[] = []
  intent.variants.forEach(v => {
    keywords.push(`${area.name} ${treatment.shortName} ${v}`)
    keywords.push(`${area.name} ${treatment.koSlug} ${v}`)
  })
  keywords.push(
    `${area.name} ${treatment.shortName}`,
    `${area.name} 치과 ${intent.koLabel}`,
    `영주 ${treatment.shortName} ${intent.koLabel}`,
    `${treatment.shortName} ${intent.koLabel}`,
    '강남치과의원', '구강악안면외과 전문의'
  )

  const canonicalUrl = `https://kndent.kr/intent/${area.slug}/${treatment.slug}/${intent.slug}`

  // ===== Schema 풀패키지 =====
  const schemas: object[] = [
    // 1) BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": area.name, "item": `https://kndent.kr/area/${area.slug}` },
        { "@type": "ListItem", "position": 3, "name": `${area.name} ${treatment.shortName}`, "item": `https://kndent.kr/area/${area.slug}/${treatment.slug}` },
        { "@type": "ListItem", "position": 4, "name": heading, "item": canonicalUrl }
      ]
    },
    // 2) FAQPage (의도 맞춤 FAQ)
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": `${heading} 자주 묻는 질문`,
      "mainEntity": getIntentFAQs(area.name, treatment.shortName, intent, pricing).map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    // 3) MedicalWebPage + Speakable
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
      "reviewedBy": { "@type": "Physician", "name": "이태형", "@id": "https://kndent.kr/doctors/lee-taehyung#physician" },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-speakable]", "h1", ".intent-summary", ".price-row", ".faq-answer"]
      },
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": `${area.name}에서 ${treatment.shortName} ${intent.searchVerb} 환자`,
        "geographicArea": { "@type": "AdministrativeArea", "name": area.name }
      }
    },
    // 4) PriceSpecification (가격 페이지 강력 신호)
    ...(intent.contentFocus === 'price' || intent.contentFocus === 'cost' ? pricing.details.map(d => ({
      "@context": "https://schema.org",
      "@type": "Offer",
      "name": `${area.name} ${d.label}`,
      "description": `${d.label} – ${d.note || ''}`,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": d.price.replace(/[^0-9]/g, '') || undefined,
        "priceCurrency": "KRW",
        "name": d.price
      },
      "areaServed": area.name,
      "url": canonicalUrl,
      "seller": { "@id": "https://kndent.kr/#organization" }
    })) : []),
    // 5) LocalBusiness (지역 SEO 핵심)
    {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": "https://kndent.kr/#organization",
      "name": "강남치과의원",
      "alternateName": [heading, `${area.name} 치과`, "영주 강남치과의원"],
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
      "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:30" }],
      "priceRange": "₩₩",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "120", "bestRating": "5" },
      "areaServed": [
        { "@type": "City", "name": area.name },
        { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 36.8057, "longitude": 128.7410 }, "geoRadius": "60000" }
      ]
    }
  ]

  // ===== FAQ 생성 (의도 맞춤) =====
  const faqs = getIntentFAQs(area.name, treatment.shortName, intent, pricing)

  // ===== HTML 본문 (의도 타입별 다른 콘텐츠) =====
  const html = `
  <!-- Hero -->
  <section class="relative pt-28 pb-16 overflow-hidden bg-white">
    <div class="orb orb-royal w-[600px] h-[600px] top-[-200px] right-[-150px] opacity-25"></div>
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
    <div class="royal-line-h absolute bottom-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <nav class="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 flex-wrap">
          <li><a href="/" class="hover:text-royal">홈</a></li>
          <li><i class="fas fa-chevron-right text-[8px] text-gray-300"></i></li>
          <li><a href="/area/${area.slug}" class="hover:text-royal">${area.name}</a></li>
          <li><i class="fas fa-chevron-right text-[8px] text-gray-300"></i></li>
          <li><a href="/area/${area.slug}/${treatment.slug}" class="hover:text-royal">${treatment.shortName}</a></li>
          <li><i class="fas fa-chevron-right text-[8px] text-gray-300"></i></li>
          <li class="text-royal font-semibold">${intent.koLabel}</li>
        </ol>
      </nav>

      <div class="section-label section-label-royal mb-7"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>${intent.longLabel}</div>

      <h1 class="display-xl text-charcoal mb-6 leading-[1.08]" data-speakable="true">
        <span class="royal-grad-text">${heading}</span><br>
        ${intent.contentFocus === 'price' || intent.contentFocus === 'cost' ? '투명한 가격 안내' : '영주 강남치과의원'}
      </h1>

      <p class="text-gray-500 text-lg md:text-xl max-w-3xl leading-relaxed mb-10 intent-summary" data-speakable="true">
        ${getIntentIntro(area.name, treatment.shortName, intent, pricing)}
      </p>

      <div class="flex flex-col sm:flex-row gap-3">
        <a href="tel:054-636-8222" class="btn-primary !py-4 !px-8"><i class="fas fa-phone"></i>054-636-8222</a>
        <a href="/reservation" class="btn-subtle"><i class="fas fa-calendar-check text-royal"></i>상담 예약</a>
      </div>
    </div>
  </section>

  ${renderIntentMainContent(area, treatment, intent, pricing, trust, faqs)}

  <!-- 의도 변형 키워드 클러스터 (롱테일 SEO) -->
  <section class="py-14 section-snow">
    <div class="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
      <h2 class="text-center text-charcoal font-extrabold text-base md:text-lg mb-3">${area.name} ${treatment.shortName} 관련 검색</h2>
      <p class="text-center text-gray-400 text-xs mb-8">${area.name} 환자분들이 ${treatment.shortName}로 자주 검색하시는 키워드</p>
      <div class="flex flex-wrap justify-center gap-2">
        ${getRelatedIntentVariants(area.slug, treatment.slug, intent.slug, area.name, treatment.shortName).map(v => `
          <a href="${v.url}" class="px-4 py-2 rounded-full bg-royal/[0.05] border border-royal/[0.1] text-sm text-royal font-medium hover:bg-royal/[0.12] hover:border-royal/[0.2] transition-all duration-300">${v.label}</a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 bg-white relative overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
        <i class="fas fa-comments text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6"><span class="royal-grad-text">${area.name} ${treatment.shortName} ${intent.koLabel}</span><br>1:1 무료 상담 신청</h2>
      <p class="text-gray-400 text-lg mb-10" data-speakable="true">${area.name}에서 ${area.driveTime}이면 도착합니다.<br>구강악안면외과 전문의가 정확한 ${intent.koLabel}을 직접 안내드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>무료 상담 예약</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `

  return { html, title, description, keywords: keywords.join(', '), schemas, canonicalUrl }
}

// ============================================================================
// Helper: 의도 인트로 카피
// ============================================================================
function getIntentIntro(area: string, treatment: string, intent: IntentInfo, pricing: any): string {
  switch (intent.contentFocus) {
    case 'price':
      return `${area}에서 ${treatment} 가격을 알아보고 계신가요? 영주 강남치과의원은 ${pricing.priceLine} 추가 비용, 보험 적용 여부, 카드 할부까지 모두 투명하게 공개합니다.`
    case 'cost':
      return `${area} ${treatment} 총 비용을 정확히 알고 싶으신 분들을 위해 영주 강남치과의원이 모든 비용 구조를 공개합니다. 진료비, 재료비, 추가 시술비, 보험 적용 항목까지 한눈에 확인하세요.`
    case 'recommend':
      return `${area}에서 ${treatment} 치과를 추천받고 싶으신가요? 영주 강남치과의원은 구강악안면외과 전문의 2인이 직접 진료하며, ${area} 환자분들에게 가장 많이 추천되는 치과입니다.`
    case 'best':
      return `${area}에서 ${treatment} 실력 있는 치과를 찾으신다면 영주 강남치과의원입니다. 구강악안면외과 전문의 2인, 대학병원급 장비, 다년간의 임상 경험으로 ${area} 환자분들이 신뢰하는 치과입니다.`
    default:
      return ''
  }
}

// ============================================================================
// Helper: 의도 맞춤 FAQ
// ============================================================================
function getIntentFAQs(area: string, treatment: string, intent: IntentInfo, pricing: any): { q: string; a: string }[] {
  const base = [
    {
      q: `${area}에서 ${treatment} ${intent.koLabel}이 어떻게 되나요?`,
      a: `영주 강남치과의원은 ${area} 환자분께도 동일하게 ${pricing.priceLine} 추가 비용은 환자분의 구강 상태에 따라 결정되며, 상담 시 정확하게 안내드립니다.`
    },
    {
      q: `${area}에서 ${treatment} 보험 적용되나요?`,
      a: `${pricing.insurance} ${area} 환자분도 동일한 보험 기준이 적용되며, 자세한 사항은 054-636-8222로 문의 주세요.`
    },
    {
      q: `${area}에서 ${treatment} 카드 할부 되나요?`,
      a: `${pricing.payment.join(', ')}이 가능합니다. ${area} 환자분도 동일하게 적용되며, 큰 비용일수록 분할납부를 권장드립니다.`
    },
    {
      q: `${area}에서 ${treatment} ${intent.koLabel}만 들으러 가도 되나요?`,
      a: `네, 영주 강남치과의원은 ${treatment} 상담 시 별도 비용을 받지 않습니다. ${area}에서 ${intent.searchVerb} 분께 무료 상담을 제공하며, 정확한 ${intent.koLabel}은 진단 후 안내드립니다.`
    }
  ]

  // 의도별 추가 FAQ
  if (intent.contentFocus === 'price' || intent.contentFocus === 'cost') {
    base.push({
      q: `${area}에서 ${treatment} 다른 치과보다 비싸지 않나요?`,
      a: `영주 강남치과의원은 구강악안면외과 전문의가 직접 시술하면서도, 합리적인 가격을 유지합니다. 단순 가격 비교보다 '전문의 시술 + 대학병원급 장비'의 가치를 봐주세요. ${area} 환자분들이 가격 만족도가 높은 이유입니다.`
    })
  }

  if (intent.contentFocus === 'recommend' || intent.contentFocus === 'best') {
    base.push({
      q: `${area} 환자분들이 영주 강남치과의원을 선택하는 이유는?`,
      a: `① 구강악안면외과 전문의 2인 상주 ② 대학병원급 장비(3D CT·PrimeScan·CEREC·iTero) ③ 뼈이식·상악동 거상술까지 원스톱 가능 ④ 5년 정기검진 무료 ⑤ ${area}에서 가까운 거리 — 이 5가지가 ${area} 환자분들의 가장 큰 선택 이유입니다.`
    })
  }

  return base
}

// ============================================================================
// Helper: 의도 본문 콘텐츠 (의도별 다른 섹션)
// ============================================================================
function renderIntentMainContent(area: any, treatment: any, intent: IntentInfo, pricing: any, trust: any, faqs: any[]): string {
  const isPriceFocus = intent.contentFocus === 'price' || intent.contentFocus === 'cost'

  return `
  <!-- ${isPriceFocus ? '가격 상세 표' : '추천 이유'} 섹션 -->
  ${isPriceFocus ? `
  <section class="py-16 section-snow">
    <div class="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-12">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>${intent.koLabel} 상세</div>
        <h2 class="display-md text-charcoal">${area.name} ${treatment.shortName}<br><span class="royal-grad-text">전체 ${intent.koLabel} 안내</span></h2>
      </div>

      <div class="card-premium overflow-hidden">
        <table class="w-full text-sm">
          <thead class="royal-grad text-white">
            <tr>
              <th class="text-left p-4 font-extrabold">항목</th>
              <th class="text-right p-4 font-extrabold whitespace-nowrap">${intent.koLabel}</th>
              <th class="text-left p-4 font-extrabold hidden md:table-cell">비고</th>
            </tr>
          </thead>
          <tbody>
            ${pricing.details.map((d: any, i: number) => `
            <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100 price-row" data-speakable="true">
              <td class="p-4 font-semibold text-charcoal">${d.label}</td>
              <td class="p-4 text-right font-extrabold text-royal whitespace-nowrap">${d.price}</td>
              <td class="p-4 text-xs text-gray-500 hidden md:table-cell">${d.note || '-'}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div class="card-premium p-5">
          <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center mb-3"><i class="fas fa-shield-halved text-white text-sm"></i></div>
          <h3 class="font-extrabold text-charcoal text-sm mb-2">건강보험</h3>
          <p class="text-xs text-gray-500 leading-relaxed">${pricing.insurance}</p>
        </div>
        <div class="card-premium p-5">
          <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center mb-3"><i class="fas fa-credit-card text-white text-sm"></i></div>
          <h3 class="font-extrabold text-charcoal text-sm mb-2">결제 방법</h3>
          <ul class="text-xs text-gray-500 space-y-1">${pricing.payment.map((p: string) => `<li><i class="fas fa-check text-royal text-[8px] mr-1"></i>${p}</li>`).join('')}</ul>
        </div>
        <div class="card-premium p-5">
          <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center mb-3"><i class="fas fa-gift text-white text-sm"></i></div>
          <h3 class="font-extrabold text-charcoal text-sm mb-2">무료 서비스</h3>
          <ul class="text-xs text-gray-500 space-y-1">${pricing.freeServices.map((s: string) => `<li><i class="fas fa-star text-royal text-[8px] mr-1"></i>${s}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </section>
  ` : `
  <!-- 추천 이유 (Trust Signal) -->
  <section class="py-20 section-snow">
    <div class="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-12">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>${intent.longLabel}</div>
        <h2 class="display-md text-charcoal">${area.name} 환자분이<br><span class="royal-grad-text">영주 강남치과의원</span>을 선택하는 이유</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card-premium p-6">
          <div class="w-12 h-12 rounded-2xl royal-grad flex items-center justify-center mb-4"><i class="fas fa-user-doctor text-white"></i></div>
          <h3 class="font-extrabold text-charcoal mb-3">의료진 자격</h3>
          <ul class="text-sm text-gray-500 space-y-2">${trust.credentials.map((c: string) => `<li class="flex items-start gap-2"><i class="fas fa-check text-royal mt-1"></i><span>${c}</span></li>`).join('')}</ul>
        </div>
        <div class="card-premium p-6">
          <div class="w-12 h-12 rounded-2xl royal-grad flex items-center justify-center mb-4"><i class="fas fa-microscope text-white"></i></div>
          <h3 class="font-extrabold text-charcoal mb-3">보유 장비</h3>
          <ul class="text-sm text-gray-500 space-y-2">${trust.equipment.map((e: string) => `<li class="flex items-start gap-2"><i class="fas fa-check text-royal mt-1"></i><span>${e}</span></li>`).join('')}</ul>
        </div>
        <div class="card-premium p-6">
          <div class="w-12 h-12 rounded-2xl royal-grad flex items-center justify-center mb-4"><i class="fas fa-clipboard-list text-white"></i></div>
          <h3 class="font-extrabold text-charcoal mb-3">주요 케이스</h3>
          <ul class="text-sm text-gray-500 space-y-2">${trust.cases.map((c: string) => `<li class="flex items-start gap-2"><i class="fas fa-check text-royal mt-1"></i><span>${c}</span></li>`).join('')}</ul>
        </div>
        <div class="card-premium p-6">
          <div class="w-12 h-12 rounded-2xl royal-grad flex items-center justify-center mb-4"><i class="fas fa-trophy text-white"></i></div>
          <h3 class="font-extrabold text-charcoal mb-3">차별점</h3>
          <ul class="text-sm text-gray-500 space-y-2">${trust.differentiation.map((d: string) => `<li class="flex items-start gap-2"><i class="fas fa-check text-royal mt-1"></i><span>${d}</span></li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </section>
  `}

  <!-- FAQ (의도 맞춤) -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="text-center mb-14">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FAQ</div>
        <h2 class="display-md text-charcoal"><span class="royal-grad-text">${area.name} ${treatment.shortName} ${intent.koLabel}</span><br>자주 묻는 질문</h2>
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
  `
}

// ============================================================================
// Helper: 같은 지역×진료의 다른 의도 변형 링크
// ============================================================================
function getRelatedIntentVariants(regionSlug: string, treatmentSlug: string, currentIntentSlug: string, area: string, treatment: string): { url: string; label: string }[] {
  const variants: { url: string; label: string }[] = []
  Object.values(intentData).forEach(intent => {
    if (intent.slug !== currentIntentSlug) {
      variants.push({
        url: `/intent/${regionSlug}/${treatmentSlug}/${intent.slug}`,
        label: `${area} ${treatment} ${intent.koLabel}`
      })
    }
  })
  // 지역+진료 단독 페이지로도 연결
  variants.push({ url: `/area/${regionSlug}/${treatmentSlug}`, label: `${area} ${treatment} 전체 정보` })
  variants.push({ url: `/area/${regionSlug}`, label: `${area} 치과 전체 안내` })
  return variants
}

// ============================================================================
// 모든 의도 페이지 경로 노출 (sitemap용)
// ============================================================================
export function getAllIntentPaths(): { regionSlug: string; treatmentSlug: string; intentSlug: string; priority: number }[] {
  const paths: { regionSlug: string; treatmentSlug: string; intentSlug: string; priority: number }[] = []
  const regions = getAreaSlugs()
  const treatments = getTreatmentSlugs()
  const intents = Object.keys(intentData)

  for (const r of regions) {
    for (const t of treatments) {
      for (const i of intents) {
        // priority 매핑
        const area = getAreaInfo(r)
        const treatmentInfo = getTreatmentInfo(t)
        // 영주(핵심) + 가격(상업) → 0.85
        // 그 외 → 0.7
        const isHotRegion = r === 'yeongju' || r === 'punggi' || r === 'yeongju-innovation'
        const isHotIntent = i === 'price' || i === 'best'
        const priority = isHotRegion && isHotIntent ? 1 : isHotRegion || isHotIntent ? 2 : 3
        paths.push({ regionSlug: r, treatmentSlug: t, intentSlug: i, priority })
      }
    }
  }
  return paths
}

export function getAllIntentSlugs(): string[] {
  return Object.keys(intentData)
}
