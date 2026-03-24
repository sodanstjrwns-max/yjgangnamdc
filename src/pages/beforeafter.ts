// ===== 비포/애프터 게시판 페이지 =====

// 비포/애프터 목록 페이지
export function beforeAfterListPage(cases: any[]): string {
  const categories = ['전체', '임플란트', 'CEREC', '교정', '심미보철', '구강외과'];

  const casesHtml = cases.length > 0 ? cases.map(c => `
    <a href="/before-after/${c.slug}" class="card-premium group block stagger-item overflow-hidden">
      <!-- Image comparison -->
      <div class="relative aspect-[16/9] overflow-hidden">
        <div class="absolute inset-0 grid grid-cols-2">
          <div class="relative overflow-hidden border-r-2 border-white">
            <img src="${c.before_image}" alt="${c.title} 치료 전" class="w-full h-full object-cover" loading="lazy">
            <div class="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-charcoal/70 text-white text-[10px] font-bold backdrop-blur-sm">BEFORE</div>
          </div>
          <div class="relative overflow-hidden">
            <img src="${c.after_image}" alt="${c.title} 치료 후" class="w-full h-full object-cover" loading="lazy">
            <div class="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-royal/80 text-white text-[10px] font-bold backdrop-blur-sm">AFTER</div>
          </div>
        </div>
        <!-- Center divider -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
          <i class="fas fa-arrows-left-right text-royal text-xs"></i>
        </div>
      </div>
      <!-- Info -->
      <div class="p-6 md:p-7">
        <div class="flex items-center gap-2 mb-3">
          <span class="px-3 py-1 rounded-full bg-royal/[0.06] text-royal text-[10px] font-bold border border-royal/[0.08]">${c.category}</span>
          ${c.patient_info ? `<span class="text-gray-300 text-[11px]">${c.patient_info}</span>` : ''}
        </div>
        <h2 class="text-lg font-extrabold text-charcoal mb-2 group-hover:text-royal transition-colors duration-500">${c.title}</h2>
        <p class="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">${c.treatment_desc}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 text-[11px] text-gray-400">
            ${c.duration ? `<span class="flex items-center gap-1"><i class="fas fa-clock text-royal/40 text-[9px]"></i>${c.duration}</span>` : ''}
            ${c.doctor ? `<span class="flex items-center gap-1"><i class="fas fa-user-doctor text-royal/40 text-[9px]"></i>${c.doctor}</span>` : ''}
          </div>
          <div class="flex items-center gap-1 text-royal text-sm font-bold group-hover:gap-2 transition-all duration-500">상세 <i class="fas fa-arrow-right text-[10px]"></i></div>
        </div>
      </div>
    </a>
  `).join('') : `
    <div class="col-span-full text-center py-20">
      <div class="w-20 h-20 mx-auto rounded-3xl bg-royal/[0.06] flex items-center justify-center mb-6">
        <i class="fas fa-images text-royal text-2xl"></i>
      </div>
      <p class="text-gray-400 text-lg font-medium mb-2">아직 등록된 사례가 없습니다</p>
      <p class="text-gray-300 text-sm">곧 치료 사례를 올려드리겠습니다.</p>
    </div>
  `;

  const categoriesHtml = categories.map(cat => `
    <button onclick="filterBA('${cat}')" class="ba-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${cat === '전체' ? 'royal-grad text-white border-royal' : 'bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal'}" data-category="${cat}">${cat}</button>
  `).join('');

  return `
  <!-- Hero -->
  <section class="relative min-h-[50vh] flex items-end subpage-hero overflow-hidden" aria-label="치료 전후 사례">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-20 pt-44 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>BEFORE & AFTER</div>
      <h1 class="display-xl text-charcoal mb-4" data-speakable="true">치료 전후 <span class="royal-grad-text">사례</span></h1>
      <p class="text-gray-400 text-lg" data-speakable="true">구강외과 전문의가 직접 시행한 치료 결과를 확인하세요</p>
    </div>
  </section>

  <!-- Notice -->
  <section class="bg-white border-b border-gray-100">
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-5">
      <div class="flex items-start gap-3 p-4 rounded-2xl bg-royal/[0.03] border border-royal/[0.06]">
        <i class="fas fa-info-circle text-royal text-sm mt-0.5"></i>
        <p class="text-gray-500 text-xs leading-relaxed">실제 환자분의 동의를 받아 게시하는 치료 사례입니다. 개인별 치료 결과는 구강 상태에 따라 다를 수 있습니다. 정확한 진단은 내원 상담을 통해 받아보세요.</p>
      </div>
    </div>
  </section>

  <!-- Category Filter -->
  <section class="bg-white sticky top-16 md:top-[108px] z-30 border-b border-gray-100">
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-4">
      <div class="flex gap-2 overflow-x-auto scrollbar-hide" style="scrollbar-width:none;-ms-overflow-style:none;">
        ${categoriesHtml}
      </div>
    </div>
  </section>

  <!-- Cases Grid -->
  <section class="py-16 md:py-24 bg-white" aria-label="치료 전후 사례 목록" itemscope itemtype="https://schema.org/CollectionPage">
    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children" id="baGrid">
        ${casesHtml}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 md:py-28 section-lavender relative overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-images text-white text-xl"></i></div>
      <h2 class="display-md text-charcoal mb-4">나도 이렇게 <span class="royal-grad-text">변할 수 있을까?</span></h2>
      <p class="text-gray-400 mb-8">구강 상태에 따라 치료 결과는 달라집니다. 정확한 진단을 받아보세요.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="btn-primary !py-5 !px-12"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="btn-subtle"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>

  <script>
    function filterBA(cat) {
      document.querySelectorAll('.ba-cat-btn').forEach(btn => {
        if(btn.dataset.category === cat) {
          btn.className = 'ba-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border royal-grad text-white border-royal';
        } else {
          btn.className = 'ba-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal';
        }
      });
      if(cat === '전체') { window.location.href = '/before-after'; }
      else { window.location.href = '/before-after?category=' + encodeURIComponent(cat); }
    }
  </script>
  `;
}

