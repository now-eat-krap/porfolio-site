# Portfolio (Next.js)

개인 포트폴리오 사이트입니다. 프로젝트 소개, 기술 스택, 경력 타임라인, 상세 모달(에피소드별 뷰) 등을 포함합니다.

## 기술 스택
- Framework: Next.js (App Router), TypeScript
- UI/Styling: Tailwind CSS, shadcn/ui
- Icons: lucide-react, tech-stack-icons

## 실행 방법
```bash
# 1) 패키지 설치
npm install

# 2) 개발 서버 실행
npm run dev

# 3) 프로덕션 빌드/실행
npm run build
npm start
```

## 도커 배포
- 빌드: `docker build -t portfolio-site .`
- 실행(HTTP, Cloudflare에서 TLS 종료): `docker run -d -p 3000:3000 --env-file .env.production --name portfolio-site portfolio-site`
- 컨테이너는 `PORT=3000`, `HOSTNAME=0.0.0.0`로 동작하며, 필요한 환경 변수를 `.env.production` 등에 정의해 `--env-file`로 주입하세요.
- Cloudflare에서 HTTPS를 끝내고 오리진에는 HTTP로 연결하면 됩니다.

## 주요 기능
- Hero/Navigation: 넷플릭스 스타일 로고, 앵커 네비게이션
- Projects: 카드 목록 + 상세 모달(회차/에피소드별 콘텐츠)
- About: 프로필/연혁 타임라인, 논문/링크 표시
- Skills: tech-stack-icons 기반 스택 배지
- Contact: CTA/연락 섹션

## 환경
- Node.js 18+ 권장 (React 19 사용 중)
- `public/logo.png`, `public/profile.jpg`에 실제 자산을 넣어 사용하세요.
