import { Suspense } from "react";
import Hero from "@/components/Hero";
import SectionTransitionWrapper from "@/components/SectionTransitionWrapper";
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

      {/* ── Hero → About ──────────────────────────── */}
      <SectionTransitionWrapper
        sequencePath="/sequence herotoabout"
        triggerSectionId="hero"
        loadDelay={0}
      />
      {/* Spacer: bridges the 2vh pin duration to About */}
      <div style={{ height: '100vh' }} aria-hidden="true" />

      {/* ── About ─────────────────────────────────── */}
      <About />

      {/* ── About → Projects ──────────────────────── */}
      <SectionTransitionWrapper
        sequencePath="/sequence abouttoproject"
        triggerSectionId="about"
        loadDelay={500}
      />
      <div style={{ height: '100vh' }} aria-hidden="true" />

      {/* ── Projects ──────────────────────────────── */}
      <Projects />

      {/* ── Projects → Skills ─────────────────────── */}
      <SectionTransitionWrapper
        sequencePath="/sequence projecttoskills"
        triggerSectionId="projects"
        loadDelay={1000}
      />
      <div style={{ height: '100vh' }} aria-hidden="true" />

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

      {/* ── Skills → Book Me ──────────────────────── */}
      <SectionTransitionWrapper
        sequencePath="/sequence skillstobookme"
        triggerSectionId="skills"
        loadDelay={1500}
      />
      <div style={{ height: '100vh' }} aria-hidden="true" />

      {/* ── Book Me ───────────────────────────────── */}
      <Bookme />

      {/* ── Book Me → Contact ─────────────────────── */}
      <SectionTransitionWrapper
        sequencePath="/sequence bookmetocontact"
        triggerSectionId="bookme"
        loadDelay={2000}
      />
      <div style={{ height: '100vh' }} aria-hidden="true" />

      {/* ── Contact ───────────────────────────────── */}
      <Contact />
    </main>
  );
}

