import { yeongjuCardGrid } from './yeongju-cards'
import { icon } from '../lib/icons'
import { todayStatus } from '../lib/hours'
// 홈 FAQ — 화면 '자주 묻는 질문' 섹션과 FAQPage 스키마가 함께 쓰는 단일 배열
export const HOME_FAQ_ITEMS: { q: string; a: string }[] = [
    { q: '임플란트 비용은 얼마인가요?', a: '강남치과의원 임플란트 비용은 Neo/Osstem 임플란트 기준 1개당 130만원입니다(맞춤 어버트먼트 + 지르코니아 크라운 포함). 뼈이식이 필요한 경우 단순 50만원, 복합 80만원이 추가됩니다. 상악동(위턱 공간) 거상술은 치조정 80만원, 측방 150만원입니다. 정확한 비용은 CT 촬영 후 상담 시 안내드립니다.' },
    { q: 'CEREC 디지털 보철이란 무엇인가요?', a: 'CEREC은 디지털 스캐너로 치아를 촬영하고, 컴퓨터로 보철을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만드는 시스템입니다. 디지털 스캔으로 본뜨기 불편함 없이 싱글 지르코니아·세라믹 크라운을 정밀하게 제작합니다.' },
    { q: '인비절라인은 얼마나 걸리나요?', a: '보통 6개월~2년으로, 치아 상태에 따라 다릅니다. 간단한 경우 6개월 이내에 완료되기도 합니다. 비용은 인비절라인 퍼스트(1차) 400만원, 단순 650만원, 복잡 700만원이며, 교정 검사비 20만원, 월비용 5만원이 별도입니다. 정밀 검사 후 예상 기간과 정확한 비용을 안내드립니다.' },
    { q: '사랑니를 꼭 빼야 하나요?', a: '모든 사랑니를 빼야 하는 것은 아닙니다. 매복되어 앞 치아를 밀고 있거나, 충치·염증이 반복되는 경우 발치를 권합니다. 구강악안면외과 전문의가 정확히 진단합니다.' },
    { q: '토요일에도 진료하나요?', a: '현재 평일(월~금) 09:00~17:30 진료하며, 접수마감은 17:00입니다. 점심시간은 13:00~14:00이고, 토·일·공휴일은 휴무입니다.' },
    { q: '주차가 가능한가요?', a: '네, 건물 후면에 지상 및 지하 주차장이 완비되어 있습니다. 편하게 방문해 주세요.' },
    { q: '처음 방문하면 당일 치료도 가능한가요?', a: '네, 간단한 치료(충치, 스케일링 등)는 당일 바로 시작할 수 있습니다. 임플란트 등 큰 치료는 CT 촬영 후 상담을 거쳐 최적의 치료 계획을 세운 뒤 진행합니다.' },
    { q: '뼈가 부족해도 임플란트가 가능한가요?', a: '가능합니다. 뼈이식, 상악동(위턱 공간) 거상술 등의 시술로 부족한 뼈를 보충한 후 임플란트를 식립합니다. 이러한 고난이도 수술은 구강외과 전문의의 전문 영역입니다.' }
];

