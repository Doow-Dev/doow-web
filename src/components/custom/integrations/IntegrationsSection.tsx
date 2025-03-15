'use client'
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { AppImages, INTEGRATION_ROWS, IntegrationKey } from "@/lib/config/app-images"
import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion"
import { useEffect, useRef } from "react"
// import Image from "next/image"

export const IntegrationsSection = () => {
  
  return (
    <section className="w-full bg-doow_offwhite">
      <MaxWidthWrapper className="section-spacing">
        <div className=" border-2 section-spacing rounded-lg shadow-[0px_1px_7px_2px_rgba(0,0,0,0.075)] ">
          {/* Section Title4*/}
          <div className="text-center mb-4 max-w-xl md:max-w-2xl mx-auto">
            <h3 className="text-caption text-doow_zinc">
              Integrations
            </h3>
            <p className="text-base text-doow_grey">We integrate with all the tools in your financial stack</p>
          </div>
          <div className="relative w-full mt-6 overflow-hidden py-2">
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-doow_offwhite to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-doow_offwhite to-transparent" />
            <ImageRow images={INTEGRATION_ROWS.row1} direction="right" />
            <ImageRow images={INTEGRATION_ROWS.row2} direction="left"/>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}


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
        {duplicatedImages.map((imageKey, idx) => {
          const SvgComp = AppImages.integration[imageKey]
          return (
            <div
              key={idx}
              className="flex flex-col min-w-48 h-40 group items-center justify-center space-y-4 transition-colors rounded-xl border bg-white/5 p-4  hover:bg-white/10 shadow-[0px_1px_5px_2px_rgba(0,0,0,0.05)]"
            >
              <SvgComp className="text-doow_grey group-hover:text-doow_primary h-fit"/>
              <div className="text-caption text-black">{imageKey}</div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}