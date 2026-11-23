import Link from 'next/link';
import { getPosts, formatDate } from '../lib/blog';

export default function Writing() {
  const posts = getPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <section id="writing">
      <div className="in">
        <div className="sec-head">
          <div>
            <h2>Writing</h2>
            <p className="sub">Notes on building, deploying and running software.</p>
          </div>
          <Link className="btn" href="/blog">All posts →</Link>
        </div>
        <ul className="post-list stag">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="post-row">
                <span className="mono">{formatDate(p.date)}</span>
                <span className="post-title">{p.title}</span>
                <span className="post-min mono">{p.minutes} min read</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
