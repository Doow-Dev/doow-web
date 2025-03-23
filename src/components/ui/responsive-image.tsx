import { getImageProps } from "next/image"

interface ResponsiveImageProps {
  sources: Array<{
    src: string
    width: number
    height: number
    media: string
    quality?: number
  }>
  fallbackSrc: string
  fallbackWidth: number
  fallbackHeight: number
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
}

export function ResponsiveImage({
  sources,
  fallbackSrc,
  fallbackWidth,
  fallbackHeight,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  quality = 75,
}: ResponsiveImageProps) {
  // Extract srcSet values for each source
  const sourceSets = sources.map((source) => {
    const {
      props: { srcSet },
    } = getImageProps({
      src: source.src,
      width: source.width,
      height: source.height,
      alt,
      sizes,
      quality: source.quality || quality,
    })
    return { srcSet, media: source.media }
  })

  // Get props for the fallback image
  const {
    props: { ...imgProps },
  } = getImageProps({
    src: fallbackSrc,
    width: fallbackWidth,
    height: fallbackHeight,
    alt,
    sizes,
    priority,
    quality,
  })

  return (
    <picture>
      {sourceSets.map((source, index) => (
        <source key={index} media={source.media} srcSet={source.srcSet} />
      ))}
      <img {...imgProps} alt={alt} className={className} style={{ width: "100%", height: "100%", ...imgProps.style }} />
    </picture>
  )
}