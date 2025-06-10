"use client"

import { useState, useEffect, type RefObject } from "react"

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver({
  ref,
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        setIsIntersecting(entry.isIntersecting)

        // If element has intersected and we only want to trigger once, unobserve
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, threshold, rootMargin, triggerOnce])

  return isIntersecting
}
