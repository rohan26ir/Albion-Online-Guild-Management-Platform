import React from "react";
import Image from "next/image";
import albionLogo from "@/public/assets/logo/albion_online_logo.svg";

interface AlbionLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function AlbionLogo({
  className = "",
  width = 240,
  height = 150,
}: AlbionLogoProps) {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      <Image
        src={albionLogo}
        alt="Albion Online"
        width={width}
        height={height}
        className="w-auto h-auto max-h-[135px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
        priority
      />
    </div>
  );
}
