// ===== 전체 FAQ 페이지 (SEO + AEO 대폭 강화) =====
// 진료과목별 FAQ를 하나의 통합 페이지에서 보여주며,
// 각 FAQ가 구조화된 데이터(FAQPage Schema)로 출력됩니다.

export interface FAQItem {
  q: string
  a: string
  category: string
  categorySlug: string
}

// ========== 진료과목별 대폭 확장 FAQ (10-15개씩) ==========
export const allFAQs: FAQItem[] = [
  // ===== 임플란트 (15개) =====
  { category: '임플란트', categorySlug: 'implant', q: '임플란트 수술은 아프나요?', a: '국소마취 하에 진행되므로 수술 중 통증은 거의 없습니다. 수술 후 2~3일간 가벼운 부기와 통증이 있을 수 있으나, 처방약(진통제, 항생제)으로 충분히 관리됩니다. 수술 경험이 풍부한 구강외과 전문의가 시행하므로 수술 시간도 짧고 조직 손상이 적어 회복이 빠릅니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트 수명은 얼마나 되나요?', a: '정기 관리 시 10년 이상 반영구적으로 사용 가능합니다. 임플란트 자체는 충치가 생기지 않지만, 주변 잇몸에 임플란트 주위염이 생길 수 있으므로 6개월마다 정기 검진과 전문가 클리닝을 받으시는 것이 중요합니다. 강남치과의원 임플란트 성공률은 95% 이상입니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트 비용은 얼마인가요?', a: '강남치과의원 임플란트(Neo/Osstem)는 1본당 130만원입니다. 이 가격에는 맞춤 어버트먼트와 지르코니아 크라운이 포함되어 있습니다. 뼈이식이 필요한 경우 단순 50만원, 복합 80만원이 추가됩니다. 상악동 거상술은 치조정 80만원, 측방 150만원입니다. 정확한 비용은 3D CT 정밀 진단 후 안내드립니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '뼈가 부족해도 임플란트가 가능한가요?', a: '네, 뼈이식(골이식) 또는 상악동 거상술을 병행하면 충분히 가능합니다. 뼈이식은 구강외과 전문의의 핵심 전문 영역으로, 자가골·동종골·이종골·합성골 이식이 모두 가능합니다. 다른 치과에서 뼈 부족으로 임플란트를 거절당하셨더라도 상담 가능합니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트 시술 기간은 얼마나 걸리나요?', a: '식립 수술은 30분~1시간, 뼈 유착(골유합) 기간 2~4개월(위턱 3~4개월, 아래턱 2~3개월), 이후 보철 장착까지 총 3~5개월이 일반적입니다. 뼈이식 병행 시 4~6개월 추가될 수 있습니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트와 브릿지 중 어떤 것이 좋은가요?', a: '임플란트는 양쪽 건강한 치아를 깎지 않아 보존적이고, 독립된 구조로 관리가 용이합니다. 브릿지는 수술 없이 가능하지만 양쪽 치아를 삭제해야 합니다. 일반적으로 뼈 상태가 양호하면 임플란트를 권장하며, 전신 건강 상태에 따라 브릿지가 적합할 수도 있습니다. 전문의 상담 후 결정하시는 것이 좋습니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '당뇨가 있어도 임플란트가 가능한가요?', a: '혈당이 잘 조절되고 있다면(당화혈색소 HbA1c 8% 이하) 임플란트 수술이 가능합니다. 다만, 조절되지 않는 당뇨는 상대적 금기사항이므로, 내과 주치의와 협진하여 수술 적합성을 판단합니다. 구강외과 전문의가 전신 상태를 종합적으로 고려하여 안전하게 진행합니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트 수술 후 주의사항은 무엇인가요?', a: '수술 당일은 뜨거운 음식, 음주, 격렬한 운동을 피하세요. 2~3일간 아이스팩을 15분씩 대면 부기 완화에 도움됩니다. 처방약을 정해진 시간에 복용하고, 수술 부위를 혀나 손으로 만지지 마세요. 부드러운 음식을 드시고, 빨대 사용과 강한 가글은 피하세요.' },
  { category: '임플란트', categorySlug: 'implant', q: '구강외과 전문의에게 임플란트를 받으면 뭐가 다른가요?', a: '구강악안면외과 전문의는 대학병원에서 4년간 구강·악안면 수술만을 집중 수련한 전문가입니다. 뼈를 보는 눈, 신경을 피하는 기술, 봉합의 정밀함이 다릅니다. 특히 뼈이식, 상악동 거상술, 즉시 식립 등 고난이도 수술은 구강외과 전문의의 전문 영역입니다. 강남치과의원에는 전문의 2인이 상주합니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트에 건강보험이 적용되나요?', a: '만 65세 이상은 평생 2개의 임플란트에 건강보험이 적용됩니다. 본인부담금은 약 50만원 수준입니다. 보험 적용 임플란트도 동일한 품질과 전문의 진료를 받으실 수 있습니다. 65세 미만은 비급여이며, 강남치과의원은 Neo/Osstem 임플란트 1본 130만원입니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트 후 MRI 촬영이 가능한가요?', a: '네, 가능합니다. 임플란트에 사용되는 티타늄은 비자성 금속으로 MRI에 영향을 주지 않습니다. 다만, 일부 자석 부착형 틀니(마그넷 어태치먼트)는 MRI 전 탈착이 필요할 수 있습니다. 일반 임플란트는 문제없이 MRI 검사를 받으실 수 있습니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '이를 빼고 바로 임플란트를 심을 수 있나요?', a: '즉시 식립(발치 즉시 임플란트)이 가능한 경우가 있습니다. 감염이 없고 뼈 상태가 양호한 경우, 발치와 동시에 임플란트를 심어 전체 치료 기간을 단축할 수 있습니다. 3D CT 분석을 통해 적합 여부를 판단하며, 구강외과 전문의가 결정합니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '앞니 임플란트도 가능한가요?', a: '네, 앞니 임플란트도 가능합니다. 앞니는 심미성이 매우 중요하므로, PrimeScan 디지털 스캔과 CEREC 시스템으로 자연치아와 거의 구분되지 않는 보철을 제작합니다. 잇몸 라인, 치아 형태, 색상 등을 정밀하게 설계합니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '임플란트를 여러 개 한꺼번에 할 수 있나요?', a: '네, 가능합니다. 구강외과 전문의가 전체 구강 상태를 분석하여 한 번에 여러 부위를 식립할 수 있습니다. 오히려 한 번에 하면 내원 횟수가 줄어 효율적입니다. 전신 건강, 뼈 상태 등을 종합 고려하여 최적의 수술 계획을 세웁니다.' },
  { category: '임플란트', categorySlug: 'implant', q: '영주에서 임플란트 잘하는 곳을 찾고 있어요.', a: '강남치과의원은 영주시에서 구강악안면외과 전문의 2인이 모든 임플란트를 직접 수술하는 치과입니다. 3D CT 정밀 진단, 디지털 가이드 수술, Neo/Osstem 임플란트 사용. 뼈이식, 상악동 수술 등 고난이도 케이스도 대응 가능합니다. 054-636-8222로 상담 예약하세요.' },

  // ===== 디지털 보철 CEREC (12개) =====
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'CEREC으로 어떤 보철을 만들 수 있나요?', a: '현재 강남치과의원에서는 CEREC으로 싱글 지르코니아 크라운과 싱글 세라믹(올세라믹) 크라운을 제작하고 있습니다. 어금니에는 강도가 높은 지르코니아, 앞니에는 투명도가 자연스러운 올세라믹을 사용합니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'CEREC 보철은 내구성이 좋은가요?', a: '지르코니아 크라운은 세라믹 계열 중 최고 강도를 가지며, 올세라믹도 10년 이상 사용 가능합니다. SpeedFire에서 1600℃로 소성하여 최종 강도와 색감을 완성합니다. 자연치아와 유사한 강도와 마모 특성을 가지고 있어 장기간 안심하고 사용하실 수 있습니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'CEREC 디지털 방식의 장점은 무엇인가요?', a: '첫째, PrimeScan 디지털 스캔으로 불편한 본뜨기(인상 채득)가 없습니다. 둘째, 컴퓨터 설계로 0.01mm 수준의 정밀도를 확보합니다. 셋째, 기공소 외주가 아닌 원내 제작이므로 품질 관리가 일관됩니다. 넷째, 자연치아와 거의 구분할 수 없는 다층 세라믹 색감을 구현합니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: '기존 보철(기공소 제작)과 CEREC의 차이점은 무엇인가요?', a: '기존 방식은 실리콘으로 본을 뜨고 기공소에 외주 제작을 맡기며 7~14일 대기합니다. CEREC은 디지털 스캔(5분) → AI 설계(10분) → 밀링(15분) → 소성(15분) → 장착으로 진행됩니다. 본뜨기 불편함 없이 디지털로 편안하고 정밀하게 제작됩니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: '지르코니아와 올세라믹 크라운의 차이는 뭔가요?', a: '지르코니아는 강도가 최고(어금니에 적합)이고, 올세라믹(e.max 등)은 빛 투과성이 자연치아와 가장 유사하여 앞니에 적합합니다. 둘 다 금속 프리(Metal-Free)로 잇몸 변색 걱정 없고, 알레르기 안전합니다. 치아 위치와 기능에 따라 최적 소재를 안내드립니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'CEREC 크라운 비용은 얼마인가요?', a: '강남치과의원 지르코니아 크라운은 50만원입니다. CEREC으로 정밀 디지털 제작되며, 본뜨기 불필요, 자연스러운 색감, 높은 적합도의 프리미엄 크라운입니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'PrimeScan이란 무엇인가요?', a: 'PrimeScan은 독일 Dentsply Sirona사의 최신 구강 스캐너입니다. 초당 수만 장의 이미지를 촬영하여 구강 내부를 실시간 3D 모델로 생성합니다. 불편한 인상재(본뜨기)가 완전히 필요 없어, 구역질 반사가 심한 분도 편안하게 스캔할 수 있습니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: '오래된 금니나 PFM 크라운을 CEREC으로 교체할 수 있나요?', a: '네, 가능합니다. 오래된 금니, PFM(도재) 크라운, 변색된 보철을 CEREC 지르코니아·올세라믹 크라운으로 교체하면 자연스러운 치아 색상을 회복할 수 있습니다. 기존 보철 제거 → PrimeScan 디지털 스캔 → 새 크라운 설계·제작 → 장착으로 진행됩니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'CEREC 장비는 어떤 것이 있나요?', a: '강남치과의원은 PrimeScan(디지털 구강 스캐너), CEREC MC X(0.01mm 정밀 밀링 머신), SpeedFire(1600℃ 초고속 소성로)를 갖추고 있습니다. 스캔부터 최종 보철 완성까지 모든 과정이 원내에서 이루어집니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: 'CEREC 크라운에 보증은 있나요?', a: '세라믹·지르코니아 보철은 소재 자체의 내구성이 우수하여 관리 시 10년 이상 사용 가능합니다. 장착 후에도 정기 검진을 통해 보철 상태를 확인하고, 문제 발생 시 조정합니다. 강남치과의원은 마지막까지 책임집니다.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: '신경치료 후 꼭 크라운을 씌워야 하나요?', a: '네, 신경치료 후 치아는 수분이 줄어 깨지기 쉬우므로, 크라운으로 보호하는 것이 필수입니다. 크라운을 씌우지 않으면 치아 파절 위험이 크게 증가하여 결국 발치가 필요해질 수 있습니다. CEREC으로 정밀한 크라운을 제작해 치아를 오래 보존하세요.' },
  { category: '디지털 보철 (CEREC)', categorySlug: 'digital-prosthesis', q: '영주에서 디지털 보철을 하는 치과가 있나요?', a: '강남치과의원은 영주시에서 CEREC 디지털 보철 시스템을 갖춘 치과입니다. PrimeScan, CEREC MC X, SpeedFire까지 완비하여 싱글 지르코니아·세라믹 크라운을 원내에서 정밀 제작합니다. 054-636-8222로 상담하세요.' },

  // ===== 인비절라인 (12개) =====
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인 교정 기간은 얼마나 걸리나요?', a: '개인차가 있으나 일반적으로 6개월~2년입니다. 단순 교정(앞니 벌어짐, 가벼운 돌출)은 6~12개월, 복잡한 부정교합은 1.5~2년 정도 소요됩니다. 3D 클린체크 시뮬레이션으로 사전에 예상 기간과 교정 후 모습을 미리 확인할 수 있습니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인은 아프나요?', a: '새 얼라이너 교체 후 1~2일간 가벼운 압박감(뻐근한 느낌)이 있을 수 있으나, 금속 교정 대비 통증이 훨씬 적습니다. 입 안 상처(금속 브라켓에 의한)가 없어 쾌적합니다. 대부분 3일 이내에 적응됩니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인 교정 중 음식 제한이 있나요?', a: '장치를 빼고 식사하므로 음식 제한이 전혀 없습니다. 끈적이는 음식, 딱딱한 음식도 자유롭게 드실 수 있습니다. 식후 양치질 후 다시 착용하면 됩니다. 단, 장치 착용 상태에서는 물 외 음료(커피, 주스 등)는 피해주세요.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '성인도 인비절라인 교정이 가능한가요?', a: '네, 인비절라인은 성인 교정에 특히 적합합니다. 전 세계 1,400만 명 이상이 치료를 받았으며, 투명 장치로 외관상 티가 나지 않아 직장인, 대학생, 결혼 준비 중인 분에게 인기입니다. 나이 제한은 없으며, 40~50대 성인도 많이 하십니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인 비용은 얼마인가요?', a: '강남치과의원 인비절라인은 단순 교정 650만원, 복잡 교정 700만원입니다. 인비절라인 퍼스트(1차 교정)는 400만원입니다. 교정 검사비 20만원, 유지장치(리테이너) 20만원은 별도입니다. 교정 중 월 비용 5만원/월이 추가됩니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인과 일반 교정(브라켓)의 차이점은 무엇인가요?', a: '인비절라인은 투명·탈착 가능·음식 제한 없음·입안 상처 없음이 장점입니다. 브라켓 교정은 복잡한 치아 이동에 강점이 있으며 비용이 다소 저렴합니다. 인비절라인 인증의가 구강 상태를 진단하여 가장 적합한 방법을 안내드립니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인은 하루에 얼마나 착용해야 하나요?', a: '하루 20~22시간 착용을 권장합니다. 식사와 양치질 시에만 빼시면 됩니다. 착용 시간이 부족하면 치아 이동이 계획대로 진행되지 않아 교정 기간이 늘어날 수 있으므로, 꾸준한 착용이 중요합니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인 교정 후 유지장치(리테이너)는 꼭 필요한가요?', a: '네, 필수입니다. 교정 직후 치아는 원래 위치로 돌아가려는 경향이 있어, 유지장치를 착용하지 않으면 재발할 수 있습니다. 초기 6개월~1년은 거의 종일, 이후에는 취침 시에만 착용합니다. 강남치과의원 유지장치는 20만원입니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인으로 돌출입(주걱턱)도 교정되나요?', a: '경도~중등도의 돌출입은 인비절라인으로 개선 가능합니다. 소구치 발치 후 앞니를 뒤로 이동시키는 방법을 사용합니다. 심한 골격성 돌출입은 양악수술이 필요할 수 있으므로, 정밀 진단 후 교정 가능 여부를 안내드립니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '인비절라인 인증의란 무엇인가요?', a: '인비절라인 인증의는 Align Technology로부터 일정 수준 이상의 교육과 치료 실적을 인정받은 의사입니다. 강남치과의원은 인비절라인 인증의가 직접 교정 계획(클린체크)을 세우고 관리합니다. 인증의의 경험이 교정 결과에 큰 영향을 미칩니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '이전에 교정했는데 치아가 다시 벌어졌어요. 재교정이 가능한가요?', a: '네, 인비절라인 재교정이 가능합니다. 유지장치 미착용으로 치아가 다시 틀어진 경우, 인비절라인으로 비교적 단기간(6~12개월)에 재교정할 수 있습니다. 투명 장치라 부담 없이 다시 교정할 수 있습니다.' },
  { category: '인비절라인', categorySlug: 'invisalign', q: '영주에서 인비절라인 교정을 할 수 있는 곳이 있나요?', a: '강남치과의원은 영주시에서 인비절라인 인증의가 직접 진료하는 치과입니다. iTero 디지털 스캐너로 3D 시뮬레이션을 제공하여 교정 결과를 미리 확인할 수 있습니다. 054-636-8222로 교정 상담을 예약하세요.' },

  // ===== 사랑니 발치 (10개) =====
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니 발치는 아프나요?', a: '국소마취 하에 진행되므로 시술 중 통증은 없습니다. 시술 후 2~3일간 부기와 통증이 있을 수 있으나 처방약(진통제, 항생제, 소염제)으로 관리됩니다. 구강외과 전문의의 숙련된 기술로 수술 시간이 짧아 회복도 빠릅니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '매복 사랑니도 안전하게 발치할 수 있나요?', a: '네, 강남치과의원은 구강외과 전문의가 3D CT로 사랑니의 위치, 뿌리 형태, 하치조신경관과의 거리를 0.1mm 정밀도로 분석한 후 안전하게 발치합니다. 완전 매복(뼈 안에 완전히 묻힌 사랑니)도 전문적으로 발치합니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니 발치 후 회복 기간은 얼마나 되나요?', a: '7일 후 실밥 제거, 2~4주면 완전 회복됩니다. 부기는 2~3일째 최대가 되고 이후 점차 빠집니다. 아이스팩을 15분씩 대면 부기 완화에 도움됩니다. 발치 당일 뜨거운 음식, 음주, 운동은 피해주세요.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니를 꼭 빼야 하나요?', a: '모든 사랑니를 빼야 하는 것은 아닙니다. 정상 맹출하여 위아래가 맞물리고 위생 관리가 가능한 사랑니는 뺄 필요 없습니다. 하지만 매복, 반복 염증, 인접 치아 충치, 낭종 형성, 교정 목적인 경우 발치를 권장합니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니 4개를 한꺼번에 뽑을 수 있나요?', a: '일반적으로 한 번에 한쪽(같은 편 위아래 2개)을 발치하고, 1~2주 후 반대편을 발치하는 것이 편합니다. 식사 등 일상생활 편의를 위해서입니다. 다만, 환자분 상황에 따라 4개 동시 발치도 가능합니다. 전문의와 상담 후 결정합니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니 발치에 건강보험이 적용되나요?', a: '네, 사랑니 발치는 건강보험이 적용됩니다. 단순 발치, 매복 사랑니 발치 모두 보험 적용 대상입니다. 본인부담금은 발치 난이도에 따라 달라지며, 3D CT 촬영도 보험 적용이 됩니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니 발치 후 드라이 소켓이란 뭔가요?', a: '드라이 소켓(건성 발치창)은 발치 후 혈병(피떡)이 탈락하여 뼈가 노출되는 상태입니다. 심한 통증을 유발하며, 발치 후 3~5일에 발생합니다. 예방을 위해 빨대 사용, 강한 가글, 세게 뱉기를 피하세요. 발생 시 내원하시면 처치 가능합니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '사랑니 때문에 앞니가 삐뚤어질 수 있나요?', a: '학술적으로 사랑니가 앞니 배열에 직접적 영향을 미치는지에 대해서는 논란이 있습니다. 하지만 교정 치료 계획 시 공간 확보를 위해 사랑니 발치를 권장하는 경우가 많습니다. 정확한 판단은 파노라마·CT 촬영 후 가능합니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '임신 중 사랑니가 아프면 어떻게 하나요?', a: '임신 중에는 가능하면 발치를 피하는 것이 좋습니다. 급성 통증 시 안전한 진통제와 항생제를 처방하고, 출산 후 발치를 계획합니다. 임신 4~6개월(안정기)에 불가피한 발치는 가능하나, 산부인과 주치의와 상의 후 결정합니다.' },
  { category: '사랑니 발치', categorySlug: 'wisdom-tooth', q: '영주에서 사랑니 발치 잘하는 곳을 찾고 있어요.', a: '강남치과의원은 구강악안면외과 전문의 2인이 모든 사랑니 발치를 직접 시행합니다. 3D CT로 신경관 위치를 정밀 분석하고, 최소 절개·최소 뼈 삭제로 안전하게 발치합니다. 건강보험 적용. 054-636-8222로 예약하세요.' },

  // ===== 심미보철 (10개) =====
  { category: '심미보철', categorySlug: 'cosmetic', q: '라미네이트와 크라운의 차이점은 무엇인가요?', a: '라미네이트는 치아 앞면만 0.3~0.5mm 최소 삭제하여 얇은 세라믹 판을 접착합니다. 치아 삭제량이 적어 보존적입니다. 크라운은 치아 전체를 감싸는 방식으로, 충치가 넓거나 신경치료 후에 적합합니다. 치아 상태에 따라 적합한 방법이 다르므로 전문의 상담을 권합니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '심미 보철은 얼마나 자연스러운가요?', a: '올세라믹·지르코니아 보철은 자연치아의 빛 투과성, 색상, 질감을 정밀하게 재현합니다. 금속이 전혀 없어 잇몸 변색이 없고, 주변 치아와 거의 구분할 수 없는 자연스러운 결과를 만듭니다. CEREC 디지털 설계로 좌우 대칭과 비율까지 정밀하게 조절합니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: 'CEREC으로 어떤 심미보철이 가능한가요?', a: '현재 CEREC으로는 싱글 지르코니아·세라믹 크라운을 제작합니다. 라미네이트, 브릿지 등 기타 심미보철은 기공소와 협력하여 정밀 제작합니다. 디지털 스캔 데이터를 기반으로 설계하므로, 어떤 방식이든 정밀도가 높습니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '라미네이트 수명은 얼마나 되나요?', a: '올세라믹 라미네이트는 관리 잘 하면 10~15년 이상 사용 가능합니다. 앞니로 딱딱한 것을 깨무는 습관, 이갈이 등이 있으면 수명이 줄어들 수 있으므로 주의가 필요합니다. 정기 검진을 통해 상태를 확인합니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '앞니 변색을 개선하려면 어떤 치료가 좋은가요?', a: '변색 정도에 따라 다릅니다. 경미한 변색은 미백으로 개선 가능하고, 심한 변색(신경 괴사, 약물성 변색 등)은 라미네이트나 올세라믹 크라운으로 완벽한 개선이 가능합니다. 미백으로 충분한지, 보철이 필요한지는 진단 후 안내드립니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '라미네이트 시술은 아프나요?', a: '치아 삭제량이 0.3~0.5mm로 최소이므로, 대부분 마취 없이도 가능합니다. 민감한 분은 부분 마취 후 진행합니다. 시술 후 일시적 시림이 있을 수 있으나 며칠 내 사라집니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '치아 사이 벌어짐을 메울 수 있나요?', a: '네, 레진 본딩(작은 틈)이나 라미네이트(넓은 틈)로 개선 가능합니다. 레진 본딩은 당일 완료되며 비용이 저렴합니다. 라미네이트는 전체적인 형태·색상까지 개선할 수 있어 더 완성도 높은 결과를 만듭니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '오래된 금니를 자연스럽게 바꾸고 싶어요.', a: '금니, PFM(도재 크라운)을 지르코니아·올세라믹 크라운으로 교체하면 자연치아와 거의 동일한 색감을 회복할 수 있습니다. CEREC 디지털 시스템으로 정밀 제작하며, 주변 치아와 완벽한 색상 매칭이 가능합니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '결혼 전 치아를 예쁘게 하고 싶어요. 어떤 치료가 좋을까요?', a: '미백 + 라미네이트(또는 레진 본딩) 조합이 가장 효과적입니다. 미백으로 전체 치아를 밝게 하고, 형태 불균형·벌어짐·변색 치아는 라미네이트로 개선합니다. 결혼식 2~3개월 전에 시작하시면 여유 있게 완성됩니다.' },
  { category: '심미보철', categorySlug: 'cosmetic', q: '영주에서 심미보철(라미네이트·크라운)을 잘하는 곳이 있나요?', a: '강남치과의원은 CEREC 디지털 시스템과 PrimeScan 스캐너를 갖추고 있어, 정밀한 심미보철이 가능합니다. 싱글 크라운은 CEREC으로, 라미네이트는 기공소 협력으로 높은 품질을 제공합니다. 054-636-8222로 상담하세요.' },

  // ===== 충치·신경치료 (8개) =====
  { category: '충치·신경치료', categorySlug: 'cavity', q: '충치 치료는 하루 만에 끝나나요?', a: '초기~중기 충치(법랑질·상아질 단계)는 당일 레진 치료가 가능합니다. 충치가 넓어 크라운이 필요한 경우에도 CEREC으로 싱글 지르코니아·세라믹 크라운을 당일 제작할 수 있습니다. 신경치료가 필요한 심한 충치는 2~3회 내원이 필요합니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '충치가 심하면 어떤 치료를 받나요?', a: '충치가 신경까지 진행된 경우 신경치료(근관치료) 후 크라운으로 보호합니다. 뿌리끝까지 감염이 퍼졌으면 발치 후 임플란트를 고려합니다. CEREC으로 싱글 크라운을 디지털 정밀 제작할 수 있어 보철까지 효율적으로 진행됩니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '신경치료는 왜 여러 번 내원해야 하나요?', a: '감염된 신경조직 제거 → 근관 소독 → 충전(밀봉) 과정을 정확히 진행하기 위해 2~3회 내원이 필요합니다. 각 단계에서 충분한 소독을 통해 감염을 완전히 제거해야 재발을 방지할 수 있습니다. 정확한 치료가 치아 수명을 좌우합니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '신경치료 후에는 어떤 치료가 필요한가요?', a: '신경치료 후 치아가 약해지므로 크라운을 씌워 보호하는 것이 필수입니다. 크라운 없이 방치하면 치아 파절로 발치까지 이어질 수 있습니다. CEREC으로 싱글 지르코니아·세라믹 크라운을 정밀 제작하여 장착합니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '레진과 인레이, 뭐가 다른가요?', a: '레진은 의사가 충치 부위에 직접 채우는 방식(당일 완료)이고, 인레이는 충치 부위를 본뜬 후 별도 제작하여 접착하는 방식입니다. 충치 범위가 치아 면적의 1/3 이하이면 레진, 그 이상이면 인레이나 크라운을 권장합니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '초기 충치를 발견하려면 어떻게 해야 하나요?', a: '초기 충치는 통증이 없어 자가 발견이 어렵습니다. 6개월마다 정기 검진을 받으시면 디지털 X-Ray와 구강 카메라로 초기 충치를 발견할 수 있습니다. 초기에 발견하면 간단한 레진 치료로 해결 가능하지만, 방치하면 신경치료나 발치가 필요해집니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '충치 예방을 위해 뭘 해야 하나요?', a: '하루 3번 올바른 칫솔질, 치실·치간칫솔 사용, 당분 섭취 줄이기, 6개월마다 정기 검진과 스케일링이 기본입니다. 충치 위험이 높은 분은 불소 도포, 어린이는 실란트(치아 홈 메우기)가 효과적입니다.' },
  { category: '충치·신경치료', categorySlug: 'cavity', q: '영주에서 충치·신경치료를 잘하는 곳을 찾고 있어요.', a: '강남치과의원은 초기 충치부터 신경치료, 크라운 보철까지 원스톱으로 진행합니다. CEREC 디지털 보철로 싱글 크라운을 정밀 제작하고, 최소 삭제·보존치료를 우선합니다. 054-636-8222로 상담하세요.' },

  // ===== 잇몸·스케일링 (8개) =====
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '스케일링은 얼마나 자주 받아야 하나요?', a: '건강보험 기준 연 1회(만 19세 이상) 적용되며, 잇몸 상태에 따라 3~6개월마다 받으시는 것을 권장합니다. 잇몸질환 치료 후에는 3~4개월마다 유지 관리 스케일링이 필요합니다.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '스케일링 후 이가 시린 건 정상인가요?', a: '네, 정상입니다. 치석 제거 후 그동안 가려져 있던 치아면이 노출되면서 일시적으로 시릴 수 있습니다. 보통 1~2주 내 자연 소실됩니다. 시린이 전용 치약을 사용하면 도움이 됩니다.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '잇몸에서 피가 나면 치과에 가야 하나요?', a: '칫솔질 시 반복적으로 잇몸에서 피가 나면 치은염(초기 잇몸질환)의 신호입니다. 방치하면 치주염으로 진행되어 뼈가 녹고 치아가 흔들릴 수 있습니다. 가능한 빨리 치과를 방문하여 잇몸 상태를 확인하세요.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '잇몸병은 치료가 되나요?', a: '치은염(초기)은 스케일링과 올바른 구강 관리로 완치 가능합니다. 치주염(진행)은 비수술적 치주치료(치근활택술)로 진행을 멈출 수 있지만, 녹은 뼈는 자연 재생이 어렵습니다. 따라서 조기 발견과 정기 관리가 매우 중요합니다.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '스케일링이 치아를 약하게 만드나요?', a: '아닙니다. 스케일링은 치석(세균 덩어리)만 제거하는 것이지 치아를 깎는 것이 아닙니다. 치석이 제거되면 잇몸이 붓기가 빠지면서 치아 사이가 벌어져 보일 수 있는데, 이것은 원래 상태로 돌아온 것입니다.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '이가 흔들리면 어떻게 해야 하나요?', a: '치아가 흔들리는 것은 잇몸뼈가 상당히 흡수된 상태입니다. 빨리 치과를 방문하여 잇몸 상태를 검사받으세요. 경우에 따라 치주치료로 유지할 수 있지만, 심한 경우 발치 후 임플란트가 필요할 수 있습니다. 빠른 진단이 치아를 살리는 열쇠입니다.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '스케일링에 건강보험이 적용되나요?', a: '네, 만 19세 이상 성인은 연 1회 건강보험으로 스케일링을 받으실 수 있습니다. 본인부담금은 약 15,000~20,000원 수준입니다. 적용 기간은 매년 1월 1일~12월 31일이며, 연도가 바뀌면 다시 1회 적용됩니다.' },
  { category: '잇몸·스케일링', categorySlug: 'gum', q: '영주에서 잇몸치료를 잘하는 곳을 찾고 있어요.', a: '강남치과의원은 잇몸 정밀 검사(치주낭 깊이 측정, X-Ray 분석)부터 비수술적 치주치료, 정기 유지 관리까지 체계적으로 진행합니다. 치주 관리는 꾸준함이 핵심이며, 강남치과의원이 함께합니다. 054-636-8222.' },

  // ===== 일반 진료 (비용·예약·기타) (10개) =====
  { category: '비용·예약·기타', categorySlug: 'general', q: '강남치과의원 진료 비용이 궁금해요.', a: '주요 비용: 임플란트(Neo/Osstem) 130만원, 지르코니아 크라운 50만원, 인비절라인 650~700만원, 라미네이트 60만원, 레진 8만원~, 전체 미백 60만원. 신경치료·스케일링·사랑니 발치는 건강보험 적용됩니다. 정확한 비용은 진단 후 안내드립니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '강남치과의원 진료시간은 어떻게 되나요?', a: '평일(월~금) 오전 9시~오후 5시 30분. 점심시간 오후 1시~2시. 토·일·공휴일 휴무입니다. 전화 054-636-8222 또는 네이버 예약으로 사전 예약하시면 대기 시간을 줄일 수 있습니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '예약 없이 방문해도 되나요?', a: '예약 없이 방문하셔도 진료는 가능하지만, 예약 환자 우선으로 대기가 길어질 수 있습니다. 전화(054-636-8222) 또는 네이버 예약으로 사전 예약하시면 편리합니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '주차는 가능한가요?', a: '네, 건물 후면에 지상·지하 주차장이 완비되어 있어 무료로 이용 가능합니다. 주소는 경북 영주시 대학로 217, 모모제인 건물 2층입니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '카드 결제와 분할 납부가 가능한가요?', a: '모든 카드 결제가 가능하며, 임플란트·교정 등 고액 진료는 무이자 할부도 가능합니다. 자세한 할부 조건은 내원 시 안내드립니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '강남치과의원은 어디에 있나요?', a: '경상북도 영주시 대학로 217, 모모제인 건물 2층에 위치합니다. 택지 사거리에서 도보 1분 거리이며, 영주역에서 택시 약 10분입니다. 네이버 지도에서 "영주 강남치과의원"으로 검색하시면 찾으실 수 있습니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '어린이 치과 치료도 가능한가요?', a: '네, 가능합니다. 유치 레진, SS 크라운, 실란트(치아 홈 메우기), 불소 도포 등 소아 치과 진료를 제공합니다. 어린이 치아 건강의 기본인 예방 진료를 중시합니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '응급 상황(급성 통증, 치아 파절)에는 어떻게 해야 하나요?', a: '평일 진료시간(9시~17:30) 내에는 054-636-8222로 전화하시면 가능한 빨리 응급 진료를 받으실 수 있습니다. 치아가 빠졌다면 우유에 담가 최대한 빨리 내원해주세요.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '건강보험이 적용되는 치과 치료는 뭐가 있나요?', a: '보험 적용 항목: 스케일링(연 1회, 만 19세↑), 신경치료(근관치료), 일반 발치, 사랑니 발치, 잇몸치료(치주치료), 글래스아이오노머/아말감 충전, X-ray/파노라마, 만 65세↑ 틀니(7년 1회), 만 65세↑ 임플란트(평생 2개). 레진·크라운·인비절라인 등은 비급여입니다.' },
  { category: '비용·예약·기타', categorySlug: 'general', q: '영주에서 치과 추천해주세요.', a: '강남치과의원은 구강악안면외과 전문의 2인이 직접 진료하는 영주시 치과입니다. 임플란트·뼈이식·사랑니 전문, CEREC 디지털 보철, 인비절라인 인증의 교정, 대학병원급 장비(3D CT, PrimeScan, iTero) 완비. 경북 영주시 대학로 217, 054-636-8222.' },
]

