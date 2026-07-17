import ProjectCard from './ProjectCard';

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
    next: { revalidate: 3600 },
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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* ── Top divider ────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-32">
        {/* Section label with line */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-px" style={{ background: 'rgba(212,168,83,0.5)' }} />
          <span
            className="text-[10px] font-medium tracking-[0.4em] uppercase"
            style={{ color: 'rgba(212,168,83,0.7)' }}
          >
            WORKS
          </span>
        </div>

        {/* Bold heading */}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tight mb-16">
          <span className="text-white">SELECTED </span>
          <span className="italic" style={{ color: '#d4a853' }}>PROJECTS</span>
        </h2>

        {error ? (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Unable to load projects.
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No projects available at the moment.
            </p>
          </div>
        ) : (
          /* Masonry-style grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, idx) => (
              <ProjectCard key={project._id} project={project} index={idx} />
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom divider ─────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}