import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { SplashScreen } from "@/components/splash-screen"

export default function Page() {
  return (
    <>
      <SplashScreen />
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  )
}
