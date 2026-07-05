'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SectionTransitionProps {
  /** URL path to the WebP sequence folder, e.g. "/sequence herotoabout" */
  sequencePath: string;
  /** ID of the section element that triggers the pin, e.g. "hero" */
  triggerSectionId: string;
  /** Total number of frames in the sequence (default 120) */
  totalFrames?: number;
  /** Dead-zone buffer in px before animation starts/ends (default 30) */
  scrollThreshold?: number;
  /** Milliseconds to wait before starting to load (stagger to avoid network pile-up) */
  loadDelay?: number;
}

const getFrameUrl = (basePath: string, index: number) => {
  const pad = String(index).padStart(3, '0');
  return `${basePath}/${pad}.webp`;
};

export default function SectionTransition({
  sequencePath,
  triggerSectionId,
  totalFrames = 120,
  scrollThreshold = 60,
  loadDelay = 0,
}: SectionTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /* -- 1. Preload image sequence frames ------------------------------- */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const startLoading = () => {
      if (cancelled) return;

      let loadedCount = 0;
      const loadedImages: HTMLImageElement[] = new Array(totalFrames);

      const onDone = () => {
        if (cancelled) return;
        setImages([...loadedImages]);
        setLoaded(true);
      };

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = getFrameUrl(sequencePath, i);

        img.onload = () => {
          loadedImages[i] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          if (loadedCount === totalFrames) onDone();
        };

        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          if (loadedCount === totalFrames) onDone();
        };
      }
    };

    if (loadDelay > 0) {
      timer = setTimeout(startLoading, loadDelay);
    } else {
      startLoading();
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sequencePath, totalFrames, loadDelay]);

  /* -- 2. Show loader if user reaches transition before images load ---- */
  useEffect(() => {
    if (loaded) {
      setShowLoader(false);
      return;
    }
    const handleScroll = () => {
      const trigger = document.getElementById(triggerSectionId);
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      // trigger section bottom is near/above viewport top = user is about to enter transition
      if (rect.bottom <= scrollThreshold + 20) {
        setShowLoader(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded, triggerSectionId, scrollThreshold]);

  /* -- 3. Block scroll while loader is active ------------------------- */
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showLoader]);

  /* -- 4. GSAP ScrollTrigger + canvas rendering ----------------------- */
  useEffect(() => {
    if (!loaded || images.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const imgRatio = iw / ih;
      const cvRatio = cw / ch;

      let dw = cw, dh = ch, ox = 0, oy = 0;
      if (imgRatio > cvRatio) {
        dw = ch * imgRatio;
        ox = (cw - dw) / 2;
      } else {
        dh = cw / imgRatio;
        oy = (ch - dh) / 2;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, ox, oy, dw, dh);
    };

    const frameState = { index: 0 };

    const getFrameIndex = (progressVal: number) => {
      const vh = window.innerHeight;
      const startP = scrollThreshold / vh;
      const endP = (vh - scrollThreshold) / vh;
      const dur = endP - startP;

      if (progressVal <= startP) return 0;
      if (progressVal >= endP) return totalFrames - 1;
      return Math.round(((progressVal - startP) / dur) * (totalFrames - 1));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameState.index);
    };

    const st = ScrollTrigger.create({
      trigger: `#${triggerSectionId}`,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: false,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: [0, 1],
        duration: { min: 0.8, max: 1.5 },
        delay: 0,
        ease: 'power3.inOut',
      },
      onUpdate: (self) => {
        const pv = self.progress;
        const vh = window.innerHeight;
        const startP = scrollThreshold / vh;
        const endP = (vh - scrollThreshold) / vh;

        const el = canvasRef.current;
        if (el) {
          el.style.opacity = pv > startP && pv < endP ? '1' : '0';
        }

        const fi = getFrameIndex(pv);
        frameState.index = fi;
        requestAnimationFrame(() => drawFrame(fi));
      },
      onScrubComplete: (self) => {
        const pv = self.progress;
        const vh = window.innerHeight;
        const startP = scrollThreshold / vh;
        const endP = (vh - scrollThreshold) / vh;

        const el = canvasRef.current;
        if (el) {
          el.style.opacity = pv >= endP || pv <= startP ? '0' : '1';
        }
      },
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      st.kill();
    };
  }, [loaded, images, triggerSectionId, scrollThreshold, totalFrames]);

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-[10000]">
          <div className="w-12 h-12 border-2 border-purple-500/25 border-t-purple-500 rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300/70 font-bold animate-pulse">
            Synchronizing Transition ({loadProgress}%)
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{ zIndex: 9999, opacity: 0, pointerEvents: 'none' }}
      />
    </>
  );
}
