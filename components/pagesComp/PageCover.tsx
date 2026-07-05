import bgImage from '@/public/assets/background/war.webp'
import Image, { StaticImageData } from 'next/image';

export default function PageCover({ title, description, backgroundImage, ...props }: { title: string; description: string; backgroundImage?: string | StaticImageData } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="relative w-full h-[35lvh] md:h-[90lvh] 2xl:h-[40lvh] overflow-hidden rounded-lg text-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      {...props}
    >
      <div className="absolute inset-0 -z-10 brightness-75">
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/70" />
        <Image
          src={backgroundImage ? backgroundImage : bgImage}
          alt="Background"
          fill
          className="object-cover brightness-75 -scale-x-100"
        />
      </div>


      {/* Content */}
      <div className="max-w-7xl mx-auto w-[95%] relative z-10 flex h-full flex-col items-center md:items-start justify-center md:justify-center gap-4 text-center md:text-start">
        <h1 className="text-4xl font-bold md:tracking-tighter text-white lg:text-7xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg text-gray-300">
          {description} 
        </p>
      </div>


    </div>
  );
}