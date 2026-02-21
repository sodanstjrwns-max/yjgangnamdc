interface Treatment {
  slug: string; category: string; title: string; h1: string; description: string;
  icon: string; heroDesc: string; worry: string; promise: string;
  sections: { title: string; content: string }[]; features: string[]; isTop: boolean;
}

const treatments: Treatment[] = [
  { slug:'implant', category:'전문센터', title:'임플란트', icon:'fa-tooth',
    h1:'영주 임플란트 – 구강외과 전문의 직접 수술', description:'영주 강남치과의원 임플란트. 구강악안면외과 전문의가 직접 수술합니다.',
    heroDesc:'수술 전문 외과 전문의가 직접 임플란트합니다', worry:'"수술이 무서워요"', promise:'구강외과 전문의가 직접 수술하니까 안심하세요',
    features:['구강외과 전문의 직접 수술','CT 기반 정밀 진단','뼈이식·상악동 수술 가능','디지털 임플란트 가이드','네오 임플란트 사용'], isTop:true,
    sections:[
      { title:'왜 구강외과 전문의인가요?', content:'임플란트는 잇몸을 절개하고 턱뼈에 나사를 식립하는 수술입니다. 구강외과 전문의는 턱뼈와 구강 내 수술을 전문으로 수련한 전문의로, 일반 치과의사보다 외과적 수술 경험이 월등히 많습니다.' },
      { title:'강남치과의원 임플란트 과정', content:'1) CT 촬영 및 정밀 진단 → 2) 치료 계획 수립 및 상담 → 3) 임플란트 식립 수술 → 4) 치유 기간 (2~4개월) → 5) 보철 제작 및 장착. CEREC 시스템으로 보철 당일 완성도 가능합니다.' },
      { title:'이런 분께 추천합니다', content:'• 치아가 빠진 후 오래 방치하신 분\n• 틀니가 불편하신 분\n• 뼈가 부족하다고 진단받으신 분\n• 수술 경험이 풍부한 전문의를 찾으시는 분' }
    ] },
  { slug:'cerec', category:'전문센터', title:'당일 보철 (CEREC)', icon:'fa-bolt',
    h1:'당일 보철 완성 – CEREC 원데이 시스템', description:'CEREC 당일 보철 시스템. 하루 만에 발수부터 크라운까지 완성합니다.',
    heroDesc:'한 번 방문으로 보철까지 완성합니다', worry:'"치과 여러 번 가기 싫어요"', promise:'하루 만에 발수·근충·보철까지 끝냅니다',
    features:['CEREC + SpeedFire 시스템','발수·근충·보철 당일 완성','디지털 스캔으로 정밀 제작','세라믹 보철 자연치아색','재내원 최소화'], isTop:true,
    sections:[
      { title:'CEREC이란?', content:'CEREC은 독일 시로나(Sirona)사가 개발한 디지털 보철 제작 시스템입니다. 구강 내 스캐너로 치아를 촬영하고, 컴퓨터로 보철을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만듭니다.' },
      { title:'기존 보철 vs CEREC', content:'기존: 본뜨기 → 외부 기공소 제작 (5~7일) → 재내원 장착\nCEREC: 디지털 스캔 → 설계 → 밀링 → SpeedFire 소결 → 당일 장착\n\n시간도 절약하고, 디지털 정밀도도 높아 보철 적합도가 우수합니다.' },
      { title:'CEREC으로 가능한 치료', content:'• 크라운 (씌우기)\n• 인레이 / 온레이\n• 라미네이트\n• 브릿지 (일부)' }
    ] },
  { slug:'invisalign', category:'전문센터', title:'인비절라인', icon:'fa-teeth',
    h1:'영주 인비절라인 – 투명교정 인증의', description:'영주 인비절라인 투명교정. 인비절라인 인증의가 직접 교정합니다.',
    heroDesc:'눈에 띄지 않게, 인비절라인으로 교정합니다', worry:'"교정 티 나기 싫어요"', promise:'투명 교정장치로 일상에 지장 없이 교정합니다',
    features:['인비절라인 인증의','iTero 디지털 스캐너','맞춤형 교정 플래닝','탈착 가능한 편의성','3D 시뮬레이션 제공'], isTop:true,
    sections:[
      { title:'인비절라인이란?', content:'인비절라인은 투명한 플라스틱 교정장치를 이용한 치아교정 방법입니다. 2주마다 새로운 장치로 교체하면서 조금씩 치아를 이동시킵니다.' },
      { title:'인비절라인의 장점', content:'• 투명하여 눈에 띄지 않음\n• 탈착 가능하여 식사·양치 편리\n• 3D 시뮬레이션으로 결과 미리 확인\n• 금속 알레르기 걱정 없음\n• 내원 횟수 감소' },
      { title:'교정 과정', content:'1) iTero 디지털 스캔 → 2) 3D 시뮬레이션 → 3) 맞춤 교정장치 제작 → 4) 2주마다 장치 교체 → 5) 정기 체크업 → 6) 교정 완료 후 유지장치' }
    ] },
  { slug:'cosmetic', category:'전문센터', title:'심미보철', icon:'fa-gem',
    h1:'심미보철 – 자연스러운 라미네이트·크라운', description:'심미보철 전문. 라미네이트, 올세라믹 크라운으로 자연스럽고 아름다운 치아를 만듭니다.',
    heroDesc:'디지털 스캔으로 자연스러운 보철을 만듭니다', worry:'"자연스러운 이를 원해요"', promise:'CEREC으로 맞춤 제작, 자연치아와 구분이 어렵습니다',
    features:['라미네이트·올세라믹','CEREC 맞춤 제작','자연치아색 완벽 재현','PrimeScan 디지털 스캔','당일 완성 가능'], isTop:true,
    sections:[
      { title:'심미보철이란?', content:'심미보철은 치아의 기능 회복뿐만 아니라 아름다운 외형까지 고려한 보철 치료입니다.' },
      { title:'치료 종류', content:'• 라미네이트: 치아 표면을 최소 삭제 후 얇은 세라믹 판 부착\n• 올세라믹 크라운: 금속 없이 세라믹으로만 제작\n• 지르코니아 크라운: 높은 강도의 지르코니아 소재\n• 레진 본딩: 복합레진으로 형태·색상 수복' }
    ] },
  { slug:'wisdom-tooth', category:'전문센터', title:'사랑니 발치', icon:'fa-hand-holding-medical',
    h1:'사랑니 발치 – 구강외과 전문의 안전 발치', description:'사랑니 발치 전문. 구강외과 전문의가 매복 사랑니도 안전하게 발치합니다.',
    heroDesc:'구강외과 전문의가 매복 사랑니도 안전하게 발치합니다', worry:'"사랑니 빼는 게 무서워요"', promise:'외과 전문의가 빠르고 안전하게 발치합니다',
    features:['구강외과 전문의 직접 발치','CT 기반 정밀 진단','매복 사랑니 전문','최소 절개 발치','빠른 회복'], isTop:true,
    sections:[
      { title:'사랑니, 꼭 빼야 하나요?', content:'모든 사랑니를 빼야 하는 것은 아닙니다. 하지만 매복되어 앞 치아를 밀고 있거나, 충치·염증이 반복되는 경우 발치를 권합니다.' },
      { title:'왜 전문의에게 받아야 하나요?', content:'사랑니 발치, 특히 매복 사랑니 발치는 잇몸 절개, 뼈 삭제 등 외과적 술기가 필요합니다. 구강외과 전문의는 이러한 수술을 수천 건 이상 수련한 전문가입니다.' }
    ] },
  { slug:'cavity', category:'일반', title:'충치치료', icon:'fa-tooth', h1:'충치치료 – 당일 발수·근충 가능', description:'충치치료. 당일 발수 및 근충 가능.',
    heroDesc:'초기 충치부터 심한 충치까지, 당일 치료 가능합니다', worry:'', promise:'',
    features:['당일 발수 가능','CEREC 당일 보철','레진·인레이 수복','통증 최소화'], isTop:false,
    sections:[{ title:'충치 단계별 치료', content:'1단계(법랑질): 레진 충전\n2단계(상아질): 인레이 또는 레진\n3단계(신경 근접): 신경치료 + 크라운\n4단계(뿌리 감염): 근관치료 또는 발치' }] },
  { slug:'root-canal', category:'일반', title:'신경치료', icon:'fa-syringe', h1:'신경치료 – 정밀 근관 치료', description:'신경치료(근관치료) 전문.',
    heroDesc:'정밀한 근관 치료로 자연치아를 최대한 보존합니다', worry:'', promise:'',
    features:['정밀 근관 치료','자연치아 보존','CT 기반 진단','크라운 당일 완성 가능'], isTop:false,
    sections:[{ title:'신경치료란?', content:'충치가 깊어져 치아 내부의 신경(치수)까지 감염된 경우, 감염된 신경을 제거하고 내부를 소독·충전하는 치료입니다.' }] },
  { slug:'crown', category:'일반', title:'크라운', icon:'fa-crown', h1:'크라운 – CEREC 당일 완성', description:'크라운 치료. CEREC으로 당일 완성.',
    heroDesc:'CEREC으로 하루 만에 크라운을 완성합니다', worry:'', promise:'',
    features:['CEREC 당일 완성','올세라믹·지르코니아','자연스러운 색상','정밀 디지털 제작'], isTop:false,
    sections:[{ title:'크라운이 필요한 경우', content:'• 신경치료 후 치아 보호\n• 충치가 넓어 레진으로 수복 어려운 경우\n• 깨지거나 금이 간 치아\n• 오래된 보철 교체' }] },
  { slug:'resin', category:'일반', title:'레진', icon:'fa-fill-drip', h1:'레진치료 – 자연치아색 수복', description:'레진치료.',
    heroDesc:'자연치아색 레진으로 깨끗하게 수복합니다', worry:'', promise:'',
    features:['자연치아색 매칭','최소 삭제','당일 치료 가능','심미성 우수'], isTop:false,
    sections:[{ title:'레진치료란?', content:'복합 레진이라는 치아색 재료로 충치 부위를 메우는 치료입니다. 자연치아 색과 거의 동일하여 심미적으로 우수합니다.' }] },
  { slug:'whitening', category:'일반', title:'미백', icon:'fa-sun', h1:'치아미백 – 전문의 관리 미백', description:'치아미백.',
    heroDesc:'전문의 관리 하에 안전하고 효과적인 미백', worry:'', promise:'',
    features:['전문의 관리 미백','안전한 미백 약제','자연스러운 화이트닝','시린 증상 최소화'], isTop:false,
    sections:[{ title:'미백 방법', content:'• 전문가 미백: 병원에서 고농도 미백제로 시행\n• 자가 미백: 맞춤 트레이에 미백제를 넣어 가정에서 시행\n• 듀얼 미백: 전문가 + 자가 미백 병행 (최적 효과)' }] },
  { slug:'scaling', category:'잇몸/외과', title:'스케일링', icon:'fa-teeth-open', h1:'스케일링 – 잇몸 건강 관리', description:'스케일링.',
    heroDesc:'정기적인 스케일링으로 잇몸 건강을 지킵니다', worry:'', promise:'',
    features:['건강보험 적용 (연 1회)','치석·치태 제거','잇몸 질환 예방','구취 개선'], isTop:false,
    sections:[{ title:'스케일링이 필요한 이유', content:'치석은 칫솔질로 제거되지 않으며, 방치하면 잇몸 염증·치주질환의 원인이 됩니다. 연 1회 이상 정기 스케일링을 권장합니다.' }] },
  { slug:'gum', category:'잇몸/외과', title:'잇몸치료', icon:'fa-droplet', h1:'잇몸치료 – 치주 관리', description:'잇몸치료.',
    heroDesc:'잇몸 염증부터 치주질환까지 체계적으로 관리합니다', worry:'', promise:'',
    features:['치주 정밀 검사','비수술적 잇몸치료','치주 수술','정기 관리 프로그램'], isTop:false,
    sections:[{ title:'잇몸질환 증상', content:'• 잇몸에서 피가 남\n• 잇몸이 붓고 빨개짐\n• 이가 흔들림\n• 입 냄새가 심함\n• 잇몸이 내려앉음' }] },
  { slug:'tmj', category:'잇몸/외과', title:'턱관절', icon:'fa-head-side-medical', h1:'턱관절 치료', description:'턱관절 치료.',
    heroDesc:'턱관절 통증, 소리, 개구장애를 전문적으로 치료합니다', worry:'', promise:'',
    features:['정밀 턱관절 검사','스플린트 치료','약물 치료','생활습관 교정 지도'], isTop:false,
    sections:[{ title:'턱관절 질환 증상', content:'• 입을 벌리거나 다물 때 통증\n• 턱에서 소리\n• 입이 잘 안 벌어짐\n• 두통, 귀 통증 동반' }] },
  { slug:'bone-graft', category:'특수', title:'뼈이식 임플란트', icon:'fa-bone', h1:'뼈이식 임플란트 – 구강외과 전문의', description:'뼈이식 임플란트.',
    heroDesc:'뼈가 부족해도 임플란트가 가능합니다', worry:'', promise:'',
    features:['구강외과 전문의 수술','자가골·인공골 이식','동시 임플란트 가능','CT 기반 정밀 계획'], isTop:false,
    sections:[{ title:'뼈이식이 필요한 경우', content:'• 치아를 빼고 오래 방치하여 뼈가 흡수된 경우\n• 선천적으로 턱뼈가 얇은 경우\n• 잇몸질환으로 뼈가 소실된 경우' }] },
  { slug:'sinus-lift', category:'특수', title:'상악동 임플란트', icon:'fa-lungs', h1:'상악동 거상술 임플란트', description:'상악동 거상술.',
    heroDesc:'위턱 뼈가 부족해도 안전하게 임플란트가 가능합니다', worry:'', promise:'',
    features:['상악동 거상술 전문','구강외과 전문의 수술','CT 정밀 계획','뼈이식 동시 시행'], isTop:false,
    sections:[{ title:'상악동 거상술이란?', content:'윗어금니 부위의 뼈 위에는 상악동(부비강)이 있습니다. 상악동 점막을 올려 뼈 이식재를 넣어 임플란트를 심을 수 있는 충분한 뼈를 만드는 수술입니다.' }] },
  { slug:'denture', category:'특수', title:'틀니', icon:'fa-teeth', h1:'틀니 – 맞춤형 제작', description:'틀니 맞춤 제작.',
    heroDesc:'편안하고 잘 맞는 맞춤형 틀니를 제작합니다', worry:'', promise:'',
    features:['정밀 맞춤 제작','부분틀니·전체틀니','임플란트 틀니','건강보험 적용'], isTop:false,
    sections:[{ title:'틀니 종류', content:'• 전체 틀니: 치아가 모두 없는 경우\n• 부분 틀니: 일부 치아만 없는 경우\n• 임플란트 틀니: 임플란트에 고정\n\n만 65세 이상 건강보험 적용 (7년 1회).' }] },
  { slug:'prevention', category:'특수', title:'예방치료', icon:'fa-shield-halved', h1:'예방치료 – 정기검진', description:'예방치료.',
    heroDesc:'정기적인 검진과 관리로 구강 건강을 지킵니다', worry:'', promise:'',
    features:['정기 구강검진','불소 도포','실란트','구강위생 교육'], isTop:false,
    sections:[{ title:'예방이 최고의 치료입니다', content:'6개월마다 정기 검진을 받으면 충치와 잇몸질환을 초기에 발견하여 간단한 치료로 해결할 수 있습니다.' }] }
]

