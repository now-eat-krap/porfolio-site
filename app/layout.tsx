import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TAEWON PARK - PORTFOLIO",
  description: "개발자 포트폴리오",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/profile.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/profile.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/profile.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/profile.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
