/**
 * 자동매매 관측 시스템 구성도.
 * 색은 전부 테마 토큰이라 라이트/다크에서 자동으로 따라갑니다.
 */
export function ObservabilityDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1480 620"
      className={className}
      role="img"
      aria-label="자동매매 서비스의 로그는 Alloy를 거쳐 Loki로, 메트릭은 Alloy와 Redis Exporter를 거쳐 Prometheus로 흐르고, 두 저장소의 알림 규칙이 각각 Discord로 알림을 보낸다. 아래로 CI/CD 배포가 /health/deep 점검을 거쳐 실패 시 자동 롤백된다."
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <marker id="obs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--foreground)" />
        </marker>
        <marker id="obs-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--primary)" />
        </marker>
      </defs>

      {/* 자동매매 서비스 */}
      <rect x="0" y="60" width="290" height="410" rx="16" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="24" y="106" fontSize="27" fontWeight="700" fill="var(--foreground)">자동매매 서비스</text>
      <text x="24" y="156" fontSize="23" fill="var(--foreground)" fillOpacity="0.82">FastAPI</text>
      <text x="24" y="196" fontSize="23" fill="var(--foreground)" fillOpacity="0.82">Celery worker · beat</text>
      <text x="24" y="236" fontSize="23" fill="var(--foreground)" fillOpacity="0.82">Streamer</text>
      <text x="24" y="276" fontSize="23" fill="var(--foreground)" fillOpacity="0.82">Redis · PostgreSQL</text>
      <line x1="24" y1="316" x2="266" y2="316" stroke="var(--border)" strokeWidth="2" />
      <text x="24" y="356" fontSize="20" fontWeight="700" fill="var(--amber)">autoheal 대상에서 제외</text>
      <text x="24" y="390" fontSize="19" fill="var(--muted-foreground)">진행 중 주문이 끊길 위험이</text>
      <text x="24" y="418" fontSize="19" fill="var(--muted-foreground)">자동 재시작 이득보다 크다</text>

      {/* 서비스 → Alloy / Redis Exporter */}
      <line x1="290" y1="150" x2="432" y2="150" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />
      <text x="361" y="132" fontSize="20" fill="var(--muted-foreground)" textAnchor="middle">로그·메트릭</text>
      <line x1="290" y1="390" x2="432" y2="390" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />
      <text x="361" y="372" fontSize="20" fill="var(--muted-foreground)" textAnchor="middle">heartbeat</text>

      {/* Alloy */}
      <rect x="440" y="90" width="260" height="120" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="464" y="134" fontSize="27" fontWeight="700" fill="var(--foreground)">Alloy</text>
      <text x="464" y="170" fontSize="19" fill="var(--muted-foreground)">컨테이너 자동 발견</text>
      <text x="464" y="196" fontSize="19" fill="var(--muted-foreground)">수집 에이전트 하나로 통일</text>

      {/* Redis Exporter */}
      <rect x="440" y="330" width="260" height="120" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="464" y="374" fontSize="26" fontWeight="700" fill="var(--foreground)">Redis Exporter</text>
      <text x="464" y="410" fontSize="19" fill="var(--muted-foreground)">Redis 키 값을 메트릭으로</text>
      <text x="464" y="436" fontSize="19" fill="var(--muted-foreground)">승격 (추가 코드 0)</text>

      {/* Alloy → Loki / Prometheus */}
      <line x1="700" y1="130" x2="822" y2="130" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />
      <text x="761" y="112" fontSize="20" fill="var(--muted-foreground)" textAnchor="middle">로그</text>
      <path d="M700 180 H760 V340 H822" fill="none" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />
      <text x="772" y="262" fontSize="20" fill="var(--muted-foreground)">메트릭</text>
      <line x1="700" y1="390" x2="822" y2="390" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />
      <text x="761" y="422" fontSize="20" fill="var(--muted-foreground)" textAnchor="middle">heartbeat</text>

      {/* Loki + money-path 규칙 */}
      <rect x="830" y="60" width="300" height="180" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="854" y="106" fontSize="27" fontWeight="700" fill="var(--foreground)">Loki</text>
      <text x="854" y="140" fontSize="19" fill="var(--muted-foreground)">로그 저장 · 보관 14일</text>
      <line x1="854" y1="160" x2="1106" y2="160" stroke="var(--border)" strokeWidth="2" />
      <text x="854" y="192" fontSize="21" fontWeight="700" fill="var(--amber)">money-path 규칙</text>
      <text x="854" y="220" fontSize="19" fill="var(--muted-foreground)">고아 주문 · 주문 실행 실패</text>

      {/* Prometheus + infra-health 규칙 */}
      <rect x="830" y="300" width="300" height="180" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="854" y="346" fontSize="27" fontWeight="700" fill="var(--foreground)">Prometheus</text>
      <text x="854" y="380" fontSize="19" fill="var(--muted-foreground)">메트릭 저장 · 시계열</text>
      <line x1="854" y1="400" x2="1106" y2="400" stroke="var(--border)" strokeWidth="2" />
      <text x="854" y="432" fontSize="21" fontWeight="700" fill="var(--primary)">infra-health 규칙</text>
      <text x="854" y="460" fontSize="19" fill="var(--muted-foreground)">5xx · p95 · 큐 적체 · heartbeat</text>

      {/* 규칙 → Discord */}
      <path d="M1130 150 H1185 V265 H1232" fill="none" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />
      <path d="M1130 390 H1185 V315 H1232" fill="none" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#obs-arrow)" />

      {/* Discord */}
      <rect x="1240" y="230" width="240" height="120" rx="14" fill="var(--ink)" />
      <circle cx="1266" cy="272" r="9" fill="var(--live)" />
      <text x="1286" y="281" fontSize="27" fontWeight="700" fill="var(--ink-foreground)">Discord</text>
      <text x="1264" y="315" fontSize="19" fill="var(--ink-foreground)" fillOpacity="0.65">알림 10종</text>
      <text x="1264" y="340" fontSize="19" fill="var(--ink-foreground)" fillOpacity="0.65">critical 7 · warning 3</text>

      {/* 구분선 */}
      <line x1="0" y1="520" x2="1480" y2="520" stroke="var(--border)" strokeWidth="2" />

      {/* 배포 게이트 */}
      <rect x="0" y="546" width="240" height="74" rx="12" fill="var(--card)" stroke="var(--primary)" strokeWidth="2.5" />
      <text x="22" y="580" fontSize="22" fontWeight="700" fill="var(--primary)">CI/CD 배포</text>
      <text x="22" y="606" fontSize="19" fill="var(--muted-foreground)">GitHub Actions</text>
      <line x1="240" y1="583" x2="316" y2="583" stroke="var(--primary)" strokeWidth="2.5" markerEnd="url(#obs-arrow-green)" />
      <rect x="324" y="546" width="270" height="74" rx="12" fill="var(--card)" stroke="var(--primary)" strokeWidth="2.5" />
      <text x="346" y="580" fontSize="22" fontWeight="700" fill="var(--foreground)" fontFamily="ui-monospace, Menlo, monospace">
        /health/deep
      </text>
      <text x="346" y="606" fontSize="18" fill="var(--muted-foreground)">DB · Redis · 워커 한 번에 점검</text>
      <line x1="594" y1="583" x2="670" y2="583" stroke="var(--primary)" strokeWidth="2.5" markerEnd="url(#obs-arrow-green)" />
      <text x="684" y="591" fontSize="22" fontWeight="700" fill="var(--amber)">실패하면 자동 롤백</text>
      <text x="1480" y="591" fontSize="19" fill="var(--muted-foreground)" textAnchor="end">
        대시보드·알림 규칙은 provisioning YAML로 코드 관리 (Grafana)
      </text>
    </svg>
  )
}

export const observabilityDiagramCaption =
  "인프라 열화는 메트릭이, 매매 실패는 로그가 잡는다. 성격이 다른 두 감시를 끝까지 섞지 않는 것이 이 구조의 핵심."
