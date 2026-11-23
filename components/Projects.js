import Image from 'next/image';
import { projects } from '../data/portfolio';
import TechChip from './TechChip';

export default function Projects() {
  return (
    <section id="projects">
      <div className="in">
        <h2>Featured project</h2>
        <p className="sub">
          Corporate transportation, made simpler through automation and real-time fleet management.
        </p>
        <div className="stag">
          {projects.map((p) => (
            <article className="card prj" key={p.id}>
              <div className="prj-image-wrap">
                <Image
                  src={p.image}
                  alt={p.imageAlt || p.title}
                  width={941}
                  height={1672}
                  sizes="(max-width: 860px) 90vw, 320px"
                  className="prj-image"
                />
              </div>
              <div className="prj-details">
                <div className="jh">
                  <h3>{p.title}</h3>
                  <span className="chip">{p.period}</span>
                </div>
                <p>{p.description}</p>
                <h4>Core capabilities</h4>
                <ul className="ft">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <h4>Technology stack</h4>
                {p.techGroups.map((g) => (
                  <div className="tech-group" key={g.category}>
                    <span className="tech-category">{g.category}</span>
                    <div className="wrapchips">
                      {g.items.map((t) => (
                        <TechChip key={t.id} id={t.id} label={t.label} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
