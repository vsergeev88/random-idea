# AI Context: random-idea

## Purpose

random-idea is a startup idea generator built with Next.js. Ideas are composed from predefined semantic blocks and stored in the browser.

## Technology Stack

- TypeScript
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui
- Lemon Squeezy

## Key Files and Directories

- `app/` — application routes and UI components (including API routes)
- `app/page.tsx` — landing page
- `app/generator/page.tsx` — idea generator
- `lib/idea-blocks.ts` — semantic block bank
- `lib/idea-generator.ts` — idea generation
- `lib/payment/lemonsqueezy.ts` — Lemon Squeezy SDK setup and webhook signature verification
- `app/api/lemonsqueezy/route.ts` — Lemon Squeezy setup validation endpoint
- `app/api/lemonsqueezy/webhook/route.ts` — Lemon Squeezy webhook ingestion endpoint
- `README.md` — basic documentation for setup
- `AGENTS.md` — code standards and behavior rules for AI agents

## Development Commands

- `npm run dev` — start development mode
- `npm run build` — build for production
- `npm run start` — run production build
- `npm run check` — check code style (Ultracite)
- `npm run fix` — auto-fix formatting/style issues (Ultracite)

## Environment Variables

- `LEMONSQUEEZY_API_KEY` — Lemon Squeezy API key
- `LEMONSQUEEZY_WEBHOOK_SECRET` — Lemon Squeezy webhook secret for signature validation
- `LEMONSQUEEZY_STORE_ID` — optional Lemon Squeezy store id

## Important Notes for AI Agents

- The project follows a TypeScript-first approach.
- Server logic and APIs are implemented through the Next.js App Router.
- Saved ideas live in `localStorage` on the generator page.
- Lemon Squeezy client setup is handled through `lib/payment/lemonsqueezy.ts`.
- Lemon Squeezy webhooks are expected at `POST /api/lemonsqueezy/webhook`.
