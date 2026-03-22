interface AreaInfo { name:string; driveTime:string; driveKm:string; description:string; priority:number }
const areaData: Record<string,AreaInfo> = {
  '영주시':{ name:'영주시', driveTime:'시내', driveKm:'-', description:'영주시 중심부에 위치한 강남치과의원은 택지 사거리 모모제인 건물 2층에서 쉽게 찾으실 수 있습니다.', priority:1 },
  '영주역':{ name:'영주역', driveTime:'약 10분', driveKm:'약 4km', description:'영주역에서 택시로 약 10분 거리입니다.', priority:1 },
  '풍기':{ name:'풍기', driveTime:'약 15분', driveKm:'약 12km', description:'풍기읍에서 자동차로 약 15분이면 도착합니다.', priority:1 },
  '봉화':{ name:'봉화', driveTime:'약 30분', driveKm:'약 25km', description:'봉화군에서 자동차로 약 30분 거리입니다.', priority:2 },
  '예천':{ name:'예천', driveTime:'약 40분', driveKm:'약 35km', description:'예천군에서 자동차로 약 40분 거리입니다.', priority:2 },
  '안동':{ name:'안동', driveTime:'약 50분', driveKm:'약 50km', description:'안동시에서 자동차로 약 50분 거리입니다.', priority:2 },
  '단양':{ name:'단양', driveTime:'약 40분', driveKm:'약 40km', description:'단양군에서 자동차로 약 40분 거리입니다.', priority:3 },
  '영덕':{ name:'영덕', driveTime:'약 1시간', driveKm:'약 70km', description:'영덕군에서 자동차로 약 1시간 거리입니다.', priority:3 },
  '울진':{ name:'울진', driveTime:'약 1시간 20분', driveKm:'약 90km', description:'울진군에서 자동차로 약 1시간 20분 거리입니다.', priority:3 }
}
export function areaPage(region:string): { html:string; title:string; description:string } | null {
  const decoded = decodeURIComponent(region)
  const area = areaData[decoded]
  if (!area) return null
  const isLocal = area.priority === 1
  const title = isLocal ? `${area.name} 치과 – 강남치과의원 | 구강외과 전문의` : `${area.name}에서 강남치과의원까지 차로 ${area.driveTime}`
  const description = `${area.name}에서 강남치과의원까지 ${area.driveTime}. 구강외과 전문의 2인 직접 진료.`
  return {
    title, description,
    html: `
    <!-- Hero (White) -->
    <section class="relative min-h-[60vh] flex items-end subpage-hero overflow-hidden">
      <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
      <div class="absolute inset-0 grid-pattern opacity-40"></div>
      <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-44 w-full">
        <a href="/directions" class="inline-flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm mb-8 font-medium"><i class="fas fa-arrow-left text-xs"></i>오시는 길</a>
        <h1 class="display-lg text-charcoal mb-6">${title}</h1>
        <p class="text-gray-400 text-lg">${area.description}</p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-20 md:py-28 bg-white">
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 stagger-children">
          <div class="card-premium p-10 text-center stagger-item group">
            <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-car text-white text-xl"></i></div>
            <p class="text-4xl font-black text-charcoal">${area.driveTime}</p>
            <p class="text-gray-400 text-sm mt-2">자동차 소요시간</p>
          </div>
          <div class="card-premium p-10 text-center stagger-item group">
            <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-road text-white text-xl"></i></div>
            <p class="text-4xl font-black text-charcoal">${area.driveKm}</p>
            <p class="text-gray-400 text-sm mt-2">거리</p>
          </div>
          <div class="card-premium p-10 text-center stagger-item group">
            <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-map-marker-alt text-white text-xl"></i></div>
            <p class="text-xl font-black text-charcoal">택지 사거리 모모제인 건물 2층</p>
            <p class="text-gray-400 text-sm mt-2">위치</p>
          </div>
        </div>

        <!-- Why choose us -->
        <div class="mb-20 reveal">
          <div class="text-center mb-14">
            <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>WHY US</div>
            <h2 class="display-md text-charcoal">${area.name} 분들이 선택하는 이유</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
            ${[
              {icon:'fa-user-doctor',title:'구강외과 전문의 2인',desc:'수술 전문 외과 전문의 2인 상주. 임플란트, 뼈이식, 사랑니 전문.'},
              {icon:'fa-bolt',title:'당일 보철 완성',desc:'CEREC 시스템으로 한 번 방문에 보철 완성. 먼 거리에서도 편리.'},
              {icon:'fa-microchip',title:'대학병원급 장비',desc:'CT, CEREC, PrimeScan, iTero 등 최첨단 디지털 장비 완비.'},
              {icon:'fa-clock',title:'빠른 치료 완료',desc:'재내원 최소화로 먼 거리에서 오시는 분도 편리합니다.'}
            ].map(item => `
            <div class="card-premium p-7 flex items-start gap-5 stagger-item group">
              <div class="w-13 h-13 rounded-xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow group-hover:scale-110 transition-transform duration-500" style="width:52px;height:52px;">
                <i class="fas ${item.icon} text-white text-lg"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-charcoal mb-1.5 group-hover:text-royal transition-colors duration-300">${item.title}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">${item.desc}</p>
              </div>
            </div>
            `).join('')}
          </div>
        </div>

        <!-- Clinic info -->
        <div class="glass-royal rounded-3xl p-8 reveal relative overflow-hidden">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-royal/[0.04] rounded-full blur-[60px]"></div>
          <h2 class="font-extrabold text-charcoal mb-6 text-lg relative z-10">강남치과의원 정보</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-500 relative z-10">
            <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-map-marker-alt text-white text-[10px]"></i></div><span>경북 영주시 대학로 217, 2층</span></div>
            <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-phone text-white text-[10px]"></i></div><a href="tel:054-636-8222" class="hover:text-royal transition font-bold">054-636-8222</a></div>
            <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-clock text-white text-[10px]"></i></div><span>평일 09:00–17:30 · 토일 휴무</span></div>
            <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-car text-white text-[10px]"></i></div><span>건물 후면 지상·지하 주차장</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA (White) -->
    <section class="py-28 section-snow relative overflow-hidden">
      <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
      <div class="absolute inset-0 grid-pattern opacity-20"></div>
      <div class="royal-line-h absolute top-0 left-0 right-0"></div>

      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
        <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
          <i class="fas fa-calendar-check text-white text-3xl"></i>
        </div>
        <h2 class="display-lg text-charcoal mb-6">지금 바로<br><span class="royal-grad-text">상담 예약하세요</span></h2>
        <p class="text-gray-400 text-lg mb-10">${area.name}에서 ${area.driveTime}이면 도착합니다.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
          <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
        </div>
      </div>
    </section>
    `
  }
}
