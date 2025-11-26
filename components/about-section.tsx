export function AboutSection() {
  const timeline = [
    {
      period: "2019.04 ~ 2023.03",
      title: "가고시마대학 기계공학과 · 기계제어연구실",
      detail: "기계 제어 실험과 데이터 기반 모델링을 반복하며 엔지니어링 감각과 문제 해결 습관을 키웠습니다.",
      papers: [
        {
          title: "그림책 읽어주기 시간에 아동의 머리 움직임을 시각화하는 시스템",
          link: "https://conference.ciec.or.jp/pdf/2023pcc/pcc060.pdf",
        },
      ],
    },
    {
      period: "2025.01 ~ 2025.12",
      title: "삼성청년SW·AI 아카데미",
      detail: "CS/알고리즘 기초를 강화하고, 백엔드·AI 프로젝트를 수행하며 팀 협업과 제품화를 경험했습니다.",
    },
    {
      period: "현재",
      title: "금융/데이터 관심",
      detail: "퀀트 전략과 데이터 시각화에 몰입하며 서비스 아이디어를 탐색하고 있습니다.",
      papers: [
        {
          title: "One-More-Coin - 백테스팅 플랫폼",
          link: "https://one-more-coin.com",
        },
      ],
    },
  ]

  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-b from-black via-[#0d0f15] to-black">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 relative">
            <div className="absolute -left-8 -top-10 h-20 w-20 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute left-16 -bottom-12 h-20 w-20 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="h-16 w-16 rounded-full overflow-hidden border border-white/20 bg-white/10">
                <img src="/profile.png" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">박태원</h2>
                <p className="text-sm text-white/70">퀀트 지향 개발자</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-white relative z-10">
              {[
                { label: "이름", value: "박태원" },
                { label: "생년월일", value: "2000.09.16" },
                { label: "거주지", value: "경기도 파주시" },
                {
                  label: "메일",
                  value: (
                    <a href="mailto:taewonb916@gmail.com" className="hover:text-primary transition-colors">
                      taewonb916@gmail.com
                    </a>
                  ),
                },
                {
                  label: "학력",
                  value: (
                    <span>
                      가고시마대학 기계공학과 (2019.04 ~ 2023.03) · 기계제어연구실
                    </span>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-wrap items-baseline gap-2">
                  <span className="text-white/60 min-w-[64px] text-xs uppercase tracking-[0.08em]">{item.label}</span>
                  <span className="text-white/90 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative pl-10">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/80 via-white/15 to-emerald-400/70" />
              <div className="space-y-8">
                {timeline.map((item) => (
                  <div key={item.title} className="relative">
                    <span className="absolute -left-6 top-2 h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
                    <p className="text-xs uppercase tracking-[0.08em] text-white/60">{item.period}</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.detail}</p>
                    {"papers" in item && Array.isArray((item as any).papers) && (item as any).papers.length ? (
                      <ul className="mt-2 space-y-1 text-sm text-white/70">
                        {(item as any).papers.map(
                          (paper: { title: string; link?: string } | string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              {typeof paper === "string" ? (
                                <span>{paper}</span>
                              ) : paper.link ? (
                                <a
                                  href={paper.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors"
                                >
                                  {paper.title}
                                </a>
                              ) : (
                                <span>{paper.title}</span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
