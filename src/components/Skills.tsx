import SkillCard from './SkillCard';

type Skill = {
    title: string;
    description: string;
    skills: string[];
};

async function getSkills(): Promise<Skill[]> {
    const response = await fetch("http://localhost:4500/api/profile/skill", {
        cache: "no-store",
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
            className="relative min-h-screen w-full overflow-hidden flex items-center justify-center z-0"
        >
            {/* ── Background Video ─────────────────────────── */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none -z-20"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/skills/skillsback1.webm" type="video/webm" />
                <source src="/skills/skllsback.mp4" type="video/mp4" />
            </video>

            {/* Dark electric overlay */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: 'linear-gradient(160deg, rgba(6,3,15,0.82) 0%, rgba(13,6,32,0.76) 40%, rgba(9,3,24,0.78) 70%, rgba(5,2,16,0.83) 100%)',
                }}
            />

            {/* Electric glow cores */}
            <div className="absolute inset-0 pointer-events-none -z-10"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(120,40,255,0.15) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 pointer-events-none -z-10"
                style={{ background: 'radial-gradient(ellipse 40% 30% at 80% 20%, rgba(80,0,200,0.10) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 pointer-events-none -z-10"
                style={{ background: 'radial-gradient(ellipse 35% 25% at 10% 80%, rgba(160,0,255,0.08) 0%, transparent 60%)' }} />

            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-px -z-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(140,60,255,0.5), transparent)' }} />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20 flex flex-col items-start justify-center">
                <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3 block"
                    style={{ color: 'rgba(160,80,255,0.7)' }}>
                    ⚡ Tech Stacks
                </span>
                <h2
                    className="text-5xl sm:text-6xl font-black"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #f0e6ff 0%, #c084fc 35%, #7c3aed 70%, #4c1d95 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 20px rgba(140,60,255,0.5))',
                    }}
                >
                    Charged &amp;<br />Ready.
                </h2>
                {/* Glowing line underneath heading */}
                <div className="w-20 h-[3px] bg-gradient-to-r from-purple-500 via-purple-400 to-transparent rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)] mt-4 mb-6" />
                
                <p className="mb-12 max-w-lg text-sm md:text-base leading-relaxed" style={{ color: 'rgba(180,120,255,0.60)' }}>
                    The tools and technologies I use to bring ideas to life, crackling with precision.
                </p>

                {/* Scrollable Skills Container */}
                <div className="w-full max-h-[55vh] overflow-y-auto pr-4 pb-8 scrollbar-glow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {skills.map((skill) => (
                            <SkillCard
                                key={skill.title}
                                title={skill.title}
                                description={skill.description}
                                skills={skill.skills}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(140,60,255,0.4), transparent)' }} />
        </section>
    );
}