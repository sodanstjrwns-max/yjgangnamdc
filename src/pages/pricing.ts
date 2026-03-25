export function pricingPage(): string {
  return `
  <!-- Hero (White) -->
  <section class="relative min-h-[40vh] md:min-h-[60vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-16 pt-28 md:pb-24 md:pt-48 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>PRICING</div>
      <h1 class="display-xl text-charcoal mb-6">진료비용 <span class="royal-grad-text">안내</span></h1>
      <p class="text-gray-400 text-lg">투명한 비용, 합리적인 진료를 약속합니다.</p>
    </div>
  </section>

  <!-- Pricing -->
  <section class="py-14 md:py-20 lg:py-32 bg-white">
    <div class="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">

      <!-- Notice -->
      <div class="glass-royal rounded-3xl p-7 mb-12 md:mb-20 reveal relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-royal/[0.04] rounded-full blur-[60px]"></div>
        <div class="flex items-start gap-5 relative z-10">
          <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow"><i class="fas fa-info text-white"></i></div>
          <div>
            <h3 class="font-extrabold text-charcoal mb-3">비용 안내 사항</h3>
            <ul class="text-sm text-gray-500 space-y-1.5">
              <li class="flex items-start gap-2"><span class="w-1 h-1 rounded-full bg-royal mt-2 flex-shrink-0"></span>아래 비용은 참고용이며, 환자분의 구강 상태에 따라 달라질 수 있습니다.</li>
              <li class="flex items-start gap-2"><span class="w-1 h-1 rounded-full bg-royal mt-2 flex-shrink-0"></span>정확한 비용은 진단 후 상담 시 안내드립니다.</li>
              <li class="flex items-start gap-2"><span class="w-1 h-1 rounded-full bg-royal mt-2 flex-shrink-0"></span>건강보험 적용 항목은 본인부담금이 달라집니다.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Pricing tables -->
      <div class="space-y-16">
        ${[
          { icon:'fa-tooth', title:'임플란트', items:[
            {name:'임플란트 (1개)',price:'상담 후 안내'},{name:'뼈이식 (단순)',price:'상담 후 안내'},{name:'상악동 거상술',price:'상담 후 안내'},{name:'임플란트 틀니',price:'상담 후 안내'}
          ]},
          { icon:'fa-teeth', title:'교정', items:[
            {name:'인비절라인 (풀)',price:'상담 후 안내'},{name:'인비절라인 (부분)',price:'상담 후 안내'},{name:'교정 검사비',price:'상담 후 안내'}
          ]},
          { icon:'fa-gem', title:'보철 / 심미', items:[
            {name:'CEREC 크라운 (당일)',price:'상담 후 안내'},{name:'올세라믹 크라운',price:'상담 후 안내'},{name:'지르코니아 크라운',price:'상담 후 안내'},
            {name:'라미네이트 (1개)',price:'상담 후 안내'},{name:'인레이 / 온레이',price:'상담 후 안내'},{name:'레진 충전',price:'상담 후 안내'}
          ]},
          { icon:'fa-hand-holding-medical', title:'일반 / 외과', items:[
            {name:'스케일링',price:'건강보험 적용',ins:true},{name:'사랑니 발치 (단순)',price:'건강보험 적용',ins:true},{name:'사랑니 발치 (매복)',price:'건강보험 적용',ins:true},
            {name:'신경치료',price:'건강보험 적용',ins:true},{name:'충치치료 (보험 재료)',price:'건강보험 적용',ins:true},{name:'미백',price:'상담 후 안내'}
          ]},
          { icon:'fa-teeth', title:'틀니', items:[
            {name:'전체 틀니 (65세 이상)',price:'건강보험 적용',ins:true},{name:'부분 틀니 (65세 이상)',price:'건강보험 적용',ins:true},{name:'비보험 틀니',price:'상담 후 안내'}
          ]}
        ].map(cat => `
        <div class="reveal">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-13 h-13 rounded-2xl royal-grad flex items-center justify-center royal-glow" style="width:52px;height:52px;">
              <i class="fas ${cat.icon} text-white text-lg"></i>
            </div>
            <h2 class="text-xl font-extrabold text-charcoal">${cat.title}</h2>
            <div class="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent"></div>
          </div>
          <div class="card-premium overflow-hidden">
            <div class="divide-y divide-gray-50">
              ${cat.items.map((item: any) => `
              <div class="flex items-center justify-between px-7 py-5 hover:bg-royal/[0.02] transition-colors duration-300 group">
                <span class="text-sm text-gray-600 font-medium">${item.name}</span>
                <span class="text-sm font-bold ${item.ins ? 'text-emerald-500 flex items-center gap-2' : 'text-charcoal'}">
                  ${item.ins ? '<span class="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center"><i class="fas fa-check text-emerald-500 text-[8px]"></i></span>' : ''}
                  ${item.price}
                </span>
              </div>
              `).join('')}
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA (White) -->
  <section class="py-16 md:py-28 lg:py-36 section-snow relative overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
        <i class="fas fa-won-sign text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6">정확한 비용이<br><span class="royal-grad-text">궁금하시다면?</span></h2>
      <p class="text-gray-400 text-lg mb-10">구강 상태를 직접 확인한 후 정확한 비용을 안내드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `
}
