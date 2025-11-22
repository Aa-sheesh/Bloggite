'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import SubscribeComponent from '@/components/SubscribeComponent'

const Page = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()

        const sortedPosts = (data.posts || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )

        setPosts(sortedPosts)
      } catch (err) {
        console.error('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
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
      <section className="px-4 sm:px-6 py-5 container-responsive">
        <Carousel className="w-full max-w-screen-xl mx-auto">
          <CarouselContent className="flex">
            {posts.map((item, index) => (
              <CarouselItem
                key={item._id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
              >
                <Link href={`/article/${item.slug || item._id}`} className="no-underline">
                  <Card className="bg-black/50 backdrop-blur border-0 shadow-lg text-white h-full flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 ease-in-out">
                    <CardHeader className="flex flex-col items-center p-4">
                      <div className="relative w-full aspect-video overflow-hidden rounded-md">
                        <Image
                          src={item.thumbnail || "/placeholder.png"}
                          fill
                          blurDataURL='/placeholder.png'
                          placeholder='blur'
                          alt="Article Thumbnail"
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <CardTitle className="pt-2 font-ubuntuMono text-pretty text-center text-sm sm:text-base text-overflow-safe leading-tight">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-pretty text-center text-neutral-300 text-overflow-safe leading-relaxed">
                        {item.body || 'This is a blog post.'}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="justify-between px-4 text-xs sm:text-sm text-neutral-400">
                      <span>{item.date ? new Date(item.date).toDateString() : 'Unknown date'}</span>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious title="Previous" className="bg-black/50 cursor-pointer hover:bg-black hidden sm:flex" />
          <CarouselNext title="Next" className="bg-black/50 cursor-pointer hover:bg-black hidden sm:flex" />
        </Carousel>
      </section>
      <SubscribeComponent />
    </>
  )
}

export default Page
