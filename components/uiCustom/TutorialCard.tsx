'use client';

import Image from 'next/image';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useState } from 'react';
import VideoModal from './VideoModal';
import { Tutorial } from '@/app/(public)/tutorials/page';

interface Props {
  tutorial: Tutorial;
}

export default function TutorialCard({ tutorial }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getVideoId = (url: string) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  const videoId = getVideoId(tutorial.urlYoutube);

  const thumbnailUrl =
    tutorial.thumbnail ||
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
      <div
        className="group block overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Thumbnail / Video Preview */}
        <div className="relative aspect-video bg-white/10 rounded-sm border-2 border-white/20 overflow-hidden">
          {/* Default Thumbnail */}
          {!isHovered && (
            <>
              <Image
                src={thumbnailUrl}
                alt={tutorial.title}
                fill
                className="object-cover group-hover:scale-[1.08] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="bg-white/90 backdrop-blur-sm text-black p-4 rounded-full shadow-lg">
                  <IconPlayerPlay size={42} fill="currentColor" />
                </div>
              </div>
            </>
          )}

          {/* Hover Preview */}
          {isHovered && videoId && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
              title={tutorial.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Card Content */}
        <div className="pt-3 flex items-start gap-3">
          {/* Author Avatar */}
          <Image
            src={tutorial.author.photoURL}
            alt={tutorial.author.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-border"
          />

          {/* Title & Meta */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {tutorial.title} -  {" "}
              <span>{tutorial.category}</span>
            </h3>

            <div className="mt-1 text-sm text-muted-foreground">
              <span>{tutorial.author.name}</span>
            </div>

            
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoId}
        title={tutorial.title}
      />
    </>
  );
}