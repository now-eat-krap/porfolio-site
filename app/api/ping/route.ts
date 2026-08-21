import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/** 데모 사이트 생존 확인용. 허용된 호스트만 서버에서 대신 요청합니다. */
const ALLOWED_HOSTS = new Set(["one-more-coin.com"])

export async function GET(request: Request) {
  const host = new URL(request.url).searchParams.get("host") ?? ""
  if (!ALLOWED_HOSTS.has(host)) {
    return NextResponse.json({ ok: false, error: "host not allowed" }, { status: 400 })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 4000)
  const start = Date.now()
  try {
    const res = await fetch(`https://${host}/`, {
      method: "HEAD",
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    })
    const ms = Date.now() - start
    return NextResponse.json(
      { ok: res.ok || (res.status >= 300 && res.status < 400), status: res.status, ms },
      { headers: { "cache-control": "no-store" } },
    )
  } catch {
    return NextResponse.json({ ok: false }, { headers: { "cache-control": "no-store" } })
  } finally {
    clearTimeout(timer)
  }
}
