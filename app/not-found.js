import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page" id="main">
      <div className="in narrow">
        <p className="kicker">404</p>
        <h1 className="page-title">Page not found.</h1>
        <p className="sub">The page you are looking for does not exist or has moved.</p>
        <Link className="btn p" href="/">Back to home</Link>
      </div>
    </main>
  );
}
