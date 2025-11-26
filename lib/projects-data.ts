export interface Project {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  github: string
  demo: string
  features: string[]
  role: string
  duration: string
  contribution?: string
  awards?: string[]
  detailEpisodes?: {
    title?: string
    description?: string
    detail?: string
    features?: string[]
    tags?: string[]
    image?: string
  }[]
}

export const projects: Project[] = [
  {
    title: "One-More-Coin - 백테스팅 플랫폼",
    description: "이동평균·RSI·캔들패턴을 조합해 나만의 전략을 브라우저에서 바로 백테스트하는 웹 서비스",
    longDescription:
      "이동평균·RSI·캔들패턴 등 기술적 지표를 조합해 전략을 만들고, 과거 시세로 바로 백테스트해 성과를 시각화하는 서비스입니다. Vue3 프런트, Spring Boot 메인 API, FastAPI 시뮬레이션 엔진으로 분리했으며 Docker+GitHub Actions로 홈서버에 무중단 배포합니다.",
    image: "/one-more-coin.png",
    tags: ["Vue", "Spring Boot", "FastAPI", "PostgreSQL", "Redis", "Docker", "GitHub Actions"],
    github: "https://github.com/now-eat-krap/One-More-Coin",
    demo: "https://one-more-coin.com",
    features: [
      "이동평균/RSI/캔들패턴 조합 백테스트와 조건 저장",
      "실시간 차트·거래 내역·수익률 리포트 시각화",
      "GitHub Actions+Docker 기반 홈서버 무중단 배포",
      "DDNS 기반 원격 접속, 저비용 인프라 운영",
      "전략별 세부 리포트로 강점/약점 분석",
    ],
    role: "개인 프로젝트 · PL / 풀스택 / 인프라",
    duration: "2025년 6월 (개인 프로젝트, 진행 중)",
    contribution: "기여도 100% · 설계/구현/배포 전담",
    awards: [],
    detailEpisodes: [
      {
        title: "1화 · 프로젝트 개요",
        description: "지표 조합으로 전략을 정의하고 브라우저에서 바로 백테스트하는 목표를 세웠습니다.",
        detail:
          "전략 설계부터 결과 분석까지 원스톱으로 제공하는 것을 목표로 했고, 홈서버에서도 돌아가며 자동 배포까지 포함한 실전형 사이드 프로젝트로 설계했습니다. 사용자는 코드 없이 지표를 조합해 전략을 만들고 바로 성과를 확인할 수 있도록 UX를 구성했습니다.",
        tags: ["백테스트", "전략 설계", "원스톱 UX"],
        features: ["지표 조합 전략 정의", "전략 저장/불러오기", "원스톱 백테스트 흐름"],
      },
      {
        title: "2화 · 구현 기능",
        description: "프런트/백엔드/시뮬레이션 엔진을 분리하고 결과 시각화를 만들었습니다.",
        detail:
          "Vue3로 전략 설정·차트·리포트를 구현하고, Spring Boot로 인증·전략 관리·백테스트 요청 API를 설계했습니다. FastAPI 시뮬레이션 엔진이 지표 조합을 계산하고 Redis 캐시로 중복 연산을 줄였습니다. 수익률·손익 곡선·매수/매도 시점을 시각화해 전략별 강약점을 바로 볼 수 있게 했습니다.",
        tags: ["Vue3", "Spring Boot", "FastAPI", "Redis", "시각화"],
        features: ["전략 설정 UI/리포트", "지표 조합 엔진", "실시간 차트/테이블"],
      },
      {
        title: "3화 · 문제 해결 & 회고",
        description: "홈서버 기반 Docker+GitHub Actions 무중단 배포를 구축했습니다.",
        detail:
          "docker-compose로 프런트·백엔드·인프라를 통합하고, GitHub Actions로 main 머지 시 자동 빌드→배포→롤링 업데이트를 수행해 무중단 배포를 구현했습니다. 미니 PC + DDNS 홈서버를 운영하며 리소스를 최적화하고, 헬스체크와 롤백 규칙으로 다운타임을 최소화했습니다.",
        tags: ["홈서버", "Docker", "GitHub Actions", "무중단 배포"],
        features: ["CI/CD 자동화", "롤링 업데이트", "리소스 최적화 운영"],
      },
    ],
  },
  {
    title: "See You Letter - AI 디지털 타임캡슐",
    description: "AI 톤 보정·음성 복제·NFT 저장으로 감정을 담아 전달하는 디지털 타임캡슐 서비스",
    longDescription:
      "텍스트/음성 편지를 남기면 AI가 톤을 보정하고 음성을 복제해 디지털 타임캡슐로 전달하는 서비스입니다. Spring Boot 백엔드와 Kotlin Compose 프런트를 분리했고, MinIO-S3와 IPFS(Pinata)로 미디어를 안전하게 관리하며 JWT/OAuth2 인증과 예약 발송 스케줄러를 구현했습니다.",
    image: "/see_you_letter.png",
    tags: ["Spring Boot", "Kotlin", "JWT/OAuth2", "MySQL", "MinIO", "IPFS", "Docker", "Jenkins"],
    github: "https://github.com/SeeY0uLetter/SeeYouLetter",
    demo: "",
    features: [
      "텍스트/음성 입력 → AI 보정 및 음성 복제",
      "예약 발송 스케줄러로 지정 시점 전달",
      "편지/오디오를 IPFS에 저장하고 NFT로 민팅",
      "MinIO(S3)+Pinata 연동으로 안전한 파일 관리",
      "Firebase Auth + JWT/OAuth2 인증",
    ],
    role: "음성 합성/앱 개발",
    duration: "2025년 9월 (4주, 팀 프로젝트)",
    contribution: "기여도 25% · Wear OS 개발 및 앱 제작/ 보이스 클로닝 AI",
    awards: ["SSAFY 특화 프로젝트 우수상 (2등)"],
    detailEpisodes: [
      {
        title: "1화 · 아키텍처 & 기술 선택",
        description: "GPU 서버를 외부에 열지 않고 CosyVoice2 워커를 돌릴 수 있는 구조를 설계했습니다.",
        detail:
          "서비스 서버가 편지와 음성 샘플을 MinIO에 업로드하면 Webhook으로 새 작업을 알립니다. 외부에서 닫힌 GPU 서버 워커는 MinIO를 폴링해 새 객체를 감지하고 CosyVoice2로 합성한 뒤 결과만 업로드합니다. Zero-shot 품질을 위해 CosyVoice2 0.5B instruct 모델을 선택하고, MinIO를 큐처럼 사용해 서버 간 결합도를 낮췄습니다.",
        tags: ["CosyVoice2", "MinIO", "Webhook", "GPU Worker"],
        features: ["MinIO+Webhook 폴링 구조", "Zero-shot TTS 모델 선정", "느슨한 결합 아키텍처"],
      },
      {
        title: "2화 · 구현 기능",
        description: "제로샷 합성과 GPU 자원 최적화를 동시에 잡았습니다.",
        detail:
          "CosyVoice2 inference_instruct2로 한국어 편지 낭독 톤을 zero-shot 합성하고, 프롬프트 음성과 instruct로 화자 톤을 조정했습니다. 긴 편지는 문장/글자 단위 chunking 후 배치 처리해 토큰 에러와 VRAM 사용을 줄였고, 워커는 모델을 한 번만 로드해 폴링 루프에서 재사용합니다.",
        tags: ["Zero-shot", "Chunking", "CosyVoice2", "GPU 최적화"],
        features: ["편지 톤 instruct 프롬프트", "텍스트 chunking 처리", "모델 재사용으로 오버헤드 절감"],
      },
      {
        title: "3화 · 문제 해결 & 회고",
        description: "폐쇄망 GPU와 긴 편지 처리 이슈를 해결하고 배운 점을 정리했습니다.",
        detail:
          "방화벽으로 막힌 GPU 서버 대신 MinIO+Webhook+폴링 워커 패턴으로 보안 요구를 지키면서 TTS를 서비스했습니다. 긴 편지에서 토큰 에러가 나던 문제는 chunking과 해시 기반 완료 마커(idempotent 처리)로 재합성을 방지했습니다. 제한된 GPU에서도 여러 사용자의 편지를 안정적으로 처리할 수 있음을 검증했습니다.",
        tags: ["보안", "폴링 워커", "Idempotent", "회고"],
        features: ["방화벽 친화적 파이프라인", "해시 마커로 재합성 방지", "안정화 회고 정리"],
      },
    ],
  },
  {
    title: "APILog - 오픈소스 웹 분석 플랫폼",
    description: "GA/Clarity처럼 이벤트·퍼널·대시보드를 제공하지만 직접 호스팅하는 웹 분석 스택",
    longDescription:
      "FastAPI + InfluxDB + React(Vite) + Docker + nginx로 구성한 self-hosted 웹 분석 플랫폼입니다. JS 스니펫으로 이벤트/페이지뷰를 수집하고 퍼널·리텐션 대시보드를 제공합니다. Monorepo와 Docker Compose로 프런트·백엔드·DB·역프록시를 한 번에 올릴 수 있게 설계했습니다.",
    image: "/apilog.png",
    tags: ["React", "TypeScript", "Vite", "FastAPI", "InfluxDB", "Docker", "Nginx"],
    github: "https://github.com/APIL0g/APILog",
    demo: "",
    features: [
      "JS 스니펫으로 이벤트/페이지뷰 수집",
      "퍼널·리텐션 등 이벤트 기반 대시보드",
      "FastAPI + InfluxDB 시계열 저장/조회",
      "Docker Compose로 프런트/백엔드/DB/nginx 기동",
      "Monorepo 구조로 확장·기여 용이",
    ],
    role: "Full-stack / DevOps (폴더·인프라 설계)",
    duration: "2025년 10~11월 (7주, 팀 프로젝트)",
    contribution: "기여도 20% · 설계/구조/배포",
    awards: [],
    detailEpisodes: [
      {
        title: "1화 · 프로젝트 개요",
        description: "직접 호스팅 가능한 웹 분석 플랫폼을 목표로 이벤트·퍼널·대시보드를 설계했습니다.",
        detail:
          "APILog는 Google Analytics/Clarity처럼 이벤트 기반 분석을 제공하지만, FastAPI + InfluxDB + React 스택으로 누구나 셀프 호스팅할 수 있게 만들었습니다. JS 스니펫으로 수집한 데이터를 시계열로 저장하고, 퍼널·리텐션 대시보드를 통해 행동 분석을 제공합니다.",
        tags: ["Self-hosted", "이벤트 분석", "퍼널", "리텐션"],
        features: ["이벤트/퍼널 목표 정의", "JS 스니펫 수집 흐름", "시계열 대시보드 설계"],
      },
      {
        title: "2화 · 구현 기능",
        description: "Monorepo와 런타임 구성을 잡고 프런트·백엔드·DB를 분리했습니다.",
        detail:
          "front/apps(React/Vite)와 back/app(FastAPI), infra/nginx, examples, docker-compose.*로 상위 구조를 설계했습니다. nginx는 정적 자산과 /api 프록시를 맡고, InfluxDB는 내부 네트워크 전용으로 두어 보안을 높였습니다. 예제와 README로 기여자 친화적인 구조를 문서화했습니다.",
        tags: ["Monorepo", "React/Vite", "FastAPI", "InfluxDB", "nginx"],
        features: ["front/apps·back/app 분리", "nginx 리버스 프록시", "내부 네트워크 DB 구성"],
      },
      {
        title: "3화 · 문제 해결 & 회고",
        description: "Docker Compose와 배포/확장 전략, LLM 인사이트 확장까지 고려했습니다.",
        detail:
          "docker-compose.yml / docker-compose.dev.yml을 분리해 개발용 핫리로드와 운영용 보안 구성을 나눴습니다. env 템플릿으로 Influx 토큰/버킷을 설정하고, LLM 인사이트 컨테이너를 붙일 수 있는 네트워크 토폴로지를 준비했습니다. 향후 GitHub Actions CI/CD와 로깅/모니터링 추가를 전제로 확장 계획을 세웠습니다.",
        tags: ["Docker Compose", "배포", "LLM 인사이트", "확장성"],
        features: ["dev/prod Compose 분리", "env 템플릿 정리", "LLM 연동 대비 네트워크"],
      },
    ],
  },
]
