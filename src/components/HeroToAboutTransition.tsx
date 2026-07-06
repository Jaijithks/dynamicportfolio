'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 120;
const SCROLL_THRESHOLD = 30; // 150px scroll buffer before transition starts

const getFrameUrl = (index: number) => {
  const pad = String(index).padStart(3, '0');
  return `/sequence herotoabout/${pad}.webp`;
};

export default function HeroToAboutTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // 1. Preload image sequence frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };

      loadedImages[i] = img;
    }
  }, []);

  // 2. Control loader display on early scroll (only if scrolled past threshold and not loaded)
  useEffect(() => {
    if (loaded) return;
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setShowLoader(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  // 3. Prevent scroll when loader is active
  useEffect(() => {
    const isLoaderActive = showLoader && !loaded;
    if (isLoaderActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoader, loaded]);

  // 4. GSAP ScrollTrigger and Canvas rendering
  useEffect(() => {
    if (!loaded || images.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const vh = window.innerHeight;
      const startProgress = SCROLL_THRESHOLD / vh;
      const endProgress = (vh - SCROLL_THRESHOLD) / vh;
      const progressVal = scrollTriggerInstance.progress;

      let frameIndex = 0;
      if (progressVal <= startProgress) {
        frameIndex = 0;
      } else if (progressVal >= endProgress) {
        frameIndex = TOTAL_FRAMES - 1;
      } else {
        const animationDuration = endProgress - startProgress;
        const t = (progressVal - startProgress) / animationDuration;
        frameIndex = Math.round(t * (TOTAL_FRAMES - 1));
      }
      drawFrame(frameIndex);
    };

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top', // Start pinning immediately at the very top of Hero
      end: '+=100%', // Total pinned duration is exactly 100vh
      pin: true,
      pinSpacing: false, // bridges Hero and About with zero layout gaps
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: [0, 1],
        duration: { min: 0.5, max: 0.9 },
        delay: 0,
        ease: 'power2.inOut',
      },
      onUpdate: (self) => {
        const progressVal = self.progress;
        const canvasElement = canvasRef.current;
        const vh = window.innerHeight;
        const startProgress = SCROLL_THRESHOLD / vh;
        const endProgress = (vh - SCROLL_THRESHOLD) / vh;
        const animationDuration = endProgress - startProgress;

        // Toggle visibility based on progress thresholds
        if (canvasElement) {
          if (progressVal > startProgress && progressVal < endProgress) {
            canvasElement.style.opacity = '1';
          } else {
            canvasElement.style.opacity = '0';
          }
        }

        // Calculate and draw correct frame index
        let frameIndex = 0;
        if (progressVal <= startProgress) {
          frameIndex = 0;
        } else if (progressVal >= endProgress) {
          frameIndex = TOTAL_FRAMES - 1;
        } else {
          const t = (progressVal - startProgress) / animationDuration;
          frameIndex = Math.round(t * (TOTAL_FRAMES - 1));
        }

        requestAnimationFrame(() => {
          drawFrame(frameIndex);
        });
      },
      onScrubComplete: (self) => {
        const progressVal = self.progress;
        const canvasElement = canvasRef.current;
        const vh = window.innerHeight;
        const startProgress = SCROLL_THRESHOLD / vh;
        const endProgress = (vh - SCROLL_THRESHOLD) / vh;
        if (canvasElement) {
          if (progressVal >= endProgress || progressVal <= startProgress) {
            canvasElement.style.opacity = '0';
          } else {
            canvasElement.style.opacity = '1';
          }
        }
      },
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      scrollTriggerInstance.kill();
    };
  }, [loaded, images]);

  return (
    <>
      {showLoader && !loaded && (
        <div className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-[10000]">
          <div className="w-12 h-12 border-2 border-purple-500/25 border-t-purple-500 rounded-full animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em] text-purple-300/70 font-bold animate-pulse">
            Synchronizing Cinematic Transition ({progress}%)
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        id="hero-to-about-canvas"
        className="fixed inset-0 w-screen h-screen object-cover block pointer-events-none"
        style={{
          zIndex: 9999,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
