'use client';

import { useEffect, useRef, useState } from 'react';
import { IoHomeOutline, IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { CiCircleInfo } from 'react-icons/ci';
import { FaProjectDiagram } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { CiBookmark } from 'react-icons/ci';
import { IoIosContact } from 'react-icons/io';

/* ── Section themes ──────────────────────────────────────────────────────
   Each theme defines:
   • logo      – gradient colors for "JK" text logo
   • accent    – active nav button border/glow color
   • activeBg  – active button background tint
   • activeGlow– box-shadow glow for active button
   • activeColor– icon color when active
   • hoverBg   – pill background on hover
   • barBg     – overall nav bar tinted background
   • divider   – thin line between logo and subtitle
   • subtitle  – muted subtitle text color
──────────────────────────────────────────────────────────────────────── */
type NavTheme = {
  logoGradient: string;
  logoGlow: string;
  accent: string;
  activeBg: string;
  activeGlow: string;
  activeColor: string;
  inactiveColor: string;
  barBg: string;
  divider: string;
  subtitle: string;
  tooltipColor: string;
};

const THEMES: Record<string, NavTheme> = {
  hero: {
    // 🔥 Fire
    logoGradient: 'linear-gradient(135deg, #ff9500 0%, #ff4500 50%, #ff1a00 100%)',
    logoGlow: 'drop-shadow(0 0 12px rgba(255,100,0,0.85))',
    accent: 'rgba(255,120,30,0.9)',
    activeBg: 'rgba(255,80,0,0.18)',
    activeGlow: '0 0 14px rgba(255,100,0,0.55), inset 0 0 8px rgba(255,60,0,0.15)',
    activeColor: '#ff7020',
    inactiveColor: 'rgba(255,255,255,0.65)',
    barBg: 'rgba(8,2,0,0.55)',
    divider: 'rgba(255,140,40,0.35)',
    subtitle: 'rgba(255,180,80,0.70)',
    tooltipColor: '#ffb060',
  },
  about: {
    // 🌿 Earth / Nature
    logoGradient: 'linear-gradient(135deg, #a8d878 0%, #6db33f 50%, #2d5a1b 100%)',
    logoGlow: 'drop-shadow(0 0 12px rgba(80,160,30,0.75))',
    accent: 'rgba(100,180,40,0.85)',
    activeBg: 'rgba(60,120,20,0.20)',
    activeGlow: '0 0 14px rgba(80,160,30,0.50), inset 0 0 8px rgba(60,140,20,0.12)',
    activeColor: '#7ecf3a',
    inactiveColor: 'rgba(200,230,180,0.60)',
    barBg: 'rgba(5,12,3,0.55)',
    divider: 'rgba(100,180,40,0.30)',
    subtitle: 'rgba(160,220,90,0.65)',
    tooltipColor: '#a0d860',
  },
  projects: {
    // ❄️ Snow / Frost
    logoGradient: 'linear-gradient(135deg, #e0f8ff 0%, #70d8f8 50%, #0ea5e9 100%)',
    logoGlow: 'drop-shadow(0 0 12px rgba(0,180,240,0.70))',
    accent: 'rgba(0,180,240,0.85)',
    activeBg: 'rgba(0,140,200,0.18)',
    activeGlow: '0 0 14px rgba(0,160,220,0.50), inset 0 0 8px rgba(0,120,200,0.12)',
    activeColor: '#38d0f8',
    inactiveColor: 'rgba(180,230,255,0.60)',
    barBg: 'rgba(0,5,14,0.55)',
    divider: 'rgba(0,180,240,0.28)',
    subtitle: 'rgba(120,210,255,0.65)',
    tooltipColor: '#70d8f8',
  },
  skills: {
    // ⚡ Lightning / Electric
    logoGradient: 'linear-gradient(135deg, #f0e6ff 0%, #c084fc 50%, #6d28d9 100%)',
    logoGlow: 'drop-shadow(0 0 12px rgba(160,60,255,0.80))',
    accent: 'rgba(160,60,255,0.90)',
    activeBg: 'rgba(120,40,220,0.20)',
    activeGlow: '0 0 18px rgba(160,60,255,0.60), inset 0 0 10px rgba(130,30,220,0.18)',
    activeColor: '#c084fc',
    inactiveColor: 'rgba(220,190,255,0.60)',
    barBg: 'rgba(4,1,12,0.55)',
    divider: 'rgba(160,60,255,0.28)',
    subtitle: 'rgba(180,120,255,0.65)',
    tooltipColor: '#c084fc',
  },
  bookme: {
    // 🌬️ Wind / Sky
    logoGradient: 'linear-gradient(135deg, #e8f4ff 0%, #93c5fd 50%, #3b82f6 100%)',
    logoGlow: 'drop-shadow(0 0 12px rgba(100,160,255,0.70))',
    accent: 'rgba(120,180,255,0.85)',
    activeBg: 'rgba(80,140,255,0.16)',
    activeGlow: '0 0 14px rgba(100,160,255,0.50), inset 0 0 8px rgba(80,130,255,0.12)',
    activeColor: '#93c5fd',
    inactiveColor: 'rgba(180,220,255,0.60)',
    barBg: 'rgba(2,6,16,0.55)',
    divider: 'rgba(100,160,255,0.28)',
    subtitle: 'rgba(140,200,255,0.65)',
    tooltipColor: '#93c5fd',
  },
  contact: {
    // 🌌 Space / Galaxy
    logoGradient: 'linear-gradient(135deg, #f0e6ff 0%, #c084fc 35%, #818cf8 65%, #60a5fa 100%)',
    logoGlow: 'drop-shadow(0 0 14px rgba(160,80,255,0.80))',
    accent: 'rgba(160,80,255,0.90)',
    activeBg: 'rgba(130,60,230,0.20)',
    activeGlow: '0 0 18px rgba(160,80,255,0.65), inset 0 0 10px rgba(120,50,220,0.18)',
    activeColor: '#c084fc',
    inactiveColor: 'rgba(220,200,255,0.60)',
    barBg: 'rgba(2,0,10,0.55)',
    divider: 'rgba(160,80,255,0.30)',
    subtitle: 'rgba(190,140,255,0.65)',
    tooltipColor: '#c084fc',
  },
};

const NAV_ITEMS = [
  { icon: IoHomeOutline, label: 'Home',     href: '#hero' },
  { icon: CiCircleInfo, label: 'About',    href: '#about' },
  { icon: FaProjectDiagram, label: 'Projects', href: '#projects' },
  { icon: GiSkills,    label: 'Skills',   href: '#skills' },
  { icon: CiBookmark,  label: 'Book Me',  href: '#bookme' },
  { icon: IoIosContact,label: 'Contact',  href: '#contact' },
];

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'bookme', 'contact'];

