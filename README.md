# Portfolio (Next.js)

개인 포트폴리오 사이트입니다. 홈은 네 구역(히어로 · 소개와 경력 · 프로젝트 · 연락)으로 나뉜 한 페이지이고, 프로젝트별 상세 페이지(`/projects/[slug]`)로 구성됩니다. 기본은 화이트 모드이고 헤더의 토글로 다크 모드를 켤 수 있습니다.

## 기술 스택
- Framework: Next.js (App Router), TypeScript
- UI/Styling: Tailwind CSS v4, shadcn/ui, next-themes
- Fonts: Noto Sans KR 700/900(디스플레이, next/font), Pretendard(본문, CDN)
- Icons: lucide-react
- PDF: react-pdf (pdf.js) — `/papers/[slug]` 페이지

## 구조
```
app/
  layout.tsx            메타데이터(OG 포함) · ThemeProvider · 폰트(Noto Sans KR 디스플레이 + Pretendard)
  page.tsx              홈 — ① 히어로 ② 소개와 경력(흰 띠) ③ 프로젝트 ④ 연락(잉크 띠)
  projects/[slug]/      프로젝트 상세 (generateStaticParams로 정적 생성)
  api/ping/route.ts     데모 사이트 생존 확인(서버에서 HEAD 요청) — 홈 카드의 live 배지가 사용
  papers/[slug]/        논문 뷰어 — 한국어판/일본어 원문 PDF 두 컬럼, 스크롤 비율 동기화 (react-pdf)
                        · graduation-thesis (졸업논문 42쪽) · pc-conference-2023 (학회 논문 4쪽)
components/
  site-header.tsx       이름 · 내비 · 이력서 PDF 버튼 · 다크 토글
  hero-section.tsx      상태 배지 · 큰 헤드라인(일부 포인트 컬러) · 버튼 · 사진 타일
  about-career-section.tsx  한줄 소개 + 학력/수상/어학 팩트 | 경력 타임라인 + 보유 기술 필
  eyebrow.tsx / rich-text.tsx  구역 제목(눈썹 라벨) · 강조 텍스트 렌더러
  project-cards.tsx     프로젝트 카드(호버 리프트, 수치 바/카운트업, GIF 프리뷰, live 배지)
  count-up.tsx / live-badge.tsx   클라이언트 모션·배지 컴포넌트
  thesis/               PDF 뷰어(pdf.js 워커는 번들에 포함) — public/thesis/*.pdf 를 읽음
  contact-section.tsx   잉크색 띠 연락 구역(푸터 포함) · site-footer.tsx 는 상세 페이지용
lib/
  profile.ts            헤드라인·소개·팩트·타임라인·스킬·연락 문구 (노션 이력서 기준) · 사진 경로(photo)
  projects-data.ts      프로젝트 본문 (slug, cardTitle, metrics, preview, 상세 섹션 마크다운)
  markdown.tsx          상세 섹션용 경량 마크다운 렌더러
```

## 콘텐츠 수정
- 프로필/경력/스킬: `lib/profile.ts` — 히어로 사진은 `public/profile-hero.webp`(배경 제거 PNG → WebP)
- 프로젝트 추가: `lib/projects-data.ts`에 항목을 추가하면 홈 목록과 `/projects/<slug>` 페이지가 자동 생성됩니다.
- 이력서 PDF: `public/resume.pdf`를 넣고 `lib/profile.ts`의 `resumeUrl`을 `"/resume.pdf"`로 바꾸면 헤더·연락 섹션에 링크가 생깁니다.
- 사이트 도메인: `lib/profile.ts`의 `siteUrl` (OG 메타데이터 기준 URL).
- 논문 추가: `lib/papers.ts`에 항목을 넣고 PDF 두 개를 `public/thesis/` 에 두면 `/papers/<slug>` 가 생성됩니다.

## 실행 방법
```bash
npm install
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 (타입 에러가 있으면 실패합니다)
npm start
```

## 도커 배포
- 빌드: `docker build -t portfolio-site .`
- 실행(HTTP, Cloudflare에서 TLS 종료): `docker run -d -p 3000:3000 --env-file .env.production --name portfolio-site portfolio-site`
- 컨테이너는 `PORT=3000`, `HOSTNAME=0.0.0.0`로 동작합니다.
