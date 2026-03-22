export function directionsPage(): string {
  return `
  <!-- Hero (White) -->
  <section class="relative min-h-[60vh] flex items-end subpage-hero overflow-hidden">
    <div class="absolute inset-0 z-[1]">
      <img src="https://www.genspark.ai/api/files/s/3gQUD6CP" alt="강남치과의원 접수대와 로고" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white"></div>
    </div>
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20 z-[2]"></div>
    <div class="absolute inset-0 grid-pattern opacity-40 z-[2]"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-48 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>DIRECTIONS</div>
      <h1 class="display-xl text-charcoal mb-6">오시는 <span class="royal-grad-text">길</span></h1>
      <p class="text-gray-400 text-lg">경북 영주시 대학로 217, 2층 · 택지 사거리 모모제인 건물</p>
    </div>
  </section>

  <!-- Map + Info -->
  <section class="py-20 md:py-32 bg-white">
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Map -->
        <div class="lg:col-span-2 reveal">
          <div class="card-premium overflow-hidden mb-6">
            <div class="aspect-[16/10] bg-gray-100 relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200!2d128.7376!3d36.8056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rCV64Ko7LmY6rO87JuQ!5e0!3m2!1sko!2skr!4v1"
                width="100%" height="100%" style="border:0;position:absolute;top:0;left:0;width:100%;height:100%;border-radius:27px;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="https://map.naver.com/p/search/%EA%B0%95%EB%82%A8%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90%20%EC%98%81%EC%A3%BC" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#03C75A] text-white text-sm font-bold hover:opacity-90 transition shadow-lg shadow-[#03C75A]/20"><i class="fas fa-map"></i>네이버 지도</a>
            <a href="https://map.kakao.com/link/search/%EA%B0%95%EB%82%A8%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90%20%EC%98%81%EC%A3%BC" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FEE500] text-charcoal text-sm font-bold hover:opacity-90 transition shadow-lg shadow-[#FEE500]/20"><i class="fas fa-map-location-dot"></i>카카오맵</a>
            <a href="https://www.google.com/maps/search/%EA%B0%95%EB%82%A8%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90+%EC%98%81%EC%A3%BC" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#4285F4] text-white text-sm font-bold hover:opacity-90 transition shadow-lg shadow-[#4285F4]/20"><i class="fas fa-location-dot"></i>구글 지도</a>
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-5 reveal-right">
          ${[
            { icon:'fa-map-marker-alt', label:'주소', value:'경북 영주시 대학로 217, 2층<br><span class="text-gray-400 text-xs">택지 사거리 모모제인 건물</span>' },
            { icon:'fa-phone', label:'전화', value:'<a href="tel:054-636-8222" class="royal-grad-text text-xl font-black hover:underline">054-636-8222</a>' },
            { icon:'fa-clock', label:'진료시간', value:'평일 09:00–17:30 (접수마감 17:00)<br><span class="text-gray-400 text-xs">점심 13:00–14:00 · 토·일·공휴일 휴무</span>' },
            { icon:'fa-car', label:'주차', value:'건물 후면 지상·지하 주차장 완비' }
          ].map(item => `
          <div class="card-premium p-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow">
                <i class="fas ${item.icon} text-white text-sm"></i>
              </div>
              <div>
                <div class="text-[10px] text-gray-400 mb-1.5 font-bold uppercase tracking-widest">${item.label}</div>
                <div class="text-gray-600 text-sm leading-relaxed">${item.value}</div>
              </div>
            </div>
          </div>
          `).join('')}
          <a href="/reservation" class="btn-primary justify-center w-full !py-5 !text-base !font-extrabold"><i class="fas fa-calendar-check text-xs"></i>상담 예약하기</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Transportation -->
  <section class="py-20 md:py-28 section-snow relative">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal/10 to-transparent"></div>
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-14 reveal">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>TRANSPORTATION</div>
        <h2 class="display-md text-charcoal">교통 안내</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        ${[
          { icon:'fa-car', title:'자가용', desc:'택지 사거리 모모제인 건물<br>후면 지상·지하 주차장' },
          { icon:'fa-bus', title:'버스', desc:'영주 시내버스 이용<br>인근 정류장 하차 후 도보' },
          { icon:'fa-train', title:'기차', desc:'영주역 하차 후<br>택시 약 10분' }
        ].map(item => `
        <div class="card-premium p-10 text-center stagger-item group">
          <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow group-hover:scale-110 transition-transform duration-500">
            <i class="fas ${item.icon} text-white text-xl"></i>
          </div>
          <h3 class="font-extrabold text-charcoal text-lg mb-2">${item.title}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">${item.desc}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Nearby areas -->
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <!-- Internal photos -->
      <div class="mb-20 reveal">
        <div class="text-center mb-10">
          <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>INSIDE</div>
          <h2 class="display-md text-charcoal">병원 내부 미리보기</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
          <div class="card-premium overflow-hidden stagger-item group">
            <div class="aspect-[4/3] overflow-hidden"><img src="https://www.genspark.ai/api/files/s/p9YyzTaw" alt="강남치과의원 대기실" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy"></div>
            <div class="p-4"><h4 class="font-extrabold text-charcoal text-sm">대기실</h4><p class="text-gray-400 text-xs mt-0.5">프리미엄 라운지형 대기 공간</p></div>
          </div>
          <div class="card-premium overflow-hidden stagger-item group">
            <div class="aspect-[4/3] overflow-hidden"><img src="https://www.genspark.ai/api/files/s/KLnijX5L" alt="강남치과의원 진료실" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy"></div>
            <div class="p-4"><h4 class="font-extrabold text-charcoal text-sm">진료실</h4><p class="text-gray-400 text-xs mt-0.5">유리 파티션 개별 진료 공간</p></div>
          </div>
          <div class="card-premium overflow-hidden stagger-item group">
            <div class="aspect-[4/3] overflow-hidden"><img src="https://www.genspark.ai/api/files/s/sOkojKif" alt="강남치과의원 상담실" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy"></div>
            <div class="p-4"><h4 class="font-extrabold text-charcoal text-sm">상담실</h4><p class="text-gray-400 text-xs mt-0.5">전문의 1:1 상담 공간</p></div>
          </div>
          <div class="card-premium overflow-hidden stagger-item group">
            <div class="aspect-[4/3] overflow-hidden"><img src="https://www.genspark.ai/api/files/s/ZaCoVLBk" alt="강남치과의원 휴게실" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy"></div>
            <div class="p-4"><h4 class="font-extrabold text-charcoal text-sm">휴게실</h4><p class="text-gray-400 text-xs mt-0.5">그랜드 피아노 · 서재 공간</p></div>
          </div>
        </div>
      </div>

      <!-- Facilities -->
      <div class="mb-20 reveal">
        <div class="text-center mb-10">
          <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FACILITIES</div>
          <h2 class="display-md text-charcoal">편의시설</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 stagger-children">
          ${[
            { icon:'fa-calendar-check', label:'예약 진료' },
            { icon:'fa-restroom', label:'남녀 화장실 구분' },
            { icon:'fa-couch', label:'대기공간' },
            { icon:'fa-credit-card', label:'간편결제' },
            { icon:'fa-square-parking', label:'주차 가능' }
          ].map(f => `
          <div class="card-premium p-6 text-center stagger-item">
            <div class="w-12 h-12 mx-auto rounded-xl royal-grad flex items-center justify-center mb-3 royal-glow">
              <i class="fas ${f.icon} text-white text-sm"></i>
            </div>
            <p class="font-bold text-charcoal text-sm">${f.label}</p>
          </div>
          `).join('')}
        </div>
      </div>

      <!-- Nearby areas heading -->
      <div class="text-center mb-14 reveal">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>NEARBY</div>
        <h2 class="display-md text-charcoal">주변 지역에서 오시는 길</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        ${[
          { area:'풍기', time:'약 15분' },{ area:'봉화', time:'약 30분' },{ area:'예천', time:'약 40분' },{ area:'안동', time:'약 50분' },
          { area:'단양', time:'약 40분' },{ area:'영덕', time:'약 1시간' },{ area:'울진', time:'약 1시간 20분' },{ area:'영주역', time:'약 10분' }
        ].map(item => `
        <a href="/area/${encodeURIComponent(item.area)}" class="card-premium p-6 text-center group stagger-item block">
          <p class="font-extrabold text-charcoal group-hover:text-royal transition-colors duration-300 text-lg">${item.area}</p>
          <p class="text-gray-400 text-sm mt-1.5"><i class="fas fa-car text-royal/50 mr-1.5"></i>${item.time}</p>
        </a>
        `).join('')}
      </div>
    </div>
  </section>
  `
}
