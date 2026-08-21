import { profile } from "@/lib/profile"

export function SiteFooter() {
  return (
    <footer className="flex items-center justify-between text-xs text-muted-foreground">
      <span>
        © {new Date().getFullYear()} {profile.nameEn}
      </span>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
        {profile.githubLabel}
      </a>
    </footer>
  )
}
