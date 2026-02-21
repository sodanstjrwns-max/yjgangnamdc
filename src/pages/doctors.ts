const doctors = [
  {
    slug: 'lee-taehyung', name: '이태형', title: '대표원장', initial: '이',
    specialty: '구강악안면외과 전문의',
    h1: '이태형 대표원장 – 구강악안면외과 전문의',
    description: '강남치과의원 이태형 대표원장. 고려대 구강악안면외과 석사, 구강외과 전문의. 임플란트·뼈이식·구강외과 수술 전문.',
    philosophy: '"지역사회에 대학병원 수준의 치과진료를 하기 위해"',
    education: ['보건복지부 구강악안면외과 전문의','고려대학교 구강악안면외과 석사','고려대학교 구로병원 구강악안면외과 레지던트','고려대학교 임상치의학 대학원 외래교수'],
    career: ['대한구강악안면성형재건외과 학회 인정의','대한구강악안면외과 정회원','서울대학교 임플란트 연수회 수료','네오 임플란트 자문의','육군 군의관 수기사, 73사단 대위'],
    specialties: ['임플란트','구강외과 수술','뼈이식','상악동 수술'],
    treatments: ['/treatments/implant','/treatments/bone-graft','/treatments/wisdom-tooth']
  },
  {
    slug: 'choi-minhye', name: '최민혜', title: '원장', initial: '최',
    specialty: '구강악안면외과 전문의',
    h1: '최민혜 원장 – 구강악안면외과 전문의',
    description: '강남치과의원 최민혜 원장. 고려대 구강악안면외과 석사, 구강외과 전문의. 임플란트·틀니·레이저 치료 전문.',
    philosophy: '',
    education: ['보건복지부 구강악안면외과 전문의','고려대학교 구강악안면외과 석사','인제대학교 백병원 구강악안면외과 레지던트','대한구강악안면성형재건외과 학회 인정의'],
    career: ['대한레이저치학회 정회원','대한임플란트학회 정회원','Ara Denture Academy 수료','네오 임플란트 자문의','의정부 추병원, 강릉 동인병원 치과 과장'],
    specialties: ['임플란트','틀니','레이저 치료','심미보철'],
    treatments: ['/treatments/implant','/treatments/denture']
  }
]

