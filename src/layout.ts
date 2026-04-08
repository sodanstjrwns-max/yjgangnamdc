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
  // AEO: Speakable 영역 CSS 셀렉터
  speakableSelectors?: string[]
  // SEO: noindex/nofollow 등 커스텀 robots
  robots?: string
  // SEO: 페이지 article 관련
  articlePublishedTime?: string
  articleModifiedTime?: string
}

export const SITE_URL = 'https://kndent.kr'
export const SITE_NAME = '강남치과의원'
const SITE_NAME_EN = 'Gangnam Dental Clinic'
const PHONE = '+82-54-636-8222'
const PHONE_DISPLAY = '054-636-8222'
const DEFAULT_OG_IMAGE = `${SITE_URL}/static/og-image.png`
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
    "logo": `${SITE_URL}/static/logo.png`,
    "image": `${SITE_URL}/static/logo.png`,
    "description": "경북 영주시 강남치과의원. 구강악안면외과 전문의 2인이 직접 진료하는 프리미엄 치과. 임플란트, 디지털 보철(싱글 크라운), 인비절라인, 심미보철 전문.",
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
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:30" }
    ],
    "specialOpeningHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "description": "점심시간 13:00-14:00, 접수마감 17:00, 토·일·공휴일 휴무"
    },
    "founder": {
      "@type": "Person",
      "name": "이태형",
      "jobTitle": "대표원장",
      "description": "구강악안면외과 전문의"
    },
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
      { "@type": "MedicalProcedure", "name": "상악동 거상술", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "심미보철", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "충치치료", "procedureType": "Noninvasive" },
      { "@type": "MedicalProcedure", "name": "신경치료", "procedureType": "Noninvasive" }
    ],
    "areaServed": [
      { "@type": "City", "name": "영주시" },
      { "@type": "City", "name": "봉화군" },
      { "@type": "City", "name": "예천군" },
      { "@type": "City", "name": "안동시" },
      { "@type": "City", "name": "단양군" },
      { "@type": "City", "name": "풍기읍" }
    ],
    "sameAs": [
      BLOG_URL,
      NAVER_MAP_URL,
      "https://map.kakao.com/link/search/강남치과의원 영주",
      "https://www.google.com/maps/search/강남치과의원+영주",
      "https://www.instagram.com/gndentalclinic/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "김*영" },
        "datePublished": "2025-11-15",
        "reviewBody": "임플란트 수술 받았는데 전문의 선생님이 직접 해주셔서 안심이 됐어요. 수술 후 붓기도 적고 회복이 빨랐습니다. 영주에서 이런 수준의 치과가 있어서 다행이에요.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "임플란트" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "박*수" },
        "datePublished": "2025-10-22",
        "reviewBody": "디지털 보철로 크라운 맞취습니다. 본뜨고 기다리는 불편함 없이 디지털 스캔으로 편안하게 치료받았습니다. 바쁜 직장인에게 강추합니다.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "디지털 보철(싱글 크라운)" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "이*진" },
        "datePublished": "2025-09-08",
        "reviewBody": "사랑니가 완전히 누워있어서 다른 치과에서 대학병원 가라고 했는데, 여기서 깔끔하게 빼주셨어요. 구강외과 전문의라 확실히 다르더라구요.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "사랑니 발치" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "최*아" },
        "datePublished": "2025-08-30",
        "reviewBody": "인비절라인 교정 시작했어요. iTero 스캐너로 3D 시뮬레이션 보여주시니까 교정 후 모습이 미리 보여서 결정이 쉬웠습니다. 투명해서 회사에서 아무도 모릅니다.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "인비절라인 투명교정" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "정*호" },
        "datePublished": "2025-12-03",
        "reviewBody": "봉화에서 왔는데 30분 거리라 부담 없어요. 임플란트 뼈이식까지 한 번에 해주셨고, 전문의 선생님 설명이 정말 자세합니다. 대구 안 가도 됩니다.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "뼈이식 임플란트" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "송*미" },
        "datePublished": "2025-07-18",
        "reviewBody": "시설이 정말 깨끗하고 좋아요. 피아노 있는 휴게실도 독특하고, 진료실도 유리 파티션으로 독립되어 있어서 프라이버시 보장됩니다. 스케일링 받았는데 꼼꼼하게 해주셨어요.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "Dentist", "name": "강남치과의원" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "한*석" },
        "datePublished": "2026-01-12",
        "reviewBody": "어머니 틀니 보험 적용으로 해드렸습니다. 이태형 원장님이 꼼꼼하게 맞춰주셔서 어머니가 편하다고 좋아하세요. 직원분들도 어르신한테 친절합니다.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "틀니" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "윤*경" },
        "datePublished": "2026-02-20",
        "reviewBody": "뼈가 부족하다고 다른 치과에서 임플란트 못한다고 했는데, 여기서 상악동 거상술 후 임플란트 성공적으로 했습니다. 전문의 2분이 계셔서 든든합니다.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "itemReviewed": { "@type": "MedicalProcedure", "name": "상악동 거상술" }
      }
    ],
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

// WebSite Schema (사이트 검색 지원)
function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "alternateName": SITE_NAME_EN,
    "url": SITE_URL,
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "inLanguage": "ko",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/treatments/{search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
}

