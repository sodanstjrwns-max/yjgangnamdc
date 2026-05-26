/**
 * 🚀 SEO 슈퍼업글 시즌 3: 대상자(Audience) 페이지
 * 연령대·상황별 페이지 — "어린이 치과 영주", "임산부 치과", "노인 임플란트 보험"
 *
 * URL: /audience/:slug 또는 /audience/:slug/:region
 * 6개 대상 × 8개 지역 = 48 + 6 단독 = 54 페이지
 */

import { getAreaInfo, getTreatmentInfo } from './combo'

interface AudienceInfo {
  slug: string
  ko: string
  shortKo: string
  searchKeywords: string[]
  hero: string
  characteristics: string[]        // 진료 특성 (왜 다르게 진료하는지)
  recommendedTreatments: { name: string; desc: string; slug: string }[]
  precautions: string[]            // 주의사항
  insurance: string                 // 보험 적용
  whatToBring: string[]            // 내원 시 챙겨야 할 것
  faqs: { q: string; a: string }[]
}

const audienceData: Record<string, AudienceInfo> = {
  'child': {
    slug: 'child',
    ko: '어린이 치과 진료',
    shortKo: '어린이 치과',
    searchKeywords: ['어린이 치과', '소아치과', '아이 치과', '유치 충치', '어린이 충치 치료', '치과 무서워하는 아이'],
    hero: '아이의 첫 치과 경험이 평생 치과 인상을 결정합니다. 영주 강남치과는 어린이 친화 진료 시스템.',
    characteristics: [
      '유치는 영구치 가이드 역할 — 조기 치료가 필수',
      '아이 눈높이 설명 (Tell-Show-Do 기법)',
      '소량 마취 + 무통 시술로 통증·공포 최소화',
      '부모 동반 가능 + 진료 과정 투명 공개',
      '치아 발달 단계별 맞춤 진료',
      '예방 중심 시스템 (불소도포·실란트)'
    ],
    recommendedTreatments: [
      { name: '실란트 (치아 홈 메우기)', desc: '어금니 홈 미리 메워 충치 예방', slug: 'prevention' },
      { name: '불소도포', desc: '치아 강화', slug: 'prevention' },
      { name: '어린이 충치 치료', desc: '레진/스테인레스 크라운', slug: 'cavity' },
      { name: '신경치료 (치수절단)', desc: '유치 깊은 충치 시', slug: 'cavity' },
      { name: '교정 사전 평가', desc: '7세 전후 검진', slug: 'invisalign' }
    ],
    precautions: [
      '식후·취침 전 양치 습관 형성 (보호자 마무리)',
      '단 음식·음료 빈도 줄이기',
      '6개월마다 정기검진 권장',
      '치아 외상 시 즉시 내원 (영구치 손상 영향)'
    ],
    insurance: '만 12세 이하 어린이 충치 예방 진료(실란트·불소도포) 건강보험 적용. 본인부담 1~3만원.',
    whatToBring: [
      '아이의 건강보험증',
      '예방접종 기록 (필요시)',
      '아이가 좋아하는 인형/책 (대기 시간)',
      '보호자 동반'
    ],
    faqs: [
      { q: '아이가 치과를 무서워하는데 어떻게 하나요?', a: '영주 강남치과는 첫 방문 시 진료 안 하고 환경 적응부터 시작합니다. Tell-Show-Do 기법으로 아이가 무엇을 할지 미리 알려주고, 부모 동반으로 안정감을 줍니다.' },
      { q: '유치 충치도 치료해야 하나요?', a: '네, 반드시 치료해야 합니다. 유치 충치 방치 시 (1) 영구치까지 영향 (2) 옆 치아 무너짐 (3) 발음·식사 영향 (4) 치아 배열 변형 발생합니다.' },
      { q: '아이 치과 검진은 언제부터?', a: '첫 치아 나면 (생후 6개월~1세) 첫 방문 권장. 이후 6개월마다 정기검진. 만 7세에는 교정 사전 평가도 권장.' },
      { q: '아이 치아 외상 응급 진료 가능?', a: '네, 영주 강남치과는 어린이 치아 외상 응급 대응합니다. 054-636-8222로 즉시 전화. 빠진 영구치는 우유에 보관 후 30분 이내 내원.' },
      { q: '실란트 비용·시기?', a: '만 12세 이하 건강보험 적용, 본인부담 약 1.5만원/치. 어금니 영구치 나온 직후(만 6~12세) 시행.' },
      { q: '교정은 언제 시작?', a: '만 7세 전후 사전 평가 후 결정. 골격성 부정교합은 1차 교정(8~10세), 일반 교정은 영구치 모두 난 후(만 12세 전후).' }
    ]
  },
  'pregnant': {
    slug: 'pregnant',
    ko: '임산부 치과 진료',
    shortKo: '임산부 치과',
    searchKeywords: ['임산부 치과', '임신 중 치과', '임산부 충치', '임신성 치은염', '임신 중 치료'],
    hero: '임신 중에도 치과 진료가 가능합니다. 안전한 시기와 방법으로 모자 모두를 보호합니다.',
    characteristics: [
      '임신 2분기(14~28주)가 가장 안전한 진료 시기',
      '임신성 치은염 발생률 70% — 정기 관리 필수',
      '방사선·약물 사용 최소화 시스템',
      '응급·필수 진료는 시기 관계없이 진행',
      '치과 치료 미루면 모자 모두에 위험',
      '산모 자세·시간 배려'
    ],
    recommendedTreatments: [
      { name: '스케일링', desc: '임신성 치은염 예방 (필수)', slug: 'scaling' },
      { name: '잇몸 치료', desc: '치주염·치은염 관리', slug: 'gum' },
      { name: '응급 충치 치료', desc: '통증·감염 발생 시', slug: 'cavity' },
      { name: '예방 진료', desc: '구강 위생 교육', slug: 'prevention' }
    ],
    precautions: [
      '임신 사실을 진료 전 반드시 알리기',
      '1분기(13주 이하) 비응급 진료 연기',
      '3분기(28주 이후) 누운 자세 자제',
      '방사선 촬영 필요시 납방어복 사용',
      '약물 처방은 반드시 산부인과 협의'
    ],
    insurance: '임산부 스케일링·잇몸 치료 건강보험 적용. 본인부담 1.5~5만원.',
    whatToBring: [
      '건강보험증',
      '산모수첩 (임신 주수 확인용)',
      '복용 약물 목록',
      '편한 옷 (눕는 자세)'
    ],
    faqs: [
      { q: '임신 중 치과 치료 안전한가요?', a: '네, 안전합니다. 특히 임신 2분기(14~28주)는 가장 안전한 시기. 1분기·3분기 일부 시술은 응급 외 연기 권장.' },
      { q: '임신 중 방사선 촬영 위험한가요?', a: '치과용 방사선은 양이 매우 적고 복부 납방어복으로 차단합니다. 진단에 필수면 안전하게 진행 가능. 의료진과 상의.' },
      { q: '임신성 치은염은 왜 생기나요?', a: '임신 중 호르몬 변화(에스트로겐·프로게스테론)로 잇몸 혈관이 민감해집니다. 임산부 70% 이상 경험. 스케일링과 양치 관리로 호전.' },
      { q: '임신 중 임플란트 가능한가요?', a: '임플란트는 출산 후로 연기 권장. 임신 중에는 응급·필수 진료만 진행. 스케일링·치주 관리는 가능합니다.' },
      { q: '임신 중 약 처방받을 수 있나요?', a: '진통제는 아세트아미노펜(타이레놀) 위주, 항생제는 페니실린계 등 안전한 약물만 사용. 모든 처방은 산부인과 협의 후.' }
    ]
  },
  'senior': {
    slug: 'senior',
    ko: '어르신·노인 치과 진료',
    shortKo: '어르신 치과',
    searchKeywords: ['노인 치과', '어르신 치과', '노인 임플란트', '임플란트 보험', '65세 임플란트', '틀니 보험'],
    hero: '만 65세 이상 어르신 — 임플란트·틀니 건강보험 적용. 영주 강남치과는 어르신 친화 진료 시스템.',
    characteristics: [
      '만 65세 이상 임플란트 평생 2개 건강보험 적용',
      '완전·부분틀니 7년에 1회 건강보험 적용',
      '잇몸·치주 관리 우선 (전신질환 영향 큼)',
      '당뇨·고혈압·복용약 고려한 진료 계획',
      '저작 기능 회복 = 영양·전신건강 직결',
      '편안한 진료 환경 (대기·동선 배려)'
    ],
    recommendedTreatments: [
      { name: '임플란트 (보험적용)', desc: '만 65세 이상 평생 2개 본인부담 약 35만원/개', slug: 'implant' },
      { name: '완전·부분틀니 (보험적용)', desc: '7년에 1회 보험적용, 본인부담 30~40%', slug: 'denture' },
      { name: '잇몸 치료', desc: '정기 관리 필수', slug: 'gum' },
      { name: '스케일링', desc: '연 1회 보험 적용', slug: 'scaling' },
      { name: '디지털 보철', desc: '크라운·브릿지', slug: 'digital-prosthesis' }
    ],
    precautions: [
      '복용 중인 약 목록 반드시 지참',
      '당뇨·고혈압·심장질환 등 알리기',
      '항응고제 복용 시 사전 협의',
      '치아 흔들림·통증 즉시 진료',
      '정기검진 6개월마다'
    ],
    insurance: '만 65세 이상: 임플란트 평생 2개 건강보험 (본인부담 30%, 약 35만원/개). 완전·부분틀니 7년에 1회 (본인부담 30~50%).',
    whatToBring: [
      '건강보험증',
      '복용 중인 약 목록 (약 봉투 가능)',
      '의료보호증 (해당 시)',
      '동반자 (필요시)'
    ],
    faqs: [
      { q: '65세 이상 임플란트 보험 어떻게?', a: '건강보험 평생 2개 적용. 본인부담 30%로 약 35만원/개. 영주 강남치과에서 보험 적용 신청까지 모두 진행합니다.' },
      { q: '틀니 보험 적용은?', a: '만 65세 이상 완전·부분틀니 7년에 1회 보험 적용. 본인부담 30~50%. 영주 강남치과는 디지털 정밀 틀니 제작.' },
      { q: '당뇨 있는데 임플란트 가능?', a: '당화혈색소(HbA1c) 7% 이하 조절되면 가능. 사전 내과 협의. 영주 강남치과는 당뇨 환자 임플란트 다수 진료.' },
      { q: '치아가 거의 없는데 어떻게 해야?', a: '전체 임플란트 또는 임플란트 + 틀니 조합 가능. 잇몸뼈 상태 따라 다름. CBCT 정밀진단으로 계획.' },
      { q: '진료비 분할 가능?', a: '네, 무이자 할부 6~24개월 가능. 의료비 부담 줄이는 다양한 결제 시스템.' },
      { q: '집이 멀어요. 진료 일정 한 번에?', a: '영주 강남치과는 어르신 진료 시 동선·시간을 효율적으로 묶어 진행합니다. 봉화·예천·영양 등 인근 어르신 다수 내원.' }
    ]
  },
  'office-worker': {
    slug: 'office-worker',
    ko: '직장인 치과 진료',
    shortKo: '직장인 치과',
    searchKeywords: ['직장인 치과', '평일 야간 치과', '주말 치과', '직장인 임플란트', '바쁜 사람 치과'],
    hero: '바쁜 직장인을 위한 효율 진료. 시간 절약 + 회당 진료 최대화.',
    characteristics: [
      '진료 시간 효율 극대화 (1회 내원에 여러 시술 묶음)',
      '디지털 시스템으로 진료 시간 단축',
      '점심시간·금요일 오후 진료 가능',
      '교정 라이프스타일 배려 (인비절라인)',
      '심미 진료 (라미네이트·미백) 단시간 완료',
      '예약·진료 효율 시스템'
    ],
    recommendedTreatments: [
      { name: '인비절라인', desc: '브라켓 없이 일상 가능', slug: 'invisalign' },
      { name: '디지털 임플란트', desc: '진료 횟수 최소화', slug: 'implant' },
      { name: '심미 진료 (라미네이트·미백)', desc: '1~2회 내원', slug: 'cosmetic' },
      { name: '디지털 보철', desc: '당일·1~2회 완성', slug: 'digital-prosthesis' }
    ],
    precautions: [
      '예약 후 정시 도착으로 효율 진료',
      '진료 후 회복 시간 고려한 일정',
      '주요 시술은 휴일·연차 활용 권장'
    ],
    insurance: '일반 건강보험 적용 (스케일링 연 1회, 충치 치료 등).',
    whatToBring: [
      '건강보험증',
      '진료 시간 여유 확보'
    ],
    faqs: [
      { q: '점심시간에 진료 가능한가요?', a: '네, 영주 강남치과는 점심시간에도 진료 가능합니다. 사전 예약 권장.' },
      { q: '교정해도 직장 생활에 영향 없나요?', a: '인비절라인은 투명해서 거의 보이지 않습니다. 식사·중요 미팅 때만 빼면 됩니다.' },
      { q: '임플란트 한 번에 끝낼 수 없나요?', a: '디지털 임플란트로 진료 횟수를 4~5회로 최소화 가능. 즉시 식립 케이스는 더 단축.' },
      { q: '주말 진료?', a: '토요일 오전 진료. 자세한 시간은 054-636-8222 문의.' }
    ]
  },
  'foreign-resident': {
    slug: 'foreign-resident',
    ko: '외국인 환자 / 영문 진료 (Foreign Patients)',
    shortKo: '외국인 치과',
    searchKeywords: ['외국인 치과', 'dentist yeongju', 'english dentist korea', '영문 치과', 'expat dentist'],
    hero: 'English-speaking dental service in Yeongju. Korean health insurance assistance for foreign residents.',
    characteristics: [
      'English consultation available (사전 예약)',
      'Seoul National University trained specialists',
      'Korean National Health Insurance accepted',
      'CBCT + Digital scanner equipped',
      'Yeongju city center location, parking available',
      'Transparent pricing in English'
    ],
    recommendedTreatments: [
      { name: 'Dental Implant (임플란트)', desc: '$700~$1,200/tooth', slug: 'implant' },
      { name: 'Invisalign (인비절라인)', desc: '$3,500~$8,000', slug: 'invisalign' },
      { name: 'Wisdom tooth extraction (사랑니)', desc: '$50~$300', slug: 'wisdom-tooth' },
      { name: 'Cavity treatment (충치 치료)', desc: '$50~$300', slug: 'cavity' },
      { name: 'Teeth whitening (치아미백)', desc: '$250~$500', slug: 'whitening' }
    ],
    precautions: [
      'Bring passport / ARC card',
      'Bring health insurance card if registered',
      'English consultation: book in advance',
      'Cash, credit card, bank transfer accepted'
    ],
    insurance: 'Korean National Health Insurance covered for registered foreign residents. Same coverage as Korean citizens.',
    whatToBring: [
      'Passport or ARC',
      'Health insurance card (if any)',
      'List of medications',
      'Prior dental records (if any)'
    ],
    faqs: [
      { q: 'Do you speak English?', a: 'Yes, we have English consultation service. Please book in advance by phone 054-636-8222 or visit our reservation page.' },
      { q: 'Is Korean health insurance accepted?', a: 'Yes, registered foreign residents with Korean NHIS can use the same coverage as Korean citizens. Scaling, fillings, root canal etc. covered.' },
      { q: 'How much does an implant cost?', a: 'Approximately $700-$1,200 per tooth (KRW 80-150 0,000). Includes consultation, surgery, abutment, and crown.' },
      { q: 'Can I pay by credit card?', a: 'Yes, we accept Visa, MasterCard, and Korean credit cards. Cash and bank transfer also available.' },
      { q: 'Do you provide written treatment plan in English?', a: 'Yes, we can provide treatment plans and invoices in English upon request.' },
      { q: 'Emergency dental service?', a: 'Yes, call 054-636-8222. Same-day or next-day emergency appointments available.' }
    ]
  },
  'fear-patient': {
    slug: 'fear-patient',
    ko: '치과 공포 환자 진료',
    shortKo: '치과 공포 진료',
    searchKeywords: ['치과 공포', '치과 무서움', '치과 못가요', '치과 트라우마', '치과 무서워', '치과 회피'],
    hero: '치과가 무서워서 미루셨나요? 영주 강남치과는 공포 환자 친화 진료 시스템 운영.',
    characteristics: [
      '판단 없는 환영 — 오랜 회피 경험도 이해',
      '진료 전 충분한 설명 + 환자 동의',
      '무통 마취 (소량·점진적)',
      '진료 중 손 신호로 잠시 중단 가능',
      '소량 진정 가능 (필요시)',
      '단계적 적응 진료 (첫 방문 = 검진만)'
    ],
    recommendedTreatments: [
      { name: '치과 환경 적응 진료', desc: '진료 전 환경 익숙해지기', slug: 'prevention' },
      { name: '무통 마취 진료', desc: '모든 시술에 적용', slug: 'cavity' },
      { name: '진정 진료 (의식하 진정)', desc: '심한 공포 환자', slug: 'wisdom-tooth' }
    ],
    precautions: [
      '진료 전 본인의 불안감 솔직히 알리기',
      '편한 옷·동반자와 함께 방문',
      '진료 시간 여유 있게 예약',
      '진료 후 회복 시간 확보'
    ],
    insurance: '진정 진료 추가 비용 발생 가능. 일반 진료는 정상 보험 적용.',
    whatToBring: [
      '건강보험증',
      '동반자 (필요시)',
      '편한 옷',
      '평소 복용 약 목록'
    ],
    faqs: [
      { q: '치과 공포로 10년 넘게 안 갔는데 가능?', a: '물론입니다. 영주 강남치과는 오랜 회피 환자분도 판단 없이 환영합니다. 첫 방문은 검진과 상담만으로 시작합니다.' },
      { q: '진정 진료(의식하 진정) 받을 수 있나요?', a: '심한 공포 환자 또는 장시간 시술 시 가능합니다. 사전 협의 필요. 안전을 위해 모니터링 시스템 운영.' },
      { q: '진료 중 너무 무서우면?', a: '손을 들면 즉시 진료 중단합니다. 환자분 페이스에 맞춰 진행. 무리하지 않습니다.' },
      { q: '아이가 치과 공포 있는데?', a: '어린이 친화 진료 시스템과 함께 진행. Tell-Show-Do 기법으로 천천히 적응. 부모 동반 가능.' },
      { q: '치과 공포 진료 비용 추가?', a: '일반 진료는 동일. 진정 진료(의식하 진정) 추가 시 별도 비용 발생. 사전 안내.' }
    ]
  }
}

