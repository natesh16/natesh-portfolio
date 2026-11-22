import { FaDownload } from 'react-icons/fa';
import { profile } from '../data/portfolio';

export default function ResumeSection() {
  return (
    <section id="resume">
      <div className="in two" style={{ alignItems: 'center' }}>
        <div>
          <h2>Take the full picture with you.</h2>
          <p className="sub">
            My resume covers experience, projects, skills, certifications and education on one page.
          </p>
          <a
            className="btn p"
            id="rs"
            href={profile.resume}
            download={profile.resumeFileName}
            data-mag
          >
            <FaDownload aria-hidden="true" />
            Download resume
          </a>
        </div>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div className="doc" aria-hidden="true">
            <i />
            <i />
            <i style={{ width: '80%' }} />
            <i />
            <i style={{ width: '55%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
