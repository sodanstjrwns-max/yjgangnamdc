// ===== 회원가입 페이지 =====

export function registerPage(): string {
  return `
  <!-- Hero -->
  <section class="relative min-h-[40vh] flex items-end subpage-hero overflow-hidden" aria-label="회원가입">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-16 pt-44 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>SIGN UP</div>
      <h1 class="display-xl text-charcoal mb-4" data-speakable="true">회원<span class="royal-grad-text">가입</span></h1>
      <p class="text-gray-400 text-lg" data-speakable="true">치료 전후 사례를 확인하시려면 회원가입이 필요합니다</p>
    </div>
  </section>

  <!-- Register Form -->
  <section class="py-16 md:py-24 bg-white" aria-label="회원가입 폼">
    <div class="max-w-lg mx-auto px-5 md:px-8">
      <div class="card-premium p-8 md:p-10">
        <div class="text-center mb-10">
          <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-4 royal-glow">
            <i class="fas fa-user-plus text-white text-xl"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-charcoal mb-2">회원가입</h2>
          <p class="text-gray-400 text-sm">아래 정보를 입력해 주세요</p>
        </div>

        <form id="registerForm" class="space-y-5">
          <!-- 이름 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="reg-name">
              이름 <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="text" id="reg-name" name="name" required placeholder="홍길동"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm">
            </div>
          </div>

          <!-- 이메일 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="reg-email">
              이메일 <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="email" id="reg-email" name="email" required placeholder="example@email.com"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm">
            </div>
          </div>

          <!-- 전화번호 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="reg-phone">
              전화번호 <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <i class="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="tel" id="reg-phone" name="phone" required placeholder="010-1234-5678"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm"
                pattern="[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}">
            </div>
            <p class="text-gray-300 text-[11px] mt-1.5 ml-1">'-' 없이 숫자만 입력하셔도 됩니다</p>
          </div>

          <!-- 비밀번호 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="reg-password">
              비밀번호 <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="password" id="reg-password" name="password" required placeholder="6자 이상" minlength="6"
                class="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm">
              <button type="button" onclick="togglePw('reg-password', this)" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>

          <!-- 비밀번호 확인 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="reg-password2">
              비밀번호 확인 <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="password" id="reg-password2" name="password2" required placeholder="비밀번호를 다시 입력해 주세요" minlength="6"
                class="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm">
              <button type="button" onclick="togglePw('reg-password2', this)" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>

          <!-- 개인정보 동의 -->
          <div class="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <input type="checkbox" id="reg-agree" name="agree" required class="mt-0.5 w-4 h-4 rounded border-gray-300 text-royal focus:ring-royal/30">
            <label for="reg-agree" class="text-xs text-gray-500 leading-relaxed cursor-pointer">
              <span class="font-bold text-charcoal">[필수]</span> 치료 전후 사례 열람을 위한 <span class="text-royal font-bold">개인정보 수집 및 이용</span>에 동의합니다.<br>
              <span class="text-gray-400">수집항목: 이름, 이메일, 전화번호 | 목적: 회원 식별 및 서비스 제공 | 보유기간: 회원 탈퇴 시까지</span>
            </label>
          </div>

          <!-- 에러 메시지 -->
          <div id="registerError" class="hidden p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm font-medium"></div>

          <!-- 가입 버튼 -->
          <button type="submit" id="registerBtn" class="btn-primary w-full !py-4 !text-base">
            <i class="fas fa-user-plus"></i>회원가입
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-gray-400 text-sm">이미 회원이신가요? <a href="/login" class="text-royal font-bold hover:underline">로그인</a></p>
        </div>
      </div>
    </div>
  </section>

  <script>
  function togglePw(id, btn) {
    const inp = document.getElementById(id);
    const icon = btn.querySelector('i');
    if (inp.type === 'password') { inp.type = 'text'; icon.className = 'fas fa-eye-slash text-sm'; }
    else { inp.type = 'password'; icon.className = 'fas fa-eye text-sm'; }
  }

  document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('registerBtn');
    const errEl = document.getElementById('registerError');
    errEl.classList.add('hidden');

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim().replace(/-/g, '');
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

    if (!name || !email || !phone || !password) {
      errEl.textContent = '모든 필수 항목을 입력해 주세요.';
      errEl.classList.remove('hidden'); return;
    }
    if (password !== password2) {
      errEl.textContent = '비밀번호가 일치하지 않습니다.';
      errEl.classList.remove('hidden'); return;
    }
    if (password.length < 6) {
      errEl.textContent = '비밀번호는 6자 이상이어야 합니다.';
      errEl.classList.remove('hidden'); return;
    }
    if (!/^[0-9]{10,11}$/.test(phone)) {
      errEl.textContent = '올바른 전화번호를 입력해 주세요.';
      errEl.classList.remove('hidden'); return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>가입 중...';

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = '/before-after';
      } else {
        errEl.textContent = data.error || '회원가입에 실패했습니다.';
        errEl.classList.remove('hidden');
      }
    } catch (err) {
      errEl.textContent = '서버 오류가 발생했습니다. 다시 시도해 주세요.';
      errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-user-plus"></i>회원가입';
    }
  });
  </script>
  `;
}

