import type { ReactNode } from "react"

/** 포인트 컬러 짧은 선 + 대문자 라벨. 구역 제목 위에 씁니다. */
export function Eyebrow({
  children,
  tone = "primary",
  className = "",
}: {
  children: ReactNode
  tone?: "primary" | "live"
  className?: string
}) {
  const color = tone === "live" ? "text-live" : "text-primary"
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[12.5px] font-bold uppercase tracking-[0.12em] ${color} ${className}`}
    >
      <span className="h-0.5 w-[22px] rounded-full bg-current" aria-hidden />
      {children}
    </span>
  )
}

export function ZoneTitle({ eyebrow, title, aside }: { eyebrow: string; title: string; aside?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-3.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[30px] font-black leading-[1.2] tracking-[-0.03em] sm:text-[36px]">{title}</h2>
      </div>
      {aside ? <span className="pb-1.5 text-[13px] text-muted-foreground">{aside}</span> : null}
    </div>
  )
}
