// ===== 블로그 게시판 페이지 =====

// plain text → HTML 자동 변환 (HTML 태그가 없는 content 처리)
function formatContent(content: string): string {
  if (!content) return '';
  // 블록 레벨 HTML 태그가 이미 있는 경우 그대로 반환
  if (/<(?:p|h[1-6]|div|ul|ol|li|blockquote|table|section|article|thead|tbody|tr|td|th)[\/\s>]/i.test(content)) {
    return content;
  }

  const allLines = content.split('\n');
  const tabLineCount = allLines.filter(l => l.includes('\t')).length;

  if (tabLineCount >= 3) {
    // 테이블 포함 모드
    // 1단계: <img> 분리하고, 탭 줄 + 탭 없는 연속 줄을 합침
    const result: string[] = [];
    const mergedTabRows: string[] = [];
    let lastWasTab = false;

    for (const line of allLines) {
      const trimmed = line.trim();
      if (/^<img\s[^>]*>$/i.test(trimmed)) {
        result.push(trimmed);
        lastWasTab = false;
        continue;
      }
      if (!trimmed) {
        lastWasTab = false;
        continue;
      }
      if (trimmed.includes('\t')) {
        mergedTabRows.push(trimmed);
        lastWasTab = true;
      } else if (lastWasTab && mergedTabRows.length > 0) {
        // 탭 없는 줄이지만 이전이 탭 줄 → 이전 행의 연속 (설명 줄)
        // 이전 행의 각 셀에 공백+내용 추가
        mergedTabRows[mergedTabRows.length - 1] += ' ' + trimmed;
      } else {
        // 탭도 없고 이전도 탭이 아닌 일반 텍스트
        lastWasTab = false;
      }
    }

    // 2단계: 합쳐진 탭 행들 → 테이블 생성
    if (mergedTabRows.length >= 2) {
      const rows = mergedTabRows.map(row => {
        return row.split('\t').map(c => c.replace(/\s+/g, ' ').trim()).filter(Boolean);
      });
      let tableHtml = '<table>';
      tableHtml += '<thead><tr>' + rows[0].map(c => `<th>${c}</th>`).join('') + '</tr></thead>';
      tableHtml += '<tbody>';
      for (let i = 1; i < rows.length; i++) {
        tableHtml += '<tr>' + rows[i].map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
      tableHtml += '</tbody></table>';
      result.push(tableHtml);
    }

    return result.join('\n');
  }

  // 탭 없는 일반 모드
  const paragraphs = content.split(/\n\s*\n/);
  return paragraphs.map(para => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    if (/^<img\s[^>]*>$/i.test(trimmed)) return trimmed;
    const parts = trimmed.split(/(<img\s[^>]*>)/i);
    if (parts.length > 1) {
      return parts.map(part => {
        if (/^<img\s/i.test(part)) return part;
        const t = part.trim();
        if (!t) return '';
        return `<p>${t.replace(/\n/g, '<br>')}</p>`;
      }).filter(Boolean).join('\n');
    }
    const withBr = trimmed.replace(/\n/g, '<br>');
    return `<p>${withBr}</p>`;
  }).filter(Boolean).join('\n');
}

