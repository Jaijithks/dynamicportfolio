'use client';

import dynamic from 'next/dynamic';

// dynamic with ssr:false must live in a Client Component
const SectionTransition = dynamic(
  () => import('./SectionTransition'),
  { ssr: false }
);

export interface SectionTransitionWrapperProps {
  sequencePath: string;
  triggerSectionId: string;
  totalFrames?: number;
  scrollThreshold?: number;
  loadDelay?: number;
}

export default function SectionTransitionWrapper(props: SectionTransitionWrapperProps) {
  return <SectionTransition {...props} />;
}
