// ===== "영주 치과" 대표 키워드 허브 (/area/영주시, 2026-10-08) =====
// 기존 /area/영주시 지역 페이지를 URL 그대로 허브로 승격. 다른 지역 페이지(area.ts 공통 템플릿)와 문장을 공유하지 않는다.
// 사실 정보는 레포에 이미 있는 값만: 주소·전화·진료시간(layout 푸터·directions), 이동시간(directions·locality),
// 의료진 학력(doctors.ts), 장비(treatments.ts), 사랑니 건강보험(area FAQ). 가격은 수가 편집기(D1) 값이라 여기서 쓰지 않고 /pricing 링크.

export const YEONGJU_HUB_MODIFIED = '2026-10-08'
const SITE = 'https://kndent.kr'
const HUB_PATH = `/area/${encodeURIComponent('영주시')}`
const NAVER_PLACE = 'https://map.naver.com/p/entry/place/1099573867'

const FAQS: { q: string; a: string }[] = [
  {
    q: '영주 강남치과의원은 토요일이나 일요일에도 문을 여나요?',
    a: '토요일·일요일과 공휴일은 휴진입니다. 평일 오전 9시부터 오후 5시 30분까지 진료하고, 접수는 오후 5시에 마감합니다. 점심시간(오후 1시~2시)에는 진료가 멈추니 그 전후로 맞춰 오시면 기다림이 줄어듭니다.'
  },
  {
    q: '영주역에서 내리면 치과까지 어떻게 가나요?',
    a: '영주역 앞에서 택시를 타면 약 10분(약 4km) 거리입니다. 기사님께 대학로 217, 택지 사거리 모모제인 건물이라고 말씀하시면 됩니다. 시내버스를 이용하실 때는 인근 정류장에서 내려 걸어오시면 됩니다.'
  },
  {
    q: '차를 가지고 가면 어디에 세우면 되나요?',
    a: '모모제인 건물 뒤편에 지상 주차장과 지하 주차장이 있어 진료받는 동안 차를 세워 두실 수 있습니다. 중앙고속도로를 타고 오신다면 영주IC에서 약 5분 걸립니다.'
  },
  {
    q: '사랑니 발치도 건강보험으로 받을 수 있나요?',
    a: '사랑니 발치는 건강보험이 적용되는 진료입니다. 다만 사랑니가 잇몸이나 뼈 속에 얼마나 묻혀 있는지에 따라 수술 방법과 진료비가 달라지므로, 촬영으로 위치를 확인한 뒤 안내해 드립니다.'
  },
  {
    q: '처음 방문할 때 미리 준비하면 좋은 것이 있나요?',
    a: '복용 중인 약 이름(특히 혈액을 묽게 하는 약, 골다공증 약)과 당뇨·고혈압 같은 지병, 다른 치과에서 찍은 사진이나 진료 기록이 있으면 함께 알려 주세요. 수술이 필요한 진료일수록 이런 정보가 치료 계획에 쓰입니다.'
  },
]

