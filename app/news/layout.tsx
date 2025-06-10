import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FooterAds } from "@/components/footer-ads"

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FooterAds />
      <Footer />
    </>
  )
}
