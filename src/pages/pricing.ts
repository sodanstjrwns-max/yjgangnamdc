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
            {name:'Neo 임플란트',desc:'맞춤 어버트먼트 + 지르코니아',price:'1,300,000원'},
            {name:'Osstem 임플란트',desc:'맞춤 어버트먼트 + 지르코니아',price:'1,300,000원'},
            {name:'뼈이식 (단순)',price:'500,000원'},
            {name:'뼈이식 (복합)',price:'800,000원'},
            {name:'상악동 거상술 (치조정)',price:'800,000원'},
            {name:'상악동 거상술 (측방)',price:'1,500,000원'},
            {name:'보철 추가 (폰틱/리메이크)',price:'500,000원'}
          ]},
          { icon:'fa-gem', title:'보철', items:[
            {name:'메탈 크라운',price:'300,000원'},
            {name:'A타입 골드 크라운',price:'1,000,000원'},
            {name:'PFM 크라운',price:'350,000원'},
            {name:'지르코니아 크라운',price:'500,000원'},
            {name:'임시치아',price:'15,000원'}
          ]},
          { icon:'fa-teeth-open', title:'틀니', items:[
            {name:'부분 틀니',price:'1,300,000원'},
            {name:'전체 틀니',price:'1,300,000원'},
            {name:'틀니 수리',price:'100,000원'},
            {name:'틀니 조정',price:'350,000원'},
            {name:'임시 틀니',price:'400,000원'},
            {name:'와이어-템 베이스',price:'100,000원'},
            {name:'치아 추가 (1개당)',price:'50,000원'},
            {name:'와이어 추가',price:'30,000원'}
          ]},
          { icon:'fa-shield-halved', title:'보존 치료', items:[
            {name:'레진 (1면)',price:'80,000원'},
            {name:'레진 (2면)',price:'120,000원'},
            {name:'레진 (3면)',price:'170,000원'},
            {name:'전치부 레진',price:'150,000원'},
            {name:'테세라 인레이',price:'300,000원'},
            {name:'골드 인레이 (1면)',price:'800,000원'},
            {name:'골드 인레이 (2면)',price:'1,000,000원'},
            {name:'라미네이트',price:'600,000원'}
          ]},
          { icon:'fa-child', title:'소아 치료', items:[
            {name:'유치 레진',price:'80,000원'},
            {name:'SS 크라운',price:'120,000원'},
            {name:'밴드앤루프',price:'150,000원'},
            {name:'치아 홈 메우기',price:'40,000원'},
            {name:'불소 도포',price:'30,000원'}
          ]},
          { icon:'fa-teeth', title:'교정', items:[
            {name:'교정 검사비',price:'200,000원'},
            {name:'고정식 교정',price:'5,000,000원'},
            {name:'자가결찰 브라켓',price:'5,500,000원'},
            {name:'유지장치',price:'200,000원'},
            {name:'부분교정',price:'1,500,000원'},
            {name:'성장조절장치',price:'1,000,000원'},
            {name:'교정 월비용',price:'50,000원'},
            {name:'인비절라인 퍼스트 (1차)',price:'4,000,000원'},
            {name:'인비절라인 (단순)',price:'6,500,000원'},
            {name:'인비절라인 (복잡)',price:'7,000,000원'}
          ]},
          { icon:'fa-hand-holding-medical', title:'보험진료',ins:true, items:[
            {name:'근관치료 (신경치료)',price:'보험진료',ins:true},
            {name:'발치 (일반)',price:'보험진료',ins:true},
            {name:'GI 충전',price:'보험진료',ins:true},
            {name:'아말감 충전',price:'보험진료',ins:true},
            {name:'스케일링',price:'보험진료',ins:true},
            {name:'치주치료',price:'보험진료',ins:true},
            {name:'사랑니 발치 (단순/매복)',price:'보험진료',ins:true},
            {name:'X-ray / 파노라마',price:'보험진료',ins:true}
          ]},
          { icon:'fa-wand-magic-sparkles', title:'기타 / 미용 (과세)', items:[
            {name:'이갈이 장치',price:'500,000원'},
            {name:'보톡스',price:'500,000원'},
            {name:'보톡스 (50unit)',desc:'과세',price:'200,000원'},
            {name:'오피스 미백 (치아 당)',desc:'과세',price:'50,000원'},
            {name:'전체 미백 (자가미백 + 전문미백 2회)',desc:'과세',price:'600,000원'}
          ]}
        ].map(cat => `
        <div class="reveal">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-13 h-13 rounded-2xl ${cat.ins ? 'bg-emerald-500' : 'royal-grad'} flex items-center justify-center ${cat.ins ? '' : 'royal-glow'}" style="width:52px;height:52px;">
              <i class="fas ${cat.icon} text-white text-lg"></i>
            </div>
            <div>
              <h2 class="text-xl font-extrabold text-charcoal">${cat.title}</h2>
              ${cat.ins ? '<p class="text-xs text-emerald-500 font-semibold mt-0.5">건강보험 적용 항목</p>' : ''}
            </div>
            <div class="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent"></div>
          </div>
          <div class="card-premium overflow-hidden">
            <div class="divide-y divide-gray-50">
              ${cat.items.map((item: any) => `
              <div class="flex items-center justify-between px-5 md:px-7 py-4 md:py-5 hover:bg-royal/[0.02] transition-colors duration-300 group">
                <div class="flex flex-col">
                  <span class="text-sm text-gray-600 font-medium">${item.name}</span>
                  ${item.desc ? '<span class="text-xs text-gray-400 mt-0.5">' + item.desc + '</span>' : ''}
                </div>
                <span class="text-sm font-bold whitespace-nowrap ml-4 ${item.ins ? 'text-emerald-500 flex items-center gap-2' : 'text-charcoal'}">
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
