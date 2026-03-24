// ===== 공지사항 페이지 =====

// 공지사항 목록 페이지
export function noticeListPage(notices: any[]): string {
  const categories = ['전체', '공지', '휴진', '장비', '이벤트'];

  const noticesHtml = notices.length > 0 ? notices.map(notice => `
    <a href="/notices/${notice.slug}" class="block stagger-item group">
      <div class="card-premium p-6 md:p-7 flex items-start gap-5 hover:!border-royal/20">
        <!-- Icon -->
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getCategoryStyle(notice.category)}">
          <i class="fas ${getCategoryIcon(notice.category)} text-sm"></i>
        </div>
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2.5 flex-wrap">
            ${notice.is_pinned ? '<span class="px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-[10px] font-bold border border-red-100"><i class="fas fa-thumbtack mr-1 text-[8px]"></i>고정</span>' : ''}
            <span class="px-2.5 py-1 rounded-full bg-royal/[0.06] text-royal text-[10px] font-bold border border-royal/[0.08]">${notice.category}</span>
            <span class="text-gray-300 text-[11px]">${formatDate(notice.published_at)}</span>
            <span class="text-gray-300 text-[11px] flex items-center gap-1"><i class="fas fa-eye text-[8px]"></i>${notice.views || 0}</span>
          </div>
          <h2 class="text-lg font-extrabold text-charcoal group-hover:text-royal transition-colors duration-500 line-clamp-1">${notice.title}</h2>
          <p class="text-gray-400 text-sm leading-relaxed mt-1.5 line-clamp-2">${stripHtml(notice.content).substring(0, 120)}...</p>
        </div>
        <!-- Arrow -->
        <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-royal/10 transition-all duration-300 mt-1">
          <i class="fas fa-chevron-right text-gray-300 text-[10px] group-hover:text-royal transition-colors"></i>
        </div>
      </div>
    </a>
  `).join('') : `
    <div class="text-center py-20">
      <div class="w-20 h-20 mx-auto rounded-3xl bg-royal/[0.06] flex items-center justify-center mb-6">
        <i class="fas fa-bullhorn text-royal text-2xl"></i>
      </div>
      <p class="text-gray-400 text-lg font-medium mb-2">아직 공지사항이 없습니다</p>
      <p class="text-gray-300 text-sm">새로운 소식이 있으면 알려드리겠습니다.</p>
    </div>
  `;

  const categoriesHtml = categories.map(cat => `
    <button onclick="filterNotice('${cat}')" class="notice-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${cat === '전체' ? 'royal-grad text-white border-royal' : 'bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal'}" data-category="${cat}">${cat}</button>
  `).join('');

  return `
  <!-- Hero -->
  <section class="relative min-h-[50vh] flex items-end subpage-hero overflow-hidden" aria-label="공지사항">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-20 pt-44 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>NOTICE</div>
      <h1 class="display-xl text-charcoal mb-4" data-speakable="true"><span class="royal-grad-text">공지사항</span></h1>
      <p class="text-gray-400 text-lg" data-speakable="true">강남치과의원의 새로운 소식과 안내를 확인하세요</p>
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

  <!-- Notices List -->
  <section class="py-16 md:py-24 bg-white" aria-label="공지사항 목록">
    <div class="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
      <div class="space-y-4 stagger-children" id="noticeGrid">
        ${noticesHtml}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 md:py-28 section-lavender relative overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <h2 class="display-md text-charcoal mb-4">궁금한 점이 있으신가요?</h2>
      <p class="text-gray-400 text-lg mb-8">구강외과 전문의가 직접 상담드립니다.</p>
      <a href="/reservation" class="btn-primary !py-5 !px-12"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
    </div>
  </section>

  <script>
    function filterNotice(cat) {
      document.querySelectorAll('.notice-cat-btn').forEach(btn => {
        if(btn.dataset.category === cat) {
          btn.className = 'notice-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border royal-grad text-white border-royal';
        } else {
          btn.className = 'notice-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal';
        }
      });
      if(cat === '전체') { window.location.href = '/notices'; }
      else { window.location.href = '/notices?category=' + encodeURIComponent(cat); }
    }
  </script>
  `;
}

