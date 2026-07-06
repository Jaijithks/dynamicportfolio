import ProjectCard from './ProjectCard';
import WaveCanvasClient from './WaveCanvasClient';



type Project = {
  _id: string;
  name: string;
  image: string;
  description: string;
  live_url: string;
  github_url: string;
};

async function getProjects(): Promise<Project[]> {
  const response = await fetch('https://my-api-6pmy.onrender.com/api/project/showProject', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await response.json();
  return data.projects;
}

export default async function Projects() {
  let projects: Project[] = [];
  let error = false;

  try {
    projects = await getProjects();
  } catch (err) {
    console.error(err);
    error = true;
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center z-0"
    >
      {/* ── Background Video ─────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none -z-20"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/project/projectback1.webm" type="video/webm" />
        <source src="/project/projectback.mp4" type="video/mp4" />
      </video>

      {/* Dark frost overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(2,13,24,0.80) 0%, rgba(4,28,50,0.72) 40%, rgba(3,21,37,0.75) 70%, rgba(1,12,24,0.82) 100%)',
        }}
      />

      {/* Deep water glow */}
      <div className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,80,160,0.25) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse 40% 30% at 20% 30%, rgba(0,140,200,0.10) 0%, transparent 60%)' }} />

      {/* Animated wave canvas (Client Component) */}
      <div className="absolute inset-0 -z-10">
        <WaveCanvasClient />
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px -z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,150,220,0.4), transparent)' }} />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-24 flex flex-col lg:flex-row gap-12 items-start justify-between">

        {/* Left Column: Sticky Header info */}
        <div className="lg:w-[35%] lg:sticky lg:top-28 flex flex-col items-start text-left">
          <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3 text-sky-400">
            💧 Projects
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black mb-4 leading-tight text-white"
            style={{
              backgroundImage: 'linear-gradient(135deg, #e0f7ff 0%, #38bdf8 40%, #0ea5e9 70%, #0369a1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(0,150,220,0.4))',
            }}
          >
            Things I&apos;ve<br />Built.
          </h2>

          {/* Glowing separator line */}
          <div className="w-16 h-[3px] bg-gradient-to-r from-sky-400 via-cyan-300 to-transparent rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)] mb-6" />

          <p className="text-sm md:text-base leading-relaxed text-sky-200/60 max-w-sm">
            A collection of projects built with depth, attention to flow, and clean architecture.
          </p>
        </div>

        {/* Right Column: Scrollable list container */}
        <div className="lg:w-[60%] w-full h-[65vh] overflow-y-auto scrollbar-glow pr-4 text-center flex flex-col justify-start pb-[30vh]">
          {error ? (
            /* Elegant glass error card */
            <div className="snap-start bg-slate-950/20 backdrop-blur-md border border-red-500/20 rounded-2xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden text-center max-w-md mx-auto my-auto">
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent)' }} />
              <span className="text-3xl block mb-3">⚠️</span>
              <p className="text-sm font-semibold text-red-300">
                Unable to load projects.
              </p>
            </div>
          ) : projects.length === 0 ? (
            /* Empty State */
            <div className="snap-start bg-slate-950/20 backdrop-blur-md border border-white/5 rounded-2xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden text-center max-w-md mx-auto my-auto">
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)' }} />
              <span className="text-3xl block mb-3">🌊</span>
              <p className="text-sm font-medium text-sky-200/60">
                No projects available at the moment.
              </p>
            </div>
          ) : (
            projects.map((project, idx) => (
              <ProjectCard key={project._id} project={project} index={idx} />
            ))
          )}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,150,220,0.4), transparent)' }} />
    </section>
  );
}