import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { createMiddleware } from 'hono/factory'
import { mainPage, mainPageSchemas } from './pages/main'
import { doctorsPage, doctorProfilePage } from './pages/doctors'
import { treatmentsPage, treatmentDetailPage } from './pages/treatments'
import { reservationPage } from './pages/reservation'
import { directionsPage } from './pages/directions'
import { pricingPage } from './pages/pricing'
import { areaPage, getAllAreaKeys } from './pages/area'
import { faqPage, allFAQs } from './pages/faq'
import { blogListPage, blogDetailPage } from './pages/blog'
import { beforeAfterListPage, beforeAfterDetailPage } from './pages/beforeafter'
import { noticeListPage, noticeDetailPage } from './pages/notices'
import { adminPage } from './pages/admin'
import { registerPage, loginPage, loginRequiredPage } from './pages/auth'
import { dictionaryListPage, dictionaryDetailPage } from './pages/dictionary'
import { layout } from './layout'

// 서버 측 content 자동 변환: plain text → HTML (저장 전 적용)
function formatContentForSave(content: string): string {
  if (!content || !content.trim()) return content;
  // 블록 레벨 HTML 태그(img, br 제외)가 이미 있으면 그대로
  if (/<(?:p|h[1-6]|div|ul|ol|li|blockquote|table|section|article|thead|tbody|tr|td|th)[\/\s>]/i.test(content)) {
    return content;
  }
  const allLines = content.split('\n');
  const tabLineCount = allLines.filter(l => l.includes('\t')).length;

  if (tabLineCount >= 3) {
    const result: string[] = [];
    const mergedTabRows: string[] = [];
    let lastWasTab = false;
    for (const line of allLines) {
      const trimmed = line.trim();
      if (/^<img\s[^>]*>$/i.test(trimmed)) { result.push(trimmed); lastWasTab = false; continue; }
      if (!trimmed) { lastWasTab = false; continue; }
      if (trimmed.includes('\t')) { mergedTabRows.push(trimmed); lastWasTab = true; }
      else if (lastWasTab && mergedTabRows.length > 0) { mergedTabRows[mergedTabRows.length - 1] += ' ' + trimmed; }
      else { result.push(`<p>${trimmed}</p>`); lastWasTab = false; }
    }
    if (mergedTabRows.length >= 2) {
      const rows = mergedTabRows.map(row => row.split('\t').map(c => c.replace(/\s+/g, ' ').trim()).filter(Boolean));
      let tableHtml = '<table><thead><tr>' + rows[0].map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      for (let i = 1; i < rows.length; i++) tableHtml += '<tr>' + rows[i].map(c => `<td>${c}</td>`).join('') + '</tr>';
      tableHtml += '</tbody></table>';
      result.push(tableHtml);
    }
    return result.join('\n');
  }

  // 일반 모드: 빈 줄 = 단락 분리
  const paragraphs = content.split(/\n\s*\n/);
  return paragraphs.map(para => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    if (/^<img\s[^>]*>$/i.test(trimmed)) return trimmed;
    const parts = trimmed.split(/(<img\s[^>]*>)/i);
    if (parts.length > 1) {
      return parts.map(part => {
        if (/^<img\s/i.test(part)) return part;
        const t = part.trim();
        if (!t) return '';
        return `<p>${t.replace(/\n/g, '<br>')}</p>`;
      }).filter(Boolean).join('\n');
    }
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  }).filter(Boolean).join('\n');
}

type Bindings = {
  DB: D1Database;
  R2: R2Bucket;
  ADMIN_KEY: string;
}

const app = new Hono<{ Bindings: Bindings }>()

// ===== 보안 헤더 (전역) =====
app.use('*', secureHeaders({
  xFrameOptions: 'SAMEORIGIN',
  xContentTypeOptions: 'nosniff',
  xXssProtection: '1; mode=block',
  referrerPolicy: 'strict-origin-when-cross-origin',
  strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: ['self'],
    payment: ['self'],
  },
}))

app.use('/api/*', cors())

// ===== 정적 페이지 캐시 헤더 (SEO 성능 최적화) =====
app.use('*', createMiddleware(async (c, next) => {
  await next()
  // HTML 페이지에 s-maxage 설정 (CDN 캐시, 브라우저 1분 + CDN 5분)
  const ct = c.res.headers.get('Content-Type') || ''
  if (ct.includes('text/html') && !c.req.path.startsWith('/api/') && !c.req.path.startsWith('/admin')) {
    c.res.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600')
    c.res.headers.set('X-Content-Type-Options', 'nosniff')
  }
}))

// ===== Admin auth middleware =====
const adminAuth = createMiddleware(async (c, next) => {
  const key = c.req.query('key')
  const adminKey = c.env.ADMIN_KEY || 'gangnam2017admin' // fallback for local dev
  if (!key || key !== adminKey) return c.json({ error: 'Unauthorized' }, 401)
  await next()
})

// ===== 비밀번호 해싱 유틸 (Web Crypto API) =====
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256)
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `${saltHex}:${hashHex}`
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(h => parseInt(h, 16)))
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256)
  const computed = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
  return computed === hashHex
}

function generateSessionId(): string {
  const arr = crypto.getRandomValues(new Uint8Array(32))
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('')
}

function getCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

async function getSessionUser(c: any): Promise<any | null> {
  try {
    const cookieHeader = c.req.header('Cookie')
    const sessionId = getCookie(cookieHeader, 'session')
    if (!sessionId) return null
    const session = await c.env.DB.prepare(
      'SELECT s.*, u.id as user_id, u.name, u.email, u.phone FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.id = ? AND s.expires_at > datetime("now")'
    ).bind(sessionId).first()
    return session || null
  } catch { return null }
}

// ===== SEO: robots.txt =====
app.get('/robots.txt', (c) => {
  c.header('Content-Type', 'text/plain')
  c.header('Cache-Control', 'public, max-age=86400')
  return c.body(`# 강남치과의원 robots.txt
# Updated: 2026-03-22

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /login
Disallow: /register

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /login
Disallow: /register

User-agent: Yeti
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /login
Disallow: /register

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /login
Disallow: /register

# Sitemaps
Sitemap: https://kndent.kr/sitemap.xml
`)
})

