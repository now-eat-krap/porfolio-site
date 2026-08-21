"use client"

import { useEffect, useState } from "react"

interface LiveBadgeProps {
  /** 표시용 호스트명 (예: one-more-coin.com) */
  host: string
}

type State = { status: "loading" } | { status: "up"; ms: number } | { status: "down" }

/**
 * 서버의 /api/ping 을 통해 실제로 데모 사이트가 살아 있는지 확인해 배지를 보여줍니다.
 * 내려가 있으면 조용히 숨깁니다.
 */
export function LiveBadge({ host }: LiveBadgeProps) {
  const [state, setState] = useState<State>({ status: "loading" })

  useEffect(() => {
    let cancelled = false
    fetch(`/api/ping?host=${encodeURIComponent(host)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { ok: boolean; ms?: number }) => {
        if (cancelled) return
        setState(d.ok && typeof d.ms === "number" ? { status: "up", ms: d.ms } : { status: "down" })
      })
      .catch(() => !cancelled && setState({ status: "down" }))
    return () => {
      cancelled = true
    }
  }, [host])

  if (state.status === "down") return null

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
      <span className="live-dot" />
      {state.status === "up" ? `live · ${host} · ${state.ms}ms` : `live · ${host}`}
    </span>
  )
}
