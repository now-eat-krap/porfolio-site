"use client"

import { useEffect, useState } from "react"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-out">
      <div className="relative animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold text-primary tracking-wider">PORTFOLIO</h1>
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary animate-expand" />
      </div>
    </div>
  )
}
