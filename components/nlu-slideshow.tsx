"use client"

import Image from "next/image"

export function NLUSlideshow() {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      {/* Light gray tint overlay for soothing effect */}
      <div className="absolute inset-0 bg-gray-500 bg-opacity-10 z-10"></div>

      {/* Gradient overlay for faded border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-10"></div>

      {/* NLU Collage Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Final%20Merged%20Image-q6UutvmIlX5r93VHvV76SshsozYsFQ.png"
        alt="National Law Universities Collage"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
