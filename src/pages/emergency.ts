/**
 * 🚀 SEO 슈퍼업글 시즌 3: 응급 진료 페이지
 * "영주 야간 치과", "주말 응급 치과", "치통 응급" 등 응급 키워드 잡기
 *
 * 단일 풍부 페이지 + 지역별 페이지
 * URL: /emergency 또는 /emergency/:region
 */

import { getAreaInfo } from './combo'

const emergencyCases = [
  {
    icon: '🦷',
    title: '치아 외상 (이가 빠지거나 부러짐)',
    urgency: '🚨 즉시',
    timeWindow: '30분 골든타임',
    action: [
      '빠진 치아를 우유 또는 생리식염수에 보관 (수돗물 X)',
      '치아 머리만 잡고 뿌리는 만지지 않기',
      '054-636-8222 응급 전화',
      '거즈로 출혈 부위 압박',
      '30분 이내 치과 도착'
    ]
  },
  {
    icon: '😵',
    title: '심한 치통·욱신거림',
    urgency: '🚨 24시간 내',
    timeWindow: '신경 침범 가능성',
    action: [
      '진통제(이부프로펜) 일시 복용',
      '미지근한 소금물 양치',
      '아픈 쪽으로 씹지 말기',
      '24시간 이상 지속되면 즉시 내원',
      '발열·얼굴 부종 동반 시 응급'
    ]
  },
  {
    icon: '💧',
    title: '잇몸 농양·얼굴 부종',
    urgency: '🚨 즉시',
    timeWindow: '염증 확산 위험',
    action: [
      '얼음찜질로 부종 완화',
      '소금물 양치',
      '발열 시 해열제',
      '즉시 응급 전화 054-636-8222',
      '의식 변화·심한 호흡곤란 시 응급실'
    ]
  },
  {
    icon: '💉',
    title: '발치 후 출혈 지속',
    urgency: '🟡 1시간 내',
    timeWindow: '지혈 시간 초과',
    action: [
      '깨끗한 거즈로 30분 압박',
      '빨대 사용 금지·침 뱉지 않기',
      '머리 높이 유지 (누우면 출혈 증가)',
      '1시간 이상 지속 시 응급 전화',
      '많은 양 출혈·어지러움 시 응급실'
    ]
  },
  {
    icon: '🦴',
    title: '사랑니 응급 통증·부종',
    urgency: '🟡 24시간 내',
    timeWindow: '염증·개구장애',
    action: [
      '소금물 양치 (1일 3~4회)',
      '진통제·소염제',
      '입 벌리기 어려울 시 응급',
      '발열 동반 시 즉시 내원',
      '054-636-8222 응급 예약'
    ]
  },
  {
    icon: '🔧',
    title: '보철물·임플란트 빠짐',
    urgency: '🟢 24~48시간 내',
    timeWindow: '재부착 가능',
    action: [
      '빠진 보철물 보관 (버리지 마세요)',
      '해당 치아로 씹지 말기',
      '청결 유지',
      '24~48시간 내 내원',
      '드러난 치아 시린감 있을 수 있음'
    ]
  }
]

