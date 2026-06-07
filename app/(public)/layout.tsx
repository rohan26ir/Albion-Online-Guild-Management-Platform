'use client';

import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import UnderDevelopment from "@/components/shared/UnderDevelopment"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <UnderDevelopment progress={28} /> */}
      <main className="grow mb-10 mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}