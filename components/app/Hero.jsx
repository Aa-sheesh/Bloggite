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
      <section className="w-full flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-white/50 border-dashed rounded-full animate-spin"></div>
      </section>
    )
  }

  return (
    <>
      <section className="px-4 md:px-20 min-h-[80vh] flex items-center justify-center text-center text-[#F7F7F2]">
        <Carousel className="w-full max-w-3xl">
          <CarouselContent>
            {top5.map((item) => (
              <CarouselItem key={item._id} className="p-6">
                <Link href={`/explore/${item._id}`}>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <h2 title={item.title} className="text-3xl font-bold text-pretty">{item.title}</h2>
                    <p title={item.body} className="text-lg opacity-80 text-pretty">{item.body}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious title="Previous Post" className="bg-black/50 cursor-pointer hover:bg-black" />
          <CarouselNext title="Next Post" className="bg-black/50 cursor-pointer hover:bg-black" />
        </Carousel>
      </section>
      <div className='flex items-center justify-center'>
        <span className='bg-black/50 rounded-2xl  px-5 py-2'>
          Live Subscriber Count: {subscriberCount !== null ? subscriberCount : 'Loading...'}
        </span>
      </div>
    </>
  )
}

export default Hero
