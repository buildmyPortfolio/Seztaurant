"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SHOWCASE = [
  { src: "/assets/showcase-1.png", alt: "Seztaurant Showcase 1" },
  { src: "/assets/showcase-2.png", alt: "Seztaurant Showcase 2" },
  { src: "/assets/showcase-3.png", alt: "Seztaurant Showcase 3" },
  { src: "/assets/showcase-4.png", alt: "Seztaurant Showcase 4" },
  { src: "/assets/showcase-5.jpg", alt: "Seztaurant Showcase 5" },
];

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <section ref={ref} className="relative py-28 bg-[#F8F5EE] dark:bg-[#070707] overflow-hidden">

      {/* ── Decorative lines ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="inline-block text-gold font-sans text-[10px] tracking-[0.35em] uppercase mb-4">
            Behind the Kitchen
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 dark:text-white leading-tight">
            Made with <span className="text-shimmer">Love</span>
          </h2>
          <p className="mt-4 font-sans text-stone-500 dark:text-white/40 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            A peek into the heart of Seztaurant — every dish crafted fresh, every order made with care.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        {/* Layout:
            [  Large (row-span-2)  ] [ Top-right A ] [ Top-right B ]
            [  Large (row-span-2)  ] [ Bot-right A ] [ Bot-right B ]
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[260px]">

          {/* Image 1 — large hero, spans 2 cols & 2 rows on md+ */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden group shadow-lg dark:shadow-black/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SHOWCASE[0].src}
              alt={SHOWCASE[0].alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Images 2–5 — small cells */}
          {SHOWCASE.slice(1).map((img, i) => (
            <motion.div
              key={img.src}
              {...fadeUp(0.18 + i * 0.08)}
              className="relative rounded-2xl overflow-hidden group shadow-md dark:shadow-black/20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}

        </div>

        {/* ── Bottom tag ── */}
        <motion.p
          {...fadeUp(0.55)}
          className="mt-10 text-center font-sans text-[10px] text-stone-400 dark:text-white/25 tracking-[0.3em] uppercase"
        >
          Seztaurant · Marikina City · Homemade. Always.
        </motion.p>

      </div>
    </section>
  );
}
