
import { projects } from '../data/portfolio';
import TechChip from './TechChip';

export default function Projects() {
  return (
    <section id="projects">
      <div className="in">
        <h2>Featured Project</h2>

        <p className="sub">
          Building smarter corporate transportation through
          intelligent automation and real-time fleet management.
        </p>

        <div className="g1" id="pj">
          {projects.map((p) => (
            <article
              className="card prj"
              data-tilt
              key={p.id}
            >
              {/* Project Preview */}
              <div className="th prj-image-wrap">
                <img
                  src={p.image}
                  alt={p.imageAlt || p.title}
                  className="prj-image"
                  loading="lazy"
                />
              </div>

              {/* Project Content */}
              <div className="prj-details">

                <div className="jh">
                  <h3>{p.title}</h3>
                  <span className="chip">{p.period}</span>
                </div>

                <p>{p.description}</p>

                <h4>Core Capabilities</h4>

                <ul className="ft">
                  {p.features.slice(0, 5).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                
<h4>Technology Stack</h4>

<div className="tech-groups">
  {p.techGroups.map((group) => (
    <div className="tech-group" key={group.category}>
      <span className="tech-category">
        {group.category}
      </span>

      <div className="tech-list">
        {group.items.map((tech) => (
          <TechChip
            key={tech.id}
            id={tech.id}
            label={tech.label}
          />
        ))}
      </div>
    </div>
  ))}
</div>


              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
