'use client';

import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { profile, navLinks } from '../data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <a className="logo" href="#home" data-go>
        &gt;_ <span>{profile.name}</span>
      </a>
      <button
        id="mb"
        type="button"
        aria-expanded={open}
        aria-controls="nv"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav
        id="nv"
        className={open ? 'open' : undefined}
        aria-label="Main"
        onClick={(e) => {
          if (e.target.closest('a')) setOpen(false);
        }}
      >
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} data-go>
            {l.label}
          </a>
        ))}
        <a className="dl-nav" href={profile.resume} download={profile.resumeFileName}>
          <FaDownload aria-hidden="true" />
          Resume
        </a>
      </nav>
    </header>
  );
}
