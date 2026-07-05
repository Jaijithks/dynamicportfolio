'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type AboutData = {
  headline: string;
  status: string;
  projectNo: string;
  profile_url: string;
};

export default function AboutClient({ data }: { data: AboutData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative z-10 max-w-5xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Left Column: Headline & Status */}
      <div className="text-left flex flex-col items-start justify-center">
        <span
          className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
          style={{ color: 'rgba(120,180,60,0.7)' }}
        >
          🌍 About
        </span>
        
        <h2
          className="text-5xl sm:text-6xl font-black leading-tight mb-6"
          style={{
            backgroundImage: 'linear-gradient(135deg, #a8d878 0%, #6db33f 40%, #4a7c2f 80%, #2d5a1b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(80,160,30,0.45))',
          }}
        >
          {data.headline}
        </h2>

        {/* Muted green readable status paragraph */}
        <p 
          className="text-sm sm:text-base leading-relaxed max-w-xl font-light" 
          style={{ color: 'rgba(180,220,140,0.75)' }}
        >
          {data.status}
        </p>
      </div>

      {/* Right Column: Portrait & Projects Completed Card */}
      <div className="flex flex-col items-center justify-center">
        {/* Large circular portrait with earth-colored glow & soft float animation */}
        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border border-emerald-500/20 bg-emerald-950/20 shadow-[0_0_35px_rgba(80,160,30,0.22)] group hover:scale-[1.03] hover:border-emerald-400/40 hover:shadow-[0_0_45px_rgba(80,160,30,0.35)] transition-all duration-700 ease-out select-none flex items-center justify-center animate-float-slow">
          <Image
            src={data.profile_url}
            alt="Jaijith"
            width={288}
            height={288}
            priority
            unoptimized
            className="object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle reflection glare overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          {/* Soft overlay */}
          <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Projects Completed Glass Card */}
        <div className="w-full max-w-xs mt-8 rounded-2xl px-6 py-5 text-center transition-all duration-500 hover:scale-[1.02] border border-emerald-500/15 bg-emerald-950/15 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] relative overflow-hidden group hover:border-emerald-400/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.45),_0_0_20px_rgba(80,160,30,0.15)]">
          {/* Top border glowing highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(142,216,120,0.5), transparent)' }} />
          
          <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 font-semibold mb-1">
            PROJECTS COMPLETED
          </p>
          <p className="text-3xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(110,210,90,0.4)]">
            {data.projectNo}+
          </p>
        </div>
      </div>
    </div>
  );
}
