"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "🍲",
    title: "Homemade Quality",
    desc: "Every dish is crafted from scratch using authentic Filipino recipes — the kind that make you feel at home.",
  },
  {
    icon: "📅",
    title: "Made to Order",
    desc: "We prepare each order fresh, just for you. Place your order 2–3 days in advance for the best experience.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Perfect for Groups",
    desc: "Our servings are designed for 15–18 pax — ideal for family gatherings, celebrations, and reunions.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden bg-white dark:bg-background">

      {/* ── Decorative glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-green/[0.06] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          {...fadeUp(0)}
          className="text-center mb-24"
        >
          <span className="inline-block text-gold font-sans text-[10px] tracking-[0.35em] uppercase mb-5">
            Our Story
          </span>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 dark:text-white leading-[1.1] mb-7">
            Home of{" "}
            <span className="text-shimmer">Homemade</span>
            <br />Dishes
          </h2>

          <p className="text-stone-500 dark:text-white/45 font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Born from a passion for authentic Filipino cooking, Seztaurant brings the warmth
            of home-cooked meals straight to your table. Based in Marikina City, every order
            is prepared with care — no shortcuts, only flavor.
          </p>
        </motion.div>

        {/* ── Feature cards ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp(0.15 + i * 0.12)}
              className="group relative p-8 rounded-2xl bg-stone-50 dark:bg-white/[0.025] border border-stone-200 dark:border-white/[0.06] hover:border-gold/40 dark:hover:border-gold/30 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500 shadow-sm dark:shadow-none"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="text-4xl mb-6 select-none">{f.icon}</div>
              <h3 className="font-display text-xl font-semibold text-stone-800 dark:text-white mb-3 leading-snug">
                {f.title}
              </h3>
              <p className="text-stone-500 dark:text-white/45 font-sans text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Stats row ── */}
        <motion.div
          {...fadeUp(0.55)}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-stone-200 dark:border-white/[0.06]"
        >
          {[
            { value: "15–18", label: "Pax per Order" },
            { value: "2–3",   label: "Days Advance Notice" },
            { value: "4",     label: "Menu Categories" },
            { value: "40+",   label: "Dishes to Choose From" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-stone-50 dark:bg-white/[0.025] hover:bg-white dark:hover:bg-white/[0.04] transition-colors px-6 py-8 text-center"
            >
              <p className="font-display text-4xl font-bold text-gold mb-2">{s.value}</p>
              <p className="font-sans text-xs text-stone-400 dark:text-white/40 tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
