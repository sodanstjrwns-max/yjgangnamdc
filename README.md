# 강남치과의원 웹사이트

## 디자인 시스템 v3 "필름: 일상으로의 복귀" (2026-11-05 전면 리디자인, 다크 + 세리프)

- 토큰·공용 셸·홈·하위페이지 재정의가 전부 `src/styles/tailwind.css` 한 파일(→ `public/static/tailwind.css`, `?v=` 내용 해시). 색은 `tailwind.config.cjs` 와 같다: 먹색 `#0A0C0D`(면 `#111415`/`#181C1E`), 상아 글자 `#F3F0E9`, 틸 `#10AFB2`(글자용 밝은 틸 `#5BD6D8`).
- 폰트: 제목 Hahmlet(Google Fonts 세리프, h1·h2 전역) · 본문 Pretendard. 그라데이션 글씨·네온·파티클·커서 연출은 쓰지 않는다. 종이/베이지 톤으로 되돌리지 않는다(2026-11-05 사용자 결정).
- 홈은 풀스크린 사진 장면(SCENE 01~, `.sc-bg`+`.sc-shade`+`.sc-grain`)이 이어지는 필름. 고정 장면(하루의 공정 `.film`, 시설 `.grow`)은 GSAP pin 이 아니라 CSS `position: sticky` + `html.mx:not(.nogs)` 에서만 높이를 늘리는 방식(CLS 0, JS 없으면 정적 레이아웃).
- 공용 셸(헤더·전면 드로어·푸터·모바일 하단바·FAB)은 `src/layout.ts`, 동작은 `public/static/app.js`(헤더·드로어·KST 진료 상태·IO 등장·카운터·라이트박스·로그인·GA4). 홈 연출은 `public/static/immersive.js`(GSAP ScrollTrigger + Lenis 1.1.13 관성 스크롤 — pointer:fine 만, 홈에서만 로드). `data-rv="mask"` 제목은 clip-path 라 IO 가 부모를 관찰한다.
- 진료 시간 규칙은 `src/lib/hours.ts`(서버)와 app.js(클라이언트)에 같은 값으로 둔다. 바뀌면 두 곳을 같이 고친다.
- 제목 줄바꿈은 `src/lib/phrase.ts` 응답 미들웨어가 h1~h3 를 문장·절 단위로 묶는다. 수동 `<br>` 금지. 히어로 제목은 `--fs-hero`(최대 5.6rem)+`text-wrap: balance` 로 폰트 교체 전후 줄 수가 같게 유지한다.
- 하위페이지 원고는 손대지 않고, (1) `tailwind.config.cjs` 에서 gray 스케일 반전·charcoal/ink→상아·snow/lavender/paper→어두운 면·emerald/blue/purple→틸·green/amber/red/orange→어두운 틴트, (2) 옛 클래스(.card-premium .btn-primary .section-label .royal-grad-text .display-* .subpage-hero …)를 `@layer components` 에서 다크 톤으로 재정의, (3) `tailwind.css` 끝에서 `.bg-white`·`from/via/to-white`·`text-gray-200/300` 등을 "면은 어둡게, 글자는 밝게" 뒤집는다. 새 하위페이지도 이 클래스를 그대로 써도 된다.
- 미리보기: `.claude/launch.json` `yjgangnamdc-preview`(wrangler pages dev dist, 8816). 검증 캡처·스크립트는 `tools/immersive/yjgangnamdc/film-20261105/`.

## Tailwind 빌드 CSS (2026-11-01 CDN → 빌드 전환)

공용 화면의 Tailwind를 CDN 실행(`cdn.tailwindcss.com` + 인라인 `tailwind.config`)에서 빌드 CSS로 바꿨다. 사이트 색·폰트 설정은 `tailwind.config.cjs`, 입력은 `src/styles/tailwind.css`, 출력은 `public/static/tailwind.css`다(Tailwind 3.4.17 = CDN과 같은 버전).
- `npm run build`가 `css:build`를 먼저 실행하고, `vite.config.ts`의 `__TAILWIND_CSS_V__`가 새 CSS의 내용 해시를 `?v=`로 붙인다(고정 `?v=` 금지). 새 유틸리티 클래스를 쓰면 커밋 전에 `npm run css:build`로 CSS도 함께 갱신한다.
- 클래스 이름을 문자열 조합(`'mt-' + n`, `` `lg:grid-cols-${n}` ``)으로 만들지 않는다. 빌드는 `src/**`, `public/static/**/*.js`에 그대로 적힌 클래스만 만든다. 불가피하면 `tailwind.config.cjs`의 `safelist`에 추가한다. DB에 저장되는 본문에 새 Tailwind 클래스를 넣는 것도 같은 이유로 피한다.
- `--minify` 금지(cssnano가 색을 hsla로 반올림해 바꿈). browserslist(`defaults`, `safari/ios_saf >= 12`)로 CDN과 같은 `-webkit-` 접두사를 유지한다.
- CDN이 head 끝에 넣던 것과 같은 우선순위를 위해 Tailwind 스타일시트는 다른 모든 스타일시트 뒤에서 로드한다.
- 사이트맵 통계(`/sitemap-stats`)·검색엔진 Ping(`/ping-search-engines`) 유틸 페이지도 같은 CSS를 쓴다(테마가 extend라 기본 색 그대로).

## 프로젝트 개요
- **병원명**: 강남치과의원 (경북 영주시)
- **대표원장**: 이태형 (구강악안면외과 전문의)
- **기술 스택**: Hono + TypeScript + Tailwind CSS (빌드 CSS, 3.4.17) + Cloudflare Pages
- **디자인**: v3 필름 시스템(먹색·상아·틸, Hahmlet/Pretendard, 풀스크린 사진 장면) — 위 '디자인 시스템 v3' 참고

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
