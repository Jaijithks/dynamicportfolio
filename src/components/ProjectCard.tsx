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

  // Alternate heights for masonry-like feel
  const isLarge = index % 3 === 0;

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isLarge ? 'row-span-2' : ''}`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden ${isLarge ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 md:group-hover:scale-105 md:group-hover:brightness-75"
        />

        {/* Hover overlay with project info - DESKTOP ONLY */}
        <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex-col justify-end p-6 opacity-0 group-hover:opacity-100">
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 uppercase">
            {project.name}
          </h3>

          <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Action links */}
          <div className="flex items-center gap-4">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={14} />
                <span>Code</span>
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
                style={{ color: 'rgba(212,168,83,0.8)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt size={11} />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Details Footer - MOBILE ONLY */}
      <div className="flex md:hidden flex-col pt-4 pb-6 px-1">
        <h3 className="text-lg font-black text-white tracking-tight mb-1 uppercase">
          {project.name}
        </h3>
        <p className="text-xs text-white/50 leading-relaxed mb-3">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
            >
              <FaGithub size={14} />
              <span>Code</span>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
              style={{ color: 'rgba(212,168,83,0.8)' }}
            >
              <FaExternalLinkAlt size={11} />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
