'use client';

import React from "react";

interface AlbionBannerFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function AlbionBannerFrame({ children, className = "" }: AlbionBannerFrameProps) {
  // Heraldic Albion Pennant Banner Polygon
  const bannerClipPath = `polygon(
    0 0,
    100% 0,
    100% calc(100% - 48px),
    calc(100% - 6px) calc(100% - 48px),
    calc(100% - 6px) calc(100% - 32px),
    100% calc(100% - 32px),
    50% 100%,
    0 calc(100% - 32px),
    6px calc(100% - 32px),
    6px calc(100% - 48px),
    0 calc(100% - 48px)
  )`;

  return (
    <div className={`relative w-full max-w-[440px] mx-auto select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] ${className}`}>
      {/* Outer Golden/Bronze Beveled Border */}
      <div
        className="relative w-full p-[3.5px] bg-gradient-to-b from-[#e5ba64] via-[#946c24] to-[#caa048]"
        style={{ clipPath: bannerClipPath }}
      >
        {/* Inner Dark Accent Separation Rim */}
        <div
          className="relative w-full p-[1.5px] bg-gradient-to-b from-[#3a1d0d] via-[#1c0c06] to-[#2e170a]"
          style={{ clipPath: bannerClipPath }}
        >
          {/* Inner Golden Highlight Line */}
          <div
            className="relative w-full p-[1px] bg-gradient-to-b from-[#f7d885]/70 via-[#7a5818]/40 to-[#e5ba64]/80"
            style={{ clipPath: bannerClipPath }}
          >
            {/* Main Banner Body: Deep Dark Burgundy / Mahogany with Vignette */}
            <div
              className="relative w-full bg-[#1e0707] pb-14 overflow-hidden"
              style={{ clipPath: bannerClipPath }}
            >
              {/* Background gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#320c0b] via-[#1a0606] to-[#100303]" />

              {/* Top Red Velvet Banner Drapery */}
              <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none overflow-hidden">
                {/* Velvet Crimson Base */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#781414] via-[#4d0c0c] to-transparent opacity-95" />

                {/* Velvet Cloth Folds / Creases Simulation */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-black/40 to-black/90" />

                {/* Curved draped fold shadows */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[140%] h-44 rounded-[50%] border-b-[6px] border-black/40 blur-[2px]" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[110%] h-36 rounded-[50%] border-b-[4px] border-black/30 blur-[1px]" />
                <div className="absolute top-0 left-0 w-24 h-48 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-48 bg-gradient-to-l from-black/60 to-transparent" />

                {/* Bottom shadow of drape fading into leather */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#1e0707]" />
              </div>

              {/* Radial vignette for rich medieval leather atmosphere */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

              {/* Content Container */}
              <div className="relative z-10 px-6 sm:px-9 pt-6 pb-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
