/* 강남치과의원(영주) 메인 스크롤 몰입 연출 (GSAP ScrollTrigger + Lenis)
   - 톤: 흰 바탕 + 틸, 구강외과 전문의·디지털 보철(세렉) — '정밀함': 빠르고 또렷한 power4 이징,
     스캐너가 훑듯 옆으로 걷히는 클립, 공정 단계가 차례로 켜지는 진행 표시
   - 히어로(자체 등장·시차)와 흐르는 띠(CSS)는 기존 그대로, 나머지 섹션의 일괄 .reveal/.stagger 등장은 넘겨받아 섹션별로
   - 글자는 모두 HTML에 그대로(크롤러·AEO 영향 없음), 동작 줄이기면 아무것도 하지 않음 */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  // layout 의 initReveals(DOMContentLoaded)가 트리거를 만든 직후에 시작해 넘겨받는다
  function boot() { setTimeout(start, 60); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  function start() {
  var root = document.documentElement;
  root.classList.add('mx');
  var mobile = matchMedia('(max-width: 767px)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  var SNAP = 'power4.out';

  // 1) 관성 스크롤 — 마우스·트랙패드 + 표준 모드만 (터치는 기본 스크롤)
  var lenis = null;
  if (fine && window.Lenis && document.compatMode === 'CSS1Compat') {
    // 가로로 넘기는 장비·시설 갤러리는 휠·트랙패드 가로 이동을 그대로
    document.querySelectorAll('#facilityGallery, main .overflow-x-auto').forEach(function (s) { s.setAttribute('data-lenis-prevent-wheel', ''); });
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        lenis.scrollTo(target, { offset: -96 });
      }, true);
    });
  }

  // 기존 일괄 등장(.reveal* · .stagger-item · data-speakable)을 넘겨받기 — 아직 시작 전인 것만 (첫 화면에서 이미 재생 중이면 그대로 둔다)
  var REVEAL = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale', 'reveal-blur', 'reveal-rotate'];
  function release(el) {
    var tws = gsap.getTweensOf(el);
    if (tws.some(function (t) { return t.progress() > 0; })) return false;
    tws.forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
    REVEAL.forEach(function (c) { el.classList.remove(c); });
    gsap.set(el, { clearProps: 'opacity,transform,filter' });
    return true;
  }
  var mainEl = document.getElementById('main-content') || document.body;
  mainEl.querySelectorAll('.' + REVEAL.join(', .') + ', .stagger-item, [data-speakable="true"]').forEach(function (el) {
    if (el.closest('#hero')) return;
    release(el);
  });

  // ── 엔진: 화면에 들어오면 한 번 재생, 빠르게 지나쳐도 끝 상태 보장
  var TIMING = ['duration', 'ease', 'stagger', 'delay'];
  var claimed = [];
  function claim(list) { gsap.utils.toArray(list).forEach(function (el) { claimed.push(el); }); }
  function isClaimed(el) { return claimed.some(function (c) { return c === el || c.contains(el) || el.contains(c); }); }
  function enter(targets, vars, trigger, startAt) {
    targets = gsap.utils.toArray(targets);
    if (!targets.length) return null;
    claim(targets);
    var from = {}, to = { opacity: 1, x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, rotateX: 0, rotateY: 0, scale: 1, paused: true,
      onStart: function () { gsap.set(targets, { transition: 'none' }); },
      onComplete: function () { gsap.set(targets, { clearProps: 'opacity,transform,transition,clipPath' }); } };
    Object.keys(vars).forEach(function (k) { (TIMING.indexOf(k) > -1 ? to : from)[k] = vars[k]; });
    if ('clipPath' in from) to.clipPath = 'inset(0% 0% 0% 0%)';
    var tw = gsap.fromTo(targets, from, to);
    var item = { tw: tw, el: trigger || targets[0] };
    pending.push(item);
    ScrollTrigger.create({ trigger: item.el, start: startAt || 'top 88%', once: true, onEnter: function () { play(item); } });
    return tw;
  }
  // 재생 + 탭이 숨겨져 프레임이 멈춰도 끝 상태 보장
  var pending = [];
  function play(item) {
    var i = pending.indexOf(item);
    if (i > -1) pending.splice(i, 1);
    if (item.tw.progress() > 0) return;
    item.tw.play();
    setTimeout(function () { if (item.tw.progress() < 1) item.tw.progress(1); }, (item.tw.totalDuration() + 0.6) * 1000);
  }
  // 한 번에 건너뛴 구간(앵커 이동·빠른 점프)은 콜백이 생략될 수 있으므로 화면 위·안에 있는 대기 연출을 모두 재생
  function sweep() {
    pending.slice().forEach(function (it) { if (it.el.getBoundingClientRect().top < innerHeight * 0.92) play(it); });
  }
  ScrollTrigger.addEventListener('scrollEnd', sweep);
  // 그라데이션 글씨(background-clip:text, 예 .royal-grad-text) 안을 낱말로 쪼개면 글자가 투명해진다(대구 2026-11-01 사고)
  // → 그 요소 자체를 낱말 하나처럼 통째로 감싸 움직인다(요소 자신의 clip:text 는 transform 이 있어도 정상).
  //   예전의 '낱말마다 그라데이션 다시 입히기'는 낱말마다 색이 처음부터 다시 시작돼 원래 디자인과 달랐다.
  function clipTextHost(node) {
    for (var e = node.parentElement; e; e = e.parentElement) {
      var cs = getComputedStyle(e);
      if (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text') return e;
    }
    return null;
  }
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var hosts = [];
    while (walker.nextNode()) {
      var host = clipTextHost(walker.currentNode);
      if (host) { if (hosts.indexOf(host) < 0) hosts.push(host); continue; }
      nodes.push(walker.currentNode);
    }
    hosts.forEach(function (h) {
      if (h === el || h.contains(el)) return; // 제목 전체가 그라데이션(또는 그 안)이면 쪼개지 않음
      var w = document.createElement('span'); w.className = 'mx-w';
      h.parentNode.insertBefore(w, h); w.appendChild(h); h.classList.add('mx-wi');
    });
    nodes.forEach(function (node) {
      var parts = node.textContent.split(/(\s+)/);
      if (parts.join('').trim() === '') return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
        var w = document.createElement('span'); w.className = 'mx-w';
        var i = document.createElement('span'); i.className = 'mx-wi'; i.textContent = p;
        w.appendChild(i); frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return el.querySelectorAll('.mx-wi');
  }
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return gsap.utils.toArray((ctx || document).querySelectorAll(sel)); };
  function scrub(target, from, to, st) {
    claim(target);
    return gsap.fromTo(target, from, Object.assign({ ease: 'none', scrollTrigger: Object.assign({ scrub: true }, st) }, to));
  }
  // 사진 시차: CSS translate 속성만 움직여 기존 hover 확대(transform)와 겹치지 않게
  function drift(img, box, amt) {
    if (!img || !box) return;
    box.classList.add('mx-par');
    gsap.fromTo(img, { translate: '0 ' + (-amt) + '%' }, { translate: '0 ' + amt + '%', ease: 'none',
      scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  var sec = function (label) { return document.querySelector('main section[aria-label="' + label + '"]'); };

  // ── 섹션 머리: 라벨이 톡, 제목은 낱말이 빠르게 올라오고, 설명은 뒤따라
  $$('main section').forEach(function (s) {
    if (s.id === 'hero') return;
    var h2 = $('h2', s);
    if (!h2 || isClaimed(h2)) return;
    var head = h2.parentElement;
    var label = $('.section-label', head);
    if (label) enter(label, { y: 14, scale: 0.9, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, head, 'top 88%');
    enter(splitWords(h2), { yPercent: 108, duration: 0.85, ease: SNAP, stagger: 0.035 }, h2, 'top 88%');
    var after = $$(':scope > p, :scope > div:not(.section-label)', head).filter(function (el) { return !isClaimed(el); });
    if (after.length) enter(after, { y: 18, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.15 }, head, 'top 88%');
  });

  // ── 차별점 벤토: 카드가 스캐너로 훑듯 왼쪽에서 오른쪽으로 걷힘
  var why = sec('강남치과 차별점');
  if (why) {
    var cards = $$('.stagger-children > .stagger-item', why);
    if (cards.length) enter(cards, { clipPath: 'inset(0% 100% 0% 0%)', x: -20, duration: 1, ease: 'power4.inOut', stagger: 0.09 }, cards[0], 'top 85%');
  }

  // ── 기존 보철 vs 세렉: 두 카드가 양쪽에서 들어와 만나고, 디지털 쪽이 한 박자 늦게 살짝 커짐
  var cmp = sec('기존 아날로그 보철 과정과 디지털 CEREC 보철 과정 비교');
  if (cmp) {
    var pair = $$('.stagger-children > .stagger-item', cmp);
    pair.forEach(function (c, i) {
      enter(c, { x: mobile ? 0 : (i ? 90 : -90), y: mobile ? 30 : 0, scale: i ? 0.94 : 1, opacity: 0, duration: 1.1, ease: SNAP, delay: i * 0.18 }, pair[0], 'top 85%');
    });
  }

  // ── 세렉 공정 4단계: 들어올 때 차례로 서고, 스크롤에 맞춰 단계가 하나씩 켜짐(스캔→설계→밀링→장착)
  var proc = sec('디지털 보철 프로세스');
  if (proc) {
    var steps = $$('.stagger-children > .stagger-item', proc);
    if (steps.length) {
      steps.forEach(function (s) { s.classList.add('mx-step'); });
      enter(steps, { y: 50, opacity: 0, duration: 0.9, ease: SNAP, stagger: 0.1 }, steps[0], 'top 86%');
      ScrollTrigger.create({ trigger: steps[0].parentElement, start: 'top 70%', end: 'bottom 35%',
        onUpdate: function (self) {
          var idx = Math.floor(self.progress * steps.length * 0.999);
          steps.forEach(function (s, i) { s.classList.toggle('mx-on', i <= idx); });
        },
        onLeaveBack: function () { steps.forEach(function (s) { s.classList.remove('mx-on'); }); } });
    }
  }

  // ── 주력 진료: 카드가 살짝 눕혀진 채 일어섬
  var tx = document.getElementById('treatments');
  if (tx) {
    var txc = $$('.stagger-children > .stagger-item', tx);
    if (txc.length) {
      gsap.set(txc[0].parentElement, { perspective: 1100 });
      enter(txc, { y: mobile ? 34 : 70, rotateX: mobile ? 0 : 12, opacity: 0, transformOrigin: '50% 0%', duration: 1, ease: SNAP, stagger: 0.08 }, txc[0], 'top 86%');
    }
    var yj = $$('.yj-cards > li', tx);
    if (yj.length) enter(yj, { clipPath: 'inset(0% 0% 100% 0%)', y: 24, duration: 0.95, ease: 'power4.inOut', stagger: { each: 0.08, grid: 'auto', from: 'start' } }, yj[0], 'top 88%');
    $$('.yj-card-img', tx).forEach(function (b) { drift($('img', b), b, 4); });
    var quick = $$('nav[aria-label="영주 진료 바로가기"] a', tx);
    if (quick.length) enter(quick, { y: 12, scale: 0.9, opacity: 0, duration: 0.55, ease: 'back.out(1.8)', stagger: 0.03 }, quick[0], 'top 92%');
  }

  // ── 환자 유형별 솔루션: 세 장이 가운데부터 뒤집히듯 펼쳐짐
  var per = sec('환자 유형별 솔루션');
  if (per) {
    var pc = $$('.stagger-children > .stagger-item', per);
    if (pc.length) {
      gsap.set(pc[0].parentElement, { perspective: 1200 });
      enter(pc, { rotateY: mobile ? 0 : -40, y: 40, opacity: 0, transformOrigin: '0% 50%', duration: 1, ease: SNAP, stagger: { each: 0.1, from: 'center' } }, pc[0], 'top 86%');
    }
  }

  // ── 장비·시설 가로 갤러리: 컨베이어처럼 오른쪽에서 줄지어 들어옴, 시설 사진은 안에서 천천히 흐름
  var eq = sec('대학병원급 디지털 장비');
  if (eq) {
    var ec = $$('.stagger-children > .stagger-item', eq);
    if (ec.length) enter(ec, { x: mobile ? 80 : 160, opacity: 0, duration: 1, ease: SNAP, stagger: 0.08 }, ec[0].parentElement, 'top 85%');
  }
  var fac = document.getElementById('facilityGallery');
  if (fac) {
    enter(fac.children, { x: mobile ? 80 : 160, opacity: 0, duration: 1, ease: SNAP, stagger: 0.07 }, fac, 'top 85%');
    $$('.aspect-\\[4\\/3\\]', fac).forEach(function (b) { drift($('img', b), b, 5); });
  }

  // ── 첫 방문 6단계: 한 줄씩 들어오고, 지나온 단계의 아이콘이 차례로 틸 색으로 채워짐
  var visit = sec('첫 방문 가이드');
  if (visit) {
    var vs = $$('.stagger-children > .stagger-item', visit);
    if (vs.length) {
      vs.forEach(function (s) { s.classList.add('mx-vstep'); });
      enter(vs, { x: -40, opacity: 0, duration: 0.85, ease: SNAP, stagger: 0.08 }, vs[0], 'top 88%');
      vs.forEach(function (s) {
        ScrollTrigger.create({ trigger: s, start: 'top 62%', onEnter: function () { s.classList.add('mx-on'); }, onLeaveBack: function () { s.classList.remove('mx-on'); } });
      });
    }
  }

  // ── 의료진: 사진이 아래에서 위로 드러나고, 사진 안에서 천천히 흐름
  var drs = sec('의료진 소개');
  if (drs) {
    var dc = $$('.stagger-children > .stagger-item', drs);
    if (dc.length) enter(dc, { y: 60, opacity: 0, duration: 1.1, ease: SNAP, stagger: 0.15 }, dc[0], 'top 86%');
    dc.forEach(function (c) {
      var box = $('.relative.overflow-hidden', c), img = box && $('img', box);
      if (!img) return;
      enter(box, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, c, 'top 86%');
      drift(img, box, 5);
    });
  }

  // ── 핵심 수치: 숫자 칸이 톡 튀어나옴 (숫자 세기는 기존 그대로)
  var nums = sec('강남치과 핵심 수치');
  if (nums) {
    var nc = $$('.stagger-children > .stagger-item', nums);
    if (nc.length) enter(nc, { scale: 0.8, y: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.08 }, nc[0], 'top 88%');
  }

  // ── 주변 지역: 칩이 가운데부터 퍼지며
  var area = sec('주변 지역 접근성');
  if (area) {
    var ac = $$('.stagger-children > .stagger-item', area);
    if (ac.length) enter(ac, { scale: 0.85, y: 20, opacity: 0, duration: 0.7, ease: 'back.out(1.6)', stagger: { each: 0.05, from: 'center' } }, ac[0], 'top 88%');
  }

  // ── 자주 묻는 질문: 질문 카드가 오른쪽에서 차례로
  var faq = document.getElementById('faq');
  if (faq) {
    var fq = $$('.stagger-children > .stagger-item', faq);
    if (fq.length) enter(fq, { x: mobile ? 0 : 50, y: mobile ? 24 : 0, opacity: 0, duration: 0.8, ease: SNAP, stagger: 0.06 }, fq[0], 'top 90%');
  }

  // ── 마지막 상담: 상자가 다가오며 커지고, 동심원이 퍼짐
  var cta = sec('상담 예약');
  if (cta) {
    var box = $('.max-w-3xl', cta);
    if (box) {
      scrub(box, { scale: mobile ? 0.94 : 0.86, opacity: 0.5 }, { scale: 1, opacity: 1 }, { trigger: cta, start: 'top bottom', end: 'top 30%' });
      // 동심원 두 개가 퍼짐 — 위치 잡는 transform(-50%) 은 그대로 두고 CSS scale 속성만 (변수로)
      $$(':scope > .rounded-full', box).forEach(function (r, i) {
        claim(r);
        gsap.fromTo(r, { '--mxs': 0.35, opacity: 0 }, { '--mxs': 1, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: cta, start: 'top 80%', end: 'top ' + (25 - i * 10) + '%', scrub: true } });
      });
    }
  }

  // ── 흐르는 띠: 스크롤 속도만큼 기울었다가 돌아옴
  // (띠 자체는 CSS 애니메이션이 transform 을 쥐고 있어 바깥 띠 상자를 기울인다)
  var band = $('main .marquee-track');
  band = band && band.parentElement;
  if (band) {
    var skewTo = gsap.quickTo(band, 'skewX', { duration: 0.45, ease: 'power3' });
    ScrollTrigger.create({ trigger: band, start: 'top bottom', end: 'bottom top',
      onUpdate: function (self) { skewTo(gsap.utils.clamp(-6, 6, self.getVelocity() / -300)); } });
  }

  // ── 나머지: 넘겨받았지만 아직 연출이 없는 블록은 기본 등장
  $$('main section .stagger-item, main section [class*="reveal"]').concat($$('main section > div > div > *')).forEach(function (el) {
    if (el.closest('#hero') || isClaimed(el) || /STYLE|SCRIPT/.test(el.tagName)) return;
    if (el.getBoundingClientRect().height < 8) return;
    var pos = getComputedStyle(el).position;
    if (pos === 'absolute' || pos === 'fixed') return; // 장식용 배경 원·격자는 제외
    enter(el, { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out' }, el, 'top 90%');
  });

  // 주소에 #앵커가 있으면 — 트리거 계산이 브라우저의 앵커 이동을 끊으므로 다시 그 자리로
  var touched = false;
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) { window.addEventListener(ev, function () { touched = true; }, { once: true, passive: true }); });
  function toHash() {
    var id = location.hash;
    if (touched) return;
    if (id.length < 2) return;
    var t; try { t = document.querySelector(decodeURIComponent(id)); } catch (e) { return; }
    if (!t) return;
    var y = t.getBoundingClientRect().top + window.pageYOffset - 96;
    if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
  }
  ScrollTrigger.refresh();
  toHash();
  sweep();
  // 이미지가 늦게 로드되면 위치 다시 계산
  window.addEventListener('load', function () { ScrollTrigger.refresh(); toHash(); sweep(); });
  }
})();