// ===== AEO: FAQ Schema.org 구조화 데이터 =====
export function mainPageSchemas(): object[] {
  // 화면 FAQ 섹션과 같은 배열 — 화면에 없는 문항은 스키마에 넣지 않는다 (2026-09-29: 10→8)
  const faqItems = HOME_FAQ_ITEMS;

  // FAQPage Schema (Google 검색 FAQ 리치 스니펫 + 음성 검색 AEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  // HowTo Schema — CEREC 디지털 보철 제작 프로세스 (구글 HowTo 리치 스니펫)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "CEREC 디지털 싱글 크라운 제작 과정",
    "description": "강남치과의원의 CEREC 시스템을 이용한 싱글 크라운 제작 과정입니다. 디지털 스캔부터 보철 장착까지 정밀하게 제작됩니다.",
    "totalTime": "PT2H",
    "tool": [
      { "@type": "HowToTool", "name": "CEREC MC X 밀링 머신" },
      { "@type": "HowToTool", "name": "PrimeScan 구강 스캐너" },
      { "@type": "HowToTool", "name": "SpeedFire 소성로" }
    ],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "디지털 스캔", "text": "구강 스캐너(PrimeScan)로 치아를 3D 촬영합니다. 불편한 인상재(본뜨기)가 필요 없습니다.", "url": "https://kndent.kr/treatments/digital-prosthesis" },
      { "@type": "HowToStep", "position": 2, "name": "AI 보철 설계", "text": "컴퓨터가 환자의 치아에 딱 맞는 보철을 자동 설계합니다. 0.01mm 정밀도로 맞춤 제작됩니다." },
      { "@type": "HowToStep", "position": 3, "name": "밀링 제작", "text": "세라믹 블록을 CEREC MC X 밀링 머신이 깎아 보철을 만듭니다. 기공소 외주 없이 원내에서 완성합니다." },
      { "@type": "HowToStep", "position": 4, "name": "소성 및 장착", "text": "SpeedFire로 초고속 소성 후 바로 장착합니다. 자연치아와 구분이 어려운 색감을 구현합니다." }
    ]
  };

  // MedicalClinic Service Schema (프리미엄급 의료 서비스 마크업)
  const medicalServiceSchema = {
    "@context": "https://schema.org",
    // 병원 엔티티는 사이트 전체에서 #organization 하나 — 별도 #medicalClinic 노드를 두지 않고 같은 @id 로 합친다 (2026-09-29)
    "@type": ["Dentist", "MedicalClinic"],
    "@id": "https://kndent.kr/#organization",
    "name": "강남치과의원",
    "alternateName": ["Gangnam Dental Clinic", "영주 강남치과"],
    "url": "https://kndent.kr",
    "logo": "https://kndent.kr/static/logo.png",
    "image": [
      "https://kndent.kr/static/photos/3gQUD6CP.jpg",
      "https://kndent.kr/static/photos/KLnijX5L.jpg",
      "https://kndent.kr/static/photos/p9YyzTaw.jpg"
    ],
    "telephone": "+82-54-636-8222",
    "email": "gndentalclinic@naver.com",
    "medicalSpecialty": [
      { "@type": "MedicalSpecialty", "name": "Oral and Maxillofacial Surgery" },
      { "@type": "MedicalSpecialty", "name": "Implantology" },
      { "@type": "MedicalSpecialty", "name": "Prosthodontics" },
      { "@type": "MedicalSpecialty", "name": "Orthodontics" },
      { "@type": "MedicalSpecialty", "name": "Cosmetic Dentistry" }
    ],
    "department": [
      {
        "@type": "MedicalBusiness",
        "name": "임플란트 전문센터",
        "description": "구강외과 전문의 2인이 직접 수술. 뼈이식·상악동(위턱 공간) 거상술 고난이도 수술 가능.",
        "medicalSpecialty": "Implantology",
        "url": "https://kndent.kr/treatments/implant"
      },
      {
        "@type": "MedicalBusiness",
        "name": "디지털 보철 센터",
        "description": "PrimeScan + CEREC MC X + SpeedFire 시스템으로 싱글 크라운 제작.",
        "url": "https://kndent.kr/treatments/digital-prosthesis"
      },
      {
        "@type": "MedicalBusiness",
        "name": "인비절라인 교정센터",
        "description": "인비절라인 인증의 + iTero 디지털 스캐너 교정 시뮬레이션.",
        "medicalSpecialty": "Orthodontics",
        "url": "https://kndent.kr/treatments/invisalign"
      },
      {
        "@type": "MedicalBusiness",
        "name": "구강외과 수술센터",
        "description": "사랑니 발치, 뼈이식, 상악동(위턱 공간) 거상술 등 고난이도 외과 수술.",
        "medicalSpecialty": "Oral and Maxillofacial Surgery"
      }
    ],
    "employee": [
      {
        "@type": "Physician",
        "@id": "https://kndent.kr/doctors/lee-taehyung#physician",
        "name": "이태형",
        "jobTitle": "대표원장",
        "medicalSpecialty": "Oral and Maxillofacial Surgery",
        "image": "https://kndent.kr/static/doctors/lee-taehyung.jpg",
        "url": "https://kndent.kr/doctors/lee-taehyung",
        "hasCredential": { "@type": "EducationalOccupationalCredential", "name": "보건복지부 구강악안면외과 전문의" },
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "고려대학교 구강악안면외과 석사" },
          { "@type": "Hospital", "name": "고려대학교 구로병원 레지던트" }
        ]
      },
      {
        "@type": "Physician",
        "@id": "https://kndent.kr/doctors/choi-minhye#physician",
        "name": "최민혜",
        "jobTitle": "원장",
        "medicalSpecialty": "Oral and Maxillofacial Surgery",
        "url": "https://kndent.kr/doctors/choi-minhye",
        "hasCredential": { "@type": "EducationalOccupationalCredential", "name": "보건복지부 구강악안면외과 전문의" },
        "alumniOf": [
          { "@type": "CollegeOrUniversity", "name": "고려대학교 구강악안면외과 석사" },
          { "@type": "Hospital", "name": "인제대학교 백병원 레지던트" }
        ]
      }
    ],
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "구강악안면외과 전문의 2인 상주", "credentialCategory": "전문의" },
      { "@type": "EducationalOccupationalCredential", "name": "인비절라인 인증의", "credentialCategory": "인증의" },
      { "@type": "EducationalOccupationalCredential", "name": "대한구강악안면성형재건외과학회 인정의", "credentialCategory": "학회인정의" }
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "임플란트 수술",
        "procedureType": "Surgical",
        "howPerformed": "구강악안면외과 전문의가 3D CT 기반 정밀 진단 후 디지털 가이드를 이용하여 임플란트를 식립합니다.",
        "preparation": "3D CT 촬영, 디지털 구강 스캔, 전문의 상담",
        "followup": "정기 경과 관찰, 디지털 보철 장착 가능",
        "status": "EventScheduled",
        "url": "https://kndent.kr/treatments/implant",
        "bodyLocation": "턱뼈 (상악/하악)",
        "possibleComplication": "일시적 부기, 출혈 (정상 치유 과정)",
        "expectedPrognosis": "10년 이상 장기 사용 가능, 정기 관리 시 반영구적"
      },
      {
        "@type": "MedicalProcedure",
        "name": "디지털 보철(싱글 크라운)",
        "procedureType": "Noninvasive",
        "howPerformed": "PrimeScan 디지털 스캐너로 구강을 스캔한 후, CEREC 밀링 머신으로 세라믹 보철을 원내에서 당일 제작하여 장착합니다.",
        "preparation": "디지털 구강 스캔 (본뜨기 불필요)",
        "followup": "보철 장착 완료 후 정기 경과 관찰",
        "url": "https://kndent.kr/treatments/digital-prosthesis",
        "expectedPrognosis": "10년 이상 사용 가능, 세라믹 소재 생체친화성 우수"
      },
      {
        "@type": "MedicalProcedure",
        "name": "인비절라인 투명교정",
        "procedureType": "Noninvasive",
        "howPerformed": "iTero 디지털 스캐너로 3D 시뮬레이션 후 맞춤형 투명 교정장치로 교정합니다.",
        "preparation": "iTero 디지털 스캔, 3D 시뮬레이션(클린체크), 교정 계획 수립",
        "followup": "4~8주마다 경과 체크, 유지장치 착용",
        "url": "https://kndent.kr/treatments/invisalign",
        "expectedPrognosis": "6개월~2년 치료 기간, 교정 성공률 우수"
      },
      {
        "@type": "MedicalProcedure",
        "name": "사랑니 발치",
        "procedureType": "Surgical",
        "howPerformed": "3D CT로 사랑니 위치·신경관 분석 후, 구강외과 전문의가 최소 절개로 발치합니다.",
        "preparation": "3D CT 촬영, 신경관 위치 분석",
        "followup": "7일 후 실밥 제거, 경과 확인",
        "url": "https://kndent.kr/treatments/wisdom-tooth"
      },
      {
        "@type": "MedicalProcedure",
        "name": "뼈이식",
        "procedureType": "Surgical",
        "howPerformed": "부족한 턱뼈를 뼈이식재로 보충한 후 임플란트를 식립합니다.",
        "url": "https://kndent.kr/treatments/bone-graft"
      },
      {
        "@type": "MedicalProcedure",
        "name": "상악동(위턱 공간) 거상술",
        "procedureType": "Surgical",
        "howPerformed": "윗턱 뼈가 부족한 경우 상악동 점막을 거상하고 뼈이식 후 임플란트를 식립합니다.",
        "url": "https://kndent.kr/treatments/sinus-lift"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "강남치과의원 진료비용",
      "description": "임플란트 130만원, 지르코니아 50만원, 인비절라인 650~700만원, 고정식 교정 500만원, 레진 8~17만원, 라미네이트 60만원. 보험진료(신경치료·발치·스케일링 등) 별도.",
      "url": "https://kndent.kr/pricing",
      "numberOfItems": 8,
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "Neo/Osstem 임플란트" }, "priceCurrency": "KRW", "price": 1300000, "description": "1,300,000원 (맞춤 어버트먼트+지르코니아 포함)" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "지르코니아 크라운" }, "priceCurrency": "KRW", "price": 500000, "description": "500,000원" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 (단순)" }, "priceCurrency": "KRW", "price": 6500000, "description": "6,500,000원" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "인비절라인 (복잡)" }, "priceCurrency": "KRW", "price": 7000000, "description": "7,000,000원" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "고정식 교정" }, "priceCurrency": "KRW", "price": 5000000, "description": "5,000,000원" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "레진 (1면)" }, "priceCurrency": "KRW", "price": 80000, "description": "80,000원" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "라미네이트" }, "priceCurrency": "KRW", "price": 600000, "description": "600,000원" },
        { "@type": "Offer", "itemOffered": { "@type": "MedicalProcedure", "name": "전체 미백" }, "priceCurrency": "KRW", "price": 600000, "description": "600,000원" }
      ]
    },
    "isAcceptingNewPatients": true,
    "smokingAllowed": false,
    "currenciesAccepted": "KRW",
    "paymentAccepted": ["현금", "신용카드", "체크카드", "계좌이체"]
  };

  return [faqSchema, howToSchema, medicalServiceSchema];
}

