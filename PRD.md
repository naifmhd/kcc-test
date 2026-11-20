# PRD — Grocery Shop Landing Page

**Status:** Approved (Template A, Sage Garden theme). v1 built.
**Date:** 2026-11-20
**Working name:** "Fresh Basket" (placeholder. Swap in the real shop name.)

---

## 1. Overview

A one-page marketing site for a small neighbourhood grocery shop. It should feel fresh, colourful and friendly. It should show what the shop sells, let visitors find and contact the shop, and collect customer feedback through a form.

This project replaces the current static `index.html` with a **Next.js** app styled with **shadcn/ui**.

## 2. Goals & Non-Goals

### Goals
- Make a strong first impression with a full-width, auto-playing **hero image slider**.
- Show the shop's product categories, opening hours, location and contact details.
- Collect **customer feedback** through a validated form with clear success and error states.
- Work well on phones first, then on desktop. Load fast (Lighthouse ≥ 90 for Performance, Accessibility, Best Practices and SEO).
- Use clean, conventional code: the shadcn component structure, TypeScript and server-side validation.

### Non-Goals (v1)
- Online ordering, cart, checkout or payments
- User accounts or login
- CMS or admin panel (content lives in code and config files)
- Storing feedback in a database (see Open Questions)
- Multiple languages

## 3. Target Users
- **Local shoppers** who check hours, location and what's in stock on their phone.
- **New residents and passers-by** finding the shop through search or Google Maps.
- **Regular customers** who want to leave feedback or suggestions.

## 4. Page Structure & Requirements

The page is a single route (`/`) with these sections, in order:

| # | Section | Requirements |
|---|---------|--------------|
| 1 | **Header / Navbar** | Sticky header with logo/name and anchor links (Products, About, Visit Us, Feedback). On mobile, the links collapse into a shadcn `Sheet` menu. Includes a "Call us" button. |
| 2 | **Hero Slider** | Full-width shadcn `Carousel` (Embla) with **3–4 slides**. Each slide has a large, colourful photo, a headline, a short tagline and a call-to-action button. Slides auto-advance every ~5 s and pause on hover or focus. Includes prev/next arrows and dot indicators, and supports swipe on mobile. A dark gradient overlay keeps the text readable. |
| 3 | **Highlights strip** | 3–4 small value tiles with icons (e.g. "Farm-fresh daily", "Local produce", "Fair prices", "Free local delivery"). Icons come from `lucide-react`. |
| 4 | **Product Categories** | Responsive grid of shadcn `Card`s: Fruits, Vegetables, Dairy & Eggs, Bakery, Pantry, Beverages. Each card has a colourful image, a title and a one-line description. Cards lift slightly on hover. |
| 5 | **Weekly Offers** *(optional, small)* | 2–3 featured deals shown as cards with a `Badge` (e.g. "20% off"). |
| 6 | **About Us** | Short story about the shop with an image on one side and text on the other. The two stack on mobile. |
| 7 | **Visit Us** | Address, opening hours (in a simple table or list), phone and email, plus an embedded Google Map (`iframe`, lazy-loaded). |
| 8 | **Feedback Form** | See §5. |
| 9 | **Footer** | Name, short tagline, contact details, social icons and copyright year. |

## 5. Feedback Form — Detailed Requirements

**Fields**

| Field | Type | Validation |
|-------|------|-----------|
| Name | text | Required, 2–60 characters |
| Email | email | Required, valid email |
| Phone | tel | Optional |
| Rating | 1–5 stars (custom star picker or shadcn `RadioGroup`) | Required |
| Category | `Select`: Product quality, Service, Pricing, Suggestion, Other | Required |
| Message | `Textarea` | Required, 10–1000 characters, with a live character counter |
| Consent | `Checkbox`: "I agree to be contacted about my feedback" | Optional |

**Behaviour**
- Client-side validation with **react-hook-form + zod**, using the shadcn form/field components. Errors appear inline under each field.
- Submission goes through a **Next.js Server Action** that **re-validates the data with the same zod schema** on the server, so the client is never trusted.
- Basic spam protection: a hidden honeypot field. The server rejects submissions where it has been filled.
- The submit button shows a loading state and is disabled while sending.
- On success, a **Sonner toast** says "Thanks for your feedback!" and the form resets. On error, a toast explains what went wrong and the form keeps its values.
- **v1 storage:** the Server Action logs the submission on the server and returns success. It is written so a real destination (email, Google Sheet, database) can be added later behind one function.

