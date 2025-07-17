import { Ubuntu_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

// Load with CSS variable
const ubuntuSansMono = Ubuntu_Sans_Mono({
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: "swap",

  variable: "--font-ubuntu-sans-mono", // required for Tailwind variable
});

export const metadata = {
  title: "Welcome to Bloggite!",
  description: "Bloggite is a blog portal for Aashish Singh who posts tech-related articles on this site.",
  applicationName: "Bloggite",
  keywords: ["Bloggite", "Aashish Singh", "Tech Blog", "Web Dev", "Programming", "JavaScript", "Next.js", "Blog"],
  creator: "Aashish Singh",
  twitter: {
    card: "summary_large_image",
    title: "Bloggite – Aashish Singh's Tech Blog",
    description: "Explore programming, web development, and tech tutorials from Aashish Singh.",
    creator: "@Aashish64605886",
  },
  robots: {
    index: false, // <- disable indexing until deployed
    follow: false,
    nocache: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  }

}


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
