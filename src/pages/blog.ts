import { metaDescFrom } from '../seo'
import { DOCTOR_LIST } from './doctors'
import { blogHubBlock } from './hub-link'

const SITE = 'https://kndent.kr'

function htmlText(s: string): string {
  return String(s || '').replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim()
}
const QUESTION_END = /(\?|？|까요|나요|가요|을까|할까|되나요|있나요|없나요|하나요|인가요)\s*[.!]?$/
/** 렌더 본문의 질문형 소제목(H2·H3) + 다음 소제목 전까지 → FAQ (화면 문구 그대로) */
export function faqsFromArticleHtml(html: string, maxItems = 20, maxAnswer = 900): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = []
  const seen = new Set<string>()
  for (const m of String(html || '').matchAll(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    if (out.length >= maxItems) break
    const q = htmlText(m[2]).replace(/^Q\s*\d*\s*[.:)]\s*/i, '')
    if (!q || q.length > 200 || !QUESTION_END.test(q) || seen.has(q)) continue
    let seg = html.slice((m.index || 0) + m[0].length)
    const next = seg.search(/<h[1-3][\s>]/i)
    if (next >= 0) seg = seg.slice(0, next)
    let a = htmlText(seg)
    if (a.length < 10) continue
    if (a.length > maxAnswer) a = a.slice(0, maxAnswer).replace(/\s+\S*$/, '') + '…'
    seen.add(q)
    out.push({ q, a })
  }
  return out
}
/** 본문 이미지: 빈/파일명 alt → 제목 기반, 첫 장 외 lazy, decoding async */
function polishImages(html: string, title: string): string {
  let n = 0
  return html.replace(/<img\b([^>]*?)\/?>/gi, (_m, attrs: string) => {
    n++
    let a = attrs
    const altM = a.match(/\balt\s*=\s*(["'])(.*?)\1/i)
    const alt = altM ? altM[2].trim() : ''
    if (!alt || /^[\w\-. ()]+\.(png|jpe?g|webp|gif)$/i.test(alt)) {
      const v = `${title.replace(/"/g, '&quot;')} 관련 이미지 ${n}`
      a = altM ? a.replace(altM[0], `alt="${v}"`) : `${a} alt="${v}"`
    }
    if (!/\bloading\s*=/.test(a)) a += n === 1 ? ' loading="eager"' : ' loading="lazy"'
    if (!/\bdecoding\s*=/.test(a)) a += ' decoding="async"'
    return `<img ${a.trim()}>`
  })
}
// ===== 칼럼 작성 주체 (2026-10-08, 사용자 승인) =====
// 원장을 작성·감수자로 표시하는 근거 = 병원이 관리자 화면에서 원장 이름으로 직접 입력한 글뿐.
// 대행사가 넣은 글은 원장이 쓰거나 검토한 근거가 없다 → 작성·발행 = 병원(Organization), reviewedBy·감수 표시 없음.
//  - id 16·17 (implant-refused-bone-loss-real-case, wisdom-tooth-no-symptom-extraction):
//    migrations_manual/c4_experience_posts.sql, 대행사 커밋 ee5ad8a(2026-08-18)로 투입
//  - id 1·2 (implant-bone-graft-guide, cerec-same-day-crown): 2026-03-22 11:17:50 같은 초에 일괄 삽입된 초기 대행사 글
//    (작성자 '이태형 원장' — 관리자 선택값 '이태형 대표원장'과 다른 형식, 관리자 입력 흔적 없음)
// 그 외 글도 작성자 문자열에 원장 이름이 없으면(예: '강남치과의원') 대표원장으로 끌어다 붙이지 않는다(예전 기본값 제거).
export const AGENCY_SEED_POST_IDS = new Set([1, 2, 16, 17])
export const AGENCY_SEED_POST_SLUGS = new Set(['implant-bone-graft-guide', 'cerec-same-day-crown', 'implant-refused-bone-loss-real-case', 'wisdom-tooth-no-symptom-extraction'])
export const CLINIC_NAME = '강남치과의원'
export const CLINIC_GENERAL_INFO_NOTE = '일반 건강정보입니다. 진료 판단은 내원 상담에서 원장이 직접 합니다.'
export function isAgencyPost(p: { id?: number | string | null; slug?: string | null }): boolean {
  return AGENCY_SEED_POST_IDS.has(Number(p?.id)) || AGENCY_SEED_POST_SLUGS.has(String(p?.slug || ''))
}
/** 병원이 원장 이름으로 직접 입력한 글이면 그 의료진, 아니면 null(= 병원 발행) */
export function attestedDoctor(p: { id?: number | string | null; slug?: string | null; author?: string | null }): any | null {
  if (!p || isAgencyPost(p)) return null
  const a = String(p.author || '')
  return DOCTOR_LIST.find((d: any) => a.includes(d.name)) || null
}
/** 목록·RSS·llms 표시용 작성자 문자열 */
export function postByline(p: { id?: number | string | null; slug?: string | null; author?: string | null }): string {
  return attestedDoctor(p) ? String(p.author) : CLINIC_NAME
}
function ymd(v?: string | null): string | undefined {
  const m = String(v || '').match(/^(\d{4}-\d{2}-\d{2})/)
  return m ? m[1] : undefined
}
function isoTime(v?: string | null): string | undefined {
  const m = String(v || '').match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})/)
  return m ? `${m[1]}T${m[2]}+00:00` : ymd(v)
}
export { isoTime as blogIsoTime }
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
export function blogListPage(posts: any[], opts: { categories?: string[]; active?: string; page?: number; pages?: number } = {}): string {
  // 카테고리 필터 = DB 에 실제 있는 값만 (예전 고정 목록의 '일반'·'구강외과'는 글 0건이었음), 서버 링크(?category=)
  const categories = ['전체', ...(opts.categories || [])];
  const active = opts.active || '전체';
  const page = opts.page || 1, pages = opts.pages || 1;
  const base = active === '전체' ? '/blog' : `/blog?category=${encodeURIComponent(active)}`;
  const pageHref = (n: number) => n <= 1 ? base : `${base}${base.includes('?') ? '&' : '?'}page=${n}`;
  const pagerHtml = pages > 1 ? `<nav class="flex flex-wrap justify-center gap-2 mt-12" aria-label="블로그 목록 페이지">
    ${page > 1 ? `<a href="${pageHref(page - 1)}" rel="prev" class="px-4 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-500 hover:border-royal hover:text-royal">← 이전</a>` : ''}
    ${Array.from({ length: pages }, (_, i) => i + 1).map(n => n === page
      ? `<span aria-current="page" class="px-4 py-2 rounded-full royal-grad text-white text-sm font-bold">${n}</span>`
      : `<a href="${pageHref(n)}" class="px-4 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-500 hover:border-royal hover:text-royal">${n}</a>`).join('')}
    ${page < pages ? `<a href="${pageHref(page + 1)}" rel="next" class="px-4 py-2 rounded-full border border-gray-200 text-sm font-bold text-gray-500 hover:border-royal hover:text-royal">다음 →</a>` : ''}
  </nav>` : '';

  const postsHtml = posts.length > 0 ? posts.map(post => `
    <a href="/blog/${post.slug}" class="card-premium group block stagger-item overflow-hidden">
      ${post.thumbnail ? `
      <div class="relative aspect-[16/10] overflow-hidden">
        <img src="${post.thumbnail}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async">
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
            <div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center"><span class="text-white text-[10px] font-bold">${postByline(post)[0]}</span></div>
            <span class="text-gray-400 text-xs font-medium">${postByline(post)}</span>
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
    <a href="${cat === '전체' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}" ${cat === active ? 'aria-current="page" ' : ''}class="blog-cat-btn whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${cat === active ? 'royal-grad text-white border-royal' : 'bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal'}" data-category="${cat}">${cat}</a>
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
      ${pagerHtml}
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
  { keywords: ['잇몸', '치주', '치은'], url: '/treatments/gum', label: '잇몸치료' },
  { keywords: ['스케일링', '치석'], url: '/treatments/scaling', label: '스케일링' },
  { keywords: ['틀니', '의치'], url: '/treatments/denture', label: '틀니' },
  { keywords: ['뼈이식', '골이식'], url: '/treatments/bone-graft', label: '뼈이식' },
  { keywords: ['상악동'], url: '/treatments/sinus-lift', label: '상악동(위턱 공간) 거상술' },
  { keywords: ['턱관절', 'tmj'], url: '/treatments/tmj', label: '턱관절 치료' },
  { keywords: ['라미네이트', '심미'], url: '/treatments/cosmetic', label: '심미보철' },
]

export function findRelatedTreatments(post: any): { url: string; label: string }[] {
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

  // 작성·감수 의료진: 병원이 원장 이름으로 직접 입력한 글만 (대행사 글·원장 이름 없는 글 → 병원 발행, 위 attestedDoctor)
  const doc: any = attestedDoctor(post)
  const orgId = `${SITE}/#organization`
  const authorId = doc ? `${SITE}/doctors/${doc.slug}#physician` : orgId
  const reviewerId = `${SITE}/doctors/lee-taehyung#physician`
  const url = `${SITE}/blog/${post.slug}`
  const bodyHtml = polishImages(formatContent(post.content), post.title)
  const faqs = faqsFromArticleHtml(bodyHtml)
  const desc = metaDescFrom(post.summary, post.content, post.title)
  const about = relatedTreatments.map(t => ({ "@id": `${SITE}${t.url}#procedure` }))
  const published = isoTime(post.published_at)
  const modified = isoTime(post.updated_at || post.published_at)
  const reviewed = ymd(post.updated_at || post.published_at)
  const imgM = String(post.content || '').match(/<img[^>]+src=["']([^"']+)["']/i)
  const imgRaw = post.thumbnail || (imgM ? imgM[1] : '')
  const img = imgRaw ? (imgRaw.startsWith('http') ? imgRaw : `${SITE}${imgRaw}`) : `${SITE}/static/og-image.png`
  const hasDirect = /class=["'][^"']*direct-answer/.test(post.content || '')
  // @graph: Physician + MedicalWebPage(speakable·reviewedBy·about) + BlogPosting + FAQPage (Breadcrumb 은 layout 에서 같은 @id)
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      ...(doc ? [{
        "@type": ["Person", "Physician"],
        "@id": authorId,
        "name": doc.name,
        "jobTitle": `${doc.title} (${doc.specialty})`,
        "url": `${SITE}/doctors/${doc.slug}`,
        ...(doc.photo ? { "image": `${SITE}${doc.photo}` } : {}),
        "worksFor": { "@id": orgId }
      }] : []),
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": post.title,
        "description": desc,
        "inLanguage": "ko-KR",
        "isPartOf": { "@id": `${SITE}/#website` },
        "breadcrumb": { "@id": `${url}#breadcrumb` },
        "mainEntity": { "@id": `${url}#article` },
        ...(about.length ? { "about": about } : {}),
        ...(doc ? { "reviewedBy": { "@id": reviewerId }, ...(reviewed ? { "lastReviewed": reviewed } : {}) } : {}),
        "speakable": { "@type": "SpeakableSpecification", "cssSelector": hasDirect ? ["h1", ".direct-answer"] : ["h1"] },
        "publisher": { "@id": `${SITE}/#organization` }
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "headline": String(post.title).slice(0, 110),
        "description": desc,
        "url": url,
        "image": { "@type": "ImageObject", "url": img },
        ...(published ? { "datePublished": published } : {}),
        ...(modified ? { "dateModified": modified } : {}),
        "author": { "@id": authorId },
        "publisher": { "@id": `${SITE}/#organization` },
        "mainEntityOfPage": { "@id": `${url}#webpage` },
        "isPartOf": { "@id": `${SITE}/#website` },
        ...(about.length ? { "about": about } : {}),
        "articleSection": post.category,
        "keywords": post.tags || '',
        "inLanguage": "ko-KR"
      },
      ...(faqs.length >= 2 ? [{
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "isPartOf": { "@id": `${url}#webpage` },
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      }] : [])
    ]
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
        <a href="/blog?category=${encodeURIComponent(post.category)}" class="text-charcoal font-medium hover:text-royal">${post.category}</a>
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
        <div class="w-12 h-12 rounded-xl royal-grad flex items-center justify-center"><span class="text-white font-bold">${doc ? String(post.author)[0] : CLINIC_NAME[0]}</span></div>
        <div>
          <div class="text-charcoal font-bold">${doc ? post.author : `${CLINIC_NAME} 발행`}</div>
          <div class="text-gray-400 text-sm">${doc ? doc.specialty : '일반 건강정보'}</div>
        </div>
      </div>

      <div class="blog-content prose prose-lg" data-speakable="true">
        ${bodyHtml}
      </div>

      ${tagsHtml ? `<div class="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">${tagsHtml}</div>` : ''}
      ${blogHubBlock(String(post.slug || post.id || ''), relatedTreatments[0]?.label)}

      ${doc ? `
      <!-- 작성·감수 박스 (PFWE 칼럼 표준 A3) -->
      <aside class="mt-10 bg-royal/[0.03] border border-royal/10 rounded-2xl p-6" aria-label="작성·감수">
        <div class="flex items-start gap-4">
          ${doc.photo
            ? `<a href="/doctors/${doc.slug}" class="flex-shrink-0"><img src="${doc.photo}" alt="${doc.name} ${doc.title}" width="72" height="72" class="w-[72px] h-[72px] rounded-2xl object-cover" style="object-position:center 20%" loading="lazy" decoding="async"></a>`
            : `<div class="w-[72px] h-[72px] rounded-2xl royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-user-md text-white text-xl"></i></div>`}
          <div>
            <p class="text-royal text-[11px] font-bold mb-1">작성·감수</p>
            <p class="text-charcoal font-bold mb-1"><a href="/doctors/${doc.slug}" class="hover:underline">${doc.name} ${doc.title}</a> <span class="text-gray-400 text-sm font-medium">${doc.specialty}</span></p>
            ${doc.education && doc.education[1] ? `<p class="text-gray-500 text-sm">${doc.education[1]}${doc.education[2] ? ` · ${doc.education[2]}` : ''}</p>` : ''}
            ${doc.specialties ? `<p class="text-gray-500 text-sm">진료 분야: ${doc.specialties.join(' · ')}</p>` : ''}
            ${reviewed ? `<p class="text-gray-500 text-sm">최종 검토일 <time datetime="${reviewed}">${reviewed}</time>${doc.slug !== 'lee-taehyung' ? ' · 감수 <a href="/doctors/lee-taehyung" class="text-royal font-bold hover:underline">이태형 대표원장</a>' : ''}</p>` : ''}
            <p class="text-gray-400 text-xs leading-relaxed mt-2">※ 이 글은 일반적인 건강 정보이며, 정확한 진단은 반드시 내원 후 상담을 통해 결정됩니다. 치료 결과에는 개인차가 있습니다.</p>
          </div>
        </div>
      </aside>` : `
      <!-- 병원 발행 박스: 원장 작성·감수 근거 없는 글 (2026-10-08) -->
      <aside class="mt-10 bg-royal/[0.03] border border-royal/10 rounded-2xl p-6" aria-label="발행 정보">
        <div class="flex items-start gap-4">
          <div class="w-[72px] h-[72px] rounded-2xl royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-tooth text-white text-xl" aria-hidden="true"></i></div>
          <div>
            <p class="text-royal text-[11px] font-bold mb-1">발행</p>
            <p class="text-charcoal font-bold mb-1">${CLINIC_NAME}</p>
            <p class="text-gray-500 text-sm">${CLINIC_GENERAL_INFO_NOTE}</p>
            ${reviewed ? `<p class="text-gray-500 text-sm">최종 업데이트 <time datetime="${reviewed}">${reviewed}</time></p>` : ''}
            <p class="text-gray-400 text-xs leading-relaxed mt-2">※ 정확한 진단은 반드시 내원 후 상담을 통해 결정됩니다. 치료 결과에는 개인차가 있습니다.</p>
          </div>
        </div>
      </aside>`}

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
    title: `${post.title} | 강남치과의원`,
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
