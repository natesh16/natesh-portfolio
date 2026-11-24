'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Renders nothing. Adds three light behaviours with no animation library:
// scroll progress bar, active nav link, and one-time reveal on scroll.
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const bar = document.getElementById('bar');
    const header = document.querySelector('header.site-header');
    const measure = () => {
      // Real header height drives scroll offset for anchors and the mobile menu.
      if (header) document.documentElement.style.setProperty('--hdr', `${header.offsetHeight}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      if (header) header.classList.toggle('is-scrolled', scrollY > 8);
    };
    const onResize = () => { measure(); onScroll(); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    onResize();

    const observers = [];
    const items = [
      ...document.querySelectorAll('main section:not(#home) .in > *:not(.stag), main .stag > *'),
    ];

    if ('IntersectionObserver' in window) {
      // Stagger siblings inside grids and lists.
      document.querySelectorAll('main .stag').forEach((g) =>
        [...g.children].forEach((c, i) => c.style.setProperty('--delay', `${Math.min(i, 6) * 70}ms`))
      );
      const reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('vis');
              reveal.unobserve(e.target); // play once: no replay flicker
            }
          }),
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
      );
      items.forEach((el) => reveal.observe(el));
      observers.push(reveal);

      // Highlight the nav link of the section in view (home page only).
      const sections = [...document.querySelectorAll('main section[id]')];
      const links = [...document.querySelectorAll('#nv a')];
      const mark = (id) =>
        links.forEach((a) => {
          const on = id && (a.getAttribute('href') || '').endsWith(`#${id}`);
          if (on) a.dataset.active = 'true';
          else delete a.dataset.active;
        });
      if (sections.length) {
        const spy = new IntersectionObserver(
          (entries) => entries.forEach((e) => e.isIntersecting && mark(e.target.id === 'home' ? '' : e.target.id)),
          { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((s) => spy.observe(s));
        observers.push(spy);
      }
    } else {
      items.forEach((el) => el.classList.add('vis'));
    }

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return null;
}
