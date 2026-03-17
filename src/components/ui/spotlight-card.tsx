"use client"

import React, { useEffect, useRef, useState, ReactNode } from "react"
import { useTheme } from "next-themes"

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: "gold" | "green" | "blue" | "purple" | "red"
  customSize?: boolean
}

const glowColorMap = {
  gold:   { base: 45,  spread: 60  },
  green:  { base: 90,  spread: 80  },
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  red:    { base: 0,   spread: 200 },
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "gold",
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia("(max-width: 640px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e
      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2))
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2))
        cardRef.current.style.setProperty("--y", y.toFixed(2))
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2))
      }
    }
    document.addEventListener("pointermove", syncPointer)
    return () => document.removeEventListener("pointermove", syncPointer)
  }, [])

  const { base, spread } = glowColorMap[glowColor]

  const isDark = mounted && resolvedTheme === "dark"

  // ── Mobile: plain card, no glow ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        className={`relative rounded-2xl border ${
          isDark
            ? "bg-[#111111] border-white/[0.07]"
            : "bg-white border-stone-200"
        } ${className}`}
      >
        {children}
      </div>
    )
  }

  // ── Desktop: full glow effect ─────────────────────────────────────────────
  const backdrop    = isDark ? "hsl(0 0% 6% / 0.70)"   : "hsl(0 0% 100% / 0.90)"
  const backupBorder = isDark ? "hsl(45 60% 40% / 0.15)" : "hsl(45 60% 40% / 0.25)"

  const cssVars = {
    "--base":    base,
    "--spread":  spread,
    "--radius":  "16",
    "--border":  "2",
    "--backdrop": backdrop,
    "--backup-border": backupBorder,
    "--size":    "220",
    "--outer":   "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 45) 80% 60% / 0.08), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative" as const,
    touchAction: "pan-y" as const,
  }

  const css = `
    [data-glow]::before,[data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 45) 80% 55% / 0.9), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / 0.12), transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={cardRef}
        data-glow
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={cssVars as any}
        className={`relative rounded-2xl backdrop-blur-sm shadow-[0_1rem_2rem_-1rem_rgba(0,0,0,0.6)] ${customSize ? "" : ""} ${className}`}
      >
        <div data-glow />
        {children}
      </div>
    </>
  )
}

export { GlowCard }
