// ===== 영주 근처 지역 SEO 대폭 강화 (2026-04 리팩토링) =====
// 목표: 영주 인근 지역 키워드 검색 시 강남치과의원이 Google/Naver 상단 노출
// 전략: 롱테일 키워드 커버리지 + 지역 맞춤 콘텐츠 + NLP 자연어 FAQ + GeoCircle Schema

interface AreaInfo {
  name: string
  slug: string               // URL-safe slug
  driveTime: string
  driveKm: string
  description: string         // 지역 소개 1줄
  longDescription: string     // 지역 + 치과 연결 상세 소개 (SEO 콘텐츠)
  priority: number            // 1=핵심, 2=주요, 3=확장
  subAreas: string[]          // 하위 지역명 (읍/면/동)
  landmarks: string[]         // 주요 랜드마크
  population?: string         // 인구 (참고)
  routeDesc: string           // 교통 안내 상세
  routeHighway?: string       // 고속도로/국도 경유 정보
  whyChoose: string           // 지역 맞춤 선택 이유
  nearbyCompetitors?: string  // 경쟁 치과 상황 (왜 영주까지 와야 하는지)
  localKeywords: string[]     // 롱테일 지역 키워드
  lat: number
  lng: number
}

const areaData: Record<string, AreaInfo> = {
  '영주시': {
    name: '영주시', slug: 'yeongju', driveTime: '시내', driveKm: '-',
    description: '영주시 중심부에 위치한 강남치과의원은 택지 사거리 모모제인 건물 2층에서 쉽게 찾으실 수 있습니다.',
    longDescription: '영주시 택지지구 중심부에 위치한 강남치과의원은 구강악안면외과 전문의 2인이 직접 모든 수술을 시행하는 프리미엄 치과입니다. 영주시내 어디서든 자가용 10분 이내, 영주역에서 택시 10분 거리이며, CEREC 디지털 보철, 인비절라인, 3D CT, PrimeScan, iTero 등 대학병원급 장비를 완비하고 있습니다. 영주시민이 서울·대구까지 가지 않고도 구강외과 전문의의 정밀한 임플란트, 뼈이식, 상악동 거상술, 사랑니 발치를 받으실 수 있습니다.',
    priority: 1,
    subAreas: ['영주역 주변', '택지지구', '영주 시내', '가흥동', '휴천동', '영주동', '상망동', '하망동', '영주혁신도시', '문수면', '안정면'],
    landmarks: ['영주역', '영주 KTX', '영주시청', '택지 사거리', '영주 세계풍기인삼엑스포', '영주혁신도시', '무섬마을'],
    population: '약 10만 명',
    routeDesc: '영주시내 어디서든 택시·자가용으로 10분 이내 도착 가능합니다. 대학로 217, 모모제인 건물 2층에 위치하며, 건물 후면 지상·지하 주차장을 무료로 이용하실 수 있습니다.',
    routeHighway: '중앙고속도로 영주IC에서 약 5분',
    whyChoose: '영주시내에 위치하여 접근성이 가장 뛰어납니다. 구강외과 전문의 2인이 상주하는 영주 유일의 치과이며, CEREC 디지털 보철, 인비절라인, 대학병원급 장비를 모두 갖추고 있습니다.',
    nearbyCompetitors: '영주시에 치과가 여러 곳 있지만, 구강악안면외과 전문의 2인이 동시에 상주하며 뼈이식·상악동 거상술 등 고난이도 수술까지 가능한 곳은 강남치과의원이 유일합니다.',
    localKeywords: ['영주 치과', '영주 임플란트', '영주 치과 추천', '영주 임플란트 잘하는곳', '영주 인비절라인', '영주 사랑니', '영주 디지털보철', '영주시 치과', '영주 구강외과', '영주 임플란트 가격', '영주 치과 전문의', '영주 뼈이식'],
    lat: 36.8057, lng: 128.7410
  },
  '영주역': {
    name: '영주역', slug: 'yeongju-station', driveTime: '약 10분', driveKm: '약 4km',
    description: '영주역에서 택시로 약 10분 거리입니다. KTX 영주역에서도 접근이 편리합니다.',
    longDescription: 'KTX 중앙선이 정차하는 영주역은 서울, 안동, 원주, 제천 등에서 기차로 영주를 방문하는 주요 관문입니다. 영주역에서 강남치과의원까지 택시로 약 10분(4km)이면 도착합니다. KTX를 이용해 영주를 방문하는 외지 환자분도 역에서 10분이면 도착하여, 구강외과 전문의 2인의 효율적인 진료를 받으실 수 있습니다.',
    priority: 1,
    subAreas: ['영주역 앞', '영주 KTX역', '역전 시장', '영주역 광장'],
    landmarks: ['영주역', 'KTX 영주역', '영주역 광장', '영주 전통시장'],
    routeDesc: 'KTX 영주역에서 택시 약 10분(4km). 역 앞 택시 승강장에서 "택지 사거리 모모제인 건물"이라고 하시면 됩니다. 자가용 이용 시 건물 후면 주차장 이용 가능.',
    routeHighway: 'KTX 중앙선 영주역 하차',
    whyChoose: 'KTX를 이용해 영주를 방문하시는 분도 역에서 10분이면 도착합니다. 구강외과 전문의 2인 직접 진료로, 멀리서 오셔도 효율적인 치료가 가능합니다.',
    localKeywords: ['영주역 치과', '영주역 근처 치과', '영주 KTX 치과'],
    lat: 36.8168, lng: 128.7177
  },
  '풍기': {
    name: '풍기', slug: 'punggi', driveTime: '약 15분', driveKm: '약 12km',
    description: '풍기읍에서 자동차로 약 15분이면 도착합니다. 풍기인삼시장 근처에서도 빠르게 접근 가능합니다.',
    longDescription: '풍기읍은 영주시 남쪽에 위치한 인구 약 1.5만 명의 지역으로, 풍기인삼시장과 소백산 국립공원으로 유명합니다. 풍기읍 주민 및 소백산 인근 주민분들은 28번 국도를 이용하면 15분 만에 강남치과의원에 도착하실 수 있습니다. 풍기 지역에는 구강외과 전문의가 있는 치과가 없어, 임플란트·뼈이식·사랑니 수술이 필요한 분은 15분만 투자하시면 대학병원급 진료를 받으실 수 있습니다.',
    priority: 1,
    subAreas: ['풍기읍', '풍기인삼시장', '풍기온천', '금계리', '순흥면', '부석면', '단산면'],
    landmarks: ['풍기인삼시장', '풍기온천', '소백산 국립공원 입구', '부석사', '소수서원'],
    population: '약 1.5만 명',
    routeDesc: '풍기읍에서 영주 방면 28번 국도를 이용하면 약 15분(12km)이면 도착합니다. 풍기인삼시장에서 출발 시에도 동일합니다.',
    routeHighway: '28번 국도 영주 방면, 또는 중앙고속도로 풍기IC',
    whyChoose: '풍기읍에서 15분 거리로, 영주 시내 대학병원급 치과를 가장 가까이 이용할 수 있습니다. CEREC 디지털 보철로 내원 횟수를 최소화합니다.',
    nearbyCompetitors: '풍기읍 내 치과에서는 단순 진료가 가능하지만, 구강외과 전문의의 임플란트·뼈이식 수술은 불가능합니다. 15분 거리의 강남치과의원이 가장 가까운 전문의 치과입니다.',
    localKeywords: ['풍기 치과', '풍기 임플란트', '풍기읍 치과', '풍기 치과 추천', '풍기 사랑니', '풍기 인비절라인', '소백산 근처 치과'],
    lat: 36.8762, lng: 128.7260
  },
  '봉화': {
    name: '봉화', slug: 'bonghwa', driveTime: '약 30분', driveKm: '약 25km',
    description: '봉화군에서 자동차로 약 30분 거리입니다. 봉화읍, 춘양면, 석포면 등에서 접근 가능합니다.',
    longDescription: '봉화군은 영주시 동쪽에 인접한 인구 약 3만 명의 군으로, 청량산, 봉화 은어축제, 닭실마을 등으로 알려져 있습니다. 봉화군에는 구강악안면외과 전문의가 있는 치과가 없어, 고난이도 임플란트, 뼈이식, 사랑니 수술이 필요한 봉화군민은 30분 거리의 영주 강남치과의원을 이용하시면 됩니다. 봉화읍에서 36번 국도 하나로 편하게 올 수 있으며, 춘양면·물야면에서도 40~50분이면 도착합니다.',
    priority: 2,
    subAreas: ['봉화읍', '춘양면', '석포면', '법전면', '물야면', '명호면', '상운면', '재산면', '봉성면'],
    landmarks: ['봉화군청', '봉화 은어축제', '청량산', '봉화 닭실마을', '분천역'],
    population: '약 3만 명',
    routeDesc: '봉화읍에서 36번 국도를 이용해 영주 방면으로 약 30분(25km). 춘양면에서는 약 40분, 석포면에서는 약 50분 소요됩니다.',
    routeHighway: '36번 국도 영주 방면',
    whyChoose: '봉화군에는 구강외과 전문의가 있는 치과가 없습니다. 30분만 투자하시면 구강외과 전문의 2인의 정밀한 진료를 받으실 수 있습니다.',
    nearbyCompetitors: '봉화군 내 치과에서 일반 충치치료, 스케일링은 가능하지만, 구강외과 전문의 수술(임플란트, 뼈이식, 매복 사랑니 발치 등)은 영주나 대구까지 가야 합니다. 강남치과의원은 대구(약 2시간)보다 훨씬 가까운 30분 거리입니다.',
    localKeywords: ['봉화 치과', '봉화 임플란트', '봉화군 치과 추천', '봉화 사랑니', '봉화 임플란트 잘하는곳', '봉화에서 영주 치과', '봉화 구강외과', '봉화 치과 전문의'],
    lat: 36.8930, lng: 128.7320
  },
  '예천': {
    name: '예천', slug: 'yecheon', driveTime: '약 35분', driveKm: '약 30km',
    description: '예천군에서 자동차로 약 35분 거리입니다. 예천읍, 풍양면, 호명면 등에서 접근 가능합니다.',
    longDescription: '예천군은 영주시 남서쪽에 위치한 인구 약 5.5만 명의 군으로, 회룡포, 삼강주막, 예천 천문우주센터 등의 관광명소가 있습니다. 예천군에서 구강외과 전문의의 임플란트·뼈이식·사랑니 수술을 받으려면 대구까지 1시간 30분 이상 걸렸습니다. 영주 강남치과의원은 35분 거리에서 대학병원급 구강외과 전문 진료를 제공합니다. 중앙고속도로 영주IC를 이용하면 더 빠르게 접근 가능합니다.',
    priority: 2,
    subAreas: ['예천읍', '풍양면', '호명면', '감천면', '용문면', '지보면', '용궁면', '개포면'],
    landmarks: ['예천군청', '예천 천문우주센터', '회룡포', '삼강주막'],
    population: '약 5.5만 명',
    routeDesc: '예천읍에서 28번 국도를 이용해 영주 방면으로 약 35분(30km). 중앙고속도로 영주IC 이용 시 더 빠를 수 있습니다.',
    routeHighway: '28번 국도 → 영주 방면, 또는 중앙고속도로 영주IC',
    whyChoose: '예천군에서 구강외과 전문의의 임플란트·뼈이식·사랑니 수술을 받으려면 대구까지 가셔야 했습니다. 강남치과의원은 35분 거리에서 대학병원급 진료를 제공합니다.',
    nearbyCompetitors: '예천군 내 치과에서 기본 진료는 가능하지만, 구강외과 전문의의 고난이도 수술은 대구(약 1.5시간) 또는 영주(약 35분)로 가셔야 합니다.',
    localKeywords: ['예천 치과', '예천 임플란트', '예천군 치과 추천', '예천 사랑니', '예천 임플란트 잘하는곳', '예천에서 영주 치과', '예천 구강외과'],
    lat: 36.6570, lng: 128.4530
  },
  '안동': {
    name: '안동', slug: 'andong', driveTime: '약 40분', driveKm: '약 45km',
    description: '안동시에서 자동차로 약 40분 거리입니다. 중앙고속도로 이용 시 빠르게 접근 가능합니다.',
    longDescription: '안동시는 인구 약 15만 명의 경북 북부 중심 도시로, 하회마을, 안동 국제탈춤페스티벌 등으로 유명합니다. 안동에도 치과가 많지만, 구강외과 전문의 2인이 동시에 상주하며 뼈이식·상악동 거상술 등 고난이도 수술까지 원스톱으로 가능한 곳은 드뭅니다. 중앙고속도로를 이용하면 안동에서 영주까지 약 40분이면 도착합니다. 고난이도 임플란트가 필요하신 안동시민은 40분 투자 가치가 있습니다.',
    priority: 2,
    subAreas: ['안동시내', '풍천면', '하회마을', '옥동', '태화동', '용상동', '와룡면', '길안면', '임하면'],
    landmarks: ['안동 하회마을', '안동역', '안동시청', '안동국제탈춤페스티벌', '도산서원'],
    population: '약 15만 명',
    routeDesc: '안동시내에서 중앙고속도로를 이용해 영주IC까지 약 30분, 이후 시내까지 10분입니다. 34번 국도 이용 시 약 50분(50km) 소요.',
    routeHighway: '중앙고속도로 안동IC → 영주IC (약 30분)',
    whyChoose: '안동에도 치과가 많지만, 구강외과 전문의 2인이 동시 상주하는 곳은 드뭅니다. 고난이도 임플란트, 뼈이식, 상악동 수술이 필요하신 분은 40분 투자 가치가 있습니다.',
    nearbyCompetitors: '안동 시내에 치과가 다수 있어 일반 진료는 충분히 가능합니다. 하지만 뼈이식 동반 임플란트, 상악동 거상술, 다수 임플란트 동시 식립 등 고난이도 수술은 전문의 경험이 중요합니다.',
    localKeywords: ['안동 치과', '안동 임플란트', '안동 치과 추천', '안동 임플란트 잘하는곳', '안동 사랑니', '안동 구강외과', '안동 뼈이식 임플란트', '안동 인비절라인'],
    lat: 36.5684, lng: 128.7294
  },
  '단양': {
    name: '단양', slug: 'danyang', driveTime: '약 40분', driveKm: '약 40km',
    description: '단양군에서 자동차로 약 40분 거리입니다. 소백산 죽령터널을 통해 접근이 편리합니다.',
    longDescription: '충청북도 단양군은 인구 약 2.8만 명으로, 소백산 죽령을 사이에 두고 영주시와 인접해 있습니다. 죽령터널 덕분에 단양에서 영주까지 40분이면 도착하며, 이는 충주(약 1시간)나 제천(약 45분)보다 오히려 더 가까울 수 있습니다. 단양군민이 구강외과 전문의의 고난이도 임플란트, 뼈이식, 사랑니 수술을 받으려면 충주·제천보다 영주 강남치과의원이 더 가깝고 전문적입니다.',
    priority: 3,
    subAreas: ['단양읍', '매포읍', '가곡면', '영춘면', '어상천면', '적성면', '대강면'],
    landmarks: ['단양 고수동굴', '도담삼봉', '단양 패러글라이딩', '소백산 죽령'],
    population: '약 2.8만 명',
    routeDesc: '단양읍에서 5번 국도 → 죽령터널 → 풍기 경유 약 40분(40km). 중앙고속도로 풍기IC 이용도 가능합니다.',
    routeHighway: '5번 국도 → 죽령터널 → 풍기 → 영주, 또는 중앙고속도로 풍기IC',
    whyChoose: '충청북도 단양군에서 가장 가까운 구강외과 전문의 치과입니다. 죽령터널 덕분에 40분이면 도착하여, 충주·제천보다 오히려 가까울 수 있습니다.',
    nearbyCompetitors: '단양군 내 치과에서 기본 진료는 가능하지만, 구강외과 전문의 수술은 제천(45분), 충주(1시간), 또는 영주(40분)로 가셔야 합니다. 강남치과의원이 가장 가깝고 전문성이 높습니다.',
    localKeywords: ['단양 치과', '단양 임플란트', '단양군 치과 추천', '단양 치과 전문의', '단양 사랑니', '단양에서 가까운 치과'],
    lat: 36.9847, lng: 128.3654
  },
  '영덕': {
    name: '영덕', slug: 'yeongdeok', driveTime: '약 1시간', driveKm: '약 70km',
    description: '영덕군에서 자동차로 약 1시간 거리입니다. 36번 국도를 이용하여 접근 가능합니다.',
    longDescription: '동해안의 영덕군은 인구 약 3.5만 명으로, 영덕 대게와 블루로드로 유명합니다. 영덕군에서 구강외과 전문의 치과를 이용하려면 포항(약 1시간)이나 대구(약 2시간)까지 가셔야 합니다. 36번 국도를 이용하면 봉화를 경유하여 영주까지 약 1시간이면 도착하므로, 포항과 비슷한 거리에서 구강외과 전문의 2인의 전문 진료를 받으실 수 있습니다.',
    priority: 3,
    subAreas: ['영덕읍', '강구면', '축산면', '영해면', '병곡면', '지품면', '달산면', '남정면'],
    landmarks: ['영덕 블루로드', '강구항', '영덕 대게 축제장', '경정리 해수욕장'],
    population: '약 3.5만 명',
    routeDesc: '영덕읍에서 36번 국도를 이용해 봉화 경유 → 영주 약 1시간(70km). 7번 국도 → 울진 방면에서도 접근 가능합니다.',
    routeHighway: '36번 국도 → 봉화 경유 → 영주',
    whyChoose: '동해안 영덕군에서 구강외과 전문의 치과를 이용하려면 포항이나 대구까지 가셔야 합니다. 강남치과의원은 1시간 거리로 경북 북부 최고 수준의 전문 진료를 받으실 수 있습니다.',
    nearbyCompetitors: '영덕군 내에 구강외과 전문의가 상주하는 치과가 없으며, 포항(1시간), 대구(2시간)가 가장 가까운 선택지였습니다.',
    localKeywords: ['영덕 치과', '영덕 임플란트', '영덕군 치과 추천', '영덕 사랑니'],
    lat: 36.4153, lng: 129.3657
  },
  '울진': {
    name: '울진', slug: 'uljin', driveTime: '약 1시간 20분', driveKm: '약 90km',
    description: '울진군에서 자동차로 약 1시간 20분 거리입니다. 봉화 경유 36번 국도를 이용합니다.',
    longDescription: '울진군은 인구 약 4.8만 명의 동해안 군으로, 덕구온천, 금강소나무숲길, 후포항 등이 유명합니다. 울진군에서 구강외과 전문의의 고난이도 수술(뼈이식, 상악동 거상술 등)을 받으려면 대구까지 2시간 이상 걸립니다. 영주 강남치과의원은 1시간 20분으로 대구보다 가깝고, 대학병원급 장비와 전문의 2인 진료를 제공합니다.',
    priority: 3,
    subAreas: ['울진읍', '평해읍', '근남면', '죽변면', '후포면', '기성면', '온정면', '북면'],
    landmarks: ['울진 금강소나무숲길', '덕구온천', '후포항', '망양정'],
    population: '약 4.8만 명',
    routeDesc: '울진읍에서 36번 국도 → 봉화 경유 → 영주 약 1시간 20분(90km). 울진 시내에서 출발 시 봉화IC 방면이 가장 빠릅니다.',
    routeHighway: '36번 국도 → 봉화 경유 → 영주',
    whyChoose: '울진군에서 구강외과 전문의의 고난이도 수술(뼈이식, 상악동 거상술 등)을 받으려면 대구까지 2시간 이상 걸립니다. 영주 강남치과의원은 1시간 20분으로 더 가깝습니다.',
    localKeywords: ['울진 치과', '울진 임플란트', '울진군 치과 추천', '울진 사랑니'],
    lat: 36.9930, lng: 129.4004
  },
  '영주혁신도시': {
    name: '영주혁신도시', slug: 'yeongju-innovation', driveTime: '약 10분', driveKm: '약 5km',
    description: '영주혁신도시에서 자동차로 약 10분 거리입니다. 한국도로공사, 농식품공무원교육원 등 입주기관 직원분들이 이용하시기 편리합니다.',
    longDescription: '영주혁신도시는 한국도로공사, 농식품공무원교육원, 한국국학진흥원 등 공공기관이 입주한 신도시로, 인구가 빠르게 증가하고 있습니다. 혁신도시 주민분들은 10분이면 강남치과의원에 도착하실 수 있으며, 점심시간이나 퇴근 후에도 충분히 내원 가능합니다. 타 지역에서 전입한 분들은 기존에 다니던 대도시 병원 수준의 치과를 찾으시는데, 강남치과의원이 그 역할을 합니다.',
    priority: 1,
    subAreas: ['혁신도시 1지구', '혁신도시 2지구', '문수면', '안정면'],
    landmarks: ['한국도로공사', '농식품공무원교육원', '한국국학진흥원', '영주혁신도시 상가'],
    population: '약 1만 명 (증가 중)',
    routeDesc: '영주혁신도시에서 영주 시내 방면으로 약 10분(5km). 대학로 217, 모모제인 건물 2층 위치.',
    whyChoose: '혁신도시에서 서울·대구처럼 전문의 치과를 찾으시는 분들에게 최적입니다. 구강외과 전문의 2인 상주, 대학병원급 장비, CEREC 디지털 보철까지 갖추고 있습니다.',
    nearbyCompetitors: '혁신도시 인근에 새로 개원한 치과들이 있지만, 구강외과 전문의가 상주하는 곳은 강남치과의원뿐입니다.',
    localKeywords: ['영주혁신도시 치과', '혁신도시 치과', '영주혁신도시 임플란트', '영주혁신도시 치과 추천'],
    lat: 36.8200, lng: 128.7500
  },
  '부석': {
    name: '부석', slug: 'buseok', driveTime: '약 25분', driveKm: '약 20km',
    description: '부석면에서 자동차로 약 25분 거리입니다. 부석사 인근에서도 쉽게 접근 가능합니다.',
    longDescription: '영주시 부석면은 유네스코 세계유산 부석사가 위치한 지역으로, 소백산 서쪽 기슭에 자리하고 있습니다. 부석면 주민분들은 영주 시내까지 25분이면 도착하여, 구강외과 전문의의 전문 진료를 편리하게 이용하실 수 있습니다. 부석사 관광 후 치과 상담을 겸하시는 분도 계십니다.',
    priority: 2,
    subAreas: ['부석면', '소천면', '부석사 인근'],
    landmarks: ['부석사', '소수서원', '선비촌'],
    routeDesc: '부석면에서 영주 시내 방면으로 약 25분(20km). 순흥면 경유.',
    whyChoose: '부석면에서 25분이면 구강외과 전문의 2인의 전문 진료를 받으실 수 있습니다.',
    localKeywords: ['부석 치과', '부석면 치과', '부석사 근처 치과'],
    lat: 36.9960, lng: 128.6830
  },
  '순흥': {
    name: '순흥', slug: 'sunheung', driveTime: '약 20분', driveKm: '약 15km',
    description: '순흥면에서 자동차로 약 20분 거리입니다. 소수서원, 선비촌이 있는 역사 깊은 지역입니다.',
    longDescription: '순흥면은 소수서원(유네스코 세계유산)과 선비촌이 있는 영주의 역사·문화 중심지입니다. 순흥면 주민분들은 20분이면 강남치과의원에 도착하실 수 있으며, 구강외과 전문의의 임플란트, CEREC 디지털 보철, 인비절라인 등 전문 진료를 이용하실 수 있습니다.',
    priority: 2,
    subAreas: ['순흥면', '배점리', '내죽리'],
    landmarks: ['소수서원', '선비촌', '순흥 전통마을'],
    routeDesc: '순흥면에서 영주 시내 방면으로 약 20분(15km).',
    whyChoose: '순흥면에서 20분이면 영주 시내의 구강외과 전문의 치과에 도착합니다.',
    localKeywords: ['순흥 치과', '순흥면 치과', '소수서원 근처 치과'],
    lat: 36.8790, lng: 128.6590
  }
}