// 공지사항 상세 페이지
export function noticeDetailPage(notice: any): { html: string; title: string; description: string; schemas: object[] } {
  const noticeSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": notice.title,
    "description": stripHtml(notice.content).substring(0, 160),
    "author": {
      "@type": "Organization",
      "name": notice.author || '강남치과의원',
      "@id": "https://kndent.kr/#organization"
    },
    "publisher": { "@id": "https://kndent.kr/#organization" },
    "datePublished": notice.published_at,
    "dateModified": notice.updated_at || notice.published_at,
    "mainEntityOfPage": `https://kndent.kr/notices/${notice.slug}`,
    "articleSection": notice.category,
    "inLanguage": "ko"
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
        <a href="/notices" class="hover:text-royal transition-colors">공지사항</a>
        <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
        <span class="text-charcoal font-medium">${notice.category}</span>
      </nav>
      <div class="flex items-center gap-3 mb-5">
        ${notice.is_pinned ? '<span class="px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-[11px] font-bold border border-red-100"><i class="fas fa-thumbtack mr-1 text-[9px]"></i>고정</span>' : ''}
        <span class="px-4 py-2 rounded-full royal-grad text-white text-[11px] font-bold">${notice.category}</span>
        <span class="text-gray-400 text-sm">${formatDate(notice.published_at)}</span>
        <span class="text-gray-400 text-sm flex items-center gap-1"><i class="fas fa-eye text-[10px]"></i>${notice.views || 0}회</span>
      </div>
      <h1 class="display-lg text-charcoal" data-speakable="true">${notice.title}</h1>
    </div>
  </section>

  <!-- Content -->
  <article class="py-16 md:py-24 bg-white" aria-label="공지사항 본문">
    <div class="max-w-3xl mx-auto px-6 md:px-8">
      <div class="flex items-center gap-4 mb-12 pb-8 border-b border-gray-100">
        <div class="w-12 h-12 rounded-xl ${getCategoryStyle(notice.category)} flex items-center justify-center">
          <i class="fas ${getCategoryIcon(notice.category)} text-sm"></i>
        </div>
        <div>
          <div class="text-charcoal font-bold">${notice.author || '강남치과의원'}</div>
          <div class="text-gray-400 text-sm">${formatDate(notice.published_at)} 작성</div>
        </div>
      </div>

      <div class="notice-content" data-speakable="true">
        ${notice.content}
      </div>

      <!-- Navigation -->
      <div class="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
        <a href="/notices" class="flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm font-bold"><i class="fas fa-arrow-left text-xs"></i>목록으로</a>
        <a href="/reservation" class="btn-primary !py-3 !px-8 !text-sm"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
      </div>
    </div>
  </article>

  <!-- CTA -->
  <section class="py-20 md:py-28 section-lavender relative overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-tooth text-white text-xl"></i></div>
      <h2 class="display-md text-charcoal mb-4">진료 관련 문의가 있으신가요?</h2>
      <p class="text-gray-400 mb-8">구강외과 전문의가 직접 상담드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="btn-primary !py-5 !px-12"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="btn-subtle"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>

  <style>
    .notice-content h2 { font-size: 1.5rem; font-weight: 800; color: #1C1C1E; margin: 2.5rem 0 1rem; line-height: 1.3; }
    .notice-content h3 { font-size: 1.25rem; font-weight: 700; color: #1C1C1E; margin: 2rem 0 0.8rem; }
    .notice-content p { color: #6B7280; font-size: 1rem; line-height: 1.9; margin-bottom: 1.5rem; }
    .notice-content strong { color: #1C1C1E; font-weight: 700; }
    .notice-content ul, .notice-content ol { color: #6B7280; padding-left: 1.5rem; margin-bottom: 1.5rem; }
    .notice-content li { margin-bottom: 0.5rem; line-height: 1.8; }
    .notice-content img { border-radius: 16px; margin: 2rem 0; width: 100%; }
    .notice-content blockquote { border-left: 4px solid #10AFB2; padding: 1rem 1.5rem; background: #F3FBFB; border-radius: 0 12px 12px 0; margin: 2rem 0; color: #10AFB2; font-style: italic; }
    .notice-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
    .notice-content th { background: #F3FBFB; color: #10AFB2; font-weight: 700; padding: 12px 16px; text-align: left; border-bottom: 2px solid #E2F5F5; }
    .notice-content td { padding: 10px 16px; border-bottom: 1px solid #F3F4F6; color: #6B7280; }
    .notice-content tr:hover td { background: #FAFBFC; }
  </style>
  `;

  return {
    html,
    title: `${notice.title} | 강남치과의원 공지사항`,
    description: stripHtml(notice.content).substring(0, 160),
    schemas: [noticeSchema]
  };
}

// 헬퍼: 카테고리별 아이콘
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    '공지': 'fa-bullhorn',
    '휴진': 'fa-calendar-xmark',
    '장비': 'fa-microchip',
    '이벤트': 'fa-gift',
  };
  return icons[category] || 'fa-bell';
}

// 헬퍼: 카테고리별 스타일
function getCategoryStyle(category: string): string {
  const styles: Record<string, string> = {
    '공지': 'bg-royal/[0.08] text-royal',
    '휴진': 'bg-red-50 text-red-400',
    '장비': 'bg-blue-50 text-blue-400',
    '이벤트': 'bg-amber-50 text-amber-500',
  };
  return styles[category] || 'bg-gray-50 text-gray-400';
}

// 헬퍼: HTML 태그 제거
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}
