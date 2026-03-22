// ===== AEO: FAQ Schema.org 구조화 데이터 =====
export function mainPageSchemas(): object[] {
  const faqItems = [
    { q: '임플란트 비용은 얼마인가요?', a: '임플란트 비용은 잔존 뼈 상태, 뼈이식 여부, 보철 종류에 따라 달라집니다. 정확한 비용은 CT 촬영 후 상담 시 안내드립니다. 상담은 무료입니다, 부담 없이 문의해 주세요.' },
    { q: 'CEREC 당일 보철이란 무엇인가요?', a: 'CEREC은 디지털 스캐너로 치아를 촬영하고, 컴퓨터로 보철을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만드는 시스템입니다. 본 뜨고, 기공소 보내고, 기다리고, 다시 오는 과정 없이 하루 만에 보철까지 완성합니다.' },
    { q: '인비절라인은 얼마나 걸리나요?', a: '보통 6개월~2년으로, 치아 상태에 따라 다릅니다. 간단한 경우 6개월 이내에 완료되기도 합니다. 정밀 검사 후 예상 기간을 안내드립니다.' },
    { q: '사랑니를 꼭 빼야 하나요?', a: '모든 사랑니를 빼야 하는 것은 아닙니다. 매복되어 앞 치아를 밀고 있거나, 충치·염증이 반복되는 경우 발치를 권합니다. 구강악안면외과 전문의가 정확히 진단합니다.' },
    { q: '토요일에도 진료하나요?', a: '현재 평일(월~금) 09:00~17:30 진료하며, 접수마감은 17:00입니다. 점심시간은 13:00~14:00이고, 토·일·공휴일은 휴무입니다.' },
    { q: '주차가 가능한가요?', a: '네, 건물 후면에 지상 및 지하 주차장이 완비되어 있습니다. 편하게 방문해 주세요.' },
    { q: '처음 방문하면 당일 치료도 가능한가요?', a: '네, 간단한 치료(충치, 스케일링 등)는 당일 바로 시작할 수 있습니다. 임플란트 등 큰 치료는 CT 촬영 후 상담을 거쳐 최적의 치료 계획을 세운 뒤 진행합니다.' },
    { q: '뼈가 부족해도 임플란트가 가능한가요?', a: '가능합니다. 뼈이식, 상악동 거상술 등의 시술로 부족한 뼈를 보충한 후 임플란트를 식립합니다. 이러한 고난이도 수술은 구강외과 전문의의 전문 영역입니다.' },
    { q: '영주에서 임플란트 잘하는 치과가 어디인가요?', a: '강남치과의원은 구강악안면외과 전문의 2인이 직접 임플란트를 수술합니다. 뼈이식, 상악동 거상술 등 고난이도 수술까지 가능하며, 대학병원급 디지털 장비(3D CT, CEREC, PrimeScan)를 갖추고 있습니다.' },
    { q: '구강외과 전문의와 일반 치과의사는 어떻게 다른가요?', a: '구강악안면외과 전문의는 치과대학 졸업 후 대학병원에서 4년간 구강·악안면 수술 전문 수련을 받은 전문의입니다. 뼈를 보는 눈, 신경을 피하는 기술, 봉합의 정밀함이 일반 치과의사와 다릅니다. 임플란트, 사랑니 발치, 뼈이식 등 외과적 술기가 필요한 치료에 특히 전문성이 높습니다.' }
  ];

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

  // HowTo Schema — CEREC 당일 보철 프로세스 (구글 HowTo 리치 스니펫)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "CEREC 당일 보철 완성 과정",
    "description": "강남치과의원의 CEREC 시스템을 이용한 당일 보철 완성 과정입니다. 디지털 스캔부터 보철 장착까지 약 1~2시간이면 완료됩니다.",
    "totalTime": "PT2H",
    "tool": [
      { "@type": "HowToTool", "name": "CEREC MC X 밀링 머신" },
      { "@type": "HowToTool", "name": "PrimeScan 구강 스캐너" },
      { "@type": "HowToTool", "name": "SpeedFire 소성로" }
    ],
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "디지털 스캔", "text": "구강 스캐너(PrimeScan)로 치아를 3D 촬영합니다. 불편한 인상재(본뜨기)가 필요 없습니다.", "url": "https://gndentalclinic.com/treatments/cerec" },
      { "@type": "HowToStep", "position": 2, "name": "AI 보철 설계", "text": "컴퓨터가 환자의 치아에 딱 맞는 보철을 자동 설계합니다. 0.01mm 정밀도로 맞춤 제작됩니다." },
      { "@type": "HowToStep", "position": 3, "name": "밀링 제작", "text": "세라믹 블록을 CEREC MC X 밀링 머신이 깎아 보철을 만듭니다. 기공소 외주 없이 원내에서 완성합니다." },
      { "@type": "HowToStep", "position": 4, "name": "소성 및 장착", "text": "SpeedFire로 초고속 소성 후 바로 장착합니다. 자연치아와 구분이 어려운 색감을 구현합니다." }
    ]
  };

  // MedicalClinic Service Schema (더 구체적인 의료 서비스 마크업)
  const medicalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "강남치과의원",
    "url": "https://gndentalclinic.com",
    "medicalSpecialty": [
      {
        "@type": "MedicalSpecialty",
        "name": "Oral and Maxillofacial Surgery"
      }
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "임플란트 수술",
        "procedureType": "Surgical",
        "howPerformed": "구강악안면외과 전문의가 3D CT 기반 정밀 진단 후 디지털 가이드를 이용하여 임플란트를 식립합니다.",
        "preparation": "3D CT 촬영, 디지털 구강 스캔, 전문의 상담",
        "followup": "정기 경과 관찰, CEREC 당일 보철 장착 가능"
      },
      {
        "@type": "MedicalProcedure",
        "name": "CEREC 당일 보철",
        "procedureType": "Noninvasive",
        "howPerformed": "PrimeScan 디지털 스캐너로 구강을 스캔한 후, CEREC 밀링 머신으로 세라믹 보철을 원내에서 당일 제작하여 장착합니다.",
        "preparation": "디지털 구강 스캔",
        "followup": "당일 보철 장착 완료, 추가 내원 불필요"
      }
    ]
  };

  return [faqSchema, howToSchema, medicalServiceSchema];
}

