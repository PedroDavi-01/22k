import Image from "next/image"
import slideImage from "@/assets/images/slide-login.png"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselComp() {
  return (
    <section className="w-full max-w-7xl px-12"> 
          <Carousel className="w-full">
            <CarouselContent className="-ml-0 h-[250px]"> 
              
              {/* Imagens */}
              <CarouselItem className="relative pl-0 basis-full flex-shrink-0 bg-white border rounded-xl shadow-sm overflow-hidden">
                <Image 
                  src={slideImage}
                  alt="carrosel 1"
                  fill
                  priority 
                  className="object-cover object-left" 
                />
              </CarouselItem>

              <CarouselItem className="relative pl-0 basis-full flex-shrink-0 bg-white border rounded-xl shadow-sm overflow-hidden">
                <Image 
                  src={slideImage} 
                  alt="carrosel 2"
                  fill
                  className="object-cover object-left" 
                />
              </CarouselItem>

              <CarouselItem className="relative pl-0 basis-full flex-shrink-0 bg-white border rounded-xl shadow-sm overflow-hidden">
                <Image 
                  src={slideImage} 
                  alt="carrosel 3"
                  fill
                  className="object-cover object-left" 
                />
              </CarouselItem>

            </CarouselContent>
            
            <CarouselPrevious className="rounded border-gray-700" />
            <CarouselNext className="rounded border-gray-700" />
          </Carousel>
        </section>

  )
}