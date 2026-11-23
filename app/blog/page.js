import BlogList from '../../components/BlogList';
import { getPosts, formatDate } from '../../lib/blog';

export const metadata = {
  title: 'Blog | Natesh L',
  description: 'Writing on full-stack development, AWS and CI/CD automation by Natesh L.',
};

export default function BlogIndex() {
  const posts = getPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))];
  return (
    <main className="page" id="main">
      <div className="in narrow">
        <p className="kicker">Blog</p>
        <h1 className="page-title">Notes from the build.</h1>
        <p className="sub">
          Writing on full-stack development, AWS and CI/CD automation.
        </p>
        {posts.length ? (
          <BlogList posts={posts.map((p) => ({ ...p, date: formatDate(p.date), body: undefined }))} tags={tags} />
        ) : (
          <p className="empty">No posts yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}
