"use client";

import { motion } from "framer-motion";

export default function MenuBanner() {
  return (
    <section className="bg-[#F8F5EE] dark:bg-[#070707] px-4 sm:px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/Menu2.png"
          alt="Seztaurant Full Menu"
          className="w-full h-auto rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40"
        />
      </motion.div>
    </section>
  );
}
