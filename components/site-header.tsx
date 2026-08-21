import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/lib/profile"

interface SiteHeaderProps {
  /** 상세 페이지에서는 홈으로 돌아가는 화살표를 보여줍니다. */
  backToHome?: boolean
}

export function SiteHeader({ backToHome = false }: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-[19px] font-black tracking-tight transition-colors hover:text-primary sm:text-[22px]"
      >
        {backToHome ? <ArrowLeft className="h-5 w-5" /> : null}
        {profile.nameEn}
        <span className="font-bold text-muted-foreground"> - Portfolio</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm text-foreground/75 sm:gap-6">
        <Link href="/#about" className="hidden transition-colors hover:text-primary sm:inline">
          소개
        </Link>
        <Link href="/#experience" className="hidden transition-colors hover:text-primary md:inline">
          경력
        </Link>
        <Link href="/#projects" className="transition-colors hover:text-primary">
          프로젝트
        </Link>
        <Link href="/#contact" className="hidden transition-colors hover:text-primary sm:inline">
          연락
        </Link>
        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-ink-foreground transition-opacity hover:opacity-85"
          >
            이력서 PDF
          </a>
        ) : null}
        <ThemeToggle />
      </nav>
    </header>
  )
}
