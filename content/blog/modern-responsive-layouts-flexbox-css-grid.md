---
title: "Modern Responsive Layouts with Flexbox and CSS Grid"
date: 2026-11-27
summary: "Learn responsive web design with CSS Flexbox and Grid. Build a sticky navbar, a reflowing 3-column portfolio grid with repeat(auto-fit, minmax(250px, 1fr)), and mobile-first media queries."
tags: CSS, Flexbox, CSS Grid, Responsive Design, Web Development, Beginner
---

More than half of global web traffic now comes from mobile devices, and Google indexes the mobile version of a page first. Yet most layout bugs still appear on a phone: a navigation bar that overflows, cards squeezed into one skinny column, or a horizontal scrollbar that shows up out of nowhere.

The fix is rarely "add more media queries". It is choosing the right layout tool. **CSS Flexbox** handles one-dimensional layout, such as a row of links, a toolbar, or the internal stack of a card. **CSS Grid** handles two-dimensional layout, such as a full page shell or a gallery of cards that reflows on its own.

This guide covers both, then combines them into a sticky responsive navbar and a three-column project portfolio grid that collapses cleanly to a single column on a 320px screen.

> **Quick answer:** Use Flexbox for rows and columns of components, and CSS Grid for page-level two-dimensional layouts. Write mobile-first CSS, enhance it with `@media (min-width: 768px)`, and let card grids reflow with `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` instead of hard-coding a column count for every screen size.

## Table of contents