// ===== SEO: sitemap.xml (동적 생성 + Image Sitemap) =====
app.get('/sitemap.xml', async (c) => {
  const baseUrl = 'https://kndent.kr'
  const today = new Date().toISOString().split('T')[0]

  // 이미지 매핑 (페이지별 주요 이미지)
  const pageImages: Record<string, { loc: string; title: string; caption?: string }[]> = {
    '/': [
      { loc: `${baseUrl}/static/logo.png`, title: '강남치과의원 로고' },
      { loc: `${baseUrl}/static/og-image.png`, title: '강남치과의원 대표 이미지' },
      { loc: `${baseUrl}/static/photos/3gQUD6CP.jpg`, title: '강남치과의원 외관' },
      { loc: `${baseUrl}/static/photos/p9YyzTaw.jpg`, title: '강남치과의원 대기실' },
      { loc: `${baseUrl}/static/photos/KLnijX5L.jpg`, title: '강남치과의원 진료실' },
      { loc: `${baseUrl}/static/photos/sOkojKif.jpg`, title: '강남치과의원 상담실' },
      { loc: `${baseUrl}/static/photos/ZaCoVLBk.jpg`, title: '강남치과의원 라운지' },
      { loc: `${baseUrl}/static/photos/cihnca5u.jpg`, title: '디지털 보철 시스템' },
      { loc: `${baseUrl}/static/photos/xfkmnFB6.jpg`, title: '3D CT 촬영 장비' },
    ],
    '/doctors': [
      { loc: `${baseUrl}/static/doctors/lee-taehyung.jpg`, title: '이태형 대표원장 – 구강악안면외과 전문의' },
    ],
    '/doctors/lee-taehyung': [
      { loc: `${baseUrl}/static/doctors/lee-taehyung.jpg`, title: '이태형 대표원장 프로필', caption: '구강악안면외과 전문의, 고려대 구로병원 레지던트 수료' },
    ],
    '/directions': [
      { loc: `${baseUrl}/static/photos/3gQUD6CP.jpg`, title: '강남치과의원 건물 외관', caption: '경북 영주시 대학로 217, 모모제인 건물 2층' },
      { loc: `${baseUrl}/static/photos/p9YyzTaw.jpg`, title: '대기실', caption: '편안한 대기 공간' },
      { loc: `${baseUrl}/static/photos/KLnijX5L.jpg`, title: '진료실', caption: '최신 장비가 갖춰진 진료 공간' },
      { loc: `${baseUrl}/static/photos/sOkojKif.jpg`, title: '상담실', caption: '프라이빗 상담 공간' },
    ],
    '/treatments/implant': [
      { loc: `${baseUrl}/static/photos/xfkmnFB6.jpg`, title: '3D CT 임플란트 진단 장비' },
      { loc: `${baseUrl}/static/photos/cihnca5u.jpg`, title: '디지털 보철 시스템' },
    ],
    '/treatments/digital-prosthesis': [
      { loc: `${baseUrl}/static/photos/cihnca5u.jpg`, title: 'CEREC MC X 밀링 머신', caption: '디지털 싱글 크라운 제작 장비' },
    ],
  }

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/doctors', priority: '0.9', changefreq: 'monthly' },
    { url: '/doctors/lee-taehyung', priority: '0.8', changefreq: 'monthly' },
    { url: '/doctors/choi-minhye', priority: '0.8', changefreq: 'monthly' },
    { url: '/treatments', priority: '0.9', changefreq: 'monthly' },
    { url: '/treatments/implant', priority: '0.9', changefreq: 'monthly' },
    { url: '/treatments/digital-prosthesis', priority: '0.9', changefreq: 'monthly' },
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
    { url: '/treatments/sinus-lift', priority: '0.6', changefreq: 'monthly' },
    { url: '/treatments/prevention', priority: '0.5', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/before-after', priority: '0.8', changefreq: 'weekly' },
    { url: '/notices', priority: '0.7', changefreq: 'weekly' },
    { url: '/dictionary', priority: '0.8', changefreq: 'weekly' },
    { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/directions', priority: '0.7', changefreq: 'yearly' },
    { url: '/reservation', priority: '0.8', changefreq: 'yearly' },
    { url: '/faq', priority: '0.8', changefreq: 'monthly' },
    { url: '/faq?category=implant', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq?category=digital-prosthesis', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq?category=invisalign', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq?category=wisdom-tooth', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq?category=cosmetic', priority: '0.6', changefreq: 'monthly' },
    { url: '/faq?category=cavity', priority: '0.6', changefreq: 'monthly' },
    { url: '/faq?category=gum', priority: '0.6', changefreq: 'monthly' },
    { url: '/faq?category=general', priority: '0.6', changefreq: 'monthly' },
    ...getAllAreaKeys().map(k => ({ url: `/area/${encodeURIComponent(k)}`, priority: k === '영주시' ? '0.7' : '0.6', changefreq: 'monthly' as const })),
  ]

  // 동적 블로그 URL 추가
  let dynamicPages: typeof staticPages = []
  try {
    const blogPosts = await c.env.DB.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC').all()
    dynamicPages = dynamicPages.concat(blogPosts.results.map((p: any) => ({
      url: `/blog/${p.slug}`,
      priority: '0.6',
      changefreq: 'monthly' as const
    })))
    const baCases = await c.env.DB.prepare('SELECT slug, updated_at FROM before_after_cases WHERE is_published = 1 ORDER BY sort_order DESC').all()
    dynamicPages = dynamicPages.concat(baCases.results.map((p: any) => ({
      url: `/before-after/${p.slug}`,
      priority: '0.6',
      changefreq: 'monthly' as const
    })))
    const noticesList = await c.env.DB.prepare('SELECT slug FROM notices WHERE is_published = 1 ORDER BY published_at DESC').all()
    dynamicPages = dynamicPages.concat(noticesList.results.map((p: any) => ({
      url: `/notices/${p.slug}`,
      priority: '0.5',
      changefreq: 'monthly' as const
    })))
    // 치과 용어 사전 동적 URL
    const dictTerms = await c.env.DB.prepare('SELECT slug FROM dictionary ORDER BY term_ko').all()
    dynamicPages = dynamicPages.concat(dictTerms.results.map((p: any) => ({
      url: `/dictionary/${p.slug}`,
      priority: '0.5',
      changefreq: 'monthly' as const
    })))
  } catch (e) { /* DB not available, skip dynamic pages */ }

  const allPages = [...staticPages, ...dynamicPages]
  const urls = allPages.map(p => {
    const images = pageImages[p.url] || []
    const imageXml = images.map(img => `
      <image:image>
        <image:loc>${img.loc}</image:loc>
        <image:title>${img.title}</image:title>${img.caption ? `
        <image:caption>${img.caption}</image:caption>` : ''}
      </image:image>`).join('')
    return `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${imageXml}
  </url>`
  }).join('\n')

  c.header('Content-Type', 'application/xml')
  return c.body(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`)
})

// ===== 메인 페이지 =====
app.get('/', (c) => c.html(layout(mainPage(), {
  title: '영주 치과 강남치과의원 | 구강외과 전문의 · 임플란트 · 인비절라인 · 디지털보철',
  description: '경북 영주시 강남치과의원. 구강악안면외과 전문의 2인이 직접 진료합니다. 임플란트, 디지털 보철(싱글 크라운), 인비절라인, 사랑니 발치, 심미보철. 대학병원급 장비 완비. 054-636-8222.',
  url: '/',
  keywords: '영주 인비절라인, 영주 투명교정, 영주 임플란트 잘하는곳, 영주 치과 추천, 영주 디지털보철, 영주 사랑니발치, 구강외과 전문의 영주, 영주시 임플란트 가격',
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
      "worksFor": { "@id": "https://kndent.kr/#organization" },
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
      "worksFor": { "@id": "https://kndent.kr/#organization" },
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

  // 의료진 개별 Physician Schema + Speakable
  const physicianSchemas: Record<string, object[]> = {
    'lee-taehyung': [{
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": "https://kndent.kr/doctors/lee-taehyung#physician",
      "name": "이태형",
      "givenName": "태형",
      "familyName": "이",
      "jobTitle": "대표원장",
      "honorificPrefix": "Dr.",
      "image": "https://kndent.kr/static/doctors/lee-taehyung.jpg",
      "url": "https://kndent.kr/doctors/lee-taehyung",
      "telephone": "+82-54-636-8222",
      "medicalSpecialty": [
        { "@type": "MedicalSpecialty", "name": "Oral and Maxillofacial Surgery" },
        { "@type": "MedicalSpecialty", "name": "Implantology" }
      ],
      "description": "구강악안면외과 전문의. 고려대학교 구강악안면외과 석사, 고려대학교 구로병원 레지던트 수료. 임플란트·뼈이식·상악동 거상술 전문.",
      "knowsAbout": ["임플란트", "뼈이식", "상악동 거상술", "사랑니 발치", "구강외과 수술"],
      "worksFor": { "@id": "https://kndent.kr/#organization" },
      "memberOf": [
        { "@type": "MedicalOrganization", "name": "대한구강악안면성형재건외과학회" },
        { "@type": "MedicalOrganization", "name": "대한구강악안면외과학회" }
      ],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "고려대학교 구강악안면외과", "department": "구강악안면외과 석사" },
        { "@type": "Hospital", "name": "고려대학교 구로병원", "department": "구강악안면외과 레지던트" }
      ],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "전문의", "name": "보건복지부 구강악안면외과 전문의" },
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "인정의", "name": "대한구강악안면성형재건외과학회 인정의" }
      ],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "임플란트", "url": "https://kndent.kr/treatments/implant" },
        { "@type": "MedicalProcedure", "name": "뼈이식", "url": "https://kndent.kr/treatments/bone-graft" },
        { "@type": "MedicalProcedure", "name": "사랑니 발치", "url": "https://kndent.kr/treatments/wisdom-tooth" },
        { "@type": "MedicalProcedure", "name": "상악동 거상술", "url": "https://kndent.kr/treatments/sinus-lift" }
      ],
      "sameAs": ["https://blog.naver.com/gndentalclinic"]
    }],
    'choi-minhye': [{
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": "https://kndent.kr/doctors/choi-minhye#physician",
      "name": "최민혜",
      "givenName": "민혜",
      "familyName": "최",
      "jobTitle": "원장",
      "honorificPrefix": "Dr.",
      "url": "https://kndent.kr/doctors/choi-minhye",
      "telephone": "+82-54-636-8222",
      "medicalSpecialty": [
        { "@type": "MedicalSpecialty", "name": "Oral and Maxillofacial Surgery" },
        { "@type": "MedicalSpecialty", "name": "Prosthodontics" }
      ],
      "description": "구강악안면외과 전문의. 인제대학교 백병원 구강악안면외과 레지던트 수료. 임플란트·틀니·레이저 치료 전문.",
      "knowsAbout": ["임플란트", "틀니", "레이저 치료", "심미보철"],
      "worksFor": { "@id": "https://kndent.kr/#organization" },
      "memberOf": [
        { "@type": "MedicalOrganization", "name": "대한레이저치학회" },
        { "@type": "MedicalOrganization", "name": "대한임플란트학회" },
        { "@type": "MedicalOrganization", "name": "대한구강악안면성형재건외과학회" }
      ],
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "고려대학교 구강악안면외과", "department": "구강악안면외과 석사" },
        { "@type": "Hospital", "name": "인제대학교 백병원", "department": "구강악안면외과 레지던트" }
      ],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "전문의", "name": "보건복지부 구강악안면외과 전문의" },
        { "@type": "EducationalOccupationalCredential", "credentialCategory": "인정의", "name": "대한구강악안면성형재건외과학회 인정의" }
      ],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "임플란트", "url": "https://kndent.kr/treatments/implant" },
        { "@type": "MedicalProcedure", "name": "틀니", "url": "https://kndent.kr/treatments/denture" },
        { "@type": "MedicalProcedure", "name": "레이저 치료" }
      ],
      "sameAs": ["https://blog.naver.com/gndentalclinic"]
    }]
  }

  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/doctors/${slug}`,
    ogType: 'profile',
    schemas: physicianSchemas[slug] || [],
    speakableSelectors: ['[data-speakable]', 'h1', 'h2', '.doctor-info']
  }))
})

