import { Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

// Google font with CSS variable
const ubuntuSansMono = Ubuntu_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ubuntu-sans-mono",
});

// ✅ Full production metadata
export const metadata = {
  title: "Bloggite – Quick Reads for Curious Coders",
  description: "Bloggite is a blog portal by Aashish Singh, featuring concise, insightful, and beginner-friendly tech articles on web development, APIs, and more.",
  applicationName: "Bloggite",
  generator: "Next.js",
  metadataBase: new URL("https://bloggite-v1.vercel.app"),
  keywords: [
    "Bloggite",
    "Aashish Singh",
    "Tech Blog",
    "Web Development",
    "Frontend",
    "JavaScript",
    "Next.js",
    "APIs",
    "Programming",
  ],
  creator: "Aashish Singh",
  authors: [{ name: "Aashish Singh", url: "https://bloggite-v1.vercel.app" }],
  openGraph: {
    title: "Bloggite – Developer Blogs That Matter",
    description: "Explore powerful, quick-read blogs by Aashish Singh on modern web development and tech insights.",
    url: "https://bloggite-v1.vercel.app",
    siteName: "Bloggite",
    images: [
      {
        url: "https://bloggite-v1.vercel.app/assets/background.svg",
        width: 1200,
        height: 630,
        alt: "Bloggite Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloggite – Aashish Singh's Tech Blog",
    description: "Follow Aashish Singh’s quick, clean, and practical tech blogs on Bloggite.",
    creator: "@Aashish64605886",
    images: ["https://bloggite-v1.vercel.app/assets/background.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ubuntuSansMono.variable}>
      <body className="min-h-screen min-w-screen px-10 py-5 antialiased bg-blog">
        <Navbar />
        {children}
        <Toaster position="top-center" richColors expand />
      </body>
    </html>
  );
}
