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
        <a href={profile.resume} download={profile.resumeFileName}>Resume</a>
      </span>
    </footer>
  );
}
