import { Github, Mail } from "lucide-react"
import { Eyebrow } from "@/components/eyebrow"
import { profile } from "@/lib/profile"

/** 잉크색 띠로 마무리하는 연락 구역 (푸터 포함) */
export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-ink text-ink-foreground">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-12 px-5 py-14 sm:px-8 sm:py-[72px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2.5">
            <Eyebrow tone="live">03 · Contact</Eyebrow>
            <h2 className="font-display text-[26px] font-black tracking-[-0.03em] sm:text-[32px]">{profile.contact.title}</h2>
            <p className="text-[14.5px] text-ink-foreground/65">{profile.contact.body}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-ink-foreground px-5 py-3 text-sm font-bold text-ink transition-opacity hover:opacity-85"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-foreground/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-ink-foreground/60"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
        <footer className="flex items-center justify-between text-xs text-ink-foreground/45">
          <span>
            © {new Date().getFullYear()} {profile.nameEn}
          </span>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink-foreground">
            {profile.githubLabel}
          </a>
        </footer>
      </div>
    </section>
  )
}
