export const profile = {
  name: "박태원",
  nameEn: "Taewon Park",
  /** 헤드라인 — 항상 두 줄로 고정. highlight 는 포인트 컬러 */
  headline: {
    line1: "아이디어를 가장 빠르고 값싸게",
    highlight: "현실로 바꾸는",
    line2After: " 개발자",
  },
  /** 헤드라인 아래 한 줄 */
  subline: "개발이란 나의 아이디어를 현실화하는 가장 쉽고 간단한 도구라고 믿는 엔지니어",
  /** 히어로 사진 (배경 제거된 PNG/WebP) */
  photo: "/profile-hero.webp",
  /** 한줄 소개 (노션 이력서 문장) — strong 은 포인트 컬러 강조 */
  intro: [
    { text: "개발은 " },
    { text: "아이디어를 실현하는 가장 값싸고 빠른 도구", strong: true },
    { text: "라고 생각하는 엔지니어입니다. 익숙한 기술을 고집하지 않고 " },
    { text: "제품에 지금 필요한 것이 무엇인지", strong: true },
    {
      text: "를 기준으로 선택해 왔습니다. 애드알파에서 혼자 인프라·백엔드·앱·웹·모니터링부터 AI 에이전트까지 전부 구현하며, 처음 다루는 영역도 빠르게 익혀 제품을 완성하는 경험을 갖추었습니다.",
    },
  ],
  email: "taewonb916@gmail.com",
  github: "https://github.com/now-eat-krap",
  githubLabel: "github.com/now-eat-krap",
  githubHandle: "now-eat-krap",
  /** 이력서 PDF 경로. public/ 에 파일을 넣고 경로를 적으면 헤더 버튼이 생깁니다. */
  resumeUrl: undefined as string | undefined,
  siteUrl: "https://taewon.dev",
  /** 소개 영역 왼쪽 팩트 */
  facts: [
    {
      label: "학력",
      title: "가고시마 대학교 (일본) · 기계공학과",
      detail: "2019.04 – 2023.03 · 기계제어연구실 학부 연구생",
    },
    {
      label: "수상",
      title: "SSAFY 13기 최우수상 1회 · 우수상 2회",
      detail: "싸피밥피 / APILOG · See You Letter",
    },
    { label: "어학", title: "JLPT N1", detail: "" },
  ],
  /** 경력 타임라인 (최신순). current: 점을 포인트 컬러로 */
  timeline: [
    {
      period: "2026.01 – 2026.08",
      title: "애드알파 · Product Engineer",
      current: false,
      bullets: [
        [
          { text: "암호화폐 자동매매 서비스를 " },
          { text: "1인으로 개발·운영", strong: true },
          { text: " — 인프라·백엔드·모바일 앱·웹·모니터링·AI 에이전트 전 영역 담당" },
        ],
        [
          { text: "Prometheus·Loki 자체 호스팅 관측 스택 구축, 감지 수단 전무 → " },
          { text: "알림 10종", strong: true },
          { text: " 자동 감지 체계" },
        ],
      ],
    },
    {
      period: "2025.01 – 2025.12",
      title: "삼성 청년 SW 아카데미 (SSAFY 13기)",
      current: false,
      bullets: [
        [{ text: "Java/Spring Boot 풀스택 + 알고리즘 트랙" }],
        [
          { text: "3개 팀 프로젝트 수행 — " },
          { text: "최우수상 1회", strong: true },
          { text: "(싸피밥피), " },
          { text: "우수상 2회", strong: true },
          { text: "(APILOG · See You Letter)" },
        ],
      ],
    },
    {
      period: "2022.02 – 2023.03",
      title: "기계제어연구실 · 학부 연구생",
      current: false,
      bullets: [
        [
          { text: "「유치원생의 운동과 집중력의 관계를 해석하기 위한 시스템 개발」", href: "/papers/graduation-thesis" },
          { text: " — 측정 데이터 수집부터 표시까지 자동화하는 시스템 전반을 설계·구현" },
        ],
      ],
      link: {
        label: "PC Conference 2023 발표 논문 — 「그림책 읽어주기 시간에 아동의 머리 움직임을 시각화하는 시스템」",
        href: "/papers/pc-conference-2023",
      },
    },
  ],
  /** 보유 기술 — 첫 그룹(주력)은 포인트 컬러 필 */
  skills: [
    { label: "Backend", items: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL"], primary: false },
    { label: "Infra", items: ["Docker", "Nginx", "GitHub Actions", "Prometheus", "Grafana", "Loki"], primary: false },
    { label: "Frontend · Mobile", items: ["Next.js", "React", "Flutter", "Dart"], primary: false },
    { label: "AI", items: ["Claude Code 워크플로", "LLM 파이프라인", "Prompt Engineering"], primary: false },
  ],
  contact: {
    title: "함께 만들고 싶은 제품이 있다면",
    body: "메일 주시면 하루 안에 답장드립니다.",
  },
}

export type RichText = { text: string; strong?: boolean; href?: string }[]
