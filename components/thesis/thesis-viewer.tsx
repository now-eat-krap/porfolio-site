"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"

// pdf.js 워커 — 번들러가 pdfjs-dist 와 같은 버전의 워커를 정적 자산으로 묶어 줍니다.
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()

/** A4 세로 비율 (842/595). 네 PDF 모두 A4 규격이라 좌우 페이지 높이가 정확히 맞습니다. */
const A4_RATIO = 842 / 595
/** 페이지 사이 간격(px) — 현재 페이지 계산에 쓰이므로 CSS 와 값을 맞춰야 합니다. */
const PAGE_GAP = 12

export interface ThesisDoc {
  key: string
  label: string
  file: string
}

interface ThesisViewerProps {
  docs: [ThesisDoc, ThesisDoc]
}

/**
 * 두 PDF 를 같은 쪽끼리 좌우로 나란히 붙여 한 번에 스크롤합니다.
 * 페이지 규격과 쪽수가 같아 별도 동기화 없이 n쪽 ↔ n쪽이 항상 같은 높이에 놓입니다.
 */
export function ThesisViewer({ docs }: ThesisViewerProps) {
  const [active, setActive] = useState<0 | 1>(0) // 모바일 탭
  const [widths, setWidths] = useState<[number, number]>([0, 0])
  const [counts, setCounts] = useState<[number, number]>([0, 0])
  const [current, setCurrent] = useState(1)
  const rowsRef = useRef<HTMLDivElement>(null)

  const width = widths[0] || widths[1]
  const pageHeight = width ? Math.round(width * A4_RATIO) : 0
  const total = Math.max(counts[0], counts[1])

  // 스크롤 위치로 현재 쪽 계산 (화면 상단 1/3 지점 기준)
  useEffect(() => {
    if (!pageHeight || !total) return
    const onScroll = () => {
      const el = rowsRef.current
      if (!el) return
      const offset = window.innerHeight / 3 - el.getBoundingClientRect().top
      const page = Math.floor(offset / (pageHeight + PAGE_GAP)) + 1
      setCurrent(Math.min(total, Math.max(1, page)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pageHeight, total])

  const setWidth = (i: 0 | 1, w: number) =>
    setWidths((prev) => (prev[i] === w ? prev : ((i === 0 ? [w, prev[1]] : [prev[0], w]) as [number, number])))
  const setCount = (i: 0 | 1, n: number) =>
    setCounts((prev) => (prev[i] === n ? prev : ((i === 0 ? [n, prev[1]] : [prev[0], n]) as [number, number])))

  return (
    <div className="flex flex-col gap-3">
      {/* 스티키 툴바 */}
      <div className="sticky top-0 z-20 -mx-1 flex items-center justify-between gap-3 rounded-xl border border-border bg-background/85 px-3 py-2 backdrop-blur">
        {/* 모바일: 탭 / 데스크톱: 라벨 두 개 */}
        <div className="flex gap-1 md:hidden">
          {docs.map((d, i) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setActive(i as 0 | 1)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                active === i ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="hidden flex-1 md:grid md:grid-cols-2 md:gap-4">
          {docs.map((d) => (
            <span key={d.key} className="px-1 text-sm font-semibold">
              {d.label}
            </span>
          ))}
        </div>
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {total ? `${current} / ${total}쪽` : "불러오는 중…"}
        </span>
      </div>

      {/* 좌우 컬럼 — 같은 쪽끼리 같은 높이에 놓입니다 */}
      <div ref={rowsRef} className="grid gap-4 md:grid-cols-2">
        {docs.map((d, i) => (
          <Column
            key={d.key}
            doc={d}
            anchors={i === 0}
            hiddenOnMobile={active !== i}
            pageHeight={pageHeight}
            onWidth={(w) => setWidth(i as 0 | 1, w)}
            onNumPages={(n) => setCount(i as 0 | 1, n)}
          />
        ))}
      </div>
    </div>
  )
}

function Column({
  doc,
  anchors,
  hiddenOnMobile,
  pageHeight,
  onWidth,
  onNumPages,
}: {
  doc: ThesisDoc
  anchors: boolean
  hiddenOnMobile: boolean
  pageHeight: number
  onWidth: (w: number) => void
  onNumPages: (n: number) => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.floor(entry.contentRect.width)
      setWidth(w)
      if (w > 0) onWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [onWidth])

  const file = useMemo(() => ({ url: doc.file }), [doc.file])
  const height = pageHeight || (width ? Math.round(width * A4_RATIO) : 0)

  return (
    <div ref={wrapRef} className={`flex flex-col ${hiddenOnMobile ? "hidden md:flex" : "flex"}`} style={{ gap: PAGE_GAP }}>
      {error ? (
        <p className="rounded-xl border border-border p-6 text-sm text-muted-foreground">
          PDF를 불러오지 못했습니다.{" "}
          <a href={doc.file} className="link-underline">
            파일 직접 열기
          </a>
        </p>
      ) : (
        <Document
          file={file}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n)
            onNumPages(n)
          }}
          onLoadError={(e) => setError(e.message)}
          loading={
            <div
              className="animate-pulse rounded-md border border-border bg-secondary/60"
              style={{ height: height || 480 }}
            />
          }
          className="contents"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <LazyPage
              key={i}
              pageNumber={i + 1}
              width={width}
              height={height}
              id={anchors ? `page-${i + 1}` : undefined}
            />
          ))}
        </Document>
      )}
    </div>
  )
}

/** 화면 근처에 올 때만 실제로 렌더링합니다. 그 전에는 같은 높이의 빈 자리를 잡아 둡니다. */
function LazyPage({
  pageNumber,
  width,
  height,
  id,
}: {
  pageNumber: number
  width: number
  height: number
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(pageNumber <= 2)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: "1200px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      id={id}
      className="scroll-mt-20 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5"
      style={{ height: height || undefined, minHeight: height ? undefined : 320 }}
    >
      {visible && width > 0 ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          renderAnnotationLayer={false}
          renderTextLayer
          loading={<div style={{ height }} />}
        />
      ) : null}
    </div>
  )
}
