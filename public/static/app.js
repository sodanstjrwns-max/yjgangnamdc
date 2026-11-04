/* 영주 강남치과의원 — app.js v3 (2026-11-05 전면 리디자인 "필름: 일상으로의 복귀")
   헤더·드로어·진료 상태(KST)·등장 연출(IntersectionObserver)·카운터·사진 라이트박스·로그인 상태·GA4 이벤트.
   메인 스크롤 연출은 immersive.js(GSAP, 홈에서만). 옛 전역 함수(toggleMenu/doLogout/openPhotoModal …)는 호환용으로 남긴다.
   원칙: 글자는 전부 HTML 그대로. html.mx(동작 줄이기 아님 + IO 지원)일 때만 CSS 가 숨김 시작하고 여기서 노출한다. */
(function () {
  'use strict';
  var d = document, w = window, html = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var mx = html.classList.contains('mx');

  // ── 관리자 화면: 공용 크롬 숨김
  if (location.pathname.indexOf('/admin') === 0) {
    ['#main-header', 'footer', '.mbar', '.fab-col', '#scroll-progress'].forEach(function (s) { $$(s).forEach(function (el) { el.style.display = 'none'; }); });
    d.body.style.paddingBottom = '0';
  }

  // ── 헤더: 스크롤 상태 · 아래로 내리면 숨김/올리면 표시 · 진행선 · 맨 위로
  var header = $('#main-header'), progress = $('#scroll-progress'), fabTop = $('#fab-top');
  var lastY = w.scrollY, ticking = false;
  function onScroll() {
    var y = w.scrollY;
    if (header) {
      header.classList.toggle('scrolled', y > 8);
      if (!header.classList.contains('menu-open')) {
        if (y > lastY + 6 && y > 160) header.classList.add('hide');
        else if (y < lastY - 6 || y < 80) header.classList.remove('hide');
      }
    }
    if (progress) { var h = html.scrollHeight - w.innerHeight; progress.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')'; }
    if (fabTop) fabTop.classList.toggle('show', y > 600);
    lastY = y; ticking = false;
  }
  w.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  if (fabTop) fabTop.addEventListener('click', function () { if (w.__lenis) w.__lenis.scrollTo(0); else w.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ── 모바일 드로어
  var mmBtn = $('#mobile-menu-btn'), menu = $('#mobile-menu');
  function setMenu(open) {
    if (!menu || !mmBtn) return;
    menu.hidden = !open;
    mmBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    mmBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    d.body.classList.toggle('menu-open', open);
    if (w.__lenis) { if (open) w.__lenis.stop(); else w.__lenis.start(); }
    if (header) { header.classList.toggle('menu-open', open); if (open) header.classList.remove('hide'); }
  }
  if (mmBtn && menu) {
    mmBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
    w.addEventListener('resize', function () { if (w.innerWidth > 1180 && !menu.hidden) setMenu(false); });
  }
  w.toggleMenu = function () { if (menu) setMenu(menu.hidden); };
  // 데스크톱 내원안내 드롭다운: 키보드 접근(버튼 클릭으로 토글)
  $$('.nav button[aria-haspopup]').forEach(function (b) {
    b.addEventListener('click', function () { var li = b.parentElement; var open = li.classList.toggle('open'); b.setAttribute('aria-expanded', String(open)); });
  });

  // ── 진료 상태(KST): 평일 09:00–17:30, 접수 17:00, 점심 13–14, 토·일 휴진 (src/lib/hours.ts 와 같은 규칙)
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function kst() { var t = new Date(Date.now() + 9 * 3600000); return { day: t.getUTCDay(), h: t.getUTCHours(), m: t.getUTCMinutes() }; }
  function status() {
    var k = kst(), idx = k.day === 0 ? 6 : k.day - 1, weekday = idx <= 4, now = k.h + k.m / 60, s = 'closed';
    if (weekday) { s = now < 9 ? 'before' : now < 13 ? 'open' : now < 14 ? 'lunch' : now < 17 ? 'open' : now < 17.5 ? 'lastcall' : 'after'; }
    var text = { open: '진료중 · 접수 17:00까지', lunch: '점심시간 · 14:00 진료 재개', lastcall: '접수 마감 · 17:30 진료 종료', before: '오늘 09:00 진료 시작', after: '오늘 진료 종료', closed: '휴진 · 월요일 09:00 진료' }[s];
    var short = { open: '지금 진료중', lunch: '점심시간', lastcall: '접수 마감', before: '진료 시작 전', after: '오늘 진료 종료', closed: '오늘 휴진' }[s];
    return { s: s, text: text, short: short, clock: pad(k.h) + ':' + pad(k.m), weekday: weekday, idx: idx };
  }
  function tick() {
    var st = status();
    $$('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', st.s === 'open'); el.classList.toggle('is-lunch', st.s === 'lunch');
      var t = el.querySelector('.txt'); if (t) t.textContent = st.text;
    });
    $$('[data-timecard]').forEach(function (el) {
      el.classList.toggle('is-open', st.s === 'open'); el.classList.toggle('is-lunch', st.s === 'lunch');
      var t = el.querySelector('[data-tc-text]'), c = el.querySelector('[data-clock]'), x = el.querySelector('[data-tc-close]');
      if (t) t.textContent = st.short;
      if (c) c.textContent = st.clock;
      if (x) x.textContent = st.s === 'open' ? '접수 ~ 17:00' : st.s === 'lunch' ? '~ 14:00' : st.s === 'lastcall' ? '~ 17:30' : st.weekday ? '09:00 – 17:30' : '평일 09:00 – 17:30';
    });
    $$('.wk-col').forEach(function (el) { el.classList.toggle('today', +el.getAttribute('data-day') === st.idx); });
  }
  tick(); setInterval(tick, 30000);

  // ── 등장 연출: IntersectionObserver. html.mx 가 아니면 CSS 가 아무것도 숨기지 않으므로 할 일이 없다.
  var LEGACY = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-rotate, .stagger-children, .stagger-cascade';
  var NEW = '[data-rv], [data-rv-group], .hl[data-rv="lines"]';
  function show(el) { if (el.matches(NEW)) el.classList.add('on'); else el.classList.add('visible'); }
  if (mx) {
    var targets = $$(NEW + ', ' + LEGACY).filter(function (el) { return !el.closest('.hero'); }); // 홈 히어로는 immersive.js 타임라인이 맡는다
    if ('IntersectionObserver' in w) {
      // 클립 마스크(data-rv="mask")는 clip-path 로 보이는 면적이 0 이라 IO 교차가 안 잡힌다 → 부모 요소를 대신 관찰한다
      var obsMap = new Map();
      targets.forEach(function (el) {
        var key = el.getAttribute('data-rv') === 'mask' && el.parentElement ? el.parentElement : el;
        if (!obsMap.has(key)) obsMap.set(key, []);
        obsMap.get(key).push(el);
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { (obsMap.get(en.target) || [en.target]).forEach(show); io.unobserve(en.target); } });
      }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
      obsMap.forEach(function (_, key) { io.observe(key); });
    } else targets.forEach(show);
    // 안전망: 2.5초 뒤에도 화면 안에 있는데 숨어 있으면 노출(IO 누락·인앱 브라우저 대비). 홈 히어로는 GSAP 이 안 왔으면 CSS 로 전부 노출(html.nogs)
    setTimeout(function () {
      if (!html.classList.contains('gs')) html.classList.add('nogs');
      targets.forEach(function (el) {
        if (el.classList.contains('on') || el.classList.contains('visible')) return;
        var r = el.getBoundingClientRect(); if (r.top < w.innerHeight && r.bottom > 0) show(el);
      });
    }, 2500);
    if (location.hash) { try { var tgt = $(location.hash); if (tgt) { targets.forEach(function (el) { if (el.compareDocumentPosition(tgt) & Node.DOCUMENT_POSITION_FOLLOWING || tgt.contains(el)) show(el); }); } } catch (e) {} }
  }

  // ── 카운터: [data-count] (신규) · .counter[data-target] (옛 하위페이지)
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = '1';
    var target = parseFloat(el.getAttribute('data-count') || el.getAttribute('data-target')); if (isNaN(target)) return;
    var pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
    var dec = target % 1 ? 1 : 0, t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + (target * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = pre + target.toFixed(dec) + suf;
    }
    requestAnimationFrame(step);
  }
  var counters = $$('[data-count], .counter[data-target]');
  if (counters.length) {
    if (mx && 'IntersectionObserver' in w) {
      var cio = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } }); }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    } else counters.forEach(function (el) { // 연출 없음: 최종 숫자 그대로
      var t = el.getAttribute('data-count') || el.getAttribute('data-target'); if (t != null) el.textContent = (el.getAttribute('data-prefix') || '') + t + (el.getAttribute('data-suffix') || '');
    });
  }

  // ── 사진 라이트박스 (홈 시설 컨택트 시트 · 옛 openPhotoModal 호환)
  var box = $('#photoModal');
  function openPhoto(url, alt, cap) {
    if (!box) return;
    var img = box.querySelector('img'), fc = box.querySelector('figcaption');
    img.src = url; img.alt = alt || '';
    if (fc) fc.textContent = cap || alt || '';
    box.classList.add('show'); d.body.style.overflow = 'hidden'; if (w.__lenis) w.__lenis.stop();
    var x = box.querySelector('button'); if (x) x.focus();
  }
  function closePhoto() { if (!box) return; box.classList.remove('show'); d.body.style.overflow = ''; if (w.__lenis) w.__lenis.start(); }
  w.openPhotoModal = openPhoto; w.closePhotoModal = closePhoto;
  if (box) {
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('button')) closePhoto(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('show')) closePhoto(); });
  }
  $$('[data-photo]').forEach(function (b) {
    b.addEventListener('click', function () { openPhoto(b.getAttribute('data-photo'), b.getAttribute('data-alt'), b.getAttribute('data-cap')); });
  });

  // ── 로그인 상태 (/api/auth/me → { loggedIn, user })
  function applyUser(user) {
    var nav = $('#auth-nav'), u = $('#auth-user'), name = $('#auth-user-name');
    if (nav) nav.classList.add('hidden'); if (u) u.classList.remove('hidden'); if (name) name.textContent = user.name || '회원';
    var mn = $('#mobile-auth-nav'), mu = $('#mobile-auth-user'), mname = $('#mobile-user-name');
    if (mn) mn.classList.add('hidden'); if (mu) mu.classList.remove('hidden'); if (mname) mname.textContent = user.name || '회원';
  }
  function checkAuth() {
    return fetch('/api/auth/me').then(function (r) { return r.json(); }).then(function (data) {
      if (data && (data.loggedIn || data.ok) && data.user) applyUser(data.user);
    }).catch(function () {});
  }
  function logout() { fetch('/api/auth/logout', { method: 'POST' }).catch(function () {}).then(function () { location.href = '/'; }); }
  w.checkAuthStatus = checkAuth; w.doLogout = logout; w.toggleUserMenu = function () {};
  checkAuth();
  ['#auth-logout-btn', '#mobile-logout-btn'].forEach(function (s) { var b = $(s); if (b) b.addEventListener('click', logout); });

  // ── GA4 이벤트(기존 유지): 전화·예약·외부링크·스크롤 깊이·폼 제출·Web Vitals
  function trackEvent(name, params) { if (typeof w.gtag === 'function') w.gtag('event', name, params || {}); }
  w.trackEvent = trackEvent;
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) trackEvent('phone_call_click', { event_category: 'engagement', event_label: href, page_location: location.pathname });
    else if (href.indexOf('reservation') > -1) trackEvent('reservation_click', { event_category: 'conversion', event_label: (a.textContent || '').trim(), page_location: location.pathname });
    else if (a.target === '_blank') trackEvent('outbound_click', { event_category: 'engagement', event_label: href, page_location: location.pathname });
  });
  var thresholds = [25, 50, 75, 100], fired = {};
  w.addEventListener('scroll', function () {
    var h = html.scrollHeight - w.innerHeight; if (h <= 0) return;
    var pct = Math.round((w.scrollY / h) * 100);
    thresholds.forEach(function (t) { if (pct >= t && !fired[t]) { fired[t] = 1; trackEvent('scroll_depth', { event_category: 'engagement', event_label: t + '%', value: t, page_location: location.pathname }); } });
  }, { passive: true });
  d.addEventListener('submit', function (e) {
    var form = e.target, host = form && form.closest && form.closest('[data-form-type]');
    if (host) trackEvent('form_submit', { event_category: 'conversion', event_label: host.getAttribute('data-form-type') || 'inquiry', page_location: location.pathname });
  });
  if ('PerformanceObserver' in w) {
    try { new PerformanceObserver(function (l) { var es = l.getEntries(), last = es[es.length - 1]; trackEvent('web_vitals', { event_category: 'performance', event_label: 'LCP', value: Math.round(last.startTime) }); }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) {}
    try { new PerformanceObserver(function (l) { l.getEntries().forEach(function (en) { trackEvent('web_vitals', { event_category: 'performance', event_label: 'FID', value: Math.round(en.processingStart - en.startTime) }); }); }).observe({ type: 'first-input', buffered: true }); } catch (e) {}
    try {
      var cls = 0;
      new PerformanceObserver(function (l) { l.getEntries().forEach(function (en) { if (!en.hadRecentInput) cls += en.value; }); }).observe({ type: 'layout-shift', buffered: true });
      d.addEventListener('visibilitychange', function () { if (d.visibilityState === 'hidden') trackEvent('web_vitals', { event_category: 'performance', event_label: 'CLS', value: Math.round(cls * 1000) }); });
    } catch (e) {}
  }
  trackEvent('page_view_custom', {
    page_category: (d.querySelector('meta[name="classification"]') || {}).content || 'general',
    treatment_type: location.pathname.indexOf('/treatments/') > -1 ? location.pathname.split('/treatments/')[1] : 'none',
    page_location: location.pathname
  });
})();
