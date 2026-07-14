'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const els = sectionRef.current?.querySelectorAll('.reveal');
        if (!els) return;
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        els.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between"
            style={{ background: '#050505' }}
        >
            {/* ── Hero Content — left-aligned, massive ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col justify-center flex-1 pt-24">
                {/* Overline */}
                <p
                    className="reveal text-[10px] md:text-xs font-medium tracking-[0.35em] uppercase mb-6"
                    style={{ color: 'rgba(212,168,83,0.7)' }}
                >
                    BASED IN KERALA, INDIA
                </p>

                {/* Name — massive, left-aligned */}
                <h1 className="reveal reveal-delay-1">
                    <span
                        className="block text-[clamp(4rem,12vw,11rem)] font-black tracking-tighter leading-[0.85] text-white"
                    >
                        JAIJITH
                    </span>
                    <span
                        className="block text-[clamp(4rem,12vw,11rem)] font-black tracking-tighter leading-[0.85] text-stroke"
                    >
                        KS
                    </span>
                </h1>

                {/* Role tags */}
                <div className="reveal reveal-delay-2 flex items-center gap-3 mt-8">
                    <span
                        className="text-xs md:text-sm font-light tracking-[0.25em] uppercase italic"
                        style={{ color: 'rgba(212,168,83,0.6)' }}
                    >
                        Developer
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                    <span
                        className="text-xs md:text-sm font-light tracking-[0.25em] uppercase italic"
                        style={{ color: 'rgba(212,168,83,0.6)' }}
                    >
                        Full Stack
                    </span>
                </div>
            </div>

            {/* ── Scroll indicator — right side ────────── */}
            <div className="reveal reveal-delay-3 absolute right-8 md:right-16 bottom-16 flex flex-col items-center gap-3">
                <div
                    className="w-px h-12"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}
                />
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Scroll
                </span>
            </div>

            {/* ── Bottom edge glow — subtle blue like inspiration ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'rgba(255,255,255,0.04)' }}
            />
        </section>
    );
}