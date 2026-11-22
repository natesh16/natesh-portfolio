import { about } from '../data/portfolio';

// Each word is wrapped in a span so Effects can reveal the text word by word.
function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="w">{w}</span>{' '}
    </span>
  ));
}

export default function About() {
  return (
    <section id="about">
      <div className="in two">
        <div>
          <h2>{about.heading}</h2>
          <div id="ab">
            {about.paragraphs.map((p, i) => (
              <p key={i}>
                <Words text={p} />
              </p>
            ))}
          </div>
          <span className="lbl">Technical interests</span>
          <div>
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
          <ul className="tl" id="jr">
            <span className="ln" />
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
