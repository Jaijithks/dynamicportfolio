import SkillCard from './SkillCard';

type Skill = {
    title: string;
    description: string;
    skills: string[];
};

async function getSkills(): Promise<Skill[]> {
    const response = await fetch("https://my-api-6pmy.onrender.com/api/profile/skill", {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch skills");
    }

    const data = await response.json();
    return data.data.skills;
}

export default async function Skills() {
    const skills = await getSkills();

    return (
        <section
            id="skills"
            className="relative min-h-screen w-full overflow-hidden"
            style={{ background: '#050505' }}
        >
            {/* ── Top divider ──────────────────────────── */}
            <div className="absolute top-0 left-0 right-0 section-divider" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-20 md:py-32">
                {/* Section label with line */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-px" style={{ background: 'rgba(212,168,83,0.5)' }} />
                    <span
                        className="text-[10px] font-medium tracking-[0.4em] uppercase"
                        style={{ color: 'rgba(212,168,83,0.7)' }}
                    >
                        EXPERTISE
                    </span>
                </div>

                {/* Bold heading */}
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tight mb-16">
                    <span className="text-white">WHAT I </span>
                    <span className="italic" style={{ color: '#d4a853' }}>BRING</span>
                </h2>

                {/* Numbered 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {skills.map((skill, idx) => (
                        <SkillCard
                            key={skill.title}
                            title={skill.title}
                            description={skill.description}
                            skills={skill.skills}
                            index={idx}
                        />
                    ))}
                </div>
            </div>

            {/* ── Bottom divider ─────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 section-divider" />
        </section>
    );
}