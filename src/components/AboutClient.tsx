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
      className={`relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-32 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
    >
      {/* ── Marquee ticker ─────────────────────────── */}
      <div className="overflow-hidden mb-16 border-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="marquee-track py-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 shrink-0">
              {['FULL STACK', 'REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'MONGODB', 'TAILWIND CSS', 'UI/UX'].map((item) => (
                <span
                  key={`${i}-${item}`}
                  className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase whitespace-nowrap"
                  style={{ color: 'rgba(255,255,255,0.12)' }}
                >
                  {item}
                  <span className="ml-12" style={{ color: 'rgba(212,168,83,0.25)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main layout: Image left, Text right ────── */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left: Portrait */}
        <div className="relative">
          <div className="relative w-full aspect-[3/4] max-w-lg overflow-hidden">
            <Image
              src={data.profile_url}
              alt="Jaijith"
              fill
              priority
              unoptimized
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Subtle frame offset border like the inspiration */}
          <div
            className="absolute top-3 left-3 right-[-12px] bottom-[-12px] border pointer-events-none"
            style={{ borderColor: 'rgba(212,168,83,0.12)' }}
          />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center">
          {/* Section label with line */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: 'rgba(212,168,83,0.5)' }} />
            <span
              className="text-[10px] font-medium tracking-[0.4em] uppercase"
              style={{ color: 'rgba(212,168,83,0.7)' }}
            >
              ABOUT
            </span>
          </div>

          {/* Bold headline with italic gold word */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] tracking-tight mb-8">
            <span className="text-white">CODE </span>
            <span className="text-white">THAT </span>
            <span
              className="italic font-black"
              style={{ color: '#d4a853' }}
            >
              SPEAKS
            </span>
          </h2>

          {/* Status text */}
          <p
            className="text-sm md:text-base leading-[1.8] mb-6 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {data.headline}
          </p>
          <p
            className="text-sm md:text-base leading-[1.8] mb-12 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {data.status}
          </p>

          {/* Stats row with divider */}
          <div className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-start gap-16">
              <div>
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{data.projectNo}+</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  PROJECTS
                </p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight">1</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  YEARS ACTIVE
                </p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight">∞</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  LINES WRITTEN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
