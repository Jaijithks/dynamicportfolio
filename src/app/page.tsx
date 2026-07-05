import { Suspense } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Bookme from "@/components/Bookme";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
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
      <Bookme />
      <Contact />
    </main>
  );
}