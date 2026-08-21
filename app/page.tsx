import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutCareerSection } from "@/components/about-career-section"
import { ProjectCards } from "@/components/project-cards"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* ZONE 1 · 히어로 */}
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-8 px-5 pb-12 pt-6 sm:px-8 sm:pt-7 lg:pb-[72px]">
        <SiteHeader />
        <HeroSection />
      </div>
      {/* ZONE 2 · 소개와 경력 (흰 띠) */}
      <AboutCareerSection />
      {/* ZONE 3 · 프로젝트 */}
      <ProjectCards />
      {/* ZONE 4 · 연락 (잉크 띠) */}
      <ContactSection />
    </main>
  )
}
