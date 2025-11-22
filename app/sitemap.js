import connectDB from '@/lib/db';
import Post from '@/lib/models/Post';

// Base URL - uses the URL from blog post pages, can be overridden with env variable
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blogs.aa-sheesh.tech';

export default async function sitemap() {
  try {
    // Connect to database
    await connectDB();

    // Fetch all published posts
    const posts = await Post.find({}).select('_id slug date').lean().sort({ date: -1 });

    // Static routes with appropriate priorities and change frequencies
    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/explore`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about-me`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];

    // Dynamic blog post routes
    const postRoutes = posts
      .filter(post => post.slug) // Only include posts with slugs
      .map((post) => ({
        url: `${baseUrl}/article/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    // Combine all routes
    return [...staticRoutes, ...postRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least the static routes even if database fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/explore`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about-me`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
  }
}

