'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaDownload } from 'react-icons/fa';
import { profile, navLinks } from '../data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === '/';
  const inBlog = pathname.startsWith('/blog');

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  return (
    <header>
      <Link className="logo" href="/">{profile.name}</Link>
      <button
        className="menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls="nv"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="nv" className={open ? 'open' : undefined} aria-label="Main" onClick={(e) => e.target.closest('a') && setOpen(false)}>
        {navLinks.map((l) => (
          <a key={l.href} href={home ? l.href : `/${l.href}`}>{l.label}</a>
        ))}
        <Link href="/blog" aria-current={inBlog ? 'page' : undefined} className={inBlog ? 'on' : undefined}>Blog</Link>
        <a className="dl-nav" href={profile.resume} download={profile.resumeFileName}>
          <FaDownload aria-hidden="true" /> Resume
        </a>
      </nav>
    </header>
  );
}
