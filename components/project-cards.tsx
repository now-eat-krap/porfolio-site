import Link from "next/link"
import { Image as ImageIcon } from "lucide-react"
import { LiveBadge } from "@/components/live-badge"
import { diagrams } from "@/components/diagrams"
import { ZoneTitle } from "@/components/eyebrow"
import { projects, type Project } from "@/lib/projects-data"

/** "One-More-Coin - 백테스팅 플랫폼" → "One-More-Coin · 백테스팅 플랫폼" */
export function displayTitle(title: string) {
  return title.replace(/\s+-\s+/, " · ")
}

function demoHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

function Media({ project }: { project: Project }) {
  const host = project.demo ? demoHost(project.demo) : ""
  const Diagram = project.diagram ? diagrams[project.diagram].Component : null

  return (
    <div className={`relative aspect-[16/9] overflow-hidden ${project.imageFit === "contain" ? "bg-background" : "bg-secondary"}`}>
      {Diagram ? (
        <div className="flex h-full w-full items-center justify-center overflow-hidden bg-background px-4 py-3">
          <Diagram className="w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]" />
        </div>
      ) : project.image ? (
        <>
          <img
            src={project.image}
            alt={`${displayTitle(project.title)} 화면`}
            className={`h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03] ${
              project.imageFit === "contain" ? "object-contain p-3" : "object-cover"
            }`}
          />
          {project.preview ? (
            <img
              src={project.preview}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          ) : null}
        </>
      ) : (
        /* 아직 사진이 없는 프로젝트 — 나중에 image 경로만 채우면 됩니다 */
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-b border-dashed border-border bg-secondary/50 text-muted-foreground/70">
          <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
          <span className="text-xs">이미지 준비 중</span>
        </div>
      )}
      {host ? (
        <div className="absolute left-3.5 top-3.5">
          <LiveBadge host={host} />
        </div>
      ) : null}
    </div>
  )
}

/** 이름 · 설명 · 기술 스택만 담은 카드 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(23,23,26,0.10)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
    >
      <Media project={project} />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="font-display text-[19px] font-bold tracking-[-0.02em] transition-colors group-hover:text-primary sm:text-[20px]">
          {project.cardTitle}
        </h3>
        <p className="flex-1 text-sm leading-[1.75] text-muted-foreground">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 6).map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ProjectCards() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:gap-10 lg:py-[88px]">
        <ZoneTitle eyebrow="02 · Projects" title="프로젝트" aside="카드를 누르면 상세 페이지로 이동합니다" />
        <div className="grid gap-4 md:grid-cols-2 lg:gap-[18px]">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
