# Jetpack AI Starter Template

Jetpack is an opinionated, all-in-one AI starter boilerplate for vibe coders, programmers, and indie hackers. It helps you launch SaaS products in days, not weeks, with all essential tools preconfigured and a deep focus on AI tooling.

## Apply Your shadcn Theme

To apply your shadcn theme, go to the theme builder at https://ui.shadcn.com/create, configure your theme, and copy the preset code. Then run in your terminal:

```bash
npx shadcn@latest init --preset <your-preset-name>
```

This will add a `components.json` file to your project, which will be used for component generation.

## Neon Database Boilerplate

The template includes a base layer for working with an external Neon Postgres database:

- Neon client: `lib/neon.ts`
- connection test API endpoint: `app/api/neon/route.ts`

### 1) Configure Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
NEON_CONNECTION_STRING=postgresql://<user>:<password>@<host>/<db>?sslmode=require
```

### 2) Check the Connection

Start the app:

```bash
npm run dev
```

Open the endpoint:

- [http://localhost:3000/api/neon](http://localhost:3000/api/neon)

A successful response returns:

- `ok: true`
- current database name
- database server time
- PostgreSQL version

### 3) Use in Your Server Handlers

Import the client from `lib/neon.ts`:

```ts
import { getNeonClient } from "@/lib/neon";

const sql = getNeonClient();
const rows = await sql`select now() as now`;
```

## Stripe Boilerplate

The template now includes a base Stripe Sync setup for syncing Stripe data into Postgres:

- Stripe sync utility: `lib/stripe-sync.ts`
- Stripe setup check endpoint: `app/api/stripe/route.ts`
- Stripe webhook endpoint: `app/api/stripe/webhook/route.ts`
- Stripe migration script: `scripts/stripe/migrate.mjs`
- Stripe backfill script: `scripts/stripe/backfill.mjs`

### 1) Install dependencies

```bash
npm install stripe-sync-engine stripe pg @types/pg
```

### 2) Configure environment variables

Add these variables to your `.env`:

```bash
NEON_CONNECTION_STRING=postgresql://<user>:<password>@<host>/<db>?sslmode=require
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_API_VERSION=2023-10-16
```

`DATABASE_URL` is optional in this template if `NEON_CONNECTION_STRING` is already set, but it is useful for Stripe tooling compatibility.

### 3) Verify Stripe setup

Run the app:

```bash
npm run dev
```

Open:

- [http://localhost:3000/api/stripe](http://localhost:3000/api/stripe)

If configured correctly, response returns `ok: true` and setup metadata.

### 4) Use Stripe Sync client in server code

```ts
import { getStripeSyncClient } from "@/lib/stripe-sync";

const stripeSync = getStripeSyncClient();
```

### 5) Run Stripe schema migrations

```bash
npm run stripe:migrate
```

### 6) Configure Stripe webhook endpoint

In Stripe Dashboard create a webhook endpoint pointing to:

- `https://<your-domain>/api/stripe/webhook`

For local development use Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the generated signing secret (`whsec_...`) as `STRIPE_WEBHOOK_SECRET` in `.env`.

### 7) Backfill historical Stripe data

```bash
npm run stripe:backfill
```

This command syncs existing Stripe objects into the `stripe` schema.

## Lemon Squeezy Boilerplate

The template now includes a base Lemon Squeezy setup:

- Lemon Squeezy utility: `lib/lemonsqueezy.ts`
- Lemon Squeezy setup check endpoint: `app/api/lemonsqueezy/route.ts`
- Lemon Squeezy webhook endpoint: `app/api/lemonsqueezy/webhook/route.ts`

### 1) Install dependencies

```bash
npm install @lemonsqueezy/lemonsqueezy.js
```

### 2) Configure environment variables

Add these variables to your `.env`:

```bash
LEMONSQUEEZY_API_KEY=your_api_key
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret
LEMONSQUEEZY_STORE_ID=your_store_id
```

### 3) Verify Lemon Squeezy setup

Run the app:

```bash
npm run dev
```

Open:

- [http://localhost:3000/api/lemonsqueezy](http://localhost:3000/api/lemonsqueezy)

If configured correctly, response returns `ok: true` and authenticated user metadata.

### 4) Configure Lemon Squeezy webhook

Set webhook target URL in Lemon Squeezy dashboard:

- `https://<your-domain>/api/lemonsqueezy/webhook`

For local development, use a tunnel and point the webhook to:

- `https://<your-tunnel-domain>/api/lemonsqueezy/webhook`

## Example CRUD API (notes)

A ready-to-use CRUD route is included:

- `GET /api/notes` — list notes for the current user
- `POST /api/notes` — create a note
- `GET /api/notes/:id` — get a note
- `PATCH /api/notes/:id` — update a note
- `DELETE /api/notes/:id` — delete a note

Routes:

- `app/api/notes/route.ts`
- `app/api/notes/[id]/route.ts`

Request examples:

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"First note","content":"Hello Neon"}'
```

```bash
curl http://localhost:3000/api/notes
```
