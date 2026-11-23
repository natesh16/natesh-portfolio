
import { certifications } from '../data/portfolio';
import { getIcon } from '../lib/icons';

export default function Training() {
  return (
    <section id="training" className="training-section">
      <div className="in">

        <h2>Certifications & Training</h2>

        <p className="sub">
          Professional learning, technical certifications
          and continuous skill development.
        </p>

        <div className="g2 stag" id="tr">

          {certifications.map((c, index) => {
            const Icon = getIcon(c.icon);

            return (
              <article
                className="card cert"
                                                key={c.title}
                style={{
                  '--card-index': index,
                }}
              >
                <div className="cert-icon">
                  <Icon aria-hidden="true" />
                </div>

                <div className="cert-content">

                  <span className="y">
                    {c.issuer}
                  </span>

                  <h3>{c.title}</h3>

                  <span className="cert-note">
                    {c.note}
                  </span>

                </div>

                <div className="cert-arrow">
                  ↗
                </div>

              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}
