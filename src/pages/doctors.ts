const doctors = [
  {
    slug: 'lee-taehyung', name: '이태형', title: '대표원장', initial: '이',
    specialty: '구강악안면외과 전문의',
    h1: '이태형 대표원장 – 구강악안면외과 전문의',
    description: '강남치과의원 이태형 대표원장. 고려대 구강악안면외과 석사, 구강외과 전문의. 임플란트·뼈이식·구강외과 수술 전문.',
    philosophy: '"한 번 오시면 됩니다. 여러 번 오실 필요 없습니다."',
    storyIntro: `저는 <strong class="text-charcoal">치과의사가 아니라, 수술이 전문인 외과 전문의</strong>입니다.

고려대학교 구강악안면외과에서 석사를 마치고, 고려대학교 구로병원에서 레지던트를 수료했습니다.
매일 뼈를 다루고, 매일 수술을 합니다. 
뼈이식, 상악동 거상술 같은 <strong class="text-charcoal">고난이도 수술</strong>을 일상적으로 시행합니다.
대한구강악안면성형재건외과학회 인정의입니다.

<strong class="text-charcoal">임플란트는 뼈에 심는 수술입니다.</strong>
일반 치과의사가 하는 것과 외과 전문의가 하는 것은 다릅니다.

강남치과에는 저를 포함해 구강외과 전문의가 <strong class="text-charcoal">2명</strong> 있습니다.
영주에서 <strong class="text-charcoal">대학병원급 외과 수술</strong>을 동네 치과의 편안함으로 받으실 수 있습니다.

그리고 CEREC 당일 보철 시스템을 도입해서,
<strong class="text-charcoal">본을 뜨고, 기다리고, 다시 오는 과정 없이 하루 만에 보철까지 완성</strong>합니다.
바쁜 분들, 여러 번 오시기 힘든 분들을 위한 치과를 만들고 싶었습니다.

그래서 한 마디로 드리는 약속 —
<strong class="text-royal text-lg">"한 번 오시면 됩니다."</strong>`,
    storyPreview: '치과의사가 아니라, 수술이 전문인 외과 전문의입니다. 고려대 구로병원 레지던트 수료 후, 매일 뼈를 다루고 매일 수술합니다. 영주에서 대학병원급 외과 수술을 동네 치과의 편안함으로.',
    summary3line: '구강악안면외과 전문의 · 수술 전문<br>고려대 구로병원 레지던트 수료<br>"한 번 오시면 됩니다"',
    education: ['보건복지부 구강악안면외과 전문의','고려대학교 구강악안면외과 석사','고려대학교 구로병원 구강악안면외과 레지던트','고려대학교 임상치의학 대학원 외래교수'],
    career: ['대한구강악안면성형재건외과 학회 인정의','대한구강악안면외과 정회원','서울대학교 임플란트 연수회 수료','네오 임플란트 자문의'],
    specialties: ['임플란트','구강외과 수술','뼈이식','상악동 수술'],
    treatments: ['/treatments/implant','/treatments/bone-graft','/treatments/wisdom-tooth']
  },
  {
    slug: 'choi-minhye', name: '최민혜', title: '원장', initial: '최',
    specialty: '구강악안면외과 전문의',
    h1: '최민혜 원장 – 구강악안면외과 전문의',
    description: '강남치과의원 최민혜 원장. 인제대 백병원 구강악안면외과 수료, 구강외과 전문의. 임플란트·틀니·레이저 치료 전문.',
    philosophy: '"외과 전문의의 손은 다릅니다."',
    storyIntro: `이태형 대표원장과 같은 <strong class="text-charcoal">구강악안면외과 전문의</strong>입니다.

인제대학교 백병원에서 레지던트를 수료한 뒤, 
의정부 추병원과 강릉 동인병원에서 <strong class="text-charcoal">치과 과장</strong>을 역임했습니다.
병원 현장에서 수많은 수술 경험을 쌓았습니다.

임플란트와 틀니 치료를 주로 담당하며,
<strong class="text-charcoal">레이저 치료</strong> 분야에서도 전문성을 갖추고 있습니다.
대한레이저치학회, 대한임플란트학회 정회원이며,
대한구강악안면성형재건외과학회 인정의입니다.

환자분들이 가장 많이 하시는 질문이 있습니다.
"외과 전문의가 하는 게 뭐가 다른가요?"

<strong class="text-charcoal">다릅니다.</strong>
뼈를 보는 눈, 신경을 피하는 손, 봉합의 정밀함이 다릅니다.

강남치과에 구강외과 전문의가 2명이라는 것은,
<strong class="text-charcoal">어떤 수술이든 전문의가 직접 한다</strong>는 뜻입니다.`,
    storyPreview: '인제대 백병원 레지던트 수료, 다년간 병원 치과 과장 역임. 임플란트와 틀니, 레이저 치료 전문. 외과 전문의의 손은 다릅니다 — 뼈를 보는 눈, 신경을 피하는 손, 봉합의 정밀함.',
    summary3line: '구강악안면외과 전문의 · 인제대 백병원 수료<br>임플란트, 틀니, 레이저 치료 전문<br>"외과 전문의 2인 체제"',
    education: ['보건복지부 구강악안면외과 전문의','고려대학교 구강악안면외과 석사','인제대학교 백병원 구강악안면외과 레지던트','대한구강악안면성형재건외과 학회 인정의'],
    career: ['대한레이저치학회 정회원','대한임플란트학회 정회원','Ara Denture Academy 수료','네오 임플란트 자문의','의정부 추병원, 강릉 동인병원 치과 과장'],
    specialties: ['임플란트','틀니','레이저 치료','심미보철'],
    treatments: ['/treatments/implant','/treatments/denture']
  }
]

