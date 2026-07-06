'use client';
import { useRef, useEffect } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Star {
      x: number; y: number; r: number;
      opacity: number; speed: number; twinkle: number;
    }

    interface Nebula {
      x: number; y: number; r: number;
      color: string; opacity: number;
    }

    let stars: Star[] = [];
    let nebulae: Nebula[] = [];

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      buildScene();
    };

    const buildScene = () => {
      // Stars
      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        opacity: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
      }));

      // Nebula blobs
      const nebulaColors = [
        'rgba(100,20,200,',
        'rgba(20,60,180,',
        'rgba(180,20,120,',
        'rgba(0,80,160,',
        'rgba(80,0,140,',
      ];
      nebulae = Array.from({ length: 6 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 200 + 100,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        opacity: Math.random() * 0.07 + 0.03,
      }));
    };

    let isVisible = false;

    let t = 0;
    const draw = () => {
      if (!isVisible) return;

      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      // Nebula glow
      nebulae.forEach(n => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, n.color + n.opacity + ')');
        grad.addColorStop(1, n.color + '0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        const pulse = Math.sin(t * s.speed + s.twinkle) * 0.25 + 0.75;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * pulse})`;
        ctx.fill();

        // Shooting star hint for large ones
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160,160,255,${s.opacity * 0.15 * pulse})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

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
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
