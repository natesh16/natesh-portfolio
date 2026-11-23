import { skillGroups } from '../data/portfolio';
import TechChip from './TechChip';

export default function Skills() {
  return (
    <section id="skills">
      <div className="in">
        <div className="skills-head">
          <div>
            <span className="skills-kicker">Toolkit</span>
            <h2>Technical skills</h2>
            <p className="sub">
              A practical toolkit across full-stack development, cloud infrastructure,
              automation and electrical engineering.
            </p>
          </div>
          <div className="skills-summary" aria-label="Technical skill areas">
            <strong>{String(skillGroups.length).padStart(2, '0')}</strong>
            <span>skill domains</span>
          </div>
        </div>
        <div className="skills-grid stag">
          {skillGroups.map((group, index) => (
            <article className="card skill-card" key={group.title}>
              <div className="skill-card-top">
                <div className="skill-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="skill-count">{String(group.items.length).padStart(2, '0')} TOOLS</div>
              </div>
              <h3>{group.title}</h3>
              <p className="skill-description">{group.description}</p>
              <div className="skill-chips">
                {group.items.map((item) => (
                  <TechChip key={item.id} id={item.id} label={item.label} />
                ))}
              </div>
            </article>
          ))}
        </div>
        <p className="skills-note">
          Tools and technologies are selected from my project work, development practice
          and hands-on engineering experience.
        </p>
      </div>
    </section>
  );
}
