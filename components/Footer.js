import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer>
      <span>
        &gt;_ © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}
      </span>
      <span>{profile.title}</span>
    </footer>
  );
}
