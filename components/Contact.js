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
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const next = {};
    Object.keys(rules).forEach((k) => {
      if (!rules[k](String(data[k] ?? ''))) next[k] = true;
    });
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('idle');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('send_failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
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
              <span>{profile.email}</span>
            </a>
            <a href={profile.phoneHref}>
              <FaPhoneAlt aria-hidden="true" />
              <span>{profile.phone}</span>
            </a>
            <a className="ext" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn aria-hidden="true" />
              <span>linkedin.com/in/natesh-l</span>
            </a>
            <a className="ext" href={profile.github} target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" />
              <span>github.com/natesh16</span>
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
          <div className="hp" aria-hidden="true">
            <label htmlFor="cf-company">Company</label>
            <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
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
          <button className="btn p" type="submit" disabled={status === 'sending'}>
            <FaEnvelope aria-hidden="true" />
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          <div id="fb" role="status" aria-live="polite">
            {status === 'success' ? (
              <p className="fb-ok">
                Thanks &mdash; your message has been sent. I&rsquo;ll reply soon.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="fb-err">
                Sorry, the message could not be sent. Please email{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a> directly.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
