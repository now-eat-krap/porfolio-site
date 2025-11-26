"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain drop-shadow-[0_4px_12px_rgba(229,9,20,0.45)] group-hover:scale-105 transition-transform"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-sm hover:text-primary transition-colors">
              프로젝트
            </a>
            <a href="#skills" className="text-sm hover:text-primary transition-colors">
              스킬
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              소개
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">
              연락
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/now-eat-krap" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
