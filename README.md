# Natesh L: Portfolio and Blog

Next.js (App Router) and React. No animation or 3D libraries.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node.js 20.9 or newer.

## Where to edit

- Portfolio text, links, skills, projects: `data/portfolio.js`
- Technology icons: `lib/icons.js`
- Design tokens (colours, spacing): top of `app/globals.css`
- Resume: replace `public/resume.pdf`; photo: `public/profile.png`

## Contact form email

The contact form posts to `app/api/contact/route.js`, which sends the message to your inbox through [Resend](https://resend.com).

1. Create a free Resend account using the email address that should receive messages.
2. Create an API key and copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY` in `.env.local` (and change `CONTACT_TO_EMAIL` if needed).
4. Restart the dev server.

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=nateshlakshmanan27@gmail.com
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
```

With the default `onboarding@resend.dev` sender, Resend only delivers to the email address on your Resend account. Once you verify your own domain in Resend, set `CONTACT_FROM_EMAIL` to an address on that domain, for example `Portfolio Contact <hello@natesh.online>`.

On Vercel or another host, add the same environment variables in the project settings. If `RESEND_API_KEY` is missing, the form shows the direct email address as a fallback instead of failing silently.

## Blog

Each post is one Markdown file in `content/blog/`. The file name becomes the URL (`my-post.md` → `/blog/my-post`).

```md
---
title: My post title
date: 2026-11-23
summary: One sentence shown on the list page.
tags: AWS, Docker
draft: false
---

Write in Markdown below the header.
```

Supported: `##` headings, paragraphs, lists, `> quotes`, fenced code blocks, images (`![alt](/image.png)`, put files in `public/`), **bold**, *italic*, `code` and links. Set `draft: true` to hide a post. The two sample posts can be deleted.

## Animation

Scroll reveals, the progress bar and the active nav link live in `components/Effects.js` (about 60 lines, IntersectionObserver only). Reduced-motion users see everything immediately.