**Accessibility**
- Every input has a `<label>`. Errors are linked to their inputs with `aria-describedby`.
- The star rating works with the keyboard (arrow keys) and screen readers.

## 6. Design Direction

- **Mood:** soft, fresh and appetising, like a calm farmers' market rather than a loud supermarket chain. The photos bring the colour, and the UI stays gentle.
- **Colour palette:** soft, muted pastels, set as shadcn CSS variables in `globals.css` (Tailwind v4 theme tokens). The default is Sage Garden: sage `#4f7d5c`, peach `#f2a98a`, butter `#f3dd9b`, cream `#fbf9f4`. See §6.1 for every option.
- **Typography:** rounded, friendly display font for headings (e.g. *Poppins* or *Nunito*) and a clean sans-serif for body text. Fonts load through `next/font/google`.
- **Imagery:** high-quality, colourful photos from **Unsplash** (free licence) of fresh produce, market stalls, bread and so on. They are served through `next/image` with `images.unsplash.com` allowed in `remotePatterns`. They are responsive, lazy-loaded, and the first hero slide uses `priority`. Every image has meaningful `alt` text.
- **Shape and motion:** rounded corners (`--radius` ≈ 0.75rem), soft shadows and gentle hover transitions. Animations are turned off when the user has `prefers-reduced-motion` set.
- **Dark mode:** not required for v1. The tokens will be set up so it can be added later.

### 6.1 Mockup & Theme Options

An interactive mockup of the full page is in [`mockups/landing.html`](mockups/landing.html). Open it in a browser. It has a working slider, star rating and success toast, and a **theme switcher** in the bottom-right corner. The mockup is a plain HTML reference for layout and colour only. The real build uses Next.js and shadcn components.

**Soft palette.** All themes use muted pastel colours instead of saturated brights, with a calm, airy feel. Primary colours are dusty mid-tones, dark enough that white button text still passes WCAG AA contrast (≥ 4.5:1). Accents are pastel and use dark text on top.

**Pick one theme** (or a mix). Its colours become the shadcn CSS variables in `globals.css`:

| Theme | Primary | Accent | Highlight | Background | Feel |
|-------|---------|--------|-----------|------------|------|
| **Sage Garden** *(default)* | `#4f7d5c` sage | `#f2a98a` peach | `#f3dd9b` butter | `#fbf9f4` cream | Calm farmers' market |
| **Peach Sorbet** | `#a8664e` terracotta | `#f6c48f` apricot | `#c9dba3` pistachio | `#fffaf5` warm white | Warm, cosy, bakery-like |
| **Lavender Berry** | `#8a5a83` dusty plum | `#f3b5c4` rose | `#d9c8f0` lavender | `#fcf8fb` blush | Gentle, boutique |
| **Seafoam** | `#3f7f80` soft teal | `#f4b4a6` coral blush | `#bfe5d8` mint | `#f7fbfa` cool white | Fresh, clean, health-focused |
| **Soft Night** *(dark)* | `#8fcfa0` pale green | `#f0b48c` soft orange | `#e8d590` straw | `#1a201c` charcoal | Low-glare dark mode |

Soft Night could also ship as the **dark mode** of whichever light theme you choose, using a shadcn `.dark` class and a toggle.

### 6.2 Layout Templates

There are three layout options. Each one is a separate mockup with the same five-theme switcher, so **any layout works with any colour theme**.

| | **A — Classic Market** | **B — Market Bento** | **C — Fresh Magazine** |
|---|---|---|---|
| Mockup | [`mockups/landing.html`](mockups/landing.html) | [`mockups/template-b-bento.html`](mockups/template-b-bento.html) | [`mockups/template-c-magazine.html`](mockups/template-c-magazine.html) |
| Feel | Bold, familiar, conversion-focused | Modern, app-like, playful | Elegant, editorial, premium boutique |
| Header | Sticky full-width bar | Floating rounded "pill" nav | Promo top bar plus centred logo, links on either side |
| Slider | Full-bleed photo slider with headline overlay, arrows and dots | Split hero: text on the left, **stacked card slider** on the right with captions | Big serif headline above a **wide, rounded fade slider with thumbnail nav** |
| Categories | 3-column card grid | **Bento grid** (mixed tile sizes plus a coloured promo tile) | **Round photo "bubbles"** in a row |
| Offers | 3 offer cards | Horizontal **swipeable deals rail** | Single **"Deal of the Day" band** with a live countdown |
| Extra section | About with stats, Visit Us with map | **Customer testimonials** | **Zig-zag story** (01 / 02) |
| Feedback form | Side-by-side card, star rating, category select | Inside a **coloured banner** next to contact info, **emoji rating** | Centred card, **chip-style topic picker**, star rating |
| Fonts | Poppins + Inter | Poppins + Inter | **Fraunces (serif)** + Inter |
| shadcn pieces | Carousel, Card, Badge, Form | Carousel, Card, ScrollArea (rail), ToggleGroup (emoji) | Carousel (fade plugin), Avatar-style circles, ToggleGroup (chips) |

