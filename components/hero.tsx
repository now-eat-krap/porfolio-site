"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Play } from "lucide-react"
import { useState } from "react"

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="home" className="relative min-h-[80vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
        <img src="/analytics-dashboard-charts.png" alt="Background" className="w-full h-full object-cover opacity-40" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative z-20 px-6 pb-10">
        <div className="max-w-4xl space-y-6">
          <div className="space-y-2">
            <p className="text-5xl sm:text-5xl md:text-5xl font-semibold text-white/90 animate-fade-in-up">
              Taewon Park - Product Engineer
            </p>
          </div>

          <div className="space-y-2 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl animate-fade-in-up leading-relaxed">
            <p>
              개발은 자신의 아이디어를 가장 빠르고, 쉽고, 싸게 구현할 수 있는 하나의 도구라고 생각하는 개발자.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up">
            <Button size="lg" className="min-w-[180px] bg-white text-black hover:bg-white/90 font-semibold" asChild>
              <a href="#projects">
                <Play className="h-5 w-5 mr-2 fill-current" />
                프로젝트 보기
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="min-w-[140px] bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              <a href="#contact">연락하기</a>
            </Button>
          </div>
        </div>

        <a href="#projects" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </a>
      </div>
    </section>
  )
}
