'use client';

import { useEffect, useRef, useState } from 'react';

function legacyCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '-1000px';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  return ok;
}

export default function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    setFailed(false);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else if (!legacyCopy(code)) {
        throw new Error('copy unavailable');
      }
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFailed(true);
      timer.current = setTimeout(() => setFailed(false), 2000);
    }
  }

  return (
    <div className="codeblock">
      <div className="codeblock-bar">
        <span className="codeblock-lang">{lang || 'code'}</span>
        <button
          type="button"
          className="codeblock-copy"
          data-copied={copied ? 'true' : undefined}
          onClick={copy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? 'Copied' : failed ? 'Try again' : 'Copy'}
        </button>
      </div>
      <pre data-lang={lang || undefined}><code>{code}</code></pre>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Code copied to clipboard' : failed ? 'Copy failed, please try again' : ''}
      </span>
    </div>
  );
}
