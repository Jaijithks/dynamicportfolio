'use client';
import { useRef, useEffect } from 'react';

/* Wind streak canvas — fast light wisps */
function WindCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Wisp {
      x: number; y: number; len: number;
      speed: number; opacity: number; width: number;
    }

    let wisps: Wisp[] = [];

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      wisps = Array.from({ length: 45 }, () => spawnWisp(true));
    };

    const spawnWisp = (init = false): Wisp => ({
      x: init ? Math.random() * w : -300,
      y: Math.random() * h,
      len: Math.random() * 160 + 60,
      speed: Math.random() * 4 + 1.5,
      opacity: Math.random() * 0.18 + 0.04,
      width: Math.random() * 1.5 + 0.3,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      wisps.forEach((wisp, i) => {
        wisp.x += wisp.speed;
        if (wisp.x > w + 300) wisps[i] = spawnWisp();

        const grad = ctx.createLinearGradient(wisp.x, wisp.y, wisp.x + wisp.len, wisp.y);
        grad.addColorStop(0, `rgba(200,230,255,0)`);
        grad.addColorStop(0.3, `rgba(200,230,255,${wisp.opacity})`);
        grad.addColorStop(1, `rgba(200,230,255,0)`);

        ctx.beginPath();
        ctx.moveTo(wisp.x, wisp.y);
        ctx.lineTo(wisp.x + wisp.len, wisp.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = wisp.width;
        ctx.stroke();
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

export default function Bookme() {
  return (
    <section
      id="bookme"
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
        <source src="/bookme/bookeme.webm" type="video/webm" />
        <source src="/bookme/bookme1.mp4" type="video/mp4" />
      </video>

      {/* Dark wind overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(5,16,26,0.80) 0%, rgba(8,24,40,0.74) 40%, rgba(6,15,28,0.77) 70%, rgba(4,12,22,0.82) 100%)',
        }}
      />

      {/* Airy sky glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 40%, rgba(100,180,255,0.10) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 20% 70%, rgba(60,140,220,0.07) 0%, transparent 60%)' }} />

      {/* Wind wisps canvas */}
      <WindCanvas />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(120,180,255,0.35), transparent)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-10 py-20 text-center">
        <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
          style={{ color: 'rgba(140,200,255,0.6)' }}>
          🌬️ Book Me
        </span>
        <h2
          className="text-5xl sm:text-6xl font-black mb-6 leading-tight"
          style={{
            backgroundImage: 'linear-gradient(135deg, #e8f4ff 0%, #93c5fd 40%, #60a5fa 70%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(100,160,255,0.35))',
          }}
        >
          Let's Build<br />Something.
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(160,210,255,0.65)' }}>
          Whether you have a project in mind, need a collaborator, or just want to chat about ideas —
          I'm available for freelance work, consulting, and full-time opportunities.
        </p>

        {/* Booking options */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '🗓️', title: '30-min Call',   desc: 'Quick intro or project scoping' },
            { icon: '💼', title: 'Freelance',      desc: 'Short or long term contracts' },
            { icon: '🤝', title: 'Full-time',      desc: 'Open to the right opportunity' },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-5 text-left transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: 'rgba(10,30,60,0.5)',
                border: '1px solid rgba(100,160,255,0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
            >
              <span className="text-2xl block mb-2">{icon}</span>
              <h3 className="font-semibold text-sm mb-1" style={{ color: '#93c5fd' }}>{title}</h3>
              <p className="text-xs" style={{ color: 'rgba(140,190,240,0.55)' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <a
          href="mailto:jaijithks@email.com"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base
                     transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(99,102,241,0.3))',
            border: '1px solid rgba(100,160,255,0.4)',
            boxShadow: '0 0 30px rgba(80,130,255,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
            color: '#bfdbfe',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span>📩</span> Get In Touch
        </a>
      </div>
    </section>
  );
}