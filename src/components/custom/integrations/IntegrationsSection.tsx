'use client'
import { AppImages, INTEGRATION_ROWS, IntegrationKey } from "@/lib/config/app-images"
import { motion } from "framer-motion"
import Image from "next/image"

export const IntegrationsSection = () => {
  return (
    <section className="w-full mx-auto section-spacing bg-black">
        {/* Section Title4*/}
        <div className="text-center mb-6 max-w-xl md:max-w-2xl mx-auto">
          <h3 className="text-caption text-doow_grey capitalize">
            We connect to all the tools within your financial stack
          </h3>
        </div>
        <div className="relative w-full mt-6 overflow-hidden">
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
    
          <ImageRow images={INTEGRATION_ROWS.row1} direction="right" />
        </div>
      </section>
  )
}

function ImageRow({ images, direction }: { images: readonly IntegrationKey[], direction: "left" | "right" }) {
  const duplicatedImages = [...images, ...images, ...images, ...images]

  return (
    <div className="my-6 w-full">
      <motion.div
        initial={{ x: direction === "left" ? 0 : -2000 }}
        animate={{ x: direction === "left" ? -2000 : 0 }}
        transition={{
          duration: 50,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
        }}
        className="flex gap-10 "
      >
        {duplicatedImages.map((imageKey, idx) => {
          const imagePath = AppImages.integration[imageKey]
          return (
            <div
              key={idx}
              className="flex min-w-fit items-center justify-center rounded-xl space-y-4 transition-colors hover:bg-white-100"
            >
              <Image 
                src={imagePath}
                alt={`${imageKey} logo`}
                width={48}
                height={48}
                className="transition-opacity hover:opacity-70"
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}


