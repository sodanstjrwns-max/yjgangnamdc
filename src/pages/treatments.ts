interface Treatment {
  slug: string; category: string; title: string; h1: string; description: string;
  icon: string; heroDesc: string; worry: string; promise: string;
  sections: { title: string; content: string }[]; features: string[]; isTop: boolean;
}

const treatments: Treatment[] = [
  { slug:'implant', category:'전문센터', title:'임플란트', icon:'fa-tooth',
    h1:'영주 임플란트 – 구강외과 전문의 직접 수술', description:'영주 강남치과의원 임플란트. 구강악안면외과 전문의가 직접 수술합니다. 뼈이식, 상악동 거상술 등 고난이도 수술까지 가능합니다.',
    heroDesc:'수술 전문 외과 전문의가 직접 임플란트합니다', worry:'"수술이 무서워요"', promise:'구강외과 전문의가 직접 수술하니까 안심하세요',
    features:['구강외과 전문의 직접 수술','CT 기반 정밀 진단','뼈이식·상악동 수술 가능','디지털 임플란트 가이드','네오 임플란트 사용'], isTop:true,
    sections:[
      { title:'임플란트란 무엇인가요?', content:'임플란트는 상실된 치아를 대체하기 위해 턱뼈에 티타늄 인공치근(픽스쳐)을 심고, 그 위에 인공 치아(보철)를 연결하는 치료입니다. 자연치아와 거의 동일한 기능과 심미성을 회복할 수 있어, 현재 치아 상실 치료의 표준으로 자리잡았습니다.\n\n임플란트의 핵심은 "턱뼈에 나사를 심는 수술"이라는 점입니다. 잇몸을 절개하고, 턱뼈에 정확한 위치와 각도로 드릴링한 뒤 픽스쳐를 식립합니다. 따라서 외과적 수술 경험이 풍부한 전문의에게 받는 것이 안전합니다.' },
      { title:'왜 구강외과 전문의에게 받아야 하나요?', content:'구강악안면외과 전문의는 치과대학 졸업 후 대학병원에서 4년간 구강·악안면 수술만을 집중적으로 수련한 전문의입니다. 뼈를 보는 눈, 신경을 피하는 기술, 봉합의 정밀함이 일반 치과의사와 다릅니다.\n\n강남치과의원에는 구강외과 전문의가 2인 상주합니다. 모든 임플란트 수술을 전문의가 직접 집도하며, 복잡한 케이스에서는 전문의 간 교차 검증으로 더 안전한 수술 계획을 수립합니다.\n\n특히 뼈이식, 상악동 거상술, 즉시 식립 등 고난이도 수술은 구강외과 전문의의 전문 영역으로, 대구 등 대도시 대학병원까지 가지 않아도 영주에서 동일한 수준의 수술을 받으실 수 있습니다.' },
      { title:'강남치과의원 임플란트 과정', content:'<strong>1단계: 정밀 진단 (30~40분)</strong>\n3D CT 촬영으로 턱뼈의 두께, 높이, 밀도를 입체적으로 분석합니다. 신경관의 위치, 상악동(부비강)의 상태도 확인하여 수술 계획을 세웁니다. PrimeScan 디지털 스캐너로 구강 내부를 3D 스캔하여 보철 설계에 활용합니다.\n\n<strong>2단계: 임플란트 식립 수술 (30분~1시간)</strong>\n구강외과 전문의가 직접 집도합니다. 디지털 가이드를 활용하여 사전 계획대로 정확한 위치에 임플란트를 식립합니다. 국소마취 하에 진행되며, 수술 중 통증은 거의 없습니다.\n\n<strong>3단계: 치유 기간 (2~4개월)</strong>\n임플란트가 턱뼈와 단단하게 유착(골유합)되는 기간입니다. 위턱은 약 3~4개월, 아래턱은 약 2~3개월 소요됩니다. 이 기간 동안 임시 치아를 사용하실 수 있습니다.\n\n<strong>4단계: 보철 제작 및 장착 (1~2시간)</strong>\nCEREC 시스템으로 디지털 스캔 후 당일 세라믹 보철을 제작·장착합니다. 기공소 외주 없이 원내에서 완성하므로, 보철을 위한 추가 내원이 필요 없습니다.\n\n<strong>5단계: 경과 관리</strong>\n정기적인 경과 체크와 전문가 클리닝으로 임플란트를 오래 사용할 수 있도록 관리합니다.' },
      { title:'이런 분께 추천합니다', content:'• 치아가 빠진 후 오래 방치하여 뼈가 줄어드신 분 — 뼈이식 후 임플란트 가능\n• 틀니가 불편하신 분 — 임플란트로 고정력 있는 치아 회복\n• 브릿지 때문에 양쪽 건강한 치아를 깎기 싫으신 분\n• 뼈가 부족하다고 다른 치과에서 거절당하신 분 — 구강외과 전문의의 전문 영역\n• 수술 경험이 풍부한 전문의를 찾으시는 분\n• 여러 번 내원하기 어려우신 분 — CEREC 당일 보철로 내원 횟수 최소화' },
      { title:'임플란트 수명과 관리', content:'잘 관리된 임플란트는 10년 이상, 평생 사용할 수 있습니다. 임플란트 자체는 충치가 생기지 않지만, 주변 잇몸 관리가 중요합니다.\n\n임플란트 주위 잇몸에 염증(임플란트 주위염)이 생기면 뼈가 녹아 임플란트가 흔들릴 수 있습니다. 예방을 위해 6개월마다 정기 검진과 전문가 클리닝을 받으시길 권합니다.\n\n강남치과의원에서는 임플란트 수술 후에도 정기적인 경과 관리 프로그램을 운영합니다. 마지막까지 책임집니다.' },
      { title:'강남치과의원 임플란트 장비', content:'• <strong>3D CT (CBCT)</strong>: 0.1mm 정밀도의 3D 입체 촬영으로 턱뼈를 정확하게 분석\n• <strong>PrimeScan</strong>: 초정밀 구강 스캐너로 디지털 인상 채득 (본뜨기 불필요)\n• <strong>디지털 임플란트 가이드</strong>: CT 데이터 기반 맞춤형 수술 가이드 제작\n• <strong>CEREC MC X</strong>: 세라믹 보철 당일 밀링 제작\n• <strong>SpeedFire</strong>: 초고속 소성로로 최종 보철 강도 확보\n• <strong>네오 임플란트</strong>: 국산 프리미엄 임플란트 시스템 사용' }
    ] },
  { slug:'cerec', category:'전문센터', title:'당일 보철 (CEREC)', icon:'fa-bolt',
    h1:'당일 보철 완성 – CEREC 원데이 시스템', description:'CEREC 당일 보철 시스템으로 하루 만에 크라운, 인레이, 라미네이트까지 완성합니다. 기공소 외주 없이 원내에서 디지털 제작.',
    heroDesc:'한 번 방문으로 보철까지 완성합니다', worry:'"치과 여러 번 가기 싫어요"', promise:'하루 만에 발수·근충·보철까지 끝냅니다',
    features:['CEREC + SpeedFire 시스템','발수·근충·보철 당일 완성','디지털 스캔으로 정밀 제작','세라믹 보철 자연치아색','재내원 최소화'], isTop:true,
    sections:[
      { title:'CEREC이란 무엇인가요?', content:'CEREC(Chairside Economical Restoration of Esthetic Ceramics)은 독일 시로나(Sirona)사가 개발한 디지털 보철 제작 시스템입니다. 1985년 세계 최초로 출시된 이래 전 세계 수만 개의 치과에서 사용되고 있으며, 누적 보철 제작 수는 수억 개에 달합니다.\n\n핵심 원리는 간단합니다. 구강 내 스캐너(PrimeScan)로 치아를 3D 촬영하고, 컴퓨터(CEREC SW)로 보철을 자동 설계한 뒤, 밀링 머신(CEREC MC X)이 세라믹 블록을 깎아 보철을 만듭니다. 모든 과정이 치과 내에서 이루어지며, 1~2시간이면 완성됩니다.' },
      { title:'기존 아날로그 방식 vs CEREC 디지털 방식', content:'<strong>기존 아날로그 방식 (6회 내원, 2~3개월)</strong>\n1회차: 상담 + CT 촬영 (30분)\n2회차: 치아 삭제 + 실리콘 인상재로 본뜨기 (30분)\n3회차: 기공소에 외주 제작 의뢰 → 7~14일 대기\n4회차: 임시치아 장착 후 재내원하여 보철 시적\n5회차: 미세 조정 후 최종 장착\n\n<strong>CEREC 디지털 방식 (1~2회 내원, 당일~1주)</strong>\n디지털 스캔 (5분) → AI 보철 설계 (10분) → 밀링 제작 (15분) → SpeedFire 소성 (15분) → 장착 (15분)\n\n본뜨기의 불편함이 없고, 기공소 대기 기간이 제로입니다. 디지털 정밀도는 0.01mm 수준으로, 수작업보다 보철 적합도가 우수합니다.' },
      { title:'CEREC으로 가능한 치료', content:'<strong>크라운 (씌우기)</strong>\n신경치료 후 치아 보호, 큰 충치 수복, 깨진 치아 복원에 사용됩니다. 올세라믹, 지르코니아 등 다양한 재료를 선택할 수 있으며, 자연치아와 거의 구분이 안 되는 색감을 구현합니다.\n\n<strong>인레이 / 온레이</strong>\n충치 부위가 크라운을 씌울 정도는 아니지만, 레진으로 메우기엔 큰 경우에 사용합니다. 치아 삭제량을 최소화하면서도 강도와 심미성을 확보합니다.\n\n<strong>라미네이트</strong>\n치아 표면을 최소한으로 삭제한 뒤, 얇은 세라믹 판을 접착합니다. 앞니의 색상, 형태, 배열을 개선할 수 있습니다.\n\n<strong>브릿지 (일부)</strong>\n2~3개 단위의 짧은 브릿지도 CEREC으로 당일 제작이 가능합니다.' },
      { title:'CEREC 당일 보철의 장점', content:'• <strong>시간 절약</strong>: 기공소 외주 대기 시간 제로. 바쁜 직장인, 지방에서 오시는 분에게 최적\n• <strong>높은 정밀도</strong>: 디지털 스캔 + 컴퓨터 설계로 0.01mm 단위 정밀 제작\n• <strong>자연스러운 색감</strong>: 세라믹 블록의 그라데이션이 자연치아와 흡사\n• <strong>강도 우수</strong>: SpeedFire 초고속 소성(1600℃)으로 최종 강도 확보\n• <strong>생체친화성</strong>: 금속 프리(Metal-Free) 세라믹으로 알레르기 걱정 없음\n• <strong>최소 내원</strong>: 대부분 1회 내원으로 치료 완료. 여러 번 오실 필요 없습니다' },
      { title:'강남치과의원 CEREC 장비 구성', content:'<strong>PrimeScan (구강 스캐너)</strong>\nDentsply Sirona사의 최신 구강 스캐너입니다. 초당 수만 장의 이미지를 촬영하여 구강 내부를 실시간 3D 모델로 생성합니다. 불편한 인상재(본뜨기)가 완전히 필요 없습니다.\n\n<strong>CEREC MC X (밀링 머신)</strong>\n세라믹 블록을 0.01mm 정밀도로 깎아 보철을 만듭니다. 다이아몬드 버(Bur)가 컴퓨터 설계대로 자동 절삭합니다.\n\n<strong>SpeedFire (초고속 소성로)</strong>\n밀링이 끝난 보철을 1600℃에서 15분 만에 소성합니다. 기존 소성로(8시간)보다 30배 이상 빠르며, 최종 강도와 색감을 완성합니다.' }
    ] },
  { slug:'invisalign', category:'전문센터', title:'인비절라인', icon:'fa-teeth',
    h1:'영주 인비절라인 – 투명교정 인증의', description:'영주 인비절라인 투명교정. 인비절라인 인증의가 iTero 스캐너로 정밀 교정합니다. 3D 시뮬레이션으로 결과를 미리 확인.',
    heroDesc:'눈에 띄지 않게, 인비절라인으로 교정합니다', worry:'"교정 티 나기 싫어요"', promise:'투명 교정장치로 일상에 지장 없이 교정합니다',
    features:['인비절라인 인증의','iTero 디지털 스캐너','맞춤형 교정 플래닝','탈착 가능한 편의성','3D 시뮬레이션 제공'], isTop:true,
    sections:[
      { title:'인비절라인이란?', content:'인비절라인(Invisalign)은 미국 얼라인 테크놀로지(Align Technology)사가 개발한 투명 교정 시스템입니다. 1997년 출시 이래 전 세계 1,400만 명 이상이 치료를 받았으며, 현재 가장 널리 사용되는 투명교정 브랜드입니다.\n\n얇고 투명한 플라스틱 교정장치(얼라이너)를 착용하여 치아를 조금씩 이동시킵니다. 1~2주마다 새로운 장치로 교체하면서, 컴퓨터로 미리 설계된 경로를 따라 치아가 정확한 위치로 움직입니다.\n\n가장 큰 장점은 "투명하다"는 것. 장착해도 주변 사람이 거의 알아차리지 못합니다. 직장인, 취업준비생, 결혼 준비 중이신 분 등 교정 티를 내고 싶지 않은 분들에게 최적의 선택입니다.' },
      { title:'왜 인비절라인 인증의인가요?', content:'인비절라인은 아무 치과에서나 똑같이 되는 치료가 아닙니다. 교정 계획(클린체크)을 어떻게 설계하느냐에 따라 치료 기간, 결과가 크게 달라집니다.\n\n인비절라인 인증의는 Align Technology로부터 일정 수준 이상의 교육과 치료 실적을 인정받은 의사입니다. 강남치과의원은 인비절라인 인증의가 직접 교정 계획을 세우고 관리합니다.\n\n또한 iTero Element 스캐너를 보유하고 있어, 정밀한 디지털 인상 채득과 실시간 3D 시뮬레이션이 가능합니다. 교정 시작 전에 치료 후 모습을 3D로 미리 확인하실 수 있습니다.' },
      { title:'인비절라인 교정 과정', content:'<strong>1단계: 정밀 진단 및 상담 (30~40분)</strong>\niTero 디지털 스캐너로 구강 전체를 3D 스캔합니다. 파노라마, 두부계측 방사선 촬영, 구강 내 사진 촬영도 함께 진행합니다. 현재 치아 상태와 교정 가능 여부를 진단합니다.\n\n<strong>2단계: 3D 시뮬레이션 (클린체크)</strong>\n스캔 데이터를 바탕으로 교정 전·중·후 치아 이동 과정을 3D 시뮬레이션으로 설계합니다. 환자분과 함께 화면을 보면서 최종 결과를 미리 확인하고, 치료 계획을 확정합니다.\n\n<strong>3단계: 맞춤 교정장치 제작 (2~3주)</strong>\n확정된 클린체크를 바탕으로 미국 Align Technology 공장에서 환자분 전용 얼라이너 세트를 제작합니다.\n\n<strong>4단계: 교정 진행 (6개월~2년)</strong>\n1~2주마다 새로운 얼라이너로 교체하며, 4~8주마다 내원하여 경과를 체크합니다. 하루 20~22시간 착용이 권장됩니다.\n\n<strong>5단계: 교정 완료 후 유지 (평생)</strong>\n교정이 끝나면 유지장치(리테이너)를 착용하여 치아가 원래 위치로 돌아가는 것을 방지합니다.' },
      { title:'인비절라인의 장점', content:'• <strong>심미성</strong>: 투명하여 착용 사실을 거의 알 수 없음. 대인관계, 직장생활에 영향 없음\n• <strong>편의성</strong>: 식사 시 탈착 가능. 음식 제한 없음. 양치도 평소처럼 가능\n• <strong>쾌적함</strong>: 금속 브라켓·와이어 없어 입 안 상처 걱정 없음\n• <strong>예측 가능성</strong>: 3D 시뮬레이션으로 치료 결과를 사전에 확인\n• <strong>적은 내원 횟수</strong>: 4~8주마다 내원. 브라켓 교정 대비 내원 횟수 적음\n• <strong>금속 알레르기 안전</strong>: 의료용 플라스틱 소재로 알레르기 걱정 없음' },
      { title:'이런 분께 추천합니다', content:'• 교정 티 나는 것이 부담되시는 직장인, 대학생\n• 금속 교정장치의 이물감이 싫으신 분\n• 양치질과 식사를 평소처럼 하고 싶으신 분\n• 교정 중에도 사진 촬영, 면접, 발표 등이 있으신 분\n• 이전에 교정을 했지만 치아가 다시 벌어진 분 (재교정)\n• 앞니 사이 벌어짐, 삐뚤어짐 등 비교적 간단한 부정교합' }
    ] },
  { slug:'cosmetic', category:'전문센터', title:'심미보철', icon:'fa-gem',
    h1:'심미보철 – 자연스러운 라미네이트·크라운', description:'심미보철 전문. CEREC으로 라미네이트, 올세라믹 크라운, 지르코니아를 당일 맞춤 제작합니다.',
    heroDesc:'디지털 스캔으로 자연스러운 보철을 만듭니다', worry:'"자연스러운 이를 원해요"', promise:'CEREC으로 맞춤 제작, 자연치아와 구분이 어렵습니다',
    features:['라미네이트·올세라믹','CEREC 맞춤 제작','자연치아색 완벽 재현','PrimeScan 디지털 스캔','당일 완성 가능'], isTop:true,
    sections:[
      { title:'심미보철이란?', content:'심미보철은 치아의 기능 회복뿐만 아니라, 형태·색상·배열까지 고려하여 자연치아처럼 아름답게 만드는 보철 치료입니다.\n\n단순히 "씌운다"가 아니라, 환자의 얼굴형, 피부톤, 입술 라인, 웃을 때 보이는 치아의 양 등을 종합적으로 분석하여 가장 자연스럽고 조화로운 결과를 만들어냅니다.\n\n강남치과의원에서는 CEREC 디지털 시스템으로 심미보철을 당일 제작합니다. 디지털 스캔 데이터를 기반으로 컴퓨터가 보철을 설계하므로, 좌우 대칭, 치아 간 간격, 교합 관계 등이 정밀하게 반영됩니다.' },
      { title:'심미보철 치료 종류', content:'<strong>라미네이트</strong>\n치아 표면을 0.3~0.5mm 최소 삭제 후, 얇은 세라믹 판을 접착합니다. 치아의 색상, 형태, 크기를 한 번에 개선할 수 있습니다. 앞니 변색, 형태 불균형, 작은 벌어짐 교정에 효과적입니다.\n\n<strong>올세라믹 크라운</strong>\n금속 없이 세라믹으로만 제작하는 크라운입니다. 빛 투과성이 자연치아와 유사하여 가장 자연스러운 결과를 만듭니다. 앞니 보철에 특히 적합합니다.\n\n<strong>지르코니아 크라운</strong>\n지르코니아는 세라믹 계열 중 가장 높은 강도를 가진 소재입니다. 어금니처럼 강한 교합력이 필요한 부위에 적합하며, 심미성도 우수합니다.\n\n<strong>레진 본딩 (다이렉트 본딩)</strong>\n치아색 복합레진을 직접 치아에 접착하여 형태·색상을 수복합니다. 치아 삭제량이 가장 적으며, 당일 바로 완료됩니다. 작은 결함, 치아 사이 틈 메우기에 적합합니다.' },
      { title:'CEREC 심미보철의 장점', content:'강남치과의원에서는 CEREC 시스템으로 심미보철을 당일 완성합니다.\n\n• <strong>본뜨기 불필요</strong>: PrimeScan 디지털 스캔으로 편하고 정밀하게\n• <strong>당일 완성</strong>: 기공소 외주 없이 원내에서 밀링·소성·장착까지\n• <strong>자연스러운 색상</strong>: 다층 세라믹 블록의 그라데이션이 자연치아 색감 재현\n• <strong>높은 적합도</strong>: 디지털 설계로 치아와 보철 사이 미세 틈 최소화\n• <strong>10년 이상 수명</strong>: 고품질 세라믹 소재로 장기 사용 가능' },
      { title:'이런 분께 추천합니다', content:'• 앞니가 변색되어 웃을 때 신경 쓰이시는 분\n• 오래된 보철(금니, PFM)을 자연스럽게 교체하고 싶으신 분\n• 치아 형태가 불규칙하거나 크기가 작아 고민이신 분\n• 앞니 사이 작은 틈이 있으신 분\n• 결혼, 면접, 중요한 행사를 앞두고 치아 개선을 원하시는 분' }
    ] },
  { slug:'wisdom-tooth', category:'전문센터', title:'사랑니 발치', icon:'fa-hand-holding-medical',
    h1:'사랑니 발치 – 구강외과 전문의 안전 발치', description:'사랑니 발치 전문. 구강악안면외과 전문의가 매복 사랑니도 CT 기반으로 안전하게 발치합니다.',
    heroDesc:'구강외과 전문의가 매복 사랑니도 안전하게 발치합니다', worry:'"사랑니 빼는 게 무서워요"', promise:'외과 전문의가 빠르고 안전하게 발치합니다',
    features:['구강외과 전문의 직접 발치','CT 기반 정밀 진단','매복 사랑니 전문','최소 절개 발치','빠른 회복'], isTop:true,
    sections:[
      { title:'사랑니, 꼭 빼야 하나요?', content:'모든 사랑니를 빼야 하는 것은 아닙니다. 정상적으로 맹출하여 위아래가 맞물리고, 위생 관리가 잘 되는 사랑니는 굳이 뺄 필요 없습니다.\n\n하지만 다음과 같은 경우에는 발치를 권장합니다:\n• <strong>매복 사랑니</strong>: 뼈 속에 묻혀 있거나 비스듬히 자라서 앞 치아를 밀고 있는 경우\n• <strong>반복되는 염증</strong>: 잇몸이 붓고 아프기를 반복하는 경우 (지치주위염)\n• <strong>충치 발생</strong>: 사랑니나 인접 치아에 충치가 생긴 경우\n• <strong>교정 목적</strong>: 교정 치료 전 공간 확보를 위해\n• <strong>낭종 형성</strong>: CT에서 사랑니 주변에 낭종이 발견된 경우\n\n사랑니를 방치하면 인접 치아의 충치, 뼈 흡수, 낭종 등 더 큰 문제가 생길 수 있으므로, 정기 검진을 통해 상태를 확인하는 것이 중요합니다.' },
      { title:'왜 구강외과 전문의에게 받아야 하나요?', content:'사랑니 발치, 특히 매복 사랑니 발치는 단순한 "이 빼기"가 아닙니다. 잇몸을 절개하고, 뼈를 삭제하고, 치아를 분리·발거한 뒤 정밀하게 봉합하는 외과적 수술입니다.\n\n구강외과 전문의는 대학병원에서 수천 건 이상의 발치 수술을 수련한 전문가입니다. 특히 하악 매복 사랑니는 하치조신경(아래턱 신경)과 가까이 있어, CT로 신경관 위치를 정확히 파악한 후 수술해야 합니다.\n\n강남치과의원에서는 모든 사랑니 발치를 구강외과 전문의가 직접 시행합니다. 3D CT로 사전 분석 후, 최소 절개·최소 뼈 삭제로 진행하여 수술 후 부기와 통증을 최소화합니다.' },
      { title:'사랑니 발치 과정', content:'<strong>1단계: CT 촬영 및 진단</strong>\n3D CT로 사랑니의 위치, 방향, 뿌리 형태, 신경관과의 거리를 정확히 파악합니다. 이 정보를 바탕으로 최적의 발치 전략을 수립합니다.\n\n<strong>2단계: 발치 수술 (15~40분)</strong>\n국소마취 후 진행합니다. 매복 정도에 따라 잇몸 절개, 뼈 삭제, 치아 분리 과정이 필요할 수 있습니다. 전문의의 숙련된 기술로 최소한의 시간에 완료합니다.\n\n<strong>3단계: 봉합 및 지혈</strong>\n발치 부위를 정밀하게 봉합합니다. 지혈 거즈를 30분~1시간 물고 계시면 됩니다.\n\n<strong>4단계: 경과 체크 (1주 후)</strong>\n7일 후 내원하여 실밥을 제거하고 경과를 확인합니다.' },
      { title:'발치 후 주의사항', content:'• 발치 당일은 뜨거운 음식, 음주, 격렬한 운동을 피하세요\n• 발치 부위를 혀나 손가락으로 만지지 마세요\n• 처방된 약을 정해진 시간에 복용하세요\n• 부기는 보통 2~3일째 최대가 되고, 이후 점차 빠집니다\n• 아이스팩을 15분씩 대면 부기 완화에 도움이 됩니다\n• 빨대 사용, 강한 가글, 세게 뱉기를 피하세요 (드라이 소켓 예방)' }
    ] },
  { slug:'cavity', category:'일반', title:'충치치료', icon:'fa-tooth', h1:'충치치료 – 당일 발수·근충 가능', description:'충치치료. 레진, 인레이부터 신경치료·크라운까지. CEREC 당일 보철로 한 번에 끝냅니다.',
    heroDesc:'초기 충치부터 심한 충치까지, 당일 치료 가능합니다', worry:'', promise:'',
    features:['당일 발수 가능','CEREC 당일 보철','레진·인레이 수복','통증 최소화'], isTop:false,
    sections:[
      { title:'충치란 무엇인가요?', content:'충치(치아우식증)는 구강 내 세균이 음식물의 당분을 분해하면서 생성하는 산(acid)에 의해 치아가 녹아가는 질환입니다. 전 세계에서 감기 다음으로 흔한 질환이며, 방치하면 통증, 감염, 치아 상실까지 이어질 수 있습니다.\n\n초기 충치는 통증이 없어 스스로 발견하기 어렵습니다. 정기 검진을 통해 초기에 발견하면 간단한 레진 충전으로 해결할 수 있지만, 방치하면 신경치료나 발치가 필요할 수 있습니다.' },
      { title:'충치 단계별 치료', content:'<strong>1단계 — 법랑질 충치 (초기)</strong>\n치아의 가장 바깥층인 법랑질에만 국한된 충치입니다. 통증이 거의 없으며, 충치 부위를 제거하고 치아색 레진으로 메워 당일 치료가 완료됩니다.\n\n<strong>2단계 — 상아질 충치 (중기)</strong>\n법랑질 아래 상아질까지 진행된 충치입니다. 찬 것에 시린 증상이 나타날 수 있습니다. 충치 범위에 따라 레진, 인레이, 또는 크라운으로 수복합니다. CEREC으로 인레이·크라운 당일 완성이 가능합니다.\n\n<strong>3단계 — 신경 근접 충치 (중후기)</strong>\n충치가 신경(치수)에 가까이 도달한 상태입니다. 뜨거운 것에 통증이 있거나, 자발적 통증이 시작됩니다. 신경치료가 필요하며, 이후 크라운으로 치아를 보호합니다.\n\n<strong>4단계 — 치수 감염 / 뿌리끝 감염</strong>\n신경이 완전히 감염되거나, 뿌리끝까지 염증이 퍼진 상태입니다. 근관치료(신경치료)가 반드시 필요하며, 상태에 따라 발치 후 임플란트를 고려합니다.' },
      { title:'강남치과의원의 충치치료 특징', content:'• <strong>당일 치료</strong>: 초기~중기 충치는 첫 방문 당일 레진 치료 가능\n• <strong>CEREC 당일 보철</strong>: 인레이·크라운이 필요한 경우에도 당일 제작·장착\n• <strong>정밀 진단</strong>: 디지털 X-Ray와 구강 카메라로 충치 범위를 정확히 파악\n• <strong>통증 최소화</strong>: 충분한 마취와 섬세한 시술로 치료 중 불편감 최소화\n• <strong>보존치료 우선</strong>: 치아 삭제를 최소화하여 자연치아를 최대한 보존' }
    ] },
  { slug:'root-canal', category:'일반', title:'신경치료', icon:'fa-syringe', h1:'신경치료 – 정밀 근관 치료', description:'신경치료(근관치료). 감염된 신경을 제거하고, CEREC 당일 보철로 치아를 보호합니다.',
    heroDesc:'정밀한 근관 치료로 자연치아를 최대한 보존합니다', worry:'', promise:'',
    features:['정밀 근관 치료','자연치아 보존','CT 기반 진단','크라운 당일 완성 가능'], isTop:false,
    sections:[
      { title:'신경치료란?', content:'신경치료(근관치료)는 충치나 외상으로 치아 내부의 신경(치수)이 감염·괴사된 경우, 감염된 신경 조직을 제거하고 근관(신경이 지나가는 통로) 내부를 소독·충전하는 치료입니다.\n\n"신경치료 = 이를 빼는 것"이라고 오해하시는 분이 많지만, 사실 신경치료의 목적은 <strong>자연치아를 최대한 살리는 것</strong>입니다. 감염된 신경만 제거하고, 치아의 외형은 그대로 보존합니다.\n\n신경치료 후에는 치아가 약해지므로, 크라운(씌우기)으로 보호하는 것이 필수입니다. 강남치과의원에서는 CEREC으로 당일 크라운까지 완성할 수 있습니다.' },
      { title:'신경치료가 필요한 경우', content:'• 충치가 깊어 신경까지 도달한 경우\n• 치아를 세게 부딪혀 신경이 손상된 경우 (외상)\n• 잇몸 위로 뿌리끝에 고름이 잡히는 경우\n• 아무것도 안 해도 욱신거리는 자발통이 있는 경우\n• 뜨거운 것에 심한 통증을 느끼는 경우\n• 치아 색이 검게 변한 경우 (신경 괴사)' },
      { title:'신경치료 과정', content:'<strong>1회차: 신경 제거 및 근관 확대</strong>\n마취 후 충치를 제거하고, 치아 내부의 감염된 신경 조직을 제거합니다. 근관의 길이를 측정하고, 전용 기구로 근관 내부를 확대·성형합니다.\n\n<strong>2~3회차: 소독 및 충전</strong>\n근관 내부를 약제로 소독합니다. 염증이 심한 경우 여러 차례 소독이 필요할 수 있습니다. 충분히 소독된 후 근관을 충전재(거타퍼차)로 밀봉합니다.\n\n<strong>마무리: 크라운 제작 및 장착</strong>\n신경치료가 완료된 치아는 수분이 줄어 약해지므로, 크라운으로 씌워 보호해야 합니다. CEREC 시스템으로 당일 크라운 완성이 가능합니다.' }
    ] },
  { slug:'crown', category:'일반', title:'크라운', icon:'fa-crown', h1:'크라운 – CEREC 당일 완성', description:'크라운 치료. CEREC 시스템으로 올세라믹·지르코니아 크라운을 당일 디지털 제작합니다.',
    heroDesc:'CEREC으로 하루 만에 크라운을 완성합니다', worry:'', promise:'',
    features:['CEREC 당일 완성','올세라믹·지르코니아','자연스러운 색상','정밀 디지털 제작'], isTop:false,
    sections:[
      { title:'크라운이란?', content:'크라운(Crown)은 손상된 치아 전체를 덮어씌우는 보철물입니다. 치아의 형태, 기능, 심미성을 한꺼번에 회복시킵니다.\n\n쉽게 말해 "치아에 씌우는 모자"입니다. 충치가 심하거나, 신경치료 후 약해진 치아, 깨진 치아 등을 크라운으로 보호하면 치아를 발치하지 않고 오래 사용할 수 있습니다.' },
      { title:'크라운이 필요한 경우', content:'• 신경치료 후 치아 보호가 필요한 경우 (필수)\n• 충치가 넓어 레진이나 인레이로 수복하기 어려운 경우\n• 치아가 깨지거나 금이 간 경우\n• 오래된 보철(금니, 은합금)을 자연스러운 색상으로 교체하고 싶은 경우\n• 임플란트 위에 최종 보철물로 장착하는 경우\n• 치아 형태나 색상을 개선하고 싶은 경우 (심미 크라운)' },
      { title:'CEREC 당일 크라운의 장점', content:'기존 방식으로 크라운을 만들면, 본을 뜨고 → 기공소에 보내고 → 7~14일 기다린 후 → 재내원하여 장착해야 했습니다. 그 사이 임시치아가 빠지거나 불편한 경우도 잦았습니다.\n\nCEREC 당일 크라운은 이 모든 과정이 하루 만에 끝납니다:\n1. PrimeScan 디지털 스캔 (5분) — 본뜨기 불필요\n2. 컴퓨터 보철 설계 (10분)\n3. CEREC MC X 밀링 제작 (15분)\n4. SpeedFire 소성 (15분)\n5. 최종 장착 (10분)\n\n디지털 제작이라 정밀도가 높고, 자연치아 색감에 가까운 세라믹 보철을 바로 장착할 수 있습니다.' },
      { title:'크라운 소재 비교', content:'<strong>올세라믹</strong>: 빛 투과성이 자연치아와 유사. 앞니에 최적. 심미성 최고.\n<strong>지르코니아</strong>: 세라믹 중 가장 높은 강도. 어금니에 적합. 심미성도 우수.\n<strong>PFM (도재)</strong>: 금속 위에 도재를 덧씌운 전통적 크라운. 잇몸 라인에 금속 비침 가능.\n<strong>금 크라운</strong>: 생체친화성 우수. 교합 적합성 좋음. 심미성은 떨어짐.\n\n강남치과의원에서는 올세라믹과 지르코니아 크라운을 CEREC으로 당일 제작합니다.' }
    ] },
  { slug:'resin', category:'일반', title:'레진', icon:'fa-fill-drip', h1:'레진치료 – 자연치아색 수복', description:'레진치료. 자연치아색 복합레진으로 충치, 깨진 치아, 치아 틈을 당일 수복합니다.',
    heroDesc:'자연치아색 레진으로 깨끗하게 수복합니다', worry:'', promise:'',
    features:['자연치아색 매칭','최소 삭제','당일 치료 가능','심미성 우수'], isTop:false,
    sections:[
      { title:'레진치료란?', content:'레진(Resin) 치료는 치아색 복합레진이라는 재료로 충치 부위를 메우거나, 깨진 치아를 수복하는 치료입니다. 아말감(은색)이나 금 인레이와 달리, 치아와 거의 동일한 색상을 가지고 있어 치료 흔적이 거의 보이지 않습니다.\n\n레진은 빛을 쏘면 단단하게 굳는 "광중합" 방식이라, 치과에서 바로 충전하고 당일 치료가 완료됩니다. 충치 부위만 최소한으로 삭제하므로 건강한 치아 조직을 최대한 보존할 수 있는 것도 큰 장점입니다.' },
      { title:'레진치료가 적합한 경우', content:'• 초기~중기 충치(법랑질, 상아질 충치)\n• 작은 치아 파절(깨짐)\n• 앞니 사이 작은 틈 메우기\n• 오래된 아말감(은색 충전물) 교체\n• 치아 표면의 미세한 결함 수복\n• 치경부 마모 (잇몸 경계부 패임) 수복' },
      { title:'레진 vs 인레이, 뭐가 다른가요?', content:'<strong>레진 (Direct 수복)</strong>: 의사가 치아에 직접 레진을 채우고 광조사하여 경화. 당일 완료. 비교적 작은 충치에 적합.\n\n<strong>인레이 (Indirect 수복)</strong>: 충치 부위를 본뜨거나 스캔한 후, 별도로 제작한 보철물을 접착. CEREC으로 당일 제작 가능. 넓은 충치에 적합하며 강도가 레진보다 높음.\n\n일반적으로 충치 범위가 치아 면적의 1/3 이하이면 레진, 그 이상이면 인레이나 크라운을 권장합니다. 정밀 진단 후 가장 적합한 방법을 안내드립니다.' }
    ] },
  { slug:'whitening', category:'일반', title:'미백', icon:'fa-sun', h1:'치아미백 – 전문의 관리 미백', description:'치아미백. 전문의 관리 하에 안전하고 효과적인 전문가 미백, 자가 미백, 듀얼 미백을 제공합니다.',
    heroDesc:'전문의 관리 하에 안전하고 효과적인 미백', worry:'', promise:'',
    features:['전문의 관리 미백','안전한 미백 약제','자연스러운 화이트닝','시린 증상 최소화'], isTop:false,
    sections:[
      { title:'치아미백이란?', content:'치아미백은 착색되거나 변색된 치아의 색상을 밝게 개선하는 시술입니다. 미백 약제(과산화수소 또는 과산화요소)가 치아 내부의 색소 분자를 분해하여 치아를 하얗게 만듭니다.\n\n커피, 차, 와인, 흡연 등으로 인한 외인성 착색은 물론, 노화로 인한 자연스러운 변색도 개선할 수 있습니다. 치아 조직을 손상시키지 않는 안전한 시술이지만, 전문의의 관리 하에 적절한 농도와 방법으로 시행하는 것이 중요합니다.' },
      { title:'미백 방법', content:'<strong>전문가 미백 (오피스 미백)</strong>\n병원에서 고농도 미백제를 치아에 도포한 후 전용 LED 광선을 조사하여 미백 효과를 극대화합니다. 1회 시술에 약 1시간 소요되며, 즉각적인 미백 효과를 볼 수 있습니다. 보통 2~3회 시술을 권장합니다.\n\n<strong>자가 미백 (홈 미백)</strong>\n환자의 치아에 맞는 맞춤 트레이를 제작한 뒤, 저농도 미백 젤을 넣어 가정에서 착용합니다. 하루 2~4시간 또는 취침 시 착용하며, 2~4주간 진행합니다. 전문가 미백보다 점진적이지만, 효과가 오래 유지됩니다.\n\n<strong>듀얼 미백 (전문가 + 자가 병행)</strong>\n전문가 미백으로 빠른 효과를 얻고, 자가 미백으로 유지·강화하는 방법입니다. 가장 효과적이고 오래 지속되는 미백 방법입니다.' },
      { title:'미백 시 주의사항', content:'• 미백 직후 24~48시간은 색소가 많은 음식(커피, 카레, 콜라 등) 섭취를 피하세요\n• 일시적으로 시린 증상이 나타날 수 있으며, 보통 1~2일 내 사라집니다\n• 보철물(크라운, 레진 등)은 미백되지 않으므로, 미백 후 색 차이가 생길 수 있습니다\n• 임산부, 수유 중인 분, 14세 미만은 미백을 권장하지 않습니다\n• 미백 효과는 생활 습관에 따라 6개월~2년간 유지되며, 터치업으로 유지 가능합니다' }
    ] },
  { slug:'scaling', category:'잇몸/외과', title:'스케일링', icon:'fa-teeth-open', h1:'스케일링 – 잇몸 건강 관리', description:'스케일링. 건강보험 적용(연 1회). 정기적인 치석 제거로 잇몸질환을 예방합니다.',
    heroDesc:'정기적인 스케일링으로 잇몸 건강을 지킵니다', worry:'', promise:'',
    features:['건강보험 적용 (연 1회)','치석·치태 제거','잇몸 질환 예방','구취 개선'], isTop:false,
    sections:[
      { title:'스케일링이란?', content:'스케일링은 칫솔질만으로는 제거되지 않는 치석(치아에 단단하게 굳은 세균 덩어리)을 초음파 기구로 제거하는 시술입니다.\n\n치태(플라그)가 제거되지 않고 48시간 이상 방치되면 타액 속 칼슘과 결합하여 단단한 치석으로 변합니다. 치석은 칫솔질로 절대 제거되지 않으며, 치과에서 전용 기구로만 제거할 수 있습니다.\n\n치석은 잇몸 염증(치은염)과 잇몸질환(치주염)의 주요 원인입니다. 정기적인 스케일링은 잇몸 건강의 기본이자, 치아를 오래 보존하는 가장 효과적인 방법입니다.' },
      { title:'스케일링이 필요한 신호', content:'• 잇몸에서 피가 나는 경우 (칫솔질, 치실 사용 시)\n• 잇몸이 붓거나 빨갛게 변한 경우\n• 입 냄새가 나는 경우\n• 치아 사이에 검은 덩어리가 보이는 경우\n• 치아가 길어진 느낌이 드는 경우 (잇몸이 내려감)\n• 6개월 이상 스케일링을 받지 않은 경우' },
      { title:'건강보험 적용 안내', content:'만 19세 이상 성인은 <strong>연 1회 건강보험으로 스케일링</strong>을 받으실 수 있습니다. 본인부담금은 약 15,000~20,000원 수준입니다.\n\n건강보험 적용 기간은 매년 1월 1일부터 12월 31일까지이며, 연도가 바뀌면 다시 1회 적용됩니다. 올해 아직 스케일링을 받지 않으셨다면, 연말이 지나기 전에 받으시는 것을 권합니다.\n\n잇몸 상태에 따라 추가적인 치석 제거(치은연하 소파술)가 필요할 수 있으며, 이 경우에도 건강보험이 적용됩니다.' }
    ] },
  { slug:'gum', category:'잇몸/외과', title:'잇몸치료', icon:'fa-droplet', h1:'잇몸치료 – 치주 관리', description:'잇몸치료. 치은염부터 중증 치주염까지 단계별로 치료하고, 정기 관리로 재발을 방지합니다.',
    heroDesc:'잇몸 염증부터 치주질환까지 체계적으로 관리합니다', worry:'', promise:'',
    features:['치주 정밀 검사','비수술적 잇몸치료','치주 수술','정기 관리 프로그램'], isTop:false,
    sections:[
      { title:'잇몸질환이란?', content:'잇몸질환(치주질환)은 치아를 둘러싸고 있는 잇몸과 잇몸뼈(치조골)에 염증이 생기는 질환입니다. 한국 성인의 약 80%가 경험하는 매우 흔한 질환이지만, 초기에는 통증이 없어 방치하기 쉽습니다.\n\n<strong>치은염 (초기)</strong>: 잇몸에만 염증이 국한된 상태. 잇몸이 붓고 칫솔질 시 피가 납니다. 스케일링과 올바른 구강 관리로 완치 가능.\n\n<strong>치주염 (진행)</strong>: 염증이 잇몸뼈까지 진행된 상태. 뼈가 녹아 치아가 흔들리기 시작합니다. 전문적인 치주치료가 필요합니다.\n\n무서운 점은 녹은 뼈는 자연적으로 다시 생기지 않는다는 것입니다. 따라서 조기 발견과 치료가 매우 중요합니다.' },
      { title:'잇몸질환 증상 체크리스트', content:'다음 중 2개 이상 해당되면 잇몸 검진을 받아보시기를 권합니다:\n\n• 칫솔질 시 잇몸에서 피가 남\n• 잇몸이 빨갛게 붓거나 물렁물렁해짐\n• 입 냄새가 지속됨\n• 이가 흔들리는 느낌\n• 치아 사이가 벌어짐\n• 잇몸이 내려앉아 치아 뿌리가 보임\n• 씹을 때 통증이 있음\n• 잇몸에서 고름이 나옴' },
      { title:'잇몸치료 과정', content:'<strong>1단계: 정밀 검사</strong>\n치주낭(잇몸과 치아 사이의 틈) 깊이를 측정하고, X-Ray로 잇몸뼈 흡수 정도를 확인합니다. 정상 치주낭 깊이는 1~3mm이며, 4mm 이상이면 치주치료가 필요합니다.\n\n<strong>2단계: 비수술적 치주치료 (스케일링 + 치근활택술)</strong>\n잇몸 아래 깊숙이 쌓인 치석과 오염물질을 제거합니다. 치아 뿌리 표면을 매끄럽게 다듬어 세균이 다시 부착하기 어렵게 만듭니다. 보통 4회에 나눠 부분별로 진행합니다.\n\n<strong>3단계: 재평가</strong>\n비수술 치료 후 4~6주 뒤 치주낭 깊이를 다시 측정합니다. 개선되지 않은 부위는 치주 수술을 고려합니다.\n\n<strong>4단계: 유지 관리</strong>\n치주치료 후에는 3~6개월마다 정기적인 유지 관리(치주 스케일링)가 필수입니다. 잇몸질환은 "완치"보다 "관리"가 핵심입니다.' }
    ] },
  { slug:'tmj', category:'잇몸/외과', title:'턱관절', icon:'fa-head-side-medical', h1:'턱관절 치료', description:'턱관절 치료. 턱관절 통증, 소리, 개구장애를 정밀 진단하고 맞춤 치료합니다.',
    heroDesc:'턱관절 통증, 소리, 개구장애를 전문적으로 치료합니다', worry:'', promise:'',
    features:['정밀 턱관절 검사','스플린트 치료','약물 치료','생활습관 교정 지도'], isTop:false,
    sections:[
      { title:'턱관절 질환이란?', content:'턱관절(측두하악관절, TMJ) 질환은 턱을 움직이는 관절과 주변 근육에 이상이 생긴 것을 통칭합니다. 귀 바로 앞에 위치한 턱관절은 하루에도 수천 번 움직이는데, 이곳에 문제가 생기면 통증, 소리, 움직임 제한 등 다양한 증상이 나타납니다.\n\n스트레스, 이갈이, 이 악물기, 편측 저작 습관, 외상, 부정교합 등이 원인이 될 수 있으며, 현대인에게 매우 흔한 질환입니다.' },
      { title:'턱관절 질환 증상', content:'• 입을 벌리거나 다물 때 턱에서 "딱딱" 또는 "사각사각" 소리가 남\n• 입을 크게 벌릴 수 없음 (개구 제한)\n• 턱 주변, 귀 앞, 관자놀이 부위에 통증\n• 씹을 때 턱이 아픔\n• 아침에 일어나면 턱이 뻣뻣하고 아픔\n• 두통, 귀 통증, 목 통증이 동반됨\n• 턱이 빠지는 느낌 (탈구)\n• 입을 벌릴 때 턱이 한쪽으로 틀어짐' },
      { title:'턱관절 치료 방법', content:'<strong>스플린트(교합안정장치) 치료</strong>\n가장 기본적인 치료법입니다. 환자 맞춤형 스플린트를 제작하여 취침 시 착용합니다. 턱관절에 가해지는 압력을 분산시키고, 근육 긴장을 완화합니다.\n\n<strong>약물 치료</strong>\n근이완제, 소염진통제 등을 처방하여 급성 통증과 염증을 조절합니다.\n\n<strong>물리치료 및 생활습관 교정</strong>\n턱 스트레칭 운동, 온열 요법, 마사지 등을 안내합니다. 이갈이·이 악물기 등 악습관 인지 및 교정을 병행합니다.\n\n<strong>교합 조정</strong>\n부정교합이 턱관절 질환의 원인인 경우, 교합을 조정하여 균형 잡힌 씹기가 가능하도록 합니다.' }
    ] },
  { slug:'bone-graft', category:'특수', title:'뼈이식 임플란트', icon:'fa-bone', h1:'뼈이식 임플란트 – 구강외과 전문의', description:'뼈이식 임플란트. 구강외과 전문의가 부족한 뼈를 보충하여 안전하게 임플란트를 식립합니다.',
    heroDesc:'뼈가 부족해도 임플란트가 가능합니다', worry:'', promise:'',
    features:['구강외과 전문의 수술','자가골·인공골 이식','동시 임플란트 가능','CT 기반 정밀 계획'], isTop:false,
    sections:[
      { title:'뼈이식이란?', content:'뼈이식(Bone Graft)은 임플란트를 심기에 턱뼈가 부족한 경우, 뼈 이식재를 이용하여 뼈의 양을 보충하는 수술입니다.\n\n임플란트가 안정적으로 유지되려면 일정 두께와 높이의 턱뼈가 필요합니다. 하지만 치아를 빼고 오래 방치하면 뼈가 흡수되어 얇아지거나 낮아질 수 있습니다. 이런 경우 뼈이식 없이 임플란트를 심으면 실패 확률이 높아집니다.\n\n"뼈가 부족하다"는 이유로 다른 치과에서 임플란트를 거절당하셨다면, 구강외과 전문의와 상담해 보시기 바랍니다. 뼈이식은 구강외과 전문의의 전문 영역입니다.' },
      { title:'뼈이식이 필요한 경우', content:'• 치아를 빼고 오래(수개월~수년) 방치하여 뼈가 흡수된 경우\n• 잇몸질환(치주염)으로 뼈가 녹은 경우\n• 선천적으로 턱뼈가 얇은 경우\n• 외상으로 턱뼈가 손상된 경우\n• 상악(윗턱) 어금니 부위의 뼈가 얇은 경우 (상악동 거상술 필요)\n• 이전 임플란트 실패 후 재수술이 필요한 경우' },
      { title:'뼈이식 수술 방법', content:'<strong>자가골 이식</strong>: 환자 본인의 뼈(보통 하악 하연이나 상행지)를 채취하여 이식합니다. 생착률이 가장 높지만, 채취 부위의 추가 수술이 필요합니다.\n\n<strong>동종골 이식</strong>: 인체 뼈를 가공·멸균 처리한 이식재를 사용합니다. 추가 수술 없이 사용 가능합니다.\n\n<strong>이종골 이식</strong>: 소뼈 등을 가공한 이식재입니다. 가장 널리 사용되며, 안전성이 입증되었습니다.\n\n<strong>합성골 이식</strong>: 인공적으로 제조한 뼈 이식재입니다.\n\n뼈이식 수술은 경우에 따라 임플란트 식립과 동시에 진행할 수 있어, 전체 치료 기간을 단축할 수 있습니다. 3D CT 분석을 통해 최적의 방법을 결정합니다.' }
    ] },
  { slug:'sinus-lift', category:'특수', title:'상악동 임플란트', icon:'fa-lungs', h1:'상악동 거상술 임플란트', description:'상악동 거상술. 구강외과 전문의가 윗턱 뼈가 부족한 경우 상악동 점막을 올려 안전하게 임플란트를 식립합니다.',
    heroDesc:'위턱 뼈가 부족해도 안전하게 임플란트가 가능합니다', worry:'', promise:'',
    features:['상악동 거상술 전문','구강외과 전문의 수술','CT 정밀 계획','뼈이식 동시 시행'], isTop:false,
    sections:[
      { title:'상악동 거상술이란?', content:'상악동(부비강)은 윗어금니 뿌리 위에 위치한 빈 공간입니다. 윗어금니를 빼고 오래 방치하면, 상악동이 아래로 내려오면서 뼈가 매우 얇아집니다. 이 상태에서는 임플란트를 심을 공간이 부족합니다.\n\n상악동 거상술(Sinus Lift)은 상악동 점막을 위로 올리고, 그 공간에 뼈 이식재를 넣어 임플란트를 심을 수 있는 충분한 뼈를 만드는 수술입니다.\n\n이 수술은 구강악안면외과의 전문 영역으로, 상악동 점막을 손상시키지 않으면서 정밀하게 거상하는 기술이 필요합니다. 강남치과의원에서는 구강외과 전문의가 3D CT 분석을 기반으로 안전하게 시행합니다.' },
      { title:'상악동 거상술 종류', content:'<strong>측방접근법 (Lateral Approach)</strong>\n잇몸과 뼈를 옆에서 열어 상악동에 접근하는 방법입니다. 뼈가 많이 부족한 경우(잔존 뼈 높이 5mm 미만)에 사용합니다. 더 많은 뼈이식이 가능하며, 뼈 생착 후 임플란트를 식립합니다.\n\n<strong>치조정접근법 (Crestal Approach)</strong>\n임플란트를 심는 구멍을 통해 상악동 점막을 올리는 방법입니다. 잔존 뼈가 어느 정도 있는 경우(5mm 이상)에 사용합니다. 절개 범위가 작아 회복이 빠르며, 임플란트 식립과 동시에 진행할 수 있습니다.' },
      { title:'수술 후 주의사항', content:'• 수술 후 2~3주간 코를 세게 풀지 마세요 (상악동 압력 변화 방지)\n• 빨대 사용, 풍선 불기 등 압력이 가해지는 행위를 피하세요\n• 재채기를 참지 말고, 입을 벌리고 하세요\n• 수술 부위를 손가락이나 혀로 만지지 마세요\n• 처방된 항생제와 진통제를 정해진 대로 복용하세요\n• 뼈 이식재가 안정되려면 약 4~6개월의 치유 기간이 필요합니다' }
    ] },
  { slug:'denture', category:'특수', title:'틀니', icon:'fa-teeth', h1:'틀니 – 맞춤형 제작', description:'틀니 맞춤 제작. 전체틀니, 부분틀니, 임플란트 틀니까지. 만 65세 이상 건강보험 적용.',
    heroDesc:'편안하고 잘 맞는 맞춤형 틀니를 제작합니다', worry:'', promise:'',
    features:['정밀 맞춤 제작','부분틀니·전체틀니','임플란트 틀니','건강보험 적용'], isTop:false,
    sections:[
      { title:'틀니란?', content:'틀니(의치)는 상실된 여러 개의 치아를 대체하기 위해 탈착 가능한 보철물입니다. 임플란트에 비해 수술 없이 제작할 수 있어, 전신 건강 상태가 수술에 적합하지 않거나 경제적 부담을 줄이고 싶은 분에게 좋은 선택입니다.\n\n최근 틀니 기술은 크게 발전하여, 과거의 딱딱하고 불편한 틀니와는 다릅니다. 정밀한 맞춤 제작과 새로운 소재 활용으로 편안하고 자연스러운 틀니를 만들 수 있습니다.' },
      { title:'틀니 종류', content:'<strong>전체 틀니 (Complete Denture)</strong>\n치아가 모두 없는 경우에 사용합니다. 잇몸과 구개(입천장)에 흡착되어 유지됩니다.\n\n<strong>부분 틀니 (Partial Denture)</strong>\n일부 치아만 없는 경우에 사용합니다. 남아있는 치아에 걸쇠(클래스프)를 걸어 고정합니다.\n\n<strong>임플란트 틀니 (Implant Overdenture)</strong>\n2~4개의 임플란트를 심은 뒤, 그 위에 틀니를 고정하는 방법입니다. 일반 틀니보다 월등히 안정적이어서 씹는 힘이 강하고, 빠질 걱정이 적습니다. 잘 안 맞는 틀니로 고생하시는 분께 특히 추천합니다.' },
      { title:'건강보험 적용 안내', content:'<strong>만 65세 이상</strong>이면 틀니 제작 시 건강보험이 적용됩니다.\n\n• 부분틀니: 본인부담금 약 30~50만 원 (보험 적용 시)\n• 전체틀니: 본인부담금 약 40~60만 원 (보험 적용 시)\n• 적용 주기: 7년에 1회\n\n정확한 본인부담금은 틀니 종류와 재료에 따라 달라지므로, 내원하셔서 상담받으시기를 권합니다.' },
      { title:'틀니 관리 방법', content:'• 매일 흐르는 물에서 틀니 전용 브러시로 세척하세요\n• 취침 시에는 틀니를 빼고 물에 담가 보관하세요 (건조 방지)\n• 주 2~3회 틀니 세정제를 사용하면 세균 번식을 방지할 수 있습니다\n• 뜨거운 물에 담그면 틀니가 변형될 수 있으니 미지근한 물을 사용하세요\n• 틀니가 깨지거나 금이 갔다면 직접 접착하지 말고 치과를 방문하세요\n• 6개월~1년마다 치과를 방문하여 틀니 적합도를 확인하세요 (잇몸 변화로 헐거워질 수 있음)' }
    ] },
  { slug:'prevention', category:'특수', title:'예방치료', icon:'fa-shield-halved', h1:'예방치료 – 정기검진', description:'예방치료. 정기검진, 불소 도포, 실란트, 구강위생 교육으로 치아와 잇몸 건강을 지킵니다.',
    heroDesc:'정기적인 검진과 관리로 구강 건강을 지킵니다', worry:'', promise:'',
    features:['정기 구강검진','불소 도포','실란트','구강위생 교육'], isTop:false,
    sections:[
      { title:'예방이 최고의 치료입니다', content:'치과 치료의 핵심은 "아프기 전에 예방하는 것"입니다. 정기 검진을 통해 충치와 잇몸질환을 초기에 발견하면, 간단한 치료로 해결할 수 있고, 비용과 시간을 크게 절약할 수 있습니다.\n\n초기 충치는 통증이 전혀 없습니다. 잇몸질환도 초기에는 자각 증상이 거의 없습니다. "아프지 않으니까 괜찮겠지"가 아니라, "아프기 전에 확인하자"가 맞는 접근입니다.\n\n6개월마다 정기 검진을 받으시면, 작은 문제를 미리 잡을 수 있습니다. 강남치과의원에서는 3D CT, 디지털 X-Ray, 구강 카메라로 정밀한 검진을 제공합니다.' },
      { title:'예방치료 종류', content:'<strong>정기 구강검진</strong>\n시각적 검사, 방사선 검사, 치주 검사를 통해 구강 전체 상태를 종합적으로 평가합니다. 문제가 발견되면 즉시 치료 계획을 안내드립니다.\n\n<strong>스케일링</strong>\n치석을 제거하여 잇몸 질환을 예방합니다. 만 19세 이상 성인은 연 1회 건강보험이 적용됩니다.\n\n<strong>불소 도포</strong>\n고농도 불소를 치아 표면에 도포하여 법랑질을 강화하고 충치를 예방합니다. 어린이뿐 아니라 성인에게도 효과적이며, 특히 치근 노출(잇몸 퇴축)이 있는 경우 권장됩니다.\n\n<strong>실란트 (치아 홈 메우기)</strong>\n어금니의 깊은 홈에 레진 재료를 메워 음식물과 세균이 끼는 것을 방지합니다. 주로 어린이의 영구치 맹출 직후에 시행하며, 충치 예방 효과가 뛰어납니다.\n\n<strong>구강위생 교육</strong>\n올바른 칫솔질 방법, 치실·치간칫솔 사용법, 식습관 개선 등을 1:1로 안내드립니다.' },
      { title:'정기 검진 권장 주기', content:'• <strong>일반 성인</strong>: 6개월~1년마다\n• <strong>잇몸질환 치료 후</strong>: 3~6개월마다\n• <strong>임플란트 보유자</strong>: 6개월마다\n• <strong>교정 치료 중</strong>: 4~8주마다\n• <strong>당뇨 등 전신질환</strong>: 3~6개월마다\n• <strong>흡연자</strong>: 6개월마다 (치주질환 위험 2~6배 증가)\n\n정기 검진은 치아를 오래 보존하는 가장 확실한 방법입니다. 상담은 언제든 열려있습니다.' }
    ] }
]