// 비포/애프터 상세 페이지
export function beforeAfterDetailPage(c: any): { html: string; title: string; description: string; schemas: object[] } {
  const tagsHtml = c.tags ? c.tags.split(',').map((t: string) =>
    `<span class="px-3.5 py-1.5 rounded-full bg-royal/[0.04] text-royal text-[11px] font-bold border border-royal/[0.08]">#${t.trim()}</span>`
  ).join('') : '';

  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": c.title,
    "description": c.treatment_desc,
    "about": {
      "@type": "MedicalProcedure",
      "name": c.category,
      "procedureType": "Surgical",
      "howPerformed": c.treatment_desc
    },
    "mainEntityOfPage": `https://kndent.kr/before-after/${c.slug}`,
    "author": {
      "@type": "Physician",
      "name": c.doctor || '강남치과의원',
      "worksFor": { "@id": "https://kndent.kr/#organization" }
    },
    "datePublished": c.published_at,
    "publisher": { "@id": "https://kndent.kr/#organization" }
  };

  const html = `
  <!-- Hero -->
  <section class="relative min-h-[40vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-16 pt-44 w-full">
      <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="breadcrumb">
        <a href="/" class="hover:text-royal transition-colors">홈</a>
        <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
        <a href="/before-after" class="hover:text-royal transition-colors">치료 전후</a>
        <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
        <span class="text-charcoal font-medium">${c.category}</span>
      </nav>
      <div class="flex items-center gap-3 mb-5">
        <span class="px-4 py-2 rounded-full royal-grad text-white text-[11px] font-bold">${c.category}</span>
        ${c.patient_info ? `<span class="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-500 text-[11px] font-bold">${c.patient_info}</span>` : ''}
      </div>
      <h1 class="display-lg text-charcoal" data-speakable="true">${c.title}</h1>
    </div>
  </section>

  <!-- Before/After Comparison -->
  <section class="py-12 md:py-20 bg-white" aria-label="치료 전후 비교">
    <div class="max-w-5xl mx-auto px-6 md:px-8">
      <!-- Slider comparison -->
      <div class="card-premium overflow-hidden mb-10 reveal">
        <div class="relative" id="baCompare" style="aspect-ratio:16/9;cursor:ew-resize;user-select:none;touch-action:none;">
          <!-- After (full) -->
          <img src="${c.after_image}" alt="${c.title} 치료 후" class="absolute inset-0 w-full h-full object-cover">
          <!-- Before (clipped) -->
          <div class="absolute inset-0 overflow-hidden" id="baBeforeClip" style="width:50%;">
            <img src="${c.before_image}" alt="${c.title} 치료 전" class="absolute inset-0 w-full h-full object-cover" style="min-width:calc(100vw - 3rem);max-width:none;width:auto;">
          </div>
          <!-- Slider handle -->
          <div class="absolute top-0 bottom-0 z-20" id="baHandle" style="left:50%;transform:translateX(-50%);">
            <div class="w-[3px] h-full bg-white shadow-lg"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
              <i class="fas fa-arrows-left-right text-royal"></i>
            </div>
          </div>
          <!-- Labels -->
          <div class="absolute top-4 left-4 px-4 py-2 rounded-full bg-charcoal/70 text-white text-xs font-bold backdrop-blur-sm z-10">BEFORE</div>
          <div class="absolute top-4 right-4 px-4 py-2 rounded-full bg-royal/80 text-white text-xs font-bold backdrop-blur-sm z-10">AFTER</div>
        </div>
      </div>

      <!-- Treatment Info -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal">
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-extrabold text-charcoal mb-6">치료 내용</h2>
          <p class="text-gray-500 text-base leading-relaxed mb-8" data-speakable="true">${c.treatment_desc}</p>

          ${tagsHtml ? `<div class="flex flex-wrap gap-2 mb-8">${tagsHtml}</div>` : ''}
        </div>

        <div class="space-y-4">
          ${[
            { icon: 'fa-user-doctor', label: '담당 의료진', value: c.doctor || '-' },
            { icon: 'fa-clock', label: '치료 기간', value: c.duration || '-' },
            { icon: 'fa-stethoscope', label: '치료 분류', value: c.category },
            { icon: 'fa-user', label: '환자 정보', value: c.patient_info || '-' }
          ].map(item => `
          <div class="card-premium p-5 flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center flex-shrink-0"><i class="fas ${item.icon} text-white text-xs"></i></div>
            <div>
              <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">${item.label}</div>
              <div class="text-charcoal font-bold text-sm">${item.value}</div>
            </div>
          </div>
          `).join('')}
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
        <a href="/before-after" class="flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm font-bold"><i class="fas fa-arrow-left text-xs"></i>목록으로</a>
        <a href="/reservation" class="btn-primary !py-3 !px-8 !text-sm"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 md:py-28 section-lavender relative overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <h2 class="display-md text-charcoal mb-4">나도 이렇게 <span class="royal-grad-text">바뀔 수 있을까?</span></h2>
      <p class="text-gray-400 mb-8">구강외과 전문의가 직접 상담드립니다.</p>
      <a href="/reservation" class="btn-primary !py-5 !px-12"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
    </div>
  </section>

  <script>
  (function(){
    const comp = document.getElementById('baCompare');
    const clip = document.getElementById('baBeforeClip');
    const handle = document.getElementById('baHandle');
    if(!comp||!clip||!handle) return;
    let dragging = false;
    function setPos(x) {
      const rect = comp.getBoundingClientRect();
      let pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      clip.style.width = pct + '%';
      handle.style.left = pct + '%';
    }
    comp.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', e => { if(dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);
    comp.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, {passive:true});
    window.addEventListener('touchmove', e => { if(dragging) setPos(e.touches[0].clientX); }, {passive:true});
    window.addEventListener('touchend', () => dragging = false);
  })();
  </script>
  `;

  return {
    html,
    title: `${c.title} | 치료 전후 사례 – 강남치과의원`,
    description: `${c.treatment_desc.substring(0, 150)}...`,
    schemas: [caseSchema]
  };
}
