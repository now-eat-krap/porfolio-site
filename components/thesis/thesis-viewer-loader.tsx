"use client"

import dynamic from "next/dynamic"
import type { ThesisDoc } from "./thesis-viewer"

// pdf.js 는 브라우저 전용(canvas/DOM)이라 서버 렌더링 없이 불러옵니다.
const ThesisViewer = dynamic(() => import("./thesis-viewer").then((m) => m.ThesisViewer), {
  ssr: false,
  loading: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {[0, 1].map((i) => (
        <div key={i} className="aspect-[595/842] animate-pulse rounded-md border border-border bg-secondary/60" />
      ))}
    </div>
  ),
})

export function ThesisViewerLoader({ docs }: { docs: [ThesisDoc, ThesisDoc] }) {
  return <ThesisViewer docs={docs} />
}
