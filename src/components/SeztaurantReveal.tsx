"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";

const FRAME_COUNT = 120;

// Generic TextBeat component to avoid repetition
const TextBeat = ({
  progress,
  start,
  end,
  title,
  subtitle,
  alignment = "center",
  showCTA = false,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  title: string;
  subtitle: string;
  alignment?: "center" | "left" | "right";
  showCTA?: boolean;
}) => {
  const fadeInStart = start;
  const fadeInEnd = start + 0.1;
  const fadeOutStart = end - 0.1;
  const fadeOutEnd = end;

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  
  const yOffset = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [20, 0, 0, -20]
  );

  let alignClass = "text-center items-center justify-center inset-0";
  if (alignment === "left")  alignClass = "text-center md:text-left  items-center md:items-start justify-center inset-0 md:inset-y-0 md:left-12 lg:left-24 md:w-[420px] md:right-auto";
  if (alignment === "right") alignClass = "text-center md:text-right items-center md:items-end   justify-center inset-0 md:inset-y-0 md:right-12 lg:right-24 md:w-[420px] md:left-auto";

  return (
    <motion.div
      style={{ opacity, y: yOffset }}
      className={`absolute flex flex-col pointer-events-none p-6 ${alignClass}`}
    >
      <h2 className="text-white/90 font-display font-bold text-[2.2rem] sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight mb-3 md:mb-6">
        {title}
      </h2>
      <p className="text-white/60 font-sans text-sm sm:text-base md:text-2xl font-light tracking-wide max-w-xs sm:max-w-sm md:max-w-xl px-2 md:px-0">
        {subtitle}
      </p>
      {showCTA && (
        <button
          onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-7 md:mt-12 px-7 py-3.5 md:px-8 md:py-4 bg-gold/90 hover:bg-gold text-background font-semibold text-sm md:text-base rounded-full tracking-wider uppercase transition-all duration-300 hover:scale-105 pointer-events-auto shadow-lg shadow-gold/20"
        >
          Explore the Menu
        </button>
      )}
    </motion.div>
  );
};

export default function SeztaurantReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  // Frames stored in a ref — no re-render needed when individual frames load
  const framesRef    = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [ready, setReady]           = useState(false);  // true once frame 0 is loaded
  const [loadedCount, setLoadedCount] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Load frame 0 first for instant display, then stream the rest in parallel
  useEffect(() => {
    let canceled = false;
    let count = 0;

    const loadOne = (i: number, onDone?: () => void) => {
      const img = new Image();
      img.src = `/sequence/frame_${i.toString().padStart(3, "0")}.webp`;
      const finish = () => {
        if (canceled) return;
        framesRef.current[i] = img;
        count++;
        setLoadedCount(count);
        onDone?.();
      };
      img.onload  = finish;
      img.onerror = finish;
    };

    // Frame 0 → show canvas immediately
    loadOne(0, () => {
      if (!canceled) setReady(true);
      // Load all remaining frames in parallel in the background
      for (let i = 1; i < FRAME_COUNT; i++) loadOne(i);
    });

    return () => { canceled = true; };
  }, []);

  // Frame rendering
  useEffect(() => {
    if (!ready || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let localFrame = 0;

    const drawFrame = (idx: number) => {
      // Use requested frame, or fall back to the nearest already-loaded frame
      let img = framesRef.current[idx];
      if (!img) {
        for (let i = idx - 1; i >= 0; i--) {
          if (framesRef.current[i]) { img = framesRef.current[i]; break; }
        }
      }
      if (!img || !img.width) return;

      const { width, height } = canvas;
      const isPortrait = height > width;
      // Portrait (mobile): zoom contain ×1.35 — fills most of the screen without hard-cropping
      // Landscape (desktop): full cover — fills edge-to-edge
      const scale = isPortrait
        ? Math.min(width / img.width, height / img.height) * 1.35
        : Math.max(width / img.width, height / img.height);

      const x = (width  / 2) - (img.width  / 2) * scale;
      const y = (height / 2) - (img.height / 2) * scale;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrame(localFrame);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const unsubscribe = smoothProgress.on("change", (latest) => {
      let targetFrame = Math.floor(latest * (FRAME_COUNT - 1));
      if (targetFrame < 0) targetFrame = 0;
      if (targetFrame >= FRAME_COUNT) targetFrame = FRAME_COUNT - 1;
      if (targetFrame !== localFrame) {
        localFrame = targetFrame;
        requestAnimationFrame(() => drawFrame(localFrame));
      }
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [ready, smoothProgress]);

  // Indicator fades out by 10%
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] md:h-[400vh] bg-background">
      {!ready ? (
        // Minimal splash — frame 0 loads in ~100-300ms so this is barely visible
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-background">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-5 h-5 rounded-full border-2 border-gold/20 border-t-gold"
          />
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />

          <TextBeat
            progress={smoothProgress}
            start={0}
            end={0.2}
            title="Where Flavor Begins"
            subtitle="Every great Filipino dish starts with love and tradition."
            alignment="center"
          />

          <TextBeat
            progress={smoothProgress}
            start={0.25}
            end={0.45}
            title="Homemade. Always."
            subtitle="Crafted from scratch with authentic recipes, fresh ingredients, and a whole lot of heart."
            alignment="left"
          />

          <TextBeat
            progress={smoothProgress}
            start={0.5}
            end={0.7}
            title="Made for Every Occasion"
            subtitle="From intimate family dinners to grand celebrations — we feed your people, freshly."
            alignment="right"
          />

          <TextBeat
            progress={smoothProgress}
            start={0.75}
            end={0.95}
            title="Welcome to Seztaurant"
            subtitle="Home of Homemade Dishes. Marikina City."
            alignment="center"
            showCTA={true}
          />

          <motion.div
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
          >
            <span className="text-white/60 font-sans tracking-widest text-xs uppercase">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent rounded-full"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
