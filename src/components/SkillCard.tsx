'use client';

import { useEffect, useRef, useState } from 'react';

type SkillCardProps = {
    title: string;
    description: string;
    skills: string[];
    index: number;
};

export default function SkillCard({ title, description, skills, index }: SkillCardProps) {
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

    const num = String(index + 1).padStart(2, '0');

    return (
        <div
            ref={cardRef}
            className={`group border-t py-10 md:py-14 px-2 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
                borderColor: 'rgba(255,255,255,0.06)',
                transitionDelay: `${index * 80}ms`,
            }}
        >
            {/* Number */}
            <span
                className="text-xs font-medium tracking-[0.2em] block mb-4"
                style={{ color: 'rgba(212,168,83,0.5)' }}
            >
                {num}
            </span>

            {/* Title — bold, uppercase, condensed */}
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
                {title}
            </h3>

            {/* Description */}
            <p
                className="text-sm leading-[1.8] mb-6 max-w-md"
                style={{ color: 'rgba(255,255,255,0.35)' }}
            >
                {description}
            </p>

            {/* Tech tags — inline, minimal */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {skills.map((item) => (
                    <span
                        key={item}
                        className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-white/50"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
