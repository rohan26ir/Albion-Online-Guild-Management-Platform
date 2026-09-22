'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowRight,
  IconBox,
  IconStarFilled,
  IconBrandFacebook,
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandLinkedin
} from "@tabler/icons-react";
import bgImage from "@/public/assets/background/ao-login.webp";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutBentoGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl w-[95%] mx-auto">

        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-10 md:mb-16"
        >
          <span className="text-primary font-bold tracking-wider text-sm md:text-base uppercase mb-4 block">
            [ ABOUT ALBION GAME ]
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight max-w-3xl text-foreground">
            ALBION ONLINE <br className="hidden md:block" />
            <span className="text-muted-foreground">COMPANION</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {/* Box 1: Image with CTA */}
          <motion.div 
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 lg:col-span-1 h-[300px] md:h-auto"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-10" />
              <Image
                src={bgImage}
                alt="Albion Online"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between items-start">
              <h3 className="text-2xl md:text-3xl font-bold uppercase leading-snug max-w-[250px] text-foreground">
                ALL-IN-ONE GAMING PLATFORM
              </h3>
              <Link 
                href="/dashboard" 
                className="mt-6 flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                <div className="bg-background/20 p-1.5 rounded-full">
                  <IconArrowRight size={18} />
                </div>
                Explore Features
              </Link>
            </div>
          </motion.div>

          {/* Box 2: Stats */}
          <motion.div 
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 lg:col-span-1 p-6 md:p-8 flex flex-col justify-center"
          >
            {/* Decorative background shape */}
            <div className="absolute -right-10 -bottom-10 opacity-5 text-foreground">
              <IconBox size={200} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                <IconBox size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground font-medium">Monthly Active Users</p>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">30,500+</h3>
              </div>
            </div>
          </motion.div>

          {/* Box 3: Reviews */}
          <motion.div 
            variants={fadeInUp}
            className="group rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 lg:col-span-1 lg:row-span-2 p-6 md:p-8 flex flex-col"
          >
            <div className="relative w-full overflow-hidden mb-8 space-y-3" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
              {/* Row 1 - Scrolling Left */}
              <motion.div 
                className="flex gap-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              >
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={`r1-${i}`} 
                    className="w-14 h-14 flex-shrink-0 rounded-full bg-muted overflow-hidden relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${(i % 12) + 10}`}
                      alt="User avatar"
                      fill
                      className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                      unoptimized
                    />
                  </div>
                ))}
              </motion.div>

              {/* Row 2 - Scrolling Right */}
              <motion.div 
                className="flex gap-3 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              >
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={`r2-${i}`} 
                    className="w-14 h-14 flex-shrink-0 rounded-full bg-muted overflow-hidden relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${(i % 12) + 30}`}
                      alt="User avatar"
                      fill
                      className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                      unoptimized
                    />
                  </div>
                ))}
              </motion.div>

              {/* Row 3 - Scrolling Left */}
              <motion.div 
                className="flex gap-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
              >
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={`r3-${i}`} 
                    className="w-14 h-14 flex-shrink-0 rounded-full bg-muted overflow-hidden relative"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${(i % 12) + 50}`}
                      alt="User avatar"
                      fill
                      className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                      unoptimized
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} size={18} className="text-amber-500" />
                ))}
              </div>
              <h3 className="text-2xl font-bold uppercase text-foreground">TRUSTED BY ALBION PLAYERS</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Empowering players to optimize their economy, refine builds, and manage guilds with expert tools, advanced calculators, and real-time market data.
              </p>
            </div>
          </motion.div>

          {/* Box 4: Features & Socials */}
          <motion.div 
            variants={fadeInUp}
            className="group rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 lg:col-span-2 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div className="max-w-md space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold uppercase leading-tight text-foreground">
                PERFECTLY CRAFTED FOR GUILDS & PLAYERS.
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Enhancing your Albion Online experience with comprehensive tools, actionable insights, and a vibrant community platform to help you dominate the world of Albion.
              </p>
            </div>

            <div className="flex gap-3 md:grid md:grid-cols-3 flex-wrap">
              {[
                { icon: IconBrandFacebook, href: "#" },
                { icon: IconBrandX, href: "#" },
                { icon: IconBrandInstagram, href: "#" },
                { icon: IconBrandYoutube, href: "#" },
                { icon: IconBrandLinkedin, href: "#" },
              ].map((social, index) => (
                <Link 
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
