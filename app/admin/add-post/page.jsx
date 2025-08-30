'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'


import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Schema now includes 'body'
const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  body: z.string().min(5, 'Short description (body) must be at least 5 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  thumbnail: z.string().optional(),
})

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
      content: '',
      thumbnail: ''
    },
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          content: data.content,
          thumbnail: data.thumbnail,
          date: new Date().toISOString(),
        })
      })

      const responseData = await res.json()

      if (res.ok) {
        alert('✅ Post created successfully!')
        form.reset()
      } else {
        alert(`❌ Failed: ${responseData.error || 'Unknown error'}`)
      }
    } catch (err) {
      alert('❌ Network error or server is down')
    }
  }

  return (
      <div className="max-w-2xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6 backdrop-blur">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Short Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. A short summary or subtitle..." {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write full content here..." rows={6} {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} className="text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="bg-black text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm sm:text-base w-full sm:w-auto"
            >
              Submit
            </button>
          </form>
        </Form>
      </div>
  )
}

export default Page
