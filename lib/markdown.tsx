import type { ReactNode } from "react"

/**
 * projects-data의 detail 필드에 쓰인 아주 작은 마크다운 부분집합을 React 노드로 변환합니다.
 * 지원: 빈 줄로 구분된 문단, `-`/`*` 불릿, **굵게**, *기울임*, `코드`.
 * 문단 안의 줄바꿈은 공백으로 합칩니다(원문이 가독성 때문에 중간에 줄을 나눠 둠).
 */
export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r/g, "").trim().split("\n")
  const nodes: ReactNode[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(" ").trim()
    nodes.push(
      <p key={`p-${nodes.length}`} className="leading-[1.85]">
        {renderInline(text)}
      </p>,
    )
    paragraph = []
  }
  const flushList = () => {
    if (!list.length) return
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="list-disc space-y-1 pl-5 leading-[1.8]">
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    list = []
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      flushParagraph()
      flushList()
      continue
    }
    const bullet = line.match(/^[-*]\s+(.*)$/)
    if (bullet) {
      flushParagraph()
      list.push(bullet[1])
      continue
    }
    flushList()
    paragraph.push(line)
  }
  flushParagraph()
  flushList()
  return nodes
}

/** **bold**, *em*, `code` 인라인 처리 */
export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith("**")) {
      out.push(
        <strong key={key++} className="font-semibold text-foreground">
          {tok.slice(2, -2)}
        </strong>,
      )
    } else if (tok.startsWith("`")) {
      out.push(
        <code key={key++} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {tok.slice(1, -1)}
        </code>,
      )
    } else {
      out.push(<em key={key++}>{tok.slice(1, -1)}</em>)
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
