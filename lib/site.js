// Canonical site details used by metadata, JSON-LD, the sitemap and the feed.
export const SITE_URL = 'https://natesh.online';
export const SITE_NAME = 'Natesh L';
export const SITE_TITLE = 'Natesh L — Full Stack & DevOps Engineer';
export const SITE_DESCRIPTION =
  'Natesh L is a Full Stack Developer and DevOps Engineer building and deploying MERN applications on AWS with Docker, Jenkins and GitHub Actions.';

export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();

// JSON.stringify can contain "</script>" inside frontmatter text. Escaping "<"
// keeps the inline JSON-LD script safe without changing the parsed data.
export const jsonLdString = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
