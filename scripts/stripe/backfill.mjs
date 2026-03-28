import { StripeSync } from "stripe-sync-engine";

const connectionString = process.env.DATABASE_URL ?? process.env.NEON_CONNECTION_STRING;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeApiVersion = process.env.STRIPE_API_VERSION ?? "2023-10-16";

if (!connectionString) {
  throw new Error("DATABASE_URL or NEON_CONNECTION_STRING is not set");
}

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

if (!stripeWebhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set");
}

const stripeSyncClient = new StripeSync({
  poolConfig: {
    connectionString,
    max: 10,
  },
  stripeApiVersion,
  stripeSecretKey,
  stripeWebhookSecret,
  schema: "stripe",
  autoExpandLists: true,
  backfillRelatedEntities: true,
});

const result = await stripeSyncClient.syncBackfill({ object: "all" });
console.log("Stripe backfill completed", result);
