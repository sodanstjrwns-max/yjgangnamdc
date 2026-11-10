// ===== 구글 전용 검색 제외 (2026-11-10) =====
// 배경: 구글이 사이트 단위로 낮게 평가해 노출이 죽은 상태. 방문 대부분은 네이버에서 용어 사전으로 들어온다.
//       그래서 대량 생성 구역(이 사이트는 "용어 사전"만)을 구글에만 검색 제외해, 구글이 보는 사이트를 병원 핵심 페이지로 줄인다.
// 방식: 요청 User-Agent 가 구글 크롤러(Googlebot · Google-InspectionTool)이고, 대상 경로의 200 HTML 응답일 때만
//       응답 헤더 `X-Robots-Tag: googlebot: noindex` 를 붙인다.
//       네이버(Yeti)·Bing·일반 브라우저·AI 봇 응답은 헤더·본문이 한 글자도 바뀌지 않는다.
//       HTML 메타 태그·robots.txt·sitemap·canonical·본문·스키마는 건드리지 않는다. 301·404·410 에는 붙이지 않는다.
// 범위: 용어 사전 목록 `/dictionary` 와 상세 `/dictionary/<slug>` 만. 지역·가이드·비교·증상·대상·블로그 등은 대상이 아니다.
// 되돌리기: isGoogleHiddenPath 가 항상 false 를 돌려주게 하면 끝 (미들웨어는 그대로 둬도 아무 일도 하지 않는다).

export const GOOGLE_HIDE_HEADER = 'X-Robots-Tag'
export const GOOGLE_HIDE_VALUE = 'googlebot: noindex'

// 구글 검색 크롤러 판정. Google-Extended · GoogleOther · AdsBot · Mediapartners 는 대상이 아니다.
export function isGoogleCrawler(userAgent: string | undefined | null): boolean {
  return /googlebot|google-inspectiontool/i.test(userAgent || '')
}

// 구글에만 검색 제외할 경로 (한곳에서만 판정)
export function isGoogleHiddenPath(path: string): boolean {
  return path === '/dictionary' || path.startsWith('/dictionary/')
}
