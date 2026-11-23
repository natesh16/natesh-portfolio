import { FaGraduationCap } from 'react-icons/fa';
import { education } from '../data/portfolio';

export default function Education() {
  return (
    <section id="education">
      <div className="in">
        <h2>Education</h2>
        <div className="stag ed">
          {education.map((e) => (
            <div className="card row" key={e.title}>
              <div>
                <span className="chip">{e.period}</span>
                <h3>{e.title}</h3>
                <span className="sc">{e.place}</span>
              </div>
              {e.score ? (
                <div>
                  <div className="cgpa">{e.score}%</div>
                  <span className="mono sc">Score</span>
                </div>
              ) : (
                <FaGraduationCap className="big-ic" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
