'use client';

import { useEffect, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { isSoundOn, playClick, setSoundOn } from '../lib/sound';

const TARGETS = 'a,button,summary,[role="tab"],[data-sound]';

// Delegated click sound + a small persistent sound switch.
export default function SoundFX() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(isSoundOn());

    const click = (e) => {
      if (e.button !== 0 || e.defaultPrevented) return;
      const el = e.target.closest?.(TARGETS);
      if (!el || el.closest('[data-no-sound]')) return;
      playClick(el.dataset.sound || 'tap');
    };

    // Keyboard activation fires a click on links/buttons in modern browsers;
    // this covers summary toggles and anything that only listens for keys.
    const key = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target.closest?.(TARGETS);
      if (!el || el.closest('[data-no-sound]')) return;
      if (el.tagName === 'SUMMARY') playClick('tap');
    };

    const sync = (e) => setOn(e.detail.on);

    document.addEventListener('click', click, true);
    document.addEventListener('keydown', key, true);
    window.addEventListener('sfx:change', sync);
    return () => {
      document.removeEventListener('click', click, true);
      document.removeEventListener('keydown', key, true);
      window.removeEventListener('sfx:change', sync);
    };
  }, []);

  const toggle = () => {
    if (on) {
      playClick('off');
      setSoundOn(false);
      setOn(false);
    } else {
      setSoundOn(true);
      setOn(true);
      playClick('on');
    }
  };

  return (
    <button
      type="button"
      className={`sound-toggle${on ? ' is-on' : ''}`}
      onClick={toggle}
      data-no-sound
      aria-pressed={on}
      aria-label={on ? 'Turn interface sounds off' : 'Turn interface sounds on'}
      title={on ? 'Sound on' : 'Sound off'}
    >
      <span className="sound-bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="sound-ico" aria-hidden="true">
        {on ? <FaVolumeUp /> : <FaVolumeMute />}
      </span>
      <span className="sound-text">{on ? 'Sound on' : 'Sound off'}</span>
    </button>
  );
}
