// 홈 스크롤 몰입 연출 정적 파일 내용 해시 (vite.config.ts define — ?v= 캐시 버스팅, 고정 문자열 금지)
declare const __IMMERSIVE_CSS_V__: string
declare const __IMMERSIVE_JS_V__: string
declare const __APP_JS_V__: string
// Tailwind 빌드 CSS 내용 해시(2026-11-01 CDN → 빌드). npm run build 가 css:build 를 먼저 실행하므로 항상 새 CSS 기준
declare const __TAILWIND_CSS_V__: string
export const TAILWIND_CSS_HREF = `/static/tailwind.css?v=${__TAILWIND_CSS_V__}`
import { todayStatus, HOURS_LINES } from './lib/hours'
import { icon, naverMark } from './lib/icons'
import { markArticleEndCta } from './pages/article-cta'

interface LayoutOptions {
  title: string
  description: string
  url: string
  // SEO/AEO: 페이지별 추가 구조화 데이터
  schemas?: object[]
  // SEO: 페이지별 키워드
  keywords?: string
  // SEO: 페이지 유형
  ogType?: string
  // SEO: 페이지별 og:image (없으면 기본값)
  ogImage?: string
  // og:image 크기·대체텍스트 — 기본 PNG(1200×630) 외 이미지는 크기를 아는 경우만 지정(모르면 width/height 메타 생략)
  ogImageWidth?: number
  ogImageHeight?: number
  ogImageAlt?: string
  // AEO: Speakable 영역 CSS 셀렉터
  speakableSelectors?: string[]
  // SEO: noindex/nofollow 등 커스텀 robots
  robots?: string
  // SEO: 정본 URL 재지정 (유사 변형 페이지 → 주 페이지). 없으면 url 이 정본
  canonical?: string
  // SEO: 페이지 article 관련
  articlePublishedTime?: string
  articleModifiedTime?: string
  // 메인 홈 스크롤 몰입 연출 (Lenis + /static/immersive.*) — 홈에서만 true
  immersive?: boolean
  // SEO: BreadcrumbList 직접 지정 (없으면 URL 경로로 자동 생성). @id = {url}#breadcrumb
  breadcrumbItems?: { name: string; url: string }[]
}

export const SITE_URL = 'https://kndent.kr'
export const SITE_NAME = '강남치과의원'
const SITE_NAME_EN = 'Gangnam Dental Clinic'
const PHONE = '+82-54-636-8222'
const PHONE_DISPLAY = '054-636-8222'
// og:image 는 1200×630 PNG 한 장(로고 대표 이미지)으로 통일 — 예전 /og/:slug 는 SVG 라 카카오톡·페이스북·네이버 미리보기에서 깨졌다
export const OG_IMAGE_PNG = `${SITE_URL}/static/og-image.png`
const DEFAULT_OG_IMAGE = OG_IMAGE_PNG
const NAVER_MAP_URL = 'https://map.naver.com/p/entry/place/1099573867'
const BLOG_URL = 'https://blog.naver.com/gndentalclinic'

