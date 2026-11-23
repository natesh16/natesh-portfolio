'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogList({ posts, tags }) {
  const [tag, setTag] = useState('All');
  const shown = (p) => tag === 'All' || p.tags.includes(tag);

  return (
    <>
      {tags.length ? (
        <div className="wrapchips filter" role="tablist" aria-label="Filter posts by category">
          {['All', ...tags].map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              className="chip"
              aria-selected={tag === t}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}
      <ul className="post-feed">
        {posts.map((p) => (
          <li key={p.slug} hidden={!shown(p)}>
            <Link href={`/blog/${p.slug}`} className="post-card">
              <span className="mono">{p.date} · {p.minutes} min read</span>
              <h2>{p.title}</h2>
              {p.summary ? <p>{p.summary}</p> : null}
              <span className="read">Read post →</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
