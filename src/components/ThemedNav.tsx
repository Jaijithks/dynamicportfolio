'use client';

import { useEffect, useRef, useState } from 'react';
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Works',    href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Book Me',  href: '#bookme' },
  { label: 'Contact',  href: '#contact' },
];

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'bookme', 'contact'];

export default function ThemedNav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [section, setSection] = useState('hero');
  const [isLocked, setIsLocked] = useState(false);
  const lockedSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (isLocked && lockedSectionRef.current) {
      document.body.style.overflow = 'hidden';

      const sectionEl = document.getElementById(lockedSectionRef.current);
      if (sectionEl) {
        sectionEl.style.height = '100vh';
        sectionEl.style.overflowY = 'auto';
        sectionEl.style.scrollbarWidth = 'none';
      }
    } else {
      document.body.style.overflow = '';

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

  const getSectionTop = (id: string) => {
    if (typeof window === 'undefined') return 0;

    const triggers = ScrollTrigger.getAll();
    const trigger = triggers.find((st) => st.trigger && st.trigger.id === id);
    if (trigger) return trigger.start;

    const el = document.getElementById(id);
    if (el) {
      const spacer = el.closest('.pin-spacer') || el;
      return window.scrollY + spacer.getBoundingClientRect().top;
    }
    return 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isLocked) return;
      const scrollY = window.scrollY;
      let currentIdx = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const top = getSectionTop(SECTION_IDS[i]);
        if (scrollY >= top - 10) currentIdx = i;
      }
      setSection(SECTION_IDS[currentIdx]);
      setActiveIdx(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLocked]);

  const toggleLock = () => {
    if (!isLocked) {
      const targetTop = getSectionTop(section);
      window.scrollTo({ top: targetTop, behavior: 'auto' });
      lockedSectionRef.current = section;
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  };

  const scrollTo = (href: string) => {
    if (isLocked) return;
    const id = href.replace('#', '');
    const targetTop = getSectionTop(id);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-5 md:py-6 transition-all duration-500"
      style={{
        background: 'rgba(5,5,5,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Logo — initials like inspiration ────── */}
      <button
        onClick={() => scrollTo('#hero')}
        className="text-lg md:text-xl font-black tracking-widest text-white select-none cursor-pointer hover:opacity-70 transition-opacity"
      >
        J K
      </button>

      {/* ── Nav Links — text-only, uppercase ──── */}
      <div className="flex items-center gap-6 md:gap-10">
        <ul className="hidden sm:flex items-center gap-6 md:gap-10">
          {NAV_ITEMS.map(({ label, href }, i) => {
            // Map nav index: About=1, Works=2, Skills=3, BookMe=4, Contact=5
            const isActive = activeIdx === i + 1;
            return (
              <li key={label}>
                <button
                  onClick={() => scrollTo(href)}
                  disabled={isLocked}
                  className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    opacity: isLocked && !isActive ? 0.2 : 1,
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                  }}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Lock button — minimal */}
        <button
          onClick={toggleLock}
          title={isLocked ? 'Unlock' : 'Lock Screen'}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
            isLocked ? 'animate-pulse' : ''
          }`}
          style={{
            border: isLocked ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.08)',
            color: isLocked ? '#f87171' : 'rgba(255,255,255,0.3)',
          }}
        >
          {isLocked ? <IoLockClosedOutline size={14} /> : <IoLockOpenOutline size={14} />}
        </button>
      </div>
    </nav>
  );
}
