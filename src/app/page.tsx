import { Suspense } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Bookme from "@/components/Bookme";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────── */}
      <Hero />

      {/* ── About ─────────────────────────────────── */}
      <About />

      {/* ── Projects ──────────────────────────────── */}
      <Projects />

      {/* ── Skills ────────────────────────────────── */}
      <Suspense
        fallback={
          <div
            className="min-h-screen flex items-center justify-center"
            style={{
              background: 'linear-gradient(160deg, #06030f 0%, #0d0620 100%)',
              color: 'rgba(180,120,255,0.5)',
              letterSpacing: '0.2em',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            ⚡ Loading Skills…
          </div>
        }
      >
        <Skills />
      </Suspense>

      {/* ── Book Me ───────────────────────────────── */}
      <Bookme />

      {/* ── Contact ───────────────────────────────── */}
      <Contact />
    </main>
  );
}

