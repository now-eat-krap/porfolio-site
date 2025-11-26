"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Github } from "lucide-react"

interface Project {
  title: string
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
  detailEpisodes?: EpisodeDetail[]
}

type EpisodeItem = {
  title: string
  duration: string
  role: string
  image: string
  tags: string[]
  description: string
  detail?: string
  features?: string[]
}

type EpisodeDetail = {
  title?: string
  description?: string
  detail?: string
  features?: string[]
  tags?: string[]
  image?: string
}

interface ProjectDetailModalProps {
  project: Project | null
  episodeNumber?: number
  episodes?: Project[]
  onSelectEpisode?: (index: number) => void
  onClose: () => void
}

export function ProjectDetailModal({
  project,
  episodeNumber,
  episodes: _episodes,
  onSelectEpisode: _onSelectEpisode,
  onClose,
}: ProjectDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(episodeNumber ? episodeNumber - 1 : 0)
  const [detailEpisodeIndex, setDetailEpisodeIndex] = useState<number | null>(null)
  const hasPushedHistoryRef = useRef(false)
  const closedByPopRef = useRef(false)

  useEffect(() => {
    setActiveIndex(episodeNumber ? episodeNumber - 1 : 0)
  }, [project, episodeNumber])

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [project])

  useEffect(() => {
    if (!project) return

    const handlePopState = () => {
      closedByPopRef.current = true
      hasPushedHistoryRef.current = false
      onClose()
    }

    window.history.pushState({ modal: true }, "", window.location.href)
    hasPushedHistoryRef.current = true
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      if (hasPushedHistoryRef.current && !closedByPopRef.current && window.history.state?.modal) {
        window.history.back()
      }
      closedByPopRef.current = false
      hasPushedHistoryRef.current = false
    }
  }, [project, onClose])

  if (!project) return null

  const baseEpisodeInfo = {
    duration: project.duration,
    role: project.role,
    image: project.image,
    tags: project.tags,
  }

  const episodeItems: EpisodeItem[] = [
    {
      ...baseEpisodeInfo,
      title: "1화 · 프로젝트 개요",
      description: project.description,
      detail: project.longDescription,
    },
    {
      ...baseEpisodeInfo,
      title: "2화 · 구현 기능",
      description: "핵심 구현 기능을 모아봤어요.",
      detail: "핵심 구현 기능을 모아봤어요.",
    },
    {
      ...baseEpisodeInfo,
      title: "3화 · 문제 해결 & 회고",
      description: project.contribution || "문제 해결 과정과 배운 점을 정리했어요.",
      detail: project.contribution || "트러블슈팅·회고 내용을 채워주세요.",
    },
  ]
  const detailEpisodes = project.detailEpisodes || episodeItems
  const activeEpisode = episodeItems[activeIndex] ?? episodeItems[0]

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/90 overflow-y-auto animate-fade-in">
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="relative h-[85vh] w-full">
            <div className="absolute inset-0">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 bg-black/80 hover:bg-black rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center gap-3 animate-slide-up">
                    <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 tracking-wide">
                      EP {activeIndex + 1}
                    </span>
                    <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 tracking-wide">
                      {project.role}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold animate-slide-up">{project.title}</h1>

                  <div
                    className="flex flex-wrap items-center gap-4 text-sm animate-slide-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <span className="text-green-500 font-semibold">95% Match</span>
                    <span className="text-white/80">{project.duration}</span>
                    <Badge variant="outline" className="border-muted-foreground/50">
                      {project.role}
                    </Badge>
                  </div>

                  <p
                    className="text-lg md:text-xl text-white/85 leading-relaxed animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {activeEpisode.description}
                  </p>

                  <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 mr-2" />
                        코드 보기
                      </a>
                    </Button>
                    {project.demo ? (
                        <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            데모 보기
                          </a>
                        </Button>
                      ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes Section */}
          <div className="bg-black pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="space-y-8 pt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-primary/20 text-white border-primary/40">
                    Episodes
                  </Badge>
                  <span className="text-white/70 text-sm">개요 · 구현 기능 · 문제 해결 회차를 골라보세요</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/70 to-transparent" />
                  <span className="text-white/60 text-xs">{episodeItems.length}편</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3 rounded-3xl border border-white/10 bg-black/85 p-6 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
                    {episodeItems.map((ep, idx) => {
                      const isActive = idx === activeIndex

                      return (
                        <button
                          key={ep.title}
                          onClick={() => {
                            setActiveIndex(idx)
                            setDetailEpisodeIndex(idx)
                          }}
                          className={`w-full text-left overflow-hidden rounded-2xl border transition-all duration-300 group ${
                            isActive
                              ? "border-primary/80 bg-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                            <div className="relative w-full sm:w-48 aspect-video overflow-hidden">
                              <img
                                src={ep.image || "/placeholder.svg"}
                                alt={ep.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                              <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-semibold">
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-white border border-white/10">EP {idx + 1}</span>
                                {isActive ? (
                                  <span className="rounded-full bg-primary/80 text-black px-2 py-1 shadow-lg">현재 재생</span>
                                ) : null}
                              </div>
                            </div>

                            <div className="flex-1 py-2 pr-3 space-y-2">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                                <span className="rounded-full border border-white/20 px-2 py-1 bg-white/5">{ep.duration}</span>
                                <span className="text-white/50">•</span>
                                <span className="text-white/70">{ep.role}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-white">{ep.title}</h3>
                              <p className="text-sm text-white/75 leading-relaxed line-clamp-1">{ep.description}</p>
                              {ep.features?.length ? (
                                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-white/75">
                                  {ep.features.slice(0, 6).map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-2 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span className="leading-relaxed">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                              <div className="flex flex-wrap gap-2">
                                {ep.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-[11px] bg-white/10 text-white border-white/10">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="space-y-4 lg:sticky lg:top-10 h-full">
                    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/80 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                      <h3 className="text-xl font-semibold text-white">기술 스택</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[11px] bg-white/10 text-white border-white/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/80 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
                      <h3 className="text-xl font-semibold text-white">역할</h3>
                      <p className="text-sm text-white/80 leading-relaxed">{project.role}</p>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                      <h4 className="text-lg font-semibold text-white">개발 기간</h4>
                      <p className="text-sm text-white/80">{project.duration}</p>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                      <h4 className="text-lg font-semibold text-white">기여도</h4>
                      <p className="text-sm text-white/80">{project.contribution || "기여도를 입력해 주세요."}</p>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/75 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                      <h4 className="text-lg font-semibold text-white">수상 이력</h4>
                      {project.awards && project.awards.length > 0 ? (
                        <ul className="space-y-1 text-sm text-white/80 list-disc list-inside">
                          {project.awards.map((award, idx) => (
                            <li key={idx}>{award}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-white/60">수상 이력이 없거나 아직 입력되지 않았습니다.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <h2 className="text-2xl font-bold">비슷한 프로젝트</h2>
                  <p className="text-white/70">다른 프로젝트도 둘러보세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {detailEpisodeIndex !== null && (detailEpisodes[detailEpisodeIndex] || episodeItems[detailEpisodeIndex]) && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-10 animate-fade-in">
          <div className="relative w-full max-w-[90vw] rounded-3xl border border-white/15 bg-gradient-to-b from-[#0c0c12] to-black shadow-[0_35px_90px_rgba(0,0,0,0.7)] overflow-hidden md:min-h-[70vh]">
            <button
              onClick={() => setDetailEpisodeIndex(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/15 rounded-full p-2 border border-white/15 transition-colors"
              aria-label="Close episode detail"
            >
              <X className="h-5 w-5" />
            </button>

            {(() => {
              const fallback = episodeItems[detailEpisodeIndex!] || episodeItems[0]
              const detail = detailEpisodes[detailEpisodeIndex!] || fallback
              const detailTags = detail.tags || fallback.tags
              const detailImage = detail.image || fallback.image
              const detailTitle = detail.title || fallback.title
              const detailDescription = detail.description || fallback.description
              const detailBody = detail.detail || fallback.detail || fallback.description
              const detailFeatures = detail.features || fallback.features

              return (
                <div className="grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.35fr_1fr] gap-0">
                  <div className="relative h-full min-h-[320px] md:min-h-[420px]">
                    <div className="absolute inset-0">
                      <img
                        src={detailImage || "/placeholder.svg"}
                        alt={detailTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent" />
                    </div>
                    <div className="relative h-full p-8 flex flex-col justify-end space-y-4 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
                      <div className="flex flex-wrap gap-2 text-[11px] text-white/85">
                        <span className="rounded-full border border-white/20 px-2 py-1 bg-white/15">
                          EP {detailEpisodeIndex! + 1}
                        </span>
                        <span className="rounded-full border border-white/20 px-2 py-1 bg-white/15">{project.role}</span>
                        <span className="rounded-full border border-white/20 px-2 py-1 bg-white/15">{project.duration}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white drop-shadow-md">{detailTitle}</h3>
                      <p className="text-base text-white/90 leading-relaxed">{detailDescription}</p>
                    </div>
                  </div>

                  <div className="p-8 space-y-7 bg-black/88 md:max-h-[80vh] overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-[0.08em]">
                        <span className="h-px w-6 bg-primary/70" />
                        <span>Episode Detail</span>
                      </div>
                      <p className="text-base text-white/90 leading-7">{detailBody}</p>
                    </div>

                    {detailFeatures?.length ? (
                      <div className="space-y-3">
                        <h4 className="text-base font-semibold text-white">이 회차 하이라이트</h4>
                        <ul className="space-y-2 text-sm text-white/90">
                          {detailFeatures.map((feature, idx) => (
                            <li key={idx} className="flex gap-3 rounded-xl bg-white/5 px-3.5 py-2.5 border border-white/10">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="space-y-3">
                      <h4 className="text-base font-semibold text-white">관련 태그</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailTags.slice(0, 8).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[11px] bg-white/10 text-white border-white/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}
