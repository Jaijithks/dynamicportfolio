'use client';

import { useEffect, useState, useRef } from 'react';
import { Mail, Phone, Copy, Check, Download } from 'lucide-react';
import { FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';

/* ── Types ─────────────────────────────────────────────────────────────── */
type Contact = {
  phone: string | number;
  email: string;
  github: string;
  linkedin: string;
};

type Resume = {
  resume_url: string;
};

interface ContactProps {
  initialContact?: Contact | null;
  initialResume?: Resume | null;
}

/* ── Component ──────────────────────────────────────────────────────────── */
export default function Contact({ initialContact = null, initialResume = null }: ContactProps) {
  const [contact, setContact] = useState<Contact | null>(initialContact);
  const [resume, setResume] = useState<Resume | null>(initialResume);
  const [loadingResume, setLoadingResume] = useState(initialResume ? false : true);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // If props were loaded successfully, do not fetch again
    if (initialContact && initialResume) {
      return;
    }

    Promise.all([
      !contact
        ? fetch('https://my-api-6pmy.onrender.com/api/book/viewcontact')
            .then((r) => r.json())
            .then((data) => setContact(data.currentContact))
            .catch(console.error)
        : Promise.resolve(),
      !resume
        ? fetch('https://my-api-6pmy.onrender.com/api/profile/resume')
            .then((r) => r.json())
            .then((data) => {
              setResume(data.data.resume);
              setLoadingResume(false);
            })
            .catch((err) => {
              console.error(err);
              setLoadingResume(false);
            })
        : Promise.resolve()
    ]);
  }, [contact, resume, initialContact, initialResume]);

  const handleCopy = () => {
    const email = contact?.email || 'jajithks01@gmail.com';
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailValue = contact?.email || 'jajithks01@gmail.com';
  const phoneRaw = contact?.phone || '9207505581';
  const phoneValue = typeof phoneRaw === 'number' || !phoneRaw.startsWith('+') ? `+91 ${phoneRaw}` : phoneRaw;
  // Ensure external URLs have a protocol so the browser doesn't treat them as relative paths
  const ensureAbsoluteUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

  const githubLink = ensureAbsoluteUrl(contact?.github || 'https://github.com/Jaijithks');
  const linkedinLink = ensureAbsoluteUrl(contact?.linkedin || 'https://www.linkedin.com/in/jaijithks01');

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between"
      style={{ background: '#050505' }}
    >
      {/* ── Top divider ────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-20 md:pt-32 pb-8 flex-1 flex flex-col justify-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-px" style={{ background: 'rgba(212,168,83,0.5)' }} />
          <span
            className="text-[10px] font-medium tracking-[0.4em] uppercase"
            style={{ color: 'rgba(212,168,83,0.7)' }}
          >
            GET IN TOUCH
          </span>
        </div>

        {/* Giant heading */}
        <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-[1.05] tracking-tight mb-16">
          <span className="text-white">LET&apos;S<br />CREATE </span>
          <span className="italic" style={{ color: '#d4a853' }}>TOGETHER</span>
        </h2>

        {/* Contact items — minimal rows */}
        <div className="space-y-8 mb-16">
          {/* Email */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={handleCopy}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <Mail className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(212,168,83,0.5)' }}>EMAIL</p>
              <p className="text-sm text-white/70 group-hover:text-white transition-colors flex items-center gap-2">
                {emailValue}
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />}
              </p>
            </div>
          </div>

          {/* Phone */}
          <a href={`tel:${phoneRaw}`} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <Phone className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(212,168,83,0.5)' }}>PHONE</p>
              <p className="text-sm text-white/70 group-hover:text-white transition-colors">{phoneValue}</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <Linkedin className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(212,168,83,0.5)' }}>LINKEDIN</p>
              <p className="text-sm text-white/70 group-hover:text-white transition-colors">Connect Professionally →</p>
            </div>
          </a>

          {/* GitHub */}
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <Github className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(212,168,83,0.5)' }}>GITHUB</p>
              <p className="text-sm text-white/70 group-hover:text-white transition-colors">Explore My Work →</p>
            </div>
          </a>
        </div>

        {/* Resume Download */}
        {(loadingResume || (resume && resume.resume_url)) && (
          <div className="mb-16">
            {loadingResume ? (
              <button
                disabled
                className="px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-medium border flex items-center gap-3 cursor-not-allowed"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }}
              >
                <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin" />
                <span>LOADING RESUME</span>
              </button>
            ) : (
              <a
                href={resume?.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-3 px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-medium text-white border transition-all duration-300 hover:bg-white hover:text-black cursor-pointer animate-breathe"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Watermark ──────────────────────────────── */}
      <div className="absolute bottom-16 left-8 md:left-16 right-8 pointer-events-none select-none overflow-hidden">
        <p className="text-[clamp(5rem,15vw,14rem)] font-black uppercase leading-none tracking-tight watermark">
          CONTACT
        </p>
      </div>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="relative z-10 w-full border-t py-6 px-8 md:px-16 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          © 2025 JAIJITH KS. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[9px] uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.15)' }}>
          JAIJITH KS
        </p>
      </footer>
    </section>
  );
}
