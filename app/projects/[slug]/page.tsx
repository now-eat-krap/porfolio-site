import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { displayTitle } from "@/components/project-cards"
import { diagrams } from "@/components/diagrams"
import { renderMarkdown } from "@/lib/markdown"
import { projects } from "@/lib/projects-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const title = displayTitle(project.title)
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  }
}

/** "3화 · 시뮬레이션: …" → "시뮬레이션: …" (번호는 순서대로 다시 매김) */
function stripEpisodePrefix(title: string) {
  return title.replace(/^\d+화\s*·\s*/, "")
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

const buttonClass =
  "inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const episodes = project.detailEpisodes ?? []
  const heroImage = episodes.find((e) => e.image)?.image || project.image
  const diagram = project.diagram ? diagrams[project.diagram] : null

  const meta = [
    { label: "기간", value: project.duration },
    { label: "역할", value: project.contribution ? `${project.role} · ${project.contribution}` : project.role },
    { label: "스택", value: project.tags.join(" · ") },
  ]

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[880px] flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-7">
      <SiteHeader backToHome />

      {/* 제목 블록 */}
      <section className="flex flex-col gap-5 pb-10 pt-12 sm:pt-16">
        <p className="rise rise-delay-1 section-label">
          Project · {pad(index + 1)} / {pad(projects.length)}
        </p>
        <h1 className="rise rise-delay-2 font-display text-[32px] font-black leading-[1.2] tracking-[-0.035em] text-pretty sm:text-[44px]">
          {project.cardTitle}
        </h1>
        <p className="rise rise-delay-3 max-w-[720px] text-[15px] leading-[1.85] text-foreground/85 sm:text-base">
          {project.longDescription}
        </p>

        <dl className="rise rise-delay-4 grid gap-4 border-y border-border py-5 text-[13.5px] leading-[1.7] sm:grid-cols-[1fr_1fr_2fr]">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted-foreground">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.awards && project.awards.length > 0 ? (
          <p className="text-sm text-foreground/80">수상 · {project.awards.join(", ")}</p>
        ) : null}

        {project.github || project.demo ? (
          <div className="flex flex-wrap gap-2.5">
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                <Github className="h-4 w-4" /> GitHub
              </a>
            ) : null}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                <ExternalLink className="h-4 w-4" /> {project.demo.replace(/^https?:\/\//, "")}
              </a>
            ) : null}
          </div>
        ) : null}

        <ul className="flex flex-col gap-1.5 pt-2 text-sm leading-[1.7] text-foreground/80">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-primary">—</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {diagram ? (
          <figure className="mt-2 flex flex-col gap-3">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card p-5 sm:p-7">
              <diagram.Component className="min-w-[680px]" />
            </div>
            <figcaption className="text-[13.5px] leading-[1.7] text-muted-foreground">{diagram.caption}</figcaption>
          </figure>
        ) : heroImage ? (
          <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-secondary">
            <img src={heroImage} alt={`${displayTitle(project.title)} 화면`} className="w-full object-cover" />
          </div>
        ) : null}
      </section>

      {/* 본문 — 문제 상황 / 해결 / 결과 3단 구성이 있으면 그것을 우선 */}
      {project.sections
        ? project.sections.map((sec, i) => (
            <section
              key={sec.label}
              id={`s${pad(i + 1)}`}
              className="grid gap-4 border-t border-border py-10 sm:grid-cols-[200px_1fr] sm:gap-10"
            >
              <div className="flex flex-col gap-1.5">
                <span className="section-label">{pad(i + 1)}</span>
                <h2 className="font-display text-[21px] font-bold leading-[1.4] tracking-[-0.02em] sm:text-[22px]">
                  {sec.label}
                </h2>
              </div>

              <div className="flex flex-col gap-6 text-[15px] text-foreground/85">
                {sec.lead ? (
                  <p className="text-[17px] font-bold leading-[1.7] text-foreground">{sec.lead}</p>
                ) : null}

                {sec.metrics?.length ? (
                  <dl className="grid gap-5 border-y border-border py-6 sm:grid-cols-3">
                    {sec.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-1">
                        <dd className="font-display text-[24px] font-black tracking-[-0.03em] text-primary sm:text-[26px]">
                          {m.value}
                        </dd>
                        <dt className="text-xs leading-snug text-muted-foreground">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {sec.body ? <div className="flex flex-col gap-4">{renderMarkdown(sec.body)}</div> : null}

                {sec.image ? (
                  <img
                    src={sec.image}
                    alt=""
                    loading="lazy"
                    className="w-full rounded-xl border border-border bg-background"
                  />
                ) : null}

                {sec.items?.length ? (
                  <div className="flex flex-col divide-y divide-border border-t border-border">
                    {sec.items.map((it) => (
                      <div key={it.title} className="grid gap-3 py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-primary">
                            {it.kicker}
                          </span>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h3 className="text-base font-bold text-foreground">{it.title}</h3>
                          {renderMarkdown(it.body)}
                          {it.image ? (
                            <img
                              src={it.image}
                              alt=""
                              loading="lazy"
                              className="mt-1 w-full rounded-xl border border-border bg-background"
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

              </div>
            </section>
          ))
        : episodes.map((ep, i) => (
          <section
            key={ep.title ?? i}
            id={`s${pad(i + 1)}`}
            className="grid gap-4 border-t border-border py-10 sm:grid-cols-[200px_1fr] sm:gap-10"
          >
            <div className="flex flex-col gap-1.5">
              <span className="section-label">{pad(i + 1)}</span>
              <h2 className="font-display text-[19px] font-bold leading-[1.4] tracking-[-0.02em] sm:text-xl">
                {stripEpisodePrefix(ep.title ?? `섹션 ${i + 1}`)}
              </h2>
              {ep.tags && ep.tags.length ? (
                <p className="text-xs leading-relaxed text-muted-foreground">{ep.tags.join(" · ")}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 text-[15px] text-foreground/85">
              {ep.detail ? renderMarkdown(ep.detail) : ep.description ? <p>{ep.description}</p> : null}
              {ep.image && ep.image !== heroImage ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
                  <img src={ep.image} alt="" className="w-full object-cover" />
                </div>
              ) : null}
            </div>
          </section>
            ))}

      {/* 이전/다음 */}
      <nav className="flex items-center justify-between gap-6 border-t border-border pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> 모든 프로젝트
        </Link>
        <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-0.5 text-right">
          <span className="text-xs text-muted-foreground">다음 프로젝트</span>
          <span className="inline-flex items-center gap-1.5 font-display text-base font-bold transition-colors group-hover:text-primary sm:text-lg">
            {next.cardTitle}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </nav>

      <div className="pt-12">
        <SiteFooter />
      </div>
    </main>
  )
}