All three meet the requirements in §4–§5. They differ only in presentation, so the feedback form fields, validation and Server Action are the same whichever you pick.

## 7. Technical Specification

| Area | Choice |
|------|--------|
| Framework | **Next.js (latest stable, App Router)** with TypeScript, via `create-next-app` |
| Styling | **Tailwind CSS v4** |
| UI Components | **shadcn/ui** (CLI `init`, components added as needed): `button`, `card`, `carousel`, `badge`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `label`, `form`/`field`, `sheet`, `separator`, `sonner` |
| Carousel autoplay | `embla-carousel-autoplay` |
| Forms | `react-hook-form`, `zod`, `@hookform/resolvers` |
| Icons | `lucide-react` (ships with shadcn) |
| Package manager | npm (Node 20.19 is installed) |
| Linting | ESLint (Next config). Prettier is optional. |

**Proposed structure**
```
app/
  layout.tsx          # fonts, metadata, <Toaster/>
  page.tsx            # composes the sections (Server Component)
  globals.css         # Tailwind + shadcn theme tokens
  actions/feedback.ts # "use server" action
components/
  ui/                 # shadcn-generated components (not hand-edited)
  sections/           # header, hero-slider, highlights, categories, offers, about, visit-us, feedback-form, footer
lib/
  utils.ts            # cn() helper
  schemas/feedback.ts # shared zod schema (client + server)
  data.ts             # slides, categories, offers, hours, contact info
public/               # logo, favicon
```

**Best practices to follow**
- Components are Server Components by default. `"use client"` is used only where needed (carousel, form, mobile menu).
- All content (slides, categories, hours) lives in `lib/data.ts`, so changes don't mean touching the UI.
- One zod schema is shared between client and server.
- SEO: `metadata` export with title, description and Open Graph, plus semantic HTML (`header`, `main`, `section`, `footer`) and a single `h1`.
- `LocalBusiness` / `GroceryStore` JSON-LD structured data for local search.
- `next/image` for all images, with no layout shift.

**Housekeeping**
- Remove the old static `index.html`.
- Update `README.md` with setup and run instructions.
- Update `AGENTS.md`. It currently says "no framework, no package manager", which will no longer be true.

## 8. Acceptance Criteria
1. `npm run dev` starts the site. `npm run build` and `npm run lint` pass with no errors.
2. The hero slider auto-plays, pauses on hover, works with arrows, dots and swipe, and is keyboard accessible.
3. All sections render correctly at 375px, 768px and 1280px widths, with no horizontal scroll.
4. The feedback form blocks invalid input with inline messages, the server rejects invalid payloads, a valid submit shows a success toast and resets the form, and the honeypot blocks bots.
5. All images load through `next/image` and have alt text.
6. Lighthouse scores on mobile are ≥ 90 for Performance, Accessibility, Best Practices and SEO.

## 9. Open Questions (please confirm)
0. **Layout:** Template A, B or C from §6.2? You can also mix sections, e.g. B's hero with C's categories.
1. **Shop name, address, phone, hours:** use placeholders for now, or do you have real details?
2. **Feedback destination:** is logging on the server OK for v1, or should submissions be emailed (e.g. via Resend) or saved somewhere?
3. **Weekly Offers section:** keep it or drop it?
4. **Theme:** which soft palette from §6.1 (Sage Garden, Peach Sorbet, Lavender Berry, Seafoam)? Should Soft Night ship as a dark-mode toggle? Do you have your own logo?
5. **Images:** are Unsplash stock photos fine, or will you supply your own shop photos?
