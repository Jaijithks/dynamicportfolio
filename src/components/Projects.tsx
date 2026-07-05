'use client';
import { useRef, useEffect } from 'react';

/* Ripple wave canvas at the bottom */
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      const w = canvas.width  = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.018;

      for (let layer = 3; layer >= 1; layer--) {
        const amp = 18 + layer * 8;
        const freq = 0.008 - layer * 0.001;
        const speed = t * (0.6 + layer * 0.2);
        const yBase = h * (0.55 + layer * 0.08);
        const alpha = 0.06 + layer * 0.04;
        const colors = [
          `rgba(0,150,200,${alpha})`,
          `rgba(0,100,180,${alpha})`,
          `rgba(0,60,140,${alpha})`,
        ];

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 3) {
          const y = yBase + Math.sin(x * freq + speed) * amp
                           + Math.sin(x * freq * 1.7 + speed * 0.8) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = colors[layer - 1];
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const PLACEHOLDER_PROJECTS = [
  { title: 'Ocean API',       tag: 'Full Stack', desc: 'A RESTful API service with real-time streaming data and WebSocket support.',       color: '#0ea5e9' },
  { title: 'Wave Dashboard',  tag: 'Frontend',   desc: 'Analytics dashboard with fluid chart animations and live data visualization.',      color: '#06b6d4' },
  { title: 'Deep Storage',    tag: 'Backend',    desc: 'Distributed file storage system built for scale with zero-downtime deploys.',       color: '#0284c7' },
  { title: 'Tide UI Kit',     tag: 'Design',     desc: 'Component library with water-inspired motion design and accessibility focus.',      color: '#0891b2' },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background Video ─────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/project/projectback1.webm" type="video/webm" />
        <source src="/project/projectback.mp4" type="video/mp4" />
      </video>

      {/* Dark frost overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(2,13,24,0.80) 0%, rgba(4,28,50,0.72) 40%, rgba(3,21,37,0.75) 70%, rgba(1,12,24,0.82) 100%)',
        }}
      />

      {/* Deep water glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,80,160,0.25) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 30% at 20% 30%, rgba(0,140,200,0.10) 0%, transparent 60%)' }} />

      {/* Animated wave canvas */}
      <WaveCanvas />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,150,220,0.4), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-10 py-20 w-full flex flex-col">
        <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
          style={{ color: 'rgba(0,180,240,0.7)' }}>
          💧 Projects
        </span>
        <h2
          className="text-5xl sm:text-6xl font-black mb-3"
          style={{
            backgroundImage: 'linear-gradient(135deg, #e0f7ff 0%, #38bdf8 40%, #0ea5e9 70%, #0369a1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(0,150,220,0.4))',
          }}
        >
          Things I've<br />Built.
        </h2>
        <p className="mb-12 max-w-xl text-base" style={{ color: 'rgba(120,200,240,0.65)' }}>
          A collection of projects built with depth, attention to flow, and clean architecture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PLACEHOLDER_PROJECTS.map(({ title, tag, desc, color }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-6 transition-all duration-400 hover:scale-[1.02] cursor-pointer overflow-hidden"
              style={{
                background: 'rgba(0,30,60,0.55)',
                border: `1px solid rgba(0,150,220,0.18)`,
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}18 0%, transparent 70%)` }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
                style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
              >
                {tag}
              </span>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#cae8f8' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(140,200,230,0.65)' }}>{desc}</p>

              <div className="mt-5 flex items-center gap-2" style={{ color }}>
                <span className="text-sm font-medium">View project</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}