// 핵심 Dentist/LocalBusiness Schema (모든 페이지 공통)
function buildBaseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    "name": SITE_NAME,
    "alternateName": [SITE_NAME_EN, "영주 강남치과", "강남치과"],
    "url": SITE_URL,
    "telephone": PHONE,
    "email": "gndentalclinic@naver.com",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/static/logo.png`,
      "width": "512",
      "height": "512"
    },
    "image": [
      `${SITE_URL}/static/og-image.png`,
      `${SITE_URL}/static/logo.png`,
      // 2026-11-10: 없는 파일(clinic-exterior.jpg·clinic-interior.jpg, 404) → 홈 구조화 데이터와 같은 실제 원내 사진
      `${SITE_URL}/static/photos/3gQUD6CP.jpg`,
      `${SITE_URL}/static/photos/KLnijX5L.jpg`
    ],
    "photo": `${SITE_URL}/static/og-image.png`,
    "description": "경북 영주시 강남치과의원. 구강악안면외과 전문의 2인이 직접 진료하는 프리미엄 치과. 임플란트, 디지털 보철(싱글 크라운), 인비절라인, 심미보철 전문.",
    "knowsAbout": [
      "임플란트", "디지털 임플란트", "네비게이션 임플란트",
      "디지털 보철", "원데이 크라운", "CEREC", "지르코니아 크라운",
      "인비절라인", "투명교정", "iTero 스캐너",
      "사랑니 발치", "매복 사랑니", "뼈이식", "상악동(위턱 공간) 거상술",
      "구강악안면외과", "심미보철", "라미네이트",
      "충치치료", "신경치료", "잇몸치료", "스케일링",
      "틀니", "보험 틀니", "치아미백", "예방치료"
    ],
    "accessibilityFeature": [
      "wheelchairAccessible",
      "elevator",
      "accessibleParking",
      "readingGuide"
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "주차장", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "엘리베이터", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "휠체어 접근 가능", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "와이파이", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "독립 진료실 (유리 파티션)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "휴게 공간 (피아노)", "value": true }
    ],
    "slogan": "일상으로의 빠른 복귀, 강남치과의 기쁨입니다",
    "foundingDate": "2017",
    "priceRange": "$$",
    "currenciesAccepted": "KRW",
    "paymentAccepted": "현금, 카드, 계좌이체",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "대학로 217, 2층",
      "addressLocality": "영주시",
      "addressRegion": "경상북도",
      "postalCode": "36052",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8057,
      "longitude": 128.7410
    },
    "hasMap": "https://map.naver.com/p/entry/place/1099573867",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "13:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "14:00", "closes": "17:30" }
    ],
    "specialOpeningHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "description": "점심시간 13:00-14:00, 접수마감 17:00, 토·일·공휴일 휴무"
    },
    "founder": {
      "@type": "Physician",
      // 의료진 @id 는 의료진 상세 페이지 기준 하나로 통일 (reviewedBy·performedBy 가 모두 이 @id 참조)
      "@id": `${SITE_URL}/doctors/lee-taehyung#physician`,
      "name": "이태형",
      "givenName": "태형",
      "familyName": "이",
      "jobTitle": "대표원장",
      "url": `${SITE_URL}/doctors/lee-taehyung`,
      "description": "구강악안면외과 전문의. 임플란트, 사랑니 발치, 뼈이식, 상악동(위턱 공간) 거상술 전문.",
      "medicalSpecialty": "Oral and Maxillofacial Surgery",
      // 2026-11-10: 없는 파일(doctor-lee.jpg, 404) → 의료진 화면·상세 스키마와 같은 실제 사진
      "image": `${SITE_URL}/static/doctors/lee-taehyung.jpg`,
      "worksFor": { "@id": `${SITE_URL}/#organization` },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Specialty Board Certification",
          "name": "구강악안면외과 전문의",
          "recognizedBy": { "@type": "Organization", "name": "대한치과의사협회" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "License",
          "name": "치과의사 면허"
        }
      ],
      "knowsAbout": ["임플란트", "사랑니 발치", "뼈이식", "상악동(위턱 공간) 거상술", "구강악안면외과", "디지털 보철"],
      "memberOf": [
        // 2026-11-10: 의료진 화면 약력·상세 페이지 스키마(같은 @id)와 같은 학회만
        { "@type": "MedicalOrganization", "name": "대한구강악안면성형재건외과학회" },
        { "@type": "MedicalOrganization", "name": "대한구강악안면외과학회" }
      ],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "임플란트" },
        { "@type": "MedicalProcedure", "name": "사랑니 발치" },
        { "@type": "MedicalProcedure", "name": "뼈이식" },
        { "@type": "MedicalProcedure", "name": "상악동(위턱 공간) 거상술" }
      ]
    },
    "employee": [
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/doctors/choi-minhye#physician`,
        "name": "최민혜",
        "jobTitle": "원장",
        "description": "구강악안면외과 전문의. 인제대학교 백병원 구강악안면외과 레지던트 수료.",
        "url": `${SITE_URL}/doctors/choi-minhye`,
        "medicalSpecialty": "Oral and Maxillofacial Surgery",
        "worksFor": { "@id": `${SITE_URL}/#organization` }
      }
    ],
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 2, "unitText": "구강악안면외과 전문의" },
    "medicalSpecialty": [
      "Oral and Maxillofacial Surgery",
      "Implantology",
      "Prosthodontics",
      "Orthodontics",
      "Cosmetic Dentistry"
    ],
    "availableService": [
      { "@type": "MedicalProcedure", "name": "임플란트", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "디지털 보철(싱글 크라운)", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "인비절라인 투명교정", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "사랑니 발치", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "뼈이식", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "상악동(위턱 공간) 거상술", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "심미보철", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "충치치료", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "신경치료", "procedureType": "Noninvasive" }
    ],
    "areaServed": [
      { "@type": "City", "name": "영주시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "봉화군", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "예천군", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "안동시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "단양군", "containedInPlace": { "@type": "AdministrativeArea", "name": "충청북도" } },
      { "@type": "City", "name": "영덕군", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "울진군", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "상주시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "City", "name": "문경시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      { "@type": "Place", "name": "풍기읍" },
      { "@type": "Place", "name": "영주혁신도시" },
      {
        "@type": "GeoCircle",
        "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 36.8057, "longitude": 128.7410 },
        "geoRadius": "100000",
        "description": "영주시 중심 반경 100km — 봉화, 예천, 안동, 단양, 영덕, 울진 포함"
      }
    ],
    "sameAs": [
      BLOG_URL,
      NAVER_MAP_URL,
      "https://map.kakao.com/link/search/강남치과의원 영주",
      "https://www.google.com/maps/search/강남치과의원+영주",
      "https://www.instagram.com/gndentalclinic/"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Medical Institution License",
        "name": "의료기관 개설 신고증",
        "recognizedBy": { "@type": "GovernmentOrganization", "name": "영주시 보건소" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Specialty Certification",
        "name": "구강악안면외과 전문의 진료기관"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "MedicalProcedure", "name": "임플란트" },
        "priceCurrency": "KRW",
        "category": "수술 진료",
        "url": `${SITE_URL}/treatments/implant`,
        "availability": "https://schema.org/InStock",
        "businessFunction": "https://schema.org/Sell"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "MedicalProcedure", "name": "디지털 보철(싱글 크라운)" },
        "priceCurrency": "KRW",
        "category": "보철 진료",
        "url": `${SITE_URL}/treatments/digital-prosthesis`,
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 투명교정" },
        "priceCurrency": "KRW",
        "category": "교정 진료",
        "url": `${SITE_URL}/treatments/invisalign`,
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "MedicalProcedure", "name": "사랑니 발치" },
        "priceCurrency": "KRW",
        "category": "수술 진료",
        "url": `${SITE_URL}/treatments/wisdom-tooth`,
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "MedicalProcedure", "name": "심미보철" },
        "priceCurrency": "KRW",
        "category": "심미 진료",
        "url": `${SITE_URL}/treatments/cosmetic`,
        "availability": "https://schema.org/InStock"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "강남치과의원 진료 카탈로그",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "수술 진료",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "임플란트", "url": `${SITE_URL}/treatments/implant` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "뼈이식 임플란트", "url": `${SITE_URL}/treatments/bone-graft` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "상악동(위턱 공간) 거상술", "url": `${SITE_URL}/treatments/sinus-lift` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "사랑니 발치", "url": `${SITE_URL}/treatments/wisdom-tooth` } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "보철 진료",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "디지털 보철(싱글 크라운)", "url": `${SITE_URL}/treatments/digital-prosthesis` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "심미보철", "url": `${SITE_URL}/treatments/cosmetic` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "틀니", "url": `${SITE_URL}/treatments/denture` } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "교정 진료",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 투명교정", "url": `${SITE_URL}/treatments/invisalign` } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "일반 진료",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "충치치료", "url": `${SITE_URL}/treatments/cavity` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "신경치료", "url": `${SITE_URL}/treatments/root-canal` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "잇몸치료", "url": `${SITE_URL}/treatments/gum` } },
            { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "스케일링", "url": `${SITE_URL}/treatments/scaling` } }
          ]
        }
      ]
    },
    // aggregateRating·review[] 제거 (2026-09-29): 사이트에 실제 후기가 없고(홈 "후기 수집 후 업데이트 예정"),
    // 자체 게시 평점은 Google 리뷰 스니펫 정책 위반·YMYL 수동조치 위험 (PFWE-SPEC §6)
    "knowsLanguage": ["ko", "en"],
    "isAcceptingNewPatients": true,
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/reservation`,
        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
      },
      "result": { "@type": "Reservation", "name": "상담 예약" }
    }
  }
}

// BreadcrumbList 자동 생성
function buildBreadcrumb(url: string, pageTitle: string) {
  const items: { name: string; url: string }[] = [{ name: '홈', url: '/' }]
  const segments = url.split('/').filter(Boolean)
  const pathMap: Record<string, string> = {
    'doctors': '의료진',
    'treatments': '진료안내',
    'pricing': '수가안내',
    'directions': '오시는길',
    'reservation': '상담예약',
    'area': '지역안내',
    'blog': '블로그',
    'before-after': '치료전후',
    'notices': '공지사항',
    'admin': '관리자',
    'implant': '임플란트',
    'digital-prosthesis': '디지털 보철',
    'invisalign': '인비절라인',
    'cosmetic': '심미보철',
    'wisdom-tooth': '사랑니 발치',
    'cavity': '충치치료',
    'root-canal': '신경치료',
    'crown': '크라운',
    'resin': '레진',
    'whitening': '미백',
    'scaling': '스케일링',
    'gum': '잇몸치료',
    'tmj': '턱관절',
    'bone-graft': '뼈이식 임플란트',
    'sinus-lift': '상악동 임플란트',
    'denture': '틀니',
    'prevention': '예방치료'
  }
  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    currentPath += '/' + segments[i]
    const isLast = i === segments.length - 1
    items.push({
      name: isLast ? pageTitle.split(' – ')[0].split(' | ')[0] : (pathMap[segments[i]] || segments[i]),
      url: currentPath
    })
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  }
}

// HowTo Schema 빌더 (치료 단계 Rich Results)
export function buildHowToSchema(opts: {
  name: string
  description: string
  totalTime?: string  // ISO 8601 duration e.g. "P3M" = 3 months
  estimatedCost?: { currency: string, value: string }
  steps: { name: string, text: string, image?: string, url?: string }[]
  tool?: string[]
  supply?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": opts.name,
    "description": opts.description,
    ...(opts.totalTime && { "totalTime": opts.totalTime }),
    ...(opts.estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": opts.estimatedCost.currency,
        "value": opts.estimatedCost.value
      }
    }),
    ...(opts.tool && { "tool": opts.tool.map(t => ({ "@type": "HowToTool", "name": t })) }),
    ...(opts.supply && { "supply": opts.supply.map(s => ({ "@type": "HowToSupply", "name": s })) }),
    "step": opts.steps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.name,
      "text": s.text,
      ...(s.image && { "image": s.image }),
      ...(s.url && { "url": s.url })
    }))
  }
}

// MedicalScholarlyArticle / Article Schema 빌더 (블로그용)
export function buildArticleSchema(opts: {
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string  // ISO 8601 e.g. "2026-05-27"
  dateModified?: string
  author?: string
  about?: string  // 의료 주제 (예: "임플란트")
  type?: 'Article' | 'MedicalScholarlyArticle' | 'NewsArticle' | 'BlogPosting'
  keywords?: string[]
  wordCount?: number
  articleSection?: string
}) {
  const articleType = opts.type || 'MedicalScholarlyArticle'
  return {
    "@context": "https://schema.org",
    "@type": articleType,
    "headline": opts.headline,
    "description": opts.description,
    "url": `${SITE_URL}${opts.url}`,
    "image": opts.image ? `${SITE_URL}${opts.image}` : DEFAULT_OG_IMAGE,
    "datePublished": opts.datePublished,
    "dateModified": opts.dateModified || opts.datePublished,
    "author": {
      "@type": "Person",
      "name": opts.author || "이태형",
      "jobTitle": "구강악안면외과 전문의",
      "worksFor": { "@id": `${SITE_URL}/#organization` }
    },
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}${opts.url}`
    },
    "inLanguage": "ko-KR",
    ...(opts.about && {
      "about": {
        "@type": "MedicalProcedure",
        "name": opts.about
      }
    }),
    ...(opts.keywords && { "keywords": opts.keywords.join(", ") }),
    ...(opts.wordCount && { "wordCount": opts.wordCount }),
    ...(opts.articleSection && { "articleSection": opts.articleSection }),
    "isAccessibleForFree": true,
    "specialty": {
      "@type": "MedicalSpecialty",
      "name": "Dentistry"
    }
  }
}

// Service Schema 빌더 (각 진료별 Service Rich Results)
export function buildServiceSchema(opts: {
  name: string
  description: string
  url: string
  serviceType: string  // 예: "임플란트 시술"
  areaServed?: string[]  // 예: ["영주시", "봉화군"]
  offers?: { name: string, description?: string }[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": opts.name,
    "description": opts.description,
    "serviceType": opts.serviceType,
    "url": `${SITE_URL}${opts.url}`,
    "provider": { "@id": `${SITE_URL}/#organization` },
    "areaServed": (opts.areaServed || ["영주시", "봉화군", "예천군", "안동시", "단양군"]).map(name => ({
      "@type": "City",
      "name": name
    })),
    ...(opts.offers && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": opts.name,
        "itemListElement": opts.offers.map(o => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": o.name,
            ...(o.description && { "description": o.description })
          }
        }))
      }
    })
  }
}