const TREATMENTS: { href: string; name: string; desc: string }[] = [
  { href: '/treatments/implant', name: '임플란트', desc: '3D CT로 뼈의 높이·두께와 신경 위치를 확인한 뒤 식립 위치를 계획하고, 필요하면 디지털 가이드를 씁니다.' },
  { href: '/treatments/bone-graft', name: '뼈이식 임플란트', desc: '뼈가 부족해 바로 심기 어려운 경우 뼈이식을 함께 계획합니다.' },
  { href: '/treatments/sinus-lift', name: '상악동 임플란트', desc: '위 어금니 쪽 뼈가 얇을 때 상악동 거상술을 검토합니다.' },
  { href: '/treatments/wisdom-tooth', name: '사랑니 발치', desc: '누워 있거나 묻힌 사랑니는 촬영으로 신경과의 거리를 보고 발치합니다.' },
  { href: '/treatments/digital-prosthesis', name: '디지털 보철(CEREC)', desc: 'PrimeScan으로 입안을 스캔하고 CEREC MC X로 싱글 크라운을 원내에서 깎아 만듭니다.' },
  { href: '/treatments/invisalign', name: '인비절라인 투명교정', desc: 'iTero 스캔으로 치아 이동 계획을 3D로 미리 확인합니다.' },
  { href: '/treatments/cavity', name: '충치치료', desc: '충치 범위에 따라 레진·인레이·크라운 중 맞는 방법을 고릅니다.' },
  { href: '/treatments/root-canal', name: '신경치료', desc: '염증이 신경까지 퍼진 치아를 살려 쓰기 위한 치료입니다.' },
  { href: '/treatments/scaling', name: '스케일링', desc: '만 19세 이상은 1년에 한 번 건강보험이 적용됩니다.' },
  { href: '/treatments/gum', name: '잇몸치료', desc: '잇몸 출혈·붓기·흔들림이 있을 때 치주 상태를 검사하고 치료합니다.' },
  { href: '/treatments/denture', name: '틀니', desc: '남은 치아와 잇몸 상태에 맞춰 부분·완전 틀니를 계획합니다.' },
  { href: '/treatments/whitening', name: '치아미백', desc: '변색 원인을 먼저 확인하고 미백 방법을 안내합니다.' },
]

