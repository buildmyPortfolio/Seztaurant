"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

const CONTACTS = [
  {
    icon: "📍",
    label: "Location",
    value: "#28 Sierra Madre St. Nangka",
    sub: "Marikina Village, Marikina City",
    href: "https://maps.google.com/?q=Sierra+Madre+St+Nangka+Marikina+City",
  },
  {
    icon: "📞",
    label: "Phone / SMS",
    value: "+949-465-9619",
    sub: "Call or text to place your order",
    href: "tel:+9494659619",
  },
  {
    icon: "📘",
    label: "Facebook",
    value: "Seztaurant",
    sub: "Analiza Cordova · Page: Seztaurant",
    href: "https://www.facebook.com/Seztaurant",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 36 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-white dark:bg-[#070707] overflow-hidden">

      {/* ── Decorative glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-green/[0.05] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <span className="inline-block text-gold font-sans text-[10px] tracking-[0.35em] uppercase mb-5">
            Get in Touch
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 dark:text-white leading-[1.1] mb-5">
            Find <span className="text-shimmer">Us</span>
          </h2>
          <p className="font-sans text-stone-500 dark:text-white/40 text-base max-w-md mx-auto leading-relaxed">
            We&apos;d love to hear from you. Reach out to place an order or ask any questions.
          </p>
        </motion.div>

        {/* ── Contact cards ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {CONTACTS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              {...fadeUp(0.1 + i * 0.12)}
              className="group block"
            >
              <GlowCard glowColor="gold" customSize className="flex flex-col p-8 h-full">
                {/* Top accent */}
                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="text-3xl mb-5 select-none">{c.icon}</span>
                <span className="font-sans text-[10px] text-gold tracking-[0.25em] uppercase mb-2">
                  {c.label}
                </span>
                <span className="font-display text-stone-800 dark:text-white text-lg font-semibold leading-snug mb-1 group-hover:text-gold transition-colors duration-300">
                  {c.value}
                </span>
                {c.sub && (
                  <span className="font-sans text-stone-400 dark:text-white/30 text-xs leading-relaxed">{c.sub}</span>
                )}

                {/* Arrow indicator */}
                <span className="mt-auto pt-5 text-gold/40 dark:text-gold/30 group-hover:text-gold/70 dark:group-hover:text-gold/60 transition-colors duration-300 text-sm">
                  → Visit
                </span>
              </GlowCard>
            </motion.a>
          ))}
        </div>

        {/* ── Map placeholder / address block ── */}
        <motion.div
          {...fadeUp(0.45)}
          className="mt-8 rounded-2xl border border-stone-200 dark:border-white/[0.06] bg-stone-50 dark:bg-white/[0.02] overflow-hidden"
        >
          <div className="px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-sans text-[10px] text-gold tracking-[0.3em] uppercase mb-3">
                Visit Our Kitchen
              </p>
              <p className="font-display text-stone-800 dark:text-white text-xl font-semibold leading-snug">
                #28 Sierra Madre St. Nangka
              </p>
              <p className="font-sans text-stone-500 dark:text-white/40 text-sm mt-1">
                Marikina Village, Marikina City
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Sierra+Madre+St+Nangka+Marikina+City"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 rounded-full bg-stone-100 dark:bg-white/[0.05] border border-stone-200 dark:border-white/[0.1] text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white hover:border-gold/40 dark:hover:border-gold/30 font-sans text-xs tracking-widest uppercase transition-all duration-300"
            >
              Open in Maps →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
