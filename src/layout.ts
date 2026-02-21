interface LayoutOptions {
  title: string
  description: string
  url: string
}

export function layout(content: string, opts: LayoutOptions): string {
  const { title, description, url } = opts
  const fullUrl = `https://gndentalclinic.com${url}`
  
  const now = new Date()
  const kstHour = (now.getUTCHours() + 9) % 24
  const dayOfWeek = new Date(now.getTime() + 9 * 60 * 60 * 1000).getDay()
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5
  const isOpen = isWeekday && kstHour >= 9 && (kstHour < 17 || (kstHour === 17 && now.getUTCMinutes() + 30 <= 60))

  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "강남치과의원",
    "url": "https://gndentalclinic.com",
    "telephone": "+82-54-636-8222",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "대학로 217, 2층",
      "addressLocality": "영주시",
      "addressRegion": "경상북도",
      "addressCountry": "KR"
    },
    "openingHoursSpecification": [
      { "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:30" }
    ],
    "founder": { "@type": "Person", "name": "이태형" },
    "foundingDate": "2017",
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 2 },
    "medicalSpecialty": ["Oral and Maxillofacial Surgery", "Implantology", "Orthodontics"],
    "image": "https://gndentalclinic.com/static/og-image.jpg",
    "priceRange": "$$"
  })

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${fullUrl}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:site_name" content="강남치과의원">
  <meta property="og:locale" content="ko_KR">

  <!-- Fonts -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            gold: { DEFAULT: '#C9A962', light: '#E0CFA0', dark: '#A88B3C', 50: '#FAF6EC', 100: '#F0E6C8' },
            charcoal: '#1a1a1a',
            subtext: '#888888',
            bglight: '#FAFAFA',
            bggray: '#F5F5F5'
          },
          fontFamily: {
            pretendard: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif']
          }
        }
      }
    }
  </script>

  <!-- Font Awesome -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  
  <!-- Schema.org -->
  <script type="application/ld+json">${schemaOrg}</script>

  <style>
    * { font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
    html { scroll-behavior: smooth; }
    body { color: #1a1a1a; }
    
    .gold-gradient { background: linear-gradient(135deg, #C9A962 0%, #E0CFA0 100%); }
    .gold-text-gradient { background: linear-gradient(135deg, #C9A962 0%, #A88B3C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-overlay { background: linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.6) 100%); }
    
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(201,169,98,0.15); }
    
    .fade-in { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    
    .btn-gold { 
      background: linear-gradient(135deg, #C9A962 0%, #A88B3C 100%); 
      color: white; 
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(201,169,98,0.3);
    }
    .btn-gold:hover { 
      box-shadow: 0 6px 25px rgba(201,169,98,0.45); 
      transform: translateY(-1px); 
    }
    
    .btn-outline-gold {
      border: 2px solid #C9A962;
      color: #C9A962;
      transition: all 0.3s ease;
    }
    .btn-outline-gold:hover {
      background: #C9A962;
      color: white;
    }

    .section-divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(135deg, #C9A962 0%, #E0CFA0 100%);
      margin: 0 auto;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    .float-animation { animation: float 3s ease-in-out infinite; }
    
    /* Mobile floating CTA */
    .floating-cta {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: white;
      border-top: 1px solid #eee;
      padding: 12px 16px;
      display: none;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
    }
    @media (max-width: 768px) {
      .floating-cta { display: flex; gap: 8px; }
      body { padding-bottom: 80px; }
    }

    /* Smooth scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #C9A962; border-radius: 3px; }
  </style>
</head>
<body class="bg-white font-pretendard">

  <!-- 상단 정보 바 -->
  <div class="bg-charcoal text-white text-xs py-2 hidden md:block">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <span><i class="fas fa-map-marker-alt text-gold mr-1"></i>경북 영주시 대학로 217, 2층</span>
        <span><i class="fas fa-clock text-gold mr-1"></i>평일 09:00~17:30 (토·일·공휴일 휴무)</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="tel:054-636-8222" class="hover:text-gold transition"><i class="fas fa-phone mr-1"></i>054-636-8222</a>
        <a href="https://blog.naver.com/gndentalclinic" target="_blank" rel="noopener" class="hover:text-gold transition">
          <i class="fas fa-blog mr-1"></i>블로그
        </a>
      </div>
    </div>
  </div>

  <!-- 헤더 / 네비게이션 -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100" id="header">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- 로고 -->
        <a href="/" class="flex items-center gap-2 group">
          <div class="w-9 h-9 md:w-10 md:h-10 rounded-lg gold-gradient flex items-center justify-center">
            <i class="fas fa-tooth text-white text-sm md:text-base"></i>
          </div>
          <div>
            <div class="text-lg md:text-xl font-bold text-charcoal tracking-tight">강남치과의원</div>
            <div class="text-[10px] text-subtext -mt-1 hidden sm:block">GANGNAM DENTAL CLINIC</div>
          </div>
        </a>

        <!-- 데스크톱 메뉴 -->
        <nav class="hidden lg:flex items-center gap-1">
          <a href="/doctors" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gold transition rounded-lg hover:bg-gold-50">의료진 소개</a>
          <a href="/treatments" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gold transition rounded-lg hover:bg-gold-50">진료 안내</a>
          <a href="/treatments/implant" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gold transition rounded-lg hover:bg-gold-50">임플란트</a>
          <a href="/treatments/invisalign" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gold transition rounded-lg hover:bg-gold-50">인비절라인</a>
          <a href="/pricing" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gold transition rounded-lg hover:bg-gold-50">비용 안내</a>
          <a href="/directions" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gold transition rounded-lg hover:bg-gold-50">오시는 길</a>
          <a href="/reservation" class="ml-2 px-5 py-2.5 btn-gold rounded-full text-sm font-semibold">상담 예약</a>
        </nav>

        <!-- 모바일: 전화 + 햄버거 -->
        <div class="flex items-center gap-2 lg:hidden">
          <a href="tel:054-636-8222" class="w-10 h-10 flex items-center justify-center rounded-full bg-gold-50 text-gold">
            <i class="fas fa-phone text-sm"></i>
          </a>
          <button onclick="toggleMobileMenu()" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition" id="menuBtn">
            <i class="fas fa-bars text-charcoal text-lg" id="menuIcon"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 모바일 메뉴 -->
    <div class="hidden lg:hidden bg-white border-t border-gray-100 shadow-lg" id="mobileMenu">
      <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
        <a href="/doctors" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">의료진 소개</a>
        <a href="/treatments" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">진료 안내</a>
        <a href="/treatments/implant" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">임플란트</a>
        <a href="/treatments/invisalign" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">인비절라인</a>
        <a href="/treatments/cerec" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">당일 보철 (CEREC)</a>
        <a href="/pricing" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">비용 안내</a>
        <a href="/directions" class="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gold hover:bg-gold-50 rounded-lg transition">오시는 길</a>
        <div class="pt-2">
          <a href="/reservation" class="block w-full text-center px-4 py-3 btn-gold rounded-xl text-sm font-semibold">상담 예약하기</a>
        </div>
        <div class="pt-2 flex items-center justify-center gap-4 text-xs text-subtext">
          <a href="tel:054-636-8222" class="hover:text-gold transition"><i class="fas fa-phone mr-1"></i>054-636-8222</a>
          <span><i class="fas fa-clock mr-1"></i>평일 09:00~17:30</span>
        </div>
      </div>
    </div>
  </header>

  <!-- 메인 콘텐츠 -->
  <main>
    ${content}
  </main>

  <!-- 푸터 -->
  <footer class="bg-charcoal text-white">
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- 병원 정보 -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
              <i class="fas fa-tooth text-white text-sm"></i>
            </div>
            <span class="text-lg font-bold">강남치과의원</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">
            구강외과 전문의 2인이 직접 진료하는<br>
            영주시 프리미엄 치과의원
          </p>
          <div class="flex gap-3">
            <a href="https://blog.naver.com/gndentalclinic" target="_blank" rel="noopener" 
               class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gold transition text-sm">
              <i class="fas fa-blog"></i>
            </a>
          </div>
        </div>

        <!-- 진료 안내 -->
        <div>
          <h4 class="font-semibold mb-4 text-gold">진료 안내</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="/treatments/implant" class="hover:text-gold transition">임플란트</a></li>
            <li><a href="/treatments/invisalign" class="hover:text-gold transition">인비절라인</a></li>
            <li><a href="/treatments/cerec" class="hover:text-gold transition">당일 보철 (CEREC)</a></li>
            <li><a href="/treatments/cosmetic" class="hover:text-gold transition">심미보철</a></li>
            <li><a href="/treatments/wisdom-tooth" class="hover:text-gold transition">사랑니 발치</a></li>
            <li><a href="/treatments" class="hover:text-gold transition">전체 진료 보기 →</a></li>
          </ul>
        </div>

        <!-- 바로가기 -->
        <div>
          <h4 class="font-semibold mb-4 text-gold">바로가기</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="/doctors" class="hover:text-gold transition">의료진 소개</a></li>
            <li><a href="/pricing" class="hover:text-gold transition">비용 안내</a></li>
            <li><a href="/directions" class="hover:text-gold transition">오시는 길</a></li>
            <li><a href="/reservation" class="hover:text-gold transition">상담 예약</a></li>
          </ul>
        </div>

        <!-- 연락처 -->
        <div>
          <h4 class="font-semibold mb-4 text-gold">연락처</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-2">
              <i class="fas fa-map-marker-alt text-gold mt-0.5"></i>
              <span>경북 영주시 대학로 217, 2층<br>(택지 리첼 사거리)</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-phone text-gold"></i>
              <a href="tel:054-636-8222" class="hover:text-gold transition">054-636-8222</a>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-clock text-gold mt-0.5"></i>
              <span>평일 09:00~17:30<br>점심 13:00~14:00<br>토·일·공휴일 휴무</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; 2017-${new Date().getFullYear()} 강남치과의원. All rights reserved.</p>
          <p>대표: 이태형 | 사업자등록번호: 문의 | 경북 영주시 대학로 217, 2층</p>
        </div>
      </div>
    </div>
  </footer>

  <!-- 모바일 플로팅 CTA -->
  <div class="floating-cta">
    <a href="tel:054-636-8222" class="flex-1 flex items-center justify-center gap-2 py-3 bg-charcoal text-white rounded-xl text-sm font-semibold">
      <i class="fas fa-phone"></i>전화상담
    </a>
    <a href="/reservation" class="flex-1 flex items-center justify-center gap-2 py-3 btn-gold rounded-xl text-sm font-semibold">
      <i class="fas fa-calendar-check"></i>상담예약
    </a>
  </div>

  <script>
    // 모바일 메뉴 토글
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const icon = document.getElementById('menuIcon');
      menu.classList.toggle('hidden');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }

    // 스크롤 애니메이션
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 헤더 스크롤 효과
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      const scroll = window.scrollY;
      if (scroll > 100) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
      lastScroll = scroll;
    });
  </script>
</body>
</html>`
}
