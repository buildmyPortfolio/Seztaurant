"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Menu",    id: "menu" },
  { label: "About",   id: "about" },
  { label: "How to Order", id: "order" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const { theme, setTheme }         = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-background/90 backdrop-blur-xl border-b border-stone-200/80 dark:border-white/[0.06] shadow-md dark:shadow-xl shadow-black/5 dark:shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center shrink-0"
          >
            {/* Light mode: LogoBlack, Dark mode: Logo (white) */}
            {mounted && (
              <Image
                src={isDark ? "/assets/Logo.jpg" : "/assets/LogoBlack.jpg"}
                alt="Seztaurant"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            )}
            {/* Fallback before mount to avoid layout shift */}
            {!mounted && <div className="h-9 w-[140px]" />}
          </button>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`font-sans text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  scrolled
                    ? "text-stone-500 hover:text-stone-900 dark:text-white/50 dark:hover:text-white"
                    : "text-stone-500 hover:text-stone-900 dark:text-white/60 dark:hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── CTA + theme toggle + burger ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scrollTo("order")}
              className="hidden md:flex px-5 py-2 rounded-full bg-gold text-background text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
            >
              Order Now
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                  scrolled
                    ? "border-stone-200 dark:border-white/[0.1] bg-stone-100/80 dark:bg-white/[0.06] text-stone-500 dark:text-white/50 hover:text-stone-800 dark:hover:text-white hover:border-gold/40 dark:hover:border-gold/30"
                    : "border-white/20 bg-white/10 text-white/70 hover:text-white hover:border-white/40"
                }`}
              >
                {isDark ? (
                  /* Sun icon */
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                    <circle cx="12" cy="12" r="4"/>
                    <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                ) : (
                  /* Moon icon */
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            )}

            {/* Burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`md:hidden flex flex-col gap-[5px] w-6 transition-colors ${
                scrolled ? "text-stone-600 dark:text-white/70" : "text-white/70"
              } hover:text-gold`}
            >
              <span className={`block h-[1.5px] w-6 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block h-[1.5px] w-6 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] w-6 bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-stone-200 dark:border-white/[0.06] md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-3 text-stone-500 dark:text-white/60 hover:text-gold dark:hover:text-gold font-sans text-sm tracking-widest uppercase transition-colors border-b border-stone-100 dark:border-white/[0.05] last:border-0"
                >
                  {link.label}
                </button>
              ))}
              {/* Mobile theme toggle row */}
              <div className="flex items-center justify-between pt-3">
                <span className="font-sans text-xs text-stone-400 dark:text-white/30 tracking-widest uppercase">
                  {mounted && isDark ? "Dark Mode" : "Light Mode"}
                </span>
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="w-10 h-6 rounded-full relative transition-colors duration-300 border border-stone-200 dark:border-white/[0.1] bg-stone-200 dark:bg-white/[0.1]"
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-gold transition-all duration-300 flex items-center justify-center text-background ${isDark ? "left-[18px]" : "left-0.5"}`}>
                      {isDark ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                          <circle cx="12" cy="12" r="4"/>
                          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                      )}
                    </span>
                  </button>
                )}
              </div>
              <button
                onClick={() => scrollTo("order")}
                className="mt-4 py-3 rounded-full bg-gold text-background text-sm font-semibold tracking-widest uppercase text-center hover:bg-gold-light transition-all"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
