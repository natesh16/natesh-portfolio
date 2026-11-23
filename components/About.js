import { about } from '../data/portfolio';

export default function About() {
  return (
    <section id="about">
      <div className="in two">
        <div>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <span className="lbl">Technical interests</span>
          <div className="wrapchips">
            {about.interests.map((x) => (
              <span className="chip" key={x}>
                {x}
              </span>
            ))}
          </div>
          <span className="lbl">Focus</span>
          <p className="focus">{about.focus}</p>
        </div>
        <div>
          <ul className="tl">
            {about.journey.map((j) => (
              <li key={j.date}>
                <span className="d">{j.date}</span>
                <b>{j.title}</b>
                {j.sub ? <small>{j.sub}</small> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
