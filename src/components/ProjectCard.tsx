'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

type Project = {
  _id: string;
  name: string;
  image: string;
  description: string;
  live_url: string;
  github_url: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`sticky top-0 snap-start min-h-[480px] lg:min-h-[380px] flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-br from-sky-950/90 to-slate-950/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-sky-400/30 hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] transition-all duration-700 ease-out relative overflow-hidden group ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Corner edge glows matching the Water/Sky theme */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)' }} />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)' }} />

      {/* Glare glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/4 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Left side: Image container */}
      <div className="w-full lg:w-[45%] shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)] relative aspect-video animate-float-slow">
        <Image
          src={project.image}
          alt={project.name}
          fill
          loading="lazy"
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-sky-950/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Right side: Content */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between h-full text-left">
        <div>
          {/* Card glow effect */}
          <div
            className="absolute -top-12 -left-12 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-700"
          />

          <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(14,165,233,0.25)]">
            {project.name}
          </h3>
          
          <p className="text-sm text-sky-200/60 leading-relaxed mb-6 font-light line-clamp-3 lg:line-clamp-4">
            {project.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-auto">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs text-white font-semibold transition-all duration-300 hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            >
              <FaGithub size={14} />
              <span>GitHub</span>
            </a>
          )}

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-400/30 bg-sky-950/20 text-xs text-sky-200 font-semibold transition-all duration-300 hover:bg-sky-950/40 hover:border-sky-400/50 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(14,165,233,0.15)]"
            >
              <FaExternalLinkAlt size={12} />
              <span>Live Demo</span>
              <span className="text-[10px] transform group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
