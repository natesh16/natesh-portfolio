import Image from 'next/image';
import { FaDownload, FaEnvelope } from 'react-icons/fa';
import { profile } from '../data/portfolio';

export default function Hero() {
  return (
    <section id="home">
      <div className="in hg">
        <div className="hero-copy">
          <p className="loc">{profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.title}</p>
          <p className="intro">{profile.intro}</p>
          <div className="acts">
            <a className="btn p" href={profile.resume} download={profile.resumeFileName}>
              <FaDownload aria-hidden="true" /> Download resume
            </a>
            <a className="btn" href="#contact">
              <FaEnvelope aria-hidden="true" /> Contact me
            </a>
          </div>
        </div>
        <div className="art">
          <Image
            className="pt"
            src="/profile.png"
            width={1106}
            height={1422}
            sizes="(max-width: 860px) 70vw, 340px"
            priority
            alt={`${profile.name}, ${profile.title.toLowerCase()}`}
          />
        </div>
      </div>
    </section>
  );
}
