'use client'

import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'

const Hero = () => {
  const [top5, setTop5] = useState([])
  const [loading, setLoading] = useState(true);
  const [subscriberCount, setSubscriberCount] = useState(null); // Add state

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        // Sort and slice
        const sortedPosts = (data.posts || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setTop5(sortedPosts.slice(0, 5))
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Fetch subscriber count
  useEffect(() => {
    async function fetchSubscriberCount() {
      try {
        const res = await fetch('/api/get-subscriber-count')
        const data = await res.json()
        setSubscriberCount(data.subscribers) // Adjust to match your API response shape
      } catch (err) {
        console.error('Error fetching subscriber count:', err)
      }
    }
    fetchSubscriberCount()
  }, [])

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center h-[70vh] px-4">
        <div className="w-10 h-10 border-4 border-white/50 border-dashed rounded-full animate-spin"></div>
      </section>
    )
  }

  return (
    <>
      <section className="px-4 sm:px-6 md:px-20 min-h-[80vh] flex items-center justify-center text-center text-[#F7F7F2] container-responsive">
        <Carousel className="w-full max-w-3xl">
          <CarouselContent>
            {top5.map((item) => (
              <CarouselItem key={item._id} className="p-4 sm:p-6">
                <Link href={`/explore/${item._id}`}>
                  <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                    <h2 title={item.title} className="text-xl sm:text-2xl md:text-3xl font-bold text-pretty text-overflow-safe leading-tight">
                      {item.title}
                    </h2>
                    <p title={item.body} className="text-sm sm:text-base md:text-lg opacity-80 text-pretty text-overflow-safe leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious title="Previous Post" className="bg-black/50 cursor-pointer hover:bg-black hidden sm:flex" />
          <CarouselNext title="Next Post" className="bg-black/50 cursor-pointer hover:bg-black hidden sm:flex" />
        </Carousel>
      </section>
      <div className='flex items-center justify-center px-4 pb-6'>
        <span className='bg-black/50 rounded-2xl px-3 sm:px-5 py-2 text-sm sm:text-base text-overflow-safe'>
          Live Subscriber Count: {subscriberCount !== null ? subscriberCount : 'Loading...'}
        </span>
      </div>
    </>
  )
}

export default Hero
