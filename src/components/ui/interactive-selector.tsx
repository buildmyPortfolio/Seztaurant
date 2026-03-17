"use client"

import React, { useState, useEffect } from "react"
import { ChefHat, Flame, Leaf, Users, Heart } from "lucide-react"

export interface SelectorOption {
  title: string
  description: string
  image: string
  icon: React.ReactNode
}

interface InteractiveSelectorProps {
  options?: SelectorOption[]
}

const defaultOptions: SelectorOption[] = [
  {
    title: "Filipino Roots",
    description: "Recipes passed down through generations",
    image: "/assets/kare-kare.jpg",
    icon: <ChefHat size={20} className="text-white" />,
  },
  {
    title: "The Flame",
    description: "Cooked fresh with passion every day",
    image: "/assets/pork-barbecue.png",
    icon: <Flame size={20} className="text-white" />,
  },
  {
    title: "Fresh Picks",
    description: "Quality ingredients, zero shortcuts",
    image: "/assets/garlic-butter-shrimp.png",
    icon: <Leaf size={20} className="text-white" />,
  },
  {
    title: "Family Style",
    description: "Portions crafted for 15–18 people",
    image: "/assets/fried-chicken.jpg",
    icon: <Users size={20} className="text-white" />,
  },
  {
    title: "Made with Love",
    description: "Every dish carries a story",
    image: "/assets/buko-pandan.jpg",
    icon: <Heart size={20} className="text-white" />,
  },
]

const InteractiveSelector = ({ options = defaultOptions }: InteractiveSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState<number[]>([])

  useEffect(() => {
    const timers = options.map((_, i) =>
      setTimeout(() => setVisible((prev) => [...prev, i]), 180 * i)
    )
    return () => timers.forEach(clearTimeout)
  }, [options])

  return (
    <div className="flex w-full h-[420px] items-stretch overflow-hidden rounded-2xl">
      {options.map((option, index) => {
        const isActive = activeIndex === index
        const isVisible = visible.includes(index)

        return (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-60px)",
              transition:
                "opacity 0.5s ease, transform 0.5s ease, flex 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s ease, border-color 0.4s ease",
              flex: isActive ? "7 1 0%" : "1 1 0%",
              minWidth: "56px",
              position: "relative" as const,
              overflow: "hidden",
              cursor: "pointer",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: isActive ? "#D4AF37" : "#2a2a2a",
              backgroundColor: "#1a1008",
              boxShadow: isActive
                ? "0 20px 60px rgba(0,0,0,0.60)"
                : "0 10px 30px rgba(0,0,0,0.40)",
            }}
          >
            {/* Dark gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isActive
                  ? "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.08) 55%)"
                  : "rgba(0,0,0,0.52)",
                transition: "background 0.7s ease",
              }}
            />

            {/* Label row */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 18,
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
                gap: 10,
                zIndex: 2,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  minWidth: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(15,10,4,0.82)",
                  backdropFilter: "blur(8px)",
                  border: "1.5px solid rgba(212,175,55,0.40)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "border-color 0.3s ease",
                }}
              >
                {option.icon}
              </div>

              {/* Title + description */}
              <div style={{ overflow: "hidden", minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    color: "#fff",
                    whiteSpace: "nowrap",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0)" : "translateX(22px)",
                    transition:
                      "opacity 0.45s ease 0.12s, transform 0.45s ease 0.12s",
                  }}
                >
                  {option.title}
                </div>
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: "rgba(245,224,112,0.85)",
                    whiteSpace: "nowrap",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateX(0)" : "translateX(22px)",
                    transition:
                      "opacity 0.45s ease 0.20s, transform 0.45s ease 0.20s",
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { InteractiveSelector }
