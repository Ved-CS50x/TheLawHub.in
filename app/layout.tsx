import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FadeInSection } from "@/components/fade-in-section"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Law Hub",
  description: "The Go-To Hub for NLU Students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FadeInSection>
          {children}
        </FadeInSection>
      </body>
    </html>
  )
}
