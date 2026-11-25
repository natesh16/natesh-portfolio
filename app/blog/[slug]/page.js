import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, formatDate } from '../../../lib/blog';
import { renderMarkdown } from '../../../lib/markdown';
import { SITE_NAME, SITE_URL, absoluteUrl, jsonLdString } from '../../../lib/site';
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
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    openGraph: {
      type: 'article',
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.summary,
      siteName: SITE_NAME,
      locale: 'en_US',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [SITE_URL],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    keywords: post.tags.join(', '),
    inLanguage: 'en',
    ...(post.image ? { image: absoluteUrl(post.image), thumbnailUrl: absoluteUrl(post.image) } : {}),
  };

  return (
    <main className="page" id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <article className="in narrow">
        <Link href="/blog" className="back">← All posts</Link>
        <header className="post-head">
          <span className="mono">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read
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
