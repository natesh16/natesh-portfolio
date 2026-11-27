import Link from 'next/link';
import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer>
      <span>
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}
      </span>
      <span className="fl-links">
        <Link href="/blog">Blog</Link>
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#contact">Start a project</a>
      </span>
    </footer>
  );
}
