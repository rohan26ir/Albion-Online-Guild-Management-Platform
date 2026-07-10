'use client';

import Lottie from "lottie-react";
import underdev from '@/public/assets/lottie/underdevelopment.json';
import { IconTools, IconRocket } from "@tabler/icons-react";
import Link from "next/link";

const style = {
  height: 200,
  width: 350,
};

interface DevProp {
  dev?: string;
  devurl?: string;
  progress?: number;
  message?: string;
}

export default function CommingSoon({ dev, devurl, progress, message }: DevProp) {
  return(
    <div className="w-full min-h-[50lvh] flex items-center justify-center p-4">
      <div className=" w-full rounded-2xl border border-border bg-gradient-to-br from-background to-accent/5 p-8 text-center">
        {/* Lottie Animation */}
        <div className="flex justify-center">
          <Lottie
            animationData={underdev}
            style={style}
            loop={true}
            className="opacity-90"
          />
        </div>

        {/* Title */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <IconTools size={18} className="text-primary" />
            <h3 className="text-xl font-bold text-foreground">
              Comming Soon!
            </h3>
            <IconRocket size={18} className="text-primary" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {message || "We're working on it!" }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-lg mx-auto mt-6 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Relese Date</span>
            <span>{progress}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-accent">
            <div 
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Developer Info */}
        <div className="mt-6 pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Developed by: <span className="font-semibold text-foreground">
              <Link href={devurl || "https://meetrohan.netlify.app/"} >
               {dev || "Rohan"}
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}