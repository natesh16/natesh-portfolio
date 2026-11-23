import React from 'react';

// Small, dependency-free Markdown renderer that returns React elements (no
// innerHTML). Supports headings, paragraphs, lists, quotes, code fences,
// images, rules, **bold**, *italic*, `code` and [links](url).

const safe = (u) => (/^(https?:|mailto:|\/|#)/i.test(u) ? u : '#');
const slugify = (s) => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '');

function inline(text, key = 'i') {
  const re = /(!\[([^\]]*)\]\(([^)\s]+)\)|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  const out = [];
  let last = 0;
  let m;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${n++}`;
    if (m[2] !== undefined) out.push(<img key={k} src={safe(m[3])} alt={m[2]} loading="lazy" />);
    else if (m[4]) {
      const href = safe(m[5]);
      const ext = /^https?:/i.test(href);
      out.push(
        <a key={k} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {m[4]}
        </a>
      );
    } else if (m[6]) out.push(<code key={k}>{m[6]}</code>);
    else if (m[7]) out.push(<strong key={k}>{m[7]}</strong>);
    else if (m[8]) out.push(<em key={k}>{m[8]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  let k = 0;
  const isBlock = (l) => /^(#{1,6}\s|```|>\s?|[-*]\s|\d+\.\s|---+$|!\[)/.test(l);

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const fence = line.match(/^```(\w*)/);
    if (fence) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      out.push(
        <pre key={k++} data-lang={fence[1] || undefined}>
          <code>{code.join('\n')}</code>
        </pre>
      );
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = Math.min(Math.max(h[1].length, 2), 4); // page title is the h1
      const Tag = `h${level}`;
      out.push(<Tag key={k++} id={slugify(h[2])}>{inline(h[2], `h${k}`)}</Tag>);
      i++;
      continue;
    }

    if (/^---+$/.test(line)) { out.push(<hr key={k++} />); i++; continue; }

    if (/^>\s?/.test(line)) {
      const q = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
      out.push(<blockquote key={k++}>{inline(q.join(' '), `q${k}`)}</blockquote>);
      continue;
    }

    const list = line.match(/^([-*]|\d+\.)\s+/);
    if (list) {
      const ordered = /\d/.test(list[1]);
      const items = [];
      while (i < lines.length && /^([-*]|\d+\.)\s+/.test(lines[i])) items.push(lines[i++].replace(/^([-*]|\d+\.)\s+/, ''));
      const Tag = ordered ? 'ol' : 'ul';
      out.push(<Tag key={k++}>{items.map((t, j) => <li key={j}>{inline(t, `l${k}-${j}`)}</li>)}</Tag>);
      continue;
    }

    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (img) {
      out.push(
        <figure key={k++}>
          <img src={safe(img[2])} alt={img[1]} loading="lazy" />
          {img[1] ? <figcaption>{img[1]}</figcaption> : null}
        </figure>
      );
      i++;
      continue;
    }

    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !isBlock(lines[i])) para.push(lines[i++]);
    out.push(<p key={k++}>{inline(para.join(' '), `p${k}`)}</p>);
  }
  return out;
}
