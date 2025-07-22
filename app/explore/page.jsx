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

import Footer from '@/components/Footer'

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
      <section className="w-full flex justify-center items-center h-[70vh]">
        <p className="text-white text-lg">Loading articles...</p>
      </section>
    )
  }

  return (
    <>
      <section className="w-full px-6 py-10">
        <h2 className="text-center text-2xl font-bold mb-6 antialiased font-ubuntuMono">
          Browse Articles
        </h2>

        <Carousel className="w-full max-w-screen-xl mx-auto">
          <CarouselContent className="flex">
            {posts.map((item, index) => (
              <CarouselItem
                key={item._id}
                className="basis-full sm:basis-1/2 md:basis-1/3 px-2"
              >
                <Link href={`/explore/${item._id}`} className="no-underline">
                  <Card className="bg-black/50 backdrop-blur border-0 shadow-lg text-white h-full flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 ease-in-out">
                    <CardHeader className="flex flex-col items-center">
                      <Image
                        src={item.thumbnail || "/placeholder.png"}
                        width={350}
                        height={250}
                        style={{ height: '250px', width: '350px' }}
                        blurDataURL='/placeholder.png'
                        placeholder='blur'
                        alt="Article Thumbnail"
                        className="rounded-md object-cover"
                      />
                      <CardTitle className="pt-2 font-ubuntuMono text-pretty text-center">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-pretty text-center text-neutral-300">
                        {item.body || 'This is a blog post.'}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="justify-between px-4 text-sm text-neutral-400">
                      <p>Author: Aashish Singh</p>
                      <p>
                        Date:{' '}
                        {item.date
                          ? new Date(item.date).toLocaleDateString('en-IN')
                          : 'Today'}
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <Footer />
    </>
  )
}

export default Page
