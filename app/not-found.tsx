'use client';

import Lottie from 'lottie-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';
import lottie404 from '@/public/assets/lottie/not-found.json';

const style = {
  height: 250,
  width: 450,
};

export default function NotFound() {
  return (
    <div className="bg-background  flex h-screen w-full flex-col items-center justify-center p-8  ">


      <div className=" flex max-w-md flex-col items-center justify-center gap-6 text-center">
        {/* Lottie Animation */}
        <Lottie 
          animationData={lottie404} 
          style={style}
          loop={true}
          className="opacity-90 "
        />

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-sm text-muted-foreground">
            {"The page you're looking for doesn't exist or has been moved."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button asChild variant="default" size="sm" className="gap-1.5">
            <Link href="/dashboard" className="flex items-center gap-1.5" >
              <IconHome size={14} />
              Dashboard
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5" 
            // onClick={() => window.history.back()}
          >
            <Link href="/" className="flex items-center gap-1.5">
             <IconArrowLeft size={14} />
             Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}