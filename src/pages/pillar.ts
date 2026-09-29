import { MEDICAL_LAST_REVIEWED } from '../seo'
import { OG_IMAGE_PNG } from '../layout'
/**
 * 🚀 SEO 슈퍼업글 시즌 2: Pillar 콘텐츠 허브 페이지
 * 각 핵심 진료의 "거대 가이드 페이지" 생성 — 모든 관련 페이지를 묶는 토픽 클러스터 중심
 * /guide/:treatment → 임플란트/교정/사랑니/보철/심미/뼈이식/충치/미백 8개 허브
 *
 * 효과: 토픽 권위(Topical Authority) 확보, 내부 링크 mesh 강화, AEO 답변 추출 용이
 */

import { getAreaInfo, getTreatmentInfo } from './combo'

interface PillarSection {
  id: string
  title: string
  content: string
}

interface PillarConfig {
  treatmentSlug: string
  longTitle: string
  metaDescription: string
  intro: string
  problem: string         // 환자 고민
  procedure: string[]     // 단계별 진료 절차 (HowTo)
  cost: string            // 비용 안내
  duration: string        // 진료기간
  aftercare: string       // 사후관리
  faqs: { q: string; a: string }[]
  relatedTreatments: string[] // 관련 진료 슬러그
}

const pillarConfigs: Record<string, PillarConfig> = {
  'implant': {
    treatmentSlug: 'implant',
    longTitle: '임플란트 완벽 가이드: 종류·비용·기간·후기·관리법 [2026]',
    metaDescription: '임플란트 종류별 차이부터 가격(개당 80~150만원), 4~6개월 진료기간, 평생관리법까지. 영주 강남치과 서울대 전문의의 임플란트 완벽 가이드. 디지털 임플란트·뼈이식·즉시식립 모두.',
    intro: '임플란트는 자연치아를 잃었을 때 가장 가깝게 복원하는 현대 치과의 핵심 진료입니다. 영주 강남치과는 서울대 출신 통합치과 전문의가 직접 진료하며, CBCT 정밀진단 + 디지털 임플란트 시스템 + 6개 독립 수술실을 갖춘 경북북부 거점 임플란트 치과입니다.',
    problem: '임플란트는 한 번 식립하면 평생 사용하는 시술입니다. 그런데도 일부 치과에서는 가격만 강조하거나, 정밀진단 없이 식립하다 실패 사례가 발생하기도 합니다. 진짜 중요한 것은 (1) 정확한 진단 (2) 의료진의 임상 깊이 (3) 사후관리 시스템 세 가지입니다.',
    procedure: [
      '1단계: 초진 상담 + CBCT 3D 정밀진단 — 잇몸뼈 상태·신경 위치·교합 분석',
      '2단계: 디지털 시뮬레이션 + 수술 가이드 제작 — 1mm 오차 범위 내 정밀 식립 계획',
      '3단계: 임플란트 식립 수술 — 무균 수술실, 평균 30~60분 (개수에 따라)',
      '4단계: 골유착(임플란트와 뼈가 붙는 과정) 대기 (2~6개월) — 임플란트와 뼈가 단단히 결합되는 시간',
      '5단계: 디지털 보철 제작 + 장착 — 디지털 스캐너로 정밀 본뜨고 자연치아처럼 제작',
      '6단계: 정기검진 + 평생관리 — 6개월마다 검진, 필요시 무료 점검'
    ],
    cost: '영주 강남치과 임플란트 비용: 개당 80~150만원 (재료·뼈이식 여부에 따라). 만 65세 이상 평생 2개 건강보험 적용 시 본인부담 약 35만원/개. 무이자 할부 6~12개월 가능. 추가비용 없는 정직한 총액 견적.',
    duration: '평균 진료기간 4~6개월. 즉시식립 가능 케이스는 2~3개월. 진료 횟수 평균 4~6회.',
    aftercare: '식립 후 첫 1주 약 복용·식이주의, 1~3개월 정기검진, 이후 6개월마다 검진·스케일링. 영주 강남치과는 평생관리 시스템으로 임플란트 보호.',
    faqs: [
      { q: '임플란트 평균 가격은 얼마인가요?', a: '영주 강남치과 임플란트는 개당 80~150만원입니다 (재료·뼈이식 포함 여부에 따라). 만 65세 이상 건강보험 적용 시 본인부담 약 35만원/개입니다. 추가비용 없는 총액 견적을 제시합니다.' },
      { q: '임플란트는 얼마나 오래 사용할 수 있나요?', a: '제대로 식립되고 관리되면 평생 사용 가능합니다. 임플란트 자체는 티타늄 소재로 평생 부식되지 않으며, 정기 검진과 스케일링으로 잇몸 건강을 유지하면 10~20년 이상 안정적으로 사용됩니다.' },
      { q: '임플란트 수술은 아픈가요?', a: '국소마취로 수술 중 통증은 없습니다. 영주 강남치과는 무통 마취 시스템으로 진행하며, 수술 후 1~3일 약간의 부종·이질감이 있으나 처방약으로 충분히 조절됩니다. 대부분 환자가 수술 다음날 일상 복귀 가능합니다.' },
      { q: '뼈가 부족해도 임플란트 가능한가요?', a: '뼈이식(GBR), 상악동(위턱 공간) 거상술 등을 통해 가능합니다. 영주 강남치과는 CBCT 정밀진단으로 뼈 상태를 정확히 측정하고, 환자 상태에 맞는 뼈이식 방법을 선택합니다. 뼈이식 후 임플란트 식립까지 평균 4~6개월 소요됩니다.' },
      { q: '디지털 임플란트와 일반 임플란트 차이는?', a: '디지털 임플란트는 CBCT + 디지털 스캐너로 3D 시뮬레이션 후 수술 가이드를 제작해 1mm 오차 범위 내 정밀 식립합니다. 일반 수술 대비 정확도·안전성·수술시간이 모두 우수합니다. 영주 강남치과는 디지털 임플란트 기본 적용입니다.' },
      { q: '임플란트 식립 당일 식사 가능한가요?', a: '국소마취 풀린 후 가능하지만, 수술 부위를 보호하기 위해 첫 1~3일은 미음·죽·요구르트 등 부드러운 음식 권장합니다. 1주 후 일반 식사 가능하며, 보철 장착 후에는 자연치아처럼 사용 가능합니다.' }
    ],
    relatedTreatments: ['bone-graft', 'digital-prosthesis', 'wisdom-tooth', 'cavity']
  },
  'invisalign': {
    treatmentSlug: 'invisalign',
    longTitle: '인비절라인 투명교정 완벽 가이드: 비용·기간·관리법 [2026]',
    metaDescription: '인비절라인 교정 비용(400~900만원), 기간(1~2년), 관리법, 식사·관리 주의사항. 영주 강남치과 인비절라인 공인 전문의 가이드.',
    intro: '인비절라인은 투명한 맞춤형 교정장치로 미국 알라인테크놀로지가 개발한 글로벌 1위 투명교정 시스템입니다. 영주 강남치과는 인비절라인 공인 진료 치과로 서울대 출신 전문의가 직접 진료합니다.',
    problem: '교정은 한번 시작하면 1~2년 진행되는 장기 진료입니다. 그래서 시작 전 (1) 정확한 진단 (2) 맞춤형 치료계획 (3) 정기 점검 시스템이 핵심입니다. 영주 강남치과는 인비절라인 공식 진단 시스템 ClinCheck로 시작부터 끝까지 미리 시뮬레이션합니다.',
    procedure: [
      '1단계: 초진 상담 + 디지털 스캔 + 사진/방사선 검사',
      '2단계: ClinCheck 3D 시뮬레이션 — 치아 이동 과정을 영상으로 미리 확인',
      '3단계: 맞춤형 알라이너 제작 (미국 직접 제작) — 2~3주 소요',
      '4단계: 알라이너 장착 + 사용법 교육 — 1~2주마다 새 알라이너로 교체',
      '5단계: 정기 검진 (6~8주마다) — 진행 상태 점검 및 알라이너 추가 지급',
      '6단계: 보정장치 (Retainer) 착용 — 교정 완료 후 유지를 위한 필수 단계'
    ],
    cost: '인비절라인 비용: 400~900만원 (난이도·기간에 따라). 부분교정 200~400만원. 무이자 할부 12~24개월 가능. 추가비용 없는 총액 견적.',
    duration: '평균 1~2년 (난이도에 따라). 부분교정은 6개월~1년.',
    aftercare: '교정 완료 후 보정장치(Retainer) 평생 착용 권장. 영주 강남치과는 보정 기간 정기검진 포함.',
    faqs: [
      { q: '인비절라인은 얼마인가요?', a: '영주 강남치과 인비절라인 비용은 400~900만원입니다 (난이도·기간에 따라). 부분교정은 200~400만원입니다. 무이자 할부 12~24개월 가능하며 추가비용이 없는 정직한 총액 견적입니다.' },
      { q: '인비절라인 효과는 일반 교정과 같나요?', a: '대부분의 케이스에서 동일한 결과를 얻을 수 있습니다. 다만 복잡한 발치교정·심한 부정교합은 일반 교정이 더 적합할 수 있으며, 정밀진단 후 적합한 방법을 추천합니다.' },
      { q: '인비절라인은 하루 몇 시간 착용하나요?', a: '하루 22시간 이상 착용해야 효과가 있습니다. 식사·양치할 때만 빼고, 나머지 시간은 모두 착용합니다.' },
      { q: '인비절라인 진료 기간은?', a: '평균 1~2년입니다. 부정교합 정도에 따라 다르며, 부분교정은 6개월~1년에 완료됩니다.' },
      { q: '인비절라인 중 식사·음료는 어떻게?', a: '식사·뜨거운 음료는 알라이너를 빼고 드시고, 물은 착용한 채로 가능합니다. 식후 양치 후 재착용 필수.' },
      { q: '교정 후 다시 비뚤어지지 않나요?', a: '보정장치(Retainer)를 꾸준히 착용하면 유지됩니다. 영주 강남치과는 교정 완료 후 정기검진 + 보정 시스템을 제공합니다.' }
    ],
    relatedTreatments: ['cosmetic', 'cavity', 'whitening']
  },
  'wisdom-tooth': {
    treatmentSlug: 'wisdom-tooth',
    longTitle: '사랑니 발치 완벽 가이드: 종류·비용·통증·관리법 [2026]',
    metaDescription: '사랑니 발치 비용(보험적용 5~30만원), 매복사랑니 수술, 발치 후 관리법. 영주 강남치과 서울대 전문의 사랑니 가이드.',
    intro: '사랑니는 마지막에 나는 어금니로, 잘못 나거나 매복된 경우 충치·잇몸병·통증을 유발합니다. 영주 강남치과는 서울대 출신 통합치과 전문의가 직접 매복사랑니 수술까지 진행합니다.',
    problem: '사랑니는 단순 발치부터 신경 근접 매복사랑니 수술까지 난이도가 천차만별입니다. 정확한 CBCT 진단 없이 수술하면 신경 손상 위험이 큽니다. 영주 강남치과는 CBCT 3D 진단으로 신경·치근 위치를 정확히 파악한 후 안전하게 수술합니다.',
    procedure: [
      '1단계: 상담 + CBCT 3D 진단 — 사랑니 위치·신경 근접도 정확히 파악',
      '2단계: 발치 계획 수립 — 단순발치 vs 매복발치 결정',
      '3단계: 국소마취 + 발치/수술 — 평균 10~40분',
      '4단계: 봉합 + 거즈 압박 — 출혈 멈춤 확인',
      '5단계: 다음날 소독 + 약 처방',
      '6단계: 1주 후 발사 (실 제거) + 회복 확인'
    ],
    cost: '단순 사랑니 발치: 5~10만원 (건강보험 적용). 매복 사랑니 수술: 15~30만원 (건강보험 적용). 추가비용 없는 정직한 견적.',
    duration: '단순발치 평균 10~20분. 매복발치 수술 30~60분. 회복 1~2주.',
    aftercare: '발치 후 첫 24시간: 거즈 압박, 빨대 사용 금지, 양치 조심. 1주: 약 복용, 부드러운 음식. 2주: 발사 후 일반 식사 가능.',
    faqs: [
      { q: '사랑니는 꼭 빼야 하나요?', a: '바르게 나서 기능을 하면 안 빼도 되지만, (1) 충치·잇몸병이 생긴 경우 (2) 매복되어 옆 치아를 누르는 경우 (3) 통증이 반복되는 경우는 발치를 권장합니다. CBCT 진단으로 정확히 판단합니다.' },
      { q: '사랑니 발치 비용은?', a: '단순 발치 5~10만원, 매복 사랑니 수술 15~30만원입니다 (건강보험 적용). 추가비용 없는 정직한 견적입니다.' },
      { q: '사랑니 발치 후 얼마나 아픈가요?', a: '국소마취로 수술 중 통증은 없습니다. 수술 후 1~3일 부종·약간의 통증이 있으나 처방약으로 조절됩니다. 매복발치는 1주 정도 회복기간 필요합니다.' },
      { q: '신경 손상 위험은?', a: '영주 강남치과는 CBCT 3D 진단으로 신경 위치를 1mm 단위로 정확히 파악한 후 안전하게 수술합니다. 위험이 높은 케이스는 별도 안내합니다.' },
      { q: '사랑니 발치 후 주의사항은?', a: '첫 24시간: 거즈 압박 유지, 빨대 금지, 침 뱉지 않기, 양치 조심. 1주: 약 복용, 부드러운 음식. 2주: 발사 후 일상 회복.' },
      { q: '사랑니 4개 한번에 빼도 되나요?', a: '환자 상태에 따라 1~2개씩 나눠 빼는 것을 권장합니다. 4개 동시 발치는 회복 부담이 크므로 영주 강남치과에서는 단계적 진행을 추천합니다.' }
    ],
    relatedTreatments: ['cavity', 'gum', 'implant']
  },
  'digital-prosthesis': {
    treatmentSlug: 'digital-prosthesis',
    longTitle: '디지털 보철 완벽 가이드: 크라운·브릿지·비용·기간 [2026]',
    metaDescription: '디지털 보철(크라운·브릿지) 종류, 비용(30~70만원), 디지털 스캐너 기반 정밀 보철. 영주 강남치과 가이드.',
    intro: '디지털 보철은 디지털 스캐너로 정밀 본뜨고, CAD/CAM으로 자연치아처럼 제작하는 첨단 보철입니다. 영주 강남치과는 디지털 보철 시스템 풀세트를 갖추고 있습니다.',
    problem: '전통 본뜨기는 인상재 거부감·정확도 한계가 있었습니다. 디지털 스캐너는 1분 만에 정밀 스캔하고, CAD/CAM으로 1mm 오차 내 제작합니다. 영주 강남치과는 디지털 보철 풀워크플로우를 갖춘 경북북부 거점 치과입니다.',
    procedure: [
      '1단계: 상담 + 디지털 스캔 (인상재 없음)',
      '2단계: CAD 디자인 시뮬레이션 — 환자와 함께 형태 확인',
      '3단계: CAM 자동 제작 — 지르코니아/올세라믹 가공',
      '4단계: 임시 보철 장착 (필요시)',
      '5단계: 최종 보철 장착 + 교합 조정',
      '6단계: 1~3개월 점검 + 정기검진'
    ],
    cost: '지르코니아 크라운 30~50만원, 올세라믹 40~70만원, 브릿지 60~150만원 (단위별). 추가비용 없는 정직한 견적.',
    duration: '평균 2~3회 내원, 1~2주 소요.',
    aftercare: '정기 스케일링 + 교합 점검. 영주 강남치과 평생관리 시스템.',
    faqs: [
      { q: '디지털 보철과 일반 보철 차이는?', a: '디지털 보철은 디지털 스캐너로 정밀 본뜨고, CAD/CAM으로 자동 제작합니다. 정확도·심미성·제작시간 모두 우수합니다.' },
      { q: '지르코니아와 올세라믹 차이는?', a: '지르코니아는 강도가 높아 어금니에 적합, 올세라믹은 심미성이 좋아 앞니에 적합합니다. 부위와 환자 선호에 따라 선택합니다.' },
      { q: '보철 비용은?', a: '지르코니아 30~50만원, 올세라믹 40~70만원, 브릿지 60~150만원입니다.' },
      { q: '보철 수명은?', a: '관리 잘하면 10~20년 이상 사용 가능합니다. 정기검진 + 스케일링으로 잇몸 건강 유지가 핵심.' },
      { q: '보철 후 통증·이질감은?', a: '첫 1~2주 약간의 이질감이 있으나 곧 적응합니다. 교합 조정으로 편안하게 사용 가능합니다.' },
      { q: '보철 깨지면?', a: '재제작 가능합니다. 영주 강남치과는 1년 이내 정상 사용 중 파손 시 무상 재제작 정책을 운영합니다.' }
    ],
    relatedTreatments: ['implant', 'cavity', 'cosmetic']
  },
  'cosmetic': {
    treatmentSlug: 'cosmetic',
    longTitle: '심미치과 완벽 가이드: 라미네이트·올세라믹·미백 [2026]',
    metaDescription: '라미네이트(60~100만원), 올세라믹(50~70만원), 치아미백 비용·과정·관리. 영주 강남치과 심미진료.',
    intro: '심미치과는 자연치아의 색·형태·배열을 개선하는 진료입니다. 영주 강남치과는 디지털 스마일 디자인으로 환자와 함께 미리 결과를 시뮬레이션합니다.',
    problem: '심미진료는 영구적 변화를 가져옵니다. 그래서 (1) 시뮬레이션 (2) 환자 합의 (3) 정밀 제작 세 단계가 필수입니다.',
    procedure: [
      '1단계: 상담 + 디지털 사진 + 스마일 분석',
      '2단계: 디지털 시뮬레이션 — 결과 미리 보기',
      '3단계: 치아 형성 (최소 삭제)',
      '4단계: 디지털 스캔 → CAD/CAM 제작',
      '5단계: 임시 보철 → 최종 부착',
      '6단계: 정기 점검 + 관리'
    ],
    cost: '라미네이트 60~100만원/개, 올세라믹 50~70만원/개, 치아미백 30~50만원.',
    duration: '평균 2~3회 내원, 2~3주 소요.',
    aftercare: '정기 스케일링·점검. 식이 주의 (커피·와인·담배 최소화).',
    faqs: [
      { q: '라미네이트와 올세라믹 차이는?', a: '라미네이트는 치아 표면만 얇게 덧붙이는 방식이고, 올세라믹은 치아를 전체적으로 씌우는 방식입니다. 라미네이트가 자연치아 보존 면에서 유리합니다.' },
      { q: '심미 진료 비용은?', a: '라미네이트 60~100만원, 올세라믹 50~70만원, 치아미백 30~50만원입니다.' },
      { q: '심미 진료 후 식사는?', a: '24시간은 부드러운 음식 권장, 일주일은 색이 있는 음식(커피·와인) 자제 권장.' },
      { q: '심미 진료 후 통증은?', a: '대부분 통증 없습니다. 약간의 시린감이 1~2주 있을 수 있으나 곧 적응합니다.' },
      { q: '심미 진료 수명은?', a: '관리 잘하면 10~15년 이상 사용 가능합니다.' },
      { q: '치아미백 효과는?', a: '평균 2~4단계 밝아집니다. 환자 치아 상태와 생활습관에 따라 차이가 있습니다.' }
    ],
    relatedTreatments: ['whitening', 'invisalign', 'digital-prosthesis']
  },
  'bone-graft': {
    treatmentSlug: 'bone-graft',
    longTitle: '뼈이식 완벽 가이드: GBR·상악동(위턱 공간) 거상술·비용 [2026]',
    metaDescription: '잇몸뼈이식(GBR, 30~80만원), 상악동(위턱 공간) 거상술(50~150만원), 임플란트 동시 식립. 영주 강남치과 가이드.',
    intro: '잇몸뼈가 부족해도 뼈이식으로 임플란트 식립이 가능합니다. 영주 강남치과는 GBR·상악동(위턱 공간) 거상술 등 모든 뼈이식 기법을 갖추고 있습니다.',
    problem: '치아 상실 후 시간이 지나면 잇몸뼈가 자연 흡수됩니다. 임플란트 식립을 위해서는 충분한 뼈가 필요하며, 뼈가 부족하면 뼈이식이 필요합니다.',
    procedure: [
      '1단계: CBCT 3D 진단 — 잇몸뼈 부족 부위·양 정확히 측정',
      '2단계: 뼈이식 계획 수립 — GBR, 상악동(위턱 공간) 거상술, 자가골 등 선택',
      '3단계: 뼈이식 수술 — 평균 30~60분',
      '4단계: 골유합 대기 (3~6개월)',
      '5단계: 임플란트 식립 (동시 식립 가능 케이스도 있음)',
      '6단계: 보철 제작 + 평생관리'
    ],
    cost: 'GBR 30~80만원, 상악동(위턱 공간) 거상술 50~150만원 (재료·범위에 따라).',
    duration: '뼈이식 후 임플란트 식립까지 평균 4~6개월. 동시 식립 가능 케이스는 단축.',
    aftercare: '첫 1주 약 복용, 1~3개월 정기검진.',
    faqs: [
      { q: '뼈이식은 왜 하나요?', a: '임플란트 식립에 필요한 잇몸뼈가 부족할 때, 뼈를 이식해 충분한 양을 확보하기 위해 합니다.' },
      { q: '뼈이식 비용은?', a: 'GBR 30~80만원, 상악동(위턱 공간) 거상술 50~150만원입니다.' },
      { q: '뼈이식과 임플란트 동시에 할 수 있나요?', a: '뼈 부족 정도가 경미하면 동시 식립 가능합니다. CBCT 진단으로 판단합니다.' },
      { q: '뼈이식은 아픈가요?', a: '국소마취로 통증은 없습니다. 수술 후 1~3일 부종이 있으나 약으로 조절됩니다.' },
      { q: '뼈이식 후 회복기간은?', a: '평균 3~6개월입니다.' },
      { q: '뼈이식 재료는?', a: '자가골·동종골·이종골 등 다양하며 환자 상태에 맞게 선택합니다.' }
    ],
    relatedTreatments: ['implant', 'digital-prosthesis']
  },
  'cavity': {
    treatmentSlug: 'cavity',
    longTitle: '충치치료 완벽 가이드: 레진·인레이·신경치료 [2026]',
    metaDescription: '충치치료 비용(레진 5~15만원, 인레이 15~30만원, 신경치료 보험적용 10~25만원), 단계별 진료. 영주 강남치과.',
    intro: '충치는 치아 표면이 산성 환경으로 부식되는 진행성 질환입니다. 초기에 발견하면 간단한 레진 충전으로 끝나지만, 방치하면 신경치료·발치까지 진행됩니다.',
    problem: '충치는 진행 단계에 따라 치료법이 완전히 달라집니다. 정확한 진단 없이 치료하면 과잉진료 또는 부족한 치료가 됩니다.',
    procedure: [
      '1단계: 진단 — 시진·방사선·필요시 CBCT',
      '2단계: 충치 단계 판단 (C1~C4)',
      '3단계: 충치 제거 + 충전 (레진/인레이/크라운)',
      '4단계: 신경 침범 시 신경치료',
      '5단계: 정기검진 + 예방 관리'
    ],
    cost: '레진 충전 5~15만원, 인레이 15~30만원, 신경치료 10~25만원(보험적용), 크라운 30~50만원.',
    duration: '레진 1회, 인레이 2회, 신경치료 3~5회, 크라운 2~3회 내원.',
    aftercare: '정기 스케일링 + 검진 6개월마다.',
    faqs: [
      { q: '충치는 언제 치료해야 하나요?', a: '시린감·통증이 있을 때는 이미 진행된 상태입니다. 정기검진으로 초기에 발견하는 것이 핵심입니다.' },
      { q: '레진과 인레이 차이는?', a: '레진은 작은 충치에 직접 충전, 인레이는 좀 더 큰 충치에 본뜨고 제작해 부착합니다.' },
      { q: '신경치료는 아픈가요?', a: '국소마취로 통증은 거의 없습니다. 평균 3~5회 내원으로 완료됩니다.' },
      { q: '충치 예방법은?', a: '하루 2회 양치 + 치실 + 6개월마다 스케일링 + 정기검진.' },
      { q: '충치치료 비용은?', a: '레진 5~15만원, 인레이 15~30만원, 신경치료 10~25만원(보험)입니다.' },
      { q: '신경치료 후 크라운 필요한가요?', a: '대부분 어금니는 강도 확보를 위해 크라운 필요합니다.' }
    ],
    relatedTreatments: ['prevention', 'gum', 'digital-prosthesis']
  },
  'whitening': {
    treatmentSlug: 'whitening',
    longTitle: '치아미백 완벽 가이드: 종류·비용·효과·관리법 [2026]',
    metaDescription: '치아미백 종류(전문가/홈/내부미백), 비용(20~50만원), 효과 지속기간, 관리법. 영주 강남치과 가이드.',
    intro: '치아미백은 안전한 약제로 치아 색을 밝게 하는 진료입니다. 영주 강남치과는 전문가 미백 + 홈미백 병행 시스템을 운영합니다.',
    problem: '시판 미백제는 효과가 제한적이거나 잇몸 자극이 있습니다. 전문가 미백은 농도·시간을 조절해 안전하고 효과적입니다.',
    procedure: [
      '1단계: 상담 + 색 측정 (Shade)',
      '2단계: 스케일링 + 잇몸 보호',
      '3단계: 미백제 도포 + 광조사 (1회 평균 1시간)',
      '4단계: 홈미백 키트 (자가 관리)',
      '5단계: 1개월 후 점검 + 추가 시술',
      '6단계: 정기 관리'
    ],
    cost: '전문가 미백 30~50만원, 홈미백 20~30만원.',
    duration: '전문가 미백 1~3회. 효과 지속 1~2년 (관리에 따라).',
    aftercare: '24~48시간 색 있는 음식 자제 (커피·와인·카레). 흡연자는 효과 지속 짧음.',
    faqs: [
      { q: '치아미백은 안전한가요?', a: '치과에서 시행하는 미백은 안전합니다. 잇몸 보호제로 자극 최소화합니다.' },
      { q: '미백 효과는 몇 단계 밝아지나요?', a: '평균 2~4단계 밝아집니다.' },
      { q: '미백 비용은?', a: '전문가 미백 30~50만원, 홈미백 20~30만원입니다.' },
      { q: '미백 효과 지속은?', a: '평균 1~2년입니다. 흡연·커피·와인 등은 효과를 단축합니다.' },
      { q: '미백 후 시린감?', a: '일시적으로 시린감이 있을 수 있으나 24~48시간 내 사라집니다.' },
      { q: '미백 후 음식은?', a: '24~48시간 색 있는 음식·음료·담배 자제 권장.' }
    ],
    relatedTreatments: ['cosmetic', 'prevention', 'scaling']
  }
}