export default function ThemedNav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [section, setSection] = useState('hero');
  const [isLocked, setIsLocked] = useState(false);
  const lockedSectionRef = useRef<string | null>(null);

  // When locked: block body scroll and make the active section internally scrollable
  useEffect(() => {
    if (isLocked && lockedSectionRef.current) {
      document.body.style.overflow = 'hidden';

      const sectionEl = document.getElementById(lockedSectionRef.current);
      if (sectionEl) {
        sectionEl.style.height = '100vh';
        sectionEl.style.overflowY = 'auto';
        // Hide scrollbar but keep functionality
        sectionEl.style.scrollbarWidth = 'none'; // Firefox
        // For Webkit (Chrome, Safari), we rely on CSS, but this is a decent inline fallback
      }
    } else {
      document.body.style.overflow = '';

      // Restore all section elements to their natural state
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.height = '';
          el.style.overflowY = '';
          el.style.scrollbarWidth = '';
        }
      });

      lockedSectionRef.current = null;
    }

    return () => {
      document.body.style.overflow = '';
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.height = '';
          el.style.overflowY = '';
          el.style.scrollbarWidth = '';
        }
      });
    };
  }, [isLocked]);

  /* ── Section detection via scroll-position math ──────────────────────
     With end:'+=200%' and 100vh spacers, each section slot = 2vh:
       hero     → scrollY in [0,      2vh)
       about    → scrollY in [2vh,    4vh)
       projects → scrollY in [4vh,    6vh)
       skills   → scrollY in [6vh,    8vh)
       bookme   → scrollY in [8vh,   10vh)
       contact  → scrollY >= 10vh
  ───────────────────────────────────────────────────────────────────── */
  const SLOT = 2; // each section slot = 2 × viewport height

  useEffect(() => {
    const handleScroll = () => {
      // Do not detect section changes if locked, keeping the user locked into the current view
      if (isLocked) return;

      const vh = window.innerHeight;
      const idx = Math.min(
        Math.floor(window.scrollY / (SLOT * vh)),
        SECTION_IDS.length - 1
      );
      setSection(SECTION_IDS[idx]);
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked]);

  const t = THEMES[section] ?? THEMES.hero;

  const toggleLock = () => {
    if (!isLocked) {
      // Snap instantly to the start of the current active section
      const idx = SECTION_IDS.indexOf(section);
      if (idx >= 0) {
        window.scrollTo({
          top: idx * SLOT * window.innerHeight,
          behavior: 'auto',
        });
      }
      lockedSectionRef.current = section;
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  };

  /* ── Nav scrollTo: each section lives at (index × SLOT × vh) ──────── */
  const scrollTo = (href: string) => {
    if (isLocked) return;
    const id = href.replace('#', '');
    const idx = SECTION_IDS.indexOf(id);
    if (idx < 0) return;
    window.scrollTo({ top: idx * SLOT * window.innerHeight, behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 transition-all duration-700"
      style={{
        background: t.barBg,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${t.accent.replace('0.9', '0.15').replace('0.85', '0.15')}`,
        boxShadow: `0 1px 40px rgba(0,0,0,0.45), 0 0 0 0.5px ${t.accent.replace('0.9', '0.08').replace('0.85', '0.08')}`,
      }}
    >
      {/* ── Logo ─────────────────────────────────────── */}
      <div className="flex items-center gap-3 select-none">
        <span
          className="text-3xl font-black tracking-tight transition-all duration-700"
          style={{
            backgroundImage: t.logoGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: t.logoGlow,
          }}
        >
          JK
        </span>
        <div
          className="hidden sm:block w-px h-6 transition-colors duration-700"
          style={{ background: t.divider }}
        />
        <span
          className="hidden sm:block text-xs font-medium tracking-[0.22em] uppercase transition-colors duration-700"
          style={{ color: t.subtitle }}
        >
          Jaijith KS
        </span>
      </div>

      {/* ── Nav Icons ────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href }, i) => {
            const isActive = activeIdx === i;
            return (
              <li key={label}>
                <button
                  onClick={() => scrollTo(href)}
                  disabled={isLocked}
                  title={isLocked ? 'Unlock to navigate' : label}
                  className="group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500"
                  style={{
                    border: isActive
                      ? `1px solid ${t.accent}`
                      : '1px solid rgba(255,255,255,0.10)',
                    background: isActive ? t.activeBg : 'rgba(0,0,0,0.20)',
                    boxShadow: isActive ? t.activeGlow : 'none',
                    color: isActive ? t.activeColor : t.inactiveColor,
                    opacity: isLocked && !isActive ? 0.35 : 1,
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Icon size={18} />

                  {/* Tooltip */}
                  <span
                    className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] font-medium
                               whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                               pointer-events-none px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(0,0,0,0.75)',
                      color: isLocked ? 'rgba(255,255,255,0.5)' : t.tooltipColor,
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {isLocked ? 'Unlock to navigate' : label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Separator line */}
        <div className="w-px h-6 bg-white/10" />

        {/* Lock button */}
        <button
          onClick={toggleLock}
          title={isLocked ? 'Unlock Navigation & Transitions' : 'Lock Navigation & Transitions'}
          className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 cursor-pointer z-10 ${
            isLocked ? 'animate-pulse' : ''
          }`}
          style={{
            border: isLocked
              ? '1px solid rgba(239, 68, 68, 0.8)'
              : '1px solid rgba(16, 185, 129, 0.4)',
            background: isLocked
              ? 'rgba(239, 68, 68, 0.25)'
              : 'rgba(16, 185, 129, 0.1)',
            boxShadow: isLocked
              ? '0 0 15px rgba(239, 68, 68, 0.6), inset 0 0 8px rgba(239, 68, 68, 0.2)'
              : '0 0 8px rgba(16, 185, 129, 0.2)',
            color: isLocked ? '#f87171' : '#34d399',
          }}
        >
          {isLocked ? <IoLockClosedOutline size={18} /> : <IoLockOpenOutline size={18} />}

          {/* Pulsating outer ring when locked */}
          {isLocked && (
            <span className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-75 pointer-events-none" />
          )}

          {/* Tooltip */}
          <span
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[10px] font-semibold
                       whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                       pointer-events-none px-2 py-0.5 rounded text-white"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(6px)',
              border: `1px solid ${isLocked ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            }}
          >
            {isLocked ? 'Locked' : 'Lock Screen'}
          </span>
        </button>
      </div>
    </nav>
  );
}