// ===== 진료 안내 =====
app.get('/treatments', (c) => c.html(layout(treatmentsPage(), {
  title: '강남치과의원 진료안내 | 임플란트·디지털보철·인비절라인·심미보철·사랑니',
  description: '강남치과의원 전체 진료 안내. 임플란트, 디지털 보철(싱글 크라운), 인비절라인 투명교정, 심미보철, 사랑니 발치, 충치치료, 신경치료 등. 각 분야 전문의가 직접 진료합니다.',
  url: '/treatments',
  keywords: '영주 임플란트, 영주 디지털보철, 영주 인비절라인, 영주 심미보철, 영주 사랑니',
  speakableSelectors: ['[data-speakable]', 'h1', 'h2'],
  schemas: [{
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "강남치과의원 진료안내",
    "about": { "@type": "MedicalBusiness", "name": "강남치과의원" },
    "url": "https://kndent.kr/treatments",
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": "#main-content"
    },
    "specialty": [
      "Oral and Maxillofacial Surgery",
      "Implantology",
      "Prosthodontics",
      "Orthodontics"
    ]
  }]
})))

app.get('/treatments/:slug', async (c) => {
  const slug = c.req.param('slug')
  const result = await treatmentDetailPage(slug)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/treatments/${slug}`,
    keywords: `영주 ${result.title.split(' – ')[0]}, ${result.title.split(' – ')[0]} 잘하는곳, 경북 ${result.title.split(' – ')[0]}`,
    ogType: 'article',
    schemas: result.schemas || [],
    speakableSelectors: ['[data-speakable]', 'h1', 'h2', '.treatment-section']
  }))
})

// ===== 치과 용어 사전 =====
app.get('/dictionary', async (c) => {
  const query = c.req.query('q')
  const selectedCategory = c.req.query('category')
  let terms: any[] = []
  let categories: any[] = []
  try {
    // 카테고리별 수량
    const catResult = await c.env.DB.prepare('SELECT category, COUNT(*) as cnt FROM dictionary GROUP BY category ORDER BY cnt DESC').all()
    categories = catResult.results

    // 용어 검색/필터
    if (query) {
      const result = await c.env.DB.prepare('SELECT * FROM dictionary WHERE term_ko LIKE ? OR term_en LIKE ? OR summary LIKE ? OR description LIKE ? ORDER BY is_featured DESC, term_ko').bind(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`).all()
      terms = result.results
    } else if (selectedCategory) {
      const result = await c.env.DB.prepare('SELECT * FROM dictionary WHERE category = ? ORDER BY is_featured DESC, term_ko').bind(selectedCategory).all()
      terms = result.results
    } else {
      const result = await c.env.DB.prepare('SELECT * FROM dictionary ORDER BY is_featured DESC, term_ko').all()
      terms = result.results
    }
  } catch (e) { /* DB not available */ }

  const totalCount = categories.reduce((sum: number, c: any) => sum + c.cnt, 0)
  const titleSuffix = selectedCategory ? ` – ${selectedCategory}` : query ? ` – "${query}" 검색결과` : ''

  return c.html(layout(dictionaryListPage(terms, categories, query, selectedCategory), {
    title: `치과 용어 사전${titleSuffix} | ${totalCount}개 치과 전문 용어 해설 – 강남치과의원`,
    description: `치과에서 자주 사용하는 ${totalCount}개 전문 용어를 알기 쉽게 설명합니다. 임플란트, 교정, 보철, 잇몸, 사랑니 등 10개 카테고리의 치과 용어를 구강악안면외과 전문의가 감수했습니다.`,
    url: '/dictionary',
    keywords: '치과 용어, 임플란트 뜻, 크라운 뜻, 인레이, 온레이, 인비절라인, 스케일링, 신경치료, 디지털보철, 치과 전문 용어 사전',
    speakableSelectors: ['[data-speakable]', 'h1', 'h2'],
    schemas: [{
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "@id": "https://kndent.kr/dictionary#glossary",
      "name": "강남치과의원 치과 용어 사전",
      "description": `치과에서 자주 사용하는 ${totalCount}개 전문 용어를 알기 쉽게 설명합니다.`,
      "url": "https://kndent.kr/dictionary",
      "publisher": { "@id": "https://kndent.kr/#organization" },
      "inLanguage": "ko",
      "numberOfItems": totalCount,
      "about": { "@type": "MedicalSpecialty", "name": "Dentistry" }
    }]
  }))
})