// 지역별 맞춤 FAQ (지역 키워드 SEO + AEO 강화) — NLP 자연어 질문 최적화
function getAreaFAQs(area: AreaInfo): { q: string; a: string }[] {
  const base = [
    {
      q: `${area.name}에서 강남치과의원까지 얼마나 걸리나요?`,
      a: `${area.name}에서 강남치과의원까지 자동차로 ${area.driveTime}${area.driveKm !== '-' ? `(약 ${area.driveKm})` : ''} 소요됩니다. ${area.routeDesc}${area.routeHighway ? ` 고속도로/국도: ${area.routeHighway}.` : ''}`
    },
    {
      q: `${area.name} 근처에 구강외과 전문의가 있는 치과가 있나요?`,
      a: `영주시 강남치과의원에는 구강악안면외과 전문의 2인(이태형 대표원장, 최민혜 원장)이 상주합니다. ${area.name}에서 ${area.driveTime}이면 도착하며, 임플란트, 뼈이식, 사랑니 발치 등 외과적 시술을 전문의가 직접 시행합니다.`
    },
    {
      q: `${area.name}에서 임플란트 잘하는 치과를 찾고 있어요.`,
      a: `강남치과의원은 구강외과 전문의 2인이 모든 임플란트 수술을 직접 시행합니다. 3D CT 기반 정밀 진단, 디지털 임플란트 가이드, 뼈이식·상악동 거상술까지 가능합니다. ${area.name}에서 ${area.driveTime} 거리이며, Neo/Osstem 임플란트 1본 130만원(맞춤 어버트먼트+지르코니아 포함)입니다.`
    },
    {
      q: `${area.name}에서 인비절라인(투명교정) 할 수 있는 치과가 있나요?`,
      a: `강남치과의원은 인비절라인 인증의가 직접 교정 계획을 수립하고 관리합니다. iTero 디지털 스캐너로 3D 시뮬레이션을 제공하여 교정 결과를 미리 확인할 수 있습니다. ${area.name}에서 ${area.driveTime} 거리로, 4~8주 간격 내원으로 교정이 가능합니다.`
    },
    {
      q: `${area.name}에서 사랑니 발치는 어디서 받아야 하나요?`,
      a: `매복 사랑니는 구강외과 전문의에게 받는 것이 안전합니다. 강남치과의원은 구강외과 전문의 2인이 3D CT로 신경관을 정밀 분석한 후 안전하게 발치합니다. ${area.name}에서 ${area.driveTime}이면 도착합니다. 사랑니 발치는 건강보험이 적용됩니다.`
    },
    {
      q: `${area.name}에서 치아 보철(크라운) 잘하는 치과를 찾고 있어요.`,
      a: `강남치과의원은 CEREC 디지털 시스템으로 싱글 지르코니아·세라믹 크라운을 정밀 제작합니다. PrimeScan 디지털 스캔으로 본뜨기 없이 편안하게 제작 가능하며, 자연치아와 거의 구분이 안 됩니다. 지르코니아 크라운 50만원.`
    },
    {
      q: `강남치과의원 주차는 가능한가요?`,
      a: `네, 건물 후면에 지상·지하 주차장이 완비되어 있습니다. ${area.name}에서 자가용으로 오시면 편리하게 주차하실 수 있습니다. 주소는 경북 영주시 대학로 217, 모모제인 건물 2층입니다.`
    },
    {
      q: `강남치과의원 진료시간이 어떻게 되나요?`,
      a: `평일 오전 9시~오후 5시 30분 (점심시간 13:00~14:00), 토·일·공휴일은 휴무입니다. 전화 054-636-8222로 예약 후 내원하시면 대기 시간을 줄일 수 있습니다.`
    },
    {
      q: `${area.name}에서 임플란트 가격이 궁금합니다.`,
      a: `강남치과의원 임플란트(Neo/Osstem) 1본 130만원입니다. 맞춤 어버트먼트와 지르코니아 크라운이 포함된 가격입니다. 뼈이식 단순 50만원, 복합 80만원, 상악동 거상술 치조정 80만원, 측방 150만원이 추가됩니다. 만 65세 이상은 건강보험 적용(평생 2개)으로 본인부담금 약 50만원입니다.`
    },
  ]

  // 원거리 지역 추가 FAQ
  if (area.priority >= 2) {
    base.push(
      {
        q: `${area.name}에서 멀리 가도 괜찮을까요? 치료 때마다 가야 하나요?`,
        a: `강남치과의원은 원거리 환자를 위해 내원 횟수를 최소화하는 효율적 진료 시스템을 갖추고 있습니다. 임플란트의 경우 식립 수술, 중간 체크, 보철 장착 등 핵심 3~4회 내원으로 치료가 가능합니다. CEREC 디지털 보철은 스캔부터 제작까지 원내에서 완료되어 별도 기공소 대기가 없습니다.`
      },
      {
        q: `뼈이식이 필요한 임플란트도 가능한가요?`,
        a: `네, 구강외과 전문의의 핵심 전문 영역입니다. 자가골, 동종골, 이종골 이식은 물론 상악동 거상술(측방/치조정)까지 모두 가능합니다. 다른 치과에서 뼈 부족으로 거절당하셨어도 상담 가능합니다.`
      },
      {
        q: `${area.name}에서 CEREC 디지털 보철을 할 수 있는 치과가 있나요?`,
        a: `강남치과의원은 영주 지역에서 CEREC 디지털 보철 시스템(PrimeScan + CEREC MC X + SpeedFire)을 갖춘 치과입니다. 싱글 지르코니아·세라믹 크라운을 디지털 스캔으로 정밀 제작합니다. ${area.name}에서 ${area.driveTime} 거리입니다.`
      }
    )
  }

  if (area.priority === 3) {
    base.push({
      q: `${area.name}에서 대구나 포항까지 안 가도 되나요?`,
      a: `강남치과의원은 대학병원급 장비(3D CT, CEREC, PrimeScan, iTero, SpeedFire)를 갖추고, 구강외과 전문의 2인이 상주합니다. ${area.name}에서 대구(약 2시간)나 포항(약 1.5시간)까지 가시는 것보다, 영주 강남치과의원(${area.driveTime})이 더 가깝고 동일한 수준의 전문 진료를 받으실 수 있습니다.`
    })
  }

  return base
}