// 블로그 목록 페이지
export function blogListPage(posts: any[]): string {
  const categories = ['전체', '임플란트', 'CEREC', '교정', '구강외과', '일반'];

  const postsHtml = posts.length > 0 ? posts.map(post => `
    <a href="/blog/${post.slug}" class="card-premium group block stagger-item overflow-hidden">
      ${post.thumbnail ? `
      <div class="relative aspect-[16/10] overflow-hidden">
        <img src="${post.thumbnail}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
        <div class="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-royal/80 text-white text-[10px] font-bold backdrop-blur-sm">${post.category}</div>
      </div>
      ` : `
      <div class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-royal/5 to-royal/10 flex items-center justify-center">
        <i class="fas fa-tooth text-royal/20 text-5xl"></i>
        <div class="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-royal/80 text-white text-[10px] font-bold backdrop-blur-sm">${post.category}</div>
      </div>
      `}
      <div class="p-7 md:p-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-gray-300 text-[11px]">${formatDate(post.published_at)}</span>
          <span class="text-gray-300 text-[11px] flex items-center gap-1"><i class="fas fa-eye text-[8px]"></i>${post.views || 0}</span>
        </div>
        <h2 class="text-xl font-extrabold text-charcoal mb-3 group-hover:text-royal transition-colors duration-500 line-clamp-2">${post.title}</h2>
        <p class="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">${post.summary || ''}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center"><span class="text-white text-[10px] font-bold">${(post.author || '강남')[0]}</span></div>
            <span class="text-gray-400 text-xs font-medium">${post.author || '강남치과의원'}</span>
          </div>
          <div class="flex items-center gap-2 text-royal text-sm font-bold group-hover:gap-3 transition-all duration-500">읽기 <i class="fas fa-arrow-right text-xs"></i></div>
        </div>
        ${post.tags ? `<div class="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-gray-50">${post.tags.split(',').map((t: string) => `<span class="px-2.5 py-1 rounded-full bg-gray-50 text-gray-400 text-[10px] font-medium">#${t.trim()}</span>`).join('')}</div>` : ''}
      </div>
    </a>
  `).join('') : `
    <div class="col-span-full text-center py-20">
      <div class="w-20 h-20 mx-auto rounded-3xl bg-royal/[0.06] flex items-center justify-center mb-6">
        <i class="fas fa-pen-fancy text-royal text-2xl"></i>
      </div>
      <p class="text-gray-400 text-lg font-medium mb-2">아직 게시글이 없습니다</p>
      <p class="text-gray-300 text-sm">곧 유용한 치과 정보를 올려드리겠습니다.</p>
    </div>
  `;

  const categoriesHtml = categories.map(cat => `
    <button onclick="filterBlog('${cat}')" class="blog-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${cat === '전체' ? 'royal-grad text-white border-royal' : 'bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal'}" data-category="${cat}">${cat}</button>
  `).join('');

  return `
  <!-- Hero -->
  <section class="relative min-h-[50vh] flex items-end subpage-hero overflow-hidden" aria-label="블로그">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-20 pt-44 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>BLOG</div>
      <h1 class="display-xl text-charcoal mb-4" data-speakable="true">치과 <span class="royal-grad-text">건강정보</span></h1>
      <p class="text-gray-400 text-lg" data-speakable="true">구강외과 전문의가 직접 전하는 정확한 치과 정보</p>
    </div>
  </section>

  <!-- Category Filter -->
  <section class="bg-white sticky top-16 md:top-[108px] z-30 border-b border-gray-100">
    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 py-4">
      <div class="flex gap-2 overflow-x-auto scrollbar-hide" style="scrollbar-width:none;-ms-overflow-style:none;">
        ${categoriesHtml}
      </div>
    </div>
  </section>

  <!-- Posts Grid -->
  <section class="py-16 md:py-24 bg-white" aria-label="블로그 게시글 목록">
    <div class="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children" id="blogGrid">
        ${postsHtml}
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
    function filterBlog(cat) {
      document.querySelectorAll('.blog-cat-btn').forEach(btn => {
        if(btn.dataset.category === cat) {
          btn.className = 'blog-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border royal-grad text-white border-royal';
        } else {
          btn.className = 'blog-cat-btn px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal';
        }
      });
      if(cat === '전체') { window.location.href = '/blog'; }
      else { window.location.href = '/blog?category=' + encodeURIComponent(cat); }
    }
  </script>
  `;
}

