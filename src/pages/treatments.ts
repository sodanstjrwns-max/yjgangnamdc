interface Treatment {
  slug: string
  category: string
  title: string
  h1: string
  description: string
  icon: string
  heroDesc: string
  worry: string
  promise: string
  sections: { title: string; content: string }[]
  features: string[]
  isTop: boolean
}

const treatments: Treatment[] = [
  // === 전문센터 ===
  {
    slug: 'implant', category: '전문센터', title: '임플란트', icon: 'fa-tooth',
    h1: '영주 임플란트 – 구강외과 전문의 직접 수술',
    description: '영주 강남치과의원 임플란트. 구강악안면외과 전문의가 직접 수술합니다. 뼈이식, 상악동 거상술도 가능.',
    heroDesc: '수술 전문 외과 전문의가 직접 임플란트합니다',
    worry: '"수술이 무서워요"', promise: '구강외과 전문의가 직접 수술하니까 안심하세요',
    features: ['구강외과 전문의 직접 수술', 'CT 기반 정밀 진단', '뼈이식·상악동 수술 가능', '디지털 임플란트 가이드', '네오 임플란트 사용'],
    isTop: true,
    sections: [
      { title: '왜 구강외과 전문의인가요?', content: '임플란트는 잇몸을 절개하고 턱뼈에 나사를 식립하는 수술입니다. 구강외과 전문의는 턱뼈와 구강 내 수술을 전문으로 수련한 전문의로, 일반 치과의사보다 외과적 수술 경험이 월등히 많습니다. 특히 뼈가 부족한 경우, 신경에 가까운 경우 등 난이도 높은 임플란트도 안전하게 시행할 수 있습니다.' },
      { title: '강남치과의원 임플란트 과정', content: '1) CT 촬영 및 정밀 진단 → 2) 치료 계획 수립 및 상담 → 3) 임플란트 식립 수술 → 4) 치유 기간 (2~4개월) → 5) 보철 제작 및 장착. CEREC 시스템으로 보철 당일 완성도 가능합니다.' },
      { title: '이런 분께 추천합니다', content: '• 치아가 빠진 후 오래 방치하신 분\n• 틀니가 불편하신 분\n• 뼈가 부족하다고 진단받으신 분\n• 수술 경험이 풍부한 전문의를 찾으시는 분' }
    ]
  },
  {
    slug: 'cerec', category: '전문센터', title: '당일 보철 (CEREC)', icon: 'fa-bolt',
    h1: '당일 보철 완성 – CEREC 원데이 시스템',
    description: 'CEREC 당일 보철 시스템. 하루 만에 발수부터 크라운까지 완성합니다. 세라믹 보철 당일 제작.',
    heroDesc: '한 번 방문으로 보철까지 완성합니다',
    worry: '"치과 여러 번 가기 싫어요"', promise: '하루 만에 발수·근충·보철까지 끝냅니다',
    features: ['CEREC + SpeedFire 시스템', '발수·근충·보철 당일 완성', '디지털 스캔으로 정밀 제작', '세라믹 보철 자연치아색', '재내원 최소화'],
    isTop: true,
    sections: [
      { title: 'CEREC이란?', content: 'CEREC(Chairside Economical Restoration of Esthetic Ceramics)은 독일 시로나(Sirona)사가 개발한 디지털 보철 제작 시스템입니다. 구강 내 스캐너로 치아를 촬영하고, 컴퓨터로 보철을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만듭니다.' },
      { title: '기존 보철 vs CEREC', content: '기존: 본뜨기 → 외부 기공소 제작 (5~7일) → 재내원 장착\nCEREC: 디지털 스캔 → 설계 → 밀링 → SpeedFire 소결 → 당일 장착\n\n시간도 절약하고, 디지털 정밀도도 높아 보철 적합도가 우수합니다.' },
      { title: 'CEREC으로 가능한 치료', content: '• 크라운 (씌우기)\n• 인레이 / 온레이\n• 라미네이트\n• 브릿지 (일부)\n\n단, 모든 보철이 CEREC으로 가능한 것은 아닙니다. 진단 후 가장 적합한 방법을 안내드립니다.' }
    ]
  },
  {
    slug: 'invisalign', category: '전문센터', title: '인비절라인', icon: 'fa-teeth',
    h1: '영주 인비절라인 – 투명교정 인증의',
    description: '영주 인비절라인 투명교정. 인비절라인 인증의가 직접 교정합니다. iTero 디지털 스캐너 사용.',
    heroDesc: '눈에 띄지 않게, 인비절라인으로 교정합니다',
    worry: '"교정 티 나기 싫어요"', promise: '투명 교정장치로 일상에 지장 없이 교정합니다',
    features: ['인비절라인 인증의', 'iTero 디지털 스캐너', '맞춤형 교정 플래닝', '탈착 가능한 편의성', '3D 시뮬레이션 제공'],
    isTop: true,
    sections: [
      { title: '인비절라인이란?', content: '인비절라인은 투명한 플라스틱 교정장치를 이용한 치아교정 방법입니다. 2주마다 새로운 장치로 교체하면서 조금씩 치아를 이동시킵니다. 금속 브라켓 없이 투명하게 교정이 가능합니다.' },
      { title: '인비절라인의 장점', content: '• 투명하여 눈에 띄지 않음\n• 탈착 가능하여 식사·양치 편리\n• 3D 시뮬레이션으로 결과 미리 확인\n• 금속 알레르기 걱정 없음\n• 내원 횟수 감소' },
      { title: '교정 과정', content: '1) iTero 디지털 스캔 → 2) 3D 시뮬레이션 → 3) 맞춤 교정장치 제작 → 4) 2주마다 장치 교체 → 5) 정기 체크업 → 6) 교정 완료 후 유지장치' }
    ]
  },
  {
    slug: 'cosmetic', category: '전문센터', title: '심미보철', icon: 'fa-gem',
    h1: '심미보철 – 자연스러운 라미네이트·크라운',
    description: '심미보철 전문. 라미네이트, 올세라믹 크라운으로 자연스럽고 아름다운 치아를 만듭니다.',
    heroDesc: '디지털 스캔으로 자연스러운 보철을 만듭니다',
    worry: '"자연스러운 이를 원해요"', promise: 'CEREC으로 맞춤 제작, 자연치아와 구분이 어렵습니다',
    features: ['라미네이트·올세라믹', 'CEREC 맞춤 제작', '자연치아색 완벽 재현', 'PrimeScan 디지털 스캔', '당일 완성 가능'],
    isTop: true,
    sections: [
      { title: '심미보철이란?', content: '심미보철은 치아의 기능 회복뿐만 아니라 아름다운 외형까지 고려한 보철 치료입니다. 자연 치아와 거의 구분이 안 되는 세라믹 소재를 사용하여 색상, 투명도, 형태를 자연스럽게 구현합니다.' },
      { title: '치료 종류', content: '• 라미네이트: 치아 표면을 최소 삭제 후 얇은 세라믹 판 부착\n• 올세라믹 크라운: 금속 없이 세라믹으로만 제작한 크라운\n• 지르코니아 크라운: 높은 강도의 지르코니아 소재 사용\n• 레진 본딩: 복합레진으로 형태·색상 수복' }
    ]
  },
  {
    slug: 'wisdom-tooth', category: '전문센터', title: '사랑니 발치', icon: 'fa-hand-holding-medical',
    h1: '사랑니 발치 – 구강외과 전문의 안전 발치',
    description: '사랑니 발치 전문. 구강외과 전문의가 매복 사랑니도 안전하게 발치합니다.',
    heroDesc: '구강외과 전문의가 매복 사랑니도 안전하게 발치합니다',
    worry: '"사랑니 빼는 게 무서워요"', promise: '외과 전문의가 빠르고 안전하게 발치합니다',
    features: ['구강외과 전문의 직접 발치', 'CT 기반 정밀 진단', '매복 사랑니 전문', '최소 절개 발치', '빠른 회복'],
    isTop: true,
    sections: [
      { title: '사랑니, 꼭 빼야 하나요?', content: '모든 사랑니를 빼야 하는 것은 아닙니다. 하지만 다음의 경우 발치를 권합니다:\n• 매복되어 앞 치아를 밀고 있는 경우\n• 충치가 생기거나 반복적으로 염증이 발생하는 경우\n• 주변 잇몸에 음식물이 계속 끼는 경우\n• 교정을 위해 공간 확보가 필요한 경우' },
      { title: '왜 전문의에게 받아야 하나요?', content: '사랑니 발치, 특히 매복 사랑니 발치는 잇몸 절개, 뼈 삭제 등 외과적 술기가 필요합니다. 구강외과 전문의는 이러한 수술을 수천 건 이상 수련한 전문가로, 하악신경 손상 등의 합병증을 최소화할 수 있습니다.' }
    ]
  },
  // === 일반 ===
  {
    slug: 'cavity', category: '일반', title: '충치치료', icon: 'fa-tooth',
    h1: '충치치료 – 당일 발수·근충 가능', description: '충치치료. 당일 발수 및 근충 가능. CEREC으로 당일 보철 완성.',
    heroDesc: '초기 충치부터 심한 충치까지, 당일 치료 가능합니다', worry: '', promise: '',
    features: ['당일 발수 가능', 'CEREC 당일 보철', '레진·인레이 수복', '통증 최소화'], isTop: false,
    sections: [
      { title: '충치 단계별 치료', content: '1단계(법랑질 충치): 레진 충전\n2단계(상아질 충치): 인레이 또는 레진\n3단계(신경 근접): 신경치료 + 크라운\n4단계(뿌리 감염): 근관치료 또는 발치 후 임플란트' }
    ]
  },
  {
    slug: 'root-canal', category: '일반', title: '신경치료', icon: 'fa-syringe',
    h1: '신경치료 – 정밀 근관 치료', description: '신경치료(근관치료) 전문. 정밀한 근관 치료로 자연치아를 보존합니다.',
    heroDesc: '정밀한 근관 치료로 자연치아를 최대한 보존합니다', worry: '', promise: '',
    features: ['정밀 근관 치료', '자연치아 보존', 'CT 기반 진단', '크라운 당일 완성 가능'], isTop: false,
    sections: [
      { title: '신경치료란?', content: '충치가 깊어져 치아 내부의 신경(치수)까지 감염된 경우, 감염된 신경을 제거하고 내부를 소독·충전하는 치료입니다. 신경치료 후에는 크라운으로 씌워 치아를 보호합니다.' }
    ]
  },
  {
    slug: 'crown', category: '일반', title: '크라운', icon: 'fa-crown',
    h1: '크라운 – CEREC 당일 완성', description: '크라운(씌우기) 치료. CEREC으로 당일 크라운 완성 가능.',
    heroDesc: 'CEREC으로 하루 만에 크라운을 완성합니다', worry: '', promise: '',
    features: ['CEREC 당일 완성', '올세라믹·지르코니아', '자연스러운 색상', '정밀 디지털 제작'], isTop: false,
    sections: [
      { title: '크라운이 필요한 경우', content: '• 신경치료 후 치아 보호\n• 충치가 넓어 레진으로 수복 어려운 경우\n• 깨지거나 금이 간 치아\n• 오래된 보철 교체' }
    ]
  },
  {
    slug: 'resin', category: '일반', title: '레진', icon: 'fa-fill-drip',
    h1: '레진치료 – 자연치아색 수복', description: '레진치료. 자연치아색으로 깨끗하게 충치를 수복합니다.',
    heroDesc: '자연치아색 레진으로 깨끗하게 수복합니다', worry: '', promise: '',
    features: ['자연치아색 매칭', '최소 삭제', '당일 치료 가능', '심미성 우수'], isTop: false,
    sections: [
      { title: '레진치료란?', content: '복합 레진(Composite Resin)이라는 치아색 재료로 충치 부위를 메우는 치료입니다. 아말감(은색)과 달리 자연치아 색과 거의 동일하여 심미적으로 우수합니다.' }
    ]
  },
  {
    slug: 'whitening', category: '일반', title: '미백', icon: 'fa-sun',
    h1: '치아미백 – 전문의 관리 미백', description: '치아미백. 전문의 관리 하에 안전하고 효과적인 미백을 시행합니다.',
    heroDesc: '전문의 관리 하에 안전하고 효과적인 미백', worry: '', promise: '',
    features: ['전문의 관리 미백', '안전한 미백 약제', '자연스러운 화이트닝', '시린 증상 최소화'], isTop: false,
    sections: [
      { title: '미백 방법', content: '• 전문가 미백: 병원에서 고농도 미백제로 시행 (1~2회)\n• 자가 미백: 맞춤 트레이에 미백제를 넣어 가정에서 시행\n• 듀얼 미백: 전문가 + 자가 미백 병행 (최적의 효과)' }
    ]
  },
  // === 잇몸/외과 ===
  {
    slug: 'scaling', category: '잇몸/외과', title: '스케일링', icon: 'fa-teeth-open',
    h1: '스케일링 – 잇몸 건강 관리', description: '스케일링. 정기적인 스케일링으로 잇몸 건강을 지킵니다.',
    heroDesc: '정기적인 스케일링으로 잇몸 건강을 지킵니다', worry: '', promise: '',
    features: ['건강보험 적용 (연 1회)', '치석·치태 제거', '잇몸 질환 예방', '구취 개선'], isTop: false,
    sections: [
      { title: '스케일링이 필요한 이유', content: '치석은 칫솔질로 제거되지 않으며, 방치하면 잇몸 염증·치주질환의 원인이 됩니다. 연 1회 이상 정기 스케일링을 권장합니다. 만 19세 이상 건강보험이 적용됩니다.' }
    ]
  },
  {
    slug: 'gum', category: '잇몸/외과', title: '잇몸치료', icon: 'fa-droplet',
    h1: '잇몸치료 – 치주 관리', description: '잇몸치료(치주치료). 잇몸 염증, 치주질환을 체계적으로 관리합니다.',
    heroDesc: '잇몸 염증부터 치주질환까지 체계적으로 관리합니다', worry: '', promise: '',
    features: ['치주 정밀 검사', '비수술적 잇몸치료', '치주 수술', '정기 관리 프로그램'], isTop: false,
    sections: [
      { title: '잇몸질환 증상', content: '• 잇몸에서 피가 남\n• 잇몸이 붓고 빨개짐\n• 이가 흔들림\n• 입 냄새가 심함\n• 잇몸이 내려앉음\n\n이런 증상이 있다면 빠른 내원을 권합니다.' }
    ]
  },
  {
    slug: 'tmj', category: '잇몸/외과', title: '턱관절', icon: 'fa-head-side-medical',
    h1: '턱관절 치료', description: '턱관절 치료. 턱관절 통증, 개구장애 등을 전문적으로 치료합니다.',
    heroDesc: '턱관절 통증, 소리, 개구장애를 전문적으로 치료합니다', worry: '', promise: '',
    features: ['정밀 턱관절 검사', '스플린트 치료', '약물 치료', '생활습관 교정 지도'], isTop: false,
    sections: [
      { title: '턱관절 질환 증상', content: '• 입을 벌리거나 다물 때 통증\n• 턱에서 \"딱딱\" 소리\n• 입이 잘 안 벌어짐\n• 두통, 귀 통증 동반\n• 씹을 때 불편함' }
    ]
  },
  // === 특수 ===
  {
    slug: 'bone-graft', category: '특수', title: '뼈이식 임플란트', icon: 'fa-bone',
    h1: '뼈이식 임플란트 – 구강외과 전문의', description: '뼈이식 임플란트. 구강외과 전문의가 뼈가 부족한 경우에도 안전하게 임플란트합니다.',
    heroDesc: '뼈가 부족해도 임플란트가 가능합니다', worry: '', promise: '',
    features: ['구강외과 전문의 수술', '자가골·인공골 이식', '동시 임플란트 가능', 'CT 기반 정밀 계획'], isTop: false,
    sections: [
      { title: '뼈이식이 필요한 경우', content: '• 치아를 빼고 오래 방치하여 뼈가 흡수된 경우\n• 선천적으로 턱뼈가 얇은 경우\n• 잇몸질환으로 뼈가 소실된 경우\n• 임플란트 식립에 필요한 뼈 양이 부족한 경우\n\n구강외과 전문의가 뼈이식과 임플란트를 동시에 또는 단계적으로 시행합니다.' }
    ]
  },
  {
    slug: 'sinus-lift', category: '특수', title: '상악동 임플란트', icon: 'fa-lungs',
    h1: '상악동 거상술 임플란트', description: '상악동 거상술. 위턱 뼈가 부족한 경우 상악동을 거상하여 임플란트합니다.',
    heroDesc: '위턱 뼈가 부족해도 안전하게 임플란트가 가능합니다', worry: '', promise: '',
    features: ['상악동 거상술 전문', '구강외과 전문의 수술', 'CT 정밀 계획', '뼈이식 동시 시행'], isTop: false,
    sections: [
      { title: '상악동 거상술이란?', content: '윗어금니 부위의 뼈 위에는 상악동(부비강)이 있습니다. 치아를 빼고 시간이 지나면 뼈가 얇아져 임플란트를 심기 어렵습니다. 상악동 거상술은 상악동 점막을 살짝 올려 뼈 이식재를 넣어 임플란트를 심을 수 있는 충분한 뼈를 만드는 수술입니다.' }
    ]
  },
  {
    slug: 'denture', category: '특수', title: '틀니', icon: 'fa-teeth',
    h1: '틀니 – 맞춤형 제작', description: '틀니 맞춤 제작. 부분틀니, 전체틀니를 정밀하게 제작합니다.',
    heroDesc: '편안하고 잘 맞는 맞춤형 틀니를 제작합니다', worry: '', promise: '',
    features: ['정밀 맞춤 제작', '부분틀니·전체틀니', '임플란트 틀니', '건강보험 적용'], isTop: false,
    sections: [
      { title: '틀니 종류', content: '• 전체 틀니: 치아가 모두 없는 경우\n• 부분 틀니: 일부 치아만 없는 경우\n• 임플란트 틀니: 임플란트에 고정하여 잘 빠지지 않는 틀니\n\n만 65세 이상 건강보험이 적용됩니다 (7년 1회).' }
    ]
  },
  {
    slug: 'prevention', category: '특수', title: '예방치료', icon: 'fa-shield-halved',
    h1: '예방치료 – 정기검진', description: '예방치료 및 정기검진. 정기적인 검진과 관리로 구강 건강을 지킵니다.',
    heroDesc: '정기적인 검진과 관리로 구강 건강을 지킵니다', worry: '', promise: '',
    features: ['정기 구강검진', '불소 도포', '실란트', '구강위생 교육'], isTop: false,
    sections: [
      { title: '예방이 최고의 치료입니다', content: '6개월마다 정기 검진을 받으면 충치와 잇몸질환을 초기에 발견하여 간단한 치료로 해결할 수 있습니다. 어린이 실란트, 불소 도포 등 예방 처치도 시행합니다.' }
    ]
  }
]

