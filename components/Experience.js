import { experience } from '../data/portfolio';
import TechChip from './TechChip';

export default function Experience() {
  const { role, company, period, details, tech } = experience;
  return (
    <section id="experience">
      <div className="in">
        <h2>Experience</h2>
        <p className="sub">Freelance full-stack and DevOps work, from requirements to cloud deployment.</p>
        <div className="xp">
          <div className="card">
            <div className="jh">
              <div>
                <h3>{role}</h3>
                <span className="sc">{company}</span>
              </div>
              <span className="chip">{period}</span>
            </div>
            {details.map((d, i) => (
              <details key={d.title} open={i === 0}>
                <summary>{d.title}</summary>
                <p>{d.text}</p>
              </details>
            ))}
            <div className="wrapchips">
              {tech.map((t) => (
                <TechChip key={t.id} id={t.id} label={t.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
