'use client';

import { useEffect, useRef } from 'react';

// Ambient motion layer: a very light constellation canvas plus a handful of
// drifting editorial shapes. Everything sits behind the content, never
// intercepts pointer events, and becomes completely static when the visitor
// prefers reduced motion.
export default function BackgroundFX() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -9999, y: -9999, active: false };
    let w = 0;
    let h = 0;
    let dots = [];
    let frame = 0;
    let running = true;

    const seed = () => {
      const count = Math.round(Math.min(78, Math.max(26, w / 19)));
      dots = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.6 + Math.random() * 1.15,
        a: 0.10 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0006 + Math.random() * 0.0012,
        i,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced.matches) paint(0);
    };

    const paint = (time) => {
      ctx.clearRect(0, 0, w, h);

      const link = w > 900 ? 132 : 96;

      if (!reduced.matches) {
        for (const d of dots) {
          // Gentle repulsion keeps the field feeling alive around the cursor.
          if (pointer.active) {
            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150 && dist > 0.01) {
              const force = (1 - dist / 150) * 0.45;
              d.vx += (dx / dist) * force * 0.055;
              d.vy += (dy / dist) * force * 0.055;
            }
          }
          d.vx *= 0.985;
          d.vy *= 0.985;
          d.x += d.vx + Math.sin(time * d.speed + d.phase) * 0.045;
          d.y += d.vy + Math.cos(time * d.speed + d.phase) * 0.045;

          if (d.x < -20) d.x = w + 20;
          if (d.x > w + 20) d.x = -20;
          if (d.y < -20) d.y = h + 20;
          if (d.y > h + 20) d.y = -20;
        }
      }

      // Hairline connections give the field a quiet technical texture.
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < link) {
            ctx.strokeStyle = `rgba(17,17,17,${(1 - dist / link) * 0.085})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(17,17,17,${d.a})`;
        ctx.fill();
      }
    };

    const loop = (time) => {
      if (!running) return;
      paint(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        paint(0);
      } else {
        frame = requestAnimationFrame(loop);
      }
    };

    const onPointer = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      running = !document.hidden && !reduced.matches;
      if (running) frame = requestAnimationFrame(loop);
      else cancelAnimationFrame(frame);
    };
    const onMotion = () => {
      running = !reduced.matches;
      start();
    };

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener?.('change', onMotion);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener?.('change', onMotion);
    };
  }, []);

  return (
    <div className="fx" aria-hidden="true">
      <canvas ref={ref} className="fx-canvas" />
      <div className="fx-grid" />
      <div className="fx-orb fx-orb-a" />
      <div className="fx-orb fx-orb-b" />
      <div className="fx-orb fx-orb-c" />

      <span className="fx-rail fx-rail-l">Full stack · DevOps</span>
      <span className="fx-rail fx-rail-r">Build · Ship · Run</span>

      <span className="fx-shape fx-plus">+</span>
      <span className="fx-shape fx-cross">×</span>
      <span className="fx-shape fx-bracket">{'{ }'}</span>

      <svg className="fx-shape fx-orbit" viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" stroke="currentColor" strokeDasharray="3 11" strokeWidth="1" />
        <circle cx="70" cy="10" r="3.5" fill="currentColor" />
      </svg>

      <svg className="fx-shape fx-tri" viewBox="0 0 120 120" fill="none">
        <path d="M60 12 108 96H12L60 12Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>

      <svg className="fx-shape fx-dotgrid" viewBox="0 0 90 90" fill="currentColor">
        {[10, 30, 50, 70].map((y) =>
          [10, 30, 50, 70].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" />)
        )}
      </svg>
    </div>
  );
}