export function treatmentsPage(): string {
  const categories = ['전문센터', '일반', '잇몸/외과', '특수']
  
  return `
  <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-4 text-center">
      <span class="inline-block px-4 py-1.5 bg-white/10 text-gold text-sm font-semibold rounded-full mb-4">ALL TREATMENTS</span>
      <h1 class="text-3xl md:text-5xl font-bold mb-4">강남치과의원 <span class="gold-text-gradient">전체 진료 안내</span></h1>
      <p class="text-gray-300 max-w-xl mx-auto">구강외과 전문의 2인이 직접 진료하는 프리미엄 치과진료</p>
    </div>
  </section>

  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      ${categories.map(cat => {
        const items = treatments.filter(t => t.category === cat)
        return `
        <div class="mb-16 fade-in">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <i class="fas ${cat === '전문센터' ? 'fa-star' : cat === '일반' ? 'fa-tooth' : cat === '잇몸/외과' ? 'fa-hand-holding-medical' : 'fa-award'} text-white text-sm"></i>
            </div>
            <h2 class="text-2xl font-bold text-charcoal">${cat}</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${items.map(t => `
            <a href="/treatments/${t.slug}" class="card-hover flex items-center gap-4 p-5 bg-bglight rounded-xl border border-gray-100 group">
              <div class="w-12 h-12 rounded-xl ${t.isTop ? 'gold-gradient' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0">
                <i class="fas ${t.icon} ${t.isTop ? 'text-white' : 'text-gray-500'} text-lg"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-charcoal group-hover:text-gold transition truncate">${t.title}</h3>
                <p class="text-subtext text-xs mt-0.5 truncate">${t.h1}</p>
              </div>
              <i class="fas fa-chevron-right text-gray-300 group-hover:text-gold transition text-sm"></i>
            </a>
            `).join('')}
          </div>
        </div>
        `
      }).join('')}
    </div>
  </section>

  <section class="py-16 bg-bglight">
    <div class="max-w-3xl mx-auto px-4 text-center fade-in">
      <h2 class="text-2xl md:text-3xl font-bold text-charcoal mb-4">어떤 치료가 필요한지 모르겠다면?</h2>
      <p class="text-subtext mb-8">구강외과 전문의가 직접 진단하고 최적의 치료를 안내드립니다.</p>
      <a href="/reservation" class="inline-flex items-center gap-2 px-8 py-4 btn-gold rounded-full text-base font-semibold">
        <i class="fas fa-calendar-check"></i>무료 상담 예약
      </a>
    </div>
  </section>
  `
}

