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
    title: "0화 · 프로젝트/역할",
    description:
      "투자 지표를 조합해 전략을 만들고, 브라우저에서 바로 백테스트까지 할 수 있는 서비스를 PL로서 총괄했습니다.",
    image:"/one-more-coin/0.gif",
    detail: `
**프로젝트 소개**

One-More-Coin은 이동평균선, RSI, 캔들 패턴 등 여러 기술 지표를 조합해
나만의 전략을 만들고, 과거 데이터로 성능을 검증할 수 있는 백테스트 플랫폼입니다.

**내 역할 (PL)**

- 요구사항 정의 및 서비스 콘셉트 수립
- 기술 스택 선택(Vue3 프런트, Spring Boot 백엔드, FastAPI 시뮬레이션 엔진)
- 홈서버 기반 Docker 배포 환경까지 전체 흐름 설계·조정

**UX 목표**

- ‘전략 설계 → 백테스트 → 리포트’가 한 흐름 안에서 이어지는 원스톱 UX
- 사용자가 코드 없이 전략을 만들고 결과를 해석할 수 있는 경험 제공
    `,
    tags: ["백테스트", "PL", "전략 플랫폼"],
    features: [
      "투자 전략 백테스트 서비스 기획",
      "프런트·백엔드·시뮬레이션 엔진 아키텍처 설계",
      "홈서버 기반 운영·배포 총괄",
    ],
  },
  {
    title: "1화 · 핵심 요구/지표",
    description:
      "코드를 모르는 투자자도 이동평균·RSI·캔들 패턴을 조합해 전략을 정의하고, 지표 기반 성과를 비교할 수 있게 설계했습니다.",
    detail: `
**핵심 요구**

- ‘지표 조합만으로 전략을 만들 수 있을 것’
- ‘성과를 숫자와 차트로 직관적으로 이해할 수 있을 것’

**지표·조건 설계**

- 이동평균선(단기·장기 교차), RSI 구간, 캔들 패턴을 UI 상의 조건 블록으로 제공
- 진입·청산 로직을 드래그&드롭에 가까운 방식으로 구성 가능하게 설계

**성과 지표/프리셋**

- 정의된 전략은 프리셋으로 저장·불러오기가 가능
- 백테스트 이후 수익률, 승률, 최대 낙폭 등 성능 지표를
  표준화된 형식으로 비교할 수 있도록 요구사항을 정리했습니다.
    `,
    tags: ["기술지표", "전략 요구사항", "무코드 전략 설계"],
    features: [
      "이동평균·RSI·캔들 패턴 기반 진입/청산 조건 정의",
      "전략 프리셋 저장·불러오기",
      "수익률·위험 지표 표준화 및 비교",
    ],
  },
  {
    title: "2화 · 설계 결정",
    description:
      "Vue3·Spring Boot·FastAPI를 분리한 3계층 구조와 홈서버·Docker 기반 인프라를 선택했습니다.",
    detail: `
**아키텍처 분리**

- 프런트엔드: Vue3로 전략 설정 화면, 실시간 차트, 리포트 뷰 구현
- 백엔드: Spring Boot로 인증·회원·전략 관리 API 담당
- 엔진: Python 기반 FastAPI에서 실제 백테스트 계산 수행

**기술 선택 배경**

- 지표·전략 로직은 Python 생태계(예: Backtrader)와 궁합이 좋아 FastAPI에 집중
- 인증·도메인 로직은 Spring Boot로 분리해 확장성과 안정성을 확보

**리포지토리·인프라 구조**

- 리포지토리 루트에 \`backend-java\`, \`backend-python\`, \`frontend\` 디렉터리 구성
- \`docker-compose\`로 세 서비스를 하나의 네트워크에서 기동해
  개발·운영 환경을 통일하고, 각 계층을 느슨하게 분리했습니다.
    `,
    tags: ["Vue3", "Spring Boot", "FastAPI", "아키텍처 설계"],
    features: [
      "Vue3 전략/리포트 프런트엔드",
      "Spring Boot 인증·전략 관리 API",
      "FastAPI 기반 백테스트 엔진 분리",
    ],
  },
  {
    title: "3화 · 대표 기능 1",
    description:
      "지표 블록을 조합해 전략을 구성하고, 하나의 시나리오로 저장·재사용할 수 있는 전략 설계 기능을 만들었습니다.",
    detail: `
**기능 개요**

대표 기능 중 첫 번째는 ‘전략 설계 UI’입니다.
사용자는 종목, 기간, 초기 자본을 설정한 뒤 지표 조건을 조합해 전략을 만들 수 있습니다.

**전략 설계 플로우**

- 이동평균 크로스, RSI 범위, 캔들 패턴 조건 등을 선택·조합
- 매수·매도 규칙을 조건 블록으로 구성해 전략 정의
- 전략을 시나리오 단위로 저장해 한 번 설정한 전략을 계속 재사용

**재사용성/UX 설계**

- 동일 조건으로 여러 종목·다른 기간에 재적용할 수 있도록 설계
- 실제 트레이더가 자주 쓰는 조건을 빠르게 다시 불러올 수 있게
  프리셋·복사 기능까지 고려해 UX를 구성했습니다.
    `,
    tags: ["전략 설계 UI", "시나리오 관리", "프리셋"],
    features: [
      "지표 블록 조합 기반 전략 설계",
      "전략 시나리오 저장·복사·재사용",
      "종목·기간을 바꿔 동일 전략 재실행",
    ],
  },
  {
    title: "4화 · 대표 기능 2",
    description:
      "백테스트 결과를 수익 곡선·자산 추이·매수/매도 마커 등으로 시각화하는 결과 차트 기능을 구현했습니다.",
    detail: `
**기능 개요**

두 번째 대표 기능은 ‘결과 시각화’입니다.
백테스트가 끝난 뒤 단순 총 수익률이 아니라, 시간에 따른 전략 동작을 눈으로 따라갈 수 있게 했습니다.

**시각화 요소**

- 일자별 자산 곡선(에쿼티 커브)
- 매수·매도 시점 마커 표시
- 기간별 손익, 최대 낙폭, 연속 손실 구간 등의 지표를
  차트와 테이블로 함께 제공

**설계 포인트**

- 프런트에서 차트 라이브러리를 연동해 시계열 데이터를 직관적으로 표현
- 백엔드는 캔들·체결 내역을 시계열 데이터로 가공해 전달해,
  “어느 구간에서 전략이 강했고 약했는지” 해석 가능하도록 했습니다.
    `,
    tags: ["시각화", "수익 곡선", "매수/매도 마커"],
    features: [
      "수익률·자산 곡선 실시간 차트",
      "매수/매도 시점을 마커로 표시",
      "기간별 손익·MDD 등 통계 테이블",
    ],
  },
  {
    title: "5화 · 대표 기능 3",
    description:
      "거래 내역·지표 값·위험 지표를 모아 전략별 상세 리포트를 제공하는 분석 기능을 설계했습니다.",
    detail: `
**기능 개요**

세 번째 대표 기능은 ‘전략별 상세 분석 리포트’입니다.
각 전략의 성과를 한 화면에서 깊게 들여다볼 수 있도록 구성했습니다.

**분석 항목**

- 거래 내역, 평균 수익/손실, 승률, 최대 낙폭(MDD) 등 핵심 성과 지표 제공
- 특정 거래를 클릭하면 당시 캔들과 RSI, 이동평균 간격 등 지표 값을 함께 노출

**활용 관점**

- 왜 그 시점에 진입/청산이 발생했는지 전략의 의사결정을 되짚어볼 수 있음
- 여러 전략을 정량적으로 비교해, 실제 자동매매에 가져갈 후보 전략을
  추리는 기준으로 활용하도록 설계했습니다.
    `,
    tags: ["전략 분석", "리포트", "위험 지표"],
    features: [
      "거래 내역·승률·MDD 등 상세 리포트",
      "개별 거래 시점의 캔들·지표값 조회",
      "전략 간 성능 비교 관점 정리",
    ],
  },
  {
    title: "6화 · 품질/배포",
    description:
      "미니 PC 홈서버와 Docker+GitHub Actions 파이프라인으로 실서비스 수준의 품질·배포 환경을 구성했습니다.",
    detail: `
**인프라 구성**

- 미니 PC + DDNS를 활용해 직접 홈서버를 구축
- \`one-more-coin.com\` 도메인으로 외부에서 접근 가능하도록 설정

**Docker/Compose 전략**

- \`docker-compose\`로 Vue 프런트, Spring Boot, FastAPI, DB를 통합 기동
- 개발용과 운영용 compose 파일을 분리해 로컬·서버 환경을 일관되게 유지

**배포·품질 관리**

- GitHub Actions에서 \`main\` 브랜치 머지 시 Docker 이미지를 자동 빌드 후 홈서버에 배포
- 수동 SSH 없이도 무중단에 가까운 롤링 업데이트를 목표로 구성
- 헬스체크 및 로그 모니터링으로 기본적인 품질 지표를 지속 관리했습니다.
    `,
    tags: ["홈서버", "Docker", "GitHub Actions", "무중단 배포"],
    features: [
      "미니 PC+DDNS 기반 홈서버 운영",
      "docker-compose로 프런트·백엔드 통합 기동",
      "GitHub Actions 자동 빌드·배포 파이프라인",
    ],
  },
  {
    title: "7화 · 문제 해결·회고",
    description:
      "멀티 스택(프런트·Java·Python)과 홈서버 인프라를 다루며 얻은 인사이트를 정리했습니다.",
    detail: `
**기술적 도전**

- Vue3·Spring Boot·FastAPI 세 스택을 동시에 운영하면서
  공통 도메인 모델과 API 규약을 맞추는 데 큰 비용이 든다는 점을 체감
- 언어·프레임워크가 달라도 같은 개념을 공유하도록 스키마·계약을 정리하는 경험을 쌓음

**인프라 관점 회고**

- 홈서버 특성상 클라우드처럼 자유롭게 스케일링하기 어려워,
  백테스트 범위·동시 실행 수에 한계를 둘 수밖에 없음을 확인
- 이후 워커 프로세스 분리와 큐 도입을 통해
  “요청 처리”와 “실제 시뮬레이션”을 분리해야겠다는 인사이트를 얻음

**방향성 정리**

- 전략 지표가 늘어날수록 성능·복잡도가 함께 증가하는 문제를 경험
- ‘모든 걸 다 넣는 도구’보다는, 핵심 지표와 UX에 집중한
  경량화된 백테스트 도구로 발전시키는 것이 더 현실적이라는 결론을 정리했습니다.
    `,
    tags: ["회고", "멀티 스택", "홈서버 운영"],
    features: [
      "공통 도메인·API 규약 정비의 중요성 인지",
      "홈서버 환경에서의 성능·스케일 한계 경험",
      "향후 경량화·워커 구조 등 개선 방향 도출",
    ],
  },
]

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
