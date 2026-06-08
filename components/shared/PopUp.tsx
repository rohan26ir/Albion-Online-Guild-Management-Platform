'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { IconX, IconCalendarClock, IconRocket } from '@tabler/icons-react';
import TimeCounter from '../customComp/TimeCounter';
import underDev from '@/public/assets/lottie/underdevelopment.json';

interface PopUpProps {
  launchDate?: string;
  title?: string;
  description?: string;
  showEveryVisit?: boolean;
  backgroundImage?: string;
}

export default function PopUp({ 
  launchDate = "2026-06-30T17:00:00",
  title = "Something Epic is Coming",
  description = "We're rebuilding the ultimate experience for the Albion Online community. Launching soon.",
  showEveryVisit = false,
  backgroundImage = "https://images.unsplash.com/photo-1614850523459-c2f1c7a3d3e1?q=80&w=2070&auto=format&fit=crop"
}: PopUpProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenLaunchPopup');
    
    if (!hasSeenPopup || showEveryVisit) {
      const timer = setTimeout(() => setIsOpen(true), 700);
      return () => clearTimeout(timer);
    }
  }, [showEveryVisit]);

  const handleClose = () => {
    setIsOpen(false);
    if (!hasInteracted) {
      localStorage.setItem('hasSeenLaunchPopup', 'true');
      setHasInteracted(true);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    localStorage.setItem('hasSeenLaunchPopup', 'true');
    setHasInteracted(true);
    setIsOpen(false);
    
    window.open('https://albiononline.com/newsletter', '_blank');
    setEmail("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/0 backdrop-blur-sm"
          />

          {/* Main Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 50 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed left-1/2 top-1/2  z-50 w-[95%] max-w-5xl 
                       -translate-x-1/2 -translate-y-1/2 
                       overflow-hidden rounded-3xl shadow-2xl h-[70lvh] my-auto "
          >
            <div className="relative flex h-auto min-h-140 flex-col overflow-hidden rounded-3xl lg:flex-row lg:items-start ">
              
              {/* Left Side - Lottie Animation */}
              <div className="relative flex w-full items-center justify-center bg-white p-2 md:p-8 lg:w-5/12">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  className="relative z-10"
                >
                  <div className="mx-auto w-40 h-40 md:w-80 md:h-130 overflow-hidden">
                    <Lottie 
                      animationData={underDev} 
                      loop 
                      autoplay 
                    />
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Content */}
              <div className="relative flex w-full flex-col justify-center bg-gradient-to-br from-zinc-950 to-black p-8 lg:w-7/12 lg:p-12">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="absolute right-6 top-6 z-20 rounded-full bg-black/70 p-3 text-white/70 backdrop-blur-md hover:bg-black hover:text-white transition-all"
                >
                  <IconX size={26} />
                </motion.button>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 w-fit flex justify-start items-start gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm font-medium text-white backdrop-blur-md"
                >
                  <IconCalendarClock size={18} />
                  COMING SOON
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 text-4xl font-bold tracking-tighter text-white lg:text-5xl"
                >
                  {title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8 max-w-md text-lg text-white/80"
                >
                  {description}
                </motion.p>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-10"
                >
                  <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-white/70">
                    <IconCalendarClock size={20} />
                    Launch Countdown
                  </div>
                  <div className="flex justify-center lg:justify-start text-white">
                    <TimeCounter time={launchDate} />
                  </div>
                </motion.div>

                {/* Email Signup Form */}
                {/* <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onSubmit={handleSubscribe}
                  className="w-full max-w-md"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 rounded-2xl bg-white/10 px-6 py-4 text-white placeholder:text-white/50 border border-white/20 focus:border-white/40 focus:outline-none transition-all"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-2xl bg-white px-9 py-4 font-semibold text-black hover:bg-white/90 transition-all whitespace-nowrap"
                    >
                      <IconRocket size={20} />
                      Notify Me
                    </motion.button>
                  </div>
                </motion.form> */}

                {/* <p className="mt-6 text-sm text-white/50">
                  {"We'll notify you as soon as the new site launches"}
                </p> */}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}