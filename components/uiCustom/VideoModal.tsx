'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoId, title }: VideoModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!videoId) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl bg-zinc-950 rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-lg pr-8 line-clamp-1">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white p-2 transition-colors"
                >
                  <IconX size={28} />
                </button>
              </div>

              {/* YouTube Player */}
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}