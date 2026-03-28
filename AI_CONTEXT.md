# AI Context: Jetpack

## Purpose

Jetpack is a starter template for AI/SaaS applications built with Next.js, including baseline integrations for authentication, UI, and Neon Postgres.

## Technology Stack

- TypeScript
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui
- Clerk (authentication)
- Neon Serverless Postgres
- Stripe + stripe-sync-engine
- Lemon Squeezy

## Key Files and Directories

- `app/` — application routes and UI components (including API routes)
- `app/api/notes/route.ts` — CRUD for notes list
- `app/api/notes/[id]/route.ts` — CRUD for a single note
- `lib/database/neon.ts` — Neon client setup
- `lib/payment/stripe-sync.ts` — Stripe Sync client setup
- `app/api/stripe/route.ts` — Stripe setup validation endpoint
- `app/api/stripe/webhook/route.ts` — Stripe webhook ingestion endpoint
- `scripts/stripe/migrate.mjs` — creates Stripe schema/tables
- `scripts/stripe/backfill.mjs` — historical Stripe data sync
- `lib/payment/lemonsqueezy.ts` — Lemon Squeezy SDK setup and webhook signature verification
- `app/api/lemonsqueezy/route.ts` — Lemon Squeezy setup validation endpoint
- `app/api/lemonsqueezy/webhook/route.ts` — Lemon Squeezy webhook ingestion endpoint
- `README.md` — basic documentation for setup and API examples
- `AGENTS.md` — code standards and behavior rules for AI agents

## Development Commands

- `npm run dev` — start development mode
- `npm run build` — build for production
- `npm run start` — run production build
- `npm run check` — check code style (Ultracite)
- `npm run fix` — auto-fix formatting/style issues (Ultracite)
- `npm run stripe:migrate` — run Stripe Sync migrations
- `npm run stripe:backfill` — backfill Stripe objects into Postgres

## Environment Variables

- `NEON_CONNECTION_STRING` — Neon Postgres connection string
- `DATABASE_URL` — optional Postgres URL alias for Stripe-related tooling
- `STRIPE_SECRET_KEY` — Stripe secret API key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `STRIPE_API_VERSION` — optional Stripe API version override
- `LEMONSQUEEZY_API_KEY` — Lemon Squeezy API key
- `LEMONSQUEEZY_WEBHOOK_SECRET` — Lemon Squeezy webhook secret for signature validation
- `LEMONSQUEEZY_STORE_ID` — optional Lemon Squeezy store id

## Important Notes for AI Agents

- The project follows a TypeScript-first approach.
- Server logic and APIs are implemented through the Next.js App Router.
- Data access is handled through the Neon client in `lib/database/neon.ts`.
- Stripe sync access is handled through `lib/payment/stripe-sync.ts`.
- Stripe webhooks are expected at `POST /api/stripe/webhook`.
- Lemon Squeezy client setup is handled through `lib/payment/lemonsqueezy.ts`.
- Lemon Squeezy webhooks are expected at `POST /api/lemonsqueezy/webhook`.
- Authentication and user context are integrated with Clerk.
