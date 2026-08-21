import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/lib/profile"
import "./globals.css"

const displayKr = Noto_Sans_KR({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-kr",
})

const title = `${profile.nameEn} - Portfolio`
const { line1, highlight, line2After } = profile.headline
const description = `${line1} ${highlight}${line2After}. 자동매매 서비스를 1인으로 설계·운영한 백엔드·인프라 엔지니어의 포트폴리오.`

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.nameEn}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title,
    description,
    siteName: title,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={displayKr.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
