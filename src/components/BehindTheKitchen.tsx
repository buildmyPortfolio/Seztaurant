"use client"

import { motion } from "framer-motion"
import { InteractiveSelector } from "@/components/ui/interactive-selector"

export default function BehindTheKitchen() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0F0A04]">
      {/* Edge lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-gold font-sans text-[10px] tracking-[0.35em] uppercase mb-5">
            Our Kitchen
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Behind the Kitchen
          </h2>
          <p className="text-white/45 font-sans text-base max-w-xl mx-auto leading-relaxed">
            Every plate that leaves our kitchen carries a piece of our story — tradition, passion, and homemade love.
          </p>
        </motion.div>

        {/* Interactive selector */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveSelector />
        </motion.div>
      </div>
    </section>
  )
}
