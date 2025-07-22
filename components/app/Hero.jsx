'use client'

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Hero = () => {
  const [top5, setTop5] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()

        // Sort by date descending (newest first)
        const sortedPosts = (data.posts || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )

        const recentPosts = sortedPosts.slice(0, 5)
        setTop5(recentPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
      }
    }

    fetchPosts()
  }, [])


  return (
    <section className="px-4 md:px-20 min-h-[80vh] flex items-center justify-center text-center text-[#F7F7F2]">
      <Carousel className="w-full max-w-3xl">
        <CarouselContent>
          {top5.map((item) => (
            <CarouselItem key={item._id} className="p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-3xl font-bold text-pretty">{item.title}</h2>
                <p className="text-lg opacity-80 text-pretty">{item.body}</p>
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
