const doctors = [
  {
    slug: 'lee-taehyung',
    name: '이태형',
    title: '대표원장',
    specialty: '구강악안면외과 전문의',
    h1: '이태형 대표원장 – 구강악안면외과 전문의',
    description: '강남치과의원 이태형 대표원장. 고려대학교 구강악안면외과 석사, 구강외과 전문의. 임플란트·뼈이식·구강외과 수술 전문.',
    philosophy: '"지역사회에 대학병원 수준의 치과진료를 하기 위해"',
    education: [
      '보건복지부 구강악안면외과 전문의',
      '고려대학교 구강악안면외과 석사',
      '고려대학교 구로병원 구강악안면외과 레지던트',
      '고려대학교 임상치의학 대학원 외래교수'
    ],
    career: [
      '대한구강악안면성형재건외과 학회 인정의',
      '대한구강악안면외과 정회원',
      '서울대학교 임플란트 연수회 수료',
      '네오 임플란트 자문의',
      '육군 군의관 수기사, 73사단 대위'
    ],
    specialties: ['임플란트', '구강외과 수술', '뼈이식'],
    treatments: ['/treatments/implant', '/treatments/bone-graft', '/treatments/wisdom-tooth']
  },
  {
    slug: 'choi-minhye',
    name: '최민혜',
    title: '원장',
    specialty: '구강악안면외과 전문의',
    h1: '최민혜 원장 – 구강악안면외과 전문의',
    description: '강남치과의원 최민혜 원장. 고려대학교 구강악안면외과 석사, 구강외과 전문의. 임플란트·틀니·레이저 치료 전문.',
    philosophy: '',
    education: [
      '보건복지부 구강악안면외과 전문의',
      '고려대학교 구강악안면외과 석사',
      '인제대학교 백병원 구강악안면외과 레지던트',
      '대한구강악안면성형재건외과 학회 인정의'
    ],
    career: [
      '대한레이저치학회 정회원',
      '대한임플란트학회 정회원',
      'Ara Denture Academy 수료',
      '네오 임플란트 자문의',
      '의정부 추병원, 강릉 동인병원 치과 과장'
    ],
    specialties: ['임플란트', '틀니', '레이저 치료'],
    treatments: ['/treatments/implant', '/treatments/denture']
  }
]

