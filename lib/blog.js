import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'content', 'blog');

function parse(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  if (m) {
    m[1].split('\n').forEach((line) => {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    });
  }
  return { meta, body: m ? m[2] : text };
}

function load(file) {
  const slug = file.replace(/\.md$/, '');
  const { meta, body } = parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: meta.title || slug.replace(/-/g, ' '),
    date: meta.date || '',
    summary: meta.summary || '',
    tags: (meta.tags || '').replace(/[\[\]]/g, '').split(',').map((t) => t.trim()).filter(Boolean),
    draft: meta.draft === 'true',
    minutes: Math.max(1, Math.round(words / 200)),
    body,
  };
}

export function getPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map(load)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug) => getPosts().find((p) => p.slug === slug) ?? null;

export function formatDate(d) {
  const t = new Date(d);
  return Number.isNaN(t.getTime())
    ? d
    : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