export function layout(content: string, opts: LayoutOptions): string {
  const { title, description, url, schemas = [], keywords, ogType, ogImage, speakableSelectors, robots, articlePublishedTime, articleModifiedTime } = opts
  const fullUrl = `${SITE_URL}${url}`
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE
  const robotsContent = robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

  // Speakable Schema (AEO 음성 검색 최적화)
  const speakableSchema = speakableSelectors && speakableSelectors.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
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
    buildBreadcrumb(url, title),
    ...schemas,
    ...(speakableSchema ? [speakableSchema] : [])
  ]
  const schemasHtml = allSchemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ')

  // 기본 키워드 (모든 페이지 공통)
  const baseKeywords = '영주 치과, 영주 임플란트, 강남치과의원, 구강외과 전문의, 디지털 보철, 인비절라인, 영주시 치과'
  const finalKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords

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
  <!-- Favicon (logo-based, v2) -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2">
  <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png?v=2">
  <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png?v=2">
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2">
  <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png?v=2">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${finalKeywords}">
  <meta name="author" content="${SITE_NAME}">
  <meta name="robots" content="${robotsContent}">
  <meta name="googlebot" content="${robotsContent}">
  <meta name="bingbot" content="${robotsContent}">
  <meta name="yeti" content="${robotsContent}">
  <meta name="format-detection" content="telephone=yes">
  <link rel="canonical" href="${fullUrl}">

  <!-- Geo/Regional SEO -->
  <meta name="geo.region" content="KR-47">
  <meta name="geo.placename" content="영주시, 경상북도">
  <meta name="geo.position" content="36.8057;128.7410">
  <meta name="ICBM" content="36.8057, 128.7410">
  <meta name="language" content="ko">

  <!-- Open Graph -->
  <meta property="og:type" content="${ogType || 'website'}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:image" content="${pageOgImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  ${articlePublishedTime ? `<meta property="article:published_time" content="${articlePublishedTime}">` : ''}
  ${articleModifiedTime ? `<meta property="article:modified_time" content="${articleModifiedTime}">` : ''}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${pageOgImage}">

  <!-- Naver / Google / Healthcare meta -->
  <meta name="naver-site-verification" content="b56c6202c4fd245ed343ab587cf89959897bcfcf">
  <meta name="google-site-verification" content="SdTkpZ5-mkIKb24NvY13ajYmt--8y0LYVEdjON9iI5g">
  <meta name="subject" content="${description}">
  <meta name="classification" content="Healthcare, Dentistry">
  <meta name="coverage" content="경상북도 영주시">
  <meta name="rating" content="General">
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta http-equiv="x-dns-prefetch-control" content="on">
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- Preconnect for critical third-party origins (Core Web Vitals) -->
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- hreflang -->
  <link rel="alternate" hreflang="ko-KR" href="${fullUrl}">
  <link rel="alternate" hreflang="ko" href="${fullUrl}">
  <link rel="alternate" hreflang="x-default" href="${fullUrl}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>
  <link rel="preload" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" as="style">
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            royal: { 50:'#F3FBFB', 100:'#E2F5F5', 200:'#C3EBEB', 300:'#93DBDC', 400:'#4BC3C5', DEFAULT:'#10AFB2', dark:'#0C8385', 900:'#085759' },

            charcoal: { DEFAULT:'#1C1C1E', light:'#2a2a2a', 800:'#333333', 700:'#444444' },
            lavender: { DEFAULT:'#F3FBFB', light:'#F7FCFC', dark:'#E2F5F5' },
            snow: { DEFAULT:'#FFFFFF', 50:'#FAFBFC', 100:'#F5F6F8' }
          },
          fontFamily: {
            pretendard: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif']
          }
        }
      }
    }
  </script>

  <!-- Font Awesome -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">

  <!-- GSAP + ScrollTrigger (must load synchronously before inline scripts) -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

  <!-- Three.js removed for performance - using CSS particles instead -->
  
  <!-- Structured Data (SEO/AEO) -->
  ${schemasHtml}

  <style>
    :root {
      --royal: #10AFB2;
      --royal-dark: #0C8385;
      --royal-light: #E2F5F5;
      --royal-50: #F3FBFB;
      --charcoal: #1C1C1E;
      --white: #FFFFFF;
      --lavender: #F3FBFB;
    }
    * { font-family: 'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    body { color: #1C1C1E; background: #FFFFFF; overflow-x: hidden; }

    /* ===== Premium Typography ===== */
    .display-hero { font-size: clamp(1.75rem, 4.2vw, 3.6rem); line-height: 1.15; letter-spacing: -0.03em; font-weight: 900; }
    .display-xl { font-size: clamp(1.85rem, 6vw, 5rem); line-height: 1.1; letter-spacing: -0.035em; font-weight: 800; }
    .display-lg { font-size: clamp(1.6rem, 4.5vw, 3.5rem); line-height: 1.15; letter-spacing: -0.025em; font-weight: 700; }
    .display-md { font-size: clamp(1.35rem, 3vw, 2.25rem); line-height: 1.2; letter-spacing: -0.02em; font-weight: 700; }

    /* ===== Royal Purple Gradients ===== */
    .royal-grad { background: linear-gradient(135deg, #4BC3C5, #10AFB2 40%, #0C8385); }
    .royal-grad-text { background: linear-gradient(135deg, #0C8385, #10AFB2 30%, #4BC3C5 60%, #10AFB2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .royal-glow { box-shadow: 0 8px 32px rgba(16,175,178,0.25), 0 2px 8px rgba(16,175,178,0.12); }
    .royal-border { border: 1px solid rgba(16,175,178,0.15); }
    .royal-border-glow { border: 1px solid rgba(16,175,178,0.2); box-shadow: 0 4px 24px rgba(16,175,178,0.1); }
    .royal-line-h { height: 1px; background: linear-gradient(90deg, transparent, rgba(16,175,178,0.15), transparent); }

    /* ===== Accent (unified with royal) ===== */
    .royal-accent { color: var(--royal); }
    .royal-accent-bg { background: rgba(16,175,178,0.06); border: 1px solid rgba(16,175,178,0.12); }

    /* ===== Glass Effects ===== */
    .glass-royal { background: rgba(16,175,178,0.04); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(16,175,178,0.1); }

    /* ===== Cards ===== */
    .card-premium {
      background: #fff;
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: 28px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .card-premium::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 10%, #10AFB2 50%, transparent 90%);
      opacity: 0;
      transition: opacity 0.6s;
    }
    .card-premium:hover {
      transform: translateY(-4px) scale(1.002);
      box-shadow: 0 15px 40px rgba(0,0,0,0.04), 0 4px 15px rgba(16,175,178,0.06);
      border-color: rgba(16,175,178,0.15);
    }
    @media (min-width: 768px) {
      .card-premium:hover { transform: translateY(-8px) scale(1.005); box-shadow: 0 30px 80px rgba(0,0,0,0.06), 0 8px 30px rgba(16,175,178,0.08); }
    }
    .card-premium { border-radius: 20px; }
    @media (min-width: 768px) {
      .card-premium { border-radius: 28px; }
    }
    .card-premium:hover::before { opacity: 1; }

    .card-white {
      background: #FFFFFF;
      border: 1px solid rgba(0,0,0,0.06);
      border-radius: 28px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .card-white::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(16,175,178,0.05) 0%, transparent 60%);
      opacity: 0; transition: opacity 0.4s;
    }
    .card-white:hover::before { opacity: 1; }
    .card-white:hover {
      border-color: rgba(16,175,178,0.2);
      transform: translateY(-6px);
      box-shadow: 0 25px 60px rgba(0,0,0,0.06), 0 4px 16px rgba(16,175,178,0.08);
    }

    /* ===== Buttons ===== */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      background: linear-gradient(135deg, #4BC3C5 0%, #10AFB2 40%, #0C8385 100%);
      color: #fff; font-weight: 700; font-size: 14px;
      border-radius: 100px; border: none; cursor: pointer;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 6px 30px rgba(16,175,178,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
      position: relative; overflow: hidden;
      text-decoration: none;
    }
    @media (min-width: 768px) {
      .btn-primary { padding: 18px 40px; font-size: 15px; gap: 10px; }
    }
    .btn-primary::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
      transition: left 0.7s;
    }
    .btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 50px rgba(16,175,178,0.4), inset 0 1px 0 rgba(255,255,255,0.2); }
    .btn-primary:hover::before { left: 100%; }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      border: 2px solid rgba(16,175,178,0.3);
      color: var(--royal); font-weight: 700; font-size: 14px;
      border-radius: 100px; cursor: pointer; background: transparent;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
    }
    @media (min-width: 768px) {
      .btn-outline { padding: 18px 40px; font-size: 15px; gap: 10px; }
    }
    .btn-outline:hover { background: var(--royal); color: #fff; border-color: var(--royal); box-shadow: 0 8px 40px rgba(16,175,178,0.25); transform: translateY(-2px); }

    .btn-subtle {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px;
      border: 1.5px solid rgba(0,0,0,0.08);
      color: var(--charcoal); font-weight: 700; font-size: 14px;
      border-radius: 100px; cursor: pointer; background: rgba(0,0,0,0.02);
      transition: all 0.5s;
      text-decoration: none;
    }
    @media (min-width: 768px) {
      .btn-subtle { padding: 18px 40px; font-size: 15px; gap: 10px; }
    }
    .btn-subtle:hover { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.12); transform: translateY(-2px); }

    /* ===== Section helpers ===== */
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 20px; border-radius: 100px;
      font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .section-label-royal { background: rgba(16,175,178,0.06); color: var(--royal); border: 1px solid rgba(16,175,178,0.12); }
    .divider-royal { width: 48px; height: 2px; background: linear-gradient(90deg, var(--royal), var(--royal-light)); border-radius: 2px; }

    /* ===== Animations ===== */
    .reveal { opacity: 0; transform: translateY(50px); }
    .reveal-left { opacity: 0; transform: translateX(-50px); }
    .reveal-right { opacity: 0; transform: translateX(50px); }
    .reveal-scale { opacity: 0; transform: scale(0.92); }

    /* ===== Patterns ===== */
    .grid-pattern {
      background-image:
        linear-gradient(rgba(16,175,178,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(16,175,178,0.02) 1px, transparent 1px);
      background-size: 80px 80px;
    }

    /* ===== Scrollbar ===== */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #FAFBFC; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #10AFB2, #0C8385); border-radius: 4px; }

    /* ===== Mobile CTA ===== */
    .floating-cta {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9960;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      display: none;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      border-top: 1px solid rgba(0,0,0,0.06);
      box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
    }
    @media (max-width: 768px) {
      .floating-cta { display: flex; gap: 10px; }
      body { padding-bottom: 76px; }
    }

    /* ===== Mobile-specific overrides ===== */
    @media (max-width: 640px) {
      .section-label { padding: 6px 14px; font-size: 10px; letter-spacing: 0.1em; }
      .card-premium { border-radius: 16px; }
      .card-white { border-radius: 16px; }
    }

    /* ===== Marquee ===== */
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .marquee-track { animation: marquee 40s linear infinite; }

    /* ===== Orbs ===== */
    .orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
    .orb-royal { background: rgba(16,175,178,0.06); }

    /* ===== Counter ===== */
    .counter { font-variant-numeric: tabular-nums; }

    /* ===== Page transition ===== */
    .page-transition { animation: pageIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes pageIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    /* ===== FAQ ===== */
    details summary::-webkit-details-marker { display: none; }
    details[open] .faq-icon { transform: rotate(45deg); }

    /* ===== Float animation ===== */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes pulse-royal { 0%,100%{box-shadow:0 0 20px rgba(16,175,178,0.15)} 50%{box-shadow:0 0 40px rgba(16,175,178,0.3)} }

    /* ===== 3D Implant animations ===== */
    @keyframes implantPulse { 0%,100%{transform:translate(-50%,-50%) scale(1); opacity:1} 50%{transform:translate(-50%,-50%) scale(1.15); opacity:0.6} }
    @keyframes fadeInOut { 0%,100%{opacity:0} 30%,70%{opacity:1} }

    /* ===== Floating label (hero) ===== */
    .float-label {
      position: absolute;
      padding: 14px;
      border-radius: 16px;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(16,175,178,0.1);
      box-shadow: 0 20px 25px -5px rgba(16,175,178,0.06);
      pointer-events: none;
      z-index: 20;
      animation: float 5s ease-in-out infinite;
    }
    .float-label-d1 { animation-delay: -2s; }
    .float-label-d2 { animation-delay: -3.5s; }

    /* ===== Horizontal scroll snap ===== */
    .snap-x { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
    .snap-x > * { scroll-snap-align: start; }

    /* ===== CSS Particles (Three.js replacement) ===== */
    .css-particles { position: absolute; inset: 0; overflow: hidden; }
    .css-particle {
      position: absolute;
      border-radius: 50%;
      background: var(--royal);
      animation: particleFloat linear infinite;
    }
    .css-particle:nth-child(odd) { background: var(--royal-dark); }
    @keyframes particleFloat {
      0% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(30px, -40px) scale(1.2); }
      50% { transform: translate(-20px, -80px) scale(0.8); }
      75% { transform: translate(40px, -30px) scale(1.1); }
      100% { transform: translate(0, 0) scale(1); }
    }

    /* ===== Cursor glow ===== */
    .cursor-glow {
      position: fixed; width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(16,175,178,0.04) 0%, transparent 70%);
      pointer-events: none; z-index: 1; transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    }

    /* ===== Hero section BG ===== */
    .hero-white {
      background: linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 40%, #F3FBFB 100%);
    }

    /* ===== Sub page hero ===== */
    .subpage-hero {
      background: linear-gradient(180deg, #FAFBFC 0%, #F3FBFB 50%, #FFFFFF 100%);
    }

    /* ===== Section backgrounds ===== */
    .section-lavender { background: linear-gradient(180deg, #F3FBFB, #E2F5F5); }
    .section-snow { background: linear-gradient(180deg, #FAFBFC, #F5F6F8); }
    /* ===== Skip Navigation (접근성) ===== */
    .skip-nav {
      position: absolute; top: -100%; left: 50%; transform: translateX(-50%);
      padding: 12px 24px; background: var(--royal); color: #fff;
      border-radius: 0 0 12px 12px; font-weight: 700; font-size: 14px;
      z-index: 99999; transition: top 0.3s;
      text-decoration: none;
    }
    .skip-nav:focus { top: 0; }

    /* ===== Layout z-index system ===== */
    .z-topbar { z-index: 9970; pointer-events: auto; }
    .z-navbar { z-index: 9990; pointer-events: none; }
    .z-navbar-inner { pointer-events: auto; position: relative; }
    .z-mobile-menu { z-index: 9980; }
    .z-overlay-5 { z-index: 5; }
    .z-overlay-6 { z-index: 6; }
    .z-overlay-10 { z-index: 10; }
    .z-overlay-20 { z-index: 20; }
    .z-behind { z-index: -1; }

    /* ===== Mobile menu ===== */
    .mobile-menu-overlay {
      display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      opacity: 0; transition: opacity 0.4s ease;
    }
    .mobile-menu-bg {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.98);
      backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    }
    .mobile-menu-content {
      position: relative; z-index: 10; height: 100%;
      display: flex; flex-direction: column;
      padding: 96px 32px 32px 32px; overflow-y: auto;
    }
    .mobile-menu-links {
      flex: 1; display: flex; flex-direction: column;
      justify-content: center; gap: 4px;
    }

    /* ===== Nav inner default ===== */
    .nav-glass {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    }

    /* ===== Sketchfab overlays ===== */
    .sf-overlay-top {
      background: linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0) 100%);
    }
    .sf-overlay-corner {
      background: linear-gradient(135deg, white 0%, white 50%, rgba(255,255,255,0) 100%);
    }
    .sf-overlay-bottom {
      background: linear-gradient(to top, white 0%, white 30%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0) 100%);
    }

    /* ===== Hero implant glow ===== */
    .implant-glow {
      background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 50%, transparent 70%);
      animation: implantPulse 4s ease-in-out infinite;
    }

    /* ===== Scroll snap hide scrollbar ===== */
    .scrollbar-none { scrollbar-width: none; -ms-overflow-style: none; }
    .scrollbar-none::-webkit-scrollbar { display: none; }

    /* ===== Object position for doctor photos ===== */
    .obj-top-20 { object-position: center 20%; }

    /* ===== Hero stat pulse ===== */
    .pulse-royal-anim { animation: pulse-royal 3s ease infinite; }
    .pulse-royal-d1 { animation: pulse-royal 3s ease infinite; animation-delay: 1s; }
    .pulse-royal-d2 { animation: pulse-royal 3s ease infinite; animation-delay: 2s; }

    /* ===== Focus visible (accessibility) ===== */
    :focus-visible {
      outline: 3px solid var(--royal);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* ===== Core Web Vitals: CLS Prevention ===== */
    img { max-width: 100%; height: auto; }
    img[loading="lazy"] { content-visibility: auto; }

    /* ===== Mobile spacing helpers ===== */
    @media (max-width: 640px) {
      .py-32 { padding-top: 4rem !important; padding-bottom: 4rem !important; }
      .py-36 { padding-top: 4.5rem !important; padding-bottom: 4.5rem !important; }
      .py-48 { padding-top: 5rem !important; padding-bottom: 5rem !important; }
      .mb-24 { margin-bottom: 3rem !important; }
      .mb-20 { margin-bottom: 2.5rem !important; }
      .mb-16 { margin-bottom: 2rem !important; }
      .gap-16 { gap: 2.5rem !important; }
      .gap-20 { gap: 3rem !important; }
      .gap-24 { gap: 3rem !important; }
      .pt-48 { padding-top: 7rem !important; }
      .min-h-\\[480px\\] { min-height: 360px !important; }
    }
    @media (max-width: 768px) {
      /* Prevent horizontal overflow */
      html, body { overflow-x: hidden; }
      main { overflow-x: hidden; }
    }
    /* Reduce motion for accessibility + performance */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  </style>
</head>
<body class="font-pretendard page-transition">
  <!-- Skip Navigation (접근성) -->
  <a href="#main-content" class="skip-nav">본문 바로가기</a>

  <!-- Cursor glow (desktop only) -->
  <div class="cursor-glow hidden md:block" id="cursorGlow" aria-hidden="true" style="opacity:0"></div>

  <!-- ===== Top Bar ===== -->
  <div class="hidden md:block fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-black/[0.04] z-topbar" role="banner">
    <div class="max-w-[1440px] mx-auto px-8 lg:px-12 h-10 flex items-center justify-between">
      <div class="flex items-center gap-8 text-[11px] text-gray-400 tracking-wide">
        <span class="flex items-center gap-2"><span class="relative flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span></span><span class="text-emerald-500 font-medium">진료중</span> 평일 09:00-17:30 (접수마감 17:00)</span>
        <span class="hidden lg:inline text-gray-400">경상북도 영주시 대학로 217, 2층 · 모모제인 건물</span>
      </div>
      <div class="flex items-center gap-6 text-[11px] text-gray-400">
        <a href="tel:054-636-8222" class="hover:text-royal transition-colors flex items-center gap-1.5"><i class="fas fa-phone text-[9px]"></i>054-636-8222</a>
        <a href="https://blog.naver.com/gndentalclinic" target="_blank" rel="noopener noreferrer" class="hover:text-royal transition-colors flex items-center gap-1.5"><i class="fas fa-blog text-[9px]"></i>Blog</a>
      </div>
    </div>
  </div>

  <!-- ===== Navigation ===== -->
  <header class="fixed top-0 md:top-10 left-0 right-0 transition-all duration-700 z-navbar" id="navbar" role="banner">
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <nav class="h-16 md:h-[68px] flex items-center justify-between md:rounded-2xl md:px-8 px-4 transition-all duration-500 nav-glass z-navbar-inner" id="navInner" aria-label="메인 네비게이션">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group relative">
          <img src="/static/logo.png" alt="강남치과의원 로고" class="h-10 w-auto" width="40" height="40">
          <div>
            <div class="text-[17px] font-extrabold text-charcoal tracking-tight leading-none">강남치과</div>
            <div class="text-[9px] text-gray-300 tracking-[0.2em] font-semibold mt-0.5">GANGNAM DENTAL</div>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden xl:flex items-center gap-0">
          <a href="/doctors" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            의료진
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/treatments" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            진료안내
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/treatments/implant" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            임플란트
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/treatments/invisalign" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            인비절라인
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/before-after" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            치료전후
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/blog" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            블로그
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/notices" class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium whitespace-nowrap">
            공지사항
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <div class="relative group/visit">
            <button class="px-3 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative font-medium flex items-center gap-1 whitespace-nowrap">
              내원안내
              <i class="fas fa-chevron-down text-[8px] ml-0.5 transition-transform group-hover/visit:rotate-180"></i>
              <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover/visit:w-6 transition-all duration-300"></span>
            </button>
            <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/visit:opacity-100 group-hover/visit:visible transition-all duration-300">
              <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-44 py-1">
                <a href="/directions" class="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-royal/5 hover:text-royal transition-all">
                  <i class="fas fa-map-marker-alt text-xs text-gray-300"></i>오시는 길
                </a>
                <a href="/pricing" class="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-royal/5 hover:text-royal transition-all">
                  <i class="fas fa-won-sign text-xs text-gray-300"></i>수가 안내
                </a>
                <div class="border-t border-gray-100"></div>
                <a href="/dictionary" class="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-royal/5 hover:text-royal transition-all">
                  <i class="fas fa-book-medical text-xs text-gray-300"></i>치과 용어 사전
                </a>
                <a href="/faq" class="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-royal/5 hover:text-royal transition-all">
                  <i class="fas fa-circle-question text-xs text-gray-300"></i>자주 묻는 질문
                </a>
              </div>
            </div>
          </div>
          <div class="w-px h-5 bg-gray-200 mx-2"></div>
          <a href="/reservation" class="btn-primary !py-2.5 !px-5 !text-[12px] !gap-2 !font-bold whitespace-nowrap">
            <i class="fas fa-calendar-check text-[10px]"></i>상담예약
          </a>
          <!-- Auth Button (Desktop) -->
          <div id="authBtnDesktop" class="ml-2">
            <a href="/login" id="loginBtnDesktop" class="px-4 py-2.5 text-[12px] text-gray-500 hover:text-royal transition-all duration-300 rounded-lg font-bold border border-gray-200 hover:border-royal/30 flex items-center gap-1.5">
              <i class="fas fa-sign-in-alt text-[10px]"></i>로그인
            </a>
            <div id="userBtnDesktop" class="hidden relative">
              <button onclick="toggleUserMenu()" class="px-4 py-2.5 text-[12px] text-royal font-bold rounded-lg border border-royal/20 bg-royal/5 flex items-center gap-1.5 hover:bg-royal/10 transition-all">
                <i class="fas fa-user text-[10px]"></i><span id="userNameDesktop">회원</span>
              </button>
              <div id="userDropdown" class="hidden absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <a href="/before-after" class="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-royal transition-all"><i class="fas fa-images text-xs mr-2"></i>전후 사례</a>
                <button onclick="doLogout()" class="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-all border-t border-gray-50"><i class="fas fa-sign-out-alt text-xs mr-2"></i>로그아웃</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile -->
        <div class="flex items-center gap-2 xl:hidden">
          <a href="tel:054-636-8222" class="w-10 h-10 rounded-xl bg-royal/5 border border-royal/10 flex items-center justify-center text-royal text-sm" aria-label="전화 상담 054-636-8222">
            <i class="fas fa-phone" aria-hidden="true"></i>
          </a>
          <button onclick="toggleMenu()" class="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center" id="menuBtn" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mobileMenu">
            <div class="flex flex-col gap-[5px] w-[18px]" id="hamburger">
              <span class="block h-[1.5px] w-full bg-charcoal/70 rounded transition-all origin-center" id="bar1"></span>
              <span class="block h-[1.5px] w-full bg-charcoal/70 rounded transition-all" id="bar2"></span>
              <span class="block h-[1.5px] w-full bg-charcoal/70 rounded transition-all origin-center" id="bar3"></span>
            </div>
          </button>
        </div>
      </nav>
    </div>

  </header>

    <!-- Mobile Menu (OUTSIDE header to prevent stacking context issues) -->
    <div id="mobileMenu" class="mobile-menu-overlay z-mobile-menu" role="dialog" aria-label="모바일 메뉴" aria-modal="true">
      <div class="mobile-menu-bg"></div>
      <div class="mobile-menu-content">
        <nav class="mobile-menu-links" aria-label="모바일 네비게이션">
          <a href="/" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">홈</a>
          <a href="/doctors" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">의료진 소개</a>
          <a href="/treatments" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">진료 안내</a>
          <a href="/treatments/implant" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">임플란트</a>
          <a href="/treatments/invisalign" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">인비절라인</a>
          <a href="/before-after" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">치료 전후</a>
          <a href="/blog" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">블로그</a>
          <a href="/notices" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">공지사항</a>
          <div class="border-b border-gray-100">
            <div class="py-4 text-2xl font-bold text-gray-400">내원 안내</div>
            <div class="pl-4 pb-3 space-y-1">
              <a href="/directions" class="flex items-center gap-3 py-2.5 text-lg font-medium text-charcoal hover:text-royal transition-colors">
                <i class="fas fa-map-marker-alt text-sm text-royal/50 w-5 text-center"></i>오시는 길
              </a>
              <a href="/pricing" class="flex items-center gap-3 py-2.5 text-lg font-medium text-charcoal hover:text-royal transition-colors">
                <i class="fas fa-won-sign text-sm text-royal/50 w-5 text-center"></i>수가 안내
              </a>
              <a href="/dictionary" class="flex items-center gap-3 py-2.5 text-lg font-medium text-charcoal hover:text-royal transition-colors">
                <i class="fas fa-book-medical text-sm text-royal/50 w-5 text-center"></i>치과 용어 사전
              </a>
              <a href="/faq" class="flex items-center gap-3 py-2.5 text-lg font-medium text-charcoal hover:text-royal transition-colors">
                <i class="fas fa-circle-question text-sm text-royal/50 w-5 text-center"></i>자주 묻는 질문
              </a>
            </div>
          </div>
        </nav>
        <a href="/reservation" class="btn-primary justify-center w-full !text-base !py-5 !mt-4">
          <i class="fas fa-calendar-check" aria-hidden="true"></i>상담 예약하기
        </a>
        <!-- Auth (Mobile) -->
        <div id="authBtnMobile" class="mt-3">
          <a href="/login" id="loginBtnMobile" class="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-gray-200 text-gray-500 font-bold text-base hover:border-royal/30 hover:text-royal transition-all">
            <i class="fas fa-sign-in-alt"></i>로그인 / 회원가입
          </a>
          <div id="userBtnMobile" class="hidden flex items-center justify-between gap-3">
            <span class="flex-1 text-center py-4 rounded-xl bg-royal/5 border border-royal/10 text-royal font-bold text-base"><i class="fas fa-user mr-2 text-sm"></i><span id="userNameMobile">회원</span>님</span>
            <button onclick="doLogout()" class="px-6 py-4 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:text-red-500 transition-all"><i class="fas fa-sign-out-alt mr-1"></i>로그아웃</button>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400">
          <a href="tel:054-636-8222" class="hover:text-royal transition" aria-label="전화 상담"><i class="fas fa-phone mr-1.5" aria-hidden="true"></i>054-636-8222</a>
          <span>평일 09:00-17:30 · 접수마감 17:00</span>
        </div>
      </div>
    </div>

  <!-- ===== Main Content ===== -->
  <main id="main-content" role="main">
    ${content}
  </main>

  <!-- ===== Footer ===== -->
  <footer class="bg-lavender text-charcoal relative overflow-hidden border-t border-royal/[0.06]" role="contentinfo">
    <!-- Marquee -->
    <div class="border-b border-royal/[0.05] py-6 overflow-hidden">
      <div class="flex whitespace-nowrap marquee-track">
        ${Array(10).fill('<span class="mx-16 text-[11px] tracking-[0.3em] text-royal/15 font-bold uppercase">GANGNAM DENTAL CLINIC &middot; 강남치과의원</span>').join('')}
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pt-14 md:pt-24 pb-10 md:pb-16 relative">
      <div class="orb orb-royal w-[500px] h-[500px] -top-64 -right-64 opacity-10"></div>

      <!-- Main footer grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
        <!-- Brand column -->
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3 mb-8">
            <img src="/static/logo.png" alt="강남치과의원 로고" class="h-12 w-auto" width="48" height="48">
            <div>
              <div class="text-xl font-extrabold text-charcoal">강남치과의원</div>
              <div class="text-[9px] text-gray-300 tracking-[0.25em] font-semibold">GANGNAM DENTAL CLINIC</div>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-4 max-w-sm">
            일상으로의 빠른 복귀, 강남치과의 기쁨입니다.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            구강악안면외과 전문의 2인이 직접 진료하는<br>경북 영주시 프리미엄 치과의원.
          </p>
          <div class="flex items-center gap-3">
            <a href="https://blog.naver.com/gndentalclinic" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl border border-royal/10 flex items-center justify-center text-gray-400 hover:border-royal hover:text-royal transition-all bg-white">
              <i class="fas fa-blog text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Links (2-column on mobile) -->
        <div class="lg:col-span-2">
          <h4 class="text-royal text-[10px] tracking-[0.2em] font-bold mb-5 md:mb-8 uppercase">진료</h4>
          <ul class="space-y-3.5 text-sm text-gray-400">
            <li><a href="/treatments/implant" class="hover:text-royal transition-colors duration-300">임플란트</a></li>
            <li><a href="/treatments/invisalign" class="hover:text-royal transition-colors duration-300">인비절라인</a></li>
            <li><a href="/treatments/digital-prosthesis" class="hover:text-royal transition-colors duration-300">디지털 보철</a></li>
            <li><a href="/treatments/cosmetic" class="hover:text-royal transition-colors duration-300">심미보철</a></li>
            <li><a href="/treatments/wisdom-tooth" class="hover:text-royal transition-colors duration-300">사랑니발치</a></li>
            <li><a href="/treatments" class="text-royal/60 hover:text-royal transition-colors duration-300 flex items-center gap-1">전체 보기<i class="fas fa-arrow-right text-[8px]"></i></a></li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-royal text-[10px] tracking-[0.2em] font-bold mb-8 uppercase">안내</h4>
          <ul class="space-y-3.5 text-sm text-gray-400">
            <li><a href="/doctors" class="hover:text-royal transition-colors duration-300">의료진</a></li>
            <li><a href="/before-after" class="hover:text-royal transition-colors duration-300">치료전후</a></li>
            <li><a href="/blog" class="hover:text-royal transition-colors duration-300">블로그</a></li>
            <li><a href="/notices" class="hover:text-royal transition-colors duration-300">공지사항</a></li>
            <li><a href="/dictionary" class="hover:text-royal transition-colors duration-300">용어사전</a></li>
            <li><a href="/faq" class="hover:text-royal transition-colors duration-300">자주묻는질문</a></li>
            <li><a href="/pricing" class="hover:text-royal transition-colors duration-300">비용안내</a></li>
            <li><a href="/directions" class="hover:text-royal transition-colors duration-300">오시는길</a></li>
            <li><a href="/reservation" class="hover:text-royal transition-colors duration-300">상담예약</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="lg:col-span-3">
          <h4 class="text-royal text-[10px] tracking-[0.2em] font-bold mb-8 uppercase">Contact</h4>
          <div class="space-y-5 text-sm text-gray-400">
            <a href="tel:054-636-8222" class="flex items-center gap-4 group">
              <div class="w-11 h-11 rounded-xl border border-royal/10 flex items-center justify-center group-hover:border-royal group-hover:bg-royal/5 transition-all duration-300 bg-white">
                <i class="fas fa-phone text-xs text-gray-400 group-hover:text-royal transition-colors"></i>
              </div>
              <div>
                <div class="text-gray-300 text-[10px] font-semibold tracking-wider uppercase mb-0.5">전화</div>
                <div class="text-charcoal font-bold group-hover:text-royal transition-colors">054-636-8222</div>
              </div>
            </a>
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl border border-royal/10 flex items-center justify-center flex-shrink-0 bg-white">
                <i class="fas fa-map-marker-alt text-xs text-gray-400"></i>
              </div>
              <div>
                <div class="text-gray-300 text-[10px] font-semibold tracking-wider uppercase mb-0.5">주소</div>
                <div class="text-gray-500 leading-relaxed">경북 영주시 대학로 217, 2층</div>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl border border-royal/10 flex items-center justify-center flex-shrink-0 bg-white">
                <i class="fas fa-clock text-xs text-gray-400"></i>
              </div>
              <div>
                <div class="text-gray-300 text-[10px] font-semibold tracking-wider uppercase mb-0.5">진료시간</div>
                <div class="text-gray-500 leading-relaxed">평일 09:00-17:30 (접수마감 17:00)<br><span class="text-gray-300">점심 13:00-14:00 · 토·일·공휴일 휴무</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-royal/[0.06] mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-300">
        <p>&copy; 2017-${new Date().getFullYear()} 강남치과의원. All rights reserved.</p>
        <p>대표: 이태형 · 사업자등록번호: 문의</p>
      </div>
    </div>
  </footer>

  <!-- ===== Mobile Floating CTA ===== -->
  <div class="floating-cta" role="navigation" aria-label="모바일 빠른 메뉴">
    <a href="tel:054-636-8222" class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-100 text-charcoal text-sm font-bold border border-gray-200" aria-label="전화 상담 054-636-8222">
      <i class="fas fa-phone text-xs" aria-hidden="true"></i>전화상담
    </a>
    <a href="/reservation" class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl royal-grad text-white text-sm font-bold shadow-lg shadow-royal/20" aria-label="온라인 상담 예약">
      <i class="fas fa-calendar-check text-xs" aria-hidden="true"></i>상담예약
    </a>
  </div>

  <!-- ===== Scripts ===== -->
  <script>
    gsap.registerPlugin(ScrollTrigger);

    // ===== Cursor glow =====
    const cg = document.getElementById('cursorGlow');
    if (cg && window.innerWidth > 768) {
      document.addEventListener('mousemove', e => {
        cg.style.left = e.clientX + 'px';
        cg.style.top = e.clientY + 'px';
        cg.style.opacity = '1';
      });
      document.addEventListener('mouseleave', () => cg.style.opacity = '0');
    }

    // ===== Card mouse tracking =====
    document.querySelectorAll('.card-white').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
      });
    });

    // ===== Reveal animations =====
    function initReveals() {
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.to(el, { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.to(el, { opacity: 1, x: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.to(el, { opacity: 1, scale: 1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.stagger-children').forEach(parent => {
        const children = parent.querySelectorAll('.stagger-item');
        gsap.fromTo(children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power4.out', scrollTrigger: { trigger: parent, start: 'top 85%', once: true } });
      });
    }

    // ===== Counter animation =====
    function animateCounters() {
      gsap.utils.toArray('.counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target, duration: 2.5, ease: 'power2.out', snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: function() { el.innerText = prefix + Math.round(parseFloat(el.innerText)) + suffix; }
        });
      });
    }

    // ===== Nav scroll =====
    const navbar = document.getElementById('navbar');
    const navInner = document.getElementById('navInner');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 100) {
        navbar.classList.add('md:top-3');
        navbar.classList.remove('md:top-10');
        if(navInner) {
          navInner.style.background = 'rgba(255,255,255,0.95)';
          navInner.style.backdropFilter = 'blur(24px) saturate(180%)';
          navInner.style.webkitBackdropFilter = 'blur(24px) saturate(180%)';
          navInner.style.border = '1px solid rgba(0,0,0,0.08)';
          navInner.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)';
        }
      } else {
        navbar.classList.remove('md:top-3');
        navbar.classList.add('md:top-10');
        if(navInner) {
          navInner.style.background = 'rgba(255,255,255,0.95)';
          navInner.style.backdropFilter = 'blur(24px)';
          navInner.style.webkitBackdropFilter = 'blur(24px)';
          navInner.style.border = '1px solid rgba(0,0,0,0.04)';
          navInner.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
        }
      }
    });

    // ===== Mobile menu =====
    let menuOpen = false;
    function toggleMenu() {
      menuOpen = !menuOpen;
      const menu = document.getElementById('mobileMenu');
      const btn = document.getElementById('menuBtn');
      const b1 = document.getElementById('bar1');
      const b2 = document.getElementById('bar2');
      const b3 = document.getElementById('bar3');
      if (menuOpen) {
        menu.style.display = 'block';
        requestAnimationFrame(() => { menu.style.opacity = '1'; });
        b1.style.transform = 'rotate(45deg) translate(2px, 5px)';
        b2.style.opacity = '0';
        b3.style.transform = 'rotate(-45deg) translate(2px, -5px)';
        document.body.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', '메뉴 닫기');
      } else {
        menu.style.opacity = '0';
        setTimeout(() => { menu.style.display = 'none'; }, 400);
        b1.style.transform = '';
        b2.style.opacity = '1';
        b3.style.transform = '';
        document.body.style.overflow = '';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', '메뉴 열기');
      }
    }

    // ===== GA4 Custom Event Tracking =====
    function trackEvent(eventName, params = {}) {
      if (typeof gtag === 'function') {
        gtag('event', eventName, params);
      }
    }

    // 전화 클릭 추적
    document.querySelectorAll('a[href^="tel:"]').forEach(el => {
      el.addEventListener('click', () => {
        trackEvent('phone_call_click', {
          event_category: 'engagement',
          event_label: el.getAttribute('href'),
          page_location: window.location.pathname
        });
      });
    });

    // 예약 버튼 클릭 추적
    document.querySelectorAll('a[href="/reservation"], a[href*="reservation"]').forEach(el => {
      el.addEventListener('click', () => {
        trackEvent('reservation_click', {
          event_category: 'conversion',
          event_label: el.textContent.trim(),
          page_location: window.location.pathname
        });
      });
    });

    // 외부 링크 클릭 추적 (네이버블로그, 지도 등)
    document.querySelectorAll('a[target="_blank"]').forEach(el => {
      el.addEventListener('click', () => {
        trackEvent('outbound_click', {
          event_category: 'engagement',
          event_label: el.getAttribute('href'),
          page_location: window.location.pathname
        });
      });
    });

    // 스크롤 깊이 추적 (25%, 50%, 75%, 100%)
    const scrollThresholds = [25, 50, 75, 100];
    const scrollFired = new Set();
    window.addEventListener('scroll', () => {
      const scrollPct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      scrollThresholds.forEach(t => {
        if (scrollPct >= t && !scrollFired.has(t)) {
          scrollFired.add(t);
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: t + '%',
            value: t,
            page_location: window.location.pathname
          });
        }
      });
    }, { passive: true });

    // 문의 폼 제출 추적
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form && form.closest && form.closest('[data-form-type]')) {
        trackEvent('form_submit', {
          event_category: 'conversion',
          event_label: form.closest('[data-form-type]').dataset.formType || 'inquiry',
          page_location: window.location.pathname
        });
      }
    });

    // 페이지 로드 성능 추적 (Core Web Vitals → GA4)
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          trackEvent('web_vitals', {
            event_category: 'performance',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime)
          });
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch(e) {}

      // FID (First Input Delay)
      try {
        new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            trackEvent('web_vitals', {
              event_category: 'performance',
              event_label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime)
            });
          });
        }).observe({ type: 'first-input', buffered: true });
      } catch(e) {}

      // CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (!entry.hadRecentInput) clsValue += entry.value;
          });
        }).observe({ type: 'layout-shift', buffered: true });
        // Send CLS on page hide
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            trackEvent('web_vitals', {
              event_category: 'performance',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000)
            });
          }
        });
      } catch(e) {}
    }

    // Init
    window.addEventListener('DOMContentLoaded', () => {
      initReveals();
      animateCounters();
      checkAuthStatus();

      // GA4 page_view with custom dimensions
      trackEvent('page_view_custom', {
        page_category: document.querySelector('meta[name="classification"]')?.content || 'general',
        treatment_type: window.location.pathname.includes('/treatments/') ? window.location.pathname.split('/treatments/')[1] : 'none',
        page_location: window.location.pathname
      });
    });

    // ===== Auth =====
    async function checkAuthStatus() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.loggedIn && data.user) {
          // Desktop
          const loginD = document.getElementById('loginBtnDesktop');
          const userD = document.getElementById('userBtnDesktop');
          const nameD = document.getElementById('userNameDesktop');
          if (loginD) loginD.style.display = 'none';
          if (userD) userD.classList.remove('hidden');
          if (nameD) nameD.textContent = data.user.name;
          // Mobile
          const loginM = document.getElementById('loginBtnMobile');
          const userM = document.getElementById('userBtnMobile');
          const nameM = document.getElementById('userNameMobile');
          if (loginM) loginM.style.display = 'none';
          if (userM) userM.classList.remove('hidden');
          if (nameM) nameM.textContent = data.user.name;
        }
      } catch {}
    }

    function toggleUserMenu() {
      const dd = document.getElementById('userDropdown');
      if (dd) dd.classList.toggle('hidden');
    }

    // Close user dropdown on outside click
    document.addEventListener('click', function(e) {
      const dd = document.getElementById('userDropdown');
      const btn = document.getElementById('userBtnDesktop');
      if (dd && btn && !btn.contains(e.target)) dd.classList.add('hidden');
    });

    async function doLogout() {
      try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
      window.location.href = '/';
    }
  </script>
</body>
</html>`
}