export function treatmentDetailPage(slug: string): { html: string; title: string; description: string } | null {
  const t = treatments.find(tr => tr.slug === slug)
  if (!t) return null

  return {
    title: t.h1,
    description: t.description,
    html: `
    <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto px-4">
        <a href="/treatments" class="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition text-sm mb-6">
          <i class="fas fa-arrow-left"></i>전체 진료 안내로 돌아가기
        </a>
        <div class="flex items-center gap-2 mb-4">
          <span class="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full">${t.category}</span>
        </div>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">${t.h1}</h1>
        <p class="text-gray-300 text-lg max-w-2xl">${t.heroDesc}</p>
      </div>
    </section>

    ${t.worry ? `
    <section class="py-12 bg-gold-50 border-b border-gold/20">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div class="flex-1 text-center md:text-left">
            <p class="text-gold text-lg italic mb-2">${t.worry}</p>
            <p class="text-charcoal text-xl font-bold">${t.promise}</p>
          </div>
          <a href="/reservation" class="inline-flex items-center gap-2 px-6 py-3 btn-gold rounded-full text-sm font-semibold flex-shrink-0">
            <i class="fas fa-calendar-check"></i>상담 예약
          </a>
        </div>
      </div>
    </section>
    ` : ''}

    <section class="py-16 md:py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4">
        <!-- 특장점 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(t.features.length, 5)} gap-4 mb-16 fade-in">
          ${t.features.map(f => `
          <div class="text-center p-4 bg-bglight rounded-xl">
            <i class="fas fa-check-circle text-gold text-lg mb-2"></i>
            <p class="text-sm font-medium text-charcoal">${f}</p>
          </div>
          `).join('')}
        </div>

        <!-- 상세 내용 -->
        <div class="space-y-12">
          ${t.sections.map(s => `
          <div class="fade-in">
            <h2 class="text-xl md:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
              <div class="w-1.5 h-8 bg-gold rounded-full"></div>
              ${s.title}
            </h2>
            <div class="pl-5 text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">${s.content}</div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 담당 의료진 -->
    <section class="py-16 bg-bglight">
      <div class="max-w-4xl mx-auto px-4 text-center fade-in">
        <h2 class="text-2xl font-bold text-charcoal mb-8">담당 의료진</h2>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="/doctors/lee-taehyung" class="flex items-center gap-4 px-6 py-4 bg-white rounded-xl border border-gray-100 hover:border-gold transition group">
            <div class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-user-doctor text-gray-400 text-xl"></i>
            </div>
            <div class="text-left">
              <p class="font-bold text-charcoal group-hover:text-gold transition">이태형 대표원장</p>
              <p class="text-subtext text-sm">구강악안면외과 전문의</p>
            </div>
          </a>
          <a href="/doctors/choi-minhye" class="flex items-center gap-4 px-6 py-4 bg-white rounded-xl border border-gray-100 hover:border-gold transition group">
            <div class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-user-doctor text-gray-400 text-xl"></i>
            </div>
            <div class="text-left">
              <p class="font-bold text-charcoal group-hover:text-gold transition">최민혜 원장</p>
              <p class="text-subtext text-sm">구강악안면외과 전문의</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-charcoal text-white">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">${t.title}에 대해 상담받으세요</h2>
        <p class="text-gray-300 mb-8">구강외과 전문의가 직접 진단하고 설명드립니다.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/reservation" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 btn-gold rounded-full font-semibold">
            <i class="fas fa-calendar-check"></i>상담 예약하기
          </a>
          <a href="tel:054-636-8222" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition">
            <i class="fas fa-phone"></i>054-636-8222
          </a>
        </div>
      </div>
    </section>
    `
  }
}
