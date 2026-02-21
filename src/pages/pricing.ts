export function pricingPage(): string {
  return `
  <section class="bg-charcoal text-white py-16 md:py-24 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
    <div class="relative max-w-7xl mx-auto px-4 text-center">
      <span class="inline-block px-4 py-1.5 bg-white/10 text-gold text-sm font-semibold rounded-full mb-4">PRICING</span>
      <h1 class="text-3xl md:text-5xl font-bold mb-4">강남치과의원 <span class="gold-text-gradient">진료비용 안내</span></h1>
      <p class="text-gray-300 max-w-xl mx-auto">투명한 비용, 합리적인 진료를 약속합니다.</p>
    </div>
  </section>

  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-5xl mx-auto px-4">
      
      <!-- 안내 문구 -->
      <div class="bg-gold-50 rounded-2xl p-6 border border-gold/20 mb-12 fade-in">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
            <i class="fas fa-info text-white"></i>
          </div>
          <div>
            <h3 class="font-bold text-charcoal mb-2">비용 안내 사항</h3>
            <ul class="text-sm text-gray-600 space-y-1.5">
              <li>• 아래 비용은 참고용이며, 환자분의 구강 상태에 따라 달라질 수 있습니다.</li>
              <li>• 정확한 비용은 진단 후 상담 시 안내드립니다.</li>
              <li>• 건강보험 적용 항목은 보험 적용 기준에 따라 본인부담금이 달라집니다.</li>
              <li>• 비급여 항목은 부가세가 별도입니다.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 비용표 -->
      <div class="space-y-10">
        
        <!-- 임플란트 -->
        <div class="fade-in">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <i class="fas fa-tooth text-white"></i>
            </div>
            <h2 class="text-xl font-bold text-charcoal">임플란트</h2>
          </div>
          <div class="bg-bglight rounded-2xl border border-gray-100 overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-white">
                  <th class="py-3 px-6 text-left text-sm font-semibold text-charcoal">항목</th>
                  <th class="py-3 px-6 text-right text-sm font-semibold text-charcoal">비용 (VAT 별도)</th>
                </tr>
              </thead>
              <tbody class="text-sm text-gray-600">
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">임플란트 (1개)</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">뼈이식 (단순)</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">상악동 거상술</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr><td class="py-3.5 px-6">임플란트 틀니</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 교정 -->
        <div class="fade-in">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <i class="fas fa-teeth text-white"></i>
            </div>
            <h2 class="text-xl font-bold text-charcoal">교정</h2>
          </div>
          <div class="bg-bglight rounded-2xl border border-gray-100 overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-white">
                  <th class="py-3 px-6 text-left text-sm font-semibold text-charcoal">항목</th>
                  <th class="py-3 px-6 text-right text-sm font-semibold text-charcoal">비용 (VAT 별도)</th>
                </tr>
              </thead>
              <tbody class="text-sm text-gray-600">
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">인비절라인 (풀)</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">인비절라인 (부분)</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr><td class="py-3.5 px-6">교정 검사비</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 보철 -->
        <div class="fade-in">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <i class="fas fa-gem text-white"></i>
            </div>
            <h2 class="text-xl font-bold text-charcoal">보철 / 심미</h2>
          </div>
          <div class="bg-bglight rounded-2xl border border-gray-100 overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-white">
                  <th class="py-3 px-6 text-left text-sm font-semibold text-charcoal">항목</th>
                  <th class="py-3 px-6 text-right text-sm font-semibold text-charcoal">비용 (VAT 별도)</th>
                </tr>
              </thead>
              <tbody class="text-sm text-gray-600">
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">CEREC 크라운 (당일)</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">올세라믹 크라운</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">지르코니아 크라운</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">라미네이트 (1개)</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">인레이 / 온레이</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
                <tr><td class="py-3.5 px-6">레진 충전</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 일반/외과 -->
        <div class="fade-in">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <i class="fas fa-hand-holding-medical text-white"></i>
            </div>
            <h2 class="text-xl font-bold text-charcoal">일반 / 외과</h2>
          </div>
          <div class="bg-bglight rounded-2xl border border-gray-100 overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-white">
                  <th class="py-3 px-6 text-left text-sm font-semibold text-charcoal">항목</th>
                  <th class="py-3 px-6 text-right text-sm font-semibold text-charcoal">비용</th>
                </tr>
              </thead>
              <tbody class="text-sm text-gray-600">
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">스케일링</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">사랑니 발치 (단순)</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">사랑니 발치 (매복)</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">신경치료</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">충치치료 (보험 재료)</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr><td class="py-3.5 px-6">미백</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 틀니 -->
        <div class="fade-in">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <i class="fas fa-teeth text-white"></i>
            </div>
            <h2 class="text-xl font-bold text-charcoal">틀니</h2>
          </div>
          <div class="bg-bglight rounded-2xl border border-gray-100 overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-white">
                  <th class="py-3 px-6 text-left text-sm font-semibold text-charcoal">항목</th>
                  <th class="py-3 px-6 text-right text-sm font-semibold text-charcoal">비용</th>
                </tr>
              </thead>
              <tbody class="text-sm text-gray-600">
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">전체 틀니 (65세 이상)</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr class="border-b border-gray-100"><td class="py-3.5 px-6">부분 틀니 (65세 이상)</td><td class="py-3.5 px-6 text-right font-semibold text-green-600">건강보험 적용</td></tr>
                <tr><td class="py-3.5 px-6">비보험 틀니</td><td class="py-3.5 px-6 text-right font-semibold text-charcoal">상담 후 안내</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-16 bg-charcoal text-white">
    <div class="max-w-3xl mx-auto px-4 text-center fade-in">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">정확한 비용이 궁금하시다면?</h2>
      <p class="text-gray-300 mb-8">구강 상태를 직접 확인한 후 정확한 비용을 안내드립니다.<br>부담 없이 상담받으세요.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 btn-gold rounded-full text-base font-semibold">
          <i class="fas fa-calendar-check"></i>상담 예약하기
        </a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 rounded-full text-base font-semibold hover:bg-white/10 transition">
          <i class="fas fa-phone"></i>054-636-8222
        </a>
      </div>
    </div>
  </section>
  `
}
