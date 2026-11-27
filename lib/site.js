// Canonical site details used by metadata, JSON-LD, the sitemap and the feed.
export const SITE_URL = 'https://natesh.online';
export const SITE_NAME = 'Natesh';
export const SITE_TITLE =
  'Natesh — Full-Stack Developer, E-Commerce & SEO Consultant';
export const SITE_TAGLINE =
  'High-converting websites, scalable web apps & SEO for global businesses';
export const SITE_DESCRIPTION =
  'Full-stack developer building high-converting websites, scalable web apps, e-commerce stores and technical SEO for brands in the US, UK and Middle East.';

export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();

// JSON.stringify can contain "</script>" inside frontmatter text. Escaping "<"
// keeps the inline JSON-LD script safe without changing the parsed data.
export const jsonLdString = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
