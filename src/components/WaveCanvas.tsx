'use client';

import { useRef, useEffect } from 'react';

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    let isVisible = false;

    const draw = () => {
      if (!isVisible) return;
      const w = canvas.width  = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.018;

      for (let layer = 3; layer >= 1; layer--) {
        const amp = 18 + layer * 8;
        const freq = 0.008 - layer * 0.001;
        const speed = t * (0.6 + layer * 0.2);
        const yBase = h * (0.55 + layer * 0.08);
        const alpha = 0.06 + layer * 0.04;
        const colors = [
          `rgba(0,150,200,${alpha})`,
          `rgba(0,100,180,${alpha})`,
          `rgba(0,60,140,${alpha})`,
        ];

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 3) {
          const y = yBase + Math.sin(x * freq + speed) * amp
                           + Math.sin(x * freq * 1.7 + speed * 0.8) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = colors[layer - 1];
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          draw();
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
