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

const SITE_URL = 'https://gndentalclinic.com'
const SITE_NAME = '강남치과의원'
const SITE_NAME_EN = 'Gangnam Dental Clinic'
const PHONE = '+82-54-636-8222'
const PHONE_DISPLAY = '054-636-8222'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
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
    "logo": `${SITE_URL}/favicon.svg`,
    "image": `${SITE_URL}/favicon.svg`,
    "description": "경북 영주시 강남치과의원. 구강악안면외과 전문의 2인이 직접 진료하는 프리미엄 치과. 임플란트, CEREC 당일보철, 인비절라인, 심미보철 전문.",
    "slogan": "빠르게 낫고, 정확하게 오래가는 치과",
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
      "description": "점심시간 13:00-14:00, 토·일·공휴일 휴무"
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
      { "@type": "MedicalProcedure", "name": "CEREC 당일보철", "procedureType": "Noninvasive" },
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
      NAVER_MAP_URL
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5"
    },
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
    'pricing': '비용안내',
    'directions': '오시는길',
    'reservation': '상담예약',
    'area': '지역안내',
    'blog': '블로그',
    'before-after': '치료전후',
    'notices': '공지사항',
    'admin': '관리자'
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
    "inLanguage": "ko"
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
  const baseKeywords = '영주 치과, 영주 임플란트, 강남치과의원, 구강외과 전문의, CEREC 당일보철, 인비절라인, 영주시 치과'
  const finalKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords

  return `<!DOCTYPE html>
<html lang="ko" dir="ltr" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
  <!-- <meta name="naver-site-verification" content="YOUR_NAVER_CODE"> -->
  <!-- <meta name="google-site-verification" content="YOUR_GOOGLE_CODE"> -->
  <meta name="subject" content="${description}">
  <meta name="classification" content="Healthcare, Dentistry">
  <meta name="coverage" content="경상북도 영주시">
  <meta name="rating" content="General">
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta http-equiv="x-dns-prefetch-control" content="on">
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://cdn.tailwindcss.com">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">

  <!-- hreflang (single language) -->
  <link rel="alternate" hreflang="ko" href="${fullUrl}">
  <link rel="alternate" hreflang="x-default" href="${fullUrl}">

  <!-- Fonts -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            royal: { 50:'#F3FBFB', 100:'#E2F5F5', 200:'#C3EBEB', 300:'#93DBDC', 400:'#4BC3C5', DEFAULT:'#10AFB2', dark:'#0C8385', 900:'#085759' },
            gold: { 50:'#FBF8F0', 100:'#F5EDD8', DEFAULT:'#C9A96E', dark:'#A88B3C' },
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

  <!-- GSAP + ScrollTrigger -->
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
      --gold: #C9A96E;
      --gold-dark: #A88B3C;
      --charcoal: #1C1C1E;
      --white: #FFFFFF;
      --lavender: #F3FBFB;
    }
    * { font-family: 'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    body { color: #1C1C1E; background: #FFFFFF; overflow-x: hidden; }

    /* ===== Premium Typography ===== */
    .display-hero { font-size: clamp(3rem, 8vw, 7rem); line-height: 1.02; letter-spacing: -0.04em; font-weight: 900; }
    .display-xl { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.06; letter-spacing: -0.035em; font-weight: 800; }
    .display-lg { font-size: clamp(2rem, 4.5vw, 3.5rem); line-height: 1.1; letter-spacing: -0.025em; font-weight: 700; }
    .display-md { font-size: clamp(1.5rem, 3vw, 2.25rem); line-height: 1.2; letter-spacing: -0.02em; font-weight: 700; }

    /* ===== Royal Purple Gradients ===== */
    .royal-grad { background: linear-gradient(135deg, #4BC3C5, #10AFB2 40%, #0C8385); }
    .royal-grad-text { background: linear-gradient(135deg, #0C8385, #10AFB2 30%, #4BC3C5 60%, #10AFB2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .royal-glow { box-shadow: 0 8px 32px rgba(16,175,178,0.25), 0 2px 8px rgba(16,175,178,0.12); }
    .royal-border { border: 1px solid rgba(16,175,178,0.15); }
    .royal-border-glow { border: 1px solid rgba(16,175,178,0.2); box-shadow: 0 4px 24px rgba(16,175,178,0.1); }
    .royal-line-h { height: 1px; background: linear-gradient(90deg, transparent, rgba(16,175,178,0.15), transparent); }

    /* ===== Gold Accent ===== */
    .gold-accent { color: var(--gold); }
    .gold-accent-bg { background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.15); }
    .gold-grad-text { background: linear-gradient(135deg, #A88B3C, #C9A96E 50%, #A88B3C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    /* ===== Glass Effects ===== */
    .glass-white { background: rgba(255,255,255,0.85); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); }
    .glass-lavender { background: rgba(248,245,251,0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
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
      transform: translateY(-8px) scale(1.005);
      box-shadow: 0 30px 80px rgba(0,0,0,0.06), 0 8px 30px rgba(16,175,178,0.08);
      border-color: rgba(16,175,178,0.15);
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
      display: inline-flex; align-items: center; gap: 10px;
      padding: 18px 40px;
      background: linear-gradient(135deg, #4BC3C5 0%, #10AFB2 40%, #0C8385 100%);
      color: #fff; font-weight: 700; font-size: 15px;
      border-radius: 100px; border: none; cursor: pointer;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 6px 30px rgba(16,175,178,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
      position: relative; overflow: hidden;
      text-decoration: none;
    }
    .btn-primary::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
      transition: left 0.7s;
    }
    .btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 50px rgba(16,175,178,0.4), inset 0 1px 0 rgba(255,255,255,0.2); }
    .btn-primary:hover::before { left: 100%; }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 18px 40px;
      border: 2px solid rgba(16,175,178,0.3);
      color: var(--royal); font-weight: 700; font-size: 15px;
      border-radius: 100px; cursor: pointer; background: transparent;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
    }
    .btn-outline:hover { background: var(--royal); color: #fff; border-color: var(--royal); box-shadow: 0 8px 40px rgba(16,175,178,0.25); transform: translateY(-2px); }

    .btn-subtle {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 18px 40px;
      border: 1.5px solid rgba(0,0,0,0.08);
      color: var(--charcoal); font-weight: 700; font-size: 15px;
      border-radius: 100px; cursor: pointer; background: rgba(0,0,0,0.02);
      transition: all 0.5s;
      text-decoration: none;
    }
    .btn-subtle:hover { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.12); transform: translateY(-2px); }

    /* ===== Section helpers ===== */
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 20px; border-radius: 100px;
      font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .section-label-royal { background: rgba(16,175,178,0.06); color: var(--royal); border: 1px solid rgba(16,175,178,0.12); }
    .section-label-light { background: rgba(0,0,0,0.03); color: rgba(0,0,0,0.4); border: 1px solid rgba(0,0,0,0.05); }

    .divider-royal { width: 48px; height: 2px; background: linear-gradient(90deg, var(--royal), var(--royal-light)); border-radius: 2px; }

    /* ===== Logo nav shadow ===== */
    .royal-grad-shadow { box-shadow: 0 4px 20px rgba(16,175,178,0.2); }

    /* ===== Animations ===== */
    .reveal { opacity: 0; transform: translateY(50px); }
    .reveal-left { opacity: 0; transform: translateX(-50px); }
    .reveal-right { opacity: 0; transform: translateX(50px); }
    .reveal-scale { opacity: 0; transform: scale(0.92); }

    /* ===== Patterns ===== */
    .dot-pattern {
      background-image: radial-gradient(circle, rgba(16,175,178,0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }
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
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
      padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
      display: none;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(24px);
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    @media (max-width: 768px) {
      .floating-cta { display: flex; gap: 10px; }
      body { padding-bottom: 82px; }
    }

    /* ===== Marquee ===== */
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .marquee-track { animation: marquee 40s linear infinite; }

    /* ===== Orbs ===== */
    .orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
    .orb-royal { background: rgba(16,175,178,0.06); }
    .orb-lavender { background: rgba(226,245,245,0.3); }

    /* ===== Counter ===== */
    .counter { font-variant-numeric: tabular-nums; }

    /* ===== Image placeholder ===== */
    .img-placeholder {
      background: linear-gradient(135deg, #F3FBFB 0%, #E2F5F5 30%, #E8F7F7 50%, #E2F5F5 70%, #F3FBFB 100%);
      background-size: 300% 300%;
      animation: shimmer 4s ease infinite;
    }
    @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

    /* ===== Page transition ===== */
    .page-transition { animation: pageIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes pageIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    /* ===== FAQ ===== */
    details summary::-webkit-details-marker { display: none; }
    details[open] .faq-icon { transform: rotate(45deg); }

    /* ===== Float animation ===== */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes float-delayed { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes pulse-royal { 0%,100%{box-shadow:0 0 20px rgba(16,175,178,0.15)} 50%{box-shadow:0 0 40px rgba(16,175,178,0.3)} }

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
    .css-particle:nth-child(odd) { background: var(--gold); }
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
      pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
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
  </style>
</head>
<body class="font-pretendard page-transition">

  <!-- Cursor glow (desktop only) -->
  <div class="cursor-glow hidden md:block" id="cursorGlow" style="opacity:0"></div>

  <!-- ===== Top Bar ===== -->
  <div class="hidden md:block fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-black/[0.04]">
    <div class="max-w-[1440px] mx-auto px-8 lg:px-12 h-10 flex items-center justify-between">
      <div class="flex items-center gap-8 text-[11px] text-gray-400 tracking-wide">
        <span class="flex items-center gap-2"><span class="relative flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span></span><span class="text-emerald-500 font-medium">진료중</span> 평일 09:00-17:30</span>
        <span class="hidden lg:inline text-gray-400">경상북도 영주시 대학로 217, 2층</span>
      </div>
      <div class="flex items-center gap-6 text-[11px] text-gray-400">
        <a href="tel:054-636-8222" class="hover:text-royal transition-colors flex items-center gap-1.5"><i class="fas fa-phone text-[9px]"></i>054-636-8222</a>
        <a href="https://blog.naver.com/gndentalclinic" target="_blank" class="hover:text-royal transition-colors flex items-center gap-1.5"><i class="fas fa-blog text-[9px]"></i>Blog</a>
      </div>
    </div>
  </div>

  <!-- ===== Navigation ===== -->
  <header class="fixed top-0 md:top-10 left-0 right-0 z-50 transition-all duration-700" id="navbar">
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
      <nav class="h-16 md:h-[68px] flex items-center justify-between md:rounded-2xl md:px-8 transition-all duration-500" id="navInner" style="background:transparent;">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-3 group relative">
          <img src="/static/logo.png" alt="강남치과의원 로고" class="h-10 w-auto" width="40" height="40">
          <div>
            <div class="text-[17px] font-extrabold text-charcoal tracking-tight leading-none">강남치과</div>
            <div class="text-[9px] text-gray-300 tracking-[0.2em] font-semibold mt-0.5">GANGNAM DENTAL</div>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-0.5">
          <a href="/doctors" class="px-5 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium">
            의료진
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/treatments" class="px-5 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium">
            진료안내
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/treatments/implant" class="px-5 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium">
            임플란트
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/treatments/invisalign" class="px-5 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium">
            인비절라인
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/before-after" class="px-5 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium">
            치료전후
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <a href="/blog" class="px-5 py-2.5 text-[13px] text-gray-500 hover:text-charcoal transition-all duration-300 rounded-lg relative group font-medium">
            블로그
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-royal rounded-full group-hover:w-6 transition-all duration-300"></span>
          </a>
          <div class="w-px h-5 bg-gray-200 mx-3"></div>
          <a href="/reservation" class="btn-primary !py-2.5 !px-7 !text-[12px] !gap-2 !font-bold">
            <i class="fas fa-calendar-check text-[10px]"></i>상담예약
          </a>
        </div>

        <!-- Mobile -->
        <div class="flex items-center gap-2 lg:hidden">
          <a href="tel:054-636-8222" class="w-10 h-10 rounded-xl bg-royal/5 border border-royal/10 flex items-center justify-center text-royal text-sm">
            <i class="fas fa-phone"></i>
          </a>
          <button onclick="toggleMenu()" class="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center" id="menuBtn">
            <div class="flex flex-col gap-[5px] w-[18px]" id="hamburger">
              <span class="block h-[1.5px] w-full bg-charcoal/70 rounded transition-all origin-center" id="bar1"></span>
              <span class="block h-[1.5px] w-full bg-charcoal/70 rounded transition-all" id="bar2"></span>
              <span class="block h-[1.5px] w-full bg-charcoal/70 rounded transition-all origin-center" id="bar3"></span>
            </div>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <div class="fixed inset-0 z-40 pointer-events-none opacity-0 transition-all duration-500" id="mobileMenu">
      <div class="absolute inset-0 bg-white/[0.98] backdrop-blur-2xl pointer-events-auto"></div>
      <div class="relative z-10 h-full flex flex-col pt-24 pb-8 px-8 pointer-events-auto overflow-y-auto">
        <div class="flex-1 flex flex-col justify-center gap-1">
          <a href="/" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">홈</a>
          <a href="/doctors" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">의료진 소개</a>
          <a href="/treatments" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">진료 안내</a>
          <a href="/treatments/implant" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">임플란트</a>
          <a href="/treatments/invisalign" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">인비절라인</a>
          <a href="/before-after" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">치료 전후</a>
          <a href="/blog" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">블로그</a>
          <a href="/pricing" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">비용 안내</a>
          <a href="/directions" class="block py-4 text-2xl font-bold text-charcoal hover:text-royal transition-colors border-b border-gray-100">오시는 길</a>
        </div>
        <a href="/reservation" class="btn-primary justify-center w-full !text-base !py-5 !mt-4">
          <i class="fas fa-calendar-check"></i>상담 예약하기
        </a>
        <div class="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400">
          <a href="tel:054-636-8222" class="hover:text-royal transition"><i class="fas fa-phone mr-1.5"></i>054-636-8222</a>
          <span>평일 09:00-17:30</span>
        </div>
      </div>
    </div>
  </header>

  <!-- ===== Main Content ===== -->
  <main>
    ${content}
  </main>

  <!-- ===== Footer ===== -->
  <footer class="bg-lavender text-charcoal relative overflow-hidden border-t border-royal/[0.06]">
    <!-- Marquee -->
    <div class="border-b border-royal/[0.05] py-6 overflow-hidden">
      <div class="flex whitespace-nowrap marquee-track">
        ${Array(10).fill('<span class="mx-16 text-[11px] tracking-[0.3em] text-royal/15 font-bold uppercase">GANGNAM DENTAL CLINIC &middot; 강남치과의원</span>').join('')}
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-8 lg:px-12 pt-24 pb-16 relative">
      <div class="orb orb-royal w-[500px] h-[500px] -top-64 -right-64 opacity-10"></div>

      <!-- Main footer grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
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
            빠르게 낫고, 정확하게 오래가는 치과.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            구강악안면외과 전문의 2인이 직접 진료하는<br>경북 영주시 프리미엄 치과의원.
          </p>
          <div class="flex items-center gap-3">
            <a href="https://blog.naver.com/gndentalclinic" target="_blank" class="w-10 h-10 rounded-xl border border-royal/10 flex items-center justify-center text-gray-400 hover:border-royal hover:text-royal transition-all bg-white">
              <i class="fas fa-blog text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="lg:col-span-2">
          <h4 class="text-royal text-[10px] tracking-[0.2em] font-bold mb-8 uppercase">진료</h4>
          <ul class="space-y-3.5 text-sm text-gray-400">
            <li><a href="/treatments/implant" class="hover:text-royal transition-colors duration-300">임플란트</a></li>
            <li><a href="/treatments/invisalign" class="hover:text-royal transition-colors duration-300">인비절라인</a></li>
            <li><a href="/treatments/cerec" class="hover:text-royal transition-colors duration-300">당일보철 CEREC</a></li>
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
                <div class="text-gray-500 leading-relaxed">평일 09:00-17:30<br><span class="text-gray-300">점심 13:00-14:00 · 주말·공휴일 휴무</span></div>
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
  <div class="floating-cta">
    <a href="tel:054-636-8222" class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-100 text-charcoal text-sm font-bold border border-gray-200">
      <i class="fas fa-phone text-xs"></i>전화상담
    </a>
    <a href="/reservation" class="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl royal-grad text-white text-sm font-bold shadow-lg shadow-royal/20">
      <i class="fas fa-calendar-check text-xs"></i>상담예약
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
          navInner.style.background = 'rgba(255,255,255,0.85)';
          navInner.style.backdropFilter = 'blur(24px) saturate(180%)';
          navInner.style.webkitBackdropFilter = 'blur(24px) saturate(180%)';
          navInner.style.border = '1px solid rgba(0,0,0,0.06)';
          navInner.style.boxShadow = '0 8px 32px rgba(0,0,0,0.04)';
        }
      } else {
        navbar.classList.remove('md:top-3');
        navbar.classList.add('md:top-10');
        if(navInner) {
          navInner.style.background = 'transparent';
          navInner.style.backdropFilter = 'none';
          navInner.style.webkitBackdropFilter = 'none';
          navInner.style.border = 'none';
          navInner.style.boxShadow = 'none';
        }
      }
    });

    // ===== Mobile menu =====
    let menuOpen = false;
    function toggleMenu() {
      menuOpen = !menuOpen;
      const menu = document.getElementById('mobileMenu');
      const b1 = document.getElementById('bar1');
      const b2 = document.getElementById('bar2');
      const b3 = document.getElementById('bar3');
      if (menuOpen) {
        menu.classList.remove('opacity-0','pointer-events-none');
        menu.classList.add('opacity-100');
        b1.style.transform = 'rotate(45deg) translate(2px, 5px)';
        b2.style.opacity = '0';
        b3.style.transform = 'rotate(-45deg) translate(2px, -5px)';
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add('opacity-0','pointer-events-none');
        menu.classList.remove('opacity-100');
        b1.style.transform = '';
        b2.style.opacity = '1';
        b3.style.transform = '';
        document.body.style.overflow = '';
      }
    }

    // Init
    window.addEventListener('DOMContentLoaded', () => {
      initReveals();
      animateCounters();
    });
  </script>
</body>
</html>`
}
