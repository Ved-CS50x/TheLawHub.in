"use client"

import type React from "react"

import { useRef } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number // delay in ms
  className?: string
  threshold?: number
  rootMargin?: string
}

export function FadeInSection({
  children,
  delay = 0,
  className = "",
  threshold = 0.1,
  rootMargin = "0px",
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver({
    ref,
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-in-out ${
        isIntersecting ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
