/**
 * 🚀 SEO 슈퍼업글 시즌 3: 증상(Symptom) 기반 페이지
 * 환자가 "치아 시림", "잇몸 부음" 같은 증상으로 검색할 때 진입
 * 증상 → 원인 → 진료법 → 영주 강남치과 진료 안내 흐름
 *
 * URL: /symptom/:slug
 * 12개 증상 × 9지역 = 108개 + 12개 단독 = 120 페이지
 */

import { getAreaRouteBySlug } from './area'
import { getAreaInfo, getTreatmentInfo, getAreaSlugs } from './combo'

interface SymptomInfo {
  slug: string
  ko: string                  // 증상명
  shortKo: string             // 짧은 이름
  searchKeywords: string[]    // 검색되는 키워드들
  urgency: 'high' | 'medium' | 'low'  // 응급도
  hero: string                // 환자 입장 진입 문구
  causes: { title: string; desc: string }[]  // 가능한 원인
  diagnosis: string           // 진단법
  treatments: { name: string; desc: string; slug: string }[]  // 가능 진료
  homeCare: string[]          // 자가관리
  whenToVisit: string[]       // 내원 권장 시점
  faqs: { q: string; a: string }[]
  relatedSymptoms: string[]   // 관련 증상
}

const symptomData: Record<string, SymptomInfo> = {
  'tooth-pain': {
    slug: 'tooth-pain',
    ko: '치통 (이가 아파요)',
    shortKo: '치통',
    searchKeywords: ['치통', '이가 아파요', '이가 욱신거려요', '치아 통증', '어금니 아픔', '앞니 통증'],
    urgency: 'high',
    hero: '치통은 절대 참지 마세요. 통증의 원인을 정확히 진단해야 합니다.',
    causes: [
      { title: '충치 진행', desc: '치아 표면이 부식되어 신경에 가까워질수록 통증이 심해집니다. 초기에는 시린감, 진행 시 욱신거림.' },
      { title: '신경 침범 (치수염)', desc: '충치가 신경까지 도달하면 가만히 있어도 욱신거리고 밤에 더 아픕니다. 신경치료 필요.' },
      { title: '치아 균열', desc: '딱딱한 음식으로 치아에 미세 균열이 생기면 씹을 때 통증. CBCT나 현미경 진단 필요.' },
      { title: '잇몸 염증', desc: '치주염이 진행되면 치아 주변 통증과 함께 흔들림이 나타날 수 있습니다.' },
      { title: '사랑니 매복', desc: '매복된 사랑니가 옆 치아를 누르거나 염증을 유발해 통증.' },
      { title: '교합 문제', desc: '치아 맞닿음이 잘못되어 특정 치아에 과부하가 걸려 통증.' }
    ],
    diagnosis: '영주 강남치과는 시진·방사선·CBCT·치수활성검사로 통증 원인을 정확히 진단합니다. 통증의 강도·지속시간·유발 자극에 따라 적절한 검사를 선택합니다.',
    treatments: [
      { name: '충치 치료', desc: '레진/인레이 충전', slug: 'cavity' },
      { name: '신경치료', desc: '치수염 발생 시', slug: 'cavity' },
      { name: '크라운 보철', desc: '신경치료 후 또는 균열 치아', slug: 'digital-prosthesis' },
      { name: '사랑니 발치', desc: '매복사랑니 통증 시', slug: 'wisdom-tooth' },
      { name: '잇몸 치료', desc: '치주염 동반 시', slug: 'gum' }
    ],
    homeCare: [
      '미지근한 물로 양치 (찬물·뜨거운 물 자극 피하기)',
      '진통제 (이부프로펜) 일시 복용 가능',
      '아픈 쪽 음식 씹기 자제',
      '하루 이상 통증 지속 시 즉시 내원'
    ],
    whenToVisit: [
      '24시간 이상 통증 지속',
      '밤에 더 심해지는 욱신거림 (신경 침범 의심)',
      '얼굴 부종 동반 (염증 확산)',
      '발열·턱 부종 (즉시 응급 내원)'
    ],
    faqs: [
      { q: '치통이 갑자기 사라졌어요. 치과 안 가도 되나요?', a: '아닙니다. 통증이 사라졌다면 신경이 죽었거나 염증이 더 깊이 진행됐을 가능성이 있습니다. 반드시 정밀 진단 받으세요.' },
      { q: '진통제 먹으면 괜찮은데 진료받아야 하나요?', a: '진통제는 통증만 가릴 뿐 원인을 치료하지 않습니다. 충치·염증은 시간이 지나면서 더 깊이 진행되므로 조기 진단이 필수입니다.' },
      { q: '치통 응급 진료 가능한가요?', a: '영주 강남치과는 당일·익일 예약 가능합니다. 054-636-8222로 전화 주시면 가장 빠른 시간 안내드립니다.' },
      { q: '치통 진료비는?', a: '진단(보험적용 약 1만원) + 치료(충치 5~15만원, 신경치료 10~25만원, 크라운 30~50만원) 단계별로 비용이 다릅니다. 정밀 진단 후 정확한 견적 안내.' }
    ],
    relatedSymptoms: ['cold-tooth', 'gum-swelling', 'wisdom-tooth-pain']
  },
  'cold-tooth': {
    slug: 'cold-tooth',
    ko: '이가 시려요 (찬물 시림)',
    shortKo: '치아 시림',
    searchKeywords: ['이가 시려요', '치아 시림', '찬물 시림', '시린이', '치경부마모', '지각과민'],
    urgency: 'medium',
    hero: '치아 시림은 충치 초기 신호일 수 있습니다. 정확한 원인을 찾아야 합니다.',
    causes: [
      { title: '치경부 마모', desc: '잘못된 양치(과도한 힘·가로닦기)로 치아 뿌리 부위가 마모되어 신경이 노출.' },
      { title: '초기 충치', desc: '에나멜이 부식되어 자극이 신경에 전달.' },
      { title: '잇몸 퇴축', desc: '잇몸이 내려가면서 치아 뿌리가 노출.' },
      { title: '치아 균열', desc: '미세 균열로 자극이 내부에 전달.' },
      { title: '교합외상', desc: '특정 치아에 과부하 → 시린감.' }
    ],
    diagnosis: '시린 위치·자극 유형(차가움/뜨거움/단맛)·지속시간을 종합해 원인을 진단합니다. 필요시 방사선·치수활성검사.',
    treatments: [
      { name: '레진 충전', desc: '치경부 마모 부위 충전', slug: 'cavity' },
      { name: '충치 치료', desc: '초기 충치 발견 시', slug: 'cavity' },
      { name: '잇몸 치료', desc: '잇몸 퇴축 동반 시', slug: 'gum' },
      { name: '신경치료', desc: '시림이 심하고 지속될 때', slug: 'cavity' }
    ],
    homeCare: [
      '시린이 전용 치약 사용 (Sensodyne 등)',
      '부드러운 칫솔 + 작은 원형 닦기',
      '산성 음료(콜라·과일주스·와인) 자제',
      '2주 이상 지속되면 내원'
    ],
    whenToVisit: [
      '시린감이 2주 이상 지속',
      '단순 시림이 아닌 욱신거림으로 진행',
      '특정 치아에 집중된 통증',
      '잇몸이 같이 부음/출혈'
    ],
    faqs: [
      { q: '시린이 치약만으로 좋아질 수 있나요?', a: '단순 지각과민은 치약으로 호전될 수 있지만, 충치·균열·잇몸 퇴축이 원인이면 치약만으로는 부족합니다. 2주 이상 지속되면 진료 받으세요.' },
      { q: '시림이 자연 회복되나요?', a: '원인에 따라 다릅니다. 일시적 자극이면 회복되지만, 마모·충치는 자연치유 안 됩니다. 정확한 진단이 필요합니다.' },
      { q: '시린이 치료 비용은?', a: '레진 충전 5~15만원, 잇몸 치료(보험적용) 2~5만원, 신경치료(보험적용) 10~25만원 등 원인별로 다릅니다.' },
      { q: '아이도 이가 시릴 수 있나요?', a: '드물지만 가능합니다. 어린이 충치·법랑질 형성부전 등이 원인일 수 있어 정밀 진단 권장.' }
    ],
    relatedSymptoms: ['tooth-pain', 'gum-recession']
  },
  'gum-swelling': {
    slug: 'gum-swelling',
    ko: '잇몸이 부었어요',
    shortKo: '잇몸 부음',
    searchKeywords: ['잇몸 부음', '잇몸 붓기', '잇몸 염증', '잇몸 통증', '잇몸 농양', '치주염'],
    urgency: 'high',
    hero: '잇몸 부음은 염증 진행의 신호. 방치하면 치아를 잃을 수 있습니다.',
    causes: [
      { title: '치주염 (치조농루)', desc: '치석·플라크가 잇몸 아래까지 진행되어 염증이 잇몸뼈로 확산.' },
      { title: '치은염', desc: '잇몸 표층 염증. 양치 시 출혈 동반.' },
      { title: '잇몸 농양', desc: '잇몸 안에 고름이 차서 부어오름. 통증·발열 동반 가능.' },
      { title: '사랑니 주위염', desc: '매복사랑니 주변 잇몸 염증.' },
      { title: '임플란트 주위염', desc: '임플란트 주변 잇몸 염증 (관리 소홀 시).' }
    ],
    diagnosis: '치주낭 측정·방사선·CBCT로 염증 깊이와 잇몸뼈 상태를 정확히 진단합니다.',
    treatments: [
      { name: '잇몸 치료', desc: '스케일링 + 치근활택', slug: 'gum' },
      { name: '치주수술', desc: '진행된 치주염', slug: 'gum' },
      { name: '농양 절개·배농', desc: '농양 발생 시 즉시', slug: 'gum' },
      { name: '사랑니 발치', desc: '사랑니 주위염', slug: 'wisdom-tooth' },
      { name: '스케일링', desc: '정기 예방관리', slug: 'scaling' }
    ],
    homeCare: [
      '미지근한 소금물 양치 (1일 3~4회)',
      '부드러운 칫솔 + 치실 사용',
      '진통제·소염제 일시 복용',
      '24시간 이상 부음 지속 시 즉시 내원'
    ],
    whenToVisit: [
      '24시간 이상 부음',
      '발열·얼굴 부종 동반 (즉시 내원)',
      '농양 의심 (만지면 말캉, 통증 심함)',
      '양치 시 지속적인 출혈'
    ],
    faqs: [
      { q: '잇몸 부음, 약만 먹어도 되나요?', a: '항생제는 일시적으로 가라앉히지만 원인(치석·치주염)은 그대로입니다. 반드시 잇몸 치료를 받아야 재발하지 않습니다.' },
      { q: '잇몸 부으면 어떤 치료를 받나요?', a: '먼저 스케일링·치근활택으로 치석 제거 후 항생제 처방. 진행된 경우 치주수술 필요. 영주 강남치과는 단계별 잇몸 치료 시스템 운영.' },
      { q: '잇몸 치료는 보험 적용되나요?', a: '네, 잇몸 치료(스케일링·치근활택·치주수술)는 건강보험 적용됩니다. 본인부담 약 2~10만원.' },
      { q: '잇몸이 부어 임플란트 시술 가능한가요?', a: '잇몸 상태를 먼저 안정화한 후 임플란트 식립 가능합니다. 잇몸 치료 → 안정화 → 임플란트 순서로 진행합니다.' }
    ],
    relatedSymptoms: ['gum-bleeding', 'tooth-loose', 'tooth-pain']
  },
  'gum-bleeding': {
    slug: 'gum-bleeding',
    ko: '양치할 때 피가 나요',
    shortKo: '잇몸 출혈',
    searchKeywords: ['잇몸 출혈', '양치 피', '잇몸 피', '치은염', '치주염 출혈'],
    urgency: 'medium',
    hero: '양치 시 출혈은 치은염 신호. 방치하면 치주염으로 진행됩니다.',
    causes: [
      { title: '치은염', desc: '치석·플라크로 인한 잇몸 표층 염증. 가장 흔한 원인.' },
      { title: '치주염', desc: '진행된 잇몸병. 잇몸뼈까지 손상.' },
      { title: '비타민 결핍', desc: '비타민 C·K 결핍 시 출혈 경향.' },
      { title: '임신성 치은염', desc: '호르몬 변화로 임신 중 출혈 증가.' },
      { title: '약물 부작용', desc: '항응고제 복용 시 출혈 증가.' }
    ],
    diagnosis: '치주낭 측정·치석 부착 정도·방사선 검사로 진행 단계를 진단.',
    treatments: [
      { name: '스케일링', desc: '치석 제거 (보험적용)', slug: 'scaling' },
      { name: '잇몸 치료', desc: '치근활택', slug: 'gum' },
      { name: '구강 위생 교육', desc: '올바른 양치법', slug: 'prevention' }
    ],
    homeCare: [
      '부드러운 칫솔 + 치실 매일 사용',
      '소금물 양치',
      '비타민 C·K 충분 섭취',
      '담배 중단 (출혈·치주염 악화)'
    ],
    whenToVisit: [
      '1주 이상 출혈 지속',
      '심한 출혈 (양치 시 입안 가득)',
      '구취 동반',
      '잇몸 색이 어두워짐'
    ],
    faqs: [
      { q: '양치 피, 그냥 두면 어떻게 되나요?', a: '치은염 → 치주염 → 치아 흔들림 → 발치까지 진행될 수 있습니다. 한국인 35세 이상 70%가 치주염 보유. 조기 치료가 필수.' },
      { q: '스케일링 받으면 출혈이 멎나요?', a: '치석이 원인이라면 스케일링 + 올바른 양치로 1~2주 내 호전됩니다. 진행된 경우 치근활택 추가 필요.' },
      { q: '스케일링 비용은?', a: '건강보험 적용. 만 19세 이상 연 1회 보험 적용으로 본인부담 약 1.5~2만원.' },
      { q: '임신 중 잇몸 출혈은?', a: '임신성 치은염일 가능성이 높습니다. 임신 중에도 스케일링·잇몸 치료 가능하니 안전한 시기(2분기)에 치료받으세요.' }
    ],
    relatedSymptoms: ['gum-swelling', 'bad-breath']
  },
  'tooth-loose': {
    slug: 'tooth-loose',
    ko: '치아가 흔들려요',
    shortKo: '치아 흔들림',
    searchKeywords: ['치아 흔들림', '이 흔들려요', '어금니 흔들', '앞니 흔들림', '치주염 흔들'],
    urgency: 'high',
    hero: '치아 흔들림은 진행된 치주염 신호. 골든타임 안에 치료해야 보존 가능합니다.',
    causes: [
      { title: '진행성 치주염', desc: '잇몸뼈가 50% 이상 흡수되면 치아가 흔들리기 시작.' },
      { title: '교합외상', desc: '특정 치아에 과부하 (이갈이·꽉 무는 습관).' },
      { title: '외상', desc: '치아에 충격을 받은 경우.' },
      { title: '신경치료 후 균열', desc: '신경 빠진 치아가 강도 떨어져 균열·흔들림.' }
    ],
    diagnosis: 'CBCT 3D로 잇몸뼈 흡수 정도·치아 뿌리 상태를 정확히 측정.',
    treatments: [
      { name: '치주수술', desc: '잇몸뼈 재생술 가능 시', slug: 'gum' },
      { name: '치아 고정술', desc: '인접 치아에 고정 (보존 가능 시)', slug: 'gum' },
      { name: '발치 + 임플란트', desc: '보존 불가 시', slug: 'implant' },
      { name: '뼈이식', desc: '임플란트 전 뼈 보강', slug: 'bone-graft' }
    ],
    homeCare: [
      '흔들리는 치아로 씹기 절대 금지',
      '부드러운 음식만 섭취',
      '즉시 치과 내원 (보존 골든타임)'
    ],
    whenToVisit: [
      '즉시 내원 권장 — 흔들림이 시작되면 빠르게 진행',
      '통증 동반 시 응급',
      '잇몸 부종·고름 동반 시 응급'
    ],
    faqs: [
      { q: '치아 흔들림, 보존 가능한가요?', a: '잇몸뼈 흡수가 50% 이하면 보존 가능합니다. CBCT 정밀진단 후 잇몸뼈 재생술·치아 고정술로 보존 시도. 보존 불가 시 임플란트 권장.' },
      { q: '흔들리는 치아 그냥 두면?', a: '주변 치아·잇몸뼈까지 손상이 확산됩니다. 결국 발치 + 임플란트 비용이 더 커집니다.' },
      { q: '치아 보존술 vs 임플란트, 어느 게 좋나요?', a: '자연치아 보존이 1순위입니다. 보존이 불가능한 경우에만 임플란트를 선택합니다. 정밀진단으로 판단.' },
      { q: '발치 후 임플란트 비용은?', a: '발치 5~30만원(보험적용) + 임플란트 80~150만원/개. 즉시 식립 가능 케이스도 있어 진료 후 상담.' }
    ],
    relatedSymptoms: ['gum-swelling', 'tooth-missing']
  },
  'bad-breath': {
    slug: 'bad-breath',
    ko: '입냄새가 심해요',
    shortKo: '구취',
    searchKeywords: ['입냄새', '구취', '입냄새 원인', '입에서 냄새', '치과 구취'],
    urgency: 'low',
    hero: '입냄새의 90%는 구강 내 원인. 치과에서 정확한 원인을 찾아야 합니다.',
    causes: [
      { title: '치주염·치은염', desc: '잇몸 속 세균 + 고름이 냄새 원인.' },
      { title: '충치·치석', desc: '음식물 잔류 + 세균 부패.' },
      { title: '설태', desc: '혀 표면 백태 (세균 + 음식 찌꺼기).' },
      { title: '구강건조증', desc: '침 부족으로 세균 증식.' },
      { title: '편도결석', desc: '편도 음와에 음식·세균 침착.' }
    ],
    diagnosis: '구취 측정기·치주낭 검사·설태 검사·구강 위생 평가.',
    treatments: [
      { name: '스케일링', desc: '치석 제거', slug: 'scaling' },
      { name: '잇몸 치료', desc: '치주염 동반 시', slug: 'gum' },
      { name: '충치 치료', desc: '충치가 원인일 때', slug: 'cavity' },
      { name: '구강 위생 교육', desc: '올바른 양치·치실·혀 청소', slug: 'prevention' }
    ],
    homeCare: [
      '하루 2회 양치 + 치실 + 혀 청소',
      '충분한 수분 섭취',
      '구강세정제 보조 사용',
      '담배·커피·마늘 최소화'
    ],
    whenToVisit: [
      '구취가 2주 이상 지속',
      '본인이 느낄 정도로 심함',
      '잇몸 출혈·통증 동반'
    ],
    faqs: [
      { q: '입냄새 자가 측정법은?', a: '손목에 침 묻혀 10초 후 냄새 확인. 마스크 안 호흡 후 냄새 확인. 가족에게 직접 물어보기.' },
      { q: '구취 치료 비용은?', a: '스케일링(보험적용) 1.5~2만원 + 원인 치료. 평균 5~10만원 선.' },
      { q: '구취가 충치 때문일 수 있나요?', a: '네, 깊은 충치는 음식물 부패로 강한 냄새를 유발합니다. 치료하면 즉시 호전.' },
      { q: '구취 완전 제거 가능한가요?', a: '구강 원인이라면 90% 이상 호전 가능. 위장·코·전신질환이 원인이면 해당 진료과 협진 필요.' }
    ],
    relatedSymptoms: ['gum-bleeding', 'gum-swelling']
  },
  'tooth-missing': {
    slug: 'tooth-missing',
    ko: '치아가 빠졌어요',
    shortKo: '치아 상실',
    searchKeywords: ['치아 상실', '이가 빠졌어요', '발치 후', '어금니 없음', '앞니 빠짐'],
    urgency: 'high',
    hero: '치아가 빠진 후 6개월이 골든타임. 잇몸뼈 흡수 시작 전 임플란트를 고려하세요.',
    causes: [
      { title: '외상·사고', desc: '교통사고·운동·낙상 등' },
      { title: '진행된 치주염', desc: '잇몸뼈 흡수로 치아 탈락' },
      { title: '신경치료 실패', desc: '치근 균열·재감염' },
      { title: '심한 충치', desc: '치근까지 진행된 충치' }
    ],
    diagnosis: 'CBCT 3D로 잇몸뼈 양 측정 + 인접치아·교합 분석. 임플란트 식립 가능 여부 판단.',
    treatments: [
      { name: '임플란트', desc: '가장 자연치아에 가까운 복원', slug: 'implant' },
      { name: '브릿지', desc: '양옆 치아 사용', slug: 'digital-prosthesis' },
      { name: '뼈이식', desc: '잇몸뼈 부족 시', slug: 'bone-graft' },
      { name: '부분틀니', desc: '여러 치아 상실 시', slug: 'denture' }
    ],
    homeCare: [
      '빠진 자리 청결 유지',
      '단단한 음식 자제',
      '빠른 시간 내 치과 내원'
    ],
    whenToVisit: [
      '치아 빠진 직후 (재식 가능 케이스 24시간 골든타임)',
      '발치 후 6개월 이내 (잇몸뼈 흡수 전 임플란트 고려)',
      '오래 방치된 빈자리도 뼈이식 후 임플란트 가능'
    ],
    faqs: [
      { q: '빠진 치아 다시 심을 수 있나요?', a: '외상으로 빠진 자연치아는 30분 이내 우유·생리식염수에 보관하고 응급실로 가면 재식 가능성 있음. 영주 강남치과도 응급 재식 시도 가능.' },
      { q: '발치 후 언제 임플란트 식립?', a: '평균 2~3개월 후. 즉시 식립 가능 케이스(잇몸뼈 충분 + 염증 없음)는 발치와 동시 식립 가능.' },
      { q: '임플란트 vs 브릿지, 어느 게 좋나요?', a: '임플란트는 양옆 치아 손상 없이 단독으로 복원. 브릿지는 양옆 치아를 깎아야 함. 임플란트가 1순위 권장.' },
      { q: '오래 방치한 빈자리도 임플란트 되나요?', a: '네, 가능합니다. 잇몸뼈가 흡수된 경우 뼈이식 후 임플란트 식립. 영주 강남치과는 GBR·상악동(위턱 공간) 거상술 등 모든 뼈이식 가능.' }
    ],
    relatedSymptoms: ['tooth-loose', 'tooth-pain']
  },
  'wisdom-tooth-pain': {
    slug: 'wisdom-tooth-pain',
    ko: '사랑니가 아파요',
    shortKo: '사랑니 통증',
    searchKeywords: ['사랑니 통증', '사랑니 아픔', '매복사랑니', '사랑니 부음', '사랑니 발치'],
    urgency: 'medium',
    hero: '사랑니 통증은 매복·염증의 신호. CBCT 진단 후 안전하게 발치해야 합니다.',
    causes: [
      { title: '매복사랑니', desc: '잇몸·뼈 안에 매복되어 옆 치아 누름.' },
      { title: '사랑니 주위염', desc: '반쯤 나온 사랑니 주변 잇몸 염증.' },
      { title: '사랑니 충치', desc: '닦기 어려워 충치 진행.' },
      { title: '낭종·종양', desc: '드물지만 매복사랑니 주변 낭종 형성.' }
    ],
    diagnosis: 'CBCT 3D로 사랑니 위치·신경 근접도·인접치아 상태를 정확히 진단.',
    treatments: [
      { name: '사랑니 발치', desc: '단순 발치 또는 매복발치', slug: 'wisdom-tooth' },
      { name: '항생제 치료', desc: '염증 가라앉힌 후 발치', slug: 'wisdom-tooth' }
    ],
    homeCare: [
      '미지근한 소금물 양치',
      '진통제·소염제 일시 복용',
      '단단한 음식 자제',
      '발열·얼굴 부종 시 즉시 내원'
    ],
    whenToVisit: [
      '24시간 이상 통증',
      '얼굴·턱 부종',
      '입 벌리기 어려움 (개구장애)',
      '발열 동반 (응급)'
    ],
    faqs: [
      { q: '사랑니 꼭 빼야 하나요?', a: '바르게 나와 기능을 하면 안 빼도 됩니다. 매복·충치·반복 염증이면 발치 권장. CBCT 진단으로 판단.' },
      { q: '사랑니 발치 비용은?', a: '단순 발치 5~10만원, 매복발치 15~30만원 (건강보험 적용).' },
      { q: '사랑니 발치 후 회복기간은?', a: '단순발치 3~7일, 매복발치 1~2주.' },
      { q: '신경 손상 위험은?', a: '영주 강남치과는 CBCT로 신경 위치를 정확히 파악 후 안전하게 수술. 위험 케이스는 별도 안내.' }
    ],
    relatedSymptoms: ['tooth-pain', 'gum-swelling']
  },
  'jaw-pain': {
    slug: 'jaw-pain',
    ko: '턱이 아파요 (턱관절 통증)',
    shortKo: '턱관절 통증',
    searchKeywords: ['턱관절 통증', '턱 아픔', '턱에서 소리', '입 벌릴 때 아픔', 'TMJ'],
    urgency: 'medium',
    hero: '턱관절 통증은 단순 근육통이 아닙니다. 정확한 진단과 단계별 치료가 필요합니다.',
    causes: [
      { title: '턱관절 장애 (TMD)', desc: '관절 디스크 변위·관절염' },
      { title: '이갈이·꽉 무는 습관', desc: '근육 과긴장' },
      { title: '교합 문제', desc: '치아 맞닿음 이상' },
      { title: '스트레스', desc: '근육 긴장 유발' },
      { title: '외상', desc: '턱 부위 충격' }
    ],
    diagnosis: '턱관절 측정·근육 촉진·방사선·필요시 MRI로 정밀 진단.',
    treatments: [
      { name: '교합 안정장치 (스플린트)', desc: '야간 착용', slug: 'tmj' },
      { name: '교합 조정', desc: '치아 맞닿음 미세 조정', slug: 'tmj' },
      { name: '물리치료·근육이완', desc: '근육 긴장 완화', slug: 'tmj' },
      { name: '약물치료', desc: '진통·근이완제', slug: 'tmj' }
    ],
    homeCare: [
      '딱딱한 음식·껌·오징어 자제',
      '입 크게 벌리기 자제',
      '온찜질 (근육 이완)',
      '이갈이·꽉 무는 습관 자각'
    ],
    whenToVisit: [
      '입 벌리기 어려움 (개구장애)',
      '턱에서 딸깍 소리 + 통증',
      '두통·귀통증 동반',
      '2주 이상 지속'
    ],
    faqs: [
      { q: '턱에서 딸깍 소리, 치료해야 하나요?', a: '소리만 나고 통증·기능장애 없으면 경과 관찰. 통증·개구장애 동반 시 치료 필요.' },
      { q: '턱관절 치료비용은?', a: '진단 + 스플린트 30~80만원. 진료 횟수에 따라 차이.' },
      { q: '턱관절 치료 보험 적용되나요?', a: '일부 적용 (방사선·물리치료). 스플린트는 비급여.' },
      { q: '치료 기간은?', a: '평균 3~6개월. 정기 점검 필요.' }
    ],
    relatedSymptoms: ['tooth-grinding', 'headache']
  },
  'tooth-grinding': {
    slug: 'tooth-grinding',
    ko: '이갈이가 있어요',
    shortKo: '이갈이',
    searchKeywords: ['이갈이', '이갈이 치료', '이갈이 스플린트', '브럭시즘', '잠잘 때 이갈이'],
    urgency: 'medium',
    hero: '이갈이는 치아 마모·턱관절 손상의 주범. 야간 스플린트로 보호하세요.',
    causes: [
      { title: '스트레스', desc: '가장 흔한 원인' },
      { title: '교합 부조화', desc: '치아 맞닿음 이상' },
      { title: '수면장애', desc: '얕은 수면 단계에서 발생' },
      { title: '약물 부작용', desc: '일부 항우울제' }
    ],
    diagnosis: '치아 마모 상태·근육 비대·턱관절 검사·동반자 증언.',
    treatments: [
      { name: '야간 스플린트', desc: '치아 마모 방지', slug: 'tmj' },
      { name: '교합 조정', desc: '치아 맞닿음 개선', slug: 'tmj' },
      { name: '심미보철', desc: '마모된 치아 복원', slug: 'cosmetic' }
    ],
    homeCare: [
      '취침 전 카페인·알코올 자제',
      '스트레스 관리',
      '심한 경우 야간 스플린트 착용'
    ],
    whenToVisit: [
      '동반자가 이갈이 소리 확인',
      '아침 턱 통증·두통',
      '치아 마모 진행',
      '치아 시림 동반'
    ],
    faqs: [
      { q: '이갈이 스플린트 비용은?', a: '30~50만원 (재료에 따라).' },
      { q: '스플린트 평생 써야 하나요?', a: '근본 원인이 해결되지 않으면 장기 사용 권장. 매년 점검 필요.' },
      { q: '아이도 이갈이 하나요?', a: '유치기에 일시적으로 흔합니다. 영구치 나오면 대부분 사라집니다.' },
      { q: '이갈이로 치아 모양이 망가졌어요. 복원 가능?', a: '심미보철(라미네이트·올세라믹)로 복원 가능. 단, 스플린트로 추가 마모 막아야 함.' }
    ],
    relatedSymptoms: ['jaw-pain', 'tooth-pain']
  },
  'yellow-teeth': {
    slug: 'yellow-teeth',
    ko: '치아가 누래요',
    shortKo: '치아 변색',
    searchKeywords: ['치아 변색', '누런 이', '치아 색', '치아 미백', '치아가 노래요'],
    urgency: 'low',
    hero: '치아 변색은 원인별 해결책이 다릅니다. 정확한 진단 후 적절한 미백·심미진료를.',
    causes: [
      { title: '외인성 착색', desc: '커피·차·와인·담배·카레' },
      { title: '내인성 변색', desc: '약물(테트라사이클린)·노화·신경치료 후' },
      { title: '치석·플라크', desc: '관리 부족' },
      { title: '충치', desc: '국소 변색' }
    ],
    diagnosis: '치아 색 측정(Shade)·변색 원인 분석.',
    treatments: [
      { name: '스케일링 + 폴리싱', desc: '외인성 착색', slug: 'scaling' },
      { name: '전문가 미백', desc: '전체 변색', slug: 'whitening' },
      { name: '홈미백', desc: '자가 관리', slug: 'whitening' },
      { name: '라미네이트', desc: '심한 변색 + 형태 변경', slug: 'cosmetic' },
      { name: '내부미백', desc: '신경치료 후 변색 치아', slug: 'whitening' }
    ],
    homeCare: [
      '식후 양치 (커피·와인 후 30분 내)',
      '미백 치약 사용',
      '담배 중단',
      '빨대 사용 (음료 직접 접촉 줄임)'
    ],
    whenToVisit: [
      '미백을 고려할 때',
      '단일 치아만 변색 (충치 의심)',
      '심미 개선 원할 때'
    ],
    faqs: [
      { q: '전문가 미백 vs 홈미백 차이는?', a: '전문가 미백은 1회 1시간, 즉시 효과. 홈미백은 1~2주 점진적 효과. 영주 강남치과는 병행 시스템 운영.' },
      { q: '미백 비용은?', a: '전문가 미백 30~50만원, 홈미백 20~30만원.' },
      { q: '미백 효과 지속은?', a: '평균 1~2년. 흡연·커피로 짧아짐.' },
      { q: '미백 후 시린감?', a: '일시적 시린감이 있을 수 있으나 24~48시간 내 사라짐.' }
    ],
    relatedSymptoms: []
  },
  'tooth-knocked-out': {
    slug: 'tooth-knocked-out',
    ko: '이가 부러졌어요 (응급)',
    shortKo: '치아 외상',
    searchKeywords: ['치아 부러짐', '이 부러짐', '치아 외상', '치아 응급', '치아 깨짐'],
    urgency: 'high',
    hero: '⚠️ 치아 외상은 응급입니다. 골든타임 30분 안에 내원하세요.',
    causes: [
      { title: '교통사고', desc: '얼굴 충격' },
      { title: '운동·낙상', desc: '스포츠·놀이 중 충격' },
      { title: '딱딱한 음식', desc: '얼음·뼈 등' },
      { title: '폭력·외상', desc: '직접 타격' }
    ],
    diagnosis: 'CBCT로 치근 골절 여부·인접 조직 손상 정밀 진단.',
    treatments: [
      { name: '응급 재식', desc: '완전 탈구 30분 골든타임', slug: 'cavity' },
      { name: '신경치료', desc: '치수 노출 시', slug: 'cavity' },
      { name: '레진/크라운 복원', desc: '치관 파절', slug: 'cosmetic' },
      { name: '발치 + 임플란트', desc: '보존 불가 시', slug: 'implant' }
    ],
    homeCare: [
      '🚨 빠진 치아는 우유·생리식염수에 보관 (수돗물 X)',
      '치아 뿌리 만지지 말 것 (치아머리만 잡기)',
      '30분 이내 치과 응급 내원',
      '출혈 시 거즈로 압박'
    ],
    whenToVisit: [
      '즉시! (30분 골든타임)',
      '054-636-8222 응급 전화',
      '심한 출혈·의식 변화 시 응급실 동시 방문'
    ],
    faqs: [
      { q: '빠진 치아 보관 방법은?', a: '🚨 가장 좋은 순서: 우유 > 생리식염수 > 본인 침. 수돗물·휴지로 닦지 마세요. 30분 이내 치과 도착.' },
      { q: '치아 깨진 조각 가져가야 하나요?', a: '네, 가져가세요. 조각이 크면 그대로 붙일 수 있습니다. 우유나 식염수에 담아 보관.' },
      { q: '아이 유치가 빠졌는데 재식할까요?', a: '유치는 재식하지 않습니다 (영구치 손상 위험). 영구치 발생 시기·간격 관찰 필요.' },
      { q: '응급 진료비는?', a: '응급 진단 + 처치 평균 10~30만원. 추가 치료(신경치료·크라운)는 별도.' }
    ],
    relatedSymptoms: ['tooth-pain', 'tooth-missing']
  }
}

