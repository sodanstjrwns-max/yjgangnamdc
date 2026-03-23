// ===== 치과 용어 사전 페이지 =====

import { SITE_URL, SITE_NAME } from '../layout'

// 카테고리 아이콘/색상 맵
const categoryMeta: Record<string, { icon: string; color: string; colorBg: string; label: string }> = {
  '임플란트': { icon: 'fas fa-tooth', color: 'text-blue-600', colorBg: 'bg-blue-50', label: '임플란트' },
  '교정': { icon: 'fas fa-teeth', color: 'text-purple-600', colorBg: 'bg-purple-50', label: '교정' },
  '보철': { icon: 'fas fa-gem', color: 'text-amber-600', colorBg: 'bg-amber-50', label: '보철/심미' },
  '일반': { icon: 'fas fa-briefcase-medical', color: 'text-green-600', colorBg: 'bg-green-50', label: '일반/보존' },
  '외과': { icon: 'fas fa-user-md', color: 'text-red-600', colorBg: 'bg-red-50', label: '구강외과' },
  '치주': { icon: 'fas fa-teeth-open', color: 'text-pink-600', colorBg: 'bg-pink-50', label: '치주' },
  '장비': { icon: 'fas fa-microscope', color: 'text-cyan-600', colorBg: 'bg-cyan-50', label: '장비/영상' },
  '해부학': { icon: 'fas fa-head-side-virus', color: 'text-indigo-600', colorBg: 'bg-indigo-50', label: '해부학' },
  '소아': { icon: 'fas fa-baby-carriage', color: 'text-orange-600', colorBg: 'bg-orange-50', label: '소아/예방' },
  '보험': { icon: 'fas fa-shield-alt', color: 'text-teal-600', colorBg: 'bg-teal-50', label: '보험/행정' },
}

const difficultyLabel = (d: number) => d === 1 ? '기본' : d === 2 ? '중급' : '전문'
const difficultyColor = (d: number) => d === 1 ? 'bg-green-100 text-green-700' : d === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'

