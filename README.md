# Fresh Basket: Grocery Landing Page

A one-page website for a small neighbourhood grocery shop. It has a hero slider, product categories, weekly offers, shop info with a map, and a customer feedback form.

Built with Next.js 16, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Editing content

All text, images, opening hours and contact details are in [`lib/data.ts`](lib/data.ts). The shop details there are **placeholders**, so replace them with the real ones.

Theme colours (the soft "Sage Garden" palette) are CSS variables at the top of [`app/globals.css`](app/globals.css).

## Feedback form

The form validates in the browser and again on the server, using the same zod schema in [`lib/schemas/feedback.ts`](lib/schemas/feedback.ts). For now, submissions are only **logged on the server** by `deliverFeedback()` in [`app/actions/feedback.ts`](app/actions/feedback.ts). To receive them by email or store them, replace that function.

## Docs

- [`PRD.md`](PRD.md): product requirements
- [`mockups/`](mockups/): design mockups (three layouts × five soft themes)
