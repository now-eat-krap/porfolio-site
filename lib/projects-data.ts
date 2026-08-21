export interface Project {
  slug: string
  title: string
  /** 홈 목록에 쓰는 짧은 기간 표기 */
  period: string
  /** 홈 목록에 쓰는 참여 형태 (개인/팀, 기여도 등) */
  context: string
  /** 홈 목록에 쓰는 한 줄 요약 */
  summary: string
  /** 홈 카드 제목 (상세 페이지 제목은 title) */
  cardTitle: string
  /** 홈 카드에 보여줄 핵심 수치 (최대 2개) */
  metrics?: { value: string; label: string; bar?: number; countTo?: number; suffix?: string }[]
  /** 호버 시 재생할 움직이는 프리뷰(GIF) */
  preview?: string
  /** 카드 썸네일에서 이미지를 자르지 않고 전체를 보여줄지 (기본: cover=채우기) */
  imageFit?: "cover" | "contain"
  /** 사진 대신 보여줄 다이어그램 컴포넌트 키 */
  diagram?: "observability" | "voice-cloning"
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
  /** 문제 상황 / 해결 / 결과 3단 구성 (있으면 detailEpisodes 대신 이걸 렌더링) */
  sections?: {
    label: string
    /** 섹션 첫 줄 결론 */
    lead?: string
    /** 본문 마크다운 */
    body?: string
    /** '해결' 안의 개별 항목 */
    items?: { kicker: string; title: string; body: string; image?: string }[]
    /** 섹션 전체에 붙는 이미지 */
    image?: string
    /** '결과'의 핵심 수치 */
    metrics?: { value: string; label: string }[]
  }[]
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
    slug: "one-more-coin",
    cardTitle: "백테스팅 엔진 성능 최적화",
    preview: "/one-more-coin/0.gif",
    metrics: [
      { value: "32s → 6.4s", label: "엔드투엔드 · 5배", bar: 0.2 },
      { value: "×", label: "시뮬레이션 단계", countTo: 160 },
    ],
    title: "One-More-Coin - 백테스팅 플랫폼",
    period: "2025.06 – 운영 중",
    context: "개인",
    summary:
      "지표를 조합해 만든 매매 전략을 과거 시세로 검증하는 백테스팅 플랫폼입니다. 단계별 계측으로 병목을 분해해 요청당 30초 걸리던 백테스트를 6초대로 줄였고, 홈서버에서 직접 배포·운영하고 있습니다.",
    description:
      "지표 조합 전략을 브라우저에서 바로 백테스트 — 엔진 최적화로 요청당 32초를 6초까지 단축한 개인 프로젝트",
    longDescription:
      "이동평균·RSI·볼린저밴드·캔들패턴 등 기술적 지표를 조합해 전략을 만들고, 과거 시세로 바로 백테스트해 성과를 시각화하는 서비스입니다. React(Vite) 프런트와 FastAPI+Celery 백엔드, VectorBT·Numba 기반 시뮬레이션 엔진으로 구성했으며, 캔들 데이터는 Redis에 선제 적재해 요청 경로에서 거래소 API 의존을 제거했습니다. 단계별 프로파일링으로 병목을 분해해 엔드투엔드 30~35초를 6.4초까지 단축했습니다.",
    image: "/one-more-coin.png",
    tags: ["React", "FastAPI", "Celery", "Redis", "VectorBT", "Numba", "Docker", "GitHub Actions"],
    github: "https://github.com/now-eat-krap/OMC",
    demo: "https://one-more-coin.com",
    features: [
      "이동평균·RSI·볼린저·캔들패턴 조건 블록 조합 백테스트",
      "TradingView와 캔들·지표값 100% 일치 (타임프레임별 원본 저장)",
      "시뮬레이션 단계 16.1초 → 0.1초 (160배), 엔드투엔드 30~35초 → 6.4초",
      "Redis 선제 적재 + 매일 크론 증분 갱신으로 거래소 API 의존 제거",
      "Docker + GitHub Actions 기반 홈서버 무중단 배포",
    ],
    role: "개인 프로젝트 · 풀스택 / 인프라",
    duration: "2025년 6월 ~ (개인 프로젝트, 진행 중)",
    contribution: "기여도 100% · 설계/구현/배포 전담",
    awards: [],
    sections: [
      {
        label: "문제 상황",
        lead: "수만 캔들 규모 백테스트가 요청당 30~35초. 사용자는 버튼을 누르고 반 분을 기다려야 했다.",
        body: `
추측 대신 엔진에 단계별 계측을 심어, 요청 1회의 시간을 **데이터 수집 / 시그널 생성 / 시뮬레이션 / 결과 분석**으로 분해했다.

병목은 한 곳이 아니었다. 데이터 I/O, 시뮬레이션 루프, 지표 계산, JIT 컴파일에 흩어져 있었고 성격이 전부 달랐다. 단일 처방이 불가능했기 때문에, 이후 최적화는 **병목마다 다른 도구로 대응하는 방식**으로 진행했다.
        `,
      },
      {
        label: "해결",
        lead: "네 갈래 병목에 각각 다른 방법을 적용했다.",
        items: [
          {
            kicker: "데이터 I/O",
            title: "Redis 선제 적재로 요청 경로에서 거래소 API 제거",
            body: `
거래소 API는 호출당 최대 1,000개인데 백테스트 1회에 필요한 캔들은 수만 개다. 요청마다 수십 회의 페이지네이션 왕복과 rate limit 리스크가 생긴다. 서버 기동 시 초기 적재 + 매일 크론 증분 갱신(APScheduler)으로 옮겨, 요청 시점에는 Redis에서 바로 읽게 했다.

RDB가 아니라 인메모리를 고른 이유는 네 가지다.

- 접근 패턴이 "심볼+타임프레임 연속 구간 조회"뿐 — 조인·조건 검색·행 갱신이 없다
- 확정 캔들은 append-only라 트랜잭션 정합성이 필요 없다
- 원본이 거래소에 있어 유실돼도 재적재로 복구된다
- Celery 브로커로 Redis가 이미 스택에 있어 운영 컴포넌트 추가 비용이 0이다

1h를 1d로 합산하지 않고 **타임프레임별 원본을 각각 저장**했다. 저장량은 늘지만 집계 오차가 원천 차단된다.
            `,
          },
          {
            kicker: "시뮬레이션",
            title: "커스텀 로직을 유지한 채 네이티브 속도로",
            body: `
복리 재투자와 코인별 최소주문단위 버림은 캔들 단위 상태 의존 로직이라 순수 벡터 연산으로 표현되지 않는다. 파이썬 루프로 돌리면 수만 캔들에서 수십 초가 걸린다.

VectorBT의 \`from_order_func\`에 직접 작성한 \`@njit\` 주문 함수를 주입해, 커스텀 로직을 유지한 채 시뮬레이션 전체를 네이티브 코드로 실행했다.

- 진입 시 현금 전액을 코인 정밀도 단위로 버림 처리 (정수 연산으로 부동소수점 오차 방지)
- 신호를 1기간 shift해 "어제 신호 → 오늘 시가 진입"을 시뮬레이션
- 주문 함수는 반드시 모듈 레벨에 정의 — 클로저로 두면 요청마다 재컴파일된다
            `,
          },
          {
            kicker: "지표",
            title: "전부가 아니라 순차 의존 구간만 Numba화",
            body: `
SMA·볼린저밴드는 pandas rolling으로 충분히 빠르다. 반면 RSI의 Wilder 스무딩과 EMA는 직전 계산값을 재귀 참조하는 데다 TradingView와 동일한 시딩 방식이 필요해 라이브러리 벡터 연산으로 대체할 수 없다.

이 두 구간만 \`@jit(nopython=True)\`로 처리했다. 전부를 Numba화하지 않은 이유는 코드 복잡도 — **최적화는 병목에만 적용해 유지보수 비용 증가를 최소화**했다. 모든 지표는 Pine Script의 계산 방식(ta.rma, ta.ema)과 동일한 공식으로 구현하고 값 일치를 검증했다.
            `,
          },
          {
            kicker: "JIT 컴파일",
            title: "컴파일 비용을 사용자 경로 밖으로",
            body: `
Numba는 첫 호출 시 수십 초의 컴파일 비용을 낸다. 그대로 두면 첫 사용자가 그 비용을 지불한다.

- 디스크 캐시를 Docker named volume으로 backend·worker 컨테이너가 공유
- 기동 워밍업으로 실전 호출 경로(from_order_func 포함)를 미리 컴파일
- Celery는 prefork 이전 부모 프로세스에서 워밍업해 자식 워커 전체가 결과를 fork로 상속 — 자식마다 워밍업하면 concurrency 수만큼 중복 컴파일된다
- Numba는 int와 float을 다른 시그니처로 보므로, 워밍업 인자 타입을 실제 호출과 정확히 일치시켜야 효과가 있다
            `,
          },
        ],
      },
      {
        label: "결과",
        metrics: [
          { value: "16.1s → 0.1s", label: "시뮬레이션 단계 · 160배" },
          { value: "30~35s → 6.4s", label: "엔드투엔드 · 5배" },
          { value: "100%", label: "TradingView 캔들·지표값 일치" },
        ],
        body: `
BTC/USDT 1h 약 27,000캔들 기준 실측이며, 최적화 전후 결과값 동일성을 검증해 성능과 정확도를 함께 확인했다.
        `,
      },
    ],
  },
  {
    slug: "trading-observability",
    cardTitle: "자동매매 자체 호스팅 모니터링",
    diagram: "observability",
    metrics: [
      { value: "0 → 10종", label: "자동 알림 규칙 · critical 7 / warning 3" },
      { value: "자동 롤백", label: "/health/deep 배포 게이트" },
    ],
    title: "자동매매 서비스 자체 호스팅 관측 시스템",
    period: "2026",
    context: "애드알파 · 1인",
    summary:
      "프로세스는 살아 있는데 주문만 조용히 멈추는 장애를 잡기 위해 만든 자체 호스팅 관측 스택입니다. 인프라 상태는 메트릭으로, 매매 실패는 로그로 나눠 감시하고 이상이 생기면 Discord로 바로 알립니다.",
    description:
      "조용히 죽는 자동매매를 자동 감지 — Prometheus·Loki 이원 감시, 알림 10종, CI/CD 헬스 게이트",
    longDescription:
      "애드알파에서 1인 개발·운영한 암호화폐 자동매매 서비스의 관측 스택입니다. 프로세스는 살아있지만 주문이 멈추는 '조용한 hang'은 예외 기반 SaaS(Sentry 등)의 사각지대였습니다. 인프라 열화는 Prometheus 메트릭으로, 매매 로직 실패는 Loki 로그로 분리 감지하고, Discord 자동 알림과 CI/CD 헬스 게이트(실패 시 자동 롤백)까지 연결했습니다.",
    image: "",
    tags: ["Grafana", "Prometheus", "Loki", "Alloy", "Docker Compose", "Redis Exporter"],
    github: "",
    demo: "",
    features: [
      "알림 규칙 10종(critical 7 / warning 3) Discord 자동 알림",
      "heartbeat를 Redis 값 그대로 메트릭 승격 — 추가 코드 0",
      "money-path 제외, 무상태 서비스만 autoheal 자동 재시작",
      "/health/deep을 CI/CD 배포 게이트로 — 실패 시 자동 롤백",
      "알림·대시보드를 provisioning YAML로 코드 관리",
    ],
    role: "애드알파 · Product Engineer (1인 설계·구축·운영)",
    duration: "2026년 (재직 중 구축)",
    contribution: "기여도 100% · 관측 스택 설계/구축 전담",
    awards: [],
    sections: [
      {
        label: "문제 상황",
        lead: "1인이 개발·운영하는 자동매매 서비스의 가장 큰 취약점은, 자동매매가 조용히 죽는다는 점이었다.",
        body: `
API가 200을 돌려줘도 Celery 워커나 시그널 수집 스트리머가 hang이면 주문이 나가지 않는다. 그런데 기존 수단은 이 상황을 잡지 못했다.

- 프로세스는 살아 있으니 \`restart: always\`가 발동하지 않는다
- Sentry 같은 예외 기반 SaaS는 에러가 발생해야 잡는다 — 예외 없이 멈추는 hang은 사각지대다
- 로그에 주문·거래소 응답이 섞여 있어 외부 전송 자체가 부담이다
- 진단 수단은 SSH 접속 후 \`docker logs\` grep이 전부였다

목표는 **사용자보다 먼저, 자동으로 아는 것**. 그래서 감시 대상을 '요청'이 아니라 **돈이 흐르는 경로**로 정의했다.
        `,
      },
      {
        label: "해결",
        lead: "성격이 다른 두 감시를 끝까지 섞지 않는 구조로 만들었다.",
        items: [
          {
            kicker: "이원 감시",
            title: "인프라 열화는 메트릭, 매매 실패는 로그로",
            body: `
- **infra-health** — 서비스 다운, 5xx>5%, p95>2s, 디스크·메모리, 큐 적체, beat/streamer heartbeat stale을 Prometheus 메트릭으로 감지
- **money-path** — 고아 주문·주문 실행 실패를 Loki 로그에서 발생 즉시 알림

두 그룹은 감지 근거도, 대응 긴급도도 다르다. 한 저장소에 몰아넣지 않고 끝까지 분리했다.
            `,
          },
          {
            kicker: "heartbeat",
            title: "커스텀 exporter를 만들지 않고 Redis 값을 메트릭으로 승격",
            body: `
heartbeat은 이미 Redis에 있는 값이다. \`REDIS_EXPORTER_CHECK_KEYS\`로 노출해 Prometheus 메트릭으로 승격했다 — 별도 코드·배포·유지보수가 **0**이다. "값이 낡았다"는 사실 자체가 장애 신호가 된다.
            `,
          },
          {
            kicker: "자동 재시작",
            title: "money-path는 autoheal 대상에서 제외",
            body: `
autoheal을 붙이되 money-path(api·celery·db·redis·streamer)는 제외했다. **진행 중 주문이 절단될 위험이 자동 재시작의 이득보다 크다**고 판단해 무상태 서비스만 대상으로 했다.
            `,
          },
          {
            kicker: "수집 · 보관",
            title: "에이전트는 Alloy 하나로 통일하고 자체 호스팅",
            body: `
Alloy가 Docker 소켓으로 컨테이너를 자동 발견해 로그는 Loki로, \`/metrics\`는 Prometheus로 보낸다. 운영 포인트를 하나로 줄였다.

외부 SaaS 대신 자체 호스팅을 택한 이유는 주문·거래소 응답이 섞인 로그의 **데이터 통제권**이다. 대신 단일 서버라 Loki는 파일시스템 단일 노드에 보관 14일 — 클러스터 HA를 포기한 트레이드오프다.
            `,
          },
          {
            kicker: "배포 게이트",
            title: "/health/deep을 CI/CD에 연결해 실패 시 자동 롤백",
            body: `
엔드포인트 하나로 DB·Redis·Celery·스트리머 heartbeat까지 한 번에 점검하고, 이를 배포 게이트로 연결했다. 알림·대시보드는 provisioning YAML로 코드 관리해 배포 시 무중단 리로드된다.
            `,
          },
        ],
      },
      {
        label: "결과",
        metrics: [
          { value: "0 → 10종", label: "Discord 자동 알림 규칙 · critical 7 / warning 3" },
          { value: "코드 0줄", label: "heartbeat 메트릭 승격에 든 추가 코드" },
          { value: "SSH grep → 자동", label: "장애를 인지하는 방식" },
        ],
        body: `
백그라운드 프로세스 정지·큐 적체·주문 실패를 Discord로 자동 알림받고, \`/health/deep\` 실패 시 배포가 자동 롤백된다.
        `,
      },
    ],
  },
  {
    slug: "see-you-letter",
    cardTitle: "제로샷 한국어 보이스 클로닝 파이프라인",
    diagram: "voice-cloning",
    title: "See You Letter - AI 디지털 타임캡슐",
    period: "2025.09 · 4주",
    context: "팀 · SSAFY 우수상",
    summary:
      "편지를 지정한 시점에 전달하는 디지털 타임캡슐 서비스에서 음성 합성 파이프라인을 맡았습니다. 제로샷 모델로 15초 남짓한 샘플만으로 화자 음색을 재현해 화자별 학습을 없앴고, 외부 접속이 막힌 GPU 서버는 폴링 구조로 연결했습니다.",
    description: "AI 톤 보정·음성 복제·NFT 저장으로 감정을 담아 전달하는 디지털 타임캡슐 서비스",
    longDescription:
      "텍스트/음성 편지를 남기면 AI가 톤을 보정하고 음성을 복제해 디지털 타임캡슐로 전달하는 서비스입니다. Spring Boot 백엔드와 Kotlin Compose 프런트를 분리했고, MinIO-S3와 IPFS(Pinata)로 미디어를 안전하게 관리하며 JWT/OAuth2 인증과 예약 발송 스케줄러를 구현했습니다.",
    image: "",
    tags: ["Spring Boot", "Kotlin", "JWT/OAuth2", "MySQL", "MinIO", "IPFS", "Docker", "Jenkins"],
    github: "https://github.com/SeeY0uLetter/SeeYouLetter",
    demo: "",
    features: [
      "텍스트/음성 입력 → AI 보정 및 음성 복제",
      "화자당 필요 데이터 수십 분 → 15초 (제로샷 보이스 클로닝)",
      "예약 발송 스케줄러로 지정 시점 전달",
      "편지/오디오를 IPFS에 저장하고 NFT로 민팅",
      "MinIO(S3)+Pinata 연동으로 안전한 파일 관리",
    ],
    role: "음성 합성/앱 개발",
    duration: "2025년 9월 (4주, 팀 프로젝트)",
    contribution: "기여도 25% · Wear OS 개발 및 앱 제작/ 보이스 클로닝 AI",
    awards: ["SSAFY 특화 프로젝트 우수상 (2등)"],
    sections: [
      {
        label: "문제 상황",
        lead: "개인 목소리로 편지를 읽어주려면 화자마다 수십 분 녹음과 파인튜닝이 필요했고, 합성용 GPU는 인바운드 접근이 불가능한 폐쇄망이었다.",
        body: `
통상적인 보이스 클로닝은 화자가 늘어날수록 녹음·학습 비용이 선형으로 증가한다. 서비스로 만들려면 이 비용 구조부터 깨야 했다.

동시에 GPU 서버는 외부에서 접속할 수 없는 망에 있었고, 방화벽 정책은 바꿀 수 없는 조건이었다.
        `,
      },
      {
        label: "해결",
        lead: "학습을 없애고, 연결 방향을 뒤집었다.",
        items: [
          {
            kicker: "모델 선택",
            title: "파인튜닝 대신 제로샷 — CosyVoice2-0.5B",
            body: `
여러 제로샷 TTS를 비교해 CosyVoice2-0.5B를 선택했다. **15초 내외의 샘플만으로 화자 음색을 재현**해 화자별 학습 단계를 완전히 제거했다. 화자가 늘어도 추가 비용이 붙지 않는다.
            `,
          },
          {
            kicker: "폐쇄망 연결",
            title: "MinIO를 우편함으로 두고 워커가 폴링",
            body: `
서비스 서버가 MinIO에 작업을 올리면 GPU 워커가 20초 주기로 폴링해 꺼내간다. **연결을 항상 워커가 걸기 때문에**(아웃바운드 전용) 방화벽 정책을 바꾸지 않고 폐쇄망에서 동작한다. 두 서버는 서로를 직접 호출하지 않아 결합도 낮다.
            `,
          },
          {
            kicker: "합성 품질",
            title: "낭독 톤을 만드는 instruct 프롬프트와 쉼 제어",
            body: `
\`inference_instruct2\`로 한국어 편지 낭독 톤을 zero-shot 합성하고, instruct 프롬프트와 \`[breath]\` 토큰·문장부호 치환으로 낭독 쉼을 유도했다. 속도는 피치를 유지하는 time-stretch로 0.9배 조정했다.
            `,
          },
          {
            kicker: "긴 편지",
            title: "문장 단위 360자 청크로 나눠 배치 처리",
            body: `
긴 편지는 문장 단위로 나눠 360자 청크로 배치 처리해 토큰 에러와 VRAM 사용을 줄였다. 워커는 모델을 한 번만 로드해 폴링 루프에서 재사용한다.
            `,
          },
        ],
      },
      {
        label: "결과",
        metrics: [
          { value: "수십 분 → 15초", label: "화자당 필요한 녹음 데이터" },
          { value: "0", label: "화자별 학습 시간 · GPU 비용" },
          { value: "길이 무관", label: "재귀 재시도로 합성 완주" },
        ],
        body: `
제한된 GPU에서도 여러 사용자의 편지를 안정적으로 처리할 수 있음을 검증했다. 팀 프로젝트로 SSAFY 특화 프로젝트 우수상을 받았다.
        `,
      },
    ],
  },
  {
    slug: "n8n-news",
    cardTitle: "IT 뉴스 · SNS 큐레이션 자동화",
    title: "n8n News - IT 뉴스/SNS 트렌드 큐레이션 파이프라인",
    period: "2026",
    context: "개인 · 기여도 100%",
    summary:
      "매일 쏟아지는 IT 뉴스·SNS·영상 중 읽을 가치가 있는 것만 골라 Discord로 보내주는 자동화 파이프라인입니다. 자체 호스팅한 n8n이 수집하고 LLM이 점수를 매겨, 기준을 넘는 것만 발송합니다.",
    description: "자체 호스팅 n8n과 gpt-4o-mini로 IT 뉴스·SNS·유튜브를 수집·평가해 상위 콘텐츠만 Discord로 보내는 큐레이션 파이프라인",
    longDescription:
      "매일 쏟아지는 IT 정보 중 읽을 가치가 있는 것만 남기기 위해 만든 자동화 파이프라인입니다. Docker로 자체 호스팅한 n8n이 RSSHub·Browserless를 통해 IT 매거진·SNS·유튜브를 수집하고, gpt-4o-mini가 주니어 개발자 관점에서 0~10점을 매깁니다. 수집(Phase 1)과 발송(Phase 2)을 n8n 내장 DataTable로 분리해 비동기화했고, 점수 상위 항목만 Discord로 발송한 뒤 발송 상태를 갱신해 중복 발송을 차단합니다.",
    image: "/n8n/youtube.webp",
    imageFit: "contain",
    metrics: [
      { value: "3종 소스", label: "뉴스 · SNS · 영상 병렬 수집" },
      { value: "0~10점", label: "LLM 평가 후 상위만 발송" },
    ],
    tags: ["n8n", "OpenAI gpt-4o-mini", "Docker", "RSSHub", "Browserless", "Cloudflare Tunnel", "Discord"],
    github: "https://github.com/now-eat-krap/n8n-news",
    demo: "",
    features: [
      "IT 매거진(ITWorld·GeekNews·요즘IT)·SNS·유튜브 3종 소스 병렬 수집",
      "LLM 페르소나 + 날짜 가중치로 0~10점 자동 평가",
      "수집/발송을 DataTable로 분리해 비동기화, 중복 발송 차단",
      "폴백 우선순위(SNS → 뉴스 → 영상) 기반 순차 발송",
    ],
    role: "개인 프로젝트 · 자동화 설계/운영",
    duration: "2026년 (개인 프로젝트, 운영 중)",
    contribution: "기여도 100% · 설계/구현/운영 전담",
    awards: [],
    sections: [
      {
        label: "문제 상황",
        lead: "IT 뉴스·SNS·유튜브는 매일 쏟아지지만, 직접 훑어보는 데 드는 시간이 실제로 얻는 것보다 컸다.",
        body: `
대부분은 한 번 소비하고 끝나는 트렌드거나 이미 아는 내용이다. 그래서 목표를 "모아서 보여주기"가 아니라 **"골라서 보내주기"** 로 잡았다. 수집은 시작일 뿐이고, 핵심은 읽을 가치를 판단하는 기준을 만드는 것이었다.

제약도 분명했다. 개인이 운영하므로 서버·AI 호출 비용을 최소로 유지해야 했고, SNS는 공개 피드조차 RSS를 제공하지 않아 별도 수집 경로가 필요했다.
        `,
      },
      {
        label: "해결",
        lead: "수집·평가·발송을 각각 다른 문제로 보고 따로 설계했다.",
        items: [
          {
            kicker: "실행 환경",
            title: "자체 호스팅 n8n에 수집 보조 컨테이너를 붙임",
            image: "/n8n/news.webp",
            body: `
docker-compose 한 벌로 **n8n**(워크플로우 엔진 · 내장 DataTable을 상태 저장소로), **RSSHub + Browserless**(RSS를 제공하지 않는 SNS 공개 피드를 RSS로 변환), **Cloudflare Tunnel**(포트를 열지 않고 대시보드 접근)을 함께 띄웠다.

SaaS 자동화 도구는 실행 횟수 과금이라 매일 도는 파이프라인에는 비용이 누적된다. 이미 운영 중인 홈서버에 컨테이너를 얹는 쪽이 비용·통제권 모두 유리했다.
            `,
          },
          {
            kicker: "AI 평가",
            title: "페르소나를 고정하고, 성격에 따라 채점 기준을 나눔",
            image: "/n8n/sns.webp",
            body: `
LLM에 *"주니어 개발자를 위해 큐레이션하는 시니어 엔지니어"* 역할을 부여해 평가 관점을 고정했다. 관점이 흔들리면 점수가 매번 달라진다.

- **Type A** (CS·아키텍처·네트워크·OS 등 기초 지식) — 오래돼도 가치가 떨어지지 않으므로 작성일로 감점하지 않는다
- **Type B** (프레임워크·AI 등 트렌드) — 시간이 지나면 무가치해지므로 오래된 것은 점수를 강하게 낮춘다

"최신순"으로는 CS 기초 글이 영원히 묻히고 "점수순"만으로는 철 지난 트렌드가 올라온다. 두 축을 분리한 게 핵심이다. Structured Output Parser로 JSON 형식을 강제해 후속 노드의 파싱 에러도 차단했다.
            `,
          },
          {
            kicker: "비동기 분리",
            title: "수집과 발송을 DataTable로 끊어 놓음",
            body: `
수집·평가는 백그라운드에서 돌며 결과를 \`is_sent: false\` 로 쌓아 두고, 발송은 별도 트리거가 그 창고에서 꺼내 간다. 수집이 느려져도 발송이 막히지 않는다.
            `,
          },
          {
            kicker: "발송",
            title: "SNS → 뉴스 → 영상 폴백 우선순위",
            body: `
미발송 항목을 순서대로 조회해 **먼저 걸리는 하나만** 발송한다. 모든 채널을 한꺼번에 쏟아내지 않아 알림 피로가 없고, 한 채널이 비어도 보낼 거리가 남는다.

Sort(점수 내림차순) → Limit 으로 회차당 개수를 제한하고, 마크다운으로 포맷해 Discord 웹훅으로 보낸 뒤 해당 항목만 \`is_sent: true\` 로 갱신해 생명주기를 닫는다.
            `,
          },
        ],
      },
      {
        label: "결과",
        metrics: [
          { value: "3종 소스", label: "뉴스 · SNS · 영상 병렬 수집" },
          { value: "0~10점", label: "LLM 평가 후 기준 넘는 것만 발송" },
          { value: "중복 발송 0", label: "DataTable 생명주기로 차단" },
        ],
        body: `
매일 무인으로 수집 → 평가 → 발송이 돌아가며, 아키텍처는 노드 단위로 문서화해 재구성이 가능하도록 남겼다.
        `,
      },
    ],
  },
]
