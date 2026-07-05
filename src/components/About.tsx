'use client';
import { useRef, useEffect } from 'react';

/* Floating leaf / earth-particle canvas */
function EarthParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Particle {
      x: number; y: number; size: number;
      speedY: number; speedX: number;
      opacity: number; color: string; angle: number; spin: number;
    }

    const COLORS = ['#4a7c59','#6b4c2a','#3d6b47','#8a6534','#2d5a3d','#a07850'];
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: h + 20,
      size: Math.random() * 6 + 2,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
    });

    // Pre-seed
    particles = Array.from({ length: 60 }, () => {
      const p = spawn();
      p.y = Math.random() * h;
      return p;
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;
        if (p.y < -20) particles[i] = spawn();

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        // Draw a small diamond/leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.6, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background Video ─────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/about/aboutback.webm" type="video/webm" />
        <source src="/about/abouback2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to preserve readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(10,26,8,0.78) 0%, rgba(15,28,10,0.72) 30%, rgba(26,16,5,0.75) 60%, rgba(13,18,8,0.80) 100%)',
        }}
      />

      {/* Earthy radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 60%, rgba(60,100,30,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 80% 30%, rgba(100,70,20,0.12) 0%, transparent 60%)',
        }}
      />

      {/* Floating particles */}
      <EarthParticles />

      {/* Horizontal stone-line divider at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(80,120,40,0.5), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-16 items-center">

        {/* Left — Section label + heading */}
        <div>
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
              filter: 'drop-shadow(0 0 20px rgba(80,160,30,0.4))',
            }}
          >
            Rooted in<br />Craft.
          </h2>

          <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(180,220,140,0.75)' }}>
            I'm <strong style={{ color: '#8ec96e' }}>Jaijith KS</strong> — a full-stack developer who
            believes great software grows organically, built layer by layer from solid ground up. Like
            the earth beneath your feet, I value stability, depth, and things that last.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(160,200,120,0.60)' }}>
            Passionate about turning ideas into reality through clean architecture, thoughtful design,
            and an obsession with developer experience.
          </p>
        </div>

        {/* Right — Stat / skill cards */}
        <div className="flex flex-col gap-5">
          {[
            { label: 'Experience',  value: '3+ Years',     icon: '🌱' },
            { label: 'Projects Built', value: '20+',       icon: '🪨' },
            { label: 'Speciality',  value: 'Full Stack',   icon: '🌲' },
            { label: 'Philosophy',  value: 'Grow, not rush', icon: '🌍' },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(30,50,15,0.5)',
                border: '1px solid rgba(80,140,40,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(120,180,60,0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(120,180,60,0.6)' }}>{label}</p>
                <p className="text-lg font-semibold" style={{ color: '#b8e090' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(80,120,40,0.4), transparent)' }}
      />
    </section>
  );
}