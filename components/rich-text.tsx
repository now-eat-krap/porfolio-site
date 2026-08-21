import Link from "next/link"
import type { RichText as RichTextType } from "@/lib/profile"

/** {text, strong, href} 배열을 렌더링. strong 은 강조, href 는 링크(내부 경로는 next/link). */
export function RichText({ segments, strongClass = "font-bold text-primary" }: { segments: RichTextType; strongClass?: string }) {
  return (
    <>
      {segments.map((seg, i) => {
        const inner = seg.strong ? <b className={strongClass}>{seg.text}</b> : seg.text
        if (seg.href) {
          const cls = "link-underline"
          return seg.href.startsWith("/") ? (
            <Link key={i} href={seg.href} className={cls}>
              {inner}
            </Link>
          ) : (
            <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {inner}
            </a>
          )
        }
        return seg.strong ? (
          <b key={i} className={strongClass}>
            {seg.text}
          </b>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      })}
    </>
  )
}
