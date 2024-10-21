import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

interface Image {
  src: string
  alt: string
}
interface Props {
  id: string
  images: Image[]
}

export default function ImageSlider({ images, id }: Props) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  return (
    <Carousel
      id={id}
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => {
        plugin.current.reset()
        plugin.current.play()
      }}
      // className="-mx-12 relative"
    >
      <CarouselContent>
        {images.map((img, index) => (
          // basis-3/4
          <CarouselItem key={index} className="rounded-lg">
            <img src={img.src} alt={img.alt} className="rounded-lg shadow-xl" />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <div className="absolute right-0 w-24 h-80 -top-2 bg-gradient-to-r from-background/0 to-background" />
      <div className="absolute left-0 w-24 h-80 -top-2 bg-gradient-to-l from-background/0 to-background" /> */}
      <CarouselPrevious className="left-2 md:-left-12" />
      <CarouselNext className="right-2 md:-right-12" />
    </Carousel>
  )
}