export function getAudienceInfo(slug: string): AudienceInfo | undefined {
  return audienceData[slug]
}

export function getAllAudienceSlugs(): string[] {
  return Object.keys(audienceData)
}

export function audiencePage(audienceSlug: string, regionSlug?: string): { html: string; title: string; description: string; keywords: string; schemas: object[] } | null {
  const audience = audienceData[audienceSlug]
  if (!audience) return null

  const area = regionSlug ? getAreaInfo(regionSlug) : null
  const areaPrefix = area ? `${area.name} ` : ''

  // SEO
  const title = `${areaPrefix}${audience.ko} | 영주 강남치과의원 - 보험적용·전문진료`
  const description = `${areaPrefix}${audience.shortKo} 진료 가이드. ${audience.insurance} ${audience.recommendedTreatments.slice(0, 3).map(t => t.name).join(', ')} 등 ${audience.shortKo} 맞춤 진료. 영주 강남치과.`
  const keywords = [
    ...audience.searchKeywords,
    `영주 ${audience.shortKo}`,
    area ? `${area.name} ${audience.shortKo}` : '',
    `${audience.shortKo} 보험`,
    `${audience.shortKo} 비용`,
    '영주 강남치과'
  ].filter(Boolean).join(', ')

  // 진료 특성
  const characteristicsHtml = audience.characteristics.map((c, i) => `
    <div class="flex items-start gap-3 py-2">
      <div class="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">${i + 1}</div>
      <p class="text-gray-800">${c}</p>
    </div>
  `).join('')

  // 진료 카드
  const treatmentsHtml = audience.recommendedTreatments.map(t => `
    <a href="/guide/${t.slug}" class="block bg-white rounded-xl p-5 shadow-md border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-lg transition group">
      <h3 class="font-bold text-emerald-800 mb-2 group-hover:text-emerald-600">${t.name}</h3>
      <p class="text-sm text-gray-700">${t.desc}</p>
    </a>
  `).join('')

  // FAQ
  const faqsHtml = audience.faqs.map(f => `
    <details class="bg-white rounded-xl p-5 shadow-md border-l-4 border-emerald-500 mb-3" open>
      <summary class="text-lg font-bold text-gray-800 cursor-pointer list-none flex items-start gap-2">
        <span class="text-emerald-600 font-black">Q.</span> ${f.q}
      </summary>
      <p class="text-gray-700 leading-relaxed faq-answer mt-3 pl-6">${f.a}</p>
    </details>
  `).join('')

  // Schema
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "대상자별 진료", "item": "https://kndent.kr/audience" },
        { "@type": "ListItem", "position": 3, "name": audience.ko, "item": `https://kndent.kr/audience/${audienceSlug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": audience.shortKo,
        ...(area ? { "geographicArea": { "@type": "AdministrativeArea", "name": area.name } } : {})
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": audience.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ]

  const html = `
    <article class="bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <section class="bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white py-16">
        <div class="max-w-5xl mx-auto px-4">
          <nav aria-label="breadcrumb" class="text-sm text-white/80 mb-4">
            <a href="/" class="hover:underline">홈</a> /
            <a href="/audience" class="hover:underline">대상자별 진료</a> /
            <span class="text-white">${audience.ko}</span>
          </nav>
          <h1 class="text-3xl md:text-4xl font-bold mb-4 leading-tight" data-speakable>
            ${areaPrefix}${audience.ko}
          </h1>
          <p class="text-lg text-white/95 audience-summary" data-speakable>${audience.hero}</p>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">✨ ${audience.shortKo} 진료 특성</h2>
        <div class="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
          ${characteristicsHtml}
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">🩺 ${audience.shortKo} 추천 진료</h2>
        <div class="grid md:grid-cols-2 gap-4">${treatmentsHtml}</div>
      </section>

      <section class="max-w-5xl mx-auto px-4 py-8">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
            <h2 class="text-xl font-bold text-amber-800 mb-4">⚠️ 주의사항</h2>
            <ul class="space-y-2">
              ${audience.precautions.map(p => `<li class="flex items-start gap-2"><i class="fas fa-exclamation-circle text-amber-500 mt-1"></i><span class="text-gray-800">${p}</span></li>`).join('')}
            </ul>
          </div>
          <div class="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h2 class="text-xl font-bold text-blue-800 mb-4">📋 내원 시 챙기실 것</h2>
            <ul class="space-y-2">
              ${audience.whatToBring.map(w => `<li class="flex items-start gap-2"><i class="fas fa-check-circle text-blue-500 mt-1"></i><span class="text-gray-800">${w}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">💰 보험 적용</h2>
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
          <p class="text-gray-800 leading-relaxed text-lg">${audience.insurance}</p>
        </div>
      </section>

      <section class="bg-gray-50 py-12">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">❓ ${audience.shortKo} 자주 묻는 질문</h2>
          ${faqsHtml}
        </div>
      </section>

      <section class="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-12">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">${areaPrefix}${audience.shortKo} 진료, 영주 강남치과로 오세요</h2>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/reservation" class="bg-white text-purple-700 font-bold px-8 py-3 rounded-full hover:bg-purple-50 transition">📅 진료 예약</a>
            <a href="tel:054-636-8222" class="bg-purple-800 text-white font-bold px-8 py-3 rounded-full hover:bg-purple-900 transition border-2 border-white">📞 054-636-8222</a>
          </div>
        </div>
      </section>
    </article>
  `

  return { html, title, description, keywords, schemas }
}

export function audienceIndexPage(): { html: string; title: string; description: string; keywords: string } {
  const cards = Object.values(audienceData).map(a => `
    <a href="/audience/${a.slug}" class="block bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-500 hover:shadow-xl transition group">
      <h3 class="text-xl font-bold text-purple-800 mb-2 group-hover:text-purple-600">${a.ko}</h3>
      <p class="text-sm text-gray-600">${a.searchKeywords.slice(0, 3).join(' · ')}</p>
    </a>
  `).join('')

  const html = `
    <article class="bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <section class="bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white py-16">
        <div class="max-w-5xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4" data-speakable>대상자별 치과 진료</h1>
          <p class="text-lg text-white/95" data-speakable>어린이·임산부·어르신·직장인·외국인·공포환자 — 모두에게 맞춤 진료</p>
        </div>
      </section>
      <section class="max-w-5xl mx-auto px-4 py-12">
        <div class="grid md:grid-cols-2 gap-6">${cards}</div>
      </section>
    </article>
  `

  return {
    html,
    title: '대상자별 치과 진료 | 영주 강남치과',
    description: '어린이·임산부·어르신·직장인·외국인·공포환자 — 영주 강남치과 대상자별 맞춤 진료 안내. 보험 적용·진료 특성·주의사항 안내.',
    keywords: '어린이 치과, 임산부 치과, 노인 치과, 직장인 치과, 외국인 치과, 치과 공포, 영주 강남치과'
  }
}

export function getAllAudiencePaths(): { audienceSlug: string; regionSlug?: string; priority: number }[] {
  const paths: { audienceSlug: string; regionSlug?: string; priority: number }[] = []
  const regions = ['yeongju', 'bonghwa', 'yecheon', 'andong', 'mungyeong', 'yeongyang', 'cheongsong', 'sangju']

  Object.values(audienceData).forEach(a => {
    paths.push({ audienceSlug: a.slug, priority: 1 })

    // 핵심 audience (child, senior, pregnant)는 지역 결합
    if (['child', 'senior', 'pregnant'].includes(a.slug)) {
      regions.forEach(r => {
        paths.push({ audienceSlug: a.slug, regionSlug: r, priority: r === 'yeongju' ? 2 : 3 })
      })
    }
  })

  return paths
}