export function getSymptomInfo(slug: string): SymptomInfo | undefined {
  return symptomData[slug]
}

export function getAllSymptomSlugs(): string[] {
  return Object.keys(symptomData)
}

export function symptomPage(symptomSlug: string, regionSlug?: string): { html: string; title: string; description: string; keywords: string; schemas: object[] } | null {
  const symptom = symptomData[symptomSlug]
  if (!symptom) return null

  const area = regionSlug ? getAreaInfo(regionSlug) : null
  const areaPrefix = area ? `${area.name} ` : ''
  const areaContext = area ? `${area.name}·인근 거주자를 위한 ` : ''
  // 지역 변형 페이지 고유 안내 (2026-10-08: 기본 페이지와 본문이 83%까지 겹쳐 지역 교통·내원 안내와 지역 FAQ 1문항 추가)
  const route = regionSlug ? getAreaRouteBySlug(regionSlug) : null
  const regionNoteHtml = area && route ? `
      <section class="max-w-5xl mx-auto px-4 pt-10">
        <div class="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-3">${route.name}에서 ${symptom.shortKo} 때문에 내원하신다면</h2>
          <p class="text-gray-700 leading-relaxed">${route.routeDesc}${route.routeHighway ? ` (경로: ${route.routeHighway})` : ''}</p>
          <p class="text-gray-700 leading-relaxed mt-3">${symptom.urgency === 'high'
            ? `${symptom.shortKo}처럼 서둘러야 하는 증상은 출발 전에 054-636-8222로 전화해 그날 진료 가능 시간을 먼저 확인하세요. 평일 접수는 오후 5시에 마감하고, 토·일·공휴일은 휴진입니다.`
            : `${symptom.shortKo}은(는) 원인을 찾으려면 촬영과 검사가 필요할 수 있어, ${route.name}처럼 ${route.driveTime} 거리에서 오신다면 예약 후 내원하시는 편이 기다림이 적습니다.`}</p>
          ${route.subAreas.length ? `<p class="text-sm text-gray-500 mt-3">${route.subAreas.slice(0, 6).join(' · ')} 등 ${route.name} 생활권에서 같은 경로로 오실 수 있습니다.</p>` : ''}
        </div>
      </section>` : ''
  const faqs = area && route ? [...symptom.faqs, {
    q: `${route.name}에서 ${symptom.shortKo} 진료를 받으러 가면 얼마나 걸리나요?`,
    a: `${route.name}에서 영주 강남치과의원(영주시 대학로 217)까지 자동차로 ${route.driveTime}${route.driveKm && route.driveKm !== '-' ? `, 거리로는 ${route.driveKm}` : ''} 정도입니다. 진료는 평일 오전 9시~오후 5시 30분이며 점심시간은 오후 1시~2시입니다.`
  }] : symptom.faqs

  // SEO
  const urgencyTag = symptom.urgency === 'high' ? '⚠️ 응급' : symptom.urgency === 'medium' ? '🟡 주의' : '🟢 일반'
  const title = `${areaPrefix}${symptom.ko} 원인·진료법 | 영주 강남치과 ${symptom.shortKo} 진료 가이드`
  const description = `${areaContext}${symptom.shortKo} 증상의 원인 ${symptom.causes.length}가지, 진료법, 자가관리법, 내원 시점까지. 영주 강남치과 구강악안면외과 전문의의 ${symptom.shortKo} 진료 안내. ${symptom.causes[0]?.title || ''} 등 ${symptom.urgency === 'high' ? '응급 진료 가능' : '체계적 진료'}.`
  const keywords = [
    ...symptom.searchKeywords,
    `${symptom.shortKo} 치과`,
    `${symptom.shortKo} 원인`,
    `${symptom.shortKo} 치료`,
    `${symptom.shortKo} 비용`,
    `영주 ${symptom.shortKo}`,
    area ? `${area.name} ${symptom.shortKo}` : '',
    '영주 강남치과',
    '경북 치과'
  ].filter(Boolean).join(', ')

  // 원인 카드
  const causesHtml = symptom.causes.map((c, i) => `
    <div class="bg-white rounded-xl p-5 shadow-md border-l-4 border-amber-500 hover:shadow-lg transition">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">${i + 1}</div>
        <div>
          <h3 class="font-bold text-gray-800 mb-2">${c.title}</h3>
          <p class="text-sm text-gray-700 leading-relaxed">${c.desc}</p>
        </div>
      </div>
    </div>
  `).join('')

  // 진료법 카드
  const treatmentsHtml = symptom.treatments.map(t => `
    <a href="/guide/${t.slug}" class="block bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-lg transition group">
      <div class="flex items-center gap-3 mb-2">
        <i class="fas fa-tooth text-emerald-600 text-xl"></i>
        <h3 class="font-bold text-emerald-800 group-hover:text-emerald-600">${t.name}</h3>
      </div>
      <p class="text-sm text-gray-700">${t.desc}</p>
      <div class="mt-3 text-xs text-emerald-600 font-semibold">자세히 보기 →</div>
    </a>
  `).join('')

  // 자가관리
  const homeCareHtml = symptom.homeCare.map(c => `
    <li class="flex items-start gap-2 py-2 border-b border-gray-100">
      <i class="fas fa-check-circle text-emerald-500 mt-1"></i>
      <span class="text-gray-800">${c}</span>
    </li>
  `).join('')

  // 내원 시점
  const visitHtml = symptom.whenToVisit.map(v => `
    <li class="flex items-start gap-2 py-2 border-b border-red-100">
      <i class="fas fa-exclamation-circle text-red-500 mt-1"></i>
      <span class="text-gray-800">${v}</span>
    </li>
  `).join('')

  // FAQ
  const faqsHtml = faqs.map(f => `
    <details class="bg-white rounded-xl p-5 shadow-md border-l-4 border-emerald-500 mb-3 group" open>
      <summary class="text-lg font-bold text-gray-800 cursor-pointer list-none flex items-start gap-2">
        <span class="text-emerald-600 font-black">Q.</span> ${f.q}
      </summary>
      <p class="text-gray-700 leading-relaxed faq-answer mt-3 pl-6">${f.a}</p>
    </details>
  `).join('')

  // 관련 증상
  const relatedHtml = symptom.relatedSymptoms.map(rs => {
    const r = symptomData[rs]
    if (!r) return ''
    return `<a href="/symptom/${rs}" class="bg-white border-2 border-amber-200 hover:border-amber-500 rounded-lg p-3 text-sm hover:shadow transition">
      <div class="font-semibold text-amber-700">${r.shortKo}</div>
      <div class="text-xs text-gray-600 mt-1">${r.ko}</div>
    </a>`
  }).join('')

  // 지역별 cluster (현재 지역이 없을 때만)
  const regionSlugs = ['yeongju', 'bonghwa', 'yecheon', 'andong', 'mungyeong', 'yeongyang', 'cheongsong', 'sangju']
  const regionLinksHtml = !area ? regionSlugs.map(r => {
    const a = getAreaInfo(r)
    if (!a) return ''
    return `<a href="/symptom/${symptomSlug}/${r}" class="bg-white border border-emerald-200 hover:border-emerald-500 rounded-lg px-3 py-2 text-sm hover:shadow transition">${a.name} ${symptom.shortKo} 진료</a>`
  }).join('') : ''

  // Schema.org
  const urgencyMap = { 'high': 'EmergencyService', 'medium': 'MedicalCondition', 'low': 'MedicalCondition' }
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "증상별 진료", "item": "https://kndent.kr/symptom" },
        { "@type": "ListItem", "position": 3, "name": symptom.ko, "item": `https://kndent.kr/symptom/${symptomSlug}` },
        ...(area ? [{ "@type": "ListItem", "position": 4, "name": `${area.name} ${symptom.shortKo}`, "item": `https://kndent.kr/symptom/${symptomSlug}/${regionSlug}` }] : [])
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      "name": symptom.ko,
      "alternateName": symptom.searchKeywords,
      "possibleTreatment": symptom.treatments.map(t => ({
        "@type": "MedicalTherapy",
        "name": t.name,
        "description": t.desc
      })),
      "signOrSymptom": symptom.causes.map(c => ({
        "@type": "MedicalSignOrSymptom",
        "name": c.title,
        "description": c.desc
      }))
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
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "url": area ? `https://kndent.kr/symptom/${symptomSlug}/${regionSlug}` : `https://kndent.kr/symptom/${symptomSlug}`,
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient",
        ...(area ? { "geographicArea": { "@type": "AdministrativeArea", "name": area.name } } : {})
      },
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "isAccessibleForFree": true
      }
    }
  ]

  // 응급 케이스는 EmergencyService 추가
  if (symptom.urgency === 'high') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "name": `영주 강남치과 ${symptom.shortKo} 응급 진료`,
      "telephone": "+82-54-636-8222",
      "openingHours": ["Mo-Fr 09:00-13:00", "Mo-Fr 14:00-17:30"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "영주시",
        "addressRegion": "경상북도",
        "addressCountry": "KR"
      },
      "availableService": {
        "@type": "MedicalProcedure",
        "name": `${symptom.ko} 응급 진료`
      }
    })
  }

  const html = `
    <article class="bg-gradient-to-br from-white via-amber-50 to-orange-50">
      <!-- Hero -->
      <section class="bg-gradient-to-r ${symptom.urgency === 'high' ? 'from-red-600 via-orange-600 to-amber-600' : 'from-amber-600 via-orange-500 to-yellow-500'} text-white py-16">
        <div class="max-w-5xl mx-auto px-4">
          <nav aria-label="breadcrumb" class="text-sm text-white/80 mb-4">
            <a href="/" class="hover:underline">홈</a> /
            <a href="/symptom" class="hover:underline">증상별 진료</a> /
            ${area ? `<a href="/symptom/${symptomSlug}" class="hover:underline">${symptom.ko}</a> / <span class="text-white">${area.name}</span>` : `<span class="text-white">${symptom.ko}</span>`}
          </nav>
          <div class="inline-block bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-3">${urgencyTag} 진료 가이드</div>
          <h1 class="text-3xl md:text-4xl font-bold mb-4 leading-tight" data-speakable>
            ${areaPrefix}${symptom.ko}<br/>
            <span class="text-white/90 text-2xl md:text-3xl">원인·진료법·자가관리 가이드</span>
          </h1>
          <p class="text-lg text-white/95 leading-relaxed symptom-summary" data-speakable>${symptom.hero}</p>
          ${symptom.urgency === 'high' ? `
            <div class="mt-6 bg-white/20 backdrop-blur border border-white/30 rounded-xl p-4 flex items-center gap-4">
              <i class="fas fa-phone-volume text-3xl"></i>
              <div>
                <div class="font-bold text-lg">${areaPrefix}응급 진료 전화</div>
                <a href="tel:054-636-8222" class="text-2xl font-black underline">054-636-8222</a>
              </div>
            </div>
          ` : ''}
        </div>
      </section>
${regionNoteHtml}
      <!-- 원인 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">🔍 ${symptom.shortKo}의 가능한 원인 ${symptom.causes.length}가지</h2>
        <p class="text-gray-600 mb-6">${symptom.shortKo}은(는) 여러 원인으로 발생합니다. 정확한 진단이 치료의 시작입니다.</p>
        <div class="grid md:grid-cols-2 gap-4">
          ${causesHtml}
        </div>
      </section>

      <!-- 진단 -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">🔬 영주 강남치과 ${symptom.shortKo} 진단</h2>
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <p class="text-gray-800 leading-relaxed" data-speakable>${symptom.diagnosis}</p>
        </div>
      </section>

      <!-- 진료법 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">🩺 ${symptom.shortKo} 진료법</h2>
        <p class="text-gray-600 mb-6">원인에 따라 적절한 진료를 선택합니다.</p>
        <div class="grid md:grid-cols-2 gap-4">
          ${treatmentsHtml}
        </div>
      </section>

      <!-- 자가관리 & 내원 시점 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
            <h2 class="text-xl font-bold text-emerald-800 mb-4">🏠 자가관리 방법</h2>
            <ul class="space-y-1">${homeCareHtml}</ul>
          </div>
          <div class="bg-red-50 rounded-xl p-6 border-2 border-red-200">
            <h2 class="text-xl font-bold text-red-800 mb-4">🚨 즉시 내원해야 할 때</h2>
            <ul class="space-y-1">${visitHtml}</ul>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="bg-gray-50 py-12">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">❓ ${symptom.shortKo} 자주 묻는 질문</h2>
          ${faqsHtml}
        </div>
      </section>

      ${relatedHtml ? `
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🔗 관련 증상도 확인해보세요</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">${relatedHtml}</div>
      </section>
      ` : ''}

      ${regionLinksHtml ? `
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">📍 지역별 ${symptom.shortKo} 진료 안내</h2>
        <div class="flex flex-wrap gap-2">${regionLinksHtml}</div>
      </section>
      ` : ''}

      <!-- CTA -->
      <section class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">${areaPrefix}${symptom.shortKo}, 영주 강남치과에서 정확히 진단받으세요</h2>
          <p class="text-emerald-100 mb-6 text-lg">구강악안면외과 전문의 + 디지털 정밀진단 시스템</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/reservation" class="bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition">📅 진료 예약하기</a>
            <a href="tel:054-636-8222" class="bg-emerald-800 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-900 transition border-2 border-white">📞 054-636-8222</a>
          </div>
        </div>
      </section>
    </article>
  `

  return { html, title, description, keywords, schemas }
}

