/**
 * 제로샷 보이스 클로닝 파이프라인 구성도.
 * 폐쇄망 GPU와의 연결 방향(폴링) + 워커 내부 합성 단계를 함께 보여줍니다.
 * 색은 전부 테마 토큰이라 라이트/다크에서 자동으로 따라갑니다.
 */
export function VoiceCloningDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1480 620"
      className={className}
      role="img"
      aria-label="서비스 서버와 GPU 워커는 MinIO를 우편함처럼 사용한다. 폐쇄망이라 연결은 항상 워커가 20초 주기로 폴링해서 건다. 워커 안에서는 문장 단위 청크 분할, CosyVoice2 제로샷 합성, 실패 시 재귀 분할 재시도, 속도 조정과 병합이 순서대로 일어난다."
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <marker id="vc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--foreground)" />
        </marker>
        <marker id="vc-arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--amber)" />
        </marker>
        <marker id="vc-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--primary)" />
        </marker>
      </defs>

      {/* 폐쇄망 경계 */}
      <text x="755" y="42" fontSize="20" fontWeight="700" fill="var(--amber)" textAnchor="middle">
        폐쇄망 경계 · 인바운드 차단
      </text>
      <line x1="755" y1="60" x2="755" y2="500" stroke="var(--amber)" strokeWidth="2.5" strokeDasharray="10 9" />

      {/* 서비스 서버 */}
      <rect x="0" y="130" width="250" height="140" rx="16" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="24" y="176" fontSize="26" fontWeight="700" fill="var(--foreground)">서비스 서버</text>
      <text x="24" y="212" fontSize="19" fill="var(--muted-foreground)">Spring Boot</text>
      <text x="24" y="240" fontSize="19" fill="var(--muted-foreground)">편지 예약 · 전달</text>

      {/* 서비스 ↔ MinIO */}
      <line x1="250" y1="200" x2="382" y2="200" stroke="var(--foreground)" strokeWidth="3" markerStart="url(#vc-arrow)" markerEnd="url(#vc-arrow)" />
      <text x="316" y="182" fontSize="19" fill="var(--muted-foreground)" textAnchor="middle">작업 올리기</text>
      <text x="316" y="228" fontSize="19" fill="var(--muted-foreground)" textAnchor="middle">결과 가져가기</text>

      {/* MinIO */}
      <rect x="390" y="130" width="260" height="140" rx="16" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="414" y="176" fontSize="26" fontWeight="700" fill="var(--foreground)">MinIO</text>
      <text x="414" y="212" fontSize="19" fill="var(--muted-foreground)">오브젝트 스토리지</text>
      <text x="414" y="240" fontSize="19" fill="var(--muted-foreground)">작업이 놓이는 우편함</text>

      {/* 폴링 (연결 방향) + 데이터 교환 */}
      <line x1="858" y1="164" x2="662" y2="164" stroke="var(--amber)" strokeWidth="3" strokeDasharray="9 8" markerEnd="url(#vc-arrow-amber)" />
      <text x="760" y="146" fontSize="19" fontWeight="700" fill="var(--amber)" textAnchor="middle">20초 주기 폴링</text>
      <line x1="662" y1="238" x2="858" y2="238" stroke="var(--foreground)" strokeWidth="3" markerStart="url(#vc-arrow)" markerEnd="url(#vc-arrow)" />
      <text x="760" y="272" fontSize="19" fill="var(--muted-foreground)" textAnchor="middle">작업 · 결과</text>

      {/* GPU 워커 그룹 */}
      <rect x="866" y="60" width="614" height="440" rx="18" fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeDasharray="11 8" />
      <text x="890" y="98" fontSize="24" fontWeight="700" fill="var(--foreground)">GPU 워커</text>
      <text x="890" y="126" fontSize="19" fill="var(--muted-foreground)">모델 1회 로드 후 폴링 루프에서 재사용</text>

      {/* ① 청크 분할 */}
      <rect x="890" y="146" width="566" height="80" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="914" y="182" fontSize="22" fontWeight="700" fill="var(--foreground)">① 문장 단위 360자 청크 분할</text>
      <text x="914" y="210" fontSize="19" fill="var(--muted-foreground)">긴 편지의 토큰 에러 · VRAM 사용 감소</text>

      <line x1="1173" y1="226" x2="1173" y2="250" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#vc-arrow)" />

      {/* ② 합성 */}
      <rect x="890" y="258" width="566" height="118" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="914" y="294" fontSize="22" fontWeight="700" fill="var(--foreground)">② CosyVoice2 제로샷 합성</text>
      <text x="914" y="322" fontSize="19" fill="var(--muted-foreground)">15초 샘플 · instruct 프롬프트 · [breath] 토큰</text>
      <text x="914" y="354" fontSize="19" fontWeight="700" fill="var(--amber)">실패 시 절반씩 재귀 분할 재시도 (최대 4단계)</text>

      <line x1="1173" y1="376" x2="1173" y2="400" stroke="var(--foreground)" strokeWidth="3" markerEnd="url(#vc-arrow)" />

      {/* ③ 후처리 */}
      <rect x="890" y="408" width="566" height="80" rx="14" fill="var(--card)" stroke="var(--foreground)" strokeWidth="3" />
      <text x="914" y="444" fontSize="22" fontWeight="700" fill="var(--foreground)">③ 피치 유지 0.9× · 오디오 병합</text>
      <text x="914" y="472" fontSize="19" fill="var(--muted-foreground)">낭독 속도를 늦추되 음색은 그대로</text>

      {/* 구분선 */}
      <line x1="0" y1="536" x2="1480" y2="536" stroke="var(--border)" strokeWidth="2" />

      {/* 기존 방식 → 제로샷 */}
      <rect x="0" y="558" width="440" height="62" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="2.5" strokeDasharray="9 7" />
      <text x="22" y="596" fontSize="20" fill="var(--muted-foreground)">기존 · 화자마다 수십 분 녹음 + 파인튜닝</text>
      <line x1="440" y1="589" x2="516" y2="589" stroke="var(--primary)" strokeWidth="2.5" markerEnd="url(#vc-arrow-green)" />
      <rect x="524" y="558" width="420" height="62" rx="12" fill="var(--card)" stroke="var(--primary)" strokeWidth="2.5" />
      <text x="546" y="596" fontSize="20" fontWeight="700" fill="var(--primary)">제로샷 · 15초 샘플, 화자별 학습 0</text>
      <text x="1480" y="596" fontSize="19" fill="var(--muted-foreground)" textAnchor="end">
        해시 기반 완료 마커로 재합성 방지 (idempotent)
      </text>
    </svg>
  )
}

export const voiceCloningDiagramCaption =
  "연결 방향을 뒤집어 방화벽 정책을 바꾸지 않고 폐쇄망 GPU를 그대로 썼고, 화자별 학습을 없애 사람이 늘어도 비용이 늘지 않게 했다."