// ===== 용어 사전 목록 페이지 =====
export function dictionaryListPage(terms: any[], categories: any[], query?: string, selectedCategory?: string): string {
  const allCategories = Object.entries(categoryMeta)

  const categoriesHtml = `
    <a href="/dictionary" class="dict-cat-btn px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border whitespace-nowrap ${!selectedCategory ? 'royal-grad text-white border-royal shadow-lg shadow-royal/20' : 'bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal'}">
      전체 <span class="ml-1 text-xs opacity-70">${categories.reduce((sum: number, c: any) => sum + c.cnt, 0)}</span>
    </a>
    ${allCategories.map(([key, meta]) => {
      const cat = categories.find((c: any) => c.category === key)
      const cnt = cat ? cat.cnt : 0
      const isActive = selectedCategory === key
      return `<a href="/dictionary?category=${encodeURIComponent(key)}" class="dict-cat-btn px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border whitespace-nowrap ${isActive ? 'royal-grad text-white border-royal shadow-lg shadow-royal/20' : 'bg-white text-gray-400 border-gray-200 hover:border-royal/30 hover:text-royal'}">
        <i class="${meta.icon} mr-1 text-xs"></i>${meta.label} <span class="ml-1 text-xs opacity-70">${cnt}</span>
      </a>`
    }).join('')}
  `

  const termsHtml = terms.length > 0 ? terms.map(term => {
    const meta = categoryMeta[term.category] || categoryMeta['일반']
    return `
    <a href="/dictionary/${term.slug}" class="card-premium group block stagger-item overflow-hidden hover:shadow-xl transition-all duration-500">
      <div class="p-6 md:p-7">
        <div class="flex items-start justify-between gap-3 mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl ${meta.colorBg} flex items-center justify-center flex-shrink-0">
              <i class="${meta.icon} ${meta.color} text-sm"></i>
            </div>
            <div>
              <h2 class="text-lg font-extrabold text-charcoal group-hover:text-royal transition-colors duration-300 leading-tight">${term.term_ko}</h2>
              <p class="text-xs text-gray-300 font-medium mt-0.5">${term.term_en || ''}</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0 mt-1">
            ${term.is_featured ? '<span class="px-2 py-0.5 rounded-full bg-royal/10 text-royal text-[10px] font-bold">주요</span>' : ''}
            <span class="px-2 py-0.5 rounded-full ${difficultyColor(term.difficulty)} text-[10px] font-bold">${difficultyLabel(term.difficulty)}</span>
          </div>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">${term.summary}</p>
        <div class="flex items-center justify-between">
          <span class="px-3 py-1 rounded-full ${meta.colorBg} ${meta.color} text-[11px] font-bold">${meta.label}</span>
          <div class="flex items-center gap-1.5 text-royal/60 text-xs font-bold group-hover:text-royal group-hover:gap-2.5 transition-all duration-300">자세히 <i class="fas fa-chevron-right text-[8px]"></i></div>
        </div>
      </div>
    </a>`
  }).join('') : `
    <div class="col-span-full text-center py-20">
      <div class="w-20 h-20 mx-auto rounded-3xl bg-royal/[0.06] flex items-center justify-center mb-6">
        <i class="fas fa-search text-royal text-2xl"></i>
      </div>
      <p class="text-gray-400 text-lg font-medium mb-2">${query ? `"${query}"에 대한 검색 결과가 없습니다` : '용어가 없습니다'}</p>
      <p class="text-gray-300 text-sm">다른 검색어를 시도해보세요</p>
    </div>
  `

  return `
  <!-- Hero -->
  <section class="relative pt-16 pb-12 bg-gradient-to-b from-royal/[0.03] to-transparent overflow-hidden">
    <div class="absolute top-20 right-10 w-64 h-64 bg-royal/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl"></div>
    <div class="max-w-6xl mx-auto px-5 relative">
      <div class="flex items-center gap-3 mb-4">
        <a href="/" class="text-gray-300 text-sm hover:text-royal transition-colors"><i class="fas fa-home"></i></a>
        <i class="fas fa-chevron-right text-gray-200 text-[8px]"></i>
        <span class="text-royal text-sm font-bold">치과 용어 사전</span>
      </div>
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-2xl royal-grad flex items-center justify-center shadow-lg shadow-royal/20">
              <i class="fas fa-book-medical text-white text-lg"></i>
            </div>
            <div>
              <h1 class="text-3xl md:text-4xl font-black text-charcoal" data-speakable>치과 용어 사전</h1>
              <p class="text-sm text-gray-400 mt-1">Dental Glossary · <span class="text-royal font-bold">${categories.reduce((sum: number, c: any) => sum + c.cnt, 0)}개</span> 용어</p>
            </div>
          </div>
          <p class="text-gray-500 text-base leading-relaxed max-w-xl" data-speakable>
            치과에서 자주 사용하는 전문 용어를 알기 쉽게 설명합니다.<br>
            <span class="text-royal font-bold">구강악안면외과 전문의</span>가 감수한 정확하고 신뢰할 수 있는 정보입니다.
          </p>
        </div>
        <!-- 검색 -->
        <form method="get" action="/dictionary" class="w-full md:w-96 relative flex-shrink-0">
          <input type="text" name="q" value="${query || ''}" placeholder="용어를 검색하세요 (예: 임플란트, 크라운)" class="w-full pl-12 pr-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-royal focus:ring-2 focus:ring-royal/10 text-sm text-charcoal placeholder:text-gray-300 outline-none transition-all shadow-sm">
          <i class="fas fa-search absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-300"></i>
          <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl royal-grad text-white text-xs font-bold shadow-md hover:shadow-lg transition-shadow">검색</button>
        </form>
      </div>
    </div>
  </section>

  <!-- 카테고리 필터 -->
  <section class="sticky top-[72px] z-30 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-5">
      <div class="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
        ${categoriesHtml}
      </div>
    </div>
  </section>

  <!-- 주요 용어 (카테고리 미선택 + 검색 없을 때만) -->
  ${!selectedCategory && !query ? `
  <section class="py-12 bg-gradient-to-b from-royal/[0.02] to-transparent">
    <div class="max-w-6xl mx-auto px-5">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-extrabold text-charcoal"><i class="fas fa-star text-amber-400 mr-2"></i>주요 용어</h2>
        <span class="text-xs text-gray-300">가장 자주 물어보는 용어</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" id="featured-terms">
        ${terms.filter(t => t.is_featured).slice(0, 12).map(t => {
          const meta = categoryMeta[t.category] || categoryMeta['일반']
          return `
          <a href="/dictionary/${t.slug}" class="group block p-4 rounded-2xl bg-white border border-gray-100 hover:border-royal/20 hover:shadow-lg transition-all duration-300 text-center">
            <div class="w-10 h-10 mx-auto rounded-xl ${meta.colorBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <i class="${meta.icon} ${meta.color} text-sm"></i>
            </div>
            <p class="text-sm font-bold text-charcoal group-hover:text-royal transition-colors mb-1">${t.term_ko}</p>
            <p class="text-[10px] text-gray-300">${t.term_en || ''}</p>
          </a>`
        }).join('')}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- 전체 용어 목록 -->
  <section class="py-12">
    <div class="max-w-6xl mx-auto px-5">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-lg font-extrabold text-charcoal">
          ${selectedCategory ? `<i class="${(categoryMeta[selectedCategory] || categoryMeta['일반']).icon} ${(categoryMeta[selectedCategory] || categoryMeta['일반']).color} mr-2"></i>${(categoryMeta[selectedCategory] || categoryMeta['일반']).label}` : query ? `<i class="fas fa-search text-royal mr-2"></i>"${query}" 검색 결과` : '<i class="fas fa-list text-royal mr-2"></i>전체 용어'}
          <span class="text-sm font-medium text-gray-300 ml-2">${terms.length}개</span>
        </h2>
        <div class="flex items-center gap-2 text-xs text-gray-300">
          <span>가나다순</span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${termsHtml}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-gradient-to-b from-transparent to-royal/[0.03]">
    <div class="max-w-3xl mx-auto px-5 text-center">
      <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-6 shadow-lg shadow-royal/20">
        <i class="fas fa-comments text-white text-xl"></i>
      </div>
      <h2 class="text-2xl font-black text-charcoal mb-3">궁금한 치과 용어가 있으신가요?</h2>
      <p class="text-gray-400 mb-8">구강악안면외과 전문의가 직접 상담해드립니다</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="/reservation" class="btn-primary px-8 py-4 rounded-2xl text-sm font-bold"><i class="fas fa-calendar-check mr-2"></i>상담 예약</a>
        <a href="tel:054-636-8222" class="btn-outline px-8 py-4 rounded-2xl text-sm font-bold"><i class="fas fa-phone mr-2"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `
}

// ===== 용어 상세 페이지 =====
export function dictionaryDetailPage(term: any, relatedTerms: any[]): { html: string; schemas: any[] } {
  const meta = categoryMeta[term.category] || categoryMeta['일반']
  const relatedTermList = term.related_terms ? term.related_terms.split(',').map((t: string) => t.trim()) : []

  const relatedHtml = relatedTerms.length > 0 ? relatedTerms.map(rt => {
    const rtMeta = categoryMeta[rt.category] || categoryMeta['일반']
    return `
    <a href="/dictionary/${rt.slug}" class="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-royal/20 hover:shadow-lg transition-all duration-300">
      <div class="w-10 h-10 rounded-xl ${rtMeta.colorBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
        <i class="${rtMeta.icon} ${rtMeta.color} text-sm"></i>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-charcoal group-hover:text-royal transition-colors truncate">${rt.term_ko}</p>
        <p class="text-xs text-gray-300 truncate">${rt.summary}</p>
      </div>
      <i class="fas fa-chevron-right text-gray-200 text-xs group-hover:text-royal transition-colors"></i>
    </a>`
  }).join('') : ''

  // ===== Schema.org MedicalEntity =====
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}/dictionary/${term.slug}#term`,
      "name": term.term_ko,
      "alternateName": term.term_en || undefined,
      "description": term.description,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "@id": `${SITE_URL}/dictionary#glossary`,
        "name": `${SITE_NAME} 치과 용어 사전`,
        "url": `${SITE_URL}/dictionary`
      },
      "url": `${SITE_URL}/dictionary/${term.slug}`,
      "termCode": term.slug
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": `${term.term_ko} | ${SITE_NAME} 치과 용어 사전`,
      "description": term.summary,
      "url": `${SITE_URL}/dictionary/${term.slug}`,
      "about": {
        "@type": "MedicalEntity",
        "name": term.term_ko,
        "alternateName": term.term_en || undefined,
        "description": term.description,
        "medicineSystem": "WesternConventional",
        "relevantSpecialty": { "@type": "MedicalSpecialty", "name": "Dentistry" }
      },
      "author": [
        { "@type": "Physician", "@id": `${SITE_URL}/doctors/lee-taehyung#physician`, "name": "이태형" },
        { "@type": "Physician", "@id": `${SITE_URL}/doctors/choi-minhye#physician`, "name": "최민혜" }
      ],
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "inLanguage": "ko",
      "isPartOf": { "@id": `${SITE_URL}/dictionary#glossary` },
      "datePublished": term.created_at,
      "dateModified": term.updated_at
    }
  ]

  // 관련 진료가 있으면 연결
  if (term.related_treatment) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "MedicalTherapy",
      "name": `${term.term_ko} 관련 진료`,
      "description": `${SITE_NAME}에서 제공하는 ${term.term_ko} 관련 진료 서비스`,
      "url": `${SITE_URL}/treatments/${term.related_treatment}`,
      "provider": { "@id": `${SITE_URL}/#organization` },
      "availableService": {
        "@type": "MedicalProcedure",
        "name": term.term_ko,
        "url": `${SITE_URL}/treatments/${term.related_treatment}`
      }
    })
  }

  const html = `
  <!-- Hero -->
  <section class="relative pt-12 pb-10 bg-gradient-to-b from-royal/[0.03] to-transparent overflow-hidden">
    <div class="absolute top-20 right-10 w-64 h-64 bg-royal/5 rounded-full blur-3xl"></div>
    <div class="max-w-4xl mx-auto px-5 relative">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 mb-6 text-sm">
        <a href="/" class="text-gray-300 hover:text-royal transition-colors"><i class="fas fa-home"></i></a>
        <i class="fas fa-chevron-right text-gray-200 text-[8px]"></i>
        <a href="/dictionary" class="text-gray-400 hover:text-royal transition-colors font-medium">치과 용어 사전</a>
        <i class="fas fa-chevron-right text-gray-200 text-[8px]"></i>
        <a href="/dictionary?category=${encodeURIComponent(term.category)}" class="text-gray-400 hover:text-royal transition-colors font-medium">${meta.label}</a>
        <i class="fas fa-chevron-right text-gray-200 text-[8px]"></i>
        <span class="text-royal font-bold">${term.term_ko}</span>
      </div>

      <!-- Header -->
      <div class="flex items-start gap-5 mb-8">
        <div class="w-16 h-16 rounded-2xl ${meta.colorBg} flex items-center justify-center flex-shrink-0 shadow-md">
          <i class="${meta.icon} ${meta.color} text-2xl"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="px-3 py-1 rounded-full ${meta.colorBg} ${meta.color} text-[11px] font-bold">${meta.label}</span>
            <span class="px-2.5 py-1 rounded-full ${difficultyColor(term.difficulty)} text-[10px] font-bold"><i class="fas fa-signal text-[8px] mr-1"></i>${difficultyLabel(term.difficulty)}</span>
            ${term.is_featured ? '<span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold"><i class="fas fa-star text-[8px] mr-1"></i>주요 용어</span>' : ''}
          </div>
          <h1 class="text-3xl md:text-4xl font-black text-charcoal leading-tight" data-speakable>${term.term_ko}</h1>
          ${term.term_en ? `<p class="text-lg text-gray-400 font-medium mt-2">${term.term_en}</p>` : ''}
        </div>
      </div>

      <!-- Summary -->
      <div class="p-6 rounded-2xl bg-royal/[0.04] border border-royal/10 mb-2">
        <p class="text-lg text-charcoal font-bold leading-relaxed" data-speakable>
          <i class="fas fa-quote-left text-royal/30 mr-2"></i>${term.summary}<i class="fas fa-quote-right text-royal/30 ml-2"></i>
        </p>
      </div>
    </div>
  </section>

  <!-- 상세 설명 -->
  <section class="py-10">
    <div class="max-w-4xl mx-auto px-5">
      <div class="card-premium p-8 md:p-10">
        <h2 class="text-xl font-extrabold text-charcoal mb-6 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center"><i class="fas fa-book-open text-white text-xs"></i></div>
          상세 설명
        </h2>
        <div class="text-gray-600 text-base leading-[1.9] whitespace-pre-line" data-speakable>${term.description}</div>

        ${term.related_treatment ? `
        <div class="mt-8 pt-8 border-t border-gray-100">
          <a href="/treatments/${term.related_treatment}" class="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-royal/[0.04] hover:bg-royal/[0.08] border border-royal/10 hover:border-royal/20 transition-all group">
            <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center"><i class="fas fa-stethoscope text-white text-sm"></i></div>
            <div>
              <p class="text-xs text-gray-400 mb-0.5">관련 진료 보기</p>
              <p class="text-sm font-bold text-royal group-hover:underline">${term.term_ko} 진료 안내 →</p>
            </div>
          </a>
        </div>
        ` : ''}
      </div>

      ${relatedTermList.length > 0 ? `
      <!-- 연관 키워드 -->
      <div class="mt-6 p-6 rounded-2xl bg-white border border-gray-100">
        <h3 class="text-sm font-bold text-gray-500 mb-4"><i class="fas fa-tags text-royal/40 mr-2"></i>연관 키워드</h3>
        <div class="flex flex-wrap gap-2">
          ${relatedTermList.map((t: string) => `
            <a href="/dictionary?q=${encodeURIComponent(t)}" class="px-3.5 py-2 rounded-full bg-gray-50 hover:bg-royal/10 text-gray-500 hover:text-royal text-sm font-medium transition-all border border-transparent hover:border-royal/10">#${t}</a>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${relatedTerms.length > 0 ? `
      <!-- 관련 용어 -->
      <div class="mt-10">
        <h2 class="text-xl font-extrabold text-charcoal mb-6 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center"><i class="fas fa-link text-indigo-600 text-xs"></i></div>
          관련 용어
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${relatedHtml}
        </div>
      </div>
      ` : ''}
    </div>
  </section>

  <!-- Navigation -->
  <section class="py-10 bg-gradient-to-b from-transparent to-royal/[0.02]">
    <div class="max-w-4xl mx-auto px-5">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/dictionary?category=${encodeURIComponent(term.category)}" class="btn-outline px-6 py-3.5 rounded-2xl text-sm font-bold">
          <i class="${meta.icon} mr-2"></i>${meta.label} 전체 보기
        </a>
        <a href="/dictionary" class="btn-outline px-6 py-3.5 rounded-2xl text-sm font-bold">
          <i class="fas fa-book-medical mr-2"></i>용어 사전 홈
        </a>
        <a href="/reservation" class="btn-primary px-6 py-3.5 rounded-2xl text-sm font-bold">
          <i class="fas fa-calendar-check mr-2"></i>상담 예약
        </a>
      </div>
    </div>
  </section>
  `

  return { html, schemas }
}
