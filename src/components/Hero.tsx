'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    /* Keep video looping smoothly */
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.playbackRate = 0.85;
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full overflow-hidden flex flex-col"
        >
            {/* ── Background Video ───────────────────── */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster=""
            >
                <source src="/hero/heroback1.webm" type="video/webm" />
                <source src="/hero/heroback2.mp4" type="video/mp4" />
            </video>

            {/* ── Dark fire overlay ──────────────────── */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(10,3,0,0.30) 50%, rgba(0,0,0,0.75) 100%)',
                }}
            />

            {/* ── Ember vignette ────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
                }}
            />

            {/* ── Spacer for fixed nav ──────────────── */}
            <div className="relative z-10 h-[68px]" />

            {/* ── Hero Content ──────────────────────── */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 gap-6">
                {/* Name */}
                <h1
                    className="text-6xl sm:text-8xl font-black tracking-tight leading-none"
                    style={{
                        backgroundImage: 'linear-gradient(180deg, #fff5e0 0%, #ffb347 35%, #ff4500 70%, #cc1a00 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 30px rgba(255,100,0,0.7))',
                    }}
                >
                    JAIJITH KS
                </h1>

                {/* Tagline */}
                <p
                    className="text-xl sm:text-2xl font-light tracking-widest uppercase"
                    style={{ color: 'rgba(255,200,120,0.85)', letterSpacing: '0.3em' }}
                >
                    Develop From Scratch
                </p>

                {/* Bio */}
                <p
                    className="max-w-lg text-base sm:text-lg leading-relaxed"
                    style={{ color: 'rgba(255,220,180,0.70)' }}
                >
                    I am a passionate developer who loves to build cool, blazing‑fast projects.
                </p>

                {/* CTA */}

            </div>

            {/* ── Scroll indicator ──────────────────── */}
            <div className="relative z-10 flex flex-col items-center pb-8 gap-2 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,160,60,0.6)' }}>
                    Scroll
                </span>
                <div
                    className="w-px h-10"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,120,0,0.6), transparent)' }}
                />
            </div>
        </section>
    );
}