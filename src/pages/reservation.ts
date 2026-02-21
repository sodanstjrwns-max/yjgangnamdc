export function reservationPage(): string {
  return `
  <!-- Hero (White) -->
  <section class="relative min-h-[60vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-gold w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-48 w-full">
      <div class="section-label section-label-gold mb-8"><span class="w-1.5 h-1.5 rounded-full bg-gold"></span>RESERVATION</div>
      <h1 class="display-xl text-charcoal mb-6">상담 <span class="gold-grad-text">예약하기</span></h1>
      <p class="text-gray-400 text-lg">편하신 방법으로 상담을 예약해 주세요.</p>
    </div>
  </section>

  <!-- Content -->
  <section class="py-20 md:py-32 bg-white">
    <div class="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Left: Methods -->
        <div class="space-y-6 reveal">
          <h2 class="display-md text-charcoal mb-2">예약 방법</h2>
          <div class="divider-gold mb-10"></div>

          <a href="tel:054-636-8222" class="card-premium p-7 flex items-center gap-6 group block relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gold/[0.03] rounded-full blur-[60px] group-hover:bg-gold/[0.06] transition-all duration-700"></div>
            <div class="w-16 h-16 rounded-2xl gold-grad flex items-center justify-center gold-glow flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
              <i class="fas fa-phone text-white text-xl"></i>
            </div>
            <div class="relative z-10">
              <h3 class="font-extrabold text-charcoal text-lg group-hover:text-gold transition-colors duration-300">전화 예약</h3>
              <p class="gold-grad-text text-2xl font-black mt-1">054-636-8222</p>
              <p class="text-gray-400 text-sm mt-1">평일 09:00–17:30 (점심 13:00–14:00)</p>
            </div>
          </a>

          <div class="card-premium p-7 flex items-center gap-6 opacity-60">
            <div class="w-16 h-16 rounded-2xl bg-[#03C75A] flex items-center justify-center flex-shrink-0">
              <i class="fas fa-calendar-check text-white text-xl"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-charcoal text-lg">네이버 예약</h3>
              <p class="text-gray-400 text-sm mt-1">준비 중입니다</p>
            </div>
            <span class="ml-auto px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-[10px] font-bold">COMING SOON</span>
          </div>

          <div class="card-premium p-7 flex items-center gap-6 opacity-60">
            <div class="w-16 h-16 rounded-2xl bg-[#FEE500] flex items-center justify-center flex-shrink-0">
              <i class="fas fa-comment text-charcoal text-xl"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-charcoal text-lg">카카오톡 상담</h3>
              <p class="text-gray-400 text-sm mt-1">채널 개설 준비 중입니다</p>
            </div>
            <span class="ml-auto px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-[10px] font-bold">COMING SOON</span>
          </div>

          <div class="card-premium p-7 mt-4">
            <h3 class="font-extrabold text-charcoal mb-5 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg gold-grad flex items-center justify-center"><i class="fas fa-clock text-white text-xs"></i></div>
              진료 시간
            </h3>
            <div class="space-y-3.5 text-sm">
              <div class="flex justify-between items-center pb-3.5 border-b border-gray-50">
                <span class="text-gray-500 font-medium">월–금</span>
                <span class="font-extrabold text-charcoal text-base">09:00 – 17:30</span>
              </div>
              <div class="flex justify-between items-center pb-3.5 border-b border-gray-50">
                <span class="text-gray-500 font-medium">점심시간</span>
                <span class="font-bold text-gray-400">13:00 – 14:00</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-red-400 font-medium">토·일·공휴일</span>
                <span class="font-bold text-red-400">휴무</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="reveal-right">
          <h2 class="display-md text-charcoal mb-2">온라인 상담 문의</h2>
          <div class="divider-gold mb-10"></div>
          <div class="card-premium p-8 md:p-10">
            <form onsubmit="handleSubmit(event)">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-charcoal mb-2.5">성함 <span class="text-red-400">*</span></label>
                  <input type="text" required placeholder="성함을 입력해 주세요" class="w-full px-5 py-4 bg-snow-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 transition-all">
                </div>
                <div>
                  <label class="block text-sm font-bold text-charcoal mb-2.5">연락처 <span class="text-red-400">*</span></label>
                  <input type="tel" required placeholder="010-0000-0000" class="w-full px-5 py-4 bg-snow-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 transition-all">
                </div>
                <div>
                  <label class="block text-sm font-bold text-charcoal mb-2.5">상담 희망 진료</label>
                  <select class="w-full px-5 py-4 bg-snow-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 transition-all text-gray-500">
                    <option value="">선택해 주세요</option>
                    <option>임플란트</option><option>인비절라인</option><option>당일 보철 (CEREC)</option>
                    <option>심미보철</option><option>사랑니 발치</option><option>충치치료</option>
                    <option>신경치료</option><option>잇몸치료</option><option>틀니</option><option>미백</option><option>기타</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-bold text-charcoal mb-2.5">문의 내용</label>
                  <textarea rows="5" placeholder="궁금하신 점을 자유롭게 적어주세요." class="w-full px-5 py-4 bg-snow-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 transition-all resize-none"></textarea>
                </div>
                <div class="flex items-start gap-3">
                  <input type="checkbox" required id="privacy" class="mt-1 accent-[#C9A962] w-4 h-4">
                  <label for="privacy" class="text-xs text-gray-400 leading-relaxed">개인정보 수집 및 이용에 동의합니다. (상담 목적으로만 사용되며, 상담 완료 후 파기됩니다.)</label>
                </div>
                <button type="submit" class="w-full btn-primary justify-center !py-5 !text-base !font-extrabold">
                  <i class="fas fa-paper-plane text-sm"></i>상담 문의하기
                </button>
              </div>
            </form>
            <p class="text-xs text-gray-400 mt-5 text-center">* 문의 접수 후 영업일 기준 1일 이내 연락드립니다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    function handleSubmit(e) { e.preventDefault(); alert('상담 문의가 접수되었습니다.\\n영업일 기준 1일 이내 연락드리겠습니다.\\n감사합니다.'); e.target.reset(); }
  </script>
  `
}