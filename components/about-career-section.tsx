import Link from "next/link"
import { ZoneTitle, Eyebrow } from "@/components/eyebrow"
import { RichText } from "@/components/rich-text"
import { profile } from "@/lib/profile"

export function AboutCareerSection() {
  return (
    <section id="about" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:gap-14 lg:py-[88px]">
        <ZoneTitle eyebrow="01 · About & Career" title="소개와 경력" />

        <div className="grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-[72px]">
          {/* 왼쪽: 한줄 소개 + 팩트 */}
          <div className="flex flex-col gap-8 lg:gap-9">
            <p className="text-[15.5px] leading-[1.9] text-foreground/85 sm:text-[16.5px]">
              <RichText segments={profile.intro} />
            </p>
            <dl className="flex flex-col gap-4 border-t border-border pt-7">
              {profile.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[64px_1fr] gap-3.5 text-sm leading-[1.7]">
                  <dt className="pt-0.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-primary">{f.label}</dt>
                  <dd>
                    <b className="font-bold text-foreground">{f.title}</b>
                    {f.detail ? (
                      <>
                        <br />
                        <span className="text-muted-foreground">{f.detail}</span>
                      </>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 오른쪽: 경력 타임라인 + 보유 기술 */}
          <div id="experience" className="flex scroll-mt-20 flex-col gap-10 lg:gap-11">
            <ol className="relative flex flex-col gap-8 pl-7 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-0.5 before:bg-border sm:gap-[34px]">
              {profile.timeline.map((t) => (
                <li key={t.title} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-7 top-1.5 h-3 w-3 rounded-full ring-4 ring-card ${t.current ? "bg-primary" : "bg-border"}`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[17px] font-bold sm:text-lg">{t.title}</h3>
                    <span className="text-[13px] text-muted-foreground/80">{t.period}</span>
                  </div>
                  <ul className="mt-2.5 list-disc space-y-0.5 pl-4 text-sm leading-[1.8] text-foreground/75">
                    {t.bullets.map((b, i) => (
                      <li key={i}>
                        <RichText segments={b} strongClass="font-bold text-foreground" />
                      </li>
                    ))}
                    {t.link ? (
                      <li>
                        {t.link.href.startsWith("/") ? (
                          <Link href={t.link.href} className="link-underline">
                            {t.link.label}
                          </Link>
                        ) : (
                          <a href={t.link.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                            {t.link.label}
                          </a>
                        )}
                      </li>
                    ) : null}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-3.5 border-t border-border pt-8">
              <Eyebrow className="text-[11.5px]">보유 기술</Eyebrow>
              <div className="grid gap-3 sm:grid-cols-[120px_1fr] sm:items-center sm:gap-x-4 sm:gap-y-3">
                {profile.skills.map((g) => (
                  <div key={g.label} className="contents">
                    <span className="text-[13px] text-muted-foreground">{g.label}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <span key={s} className={g.primary ? "pill pill-primary" : "pill"}>
                          {s}
                        </span>
                      ))}
                    </div>
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
