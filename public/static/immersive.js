/* 영주 강남치과의원 메인 스크롤 연출 v2 (GSAP 3.12 ScrollTrigger) — "도면: 한 번에, 정확하게" (2026-11-05)
   - 글자는 전부 HTML 그대로(크롤러·AEO 영향 0). html.mx + GSAP 로드 성공(html.gs)일 때만 동작, 아니면 CSS 가 아무것도 숨기지 않는다.
   - 히어로 인트로(눈금자가 그려지고 제목이 올라오며 도면 틀이 펼쳐짐) → 하루의 공정(시계·진행 바·FIG 선 그리기 스크럽)
     → 첫 방문 단계 점등 → 시설 컨택트 시트 가로 흐름(PC, 고정 없음) → 사진 시차 → 상담 밴드 상승.
   - 휠 관성 스크롤(Lenis)·pin 은 쓰지 않는다(고정 전환 프레임 CLS, 2026-11-04 교훈). 그라데이션 글씨 없음. */
(function () {
  var html = document.documentElement;
  if (!html.classList.contains('mx') || html.classList.contains('nogs') || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  html.classList.add('gs');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return gsap.utils.toArray((c || document).querySelectorAll(s)); };
  var mobile = matchMedia('(max-width: 1023px)').matches;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  // ── 1. 히어로 인트로 (로드 직후 1회): 눈금자 → 제목 세 줄 → 문구·버튼·수치 → 도면 틀이 위에서 펼쳐지고 치수선이 그려진다
  var hero = $('.hero');
  if (hero) {
    var lines = $$('.hero .hl-in'), items = $$('.hero [data-hero]:not([data-hero="media"])');
    var rule = $('.hero-rule'), frame = $('.hero-frame'), frameImg = $('.hero-frame img'), status = $('.hero-status'), quote = $('.hero-quote');
    var dimx = $('.hero-dim-x i'), dimy = $('.hero-dim-y i');
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (rule) tl.to(rule, { scaleX: 1, duration: 1.4, ease: 'power3.out' }, 0);
    tl.to(lines, { y: 0, duration: 1.1, stagger: 0.11 }, 0.08)
      .to(items, { opacity: 1, duration: 0.8, stagger: 0.08 }, 0.4);
    if (frame) tl.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' }, 0.25);
    if (frameImg) tl.fromTo(frameImg, { scale: 1.16 }, { scale: 1.03, duration: 1.9, ease: 'power2.out' }, 0.25);
    if (dimx) tl.to(dimx, { scaleX: 1, duration: 0.9, ease: 'power3.out' }, 1.0);
    if (dimy) tl.to(dimy, { scaleY: 1, duration: 0.9, ease: 'power3.out' }, 1.1);
    if (status) tl.fromTo(status, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 1.15);
    if (quote) tl.fromTo(quote, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 1.3);
    // 끝 상태 보장: 탭이 숨겨져 타임라인이 밀려도 2.8초 뒤엔 전부 보인다
    setTimeout(function () { if (tl.progress() < 1) tl.progress(1); }, 2800);
    if (!mobile) {
      var heroST = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-copy', { y: -80, opacity: 0.12, ease: 'none', scrollTrigger: heroST });
      gsap.to('.hero-media', { y: 44, ease: 'none', scrollTrigger: heroST });
    }
  }

  // ── 2. 하루의 공정: 도면판을 지나는 동안 시계 00:00 → 01:00, 진행 바가 채워지고 FIG 선 아이콘이 차례로 그려진다
  var board = $('[data-board]');
  if (board) {
    var digits = $('[data-board-digits]', board), bar = $('.board-bar', board), figs = $$('.figp', board);
    var state = { p: 0 };
    function render() {
      var p = state.p, n = figs.length || 1;
      if (bar) bar.style.setProperty('--p', p.toFixed(4));
      if (digits) { var mins = Math.round(p * 60); digits.textContent = mins >= 60 ? '01:00' : '00:' + pad(mins); }
      if (mobile) return;
      figs.forEach(function (f, i) {
        var local = Math.max(0, Math.min(1, p * n - i));
        f.classList.toggle('lit', local >= 0.999);
        $$('.ld path, .ld circle, .ld rect, .ld line, .ld polyline', f).forEach(function (el) { el.style.setProperty('--draw', (1 - local).toFixed(3)); });
      });
    }
    render();
    gsap.to(state, { p: 1, ease: 'none', onUpdate: render, scrollTrigger: { trigger: board, start: 'top 78%', end: 'bottom 62%', scrub: 0.5 } });
    // 모바일은 FIG 가 세로로 길게 쌓여 전체 진행도로는 늦게 그려진다 → 각 FIG 가 화면에 들어올 때 자기 구간만큼 그린다
    if (mobile) figs.forEach(function (f) {
      var els = $$('.ld path, .ld circle, .ld rect, .ld line, .ld polyline', f), local = { v: 0 };
      gsap.to(local, { v: 1, ease: 'none', scrollTrigger: { trigger: f, start: 'top 88%', end: 'top 45%', scrub: 0.4 },
        onUpdate: function () { els.forEach(function (el) { el.style.setProperty('--draw', (1 - local.v).toFixed(3)); }); f.classList.toggle('lit', local.v >= 0.999); } });
    });
  }

  // ── 3. 첫 방문 6단계: 지나온 단계의 번호가 틸로 채워진다
  $$('.step').forEach(function (s) {
    ScrollTrigger.create({ trigger: s, start: 'top 64%', onEnter: function () { s.classList.add('on'); }, onLeaveBack: function () { s.classList.remove('on'); } });
  });

  // ── 4. 시설 컨택트 시트 (PC: 섹션이 지나가는 동안 레일이 옆으로 흐른다 — 고정 없음. 모바일: 네이티브 스냅 스크롤)
  var fac = $('[data-fac]'), track = $('[data-fac-track]');
  if (fac && track && !mobile) {
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 48); };
    gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: fac, start: 'top 85%', end: 'bottom 10%', scrub: 0.5, invalidateOnRefresh: true } });
  }

  // ── 5. 사진 시차: 의료진·첫 방문·영주 카드 사진이 틀 안에서 천천히 흐른다
  $$('.visit-photo img, .yj-card-img img').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // ── 6. 상담 밴드: 문구 묶음이 아래에서 올라선다
  var band = $('.band .wrap-n');
  if (band) gsap.fromTo(band, { y: mobile ? 26 : 60 }, { y: 0, ease: 'none', scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'top 35%', scrub: true } });

  // 폰트·이미지가 늦게 와도 위치 다시 계산
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