/** 증상 인덱스 페이지 */
export function symptomIndexPage(): { html: string; title: string; description: string; keywords: string } {
  const symptoms = Object.values(symptomData)
  const highUrgency = symptoms.filter(s => s.urgency === 'high')
  const mediumUrgency = symptoms.filter(s => s.urgency === 'medium')
  const lowUrgency = symptoms.filter(s => s.urgency === 'low')

  const renderCard = (s: SymptomInfo) => `
    <a href="/symptom/${s.slug}" class="block bg-white rounded-xl p-5 shadow-md border-2 ${s.urgency === 'high' ? 'border-red-200 hover:border-red-500' : s.urgency === 'medium' ? 'border-amber-200 hover:border-amber-500' : 'border-emerald-200 hover:border-emerald-500'} hover:shadow-xl transition group">
      <div class="flex items-start gap-3">
        <div class="text-2xl">${s.urgency === 'high' ? '🚨' : s.urgency === 'medium' ? '⚠️' : '🟢'}</div>
        <div class="flex-1">
          <h3 class="font-bold text-gray-800 group-hover:text-emerald-700 mb-1">${s.ko}</h3>
          <p class="text-xs text-gray-600">${s.searchKeywords.slice(0, 3).join(' · ')}</p>
        </div>
      </div>
    </a>
  `

  const html = `
    <article class="bg-gradient-to-br from-white via-amber-50 to-orange-50">
      <section class="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 text-white py-16">
        <div class="max-w-5xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4" data-speakable>증상별 진료 안내</h1>
          <p class="text-lg text-white/95" data-speakable>치통·시린이·잇몸 부음·이갈이까지 — 증상으로 진료 찾기</p>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-red-700 mb-4">🚨 응급·즉시 진료 권장</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">${highUrgency.map(renderCard).join('')}</div>

        <h2 class="text-2xl font-bold text-amber-700 mb-4 mt-8">⚠️ 주의·조기 진료 권장</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">${mediumUrgency.map(renderCard).join('')}</div>

        <h2 class="text-2xl font-bold text-emerald-700 mb-4 mt-8">🟢 일반·정기 점검</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">${lowUrgency.map(renderCard).join('')}</div>
      </section>
    </article>
  `

  return {
    html,
    title: '증상별 치과 진료 안내 | 영주 강남치과',
    description: '치통·시린이·잇몸 부음·이갈이·치아 외상 등 증상으로 찾는 치과 진료 가이드. 영주 강남치과 12가지 증상별 진료 안내.',
    keywords: '치통, 시린이, 잇몸 부음, 잇몸 출혈, 치아 흔들림, 입냄새, 사랑니 통증, 턱관절, 이갈이, 치아 변색, 치아 외상, 영주 치과 응급'
  }
}

/** 모든 증상 페이지 경로 */
export function getAllSymptomPaths(): { symptomSlug: string; regionSlug?: string; priority: number }[] {
  const paths: { symptomSlug: string; regionSlug?: string; priority: number }[] = []
  // 영양·청송은 지역 데이터(getAreaInfo)가 없어 기본 페이지와 동일 내용이 렌더됨 → 경로에서 제외 (2026-09-29)
  const regions = ['yeongju', 'bonghwa', 'yecheon', 'andong', 'mungyeong', 'yeongyang', 'cheongsong', 'sangju'].filter(r => getAreaInfo(r))

  Object.values(symptomData).forEach(s => {
    // 단독 증상 페이지
    paths.push({ symptomSlug: s.slug, priority: s.urgency === 'high' ? 1 : 2 })

    // 지역 × 증상 페이지 (응급/주의 증상만)
    if (s.urgency !== 'low') {
      regions.forEach(r => {
        paths.push({ symptomSlug: s.slug, regionSlug: r, priority: r === 'yeongju' ? 2 : 3 })
      })
    }
  })

  return paths
}
