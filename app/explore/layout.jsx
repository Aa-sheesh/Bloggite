export const metadata = {
  title: "Explore All Blogs – Bloggite by Aashish Singh",
  description: "Browse all blogs published on Bloggite. Find short, clear, and informative articles across web development, APIs, JavaScript, and more.",
  keywords: [
    "Explore blogs",
    "Bloggite",
    "Tech Blog",
    "Developer Blog",
    "Aashish Singh",
    "Web Development",
    "Programming Articles",
    "JavaScript",
    "Next.js",
  ],
  metadataBase: new URL("https://bloggite-v1.vercel.app"),
  openGraph: {
    title: "Explore All Blogs – Bloggite",
    description: "Browse tech articles by Aashish Singh on JavaScript, APIs, MongoDB, and more.",
    url: "https://bloggite-v1.vercel.app/explore",
    siteName: "Bloggite",
    images: [
      {
        url: "https://bloggite-v1.vercel.app/assets/explore-cover.png",
        width: 1200,
        height: 630,
        alt: "Explore Bloggite",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Blogs – Bloggite by Aashish Singh",
    description: "Browse all developer blogs by Aashish Singh. Discover beginner-friendly tech reads on Bloggite.",
    creator: "@Aashish64605886",
    images: ["https://bloggite-v1.vercel.app/assets/explore-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function ExploreLayout({ children }) {
  return <>{children}</>;
}
