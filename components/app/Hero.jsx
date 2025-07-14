'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import data from '@/data'

const Hero = () => {
  // Get top 5 recent items
  const top5 = data.slice(0, 5)

  return (
    <section className="px-4 md:px-20 min-h-[80vh] flex items-center justify-center text-center text-[#F7F7F2]">
      <Carousel className="w-full max-w-3xl">
        <CarouselContent>
          {top5.map((item) => (
            <CarouselItem key={item.id} className="p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-4xl font-bold">{item.title}</h2>
                <p className="text-lg opacity-80">{item.body}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent" />
        <CarouselNext className="bg-transparent" />
      </Carousel>
    </section>
  )
}

export default Hero
