"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"

function CarouselDots() {
  const { api } = useCarousel()
  const [selected, setSelected] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => setSelected(api.selectedScrollSnap())
    setCount(api.scrollSnapList().length)
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  if (count <= 1) {
    return null
  }

  return (
    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-background/60 transition-all",
            index === selected && "w-4 bg-background"
          )}
        />
      ))}
    </div>
  )
}

function PromoCarousel({
  slides,
  className,
}: {
  slides: { imageUrl: string; alt?: string }[]
  className?: string
}) {
  return (
    <Carousel className={className}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div
              role="img"
              aria-label={slide.alt}
              className="aspect-[21/9] w-full rounded-tm-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
}

export { PromoCarousel }
