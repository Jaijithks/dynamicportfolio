'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';

const StarField = dynamic(() => import('./StarField'), { ssr: false });

/* ── Types ─────────────────────────────────────────────────────────────── */
type Contact = {
  phone: string | number;
  email: string;
  github: string;
  linkedin: string;
};

/* ── Component ──────────────────────────────────────────────────────────── */
export default function Contact() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4500/api/book/viewcontact', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => setContact(data.currentContact))
      .catch(console.error);
  }, []);

  const handleCopy = () => {
    const email = contact?.email || 'jajithks01@gmail.com';
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailValue = contact?.email || 'jajithks01@gmail.com';
  const phoneRaw = contact?.phone || '9207505581';
  const phoneValue = typeof phoneRaw === 'number' || !phoneRaw.startsWith('+') ? `+91 ${phoneRaw}` : phoneRaw;
  const githubLink = contact?.github || 'https://github.com/Jaijithks';
  const linkedinLink = contact?.linkedin || 'https://www.linkedin.com/in/jaijithks01';

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-24"
    >
      {/* ── Background Video ─────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/contact/contactback1.webm" type="video/webm" />
        <source src="/contact/contactback.mp4" type="video/mp4" />
      </video>

      {/* Deep space overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: 'rgba(0,0,15,0.85)' }}
      />

      {/* Animated star field + nebula */}
      <StarField />

      {/* Deep center glow — the "void core" */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(80,0,140,0.18) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 30% at 70% 30%, rgba(0,30,120,0.15) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 35% 25% at 25% 70%, rgba(120,0,80,0.10) 0%, transparent 60%)' }} />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,15,0.8), transparent)' }} />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(140,60,220,0.4), rgba(60,60,220,0.4), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full text-center">
        {/* Contact header tag */}
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400/90 mb-3 block">
          — CONTACT —
        </span>

        {/* Main Title with Sparkle */}
        <h2
          className="text-5xl sm:text-6xl font-black mb-6 leading-tight text-white relative inline-block"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(160,80,255,0.4))',
          }}
        >
          Reach Out
          <span className="absolute -top-2 -right-6 text-2xl text-purple-300 animate-pulse">✦</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-16 leading-relaxed">
          Let&apos;s connect and create something extraordinary together.<br />
          I&apos;m always open to new opportunities and collaborations.
        </p>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: Email */}
          <div className="group relative bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:border-white/20 min-h-[350px]">
            {/* Corner edge glows */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />

            <div className="relative w-full flex items-center justify-center mb-8 mt-2">
              <div className="absolute left-0 right-0 h-[1px] border-t border-dotted border-white/15" />
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-slate-950/90 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-purple-400">
              PROFESSIONAL EMAIL
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-8 flex-1 max-w-[200px]">
              For project discussions, collaborations, and inquiries.
            </p>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs text-purple-200/90 font-mono transition-all duration-300 hover:bg-purple-950/40 hover:border-purple-500/50"
            >
              <span className="truncate mr-2">{emailValue}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 shrink-0 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 shrink-0 cursor-pointer" />
              )}
            </button>
          </div>

          {/* Card 2: Phone */}
          <div className="group relative bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:border-white/20 min-h-[350px]">
            {/* Corner edge glows */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }} />
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }} />

            <div className="relative w-full flex items-center justify-center mb-8 mt-2">
              <div className="absolute left-0 right-0 h-[1px] border-t border-dotted border-white/15" />
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-slate-950/90 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-blue-400">
              DIRECT LINE
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-8 flex-1 max-w-[200px]">
              Available for professional conversations and consultations.
            </p>

            <a
              href={`tel:${phoneRaw}`}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full border border-blue-500/30 bg-blue-950/20 text-xs text-blue-200/90 font-mono transition-all duration-300 hover:bg-blue-950/40 hover:border-blue-500/50"
            >
              <span className="truncate mr-2">{phoneValue}</span>
              <Phone className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* Card 3: LinkedIn */}
          <div className="group relative bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:border-white/20 min-h-[350px]">
            {/* Corner edge glows */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />

            <div className="relative w-full flex items-center justify-center mb-8 mt-2">
              <div className="absolute left-0 right-0 h-[1px] border-t border-dotted border-white/15" />
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-slate-950/90 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <Linkedin className="w-5 h-5 text-purple-400" />
              </div>
            </div>

            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-purple-400">
              LINKEDIN
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-8 flex-1 max-w-[200px]">
              Connect with me on LinkedIn to view my journey, experience, and professional updates.
            </p>

            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs text-purple-200/90 font-medium transition-all duration-300 hover:bg-purple-950/40 hover:border-purple-500/50"
            >
              <span>Connect Professionally</span>
              <span className="text-[10px]">→</span>
            </a>
          </div>

          {/* Card 4: GitHub */}
          <div className="group relative bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-[1.02] hover:border-white/20 min-h-[350px]">
            {/* Corner edge glows */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }} />
            <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }} />

            <div className="relative w-full flex items-center justify-center mb-8 mt-2">
              <div className="absolute left-0 right-0 h-[1px] border-t border-dotted border-white/15" />
              <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-slate-950/90 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <Github className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-blue-400">
              GITHUB
            </h3>
            
            <p className="text-xs text-gray-400 leading-relaxed mb-8 flex-1 max-w-[200px]">
              Explore my repositories, open-source projects, and contributions.
            </p>

            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-blue-500/30 bg-blue-950/20 text-xs text-blue-200/90 font-medium transition-all duration-300 hover:bg-blue-950/40 hover:border-blue-500/50"
            >
              <span>Explore My Work</span>
              <span className="text-[10px]">→</span>
            </a>
          </div>
        </div>

        {/* Bottom capsule indicator */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-full border border-purple-500/10 bg-purple-950/10 backdrop-blur-md text-xs text-purple-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <span className="text-purple-400">🚀</span>
            <span>Open to Full-Time Roles</span>
            <span className="text-purple-500/40">•</span>
            <span>Freelance Projects</span>
            <span className="text-purple-500/40">•</span>
            <span>Technical Collaborations</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 mt-16">
        <p className="text-xs" style={{ color: 'rgba(180,140,255,0.3)' }}>
          © 2025 Jaijith KS — Built from scratch ✦
        </p>
      </div>
    </section>
  );
}
