interface AreaInfo {
  name: string
  driveTime: string
  driveKm: string
  description: string
  priority: number
}

const areaData: Record<string, AreaInfo> = {
  '영주시': { name: '영주시', driveTime: '시내', driveKm: '-', description: '영주시 중심부에 위치한 강남치과의원은 택지 리첼 사거리에서 쉽게 찾으실 수 있습니다.', priority: 1 },
  '영주역': { name: '영주역', driveTime: '약 10분', driveKm: '약 4km', description: '영주역에서 택시로 약 10분 거리입니다.', priority: 1 },
  '풍기': { name: '풍기', driveTime: '약 15분', driveKm: '약 12km', description: '풍기읍에서 자동차로 약 15분이면 도착합니다.', priority: 1 },
  '봉화': { name: '봉화', driveTime: '약 30분', driveKm: '약 25km', description: '봉화군에서 자동차로 약 30분 거리입니다.', priority: 2 },
  '예천': { name: '예천', driveTime: '약 40분', driveKm: '약 35km', description: '예천군에서 자동차로 약 40분 거리입니다.', priority: 2 },
  '안동': { name: '안동', driveTime: '약 50분', driveKm: '약 50km', description: '안동시에서 자동차로 약 50분 거리입니다.', priority: 2 },
  '단양': { name: '단양', driveTime: '약 40분', driveKm: '약 40km', description: '단양군에서 자동차로 약 40분 거리입니다. 충북에서도 편리하게 내원하실 수 있습니다.', priority: 3 },
  '영덕': { name: '영덕', driveTime: '약 1시간', driveKm: '약 70km', description: '영덕군에서 자동차로 약 1시간 거리입니다.', priority: 3 },
  '울진': { name: '울진', driveTime: '약 1시간 20분', driveKm: '약 90km', description: '울진군에서 자동차로 약 1시간 20분 거리입니다.', priority: 3 }
}

export function areaPage(region: string): { html: string; title: string; description: string } | null {
  const decoded = decodeURIComponent(region)
  const area = areaData[decoded]
  if (!area) return null

  const isLocal = area.priority === 1
  const title = isLocal 
    ? `${area.name} 치과 – 강남치과의원 | 구강외과 전문의`
    : `${area.name}에서 강남치과의원까지 차로 ${area.driveTime}`
  const description = `${area.name}에서 강남치과의원까지 ${area.driveTime}. 구강외과 전문의 2인 직접 진료. 임플란트, 인비절라인, CEREC 당일보철.`

  return {
    title,
    description,
    html: `
    <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
      <div class="relative max-w-7xl mx-auto px-4">
        <a href="/directions" class="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition text-sm mb-6">
          <i class="fas fa-arrow-left"></i>오시는 길로 돌아가기
        </a>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">${title}</h1>
        <p class="text-gray-300 text-lg">${area.description}</p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-5xl mx-auto px-4">
        
        <!-- 거리 정보 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 fade-in">
          <div class="bg-bglight rounded-2xl p-6 border border-gray-100 text-center">
            <i class="fas fa-car text-gold text-2xl mb-3"></i>
            <p class="text-2xl font-bold text-charcoal">${area.driveTime}</p>
            <p class="text-subtext text-sm mt-1">자동차 소요시간</p>
          </div>
          <div class="bg-bglight rounded-2xl p-6 border border-gray-100 text-center">
            <i class="fas fa-road text-gold text-2xl mb-3"></i>
            <p class="text-2xl font-bold text-charcoal">${area.driveKm}</p>
            <p class="text-subtext text-sm mt-1">거리</p>
          </div>
          <div class="bg-bglight rounded-2xl p-6 border border-gray-100 text-center">
            <i class="fas fa-map-marker-alt text-gold text-2xl mb-3"></i>
            <p class="text-2xl font-bold text-charcoal">택지 리첼 사거리</p>
            <p class="text-subtext text-sm mt-1">위치</p>
          </div>
        </div>

        <!-- 왜 강남치과인가 -->
        <div class="mb-16 fade-in">
          <h2 class="text-2xl font-bold text-charcoal mb-8 text-center">
            ${area.name} 분들이 강남치과의원을 선택하는 이유
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${[
              { icon: 'fa-user-doctor', title: '구강외과 전문의 2인', desc: '일반 치과의사가 아닌, 수술 전문 구강외과 전문의가 2인 상주합니다.' },
              { icon: 'fa-bolt', title: '당일 보철 완성', desc: 'CEREC으로 한 번 방문에 보철까지 완성. 재내원을 최소화합니다.' },
              { icon: 'fa-microchip', title: '대학병원급 장비', desc: 'CT, CEREC, PrimeScan, iTero 등 최첨단 디지털 장비를 구비했습니다.' },
              { icon: 'fa-clock', title: '빠른 치료 완료', desc: '불필요한 재내원 최소화로 먼 거리에서 오시는 분들도 편리합니다.' }
            ].map(item => `
            <div class="flex items-start gap-4 p-5 bg-bglight rounded-xl border border-gray-100">
              <div class="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0">
                <i class="fas ${item.icon} text-white"></i>
              </div>
              <div>
                <h3 class="font-bold text-charcoal mb-1">${item.title}</h3>
                <p class="text-subtext text-sm">${item.desc}</p>
              </div>
            </div>
            `).join('')}
          </div>
        </div>

        <!-- 추천 진료 -->
        <div class="mb-16 fade-in">
          <h2 class="text-2xl font-bold text-charcoal mb-8 text-center">추천 진료</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${[
              { slug: 'implant', title: '임플란트', desc: '구강외과 전문의 직접 수술' },
              { slug: 'cerec', title: '당일 보철 (CEREC)', desc: '한 번 방문으로 보철 완성' },
              { slug: 'invisalign', title: '인비절라인', desc: '투명교정 인증의' }
            ].map(item => `
            <a href="/treatments/${item.slug}" class="card-hover p-6 bg-bglight rounded-xl border border-gray-100 text-center group">
              <h3 class="font-bold text-charcoal group-hover:text-gold transition mb-2">${item.title}</h3>
              <p class="text-subtext text-sm">${item.desc}</p>
            </a>
            `).join('')}
          </div>
        </div>

        <!-- 병원 정보 -->
        <div class="bg-bglight rounded-2xl p-8 border border-gray-100 fade-in">
          <h2 class="text-xl font-bold text-charcoal mb-6">강남치과의원 정보</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div class="flex items-start gap-3"><i class="fas fa-map-marker-alt text-gold mt-0.5"></i><span>경북 영주시 대학로 217, 2층 (택지 리첼 사거리)</span></div>
            <div class="flex items-center gap-3"><i class="fas fa-phone text-gold"></i><a href="tel:054-636-8222" class="hover:text-gold transition">054-636-8222</a></div>
            <div class="flex items-start gap-3"><i class="fas fa-clock text-gold mt-0.5"></i><span>평일 09:00~17:30 (점심 13~14시)<br>토·일·공휴일 휴무</span></div>
            <div class="flex items-center gap-3"><i class="fas fa-car text-gold"></i><span>주차 가능</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-charcoal text-white">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">지금 바로 상담 예약하세요</h2>
        <p class="text-gray-300 mb-8">${area.name}에서 ${area.driveTime}이면 도착합니다.<br>구강외과 전문의가 직접 상담드립니다.</p>
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
