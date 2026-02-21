export function reservationPage(): string {
  return `
  <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-4 text-center">
      <span class="inline-block px-4 py-1.5 bg-white/10 text-gold text-sm font-semibold rounded-full mb-4">RESERVATION</span>
      <h1 class="text-3xl md:text-5xl font-bold mb-4">강남치과의원 <span class="gold-text-gradient">상담 예약하기</span></h1>
      <p class="text-gray-300 max-w-xl mx-auto">편하신 방법으로 상담을 예약해 주세요.</p>
    </div>
  </section>

  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-5xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- 예약 방법 -->
        <div>
          <h2 class="text-2xl font-bold text-charcoal mb-8">예약 방법</h2>
          <div class="space-y-6">
            <!-- 전화 예약 -->
            <a href="tel:054-636-8222" class="card-hover block p-6 bg-bglight rounded-2xl border border-gray-100 group">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-phone text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-charcoal text-lg group-hover:text-gold transition">전화 예약</h3>
                  <p class="text-gold text-xl font-bold mt-1">054-636-8222</p>
                  <p class="text-subtext text-sm mt-1">평일 09:00~17:30 (점심 13:00~14:00)</p>
                </div>
              </div>
            </a>

            <!-- 네이버 예약 (준비 중) -->
            <div class="p-6 bg-bglight rounded-2xl border border-gray-100 opacity-60">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-calendar-check text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-charcoal text-lg">네이버 예약</h3>
                  <p class="text-subtext text-sm mt-1">준비 중입니다. 전화로 예약해 주세요.</p>
                </div>
              </div>
            </div>

            <!-- 카카오톡 (준비 중) -->
            <div class="p-6 bg-bglight rounded-2xl border border-gray-100 opacity-60">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-comment text-charcoal text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-charcoal text-lg">카카오톡 상담</h3>
                  <p class="text-subtext text-sm mt-1">채널 개설 준비 중입니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 온라인 상담 문의 폼 -->
        <div>
          <h2 class="text-2xl font-bold text-charcoal mb-8">온라인 상담 문의</h2>
          <div class="bg-bglight rounded-2xl p-8 border border-gray-100">
            <form onsubmit="handleSubmit(event)">
              <div class="space-y-5">
                <div>
                  <label class="block text-sm font-semibold text-charcoal mb-2">성함 <span class="text-red-400">*</span></label>
                  <input type="text" required placeholder="성함을 입력해 주세요"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-charcoal mb-2">연락처 <span class="text-red-400">*</span></label>
                  <input type="tel" required placeholder="010-0000-0000"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-charcoal mb-2">상담 희망 진료</label>
                  <select class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition">
                    <option value="">선택해 주세요</option>
                    <option>임플란트</option>
                    <option>인비절라인</option>
                    <option>당일 보철 (CEREC)</option>
                    <option>심미보철</option>
                    <option>사랑니 발치</option>
                    <option>충치치료</option>
                    <option>신경치료</option>
                    <option>잇몸치료</option>
                    <option>틀니</option>
                    <option>미백</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-charcoal mb-2">문의 내용</label>
                  <textarea rows="4" placeholder="궁금하신 점을 자유롭게 적어주세요."
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition resize-none"></textarea>
                </div>
                <div class="flex items-start gap-2">
                  <input type="checkbox" required id="privacy" class="mt-1 accent-gold">
                  <label for="privacy" class="text-xs text-subtext">개인정보 수집 및 이용에 동의합니다. (상담 목적으로만 사용되며, 상담 완료 후 파기됩니다.)</label>
                </div>
                <button type="submit" class="w-full py-4 btn-gold rounded-xl text-base font-semibold">
                  <i class="fas fa-paper-plane mr-2"></i>상담 문의하기
                </button>
              </div>
            </form>
            <p class="text-xs text-subtext mt-4 text-center">* 문의 접수 후 영업일 기준 1일 이내 연락드립니다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 진료시간 안내 -->
  <section class="py-16 bg-bglight">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-charcoal mb-8 text-center fade-in">진료 시간</h2>
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden fade-in">
        <table class="w-full text-center">
          <thead>
            <tr class="bg-charcoal text-white">
              <th class="py-4 px-6 font-semibold">요일</th>
              <th class="py-4 px-6 font-semibold">진료시간</th>
              <th class="py-4 px-6 font-semibold">점심시간</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="py-4 px-6 font-medium">월 ~ 금</td>
              <td class="py-4 px-6 text-gold font-semibold">09:00 ~ 17:30</td>
              <td class="py-4 px-6 text-subtext">13:00 ~ 14:00</td>
            </tr>
            <tr class="border-b border-gray-100 bg-gray-50">
              <td class="py-4 px-6 font-medium text-red-400">토요일</td>
              <td class="py-4 px-6 text-red-400">휴무</td>
              <td class="py-4 px-6 text-subtext">-</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="py-4 px-6 font-medium text-red-400">일·공휴일</td>
              <td class="py-4 px-6 text-red-400">휴무</td>
              <td class="py-4 px-6 text-subtext">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <script>
    function handleSubmit(e) {
      e.preventDefault();
      alert('상담 문의가 접수되었습니다.\\n영업일 기준 1일 이내 연락드리겠습니다.\\n감사합니다.');
      e.target.reset();
    }
  </script>
  `
}