// ============================================================
// 메인 홈 — v3 "필름: 일상으로의 복귀" (2026-11-05 전면 리디자인, 다크 + 세리프)
//  - 글(히어로·차별점·공정·진료·페르소나·장비·시설·첫 방문·의료진·수치·지역·FAQ 문구)은 기존 승인 문구 그대로, 구조·비주얼·연출만 새로.
//  - 홈은 풀스크린 사진 장면(SCENE 01~)이 이어지는 필름. 모든 글자는 HTML 에 그대로. 스크롤 연출은 public/static/immersive.js(GSAP+Lenis), 등장은 app.js(IO).
//  - SEO 불변: h1(#heroTitle)·#heroSub speakable, 영주 진료 안내 카드 6장(yeongjuCardGrid, ItemList 1:1),
//    "영주 진료 바로가기"·지역×진료 링크, FAQPage=본문 <details>(HOME_FAQ_ITEMS), mainPageSchemas(HowTo 4단계 본문과 동일), 허브 앵커 /area/영주시.
// ============================================================
const PHONE_DISPLAY = '054-636-8222'

export function mainPage(): string {
  const st = todayStatus()
  const tcCls = st.state === 'open' ? ' is-open' : st.state === 'lunch' ? ' is-lunch' : ''
  const tcClose = st.state === 'open' ? '접수 ~ 17:00' : st.state === 'lunch' ? '~ 14:00' : st.state === 'lastcall' ? '~ 17:30' : st.idx <= 4 ? '09:00 – 17:30' : '평일 09:00 – 17:30'

  // ===== 기존 승인 문구 (구조만 새로) =====
  // 기존 보철 vs CEREC 공정
  const generalSteps = [
    { step: '1회차', desc: '상담 + 치아 삭제', time: '30분' },
    { step: '2회차', desc: '실리콘 인상재로 본뜨기', time: '30분' },
    { step: '대기', desc: '기공소 외주 제작 대기', time: '7~14일 소요', wait: true },
    { step: '3회차', desc: '임시치아 제거 + 보철 시적', time: '30분' },
    { step: '4회차', desc: '미세 조정 후 최종 장착', time: '30분' }
  ];
  const gangnamSteps = [
    { step: '1단계', desc: '상담 + 치아 삭제', time: '30분', highlight: false },
    { step: '2단계', desc: 'PrimeScan 디지털 스캔', time: '5분', highlight: true },
    { step: '3단계', desc: 'CEREC AI 보철 설계 + 밀링', time: '25분', highlight: true },
    { step: '4단계', desc: 'SpeedFire 소성 + 장착', time: '30분', highlight: true }
  ];
  // CEREC 4단계 (mainPageSchemas 의 HowTo 와 같은 순서·이름)
  const cerecSteps = [
    { step: '01', title: '디지털 스캔', desc: '구강 스캐너로 치아를 3D 촬영합니다. 불편한 인상재(본뜨기)가 필요 없습니다.', time: '5분' },
    { step: '02', title: 'AI 보철 설계', desc: '컴퓨터가 환자의 치아에 딱 맞는 보철을 자동 설계합니다. 0.01mm 정밀도.', time: '10분' },
    { step: '03', title: '밀링 제작', desc: '세라믹 블록을 밀링 머신이 깎아 보철을 만듭니다. 기공소 외주 없이 원내 완성.', time: '15분' },
    { step: '04', title: '소성 & 장착', desc: 'SpeedFire로 초고속 소성 후 바로 장착. 자연치아와 구분 어려운 색감.', time: '30분' }
  ];
  // 주력 진료
  const treatments = [
    { slug: 'implant', label: 'IMPLANT', title: '임플란트', sub: '수술이 전문인 전문의가 합니다', worry: '"임플란트 하려고 대구까지 가시려고요?"', answer: '영주에서 외과 전문의가 직접 수술합니다. 대학병원급 장비도 갖추고 있습니다.', tags: ['CT 정밀진단', '뼈이식 가능', '상악동 수술', '디지털 가이드'] },
    { slug: 'digital-prosthesis', label: 'DIGITAL PROSTHESIS', title: '디지털 보철', sub: '디지털 스캔으로 싱글 크라운을 정밀 제작합니다', worry: '"자연스러운 크라운을 원해요"', answer: 'CEREC 시스템으로 싱글 지르코니아·세라믹 크라운을 정밀하게 제작합니다.', tags: ['싱글 크라운', '디지털 스캔', '세라믹 보철', 'SpeedFire'] },
    { slug: 'invisalign', label: 'INVISALIGN', title: '인비절라인', sub: '눈에 띄지 않게 교정합니다', worry: '"교정 티 나면 직장에서 눈치 보일까봐 망설이셨죠?"', answer: '투명교정 인비절라인으로, 눈에 띄지 않게 교정합니다.', tags: ['iTero 스캐너', '3D 시뮬레이션', '탈착 가능', '심미적'] },
    { slug: 'cosmetic', label: 'COSMETIC', title: '심미보철', sub: '자연치아와 구분이 어렵습니다', worry: '"자연스러운 이를 갖고 싶어요…"', answer: '디지털 기술로 맞춤 제작, 자연치아와 구분이 어렵습니다.', tags: ['라미네이트', '올세라믹', '싱글 크라운', '맞춤 색상'] },
    { slug: 'wisdom-tooth', label: 'WISDOM TOOTH', title: '사랑니 발치', sub: '구강외과 전문의가 직접 발치합니다', worry: '"매복 사랑니도 안전하게 뺄 수 있나요?"', answer: '매복 사랑니도 안전하게. CT 정밀 진단 · 최소 절개 · 빠른 회복', tags: ['CT 정밀 진단', '최소 절개', '빠른 회복', '전문의 직접 발치'] }
  ];
  // 환자 유형
  const personas = [
    { persona: '임플란트가 필요하신 분', age: '50~70대', worry: '"뼈가 약하다고 다른 치과에서 거절당했어요…" "대구까지 가야 하나 고민이에요."', solution: '구강외과 전문의 2인이 직접 수술합니다. 뼈이식·상악동(위턱 공간) 거상술 등 고난이도 수술도 일상적으로 시행합니다. 대학병원급 수술을 영주에서.', tags: ['전문의 직접 수술', '뼈이식 가능', 'CT 정밀진단'], link: '/treatments/implant' },
    { persona: '시간이 없으신 분', age: '30~50대 직장인', worry: '"치과 때문에 하루 더 쉬어야 하나…" "치료 여러 번 오는 거 정말 싫어요."', solution: 'CEREC 디지털 시스템으로 싱글 지르코니아·세라믹 크라운을 정밀 제작합니다. 본뜨기 없이 디지털 스캔으로 편안하게 치료받으실 수 있습니다.', tags: ['싱글 크라운', '디지털 정밀 제작', 'CEREC'], link: '/treatments/digital-prosthesis' },
    { persona: '교정이 고민이신 분', age: '20~40대', worry: '"교정 티 나면 직장에서 어색할까봐…" "철사 교정은 부담스러운데…"', solution: '인비절라인 투명교정으로 눈에 띄지 않게 교정합니다. iTero 스캐너로 교정 전후를 3D 시뮬레이션으로 미리 보실 수 있습니다.', tags: ['투명 교정', '3D 시뮬레이션', '탈착 가능'], link: '/treatments/invisalign' }
  ];
  // 시설 (실사 사진) — 필름 스트립 순서
  const clinicPhotos = [
    { url: '/static/photos/KLnijX5L.webp', alt: '유리 파티션으로 분리된 개별 진료 공간', label: '진료실', desc: '유리 파티션 개별 진료 공간' },
    { url: '/static/photos/sOkojKif.webp', alt: '전문의 인증서가 걸린 1:1 상담실', label: '상담실', desc: '전문의 자격증 · 1:1 상담' },
    { url: '/static/photos/XLqoXGPt.webp', alt: 'X-RAY 촬영실과 디지털 진료 복도', label: 'X-RAY · 복도', desc: 'X-RAY실 · 디지털 진료 시스템' },
    { url: '/static/photos/xfkmnFB6.webp', alt: '치과 유닛 체어 진료 장비 클로즈업', label: '진료 장비', desc: '최신 치과 유닛 체어 시스템' },
    { url: '/static/photos/ZaCoVLBk.webp', alt: '그랜드 피아노와 서재가 있는 환자 휴게실', label: '휴게실', desc: '그랜드 피아노 · 서재 공간' },
    { url: '/static/photos/4fco8xUr.webp', alt: '무인 접수 키오스크와 소파가 있는 대기 공간', label: '접수 · 대기', desc: '무인 키오스크 · 넓은 대기 공간' },
    { url: '/static/photos/Wpp3wlfj.webp', alt: '유리 파티션 너머로 이어지는 유닛 체어 진료 공간', label: '진료 공간', desc: '개별 유닛 체어가 이어지는 진료 동선' },
    { url: '/static/photos/cihnca5u.webp', alt: '진료 후 이용하는 메이크업실 내부', label: '메이크업실', desc: '진료 후 편의 시설' },
    { url: '/static/photos/3gQUD6CP.webp', alt: '접수대와 복도, 로고 사이니지', label: '접수대', desc: '깔끔한 접수대 · 로고 사이니지' },
    { url: '/static/photos/qBEkv4ph.webp', alt: '밝고 청결하게 관리되는 수술실 복도', label: '수술실 복도', desc: '감염관리 · 청결한 동선' },
  ];
  // 장비
  const equipGallery = [
    { name: '3D CT (CBCT)', desc: '0.1mm 정밀도의 3D 입체 촬영. 뼈 두께, 신경 위치, 염증 범위를 정확하게 파악합니다.', spec: 'Voxel 0.1mm · 3D 360° · 파노라마 겸용' },
    { name: 'CEREC MC X', desc: '세라믹 블록을 정밀하게 깎아 보철을 만드는 밀링 머신. 기공소 없이 당일 완성.', spec: 'Sirona CEREC · 당일 제작 · 세라믹 보철' },
    { name: 'PrimeScan', desc: '초정밀 구강 스캐너. 광학 스캔으로 치아를 3D 촬영하여 본뜨기를 대체합니다.', spec: 'Dentsply Sirona · 디지털 인상 · 실시간 3D' },
    { name: 'iTero Element', desc: '인비절라인 전용 구강 스캐너. 교정 전후를 3D 시뮬레이션으로 미리 볼 수 있습니다.', spec: 'Align Technology · 교정 시뮬레이션 · 컬러 3D' },
    { name: 'SpeedFire', desc: '초고속 소성로. CEREC으로 깎은 보철을 단 15분 만에 최종 강도로 소성합니다.', spec: 'Dentsply Sirona · 15분 소성 · 1600℃' },
    { name: '디지털 파노라마', desc: '전체 치아 배열과 턱뼈 상태를 한 장의 사진으로 확인하는 기본 진단 장비.', spec: '전체 구강 촬영 · 턱관절 진단 · 저선량' }
  ];
  // 첫 방문
  const visitSteps = [
    { step: 'STEP 01', title: '접수 & 상담', desc: '간단한 접수 후, 증상과 고민을 편하게 말씀해 주세요. 필요한 검사를 안내드립니다.', time: '5분' },
    { step: 'STEP 02', title: '정밀 진단', desc: '3D CT 촬영과 디지털 구강 스캔으로 치아, 잇몸, 뼈 상태를 입체적으로 파악합니다.', time: '15분' },
    { step: 'STEP 03', title: '전문의 설명', desc: '구강외과 전문의가 CT 결과를 보며 현재 상태와 치료 방법을 상세히 설명드립니다.', time: '15분' },
    { step: 'STEP 04', title: '치료 계획 수립', desc: '치료 방법, 기간, 비용을 투명하게 안내합니다. 환자분이 직접 선택하시면 됩니다.', time: '10분' },
    { step: 'STEP 05', title: '치료 시작', desc: '동의하시면 당일 치료를 시작할 수 있습니다. 간단한 치료는 첫 날 바로 완료합니다.', time: '상황에 따라' },
    { step: 'STEP 06', title: '경과 관리', desc: '치료 후 경과를 체크하고, 필요시 추가 관리를 안내드립니다. 마지막까지 책임집니다.', time: '정기 체크' }
  ];
  // 의료진
  const doctors = [
    { slug: 'lee-taehyung', name: '이태형', title: '대표원장', spec: '구강악안면외과 전문의', quote: '"한 번 오시면 됩니다. 여러 번 오실 필요 없습니다."', summary: '구강악안면외과 전문의 · 수술 전문 · 고려대 구로병원 레지던트 수료', fields: ['임플란트', '구강외과 수술', '뼈이식', '상악동 수술'], initial: '이', photo: '/static/doctors/lee-taehyung.jpg' },
    { slug: 'choi-minhye', name: '최민혜', title: '원장', spec: '구강악안면외과 전문의', quote: '"외과 전문의의 손은 다릅니다."', summary: '구강악안면외과 전문의 · 인제대 백병원 수료 · 임플란트, 틀니, 레이저 치료 전문', fields: ['임플란트', '틀니', '레이저 치료', '심미보철'], initial: '최', photo: null as string | null }
  ];
  // 핵심 수치
  const numbers = [
    { num: '2', suffix: '인', label: '구강외과 전문의', desc: '대학병원 수련 전문의' },
    { num: '2017', suffix: '년~', label: '영주 개원', desc: '8년 이상 지역진료' },
    { num: '1', suffix: 'DAY', label: '디지털 보철', desc: 'CEREC 시스템' },
    { num: '5', suffix: '+', label: '디지털 장비', desc: '최첨단 진료 환경' }
  ];
  // 주변 지역
  const areas = [
    { area: '영주시', time: '10분', km: '5km 이내' },
    { area: '풍기', time: '15분', km: '12km' },
    { area: '봉화', time: '30분', km: '25km' },
    { area: '예천', time: '35분', km: '30km' },
    { area: '안동', time: '40분', km: '38km' },
    { area: '단양', time: '45분', km: '40km' }
  ];
  const regions = [
    { name: '영주', slug: 'yeongju' }, { name: '풍기', slug: 'punggi' }, { name: '봉화', slug: 'bonghwa' }, { name: '예천', slug: 'yecheon' }, { name: '안동', slug: 'andong' },
    { name: '단양', slug: 'danyang' }, { name: '영주혁신도시', slug: 'yeongju-innovation' }, { name: '상주', slug: 'sangju' }, { name: '문경', slug: 'mungyeong' },
  ];
  const clusterTreatments = [
    { name: '임플란트', slug: 'implant' }, { name: '사랑니', slug: 'wisdom-tooth' }, { name: '인비절라인', slug: 'invisalign' }, { name: '디지털보철', slug: 'digital-prosthesis' },
    { name: '심미보철', slug: 'cosmetic' }, { name: '뼈이식', slug: 'bone-graft' }, { name: '충치치료', slug: 'cavity' }, { name: '치아미백', slug: 'whitening' },
  ];
  const quickLinks: [string, string][] = [
    ['/treatments/implant', '영주 임플란트'], ['/treatments/invisalign', '영주 인비절라인 교정'], ['/treatments/wisdom-tooth', '영주 사랑니 발치'],
    ['/treatments/digital-prosthesis', '영주 디지털 보철'], ['/treatments/cosmetic', '영주 심미보철'], ['/treatments/bone-graft', '영주 뼈이식 임플란트'],
    ['/treatments/cavity', '영주 충치치료'], ['/treatments/root-canal', '영주 신경치료'], ['/treatments/gum', '영주 잇몸치료'], ['/treatments/denture', '영주 틀니'],
    [`/area/${encodeURIComponent('영주시')}`, '영주 치과 이용 안내'], ['/pricing', '진료비용 안내'], ['/directions', '오시는 길']
  ];
  // 화면 FAQ = 스키마 FAQ (HOME_FAQ_ITEMS 하나를 공유)
  const faqItems = HOME_FAQ_ITEMS;
  const pad2 = (n: number) => String(n).padStart(2, '0')
  const photo = (p: { url: string; alt: string }, extra = '') => `<img src="${p.url}" srcset="${p.url.replace('.webp', '-480.webp')} 480w, ${p.url} 1024w" sizes="100vw" width="1024" height="683" alt="${p.alt}" ${extra}>`
  const lead = doctors[0]

  return `
  <!-- ========== SCENE 01 · 오프닝 ========== -->
  <section class="hero" id="hero" aria-label="강남치과의원 메인 히어로" itemscope itemtype="https://schema.org/WPHeader">
    <div class="sc-bg" aria-hidden="true"><img src="/static/photos/CR9dgzgZ.jpg" srcset="/static/photos/CR9dgzgZ-480.webp 480w, /static/photos/CR9dgzgZ.webp 1024w" sizes="100vw" width="1024" height="683" alt="" loading="eager" fetchpriority="high" decoding="async"></div>
    <div class="sc-shade v" aria-hidden="true"></div>
    <div class="sc-shade side" aria-hidden="true"></div>
    <div class="sc-grain" aria-hidden="true"></div>
    <div class="bar t" aria-hidden="true"></div><div class="bar b" aria-hidden="true"></div>
    <div class="hero-in">
      <div class="hero-copy">
        <p class="sc-label" data-hero><b>SCENE 01</b><span class="addr">경북 영주시 대학로 217 · 택지 사거리</span></p>
        <h1 class="hero-h1" id="heroTitle" data-speakable="true">
          <span class="hl l0"><span class="hl-in">영주 치과 강남치과의원</span></span>
          <span class="hl l1"><span class="hl-in">일상으로의 빠른 복귀,</span></span>
          <span class="hl l2"><span class="hl-in">강남치과의 기쁨입니다.</span></span>
        </h1>
        <p class="hero-sub" id="heroSub" data-speakable="true" data-hero>
          <span>구강악안면외과 전문의 2인이 직접 수술합니다.</span>
          <span>영주 강남치과의원 — 임플란트, 디지털 보철, 인비절라인.</span>
          <strong>정확하게 진단하고, 빠르게 치료하고, 오래가는 결과를 만듭니다.</strong>
        </p>
        <div class="hero-cta" data-hero>
          <a href="/reservation" class="btn btn-primary btn-lg">${icon('calendar')}편하게 상담하세요</a>
          <a href="/pricing" class="btn btn-ghost btn-lg">${icon('won')}비용 안내</a>
          <a href="tel:${PHONE_DISPLAY}" class="btn btn-ghost btn-lg tel">${icon('phone')}${PHONE_DISPLAY}</a>
        </div>
      </div>
      <div class="hero-side">
        <div class="hero-status${tcCls}" data-timecard>
          <span class="st-label"><span class="dot" aria-hidden="true"></span><span data-tc-text>${st.short}</span></span>
          <span class="st-time"><span data-clock>${st.clock}</span><small data-tc-close>${tcClose}</small></span>
          <span class="st-sub">${st.sub}</span>
        </div>
        <p class="hero-meta" data-hero><span><b>2</b> 구강악안면외과 전문의</span><span><b>2017</b> 영주 개원</span><span><b>1 DAY</b> CEREC 당일 크라운</span></p>
      </div>
    </div>
    <div class="hero-scroll" aria-hidden="true"><i></i>SCROLL</div>
  </section>

  <!-- ========== SCENE 02 · 외과 전문의 2인 ========== -->
  <section class="sec" aria-labelledby="surg-h">
    <div class="wrap surg-grid">
      <figure class="surg-photo" data-kb>
        <img src="${lead.photo}" alt="${lead.name} ${lead.title} - ${lead.spec}" title="강남치과의원 ${lead.name} ${lead.title}" width="575" height="1024" loading="lazy" decoding="async">
        <span class="sc-label"><b>SCENE 02</b>Surgeons</span>
        <figcaption class="cap"><b>${lead.name} ${lead.title}</b><span>${lead.spec} · 고려대 구로병원 수료</span></figcaption>
      </figure>
      <div class="surg-body">
        <div class="sec-head">
          <h2 id="surg-h" class="display" data-speakable="true" data-rv="mask">임플란트는 뼈에 심는 수술입니다. 수술 전문 외과 전문의가 직접 합니다.</h2>
          <p class="lead" data-rv>구강악안면외과 전문의는 대학병원에서 4년간 수술 수련을 마친 전문의입니다. 전문의 2인이 상주하며, 뼈이식, 상악동 수술 등 고난이도 수술을 일상적으로 시행합니다.</p>
          <a href="/doctors" class="arrow-link" data-rv>내 수술, 누가 집도하나요?${icon('arrow')}</a>
        </div>
        <div data-rv-group>
          ${doctors.map(doc => `
          <a href="/doctors/${doc.slug}" class="surg-card">
            <span class="glyph" aria-hidden="true">${doc.photo ? `<img src="${doc.photo}" alt="" width="575" height="1024" loading="lazy" decoding="async">` : doc.initial}</span>
            <div>
              <h3>${doc.name}<small>${doc.title}</small></h3>
              <span class="sp">${doc.spec}</span>
              <p class="q">${doc.quote}</p>
              <p class="sum">${doc.summary}</p>
              <div class="fields">${doc.fields.map(f => `<span class="chip">${f}</span>`).join('')}</div>
              <span class="more arrow-link">프로필 보기${icon('arrow')}</span>
            </div>
          </a>`).join('')}
        </div>
        <div class="surg-side" data-rv-group>
          <div class="check"><i>${icon('check')}</i><span><b>전문의 직접 수술</b>모든 임플란트 수술을 구강외과 전문의가 직접 집도합니다.</span></div>
          <div class="check"><i>${icon('check')}</i><span><b>뼈가 부족하다고 포기하지 마세요</b>뼈이식, 상악동(위턱 공간) 거상술은 구강외과 전문의의 전문 영역입니다.</span></div>
          <div class="check"><i>${icon('check')}</i><span><b>3D CT 정밀진단</b>0.1mm 정밀도로 뼈 두께, 신경 위치, 염증 범위를 확인한 뒤 수술 계획을 세웁니다.</span></div>
          <a href="/treatments/implant" class="btn btn-ghost btn-sm" style="justify-self:start">임플란트 안내${icon('arrow')}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== SCENE 03 · 하루의 공정 (CEREC) — 고정 장면 ========== -->
  <section class="film" aria-labelledby="day-h" data-film>
    <div class="film-stage">
      <div class="sc-bg" aria-hidden="true">${photo(clinicPhotos[0], 'loading="lazy" decoding="async" data-film-img')}</div>
      <div class="sc-shade deep" aria-hidden="true"></div>
      <div class="sc-grain" aria-hidden="true"></div>
      <div class="film-ui">
        <div class="film-top">
          <div class="sec-head">
            <p class="sc-label"><b>SCENE 03</b>One day</p>
            <h2 id="day-h" class="display" data-speakable="true">오늘 깎고, 오늘 씌우고, 오늘 끝납니다.</h2>
            <p class="lead">치과 안에서 보철을 직접 만들기 때문에, 기공소에 보내고 기다리는 시간이 없습니다. 본 뜨지 않습니다. 디지털 크라운 제작 과정, CEREC 시스템은 이렇게 작동합니다.</p>
          </div>
          <div class="film-tc" aria-hidden="true"><span class="digits" data-film-digits>00:00</span><span class="unit">Elapsed · hh:mm</span></div>
        </div>
        <ol class="film-cues" aria-label="CEREC 디지털 크라운 제작 4단계">
          ${cerecSteps.map(s => `
          <li class="cue">
            <span class="no" aria-hidden="true">${s.step}</span>
            <div><h3>${s.title}</h3><p>${s.desc}</p><span class="time">${icon('clock')}약 ${s.time}</span></div>
          </li>`).join('')}
        </ol>
        <div class="film-bot">
          <div class="film-prog" aria-hidden="true"><i></i></div>
          <div class="film-ticks" aria-hidden="true">${cerecSteps.map(s => `<span><b>${s.step}</b>${s.title}</span>`).join('')}</div>
          <p class="film-foot"><span class="ok">${icon('check')}</span><span><b>총 소요시간 약 1~2시간, 한 번 방문으로 끝.</b> 본뜨기 없이 구강스캐너로 촬영하고, CEREC이 원내에서 바로 깎아냅니다.</span></p>
        </div>
      </div>
    </div>
  </section>

  <!-- 비교 시트 -->
  <section class="sec" aria-labelledby="cmp-h">
    <div class="wrap">
      <div class="sec-head" data-rv>
        <h2 id="cmp-h" class="display-2">보철 제작 방식이 이렇게 달라집니다</h2>
        <p class="lead">같은 보철이라도 제작 방식에 따라 내원 횟수와 기간이 달라집니다. CEREC 디지털 시스템은 기공소 외주 없이 원내에서 크라운을 제작합니다.</p>
      </div>
      <div class="cmp" data-rv-group>
        <div class="cmp-sheet">
          <span class="sc-label light"><b>A</b>기존 아날로그 방식</span>
          <h3>기존 아날로그 보철 과정</h3>
          <ol class="cmp-steps">
            ${generalSteps.map((s, i) => `<li${s.wait ? ' class="wait"' : ''}><span class="n">${pad2(i + 1)}</span><span>${s.step}: ${s.desc}</span><span class="t">${s.time}</span></li>`).join('')}
          </ol>
          <div class="cmp-total">${icon('calendar')}<span><b>총 6회 내원</b><span>약 2~3개월 소요</span></span></div>
        </div>
        <div class="cmp-sheet is-on">
          <span class="sc-label"><b>B</b>디지털 CEREC 방식</span>
          <h3>CEREC 디지털 보철 과정</h3>
          <ol class="cmp-steps">
            ${gangnamSteps.map((s, i) => `<li${s.highlight ? ' class="hi"' : ''}><span class="n">${pad2(i + 1)}</span><span>${s.step}: ${s.desc}</span><span class="t">${s.time}</span></li>`).join('')}
          </ol>
          <div class="cmp-total">${icon('check')}<span><b>총 3~4회 내원 <em>(내원 횟수 최대 50% 단축)</em></b><span>CEREC 디지털 보철로 기공소 대기 시간 제로</span></span></div>
        </div>
      </div>
      <p style="margin-top:2rem" data-rv><a href="/treatments/digital-prosthesis" class="arrow-link">디지털 보철 자세히${icon('arrow')}</a></p>
    </div>
  </section>

  <!-- ========== SCENE 04 · 진료 + 영주 진료 안내 카드 ========== -->
  <section class="sec alt" id="treatments" aria-labelledby="tx-h">
    <div class="wrap">
      <div class="sec-row">
        <div class="sec-head">
          <p class="sc-label" data-rv><b>SCENE 04</b>Treatments</p>
          <h2 id="tx-h" class="display" data-rv="mask">어떤 치료가 필요하신가요?</h2>
          <p class="lead" data-rv>각 분야 전문의가 직접 진료합니다</p>
        </div>
        <a href="/treatments" class="arrow-link" data-rv>전체 진료 보기${icon('arrow')}</a>
      </div>
      <ol class="tx-list" data-rv-group>
        ${treatments.map((t, i) => `
        <li><a href="/treatments/${t.slug}" class="tx-row">
          <span class="n"><b>${pad2(i + 1)}</b><span class="lab">${t.label}</span></span>
          <div><h3>${t.title}</h3><p class="sub">${t.sub}</p></div>
          <div class="qa"><p class="q">${t.worry}</p><p class="a">${t.answer}</p><div class="tags">${t.tags.map(x => `<span>${x}</span>`).join('')}</div></div>
          <span class="go">${icon('arrow')}</span>
        </a></li>`).join('')}
      </ol>

      <!-- 영주 진료 안내 사진 카드 6장 (/area/yeongju/* 핵심 6, ItemList 와 1:1 — 2026-10-14, 마크업 불변) -->
      <section class="tx-yj" aria-labelledby="yj-cards-home-h">
        <div class="sec-head center" data-rv style="margin-bottom:1.8rem">
          <p class="sc-label"><b>SCENE 04-A</b>Yeongju guide</p>
          <h3 id="yj-cards-home-h" class="display-2">영주 진료 안내</h3>
          <p class="lead">영주에서 많이 찾으시는 진료 6가지를 사진과 함께 정리했습니다</p>
        </div>
        ${yeongjuCardGrid('yj-home')}
      </section>
      <!-- SEO: 영주 핵심 진료 바로가기 (지역+진료 앵커 → 주 진료 페이지, 2026-09-29) -->
      <nav class="tx-quick" aria-label="영주 진료 바로가기" data-rv>
        <h3>영주에서 찾는 진료 바로가기</h3>
        <ul>
          ${quickLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
        </ul>
      </nav>
    </div>
  </section>

  <!-- ========== SCENE 05 · 이런 고민이시라면 ========== -->
  <section class="sec" aria-labelledby="fit-h">
    <div class="wrap">
      <div class="sec-head center">
        <p class="sc-label" data-rv><b>SCENE 05</b>For you</p>
        <h2 id="fit-h" class="display" data-rv="mask">이런 고민이시라면, 딱 맞는 치과입니다</h2>
        <p class="lead" data-rv>각 상황에 맞는 최적의 솔루션을 제안드립니다</p>
      </div>
      <div class="fit-grid" data-rv-group>
        ${personas.map((p, i) => `
        <div class="fit-card">
          <span class="sc-label light"><b>CASE 0${i + 1}</b>${p.age}</span>
          <h3>${p.persona}</h3>
          <div class="ledger">
            <div class="worry"><span class="k">고민</span><span>${p.worry}</span></div>
            <div class="sol"><span class="k">해법</span><span>${p.solution}</span></div>
          </div>
          <div class="tags">${p.tags.map(t => `<span class="chip chip-teal">${t}</span>`).join('')}</div>
          <a href="${p.link}" class="arrow-link more">자세히 알아보기${icon('arrow')}</a>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== SCENE 06 · 장비 ========== -->
  <section class="sec alt" aria-labelledby="eq-h">
    <div class="wrap">
      <div class="sec-row">
        <div class="sec-head">
          <p class="sc-label" data-rv><b>SCENE 06</b>Equipment</p>
          <h2 id="eq-h" class="display" data-rv="mask">내 진단, 어떤 장비로 확인하나요?</h2>
          <p class="lead" data-rv>3D CT로 신경 위치를 확인하고, CEREC 밀링머신으로 보철을 당일 제작합니다</p>
        </div>
      </div>
      <ol class="eq-list" data-rv-group>
        ${equipGallery.map((e, i) => `<li><span class="n">${pad2(i + 1)}</span><span class="name">${e.name}</span><span class="desc">${e.desc}</span><span class="spec">${e.spec}</span></li>`).join('')}
      </ol>
    </div>
  </section>

  <!-- ========== SCENE 07 · 시설 — 카드가 전체화면으로 자라는 장면 ========== -->
  <section class="grow" aria-labelledby="fac-h" data-grow>
    <div class="grow-stage">
      <div class="grow-top" aria-hidden="true"><span class="sc-label"><b>SCENE 07</b>Facility</span><span class="no">대기실 · 01 / ${pad2(clinicPhotos.length + 1)}</span></div>
      <div class="grow-card" data-grow-card>
        <img src="/static/photos/p9YyzTaw.jpg" srcset="/static/photos/p9YyzTaw-480.webp 480w, /static/photos/p9YyzTaw.webp 1024w" sizes="100vw" width="1024" height="683" alt="프리미엄 소파와 와이드 디스플레이가 있는 대기실 전경" loading="lazy" decoding="async">
        <div class="sc-shade" aria-hidden="true"></div>
      </div>
      <div class="grow-ui">
        <div class="sec-head">
          <h2 id="fac-h" class="display">직접 보세요, 이런 치과입니다</h2>
          <p class="lead">대학병원급 시설 · 호텔 라운지급 대기실 · 피아노가 있는 휴게실</p>
        </div>
        <a href="/directions" class="btn btn-white">오시는 길·병원 둘러보기${icon('arrow')}</a>
      </div>
    </div>
  </section>
  <section class="rail" aria-label="시설 사진" data-rail>
    <div class="rail-scroll">
      <div class="rail-track" data-rail-track>
        ${clinicPhotos.map((p, i) => `
        <button type="button" class="rail-frame" data-photo="${p.url}" data-alt="${p.alt}" data-cap="${pad2(i + 2)} / ${pad2(clinicPhotos.length + 1)} · ${p.label}" aria-label="${p.label} 사진 크게 보기">
          <span class="ph"><img src="${p.url}" srcset="${p.url.replace('.webp', '-480.webp')} 480w, ${p.url} 1024w" sizes="(max-width: 768px) 74vw, 420px" width="1024" height="683" alt="${p.alt}" loading="lazy" decoding="async"><span class="no">${pad2(i + 2)} / ${pad2(clinicPhotos.length + 1)}</span></span>
          <span class="meta"><b>${p.label}</b><span>${p.desc}</span></span>
        </button>`).join('')}
      </div>
    </div>
    <p class="rail-hint">Scroll — 사진을 누르면 크게 볼 수 있습니다</p>
  </section>
  <div id="photoModal" class="lightbox" role="dialog" aria-modal="true" aria-label="시설 사진 크게 보기">
    <button type="button" aria-label="닫기">${icon('close')}</button>
    <img src="" alt="">
    <figcaption></figcaption>
  </div>

  <!-- ========== SCENE 08 · 첫 방문 ========== -->
  <section class="sec" aria-labelledby="visit-h">
    <div class="wrap visit-grid">
      <div class="visit-sticky">
        <div class="sec-head">
          <p class="sc-label" data-rv><b>SCENE 08</b>First visit</p>
          <h2 id="visit-h" class="display" data-rv="mask">처음 오시나요? 이렇게 진행됩니다</h2>
          <p class="lead" data-rv>첫 방문부터 치료 완료까지, 모든 과정을 미리 알려드립니다. 불안함 없이 편하게 오세요.</p>
        </div>
        <a href="/reservation" class="btn btn-primary" style="justify-self:start" data-rv>${icon('calendar')}첫 방문 예약하기</a>
        <div class="visit-photo" data-kb data-rv="fade"><img src="/static/photos/yzSmZXZD.webp" srcset="/static/photos/yzSmZXZD-480.webp 480w, /static/photos/yzSmZXZD.webp 1024w" sizes="(max-width: 1024px) 0px, 560px" width="1024" height="683" alt="전문의와 1:1로 진행하는 상담 공간" loading="lazy" decoding="async"></div>
      </div>
      <ol class="steps" data-rv-group>
        ${visitSteps.map((s, i) => `
        <li class="step">
          <span class="no">${pad2(i + 1)}</span>
          <div><h3>${s.title}<small>${s.step} · ${s.time}</small></h3><p>${s.desc}</p></div>
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <!-- ========== 핵심 수치 ========== -->
  <section class="sec tight" aria-label="강남치과 핵심 수치">
    <div class="wrap">
      <div class="num-grid" data-rv-group>
        ${numbers.map(n => `
        <div class="num-cell">
          <div class="num-val"><span data-count="${n.num}">${n.num}</span><small>${n.suffix}</small></div>
          <p class="num-k">${n.label}</p>
          <p class="num-d">${n.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ========== SCENE 09 · 지역 ========== -->
  <section class="sec alt" aria-labelledby="area-h">
    <div class="wrap">
      <div class="sec-head center">
        <p class="sc-label" data-rv><b>SCENE 09</b>Access</p>
        <h2 id="area-h" class="display" data-rv="mask">영주 근처라면 가까운 전문의 치과입니다</h2>
        <p class="lead" data-rv>주변 지역에서 편하게 방문하실 수 있습니다</p>
      </div>
      <div class="area-grid" data-rv-group>
        ${areas.map(a => `
        <a href="${a.area === '영주시' ? '/directions' : `/area/${encodeURIComponent(a.area)}`}" class="area-card">
          <b>${a.area}</b><span class="t">~${a.time}</span><span class="k">${a.km}</span>
        </a>`).join('')}
      </div>
      <!-- SEO: 지역×진료 조합 키워드 클러스터 (롱테일 검색어 1페이지 노출 목표) -->
      <div class="area-cluster" data-rv>
        <h3>지역별 진료 안내</h3>
        <p>지역과 진료를 함께 검색하시는 분을 위한 맞춤 안내 페이지</p>
        <div class="area-rows">
          ${regions.map(r => `
          <div class="area-row">
            <h4>${icon('pin')}${r.name}에서 받는 진료</h4>
            <div>${clusterTreatments.map(t => `<a href="/area/${r.slug}/${t.slug}">${r.name} ${t.name}</a>`).join('')}</div>
          </div>`).join('')}
        </div>
      </div>
      <p style="text-align:center;margin-top:2.4rem" data-rv><a href="/directions" class="btn btn-ghost">${icon('map')}오시는 길 자세히 보기</a></p>
    </div>
  </section>

  <!-- ========== FAQ — details(크롤러에 열림) ========== -->
  <section class="sec" id="faq" aria-labelledby="faq-h">
    <div class="wrap faq-grid">
      <div class="faq-sticky">
        <div class="sec-head">
          <p class="sc-label" data-rv><b>FAQ</b>Questions</p>
          <h2 id="faq-h" class="display" data-rv="mask">자주 묻는 질문</h2>
          <p class="lead" data-rv>궁금한 점이 더 있으시면 편하게 문의해 주세요.</p>
        </div>
        <div class="actions" data-rv>
          <a href="/reservation" class="btn btn-primary">${icon('calendar')}상담 예약</a>
          <a href="tel:${PHONE_DISPLAY}" class="btn btn-ghost">${icon('phone')}전화 문의</a>
        </div>
      </div>
      <div data-rv-group>
        ${faqItems.map((item, i) => `
        <details class="fq"${i === 0 ? ' open' : ''}>
          <summary><span class="qn">Q${pad2(i + 1)}</span><h3>${item.q}</h3><span class="pm" aria-hidden="true">${icon('plus')}</span></summary>
          <div class="fq-a"><p>${item.a}</p></div>
        </details>`).join('')}
        <p style="margin-top:1.4rem"><a href="/faq" class="arrow-link">FAQ 전체 보기${icon('arrow')}</a></p>
      </div>
    </div>
  </section>

  <!-- ========== 마지막 장면 · 상담 ========== -->
  <section class="fin" aria-label="상담 예약" data-fin>
    <div class="sc-bg" aria-hidden="true">${photo(clinicPhotos[8], 'loading="lazy" decoding="async"')}</div>
    <div class="sc-shade" aria-hidden="true"></div>
    <div class="sc-grain" aria-hidden="true"></div>
    <div class="fin-in">
      <p class="sc-label" data-rv><b>FIN</b>Consultation</p>
      <h2 class="display-xl" data-rv="mask">일상으로의 빠른 복귀, <em>강남치과의 기쁨입니다.</em></h2>
      <p class="lead" data-rv>구강외과 전문의가 직접 상담드립니다. 상담은 언제든 열려있습니다. 편하게 문의해 주세요.</p>
      <div class="fin-actions" data-rv-group>
        <a href="/reservation" class="btn btn-white btn-lg">${icon('calendar')}온라인 상담 예약</a>
        <a href="tel:${PHONE_DISPLAY}" class="btn btn-light btn-lg">${icon('phone')}${PHONE_DISPLAY}</a>
      </div>
      <p class="fin-meta" data-rv><span>평일 09:00 – 17:30</span><span>접수 마감 17:00</span><span>영주시 대학로 217</span></p>
    </div>
  </section>
  `;
}