export function emergencyPage(regionSlug?: string): { html: string; title: string; description: string; keywords: string; schemas: object[] } {
  const area = regionSlug ? getAreaInfo(regionSlug) : null
  const areaPrefix = area ? `${area.name} ` : ''
  const areaContext = area ? `${area.name}·인근 거주자를 위한 ` : ''

  // SEO
  const title = `${areaPrefix}치과 응급 진료 | 야간·주말·치통 응급 | 영주 강남치과 054-636-8222`
  const description = `${areaContext}치과 응급 진료 안내. 치아 외상, 심한 치통, 잇몸 농양, 발치 후 출혈, 사랑니 응급 등 ${emergencyCases.length}가지 응급 상황별 대처법. 054-636-8222 응급 전화. 당일·익일 응급 예약 가능.`
  const keywords = [
    `${areaPrefix}치과 응급`,
    `${areaPrefix}야간 치과`,
    `${areaPrefix}주말 치과`,
    `${areaPrefix}치통 응급`,
    `${areaPrefix}응급 치과`,
    '영주 응급 치과',
    '경북 응급 치과',
    '치아 외상',
    '치통 응급실',
    '치과 골든타임',
    '영주 강남치과 응급'
  ].join(', ')

  const casesHtml = emergencyCases.map((e, i) => `
    <div class="bg-white rounded-xl p-6 shadow-lg border-l-4 ${e.urgency.includes('즉시') ? 'border-red-600' : e.urgency.includes('24시간') ? 'border-amber-500' : 'border-emerald-500'} hover:shadow-xl transition">
      <div class="flex items-start gap-4 mb-3">
        <div class="text-4xl">${e.icon}</div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="text-lg font-bold text-gray-800">${e.title}</h3>
          </div>
          <div class="flex gap-3 text-xs">
            <span class="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">${e.urgency}</span>
            <span class="bg-amber-100 text-amber-700 px-2 py-1 rounded">${e.timeWindow}</span>
          </div>
        </div>
      </div>
      <div class="mt-4 pl-2">
        <h4 class="text-sm font-bold text-gray-700 mb-2">💡 응급 대처법</h4>
        <ol class="space-y-1.5">
          ${e.action.map((a, idx) => `<li class="flex items-start gap-2 text-sm text-gray-800"><span class="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">${idx + 1}</span>${a}</li>`).join('')}
        </ol>
      </div>
    </div>
  `).join('')

  // Schema
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "name": `영주 강남치과의원 ${areaPrefix}응급 치과 진료`,
      "telephone": "+82-54-636-8222",
      "url": area ? `https://kndent.kr/emergency/${regionSlug}` : "https://kndent.kr/emergency",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "13:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "14:00",
          "closes": "17:30"
        }
      ],
      "areaServed": area ? [
        { "@type": "AdministrativeArea", "name": area.name },
        { "@type": "AdministrativeArea", "name": "영주시" }
      ] : [
        { "@type": "AdministrativeArea", "name": "영주시" },
        { "@type": "AdministrativeArea", "name": "봉화군" },
        { "@type": "AdministrativeArea", "name": "예천군" },
        { "@type": "AdministrativeArea", "name": "안동시" }
      ],
      "availableService": emergencyCases.map(e => ({
        "@type": "MedicalProcedure",
        "name": e.title,
        "procedureType": "TherapeuticProcedure"
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "응급 진료", "item": "https://kndent.kr/emergency" },
        ...(area ? [{ "@type": "ListItem", "position": 3, "name": `${area.name} 응급`, "item": `https://kndent.kr/emergency/${regionSlug}` }] : [])
      ]
    }
  ]

  const html = `
    <article class="bg-gradient-to-br from-red-50 via-white to-orange-50">
      <!-- 긴급 Hero -->
      <section class="bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-12">
        <div class="max-w-5xl mx-auto px-4">
          <div class="inline-block bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-xs font-black mb-3 animate-pulse">🚨 응급 진료</div>
          <h1 class="text-3xl md:text-5xl font-black mb-4" data-speakable>${areaPrefix}치과 응급 진료</h1>
          <p class="text-lg md:text-xl text-white/95 mb-6" data-speakable>
            ${areaContext}치아 외상·치통·잇몸 농양·발치 후 출혈 등<br/>
            <strong>${emergencyCases.length}가지 응급 상황별 즉시 대처법 + 응급 진료 안내</strong>
          </p>
          <div class="bg-white text-red-700 rounded-2xl p-6 shadow-2xl inline-block">
            <div class="text-sm font-bold mb-2">📞 ${areaPrefix}응급 진료 즉시 전화</div>
            <a href="tel:054-636-8222" class="text-4xl md:text-5xl font-black">054-636-8222</a>
            <div class="text-xs mt-2 text-gray-600">평일 09:00~17:30 (접수마감 17:00, 점심 13:00~14:00) · 토·일·공휴일 휴무</div>
          </div>
        </div>
      </section>

      <!-- 응급 상황 카드 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">⚡ ${emergencyCases.length}가지 응급 상황별 대처법</h2>
        <p class="text-gray-600 mb-6" data-speakable>치과 응급은 빠른 판단과 즉시 대처가 중요합니다. 영주 강남치과 응급 진료팀의 골든타임 가이드.</p>
        <div class="grid md:grid-cols-2 gap-5">
          ${casesHtml}
        </div>
      </section>

      <!-- 응급 골든타임 -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <div class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-300">
          <h2 class="text-2xl font-bold text-amber-900 mb-4">⏰ 치과 응급의 골든타임</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl p-4 shadow border-l-4 border-red-600">
              <div class="text-3xl mb-2">30분</div>
              <div class="font-bold text-gray-800 mb-1">치아 외상 (탈구)</div>
              <p class="text-sm text-gray-700">우유에 보관 후 30분 이내 도착 시 재식 가능성 높음</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow border-l-4 border-amber-500">
              <div class="text-3xl mb-2">24시간</div>
              <div class="font-bold text-gray-800 mb-1">심한 치통</div>
              <p class="text-sm text-gray-700">신경 침범 방지를 위해 24시간 내 진료 권장</p>
            </div>
            <div class="bg-white rounded-xl p-4 shadow border-l-4 border-emerald-500">
              <div class="text-3xl mb-2">48시간</div>
              <div class="font-bold text-gray-800 mb-1">보철물 빠짐</div>
              <p class="text-sm text-gray-700">치아 노출 방치 시 시림·균열 위험</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 응급 시 절대 하지 말 것 -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-red-700 mb-4">🚫 응급 상황에서 절대 하지 말 것</h2>
        <div class="bg-red-50 rounded-xl p-6 border-2 border-red-200">
          <ul class="space-y-3">
            <li class="flex items-start gap-2"><span class="text-red-600 font-black">✗</span><span class="text-gray-800"><strong>빠진 치아를 수돗물로 닦지 마세요</strong> — 치근 표면 세포 손상</span></li>
            <li class="flex items-start gap-2"><span class="text-red-600 font-black">✗</span><span class="text-gray-800"><strong>치아 뿌리(흰 부분)를 만지지 마세요</strong> — 치주인대 세포 보호</span></li>
            <li class="flex items-start gap-2"><span class="text-red-600 font-black">✗</span><span class="text-gray-800"><strong>발치 후 빨대 사용·침 뱉기 금지</strong> — 혈병 파괴로 출혈·드라이소켓</span></li>
            <li class="flex items-start gap-2"><span class="text-red-600 font-black">✗</span><span class="text-gray-800"><strong>아스피린을 치아에 직접 올리지 마세요</strong> — 잇몸 화상</span></li>
            <li class="flex items-start gap-2"><span class="text-red-600 font-black">✗</span><span class="text-gray-800"><strong>심한 부종을 무시하지 마세요</strong> — 패혈증·기도폐쇄 위험</span></li>
            <li class="flex items-start gap-2"><span class="text-red-600 font-black">✗</span><span class="text-gray-800"><strong>인터넷 자가치료 금지</strong> — 잘못된 정보로 악화 가능</span></li>
          </ul>
        </div>
      </section>

      <!-- 영주 강남치과 응급 진료 시스템 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">🏥 영주 강남치과 응급 진료 시스템</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white rounded-xl p-5 shadow border-2 border-emerald-200">
            <div class="text-2xl mb-2">📞</div>
            <h3 class="font-bold text-emerald-800 mb-2">즉시 전화 응대</h3>
            <p class="text-sm text-gray-700">054-636-8222로 전화 시 응급 상황 즉시 안내. 당일·익일 예약 가능.</p>
          </div>
          <div class="bg-white rounded-xl p-5 shadow border-2 border-emerald-200">
            <div class="text-2xl mb-2">🚀</div>
            <h3 class="font-bold text-emerald-800 mb-2">우선 진료</h3>
            <p class="text-sm text-gray-700">응급 환자는 일반 예약 대기 없이 우선 진료. 도착 즉시 평가.</p>
          </div>
          <div class="bg-white rounded-xl p-5 shadow border-2 border-emerald-200">
            <div class="text-2xl mb-2">🔬</div>
            <h3 class="font-bold text-emerald-800 mb-2">CBCT 정밀 진단</h3>
            <p class="text-sm text-gray-700">치아 외상·골절 정밀 진단. 신경·치근 손상 정확히 파악.</p>
          </div>
          <div class="bg-white rounded-xl p-5 shadow border-2 border-emerald-200">
            <div class="text-2xl mb-2">👨‍⚕️</div>
            <h3 class="font-bold text-emerald-800 mb-2">전문의 직접 진료</h3>
            <p class="text-sm text-gray-700">구강악안면외과 전문의가 직접 응급 진료. 안전한 시술.</p>
          </div>
        </div>
      </section>

      <!-- 응급 FAQ -->
      <section class="bg-gray-50 py-12">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">❓ ${areaPrefix}응급 진료 자주 묻는 질문</h2>
          <details class="bg-white rounded-xl p-5 shadow mb-3 border-l-4 border-red-500" open>
            <summary class="font-bold text-gray-800 cursor-pointer list-none"><span class="text-red-600 font-black">Q.</span> 야간·새벽에 치통이 생기면 어떻게 하나요?</summary>
            <p class="text-gray-700 mt-3 pl-6 faq-answer">진통제(이부프로펜) 복용 + 소금물 양치 + 아픈 쪽 회피로 일시 대응 후, 다음날 오전 즉시 054-636-8222로 전화 주세요. 응급 우선 진료 가능. 극심한 통증 + 발열 + 부종 시 응급실 동시 방문.</p>
          </details>
          <details class="bg-white rounded-xl p-5 shadow mb-3 border-l-4 border-red-500" open>
            <summary class="font-bold text-gray-800 cursor-pointer list-none"><span class="text-red-600 font-black">Q.</span> 영주 강남치과 응급 진료는 어떻게 신청?</summary>
            <p class="text-gray-700 mt-3 pl-6 faq-answer">054-636-8222로 전화하시면 응급 상황 우선 안내드립니다. 당일·익일 응급 예약 가능. 예약 페이지(/reservation)에서도 응급 표시 후 접수 가능.</p>
          </details>
          <details class="bg-white rounded-xl p-5 shadow mb-3 border-l-4 border-red-500" open>
            <summary class="font-bold text-gray-800 cursor-pointer list-none"><span class="text-red-600 font-black">Q.</span> 응급 진료비는 비싼가요?</summary>
            <p class="text-gray-700 mt-3 pl-6 faq-answer">기본 응급 진단·처치는 일반 진료비와 동일합니다(보험 적용). 추가 시술(신경치료·크라운·임플란트)는 별도. 무리한 응급비 청구 없는 정직한 비용 정책.</p>
          </details>
          <details class="bg-white rounded-xl p-5 shadow mb-3 border-l-4 border-red-500" open>
            <summary class="font-bold text-gray-800 cursor-pointer list-none"><span class="text-red-600 font-black">Q.</span> 봉화·예천·안동에서 영주 응급 진료 가능한가요?</summary>
            <p class="text-gray-700 mt-3 pl-6 faq-answer">네, 가능합니다. 영주 강남치과는 봉화(20분)·예천(25분)·안동(50분)·문경(45분) 등 경북북부 환자분들의 거점 응급 치과입니다. 054-636-8222로 즉시 전화.</p>
          </details>
        </div>
      </section>

      <!-- 최종 CTA -->
      <section class="bg-gradient-to-r from-red-700 to-orange-700 text-white py-12">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <div class="inline-block bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-xs font-black mb-4 animate-pulse">🚨 응급 즉시 연락</div>
          <h2 class="text-3xl font-bold mb-2">${areaPrefix}치과 응급 진료</h2>
          <p class="text-white/95 mb-6 text-lg">지금 즉시 전화 주세요. 골든타임이 중요합니다.</p>
          <a href="tel:054-636-8222" class="inline-block bg-white text-red-700 font-black px-12 py-5 rounded-full text-3xl shadow-2xl hover:scale-105 transition">📞 054-636-8222</a>
        </div>
      </section>
    </article>
  `

  return { html, title, description, keywords, schemas }
}