const NEIGHBORHOODS: { slug: string; name: string; time: string }[] = [
  { slug: 'yeongju-dong', name: '영주동', time: '차로 약 3분' },
  { slug: 'hucheon-dong', name: '휴천동', time: '차로 약 5분' },
  { slug: 'gahung-dong', name: '가흥동', time: '차로 약 5분' },
  { slug: 'sangmang-dong', name: '상망동', time: '차로 약 7분' },
  { slug: 'hamang-dong', name: '하망동', time: '차로 약 7분' },
  { slug: 'munsu-myeon', name: '문수면', time: '차로 약 15분' },
  { slug: 'jangsu-myeon', name: '장수면', time: '차로 약 15분' },
  { slug: 'pyeongeun-myeon', name: '평은면', time: '차로 약 25분' },
]

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function yeongjuHubPage(otherAreas: { key: string; name: string; driveTime: string }[]) {
  const title = '영주 치과 | 강남치과의원 – 위치·진료시간·의료진·진료 안내'
  const description = '영주 치과 강남치과의원: 영주시 대학로 217(택지 사거리 모모제인 건물 2층). 구강악안면외과 전문의 2인 진료, 평일 09:00~17:30(토·일·공휴일 휴진), 건물 뒤편 주차. 054-636-8222.'
  const url = `${SITE}${HUB_PATH}`

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${url}#webpage`,
      "name": title,
      "description": description,
      "url": url,
      "inLanguage": "ko-KR",
      "isPartOf": { "@id": `${SITE}/#website` },
      "about": { "@id": `${SITE}/#organization` },
      "mainEntity": { "@id": `${SITE}/#organization` },
      "publisher": { "@id": `${SITE}/#organization` },
      "dateModified": YEONGJU_HUB_MODIFIED,
      "spatialCoverage": { "@type": "City", "name": "영주시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
      "relatedLink": TREATMENTS.map(t => `${SITE}${t.href}`)
    },
    {
      "@context": "https://schema.org",
      // 공통 병원 노드(#organization, layout 기본 스키마)에 이 허브의 진료 지역만 덧붙임
      "@type": ["Dentist", "MedicalOrganization", "LocalBusiness"],
      "@id": `${SITE}/#organization`,
      "name": "강남치과의원",
      "areaServed": [
        { "@type": "City", "name": "영주시", "containedInPlace": { "@type": "AdministrativeArea", "name": "경상북도" } },
        ...NEIGHBORHOODS.map(n => ({ "@type": "Place", "name": `영주시 ${n.name}` }))
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    }
  ]

  const html = `
  <section class="relative pt-28 md:pt-40 pb-12 md:pb-16 subpage-hero overflow-hidden">
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
      <nav aria-label="breadcrumb" class="mb-6 text-sm text-gray-400 flex items-center gap-2">
        <a href="/" class="hover:text-royal transition-colors">홈</a><i class="fas fa-chevron-right text-[8px]"></i><span class="text-charcoal font-medium">영주 치과</span>
      </nav>
      <h1 class="display-lg text-charcoal mb-6" data-speakable="true">영주 치과 | 강남치과의원</h1>
      <p id="tx-answer" class="text-gray-600 text-lg leading-relaxed max-w-3xl" data-speakable="true">강남치과의원은 영주시 대학로 217, 택지 사거리 모모제인 건물 2층에 있는 치과의원입니다. 구강악안면외과 전문의 두 명(이태형 대표원장·최민혜 원장)이 진료하며, 평일 오전 9시부터 오후 5시 30분까지 문을 엽니다.</p>
      <p class="text-xs text-gray-400 mt-4">최종 수정 <time datetime="${YEONGJU_HUB_MODIFIED}">${YEONGJU_HUB_MODIFIED}</time></p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/reservation" class="btn-primary !py-4 !px-8"><i class="fas fa-calendar-check"></i>상담 예약</a>
        <a href="tel:054-636-8222" class="btn-subtle"><i class="fas fa-phone text-royal"></i>054-636-8222</a>
        <a href="${NAVER_PLACE}" target="_blank" rel="noopener" class="btn-subtle"><i class="fas fa-map text-[#03C75A]"></i>네이버 지도</a>
      </div>
    </div>
  </section>

  <section class="py-12 md:py-16 bg-white">
    <div class="max-w-5xl mx-auto px-5 md:px-8 space-y-14 text-gray-600 leading-[1.9]">

      <div>
        <h2 class="display-sm text-charcoal mb-5">영주 시내에서 강남치과의원은 어디에 있나요?</h2>
        <p>주소는 경상북도 영주시 대학로 217, 2층입니다. 택지 사거리에 있는 모모제인 건물 2층이라 처음 오시는 분도 사거리를 기준으로 찾으시면 됩니다. 원도심인 영주동에서는 차로 3분 남짓, 휴천동·가흥동에서는 5분 안팎, 상망동·하망동에서는 7분 정도 걸립니다.</p>
        <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li><strong class="text-charcoal">자가용</strong> — 건물 뒤편 지상·지하 주차장 이용, 중앙고속도로 영주IC에서 약 5분</li>
          <li><strong class="text-charcoal">기차</strong> — 영주역에서 택시로 약 10분(약 4km)</li>
          <li><strong class="text-charcoal">버스</strong> — 영주 시내버스로 인근 정류장 하차 후 도보</li>
          <li><strong class="text-charcoal">지도</strong> — <a href="${NAVER_PLACE}" target="_blank" rel="noopener" class="text-royal underline">네이버 지도에서 보기</a> · <a href="/directions" class="text-royal underline">오시는 길 상세</a></li>
        </ul>
        <p class="mt-5 text-sm">동네별 소요 시간:
          ${NEIGHBORHOODS.map(n => `<a href="/local/${n.slug}" class="inline-block mr-3 text-royal hover:underline">${n.name}(${n.time})</a>`).join('')}
        </p>
      </div>

      <div>
        <h2 class="display-sm text-charcoal mb-5">진료시간과 예약은 어떻게 되나요?</h2>
        <dl class="grid grid-cols-[7rem_1fr] gap-y-2 max-w-xl">
          <dt class="font-bold text-charcoal">평일</dt><dd>09:00 ~ 17:30 (접수 마감 17:00)</dd>
          <dt class="font-bold text-charcoal">점심시간</dt><dd>13:00 ~ 14:00</dd>
          <dt class="font-bold text-charcoal">휴진</dt><dd>토요일 · 일요일 · 공휴일</dd>
          <dt class="font-bold text-charcoal">전화</dt><dd><a href="tel:054-636-8222" class="text-royal font-bold">054-636-8222</a></dd>
        </dl>
        <p class="mt-4">CT 촬영과 상담이 함께 필요한 임플란트·사랑니 진료는 시간이 더 걸리므로 전화나 <a href="/reservation" class="text-royal underline">온라인 예약</a>으로 시간을 잡고 오시는 편이 좋습니다. 온라인 문의는 진료시간 안에 3시간 이내로 답을 드립니다.</p>
      </div>

      <div>
        <h2 class="display-sm text-charcoal mb-5">어떤 의료진이 진료하나요?</h2>
        <p>두 원장 모두 보건복지부 인정 구강악안면외과 전문의입니다. 구강악안면외과는 발치, 임플란트 수술, 뼈이식처럼 잇몸과 턱뼈를 다루는 외과 진료를 수련하는 분야입니다.</p>
        <ul class="mt-4 space-y-2">
          <li><a href="/doctors/lee-taehyung" class="text-royal font-bold hover:underline">이태형 대표원장</a> — 고려대학교 구강악안면외과 석사, 고려대학교 구로병원 구강악안면외과 레지던트 수료</li>
          <li><a href="/doctors/choi-minhye" class="text-royal font-bold hover:underline">최민혜 원장</a> — 인제대학교 백병원 구강악안면외과 레지던트 수료</li>
        </ul>
      </div>

      <div>
        <h2 class="display-sm text-charcoal mb-5">영주 강남치과의원에서 받을 수 있는 진료</h2>
        <p class="mb-5">진단에는 3D CT(CBCT)와 구강 스캐너(PrimeScan·iTero)를 쓰고, 싱글 크라운은 원내 밀링기(CEREC MC X)와 소성로(SpeedFire)로 제작합니다. 진료 항목별 자세한 설명과 과정은 각 페이지에서 볼 수 있고, 비급여 비용은 <a href="/pricing" class="text-royal underline">수가 안내</a>에 정리돼 있습니다.</p>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${TREATMENTS.map(t => `<li class="card-premium p-5"><a href="${t.href}" class="font-bold text-charcoal hover:text-royal">영주 ${t.name}</a><p class="text-sm text-gray-500 mt-1 leading-relaxed">${esc(t.desc)}</p></li>`).join('')}
        </ul>
      </div>

      <div id="hub-faq">
        <h2 class="display-sm text-charcoal mb-5">영주 주민들이 자주 묻는 질문</h2>
        <div class="space-y-3">
          ${FAQS.map((f, i) => `
          <details class="card-premium group"${i === 0 ? ' open' : ''}>
            <summary class="flex items-center justify-between p-5 cursor-pointer select-none">
              <h3 class="font-bold text-charcoal text-base pr-4">${esc(f.q)}</h3>
              <i class="fas fa-chevron-down text-gray-300 group-open:rotate-180 transition-transform duration-300 flex-shrink-0"></i>
            </summary>
            <div class="px-5 pb-5 pt-0 text-[15px] faq-answer" data-speakable="true">${esc(f.a)}</div>
          </details>`).join('')}
        </div>
      </div>

      <div>
        <h2 class="text-lg font-extrabold text-charcoal mb-4">영주 밖에서 오시는 경우</h2>
        <div class="flex flex-wrap gap-2">
          ${otherAreas.map(a => `<a href="/area/${encodeURIComponent(a.key)}" class="px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-500 hover:text-royal hover:border-royal/30">${a.name} <span class="text-gray-300 text-xs">${a.driveTime}</span></a>`).join('')}
        </div>
      </div>
    </div>
  </section>
  `

  return {
    html,
    title,
    description,
    schemas,
    keywords: '영주 치과, 영주시 치과, 영주 치과 진료시간, 영주 치과 주차, 영주 구강외과, 영주 임플란트, 영주 사랑니',
    breadcrumbItems: [{ name: '홈', url: '/' }, { name: '영주 치과', url: HUB_PATH }],
  }
}

export const YEONGJU_HUB_FAQ_COUNT = FAQS.length