// 블로그 상세 페이지
export function blogDetailPage(post: any): { html: string; title: string; description: string; schemas: object[] } {
  const tagsHtml = post.tags ? post.tags.split(',').map((t: string) => 
    `<span class="px-3.5 py-1.5 rounded-full bg-royal/[0.04] text-royal text-[11px] font-bold border border-royal/[0.08]">#${t.trim()}</span>`
  ).join('') : '';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary || post.title,
    "author": {
      "@type": "Person",
      "name": post.author || '강남치과의원',
      "worksFor": { "@id": "https://kndent.kr/#organization" }
    },
    "publisher": { "@id": "https://kndent.kr/#organization" },
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "mainEntityOfPage": `https://kndent.kr/blog/${post.slug}`,
    "articleSection": post.category,
    "keywords": post.tags || '',
    "inLanguage": "ko"
  };

  const html = `
  <!-- Article Hero -->
  <section class="relative min-h-[45vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-16 pt-44 w-full">
      <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="breadcrumb">
        <a href="/" class="hover:text-royal transition-colors">홈</a>
        <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
        <a href="/blog" class="hover:text-royal transition-colors">블로그</a>
        <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
        <span class="text-charcoal font-medium">${post.category}</span>
      </nav>
      <div class="flex items-center gap-3 mb-5">
        <span class="px-4 py-2 rounded-full royal-grad text-white text-[11px] font-bold">${post.category}</span>
        <span class="text-gray-400 text-sm">${formatDate(post.published_at)}</span>
        <span class="text-gray-400 text-sm flex items-center gap-1"><i class="fas fa-eye text-[10px]"></i>${post.views || 0}회</span>
      </div>
      <h1 class="display-lg text-charcoal mb-4" data-speakable="true">${post.title}</h1>
      ${post.summary ? `<p class="text-gray-400 text-lg max-w-3xl" data-speakable="true">${post.summary}</p>` : ''}
    </div>
  </section>

  <!-- Article Content -->
  <article class="py-16 md:py-24 bg-white" aria-label="블로그 본문">
    <div class="max-w-3xl mx-auto px-5 md:px-8">
      <div class="flex items-center gap-4 mb-12 pb-8 border-b border-gray-100">
        <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center"><span class="text-white font-bold">${(post.author || '강남')[0]}</span></div>
        <div>
          <div class="text-charcoal font-bold">${post.author || '강남치과의원'}</div>
          <div class="text-gray-400 text-sm">구강악안면외과 전문의</div>
        </div>
      </div>

      <div class="blog-content prose prose-lg" data-speakable="true">
        ${formatContent(post.content)}
      </div>

      ${tagsHtml ? `<div class="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">${tagsHtml}</div>` : ''}

      <!-- Share / Nav -->
      <div class="mt-12 pt-8 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <a href="/blog" class="flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm font-bold"><i class="fas fa-arrow-left text-xs"></i>목록으로</a>
          <a href="/reservation" class="btn-primary !py-3 !px-8 !text-sm"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
        </div>
      </div>
    </div>
  </article>

  <!-- CTA -->
  <section class="py-20 md:py-28 section-lavender relative overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-6 royal-glow"><i class="fas fa-tooth text-white text-xl"></i></div>
      <h2 class="display-md text-charcoal mb-4">이 글이 도움이 되셨나요?</h2>
      <p class="text-gray-400 mb-8">구강외과 전문의가 직접 상담드립니다. 부담 없이 문의해 주세요.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="btn-primary !py-5 !px-12"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="btn-subtle"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>

  <style>
    .blog-content h2 { font-size: 1.5rem; font-weight: 800; color: #1C1C1E; margin: 2.5rem 0 1rem; line-height: 1.3; }
    .blog-content h3 { font-size: 1.25rem; font-weight: 700; color: #1C1C1E; margin: 2rem 0 0.8rem; }
    .blog-content p { color: #6B7280; font-size: 1rem; line-height: 1.9; margin-bottom: 1.5rem; }
    .blog-content strong { color: #1C1C1E; font-weight: 700; }
    .blog-content ul, .blog-content ol { color: #6B7280; padding-left: 1.5rem; margin-bottom: 1.5rem; }
    .blog-content li { margin-bottom: 0.5rem; line-height: 1.8; }
    .blog-content img { border-radius: 16px; margin: 2rem 0; width: 100%; }
    .blog-content blockquote { border-left: 4px solid #10AFB2; padding: 1rem 1.5rem; background: #F3FBFB; border-radius: 0 12px 12px 0; margin: 2rem 0; color: #10AFB2; font-style: italic; }
  </style>
  `;

  return {
    html,
    title: `${post.title} | 강남치과의원 블로그`,
    description: post.summary || post.title,
    schemas: [articleSchema]
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}
