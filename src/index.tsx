import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { mainPage, mainPageSchemas } from './pages/main'
import { doctorsPage, doctorProfilePage } from './pages/doctors'
import { treatmentsPage, treatmentDetailPage } from './pages/treatments'
import { reservationPage } from './pages/reservation'
import { directionsPage } from './pages/directions'
import { pricingPage } from './pages/pricing'
import { areaPage } from './pages/area'
import { layout } from './layout'

const app = new Hono()

app.use('/api/*', cors())

// ===== SEO: robots.txt =====
app.get('/robots.txt', (c) => {
  c.header('Content-Type', 'text/plain')
  return c.body(`User-agent: *
Allow: /
Disallow: /api/

# Sitemap
Sitemap: https://gndentalclinic.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`)
})

// ===== SEO: sitemap.xml =====
app.get('/sitemap.xml', (c) => {
  const baseUrl = 'https://gndentalclinic.com'
  const today = new Date().toISOString().split('T')[0]
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/doctors', priority: '0.9', changefreq: 'monthly' },
    { url: '/doctors/lee-taehyung', priority: '0.8', changefreq: 'monthly' },
    { url: '/doctors/choi-minhye', priority: '0.8', changefreq: 'monthly' },
    { url: '/treatments', priority: '0.9', changefreq: 'monthly' },
    { url: '/treatments/implant', priority: '0.9', changefreq: 'monthly' },
    { url: '/treatments/cerec', priority: '0.9', changefreq: 'monthly' },
    { url: '/treatments/invisalign', priority: '0.8', changefreq: 'monthly' },
    { url: '/treatments/cosmetic', priority: '0.7', changefreq: 'monthly' },
    { url: '/treatments/wisdom-tooth', priority: '0.7', changefreq: 'monthly' },
    { url: '/treatments/cavity', priority: '0.6', changefreq: 'monthly' },
    { url: '/treatments/root-canal', priority: '0.6', changefreq: 'monthly' },
    { url: '/treatments/crown', priority: '0.6', changefreq: 'monthly' },
    { url: '/treatments/resin', priority: '0.5', changefreq: 'monthly' },
    { url: '/treatments/whitening', priority: '0.5', changefreq: 'monthly' },
    { url: '/treatments/scaling', priority: '0.5', changefreq: 'monthly' },
    { url: '/treatments/gum', priority: '0.5', changefreq: 'monthly' },
    { url: '/treatments/tmj', priority: '0.5', changefreq: 'monthly' },
    { url: '/treatments/denture', priority: '0.5', changefreq: 'monthly' },
    { url: '/treatments/bone-graft', priority: '0.6', changefreq: 'monthly' },
    { url: '/treatments/pediatric', priority: '0.5', changefreq: 'monthly' },
    { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/directions', priority: '0.7', changefreq: 'yearly' },
    { url: '/reservation', priority: '0.8', changefreq: 'yearly' },
    // 지역 SEO 페이지
    { url: '/area/%EC%98%81%EC%A3%BC%EC%8B%9C', priority: '0.6', changefreq: 'yearly' },
    { url: '/area/%ED%92%8D%EA%B8%B0', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EB%B4%89%ED%99%94', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EC%98%88%EC%B2%9C', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EC%95%88%EB%8F%99', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EB%8B%A8%EC%96%91', priority: '0.5', changefreq: 'yearly' },
  ]

  const urls = pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')

  c.header('Content-Type', 'application/xml')
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`)
})

// ===== 메인 페이지 =====
app.get('/', (c) => c.html(layout(mainPage(), {
  title: '영주 치과 강남치과의원 | 구강외과 전문의 2인 · 임플란트 · CEREC 당일보철',
  description: '경북 영주시 강남치과의원. 구강악안면외과 전문의 2인이 직접 진료합니다. 임플란트, CEREC 당일보철, 인비절라인, 사랑니 발치, 심미보철. 대학병원급 장비 완비. 054-636-8222.',
  url: '/',
  keywords: '영주 임플란트 잘하는곳, 영주 치과 추천, 영주 당일보철, 영주 사랑니발치, 구강외과 전문의 영주, 영주시 임플란트 가격',
  schemas: mainPageSchemas(),
  speakableSelectors: ['[data-speakable]', '#heroTitle', '#heroSub'],
  articleModifiedTime: new Date().toISOString().split('T')[0]
})))

// ===== 의료진 =====
app.get('/doctors', (c) => c.html(layout(doctorsPage(), {
  title: '강남치과의원 의료진 | 구강악안면외과 전문의 2인 – 이태형·최민혜 원장',
  description: '강남치과의원 이태형 대표원장, 최민혜 원장. 구강악안면외과 전문의 2인이 모든 수술을 직접 시행합니다. 고려대 구로병원, 인제대 백병원 레지던트 수료.',
  url: '/doctors',
  keywords: '영주 구강외과 전문의, 영주 임플란트 전문의, 이태형 원장, 최민혜 원장, 구강악안면외과',
  ogType: 'profile',
  speakableSelectors: ['[data-speakable]', '#dHeroTitle', '#dHeroSub'],
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "이태형",
      "jobTitle": "대표원장",
      "medicalSpecialty": "Oral and Maxillofacial Surgery",
      "description": "구강악안면외과 전문의. 고려대학교 구강악안면외과 석사, 고려대학교 구로병원 레지던트 수료.",
      "worksFor": { "@id": "https://gndentalclinic.com/#organization" },
      "alumniOf": [
        { "@type": "EducationalOrganization", "name": "고려대학교 구강악안면외과" },
        { "@type": "Hospital", "name": "고려대학교 구로병원" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "최민혜",
      "jobTitle": "원장",
      "medicalSpecialty": "Oral and Maxillofacial Surgery",
      "description": "구강악안면외과 전문의. 인제대학교 백병원 구강악안면외과 레지던트 수료.",
      "worksFor": { "@id": "https://gndentalclinic.com/#organization" },
      "alumniOf": [
        { "@type": "EducationalOrganization", "name": "고려대학교 구강악안면외과" },
        { "@type": "Hospital", "name": "인제대학교 백병원" }
      ]
    }
  ]
})))

app.get('/doctors/:slug', (c) => {
  const slug = c.req.param('slug')
  const result = doctorProfilePage(slug)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/doctors/${slug}`,
    ogType: 'profile'
  }))
})