export function doctorsPage(): string {
  return `
  <!-- 히어로 -->
  <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-4 text-center">
      <span class="inline-block px-4 py-1.5 bg-white/10 text-gold text-sm font-semibold rounded-full mb-4">DOCTORS</span>
      <h1 class="text-3xl md:text-5xl font-bold mb-4">강남치과의원 의료진 소개<br><span class="gold-text-gradient">구강외과 전문의 2인</span></h1>
      <p class="text-gray-300 max-w-xl mx-auto">수술이 전문인 구강악안면외과 전문의 2인이 직접 진료합니다.</p>
    </div>
  </section>

  <section class="py-20 bg-white">
    <div class="max-w-5xl mx-auto px-4 space-y-16">
      ${doctors.map(doc => `
      <div class="bg-bglight rounded-3xl overflow-hidden border border-gray-100 fade-in">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
          <!-- 사진 영역 -->
          <div class="aspect-square md:aspect-auto bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
            <div class="text-center relative z-10">
              <div class="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                <i class="fas fa-user-doctor text-white text-5xl"></i>
              </div>
              <span class="text-white/70 text-sm">프로필 사진 준비 중</span>
            </div>
          </div>
          <!-- 정보 영역 -->
          <div class="md:col-span-2 p-8 md:p-10">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-3 py-1 bg-gold text-white text-xs font-semibold rounded-full">${doc.title}</span>
              <span class="px-3 py-1 bg-charcoal text-white text-xs rounded-full">${doc.specialty}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-charcoal mb-2">${doc.name} ${doc.title}</h2>
            ${doc.philosophy ? `<p class="text-gold italic mb-6">${doc.philosophy}</p>` : '<div class="mb-6"></div>'}
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-charcoal mb-3 flex items-center gap-2"><i class="fas fa-graduation-cap text-gold"></i>학력/자격</h4>
                <ul class="space-y-1.5 text-sm text-gray-600">
                  ${doc.education.map(e => `<li class="flex items-start gap-2"><i class="fas fa-check text-gold text-xs mt-1"></i>${e}</li>`).join('')}
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-charcoal mb-3 flex items-center gap-2"><i class="fas fa-briefcase text-gold"></i>경력</h4>
                <ul class="space-y-1.5 text-sm text-gray-600">
                  ${doc.career.map(c => `<li class="flex items-start gap-2"><i class="fas fa-check text-gold text-xs mt-1"></i>${c}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="font-semibold text-charcoal mb-3">전문 분야</h4>
              <div class="flex flex-wrap gap-2">
                ${doc.specialties.map(s => `<span class="px-3 py-1.5 bg-gold-50 text-gold text-sm rounded-full font-medium">${s}</span>`).join('')}
              </div>
            </div>

            <a href="/doctors/${doc.slug}" class="inline-flex items-center gap-2 mt-6 text-gold font-medium hover:gap-3 transition-all">
              상세 프로필 보기 <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-bglight">
    <div class="max-w-3xl mx-auto px-4 text-center fade-in">
      <h2 class="text-2xl md:text-3xl font-bold text-charcoal mb-4">전문의와 직접 상담해보세요</h2>
      <p class="text-subtext mb-8">구강외과 전문의가 직접 진단하고 설명드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 btn-gold rounded-full text-base font-semibold">
          <i class="fas fa-calendar-check"></i>상담 예약하기
        </a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-full text-charcoal font-semibold hover:border-gold hover:text-gold transition">
          <i class="fas fa-phone"></i>054-636-8222
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
    title: doc.h1,
    description: doc.description,
    html: `
    <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto px-4">
        <a href="/doctors" class="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition text-sm mb-6">
          <i class="fas fa-arrow-left"></i>의료진 소개로 돌아가기
        </a>
        <h1 class="text-3xl md:text-4xl font-bold">${doc.h1}</h1>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- 사진 -->
          <div>
            <div class="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center sticky top-24">
              <div class="text-center">
                <div class="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <i class="fas fa-user-doctor text-white text-4xl"></i>
                </div>
                <span class="text-white/70 text-sm">프로필 사진 준비 중</span>
              </div>
            </div>
          </div>

          <!-- 프로필 상세 -->
          <div class="md:col-span-2 space-y-8">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 bg-gold text-white text-xs font-semibold rounded-full">${doc.title}</span>
                <span class="px-3 py-1 bg-charcoal text-white text-xs rounded-full">${doc.specialty}</span>
              </div>
              <h2 class="text-3xl font-bold text-charcoal mb-2">${doc.name} ${doc.title}</h2>
              ${doc.philosophy ? `<blockquote class="text-lg text-gold italic border-l-4 border-gold pl-4 my-6">${doc.philosophy}</blockquote>` : ''}
            </div>

            <div class="bg-bglight rounded-2xl p-6">
              <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2">
                <i class="fas fa-graduation-cap text-gold"></i>학력 및 자격
              </h3>
              <ul class="space-y-2 text-gray-600">
                ${doc.education.map(e => `<li class="flex items-start gap-3"><i class="fas fa-check text-gold text-xs mt-1.5"></i>${e}</li>`).join('')}
              </ul>
            </div>

            <div class="bg-bglight rounded-2xl p-6">
              <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2">
                <i class="fas fa-briefcase text-gold"></i>경력 사항
              </h3>
              <ul class="space-y-2 text-gray-600">
                ${doc.career.map(c => `<li class="flex items-start gap-3"><i class="fas fa-check text-gold text-xs mt-1.5"></i>${c}</li>`).join('')}
              </ul>
            </div>

            <div>
              <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2">
                <i class="fas fa-stethoscope text-gold"></i>전문 분야
              </h3>
              <div class="flex flex-wrap gap-2">
                ${doc.specialties.map(s => `<span class="px-4 py-2 bg-gold-50 text-gold rounded-full font-medium">${s}</span>`).join('')}
              </div>
            </div>

            <div class="bg-gold-50 rounded-2xl p-6 border border-gold/20">
              <h3 class="font-bold text-charcoal mb-3">${doc.name} ${doc.title}에게 상담받기</h3>
              <p class="text-subtext text-sm mb-4">전문 분야에 대해 직접 상담을 받아보세요.</p>
              <a href="/reservation" class="inline-flex items-center gap-2 px-6 py-3 btn-gold rounded-full text-sm font-semibold">
                <i class="fas fa-calendar-check"></i>상담 예약하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    `
  }
}
