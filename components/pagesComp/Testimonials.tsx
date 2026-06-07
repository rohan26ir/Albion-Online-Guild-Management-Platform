"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowBearRight as ArrowUpRight } from '@tabler/icons-react';

import Image from "next/image";
import charecter1 from '@/public/assets/games/charecter/charecter1.webp'
import charecter2 from '@/public/assets/games/charecter/charecter2.webp'


const testimonials = [
  {
    id: 1,
    quote: "The most skilled shot caller I've ever played with. Turned our ZvZ fights from chaos to calculated victories.",
    name: "ShadowStrike",
    role: "Guild Officer",
    company: "Black Rose Guild",
    image: charecter1,
  },
  {
    id: 2,
    quote: "Master strategist who understands both small-scale ganking and territory control. Absolute game changer for our alliance.",
    name: "IronFist",
    role: "Alliance Leader",
    company: "Iron Empire",
    image: charecter2,
  },
  {
    id: 3,
    quote: "Best healer in the BZ. Their positioning and cooldown management saved our core team countless times during fame farms.",
    name: "MageQueen",
    role: "Support Main",
    company: "Arcane Legion",
    image: charecter1,
  },
  {
    id: 4,
    quote: "Incredible economy management. Turned our guild island into a profitable hub and funded our first hideout.",
    name: "GoldHopper",
    role: "Guild Banker",
    company: "Trade Federation",
    image: charecter2,
  },
  {
    id: 5,
    quote: "The most patient crystal arena caller. Taught us coordination and turned our 20% win rate into 75%.",
    name: "CrystalWarden",
    role: "PvP Coach",
    company: "Arena Masters",
    image: charecter1,
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const active = testimonials[activeIndex]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div className="bg-background w-full py-10">
      <div className="max-w-7xl w-[95%] mx-auto">
        {/* content */}
        <div
          className="relative grid grid-cols-[1fr_auto] gap-12 items-center cursor-pointer group"
          onClick={nextTestimonial}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left: Quote Content */}
          <div className="space-y-8">
            {/* Company Tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground"
              >
                <span className="w-8 h-px bg-muted-foreground/50" />
                {active.company}
              </motion.div>
            </AnimatePresence>

            {/* Quote */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-4xl font-light leading-[1.3] tracking-tight text-foreground"
                >
                  &ldquo;{active.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-px bg-foreground/20" />
                <div>
                  <p className="text-sm font-medium text-foreground">{active.name}</p>
                  <p className="text-xs text-muted-foreground">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Visual Element */}
          <div className="relative w-48 h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <Image
                    src={active.image}
                    alt={active.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Click indicator */}
            <motion.div
              animate={{
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap"
            >
              <span>Next Testimonial</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.div>
          </div>

          {/* Progress Dots */}
          <div className="relative left-0 flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(index)
                }}
                className="relative p-1 group/dot"
              >
                <span
                  className={`
                    block w-2 h-2 rounded-full transition-all duration-300
                    ${
                      index === activeIndex
                        ? "bg-foreground scale-100"
                        : "bg-muted-foreground/30 scale-75 hover:bg-muted-foreground/50 hover:scale-100"
                    }
                  `}
                />
                {index === activeIndex && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 border border-foreground/30 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}