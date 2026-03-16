"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Browse the Menu",
    desc: "Explore our wide selection of Main Dishes, Pasta, Vegetables, and Desserts — all freshly made to order.",
  },
  {
    step: "02",
    title: "Place Your Order",
    desc: "Message us on Facebook or call/text +949-465-9619. Let us know your chosen dishes and your preferred date.",
  },
  {
    step: "03",
    title: "2–3 Days Advance",
    desc: "Orders must be placed at least 2–3 days before your pick-up or delivery date to ensure freshness.",
  },
  {
    step: "04",
    title: "Receive Your Food",
    desc: "Pick up from our Marikina City kitchen or arrange delivery. Shipping fee is shouldered by the customer.",
  },
];

export default function OrderInfo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section id="order" ref={ref} className="relative py-32 bg-[#F8F5EE] dark:bg-background overflow-hidden">

      {/* ── Decorative glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-48 w-96 h-96 rounded-full bg-green/[0.05] blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-48 w-96 h-96 rounded-full bg-gold/[0.05] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <span className="inline-block text-gold font-sans text-[10px] tracking-[0.35em] uppercase mb-5">
            How It Works
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 dark:text-white leading-[1.1] mb-5">
            How to <span className="text-shimmer">Order</span>
          </h2>
          <p className="font-sans text-stone-500 dark:text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Fresh, homemade food delivered to your door or ready for pick-up — just follow these simple steps.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              {...fadeUp(0.1 + i * 0.12)}
              className="group relative"
            >
              {/* Connector line between cards (lg only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-[52px] left-[calc(100%+10px)] w-5 h-px bg-gradient-to-r from-gold/30 to-transparent" />
              )}

              <div className="h-full p-7 rounded-2xl bg-white dark:bg-white/[0.025] border border-stone-200 dark:border-white/[0.06] group-hover:border-gold/40 dark:group-hover:border-gold/25 group-hover:bg-stone-50 dark:group-hover:bg-white/[0.04] transition-all duration-500 shadow-sm dark:shadow-none">
                {/* Step number */}
                <span className="font-display text-6xl font-bold leading-none text-gold/20 dark:text-gold/15 group-hover:text-gold/40 dark:group-hover:text-gold/30 transition-colors duration-500 block mb-5">
                  {s.step}
                </span>
                <h3 className="font-display text-base font-semibold text-stone-800 dark:text-white mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="font-sans text-stone-500 dark:text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA block ── */}
        <motion.div {...fadeUp(0.65)} className="mt-14 flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-white/[0.025] border border-gold/20 rounded-3xl px-8 md:px-12 py-8 shadow-sm dark:shadow-none">
            <div className="text-center sm:text-left">
              <p className="font-sans text-stone-400 dark:text-white/40 text-xs tracking-widest uppercase mb-1">
                Ready to place your order?
              </p>
              <p className="font-display text-stone-800 dark:text-white text-2xl font-semibold">
                Let&apos;s get cooking 🍳
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+9494659619"
                className="px-7 py-3 rounded-full bg-gold text-background text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/25 text-center"
              >
                📞 +949-465-9619
              </a>
              <a
                href="https://www.facebook.com/Seztaurant"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-stone-100 dark:bg-white/[0.06] border border-stone-200 dark:border-white/[0.1] text-stone-600 dark:text-white/70 hover:text-stone-900 dark:hover:text-white text-xs font-semibold tracking-widest uppercase hover:border-gold/30 transition-all duration-300 text-center"
              >
                📘 Message on FB
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