export function doctorsPage(): string {
  return `
  <!-- Hero -->
  <section class="relative min-h-[70vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-royal w-[600px] h-[600px] -top-64 -right-64 opacity-30"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-48 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>DOCTORS</div>
      <h1 class="display-xl text-charcoal mb-6">
        수술이 전문인<br><span class="royal-grad-text">전문의가 합니다</span>
      </h1>
      <p class="text-gray-400 text-lg max-w-lg leading-relaxed">
        일반 치과의사가 아닌, 구강악안면외과 전문의 2인이<br>직접 진단하고, 직접 수술합니다.
      </p>
    </div>
  </section>

  <!-- Doctor Cards with Story Preview -->
  <section class="py-24 md:py-36 bg-white relative overflow-hidden">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-royal/[0.02] rounded-full blur-[200px]"></div>

    <div class="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 space-y-24">
      ${doctors.map((doc, i) => `
      <div class="reveal${i % 2 ? '-right' : '-left'}">
        <div class="card-premium overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <!-- Photo -->
            <div class="lg:col-span-2 relative min-h-[320px] lg:min-h-[560px] overflow-hidden bg-gradient-to-br from-lavender via-white to-royal/[0.03]">
              <div class="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent z-10"></div>
              <div class="absolute top-6 right-6 w-16 h-16 border border-royal/10 rounded-full z-20"></div>
              <div class="absolute inset-0 flex items-center justify-center z-[5]">
                <div class="w-36 h-36 rounded-3xl bg-white shadow-xl border border-royal/[0.08] flex items-center justify-center">
                  <span class="royal-grad-text text-6xl font-black">${doc.initial}</span>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div class="flex items-center gap-2">
                  <span class="px-4 py-1.5 rounded-full royal-grad text-white text-[11px] font-bold tracking-wide">${doc.title}</span>
                  <span class="px-4 py-1.5 rounded-full bg-white/80 text-gray-600 text-[11px] font-medium backdrop-blur-lg border border-royal/10">${doc.specialty}</span>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="lg:col-span-3 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-2">
                <h2 class="text-3xl md:text-4xl font-extrabold text-charcoal">${doc.name}</h2>
                <span class="text-gray-400 text-lg font-medium">${doc.title}</span>
              </div>
              <p class="text-royal italic font-bold text-xl mb-6">${doc.philosophy}</p>

              <!-- Story preview — 핵심 소개 프리뷰 -->
              <div class="p-6 rounded-2xl bg-lavender border border-royal/[0.06] mb-8 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-royal to-royal/30"></div>
                <p class="text-gray-500 text-[15px] leading-[1.85] pl-4">${doc.storyPreview}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 class="font-bold text-charcoal mb-4 text-sm flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg royal-grad flex items-center justify-center"><i class="fas fa-graduation-cap text-white text-[10px]"></i></div>
                    학력/자격
                  </h4>
                  <ul class="space-y-2.5 text-sm text-gray-500">
                    ${doc.education.map(e => `<li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-royal mt-2 flex-shrink-0"></span>${e}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold text-charcoal mb-4 text-sm flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg royal-grad flex items-center justify-center"><i class="fas fa-briefcase text-white text-[10px]"></i></div>
                    경력
                  </h4>
                  <ul class="space-y-2.5 text-sm text-gray-500">
                    ${doc.career.map(c => `<li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-royal mt-2 flex-shrink-0"></span>${c}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="pt-6 border-t border-gray-100">
                <div class="flex flex-wrap gap-2 mb-6">
                  ${doc.specialties.map(s => `<span class="px-4 py-2 rounded-xl bg-royal/[0.04] text-royal/80 text-[11px] font-bold border border-royal/[0.08]">${s}</span>`).join('')}
                </div>
                <a href="/doctors/${doc.slug}" class="inline-flex items-center gap-2 text-royal font-bold text-sm hover:gap-4 transition-all duration-500">
                  전체 스토리 보기 <i class="fas fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- Mission & Vision -->
  <section class="py-24 md:py-32 section-lavender relative overflow-hidden">
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-8 lg:px-12 reveal">
      <div class="text-center mb-16">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>MISSION</div>
        <h2 class="display-lg text-charcoal mb-6">
          영주에서 대학병원 수준의 치과 수술을,<br><span class="royal-grad-text">동네 치과의 편안함으로.</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card-premium p-10">
          <div class="w-14 h-14 rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow">
            <i class="fas fa-user-doctor text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-extrabold text-charcoal mb-3">수술은 전문의가</h3>
          <p class="text-gray-400 leading-relaxed">
            모든 임플란트 수술, 뼈이식, 상악동 거상술,<br>
            사랑니 발치를 <strong class="text-charcoal">구강외과 전문의가 직접</strong> 시행합니다.<br>
            전문의 2인 체제라 교차 검증도 가능합니다.
          </p>
        </div>
        <div class="card-premium p-10">
          <div class="w-14 h-14 rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow">
            <i class="fas fa-bolt text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-extrabold text-charcoal mb-3">내원은 한 번만</h3>
          <p class="text-gray-400 leading-relaxed">
            CEREC 당일 보철 시스템으로<br>
            <strong class="text-charcoal">본 뜨고, 기다리고, 다시 오는 과정을 없앴습니다.</strong><br>
            바쁜 환자분들이 여러 번 오실 필요가 없습니다.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-28 md:py-36 bg-white relative overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
        <i class="fas fa-user-doctor text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6">상담은 무료입니다.<br><span class="royal-grad-text">부담 없이 전화주세요.</span></h2>
      <p class="text-gray-400 text-lg mb-10">구강외과 전문의가 직접 진단하고 설명드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold">
          <i class="fas fa-calendar-check"></i>상담 예약하기
        </a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center">
          <i class="fas fa-phone text-sm text-royal"></i>054-636-8222
        </a>
      </div>
    </div>
  </section>
  `
}

export function doctorProfilePage(slug: string): { html: string; title: string; description: string } | null {
  const doc = doctors.find(d => d.slug === slug)
  if (!doc) return null
  return {
    title: doc.h1, description: doc.description,
    html: `
    <!-- Hero -->
    <section class="relative min-h-[55vh] flex items-end subpage-hero overflow-hidden">
      <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
      <div class="absolute inset-0 grid-pattern opacity-30"></div>
      <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-44 w-full">
        <a href="/doctors" class="inline-flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm mb-8 font-medium">
          <i class="fas fa-arrow-left text-xs"></i>의료진 소개로 돌아가기
        </a>
        <h1 class="display-lg text-charcoal mb-4">${doc.h1}</h1>
        <div class="flex items-center gap-3 mt-4">
          <span class="px-4 py-1.5 rounded-full royal-grad text-white text-[11px] font-bold">${doc.title}</span>
          <span class="px-4 py-1.5 rounded-full bg-white/80 border border-royal/10 text-gray-600 text-[11px] font-medium">${doc.specialty}</span>
        </div>
      </div>
    </section>

    <!-- Profile -->
    <section class="py-20 md:py-32 bg-white">
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div class="aspect-[3/4] rounded-3xl flex items-center justify-center sticky top-28 royal-border-glow overflow-hidden relative bg-gradient-to-br from-lavender via-white to-royal/[0.03]">
              <div class="absolute top-4 right-4 w-12 h-12 border border-royal/10 rounded-full"></div>
              <div class="w-28 h-28 rounded-3xl bg-white shadow-xl border border-royal/[0.08] flex items-center justify-center">
                <span class="royal-grad-text text-5xl font-black">${doc.initial}</span>
              </div>
            </div>
          </div>

          <div class="md:col-span-2 space-y-8">
            <div>
              <h2 class="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">${doc.name} <span class="text-gray-400 font-medium text-xl">${doc.title}</span></h2>
              <blockquote class="text-xl text-royal italic border-l-4 border-royal pl-6 my-8 font-bold">${doc.philosophy}</blockquote>
            </div>

            <!-- 스토리형 소개 — 풀 버전 -->
            <div class="card-premium p-8 md:p-10 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-royal via-royal/60 to-royal/20 rounded-r-full"></div>
              <h3 class="font-extrabold text-charcoal mb-6 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center"><i class="fas fa-comment-medical text-white text-xs"></i></div>
                ${doc.name} ${doc.title}을 소개합니다
              </h3>
              <div class="text-gray-500 text-[15px] leading-[2] whitespace-pre-line pl-2">${doc.storyIntro}</div>
            </div>

            <!-- 3줄 요약 카드 -->
            <div class="glass-royal rounded-2xl p-6 relative overflow-hidden">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-royal/[0.05] rounded-full blur-[60px]"></div>
              <div class="relative z-10 flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow">
                  <i class="fas fa-list-check text-white text-sm"></i>
                </div>
                <div>
                  <h4 class="text-charcoal font-bold text-sm mb-2">한눈에 보기</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">${doc.summary3line}</p>
                </div>
              </div>
            </div>

            <div class="card-premium p-8">
              <h3 class="font-extrabold text-charcoal mb-5 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center"><i class="fas fa-graduation-cap text-white text-xs"></i></div>
                학력 및 자격
              </h3>
              <ul class="space-y-3 text-gray-500">
                ${doc.education.map(e => `<li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-royal mt-1.5 flex-shrink-0"></span><span>${e}</span></li>`).join('')}
              </ul>
            </div>

            <div class="card-premium p-8">
              <h3 class="font-extrabold text-charcoal mb-5 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center"><i class="fas fa-briefcase text-white text-xs"></i></div>
                경력 사항
              </h3>
              <ul class="space-y-3 text-gray-500">
                ${doc.career.map(c => `<li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-royal mt-1.5 flex-shrink-0"></span><span>${c}</span></li>`).join('')}
              </ul>
            </div>

            <div>
              <h3 class="font-extrabold text-charcoal mb-5">전문 분야</h3>
              <div class="flex flex-wrap gap-2.5">
                ${doc.specialties.map(s => `<span class="px-5 py-2.5 rounded-xl bg-royal/[0.04] text-royal font-bold text-sm border border-royal/[0.1]">${s}</span>`).join('')}
              </div>
            </div>

            <div class="glass-royal rounded-3xl p-8 relative overflow-hidden">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-royal/[0.05] rounded-full blur-[60px]"></div>
              <div class="relative z-10">
                <h3 class="font-extrabold text-charcoal mb-3 text-lg">${doc.name} ${doc.title}에게 상담받기</h3>
                <p class="text-gray-400 text-sm mb-6">상담은 무료입니다. 부담 없이 문의해 주세요.</p>
                <div class="flex flex-wrap gap-3">
                  <a href="/reservation" class="btn-primary !text-sm !py-4 !px-8"><i class="fas fa-calendar-check text-xs"></i>상담 예약하기</a>
                  <a href="tel:054-636-8222" class="btn-subtle !text-sm !py-4 !px-8">
                    <i class="fas fa-phone text-xs text-royal"></i>054-636-8222
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `
  }
}
