'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SplashCursor = dynamic(() => import('./SplashCursor'), { ssr: false });

/* ── Per-section cursor palettes ─────────────────────────────────────────
   hero     → fire      (orange-red)
   about    → earth     (green-brown)
   projects → frost     (ice-blue / cyan)
   skills   → electric  (violet / neon)
   bookme   → wind      (sky-blue / silver)
   contact  → galaxy    (deep purple / indigo)
──────────────────────────────────────────────────────────────────────────*/
const SECTION_THEMES: Record<
  string,
  {
    COLOR: string;
    BACK_COLOR: { r: number; g: number; b: number };
    CURL: number;
    SPLAT_RADIUS: number;
    SPLAT_FORCE: number;
    DENSITY_DISSIPATION: number;
    VELOCITY_DISSIPATION: number;
  }
> = {
  hero: {
    COLOR: '#ff4500',
    BACK_COLOR: { r: 0.08, g: 0.01, b: 0.0 },
    CURL: 6,
    SPLAT_RADIUS: 0.22,
    SPLAT_FORCE: 6000,
    DENSITY_DISSIPATION: 2.8,
    VELOCITY_DISSIPATION: 1.6,
  },
  about: {
    // Earth / nature — deep mossy greens
    COLOR: '#4caf50',
    BACK_COLOR: { r: 0.02, g: 0.06, b: 0.01 },
    CURL: 4,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 4500,
    DENSITY_DISSIPATION: 3.2,
    VELOCITY_DISSIPATION: 2.0,
  },
  projects: {
    // Snow / frost — icy white-cyan
    COLOR: '#a0e8ff',
    BACK_COLOR: { r: 0.01, g: 0.04, b: 0.08 },
    CURL: 2,
    SPLAT_RADIUS: 0.28,
    SPLAT_FORCE: 3800,
    DENSITY_DISSIPATION: 4.0,
    VELOCITY_DISSIPATION: 2.5,
  },
  skills: {
    // Lightning / electric — vivid violet
    COLOR: '#c0a0ff',
    BACK_COLOR: { r: 0.04, g: 0.01, b: 0.1 },
    CURL: 10,
    SPLAT_RADIUS: 0.18,
    SPLAT_FORCE: 7500,
    DENSITY_DISSIPATION: 2.2,
    VELOCITY_DISSIPATION: 1.2,
  },
  bookme: {
    // Wind — light silvery sky blue
    COLOR: '#b0d8ff',
    BACK_COLOR: { r: 0.01, g: 0.04, b: 0.09 },
    CURL: 5,
    SPLAT_RADIUS: 0.30,
    SPLAT_FORCE: 5000,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2.2,
  },
  contact: {
    // Space / galaxy — deep indigo-violet
    COLOR: '#9b59ff',
    BACK_COLOR: { r: 0.03, g: 0.0, b: 0.08 },
    CURL: 7,
    SPLAT_RADIUS: 0.20,
    SPLAT_FORCE: 5500,
    DENSITY_DISSIPATION: 2.5,
    VELOCITY_DISSIPATION: 1.5,
  },
};

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'bookme', 'contact'];

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SplashCursorWrapper() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const getSectionTop = (id: string) => {
      if (typeof window === 'undefined') return 0;
      
      const triggers = ScrollTrigger.getAll();
      const trigger = triggers.find((st) => st.trigger && st.trigger.id === id);
      if (trigger) {
        return trigger.start;
      }
      
      const el = document.getElementById(id);
      if (el) {
        const spacer = el.closest('.pin-spacer') || el;
        return window.scrollY + spacer.getBoundingClientRect().top;
      }
      return 0;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentIdx = 0;
      
      for (let i = 0; i < SECTIONS.length; i++) {
        const top = getSectionTop(SECTIONS[i]);
        if (scrollY >= top - window.innerHeight * 0.3) {
          currentIdx = i;
        }
      }
      
      setActiveSection(SECTIONS[currentIdx]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = SECTION_THEMES[activeSection] ?? SECTION_THEMES.hero;

  return (
    <SplashCursor
      key={activeSection}
      RAINBOW_MODE={false}
      COLOR={theme.COLOR}
      BACK_COLOR={theme.BACK_COLOR}
      CURL={theme.CURL}
      SPLAT_RADIUS={theme.SPLAT_RADIUS}
      SPLAT_FORCE={theme.SPLAT_FORCE}
      DENSITY_DISSIPATION={theme.DENSITY_DISSIPATION}
      VELOCITY_DISSIPATION={theme.VELOCITY_DISSIPATION}
      TRANSPARENT={true}
      SIM_RESOLUTION={64}
      DYE_RESOLUTION={512}
      PRESSURE_ITERATIONS={10}
    />
  );
}

