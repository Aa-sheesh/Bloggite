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
  const posts = await Post.find({}, '_id').lean();

  return posts.map((post) => ({
    id: post._id.toString(),
  }));
}

// ✅ Dynamic SEO metadata for each blog post
export async function generateMetadata({ params }) {
  await connectDB();
  const post = await Post.findById(params.id).lean();

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

  const url = `https://blogs.aa-sheesh.tech/explore/${params.id}`;
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
  const { id } = params;

  await connectDB();

  if (!id) return notFound();

  const post = await Post.findById(id).lean();

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <h1 className="text-center text-xl font-semibold italic text-white">
          Post not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-start md:justify-center min-h-[80vh] py-5 -mx-10 md:mx-0 md:px-4">
      <div className="bg-black/50 backdrop-blur-sm text-white rounded-none md:rounded-lg p-4 md:p-8 w-full md:max-w-4xl shadow-lg antialiased font-ubuntuMono">
        <h1 className="text-2xl md:text-3xl font-bold italic mb-4 text-center text-pretty antialiased font-ubuntuMono">
          {post.title}
        </h1>

        {post.body && (
          <p className="text-md opacity-80 mb-4 text-center text-pretty">{post.body}</p>
        )}
        <article className="text-pretty prose opacity-90">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || "Can't fetch post"}
          </ReactMarkdown>
        </article>
        <p className="text-right text-sm text-white/50 italic">
          {post.date ? new Date(post.date).toDateString() : 'Unknown date'}
        </p>
        
          <div className="mt-4">
  <SharePopup url={`https://blogs.aa-sheesh.tech/explore/${post._id}`} />
</div>

        
      </div>
    </div>
  );
};

export default Page;
