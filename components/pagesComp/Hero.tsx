"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import herobg from '@/public/assets/background/hero.webp'
import heroImage1 from "@/public/assets/games/buildin/home.webp";
import heroImage2 from "@/public/assets/games/buildin/home2.webp";
import heroImage3 from "@/public/assets/games/buildin/home3.webp";
import ButtonLight from "../Button/ButtonLight";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaUrl: string;
  className?: string;
}


export const Hero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaUrl,
  className,
}) => {
  const FADE_IN_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      } 
    },
  };

  const STAGGER_CHILDREN_VARIANTS: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Create an array that cycles through images 1,2,3 repeatedly for 15 total images
  const imageSources = [heroImage1.src, heroImage2.src, heroImage3.src];
  const duplicatedImages = Array(15).fill(null).map((_, index) => {
    // Cycle through 0,1,2,0,1,2... pattern
    const imageIndex = index % 3;
    return imageSources[imageIndex];
  });

  return (
    <section
      className={cn(
        "relative w-full h-[60lvh] md:h-[90lvh] 2xl:h-lvh overflow-hidden rounded-lg text-center px-4",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 brightness-75">
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/70" />
        <Image 
          src={herobg} 
          alt="Albion Online Background" 
          fill
          className="object-cover brightness-35"
          priority
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center mt-auto h-full pt-10 2xl:pt-20">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-2 inline-block rounded-full border border-gray-700 bg-black px-4 py-1 text-sm font-medium text-gray-300 backdrop-blur-sm "
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={STAGGER_CHILDREN_VARIANTS}
          className="text-5xl md:text-7xl font-bold tracking-normal text-white "
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block "
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-2 max-w-xl text-lg text-gray-300"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
          className="-mt-5 md:mt-5 2xl:mt-10"
        >
          {ctaUrl ? 
            <Link href={ctaUrl} target="_blank">
              <ButtonLight>{ctaText}</ButtonLight>
            </Link> : 
            <ButtonLight>{ctaText}</ButtonLight>
          }
        </motion.div>

        {/* Animated Image Marquee */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-1/3 md:h-2/5 mask-[linear-gradient(to_top,transparent,black_20%,black_80%,transparent)] pointer-events-none">
          <motion.div
            className="flex gap-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
                style={{
                  rotate: `${(index % 2 === 0 ? -3 : 3)}deg`,
                }}
              >
                <Image
                  src={src}
                  alt={`Showcase image ${(index % 3) + 1}`}
                  fill
                  className="object-cover rounded-2xl shadow-md"
                  sizes="(max-width: 768px) 12rem, 16rem"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};