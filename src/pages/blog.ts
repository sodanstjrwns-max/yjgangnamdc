import { metaDescFrom } from '../seo'
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

// 콘텐츠 키워드 → 관련 진료 페이지 매핑 (내부링크 자동 생성)
const TREATMENT_LINK_MAP: { keywords: string[]; url: string; label: string }[] = [
  { keywords: ['임플란트'], url: '/treatments/implant', label: '임플란트' },
  { keywords: ['사랑니'], url: '/treatments/wisdom-tooth', label: '사랑니 발치' },
  { keywords: ['교정', '인비절라인', '투명교정'], url: '/treatments/invisalign', label: '인비절라인 투명교정' },
  { keywords: ['충치'], url: '/treatments/cavity', label: '충치치료' },
  { keywords: ['신경치료', '근관'], url: '/treatments/root-canal', label: '신경치료' },
  { keywords: ['크라운', '보철', '세렉', 'cerec'], url: '/treatments/digital-prosthesis', label: 'CEREC 디지털 보철' },
  { keywords: ['미백', '화이트닝'], url: '/treatments/whitening', label: '치아미백' },
  { keywords: ['잇뱀', '치주', '치은'], url: '/treatments/gum', label: '잇뱀치료' },
  { keywords: ['스케일링', '치석'], url: '/treatments/scaling', label: '스케일링' },
  { keywords: ['틀니', '의치'], url: '/treatments/denture', label: '틀니' },
  { keywords: ['너이식', '골이식'], url: '/treatments/bone-graft', label: '너이식' },
  { keywords: ['상악동'], url: '/treatments/sinus-lift', label: '상악동(위턱 공간) 거상술' },
  { keywords: ['턱관절', 'tmj'], url: '/treatments/tmj', label: '턱관절 치료' },
  { keywords: ['라미네이트', '심미'], url: '/treatments/cosmetic', label: '심미보철' },
]

function findRelatedTreatments(post: any): { url: string; label: string }[] {
  const haystack = `${post.title} ${post.summary || ''} ${post.tags || ''} ${(post.content || '').slice(0, 2000)}`.toLowerCase()
  const found: { url: string; label: string }[] = []
  for (const m of TREATMENT_LINK_MAP) {
    if (m.keywords.some(k => haystack.includes(k))) found.push({ url: m.url, label: m.label })
    if (found.length >= 4) break
  }
  return found
}

