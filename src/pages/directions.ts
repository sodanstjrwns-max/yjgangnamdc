export function directionsPage(): string {
  return `
  <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-4 text-center">
      <span class="inline-block px-4 py-1.5 bg-white/10 text-gold text-sm font-semibold rounded-full mb-4">DIRECTIONS</span>
      <h1 class="text-3xl md:text-5xl font-bold mb-4">강남치과의원 <span class="gold-text-gradient">오시는 길</span></h1>
      <p class="text-gray-300">택지 리첼 사거리 · 경북 영주시 대학로 217, 2층</p>
    </div>
  </section>

  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <!-- 지도 -->
        <div class="lg:col-span-2">
          <div class="bg-bglight rounded-2xl overflow-hidden border border-gray-100 mb-6">
            <!-- 카카오맵 정적 이미지 / iframe -->
            <div class="aspect-[16/10] bg-gray-200 flex items-center justify-center relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200!2d128.7376!3d36.8056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6rCV64Ko7LmY6rO87JuQ!5e0!3m2!1sko!2skr!4v1"
                width="100%" height="100%" style="border:0; position:absolute; top:0; left:0; width:100%; height:100%;" 
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <a href="https://map.naver.com/p/search/%EA%B0%95%EB%82%A8%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90%20%EC%98%81%EC%A3%BC" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition">
              <i class="fas fa-map"></i>네이버 지도
            </a>
            <a href="https://map.kakao.com/link/search/%EA%B0%95%EB%82%A8%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90%20%EC%98%81%EC%A3%BC" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-charcoal rounded-xl text-sm font-medium hover:bg-yellow-500 transition">
              <i class="fas fa-map-location-dot"></i>카카오맵
            </a>
            <a href="https://www.google.com/maps/search/%EA%B0%95%EB%82%A8%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90+%EC%98%81%EC%A3%BC" target="_blank" rel="noopener"
               class="inline-flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition">
              <i class="fas fa-location-dot"></i>구글 지도
            </a>
          </div>
        </div>

        <!-- 정보 -->
        <div class="space-y-6">
          <div class="bg-bglight rounded-2xl p-6 border border-gray-100">
            <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2"><i class="fas fa-map-marker-alt text-gold"></i>주소</h3>
            <p class="text-gray-600 leading-relaxed">
              경북 영주시 대학로 217, 2층<br>
              <span class="text-subtext text-sm">(택지 리첼 사거리)</span>
            </p>
          </div>

          <div class="bg-bglight rounded-2xl p-6 border border-gray-100">
            <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2"><i class="fas fa-phone text-gold"></i>연락처</h3>
            <a href="tel:054-636-8222" class="text-gold text-xl font-bold hover:underline">054-636-8222</a>
          </div>

          <div class="bg-bglight rounded-2xl p-6 border border-gray-100">
            <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2"><i class="fas fa-clock text-gold"></i>진료시간</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex justify-between"><span>평일 (월~금)</span><span class="font-semibold">09:00 ~ 17:30</span></li>
              <li class="flex justify-between"><span>점심시간</span><span class="font-semibold">13:00 ~ 14:00</span></li>
              <li class="flex justify-between text-red-400"><span>토·일·공휴일</span><span class="font-semibold">휴무</span></li>
            </ul>
          </div>

          <div class="bg-bglight rounded-2xl p-6 border border-gray-100">
            <h3 class="font-bold text-charcoal mb-4 flex items-center gap-2"><i class="fas fa-car text-gold"></i>주차 안내</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              건물 앞 주차 가능합니다.<br>
              자세한 주차 안내는 내원 시 안내드립니다.
            </p>
          </div>

          <a href="/reservation" class="block w-full text-center py-4 btn-gold rounded-xl font-semibold">
            <i class="fas fa-calendar-check mr-2"></i>상담 예약하기
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 교통 안내 -->
  <section class="py-16 bg-bglight">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-charcoal mb-8 text-center fade-in">교통 안내</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
        <div class="bg-white rounded-2xl p-6 border border-gray-100 text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4">
            <i class="fas fa-car text-white text-xl"></i>
          </div>
          <h3 class="font-bold text-charcoal mb-2">자가용</h3>
          <p class="text-subtext text-sm leading-relaxed">택지 리첼 사거리 인근<br>건물 앞 주차 가능</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-gray-100 text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4">
            <i class="fas fa-bus text-white text-xl"></i>
          </div>
          <h3 class="font-bold text-charcoal mb-2">버스</h3>
          <p class="text-subtext text-sm leading-relaxed">영주 시내버스 이용<br>인근 정류장 하차 후 도보 이동</p>
        </div>
        <div class="bg-white rounded-2xl p-6 border border-gray-100 text-center">
          <div class="w-14 h-14 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4">
            <i class="fas fa-train text-white text-xl"></i>
          </div>
          <h3 class="font-bold text-charcoal mb-2">기차</h3>
          <p class="text-subtext text-sm leading-relaxed">영주역 하차 후<br>택시 약 10분</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 주변 지역 안내 -->
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-charcoal mb-8 text-center fade-in">주변 지역에서 오시는 길</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in">
        ${[
          { area: '풍기', time: '약 15분' },
          { area: '봉화', time: '약 30분' },
          { area: '예천', time: '약 40분' },
          { area: '안동', time: '약 50분' },
          { area: '단양', time: '약 40분' },
          { area: '영덕', time: '약 1시간' },
          { area: '울진', time: '약 1시간 20분' },
          { area: '영주역', time: '약 10분' }
        ].map(item => `
        <a href="/area/${encodeURIComponent(item.area)}" class="card-hover p-4 bg-bglight rounded-xl border border-gray-100 text-center group">
          <p class="font-semibold text-charcoal group-hover:text-gold transition">${item.area}</p>
          <p class="text-subtext text-sm mt-1"><i class="fas fa-car text-gold mr-1"></i>${item.time}</p>
        </a>
        `).join('')}
      </div>
    </div>
  </section>
  `
}
