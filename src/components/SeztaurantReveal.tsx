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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

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

  // Preload Images
  useEffect(() => {
    let canceled = false;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (canceled) break;
        const img = new Image();
        const frameId = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${frameId}.webp`;
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            loadedImages.push(img);
            setLoadedCount(prev => prev + 1);
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load ${img.src}`);
            // Push empty/null placeholders or fallback so arrays align
            loadedImages.push(img);
            setLoadedCount(prev => prev + 1);
            resolve();
          };
        });
      }
      
      if (!canceled) {
        setImages(loadedImages);
        setTimeout(() => setIsReady(true), 500); // Small buffer before reveal
      }
    };

    loadImages();

    return () => {
      canceled = true;
    };
  }, []);

  // Frame updating logic
  useEffect(() => {
    if (!isReady || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let localFrame = 0;
    
    // Draw an image onto the canvas mimicking "object-fit: contain"
    const drawImage = (img: HTMLImageElement) => {
      if (!img || !img.width) return;
      const { width, height } = canvas;
      
      // Calculate scale to contain image in canvas
      const scale = Math.min(width / img.width, height / img.height);
      const x = (width / 2) - (img.width / 2) * scale;
      const y = (height / 2) - (img.height / 2) * scale;
      
      // Clear with background color instead of clearRect
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Initial draw
    drawImage(images[0]);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawImage(images[localFrame]);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Map global progress to frame index
      let targetFrame = Math.floor(latest * (FRAME_COUNT - 1));
      if (targetFrame < 0) targetFrame = 0;
      if (targetFrame >= FRAME_COUNT) targetFrame = FRAME_COUNT - 1;
      
      if (targetFrame !== localFrame) {
        localFrame = targetFrame;
        requestAnimationFrame(() => drawImage(images[localFrame]));
      }
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [isReady, images, smoothProgress]);

  // Indicator fades out by 10%
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      {!isReady ? (
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-background">
          <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${Math.round((loadedCount / FRAME_COUNT) * 100)}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex items-center gap-4 text-gold">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 rounded-full border-2 border-gold/20 border-t-gold"
            />
            <span className="font-sans font-light tracking-widest text-sm">
              PREPARING {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </span>
          </div>
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