app.get('/dictionary/:slug', async (c) => {
  const slug = c.req.param('slug')
  let term: any = null
  let relatedTerms: any[] = []
  try {
    term = await c.env.DB.prepare('SELECT * FROM dictionary WHERE slug = ?').bind(slug).first()
    if (term && term.related_terms) {
      const keywords = term.related_terms.split(',').map((t: string) => t.trim()).slice(0, 8)
      if (keywords.length > 0) {
        const placeholders = keywords.map(() => '?').join(',')
        const result = await c.env.DB.prepare(`SELECT * FROM dictionary WHERE term_ko IN (${placeholders}) AND slug != ? ORDER BY is_featured DESC, term_ko LIMIT 8`).bind(...keywords, slug).all()
        relatedTerms = result.results
      }
    }
  } catch (e) { /* DB not available */ }

  if (!term) {
    return c.html(layout('<div class="min-h-[60vh] flex items-center justify-center"><div class="text-center"><h1 class="text-6xl font-black text-gray-200 mb-4">404</h1><p class="text-gray-400 text-lg mb-6">용어를 찾을 수 없습니다</p><a href="/dictionary" class="btn-primary px-6 py-3 rounded-xl text-sm font-bold">용어 사전으로</a></div></div>', {
      title: '용어를 찾을 수 없습니다 | 강남치과의원',
      description: '요청하신 치과 용어를 찾을 수 없습니다.',
      url: `/dictionary/${slug}`
    }), 404)
  }

  const page = dictionaryDetailPage(term, relatedTerms)
  return c.html(layout(page.html, {
    title: `${term.term_ko}${term.term_en ? ` (${term.term_en})` : ''} – 치과 용어 사전 | 강남치과의원`,
    description: term.summary,
    url: `/dictionary/${term.slug}`,
    keywords: `${term.term_ko}, ${term.term_en || ''}, ${term.category}, 치과 용어, ${term.related_terms || ''}`,
    ogType: 'article',
    schemas: page.schemas,
    speakableSelectors: ['[data-speakable]', 'h1', 'h2']
  }))
})

// ===== 블로그 게시판 =====
app.get('/blog', async (c) => {
  const category = c.req.query('category')
  let posts: any[] = []
  try {
    if (category && category !== '전체') {
      const result = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE is_published = 1 AND category = ? ORDER BY published_at DESC LIMIT 50').bind(category).all()
      posts = result.results
    } else {
      const result = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC LIMIT 50').all()
      posts = result.results
    }
  } catch (e) { /* DB not available */ }

  return c.html(layout(blogListPage(posts), {
    title: '강남치과의원 블로그 | 치과 건강정보 · 임플란트 · 디지털보철 · 교정',
    description: '구강악안면외과 전문의가 직접 전하는 치과 건강정보. 임플란트, 디지털 보철, 인비절라인, 사랑니 발치 등 치과 치료에 대한 정확한 정보를 제공합니다.',
    url: '/blog',
    keywords: '영주 치과 블로그, 임플란트 정보, 디지털 보철, 인비절라인 후기, 사랑니 발치 정보, 치과 건강정보',
    speakableSelectors: ['[data-speakable]', 'h1', 'h2'],
    schemas: [{
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "강남치과의원 블로그",
      "description": "구강외과 전문의가 전하는 치과 건강정보",
      "url": "https://kndent.kr/blog",
      "publisher": { "@id": "https://kndent.kr/#organization" },
      "inLanguage": "ko",
      "about": [
        { "@type": "MedicalSpecialty", "name": "Implantology" },
        { "@type": "MedicalSpecialty", "name": "Oral and Maxillofacial Surgery" },
        { "@type": "MedicalSpecialty", "name": "Prosthodontics" },
        { "@type": "MedicalSpecialty", "name": "Orthodontics" }
      ],
      "author": [
        { "@type": "Physician", "@id": "https://kndent.kr/doctors/lee-taehyung#physician", "name": "이태형" },
        { "@type": "Physician", "@id": "https://kndent.kr/doctors/choi-minhye#physician", "name": "최민혜" }
      ],
      "mainEntityOfPage": { "@type": "WebPage", "url": "https://kndent.kr/blog" }
    }]
  }))
})

app.get('/blog/:slug', async (c) => {
  const slug = c.req.param('slug')
  let post: any = null
  try {
    const result = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').bind(slug).first()
    post = result
    if (post) {
      await c.env.DB.prepare('UPDATE blog_posts SET views = views + 1 WHERE slug = ?').bind(slug).run()
    }
  } catch (e) { /* DB not available */ }

  if (!post) return c.notFound()
  const page = blogDetailPage(post)
  return c.html(layout(page.html, {
    title: page.title,
    description: page.description,
    url: `/blog/${slug}`,
    ogType: 'article',
    schemas: page.schemas,
    articlePublishedTime: post.published_at,
    articleModifiedTime: post.updated_at || post.published_at
  }))
})

// ===== 회원가입 / 로그인 페이지 =====
app.get('/register', (c) => c.html(layout(registerPage(), {
  title: '회원가입 | 강남치과의원',
  description: '강남치과의원 회원가입. 치료 전후 사례 열람을 위해 회원가입해 주세요.',
  url: '/register',
  robots: 'noindex, nofollow'
})))

app.get('/login', (c) => {
  const redirect = c.req.query('redirect')
  return c.html(layout(loginPage(redirect), {
    title: '로그인 | 강남치과의원',
    description: '강남치과의원 로그인. 치료 전후 사례를 확인하시려면 로그인해 주세요.',
    url: '/login',
    robots: 'noindex, nofollow'
  }))
})

// ===== 인증 API =====
app.post('/api/auth/register', async (c) => {
  try {
    const { name, email, phone, password } = await c.req.json()
    if (!name || !email || !phone || !password) {
      return c.json({ success: false, error: '모든 필수 항목을 입력해 주세요.' }, 400)
    }
    if (password.length < 6) {
      return c.json({ success: false, error: '비밀번호는 6자 이상이어야 합니다.' }, 400)
    }
    const cleanPhone = phone.replace(/-/g, '')
    if (!/^[0-9]{10,11}$/.test(cleanPhone)) {
      return c.json({ success: false, error: '올바른 전화번호를 입력해 주세요.' }, 400)
    }

    // 이메일 중복 체크
    const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) {
      return c.json({ success: false, error: '이미 등록된 이메일입니다.' }, 409)
    }

    const passwordHash = await hashPassword(password)
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, phone, password_hash, name) VALUES (?, ?, ?, ?)'
    ).bind(email, cleanPhone, passwordHash, name).run()

    // 자동 로그인 (세션 생성)
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30일
    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, result.meta.last_row_id, expiresAt).run()

    return c.json({ success: true, message: '회원가입이 완료되었습니다.' }, 201, {
      'Set-Cookie': `session=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 3600}`
    })
  } catch (e: any) {
    return c.json({ success: false, error: '회원가입 처리 중 오류가 발생했습니다.' }, 500)
  }
})

app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    if (!email || !password) {
      return c.json({ success: false, error: '이메일과 비밀번호를 입력해 주세요.' }, 400)
    }

    const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').bind(email).first() as any
    if (!user) {
      return c.json({ success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, 401)
    }

    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return c.json({ success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, 401)
    }

    // 세션 생성
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    await c.env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, user.id, expiresAt).run()

    return c.json({ success: true, message: '로그인되었습니다.', user: { name: user.name, email: user.email } }, 200, {
      'Set-Cookie': `session=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 3600}`
    })
  } catch (e: any) {
    return c.json({ success: false, error: '로그인 처리 중 오류가 발생했습니다.' }, 500)
  }
})

