'use client';

import dynamic from 'next/dynamic';

// dynamic with ssr:false must live in a Client Component
const WaveCanvas = dynamic(() => import('./WaveCanvas'), { ssr: false });

export default function WaveCanvasClient() {
  return <WaveCanvas />;
}
