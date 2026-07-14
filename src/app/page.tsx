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
      <Hero />
      <About />
      <Projects />
      <Suspense
        fallback={
          <div
            className="min-h-screen flex items-center justify-center"
            style={{
              background: '#050505',
              color: 'rgba(212,168,83,0.3)',
              letterSpacing: '0.25em',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
            }}
          >
            Loading Skills…
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