- [Why Responsive Layouts Matter](#why-responsive-layouts-matter)
- [Start with the Viewport Meta Tag](#start-with-the-viewport-meta-tag)
- [1. Flexbox Essentials: One Dimension at a Time](#1-flexbox-essentials-one-dimension-at-a-time)
- [2. A Sticky Responsive Navbar with Flexbox](#2-a-sticky-responsive-navbar-with-flexbox)
- [3. CSS Grid Essentials: Two Dimensions at a Time](#3-css-grid-essentials-two-dimensions-at-a-time)
- [4. Flexbox vs CSS Grid: Which Should You Use?](#4-flexbox-vs-css-grid-which-should-you-use)
- [5. Mobile-First Media Queries and Breakpoints](#5-mobile-first-media-queries-and-breakpoints)
- [Hands-On: Build a Responsive 3-Column Portfolio Grid](#hands-on-build-a-responsive-3-column-portfolio-grid)
- [Responsive Design Details That Beginners Miss](#responsive-design-details-that-beginners-miss)
- [Debug Responsive Layouts in DevTools](#debug-responsive-layouts-in-devtools)
- [Common Flexbox and Grid Mistakes](#common-flexbox-and-grid-mistakes)
- [Quick Checklist](#quick-checklist)
- [Conclusion and Next Steps](#conclusion-and-next-steps)

## Why Responsive Layouts Matter

A responsive website adapts its layout to the width of the screen instead of serving a separate mobile site. That means one HTML document, one stylesheet, and one set of components that work from a 320px phone to a 4K monitor.

Three practical reasons this matters:

- **Traffic:** most visitors arrive on a phone, often on a slow connection and with one thumb available.
- **SEO:** Google uses mobile-first indexing, so the mobile rendering of your page is the version it crawls and ranks.
- **Maintenance:** fixed-width layouts and separate mobile templates double the work and drift out of sync within weeks.

Before Flexbox and Grid, developers built layouts with `float`, `clearfix` hacks and absolute positioning. Those techniques still exist, but they were never designed for layout. Modern CSS gives you two purpose-built systems:

- **Flexbox** distributes space along **one axis** at a time: a row *or* a column.
- **Grid** places items on **two axes** at once: rows *and* columns.

That single distinction explains most "should I use Flexbox or Grid?" questions.

## Start with the Viewport Meta Tag

None of the CSS below works correctly without this line in the `<head>` of every page:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` tells the browser to use the device's real width as the layout viewport instead of pretending to be a 980px desktop screen. `initial-scale=1.0` sets the starting zoom level.

Without it, a phone renders your page at desktop width, shrinks it, and every media query fires at the wrong size. The result is tiny text and a layout that looks broken even when the CSS is perfect.

Two accessibility notes:

- **Never add `user-scalable=no` or `maximum-scale=1`.** Blocking zoom prevents low-vision users from enlarging text.
- Keep font sizes in `rem` so the page respects the user's browser font settings.

## 1. Flexbox Essentials: One Dimension at a Time

You turn a parent element into a flex container with `display: flex`. Its direct children become flex items and line up along the **main axis**.

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
```

| Property | What it controls | Common values |
| --- | --- | --- |
| `display` | Turns the parent into a flex container | `flex`, `inline-flex` |
| `flex-direction` | Direction of the main axis | `row`, `column` |
| `justify-content` | Alignment along the **main** axis | `flex-start`, `center`, `space-between` |
| `align-items` | Alignment along the **cross** axis | `stretch`, `center`, `baseline` |
| `flex-wrap` | Whether items stay on one line | `nowrap`, `wrap` |
| `gap` | Space between items | `8px`, `1rem`, `2%` |

### justify-content vs align-items

This is the number one Flexbox confusion. The answer depends on `flex-direction`:

- With `flex-direction: row` (the default), the main axis is horizontal. `justify-content` moves items left and right; `align-items` moves them up and down.
- With `flex-direction: column`, the axes swap. `justify-content` moves items up and down; `align-items` moves them left and right.

Common `justify-content` values:

| Value | Result |
| --- | --- |
| `flex-start` | Pack items at the start of the main axis |
| `center` | Center the group |
| `flex-end` | Pack items at the end |
| `space-between` | First and last item touch the edges, equal gaps between |
| `space-around` | Equal space around each item |
| `space-evenly` | Equal space between items and edges |

`align-items` is usually simpler: `stretch` (the default) makes items fill the cross axis, `center` vertically centers them in a row, `flex-start` and `flex-end` align to the top or bottom, and `baseline` lines up text baselines. Use `baseline` when a heading and a paragraph sit side by side and should share a text line.

### gap replaces margin hacks

Before `gap`, developers added `margin-right` to every child and then removed it from `:last-child`. `gap` does the same job in one line, works in both Flexbox and Grid, and never adds space on the outer edges.

```css
.nav-links {
  display: flex;
  gap: 8px; /* no margin cleanup needed */
}
```

### flex-wrap and the flexible card row

By default, flex items shrink to stay on one line. That is fine for a navbar with three links and terrible for cards. `flex-wrap: wrap` lets items move to the next line when they run out of room.

Combine it with the `flex` shorthand:

```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card-row > * {
  flex: 1 1 240px; /* grow, shrink, ideal width */
}
```

`flex: 1 1 240px` means "start at 240px, grow to fill leftover space, shrink if needed". Cards wrap automatically as the screen narrows, with no media query at all. This is the content-driven approach to responsive design: let the content decide when to break, not an arbitrary device width.

### The margin-top: auto trick

A flex item with `margin-top: auto` absorbs all free space above it. It is the cleanest way to push a "Read more" link to the bottom of a card, so every card in a row lines up even when the descriptions differ in length.

```css
.card {
  display: flex;
  flex-direction: column;
}

.card-link {
  margin-top: auto; /* pinned to the bottom */
}
```

## 2. A Sticky Responsive Navbar with Flexbox

A sticky navigation bar stays at the top of the viewport while the page scrolls. It is one of the most common Flexbox patterns in real projects, and it needs no JavaScript.

### The HTML

```html
<header class="site-header">
  <nav class="nav" aria-label="Main navigation">
    <a class="brand" href="/">natesh<span>.dev</span></a>
    <ul class="nav-menu">
      <li><a href="#work">Work</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>
```

### The CSS

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(248 250 252 / 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1100px;
  margin-inline: auto;
  padding: 12px 20px;
}

.brand {
  font-size: 1.125rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
}

.brand span {
  color: #2563eb;
}

.nav-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-menu a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  color: #334155;
  font-weight: 500;
  text-decoration: none;
}

.nav-menu a:hover,
.nav-menu a:focus-visible {
  background: #e0edff;
  color: #1d4ed8;
}

@media (min-width: 640px) {
  .nav-menu {
    width: auto;
    justify-content: flex-end;
  }
}
```

Why this works:

- `position: sticky` keeps the header in normal flow but pins it to `top: 0` once you scroll past it. A fixed header removes space from the layout; sticky does not.
- `flex-wrap: wrap` lets the menu drop to a second row on small screens. The brand takes the first row, the links take the second, and nothing overflows.
- `width: 100%` on `.nav-menu` is the mobile-first default. At `640px` and up, the media query switches it to `width: auto` so brand and links share one row.
- `min-height: 44px` gives each link a comfortable tap target. Tiny text links are the most common mobile usability complaint.
- `backdrop-filter: blur(10px)` frosts the content scrolling underneath. If a browser does not support it, the semi-transparent background still works.

Two gotchas worth knowing:

1. **Sticky fails inside an ancestor with `overflow: hidden` or `overflow: auto`.** The element sticks to that scroll container, not the page. Check the parent chain before debugging your CSS.
2. **Anchor targets hide under the header.** Add `scroll-margin-top` so a link to `#work` does not land with the heading tucked behind the navbar.

```css
:target {
  scroll-margin-top: 84px; /* slightly taller than the header */
}
```

A hamburger menu with a toggle button needs JavaScript for the open and close state. If you want a CSS-only disclosure today, use the native `<details>` element or let the links wrap as shown above. Both are accessible without a script.

## 3. CSS Grid Essentials: Two Dimensions at a Time

Grid places items into rows and columns at the same time. You describe the layout on the **container**, and the browser handles the placement.

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

That gives three equal columns. The `fr` unit means "one fraction of the free space after gaps and fixed tracks are subtracted", so the columns stay equal at any width.

### The one line that replaces a dozen breakpoints

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}
```

Read it from the inside out:

| Part | Meaning |
| --- | --- |
| `minmax(250px, 1fr)` | Each column is at least 250px wide and can grow to share leftover space |
| `repeat(...)` | Repeat that column pattern as many times as needed |
| `auto-fit` | Create as many tracks as fit, then collapse the empty ones |
| `1fr` | Each surviving track gets an equal fraction of the free space |

At 1200px you get three or four columns. At 700px you get two. At 360px you get one. No media queries, no column-count overrides, no JavaScript.

### auto-fit vs auto-fill

These two keywords behave the same until the grid has leftover space:

```css
/* auto-fill keeps empty tracks, so cards stay at their minimum width */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

/* auto-fit collapses empty tracks, so cards stretch to fill the row */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Use `auto-fit` for card galleries where you want the last row to fill the width. Use `auto-fill` when you want a consistent card width and empty space at the end, such as a photo contact sheet.

### Guard against very narrow screens

`minmax(250px, 1fr)` can still overflow a 240px-wide container. Wrap the minimum in `min()` so the track never exceeds the container:

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
```

`min(100%, 250px)` resolves to `100%` on tiny screens and `250px` everywhere else. It is a one-line safety net against horizontal scrolling.

### Named areas for page-level layout

For a dashboard or documentation shell, `grid-template-areas` is easier to read than column numbers:

```css
.page-shell {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  grid-template-areas:
    "sidebar main"
    "footer  footer";
  gap: 24px;
}

.sidebar { grid-area: sidebar; }
.main    { grid-area: main; min-width: 0; }
.footer  { grid-area: footer; }
```

`minmax(0, 1fr)` on the main column prevents a long code block or URL from blowing the grid wider than the viewport. Grid items have an automatic minimum size, and `0` switches that off.

## 4. Flexbox vs CSS Grid: Which Should You Use?

The short version: **Grid for layout, Flexbox for components.** They are designed to work together, not compete.

| Question | Flexbox | CSS Grid |
| --- | --- | --- |
| Dimensions | One axis (row or column) | Two axes (rows and columns) |
| Best for | Navbars, toolbars, button groups, card internals | Page shells, dashboards, galleries, overlapping content |
| Sizing model | Content-out: items decide their size | Layout-in: the container defines the tracks |
| Wrapping | `flex-wrap` | Automatic row creation |
| Alignment | `justify-content`, `align-items` | `justify-items`, `align-items`, `place-items` |

Practical rules of thumb:

- A row of navigation links that should space out evenly: **Flexbox**.
- A card with a title, description and a footer link pinned to the bottom: **Flexbox** with `flex-direction: column`.
- A three-column portfolio gallery that reflows to one column: **Grid** with `auto-fit` and `minmax`.
- A full page with a sidebar, header and footer: **Grid**, with Flexbox inside each region.

If you are unsure, ask: "Do I need to control rows *and* columns at the same time?" If yes, Grid. If no, Flexbox.

## 5. Mobile-First Media Queries and Breakpoints

Mobile-first means the base styles target the smallest screen, and `min-width` media queries add complexity as space becomes available.

```css
/* Base: phones, one column */
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablets: two columns */
@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Laptops and up: three columns */
@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

This is the opposite of the older desktop-first pattern, which starts with a wide layout and uses `max-width` queries to strip features away. Mobile-first is easier to maintain because the simple case is the default and every enhancement is additive.

| Breakpoint | Typical target | What usually changes |
| --- | --- | --- |
| `480px` | Large phones | Type scale, button widths |
| `640px` | Small tablets | Navbar returns to one row, cards go two-up |
| `768px` | Tablets | Two-column content, larger spacing |
| `1024px` | Laptops | Three-column grids, sidebars appear |
| `1280px` | Desktops | Max-width containers, larger hero type |

Treat these as starting points, not laws. **Add a breakpoint when the layout looks wrong, not because a device exists.** Resize the browser slowly and watch for the moment a line of text becomes too long or a card becomes too narrow. That width is your real breakpoint.

### Fluid type with clamp

`clamp()` reduces the number of breakpoints you need for headings:

```css
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}
```

The three values are minimum, preferred and maximum. The heading scales with the viewport between 1.75rem and 3rem, and never becomes unreadably small or absurdly large.

### Respect reduced motion

Sticky headers, hover lifts and smooth scrolling are all motion. Some users turn motion off for medical reasons, so wrap non-essential animation:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Container queries, briefly

Media queries respond to the viewport. Container queries respond to the size of a parent component, which is ideal for reusable cards:

```css
.card-list {
  container-type: inline-size;
}

@container (min-width: 480px) {
  .card {
    grid-template-columns: 140px 1fr;
  }
}
```

You do not need container queries in your first project, but they are the modern answer to "this card looks wrong in the sidebar even though the page is wide".

## Hands-On: Build a Responsive 3-Column Portfolio Grid

Now combine everything into one page: a sticky Flexbox navbar, a responsive Grid of project cards, and mobile-first enhancements.

### Step 1: The HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Natesh — Frontend Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#work">Skip to work</a>

  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/">natesh<span>.dev</span></a>
      <ul class="nav-menu">
        <li><a href="#work">Work</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="work" class="portfolio">
    <div class="container">
      <header class="section-head">
        <p class="eyebrow">Selected work</p>
        <h2>Projects I have shipped</h2>
        <p>Three builds that show how I approach performance, accessibility and clean interface design.</p>
      </header>

      <div class="project-grid">
        <article class="card">
          <div class="thumb thumb-1" aria-hidden="true">01</div>
          <div class="card-body">
            <h3>Analytics Dashboard</h3>
            <p>Real-time charts on a MERN stack with role-based access and CSV export.</p>
            <ul class="tags">
              <li>React</li>
              <li>Node</li>
              <li>MongoDB</li>
            </ul>
            <a class="card-link" href="#">View case study</a>
          </div>
        </article>

        <article class="card">
          <div class="thumb thumb-2" aria-hidden="true">02</div>
          <div class="card-body">
            <h3>CI/CD Release Bot</h3>
            <p>GitHub Actions pipeline that tags, tests and ships a container in under four minutes.</p>
            <ul class="tags">
              <li>Docker</li>
              <li>AWS</li>
              <li>Actions</li>
            </ul>
            <a class="card-link" href="#">View case study</a>
          </div>
        </article>

        <article class="card">
          <div class="thumb thumb-3" aria-hidden="true">03</div>
          <div class="card-body">
            <h3>Accessible Design System</h3>
            <p>Forty components documented with tokens, keyboard states and WCAG contrast checks.</p>
            <ul class="tags">
              <li>CSS</li>
              <li>A11y</li>
              <li>Tokens</li>
            </ul>
            <a class="card-link" href="#">View case study</a>
          </div>
        </article>
      </div>
    </div>
  </main>
</body>
</html>
```

### Step 2: The CSS

```css
/* 1. Reset and base */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
  color: #0f172a;
  background: #f8fafc;
}

img {
  display: block;
  max-width: 100%;
}

:target {
  scroll-margin-top: 84px;
}

/* 2. Shared container */
.container {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 20px;
}

/* 3. Skip link */
.skip-link {
  position: absolute;
  top: -60px;
  left: 16px;
  z-index: 100;
  padding: 10px 16px;
  border-radius: 8px;
  background: #1d4ed8;
  color: #ffffff;
}

.skip-link:focus {
  top: 16px;
}

/* 4. Sticky Flexbox navbar */
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(248 250 252 / 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1100px;
  margin-inline: auto;
  padding: 12px 20px;
}

.brand {
  font-size: 1.125rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
}

.brand span {
  color: #2563eb;
}

.nav-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-menu a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  color: #334155;
  font-weight: 500;
  text-decoration: none;
}

.nav-menu a:hover,
.nav-menu a:focus-visible {
  background: #e0edff;
  color: #1d4ed8;
}

/* 5. Page section */
.portfolio {
  padding-block: 40px 64px;
}

.section-head {
  max-width: 62ch;
  margin-bottom: 32px;
}

.section-head h2 {
  margin: 0 0 8px;
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
  line-height: 1.2;
}

.section-head p {
  margin: 0;
  color: #475569;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

/* 6. Responsive project grid */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 24px;
}

/* 7. Cards */
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgb(15 23 42 / 0.08);
}

.card:focus-within {
  outline: 3px solid #93c5fd;
  outline-offset: 2px;
}

.thumb {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.thumb-1 {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.thumb-2 {
  background: linear-gradient(135deg, #0f766e, #22c55e);
}

.thumb-3 {
  background: linear-gradient(135deg, #b45309, #f59e0b);
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
}

.card-body h3 {
  margin: 0;
  font-size: 1.125rem;
}

.card-body p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 2px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.75rem;
}

.card-link {
  margin-top: auto;
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
}

.card-link:hover,
.card-link:focus-visible {
  text-decoration: underline;
}

/* 8. Mobile-first enhancements */
@media (min-width: 640px) {
  .nav-menu {
    width: auto;
    justify-content: flex-end;
  }
}

@media (min-width: 900px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .portfolio {
    padding-block: 56px 80px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Step 3: Understand the key lines

- **`.project-grid`** uses `auto-fit` and `minmax(min(100%, 260px), 1fr)`. It creates as many columns as fit, never overflows a narrow screen, and needs no breakpoints for the 1-2 column range.
- **`.card`** is a column flex container. That lets `margin-top: auto` on the link push it to the bottom, so all three cards align even with different description lengths.
- **`.nav`** uses `flex-wrap` and `justify-content: space-between`. On mobile the menu wraps below the brand; at `640px` it moves back beside it.
- **`@media (min-width: 900px)`** locks the grid at exactly three columns, which is the "3-column portfolio" requirement. Without it, a 1200px container could fit four.
- **`aspect-ratio: 16 / 10`** keeps the thumbnail proportional at every width, so the grid does not jump while images load.

### Step 4: Test it like a user

Resize the browser from 1440px down to 320px and check:

- The navbar never overflows or overlaps the brand.
- Cards go three columns, then two, then one, with no horizontal scrollbar.
- The "View case study" links sit on the same baseline across a row.
- Tab through the page. Every link shows a visible focus ring, including inside the cards.
- The sticky header does not cover the "Projects I have shipped" heading when you click "Work".

## Responsive Design Details That Beginners Miss

**Give every interactive element a 44px target.** Fingers are not cursors. A link with 12px text and no padding is technically clickable and practically frustrating. `min-height: 44px` with horizontal padding solves it.

**Only apply hover effects on devices that hover.** On touch screens, `:hover` can stick after a tap and leave a card raised until the user taps elsewhere:

```css
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
  }
}
```

**Prevent horizontal scrolling at the source.** Long URLs, unbroken strings and wide tables are the usual culprits. Use `overflow-wrap: anywhere` on prose, `max-width: 100%` on media, and `min-width: 0` on flex and grid children that contain long content.

**Test reflow at 320 CSS pixels and 200% zoom.** WCAG expects content to remain usable without two-dimensional scrolling at that size. It is also a realistic proxy for a small phone in landscape.

**Use `srcset` for large images.** A 2000px hero image downloaded on a phone wastes bandwidth and delays the largest contentful paint. `max-width: 100%` prevents overflow; `srcset` and `sizes` prevent waste.

**Do not hide content on mobile.** `display: none` on a key section is easy to ship and hard to notice. If something is not important enough for a phone, question whether it belongs on the page at all.

**Check color contrast in every state.** Hover, focus and disabled styles need at least 4.5:1 for body text. A light gray placeholder or a pale focus ring fails more often than the default text color.

**Keep the reading measure under control.** Paragraphs wider than about 75 characters are tiring to read. `max-width: 62ch` on text blocks is a cheap fix on large monitors.

## Debug Responsive Layouts in DevTools

1. Open DevTools and toggle the **device toolbar** (`Ctrl + Shift + M`).
2. Pick "Responsive" and drag the width handle slowly. Watch where the layout breaks instead of jumping between preset devices.
3. Select the grid container. Chrome and Edge show a **grid badge** in the Elements panel; click it to overlay track lines and gaps.
4. Select a flex container to see the **flex badge**, which highlights the main and cross axes.
5. Use the **Computed** tab to confirm the actual width, gap and padding after the cascade resolves.
6. Run a **Lighthouse** mobile audit for tap targets, viewport configuration and horizontal overflow.

If a grid item is wider than its track, inspect its content first. A `<pre>` block, a long word or a fixed-width image is usually the cause, and `min-width: 0` or `overflow-wrap: anywhere` fixes it.

## Common Flexbox and Grid Mistakes

- Forgetting `display: flex` or `display: grid` on the **parent** and styling the children instead.
- Confusing `justify-content` with `align-items` because `flex-direction` changed the axes.
- Using `flex-wrap: nowrap` for cards, then wondering why they shrink into unreadable slivers.
- Adding `margin` to every flex child instead of using `gap`.
- Forgetting `min-width: 0` on a flex or grid child that contains long text.
- Using fixed `height` on cards, so longer descriptions overflow or clip.
- Hard-coding `grid-template-columns: repeat(3, 1fr)` and then adding five media queries to undo it on mobile.
- Using `auto-fill` when `auto-fit` was needed, leaving an awkward empty column.
- Putting `position: sticky` inside a parent with `overflow: hidden`.
- Forgetting `scroll-margin-top`, so anchor links land under the sticky header.
- Testing only in a desktop browser window and never at 320px.
- Blocking zoom with `user-scalable=no`.

## Quick Checklist

Before you ship a responsive layout:

- The viewport meta tag is present and zoom is not disabled.
- Base styles target mobile; enhancements use `min-width` media queries.
- The navbar wraps or stacks cleanly at 320px.
- Cards reflow without horizontal scrolling.
- Every interactive element has a visible `:focus-visible` state.
- Tap targets are at least 44px tall.
- Body text stays between roughly 45 and 75 characters per line.
- Anchor links clear the sticky header.
- Images use `max-width: 100%` and, where it matters, `srcset`.
- `prefers-reduced-motion` is respected.
- The page works at 200% zoom.
- DevTools shows no element wider than the viewport.

## Conclusion and Next Steps

Responsive layout stops feeling like guesswork once you match the tool to the job. **Flexbox** aligns items along one axis: navbars, toolbars, card internals and button rows. **Grid** places items on two axes: page shells, dashboards and galleries. Combine them, write mobile-first CSS, and let `repeat(auto-fit, minmax(250px, 1fr))` handle the reflow instead of a stack of device-specific breakpoints.

Your action items:

1. Add the viewport meta tag to every page.
2. Build the sticky Flexbox navbar and confirm it wraps at 320px.
3. Replace any fixed-column gallery with an `auto-fit` Grid.
4. Add one `min-width` media query only where the layout actually breaks.
5. Tab through the result and fix every missing focus state.

If you want the foundation underneath this layout, revisit [CSS fundamentals: selectors, colors and the box model](/blog/css-fundamentals-selectors-colors-box-model) and the [complete HTML guide](/blog/complete-html-guide-beginner-to-advanced). Clean markup and predictable box sizing make Flexbox and Grid far easier to reason about.

A layout is only half of an interface, though. The next layer is behaviour: JavaScript, the DOM and event handling, which turn a static portfolio into something visitors can actually operate. Get this page solid first, then add interactivity one small feature at a time.
