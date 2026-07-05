'use client';

import dynamic from 'next/dynamic';

// dynamic with ssr:false must live in a Client Component
const EarthParticles = dynamic(() => import('./EarthParticles'), { ssr: false });

export default function EarthParticlesClient() {
  return <EarthParticles />;
}
