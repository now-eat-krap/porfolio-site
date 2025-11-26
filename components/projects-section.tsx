"use client"

import { useRef, useState } from "react"
import { ProjectDetailModal } from "./project-detail-modal"
import { ProjectCard } from "./project-card"
import { projects, type Project } from "@/lib/projects-data"

export function ProjectsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedEpisode, setSelectedEpisode] = useState<number | undefined>(undefined)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container || isAnimatingRef.current) return

    const card = container.querySelector("[data-card]") as HTMLElement | null
    const gapValue = getComputedStyle(container).columnGap || getComputedStyle(container).gap || "0"
    const gap = Number.parseFloat(gapValue) || 0
    const cardWidth = card?.offsetWidth ?? 320
    const scrollAmount = cardWidth + gap

    const start = container.scrollLeft
    const target = direction === "left" ? start - scrollAmount : start + scrollAmount
    const maxScroll = container.scrollWidth - container.clientWidth
    const clampedTarget = Math.max(0, Math.min(target, maxScroll))

    isAnimatingRef.current = true

    container.scrollTo({
      left: clampedTarget,
      behavior: "smooth",
    })

    window.setTimeout(() => {
      isAnimatingRef.current = false
    }, 450)
  }

  return (
    <section
      id="projects"
      className="relative py-20 px-6 bg-gradient-to-b from-black via-[#0b0b0f] to-[#0c0c14] border-t border-border/40"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-primary text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">Projects</p>
            <h2 className="text-3xl md:text-4xl font-bold">주요 프로젝트</h2>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-hidden">
          <button
            onClick={() => scroll("left")}
            className="shrink-0 w-12 h-12 rounded-full bg-black/75 hover:bg-black/90 border border-white/30 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition flex items-center justify-center backdrop-blur-md"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative flex-1 min-w-0 group overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pl-6 pr-6 snap-x snap-proximity"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex-none w-4 snap-none" aria-hidden />
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index + 1}
                  onClick={() => {
                    setSelectedProject(project)
                    setSelectedEpisode(index + 1)
                  }}
                />
              ))}
              <div className="flex-none w-4 snap-none" aria-hidden />
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="shrink-0 w-12 h-12 rounded-full bg-black/75 hover:bg-black/90 border border-white/30 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition flex items-center justify-center backdrop-blur-md"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        episodeNumber={selectedEpisode}
        episodes={projects}
        onSelectEpisode={(index) => {
          setSelectedProject(projects[index])
          setSelectedEpisode(index + 1)
        }}
        onClose={() => {
          setSelectedProject(null)
          setSelectedEpisode(undefined)
        }}
      />
    </section>
  )
}