// 지역별 맞춤 진료 추천
function getAreaTreatments(area: AreaInfo): { icon: string; title: string; desc: string; link: string }[] {
  return [
    { icon: 'fa-tooth', title: '임플란트', desc: `구강외과 전문의 직접 수술. 뼈이식·상악동 수술까지 가능. ${area.name}에서 ${area.driveTime}.`, link: '/treatments/implant' },
    { icon: 'fa-bolt', title: '디지털 보철 (CEREC)', desc: 'CEREC으로 싱글 크라운 정밀 제작. 디지털 스캔으로 편안하게.', link: '/treatments/digital-prosthesis' },
    { icon: 'fa-teeth', title: '인비절라인 투명교정', desc: `인비절라인 인증의 직접 진료. ${area.priority >= 2 ? '4~8주 간격 내원으로 편리.' : '3D 시뮬레이션 제공.'}`, link: '/treatments/invisalign' },
    { icon: 'fa-hand-holding-medical', title: '사랑니 발치', desc: '구강외과 전문의가 매복 사랑니도 안전하게. CT 기반 정밀 진단.', link: '/treatments/wisdom-tooth' },
    { icon: 'fa-gem', title: '심미보철', desc: '라미네이트, 올세라믹, 지르코니아. 자연치아와 구분 불가.', link: '/treatments/cosmetic' },
    { icon: 'fa-bone', title: '뼈이식 임플란트', desc: '뼈 부족 시 뼈이식 후 임플란트. 구강외과 전문 영역.', link: '/treatments/bone-graft' },
  ]
}

