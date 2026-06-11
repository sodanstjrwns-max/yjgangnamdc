# 강남치과의원 웹사이트

## 프로젝트 개요
- **병원명**: 강남치과의원 (경북 영주시)
- **대표원장**: 이태형 (구강악안면외과 전문의)
- **기술 스택**: Hono + TypeScript + Tailwind CSS (CDN) + Cloudflare Pages
- **디자인**: 화이트 베이스 + 골드(#C9A962) 액센트, Pretendard 폰트

## 현재 완성된 기능

### 레벨 1: 핵심 페이지
| 페이지 | URL | 설명 |
|--------|-----|------|
| 메인 (홈) | `/` | 히어로, 차별점, 주력진료, 의료진, B&A, 리뷰, FAQ, CTA |
| 의료진 목록 | `/doctors` | 이태형 대표원장, 최민혜 원장 소개 |
| 예약/상담 | `/reservation` | 전화예약, 온라인 상담 폼, 진료시간표 |
| 오시는 길 | `/directions` | 구글맵, 교통안내, 주변지역 안내 |
| 비용 안내 | `/pricing` | 임플란트, 교정, 보철, 일반/외과, 틀니 비용표 |

### 레벨 2: 진료 상세 페이지 (17개)
| 카테고리 | 페이지 |
|----------|--------|
| 전문센터 | `/treatments/implant`, `/treatments/cerec`, `/treatments/invisalign`, `/treatments/cosmetic`, `/treatments/wisdom-tooth` |
| 일반 | `/treatments/cavity`, `/treatments/root-canal`, `/treatments/crown`, `/treatments/resin`, `/treatments/whitening` |
| 잇몸/외과 | `/treatments/scaling`, `/treatments/gum`, `/treatments/tmj` |
| 특수 | `/treatments/bone-graft`, `/treatments/sinus-lift`, `/treatments/denture`, `/treatments/prevention` |
| 전체 목록 | `/treatments` |

### 레벨 3: 의사 프로필
- `/doctors/lee-taehyung` — 이태형 대표원장
- `/doctors/choi-minhye` — 최민혜 원장

### 레벨 4: 지역 SEO 랜딩 (14개 지역)
- `/area/영주시`, `/area/영주역`, `/area/풍기`, `/area/영주혁신도시` (1순위 — 핵심)
- `/area/봉화`, `/area/예천`, `/area/안동`, `/area/부석`, `/area/순흥` (2순위 — 주요)
- `/area/단양`, `/area/영덕`, `/area/울진`, `/area/상주`, `/area/문경` (3순위 — 확장)

**지역 SEO 특징:**
- 14개 지역 × 평균 7개 롱테일 키워드 ≈ **100+ 지역+시술 조합 키워드**
- 지역별 맞춤 FAQ (AEO 최적화 — AI 검색 답변용)
- FAQPage + LocalBusiness + MedicalWebPage + BreadcrumbList JSON-LD 스키마
- GeoCircle 기반 ServiceArea 스키마 (15km/50km/100km)
- Speakable 마크업 (음성 검색 최적화)
- 내부 링크 허브 (지역→진료 페이지 링크)

## 구현된 기능
- Schema.org 구조화 데이터 (Dentist 스키마)
- SEO 메타태그 (title, description, canonical, OG)
- 모바일 반응형 레이아웃
- 모바일 플로팅 CTA (전화상담/상담예약)
- 모바일 햄버거 메뉴
- 스크롤 애니메이션 (fade-in)
- FAQ 아코디언
- 온라인 상담 폼

## 보완 필요 항목
- [ ] 병원 내부/외부 사진 (현재 placeholder)
- [ ] 원장 프로필 사진 (현재 placeholder)
- [ ] 치료 사례 Before & After 사진
- [ ] 환자 리뷰 (네이버/구글 리뷰 수집 후)
- [ ] 카카오톡 채널 개설 후 링크 연동
- [ ] 네이버 예약 등록 후 링크 연동
- [ ] Cloudflare 배포 (API 키 설정 필요)
- [ ] 커스텀 도메인 연결 (gndentalclinic.com)

## SEO/AEO 머신 운영 가이드 (시즌 6, 2026-06-11)

### 인덱싱 인프라 (총 ~1,197 URL / 13개 사이트맵)
| 항목 | URL | 설명 |
|------|-----|------|
| 사이트맵 인덱스 | `/sitemap.xml` | 13개 sub-sitemap 통합 (GSC/네이버/Bing 제출용) |
| 사이트맵 진단 | `/sitemap-stats` | URL 수/상태 실시간 대시보드 |
| RSS 피드 | `/feed.xml` | 블로그 색인 가속 |
| AI 요약 | `/llms.txt`, `/llms-full.txt` | LLM 크롤러용 사이트 요약 (AEO) |
| HTML 사이트맵 | `/all-pages` | 사람용 전체 페이지 목록 |

### ⚡ IndexNow (즉시 색인 — Bing/Naver/Yandex)
- **키 파일**: `/{INDEXNOW_KEY}.txt` (자동 서빙)
- **원클릭 제출**: `/ping-search-engines` 페이지의 "지금 제출하기" 버튼
- **API**: `POST /api/indexnow` (body: `{"urls":["/path"]}`, 미지정 시 핵심 10페이지)
- **간편 제출**: `GET /api/indexnow/submit?url=/treatments/implant`
- **자동 제출**: 관리자 페이지에서 블로그/공지 발행·수정 시 자동으로 IndexNow 전송됨

### 📅 lastmod 관리 규칙 (중요!)
- **`src/seo.ts`의 `CONTENT_LASTMOD`가 모든 사이트맵 날짜의 단일 출처**
- 콘텐츠를 실제로 수정한 섹션의 날짜만 갱신할 것 (예: 진료 페이지 수정 → `treatments` 날짜 변경)
- ⚠️ 절대 `new Date()`로 되돌리지 말 것 — Google이 lastmod 신호를 통째로 무시하게 됨
- 의료 콘텐츠 감수일: `MEDICAL_LAST_REVIEWED` (전문의 감수 시점에만 갱신)

### 🤖 AI 봇 정책 (robots.txt)
- **전체 허용**: Googlebot, Yeti(네이버), Bingbot, OAI-SearchBot(ChatGPT Search), ClaudeBot, PerplexityBot, Applebot, Amazonbot, GrokBot, DuckAssistBot
- **정보 페이지만 허용**: GPTBot, Google-Extended, anthropic-ai, Applebot-Extended, Meta-ExternalAgent, cohere-ai (학습용 봇)
- **차단**: AhrefsBot, SemrushBot, Bytespider 등 (트래픽 낭비 봇)

### 콘텐츠 발행 워크플로
1. 관리자 페이지에서 블로그/공지 발행 → IndexNow 자동 전송 ✅
2. 대량 업데이트 시: `/ping-search-engines`에서 원클릭 제출
3. Google은 IndexNow 미지원 → Search Console에서 사이트맵 재제출 또는 URL 검사 도구 사용

## 배포 정보
- **Cloudflare 프로젝트명**: gangnam-dental
- **로컬 개발**: `npm run build && npm run dev:sandbox`

## 연락처
- 전화: 054-636-8222
- 블로그: https://blog.naver.com/gndentalclinic
- 주소: 경북 영주시 대학로 217, 2층

---
Patient Funnel x 강남치과의원 | 2026-02-21