export function mainPage(): string {
  // ===== Pre-build all dynamic HTML sections =====

  // Marquee items
  const marqueeItems = ['임플란트', '인비절라인', 'CEREC 당일보철', '심미보철', '사랑니발치'];
  const marqueeHtml = Array(10).fill(
    marqueeItems.map(m => `<span class="mx-10 text-sm tracking-[0.05em] text-royal/15 font-bold">${m}</span><span class="mx-3 text-royal/10">&diamondsuit;</span>`).join('')
  ).join('');

  // Why Gangnam - equipment list
  const equipList = [
    { name: '3D CT', desc: '정밀 입체 진단' },
    { name: 'CEREC', desc: '당일 보철 제작' },
    { name: 'PrimeScan', desc: '디지털 구강 스캔' },
    { name: 'iTero', desc: '교정 시뮬레이션' },
    { name: 'SpeedFire', desc: '초고속 소성' }
  ];
  const equipListHtml = equipList.map(d => `
    <div class="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-lavender border border-royal/[0.06] group-hover:bg-royal/[0.04] group-hover:border-royal/10 transition-all duration-500">
      <div class="w-2 h-2 rounded-full bg-royal flex-shrink-0"></div>
      <span class="text-charcoal text-sm font-bold">${d.name}</span>
      <span class="text-gray-400 text-xs ml-auto">${d.desc}</span>
    </div>
  `).join('');

  // Why Gangnam - bone graft tags
  const boneTags = ['뼈이식', '상악동 수술', '디지털 가이드', 'CT 정밀진단'];
  const boneTagsHtml = boneTags.map(t => `<span class="px-3.5 py-2 rounded-full bg-lavender text-charcoal text-[11px] font-bold border border-royal/[0.06]">${t}</span>`).join('');

  // Comparison - general dental
  const generalSteps = [
    { step: '1회차', desc: '상담 + CT 촬영', time: '30분', icon: 'fa-comment-dots' },
    { step: '2회차', desc: '임플란트 식립 수술', time: '1시간', icon: 'fa-syringe' },
    { step: '3회차', desc: '실밥 제거 + 경과 체크', time: '15분', icon: 'fa-scissors' },
    { step: '4회차', desc: '인상 채득 (본뜨기)', time: '30분', icon: 'fa-hand' },
    { step: '5회차', desc: '기공소 외주 제작 대기', time: '7~14일 소요', icon: 'fa-hourglass-half' },
    { step: '6회차', desc: '보철 장착', time: '30분', icon: 'fa-crown' }
  ];
  const generalStepsHtml = generalSteps.map(s => `
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0"><i class="fas ${s.icon} text-gray-400 text-xs"></i></div>
      <div class="flex-1"><div class="text-charcoal font-bold text-sm">${s.step}: ${s.desc}</div></div>
      <span class="text-gray-400 text-xs font-medium flex-shrink-0">${s.time}</span>
    </div>
  `).join('');

  // Comparison - gangnam dental
  const gangnamSteps = [
    { step: '1회차', desc: 'CT 촬영 + 전문의 상담 + 디지털 스캔', time: '40분', icon: 'fa-laptop-medical', highlight: true },
    { step: '2회차', desc: '전문의 직접 임플란트 식립', time: '1시간', icon: 'fa-user-doctor', highlight: true },
    { step: '3회차', desc: '경과 체크 + CEREC 디지털 스캔', time: '20분', icon: 'fa-wave-square', highlight: false },
    { step: '같은날', desc: 'CEREC으로 당일 보철 제작 + 장착', time: '2시간', icon: 'fa-bolt', highlight: true }
  ];
  const gangnamStepsHtml = gangnamSteps.map(s => `
    <div class="flex items-center gap-4 ${s.highlight ? 'p-3 -mx-3 rounded-2xl bg-royal/[0.03] border border-royal/[0.06]' : ''}">
      <div class="w-10 h-10 rounded-xl ${s.highlight ? 'royal-grad' : 'bg-lavender border border-royal/10'} flex items-center justify-center flex-shrink-0"><i class="fas ${s.icon} ${s.highlight ? 'text-white' : 'text-royal'} text-xs"></i></div>
      <div class="flex-1"><div class="text-charcoal font-bold text-sm">${s.step}: ${s.desc}</div></div>
      <span class="${s.highlight ? 'text-royal font-bold' : 'text-gray-400'} text-xs flex-shrink-0">${s.time}</span>
    </div>
  `).join('');

  // CEREC process steps
  const cerecSteps = [
    { step: '01', icon: 'fa-camera', title: '디지털 스캔', desc: '구강 스캐너로 치아를 3D 촬영합니다. 불편한 인상재(본뜨기)가 필요 없습니다.', time: '5분' },
    { step: '02', icon: 'fa-drafting-compass', title: 'AI 보철 설계', desc: '컴퓨터가 환자의 치아에 딱 맞는 보철을 자동 설계합니다. 0.01mm 정밀도.', time: '10분' },
    { step: '03', icon: 'fa-cog', title: '밀링 제작', desc: '세라믹 블록을 밀링 머신이 깎아 보철을 만듭니다. 기공소 외주 없이 원내 완성.', time: '15분' },
    { step: '04', icon: 'fa-fire', title: '소성 & 장착', desc: 'SpeedFire로 초고속 소성 후 바로 장착. 자연치아와 구분 어려운 색감.', time: '30분' }
  ];
  const cerecStepsHtml = cerecSteps.map((s, i) => `
    <div class="text-center stagger-item relative">
      <div class="relative z-10 mx-auto w-20 h-20 rounded-3xl royal-grad flex items-center justify-center royal-glow mb-6">
        <i class="fas ${s.icon} text-white text-2xl"></i>
        <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-royal flex items-center justify-center text-royal text-xs font-black">${s.step}</div>
      </div>
      <h3 class="text-lg font-extrabold text-charcoal mb-2">${s.title}</h3>
      <p class="text-gray-400 text-sm leading-relaxed mb-4">${s.desc}</p>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender border border-royal/[0.06]">
        <i class="fas fa-clock text-royal text-[10px]"></i>
        <span class="text-royal text-xs font-bold">약 ${s.time}</span>
      </div>
      ${i < 3 ? '<div class="hidden lg:block absolute top-24 -right-4 text-royal/20"><i class="fas fa-chevron-right text-sm"></i></div>' : ''}
    </div>
  `).join('');

  // Treatments cards
  const treatments = [
    { slug: 'implant', icon: 'fa-tooth', label: 'IMPLANT', title: '임플란트', sub: '수술이 전문인 전문의가 합니다', worry: '"임플란트 하려고 대구까지 가시려고요?"', answer: '영주에서 외과 전문의가 직접 수술합니다. 대학병원급 장비도 갖추고 있습니다.', tags: ['CT 정밀진단', '뼈이식 가능', '상악동 수술', '디지털 가이드'] },
    { slug: 'cerec', icon: 'fa-bolt', label: 'CEREC · SAME DAY', title: '당일 보철', sub: '오늘 깎고, 오늘 씌우고, 오늘 끝납니다', worry: '"치과 때문에 또 회사 빠져야 하나 고민이셨죠?"', answer: 'CEREC으로 당일 보철 완성. 한 번 방문으로 끝냅니다.', tags: ['당일 완성', '디지털 스캔', '세라믹 보철', 'SpeedFire'] },
    { slug: 'invisalign', icon: 'fa-teeth', label: 'INVISALIGN', title: '인비절라인', sub: '눈에 띄지 않게 교정합니다', worry: '"교정 티 나면 직장에서 눈치 보일까봐 망설이셨죠?"', answer: '투명교정 인비절라인으로, 눈에 띄지 않게 교정합니다.', tags: ['iTero 스캐너', '3D 시뮬레이션', '탈착 가능', '심미적'] },
    { slug: 'cosmetic', icon: 'fa-gem', label: 'COSMETIC', title: '심미보철', sub: '자연치아와 구분이 어렵습니다', worry: '"자연스러운 이를 갖고 싶어요…"', answer: 'CEREC으로 맞춤 제작, 자연치아와 구분이 어렵습니다.', tags: ['라미네이트', '올세라믹', '당일 제작', '맞춤 색상'] }
  ];
  const treatmentsHtml = treatments.map(item => `
    <a href="/treatments/${item.slug}" class="card-white p-8 md:p-10 group block stagger-item">
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-8">
          <div class="w-16 h-16 rounded-2xl royal-grad flex items-center justify-center royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas ${item.icon} text-white text-2xl"></i></div>
          <span class="text-[10px] tracking-[0.2em] text-gray-300 font-bold">${item.label}</span>
        </div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-charcoal mb-2 group-hover:text-royal transition-colors duration-500">${item.title}</h3>
        <p class="text-gray-400 text-sm mb-6 font-medium">${item.sub}</p>
        <div class="p-5 rounded-2xl bg-lavender border border-royal/[0.06] mb-6 group-hover:border-royal/15 transition-colors duration-500">
          <p class="text-royal text-sm italic mb-2 font-medium">${item.worry}</p>
          <p class="text-gray-500 text-sm leading-relaxed">${item.answer}</p>
        </div>
        <div class="flex flex-wrap gap-2 mb-8">
          ${item.tags.map(t => `<span class="px-3.5 py-1.5 rounded-full border border-royal/[0.06] text-gray-400 text-[11px] font-medium group-hover:border-royal/15 group-hover:text-royal transition-all duration-500">${t}</span>`).join('')}
        </div>
        <div class="flex items-center gap-2 text-royal text-sm font-bold group-hover:gap-4 transition-all duration-500">자세히 보기 <i class="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i></div>
      </div>
    </a>
  `).join('');

  // Patient personas
  const personas = [
    { emoji: '😰', persona: '임플란트가 필요하신 분', age: '50~70대', worry: '"뼈가 약하다고 다른 치과에서 거절당했어요…"<br>"대구까지 가야 하나 고민이에요."', solution: '구강외과 전문의 2인이 직접 수술합니다. 뼈이식·상악동 거상술 등 고난이도 수술도 일상적으로 시행합니다. 대학병원급 수술을 영주에서.', tags: ['전문의 직접 수술', '뼈이식 가능', 'CT 정밀진단'], link: '/treatments/implant' },
    { emoji: '⏰', persona: '시간이 없으신 분', age: '30~50대 직장인', worry: '"치과 때문에 하루 더 쉬어야 하나…"<br>"치료 여러 번 오는 거 정말 싫어요."', solution: 'CEREC 당일 보철 시스템으로 본뜨기·기공소 대기 없이 하루 만에 보철까지 완성합니다. 바쁜 분들을 위한 한 번 내원 솔루션.', tags: ['당일 보철 완성', '최소 내원', 'CEREC'], link: '/treatments/cerec' },
    { emoji: '😬', persona: '교정이 고민이신 분', age: '20~40대', worry: '"교정 티 나면 직장에서 어색할까봐…"<br>"철사 교정은 부담스러운데…"', solution: '인비절라인 투명교정으로 눈에 띄지 않게 교정합니다. iTero 스캐너로 교정 전후를 3D 시뮬레이션으로 미리 보실 수 있습니다.', tags: ['투명 교정', '3D 시뮬레이션', '탈착 가능'], link: '/treatments/invisalign' }
  ];
  const personasHtml = personas.map(p => `
    <div class="card-premium p-8 md:p-10 stagger-item group hover:border-royal/20">
      <div class="text-5xl mb-6">${p.emoji}</div>
      <div class="flex items-center gap-3 mb-4">
        <h3 class="text-xl font-extrabold text-charcoal">${p.persona}</h3>
        <span class="px-3 py-1 rounded-full bg-lavender text-gray-400 text-[10px] font-bold border border-royal/[0.06]">${p.age}</span>
      </div>
      <div class="p-5 rounded-2xl bg-red-50/50 border border-red-100/50 mb-6">
        <div class="flex items-start gap-3">
          <i class="fas fa-quote-left text-red-300/50 text-sm mt-1 flex-shrink-0"></i>
          <p class="text-gray-500 text-sm leading-relaxed italic">${p.worry}</p>
        </div>
      </div>
      <div class="p-5 rounded-2xl bg-royal/[0.03] border border-royal/[0.06] mb-6">
        <div class="flex items-start gap-3">
          <i class="fas fa-check-circle text-royal text-sm mt-1 flex-shrink-0"></i>
          <p class="text-gray-500 text-sm leading-relaxed">${p.solution}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 mb-6">
        ${p.tags.map(t => `<span class="px-3 py-1.5 rounded-full bg-royal/[0.04] text-royal text-[10px] font-bold border border-royal/[0.08]">${t}</span>`).join('')}
      </div>
      <a href="${p.link}" class="flex items-center gap-2 text-royal text-sm font-bold group-hover:gap-4 transition-all duration-500">맞춤 진료 보기 <i class="fas fa-arrow-right text-xs"></i></a>
    </div>
  `).join('');

  // Equipment gallery
  const equipGallery = [
    { name: '3D CT (CBCT)', desc: '0.1mm 정밀도의 3D 입체 촬영. 뼈 두께, 신경 위치, 염증 범위를 정확하게 파악합니다.', icon: 'fa-x-ray', spec: 'Voxel 0.1mm · 3D 360° · 파노라마 겸용' },
    { name: 'CEREC MC X', desc: '세라믹 블록을 정밀하게 깎아 보철을 만드는 밀링 머신. 기공소 없이 당일 완성.', icon: 'fa-cog', spec: 'Sirona CEREC · 당일 제작 · 세라믹 보철' },
    { name: 'PrimeScan', desc: '초정밀 구강 스캐너. 광학 스캔으로 치아를 3D 촬영하여 본뜨기를 대체합니다.', icon: 'fa-wave-square', spec: 'Dentsply Sirona · 디지털 인상 · 실시간 3D' },
    { name: 'iTero Element', desc: '인비절라인 전용 구강 스캐너. 교정 전후를 3D 시뮬레이션으로 미리 볼 수 있습니다.', icon: 'fa-teeth-open', spec: 'Align Technology · 교정 시뮬레이션 · 컬러 3D' },
    { name: 'SpeedFire', desc: '초고속 소성로. CEREC으로 깎은 보철을 단 15분 만에 최종 강도로 소성합니다.', icon: 'fa-fire', spec: 'Dentsply Sirona · 15분 소성 · 1600℃' },
    { name: '디지털 파노라마', desc: '전체 치아 배열과 턱뼈 상태를 한 장의 사진으로 확인하는 기본 진단 장비.', icon: 'fa-expand', spec: '전체 구강 촬영 · 턱관절 진단 · 저선량' }
  ];
  const equipGalleryHtml = equipGallery.map(e => `
    <div class="flex-shrink-0 w-[320px] md:w-[360px] card-premium p-8 stagger-item group snap-start">
      <div class="w-full h-44 rounded-2xl bg-gradient-to-br from-lavender via-white to-royal/[0.03] flex items-center justify-center mb-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
        <i class="fas ${e.icon} text-royal/15 text-6xl group-hover:text-royal/25 group-hover:scale-110 transition-all duration-500"></i>
      </div>
      <h3 class="text-lg font-extrabold text-charcoal mb-2">${e.name}</h3>
      <p class="text-gray-400 text-sm leading-relaxed mb-4">${e.desc}</p>
      <div class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-royal/[0.03] border border-royal/[0.06]">
        <i class="fas fa-microchip text-royal text-[10px]"></i>
        <span class="text-gray-500 text-xs">${e.spec}</span>
      </div>
    </div>
  `).join('');

  // First visit steps
  const visitSteps = [
    { step: 'STEP 01', title: '접수 & 상담', desc: '간단한 접수 후, 증상과 고민을 편하게 말씀해 주세요. 필요한 검사를 안내드립니다.', time: '5분', icon: 'fa-clipboard-list' },
    { step: 'STEP 02', title: '정밀 진단', desc: '3D CT 촬영과 디지털 구강 스캔으로 치아, 잇몸, 뼈 상태를 입체적으로 파악합니다.', time: '15분', icon: 'fa-x-ray' },
    { step: 'STEP 03', title: '전문의 설명', desc: '구강외과 전문의가 CT 결과를 보며 현재 상태와 치료 방법을 상세히 설명드립니다.', time: '15분', icon: 'fa-user-doctor' },
    { step: 'STEP 04', title: '치료 계획 수립', desc: '치료 방법, 기간, 비용을 투명하게 안내합니다. 환자분이 직접 선택하시면 됩니다.', time: '10분', icon: 'fa-file-medical' },
    { step: 'STEP 05', title: '치료 시작', desc: '동의하시면 당일 치료를 시작할 수 있습니다. 간단한 치료는 첫 날 바로 완료합니다.', time: '상황에 따라', icon: 'fa-play-circle' },
    { step: 'STEP 06', title: '경과 관리', desc: '치료 후 경과를 체크하고, 필요시 추가 관리를 안내드립니다. 마지막까지 책임집니다.', time: '정기 체크', icon: 'fa-heart-pulse' }
  ];
  const visitStepsHtml = visitSteps.map((s, i) => `
    <div class="flex gap-6 md:gap-8 pl-2 stagger-item">
      <div class="relative z-10 flex-shrink-0">
        <div class="w-14 md:w-16 h-14 md:h-16 rounded-2xl ${i === 0 ? 'royal-grad royal-glow' : 'bg-white border-2 border-royal/20'} flex items-center justify-center">
          <i class="fas ${s.icon} ${i === 0 ? 'text-white' : 'text-royal'} text-lg"></i>
        </div>
      </div>
      <div class="flex-1 pb-8">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-royal text-[10px] font-bold tracking-widest">${s.step}</span>
          <span class="px-3 py-1 rounded-full bg-lavender text-gray-400 text-[10px] font-bold border border-royal/[0.06]">${s.time}</span>
        </div>
        <h3 class="text-lg font-extrabold text-charcoal mb-2">${s.title}</h3>
        <p class="text-gray-400 text-sm leading-relaxed">${s.desc}</p>
      </div>
    </div>
  `).join('');

  // Doctors section
  const doctors = [
    { slug: 'lee-taehyung', name: '이태형', title: '대표원장', spec: '구강악안면외과 전문의', quote: '"한 번 오시면 됩니다. 여러 번 오실 필요 없습니다."', summary: '구강악안면외과 전문의 · 수술 전문<br>고려대 구로병원 레지던트 수료', fields: ['임플란트', '구강외과 수술', '뼈이식', '상악동 수술'], initial: '이', photo: '/static/doctors/lee-taehyung.jpg' },
    { slug: 'choi-minhye', name: '최민혜', title: '원장', spec: '구강악안면외과 전문의', quote: '"외과 전문의의 손은 다릅니다."', summary: '구강악안면외과 전문의 · 인제대 백병원 수료<br>임플란트, 틀니, 레이저 치료 전문', fields: ['임플란트', '틀니', '레이저 치료', '심미보철'], initial: '최', photo: null as string | null }
  ];
  const doctorsHtml = doctors.map(doc => `
    <a href="/doctors/${doc.slug}" class="group stagger-item block">
      <div class="card-premium overflow-hidden">
        <div class="relative h-80 md:h-[400px] overflow-hidden bg-gradient-to-br from-lavender via-white to-royal/[0.03]">
          <div class="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent z-10"></div>
          <div class="absolute top-6 right-6 w-20 h-20 border border-royal/10 rounded-full z-20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"></div>
          ${doc.photo ? `
          <img src="${doc.photo}" alt="${doc.name} ${doc.title}" class="absolute inset-0 w-full h-full object-cover z-[5] obj-top-20" loading="lazy">
          ` : `
          <div class="absolute inset-0 flex items-center justify-center z-[5]"><div class="w-32 h-32 rounded-3xl bg-white shadow-xl border border-royal/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-700"><span class="royal-grad-text text-5xl font-black">${doc.initial}</span></div></div>
          `}
          <div class="absolute bottom-0 left-0 right-0 p-8 z-20"><div class="flex items-center gap-2 mb-3"><span class="px-4 py-1.5 rounded-full royal-grad text-white text-[11px] font-bold tracking-wide">${doc.title}</span><span class="px-4 py-1.5 rounded-full bg-white/80 text-gray-600 text-[11px] font-medium backdrop-blur-lg border border-royal/10">${doc.spec}</span></div></div>
        </div>
        <div class="p-8 md:p-10">
          <h3 class="text-2xl md:text-3xl font-extrabold text-charcoal group-hover:text-royal transition-colors duration-500 mb-2">${doc.name} <span class="text-gray-400 font-medium text-lg">${doc.title}</span></h3>
          <p class="text-gray-400 text-sm mb-4">${doc.summary}</p>
          <p class="text-royal text-sm italic mb-5 font-medium">${doc.quote}</p>
          <div class="flex flex-wrap gap-2 mb-6">${doc.fields.map(f => `<span class="px-3.5 py-2 rounded-xl bg-royal/[0.04] text-royal/80 text-[11px] font-bold border border-royal/[0.08]">${f}</span>`).join('')}</div>
          <div class="flex items-center gap-2 text-royal text-sm font-bold group-hover:gap-4 transition-all duration-500">프로필 보기 <i class="fas fa-arrow-right text-xs"></i></div>
        </div>
      </div>
    </a>
  `).join('');

  // Numbers section
  const numbers = [
    { num: '2', suffix: '인', label: '구강외과 전문의', icon: 'fa-user-doctor', desc: '대학병원 수련 전문의' },
    { num: '2017', suffix: '년~', label: '영주 개원', icon: 'fa-calendar', desc: '8년 이상 지역진료' },
    { num: '1', suffix: 'DAY', label: '당일 보철 완성', icon: 'fa-bolt', desc: 'CEREC 시스템' },
    { num: '5', suffix: '+', label: '디지털 장비', icon: 'fa-microchip', desc: '최첨단 진료 환경' }
  ];
  const numbersHtml = numbers.map(item => `
    <div class="text-center p-8 md:p-10 rounded-3xl border border-royal/[0.06] bg-lavender stagger-item hover:border-royal/20 hover:shadow-lg hover:shadow-royal/[0.03] transition-all duration-500 group">
      <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas ${item.icon} text-white text-lg"></i></div>
      <div class="text-5xl md:text-6xl font-black text-charcoal mb-2 counter" data-target="${item.num}" data-suffix="${item.suffix}">0</div>
      <div class="text-gray-500 font-bold text-sm mb-1">${item.label}</div>
      <div class="text-gray-300 text-xs">${item.desc}</div>
    </div>
  `).join('');

  // Area access
  const areas = [
    { area: '영주시내', time: '10분', km: '5km 이내' },
    { area: '풍기', time: '15분', km: '12km' },
    { area: '봉화', time: '30분', km: '25km' },
    { area: '예천', time: '35분', km: '30km' },
    { area: '안동', time: '40분', km: '38km' },
    { area: '단양', time: '45분', km: '40km' }
  ];
  const areasHtml = areas.map(a => `
    <a href="/area/${encodeURIComponent(a.area)}" class="card-premium p-6 text-center stagger-item group hover:border-royal/20">
      <div class="w-12 h-12 mx-auto rounded-xl bg-royal/[0.06] border border-royal/10 flex items-center justify-center mb-4 group-hover:bg-royal/10 transition-colors">
        <i class="fas fa-car text-royal text-sm"></i>
      </div>
      <div class="text-charcoal font-extrabold mb-1">${a.area}</div>
      <div class="text-royal font-bold text-lg mb-0.5">~${a.time}</div>
      <div class="text-gray-400 text-[11px]">${a.km}</div>
    </a>
  `).join('');

  // Stars for reviews
  const starsHtml = Array(5).fill('<i class="fas fa-star text-royal text-2xl"></i>').join('');

  // FAQ items
  const faqItems = [
    { q: '임플란트 비용은 얼마인가요?', a: '임플란트 비용은 잔존 뼈 상태, 뼈이식 여부, 보철 종류에 따라 달라집니다. 정확한 비용은 CT 촬영 후 상담 시 안내드립니다. 상담은 무료입니다, 부담 없이 문의해 주세요.' },
    { q: 'CEREC 당일 보철이란 무엇인가요?', a: 'CEREC은 디지털 스캐너로 치아를 촬영하고, 컴퓨터로 보철을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만드는 시스템입니다. 본 뜨고, 기공소 보내고, 기다리고, 다시 오는 과정 없이 하루 만에 보철까지 완성합니다.' },
    { q: '인비절라인은 얼마나 걸리나요?', a: '보통 6개월~2년으로, 치아 상태에 따라 다릅니다. 간단한 경우 6개월 이내에 완료되기도 합니다. 정밀 검사 후 예상 기간을 안내드립니다.' },
    { q: '사랑니를 꼭 빼야 하나요?', a: '모든 사랑니를 빼야 하는 것은 아닙니다. 매복되어 앞 치아를 밀고 있거나, 충치·염증이 반복되는 경우 발치를 권합니다. 구강악안면외과 전문의가 정확히 진단합니다.' },
    { q: '토요일에도 진료하나요?', a: '현재 평일(월~금) 09:00~17:30 진료하며, 접수마감은 17:00입니다. 점심시간은 13:00~14:00이고, 토·일·공휴일은 휴무입니다.' },
    { q: '주차가 가능한가요?', a: '네, 건물 후면에 지상 및 지하 주차장이 완비되어 있습니다. 편하게 방문해 주세요.' },
    { q: '처음 방문하면 당일 치료도 가능한가요?', a: '네, 간단한 치료(충치, 스케일링 등)는 당일 바로 시작할 수 있습니다. 임플란트 등 큰 치료는 CT 촬영 후 상담을 거쳐 최적의 치료 계획을 세운 뒤 진행합니다.' },
    { q: '뼈가 부족해도 임플란트가 가능한가요?', a: '가능합니다. 뼈이식, 상악동 거상술 등의 시술로 부족한 뼈를 보충한 후 임플란트를 식립합니다. 이러한 고난이도 수술은 구강외과 전문의의 전문 영역입니다.' }
  ];
  const faqHtml = faqItems.map(item => `
    <details class="group card-premium stagger-item">
      <summary class="flex items-center justify-between p-7 md:p-8 cursor-pointer select-none">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-royal/[0.06] flex items-center justify-center flex-shrink-0 border border-royal/[0.08] group-hover:bg-royal/10 transition-colors"><span class="text-royal font-extrabold text-sm">Q</span></div>
          <h3 class="font-bold text-charcoal text-left text-[15px]">${item.q}</h3>
        </div>
        <div class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 ml-4 faq-icon transition-all duration-300 group-hover:border-royal/30 group-hover:bg-royal/5"><i class="fas fa-plus text-gray-400 text-xs group-hover:text-royal transition-colors"></i></div>
      </summary>
      <div class="px-7 md:px-8 pb-7 md:pb-8"><div class="pl-[60px] text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-6">${item.a}</div></div>
    </details>
  `).join('');


  // ===== MAIN TEMPLATE =====
  return `

  <!-- ========== HERO — WHITE + ROYAL PURPLE ========== -->
  <section class="relative min-h-screen flex items-center overflow-hidden hero-white" id="hero" aria-label="강남치과의원 메인 히어로" itemscope itemtype="https://schema.org/WPHeader">
    <!-- CSS Particle Background (lightweight replacement for Three.js) -->
    <div class="absolute inset-0 z-[1]">
      <div class="css-particles">
        ${Array.from({length: 30}, (_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = 2 + Math.random() * 4;
          const dur = 15 + Math.random() * 25;
          const delay = Math.random() * -30;
          const opacity = 0.08 + Math.random() * 0.15;
          return `<div class="css-particle" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;opacity:${opacity};"></div>`;
        }).join('')}
      </div>
    </div>

    <!-- Subtle patterns -->
    <div class="absolute inset-0 grid-pattern opacity-60 z-[2]"></div>
    
    <!-- Decorative orbs -->
    <div class="absolute -top-32 -right-32 w-[600px] h-[600px] bg-royal/[0.04] rounded-full blur-[150px] z-[2]"></div>
    <div class="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-royal-100/[0.15] rounded-full blur-[150px] z-[2]"></div>

    <!-- Content -->
    <div class="relative max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 w-full py-36 md:py-0 z-overlay-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-screen">

        <!-- Left: Copy (7 cols) -->
        <div class="lg:col-span-7 pt-20 md:pt-0">
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-royal/10 bg-white/80 backdrop-blur-xl mb-10 shadow-sm" id="heroTag">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-royal"></span>
            </span>
            <span class="text-royal text-[13px] font-bold">구강악안면외과 전문의 2인 직접 진료</span>
          </div>

          <h1 class="display-hero text-charcoal mb-8" id="heroTitle" data-speakable="true">
            <span class="block overflow-hidden">
              <span class="block" id="heroLine1">외과 전문의 2명이</span>
            </span>
            <span class="block overflow-hidden">
              <span class="block royal-grad-text" id="heroLine2">직접 수술합니다</span>
            </span>
          </h1>

          <p class="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-xl" id="heroSub" data-speakable="true">
            <span>영주 강남치과의원 — 구강악안면외과 전문의 2인이 임플란트, CEREC 당일보철, 인비절라인을 직접 진료합니다.</span><br>
            <span>임플란트는 뼈에 심는 수술입니다.</span>
            <span>수술 전문 외과 전문의가 직접 합니다. <strong class="text-royal font-semibold">한 번 오시면 됩니다.</strong></span>
          </p>

          <div class="flex flex-wrap gap-4 mb-16" id="heroCTA">
            <a href="/reservation" class="btn-primary !py-5 !px-12 !text-[15px] !font-extrabold group">
              <i class="fas fa-calendar-check"></i>
              상담은 무료입니다
              <i class="fas fa-arrow-right text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
            </a>
            <a href="/pricing" class="btn-subtle !py-5 !px-10">
              <i class="fas fa-won-sign text-sm text-royal"></i>비용 안내
            </a>
          </div>

          <div class="flex flex-wrap gap-3" id="heroStats">
            <div class="flex items-center gap-3 px-5 py-3 rounded-2xl border border-royal/10 bg-white/80 shadow-sm">
              <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center pulse-royal-anim">
                <i class="fas fa-user-doctor text-white text-sm" aria-hidden="true"></i>
              </div>
              <div>
                <div class="text-charcoal font-extrabold text-base leading-none">전문의 <span class="counter royal-grad-text text-lg" data-target="2">0</span>인</div>
                <div class="text-gray-400 text-[10px] mt-0.5 tracking-wide">구강악안면외과</div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-5 py-3 rounded-2xl border border-royal/10 bg-white/80 shadow-sm">
              <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center pulse-royal-d1">
                <i class="fas fa-bolt text-white text-sm" aria-hidden="true"></i>
              </div>
              <div>
                <div class="text-charcoal font-extrabold text-base leading-none">당일 완성</div>
                <div class="text-gray-400 text-[10px] mt-0.5 tracking-wide">CEREC SYSTEM</div>
              </div>
            </div>
            <div class="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border border-royal/10 bg-white/80 shadow-sm">
              <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center pulse-royal-d2">
                <i class="fas fa-microchip text-white text-sm" aria-hidden="true"></i>
              </div>
              <div>
                <div class="text-charcoal font-extrabold text-base leading-none">디지털 <span class="counter royal-grad-text text-lg" data-target="5" data-suffix="+">0</span></div>
                <div class="text-gray-400 text-[10px] mt-0.5 tracking-wide">최첨단 장비</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: 3D Implant Model (Sketchfab) -->
        <div class="lg:col-span-5 hidden lg:flex items-center justify-center" id="heroVisual">
          <div class="relative">
            <!-- Sketchfab 3D Implant Viewer (bigger size) -->
            <div class="relative w-[540px] h-[640px]">
              <iframe 
                id="iframeImplant"
                title="3D Dental Implant" 
                frameborder="0" 
                allowfullscreen 
                mozallowfullscreen="true" 
                webkitallowfullscreen="true" 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                src="https://sketchfab.com/models/dcfc91171cd34b6780a23a42effd29fc/embed?autospin=0.3&autostart=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&camera=0&preload=1&ui_hint=0&ui_controls=0"
                style="width:100%; height:100%; border:none; border-radius:24px;"
                loading="lazy"
              ></iframe>
              <!-- Overlay to hide Sketchfab branding — top/bottom/corners -->
              <div class="absolute top-0 left-0 right-0 h-24 rounded-t-3xl pointer-events-none z-overlay-5 sf-overlay-top" aria-hidden="true"></div>
              <div class="absolute top-0 left-0 w-48 h-20 rounded-tl-3xl pointer-events-none z-overlay-6 sf-overlay-corner" aria-hidden="true"></div>
              <div class="absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl pointer-events-none z-overlay-5 sf-overlay-bottom" aria-hidden="true"></div>
            </div>
            
            <!-- Glow behind -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full pointer-events-none implant-glow z-behind" aria-hidden="true"></div>

            <!-- Floating labels - Implant -->
            <div class="float-label top-[5%] -left-8">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center"><i class="fas fa-shield-halved text-blue-500 text-xs"></i></div>
                <div><div class="text-charcoal text-[12px] font-bold">티타늄 픽스쳐</div><div class="text-gray-400 text-[10px]">생체적합성 99.9%</div></div>
              </div>
            </div>

            <div class="float-label float-label-d1 top-[38%] -right-12">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl royal-grad flex items-center justify-center"><i class="fas fa-user-doctor text-white text-xs"></i></div>
                <div><div class="text-charcoal text-[12px] font-bold">전문의 직접 수술</div><div class="text-gray-400 text-[10px]">구강악안면외과 전문의</div></div>
              </div>
            </div>

            <div class="float-label float-label-d2 bottom-[12%] -left-6">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center"><i class="fas fa-bolt text-amber-500 text-xs"></i></div>
                <div><div class="text-charcoal text-[12px] font-bold">3D 정밀식립</div><div class="text-gray-400 text-[10px]">디지털 가이드 수술</div></div>
              </div>
            </div>

            <!-- Drag hint -->
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-300 text-[10px] tracking-wider font-medium pointer-events-none z-overlay-20" style="animation: fadeInOut 3s ease-in-out infinite;" aria-hidden="true">
              <i class="fas fa-hand-pointer text-royal/40"></i>
              <span>드래그하여 360° 회전</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-overlay-10" aria-hidden="true">
      <span class="text-[9px] tracking-[0.3em] text-gray-300 uppercase font-semibold">Scroll Down</span>
      <div class="w-[22px] h-[36px] rounded-full border border-gray-300 flex items-start justify-center p-1.5">
        <div class="w-[3px] h-[8px] rounded-full bg-royal animate-bounce"></div>
      </div>
    </div>

    <script>
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl.from('#heroTag',{opacity:0,y:30,duration:0.8,ease:'power4.out'})
        .from('#heroLine1',{y:'110%',duration:1,ease:'power4.out'},'-=0.4')
        .from('#heroLine2',{y:'110%',duration:1,ease:'power4.out'},'-=0.7')
        .from('#heroSub',{opacity:0,y:30,duration:0.8,ease:'power3.out'},'-=0.5')
        .from('#heroCTA',{opacity:0,y:20,duration:0.7,ease:'power3.out'},'-=0.4')
        .from('#heroStats',{opacity:0,y:20,duration:0.7,ease:'power3.out'},'-=0.3')
        .from('#heroVisual',{opacity:0,x:80,scale:0.95,duration:1.2,ease:'power4.out'},'-=1');
    </script>
  </section>

  <!-- ========== TRANSITION MARQUEE ========== -->
  <div class="relative bg-lavender py-6 overflow-hidden border-y border-royal/[0.06]">
    <div class="flex whitespace-nowrap marquee-track">
      ${marqueeHtml}
    </div>
  </div>

  <!-- ========== WHY GANGNAM — 환자 관점 차별점 ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden" aria-label="강남치과 차별점">
    <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-royal/[0.02] rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative">
      <div class="text-center mb-24 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>WHY GANGNAM DENTAL</div>
        <h2 class="display-xl text-charcoal mb-6" data-speakable="true">왜 <span class="royal-grad-text">강남치과</span>일까요?</h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed" data-speakable="true">영주에서 대학병원 수준의 치과 수술을,<br class="hidden md:block">동네 치과의 편안함으로.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 stagger-children">
        <div class="lg:col-span-7 card-premium p-10 md:p-14 flex flex-col justify-between min-h-[480px] stagger-item relative group">
          <div class="absolute top-0 right-0 w-64 h-64 bg-royal/[0.03] rounded-full blur-[100px] group-hover:bg-royal/[0.06] transition-all duration-1000"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 rounded-2xl royal-grad flex items-center justify-center royal-glow"><i class="fas fa-user-doctor text-white text-2xl"></i></div>
              <div><div class="text-[11px] tracking-[0.15em] text-gray-300 font-bold uppercase">Specialist Surgeons</div><div class="mt-1 px-3 py-1 rounded-full royal-accent-bg text-royal text-[10px] font-bold inline-block">전문의 인증</div></div>
            </div>
            <p class="text-royal text-lg italic font-medium mb-4">"임플란트 수술 안전하게 해주는 거지?"</p>
            <h3 class="text-3xl md:text-4xl font-extrabold text-charcoal mb-4 leading-tight">임플란트는 뼈에 심는 수술입니다.<br><span class="royal-grad-text">수술 전문 외과 전문의가 직접 합니다.</span></h3>
            <p class="text-gray-400 text-base leading-relaxed max-w-lg">일반 치과의사와 외과 전문의는 다릅니다.<br>구강악안면외과 전문의 2인이 상주하며,<br>뼈이식, 상악동 수술 등 <strong class="text-charcoal">고난이도 수술</strong>을 일상적으로 시행합니다.</p>
          </div>
          <div class="relative z-10 mt-10 flex items-center gap-6 pt-8 border-t border-gray-100">
            <div class="flex -space-x-3">
              <div class="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                <img src="/static/doctors/lee-taehyung.jpg" alt="이태형 대표원장 - 구강악안면외과 전문의" class="w-full h-full object-cover obj-top-20">
              </div>
              <div class="w-14 h-14 rounded-2xl bg-royal-100 flex items-center justify-center text-royal text-lg font-bold border-2 border-white shadow-lg">최</div>
            </div>
            <div><div class="text-charcoal font-bold">이태형 · 최민혜 원장</div><div class="text-gray-400 text-sm">구강악안면외과 전문의</div></div>
            <a href="/doctors" class="ml-auto hidden md:inline-flex items-center gap-2 text-royal text-sm font-bold hover:gap-3 transition-all">의료진 보기 <i class="fas fa-arrow-right text-xs"></i></a>
          </div>
        </div>
        <div class="lg:col-span-5 card-premium p-10 md:p-12 flex flex-col justify-between min-h-[480px] stagger-item group">
          <div>
            <div class="flex items-center justify-between mb-8">
              <div class="w-16 h-16 rounded-2xl royal-grad flex items-center justify-center royal-glow"><i class="fas fa-bolt text-white text-2xl"></i></div>
              <div class="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold tracking-wider uppercase border border-emerald-100">1 DAY</div>
            </div>
            <p class="text-royal text-base italic font-medium mb-4">"여러 번 안 가도 되는 거야?"</p>
            <h3 class="text-2xl md:text-3xl font-extrabold text-charcoal mb-3 leading-tight">오늘 깎고, 오늘 씌우고,<br><span class="royal-grad-text">오늘 끝납니다.</span></h3>
            <p class="text-gray-400 leading-relaxed">치과 안에서 보철을 직접 만들기 때문에,<br>기공소에 보내고 기다리는 시간이 없습니다.<br><strong class="text-charcoal">한 번 방문으로 끝.</strong></p>
          </div>
          <div class="mt-8">
            <div class="flex items-center gap-6 py-5 border-t border-gray-100">
              <div class="text-center"><div class="text-3xl font-black text-charcoal">1<span class="text-royal text-lg">회</span></div><div class="text-gray-400 text-xs mt-0.5">내원 횟수</div></div>
              <div class="w-px h-10 bg-gray-100"></div>
              <div class="text-center"><div class="text-3xl font-black text-charcoal">2<span class="text-royal text-lg">시간</span></div><div class="text-gray-400 text-xs mt-0.5">평균 치료</div></div>
              <div class="w-px h-10 bg-gray-100"></div>
              <div class="text-center"><div class="text-3xl font-black text-charcoal">10<span class="text-royal text-lg">년+</span></div><div class="text-gray-400 text-xs mt-0.5">보철 수명</div></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 card-premium p-8 md:p-10 stagger-item bg-gradient-to-br from-white to-royal/[0.02]">
          <div class="w-14 h-14 rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-clock text-white text-xl"></i></div>
          <p class="text-royal text-sm italic font-medium mb-3">"시간 없는데, 빨리 끝나나?"</p>
          <h3 class="text-xl font-extrabold text-charcoal mb-3">불필요한 재내원을<br>최소화합니다</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">당일 발수, 당일 근충, 당일 보철 완성.<br>바쁜 분들을 위한 치과입니다.</p>
          <div class="relative py-6">
            <div class="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-royal via-royal/50 to-royal/10"></div>
            <div class="space-y-6 pl-12 relative">
              <div><div class="absolute left-3.5 w-3 h-3 rounded-full bg-royal shadow-lg shadow-royal/30"></div><div class="text-charcoal font-bold text-sm">정밀 진단</div><div class="text-gray-400 text-xs">CT + 디지털 스캔</div></div>
              <div><div class="absolute left-3.5 w-3 h-3 rounded-full bg-royal/60"></div><div class="text-charcoal font-bold text-sm">맞춤 치료 계획</div><div class="text-gray-400 text-xs">전문의 상담</div></div>
              <div><div class="absolute left-3.5 w-3 h-3 rounded-full bg-royal/30"></div><div class="text-charcoal font-bold text-sm">당일 완성</div><div class="text-gray-400 text-xs">최소 내원 · 하루 완료</div></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4 card-premium p-8 md:p-10 stagger-item group">
          <div class="w-14 h-14 rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-microchip text-white text-xl"></i></div>
          <p class="text-royal text-sm italic font-medium mb-3">"최신 장비가 뭐가 좋은 건데?"</p>
          <h3 class="text-xl font-extrabold text-charcoal mb-3">디지털 스캔으로<br>본을 뜨지 않습니다</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">불편한 인상재 대신 구강스캐너로 정밀하게.<br>CT로 수술 전 시뮬레이션까지.</p>
          <div class="space-y-2.5">
            ${equipListHtml}
          </div>
        </div>
        <div class="lg:col-span-4 card-premium p-8 md:p-10 stagger-item relative overflow-hidden">
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-royal/[0.03] rounded-full blur-[60px]"></div>
          <div class="relative z-10">
            <div class="w-14 h-14 rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-bone text-white text-xl"></i></div>
            <p class="text-royal text-sm italic font-medium mb-3">"뼈가 부족해도 할 수 있어?"</p>
            <h3 class="text-xl font-extrabold text-charcoal mb-3">뼈가 부족하다고<br>포기하지 마세요</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">뼈이식, 상악동 거상술은<br>구강외과 전문의의 전문 영역입니다.</p>
            <div class="flex flex-wrap gap-2">
              ${boneTagsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== 일반 치과 vs 강남치과 비교 ========== -->
  <section class="py-32 md:py-48 section-lavender relative overflow-hidden" aria-label="일반치과와 강남치과 비교">
    <div class="orb orb-royal w-[600px] h-[600px] -top-48 -left-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-20 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>COMPARISON</div>
        <h2 class="display-xl text-charcoal mb-6" data-speakable="true">일반 치과와<br><span class="royal-grad-text">무엇이 다를까요?</span></h2>
        <p class="text-gray-400 text-lg" data-speakable="true">같은 임플란트, 같은 보철이라도 과정이 다릅니다. 강남치과의원은 구강외과 전문의가 직접 수술하고, CEREC 시스템으로 당일 보철을 완성하여 최대 50% 내원 횟수를 줄입니다.</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto stagger-children">
        <!-- 일반 치과 -->
        <div class="card-premium p-8 md:p-10 stagger-item border-gray-200 relative">
          <div class="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-gray-100 text-gray-400 text-[10px] font-bold">일반 치과</div>
          <div class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-6"><i class="fas fa-tooth text-gray-400 text-xl"></i></div>
          <h3 class="text-xl font-extrabold text-charcoal mb-6">보통 이렇게 진행됩니다</h3>
          <div class="space-y-5">
            ${generalStepsHtml}
          </div>
          <div class="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <div class="flex items-center gap-3"><i class="fas fa-calendar text-gray-400"></i><div><div class="text-charcoal font-bold">총 6회 내원</div><div class="text-gray-400 text-xs">약 2~3개월 소요</div></div></div>
          </div>
        </div>
        <!-- 강남치과 -->
        <div class="card-premium p-8 md:p-10 stagger-item relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 royal-grad"></div>
          <div class="absolute top-6 right-6 px-4 py-1.5 rounded-full royal-grad text-white text-[10px] font-bold">강남치과</div>
          <div class="w-14 h-14 rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-tooth text-white text-xl"></i></div>
          <h3 class="text-xl font-extrabold text-charcoal mb-6">강남치과는 <span class="royal-grad-text">이렇게</span> 합니다</h3>
          <div class="space-y-5">
            ${gangnamStepsHtml}
          </div>
          <div class="mt-8 p-5 rounded-2xl bg-royal/[0.04] border border-royal/[0.1]">
            <div class="flex items-center gap-3"><i class="fas fa-check-circle text-royal text-lg"></i><div><div class="text-charcoal font-bold">총 3~4회 내원 <span class="royal-grad-text">(최대 50% 단축)</span></div><div class="text-gray-400 text-xs">CEREC 당일 보철로 기공소 대기 0일</div></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== CEREC 프로세스 인포그래픽 ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden" aria-label="CEREC 당일보철 프로세스">
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-royal/[0.02] rounded-full blur-[200px]"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-20 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>CEREC PROCESS</div>
        <h2 class="display-xl text-charcoal mb-6">본 뜨지 않습니다.<br><span class="royal-grad-text">당일 보철 완성 과정</span></h2>
        <p class="text-gray-400 text-lg">CEREC 시스템은 이렇게 작동합니다</p>
      </div>
      <div class="relative max-w-5xl mx-auto">
        <!-- Connection line (desktop) -->
        <div class="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-royal/10 via-royal/30 to-royal/10"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          ${cerecStepsHtml}
        </div>
        <div class="text-center mt-14 reveal">
          <div class="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-royal/[0.04] border border-royal/[0.08]">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center"><i class="fas fa-check text-emerald-500 text-lg"></i></div>
            <div class="text-left"><div class="text-charcoal font-extrabold">총 소요시간: 약 1~2시간</div><div class="text-gray-400 text-sm">하루 만에 보철 완성. 추가 내원 불필요.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== TREATMENTS — 환자 공감 카피 ========== -->
  <section class="py-32 md:py-48 section-lavender relative overflow-hidden" id="treatments" aria-label="주력 진료 안내">
    <div class="orb orb-royal w-[700px] h-[700px] -top-96 right-0 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-24 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>TREATMENTS</div>
        <h2 class="display-xl text-charcoal mb-6">강남치과의원<br><span class="royal-grad-text">주력 진료</span></h2>
        <p class="text-gray-400 text-lg max-w-xl mx-auto">각 분야 전문의가 직접 진료합니다</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
        ${treatmentsHtml}
      </div>
      <div class="mt-6 reveal">
        <a href="/treatments/wisdom-tooth" class="card-white p-8 md:p-10 group block">
          <div class="flex flex-col md:flex-row md:items-center gap-6">
            <div class="w-16 h-16 rounded-2xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-hand-holding-medical text-white text-2xl"></i></div>
            <div class="flex-1"><h3 class="text-xl md:text-2xl font-extrabold text-charcoal group-hover:text-royal transition-colors duration-500">사랑니 발치 — 구강외과 전문의가 직접 발치합니다</h3><p class="text-gray-400 text-sm mt-2">매복 사랑니도 안전하게. CT 정밀 진단 · 최소 절개 · 빠른 회복</p></div>
            <div class="flex items-center gap-2 text-royal text-sm font-bold group-hover:gap-4 transition-all duration-500 flex-shrink-0">자세히 <i class="fas fa-arrow-right text-xs"></i></div>
          </div>
        </a>
      </div>
      <div class="text-center mt-16 reveal"><a href="/treatments" class="btn-outline !py-5 !px-12 !text-[14px]">전체 진료 보기 <i class="fas fa-arrow-right text-xs ml-1"></i></a></div>
    </div>
  </section>

  <!-- ========== 환자 페르소나 공감 섹션 ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden" aria-label="환자 유형별 솔루션">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-royal/[0.02] rounded-full blur-[200px]"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-20 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FOR YOU</div>
        <h2 class="display-xl text-charcoal mb-6">이런 고민이시라면,<br><span class="royal-grad-text">딱 맞는 치과입니다</span></h2>
        <p class="text-gray-400 text-lg">각 상황에 맞는 최적의 솔루션을 제안드립니다</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        ${personasHtml}
      </div>
    </div>
  </section>

  <!-- ========== 장비 갤러리 (가로 스크롤) ========== -->
  <section class="py-32 md:py-48 section-lavender relative overflow-hidden" aria-label="대학병원급 디지털 장비">
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-16 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>EQUIPMENT</div>
        <h2 class="display-xl text-charcoal mb-6">대학병원급<br><span class="royal-grad-text">디지털 장비</span></h2>
        <p class="text-gray-400 text-lg">정확한 진단과 빠른 치료를 위한 최첨단 장비를 갖추고 있습니다</p>
      </div>
      <div class="flex gap-5 overflow-x-auto snap-x pb-6 -mx-6 px-6 scrollbar-none stagger-children">
        ${equipGalleryHtml}
      </div>
      <div class="text-center mt-4"><span class="text-gray-300 text-xs"><i class="fas fa-arrows-left-right mr-1"></i>좌우로 스크롤하세요</span></div>
    </div>
  </section>

  <!-- ========== 첫 방문 가이드 (진료 흐름도) ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden" aria-label="첫 방문 가이드">
    <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-royal/[0.02] rounded-full blur-[200px] -translate-x-1/2"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div class="lg:col-span-4 lg:sticky lg:top-32 reveal">
          <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FIRST VISIT</div>
          <h2 class="display-lg text-charcoal mb-6">처음 오시나요?<br><span class="royal-grad-text">이렇게 진행됩니다</span></h2>
          <p class="text-gray-400 leading-relaxed mb-8">첫 방문부터 치료 완료까지,<br>모든 과정을 미리 알려드립니다.<br>불안함 없이 편하게 오세요.</p>
          <a href="/reservation" class="btn-primary !text-sm !py-4 !px-8"><i class="fas fa-calendar-check text-xs"></i>첫 방문 예약하기</a>
        </div>
        <div class="lg:col-span-8">
          <div class="relative">
            <!-- Vertical line -->
            <div class="absolute left-8 md:left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-royal via-royal/40 to-royal/10"></div>
            <div class="space-y-8 stagger-children">
              ${visitStepsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== DOCTORS — 스토리형 소개 요약 ========== -->
  <section class="py-32 md:py-48 section-lavender relative overflow-hidden" aria-label="의료진 소개">
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-royal/[0.02] rounded-full blur-[200px]"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
      <div class="text-center mb-24 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>DOCTORS</div>
        <h2 class="display-xl text-charcoal mb-6">수술이 전문인<br><span class="royal-grad-text">전문의가 합니다</span></h2>
        <p class="text-gray-400 text-lg">일반 치과의사가 아닌, 외과 전문의가 직접 임플란트를 식립합니다</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto stagger-children">
        ${doctorsHtml}
      </div>
    </div>
  </section>

  <!-- ========== NUMBERS ========== -->
  <section class="py-28 md:py-36 bg-white relative overflow-hidden" aria-label="강남치과 핵심 수치">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 stagger-children">
        ${numbersHtml}
      </div>
    </div>
  </section>

  <!-- ========== 주변 지역 접근성 ========== -->
  <section class="py-28 md:py-36 section-lavender relative overflow-hidden" aria-label="주변 지역 접근성">
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-16 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>ACCESS</div>
        <h2 class="display-lg text-charcoal mb-6">영주 근처라면<br><span class="royal-grad-text">가까운 전문의 치과입니다</span></h2>
        <p class="text-gray-400 text-lg">주변 지역에서 편하게 방문하실 수 있습니다</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
        ${areasHtml}
      </div>
      <div class="text-center mt-10 reveal">
        <a href="/directions" class="btn-subtle !py-4 !px-10 !text-sm"><i class="fas fa-map-marker-alt text-royal text-xs mr-1"></i>오시는 길 자세히 보기</a>
      </div>
    </div>
  </section>

  <!-- ========== REVIEWS (Placeholder) ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden" aria-label="환자 리뷰">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal/10 to-transparent"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-20 reveal">
        <div class="section-label section-label-royal mx-auto mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>REVIEWS</div>
        <h2 class="display-lg text-charcoal mb-4">환자 리뷰</h2>
        <p class="text-gray-400 text-lg">곧 환자분들의 소중한 후기를 만나보실 수 있습니다</p>
      </div>
      <div class="max-w-2xl mx-auto reveal">
        <div class="card-premium p-14 text-center">
          <div class="flex justify-center gap-1.5 mb-8">${starsHtml}</div>
          <p class="text-2xl md:text-3xl font-extrabold text-charcoal mb-4">환자분들의 소중한 후기</p>
          <p class="text-gray-400 mb-10 leading-relaxed">네이버 · 구글 리뷰 수집 후 업데이트 예정입니다.</p>
          <a href="https://blog.naver.com/gndentalclinic" target="_blank" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#03C75A] text-white font-bold text-sm hover:bg-[#02b351] transition-colors shadow-lg shadow-[#03C75A]/20"><i class="fas fa-blog"></i>네이버 블로그 방문</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== FAQ ========== -->
  <section class="py-32 md:py-48 section-lavender relative overflow-hidden" id="faq" aria-label="자주 묻는 질문">
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-royal/[0.02] rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/3"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div class="lg:col-span-4 lg:sticky lg:top-32 lg:self-start reveal">
          <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FAQ</div>
          <h2 class="display-lg text-charcoal mb-6">자주 묻는<br><span class="royal-grad-text">질문</span></h2>
          <p class="text-gray-400 leading-relaxed mb-10">궁금한 점이 더 있으시면<br>편하게 문의해 주세요.</p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a href="/reservation" class="btn-primary !text-sm !py-4 !px-8"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
            <a href="tel:054-636-8222" class="btn-subtle !text-sm !py-4 !px-8"><i class="fas fa-phone text-xs text-royal"></i>전화 문의</a>
          </div>
        </div>
        <div class="lg:col-span-8 space-y-4 stagger-children">
          ${faqHtml}
        </div>
      </div>
    </div>
  </section>

  <!-- ========== FINAL CTA ========== -->
  <section class="py-36 md:py-48 bg-white relative overflow-hidden" aria-label="상담 예약">
    <div class="orb orb-royal w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-royal/[0.06] rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-royal/[0.03] rounded-full"></div>
      <div class="relative z-10">
        <div class="w-24 h-24 mx-auto rounded-3xl royal-grad flex items-center justify-center mb-10 royal-glow"><i class="fas fa-tooth text-white text-4xl"></i></div>
        <h2 class="display-xl text-charcoal mb-8">상담은 무료입니다.<br><span class="royal-grad-text">부담 없이 전화주세요.</span></h2>
        <p class="text-gray-400 text-lg mb-12 leading-relaxed">구강외과 전문의가 직접 상담드립니다.<br>빠르게 낫고, 정확하게 오래가는 치과.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-14 !text-base !font-extrabold"><i class="fas fa-calendar-check"></i>온라인 상담 예약</a>
          <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
        </div>
        <div class="flex items-center justify-center gap-8 text-sm text-gray-400">
          <span><i class="fas fa-clock text-royal/50 mr-2"></i>평일 09:00-17:30 (접수마감 17:00)</span>
          <span class="w-1 h-1 rounded-full bg-gray-300"></span>
          <span><i class="fas fa-map-marker-alt text-royal/50 mr-2"></i>영주시 대학로 217 모모제인 2층</span>
        </div>
      </div>
    </div>
  </section>
  `;
}
