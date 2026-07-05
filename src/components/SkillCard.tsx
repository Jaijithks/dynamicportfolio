'use client';

import dynamic from 'next/dynamic';

const ElectricBorder = dynamic(() => import('./ElectricBorder'), { ssr: false });

type SkillCardProps = {
    title: string;
    description: string;
    skills: string[];
};

export default function SkillCard({ title, description, skills }: SkillCardProps) {
    return (
        <ElectricBorder
            color="#7c3aed"
            speed={1.2}
            chaos={0.14}
            borderRadius={16}
            className=""
            style={{ padding: '1.5rem' }}
        >
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-70 mb-4">{description}</p>

            <div className="flex flex-wrap gap-3">
                {skills.map((item) => (
                    <span
                        key={item}
                        className="px-4 py-2 border border-purple-500/30 rounded-full text-sm bg-purple-950/40 text-purple-100"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </ElectricBorder>
    );
}
