'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ElectricBorder = dynamic(() => import('./ElectricBorder'), { ssr: false });

type SkillCardProps = {
    title: string;
    description: string;
    skills: string[];
};

export default function SkillCard({ title, description, skills }: SkillCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`group relative transition-all duration-1000 ease-out h-full ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
            <ElectricBorder
                color="#7c3aed"
                speed={1.2}
                chaos={0.14}
                borderRadius={20}
                className="h-full transition-all duration-500 group-hover:shadow-[0_15px_35px_rgba(124,58,237,0.22),_0_0_25px_rgba(59,130,246,0.15)]"
                style={{ height: '100%' }}
            >
                <div className="h-full flex flex-col justify-between p-8 rounded-[20px] bg-gradient-to-br from-slate-950/30 to-slate-900/15 backdrop-blur-md border border-white/5 transition-colors duration-500 group-hover:bg-slate-950/40 relative overflow-hidden">
                    {/* Layered Depth Glows */}
                    <div className="absolute top-0 left-0 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700" />
                    <div className="absolute bottom-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />

                    {/* Soft Glass reflection glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Electric light sweep across the top border */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/40 via-blue-400/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                    <div>
                        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-purple-300/80 bg-clip-text text-transparent tracking-tight">
                            {title}
                        </h3>
                        <p className="text-sm text-purple-200/60 leading-relaxed mb-8">
                            {description}
                        </p>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2.5 mt-auto">
                        {skills.map((item, index) => (
                            <span
                                key={item}
                                className="px-3.5 py-1.5 border border-purple-500/20 rounded-full text-[11px] bg-purple-950/15 text-purple-200 font-medium transition-all duration-300 hover:scale-105 hover:bg-purple-950/30 hover:border-purple-400/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] cursor-default"
                                style={{
                                    transitionDelay: isVisible ? `${index * 60}ms` : '0ms'
                                }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </ElectricBorder>
        </div>
    );
}