app.post('/api/auth/logout', async (c) => {
  try {
    const cookieHeader = c.req.header('Cookie')
    const sessionId = getCookie(cookieHeader, 'session')
    if (sessionId) {
      await c.env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run()
    }
    return c.json({ success: true }, 200, {
      'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    })
  } catch {
    return c.json({ success: true }, 200, {
      'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    })
  }
})

app.get('/api/auth/me', async (c) => {
  const user = await getSessionUser(c)
  if (!user) return c.json({ loggedIn: false })
  return c.json({ loggedIn: true, user: { name: user.name, email: user.email } })
})

// ===== 비포/애프터 게시판 (로그인 필요) =====
app.get('/before-after', async (c) => {
  const user = await getSessionUser(c)
  if (!user) {
    return c.html(layout(loginRequiredPage(), {
      title: '로그인 필요 | 치료 전후 사례 – 강남치과의원',
      description: '치료 전후 사례를 열람하시려면 로그인이 필요합니다.',
      url: '/before-after',
      robots: 'noindex, nofollow'
    }))
  }

  const category = c.req.query('category')
  let cases: any[] = []
  try {
    if (category && category !== '전체') {
      const result = await c.env.DB.prepare('SELECT * FROM before_after_cases WHERE is_published = 1 AND category = ? ORDER BY sort_order DESC, published_at DESC LIMIT 50').bind(category).all()
      cases = result.results
    } else {
      const result = await c.env.DB.prepare('SELECT * FROM before_after_cases WHERE is_published = 1 ORDER BY sort_order DESC, published_at DESC LIMIT 50').all()
      cases = result.results
    }
  } catch (e) { /* DB not available */ }

  return c.html(layout(beforeAfterListPage(cases), {
    title: '치료 전후 사례 | 강남치과의원 비포&애프터 · 임플란트 · 디지털보철 · 교정',
    description: '강남치과의원 실제 치료 전후 사례. 구강외과 전문의가 직접 시행한 임플란트, 디지털 보철, 인비절라인, 심미보철 치료 결과를 확인하세요.',
    url: '/before-after',
    keywords: '영주 임플란트 전후, 치과 비포 애프터, 디지털 보철 사례, 인비절라인 전후, 영주 치과 치료 사례',
    schemas: [{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "강남치과의원 치료 전후 사례",
      "description": "구강외과 전문의가 직접 시행한 치료 전후 사례 모음",
      "url": "https://kndent.kr/before-after",
      "publisher": { "@id": "https://kndent.kr/#organization" },
      "about": { "@type": "Dentist", "@id": "https://kndent.kr/#organization" },
      "specialty": ["Implantology", "Prosthodontics", "Oral and Maxillofacial Surgery"],
      "mainContentOfPage": { "@type": "WebPageElement", "cssSelector": "#main-content" }
    }]
  }))
})

app.get('/before-after/:slug', async (c) => {
  const user = await getSessionUser(c)
  if (!user) {
    return c.html(layout(loginRequiredPage(), {
      title: '로그인 필요 | 치료 전후 사례 – 강남치과의원',
      description: '치료 전후 사례를 열람하시려면 로그인이 필요합니다.',
      url: '/before-after',
      robots: 'noindex, nofollow'
    }))
  }

  const slug = c.req.param('slug')
  let caseData: any = null
  try {
    const result = await c.env.DB.prepare('SELECT * FROM before_after_cases WHERE slug = ? AND is_published = 1').bind(slug).first()
    caseData = result
    if (caseData) {
      await c.env.DB.prepare('UPDATE before_after_cases SET views = views + 1 WHERE slug = ?').bind(slug).run()
    }
  } catch (e) { /* DB not available */ }

  if (!caseData) return c.notFound()
  const page = beforeAfterDetailPage(caseData)
  return c.html(layout(page.html, {
    title: page.title,
    description: page.description,
    url: `/before-after/${slug}`,
    ogType: 'article',
    schemas: page.schemas
  }))
})

// ===== 예약/상담 =====
app.get('/reservation', (c) => c.html(layout(reservationPage(), {
  title: '강남치과의원 상담 예약 | 상담 안내 · 054-636-8222',
  description: '강남치과의원 상담 예약. 전화 054-636-8222 또는 온라인으로 간편하게 예약하세요. 구강외과 전문의가 직접 상담드립니다.',
  url: '/reservation',
  keywords: '영주 치과 예약, 강남치과 상담, 영주 임플란트 상담',
  speakableSelectors: ['[data-speakable]', 'h1'],
  schemas: [{
    "@context": "https://schema.org",
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://kndent.kr/reservation",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": { "@type": "Reservation", "name": "상담 예약" },
    "provider": { "@id": "https://kndent.kr/#organization" }
  }]
})))

// ===== 오시는 길 =====
app.get('/directions', (c) => c.html(layout(directionsPage(), {
  title: '강남치과의원 오시는 길 | 영주시 대학로 217 · 주차 가능 · 영주역 10분',
  description: '경북 영주시 대학로 217, 2층 (택지 사거리 모모제인 건물). 건물 후면 지상·지하 주차장 완비. 영주역에서 택시 10분. 풍기, 봉화, 예천, 안동, 단양에서 접근 용이. 054-636-8222.',
  url: '/directions',
  keywords: '영주 강남치과 위치, 강남치과 주소, 영주 치과 주차, 영주 대학로 치과, 영주 치과 오시는길',
  speakableSelectors: ['[data-speakable]', 'h1', '.card-premium'],
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": "https://kndent.kr/#place",
      "name": "강남치과의원",
      "alternateName": ["Gangnam Dental Clinic", "영주 강남치과"],
      "image": [
        "https://kndent.kr/static/photos/3gQUD6CP.jpg",
        "https://kndent.kr/static/photos/p9YyzTaw.jpg",
        "https://kndent.kr/static/photos/KLnijX5L.jpg",
        "https://kndent.kr/static/photos/sOkojKif.jpg"
      ],
      "photo": [
        { "@type": "ImageObject", "url": "https://kndent.kr/static/photos/3gQUD6CP.jpg", "name": "강남치과의원 건물 외관", "description": "경북 영주시 대학로 217 모모제인 건물" },
        { "@type": "ImageObject", "url": "https://kndent.kr/static/photos/p9YyzTaw.jpg", "name": "강남치과의원 대기실", "description": "편안한 대기 공간" },
        { "@type": "ImageObject", "url": "https://kndent.kr/static/photos/KLnijX5L.jpg", "name": "강남치과의원 진료실", "description": "최신 장비가 갖춰진 진료 공간" },
        { "@type": "ImageObject", "url": "https://kndent.kr/static/photos/sOkojKif.jpg", "name": "강남치과의원 상담실", "description": "프라이빗 상담 공간" }
      ],
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
      "url": "https://kndent.kr/directions",
      "telephone": "+82-54-636-8222",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:30", "description": "점심시간 13:00-14:00" }
      ],
      "specialOpeningHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "00:00", "closes": "00:00", "description": "토·일·공휴일 휴무" }
      ],
      "hasMap": "https://map.naver.com/p/entry/place/1099573867",
      "isAccessibleForFree": true,
      "publicAccess": true,
      "smokingAllowed": false,
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "주차장", "value": true, "description": "건물 후면 지상·지하 주차장 완비" },
        { "@type": "LocationFeatureSpecification", "name": "엘리베이터", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "휠체어 접근", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "무료 Wi-Fi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "카드결제", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "예약제 운영", "value": true }
      ],
      "containedInPlace": {
        "@type": "Place",
        "name": "모모제인 건물",
        "address": "경북 영주시 대학로 217"
      },
      "areaServed": [
        { "@type": "City", "name": "영주시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
        { "@type": "City", "name": "봉화군" },
        { "@type": "City", "name": "예천군" },
        { "@type": "City", "name": "안동시" },
        { "@type": "City", "name": "단양군" }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "120",
        "bestRating": "5"
      }
    }
  ]
})))

