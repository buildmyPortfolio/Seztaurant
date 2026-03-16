"use client";

import { motion } from "framer-motion";

const TITLE    = "Seztaurant".split("");
const SUBTITLE = "Crafted from scratch with authentic recipes, fresh ingredients, and a whole lot of heart.";
const STATS    = [
  { value: "43+",  label: "Dishes" },
  { value: "100%", label: "Homemade" },
  { value: "MKN",  label: "Marikina City" },
];

function Diamond({ size = 6, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 6 6" className={className} aria-hidden>
      <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="currentColor" />
    </svg>
  );
}

function CornerMark({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="44" height="44" viewBox="0 0 52 52" fill="none"
      className="text-gold/20 pointer-events-none absolute"
      style={style}
      aria-hidden
    >
      <path d="M2 26 L2 2 L26 2" stroke="currentColor" strokeWidth="0.75" />
      <path d="M2 2 L10 2"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 2 L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-[100dvh] min-h-[600px] overflow-hidden bg-[#F8F5EE] dark:bg-[#050505] flex flex-col items-center justify-center select-none">

      {/* ── Slow-spinning ambient rings ── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto rounded-full pointer-events-none"
        style={{ width: "min(145vw,145vh)", height: "min(145vw,145vh)", border: "1px solid rgba(212,175,55,0.045)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto rounded-full pointer-events-none"
        style={{ width: "min(105vw,105vh)", height: "min(105vw,105vh)", border: "1px solid rgba(212,175,55,0.065)" }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto rounded-full pointer-events-none"
        style={{ width: "min(68vw,68vh)", height: "min(68vw,68vh)", border: "1px solid rgba(212,175,55,0.055)" }}
      />

      {/* ── Static ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[540px] h-[540px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(28,58,26,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[260px]"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.09] dark:opacity-[0.13]" style={{
        backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.55) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 10%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 10%, transparent 100%)",
      }} />

      {/* ── Vignette — two variants so colour matches each mode ── */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(5,5,5,0.78) 100%)" }} />
      <div className="absolute inset-0 pointer-events-none block dark:hidden"
        style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(248,245,238,0.75) 100%)" }} />

      {/* ── Inset frame ── */}
      <div className="absolute inset-3 sm:inset-5 border border-gold/[0.10] rounded-[2px] pointer-events-none" />

      {/* ── Corner ornaments ── */}
      <CornerMark style={{ top: 10, left: 10 }} />
      <CornerMark style={{ top: 10, right: 10, transform: "scaleX(-1)" }} />
      <CornerMark style={{ bottom: 10, left: 10, transform: "scaleY(-1)" }} />
      <CornerMark style={{ bottom: 10, right: 10, transform: "scale(-1,-1)" }} />

      {/* ── Edge lines ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="relative z-10 text-center px-5 sm:px-8 w-full max-w-5xl mx-auto py-16 sm:py-0">

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-9"
        >
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold/55" />
          <Diamond size={4} className="text-gold/65" />
          <span className="font-sans text-gold/85 text-[8px] sm:text-[10px] tracking-[0.32em] sm:tracking-[0.42em] uppercase">
            Est.&nbsp;·&nbsp;Marikina City
          </span>
          <Diamond size={4} className="text-gold/65" />
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold/55" />
        </motion.div>

        {/* ── Title ── */}
        <div className="relative" style={{ perspective: "900px" }}>
          {/* Ghost outline depth layer */}
          <h1
            aria-hidden
            className="absolute inset-0 font-display font-bold leading-[0.9] tracking-tight text-center pointer-events-none"
            style={{
              fontSize: "clamp(3rem, 13.5vw, 11rem)",
              WebkitTextStroke: "1px rgba(212,175,55,0.13)",
              color: "transparent",
              transform: "translate(3px, 4px)",
            }}
          >Seztaurant</h1>

          {/* Animated visible title */}
          <h1 className="relative font-display font-bold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 13.5vw, 11rem)" }}>
            {TITLE.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 56, rotateX: -50 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.74, delay: 0.38 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "bottom center", display: "inline-block" }}
              >
                {i === 0 ? (
                  <span style={{ color: "#8A9A5B" }}>{char}</span>
                ) : (
                  <span className="text-[#0F0F0F] dark:text-white">{char}</span>
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* ── Ornate diamond divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 mt-4 sm:mt-5 mb-5 sm:mb-7 origin-center"
        >
          <span className="h-px flex-1 max-w-[60px] sm:max-w-[140px] bg-gradient-to-r from-transparent to-gold/50" />
          <Diamond size={4} className="text-gold/60" />
          <span className="h-px w-4 sm:w-5 bg-gold/35" />
          <Diamond size={6} className="text-gold" />
          <span className="h-px w-4 sm:w-5 bg-gold/35" />
          <Diamond size={4} className="text-gold/60" />
          <span className="h-px flex-1 max-w-[60px] sm:max-w-[140px] bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans italic text-black/45 dark:text-white/38 text-sm sm:text-base md:text-[1.06rem] max-w-[320px] sm:max-w-[420px] mx-auto leading-relaxed mb-7 sm:mb-9"
        >
          {SUBTITLE}
        </motion.p>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.38, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 sm:gap-8 mb-8 sm:mb-10"
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-8">
              <div className="text-center">
                <div className="font-display text-gold font-bold text-lg sm:text-2xl leading-none tracking-tight">{s.value}</div>
                <div className="font-sans text-black/35 dark:text-white/28 text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] uppercase mt-1">{s.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="flex flex-col items-center gap-1">
                  <span className="w-px h-2.5 sm:h-3 bg-gold/20" />
                  <Diamond size={3} className="text-gold/25" />
                  <span className="w-px h-2.5 sm:h-3 bg-gold/20" />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.58, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {/* Primary */}
          <button
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            className="group w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 font-semibold text-[11px] rounded-full tracking-[0.22em] uppercase transition-all duration-300 active:scale-95 hover:scale-105"
            style={{
              background: "linear-gradient(110deg, #c9a227 0%, #F5E070 50%, #c9a227 100%)",
              color: "#050505",
              boxShadow: "0 0 28px rgba(212,175,55,0.30), 0 4px 18px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,255,255,0.22)",
              maxWidth: "260px",
            }}
          >
            <span className="flex items-center justify-center gap-2.5">
              Explore the Menu
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden>
                <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Secondary */}
          <button
            onClick={() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 bg-transparent text-stone-700 dark:text-white/70 border border-stone-400 dark:border-white/30 font-sans text-[11px] rounded-full tracking-[0.22em] uppercase hover:bg-stone-100 dark:hover:bg-white/[0.08] hover:text-stone-900 dark:hover:text-white hover:border-gold/60 dark:hover:border-gold/50 transition-all duration-300 active:scale-95"
            style={{ maxWidth: "260px" }}
          >
            How to Order
          </button>
        </motion.div>

      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-2.5 pointer-events-none"
      >
        <span className="font-sans text-black/25 dark:text-white/22 text-[9px] tracking-[0.40em] uppercase">Scroll to discover</span>
        <div className="w-5 h-8 rounded-full border border-black/[0.12] dark:border-white/[0.14] flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 11, 0], opacity: [0.85, 0.1, 0.85] }}
            transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut" }}
            className="w-0.5 h-2 rounded-full"
            style={{ background: "linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.15))" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
