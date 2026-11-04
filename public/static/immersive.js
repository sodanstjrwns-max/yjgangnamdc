/* 영주 강남치과의원 메인 필름 연출 v3 (GSAP 3.12 ScrollTrigger + Lenis 1.1) — "필름: 일상으로의 복귀" (2026-11-05)
   - 글자는 전부 HTML 그대로(크롤러·AEO 영향 0). html.mx + GSAP 로드 성공(html.gs)일 때만 동작, 아니면 CSS 가 아무것도 숨기지 않는다.
   - Lenis 관성 스크롤은 (pointer: fine)에서만. 터치는 기본 스크롤.
   - 고정 장면은 CSS position: sticky (GSAP pin 금지 — 고정 전환 프레임 CLS, 2026-11-04 교훈). 장면 진행도만 ScrollTrigger scrub.
   - 장면: 히어로 오프닝(검은 바가 걷히며 사진 줌아웃, 제목 세 줄) → 외과 전문의(사진 켄번즈) → 하루의 공정(고정: 시계·자막 큐·진행선)
     → 시설 카드가 전체화면으로 자람 → 가로 필름 스트립(PC 스크럽) → 첫 방문 점등 → 마지막 장면 상승. */
(function () {
  var html = document.documentElement;
  if (!html.classList.contains('mx') || html.classList.contains('nogs') || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  html.classList.add('gs');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return gsap.utils.toArray((c || document).querySelectorAll(s)); };
  var mobile = matchMedia('(max-width: 1023px)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  // ── 0. Lenis 관성 스크롤 (PC 포인터만). GSAP ticker 에 물려 ScrollTrigger 와 동기화
  var lenis = null;
  if (fine && window.Lenis) {
    try {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false, wheelMultiplier: 1 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
      document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]'); if (!a) return;
        var id = a.getAttribute('href'); if (!id || id.length < 2) return;
        var t = document.querySelector(id); if (!t) return;
        e.preventDefault(); lenis.scrollTo(t, { offset: -72 }); try { history.pushState(null, '', id); } catch (x) {}
      });
    } catch (e) { lenis = null; }
  }

  // ── 1. 히어로 오프닝: 검은 바 두 장이 위아래로 걷히고 사진이 줌아웃, 제목 세 줄이 올라오고 문구·버튼·상태 카드가 켜진다
  var hero = $('.hero');
  if (hero) {
    var bars = $$('.hero .bar'), bgImg = $('.hero .sc-bg img'), bgWrap = $('.hero .sc-bg');
    var lines = $$('.hero .hl-in'), items = $$('.hero [data-hero]'), status = $('.hero-status');
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (bars.length) tl.to(bars, { scaleY: 0, duration: 1.7, ease: 'power4.inOut' }, 0);
    if (bgImg) tl.fromTo(bgImg, { scale: 1.24 }, { scale: 1.04, duration: 3.4, ease: 'power2.out' }, 0);
    tl.to(lines, { y: 0, duration: 1.25, stagger: 0.13 }, 0.6)
      .to(items, { opacity: 1, duration: 0.9, stagger: 0.1 }, 1.0);
    if (status) tl.fromTo(status, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 1.35);
    // 끝 상태 보장: 탭이 숨겨져 타임라인이 밀려도 3.2초 뒤엔 전부 보인다
    setTimeout(function () { if (tl.progress() < 1) tl.progress(1); }, 3200);
    // 스크롤: 사진이 커지며 가라앉고 문구는 먼저 떠난다 (사진 줌은 바깥 래퍼에, 오프닝 줌은 img 에 — 서로 안 겹침)
    var heroST = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    if (bgWrap) gsap.to(bgWrap, { scale: 1.12, y: mobile ? 0 : 50, ease: 'none', scrollTrigger: heroST });
    gsap.to('.hero-in', { y: mobile ? -30 : -90, opacity: 0.08, ease: 'none', scrollTrigger: heroST });
  }

  // ── 2. 켄번즈: [data-kb] 안 사진이 화면을 지나는 동안 천천히 커지며 흐른다 (의료진·첫 방문)
  $$('[data-kb] img').forEach(function (img) {
    gsap.fromTo(img, { scale: 1.06, yPercent: -3 }, { scale: 1.16, yPercent: 3, ease: 'none', scrollTrigger: { trigger: img.closest('[data-kb]'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // ── 3. 하루의 공정 (고정 장면): 시계 00:00 → 01:00, 자막 큐 4개가 차례로 바뀌고 진행선·눈금이 채워지며 배경이 천천히 다가온다
  var film = $('[data-film]');
  if (film) {
    var cues = $$('.cue', film), ticks = $$('.film-ticks span', film), digits = $('[data-film-digits]', film), prog = $('.film-prog', film), fimg = $('[data-film-img]', film);
    var n = cues.length || 1;
    var ftl = gsap.timeline({ scrollTrigger: { trigger: film, start: 'top top', end: 'bottom bottom', scrub: 0.6, onUpdate: function (self) {
      var p = self.progress;
      if (digits) { var mins = Math.round(p * 60); digits.textContent = mins >= 60 ? '01:00' : '00:' + pad(mins); }
      if (prog) prog.style.setProperty('--p', Math.max(0.01, p).toFixed(4));
      ticks.forEach(function (t, i) { t.classList.toggle('on', p >= i / n + 0.02); });
    } } });
    if (fimg) ftl.fromTo(fimg, { scale: 1 }, { scale: 1.2, duration: 1, ease: 'none' }, 0);
    cues.forEach(function (c, i) {
      var t0 = i / n;
      if (i === 0) ftl.set(c, { opacity: 1, y: 0 }, 0);
      else ftl.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' }, t0 + 0.015);
      if (i < n - 1) ftl.to(c, { opacity: 0, y: -24, duration: 0.07, ease: 'power2.in' }, t0 + 1 / n - 0.075);
    });
    if (ticks[0]) ticks[0].classList.add('on');
  }

  // ── 4. 시설 카드가 전체화면으로 자란다 (고정 장면). 라벨·문구는 자라는 동안 떠오른다
  var grow = $('[data-grow]'), gcard = $('[data-grow-card]');
  if (grow && gcard) {
    var gtl = gsap.timeline({ scrollTrigger: { trigger: grow, start: 'top top', end: 'bottom bottom', scrub: 0.5 } });
    gtl.fromTo(gcard, { scale: mobile ? 0.78 : 0.56, borderRadius: mobile ? 18 : 28 }, { scale: 1, borderRadius: 0, duration: 0.7, ease: 'power1.inOut' }, 0);
    var gimg = $('img', gcard); if (gimg) gtl.fromTo(gimg, { scale: 1.15 }, { scale: 1, duration: 1, ease: 'none' }, 0);
    var gui = $('.grow-ui', grow), gtop = $('.grow-top', grow);
    if (gui) gtl.fromTo(gui, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.5);
    if (gtop) gtl.fromTo(gtop, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55);
  }

  // ── 5. 가로 필름 스트립 (PC: 섹션이 지나가는 동안 옆으로 흐른다 — 고정 없음. 모바일: 네이티브 스냅 스크롤)
  var rail = $('[data-rail]'), track = $('[data-rail-track]');
  if (rail && track && !mobile) {
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 56); };
    gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: rail, start: 'top 90%', end: 'bottom 5%', scrub: 0.6, invalidateOnRefresh: true } });
  }

  // ── 6. 첫 방문 6단계: 지나온 단계의 번호가 틸로 켜진다
  $$('.step').forEach(function (s) {
    ScrollTrigger.create({ trigger: s, start: 'top 64%', onEnter: function () { s.classList.add('on'); }, onLeaveBack: function () { s.classList.remove('on'); } });
  });

  // ── 7. 마지막 장면: 배경이 가라앉고 문구 묶음이 아래에서 올라선다
  var fin = $('[data-fin]');
  if (fin) {
    var fbg = $('.sc-bg', fin), fin_in = $('.fin-in', fin);
    if (fbg) gsap.fromTo(fbg, { scale: 1.18, y: mobile ? 0 : -40 }, { scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: fin, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    if (fin_in) gsap.fromTo(fin_in, { y: mobile ? 30 : 70 }, { y: 0, ease: 'none', scrollTrigger: { trigger: fin, start: 'top bottom', end: 'top 30%', scrub: true } });
  }

  // 폰트·이미지가 늦게 와도 위치 다시 계산
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
