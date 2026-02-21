export function mainPage(): string {
  return `
  <!-- ============ 히어로 섹션 ============ -->
  <section class="relative bg-charcoal text-white overflow-hidden">
    <!-- 배경 패턴 -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 py-20 md:py-32 lg:py-40">
      <div class="max-w-3xl">
        <!-- 운영 배지 -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-8 border border-white/10">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span class="text-gray-300">오늘 17:30까지 진료중</span>
          <span class="text-gray-500">|</span>
          <span class="text-gray-300">경북 영주시 · 택지 리첼 사거리</span>
        </div>

        <!-- 메인 카피 -->
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
          빠르게 낫고,<br>
          <span class="gold-text-gradient">정확하게 오래가는</span> 치과
        </h1>

        <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
          구강외과 전문의 2인 · 당일 보철 완성 · 신기술 빠른 적용
        </p>

        <!-- 통계 뱃지 -->
        <div class="flex flex-wrap gap-3 mb-10">
          <div class="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-sm">
            <i class="fas fa-user-doctor text-gold"></i>
            <span>전문의 2인</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-sm">
            <i class="fas fa-bolt text-gold"></i>
            <span>CEREC 보유</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-sm">
            <i class="fas fa-clock text-gold"></i>
            <span>당일 완성</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-sm">
            <i class="fas fa-calendar text-gold"></i>
            <span>2017년 개원</span>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex flex-wrap gap-4">
          <a href="/reservation" class="inline-flex items-center gap-2 px-8 py-4 btn-gold rounded-full text-base font-semibold">
            <i class="fas fa-calendar-check"></i>상담 예약하기
          </a>
          <a href="/pricing" class="inline-flex items-center gap-2 px-8 py-4 btn-outline-gold rounded-full text-base font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            <i class="fas fa-won-sign"></i>비용 안내
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 핵심 차별점 ============ -->
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <span class="inline-block px-4 py-1.5 bg-gold-50 text-gold text-sm font-semibold rounded-full mb-4">WHY 강남치과</span>
        <h2 class="text-2xl md:text-4xl font-bold text-charcoal mb-4">
          구강외과 전문의 2인의<br class="md:hidden"> <span class="gold-text-gradient">빠르고 정확한 진료</span>
        </h2>
        <div class="section-divider mt-6"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        ${[
          { icon: 'fa-user-doctor', title: '구강외과 전문의 2인', desc: '수술이 전문인 외과 전문의가 직접 임플란트·발치·뼈이식을 시행합니다' },
          { icon: 'fa-bolt', title: '당일 보철 완성', desc: 'CEREC, SpeedFire 보유. 하루 만에 발수부터 보철까지 완료합니다' },
          { icon: 'fa-microchip', title: '디지털 장비 완비', desc: 'CT, CEREC, PrimeScan, iTero 등 최첨단 디지털 장비를 구비했습니다' },
          { icon: 'fa-clock', title: '빠른 치료 완료', desc: '불필요한 재내원을 최소화합니다. 바쁜 일상에 맞춘 효율적 진료' },
          { icon: 'fa-rocket', title: '신기술 빠른 적용', desc: '최신 치과 기술을 적극 도입합니다. 더 좋은 결과를 위한 끊임없는 노력' }
        ].map(item => `
        <div class="card-hover bg-white rounded-2xl p-8 border border-gray-100 text-center fade-in">
          <div class="w-16 h-16 mx-auto mb-5 rounded-2xl gold-gradient flex items-center justify-center">
            <i class="fas ${item.icon} text-white text-2xl"></i>
          </div>
          <h3 class="font-bold text-charcoal mb-3 text-lg">${item.title}</h3>
          <p class="text-subtext text-sm leading-relaxed">${item.desc}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ============ 주력 진료 ============ -->
  <section class="py-20 md:py-28 bg-bglight">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <span class="inline-block px-4 py-1.5 bg-gold-50 text-gold text-sm font-semibold rounded-full mb-4">TREATMENTS</span>
        <h2 class="text-2xl md:text-4xl font-bold text-charcoal mb-4">강남치과의원 주력 진료 안내</h2>
        <div class="section-divider mt-6"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${[
          {
            slug: 'implant', icon: 'fa-tooth',
            title: '임플란트 – 구강외과 전문의 직접 수술',
            worry: '"수술이 무서워요"',
            promise: '수술 전문 외과 전문의가 직접 임플란트합니다',
            features: ['구강외과 전문의 직접 수술', '뼈이식·상악동 수술 가능', 'CT 기반 정밀 진단']
          },
          {
            slug: 'cerec', icon: 'fa-bolt',
            title: '당일 보철 완성 – CEREC 원데이 시스템',
            worry: '"치과 여러 번 가기 싫어요"',
            promise: '한 번 방문으로 보철까지 완성합니다',
            features: ['CEREC + SpeedFire 시스템', '발수·근충·보철 당일 완성', '디지털 스캔으로 정밀 제작']
          },
          {
            slug: 'invisalign', icon: 'fa-teeth',
            title: '인비절라인 – 투명교정 인증의',
            worry: '"교정 티 나기 싫어요"',
            promise: '눈에 띄지 않게, 인비절라인으로 교정합니다',
            features: ['인비절라인 인증의', 'iTero 디지털 스캐너', '맞춤형 교정 플래닝']
          },
          {
            slug: 'cosmetic', icon: 'fa-gem',
            title: '심미보철 – 자연스러운 라미네이트·크라운',
            worry: '"자연스러운 이를 원해요"',
            promise: '디지털 스캔으로 자연스러운 보철을 만듭니다',
            features: ['라미네이트·올세라믹', 'CEREC 맞춤 제작', '자연치아색 완벽 재현']
          }
        ].map(item => `
        <a href="/treatments/${item.slug}" class="card-hover bg-white rounded-2xl p-8 md:p-10 border border-gray-100 group fade-in block">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0">
              <i class="fas ${item.icon} text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition">${item.title}</h3>
              <p class="text-gold text-sm italic mb-3">${item.worry}</p>
              <p class="text-subtext text-sm mb-4">${item.promise}</p>
              <ul class="space-y-1.5">
                ${item.features.map(f => `
                <li class="flex items-center gap-2 text-sm text-gray-600">
                  <i class="fas fa-check text-gold text-xs"></i>${f}
                </li>`).join('')}
              </ul>
              <div class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                자세히 보기 <i class="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </div>
        </a>
        `).join('')}
      </div>

      <!-- 사랑니 발치 추가 -->
      <div class="mt-8 fade-in">
        <a href="/treatments/wisdom-tooth" class="card-hover bg-white rounded-2xl p-8 md:p-10 border border-gray-100 group block">
          <div class="flex items-start gap-5">
            <div class="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0">
              <i class="fas fa-hand-holding-medical text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition">사랑니발치 – 매복 사랑니도 안전하게</h3>
              <p class="text-subtext text-sm mb-4">구강외과 전문의가 직접 발치합니다. 매복 사랑니, 난발치도 안심하세요.</p>
              <div class="inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                자세히 보기 <i class="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div class="text-center mt-10">
        <a href="/treatments" class="inline-flex items-center gap-2 px-8 py-3 btn-outline-gold rounded-full text-sm font-semibold">
          전체 진료 보기 <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- ============ 의료진 소개 ============ -->
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <span class="inline-block px-4 py-1.5 bg-gold-50 text-gold text-sm font-semibold rounded-full mb-4">DOCTORS</span>
        <h2 class="text-2xl md:text-4xl font-bold text-charcoal mb-4">강남치과의원 의료진 소개</h2>
        <p class="text-subtext max-w-lg mx-auto">구강악안면외과 전문의 2인이 직접 진료합니다</p>
        <div class="section-divider mt-6"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- 이태형 대표원장 -->
        <a href="/doctors/lee-taehyung" class="card-hover bg-bglight rounded-2xl overflow-hidden group fade-in block">
          <div class="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
            <div class="text-center relative z-10">
              <div class="w-28 h-28 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                <i class="fas fa-user-doctor text-white text-4xl"></i>
              </div>
              <span class="text-white/80 text-sm">프로필 사진 준비 중</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-1 bg-gold text-white text-xs font-semibold rounded-full">대표원장</span>
              <span class="px-2.5 py-1 bg-charcoal text-white text-xs rounded-full">구강악안면외과 전문의</span>
            </div>
            <h3 class="text-xl font-bold text-charcoal group-hover:text-gold transition">이태형 대표원장</h3>
            <p class="text-subtext text-sm mt-2">고려대학교 구강악안면외과 석사</p>
            <p class="text-subtext text-sm">임플란트 · 구강외과 수술 · 뼈이식</p>
            <div class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
              프로필 보기 <i class="fas fa-arrow-right text-xs"></i>
            </div>
          </div>
        </a>

        <!-- 최민혜 원장 -->
        <a href="/doctors/choi-minhye" class="card-hover bg-bglight rounded-2xl overflow-hidden group fade-in block">
          <div class="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
            <div class="text-center relative z-10">
              <div class="w-28 h-28 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                <i class="fas fa-user-doctor text-white text-4xl"></i>
              </div>
              <span class="text-white/80 text-sm">프로필 사진 준비 중</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-1 bg-gold text-white text-xs font-semibold rounded-full">원장</span>
              <span class="px-2.5 py-1 bg-charcoal text-white text-xs rounded-full">구강악안면외과 전문의</span>
            </div>
            <h3 class="text-xl font-bold text-charcoal group-hover:text-gold transition">최민혜 원장</h3>
            <p class="text-subtext text-sm mt-2">고려대학교 구강악안면외과 석사</p>
            <p class="text-subtext text-sm">임플란트 · 틀니 · 레이저 치료</p>
            <div class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
              프로필 보기 <i class="fas fa-arrow-right text-xs"></i>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- ============ Before & After (플레이스홀더) ============ -->
  <section class="py-20 md:py-28 bg-bglight">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <span class="inline-block px-4 py-1.5 bg-gold-50 text-gold text-sm font-semibold rounded-full mb-4">BEFORE & AFTER</span>
        <h2 class="text-2xl md:text-4xl font-bold text-charcoal mb-4">치료 사례 Before & After</h2>
        <div class="section-divider mt-6"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        ${['임플란트 식립 후 보철 완성', 'CEREC 당일 크라운 제작', '인비절라인 교정 완료'].map((title, i) => `
        <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 fade-in">
          <div class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div class="text-center px-4">
              <i class="fas fa-camera text-gray-300 text-3xl mb-3"></i>
              <p class="text-gray-400 text-sm">사례 사진 준비 중</p>
            </div>
          </div>
          <div class="p-5">
            <h4 class="font-semibold text-charcoal mb-1">${title}</h4>
            <p class="text-subtext text-sm">촬영 후 업데이트 예정입니다.</p>
          </div>
        </div>
        `).join('')}
      </div>
      <p class="text-center text-subtext text-sm mt-8 fade-in">* 실제 환자 사례 사진은 촬영 후 업데이트 예정입니다.</p>
    </div>
  </section>

  <!-- ============ 환자 리뷰 (플레이스홀더) ============ -->
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <span class="inline-block px-4 py-1.5 bg-gold-50 text-gold text-sm font-semibold rounded-full mb-4">REVIEWS</span>
        <h2 class="text-2xl md:text-4xl font-bold text-charcoal mb-4">환자 리뷰 & 평점</h2>
        <div class="section-divider mt-6"></div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="text-center py-12 bg-bglight rounded-2xl border border-gray-100 fade-in">
          <div class="flex items-center justify-center gap-1 mb-4">
            ${Array(5).fill('<i class="fas fa-star text-gold text-2xl"></i>').join('')}
          </div>
          <p class="text-2xl font-bold text-charcoal mb-2">환자분들의 소중한 후기</p>
          <p class="text-subtext text-sm">네이버·구글 리뷰 수집 후 업데이트 예정입니다.</p>
          <div class="mt-6 flex justify-center gap-4">
            <a href="https://blog.naver.com/gndentalclinic" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition">
              <i class="fas fa-blog"></i>네이버 블로그
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ FAQ ============ -->
  <section class="py-20 md:py-28 bg-bglight">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-in">
        <span class="inline-block px-4 py-1.5 bg-gold-50 text-gold text-sm font-semibold rounded-full mb-4">FAQ</span>
        <h2 class="text-2xl md:text-4xl font-bold text-charcoal mb-4">자주 묻는 질문</h2>
        <div class="section-divider mt-6"></div>
      </div>

      <div class="max-w-3xl mx-auto space-y-4">
        ${[
          { q: '임플란트 비용은 얼마인가요?', a: '임플란트 비용은 잔존 뼈 상태, 뼈이식 여부, 보철 종류에 따라 달라집니다. 정확한 비용은 CT 촬영 후 상담 시 안내드립니다. 부담 없이 문의해 주세요.' },
          { q: 'CEREC 당일 보철이란 무엇인가요?', a: 'CEREC은 디지털 스캐너로 치아를 촬영하고, 컴퓨터로 보철물을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만드는 시스템입니다. 하루 만에 발수부터 보철 장착까지 가능합니다.' },
          { q: '인비절라인은 얼마나 걸리나요?', a: '인비절라인 교정 기간은 보통 6개월~2년으로, 치아 상태에 따라 다릅니다. 간단한 경우 6개월 이내에 완료되기도 합니다. 정밀 검사 후 예상 기간을 안내드립니다.' },
          { q: '사랑니를 꼭 빼야 하나요?', a: '모든 사랑니를 발치해야 하는 것은 아닙니다. 다만 매복 사랑니이거나 주변 치아에 영향을 주는 경우 발치를 권합니다. 구강외과 전문의가 정확히 진단 후 설명드립니다.' },
          { q: '토요일에도 진료하나요?', a: '현재 평일(월~금) 9:00~17:30까지 진료하며, 점심시간은 13:00~14:00입니다. 토·일·공휴일은 휴무입니다.' }
        ].map((item, i) => `
        <details class="group bg-white rounded-xl border border-gray-100 overflow-hidden fade-in">
          <summary class="flex items-center justify-between p-6 cursor-pointer hover:bg-gold-50/50 transition">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-gold-50 text-gold flex items-center justify-center text-sm font-bold flex-shrink-0">Q</span>
              <h3 class="font-semibold text-charcoal text-left">${item.q}</h3>
            </div>
            <i class="fas fa-chevron-down text-subtext text-sm transition-transform group-open:rotate-180"></i>
          </summary>
          <div class="px-6 pb-6 pt-0">
            <div class="pl-11 text-subtext text-sm leading-relaxed border-t border-gray-50 pt-4">
              ${item.a}
            </div>
          </div>
        </details>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ============ 최종 CTA ============ -->
  <section class="py-20 md:py-28 bg-charcoal text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    
    <div class="relative max-w-3xl mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-4xl font-bold mb-4 fade-in">지금 바로 상담 예약하세요</h2>
      <p class="text-gray-300 text-lg mb-8 fade-in">
        구강외과 전문의가 직접 상담드립니다.<br>
        부담 없이 연락해 주세요.
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
        <a href="/reservation" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 btn-gold rounded-full text-base font-semibold">
          <i class="fas fa-calendar-check"></i>온라인 상담 예약
        </a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/30 rounded-full text-base font-semibold hover:bg-white/10 transition">
          <i class="fas fa-phone"></i>054-636-8222
        </a>
      </div>
      
      <div class="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400 fade-in">
        <span><i class="fas fa-clock text-gold mr-1"></i>평일 09:00~17:30</span>
        <span><i class="fas fa-map-marker-alt text-gold mr-1"></i>영주시 대학로 217</span>
      </div>
    </div>
  </section>
  `
}
