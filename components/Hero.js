import Image from 'next/image';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import { profile } from '../data/portfolio';

const floaters = [
  { label: 'MERN', style: { left: '2%', top: '10%' } },
  { label: 'AWS', style: { right: '4%', top: '6%', animationDelay: '-2s' } },
  { label: 'Docker', style: { left: 0, bottom: '30%', animationDelay: '-3s' } },
  { label: 'Jenkins', style: { right: '12%', top: '46%', animationDelay: '-1s' } },
];

export default function Hero() {
  return (
    <section id="home">
      <div className="in hg">
        <div>
          <p className="loc">{profile.location}</p>
          <h1 aria-label={profile.name} id="h1">
            {[...profile.name].map((c, i) =>
              c === ' ' ? (
                <span className="sp" key={i} />
              ) : (
                <span className="ch" aria-hidden="true" key={i}>
                  <i>{c}</i>
                </span>
              )
            )}
          </h1>
          <p className="role" id="role" data-text={profile.title}>
            {profile.title}
          </p>
          <p className="intro">{profile.intro}</p>
          <div className="acts">
            <a
              className="btn p"
              href={profile.resume}
              download={profile.resumeFileName}
              data-mag
            >
              <FaDownload aria-hidden="true" />
              Download Resume
            </a>
            <a className="btn" href="#contact" data-go data-mag>
              <FaEnvelope aria-hidden="true" />
              Contact Me
            </a>
          </div>
        </div>
        <div className="art" id="art">
          <div className="ring" />
          <Image
            className="pt"
            src="/profile.png"
            width={1195}
            height={1536}
            sizes="(max-width: 860px) 70vw, 300px"
            loading="eager"
            alt={`${profile.name}, ${profile.title.toLowerCase()}`}
          />
          {floaters.map((f) => (
            <span className="fl" style={f.style} key={f.label}>
              {f.label}
            </span>
          ))}
          <aside className="term" aria-label="Profile summary">
            <div>natesh@portfolio:~</div>
            <div>
              <span className="cm">&gt; whoami</span>
              <br />
              {profile.name}
              <br />
              <span className="cm">&gt; role</span>
              <br />
              Full Stack + DevOps
              <br />
              <span className="cm">&gt; status</span>
              <br />
              <span className="ok">Building · Deploying ✓</span>
            </div>
          </aside>
        </div>
      </div>
      <div className="scr" aria-hidden="true">
        <i />
        Scroll
      </div>
    </section>
  );
}
