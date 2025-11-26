"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <Card
      data-card
      className="flex-none flex-[0_0_calc((100%-32px)/3)] w-[calc((100%-32px)/3)] min-w-0 max-w-none group/card overflow-hidden border border-white/10 bg-[#0f0f14] hover:border-primary/70 transition-all duration-300 hover:scale-[1.04] hover:z-10 cursor-pointer shadow-lg shadow-black/40 snap-start"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="object-cover w-full h-full group-hover/card:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
        <div className="absolute inset-0 border border-white/5 group-hover/card:border-primary/60 transition-colors rounded-lg" />

        <div className="absolute bottom-4 left-3 text-6xl sm:text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.65)]">
          <span
            className="leading-none"
            style={{ textShadow: "-2px 0 #0b0b0b, 0 2px #0b0b0b, 2px 0 #0b0b0b, 0 -2px #0b0b0b" }}
          >
            {index}
          </span>
        </div>

        <div className="absolute bottom-4 left-16 right-3 space-y-1">
          <h3 className="text-lg font-bold text-white group-hover/card:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] bg-white/10 text-white border-white/10 group-hover/card:border-primary/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