// ===== 진료 안내 =====
app.get('/treatments', (c) => c.html(layout(treatmentsPage(), {
  title: '강남치과의원 진료안내 | 임플란트·당일보철·인비절라인·심미보철·사랑니',
  description: '강남치과의원 전체 진료 안내. 임플란트, CEREC 당일보철, 인비절라인 투명교정, 심미보철, 사랑니 발치, 충치치료, 신경치료 등. 각 분야 전문의가 직접 진료합니다.',
  url: '/treatments',
  keywords: '영주 임플란트, 영주 당일보철, 영주 인비절라인, 영주 심미보철, 영주 사랑니'
})))

app.get('/treatments/:slug', (c) => {
  const slug = c.req.param('slug')
  const result = treatmentDetailPage(slug)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/treatments/${slug}`,
    keywords: `영주 ${result.title.split(' – ')[0]}, ${result.title.split(' – ')[0]} 잘하는곳, 경북 ${result.title.split(' – ')[0]}`,
    ogType: 'article',
    schemas: result.schemas || []
  }))
})

// ===== 예약/상담 =====
app.get('/reservation', (c) => c.html(layout(reservationPage(), {
  title: '강남치과의원 상담 예약 | 무료 상담 · 054-636-8222',
  description: '강남치과의원 무료 상담 예약. 전화 054-636-8222 또는 온라인으로 간편하게 예약하세요. 구강외과 전문의가 직접 상담드립니다.',
  url: '/reservation',
  keywords: '영주 치과 예약, 강남치과 상담, 영주 임플란트 상담'
})))

// ===== 오시는 길 =====
app.get('/directions', (c) => c.html(layout(directionsPage(), {
  title: '강남치과의원 오시는 길 | 영주시 대학로 217 · 주차 가능 · 영주역 10분',
  description: '경북 영주시 대학로 217, 2층 (택지 리첼 사거리). 건물 앞 넉넉한 주차 공간. 영주역에서 택시 10분. 풍기, 봉화, 예천, 안동, 단양에서 접근 용이. 054-636-8222.',
  url: '/directions',
  keywords: '영주 강남치과 위치, 강남치과 주소, 영주 치과 주차, 영주 대학로 치과, 영주 치과 오시는길'
})))

// ===== 비용 안내 =====
app.get('/pricing', (c) => c.html(layout(pricingPage(), {
  title: '강남치과의원 진료비용 안내 | 임플란트·보철·교정 가격',
  description: '강남치과의원 임플란트, 인비절라인, CEREC 당일보철, 심미보철 등 진료비용을 안내합니다. 무료 상담 후 정확한 견적을 받아보세요. 054-636-8222.',
  url: '/pricing',
  keywords: '영주 임플란트 가격, 영주 치과 비용, 영주 인비절라인 가격, 영주 당일보철 비용'
})))

// ===== 지역 SEO =====
app.get('/area/:region', (c) => {
  const region = c.req.param('region')
  const result = areaPage(region)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/area/${region}`,
    keywords: `${decodeURIComponent(region)} 치과, ${decodeURIComponent(region)} 임플란트, ${decodeURIComponent(region)} 근처 치과`
  }))
})

// ===== API =====
app.get('/api/health', (c) => c.json({ status: 'ok', clinic: '강남치과의원' }))

export default app