export function areaPage(region: string): { html: string; title: string; description: string; schemas: object[]; keywords: string } | null {
  const decoded = decodeURIComponent(region)
  const area = areaData[decoded]
  if (!area) return null

  const isLocal = area.priority === 1
  const title = isLocal
    ? `${area.name} 치과 – 강남치과의원 | 구강외과 전문의 2인 · 임플란트 · 인비절라인`
    : `${area.name} 치과 추천 – 강남치과의원 | 차로 ${area.driveTime} · 구강외과 전문의`
  const description = `${area.name}에서 강남치과의원까지 ${area.driveTime}. 구강악안면외과 전문의 2인 직접 진료. 임플란트, 디지털보철, 인비절라인, 사랑니발치. 054-636-8222.`
  const keywords = area.localKeywords.join(', ')

  const faqs = getAreaFAQs(area)
  const treatments = getAreaTreatments(area)

  // ===== 스키마 (FAQPage + LocalBusiness + BreadcrumbList + Speakable + GeoCircle) =====
  const schemas: object[] = [
    // FAQPage Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": `${area.name} 치과 자주 묻는 질문 – 강남치과의원`,
      "description": `${area.name} 주민분들이 강남치과의원에 대해 자주 묻는 질문과 답변`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    // MedicalWebPage + Speakable
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "name": title,
      "description": description,
      "url": `https://kndent.kr/area/${encodeURIComponent(decoded)}`,
      "inLanguage": "ko-KR",
      "dateModified": "2026-04-15",
      "lastReviewed": "2026-04-15",
      "reviewedBy": {
        "@type": "Physician",
        "name": "이태형",
        "@id": "https://kndent.kr/doctors/lee-taehyung#physician"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["[data-speakable]", "h1", ".area-summary", ".faq-answer", ".area-long-desc"]
      },
      "about": {
        "@type": "Dentist",
        "@id": "https://kndent.kr/#organization",
        "name": "강남치과의원",
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": area.lat, "longitude": area.lng },
          "geoRadius": area.priority === 1 ? "15000" : area.priority === 2 ? "50000" : "100000"
        }
      },
      "specialty": ["Implantology", "Oral and Maxillofacial Surgery", "Prosthodontics", "Orthodontics"]
    },
    // LocalBusiness Schema (지역 SEO 핵심)
    {
      "@context": "https://schema.org",
      "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
      "@id": "https://kndent.kr/#organization",
      "name": "강남치과의원",
      "alternateName": [`${area.name} 치과`, `${area.name} 임플란트`, "영주 강남치과", "Gangnam Dental Clinic"],
      "image": "https://kndent.kr/static/photos/3gQUD6CP.jpg",
      "url": "https://kndent.kr",
      "telephone": "+82-54-636-8222",
      "email": "gndentalclinic@naver.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "대학로 217, 모모제인 건물 2층",
        "addressLocality": "영주시",
        "addressRegion": "경상북도",
        "postalCode": "36099",
        "addressCountry": "KR"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 36.8057, "longitude": 128.7410 },
      "hasMap": "https://map.naver.com/p/entry/place/1099573867",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "17:30" }
      ],
      "priceRange": "₩₩",
      "areaServed": [
        { "@type": "City", "name": area.name },
        { "@type": "City", "name": "영주시" },
        { "@type": "City", "name": "봉화군" },
        { "@type": "City", "name": "예천군" },
        { "@type": "City", "name": "안동시" },
        { "@type": "City", "name": "단양군" },
        { "@type": "City", "name": "영덕군" },
        { "@type": "City", "name": "울진군" },
        {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 36.8057, "longitude": 128.7410 },
          "geoRadius": "100000",
          "description": "영주시 중심 반경 100km 지역"
        }
      ],
      "medicalSpecialty": ["Oral and Maxillofacial Surgery", "Implantology", "Prosthodontics", "Orthodontics", "Cosmetic Dentistry"],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "임플란트", "url": "https://kndent.kr/treatments/implant" },
        { "@type": "MedicalProcedure", "name": "디지털 보철 (CEREC)", "url": "https://kndent.kr/treatments/digital-prosthesis" },
        { "@type": "MedicalProcedure", "name": "인비절라인 투명교정", "url": "https://kndent.kr/treatments/invisalign" },
        { "@type": "MedicalProcedure", "name": "사랑니 발치", "url": "https://kndent.kr/treatments/wisdom-tooth" },
        { "@type": "MedicalProcedure", "name": "뼈이식", "url": "https://kndent.kr/treatments/bone-graft" },
        { "@type": "MedicalProcedure", "name": "상악동 거상술", "url": "https://kndent.kr/treatments/sinus-lift" }
      ],
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "120", "bestRating": "5" },
      "sameAs": [
        "https://blog.naver.com/gndentalclinic",
        "https://map.naver.com/p/entry/place/1099573867",
        "https://www.instagram.com/gndentalclinic/"
      ]
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://kndent.kr" },
        { "@type": "ListItem", "position": 2, "name": "오시는 길", "item": "https://kndent.kr/directions" },
        { "@type": "ListItem", "position": 3, "name": `${area.name}에서 오시는 길`, "item": `https://kndent.kr/area/${encodeURIComponent(decoded)}` }
      ]
    }
  ]

  // ===== HTML =====
  const html = `
  <!-- Hero -->
  <section class="relative min-h-[40vh] md:min-h-[60vh] flex items-end subpage-hero overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] -top-48 -right-48 opacity-20"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
    <div class="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pb-16 pt-28 md:pb-24 md:pt-44 w-full">
      <nav aria-label="breadcrumb" class="mb-6">
        <ol class="flex items-center gap-2 text-sm text-gray-400" itemscope itemtype="https://schema.org/BreadcrumbList">
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="/" itemprop="item" class="hover:text-royal transition-colors"><span itemprop="name">홈</span></a><meta itemprop="position" content="1"></li>
          <li><i class="fas fa-chevron-right text-[8px]"></i></li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="/directions" itemprop="item" class="hover:text-royal transition-colors"><span itemprop="name">오시는 길</span></a><meta itemprop="position" content="2"></li>
          <li><i class="fas fa-chevron-right text-[8px]"></i></li>
          <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="text-charcoal font-medium"><span itemprop="name">${area.name}</span><meta itemprop="position" content="3"></li>
        </ol>
      </nav>
      <h1 class="display-lg text-charcoal mb-6" data-speakable="true">${title}</h1>
      <p class="text-gray-400 text-lg area-summary" data-speakable="true">${area.description}</p>
    </div>
  </section>

  <!-- SEO: 지역 상세 소개 (롱 콘텐츠) -->
  <section class="py-14 md:py-20 bg-white">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <article class="area-long-desc prose prose-gray max-w-none mb-16" data-speakable="true">
        <h2 class="display-sm text-charcoal mb-6"><i class="fas fa-map-pin text-royal mr-3"></i>${area.name}에서 강남치과의원 찾아오기</h2>
        <p class="text-gray-500 text-base leading-relaxed">${area.longDescription}</p>
        ${area.nearbyCompetitors ? `<p class="text-gray-500 text-sm leading-relaxed mt-4 p-4 bg-royal/[0.03] rounded-2xl border border-royal/[0.08]"><i class="fas fa-info-circle text-royal mr-2"></i>${area.nearbyCompetitors}</p>` : ''}
      </article>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-20 stagger-children">
        <div class="card-premium p-8 text-center stagger-item group">
          <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-car text-white text-xl"></i></div>
          <p class="text-3xl font-black text-charcoal">${area.driveTime}</p>
          <p class="text-gray-400 text-sm mt-2">자동차 소요시간</p>
        </div>
        <div class="card-premium p-8 text-center stagger-item group">
          <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-road text-white text-xl"></i></div>
          <p class="text-3xl font-black text-charcoal">${area.driveKm}</p>
          <p class="text-gray-400 text-sm mt-2">거리</p>
        </div>
        <div class="card-premium p-8 text-center stagger-item group">
          <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-user-doctor text-white text-xl"></i></div>
          <p class="text-3xl font-black text-charcoal">2인</p>
          <p class="text-gray-400 text-sm mt-2">구강외과 전문의</p>
        </div>
        <div class="card-premium p-8 text-center stagger-item group">
          <div class="w-14 h-14 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-5 royal-glow group-hover:scale-110 transition-transform duration-500"><i class="fas fa-map-marker-alt text-white text-xl"></i></div>
          <p class="text-lg font-black text-charcoal">택지 사거리<br>모모제인 건물 2층</p>
          <p class="text-gray-400 text-sm mt-2">위치</p>
        </div>
      </div>

      <!-- 교통 안내 -->
      <div class="glass-royal rounded-3xl p-8 mb-20 reveal relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-royal/[0.04] rounded-full blur-[60px]"></div>
        <h2 class="font-extrabold text-charcoal mb-4 text-lg relative z-10"><i class="fas fa-route text-royal mr-2"></i>${area.name}에서 오시는 방법</h2>
        <p class="text-gray-500 text-sm leading-relaxed relative z-10" data-speakable="true">${area.routeDesc}</p>
        ${area.routeHighway ? `<p class="text-royal text-xs font-bold mt-3 relative z-10"><i class="fas fa-road mr-1"></i>${area.routeHighway}</p>` : ''}
        ${area.subAreas.length > 0 ? `
        <div class="mt-5 relative z-10">
          <p class="text-xs font-bold text-gray-400 mb-2">주변 지역</p>
          <div class="flex flex-wrap gap-2">
            ${area.subAreas.map(s => `<span class="px-3 py-1 rounded-full bg-royal/[0.06] border border-royal/[0.1] text-royal text-[11px] font-medium">${s}</span>`).join('')}
          </div>
        </div>` : ''}
      </div>

      <!-- Why choose us -->
      <div class="mb-20 reveal">
        <div class="text-center mb-14">
          <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>WHY US</div>
          <h2 class="display-md text-charcoal" data-speakable="true">${area.name} 분들이<br><span class="royal-grad-text">강남치과의원을 선택하는 이유</span></h2>
        </div>
        <div class="glass-royal rounded-3xl p-8 mb-10 relative overflow-hidden">
          <p class="text-gray-500 leading-relaxed" data-speakable="true">${area.whyChoose}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children">
          ${[
            {icon:'fa-user-doctor', title:'구강외과 전문의 2인 상주', desc:'구강악안면외과 전문의 이태형 대표원장, 최민혜 원장이 모든 수술을 직접 시행합니다.'},
            {icon:'fa-bolt', title:'CEREC 디지털 보철', desc:'CEREC 시스템으로 싱글 크라운 정밀 제작. 디지털 스캔으로 본뜨기 없이 편안하게.'},
            {icon:'fa-microchip', title:'대학병원급 장비 완비', desc:'3D CT, PrimeScan, iTero, CEREC MC X, SpeedFire 등 최첨단 디지털 장비.'},
            {icon:'fa-clock', title:'재내원 최소화 시스템', desc:`${area.priority >= 2 ? `${area.name}에서 오시는 분을 위해` : ''} 내원 횟수를 최소화하는 효율적 진료 동선.`}
          ].map(item => `
          <div class="card-premium p-7 flex items-start gap-5 stagger-item group">
            <div class="w-13 h-13 rounded-xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow group-hover:scale-110 transition-transform duration-500" style="width:52px;height:52px;">
              <i class="fas ${item.icon} text-white text-lg"></i>
            </div>
            <div>
              <h3 class="font-extrabold text-charcoal mb-1.5 group-hover:text-royal transition-colors duration-300">${item.title}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">${item.desc}</p>
            </div>
          </div>
          `).join('')}
        </div>
      </div>

      <!-- 추천 진료과목 (지역+시술 롱테일 키워드) -->
      <div class="mb-20 reveal">
        <div class="text-center mb-14">
          <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>TREATMENTS</div>
          <h2 class="display-md text-charcoal">${area.name}에서 오시면<br><span class="royal-grad-text">이런 진료를 받으실 수 있습니다</span></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          ${treatments.map(t => `
          <a href="${t.link}" class="card-premium p-6 flex items-center gap-4 group stagger-item block">
            <div class="w-13 h-13 rounded-xl royal-grad flex items-center justify-center flex-shrink-0 royal-glow" style="width:48px;height:48px;">
              <i class="fas ${t.icon} text-white text-base"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-charcoal group-hover:text-royal transition-colors duration-300 text-sm">${t.title}</h3>
              <p class="text-gray-400 text-xs mt-1 leading-relaxed">${t.desc}</p>
            </div>
            <i class="fas fa-chevron-right text-gray-200 group-hover:text-royal group-hover:translate-x-1 transition-all duration-300 text-xs"></i>
          </a>
          `).join('')}
        </div>
      </div>

      <!-- 롱테일 키워드 내부 링크 섹션 -->
      <div class="mb-20 reveal">
        <div class="text-center mb-10">
          <h2 class="text-lg font-extrabold text-charcoal"><i class="fas fa-search text-royal mr-2"></i>${area.name} 주민분들이 자주 검색하는 키워드</h2>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          ${area.localKeywords.map(kw => {
            // 키워드에 맞는 내부 링크 매칭
            let link = '/'
            if (kw.includes('임플란트')) link = '/treatments/implant'
            else if (kw.includes('인비절라인') || kw.includes('투명교정') || kw.includes('교정')) link = '/treatments/invisalign'
            else if (kw.includes('사랑니')) link = '/treatments/wisdom-tooth'
            else if (kw.includes('디지털보철') || kw.includes('크라운') || kw.includes('보철')) link = '/treatments/digital-prosthesis'
            else if (kw.includes('구강외과') || kw.includes('전문의')) link = '/doctors'
            else if (kw.includes('가격') || kw.includes('비용')) link = '/pricing'
            else if (kw.includes('뼈이식')) link = '/treatments/bone-graft'
            else if (kw.includes('치과 추천') || kw.includes('치과')) link = '/'
            return `<a href="${link}" class="px-4 py-2 rounded-full bg-royal/[0.05] border border-royal/[0.1] text-sm text-royal font-medium hover:bg-royal/[0.12] hover:border-royal/[0.2] transition-all duration-300">${kw}</a>`
          }).join('')}
        </div>
      </div>

      <!-- FAQ Section (AEO 핵심: 지역 맞춤 FAQ) -->
      <div class="mb-20 reveal" id="area-faq">
        <div class="text-center mb-14">
          <div class="section-label section-label-royal mx-auto mb-6"><span class="w-1.5 h-1.5 rounded-full bg-royal"></span>FAQ</div>
          <h2 class="display-md text-charcoal">${area.name} 주민분들이<br><span class="royal-grad-text">자주 묻는 질문</span></h2>
        </div>
        <div class="space-y-3">
          ${faqs.map((f, i) => `
          <details class="card-premium group" ${i === 0 ? 'open' : ''}>
            <summary class="flex items-center justify-between p-6 cursor-pointer select-none">
              <div class="flex items-center gap-4 flex-1 min-w-0">
                <span class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><span class="text-white text-xs font-bold">Q</span></span>
                <h3 class="font-bold text-charcoal text-sm md:text-base">${f.q}</h3>
              </div>
              <i class="fas fa-chevron-down text-gray-300 group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4"></i>
            </summary>
            <div class="px-6 pb-6 pt-0">
              <div class="pl-12 text-gray-500 text-sm leading-relaxed faq-answer" data-speakable="true">${f.a}</div>
            </div>
          </details>
          `).join('')}
        </div>
      </div>

      <!-- Clinic info -->
      <div class="glass-royal rounded-3xl p-8 reveal relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-royal/[0.04] rounded-full blur-[60px]"></div>
        <h2 class="font-extrabold text-charcoal mb-6 text-lg relative z-10">강남치과의원 정보</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-500 relative z-10">
          <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-map-marker-alt text-white text-[10px]"></i></div><span>경북 영주시 대학로 217, 2층<br><span class="text-xs text-gray-400">택지 사거리 모모제인 건물</span></span></div>
          <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-phone text-white text-[10px]"></i></div><a href="tel:054-636-8222" class="hover:text-royal transition font-bold">054-636-8222</a></div>
          <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-clock text-white text-[10px]"></i></div><span>평일 09:00–17:30 · 토일 휴무</span></div>
          <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg royal-grad flex items-center justify-center flex-shrink-0"><i class="fas fa-car text-white text-[10px]"></i></div><span>건물 후면 지상·지하 주차장</span></div>
        </div>
        <div class="mt-6 flex flex-wrap gap-3 relative z-10">
          <a href="https://map.naver.com/p/entry/place/1099573867" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#03C75A]/10 text-[#03C75A] text-xs font-bold hover:bg-[#03C75A]/20 transition-colors"><i class="fas fa-map"></i>네이버 지도</a>
          <a href="https://place.map.kakao.com/" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEE500]/20 text-yellow-700 text-xs font-bold hover:bg-[#FEE500]/30 transition-colors"><i class="fas fa-map"></i>카카오맵</a>
          <a href="/directions" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal/10 text-royal text-xs font-bold hover:bg-royal/20 transition-colors"><i class="fas fa-location-arrow"></i>상세 오시는 길</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 주변 지역 링크 (Internal Linking SEO) -->
  <section class="py-14 section-snow">
    <div class="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
      <h2 class="font-extrabold text-charcoal mb-6 text-center">주변 지역에서도 찾아오시는 강남치과의원</h2>
      <p class="text-center text-gray-400 text-sm mb-8">영주 근처 어디서든 구강외과 전문의 2인의 진료를 받으실 수 있습니다</p>
      <div class="flex flex-wrap justify-center gap-3">
        ${Object.entries(areaData).filter(([k]) => k !== decoded).map(([k, v]) => `
        <a href="/area/${encodeURIComponent(k)}" class="px-5 py-2.5 rounded-full bg-white border border-gray-100 text-sm font-medium text-gray-500 hover:text-royal hover:border-royal/30 transition-all duration-300">${v.name} <span class="text-gray-300 text-xs">${v.driveTime}</span></a>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-28 bg-white relative overflow-hidden">
    <div class="orb orb-royal w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"></div>
    <div class="absolute inset-0 grid-pattern opacity-20"></div>
    <div class="royal-line-h absolute top-0 left-0 right-0"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
      <div class="w-20 h-20 mx-auto rounded-2xl royal-grad flex items-center justify-center mb-8 royal-glow">
        <i class="fas fa-calendar-check text-white text-3xl"></i>
      </div>
      <h2 class="display-lg text-charcoal mb-6">지금 바로<br><span class="royal-grad-text">상담 예약하세요</span></h2>
      <p class="text-gray-400 text-lg mb-10" data-speakable="true">${area.name}에서 ${area.driveTime}이면 도착합니다.<br>구강외과 전문의 2인이 직접 상담드립니다.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/reservation" class="w-full sm:w-auto btn-primary !py-5 !px-12 !font-extrabold"><i class="fas fa-calendar-check"></i>상담 예약하기</a>
        <a href="tel:054-636-8222" class="w-full sm:w-auto btn-subtle justify-center"><i class="fas fa-phone text-sm text-royal"></i>054-636-8222</a>
      </div>
    </div>
  </section>
  `

  return { html, title, description, schemas, keywords }
}

// 모든 area 키 노출 (sitemap용)
export function getAllAreaKeys(): string[] {
  return Object.keys(areaData)
}

// 지역별 우선순위 정보 (sitemap 최적화용)
export function getAreaPriority(key: string): number {
  return areaData[key]?.priority || 3
}
