'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { profile } from '../data/portfolio';

const rules = {
  name: (v) => v.trim().length > 1,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  subject: (v) => v.trim().length > 1,
  message: (v) => v.trim().length >= 10,
};

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn, external: true },
  { label: 'GitHub', href: profile.github, Icon: FaGithub, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: FaEnvelope },
  { label: 'Phone', href: profile.phoneHref, Icon: FaPhoneAlt },
];

export default function Contact() {
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const next = {};
    Object.keys(rules).forEach((k) => {
      if (!rules[k](String(data[k] ?? ''))) next[k] = true;
    });
    setErrors(next);
    if (Object.keys(next).length) {
      setFeedback(null);
      return;
    }
    // No backend: open the visitor's email app with the message ready to send.
    const body = `${data.message}\n\n${data.name} (${data.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      data.subject
    )}&body=${encodeURIComponent(body)}`;
    setFeedback('s');
    form.reset();
  };

  const field = (id, label, error, control) => (
    <div className={`f${errors[id] ? ' bad' : ''}`}>
      <label htmlFor={`cf-${id}`}>{label}</label>
      {control}
      <span className="e">{error}</span>
    </div>
  );

  return (
    <section id="contact">
      <div className="in ct">
        <div>
          <h2>Have an idea? Let&rsquo;s build something meaningful.</h2>
          <p className="sub">Send a message, or reach me directly.</p>
          <div className="cl">
            <a href={`mailto:${profile.email}`}>
              <FaEnvelope aria-hidden="true" />
              {profile.email}
            </a>
            <a href={profile.phoneHref}>
              <FaPhoneAlt aria-hidden="true" />
              {profile.phone}
            </a>
            <a className="ext" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn aria-hidden="true" />
              linkedin.com/in/natesh-l
            </a>
            <a className="ext" href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" />
              github.com/natesh16
            </a>
          </div>
          <div className="soc">
            {socials.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
               
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <form className="card" noValidate onSubmit={onSubmit}>
          {field(
            'name',
            'Name',
            'Enter your name.',
            <input
              id="cf-name"
              name="name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              required
            />
          )}
          {field(
            'email',
            'Email address',
            'Enter a valid email address.',
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              required
            />
          )}
          {field(
            'subject',
            'Subject',
            'Add a subject.',
            <input id="cf-subject" name="subject" aria-invalid={!!errors.subject} required />
          )}
          {field(
            'message',
            'Message',
            'Write at least 10 characters.',
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              aria-invalid={!!errors.message}
              required
            />
          )}
          <button className="btn p" type="submit" >
            <FaEnvelope aria-hidden="true" />
            Send message
          </button>
          <div id="fb" className={feedback ?? undefined} role="status" aria-live="polite">
            {feedback === 's' ? (
              <>
                Your email app should open with the message ready to send. If it doesn&rsquo;t,
                write to <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
