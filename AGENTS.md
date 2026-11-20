# AGENTS.md

## Project
Landing page for a small neighbourhood grocery shop ("Fresh Basket", a placeholder name). Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **shadcn/ui** (Base UI, `base-nova` style). Requirements live in `PRD.md`. The chosen design is Template A in the soft "Sage Garden" theme (`mockups/landing.html`).

## Structure
- `app/layout.tsx`: fonts (Inter body, Poppins headings), metadata, `<Toaster />`
- `app/page.tsx`: composes the sections and adds `GroceryStore` JSON-LD
- `app/globals.css`: theme tokens. `:root` is Sage Garden and `.dark` is Soft Night. Extra tokens: `peach` and `butter`.
- `app/actions/feedback.ts`: Server Action. Re-validates with zod, has a honeypot check, and only logs submissions in v1.
- `components/sections/*`: one file per page section
- `components/ui/*`: shadcn-generated. Prefer re-adding with the shadcn CLI over hand-editing.
- `lib/data.ts`: **all page content** (shop info, hours, slides, categories, offers)
- `lib/schemas/feedback.ts`: zod schema shared by the client form and the server action
- `mockups/`: static HTML design mockups. Reference only, not part of the app.

## Conventions
- Server Components by default. Use `"use client"` only for interactive pieces (header sheet, slider, form).
- Change content in `lib/data.ts`, not in the components.
- Colours come from the CSS variables in `globals.css`. Don't hard-code hex values in components.
- Images use `next/image`. Remote images are allowed only from `images.unsplash.com` (see `next.config.ts`).
- `cacheComponents` is on: don't call `new Date()`, `Math.random()` and similar during render without `"use cache"` or `<Suspense>`.
- Before finishing a change, run `npm run lint` and `npm run build`.

## Running locally
```bash
npm install
npm run dev    # http://localhost:3000
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