// FAQ Schema 빌더 (재사용용)
export function buildFAQSchema(faqs: { question: string, answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }
}

// VideoObject Schema 빌더 (영상 콘텐츠용)
export function buildVideoSchema(opts: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl?: string
  embedUrl?: string
  duration?: string  // ISO 8601 duration e.g. "PT2M30S"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": opts.name,
    "description": opts.description,
    "thumbnailUrl": opts.thumbnailUrl,
    "uploadDate": opts.uploadDate,
    ...(opts.contentUrl && { "contentUrl": opts.contentUrl }),
    ...(opts.embedUrl && { "embedUrl": opts.embedUrl }),
    ...(opts.duration && { "duration": opts.duration }),
    "publisher": { "@id": `${SITE_URL}/#organization` }
  }
}

// WebSite Schema (사이트 검색 지원)
function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": SITE_NAME,
    "alternateName": SITE_NAME_EN,
    "url": SITE_URL,
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "inLanguage": "ko",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        // ✅ 실제 동작하는 사이트 검색 URL (Sitelinks Search Box 자격 요건)
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
}

// 속성값 안의 큰따옴표가 content="..." 를 끊어 설명이 통째로 사라지던 문제 방지 (예: 요약이 "인용문"으로 시작하는 칼럼)
const attr = (v: unknown): string => String(v ?? '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ===== 공용 셸 (2026-11-05 리디자인 v3 "필름: 일상으로의 복귀", 2026-11-06 v3.1 하얀 바탕 — 흰 바탕 + 먹 글자 + 틸, Hahmlet 세리프) =====
// 헤더(브랜드·메뉴·내원안내 드롭다운·진료 상태 칩·전화·로그인·예약)·전면 드로어·푸터·모바일 하단바·FAB.
// 인라인 <style>·<script> 는 전부 public/static/tailwind.css(빌드)·app.js 로 옮겼다. GSAP·Lenis 는 홈에서만 defer 로드.
const NAV: { label: string; href: string; en: string }[] = [
  { label: '의료진', href: '/doctors', en: 'DOCTORS' },
  { label: '진료안내', href: '/treatments', en: 'TREATMENTS' },
  { label: '임플란트', href: '/treatments/implant', en: 'IMPLANT' },
  { label: '인비절라인', href: '/treatments/invisalign', en: 'INVISALIGN' },
  { label: '치료전후', href: '/before-after', en: 'CASES' },
  { label: '블로그', href: '/blog', en: 'BLOG' },
  { label: '공지사항', href: '/notices', en: 'NOTICE' },
]
const VISIT: { label: string; href: string; icon: string }[] = [
  { label: '오시는 길', href: '/directions', icon: 'pin' },
  { label: '수가 안내', href: '/pricing', icon: 'won' },
  { label: '치과 용어 사전', href: '/dictionary', icon: 'book' },
  { label: '자주 묻는 질문', href: '/faq', icon: 'question' },
]
const HUB_PATH = `/area/${encodeURIComponent('영주시')}`

export function layout(content: string, opts: LayoutOptions): string {
  const { title, description, url, schemas = [], keywords, ogType, ogImage, ogImageWidth, ogImageHeight, ogImageAlt, speakableSelectors, robots, articlePublishedTime, articleModifiedTime, canonical, breadcrumbItems, immersive } = opts
  const fullUrl = `${SITE_URL}${canonical || url}`
  const pagePath = canonical || url
  const isHome = pagePath === '/'
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE
  // 블로그 대표 이미지(/api/images/*)처럼 크기를 모르는 og 는 1200×630 으로 잘못 신고하지 않는다 (2026-10-14)
  const ogDims = ogImageWidth && ogImageHeight ? { w: ogImageWidth, h: ogImageHeight } : pageOgImage === DEFAULT_OG_IMAGE ? { w: 1200, h: 630 } : null
  const robotsContent = robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

  // Speakable Schema (AEO 음성 검색 최적화)
  const speakableSchema = speakableSelectors && speakableSelectors.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    // 페이지 노드 @id 를 {url}#webpage 로 — 진료 페이지의 MedicalWebPage(#webpage)와 같은 노드로 합쳐진다
    "@id": `${fullUrl}#webpage`,
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "name": title,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": speakableSelectors
    },
    "url": fullUrl
  } : null

  // 모든 Schema를 배열로 수집
  const allSchemas: object[] = [
    buildBaseSchema(),
    buildWebSiteSchema(),
    breadcrumbItems ? {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${fullUrl}#breadcrumb`,
      "itemListElement": breadcrumbItems.map((b, i) => ({ "@type": "ListItem", "position": i + 1, "name": b.name, "item": `${SITE_URL}${b.url}` }))
    } : buildBreadcrumb(url, title),
    ...schemas,
    ...(speakableSchema ? [speakableSchema] : [])
  ]
  // '<' 이스케이프 — 본문 문자열의 '</script>' 가 스크립트를 닫지 않게 (JSON 의미 동일)
  const schemasHtml = allSchemas.map(s => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n  ')

  // 기본 키워드 (모든 페이지 공통) — 중복 자동 제거
  const baseKeywords = '영주 치과, 영주 임플란트, 강남치과의원, 구강외과 전문의, 디지털 보철, 인비절라인, 영주시 치과, 영주 치과 추천, 영주 임플란트 잘하는곳, 봉화 치과, 예천 임플란트, 안동 치과, 풍기 치과, 단양 치과, 영주혁신도시 치과, 경북 임플란트, 상주 임플란트, 문경 치과'
  const mergedKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords
  const finalKeywords = [...new Set(mergedKeywords.split(',').map(k => k.trim()).filter(Boolean))].join(', ')

  // 진료 상태(KST) 초기값 — app.js 가 30초마다 갱신
  const st = todayStatus()
  const chipCls = st.state === 'open' ? ' is-open' : st.state === 'lunch' ? ' is-lunch' : ''
  const isCurrent = (href: string) => pagePath === href || (href !== '/' && pagePath.startsWith(href + '/'))
  const isVisitCurrent = VISIT.some(v => isCurrent(v.href))

  return `<!DOCTYPE html>
<html lang="ko" dir="ltr" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Google tag (gtag.js) - GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-EE3V6FDE2M"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-EE3V6FDE2M');
  </script>
  <!-- PF 1st-party 비콘 -->
  <script defer src="https://pf-dashboard-2nt.pages.dev/beacon.js"></script>
  <!-- Favicon (2026-10-14 승인본) -->
  <link rel="icon" href="/favicon.ico?v=fav20261014" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png?v=fav20261014">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png?v=fav20261014">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png?v=fav20261014">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=fav20261014">
  <title>${title}</title>
  <meta name="description" content="${attr(description)}">
  <meta name="keywords" content="${finalKeywords}">
  <meta name="author" content="${SITE_NAME}">
  <meta name="robots" content="${robotsContent}">
  <meta name="googlebot" content="${robotsContent}">
  <meta name="bingbot" content="${robotsContent}">
  <meta name="yeti" content="${robotsContent}">
  <meta name="format-detection" content="telephone=yes">
  <meta name="theme-color" content="#FFFFFF">
  <link rel="canonical" href="${fullUrl}">

  <!-- Geo/Regional SEO -->
  <meta name="geo.region" content="KR-47">
  <meta name="geo.placename" content="영주시, 경상북도">
  <meta name="geo.position" content="36.8057;128.7410">
  <meta name="ICBM" content="36.8057, 128.7410">
  <meta name="language" content="ko">

  <!-- Open Graph -->
  <meta property="og:type" content="${ogType || 'website'}">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:image" content="${pageOgImage}">
  ${ogDims ? `<meta property="og:image:width" content="${ogDims.w}">
  <meta property="og:image:height" content="${ogDims.h}">` : ''}
  <meta property="og:image:alt" content="${attr(ogImageAlt || title)}">
  ${articlePublishedTime ? `<meta property="article:published_time" content="${articlePublishedTime}">` : ''}
  ${articleModifiedTime ? `<meta property="article:modified_time" content="${articleModifiedTime}">` : ''}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attr(title)}">
  <meta name="twitter:description" content="${attr(description)}">
  <meta name="twitter:image" content="${pageOgImage}">

  <!-- Naver / Google / Bing / Healthcare meta -->
  <meta name="naver-site-verification" content="b56c6202c4fd245ed343ab587cf89959897bcfcf">
  <meta name="google-site-verification" content="SdTkpZ5-mkIKb24NvY13ajYmt--8y0LYVEdjON9iI5g">
  <meta name="msvalidate.01" content="BING_VERIFY_PLACEHOLDER">
  <meta name="subject" content="${attr(description)}">
  <meta name="classification" content="Healthcare, Dentistry">
  <meta name="coverage" content="경상북도 영주시">
  <meta name="rating" content="General">
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta http-equiv="x-dns-prefetch-control" content="on">
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://www.clarity.ms">

  <!-- Preconnect for critical third-party origins (Core Web Vitals) -->
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- hreflang -->
  <link rel="alternate" hreflang="ko-KR" href="${fullUrl}">
  <link rel="alternate" hreflang="ko" href="${fullUrl}">
  <link rel="alternate" hreflang="x-default" href="${fullUrl}">

  <!-- RSS 자동발견 -->
  <link rel="alternate" type="application/rss+xml" title="강남치과의원 블로그 RSS" href="${SITE_URL}/rss.xml">
  <link rel="alternate" type="application/rss+xml" title="강남치과의원 진료 가이드 피드" href="${SITE_URL}/feed.xml">

  <!-- Fonts: 제목 Hahmlet(Google Fonts 세리프) · 본문 Pretendard -->
  <link rel="preload" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" as="style">
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome: 하위페이지 아이콘용(비차단 로드). 홈·공용 셸은 인라인 SVG -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet"></noscript>

  <!-- Microsoft Clarity (행동 분석) — 태그 주입은 window load 뒤로 미룬다.
       Clarity 가 스타일시트 적용 전에 실행되면 스타일 없는 문서의 레이아웃을 계산하게 만들어,
       그려지지도 않은 화면과의 차이가 CLS 1.0 으로 기록된다(2026-11-05 라이브 측정, Clarity 만 차단하면 0). 큐 함수는 즉시 만든다. -->
  <script type="text/javascript">
    (function(c,l,a,r,i){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      function go(){var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);}
      if(l.readyState==='complete')go();else c.addEventListener('load',go);
    })(window, document, "clarity", "script", "yc82mxyj7e");
  </script>

  <!-- Structured Data (SEO/AEO) -->
  ${schemasHtml}

  <!-- 등장 연출 게이트: 동작 줄이기가 아니고 IntersectionObserver 가 있을 때만 html.mx (CSS 가 숨김 시작) -->
  <script>(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)document.documentElement.classList.add('mx')}catch(e){}})();</script>
  <!-- 디자인 시스템 CSS (Tailwind 빌드, ?v= 는 내용 해시) -->
  <link rel="stylesheet" href="${TAILWIND_CSS_HREF}">
${immersive ? `  <link rel="stylesheet" href="/static/immersive.css?v=${__IMMERSIVE_CSS_V__}">` : ''}
</head>
<body class="font-pretendard">
  <div id="scroll-progress" class="scroll-progress" aria-hidden="true"></div>
  <a href="#main-content" class="skip-nav">본문 바로가기</a>

  <!-- ===== Header ===== -->
  <header id="main-header" class="site-head" role="banner">
    <div class="site-head-in">
      <a href="/" class="brand" aria-label="강남치과의원 홈으로 이동">
        <img src="/static/logo.png" alt="" width="262" height="223" decoding="async">
        <span class="brand-text"><span class="brand-ko">강남치과의원</span><span class="brand-en">GANGNAM DENTAL CLINIC · YEONGJU</span></span>
      </a>
      <nav class="nav" aria-label="메인 네비게이션">
        <ul>
          ${NAV.map(n => `<li><a href="${n.href}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
          <li>
            <button type="button" aria-haspopup="true" aria-expanded="false"${isVisitCurrent ? ' aria-current="page"' : ''}>내원안내${icon('chevronDown')}</button>
            <ul class="sub">
              ${VISIT.map(v => `<li><a href="${v.href}">${icon(v.icon)}${v.label}</a></li>`).join('')}
            </ul>
          </li>
        </ul>
      </nav>
      <div class="head-actions">
        <span class="status-chip head-only${chipCls}" id="clinic-status-badge" data-status><span class="dot" aria-hidden="true"></span><span class="txt">${st.text}</span></span>
        <a href="tel:${PHONE_DISPLAY}" class="head-tel" aria-label="전화 상담 ${PHONE_DISPLAY}">${icon('phone')}${PHONE_DISPLAY}</a>
        <div id="auth-nav" class="head-auth"><a href="/login" id="loginBtnDesktop">${icon('login')}로그인</a></div>
        <div id="auth-user" class="head-auth hidden"><a href="/before-after">${icon('user')}<span id="auth-user-name">회원</span></a><button id="auth-logout-btn" type="button" aria-label="로그아웃">${icon('logout')}</button></div>
        <a href="/reservation" class="btn btn-primary btn-sm head-cta">${icon('calendar')}상담예약</a>
        <button id="mobile-menu-btn" class="burger" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
      </div>
    </div>

    <!-- 모바일 드로어(전면 시트) -->
    <div id="mobile-menu" class="drawer" hidden role="navigation" aria-label="모바일 네비게이션">
      <div class="drawer-top">
        <span class="status-chip${chipCls}" id="mobile-clinic-status" data-status><span class="dot" aria-hidden="true"></span><span class="txt">${st.text}</span></span>
        <a href="tel:${PHONE_DISPLAY}">${PHONE_DISPLAY}</a>
      </div>
      <ul class="drawer-list">
        <li><a href="/"><span>홈</span><span class="mono">HOME</span></a></li>
        ${NAV.map(n => `<li><a href="${n.href}"><span>${n.label}</span><span class="mono">${n.en}</span></a></li>`).join('')}
      </ul>
      <div class="drawer-sub">
        ${VISIT.map(v => `<a href="${v.href}">${icon(v.icon)}${v.label}</a>`).join('')}
      </div>
      <div class="drawer-hours">
        ${HOURS_LINES.map(h => `<span>${h.day}</span><span class="mono">${h.time}</span>`).join('')}
      </div>
      <div class="drawer-cta">
        <a href="/reservation" class="btn btn-primary">${icon('calendar')}상담 예약</a>
        <a href="tel:${PHONE_DISPLAY}" class="btn btn-ghost">${icon('phone')}전화 상담</a>
      </div>
      <div id="mobile-auth-nav" class="drawer-auth"><a href="/login" id="loginBtnMobile">로그인 / 회원가입</a></div>
      <div id="mobile-auth-user" class="drawer-auth hidden"><span><span id="mobile-user-name">회원</span>님</span><button id="mobile-logout-btn" type="button">로그아웃</button></div>
    </div>
  </header>

  <!-- ===== Main ===== -->
  <main id="main-content" role="main">
    ${markArticleEndCta(content, pagePath)}
  </main>

  <!-- ===== Footer ===== -->
  <footer class="foot" role="contentinfo">
    <div class="rule" aria-hidden="true"></div>
    <div class="foot-in">
      <div class="foot-top">
        <div>
          <a href="/" class="brand" aria-label="강남치과의원 홈">
            <img src="/static/logo.png" alt="" width="262" height="223" loading="lazy" decoding="async">
            <span class="brand-text"><span class="brand-ko">강남치과의원</span><span class="brand-en">GANGNAM DENTAL CLINIC</span></span>
          </a>
          <p class="foot-slogan">일상으로의 빠른 복귀, 강남치과의 기쁨입니다.</p>
          <p>구강악안면외과 전문의 2인이 직접 진료하는 경북 영주시 프리미엄 치과의원.</p>
          <p>경북 영주시 대학로 217, 2층 · 택지 사거리 모모제인 건물</p>
          <div class="foot-social">
            <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer" aria-label="네이버 블로그에서 강남치과의원 보기">${icon('blog')}</a>
            <a href="${NAVER_MAP_URL}" target="_blank" rel="noopener noreferrer nofollow" aria-label="네이버 지도에서 강남치과의원 보기">${naverMark(15)}</a>
            <a href="tel:${PHONE_DISPLAY}" aria-label="전화 상담 ${PHONE_DISPLAY}">${icon('phone')}</a>
          </div>
        </div>
        <nav aria-label="진료 메뉴">
          <span class="foot-h" role="heading" aria-level="3">진료</span>
          <ul>
            <li><a href="/treatments/implant">임플란트</a></li>
            <li><a href="/treatments/invisalign">인비절라인</a></li>
            <li><a href="/treatments/digital-prosthesis">디지털 보철</a></li>
            <li><a href="/treatments/cosmetic">심미보철</a></li>
            <li><a href="/treatments/wisdom-tooth">사랑니발치</a></li>
            <li><a href="/treatments/bone-graft">뼈이식</a></li>
            <li><a href="/treatments">전체 진료 보기 →</a></li>
          </ul>
        </nav>
        <nav aria-label="안내 메뉴">
          <span class="foot-h" role="heading" aria-level="3">안내</span>
          <ul>
            <li><a href="/doctors">의료진</a></li>
            <li><a href="/before-after">치료전후</a></li>
            <li><a href="/blog">블로그</a></li>
            <li><a href="/notices">공지사항</a></li>
            <li><a href="/dictionary">용어사전</a></li>
            <li><a href="/faq">자주묻는질문</a></li>
            <li><a href="/pricing">비용안내</a></li>
            <li><a href="/directions">오시는길</a></li>
            ${pagePath === HUB_PATH ? '' : `<li><a href="${HUB_PATH}">영주 치과</a></li>`}
            <li><a href="/reservation">상담예약</a></li>
          </ul>
        </nav>
        <div>
          <span class="foot-h" role="heading" aria-level="3">진료시간</span>
          <div class="foot-hours">
            ${HOURS_LINES.map(h => `<div><span>${h.day}</span><span class="mono">${h.time}</span></div>`).join('')}
            <span class="cont">${icon('clock')}온라인 문의는 진료시간 내 3시간 이내 회신</span>
          </div>
        </div>
      </div>
      <div class="foot-legal">
        <p><span>강남치과의원</span><span>대표 이태형</span><span>사업자등록번호 문의</span><span>경북 영주시 대학로 217, 2층</span><span>전화 ${PHONE_DISPLAY}</span></p>
      </div>
      <div class="foot-bottom">
        <span>&copy; 2017-${new Date().getFullYear()} 강남치과의원. All rights reserved.</span>
        <span><a href="/all-pages">전체 페이지</a><a href="/sitemap.xml">사이트맵</a></span>
      </div>
    </div>
  </footer>

  <!-- ===== Mobile bottom bar ===== -->
  <nav class="mbar" aria-label="빠른 연락">
    <a href="tel:${PHONE_DISPLAY}" aria-label="전화 상담 ${PHONE_DISPLAY}">${icon('phone')}<span>전화</span></a>
    <a href="/reservation" class="mbar-primary" aria-label="상담 예약하기">${icon('calendar')}<span>예약</span></a>
    <a href="/directions" aria-label="오시는 길">${icon('pin')}<span>길찾기</span></a>
    <a href="${BLOG_URL}" target="_blank" rel="noopener noreferrer" aria-label="네이버 블로그">${icon('blog')}<span>블로그</span></a>
  </nav>

  <!-- ===== Desktop floating ===== -->
  <div class="fab-col" aria-label="빠른 연락 버튼">
    <a href="${BLOG_URL}" class="fab fab-naver" target="_blank" rel="noopener noreferrer" aria-label="네이버 블로그 바로가기">${naverMark(18)}</a>
    <a href="tel:${PHONE_DISPLAY}" class="fab fab-phone" aria-label="전화 상담 ${PHONE_DISPLAY}">${icon('phone')}</a>
    <button type="button" class="fab fab-top" id="fab-top" aria-label="페이지 맨 위로 이동">${icon('arrowUp')}</button>
  </div>

  <!-- ===== Scripts ===== -->
${immersive ? `  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>` : ''}
  <script src="/static/app.js?v=${__APP_JS_V__}" defer></script>
${immersive ? `  <script src="/static/immersive.js?v=${__IMMERSIVE_JS_V__}" defer></script>` : ''}
</body>
</html>`
}
