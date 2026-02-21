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

### 레벨 4: 지역 SEO 랜딩
- `/area/영주시`, `/area/영주역`, `/area/풍기` (1순위)
- `/area/봉화`, `/area/예천`, `/area/안동` (2순위)
- `/area/단양`, `/area/영덕`, `/area/울진` (3순위)

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

## 배포 정보
- **Cloudflare 프로젝트명**: gangnam-dental
- **로컬 개발**: `npm run build && npm run dev:sandbox`

## 연락처
- 전화: 054-636-8222
- 블로그: https://blog.naver.com/gndentalclinic
- 주소: 경북 영주시 대학로 217, 2층

---
Patient Funnel x 강남치과의원 | 2026-02-21
