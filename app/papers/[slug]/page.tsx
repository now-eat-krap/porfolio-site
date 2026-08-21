import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Download, ExternalLink } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Eyebrow } from "@/components/eyebrow"
import { ThesisViewerLoader } from "@/components/thesis/thesis-viewer-loader"
import { findPaper, papers } from "@/lib/papers"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const paper = findPaper(slug)
  if (!paper) return {}
  return {
    title: paper.title,
    description: paper.description,
  }
}

export default async function PaperPage({ params }: PageProps) {
  const { slug } = await params
  const paper = findPaper(slug)
  if (!paper) notFound()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-7">
      <SiteHeader backToHome />

      <section className="flex flex-col gap-4 pb-8 pt-10 sm:pt-12">
        <Eyebrow>{paper.kicker}</Eyebrow>
        <h1 className="font-display text-[26px] font-black leading-[1.3] tracking-[-0.03em] text-pretty sm:text-[36px]">
          「{paper.title}」
        </h1>
        <p className="max-w-[760px] text-[15px] leading-[1.8] text-foreground/80">
          {paper.description} 왼쪽은 한국어 번역판, 오른쪽은 일본어 원문입니다. 쪽 번호가 서로 맞춰져 있어 같은 줄에서
          나란히 대조하며 읽을 수 있습니다.
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {paper.docs.map((d) => (
            <a
              key={d.key}
              href={d.file}
              download
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="h-4 w-4" />
              {d.label} PDF
            </a>
          ))}
          {paper.sourceUrl ? (
            <a
              href={paper.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
              학회 원문 페이지
            </a>
          ) : null}
        </div>
      </section>

      <ThesisViewerLoader docs={paper.docs} />

      <div className="pt-12">
        <SiteFooter />
      </div>
    </main>
  )
}