export function treatmentsPage(): string {
  const cats = ['전문센터','일반','잇몸/외과','특수']
  const catIcons: Record<string, string> = { '전문센터':'fa-star', '일반':'fa-tooth', '잇몸/외과':'fa-hand-holding-medical', '특수':'fa-award' }
  const catDescs: Record<string, string> = { '전문센터':'구강외과 전문의가 직접 진료하는 주력 진료', '일반':'기본적인 구강 건강을 위한 필수 진료', '잇몸/외과':'잇몸 건강과 외과적 치료', '특수':'전문적인 치과 치료 서비스' }
  return `
  <!-- Hero (White) -->
  <section class="relative min-h-[65vh] flex items-end subpage-hero overflow-hidden" aria-label="전체 진료 안내 히어로">
    <div class="absolute inset-0 z-[1]">
      <img src="/static/photos/Wpp3wlfj.jpg" alt="강남치과의원 진료실" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-b from-white/92 via-white/75 to-white"></div>
    </div>
    <div class="orb orb-royal w-[600px] h-[600px] -top-64 -right-64 opacity-30 z-[2]"></div>
    <div class="absolute inset-0 grid-pattern opacity-40 z-[2]"></div>

    <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-48 w-full">
      <div class="section-label section-label-royal mb-8"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>ALL TREATMENTS</div>
      <h1 class="display-xl text-charcoal mb-6" data-speakable="true">전체 <span class="royal-grad-text">진료 안내</span></h1>
      <p class="text-gray-400 text-lg max-w-lg" data-speakable="true">영주 강남치과의원 — 구강외과 전문의 2인이 직접 진료하는<br>프리미엄 치과진료 서비스</p>
    </div>
  </section>

  <!-- Treatment categories -->
  <section class="py-20 md:py-32 bg-white">
    <div class="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
      ${cats.map(cat => {
        const items = treatments.filter(t => t.category === cat)
        return `
        <div class="mb-20 reveal">
          <div class="flex items-center gap-4 mb-10">
            <div class="w-12 h-12 rounded-2xl ${cat === '전문센터' ? 'royal-grad royal-glow' : 'bg-snow-100 border border-gray-100'} flex items-center justify-center">
              <i class="fas ${catIcons[cat]} ${cat === '전문센터' ? 'text-white' : 'text-gray-400'} text-base"></i>
            </div>
            <div>
              <h2 class="text-xl font-extrabold text-charcoal">${cat}</h2>
              <p class="text-gray-400 text-sm">${catDescs[cat]}</p>
            </div>
            <div class="flex-1 h-px bg-gradient-to-r from-gray-100 to-transparent ml-4"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            ${items.map(t => `
            <a href="/treatments/${t.slug}" class="card-premium p-6 flex items-center gap-4 group stagger-item block">
              <div class="w-13 h-13 rounded-xl ${t.isTop ? 'royal-grad royal-glow' : 'bg-snow-50 border border-gray-100'} flex items-center justify-center flex-shrink-0" style="width:52px;height:52px;">
                <i class="fas ${t.icon} ${t.isTop ? 'text-white' : 'text-gray-400'} text-lg"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-charcoal group-hover:text-royal transition-colors duration-300 truncate">${t.title}</h3>
                <p class="text-gray-400 text-xs mt-1 truncate">${t.heroDesc}</p>
              </div>
              <i class="fas fa-chevron-right text-gray-200 group-hover:text-royal group-hover:translate-x-1 transition-all duration-300 text-xs"></i>
            </a>
            `).join('')}
          </div>
        </div>
        `
      }).join('')}
    </div>
  </section>

  <!-- CTA (White) -->
  <section class="py-28 md:py-36 section-snow relative overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
        <i class="fas fa-stethoscope text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6">어떤 치료가 필요한지<br><span class="royal-grad-text">모르겠다면?</span></h2>
      <p class="text-gray-400 text-lg mb-10">구강외과 전문의가 직접 진단하고 최적의 치료를 안내드립니다.<br>일상으로의 빠른 복귀, 강남치과의 기쁨입니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `
}