// ===== 비용 안내 =====
app.get('/pricing', (c) => c.html(layout(pricingPage(), {
  title: '강남치과의원 진료비용 안내 | 임플란트·보철·교정 가격',
  description: '강남치과의원 임플란트, 인비절라인, 디지털 보철(싱글 크라운), 심미보철 등 진료비용을 안내합니다. 상담 후 정확한 견적을 받아보세요. 054-636-8222.',
  url: '/pricing',
  keywords: '영주 임플란트 가격, 영주 치과 비용, 영주 인비절라인 가격, 영주 디지털보철 비용',
  speakableSelectors: ['[data-speakable]', 'h1', 'h2'],
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "강남치과의원 진료비용 안내",
      "description": "영주시 강남치과의원 진료 항목별 비용 안내. 임플란트 130만원, 지르코니아 50만원, 인비절라인 650~700만원 등. 건강보험 적용 항목 및 비급여 항목 안내.",
      "url": "https://kndent.kr/pricing",
      "provider": { "@id": "https://kndent.kr/#organization" },
      "numberOfItems": 8,
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "임플란트", "description": "구강외과 전문의 직접 수술. 맞춤 어버트먼트 + 지르코니아 포함 가격.", "numberOfItems": 7, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Neo 임플란트 (맞춤 어버트먼트+지르코니아)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/implant" }, "priceCurrency": "KRW", "price": 1300000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1300000, "description": "1,300,000원 (맞춤 어버트먼트 + 지르코니아 포함)", "valueAddedTaxIncluded": true }, "eligibleRegion": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 36.8057, "longitude": 128.7410 }, "geoRadius": "100000" }, "warranty": { "@type": "WarrantyPromise", "warrantyScope": "임플란트 픽스쳐 보증", "description": "정기 검진 유지 시 장기 보증" }, "seller": { "@id": "https://kndent.kr/#organization" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Osstem 임플란트 (맞춤 어버트먼트+지르코니아)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/implant" }, "priceCurrency": "KRW", "price": 1300000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1300000, "description": "1,300,000원 (맞춤 어버트먼트 + 지르코니아 포함)" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "뼈이식 (단순)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/bone-graft" }, "priceCurrency": "KRW", "price": 500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 500000, "description": "500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "뼈이식 (복합)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/bone-graft" }, "priceCurrency": "KRW", "price": 800000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 800000, "description": "800,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "상악동 거상술 (치조정)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/sinus-lift" }, "priceCurrency": "KRW", "price": 800000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 800000, "description": "800,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "상악동 거상술 (측방)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/sinus-lift" }, "priceCurrency": "KRW", "price": 1500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1500000, "description": "1,500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "보철 추가 (폰틱/리메이크)" }, "priceCurrency": "KRW", "price": 500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 500000, "description": "500,000원" } }
        ]},
        { "@type": "OfferCatalog", "name": "보철", "description": "크라운·보철 치료", "numberOfItems": 5, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "메탈 크라운" }, "priceCurrency": "KRW", "price": 300000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 300000, "description": "300,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "A타입 골드 크라운", "url": "https://kndent.kr/treatments/crown" }, "priceCurrency": "KRW", "price": 1000000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1000000, "description": "1,000,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "PFM 크라운" }, "priceCurrency": "KRW", "price": 350000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 350000, "description": "350,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "지르코니아 크라운", "url": "https://kndent.kr/treatments/digital-prosthesis" }, "priceCurrency": "KRW", "price": 500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 500000, "description": "500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "임시치아" }, "priceCurrency": "KRW", "price": 15000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 15000, "description": "15,000원" } }
        ]},
        { "@type": "OfferCatalog", "name": "틀니", "description": "부분틀니·전체틀니·수리", "numberOfItems": 8, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "부분 틀니", "url": "https://kndent.kr/treatments/denture" }, "priceCurrency": "KRW", "price": 1300000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1300000, "description": "1,300,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "전체 틀니", "url": "https://kndent.kr/treatments/denture" }, "priceCurrency": "KRW", "price": 1300000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1300000, "description": "1,300,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "틀니 수리" }, "priceCurrency": "KRW", "price": 100000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 100000, "description": "100,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "틀니 조정" }, "priceCurrency": "KRW", "price": 350000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 350000, "description": "350,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "임시 틀니" }, "priceCurrency": "KRW", "price": 400000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 400000, "description": "400,000원" } }
        ]},
        { "@type": "OfferCatalog", "name": "보존 치료", "description": "레진·인레이·라미네이트", "numberOfItems": 8, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "레진 (1면)", "url": "https://kndent.kr/treatments/resin" }, "priceCurrency": "KRW", "price": 80000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 80000, "description": "80,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "레진 (2면)" }, "priceCurrency": "KRW", "price": 120000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 120000, "description": "120,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "레진 (3면)" }, "priceCurrency": "KRW", "price": 170000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 170000, "description": "170,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "전치부 레진" }, "priceCurrency": "KRW", "price": 150000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 150000, "description": "150,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "테세라 인레이" }, "priceCurrency": "KRW", "price": 300000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 300000, "description": "300,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "골드 인레이 (1면)" }, "priceCurrency": "KRW", "price": 800000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 800000, "description": "800,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "골드 인레이 (2면)" }, "priceCurrency": "KRW", "price": 1000000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1000000, "description": "1,000,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "라미네이트", "url": "https://kndent.kr/treatments/cosmetic" }, "priceCurrency": "KRW", "price": 600000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 600000, "description": "600,000원" } }
        ]},
        { "@type": "OfferCatalog", "name": "소아 치료", "description": "유치 레진·SS크라운·불소도포", "numberOfItems": 5, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "유치 레진" }, "priceCurrency": "KRW", "price": 80000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 80000, "description": "80,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "SS 크라운" }, "priceCurrency": "KRW", "price": 120000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 120000, "description": "120,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "밴드앤루프" }, "priceCurrency": "KRW", "price": 150000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 150000, "description": "150,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "치아 홈 메우기" }, "priceCurrency": "KRW", "price": 40000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 40000, "description": "40,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "불소 도포" }, "priceCurrency": "KRW", "price": 30000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 30000, "description": "30,000원" } }
        ]},
        { "@type": "OfferCatalog", "name": "교정", "description": "인비절라인 인증의 교정. 고정식·자가결찰·투명교정.", "numberOfItems": 10, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "교정 검사비" }, "priceCurrency": "KRW", "price": 200000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 200000, "description": "200,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "고정식 교정" }, "priceCurrency": "KRW", "price": 5000000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 5000000, "description": "5,000,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "자가결찰 브라켓 교정" }, "priceCurrency": "KRW", "price": 5500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 5500000, "description": "5,500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "유지장치 (리테이너)" }, "priceCurrency": "KRW", "price": 200000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 200000, "description": "200,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "부분교정" }, "priceCurrency": "KRW", "price": 1500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1500000, "description": "1,500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "성장조절장치" }, "priceCurrency": "KRW", "price": 1000000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 1000000, "description": "1,000,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "교정 월비용" }, "priceCurrency": "KRW", "price": 50000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 50000, "description": "50,000원/월" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 퍼스트 (1차)", "procedureType": "Noninvasive", "url": "https://kndent.kr/treatments/invisalign" }, "priceCurrency": "KRW", "price": 4000000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 4000000, "description": "4,000,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 (단순)", "procedureType": "Noninvasive", "url": "https://kndent.kr/treatments/invisalign" }, "priceCurrency": "KRW", "price": 6500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 6500000, "description": "6,500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 (복잡)", "procedureType": "Noninvasive", "url": "https://kndent.kr/treatments/invisalign" }, "priceCurrency": "KRW", "price": 7000000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 7000000, "description": "7,000,000원" } }
        ]},
        { "@type": "OfferCatalog", "name": "보험진료", "description": "건강보험 적용 항목 (본인부담금만 발생)", "numberOfItems": 8, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "근관치료 (신경치료)", "url": "https://kndent.kr/treatments/root-canal" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용 (본인부담금만 발생)" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "발치 (일반)" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "GI 충전 (글래스아이오노머)" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "아말감 충전" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "스케일링", "url": "https://kndent.kr/treatments/scaling" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용 (연 1회, 만 19세 이상)" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "치주치료 (잇몸치료)", "url": "https://kndent.kr/treatments/gum" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "사랑니 발치 (단순/매복)", "procedureType": "Surgical", "url": "https://kndent.kr/treatments/wisdom-tooth" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "X-ray / 파노라마" }, "priceCurrency": "KRW", "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "description": "건강보험 적용" } }
        ]},
        { "@type": "OfferCatalog", "name": "기타 / 미용 (과세)", "description": "보톡스·미백 등 과세 항목", "numberOfItems": 5, "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "이갈이 장치" }, "priceCurrency": "KRW", "price": 500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 500000, "description": "500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "보톡스" }, "priceCurrency": "KRW", "price": 500000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 500000, "description": "500,000원" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "보톡스 (50unit)" }, "priceCurrency": "KRW", "price": 200000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 200000, "description": "200,000원 (과세)", "valueAddedTaxIncluded": true } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "오피스 미백 (치아 당)", "url": "https://kndent.kr/treatments/whitening" }, "priceCurrency": "KRW", "price": 50000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 50000, "description": "50,000원/치아 (과세)", "valueAddedTaxIncluded": true } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "전체 미백 (자가미백 + 전문미백 2회)", "url": "https://kndent.kr/treatments/whitening" }, "priceCurrency": "KRW", "price": 600000, "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "KRW", "price": 600000, "description": "600,000원 (과세)", "valueAddedTaxIncluded": true } }
        ]}
      ]
    }
  ]
})))