export function treatmentsPage(): string {
  const cats = ['전문센터','일반','잇몸/외과','특수']
  const catIcons: Record<string, string> = { '전문센터':'fa-star', '일반':'fa-tooth', '잇몸/외과':'fa-hand-holding-medical', '특수':'fa-award' }
  const catDescs: Record<string, string> = { '전문센터':'구강외과 전문의가 직접 진료하는 주력 진료', '일반':'기본적인 구강 건강을 위한 필수 진료', '잇몸/외과':'잇몸 건강과 외과적 치료', '특수':'전문적인 치과 치료 서비스' }
  return `
  <!-- Hero -->
  <section class="relative min-h-[65vh] flex items-end bg-charcoal overflow-hidden noise-overlay">
    <div class="orb orb-gold w-[600px] h-[600px] -top-64 -right-64 opacity-40"></div>
    <div class="orb orb-gold w-[300px] h-[300px] bottom-20 left-[-100px] opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-25"></div>
    <div class="gold-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-48 w-full">
      <div class="section-label section-label-white mb-8"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span>ALL TREATMENTS</div>
      <h1 class="display-xl text-white mb-6">전체 <span class="gold-grad-text">진료 안내</span></h1>
      <p class="text-white/35 text-lg max-w-lg">구강외과 전문의 2인이 직접 진료하는<br>프리미엄 치과진료 서비스</p>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
  </section>

  <!-- Treatment categories -->
  <section class="py-20 md:py-32 bg-white">
    <div class="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
      ${cats.map(cat => {
        const items = treatments.filter(t => t.category === cat)
        return `
        <div class="mb-20 reveal">
          <div class="flex items-center gap-4 mb-10">
            <div class="w-12 h-12 rounded-2xl ${cat === '전문센터' ? 'gold-grad gold-glow' : 'bg-gray-100'} flex items-center justify-center">
              <i class="fas ${catIcons[cat]} ${cat === '전문센터' ? 'text-white' : 'text-gray-400'} text-base"></i>
            </div>
            <div>
              <h2 class="text-xl font-extrabold text-charcoal">${cat}</h2>
              <p class="text-gray-400 text-sm">${catDescs[cat]}</p>
            </div>
            <div class="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent ml-4"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            ${items.map(t => `
            <a href="/treatments/${t.slug}" class="card-premium p-6 flex items-center gap-4 group stagger-item block">
              <div class="w-13 h-13 rounded-xl ${t.isTop ? 'gold-grad gold-glow' : 'bg-gray-50 border border-gray-100'} flex items-center justify-center flex-shrink-0" style="width:52px;height:52px;">
                <i class="fas ${t.icon} ${t.isTop ? 'text-white' : 'text-gray-400'} text-lg"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-charcoal group-hover:text-gold transition-colors duration-300 truncate">${t.title}</h3>
                <p class="text-gray-400 text-xs mt-1 truncate">${t.heroDesc}</p>
              </div>
              <i class="fas fa-chevron-right text-gray-200 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 text-xs"></i>
            </a>
            `).join('')}
          </div>
        </div>
        `
      }).join('')}
    </div>
  </section>

  <!-- CTA -->
  <section class="py-28 md:py-36 bg-charcoal text-white relative overflow-hidden noise-overlay">
    <div class="orb orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-15"></div>
    <div class="gold-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl gold-grad flex items-center justify-center mb-8 gold-glow">
        <i class="fas fa-stethoscope text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-white mb-6">어떤 치료가 필요한지<br><span class="gold-grad-text">모르겠다면?</span></h2>
      <p class="text-white/30 text-lg mb-10">구강외과 전문의가 직접 진단하고 최적의 치료를 안내드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>무료 상담 예약</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-white justify-center"><i class="fas fa-phone text-sm text-gold"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `
}

