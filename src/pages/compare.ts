/**
 * 🚀 SEO 슈퍼업글 시즌 2: 비교(Compare) 페이지
 * "영주 vs 대구 치과", "영주 임플란트 vs 안동" 같은 비교 키워드 잡기
 * 8개 비교 조합 × 8개 진료 = 64개 비교 페이지
 * URL: /compare/:pair/:treatment
 */

import { getAreaInfo, getTreatmentInfo, getAreaSlugs, getTreatmentSlugs } from './combo'

interface ComparePair {
  slug: string
  ourRegion: string      // 우리지역 slug (영주/봉화/예천 중 하나)
  rivalRegion: string    // 비교 대상 (대구/안동/서울 등)
  rivalName: string      // 표시명
  rivalKeyword: string   // 비교 키워드
  rivalContext: string   // 비교 대상에 대한 설명
  ourAdvantage: string[] // 우리지역 장점 5가지
  rivalProfile: string   // 비교 대상 프로필
  distanceKm: number     // 평균 거리
  timeMinutes: number    // 평균 이동시간
  costDiff: string       // 비용 차이
}

const comparePairs: ComparePair[] = [
  {
    slug: 'yeongju-vs-daegu',
    ourRegion: 'yeongju',
    rivalRegion: 'daegu',
    rivalName: '대구',
    rivalKeyword: '대구 치과',
    rivalContext: '경북 최대 진료권역으로 종합병원과 대학병원이 밀집된 지역',
    ourAdvantage: [
      '대구 왕복 4시간(편도 1시간 30분) 절약 — 진료 한 번에 반나절 소요',
      '대구 대형치과 평균 임플란트 가격 대비 영주 강남치과는 동등 또는 더 저렴',
      '대구 종합병원 수준 디지털 장비(CBCT, 디지털 스캐너) 완비',
      '서울대 출신 통합치과 전문의 진료 — 대학병원급 진료 품질',
      '예약 대기 없음 — 대구 대형치과는 2~4주 대기, 영주 강남치과는 당일·익일 가능'
    ],
    rivalProfile: '대구는 영남 최대 의료권역으로 경북대병원·동산병원 등 대학병원과 대형 네트워크 치과가 많지만, 영주 환자 입장에서는 왕복 4시간 이동·대기시간·교통비라는 숨은 비용이 큽니다.',
    distanceKm: 95,
    timeMinutes: 90,
    costDiff: '동등 또는 영주가 더 저렴'
  },
  {
    slug: 'yeongju-vs-andong',
    ourRegion: 'yeongju',
    rivalRegion: 'andong',
    rivalName: '안동',
    rivalKeyword: '안동 치과',
    rivalContext: '경북 북부 행정·교육 중심지로 안동시 치과가 다수 분포',
    ourAdvantage: [
      '안동 왕복 1시간 30분 절약 — 진료 1회당 시간 비용 큼',
      '영주 강남치과는 안동 평균 치과 대비 더 큰 규모와 최신 장비 보유',
      '안동 대비 인비절라인·디지털 보철 등 전문 진료 라인업 더 다양',
      '서울대 전문의 직접 진료 — 안동 일반치과 대비 진료 깊이 차이',
      '영주에서 안동까지 시외버스/택시 비용 절감(왕복 4만원+)'
    ],
    rivalProfile: '안동은 경북 북부의 행정중심지로 치과 인프라가 영주와 비슷하지만, 영주·봉화·예천 거주자에게는 영주 강남치과가 더 가깝고 진료 라인업·장비 면에서 경쟁력이 큽니다.',
    distanceKm: 40,
    timeMinutes: 50,
    costDiff: '비슷한 수준 (영주가 약간 저렴)'
  },
  {
    slug: 'yeongju-vs-seoul',
    ourRegion: 'yeongju',
    rivalRegion: 'seoul',
    rivalName: '서울',
    rivalKeyword: '서울 치과',
    rivalContext: '강남·압구정 등 프리미엄 치과 밀집 지역',
    ourAdvantage: [
      '서울 왕복 6~7시간 + 1박 비용 절약',
      '서울 강남 임플란트 평균 대비 50~70% 가격으로 동등 품질',
      '서울대 출신 통합치과 전문의 진료 — 강남 치과와 동일 출신 진료',
      'CBCT + 디지털 스캐너 + 수술실 — 서울 대형 치과와 동일 인프라',
      '평생관리(스케일링 정기검진) 가능한 가까운 거리'
    ],
    rivalProfile: '서울 강남 치과는 브랜드 마케팅과 럭셔리 인테리어로 유명하지만, 실제 진료 품질은 의료진의 출신과 임상 깊이에 달려 있습니다. 영주 강남치과는 서울대 출신 전문의가 같은 수준의 진료를 합니다.',
    distanceKm: 200,
    timeMinutes: 180,
    costDiff: '영주가 30~50% 저렴'
  },
  {
    slug: 'yeongju-vs-yecheon',
    ourRegion: 'yeongju',
    rivalRegion: 'yecheon',
    rivalName: '예천',
    rivalKeyword: '예천 치과',
    rivalContext: '경북 북부 인구 5만명 군 단위 지역',
    ourAdvantage: [
      '예천에서 영주까지 25분 — 같은 생활권',
      '예천 일반치과 대비 영주 강남치과는 전문 진료 라인업 8개 + 디지털 장비 풀세트',
      '서울대 전문의 진료 — 예천 지역에서 접근 어려운 진료 품질',
      '인비절라인·보철 등 전문 진료는 영주가 압도적 경쟁력',
      '예천 환자분들 다수 영주 강남치과 정기 방문 — 검증된 신뢰'
    ],
    rivalProfile: '예천은 영주의 인접 도시로 일상 진료(스케일링·충치)는 가까운 곳도 좋지만, 임플란트·교정·보철 등 전문진료는 영주 강남치과가 압도적입니다.',
    distanceKm: 25,
    timeMinutes: 30,
    costDiff: '영주가 더 저렴하거나 비슷'
  },
  {
    slug: 'yeongju-vs-bonghwa',
    ourRegion: 'yeongju',
    rivalRegion: 'bonghwa',
    rivalName: '봉화',
    rivalKeyword: '봉화 치과',
    rivalContext: '경북 봉화군은 영주 생활권의 인접 지역',
    ourAdvantage: [
      '봉화 → 영주 평균 30분 이내 — 시외버스·자가용 접근 용이',
      '봉화 지역 치과 대비 임플란트·교정·보철 등 전문 진료 라인업 8배',
      '서울대 통합치과 전문의 — 군 단위에서 만나기 힘든 진료 깊이',
      'CBCT·디지털 스캐너 완비 — 봉화 일반치과에서 어려운 정밀진단',
      '봉화 환자 다수 정기 방문 — 평생관리 시스템'
    ],
    rivalProfile: '봉화 지역은 인구가 적어 전문 치과 진료 선택지가 제한적입니다. 영주 강남치과는 봉화 환자분들이 가장 많이 선택하는 인근 거점 치과입니다.',
    distanceKm: 20,
    timeMinutes: 25,
    costDiff: '영주 강남치과가 더 저렴'
  },
  {
    slug: 'yeongju-vs-yeongyang',
    ourRegion: 'yeongju',
    rivalRegion: 'yeongyang',
    rivalName: '영양',
    rivalKeyword: '영양 치과',
    rivalContext: '경북 영양군 — 인구 1.6만명 소규모 지역',
    ourAdvantage: [
      '영양 → 영주 약 1시간 — 안동 경유보다 가까운 동선',
      '영양 군 내 전문 치과 부재 — 영주 강남치과가 최적 선택지',
      '서울대 전문의 + 풀라인업 전문진료',
      'CBCT 정밀진단 + 디지털 보철',
      '영양 환자 다수 정기 방문 중'
    ],
    rivalProfile: '영양은 의료 인프라가 제한적인 군 단위 지역으로, 전문적인 치과 진료를 받기 위해 영주·안동으로 이동해야 합니다. 거리상 영주가 더 가깝고 진료 라인업도 우수합니다.',
    distanceKm: 60,
    timeMinutes: 70,
    costDiff: '영주가 더 저렴'
  },
  {
    slug: 'yeongju-vs-mungyeong',
    ourRegion: 'yeongju',
    rivalRegion: 'mungyeong',
    rivalName: '문경',
    rivalKeyword: '문경 치과',
    rivalContext: '경북 문경시 — 영주 인접 도시',
    ourAdvantage: [
      '문경 → 영주 약 45분 — 점촌·문경 거주자 접근 가능',
      '문경 평균 치과 대비 영주 강남치과는 전문 진료·장비 우위',
      '서울대 전문의 진료 + 8개 전문 진료라인',
      '디지털 임플란트·인비절라인 등 첨단 진료',
      '문경 환자분들도 영주 강남치과로 다수 내원'
    ],
    rivalProfile: '문경은 영주와 비슷한 도시 규모로 치과 인프라가 있지만, 영주 강남치과는 의료진 출신과 장비 면에서 차별화된 선택지입니다.',
    distanceKm: 50,
    timeMinutes: 50,
    costDiff: '비슷 (영주가 약간 저렴)'
  },
  {
    slug: 'yeongju-vs-cheongsong',
    ourRegion: 'yeongju',
    rivalRegion: 'cheongsong',
    rivalName: '청송',
    rivalKeyword: '청송 치과',
    rivalContext: '경북 청송군 — 인구 2.4만명 소규모 지역',
    ourAdvantage: [
      '청송 → 영주 약 1시간 30분 — 안동 경유 가능',
      '청송 군내 전문진료 인프라 제한적',
      '서울대 전문의 진료 + 풀라인업',
      'CBCT 정밀진단 + 디지털 보철 시스템',
      '청송 인근 환자분들도 영주 강남치과 정기 내원'
    ],
    rivalProfile: '청송은 의료 인프라가 제한된 산간 군지역으로 전문 치과 진료를 위해서는 안동·영주로 이동해야 합니다. 영주 강남치과는 청송 환자분들이 신뢰하는 거점 치과입니다.',
    distanceKm: 80,
    timeMinutes: 90,
    costDiff: '영주가 더 저렴'
  }
]

