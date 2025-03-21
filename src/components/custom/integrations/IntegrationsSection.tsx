<<<<<<< Updated upstream
'use client'
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { AppImages, INTEGRATION_ROWS, IntegrationKey } from "@/lib/config/app-images"
import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion"
import { useEffect, useRef } from "react"
// import Image from "next/image"
=======
"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { AppImages, INTEGRATION_ROWS, type IntegrationKey } from "@/lib/config/app-images"
import { type AnimationPlaybackControls, motion, useAnimate } from "framer-motion"
import { useEffect, useRef, useState } from "react"
>>>>>>> Stashed changes

export const IntegrationsSection = () => {
  return (
    <section className="w-full bg-doow_offwhite">
      <MaxWidthWrapper className="section-spacing">
        <div className="border-2 section-spacing rounded-3xl bg-white shadow-[0px_1px_7px_2px_rgba(0,0,0,0.075)]">
          {/* Section Title */}
          <div className="text-center mb-4 max-w-xl md:max-w-2xl mx-auto">
            <h3 className="text-sub-heading text-doow_zinc">Integrations</h3>
            <p className="text-base text-doow_grey">We integrate with all the tools in your financial stack</p>
          </div>
          <div className="relative w-full mt-6 overflow-hidden py-2">
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-doow_offwhite to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-doow_offwhite to-transparent" />
            <ImageRow images={INTEGRATION_ROWS.row1} direction="right" />
            <ImageRow images={INTEGRATION_ROWS.row2} direction="left" />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

function ImageRow({ images, direction }: { images: readonly IntegrationKey[]; direction: "left" | "right" }) {
  const duplicatedImages = [...images, ...images, ...images]
  const [scope, animate] = useAnimate()
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

<<<<<<< Updated upstream
function ImageRow({ images, direction }: { images: readonly IntegrationKey[], direction: "left" | "right" }) {
  const duplicatedImages = [...images, ...images]
  const [scope, animate] = useAnimate()
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if(!scope.current) return
    controlsRef.current = animate(
      scope.current,
      {
        x: direction === "left" ? -2000 : 0
      },
      {
        duration: 80,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }
    )
    return () => controlsRef.current?.stop()
  }, [])

  return (
    <div className="w-full mt-6">
      <motion.div
        ref={scope}
        initial={{ x: direction === "left" ? 0 : -2000 }}
        onHoverStart={() => controlsRef.current?.pause()}
        onHoverEnd={() => controlsRef.current?.play()}
        className="flex gap-6 "
      >
=======
  // Set up animation
  useEffect(() => {
    if (!scope.current) return
    controlsRef.current = animate(
      scope.current,
      {
        x: direction === "left" ? -2000 : 0,
      },
      {
        duration: 80,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "linear",
      },
    )
    return () => controlsRef.current?.stop()
  }, [animate, direction])

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setMousePosition(null)
    setHoveredCardIndex(null)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    handleMouseMove(e)
  }

  // Continuous check for cards under cursor
  useEffect(() => {
    if (!mousePosition) return

    const checkCardsUnderCursor = () => {
      if (!mousePosition || !containerRef.current) return

      let foundCard = false

      // Check each card
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        const rect = card.getBoundingClientRect()
        const containerRect = containerRef.current!.getBoundingClientRect()

        // Calculate if mouse is over this card
        if (
          mousePosition.x >= rect.left - containerRect.left &&
          mousePosition.x <= rect.left - containerRect.left + rect.width &&
          mousePosition.y >= rect.top - containerRect.top &&
          mousePosition.y <= rect.top - containerRect.top + rect.height
        ) {
          setHoveredCardIndex(index)
          foundCard = true
        }
      })

      if (!foundCard) {
        setHoveredCardIndex(null)
      }

      // Continue checking
      animationFrameRef.current = requestAnimationFrame(checkCardsUnderCursor)
    }

    // Start checking
    animationFrameRef.current = requestAnimationFrame(checkCardsUnderCursor)

    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePosition])

  return (
    <div
      ref={containerRef}
      className="w-full mt-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div ref={scope} initial={{ x: direction === "left" ? 0 : -2000 }} className="flex gap-6">
>>>>>>> Stashed changes
        {duplicatedImages.map((imageKey, idx) => {
          const SvgComp = AppImages.integration[imageKey]
          const isHovered = hoveredCardIndex === idx

          return (
            <Card
              key={idx}
              ref={(el) => {cardRefs.current[idx] = el}}
              className={`flex flex-col min-w-48 h-40 items-center justify-center space-y-4 transition-colors ${
                isHovered ? "bg-doow_offwhite/10" : "bg-doow_card"
              } shadow-[0px_1px_3px_1px_rgba(0,0,0,0.10)]`}
            >
              <SvgComp className={`${isHovered ? "text-doow_primary" : "text-doow_grey"} h-fit`} />
              <div className={`text-captiontext-black`}>{imageKey}</div>
            </Card>
          )
        })}
      </motion.div>
    </div>
  )
}