// 블로그 상세 페이지
export function blogDetailPage(post: any, relatedPosts: any[] = []): { html: string; title: string; description: string; schemas: object[] } {
  const relatedTreatments = findRelatedTreatments(post)
  const tagsHtml = post.tags ? post.tags.split(',').map((t: string) => 
    `<span class="px-3.5 py-1.5 rounded-full bg-royal/[0.04] text-royal text-[11px] font-bold border border-royal/[0.08]">#${t.trim()}</span>`
  ).join('') : '';

  // E-E-A-T: author를 실제 의사 프로필 페이지와 연결 (Person + url + jobTitle)
  const authorName = post.author || '이태형'
  const isLee = authorName.includes('이태형') || authorName === '강남치과의원'
  const isChoi = authorName.includes('최민혜')
  const authorSchema = (isLee || isChoi) ? {
    "@type": "Person",
    "name": isChoi ? '최민혜' : '이태형',
    "url": isChoi ? 'https://kndent.kr/doctors/choi-minhye' : 'https://kndent.kr/doctors/lee-taehyung',
    "jobTitle": isChoi ? '원장 (구강악안면외과 전문의)' : '대표원장 (구강악안면외과 전문의)',
    "worksFor": { "@id": "https://kndent.kr/#organization" },
    "knowsAbout": ["임플란트", "사랑니 발치", "너이식", "구강악안면외과"]
  } : {
    "@type": "Person",
    "name": authorName,
    "worksFor": { "@id": "https://kndent.kr/#organization" }
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": metaDescFrom(post.summary, post.content, post.title),
    "author": authorSchema,
    // E-E-A-T: 의료 콘텐츠 전문의 감수 명시
    "reviewedBy": {
      "@type": "Person",
      "name": "이태형",
      "url": "https://kndent.kr/doctors/lee-taehyung",
      "jobTitle": "구강악안면외과 전문의"
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

      <!-- E-E-A-T: 전문의 감수 배지 -->
      <aside class="mt-10 bg-royal/[0.03] border border-royal/10 rounded-2xl p-6" aria-label="의학 정보 감수 안내">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-user-md text-white"></i></div>
          <div>
            <p class="text-charcoal font-bold text-sm mb-1"><i class="fas fa-check-circle text-royal mr-1"></i>이 글은 구강악안면외과 전문의가 직접 작성·감수했습니다</p>
            <p class="text-gray-400 text-xs leading-relaxed">감수: <a href="/doctors/lee-taehyung" class="text-royal font-bold hover:underline">이태형 대표원장</a> (구강악안면외과 전문의, 고려대 구로병원 수련) · 정확한 진단은 반드시 내원 후 상담을 통해 결정됩니다.</p>
          </div>
        </div>
      </aside>

      ${relatedTreatments.length > 0 ? `
      <!-- 관련 진료 내부링크 (SEO: 토픽 클러스터 연결) -->
      <nav class="mt-8" aria-label="관련 진료 안내">
        <p class="text-gray-400 text-xs font-bold mb-3">이 글과 관련된 진료</p>
        <div class="flex flex-wrap gap-2">
          ${relatedTreatments.map(t => `<a href="${t.url}" class="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-charcoal text-sm font-bold hover:border-royal hover:text-royal transition-colors"><i class="fas fa-tooth text-royal/40 mr-1.5 text-xs"></i>${t.label}</a>`).join('')}
        </div>
      </nav>` : ''}

      <!-- Share / Nav -->
      <div class="mt-12 pt-8 border-t border-gray-100">
        <div class="flex items-center justify-between">
          <a href="/blog" class="flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm font-bold"><i class="fas fa-arrow-left text-xs"></i>목록으로</a>
          <a href="/reservation" class="btn-primary !py-3 !px-8 !text-sm"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
        </div>
      </div>

      ${relatedPosts.length > 0 ? `
      <!-- 관련 글 (SEO: 체류시간 + 크롤 경로 강화) -->
      <section class="mt-12 pt-10 border-t border-gray-100" aria-label="관련 글">
        <h2 class="text-charcoal font-bold text-xl mb-6">함께 읽으면 좋은 글</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${relatedPosts.map((rp: any) => `
          <a href="/blog/${rp.slug}" class="block bg-snow-50 rounded-2xl p-5 border border-gray-100 hover:border-royal/30 hover:shadow-md transition-all group">
            <span class="text-royal text-[10px] font-bold">${rp.category || '치과상식'}</span>
            <h3 class="text-charcoal font-bold mt-1 group-hover:text-royal transition-colors line-clamp-2">${rp.title}</h3>
            ${rp.summary ? `<p class="text-gray-400 text-xs mt-2 line-clamp-2">${rp.summary}</p>` : ''}
          </a>`).join('')}
        </div>
      </section>` : ''}
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
    .blog-content .direct-answer { background: linear-gradient(135deg, rgba(91,71,214,0.05), rgba(91,71,214,0.02)); border-left: 4px solid #5B47D6; border-radius: 0 16px 16px 0; padding: 1.25rem 1.5rem; color: #374151; font-size: 1.05rem; line-height: 1.8; margin-bottom: 2rem; }
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
    // 요약이 10~40자로 짧은 글이 많아 본문 앞 문장으로 보강 (≤155자)
    description: metaDescFrom(post.summary, post.content, post.title),
    schemas: [articleSchema]
  };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  // UTC → KST (+9시간)
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return `${kst.getUTCFullYear()}.${String(kst.getUTCMonth()+1).padStart(2,'0')}.${String(kst.getUTCDate()).padStart(2,'0')}`;
}