export function treatmentDetailPage(slug: string): { html: string; title: string; description: string } | null {
  const t = treatments.find(tr => tr.slug === slug)
  if (!t) return null
  return {
    title: t.h1, description: t.description,
    html: `
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-end bg-charcoal overflow-hidden noise-overlay">
      <div class="orb orb-gold w-[500px] h-[500px] -top-48 -right-48 opacity-30"></div>
      <div class="absolute inset-0 grid-pattern opacity-20"></div>
      <div class="gold-line-h absolute top-0 left-0 right-0"></div>

      <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-44 w-full">
        <a href="/treatments" class="inline-flex items-center gap-2 text-white/25 hover:text-gold transition-colors text-sm mb-8 font-medium">
          <i class="fas fa-arrow-left text-xs"></i>전체 진료 안내
        </a>
        <div class="flex items-center gap-3 mb-6">
          <span class="px-4 py-1.5 rounded-full glass-dark gold-border text-gold text-[11px] font-bold tracking-wide">${t.category}</span>
          ${t.isTop ? '<span class="px-4 py-1.5 rounded-full bg-gold/20 text-gold text-[11px] font-bold">주력 진료</span>' : ''}
        </div>
        <h1 class="display-lg text-white mb-6">${t.h1}</h1>
        <p class="text-white/35 text-lg max-w-2xl">${t.heroDesc}</p>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    ${t.worry ? `
    <!-- Promise bar -->
    <section class="py-10 bg-cream border-b border-gold/[0.08] relative">
      <div class="absolute inset-0 bg-gradient-to-r from-gold/[0.02] via-transparent to-gold/[0.02]"></div>
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 relative">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-1 text-center md:text-left">
            <p class="text-gold text-lg italic font-medium mb-2">${t.worry}</p>
            <p class="text-charcoal text-xl md:text-2xl font-extrabold">${t.promise}</p>
          </div>
          <a href="/reservation" class="btn-primary !text-sm flex-shrink-0"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
        </div>
      </div>
    </section>` : ''}

    <!-- Features -->
    <section class="py-20 md:py-28 bg-white">
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20 stagger-children">
          ${t.features.map(f => `
          <div class="text-center p-5 card-premium stagger-item">
            <div class="w-10 h-10 mx-auto rounded-xl gold-grad flex items-center justify-center mb-3 gold-glow">
              <i class="fas fa-check text-white text-xs"></i>
            </div>
            <p class="text-xs font-bold text-charcoal leading-tight">${f}</p>
          </div>
          `).join('')}
        </div>

        <!-- Content sections -->
        <div class="space-y-16">
          ${t.sections.map((s, i) => `
          <div class="reveal${i % 2 ? '-right' : ''}">
            <h2 class="display-md text-charcoal mb-6 flex items-center gap-4">
              <div class="w-1.5 h-10 rounded-full gold-grad flex-shrink-0"></div>
              ${s.title}
            </h2>
            <div class="pl-6 text-gray-500 text-base leading-relaxed whitespace-pre-line">${s.content}</div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Doctors -->
    <section class="py-20 bg-cream relative">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 text-center reveal">
        <div class="section-label section-label-gold mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span>담당 의료진</div>
        <h2 class="display-md text-charcoal mb-10">구강외과 전문의가<br><span class="gold-grad-text">직접 진료합니다</span></h2>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
          ${[{slug:'lee-taehyung',name:'이태형 대표원장',spec:'구강악안면외과 전문의',init:'이'},{slug:'choi-minhye',name:'최민혜 원장',spec:'구강악안면외과 전문의',init:'최'}].map(doc => `
          <a href="/doctors/${doc.slug}" class="card-premium flex items-center gap-5 px-7 py-6 group w-full sm:w-auto">
            <div class="w-16 h-16 rounded-2xl img-placeholder flex items-center justify-center gold-border-glow flex-shrink-0">
              <span class="gold-grad-text font-black text-2xl">${doc.init}</span>
            </div>
            <div class="text-left">
              <p class="font-extrabold text-charcoal group-hover:text-gold transition-colors duration-300">${doc.name}</p>
              <p class="text-gray-400 text-sm">${doc.spec}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-200 group-hover:text-gold ml-auto text-xs transition-colors"></i>
          </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-28 bg-charcoal text-white relative overflow-hidden noise-overlay">
      <div class="orb orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div class="absolute inset-0 grid-pattern opacity-15"></div>
      <div class="gold-line-h absolute top-0 left-0 right-0"></div>

      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
        <div class="w-20 h-20 mx-auto rounded-2xl gold-grad flex items-center justify-center mb-8 gold-glow">
          <i class="fas ${t.icon} text-white text-3xl"></i>
        </div>
        <h2 class="display-lg text-white mb-6">${t.title}에 대해<br><span class="gold-grad-text">상담받으세요</span></h2>
        <p class="text-white/30 text-lg mb-10">구강외과 전문의가 직접 진단하고 설명드립니다.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
          <a href="tel:054-636-8222" class="w-full sm:w-auto btn-white justify-center"><i class="fas fa-phone text-sm text-gold"></i>054-636-8222</a>
        </div>
      </div>
    </section>
    `
  }
}
