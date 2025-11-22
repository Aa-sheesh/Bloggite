import connectDB from '@/lib/db';
import Post from '@/lib/models/Post';
import React from 'react';
import { notFound } from 'next/navigation';
import SharePopup from '@/components/SharePopup';

//Markdown support added
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';


export async function generateStaticParams() {
  await connectDB();
  const posts = await Post.find({}, 'slug').lean();

  return posts
    .filter(post => post.slug) // Only include posts with slugs
    .map((post) => ({
      slug: post.slug,
    }));
}

// ✅ Dynamic SEO metadata for each blog post
export async function generateMetadata({ params }) {
  await connectDB();
  
  // Try to find by slug first
  let post = await Post.findOne({ slug: params.slug }).lean();
  
  // If not found by slug and it looks like an ObjectId, try finding by ID (backward compatibility)
  if (!post && /^[0-9a-fA-F]{24}$/.test(params.slug)) {
    const mongoose = (await import('mongoose')).default;
    if (mongoose.Types.ObjectId.isValid(params.slug)) {
      post = await Post.findById(params.slug).lean();
    }
  }

  if (!post) {
    return {
      title: "Post Not Found – Bloggite",
      description: "This blog post could not be found on Bloggite.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `https://blogs.aa-sheesh.tech/article/${post.slug || params.slug}`;
  const title = `${post.title} – Bloggite`;
  const description = post.summary || post.body || "Read this insightful blog post by Aashish Singh on Bloggite.";
  const image = post.coverImage || "https://blogs.aa-sheesh.tech/assets/default-og.png";

  return {
    title,
    description,
    keywords: [post.title, "Bloggite", "Tech Blog", "Web Dev", "JavaScript", "MongoDB", "Next.js", "Aashish Singh"],
    openGraph: {
      title,
      description,
      url,
      siteName: "Bloggite",
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Aashish64605886",
    },
    metadataBase: new URL("https://blogs.aa-sheesh.tech"),
  };
}

// ✅ Actual page rendering the blog post
const Page = async ({ params }) => {
  const { slug } = params;

  await connectDB();

  if (!slug) return notFound();

  // Try to find by slug first
  let post = await Post.findOne({ slug }).lean();
  
  // If not found by slug and it looks like an ObjectId, try finding by ID (backward compatibility)
  if (!post && /^[0-9a-fA-F]{24}$/.test(slug)) {
    const mongoose = (await import('mongoose')).default;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      post = await Post.findById(slug).lean();
    }
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <h1 className="text-center text-lg sm:text-xl font-semibold italic text-white text-overflow-safe">
          Post not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-start md:justify-center min-h-[80vh] py-5 px-4 sm:px-6 md:px-8">
      <div className="bg-black/50 backdrop-blur-sm text-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-4xl shadow-lg antialiased font-ubuntuMono overflow-hidden">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold italic mb-4 text-center text-pretty antialiased font-ubuntuMono text-overflow-safe leading-tight">
          {post.title}
        </h1>

        {post.body && (
          <p className="text-sm sm:text-base opacity-80 mb-4 text-center text-pretty text-overflow-safe leading-relaxed">
            {post.body}
          </p>
        )}
        <article className="text-pretty prose prose-invert opacity-90 max-w-none text-overflow-safe">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || "Can't fetch post"}
          </ReactMarkdown>
        </article>
        <p className="text-right text-xs sm:text-sm text-white/50 italic mt-4">
          {post.date ? new Date(post.date).toDateString() : 'Unknown date'}
        </p>
        
        <div className="mt-4">
          <SharePopup url={`https://blogs.aa-sheesh.tech/article/${post.slug || post._id}`} />
        </div>
      </div>
    </div>
  );
};

export default Page;