// ===== FAQ 페이지 (SEO + AEO 대폭 강화) =====
app.get('/faq', (c) => {
  const category = c.req.query('category')
  const result = faqPage(category || undefined)
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/faq${category ? `?category=${category}` : ''}`,
    keywords: '영주 치과 FAQ, 임플란트 질문, 인비절라인 질문, 치과 비용, 사랑니 발치, 디지털 보철, 영주 강남치과',
    speakableSelectors: ['[data-speakable]', 'h1', '.faq-answer'],
    schemas: result.schemas
  }))
})

// ===== 지역 SEO (Schema 대폭 강화 — FAQPage + LocalBusiness + BreadcrumbList) =====
app.get('/area/:region', (c) => {
  const region = c.req.param('region')
  const result = areaPage(region)
  if (!result) return c.notFound()
  const decodedRegion = decodeURIComponent(region)

  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/area/${region}`,
    keywords: `${decodedRegion} 치과, ${decodedRegion} 임플란트, ${decodedRegion} 치과 추천, ${decodedRegion} 구강외과, ${decodedRegion} 인비절라인, ${decodedRegion} 사랑니, ${decodedRegion} 디지털보철`,
    speakableSelectors: ['[data-speakable]', 'h1', 'h2', '.faq-answer', '.area-summary'],
    schemas: result.schemas
  }))
})

// ===== API: 상담 문의 접수 (D1 저장) =====
app.post('/api/inquiries', async (c) => {
  try {
    const { name, phone, treatment, message } = await c.req.json()

    if (!name || !phone) {
      return c.json({ success: false, error: '성함과 연락처는 필수입니다.' }, 400)
    }

    const result = await c.env.DB.prepare(
      'INSERT INTO inquiries (name, phone, treatment, message) VALUES (?, ?, ?, ?)'
    ).bind(name, phone, treatment || '', message || '').run()

    return c.json({
      success: true,
      id: result.meta.last_row_id,
      message: '상담 문의가 접수되었습니다. 영업일 기준 1일 이내 연락드리겠습니다.'
    })
  } catch (e: any) {
    return c.json({ success: false, error: '접수 중 오류가 발생했습니다. 전화(054-636-8222)로 문의해 주세요.' }, 500)
  }
})

