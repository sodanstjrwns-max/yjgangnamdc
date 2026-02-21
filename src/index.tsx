import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { mainPage } from './pages/main'
import { doctorsPage, doctorProfilePage } from './pages/doctors'
import { treatmentsPage, treatmentDetailPage } from './pages/treatments'
import { reservationPage } from './pages/reservation'
import { directionsPage } from './pages/directions'
import { pricingPage } from './pages/pricing'
import { areaPage } from './pages/area'
import { layout } from './layout'

const app = new Hono()

app.use('/api/*', cors())

// ===== 메인 페이지 =====
app.get('/', (c) => c.html(layout(mainPage(), {
  title: '영주 치과 – 강남치과의원 | 구강외과 전문의 2인',
  description: '영주시 강남치과의원. 구강외과 전문의 2인이 직접 진료합니다. 임플란트, 인비절라인, CEREC 당일보철, 심미보철. 평일 9시~17시30분.',
  url: '/'
})))

// ===== 의료진 =====
app.get('/doctors', (c) => c.html(layout(doctorsPage(), {
  title: '강남치과의원 의료진 소개 – 구강외과 전문의 2인',
  description: '강남치과의원 이태형 대표원장, 최민혜 원장. 구강악안면외과 전문의 2인이 직접 진료합니다.',
  url: '/doctors'
})))

app.get('/doctors/:slug', (c) => {
  const slug = c.req.param('slug')
  const result = doctorProfilePage(slug)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/doctors/${slug}`
  }))
})

// ===== 진료 안내 =====
app.get('/treatments', (c) => c.html(layout(treatmentsPage(), {
  title: '강남치과의원 전체 진료 안내',
  description: '강남치과의원의 모든 진료를 안내합니다. 임플란트, 인비절라인, CEREC 당일보철, 심미보철, 충치치료, 신경치료 등.',
  url: '/treatments'
})))

app.get('/treatments/:slug', (c) => {
  const slug = c.req.param('slug')
  const result = treatmentDetailPage(slug)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/treatments/${slug}`
  }))
})

// ===== 예약/상담 =====
app.get('/reservation', (c) => c.html(layout(reservationPage(), {
  title: '강남치과의원 상담 예약하기',
  description: '강남치과의원 상담 예약. 전화 054-636-8222 또는 온라인으로 간편하게 예약하세요.',
  url: '/reservation'
})))

// ===== 오시는 길 =====
app.get('/directions', (c) => c.html(layout(directionsPage(), {
  title: '강남치과의원 오시는 길 – 택지 리첼 사거리',
  description: '경북 영주시 대학로 217, 2층. 택지 리첼 사거리 위치. 주차 가능.',
  url: '/directions'
})))

// ===== 비용 안내 =====
app.get('/pricing', (c) => c.html(layout(pricingPage(), {
  title: '강남치과의원 진료비용 안내',
  description: '강남치과의원 임플란트, 인비절라인, 보철 등 진료비용을 안내합니다. 부담 없이 상담받으세요.',
  url: '/pricing'
})))

// ===== 지역 SEO =====
app.get('/area/:region', (c) => {
  const region = c.req.param('region')
  const result = areaPage(region)
  if (!result) return c.notFound()
  return c.html(layout(result.html, {
    title: result.title,
    description: result.description,
    url: `/area/${region}`
  }))
})

// ===== API =====
app.get('/api/health', (c) => c.json({ status: 'ok', clinic: '강남치과의원' }))

export default app
