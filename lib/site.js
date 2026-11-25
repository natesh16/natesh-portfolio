// Canonical site details used by metadata, JSON-LD, the sitemap and the feed.
export const SITE_URL = 'https://natesh.online';
export const SITE_NAME = 'Natesh';
export const SITE_TITLE = 'Natesh | Full Stack Developer & DevOps Engineer';
export const SITE_DESCRIPTION =
  'Natesh — Full Stack Developer & DevOps Engineer. I build and deploy MERN applications on AWS and automate CI/CD pipelines with Jenkins, Docker and GitHub Actions, delivering scalable, secure and cost-efficient software.';

export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();

// JSON.stringify can contain "</script>" inside frontmatter text. Escaping "<"
// keeps the inline JSON-LD script safe without changing the parsed data.
export const jsonLdString = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
