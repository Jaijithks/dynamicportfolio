'use client';

import { useRef, useEffect } from 'react';

export default function EarthParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      angle: number;
      spin: number;
    }

    const COLORS = ['#4a7c59', '#6b4c2a', '#3d6b47', '#8a6534', '#2d5a3d', '#a07850'];
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: h + 20,
      size: Math.random() * 6 + 2,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
    });

    // Pre-seed
    particles = Array.from({ length: 60 }, () => {
      const p = spawn();
      p.y = Math.random() * h;
      return p;
    });

    let isVisible = false;

    const draw = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;
        if (p.y < -20) particles[i] = spawn();

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw a small diamond/leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.6, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
