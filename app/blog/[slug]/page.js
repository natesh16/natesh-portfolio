import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, formatDate } from '../../../lib/blog';
import { renderMarkdown } from '../../../lib/markdown';
import Comments from '../../../components/Comments';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Natesh L`,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: 'article', publishedTime: post.date },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  return (
    <main className="page" id="main">
      <article className="in narrow">
        <Link href="/blog" className="back">← All posts</Link>
        <header className="post-head">
          <span className="mono">
            {formatDate(post.date)} · {post.minutes} min read
          </span>
          <h1 className="page-title">{post.title}</h1>
          {post.summary ? <p className="sub">{post.summary}</p> : null}
          {post.tags.length ? (
            <div className="wrapchips">
              {post.tags.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          ) : null}
        </header>
        <div className="prose">{renderMarkdown(post.body)}</div>
        <Comments slug={post.slug} />
        <nav className="post-nav" aria-label="More posts">
          {newer ? <Link href={`/blog/${newer.slug}`}><span className="mono">Newer</span>{newer.title}</Link> : <span />}
          {older ? <Link href={`/blog/${older.slug}`}><span className="mono">Older</span>{older.title}</Link> : <span />}
        </nav>
      </article>
    </main>
  );
}