export function getComparePair(slug: string): ComparePair | undefined {
  return comparePairs.find(p => p.slug === slug)
}

export function getAllCompareSlugs(): string[] {
  return comparePairs.map(p => p.slug)
}

export function comparePage(pairSlug: string, treatmentSlug: string): { html: string; title: string; description: string; keywords: string; schemas: object[] } | null {
  const pair = getComparePair(pairSlug)
  if (!pair) return null

  const treatment = getTreatmentInfo(treatmentSlug)
  if (!treatment) return null

  const ourArea = getAreaInfo(pair.ourRegion)
  if (!ourArea) return null

  // SEO 메타
  const title = `${pair.rivalName} ${treatment.koSlug} vs 영주 강남치과 ${treatment.koSlug} | 비교 가이드 [2026]`
  const description = `${pair.rivalKeyword}와 영주 강남치과 ${treatment.koSlug} 정밀 비교. 거리 ${pair.distanceKm}km(${pair.timeMinutes}분), 비용 ${pair.costDiff}, 진료 품질·장비·전문의 비교 분석. ${ourArea.name} ${treatment.koSlug} 선택 가이드.`
  const keywords = [
    `${pair.rivalName} ${treatment.koSlug}`,
    `영주 ${treatment.koSlug}`,
    `${pair.rivalKeyword} 비교`,
    `${pair.rivalName} vs 영주 ${treatment.koSlug}`,
    `영주 ${treatment.koSlug} ${pair.rivalName} 비교`,
    `${pair.rivalName} ${treatment.koSlug} 가격 비교`,
    `${pair.rivalName} ${treatment.koSlug} 추천`,
    `영주 강남치과 ${treatment.koSlug}`,
    `${ourArea.name} ${treatment.koSlug}`,
    `경북 ${treatment.koSlug}`
  ].join(', ')

  // 비교 표
  const compareTable = `
    <div class="overflow-x-auto rounded-xl border border-emerald-200 shadow-lg my-8">
      <table class="w-full text-left">
        <thead class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <tr>
            <th class="px-4 py-3 font-bold">비교 항목</th>
            <th class="px-4 py-3 font-bold">영주 강남치과 ${treatment.koSlug}</th>
            <th class="px-4 py-3 font-bold text-gray-200">${pair.rivalName} ${treatment.koSlug}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">의료진</td>
            <td class="px-4 py-3 font-medium text-emerald-700">서울대 출신 통합치과 전문의 (장기재직 ${treatment.koSlug} 임상)</td>
            <td class="px-4 py-3 text-gray-600">치과 따라 다름 (전문의 여부 확인 필요)</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">디지털 장비</td>
            <td class="px-4 py-3 font-medium text-emerald-700">CBCT + 디지털 스캐너 + 디지털 임플란트 시스템</td>
            <td class="px-4 py-3 text-gray-600">치과별 편차 큼</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">${treatment.koSlug} 비용</td>
            <td class="px-4 py-3 font-medium text-emerald-700">${pair.costDiff}</td>
            <td class="px-4 py-3 text-gray-600">${pair.rivalName} 평균가 (참고용)</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">왕복 거리·시간</td>
            <td class="px-4 py-3 font-medium text-emerald-700">${ourArea.name} 거주자 기준 가까움</td>
            <td class="px-4 py-3 text-gray-600">왕복 약 ${pair.distanceKm * 2}km / ${pair.timeMinutes * 2}분</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">대기시간</td>
            <td class="px-4 py-3 font-medium text-emerald-700">당일·익일 예약 가능</td>
            <td class="px-4 py-3 text-gray-600">대형치과 평균 2~4주 대기</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">사후관리</td>
            <td class="px-4 py-3 font-medium text-emerald-700">평생관리 시스템 (정기검진·스케일링 가까움)</td>
            <td class="px-4 py-3 text-gray-600">거리 때문에 정기 관리 어려움</td>
          </tr>
          <tr>
            <td class="px-4 py-3 font-semibold bg-emerald-50">교통·시간 비용</td>
            <td class="px-4 py-3 font-medium text-emerald-700">최소화 (인근 30분 내)</td>
            <td class="px-4 py-3 text-gray-600">교통비 + 시간 + 동반자 비용</td>
          </tr>
        </tbody>
      </table>
    </div>
  `

  // 우리 장점 카드
  const advantageCards = pair.ourAdvantage.map((adv, i) => `
    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200 hover:shadow-lg transition">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">${i + 1}</div>
        <p class="text-gray-800 leading-relaxed pt-1">${adv}</p>
      </div>
    </div>
  `).join('')

  // FAQ
  const faqs = [
    {
      q: `${pair.rivalKeyword}와 영주 강남치과 ${treatment.koSlug} 중 어디가 더 좋은가요?`,
      a: `${ourArea.name}·인근 거주자 기준으로는 영주 강남치과가 훨씬 유리합니다. 거리 ${pair.distanceKm}km(${pair.timeMinutes}분)를 절약하면서도 서울대 출신 통합치과 전문의의 진료를 받을 수 있고, ${treatment.koSlug} 비용도 ${pair.costDiff}입니다. ${pair.rivalName}의 대형치과는 브랜드 인지도는 있지만, 의료진 출신과 장비 수준은 영주 강남치과와 동등하거나 비슷합니다.`
    },
    {
      q: `${pair.rivalName}까지 가서 ${treatment.koSlug}을 받을 가치가 있나요?`,
      a: `${treatment.koSlug}은 1회 진료로 끝나는 시술이 아닙니다. 임플란트는 평균 4~6개월(3~5회 내원), 교정은 1~2년, 보철도 2~3회 내원이 필요합니다. ${pair.rivalName}까지 왕복 ${pair.timeMinutes * 2}분을 매번 이동하는 것은 시간 비용·교통비·체력 부담이 큽니다. 같은 출신·같은 장비라면 가까운 곳을 선택하는 것이 합리적입니다.`
    },
    {
      q: `${pair.rivalName} 대형치과 vs 영주 강남치과, 진료 품질 차이가 있나요?`,
      a: `진료 품질은 '의료진의 출신·임상경력 + 장비 + 시스템'으로 결정됩니다. 영주 강남치과는 서울대 출신 통합치과 전문의가 직접 진료하고, CBCT·디지털 스캐너·디지털 임플란트 시스템을 모두 갖추고 있습니다. ${pair.rivalName} 대형치과의 브랜드 광고는 시스템 마케팅의 결과이지, 모든 의료진이 동일 수준이라는 의미는 아닙니다.`
    },
    {
      q: `${pair.rivalName}이 더 저렴한 ${treatment.koSlug}이 있을까요?`,
      a: `${pair.rivalName}에도 저가형 ${treatment.koSlug}이 있을 수 있지만, ${treatment.koSlug}은 재료·시스템·의료진 수준에 따라 결과가 크게 달라지는 진료입니다. 영주 강남치과는 정직한 가격 정책으로 ${pair.rivalName} 대형치과의 평균가 대비 ${pair.costDiff}이며, 추가 비용이 없는 투명한 견적을 제시합니다. 저가형 ${treatment.koSlug}의 위험성은 별도로 안내드립니다.`
    },
    {
      q: `${pair.rivalName}에서 ${treatment.koSlug} 받았는데 영주 강남치과로 옮길 수 있나요?`,
      a: `네, 가능합니다. ${pair.rivalName}에서 시작한 ${treatment.koSlug}을 영주 강남치과에서 이어서 진료받는 환자분들이 많이 계십니다. 진료기록·방사선·진단자료를 가져오시면 정밀 검토 후 안전하게 이어 진료를 진행합니다. 사후관리·재시술도 모두 가능합니다.`
    }
  ]

  const faqHtml = faqs.map(f => `
    <div class="bg-white rounded-xl p-5 shadow-md border-l-4 border-emerald-500 mb-4">
      <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-start gap-2">
        <span class="text-emerald-600 font-black">Q.</span> ${f.q}
      </h3>
      <p class="text-gray-700 leading-relaxed faq-answer">${f.a}</p>
    </div>
  `).join('')

  // 다른 비교 페이지 링크 (mesh)
  const otherCompares = comparePairs.filter(p => p.slug !== pairSlug).slice(0, 4)
  const otherComparesHtml = otherCompares.map(p => `
    <a href="/compare/${p.slug}/${treatmentSlug}" class="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition group">
      <div class="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">영주 vs ${p.rivalName}</div>
      <div class="text-xs text-gray-600 mt-1">${treatment.koSlug} 비교 가이드</div>
    </a>
  `).join('')

  // 다른 진료 비교 링크 (같은 pair, 다른 treatment)
  const treatmentSlugs = ['implant', 'invisalign', 'wisdom-tooth', 'digital-prosthesis', 'cosmetic', 'bone-graft', 'cavity', 'whitening']
  const otherTreatments = treatmentSlugs.filter(t => t !== treatmentSlug).slice(0, 6)
  const otherTreatmentsHtml = otherTreatments.map(t => {
    const ti = getTreatmentInfo(t)
    if (!ti) return ''
    return `
      <a href="/compare/${pairSlug}/${t}" class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200 hover:border-blue-500 hover:shadow-lg transition group">
        <div class="text-sm font-semibold text-blue-700 group-hover:text-blue-800">${pair.rivalName} vs 영주 ${ti.koSlug}</div>
        <div class="text-xs text-gray-600 mt-1">비교 가이드</div>
      </a>
    `
  }).join('')

  // Schema.org
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "비교 가이드", "item": "https://kndent.kr/compare" },
        { "@type": "ListItem", "position": 3, "name": `영주 vs ${pair.rivalName}`, "item": `https://kndent.kr/compare/${pairSlug}` },
        { "@type": "ListItem", "position": 4, "name": `${treatment.koSlug} 비교`, "item": `https://kndent.kr/compare/${pairSlug}/${treatmentSlug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "datePublished": "2026-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        "name": "영주 강남치과의원",
        "url": "https://kndent.kr"
      },
      "publisher": {
        "@type": "MedicalBusiness",
        "name": "영주 강남치과의원",
        "url": "https://kndent.kr"
      },
      "about": {
        "@type": "MedicalProcedure",
        "name": treatment.koSlug
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://kndent.kr/compare/${pairSlug}/${treatmentSlug}`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "url": `https://kndent.kr/compare/${pairSlug}/${treatmentSlug}`,
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient",
        "geographicArea": {
          "@type": "AdministrativeArea",
          "name": ourArea.name
        }
      }
    }
  ]

  const html = `
    <article class="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <!-- Hero -->
      <section class="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white py-16">
        <div class="max-w-5xl mx-auto px-4">
          <nav aria-label="breadcrumb" class="text-sm text-emerald-100 mb-4">
            <a href="/" class="hover:underline">홈</a> /
            <a href="/area/${pair.ourRegion}" class="hover:underline">${ourArea.name}</a> /
            <span class="text-white">${pair.rivalName} vs 영주 ${treatment.koSlug}</span>
          </nav>
          <div class="inline-block bg-emerald-500 px-3 py-1 rounded-full text-xs font-bold mb-3">🔍 비교 가이드 [2026]</div>
          <h1 class="text-3xl md:text-4xl font-bold mb-4 leading-tight" data-speakable>
            ${pair.rivalName} ${treatment.koSlug} vs 영주 강남치과 ${treatment.koSlug}<br/>
            <span class="text-emerald-200 text-2xl md:text-3xl">${ourArea.name} 거주자 선택 가이드</span>
          </h1>
          <p class="text-lg text-emerald-100 leading-relaxed" data-speakable>
            ${pair.rivalContext}. 거리 ${pair.distanceKm}km(${pair.timeMinutes}분), 비용 ${pair.costDiff}, 진료 품질·장비를 정밀 비교한 ${ourArea.name} 거주자 전용 선택 가이드입니다.
          </p>
        </div>
      </section>

      <!-- 핵심 비교 표 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">📊 7가지 핵심 비교 항목</h2>
        <p class="text-gray-600 mb-6 compare-summary" data-speakable>
          ${pair.rivalName} ${treatment.koSlug}와 영주 강남치과 ${treatment.koSlug}을 의료진·장비·비용·거리·대기시간·사후관리·교통비 7가지 항목으로 비교합니다.
        </p>
        ${compareTable}
      </section>

      <!-- 우리 장점 -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">✨ ${ourArea.name} 거주자에게 영주 강남치과가 더 좋은 5가지 이유</h2>
        <p class="text-gray-600 mb-6">${pair.rivalProfile}</p>
        <div class="grid md:grid-cols-2 gap-4">
          ${advantageCards}
        </div>
      </section>

      <!-- 비용 상세 비교 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">💰 ${treatment.koSlug} 실질 비용 비교 (영주 vs ${pair.rivalName})</h2>
        <div class="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-6">
          <h3 class="text-lg font-bold text-amber-900 mb-3">📌 ${pair.rivalName} ${treatment.koSlug}의 숨은 비용</h3>
          <ul class="space-y-2 text-gray-800">
            <li>• <strong>교통비:</strong> 왕복 약 ${Math.round(pair.distanceKm * 2 * 0.3)}km × 평균 유류비 + 통행료 = 회당 ${Math.round(pair.distanceKm * 0.5)}천원+</li>
            <li>• <strong>시간 비용:</strong> 왕복 ${pair.timeMinutes * 2}분 × ${treatment.koSlug} 평균 내원횟수 ${treatment.koSlug.includes('임플란트') ? '4~6회' : treatment.koSlug.includes('교정') ? '12~18회' : '2~3회'}</li>
            <li>• <strong>동반자 비용:</strong> 수술/마취 진료 시 동반자 필요 → 추가 시간 비용</li>
            <li>• <strong>사후관리 어려움:</strong> 정기검진·스케일링을 위해 ${pair.rivalName}까지 이동 어려움 → 결국 가까운 치과로 이전</li>
          </ul>
        </div>
        <div class="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-6">
          <h3 class="text-lg font-bold text-emerald-900 mb-3">✅ 영주 강남치과 ${treatment.koSlug} 실질 비용</h3>
          <ul class="space-y-2 text-gray-800">
            <li>• <strong>진료비:</strong> ${pair.rivalName} 평균가 대비 ${pair.costDiff}</li>
            <li>• <strong>추가비용 없음:</strong> 정직한 견적, 진료 후 추가 비용 없음 보장</li>
            <li>• <strong>교통·시간 절약:</strong> ${ourArea.name} 거주자 기준 왕복 30분 내</li>
            <li>• <strong>사후관리 무료:</strong> 정기검진 + 스케일링 평생관리 시스템</li>
            <li>• <strong>이전·재진료:</strong> ${pair.rivalName}에서 받은 진료 이어서 가능</li>
          </ul>
        </div>
      </section>

      <!-- FAQ -->
      <section class="bg-gray-50 py-12">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">❓ ${pair.rivalName} ${treatment.koSlug} vs 영주 강남치과 FAQ</h2>
          <p class="text-gray-600 mb-6">${ourArea.name} 환자분들이 가장 많이 물어보시는 비교 질문 5가지</p>
          ${faqHtml}
        </div>
      </section>

      <!-- 다른 비교 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🔍 다른 지역과의 ${treatment.koSlug} 비교</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          ${otherComparesHtml}
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mb-6">🩺 ${pair.rivalName} 다른 진료 비교</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${otherTreatmentsHtml}
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">${ourArea.name}에서 ${treatment.koSlug}, 영주 강남치과로 시작하세요</h2>
          <p class="text-emerald-100 mb-6 text-lg">${pair.rivalName}까지 안 가도 됩니다. 같은 출신·같은 장비·더 가까운 거리.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/reservation" class="bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition">📅 진료 예약하기</a>
            <a href="tel:054-633-2828" class="bg-emerald-800 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-900 transition border-2 border-white">📞 054-633-2828</a>
          </div>
        </div>
      </section>
    </article>
  `

  return { html, title, description, keywords, schemas }
}

/** 모든 비교 페이지 경로 (sitemap용) */
export function getAllComparePaths(): { pairSlug: string; treatmentSlug: string; priority: number }[] {
  const treatmentSlugs = ['implant', 'invisalign', 'wisdom-tooth', 'digital-prosthesis', 'cosmetic', 'bone-graft', 'cavity', 'whitening']
  const paths: { pairSlug: string; treatmentSlug: string; priority: number }[] = []

  // 우선순위: yeongju-vs-daegu/andong/seoul × implant/invisalign/wisdom-tooth = 9개 (priority 1)
  // 나머지는 priority 2
  const coreCompares = ['yeongju-vs-daegu', 'yeongju-vs-andong', 'yeongju-vs-seoul']
  const coreTreatments = ['implant', 'invisalign', 'wisdom-tooth']

  comparePairs.forEach(pair => {
    treatmentSlugs.forEach(t => {
      let priority = 3
      if (coreCompares.includes(pair.slug) && coreTreatments.includes(t)) priority = 1
      else if (coreCompares.includes(pair.slug) || coreTreatments.includes(t)) priority = 2
      paths.push({ pairSlug: pair.slug, treatmentSlug: t, priority })
    })
  })

  return paths
}
