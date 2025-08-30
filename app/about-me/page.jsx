'use client'
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  BookOpen,
  Sparkles,
  Newspaper,
} from "lucide-react";
const Page = () => {
  return (
    <main className="min-h-[97vh] -mt-15  backdrop-blur-xs">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 opacity-30 " />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-5 md:grid-cols-[1.2fr_1fr]"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/50 px-3 py-1 text-xs text-slate-300 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Always learning. Always shipping.
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Hi, I'm <span className="text-black">Aashish Singh</span> —
                I build thoughtful software.
              </h1>
              <p className="mt-5 max-w-2xl text-slate-300">
                Full‑stack developer with a bend towards AI/ML and systems. I love
                turning fuzzy ideas into crisp, usable products. On this blog I
                write about engineering, learning, and the little tricks that
                make dev life smoother.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:aashishs4912345@gmail.com"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/50 bg-black/50 px-5 py-3 text-sm font-semibold   hover:bg-black transition"
                >
                  <Mail className="h-4 w-4" /> Contact
                </a>
                <a
                  href="https://drive.google.com/file/d/1qcZD68cVuhncZT9wbtS2N07UGY-AXI5X/view?usp=sharing"
                  className="inline-flex items-center gap-2 rounded-2xl bg-black/50 px-5 py-3  text-sm border border-white/50  font-semibold text-white shadow transition hover:bg-black"
                >
                  <BookOpen className="h-4 w-4" /> Resume
                </a>
                <a
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/50 bg-black/50 px-5 py-3 text-sm font-semibold hover:bg-black  transition"
                >
                  <Newspaper className="h-4 w-4" /> Read the blog
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mx-auto h-64 w-64 overflow-hidden rounded-3xl  shadow-lg  bg-white/50 p-1 shadow-2xl md:h-64 md:w-64 md:block hidden"
            >
              <Image src='/image.png' alt='Description of the image' width={256} height={256} />


            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Page