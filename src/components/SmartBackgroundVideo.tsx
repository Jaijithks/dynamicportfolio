'use client';

import { useEffect, useRef } from 'react';

interface SmartBackgroundVideoProps {
  sources: { src: string; type: string }[];
  playbackRate?: number;
}

export default function SmartBackgroundVideo({ sources, playbackRate = 1.0 }: SmartBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = playbackRate;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(v);

    return () => {
      observer.disconnect();
    };
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none -z-20"
      muted
      loop
      playsInline
      preload="none"
    >
      {sources.map((source, i) => (
        <source key={i} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
