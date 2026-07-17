import { Suspense } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Bookme from "@/components/Bookme";
import Contact from "@/components/Contact";

async function getContactData() {
  try {
    const [contactRes, resumeRes] = await Promise.all([
      fetch('https://my-api-6pmy.onrender.com/api/book/viewcontact', { next: { revalidate: 3600 } }),
      fetch('https://my-api-6pmy.onrender.com/api/profile/resume', { next: { revalidate: 3600 } }),
    ]);

    if (!contactRes.ok || !resumeRes.ok) {
      return { contact: null, resume: null };
    }

    const [contactData, resumeData] = await Promise.all([
      contactRes.json(),
      resumeRes.json(),
    ]);

    return {
      contact: contactData.currentContact || null,
      resume: resumeData.data.resume || null,
    };
  } catch (err) {
    console.error("Failed to fetch contact/resume data statically:", err);
    return { contact: null, resume: null };
  }
}

export default async function Home() {
  const { contact, resume } = await getContactData();

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
      <Contact initialContact={contact} initialResume={resume} />
    </main>
  );
}