export function doctorsPage(): string {
  return `
  <!-- Hero (White Theme) -->
  <section class="relative min-h-[70vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-gold w-[600px] h-[600px] -top-64 -right-64 opacity-30"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-48 w-full">
      <div class="section-label section-label-gold mb-8"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span>DOCTORS</div>
      <h1 class="display-xl text-charcoal mb-6">
        의료진 소개<br><span class="gold-grad-text">구강외과 전문의 2인</span>
      </h1>
      <p class="text-gray-400 text-lg max-w-lg leading-relaxed">
        수술이 전문인 구강악안면외과 전문의 2인이<br>직접 진단하고, 직접 수술합니다.
      </p>
    </div>
  </section>

  <!-- Doctor Cards -->
  <section class="py-24 md:py-36 bg-white relative overflow-hidden">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[200px]"></div>

    <div class="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 space-y-24">
      ${doctors.map((doc, i) => `
      <div class="reveal${i % 2 ? '-right' : '-left'}">
        <div class="card-premium overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <!-- Photo -->
            <div class="lg:col-span-2 relative min-h-[320px] lg:min-h-[500px] overflow-hidden bg-gradient-to-br from-snow-100 via-snow-50 to-gold/[0.03]">
              <div class="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent z-10"></div>
              <div class="absolute top-6 right-6 w-16 h-16 border border-gold/10 rounded-full z-20"></div>
              <div class="absolute inset-0 flex items-center justify-center z-[5]">
                <div class="w-36 h-36 rounded-3xl bg-white shadow-xl border border-gray-100 flex items-center justify-center">
                  <span class="gold-grad-text text-6xl font-black">${doc.initial}</span>
                </div>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div class="flex items-center gap-2">
                  <span class="px-4 py-1.5 rounded-full gold-grad text-white text-[11px] font-bold tracking-wide">${doc.title}</span>
                  <span class="px-4 py-1.5 rounded-full bg-white/80 text-gray-600 text-[11px] font-medium backdrop-blur-lg border border-gray-200">${doc.specialty}</span>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="lg:col-span-3 p-8 md:p-12">
              <div class="flex items-center gap-3 mb-2">
                <h2 class="text-3xl md:text-4xl font-extrabold text-charcoal">${doc.name}</h2>
                <span class="text-gray-400 text-lg font-medium">${doc.title}</span>
              </div>
              ${doc.philosophy ? `<p class="text-gold italic font-medium text-lg mb-8">${doc.philosophy}</p>` : '<div class="mb-8"></div>'}

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 class="font-bold text-charcoal mb-4 text-sm flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg gold-grad flex items-center justify-center"><i class="fas fa-graduation-cap text-white text-[10px]"></i></div>
                    학력/자격
                  </h4>
                  <ul class="space-y-2.5 text-sm text-gray-500">
                    ${doc.education.map(e => `<li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0"></span>${e}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold text-charcoal mb-4 text-sm flex items-center gap-2">
                    <div class="w-7 h-7 rounded-lg gold-grad flex items-center justify-center"><i class="fas fa-briefcase text-white text-[10px]"></i></div>
                    경력
                  </h4>
                  <ul class="space-y-2.5 text-sm text-gray-500">
                    ${doc.career.map(c => `<li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0"></span>${c}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="pt-6 border-t border-gray-100">
                <div class="flex flex-wrap gap-2 mb-6">
                  ${doc.specialties.map(s => `<span class="px-4 py-2 rounded-xl bg-gold/[0.04] text-gold/80 text-[11px] font-bold border border-gold/[0.08]">${s}</span>`).join('')}
                </div>
                <a href="/doctors/${doc.slug}" class="inline-flex items-center gap-2 text-gold font-bold text-sm hover:gap-4 transition-all duration-500">
                  상세 프로필 보기 <i class="fas fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- CTA (White) -->
  <section class="py-28 md:py-36 section-snow relative overflow-hidden">
    <div class="orb orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="gold-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl gold-grad flex items-center justify-center mb-8 gold-glow">
        <i class="fas fa-user-doctor text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6">전문의와 직접<br><span class="gold-grad-text">상담해보세요</span></h2>
      <p class="text-gray-400 text-lg mb-10">구강외과 전문의가 직접 진단하고 설명드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold">
          <i class="fas fa-calendar-check"></i>상담 예약하기
        </a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center">
          <i class="fas fa-phone text-sm text-gold"></i>054-636-8222
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
      <div class="orb orb-gold w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
      <div class="absolute inset-0 grid-pattern opacity-30"></div>
      <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-44 w-full">
        <a href="/doctors" class="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-sm mb-8 font-medium">
          <i class="fas fa-arrow-left text-xs"></i>의료진 소개로 돌아가기
        </a>
        <h1 class="display-lg text-charcoal mb-4">${doc.h1}</h1>
        <div class="flex items-center gap-3 mt-4">
          <span class="px-4 py-1.5 rounded-full gold-grad text-white text-[11px] font-bold">${doc.title}</span>
          <span class="px-4 py-1.5 rounded-full bg-white/80 border border-gray-200 text-gray-600 text-[11px] font-medium">${doc.specialty}</span>
        </div>
      </div>
    </section>

    <!-- Profile -->
    <section class="py-20 md:py-32 bg-white">
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div class="aspect-[3/4] rounded-3xl flex items-center justify-center sticky top-28 gold-border-glow overflow-hidden relative bg-gradient-to-br from-snow-100 via-snow-50 to-gold/[0.03]">
              <div class="absolute top-4 right-4 w-12 h-12 border border-gold/10 rounded-full"></div>
              <div class="w-28 h-28 rounded-3xl bg-white shadow-xl border border-gray-100 flex items-center justify-center">
                <span class="gold-grad-text text-5xl font-black">${doc.initial}</span>
              </div>
            </div>
          </div>

          <div class="md:col-span-2 space-y-8">
            <div>
              <h2 class="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">${doc.name} <span class="text-gray-400 font-medium text-xl">${doc.title}</span></h2>
              ${doc.philosophy ? `<blockquote class="text-lg text-gold italic border-l-4 border-gold pl-6 my-8 font-medium">${doc.philosophy}</blockquote>` : ''}
            </div>

            <div class="card-premium p-8">
              <h3 class="font-extrabold text-charcoal mb-5 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg gold-grad flex items-center justify-center"><i class="fas fa-graduation-cap text-white text-xs"></i></div>
                학력 및 자격
              </h3>
              <ul class="space-y-3 text-gray-500">
                ${doc.education.map(e => `<li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0"></span><span>${e}</span></li>`).join('')}
              </ul>
            </div>

            <div class="card-premium p-8">
              <h3 class="font-extrabold text-charcoal mb-5 flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg gold-grad flex items-center justify-center"><i class="fas fa-briefcase text-white text-xs"></i></div>
                경력 사항
              </h3>
              <ul class="space-y-3 text-gray-500">
                ${doc.career.map(c => `<li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0"></span><span>${c}</span></li>`).join('')}
              </ul>
            </div>

            <div>
              <h3 class="font-extrabold text-charcoal mb-5">전문 분야</h3>
              <div class="flex flex-wrap gap-2.5">
                ${doc.specialties.map(s => `<span class="px-5 py-2.5 rounded-xl bg-gold/[0.04] text-gold font-bold text-sm border border-gold/[0.1]">${s}</span>`).join('')}
              </div>
            </div>

            <div class="glass-gold rounded-3xl p-8 relative overflow-hidden">
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-gold/[0.05] rounded-full blur-[60px]"></div>
              <div class="relative z-10">
                <h3 class="font-extrabold text-charcoal mb-3 text-lg">${doc.name} ${doc.title}에게 상담받기</h3>
                <p class="text-gray-400 text-sm mb-6">전문 분야에 대해 직접 상담을 받아보세요.</p>
                <div class="flex flex-wrap gap-3">
                  <a href="/reservation" class="btn-primary !text-sm !py-4 !px-8"><i class="fas fa-calendar-check text-xs"></i>상담 예약하기</a>
                  <a href="tel:054-636-8222" class="btn-subtle !text-sm !py-4 !px-8">
                    <i class="fas fa-phone text-xs text-gold"></i>054-636-8222
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