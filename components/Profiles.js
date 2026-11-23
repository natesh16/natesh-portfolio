import { FaGithub, FaLinkedinIn, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { profile } from '../data/portfolio';

const profiles = [
  {
    name: 'GitHub',
    label: 'Code repositories & project work',
    detail: 'Explore development projects, source code and technical experiments.',
    href: profile.github,
    Icon: FaGithub,
    tag: 'DEVELOPMENT',
  },
  {
    name: 'LinkedIn',
    label: 'Professional network',
    detail: 'Connect with me and follow my professional journey.',
    href: profile.linkedin,
    Icon: FaLinkedinIn,
    tag: 'PROFESSIONAL',
  },
];

export default function Profiles() {
  return (
    <section id="profiles">
      <div className="in">
        <span className="skills-kicker">Find me online</span>
        <h2>Developer profiles</h2>
        <p className="sub">Explore my code and connect with me professionally.</p>
        <div className="profile-grid stag">
          {profiles.map(({ name, label, detail, href, Icon, tag }) => (
            <a className="card profile-card" key={name} href={href} target="_blank" rel="noopener noreferrer">
              <div className="profile-card-head">
                <span className="profile-tag">{tag}</span>
                <FaArrowUpRightFromSquare aria-hidden="true" />
              </div>
              <div className="profile-icon"><Icon aria-hidden="true" /></div>
              <h3>{name}</h3>
              <strong>{label}</strong>
              <p>{detail}</p>
              <span className="profile-visit">Visit profile <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
