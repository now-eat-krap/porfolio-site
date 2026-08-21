import { ArrowDown, Github } from "lucide-react"
import { profile } from "@/lib/profile"

export function HeroSection() {
  const { headline } = profile
  return (
    <section className="grid items-stretch gap-8 pb-6 pt-6 sm:pt-10 lg:min-h-[520px] lg:grid-cols-[1.55fr_1fr] lg:gap-10 lg:pb-10">
      <div className="flex flex-col justify-center gap-8 lg:py-3">
        <div className="@container">
          {/* 글자 크기를 컬럼 너비에 맞춰 계산(7.4cqw)해서 줄바꿈이 항상 두 줄로 고정됩니다 */}
          <h1 className="rise rise-delay-2 whitespace-nowrap font-display text-[clamp(24px,7.4cqw,60px)] font-black leading-[1.16] tracking-[-0.035em]">
            {headline.line1}
            <br />
            <span className="text-primary">{headline.highlight}</span>
            {headline.line2After}
          </h1>
          <p className="rise rise-delay-3 mt-5 max-w-[560px] text-[15px] leading-[1.7] text-muted-foreground sm:text-[16px]">
            {profile.subline}
          </p>
        </div>
        <dl className="rise rise-delay-3 grid grid-cols-[72px_1fr] gap-x-6 gap-y-3 text-[15px] leading-[1.6]">
          <dt className="font-bold text-foreground">이름</dt>
          <dd className="text-foreground/85">{profile.name}</dd>
          <dt className="font-bold text-foreground">이메일</dt>
          <dd>
            <a href={`mailto:${profile.email}`} className="text-foreground/85 transition-colors hover:text-primary">
              {profile.email}
            </a>
          </dd>
          <dt className="font-bold text-foreground">깃허브</dt>
          <dd>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground/85 transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              <span className="text-muted-foreground">GitHub</span>
              <span className="link-underline">{profile.githubHandle}</span>
            </a>
          </dd>
        </dl>
        <div className="rise rise-delay-4 flex flex-wrap gap-2.5 sm:gap-3">
          <a
            href="#about"
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-85"
          >
            소개 · 경력 <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            프로젝트 <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* 사진: 배경 없이 누끼 그대로, 아래쪽 정렬 */}
      <div className="rise rise-delay-2 relative hidden lg:block">
        <img
          src={profile.photo}
          alt={`${profile.name} 프로필 사진`}
          className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom"
        />
      </div>
      <div className="rise rise-delay-2 relative h-[300px] sm:h-[360px] lg:hidden">
        <img
          src={profile.photo}
          alt={`${profile.name} 프로필 사진`}
          className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto object-contain object-bottom"
        />
      </div>
    </section>
  )
}