// ===== 로그인 페이지 =====
export function loginPage(redirect?: string): string {
  const redirectParam = redirect ? `?redirect=${encodeURIComponent(redirect)}` : '';
  return `
  <!-- Hero -->
  <section class="relative min-h-[40vh] flex items-end subpage-hero overflow-hidden" aria-label="로그인">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-16 pt-44 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>LOGIN</div>
      <h1 class="display-xl text-charcoal mb-4" data-speakable="true"><span class="royal-grad-text">로그인</span></h1>
      <p class="text-gray-400 text-lg" data-speakable="true">치료 전후 사례를 확인하시려면 로그인해 주세요</p>
    </div>
  </section>

  <!-- Login Form -->
  <section class="py-16 md:py-24 bg-white" aria-label="로그인 폼">
    <div class="max-w-lg mx-auto px-5 md:px-8">
      <div class="card-premium p-8 md:p-10">
        <div class="text-center mb-10">
          <div class="w-16 h-16 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-4 royal-glow">
            <i class="fas fa-sign-in-alt text-white text-xl"></i>
          </div>
          <h2 class="text-2xl font-extrabold text-charcoal mb-2">로그인</h2>
          <p class="text-gray-400 text-sm">회원 정보를 입력해 주세요</p>
        </div>

        <form id="loginForm" class="space-y-5">
          <!-- 이메일 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="login-email">이메일</label>
            <div class="relative">
              <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="email" id="login-email" name="email" required placeholder="example@email.com"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm">
            </div>
          </div>

          <!-- 비밀번호 -->
          <div>
            <label class="block text-sm font-bold text-charcoal mb-2" for="login-password">비밀번호</label>
            <div class="relative">
              <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input type="password" id="login-password" name="password" required placeholder="비밀번호"
                class="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 text-charcoal placeholder:text-gray-300 focus:border-royal focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm">
              <button type="button" onclick="togglePw('login-password', this)" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>

          <!-- 에러 메시지 -->
          <div id="loginError" class="hidden p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-sm font-medium"></div>

          <!-- 로그인 버튼 -->
          <button type="submit" id="loginBtn" class="btn-primary w-full !py-4 !text-base">
            <i class="fas fa-sign-in-alt"></i>로그인
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-gray-400 text-sm">아직 회원이 아니신가요? <a href="/register" class="text-royal font-bold hover:underline">회원가입</a></p>
        </div>
      </div>
    </div>
  </section>

  <script>
  function togglePw(id, btn) {
    const inp = document.getElementById(id);
    const icon = btn.querySelector('i');
    if (inp.type === 'password') { inp.type = 'text'; icon.className = 'fas fa-eye-slash text-sm'; }
    else { inp.type = 'password'; icon.className = 'fas fa-eye text-sm'; }
  }

  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const errEl = document.getElementById('loginError');
    errEl.classList.add('hidden');

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      errEl.textContent = '이메일과 비밀번호를 입력해 주세요.';
      errEl.classList.remove('hidden'); return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>로그인 중...';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        const params = new URLSearchParams(window.location.search);
        window.location.href = params.get('redirect') || '/before-after';
      } else {
        errEl.textContent = data.error || '로그인에 실패했습니다.';
        errEl.classList.remove('hidden');
      }
    } catch (err) {
      errEl.textContent = '서버 오류가 발생했습니다. 다시 시도해 주세요.';
      errEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i>로그인';
    }
  });
  </script>
  `;
}

// ===== 로그인 필요 안내 페이지 =====
export function loginRequiredPage(): string {
  return `
  <section class="relative min-h-[80vh] flex items-center justify-center subpage-hero overflow-hidden" aria-label="로그인 필요">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-lg mx-auto px-6 text-center">
      <div class="card-premium p-10 md:p-14">
        <div class="w-20 h-20 mx-auto rounded-3xl royal-grad flex items-center justify-center mb-8 royal-glow">
          <i class="fas fa-lock text-white text-2xl"></i>
        </div>
        <h1 class="display-md text-charcoal mb-4">로그인이 필요합니다</h1>
        <p class="text-gray-400 text-base mb-3">치료 전후 사례는 <span class="text-royal font-bold">회원 전용</span> 콘텐츠입니다.</p>
        <p class="text-gray-400 text-sm mb-10">실제 환자분의 사생활 보호를 위해<br>로그인 후 열람 가능합니다.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/login?redirect=/before-after" class="btn-primary !py-4 !px-10"><i class="fas fa-sign-in-alt"></i>로그인</a>
          <a href="/register" class="btn-outline !py-4 !px-10"><i class="fas fa-user-plus text-sm"></i>회원가입</a>
        </div>
      </div>
    </div>
  </section>
  `;
}
