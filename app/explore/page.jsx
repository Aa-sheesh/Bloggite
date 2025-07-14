'use client'

import React from 'react'
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

import data from '@/data'
import Footer from '@/components/Footer'

const Page = () => {
  return (
    <>
      <section className="w-full px-6 py-10">
        <h2 className="text-center text-3xl font-bold mb-6 antialiased font-ubuntuMono">
          Browse Articles
        </h2>

        <Carousel className="w-full max-w-screen-xl mx-auto">
          <CarouselContent className="flex">
            {data.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 px-2"
              >
                <Link href={`/explore/${index+1}`} className="no-underline">
                  <Card className="bg-black/50 backdrop-blur border-0 shadow-lg text-white h-full flex flex-col justify-between hover:scale-[1.01] transition-all duration-200 ease-in-out">
                    <CardHeader className="flex flex-col items-center">
                      <Image
                        src={item.image}
                        width={350}
                        height={250}
                        alt="Article Thumbnail"
                        className="rounded-md object-cover"
                      />
                      <CardTitle className="pt-2 font-ubuntuMono text-xl text-center">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-center text-neutral-300">
                        {item.body || 'This is a blog post.'}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="justify-between px-4 text-sm text-neutral-400">
                      <p>Author: Aashish Singh</p>
                      <p>Date: {item.date || 'Today'}</p>
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