// 카테고리 목록 추출
export function getFAQCategories(): { name: string; slug: string; count: number }[] {
  const catMap = new Map<string, { slug: string; count: number }>()
  for (const f of allFAQs) {
    const existing = catMap.get(f.category)
    if (existing) existing.count++
    else catMap.set(f.category, { slug: f.categorySlug, count: 1 })
  }
  return Array.from(catMap.entries()).map(([name, val]) => ({ name, slug: val.slug, count: val.count }))
}

// 특정 진료과목 FAQ만 추출 (treatments.ts 연동용)
export function getFAQsBySlug(slug: string): { q: string; a: string }[] {
  return allFAQs.filter(f => f.categorySlug === slug).map(f => ({ q: f.q, a: f.a }))
}

// FAQ 전체 페이지 HTML + 스키마
export function faqPage(selectedCategory?: string): { html: string; title: string; description: string; schemas: object[] } {
  const categories = getFAQCategories()
  const filteredFAQs = selectedCategory
    ? allFAQs.filter(f => f.categorySlug === selectedCategory)
    : allFAQs

  const catName = selectedCategory
    ? categories.find(c => c.slug === selectedCategory)?.name || '전체'
    : '전체'
  const title = selectedCategory
    ? `${catName} FAQ – 자주 묻는 질문 | 강남치과의원`
    : '자주 묻는 질문 (FAQ) | 영주 강남치과의원'
  const description = selectedCategory
    ? `강남치과의원 ${catName} 관련 자주 묻는 질문과 상세 답변. 구강외과 전문의 2인이 직접 답변합니다.`
    : '강남치과의원 전체 진료에 대한 자주 묻는 질문과 상세 답변. 임플란트, 디지털보철, 인비절라인, 사랑니, 잇몸치료, 비용 등 상세 FAQ.'

  // 스키마: FAQPage (Google FAQ Rich Snippet) + Speakable (AEO)
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": title,
      "description": description,
      "url": `https://kndent.kr/faq${selectedCategory ? `?category=${selectedCategory}` : ''}`,
      "inLanguage": "ko-KR",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntity": filteredFAQs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      })),
      "publisher": { "@id": "https://kndent.kr/#organization" }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "url": `https://kndent.kr/faq${selectedCategory ? `?category=${selectedCategory}` : ''}`,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-speakable]", "h1", ".faq-answer"]
      },
      "about": { "@type": "Dentist", "@id": "https://kndent.kr/#organization" },
      "lastReviewed": new Date().toISOString().split('T')[0],
      "reviewedBy": {
        "@type": "Physician",
        "name": "이태형",
        "@id": "https://kndent.kr/doctors/lee-taehyung#physician"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr" },
        { "@type": "ListItem", "position": 2, "name": "자주 묻는 질문", "item": "https://kndent.kr/faq" },
        ...(selectedCategory ? [{ "@type": "ListItem" as const, "position": 3, "name": catName, "item": `https://kndent.kr/faq?category=${selectedCategory}` }] : [])
      ]
    }
  ]

  // 카테고리별 그룹화 (전체 보기일 때)
  const grouped = new Map<string, typeof filteredFAQs>()
  for (const f of filteredFAQs) {
    const group = grouped.get(f.category) || []
    group.push(f)
    grouped.set(f.category, group)
  }

  const html = `
  <!-- Hero -->
  <section class="relative min-h-[40vh] md:min-h-[55vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-16 pt-28 md:pb-24 md:pt-44 w-full">
      <nav aria-label="breadcrumb" class="mb-6">
        <ol class="flex items-center gap-2 text-sm text-gray-400">
          <li><a href="/" class="hover:text-royal transition-colors">홈</a></li>
          <li><i class="fas fa-chevron-right text-[8px]"></i></li>
          <li${selectedCategory ? '' : ' class="text-charcoal font-medium"'}><a href="/faq" class="hover:text-royal transition-colors">자주 묻는 질문</a></li>
          ${selectedCategory ? `<li><i class="fas fa-chevron-right text-[8px]"></i></li><li class="text-charcoal font-medium">${catName}</li>` : ''}
        </ol>
      </nav>
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FAQ</div>
      <h1 class="display-lg text-charcoal mb-6" data-speakable="true">자주 묻는 질문</h1>
      <p class="text-gray-400 text-lg" data-speakable="true">영주 강남치과의원에 대해 궁금하신 점을 모았습니다.<br>구강외과 전문의 2인이 직접 답변합니다.</p>
    </div>
  </section>

  <!-- Category Filter -->
  <section class="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <div class="flex flex-wrap gap-2">
        <a href="/faq" class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!selectedCategory ? 'royal-grad text-white shadow-md' : 'bg-snow-50 text-gray-500 hover:bg-royal/10 hover:text-royal'}">전체 <span class="text-xs opacity-70">(${allFAQs.length})</span></a>
        ${categories.map(c => `
        <a href="/faq?category=${c.slug}" class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === c.slug ? 'royal-grad text-white shadow-md' : 'bg-snow-50 text-gray-500 hover:bg-royal/10 hover:text-royal'}">${c.name} <span class="text-xs opacity-70">(${c.count})</span></a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- FAQ Content -->
  <section class="py-14 md:py-20 bg-white">
    <div class="max-w-4xl mx-auto px-5 md:px-8 lg:px-12">
      ${Array.from(grouped.entries()).map(([catName, catFaqs]) => `
      <div class="mb-12 last:mb-0">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl royal-grad flex items-center justify-center royal-glow">
            <i class="fas fa-${catFaqs[0].categorySlug === 'implant' ? 'tooth' : catFaqs[0].categorySlug === 'digital-prosthesis' ? 'bolt' : catFaqs[0].categorySlug === 'invisalign' ? 'teeth' : catFaqs[0].categorySlug === 'wisdom-tooth' ? 'hand-holding-medical' : catFaqs[0].categorySlug === 'cosmetic' ? 'gem' : catFaqs[0].categorySlug === 'cavity' ? 'tooth' : catFaqs[0].categorySlug === 'gum' ? 'droplet' : 'circle-info'} text-white text-sm"></i>
          </div>
          <h2 class="text-xl font-extrabold text-charcoal">${catName}</h2>
          <span class="text-xs text-gray-400">(${catFaqs.length}개 질문)</span>
          <div class="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent ml-4"></div>
        </div>
        <div class="space-y-2.5">
          ${catFaqs.map((f, i) => `
          <details class="card-premium group" ${i === 0 && !selectedCategory ? '' : (i === 0 ? 'open' : '')}>
            <summary class="flex items-center justify-between p-5 cursor-pointer select-none">
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <span class="w-7 h-7 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><span class="text-white text-[10px] font-bold">Q</span></span>
                <h3 class="font-bold text-charcoal text-sm">${f.q}</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-300 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-3 text-xs"></i>
            </summary>
            <div class="px-5 pb-5 pt-0">
              <div class="pl-10 text-gray-500 text-sm leading-relaxed faq-answer" data-speakable="true">${f.a}</div>
            </div>
          </details>
          `).join('')}
        </div>
      </div>
      `).join('')}
    </div>
  </section>

  <!-- 관련 페이지 링크 -->
  <section class="py-14 section-snow">
    <div class="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 text-center">
      <h2 class="font-extrabold text-charcoal mb-6">더 궁금하신 점이 있으신가요?</h2>
      <p class="text-gray-400 mb-8">FAQ에서 답을 찾지 못하셨다면, 직접 상담받으세요.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-4 !px-10 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <a href="/treatments" class="px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-500 hover:text-royal hover:border-royal/30 transition-all">전체 진료 안내</a>
        <a href="/pricing" class="px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-500 hover:text-royal hover:border-royal/30 transition-all">비용 안내</a>
        <a href="/doctors" class="px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-500 hover:text-royal hover:border-royal/30 transition-all">의료진 소개</a>
        <a href="/directions" class="px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-500 hover:text-royal hover:border-royal/30 transition-all">오시는 길</a>
      </div>
    </div>
  </section>
  `

  return { html, title, description, schemas }
}