export function getPillarConfig(slug: string): PillarConfig | undefined {
  return pillarConfigs[slug]
}

export function getAllPillarSlugs(): string[] {
  return Object.keys(pillarConfigs)
}

export function pillarPage(treatmentSlug: string): { html: string; title: string; description: string; keywords: string; schemas: object[] } | null {
  const config = pillarConfigs[treatmentSlug]
  if (!config) return null

  const treatment = getTreatmentInfo(treatmentSlug)
  if (!treatment) return null

  // SEO
  const title = config.longTitle
  const description = config.metaDescription
  const keywords = [
    `${treatment.koSlug} 가이드`, `${treatment.koSlug} 비용`, `${treatment.koSlug} 가격`,
    `${treatment.koSlug} 추천`, `${treatment.koSlug} 잘하는곳`, `${treatment.koSlug} 후기`,
    `영주 ${treatment.koSlug}`, `경북 ${treatment.koSlug}`, `${treatment.koSlug} 종류`,
    `${treatment.koSlug} 기간`, `${treatment.koSlug} 관리법`, `${treatment.koSlug} 부작용`,
    `${treatment.koSlug} 정밀진단`, `디지털 ${treatment.koSlug}`, `영주 강남치과 ${treatment.koSlug}`
  ].join(', ')

  // 절차 단계 카드
  const procedureCards = config.procedure.map((step, i) => `
    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200 hover:shadow-lg transition">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">${i + 1}</div>
        <p class="text-gray-800 leading-relaxed pt-1">${step}</p>
      </div>
    </div>
  `).join('')

  // FAQ
  const faqHtml = config.faqs.map(f => `
    <details class="bg-white rounded-xl p-5 shadow-md border-l-4 border-emerald-500 mb-3 group" open>
      <summary class="text-lg font-bold text-gray-800 cursor-pointer list-none flex items-start gap-2">
        <span class="text-emerald-600 font-black">Q.</span> ${f.q}
      </summary>
      <p class="text-gray-700 leading-relaxed faq-answer mt-3 pl-6">${f.a}</p>
    </details>
  `).join('')

  // 지역별 진료 안내 (cluster mesh)
  const regions = ['yeongju', 'bonghwa', 'yecheon', 'andong', 'mungyeong', 'yeongyang', 'cheongsong', 'sangju', 'danyang']
  const regionLinksHtml = regions.map(r => {
    const area = getAreaInfo(r)
    if (!area) return ''
    return `<a href="/area/${r}/${treatmentSlug}" class="bg-white border-2 border-emerald-200 hover:border-emerald-500 rounded-lg px-3 py-2 text-sm text-gray-800 hover:text-emerald-700 hover:shadow transition">${area.name} ${treatment.koSlug}</a>`
  }).join('')

  // 의도 키워드 mesh
  const intents = ['price', 'cost', 'recommend', 'best']
  const intentLabels: Record<string, string> = {
    'price': '가격',
    'cost': '비용',
    'recommend': '추천',
    'best': '잘하는곳'
  }
  const intentLinksHtml = intents.map(i => `
    <a href="/intent/yeongju/${treatmentSlug}/${i}" class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border-2 border-purple-200 hover:border-purple-500 hover:shadow transition group">
      <div class="text-sm font-bold text-purple-700">영주 ${treatment.koSlug} ${intentLabels[i]}</div>
    </a>
  `).join('')

  // 관련 진료 링크
  const relatedHtml = config.relatedTreatments.map(rt => {
    const ti = getTreatmentInfo(rt)
    if (!ti) return ''
    return `<a href="/guide/${rt}" class="bg-emerald-50 rounded-lg p-3 border border-emerald-200 hover:border-emerald-500 hover:shadow transition">
      <div class="font-semibold text-emerald-700">${ti.koSlug} 완벽 가이드</div>
      <div class="text-xs text-gray-600 mt-1">${ti.koSlug} 비용·기간·관리법</div>
    </a>`
  }).join('')

  // Schema.org
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr/" },
        { "@type": "ListItem", "position": 2, "name": "진료 가이드", "item": "https://kndent.kr/guide" },
        { "@type": "ListItem", "position": 3, "name": `${treatment.koSlug} 가이드`, "item": `https://kndent.kr/guide/${treatmentSlug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": OG_IMAGE_PNG,
      "datePublished": "2026-01-01",
      "dateModified": MEDICAL_LAST_REVIEWED,
      "author": {
        "@type": "Organization",
        "name": "영주 강남치과의원"
      },
      "publisher": {
        "@type": "MedicalBusiness",
        "name": "영주 강남치과의원",
        "url": "https://kndent.kr"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://kndent.kr/guide/${treatmentSlug}`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "url": `https://kndent.kr/guide/${treatmentSlug}`,
      "about": {
        "@type": "MedicalProcedure",
        "name": treatment.koSlug,
        "procedureType": "TherapeuticProcedure"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `${treatment.koSlug} 진료 절차`,
      "description": `영주 강남치과의 ${treatment.koSlug} 단계별 진료 절차`,
      "totalTime": config.duration,
      "step": config.procedure.map((step, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": step.split(':')[0] || `Step ${i + 1}`,
        "text": step
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": config.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ]

  const html = `
    <article class="bg-gradient-to-br from-white via-emerald-50 to-cyan-50">
      <!-- Hero -->
      <section class="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 text-white py-16">
        <div class="max-w-5xl mx-auto px-4">
          <nav aria-label="breadcrumb" class="text-sm text-emerald-100 mb-4">
            <a href="/" class="hover:underline">홈</a> /
            <a href="/guide" class="hover:underline">진료 가이드</a> /
            <span class="text-white">${treatment.koSlug} 가이드</span>
          </nav>
          <div class="inline-block bg-yellow-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold mb-3">📚 PILLAR 가이드 [2026]</div>
          <h1 class="text-3xl md:text-4xl font-bold mb-4 leading-tight" data-speakable>
            ${treatment.koSlug} 완벽 가이드<br/>
            <span class="text-yellow-300 text-2xl md:text-3xl">종류·비용·기간·관리법 총정리</span>
          </h1>
          <p class="text-lg text-emerald-100 leading-relaxed pillar-summary" data-speakable>
            ${config.intro}
          </p>
        </div>
      </section>

      <!-- 환자 고민 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">🤔 ${treatment.koSlug}, 환자분들이 가장 고민하는 것</h2>
        <div class="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
          <p class="text-gray-800 leading-relaxed" data-speakable>${config.problem}</p>
        </div>
      </section>

      <!-- 진료 절차 (HowTo) -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">🩺 ${treatment.koSlug} 단계별 진료 절차</h2>
        <p class="text-gray-600 mb-6">영주 강남치과의 ${treatment.koSlug} ${config.procedure.length}단계 진료 프로토콜</p>
        <div class="grid md:grid-cols-2 gap-4">
          ${procedureCards}
        </div>
      </section>

      <!-- 비용·기간 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">💰 ${treatment.koSlug} 비용 & 기간</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 shadow-lg">
            <h3 class="text-lg font-bold text-emerald-800 mb-3">💵 비용</h3>
            <p class="text-gray-800 leading-relaxed">${config.cost}</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
            <h3 class="text-lg font-bold text-blue-800 mb-3">⏱️ 진료기간</h3>
            <p class="text-gray-800 leading-relaxed">${config.duration}</p>
          </div>
        </div>
      </section>

      <!-- 사후관리 -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">🛡️ ${treatment.koSlug} 사후관리</h2>
        <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-200">
          <p class="text-gray-800 leading-relaxed">${config.aftercare}</p>
        </div>
      </section>

      <!-- FAQ -->
      <section class="bg-gray-50 py-12">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">❓ ${treatment.koSlug} 자주 묻는 질문</h2>
          ${faqHtml}
        </div>
      </section>

      <!-- 지역별 진료 안내 (cluster) -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">📍 지역별 ${treatment.koSlug} 진료 안내</h2>
        <p class="text-gray-600 mb-6">경북북부·강원남부 지역별 ${treatment.koSlug} 진료 가이드</p>
        <div class="flex flex-wrap gap-2">
          ${regionLinksHtml}
        </div>
      </section>

      <!-- 의도 키워드 mesh -->
      <section class="max-w-5xl mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">🔍 ${treatment.koSlug} 더 알아보기</h2>
        <p class="text-gray-600 mb-6">${treatment.koSlug} 가격·비용·추천·잘하는곳 상세 안내</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${intentLinksHtml}
        </div>
      </section>

      <!-- 관련 진료 -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🩺 함께 보면 좋은 진료 가이드</h2>
        <div class="grid md:grid-cols-3 gap-4">
          ${relatedHtml}
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-12">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">${treatment.koSlug}, 영주 강남치과에 맡기세요</h2>
          <p class="text-emerald-100 mb-6 text-lg">서울대 출신 전문의 + 디지털 시스템 + 평생관리</p>
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

/** 가이드 허브 인덱스 페이지 */
export function pillarIndexPage(): { html: string; title: string; description: string; keywords: string } {
  const slugs = Object.keys(pillarConfigs)

  const cards = slugs.map(slug => {
    const config = pillarConfigs[slug]
    const t = getTreatmentInfo(slug)
    if (!t) return ''
    return `
      <a href="/guide/${slug}" class="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-xl transition group">
        <div class="text-2xl mb-3">📚</div>
        <h3 class="text-xl font-bold text-emerald-800 mb-2 group-hover:text-emerald-600">${t.ko} 완벽 가이드</h3>
        <p class="text-sm text-gray-600 leading-relaxed">${config.metaDescription.substring(0, 80)}...</p>
        <div class="mt-4 text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition">자세히 보기 →</div>
      </a>
    `
  }).join('')

  const html = `
    <article class="bg-gradient-to-br from-white via-emerald-50 to-cyan-50">
      <section class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-16">
        <div class="max-w-5xl mx-auto px-4 text-center">
          <div class="inline-block bg-yellow-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold mb-3">📚 PILLAR 가이드 [2026]</div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4" data-speakable>치과 진료 완벽 가이드</h1>
          <p class="text-lg text-emerald-100" data-speakable>영주 강남치과 8대 핵심 진료 — 비용·기간·관리법까지 한번에</p>
        </div>
      </section>

      <section class="max-w-5xl mx-auto px-4 py-12">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${cards}
        </div>
      </section>
    </article>
  `

  return {
    html,
    title: '치과 진료 완벽 가이드 | 영주 강남치과 PILLAR 가이드',
    description: '영주 강남치과의 8대 핵심 진료 완벽 가이드. 임플란트·교정·사랑니·보철·심미·뼈이식·충치·미백 비용/기간/관리법 총정리.',
    keywords: '치과 진료 가이드, 임플란트 가이드, 교정 가이드, 사랑니 가이드, 영주 강남치과 가이드, 치과 비용, 치과 진료 절차'
  }
}
