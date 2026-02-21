export function mainPage(): string {
  return `

  <!-- ========== HERO — WHITE INNOVATIVE ========== -->
  <section class="relative min-h-screen flex items-center overflow-hidden hero-white" id="hero">
    <!-- 3D Particle Canvas (light particles) -->
    <canvas id="heroCanvas" class="absolute inset-0 w-full h-full" style="z-index:1;"></canvas>

    <!-- Subtle patterns -->
    <div class="absolute inset-0 grid-pattern opacity-60" style="z-index:2;"></div>
    
    <!-- Decorative orbs -->
    <div class="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[150px]" style="z-index:2;"></div>
    <div class="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-200/[0.06] rounded-full blur-[150px]" style="z-index:2;"></div>

    <!-- Content -->
    <div class="relative max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 w-full py-36 md:py-0" style="z-index:10;">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-screen">

        <!-- Left: Copy (7 cols) -->
        <div class="lg:col-span-7 pt-20 md:pt-0">
          <!-- Animated tag -->
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-xl mb-10 shadow-sm" id="heroTag">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span class="text-gray-500 text-[13px] font-medium">구강악안면외과 전문의 2인 직접 진료</span>
          </div>

          <!-- Main headline -->
          <h1 class="display-hero text-charcoal mb-8" id="heroTitle">
            <span class="block overflow-hidden">
              <span class="block" id="heroLine1">빠르게 낫고,</span>
            </span>
            <span class="block overflow-hidden">
              <span class="block gold-grad-text" id="heroLine2">정확하게 오래가는</span>
            </span>
            <span class="block overflow-hidden">
              <span class="block" id="heroLine3">치과</span>
            </span>
          </h1>

          <!-- Sub copy -->
          <div class="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-xl" id="heroSub">
            <p>영주 유일, 구강외과 전문의 2인 상주.</p>
            <p>CEREC 당일 보철 · 디지털 임플란트 · 최신 기술 빠른 도입.</p>
          </div>

          <!-- CTA buttons -->
          <div class="flex flex-wrap gap-4 mb-16" id="heroCTA">
            <a href="/reservation" class="btn-primary !py-5 !px-12 !text-[15px] !font-extrabold group">
              <i class="fas fa-calendar-check"></i>
              상담 예약하기
              <i class="fas fa-arrow-right text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
            </a>
            <a href="/pricing" class="btn-subtle !py-5 !px-10">
              <i class="fas fa-won-sign text-sm text-gold"></i>비용 안내
            </a>
          </div>

          <!-- Stat pills (horizontal) -->
          <div class="flex flex-wrap gap-3" id="heroStats">
            <div class="flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-200 bg-white/80 shadow-sm">
              <div class="w-10 h-10 rounded-xl gold-grad flex items-center justify-center" style="animation: pulse-gold 3s ease infinite;">
                <i class="fas fa-user-doctor text-white text-sm"></i>
              </div>
              <div>
                <div class="text-charcoal font-extrabold text-base leading-none">전문의 <span class="counter gold-grad-text text-lg" data-target="2">0</span>인</div>
                <div class="text-gray-400 text-[10px] mt-0.5 tracking-wide">구강악안면외과</div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-200 bg-white/80 shadow-sm">
              <div class="w-10 h-10 rounded-xl gold-grad flex items-center justify-center" style="animation: pulse-gold 3s ease infinite; animation-delay: 1s;">
                <i class="fas fa-bolt text-white text-sm"></i>
              </div>
              <div>
                <div class="text-charcoal font-extrabold text-base leading-none">당일 완성</div>
                <div class="text-gray-400 text-[10px] mt-0.5 tracking-wide">CEREC SYSTEM</div>
              </div>
            </div>
            <div class="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-200 bg-white/80 shadow-sm">
              <div class="w-10 h-10 rounded-xl gold-grad flex items-center justify-center" style="animation: pulse-gold 3s ease infinite; animation-delay: 2s;">
                <i class="fas fa-microchip text-white text-sm"></i>
              </div>
              <div>
                <div class="text-charcoal font-extrabold text-base leading-none">디지털 <span class="counter gold-grad-text text-lg" data-target="5" data-suffix="+">0</span></div>
                <div class="text-gray-400 text-[10px] mt-0.5 tracking-wide">최첨단 장비</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Premium visual (5 cols) -->
        <div class="lg:col-span-5 hidden lg:block" id="heroVisual">
          <div class="relative">
            <!-- Main hero visual -->
            <div class="relative w-full aspect-[3/4] rounded-[32px] overflow-hidden border border-gray-200 shadow-2xl shadow-black/[0.04]">
              <!-- Soft gradient background -->
              <div class="absolute inset-0 bg-gradient-to-br from-snow-100 via-white to-gold/[0.03]"></div>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                <div class="w-28 h-28 rounded-3xl gold-grad flex items-center justify-center mb-8 gold-glow relative">
                  <i class="fas fa-tooth text-white text-4xl"></i>
                  <div class="absolute -inset-4 rounded-3xl border border-gold/10 animate-pulse"></div>
                </div>
                <p class="text-charcoal text-xl font-bold mb-2">강남치과의원</p>
                <p class="text-gray-400 text-sm">촬영 사진 업데이트 예정</p>
                <div class="mt-6 flex items-center gap-2 text-gold/50 text-xs">
                  <span class="w-8 h-px bg-gold/20"></span>SINCE 2017<span class="w-8 h-px bg-gold/20"></span>
                </div>
              </div>
            </div>

            <!-- Floating card: Equipment -->
            <div class="absolute -left-12 top-16 p-4 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-black/[0.04]" style="animation: float 5s ease-in-out infinite;">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl gold-grad flex items-center justify-center gold-glow">
                  <i class="fas fa-microchip text-white text-sm"></i>
                </div>
                <div>
                  <div class="text-charcoal text-[13px] font-bold">디지털 장비 완비</div>
                  <div class="text-gray-400 text-[11px]">CT · CEREC · iTero · PrimeScan</div>
                </div>
              </div>
            </div>

            <!-- Floating card: Rating -->
            <div class="absolute -right-8 top-1/3 p-4 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-black/[0.04]" style="animation: float 5s ease-in-out infinite; animation-delay: -2.5s;">
              <div class="flex items-center gap-2 mb-2">
                ${Array(5).fill('<i class="fas fa-star text-gold text-xs"></i>').join('')}
              </div>
              <div class="text-charcoal text-[13px] font-bold">전문의 직접 진료</div>
              <div class="text-gray-400 text-[11px]">구강악안면외과 수련</div>
            </div>

            <!-- Floating card: 1 Day -->
            <div class="absolute -left-6 bottom-24 p-4 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-black/[0.04]" style="animation: float 5s ease-in-out infinite; animation-delay: -1.5s;">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <i class="fas fa-check text-emerald-500 text-sm"></i>
                </div>
                <div>
                  <div class="text-charcoal text-[13px] font-bold">1 DAY 보철</div>
                  <div class="text-emerald-500 text-[11px]">당일 치료 완성</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style="z-index:10;">
      <span class="text-[9px] tracking-[0.3em] text-gray-300 uppercase font-semibold">Scroll Down</span>
      <div class="w-[22px] h-[36px] rounded-full border border-gray-300 flex items-start justify-center p-1.5">
        <div class="w-[3px] h-[8px] rounded-full bg-gold animate-bounce"></div>
      </div>
    </div>

    <!-- Hero GSAP -->
    <script>
      // 3D Particle Background (light theme)
      (function() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas || !window.THREE) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particles — lighter, more subtle
        const count = 400;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i*3] = (Math.random() - 0.5) * 20;
          pos[i*3+1] = (Math.random() - 0.5) * 20;
          pos[i*3+2] = (Math.random() - 0.5) * 20;
          // Gold and silver tones
          const isGold = Math.random() > 0.4;
          if (isGold) {
            colors[i*3] = 0.78 + Math.random() * 0.1;
            colors[i*3+1] = 0.66 + Math.random() * 0.1;
            colors[i*3+2] = 0.38 + Math.random() * 0.15;
          } else {
            colors[i*3] = 0.75 + Math.random() * 0.15;
            colors[i*3+1] = 0.75 + Math.random() * 0.15;
            colors[i*3+2] = 0.78 + Math.random() * 0.15;
          }
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.4, sizeAttenuation: true });
        const particles = new THREE.Points(geo, mat);
        scene.add(particles);

        // Lines — very subtle
        const lineGeo = new THREE.BufferGeometry();
        const linePos = new Float32Array(150 * 6);
        for (let i = 0; i < 150; i++) {
          const idx = Math.floor(Math.random() * count);
          const idx2 = Math.floor(Math.random() * count);
          linePos[i*6] = pos[idx*3]; linePos[i*6+1] = pos[idx*3+1]; linePos[i*6+2] = pos[idx*3+2];
          linePos[i*6+3] = pos[idx2*3]; linePos[i*6+4] = pos[idx2*3+1]; linePos[i*6+5] = pos[idx2*3+2];
        }
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        const lineMat = new THREE.LineBasicMaterial({ color: 0xC9A962, transparent: true, opacity: 0.03 });
        scene.add(new THREE.LineSegments(lineGeo, lineMat));

        camera.position.z = 6;
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', e => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animate() {
          requestAnimationFrame(animate);
          particles.rotation.y += 0.0002;
          particles.rotation.x += 0.00008;
          camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
          camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
          camera.lookAt(scene.position);
          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
      })();

      // Hero GSAP timeline
      const heroTl = gsap.timeline({ delay: 0.5 });
      heroTl
        .from('#heroTag', { opacity: 0, y: 30, duration: 0.8, ease: 'power4.out' })
        .from('#heroLine1', { y: '110%', duration: 1, ease: 'power4.out' }, '-=0.4')
        .from('#heroLine2', { y: '110%', duration: 1, ease: 'power4.out' }, '-=0.7')
        .from('#heroLine3', { y: '110%', duration: 1, ease: 'power4.out' }, '-=0.7')
        .from('#heroSub', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('#heroCTA', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .from('#heroStats', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .from('#heroVisual', { opacity: 0, x: 80, scale: 0.95, duration: 1.2, ease: 'power4.out' }, '-=1');
    </script>
  </section>

  <!-- ========== TRANSITION MARQUEE (White) ========== -->
  <div class="relative bg-snow-50 py-6 overflow-hidden border-y border-gray-100">
    <div class="flex whitespace-nowrap marquee-track">
      ${Array(10).fill(`
        <span class="mx-10 text-sm tracking-[0.05em] text-gray-200 font-bold">임플란트</span>
        <span class="mx-3 text-gold/20">✦</span>
        <span class="mx-10 text-sm tracking-[0.05em] text-gray-200 font-bold">인비절라인</span>
        <span class="mx-3 text-gold/20">✦</span>
        <span class="mx-10 text-sm tracking-[0.05em] text-gray-200 font-bold">CEREC 당일보철</span>
        <span class="mx-3 text-gold/20">✦</span>
        <span class="mx-10 text-sm tracking-[0.05em] text-gray-200 font-bold">심미보철</span>
        <span class="mx-3 text-gold/20">✦</span>
        <span class="mx-10 text-sm tracking-[0.05em] text-gray-200 font-bold">사랑니발치</span>
        <span class="mx-3 text-gold/20">✦</span>
      `).join('')}
    </div>
  </div>

  <!-- ========== WHY GANGNAM — White Bento ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-100/[0.04] rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"></div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative">
      <div class="text-center mb-24 reveal">
        <div class="section-label section-label-gold mx-auto mb-8">
          <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>WHY GANGNAM DENTAL
        </div>
        <h2 class="display-xl text-charcoal mb-6">
          왜 <span class="gold-grad-text">강남치과</span>일까요?
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          영주에서 대학병원급 진료를 경험하세요.<br class="hidden md:block">
          구강외과 전문의 2인의 빠르고 정확한 치과 치료.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 stagger-children">
        
        <!-- Card 1: Big hero card — Specialists (spans 7) -->
        <div class="lg:col-span-7 card-premium p-10 md:p-14 flex flex-col justify-between min-h-[480px] stagger-item relative group">
          <div class="absolute top-0 right-0 w-64 h-64 bg-gold/[0.03] rounded-full blur-[100px] group-hover:bg-gold/[0.06] transition-all duration-1000"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-16 h-16 rounded-2xl gold-grad flex items-center justify-center gold-glow">
                <i class="fas fa-user-doctor text-white text-2xl"></i>
              </div>
              <div class="text-[11px] tracking-[0.15em] text-gray-300 font-bold uppercase">Specialist Surgeons</div>
            </div>
            <h3 class="text-3xl md:text-4xl font-extrabold text-charcoal mb-4 leading-tight">
              구강악안면외과<br><span class="gold-grad-text">전문의 2인 상주</span>
            </h3>
            <p class="text-gray-400 text-base leading-relaxed max-w-lg">
              수술이 전문인 구강악안면외과 전문의 2인이 상주합니다.<br>
              임플란트, 뼈이식, 상악동 수술, 매복 사랑니 등<br>
              난이도 높은 수술도 안심하고 맡기세요.
            </p>
          </div>
          <div class="relative z-10 mt-10 flex items-center gap-6 pt-8 border-t border-gray-100">
            <div class="flex -space-x-3">
              <div class="w-14 h-14 rounded-2xl bg-snow-100 flex items-center justify-center text-gold text-lg font-bold border-2 border-white shadow-lg">이</div>
              <div class="w-14 h-14 rounded-2xl bg-snow-200 flex items-center justify-center text-gold text-lg font-bold border-2 border-white shadow-lg">최</div>
            </div>
            <div>
              <div class="text-charcoal font-bold">이태형 · 최민혜 원장</div>
              <div class="text-gray-400 text-sm">구강악안면외과 전문의</div>
            </div>
            <a href="/doctors" class="ml-auto hidden md:inline-flex items-center gap-2 text-gold text-sm font-bold hover:gap-3 transition-all">
              의료진 보기 <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>

        <!-- Card 2: CEREC (spans 5) -->
        <div class="lg:col-span-5 card-premium p-10 md:p-12 flex flex-col justify-between min-h-[480px] stagger-item group">
          <div>
            <div class="flex items-center justify-between mb-8">
              <div class="w-16 h-16 rounded-2xl gold-grad flex items-center justify-center gold-glow">
                <i class="fas fa-bolt text-white text-2xl"></i>
              </div>
              <div class="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold tracking-wider uppercase border border-emerald-100">1 DAY</div>
            </div>
            <h3 class="text-2xl md:text-3xl font-extrabold text-charcoal mb-3 leading-tight">
              CEREC<br><span class="gold-grad-text">당일 보철 완성</span>
            </h3>
            <p class="text-gray-400 leading-relaxed">
              CEREC + SpeedFire 시스템으로<br>
              발수부터 세라믹 보철까지<br>
              <strong class="text-charcoal">하루 만에</strong> 끝냅니다.
            </p>
          </div>
          <div class="mt-8">
            <div class="flex items-center gap-6 py-5 border-t border-gray-100">
              <div class="text-center">
                <div class="text-3xl font-black text-charcoal">1<span class="text-gold text-lg">회</span></div>
                <div class="text-gray-400 text-xs mt-0.5">내원 횟수</div>
              </div>
              <div class="w-px h-10 bg-gray-100"></div>
              <div class="text-center">
                <div class="text-3xl font-black text-charcoal">2<span class="text-gold text-lg">시간</span></div>
                <div class="text-gray-400 text-xs mt-0.5">평균 치료</div>
              </div>
              <div class="w-px h-10 bg-gray-100"></div>
              <div class="text-center">
                <div class="text-3xl font-black text-charcoal">10<span class="text-gold text-lg">년+</span></div>
                <div class="text-gray-400 text-xs mt-0.5">보철 수명</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3: Digital Equipment (spans 4) -->
        <div class="lg:col-span-4 card-premium p-8 md:p-10 stagger-item group">
          <div class="w-14 h-14 rounded-2xl gold-grad flex items-center justify-center mb-6 gold-glow">
            <i class="fas fa-microchip text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-extrabold text-charcoal mb-3">최첨단 디지털 장비</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            정밀한 진단과 치료를 위해<br>최신 디지털 장비를 구비했습니다.
          </p>
          <div class="space-y-2.5">
            ${[
              { name:'3D CT', desc:'정밀 입체 진단' },
              { name:'CEREC', desc:'당일 보철 제작' },
              { name:'PrimeScan', desc:'디지털 구강 스캔' },
              { name:'iTero', desc:'교정 시뮬레이션' },
              { name:'SpeedFire', desc:'초고속 소성' }
            ].map(d => `
              <div class="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-snow-50 border border-gray-100 group-hover:bg-gold/[0.03] group-hover:border-gold/10 transition-all duration-500">
                <div class="w-2 h-2 rounded-full bg-gold flex-shrink-0"></div>
                <span class="text-charcoal text-sm font-bold">${d.name}</span>
                <span class="text-gray-400 text-xs ml-auto">${d.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Card 4: Fast Treatment (spans 4) -->
        <div class="lg:col-span-4 card-premium p-8 md:p-10 stagger-item bg-gradient-to-br from-white to-gold/[0.02]">
          <div class="w-14 h-14 rounded-2xl gold-grad flex items-center justify-center mb-6 gold-glow">
            <i class="fas fa-clock text-white text-xl"></i>
          </div>
          <h3 class="text-xl font-extrabold text-charcoal mb-3">빠른 치료 완료</h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            불필요한 재내원을 최소화합니다.<br>바쁜 일상 속에서도 효율적 치료.
          </p>
          <div class="relative py-6">
            <div class="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold via-gold/50 to-gold/10"></div>
            <div class="space-y-6 pl-12 relative">
              <div>
                <div class="absolute left-3.5 w-3 h-3 rounded-full bg-gold shadow-lg shadow-gold/30"></div>
                <div class="text-charcoal font-bold text-sm">정밀 진단</div>
                <div class="text-gray-400 text-xs">CT + 디지털 스캔</div>
              </div>
              <div>
                <div class="absolute left-3.5 w-3 h-3 rounded-full bg-gold/60"></div>
                <div class="text-charcoal font-bold text-sm">맞춤 치료 계획</div>
                <div class="text-gray-400 text-xs">전문의 상담</div>
              </div>
              <div>
                <div class="absolute left-3.5 w-3 h-3 rounded-full bg-gold/30"></div>
                <div class="text-charcoal font-bold text-sm">빠른 완성</div>
                <div class="text-gray-400 text-xs">최소 내원 · 당일 가능</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 5: New Tech (spans 4) -->
        <div class="lg:col-span-4 card-premium p-8 md:p-10 stagger-item relative overflow-hidden">
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/[0.03] rounded-full blur-[60px]"></div>
          <div class="relative z-10">
            <div class="w-14 h-14 rounded-2xl gold-grad flex items-center justify-center mb-6 gold-glow">
              <i class="fas fa-rocket text-white text-xl"></i>
            </div>
            <h3 class="text-xl font-extrabold text-charcoal mb-3">신기술 빠른 적용</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
              최신 치과 기술을 영주에서<br>가장 먼저 도입합니다.
            </p>
            <div class="flex flex-wrap gap-2">
              ${['디지털 임플란트', 'CEREC 5', '3D 프린팅', 'AI 진단', '레이저 치료'].map(t => `
                <span class="px-3.5 py-2 rounded-full bg-snow-100 text-charcoal text-[11px] font-bold border border-gray-100">${t}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== TREATMENTS — White Elevated ========== -->
  <section class="py-32 md:py-48 section-snow relative overflow-hidden" id="treatments">
    <div class="orb orb-gold w-[700px] h-[700px] -top-96 right-0 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-24 reveal">
        <div class="section-label section-label-gold mx-auto mb-8">
          <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>TREATMENTS
        </div>
        <h2 class="display-xl text-charcoal mb-6">강남치과의원<br><span class="gold-grad-text">주력 진료</span></h2>
        <p class="text-gray-400 text-lg max-w-xl mx-auto">각 분야 전문의가 직접 진료합니다</p>
      </div>

      <!-- Treatment cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
        ${[
          { slug:'implant', icon:'fa-tooth', label:'IMPLANT',
            title:'임플란트', sub:'구강외과 전문의 직접 수술',
            worry:'"수술이 무서워요…"', answer:'구강악안면외과 전문의가 직접 수술합니다. CT 정밀진단으로 안전하게.',
            tags:['CT 정밀진단','뼈이식 가능','상악동 수술','디지털 가이드'] },
          { slug:'cerec', icon:'fa-bolt', label:'CEREC · SAME DAY',
            title:'당일 보철', sub:'CEREC 원데이 시스템',
            worry:'"치과 여러 번 가기 귀찮아요…"', answer:'한 번 방문으로 세라믹 보철까지 완성합니다. 재내원 최소화.',
            tags:['당일 완성','디지털 스캔','세라믹 보철','SpeedFire'] },
          { slug:'invisalign', icon:'fa-teeth', label:'INVISALIGN',
            title:'인비절라인', sub:'투명교정 인증의',
            worry:'"교정기 보이기 싫어요…"', answer:'투명 장치로 눈에 띄지 않게 교정합니다. 식사 시 탈착 가능.',
            tags:['iTero 스캐너','3D 시뮬레이션','탈착 가능','심미적'] },
          { slug:'cosmetic', icon:'fa-gem', label:'COSMETIC',
            title:'심미보철', sub:'자연스러운 라미네이트 · 크라운',
            worry:'"자연스러운 이를 갖고 싶어요…"', answer:'CEREC으로 자연치아와 구분 안 되는 보철을 당일 제작합니다.',
            tags:['라미네이트','올세라믹','당일 제작','맞춤 색상'] }
        ].map(item => `
        <a href="/treatments/${item.slug}" class="card-white p-8 md:p-10 group block stagger-item">
          <div class="relative z-10">
            <!-- Top -->
            <div class="flex items-start justify-between mb-8">
              <div class="w-16 h-16 rounded-2xl gold-grad flex items-center justify-center gold-glow group-hover:scale-110 transition-transform duration-500">
                <i class="fas ${item.icon} text-white text-2xl"></i>
              </div>
              <span class="text-[10px] tracking-[0.2em] text-gray-300 font-bold">${item.label}</span>
            </div>

            <!-- Title -->
            <h3 class="text-2xl md:text-3xl font-extrabold text-charcoal mb-2 group-hover:text-gold transition-colors duration-500">${item.title}</h3>
            <p class="text-gray-400 text-sm mb-6 font-medium">${item.sub}</p>

            <!-- Worry/Answer card -->
            <div class="p-5 rounded-2xl bg-snow-50 border border-gray-100 mb-6 group-hover:border-gold/15 transition-colors duration-500">
              <p class="text-gold text-sm italic mb-2 font-medium">${item.worry}</p>
              <p class="text-gray-500 text-sm leading-relaxed">${item.answer}</p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-8">
              ${item.tags.map(t => `<span class="px-3.5 py-1.5 rounded-full border border-gray-100 text-gray-400 text-[11px] font-medium group-hover:border-gold/15 group-hover:text-gold transition-all duration-500">${t}</span>`).join('')}
            </div>

            <!-- Link -->
            <div class="flex items-center gap-2 text-gold text-sm font-bold group-hover:gap-4 transition-all duration-500">
              자세히 보기 <i class="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
            </div>
          </div>
        </a>
        `).join('')}
      </div>

      <!-- Wisdom tooth banner -->
      <div class="mt-6 reveal">
        <a href="/treatments/wisdom-tooth" class="card-white p-8 md:p-10 group block">
          <div class="flex flex-col md:flex-row md:items-center gap-6">
            <div class="w-16 h-16 rounded-2xl gold-grad flex items-center justify-center flex-shrink-0 gold-glow group-hover:scale-110 transition-transform duration-500">
              <i class="fas fa-hand-holding-medical text-white text-2xl"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-extrabold text-charcoal group-hover:text-gold transition-colors duration-500">사랑니 발치 — 매복 사랑니도 안전하게</h3>
              <p class="text-gray-400 text-sm mt-2">구강악안면외과 전문의가 직접 발치합니다. CT 정밀 진단 · 최소 절개 · 빠른 회복</p>
            </div>
            <div class="flex items-center gap-2 text-gold text-sm font-bold group-hover:gap-4 transition-all duration-500 flex-shrink-0">
              자세히 <i class="fas fa-arrow-right text-xs"></i>
            </div>
          </div>
        </a>
      </div>

      <!-- View all -->
      <div class="text-center mt-16 reveal">
        <a href="/treatments" class="btn-outline !py-5 !px-12 !text-[14px]">
          전체 진료 보기 <i class="fas fa-arrow-right text-xs ml-1"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- ========== DOCTORS — White Premium ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden">
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[200px]"></div>
    <div class="absolute top-20 left-20 w-20 h-20 border border-gold/10 rounded-full"></div>
    <div class="absolute bottom-40 right-40 w-32 h-32 border border-gold/5 rounded-full"></div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-24 reveal">
        <div class="section-label section-label-gold mx-auto mb-8">
          <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>DOCTORS
        </div>
        <h2 class="display-xl text-charcoal mb-6">
          강남치과의원<br><span class="gold-grad-text">의료진 소개</span>
        </h2>
        <p class="text-gray-400 text-lg">구강악안면외과 전문의 2인이 직접 진료합니다</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto stagger-children">
        ${[
          { slug:'lee-taehyung', name:'이태형', title:'대표원장', spec:'구강악안면외과 전문의',
            school:'고려대학교 구강악안면외과 석사', quote:'"지역사회에 대학병원 수준의 치과진료를 하기 위해"',
            fields:['임플란트','구강외과 수술','뼈이식','상악동 수술'], initial:'이' },
          { slug:'choi-minhye', name:'최민혜', title:'원장', spec:'구강악안면외과 전문의',
            school:'고려대학교 구강악안면외과 석사', quote:'',
            fields:['임플란트','틀니','레이저 치료','심미보철'], initial:'최' }
        ].map(doc => `
        <a href="/doctors/${doc.slug}" class="group stagger-item block">
          <div class="card-premium overflow-hidden">
            <!-- Photo area -->
            <div class="relative h-80 md:h-[400px] overflow-hidden bg-gradient-to-br from-snow-100 via-snow-50 to-gold/[0.03]">
              <div class="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent z-10"></div>
              <div class="absolute top-6 right-6 w-20 h-20 border border-gold/10 rounded-full z-20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"></div>
              <!-- Avatar -->
              <div class="absolute inset-0 flex items-center justify-center z-[5]">
                <div class="w-32 h-32 rounded-3xl bg-white shadow-xl border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                  <span class="gold-grad-text text-5xl font-black">${doc.initial}</span>
                </div>
              </div>
              <!-- Bottom overlay info -->
              <div class="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-4 py-1.5 rounded-full gold-grad text-white text-[11px] font-bold tracking-wide">${doc.title}</span>
                  <span class="px-4 py-1.5 rounded-full bg-white/80 text-gray-600 text-[11px] font-medium backdrop-blur-lg border border-gray-200">${doc.spec}</span>
                </div>
              </div>
            </div>
            <!-- Text -->
            <div class="p-8 md:p-10">
              <h3 class="text-2xl md:text-3xl font-extrabold text-charcoal group-hover:text-gold transition-colors duration-500 mb-2">${doc.name} <span class="text-gray-400 font-medium text-lg">${doc.title}</span></h3>
              <p class="text-gray-400 text-sm mb-5">${doc.school}</p>
              ${doc.quote ? `<p class="text-gold text-sm italic mb-5 font-medium">${doc.quote}</p>` : ''}
              <div class="flex flex-wrap gap-2 mb-6">
                ${doc.fields.map(f => `<span class="px-3.5 py-2 rounded-xl bg-gold/[0.04] text-gold/80 text-[11px] font-bold border border-gold/[0.08]">${f}</span>`).join('')}
              </div>
              <div class="flex items-center gap-2 text-gold text-sm font-bold group-hover:gap-4 transition-all duration-500">
                프로필 보기 <i class="fas fa-arrow-right text-xs"></i>
              </div>
            </div>
          </div>
        </a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ========== NUMBERS — White Impact ========== -->
  <section class="py-28 md:py-36 section-snow relative overflow-hidden">
    <div class="orb orb-gold w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-30"></div>
    <div class="gold-line-h absolute top-0 left-0 right-0"></div>
    <div class="gold-line-h absolute bottom-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 stagger-children">
        ${[
          { num:'2', suffix:'인', label:'구강외과 전문의', icon:'fa-user-doctor', desc:'대학병원 수련 전문의' },
          { num:'2017', suffix:'년~', label:'영주 개원', icon:'fa-calendar', desc:'8년 이상 지역진료' },
          { num:'1', suffix:'DAY', label:'당일 보철 완성', icon:'fa-bolt', desc:'CEREC 시스템' },
          { num:'5', suffix:'+', label:'디지털 장비', icon:'fa-microchip', desc:'최첨단 진료 환경' }
        ].map(item => `
        <div class="text-center p-8 md:p-10 rounded-3xl border border-gray-100 bg-white stagger-item hover:border-gold/20 hover:shadow-lg hover:shadow-gold/[0.03] transition-all duration-500 group">
          <div class="w-14 h-14 mx-auto rounded-2xl gold-grad flex items-center justify-center mb-6 gold-glow group-hover:scale-110 transition-transform duration-500">
            <i class="fas ${item.icon} text-white text-lg"></i>
          </div>
          <div class="text-5xl md:text-6xl font-black text-charcoal mb-2 counter" data-target="${item.num}" data-suffix="${item.suffix}">0</div>
          <div class="text-gray-500 font-bold text-sm mb-1">${item.label}</div>
          <div class="text-gray-300 text-xs">${item.desc}</div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ========== REVIEWS (Placeholder) ========== -->
  <section class="py-32 md:py-48 bg-white relative overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="text-center mb-20 reveal">
        <div class="section-label section-label-gold mx-auto mb-8">
          <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>REVIEWS
        </div>
        <h2 class="display-lg text-charcoal mb-4">환자 리뷰</h2>
        <p class="text-gray-400 text-lg">곧 환자분들의 소중한 후기를 만나보실 수 있습니다</p>
      </div>

      <div class="max-w-2xl mx-auto reveal">
        <div class="card-premium p-14 text-center">
          <div class="flex justify-center gap-1.5 mb-8">
            ${Array(5).fill('<i class="fas fa-star text-gold text-2xl"></i>').join('')}
          </div>
          <p class="text-2xl md:text-3xl font-extrabold text-charcoal mb-4">환자분들의 소중한 후기</p>
          <p class="text-gray-400 mb-10 leading-relaxed">네이버 · 구글 리뷰 수집 후 업데이트 예정입니다.</p>
          <a href="https://blog.naver.com/gndentalclinic" target="_blank" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#03C75A] text-white font-bold text-sm hover:bg-[#02b351] transition-colors shadow-lg shadow-[#03C75A]/20">
            <i class="fas fa-blog"></i>네이버 블로그 방문
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== FAQ — White Premium Layout ========== -->
  <section class="py-32 md:py-48 section-snow relative overflow-hidden">
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/3"></div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <!-- Left sticky -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 lg:self-start reveal">
          <div class="section-label section-label-gold mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>FAQ
          </div>
          <h2 class="display-lg text-charcoal mb-6">자주 묻는<br><span class="gold-grad-text">질문</span></h2>
          <p class="text-gray-400 leading-relaxed mb-10">
            궁금한 점이 더 있으시면<br>편하게 문의해 주세요.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a href="/reservation" class="btn-primary !text-sm !py-4 !px-8">
              <i class="fas fa-calendar-check text-xs"></i>상담 예약
            </a>
            <a href="tel:054-636-8222" class="btn-subtle !text-sm !py-4 !px-8">
              <i class="fas fa-phone text-xs text-gold"></i>전화 문의
            </a>
          </div>
        </div>

        <!-- Right -->
        <div class="lg:col-span-8 space-y-4 stagger-children">
          ${[
            { q:'임플란트 비용은 얼마인가요?', a:'임플란트 비용은 잔존 뼈 상태, 뼈이식 여부, 보철 종류에 따라 달라집니다. 정확한 비용은 CT 촬영 후 상담 시 안내드립니다. 부담 없이 문의해 주세요.' },
            { q:'CEREC 당일 보철이란 무엇인가요?', a:'CEREC은 디지털 스캐너로 치아를 촬영하고, 컴퓨터로 보철을 설계한 뒤, 밀링 머신이 세라믹 블록을 깎아 보철을 만드는 시스템입니다. 발수부터 보철 장착까지 하루 만에 가능합니다.' },
            { q:'인비절라인은 얼마나 걸리나요?', a:'보통 6개월~2년으로, 치아 상태에 따라 다릅니다. 간단한 경우 6개월 이내에 완료되기도 합니다. 정밀 검사 후 예상 기간을 안내드립니다.' },
            { q:'사랑니를 꼭 빼야 하나요?', a:'모든 사랑니를 발치해야 하는 것은 아닙니다. 매복 사랑니이거나 주변 치아에 영향을 주는 경우 발치를 권합니다. 구강악안면외과 전문의가 정확히 진단합니다.' },
            { q:'토요일에도 진료하나요?', a:'현재 평일(월~금) 09:00~17:30 진료하며, 점심시간은 13:00~14:00입니다. 토·일·공휴일은 휴무입니다.' },
            { q:'주차가 가능한가요?', a:'네, 건물 전용 주차장을 이용하실 수 있습니다. 넉넉한 주차 공간이 마련되어 있어 편하게 방문해 주세요.' }
          ].map(item => `
          <details class="group card-premium stagger-item">
            <summary class="flex items-center justify-between p-7 md:p-8 cursor-pointer select-none">
              <div class="flex items-center gap-4">
                <div class="w-11 h-11 rounded-xl bg-gold/[0.06] flex items-center justify-center flex-shrink-0 border border-gold/[0.08] group-hover:bg-gold/10 transition-colors">
                  <span class="text-gold font-extrabold text-sm">Q</span>
                </div>
                <h3 class="font-bold text-charcoal text-left text-[15px]">${item.q}</h3>
              </div>
              <div class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 ml-4 faq-icon transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gold/5">
                <i class="fas fa-plus text-gray-400 text-xs group-hover:text-gold transition-colors"></i>
              </div>
            </summary>
            <div class="px-7 md:px-8 pb-7 md:pb-8">
              <div class="pl-[60px] text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-6">${item.a}</div>
            </div>
          </details>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- ========== FINAL CTA — White Elegant ========== -->
  <section class="py-36 md:py-48 bg-white relative overflow-hidden">
    <div class="orb orb-gold w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="gold-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <!-- Decorative rings -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gold/[0.06] rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/[0.03] rounded-full"></div>

      <div class="relative z-10">
        <div class="w-24 h-24 mx-auto rounded-3xl gold-grad flex items-center justify-center mb-10 gold-glow">
          <i class="fas fa-tooth text-white text-4xl"></i>
        </div>
        <h2 class="display-xl text-charcoal mb-8">
          지금 바로<br><span class="gold-grad-text">상담 예약하세요</span>
        </h2>
        <p class="text-gray-400 text-lg mb-12 leading-relaxed">
          구강외과 전문의가 직접 상담드립니다.<br>
          부담 없이 연락해 주세요.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-14 !text-base !font-extrabold">
            <i class="fas fa-calendar-check"></i>온라인 상담 예약
          </a>
          <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center">
            <i class="fas fa-phone text-sm text-gold"></i>054-636-8222
          </a>
        </div>
        <div class="flex items-center justify-center gap-8 text-sm text-gray-400">
          <span><i class="fas fa-clock text-gold/50 mr-2"></i>평일 09:00–17:30</span>
          <span class="w-1 h-1 rounded-full bg-gray-300"></span>
          <span><i class="fas fa-map-marker-alt text-gold/50 mr-2"></i>영주시 대학로 217</span>
        </div>
      </div>
    </div>
  </section>
  `
}