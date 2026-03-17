"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ImageTrail } from "@/components/ui/image-trail";

const FOOD_IMAGES = [
  "/assets/kare-kare.jpg",
  "/assets/fried-chicken.jpg",
  "/assets/pork-barbecue.png",
  "/assets/garlic-butter-shrimp.png",
  "/assets/buko-pandan.jpg",
  "/assets/laing.jpg",
  "/assets/palabok.png",
  "/assets/beef-broccoli.png",
  "/assets/chicken-wings.png",
  "/assets/bicol-express.jpg",
  "/assets/creamy-spaghetti.png",
  "/assets/pork-humba.jpg",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] overflow-hidden bg-[#F8F5EE] dark:bg-[#050505] flex items-center justify-center select-none"
    >

      {/* ── ImageTrail background layer ── */}
      <div className="absolute inset-0 z-0">
        <ImageTrail containerRef={containerRef}>
          {FOOD_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative w-28 h-28 rounded-xl overflow-hidden shadow-lg ring-1 ring-black/[0.06]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="object-cover w-full h-full"
                draggable={false}
              />
            </div>
          ))}
        </ImageTrail>
      </div>

      {/* ── Vignette (light) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(248,245,238,0.55) 0%, rgba(248,245,238,0.92) 100%)",
        }}
      />
      {/* ── Vignette (dark) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(5,5,5,0.42) 0%, rgba(5,5,5,0.88) 100%)",
        }}
      />

      {/* ── Centered text content ── */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <span className="font-sans text-[#D4AF37] text-[9px] tracking-[0.38em] uppercase">
            Est.&nbsp;·&nbsp;Marikina City
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold leading-[0.9] tracking-tight mb-5"
          style={{ fontSize: "clamp(3.8rem, 14vw, 10rem)" }}
        >
          <span style={{ color: "#8A9A5B" }}>S</span>
          <span className="text-stone-900 dark:text-white">eztaurant</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans italic text-stone-500 dark:text-white/45 text-base max-w-sm mx-auto leading-relaxed mb-8"
        >
          Crafted from scratch with authentic recipes, fresh ingredients, and a whole lot of heart.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-8 py-3.5 font-semibold text-[11px] rounded-full tracking-[0.22em] uppercase transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(110deg, #c9a227 0%, #F5E070 50%, #c9a227 100%)",
              color: "#050505",
              boxShadow: "0 0 26px rgba(212,175,55,0.30), 0 4px 16px rgba(212,175,55,0.18)",
            }}
          >
            <span className="flex items-center gap-2">
              Explore the Menu
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
                className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden>
                <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-white/70 dark:bg-white/[0.07] text-stone-600 dark:text-white/65 border border-stone-300 dark:border-white/20 font-sans text-[11px] rounded-full tracking-[0.22em] uppercase hover:bg-white dark:hover:bg-white/[0.12] hover:border-[#D4AF37]/60 hover:text-stone-900 dark:hover:text-white backdrop-blur-sm transition-all duration-300 active:scale-95"
          >
            How to Order
          </button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <span className="font-sans text-stone-400 dark:text-white/25 text-[9px] tracking-[0.40em] uppercase">Scroll to discover</span>
        <div className="w-5 h-8 rounded-full border border-stone-300 dark:border-white/20 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 11, 0], opacity: [0.8, 0.1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut" }}
            className="w-0.5 h-2 rounded-full"
            style={{ background: "linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.15))" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