export function treatmentDetailPage(slug: string): { html: string; title: string; description: string; schemas: object[] } | null {
  const t = treatments.find(tr => tr.slug === slug)
  if (!t) return null

  // MedicalProcedure Schema for each treatment
  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": t.title,
    "alternateName": t.h1,
    "description": t.description,
    "procedureType": t.slug === 'implant' || t.slug === 'wisdom-tooth' || t.slug === 'bone-graft' || t.slug === 'sinus-lift' ? "Surgical" : "Noninvasive",
    "howPerformed": t.heroDesc,
    "url": `https://gndentalclinic.com/treatments/${t.slug}`,
    "bodyLocation": "Mouth",
    "preparation": "3D CT 촬영 및 정밀 진단, 전문의 상담",
    "followup": "정기 경과 관찰",
    "status": "https://schema.org/ActiveActionStatus",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://gndentalclinic.com/treatments/${t.slug}`
    }
  }

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${t.title} - 강남치과의원`,
    "description": t.description,
    "provider": {
      "@id": "https://gndentalclinic.com/#organization"
    },
    "areaServed": {
      "@type": "City",
      "name": "영주시"
    },
    "serviceType": "Dental Service",
    "category": t.category
  }

  return {
    title: t.h1, description: t.description,
    schemas: [medicalProcedureSchema, serviceSchema],
    html: `
    <!-- Hero (White) -->
    <section class="relative min-h-[60vh] flex items-end subpage-hero overflow-hidden">
      <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
      <div class="absolute inset-0 grid-pattern opacity-30"></div>

      <div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 pb-24 pt-44 w-full">
        <a href="/treatments" class="inline-flex items-center gap-2 text-gray-400 hover:text-royal transition-colors text-sm mb-8 font-medium">
          <i class="fas fa-arrow-left text-xs"></i>전체 진료 안내
        </a>
        <div class="flex items-center gap-3 mb-6">
          <span class="px-4 py-1.5 rounded-full bg-royal/[0.06] border border-royal/[0.1] text-royal text-[11px] font-bold tracking-wide">${t.category}</span>
          ${t.isTop ? '<span class="px-4 py-1.5 rounded-full bg-royal/10 text-royal text-[11px] font-bold">주력 진료</span>' : ''}
        </div>
        <h1 class="display-lg text-charcoal mb-6">${t.h1}</h1>
        <p class="text-gray-400 text-lg max-w-2xl">${t.heroDesc}</p>
      </div>
    </section>

    ${t.worry ? `
    <!-- Promise bar -->
    <section class="py-10 bg-royal/[0.03] border-b border-royal/[0.08] relative">
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 relative">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-1 text-center md:text-left">
            <p class="text-royal text-lg italic font-medium mb-2">${t.worry}</p>
            <p class="text-charcoal text-xl md:text-2xl font-extrabold">${t.promise}</p>
          </div>
          <a href="/reservation" class="btn-primary !text-sm flex-shrink-0"><i class="fas fa-calendar-check text-xs"></i>상담 예약</a>
        </div>
      </div>
    </section>` : ''}

    <!-- Features -->
    <section class="py-20 md:py-28 bg-white">
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20 stagger-children">
          ${t.features.map(f => `
          <div class="text-center p-5 card-premium stagger-item">
            <div class="w-10 h-10 mx-auto rounded-xl royal-grad flex items-center justify-center mb-3 royal-glow">
              <i class="fas fa-check text-white text-xs"></i>
            </div>
            <p class="text-xs font-bold text-charcoal leading-tight">${f}</p>
          </div>
          `).join('')}
        </div>

        <div class="space-y-16">
          ${t.sections.map((s, i) => `
          <div class="reveal${i % 2 ? '-right' : ''}">
            <h2 class="display-md text-charcoal mb-6 flex items-center gap-4">
              <div class="w-1.5 h-10 rounded-full royal-grad flex-shrink-0"></div>
              ${s.title}
            </h2>
            <div class="pl-6 text-gray-500 text-base leading-relaxed whitespace-pre-line">${s.content}</div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Doctors -->
    <section class="py-20 section-snow relative">
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal/10 to-transparent"></div>
      <div class="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 text-center reveal">
        <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>담당 의료진</div>
        <h2 class="display-md text-charcoal mb-10">구강외과 전문의가<br><span class="royal-grad-text">직접 진료합니다</span></h2>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-5">
          ${[{slug:'lee-taehyung',name:'이태형 대표원장',spec:'구강악안면외과 전문의',init:'이'},{slug:'choi-minhye',name:'최민혜 원장',spec:'구강악안면외과 전문의',init:'최'}].map(doc => `
          <a href="/doctors/${doc.slug}" class="card-premium flex items-center gap-5 px-7 py-6 group w-full sm:w-auto">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center royal-border-glow flex-shrink-0 bg-gradient-to-br from-snow-100 to-royal/[0.03]">
              <span class="royal-grad-text font-black text-2xl">${doc.init}</span>
            </div>
            <div class="text-left">
              <p class="font-extrabold text-charcoal group-hover:text-royal transition-colors duration-300">${doc.name}</p>
              <p class="text-gray-400 text-sm">${doc.spec}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-200 group-hover:text-royal ml-auto text-xs transition-colors"></i>
          </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA (White) -->
    <section class="py-28 bg-white relative overflow-hidden">
      <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"></div>
      <div class="absolute inset-0 grid-pattern opacity-15"></div>
      <div class="royal-line-h absolute top-0 left-0 right-0"></div>

      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
        <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
          <i class="fas ${t.icon} text-white text-3xl"></i>
        </div>
        <h2 class="display-lg text-charcoal mb-6">${t.title}에 대해<br><span class="royal-grad-text">상담받으세요</span></h2>
        <p class="text-gray-400 text-lg mb-10">구강외과 전문의가 직접 진단하고 설명드립니다.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
          <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
        </div>
      </div>
    </section>
    `
  }
}