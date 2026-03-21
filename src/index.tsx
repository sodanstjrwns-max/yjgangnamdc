import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createMiddleware } from 'hono/factory'
import { mainPage, mainPageSchemas } from './pages/main'
import { doctorsPage, doctorProfilePage } from './pages/doctors'
import { treatmentsPage, treatmentDetailPage } from './pages/treatments'
import { reservationPage } from './pages/reservation'
import { directionsPage } from './pages/directions'
import { pricingPage } from './pages/pricing'
import { areaPage } from './pages/area'
import { blogListPage, blogDetailPage } from './pages/blog'
import { beforeAfterListPage, beforeAfterDetailPage } from './pages/beforeafter'
import { noticeListPage, noticeDetailPage } from './pages/notices'
import { adminPage } from './pages/admin'
import { layout } from './layout'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// ===== Admin auth middleware =====
const adminAuth = createMiddleware(async (c, next) => {
  const key = c.req.query('key')
  if (key !== 'gangnam2017admin') return c.json({ error: 'Unauthorized' }, 401)
  await next()
})

// ===== SEO: robots.txt =====
app.get('/robots.txt', (c) => {
  c.header('Content-Type', 'text/plain')
  return c.body(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Sitemap
Sitemap: https://gndentalclinic.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`)
})

// ===== SEO: sitemap.xml (동적 생성) =====
app.get('/sitemap.xml', async (c) => {
  const baseUrl = 'https://gndentalclinic.com'
  const today = new Date().toISOString().split('T')[0]

  const staticPages = [
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
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/before-after', priority: '0.8', changefreq: 'weekly' },
    { url: '/notices', priority: '0.7', changefreq: 'weekly' },
    { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/directions', priority: '0.7', changefreq: 'yearly' },
    { url: '/reservation', priority: '0.8', changefreq: 'yearly' },
    { url: '/area/%EC%98%81%EC%A3%BC%EC%8B%9C', priority: '0.6', changefreq: 'yearly' },
    { url: '/area/%ED%92%8D%EA%B8%B0', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EB%B4%89%ED%99%94', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EC%98%88%EC%B2%9C', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EC%95%88%EB%8F%99', priority: '0.5', changefreq: 'yearly' },
    { url: '/area/%EB%8B%A8%EC%96%91', priority: '0.5', changefreq: 'yearly' },
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
  } catch (e) { /* DB not available, skip dynamic pages */ }

  const allPages = [...staticPages, ...dynamicPages]
  const urls = allPages.map(p => `  <url>
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
    title: '강남치과의원 블로그 | 치과 건강정보 · 임플란트 · CEREC · 교정',
    description: '구강악안면외과 전문의가 직접 전하는 치과 건강정보. 임플란트, CEREC 당일보철, 인비절라인, 사랑니 발치 등 치과 치료에 대한 정확한 정보를 제공합니다.',
    url: '/blog',
    keywords: '영주 치과 블로그, 임플란트 정보, CEREC 당일보철, 인비절라인 후기, 사랑니 발치 정보, 치과 건강정보',
    schemas: [{
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "강남치과의원 블로그",
      "description": "구강외과 전문의가 전하는 치과 건강정보",
      "url": "https://gndentalclinic.com/blog",
      "publisher": { "@id": "https://gndentalclinic.com/#organization" },
      "inLanguage": "ko"
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

// ===== 비포/애프터 게시판 =====
app.get('/before-after', async (c) => {
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
    title: '치료 전후 사례 | 강남치과의원 비포&애프터 · 임플란트 · CEREC · 교정',
    description: '강남치과의원 실제 치료 전후 사례. 구강외과 전문의가 직접 시행한 임플란트, CEREC 당일보철, 인비절라인, 심미보철 치료 결과를 확인하세요.',
    url: '/before-after',
    keywords: '영주 임플란트 전후, 치과 비포 애프터, CEREC 당일보철 사례, 인비절라인 전후, 영주 치과 치료 사례',
    schemas: [{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "강남치과의원 치료 전후 사례",
      "description": "구강외과 전문의가 직접 시행한 치료 전후 사례 모음",
      "url": "https://gndentalclinic.com/before-after",
      "publisher": { "@id": "https://gndentalclinic.com/#organization" }
    }]
  }))
})

app.get('/before-after/:slug', async (c) => {
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
    await c.env.DB.prepare(
      'INSERT INTO blog_posts (slug, title, category, summary, content, thumbnail, tags, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(slug, title, category || '일반', summary || '', content, thumbnail || '', tags || '', author || '강남치과의원').run()
    return c.json({ success: true, slug })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.put('/api/blog/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const { title, category, summary, content, thumbnail, tags, author, is_published } = await c.req.json()
    await c.env.DB.prepare(
      'UPDATE blog_posts SET title=?, category=?, summary=?, content=?, thumbnail=?, tags=?, author=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE slug=?'
    ).bind(title, category, summary, content, thumbnail || '', tags || '', author, is_published ?? 1, slug).run()
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
    await c.env.DB.prepare(
      'INSERT INTO before_after_cases (slug, title, category, patient_info, treatment_desc, before_image, after_image, duration, doctor, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(slug, title, category || '기타', patient_info || '', treatment_desc || '', before_image, after_image, duration || '', doctor || '', tags || '', sort_order || 0).run()
    return c.json({ success: true, slug })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.put('/api/before-after/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const { title, category, patient_info, treatment_desc, before_image, after_image, duration, doctor, tags, sort_order, is_published } = await c.req.json()
    await c.env.DB.prepare(
      'UPDATE before_after_cases SET title=?, category=?, patient_info=?, treatment_desc=?, before_image=?, after_image=?, duration=?, doctor=?, tags=?, sort_order=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE slug=?'
    ).bind(title, category, patient_info, treatment_desc, before_image, after_image, duration, doctor, tags, sort_order || 0, is_published ?? 1, slug).run()
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
    schemas: [{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "강남치과의원 공지사항",
      "description": "강남치과의원의 진료 안내, 휴진 안내 등 공지사항 모음",
      "url": "https://gndentalclinic.com/notices",
      "publisher": { "@id": "https://gndentalclinic.com/#organization" }
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
    await c.env.DB.prepare(
      'INSERT INTO notices (slug, title, category, content, author, is_pinned) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(slug, title, category || '공지', content, author || '강남치과의원', is_pinned || 0).run()
    return c.json({ success: true, slug })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

app.put('/api/notices/:slug', adminAuth, async (c) => {
  try {
    const slug = c.req.param('slug')
    const { title, category, content, author, is_pinned, is_published } = await c.req.json()
    await c.env.DB.prepare(
      'UPDATE notices SET title=?, category=?, content=?, author=?, is_pinned=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE slug=?'
    ).bind(title, category, content, author, is_pinned || 0, is_published ?? 1, slug).run()
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

export default app
