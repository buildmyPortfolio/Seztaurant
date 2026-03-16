"use client";

const LINKS = [
  { label: "Menu",         href: "#menu" },
  { label: "About",        href: "#about" },
  { label: "How to Order", href: "#order" },
  { label: "Contact",      href: "#contact" },
];

const scrollTo = (id: string) => {
  document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="relative bg-[#F8F5EE] dark:bg-background border-t border-stone-200 dark:border-white/[0.05]">

      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* ── Main row ── */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Brand block */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-3">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-background text-sm leading-none">S</span>
              </div>
              <span className="font-display font-semibold text-stone-800 dark:text-white text-xl tracking-wide">
                eztaurant
              </span>
            </div>
            <p className="font-sans text-stone-400 dark:text-white/30 text-xs leading-relaxed max-w-[200px] mx-auto md:mx-0">
              Home of Homemade Dishes
              <br />Marikina City, Philippines
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-sans text-[10px] text-stone-400 dark:text-white/30 hover:text-gold tracking-[0.2em] uppercase transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Social / contact */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/Seztaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-stone-100 dark:bg-white/[0.05] border border-stone-200 dark:border-white/[0.08] flex items-center justify-center text-stone-400 dark:text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="tel:+9494659619"
              className="w-9 h-9 rounded-full bg-stone-100 dark:bg-white/[0.05] border border-stone-200 dark:border-white/[0.08] flex items-center justify-center text-stone-400 dark:text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
              aria-label="Phone"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="mt-10 pt-6 border-t border-stone-200 dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-stone-300 dark:text-white/20 text-[10px] tracking-widest text-center">
            © {new Date().getFullYear()} Seztaurant · All rights reserved
          </p>
          <p className="font-sans text-stone-300 dark:text-white/15 text-[10px] tracking-widest text-center">
            Made with ♥ in Marikina City
          </p>
        </div>

      </div>
    </footer>
  );
}