// ===== API: 상담 문의 목록 조회 (관리자용) =====
app.get('/api/inquiries', adminAuth, async (c) => {
  try {
    const status = c.req.query('status') || 'all'
    let result
    if (status === 'all') {
      result = await c.env.DB.prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100').all()
    } else {
      result = await c.env.DB.prepare('SELECT * FROM inquiries WHERE status = ? ORDER BY created_at DESC LIMIT 100').bind(status).all()
    }
    return c.json({ success: true, inquiries: result.results, total: result.results.length })
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

// ===== API: 문의 상태 변경 =====
app.patch('/api/inquiries/:id', adminAuth, async (c) => {
  try {
    const id = c.req.param('id')
    const { status } = await c.req.json()
    await c.env.DB.prepare('UPDATE inquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, id).run()
    return c.json({ success: true })
  } catch (e) {
    return c.json({ success: false, error: '업데이트 실패' }, 500)
  }
})

// ===== API: 블로그 CRUD (관리자용) =====
app.post('/api/blog', adminAuth, async (c) => {
  try {
    const { slug, title, category, summary, content, thumbnail, tags, author } = await c.req.json()
    if (!slug || !title || !content) return c.json({ error: 'slug, title, content 필수' }, 400)
    const formattedContent = formatContentForSave(content)
    await c.env.DB.prepare(
      'INSERT INTO blog_posts (slug, title, category, summary, content, thumbnail, tags, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(slug, title, category || '일반', summary || '', formattedContent, thumbnail || '', tags || '', author || '강남치과의원').run()
    return c.json({ success: true, slug })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.put('/api/blog/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const { title, category, summary, content, thumbnail, tags, author, is_published } = await c.req.json()
    const formattedContent = formatContentForSave(content)
    await c.env.DB.prepare(
      'UPDATE blog_posts SET title=?, category=?, summary=?, content=?, thumbnail=?, tags=?, author=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE slug=?'
    ).bind(title, category, summary, formattedContent, thumbnail || '', tags || '', author, is_published ?? 1, slug).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.delete('/api/blog/:slug', adminAuth, async (c) => {
  try {
    await c.env.DB.prepare('DELETE FROM blog_posts WHERE slug = ?').bind(c.req.param('slug')).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ===== API: 비포/애프터 CRUD (관리자용) =====
app.post('/api/before-after', adminAuth, async (c) => {
  try {
    const { slug, title, category, patient_info, treatment_desc, before_image, after_image, duration, doctor, tags, sort_order } = await c.req.json()
    if (!slug || !title || !before_image || !after_image) return c.json({ error: 'slug, title, before_image, after_image 필수' }, 400)
    const formattedDesc = formatContentForSave(treatment_desc || '')
    await c.env.DB.prepare(
      'INSERT INTO before_after_cases (slug, title, category, patient_info, treatment_desc, before_image, after_image, duration, doctor, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(slug, title, category || '기타', patient_info || '', formattedDesc, before_image, after_image, duration || '', doctor || '', tags || '', sort_order || 0).run()
    return c.json({ success: true, slug })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.put('/api/before-after/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const { title, category, patient_info, treatment_desc, before_image, after_image, duration, doctor, tags, sort_order, is_published } = await c.req.json()
    const formattedDesc = formatContentForSave(treatment_desc || '')
    await c.env.DB.prepare(
      'UPDATE before_after_cases SET title=?, category=?, patient_info=?, treatment_desc=?, before_image=?, after_image=?, duration=?, doctor=?, tags=?, sort_order=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE slug=?'
    ).bind(title, category, patient_info, formattedDesc, before_image, after_image, duration, doctor, tags, sort_order || 0, is_published ?? 1, slug).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.delete('/api/before-after/:slug', adminAuth, async (c) => {
  try {
    await c.env.DB.prepare('DELETE FROM before_after_cases WHERE slug = ?').bind(c.req.param('slug')).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ===== 공지사항 =====
app.get('/notices', async (c) => {
  const category = c.req.query('category')
  let notices: any[] = []
  try {
    if (category && category !== '전체') {
      const result = await c.env.DB.prepare('SELECT * FROM notices WHERE is_published = 1 AND category = ? ORDER BY is_pinned DESC, published_at DESC LIMIT 50').bind(category).all()
      notices = result.results
    } else {
      const result = await c.env.DB.prepare('SELECT * FROM notices WHERE is_published = 1 ORDER BY is_pinned DESC, published_at DESC LIMIT 50').all()
      notices = result.results
    }
  } catch (e) { /* DB not available */ }

  return c.html(layout(noticeListPage(notices), {
    title: '강남치과의원 공지사항 | 진료 안내 · 휴진 안내 · 새소식',
    description: '강남치과의원 공지사항. 진료 안내, 휴진 안내, 장비 도입 소식, 이벤트 등 병원의 새로운 소식을 확인하세요.',
    url: '/notices',
    keywords: '영주 강남치과 공지, 강남치과의원 안내, 영주 치과 공지사항, 휴진 안내',
    speakableSelectors: ['[data-speakable]', 'h1'],
    schemas: [{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "강남치과의원 공지사항",
      "description": "강남치과의원의 진료 안내, 휴진 안내 등 공지사항 모음",
      "url": "https://kndent.kr/notices",
      "publisher": { "@id": "https://kndent.kr/#organization" }
    }]
  }))
})

app.get('/notices/:slug', async (c) => {
  const slug = c.req.param('slug')
  let notice: any = null
  try {
    const result = await c.env.DB.prepare('SELECT * FROM notices WHERE slug = ? AND is_published = 1').bind(slug).first()
    notice = result
    if (notice) {
      await c.env.DB.prepare('UPDATE notices SET views = views + 1 WHERE slug = ?').bind(slug).run()
    }
  } catch (e) { /* DB not available */ }

  if (!notice) return c.notFound()
  const page = noticeDetailPage(notice)
  return c.html(layout(page.html, {
    title: page.title,
    description: page.description,
    url: `/notices/${slug}`,
    ogType: 'article',
    schemas: page.schemas,
    articlePublishedTime: notice.published_at,
    articleModifiedTime: notice.updated_at || notice.published_at
  }))
})

// ===== 관리자 대시보드 =====
app.get('/admin', (c) => c.html(layout(adminPage(), {
  title: '관리자 | 강남치과의원',
  description: '강남치과의원 관리자 대시보드',
  url: '/admin',
  robots: 'noindex, nofollow'
})))

// ===== API: 공지사항 CRUD =====
app.post('/api/notices', adminAuth, async (c) => {
  try {
    const { slug, title, category, content, author, is_pinned } = await c.req.json()
    if (!slug || !title || !content) return c.json({ error: 'slug, title, content 필수' }, 400)
    const formattedContent = formatContentForSave(content)
    await c.env.DB.prepare(
      'INSERT INTO notices (slug, title, category, content, author, is_pinned) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(slug, title, category || '공지', formattedContent, author || '강남치과의원', is_pinned || 0).run()
    return c.json({ success: true, slug })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.put('/api/notices/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const { title, category, content, author, is_pinned, is_published } = await c.req.json()
    const formattedContent = formatContentForSave(content)
    await c.env.DB.prepare(
      'UPDATE notices SET title=?, category=?, content=?, author=?, is_pinned=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE slug=?'
    ).bind(title, category, formattedContent, author, is_pinned || 0, is_published ?? 1, slug).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.delete('/api/notices/:slug', adminAuth, async (c) => {
  try {
    await c.env.DB.prepare('DELETE FROM notices WHERE slug = ?').bind(c.req.param('slug')).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ===== API: 관리자 목록 조회 (블로그/전후사례/공지 - 비공개 포함) =====
app.get('/api/admin/blog', adminAuth, async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM blog_posts ORDER BY published_at DESC LIMIT 100').all()
    return c.json({ success: true, posts: result.results })
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

app.get('/api/admin/blog/:slug', adminAuth, async (c) => {
  try {
    const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE slug = ?').bind(c.req.param('slug')).first()
    return post ? c.json({ success: true, post }) : c.json({ success: false, error: 'Not found' }, 404)
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

app.get('/api/admin/before-after', adminAuth, async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM before_after_cases ORDER BY sort_order DESC, published_at DESC LIMIT 100').all()
    return c.json({ success: true, cases: result.results })
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

app.get('/api/admin/before-after/:slug', adminAuth, async (c) => {
  try {
    const caseData = await c.env.DB.prepare('SELECT * FROM before_after_cases WHERE slug = ?').bind(c.req.param('slug')).first()
    return caseData ? c.json({ success: true, case_data: caseData }) : c.json({ success: false, error: 'Not found' }, 404)
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

app.get('/api/admin/notices', adminAuth, async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, published_at DESC LIMIT 100').all()
    return c.json({ success: true, notices: result.results })
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

app.get('/api/admin/notices/:slug', adminAuth, async (c) => {
  try {
    const notice = await c.env.DB.prepare('SELECT * FROM notices WHERE slug = ?').bind(c.req.param('slug')).first()
    return notice ? c.json({ success: true, notice }) : c.json({ success: false, error: 'Not found' }, 404)
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

// ===== API: Health =====
app.get('/api/health', (c) => c.json({ status: 'ok', clinic: '강남치과의원' }))

// ===== API: 이미지 업로드 (Base64 → D1) =====
app.post('/api/upload', adminAuth, async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    if (!file) return c.json({ success: false, error: '파일이 없습니다.' }, 400)

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return c.json({ success: false, error: 'JPG, PNG, GIF, WebP만 업로드 가능합니다.' }, 400)
    }
    // 10MB 제한 (R2는 대용량 OK)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ success: false, error: '10MB 이하 파일만 업로드 가능합니다.' }, 400)
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
    const key = `uploads/${filename}`

    // R2에 직접 저장 (바이너리)
    await c.env.R2.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
      customMetadata: { originalName: file.name, size: String(file.size) }
    })

    const url = `/api/images/${filename}`
    return c.json({ success: true, url, filename })
  } catch (e: any) {
    return c.json({ success: false, error: e.message || '업로드 실패' }, 500)
  }
})

// 이미지 서빙 (R2 → 기존 DB 폴백)
app.get('/api/images/:filename', async (c) => {
  try {
    const filename = c.req.param('filename')
    const key = `uploads/${filename}`

    // 1) R2에서 먼저 조회
    const obj = await c.env.R2.get(key)
    if (obj) {
      return new Response(obj.body, {
        headers: {
          'Content-Type': obj.httpMetadata?.contentType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'ETag': obj.etag
        }
      })
    }

    // 2) R2에 없으면 기존 DB 폴백 (마이그레이션 전 이미지)
    const img = await c.env.DB.prepare('SELECT content_type, data FROM images WHERE filename = ?').bind(filename).first() as any
    if (!img) return c.notFound()

    const base64Data = img.data.split(',')[1]
    const raw = atob(base64Data)
    const bytes = new Uint8Array(raw.length)
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)
    return new Response(bytes, {
      headers: {
        'Content-Type': img.content_type,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (e) {
    return c.notFound()
  }
})

// ===== API: 회원 관리 (관리자용) =====
app.get('/api/admin/users', adminAuth, async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT id, email, phone, name, is_active, created_at FROM users ORDER BY created_at DESC LIMIT 200').all()
    return c.json({ success: true, users: result.results, total: result.results.length })
  } catch (e) {
    return c.json({ success: false, error: '조회 실패' }, 500)
  }
})

app.get('/api/admin/stats', adminAuth, async (c) => {
  try {
    const [inq, blog, ba, notices, users] = await Promise.all([
      c.env.DB.prepare("SELECT COUNT(*) as cnt FROM inquiries WHERE status = 'new'").first(),
      c.env.DB.prepare('SELECT COUNT(*) as cnt FROM blog_posts').first(),
      c.env.DB.prepare('SELECT COUNT(*) as cnt FROM before_after_cases').first(),
      c.env.DB.prepare('SELECT COUNT(*) as cnt FROM notices').first(),
      c.env.DB.prepare('SELECT COUNT(*) as cnt FROM users').first(),
    ])
    return c.json({
      success: true,
      inquiries: (inq as any)?.cnt || 0,
      blog: (blog as any)?.cnt || 0,
      beforeAfter: (ba as any)?.cnt || 0,
      notices: (notices as any)?.cnt || 0,
      users: (users as any)?.cnt || 0,
    })
  } catch (e) {
    return c.json({ success: false }, 500)
  }
})

// ===== 404 커스텀 =====
app.notFound((c) => {
  return c.html(layout(
    `<section class="min-h-[60vh] flex items-center justify-center">
      <div class="text-center">
        <p class="text-8xl font-black text-royal/20 mb-4">404</p>
        <h1 class="text-2xl font-bold text-charcoal mb-2">페이지를 찾을 수 없습니다</h1>
        <p class="text-gray-400 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <a href="/" class="btn-primary"><i class="fas fa-home"></i>홈으로 돌아가기</a>
      </div>
    </section>`,
    {
      title: '404 - 페이지를 찾을 수 없습니다 | 강남치과의원',
      description: '요청하신 페이지를 찾을 수 없습니다.',
      url: '/404',
      robots: 'noindex, nofollow'
    }
  ), 404)
})

export default app
