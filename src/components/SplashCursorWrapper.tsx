'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplashCursorWrapper() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // 1. Mobile Check
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth <= 768) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    // 2. Hide cursor on body globally
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      body, a, button, select, input, textarea, [role="button"], .group {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // 3. Mouse tracking states
    let mx = 0; // Mouse X
    let my = 0; // Mouse Y
    let fx = 0; // Follower X
    let fy = 0; // Follower Y
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      
      // Move dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // 4. Lerp animation loop
    let animFrameId: number;
    const animFollower = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      
      if (followerRef.current) {
        const offset = isHovered ? 32 : 18;
        followerRef.current.style.transform = `translate(${fx - offset}px, ${fy - offset}px)`;
      }
      animFrameId = requestAnimationFrame(animFollower);
    };
    animFollower();

    // 5. Hover state selectors
    const addHover = () => {
      isHovered = true;
      if (followerRef.current) {
        followerRef.current.style.width = '64px';
        followerRef.current.style.height = '64px';
        followerRef.current.style.borderColor = '#d4a853';
      }
    };

    const removeHover = () => {
      isHovered = false;
      if (followerRef.current) {
        followerRef.current.style.width = '36px';
        followerRef.current.style.height = '36px';
        followerRef.current.style.borderColor = 'rgba(212, 168, 83, 0.4)';
      }
    };

    const registerHoverElements = () => {
      const elements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .group, img, iframe');
      elements.forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    registerHoverElements();

    // MutationObserver to capture dynamically loaded elements (e.g. from API)
    const observer = new MutationObserver(() => {
      registerHoverElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameId);
      document.head.removeChild(styleEl);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner solid circular dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          background: '#d4a853',
          willChange: 'transform',
        }}
      />
      {/* Outer hollow circular follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] border transition-all duration-300 ease-out"
        style={{
          borderColor: 'rgba(212, 168, 83, 0.4)',
          willChange: 'transform, width, height, border-color',
        }}
      />
    </>
  );
}
