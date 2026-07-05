'use client';
import { useRef, useEffect, useState } from 'react';

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
  const [service, setService] = useState('');
  const [expectedTime, setExpectedTime] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const SERVICES = [
    'Portfolio Website',
    'Full Stack Web Application',
    'Frontend Development',
    'Backend Development',
    'UI Development',
    'API Development',
    'Bug Fixing',
    'Consultation',
    'Other',
  ];

  const TIMELINES = [
    'ASAP',
    'Within 1 Week',
    'Within 2 Weeks',
    'Within 1 Month',
    'Flexible',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !expectedTime || !meetingTime || !name || !email) {
      setToast({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const response = await fetch('http://localhost:4500/api/book/bookme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          Expected_time: expectedTime,
          meeting_time: meetingTime,
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      setToast({ message: 'Booking Request Sent Successfully', type: 'success' });
      // Reset form
      setService('');
      setExpectedTime('');
      setMeetingTime('');
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <section
      id="bookme"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-24 z-0"
    >
      {/* ── Background Video ─────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none -z-20"
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
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(160deg, rgba(5,16,26,0.80) 0%, rgba(8,24,40,0.74) 40%, rgba(6,15,28,0.77) 70%, rgba(4,12,22,0.82) 100%)',
        }}
      />

      {/* Airy sky glows */}
      <div className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 40%, rgba(100,180,255,0.10) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 20% 70%, rgba(60,140,220,0.07) 0%, transparent 60%)' }} />

      {/* Wind wisps canvas */}
      <div className="absolute inset-0 -z-10">
        <WindCanvas />
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px -z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(120,180,255,0.35), transparent)' }} />

      <div className="relative z-10 w-full max-w-xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center">
        {/* Booking Form Card — High Transparency Glassmorphism */}
        <div className="relative bg-gradient-to-br from-slate-950/30 to-slate-900/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Accent border highlights matching the Wind theme */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(147,197,253,0.5), transparent)' }} />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }} />

          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-sky-400 block mb-2">
              BOOK A CONSULTATION
            </span>
            <h2
              className="text-3xl font-black text-white mb-2 tracking-tight"
              style={{ filter: 'drop-shadow(0 0 10px rgba(147,197,253,0.3))' }}
            >
              Ready to collaborate?
            </h2>
            <p className="text-xs text-blue-200/60 leading-relaxed">
              Let&apos;s discuss your project and find the best solution.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Service Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sky-300">Service *</label>
              <div className="relative w-full">
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-slate-950/30 text-xs text-white focus:outline-none focus:border-sky-400/40 focus:bg-slate-950/50 transition duration-300 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Service ▼</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-slate-950 text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sky-400/50 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Expected Timeline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sky-300">Expected Timeline *</label>
              <div className="relative w-full">
                <select
                  required
                  value={expectedTime}
                  onChange={(e) => setExpectedTime(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-slate-950/30 text-xs text-white focus:outline-none focus:border-sky-400/40 focus:bg-slate-950/50 transition duration-300 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Timeline ▼</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} className="bg-slate-950 text-white">
                      {t}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sky-400/50 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Preferred Meeting Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sky-300">Preferred Meeting Time *</label>
              <input
                type="datetime-local"
                required
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-slate-950/30 text-xs text-white focus:outline-none focus:border-sky-400/40 focus:bg-slate-950/50 transition duration-300 cursor-pointer"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sky-300">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-slate-950/30 text-xs text-white placeholder-white/20 focus:outline-none focus:border-sky-400/40 focus:bg-slate-950/50 transition duration-300"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sky-300">Email Address *</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-white/5 bg-slate-950/30 text-xs text-white placeholder-white/20 focus:outline-none focus:border-sky-400/40 focus:bg-slate-950/50 transition duration-300"
              />
            </div>

            {/* Submit Button — Wind Sky theme */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-blue-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer mt-6"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(147,197,253,0.25))',
                border: '1px solid rgba(147,197,253,0.35)',
                boxShadow: '0 4px 20px rgba(147,197,253,0.15)',
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Book Consultation</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Premium Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-[150] flex items-center gap-3 px-5 py-4 rounded-xl border border-white/10 bg-slate-950/90 backdrop-blur-xl text-xs shadow-[0_10px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`w-2 h-2 rounded-full ${
              toast.type === 'success'
                ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]'
                : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
            }`}
          />
          <span className="font-medium text-white">{toast.message}</span>
        </div>
      )}
    </section>
  );
}