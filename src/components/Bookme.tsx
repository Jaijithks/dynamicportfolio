'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Bookme() {
  const [service, setService] = useState('');
  const [expectedTime, setExpectedTime] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://my-api-6pmy.onrender.com/api/book/bookme', {
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

      toast.success("Booked! I'll get back to you soon.");
      setService('');
      setExpectedTime('');
      setMeetingTime('');
      setName('');
      setEmail('');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-0 py-4 bg-transparent text-sm text-white border-b focus:outline-none transition-colors duration-300 placeholder-white/15 focus:border-[rgba(212,168,83,0.4)]";

  return (
    <section
      id="bookme"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: '#050505' }}
    >
      {/* ── Top divider ────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Heading */}
          <div>
            {/* Section label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px" style={{ background: 'rgba(212,168,83,0.5)' }} />
              <span
                className="text-[10px] font-medium tracking-[0.4em] uppercase"
                style={{ color: 'rgba(212,168,83,0.7)' }}
              >
                BOOK ME
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tight mb-8">
              <span className="text-white">LET&apos;S </span>
              <span className="italic" style={{ color: '#d4a853' }}>WORK</span>
              <br />
              <span className="text-white">TOGETHER</span>
            </h2>

            <p className="text-sm leading-[1.8] max-w-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Ready to bring your project to life? Fill out the form and I&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-1">
              {/* Service Select */}
              <div className="relative">
                <label className="text-[9px] font-medium tracking-[0.3em] uppercase block mb-1" style={{ color: 'rgba(212,168,83,0.5)' }}>
                  SERVICE
                </label>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-[#0a0a0a] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div className="relative">
                <label className="text-[9px] font-medium tracking-[0.3em] uppercase block mb-1 pt-4" style={{ color: 'rgba(212,168,83,0.5)' }}>
                  TIMELINE
                </label>
                <select
                  required
                  value={expectedTime}
                  onChange={(e) => setExpectedTime(e.target.value)}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <option value="" disabled>Select timeline</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meeting Time */}
              <div>
                <label className="text-[9px] font-medium tracking-[0.3em] uppercase block mb-1 pt-4" style={{ color: 'rgba(212,168,83,0.5)' }}>
                  MEETING TIME
                </label>
                <input
                  type="datetime-local"
                  required
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className={inputClasses}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-[9px] font-medium tracking-[0.3em] uppercase block mb-1 pt-4" style={{ color: 'rgba(212,168,83,0.5)' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[9px] font-medium tracking-[0.3em] uppercase block mb-1 pt-4" style={{ color: 'rgba(212,168,83,0.5)' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-10 px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-white border transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-3"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                    <span>SUBMITTING</span>
                  </>
                ) : (
                  <>
                    <span>BOOK NOW</span>
                    <span className="text-[10px]">→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Watermark ──────────────────────────────── */}
      <div className="absolute bottom-8 left-8 md:left-16 right-8 pointer-events-none select-none overflow-hidden">
        <p className="text-[clamp(5rem,15vw,14rem)] font-black uppercase leading-none tracking-tight watermark">
          BOOK ME
        </p>
      </div>

      <ToastContainer position="bottom-right" theme="dark" />
    </section>
  );
}