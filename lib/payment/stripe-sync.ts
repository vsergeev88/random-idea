import { StripeSync } from "stripe-sync-engine";

let stripeSyncClient: StripeSync | null = null;

function getDatabaseConnectionString() {
  return process.env.DATABASE_URL ?? process.env.NEON_CONNECTION_STRING ?? null;
}

export function getStripeSyncClient() {
  if (stripeSyncClient) {
    return stripeSyncClient;
  }

  const connectionString = getDatabaseConnectionString();
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

  stripeSyncClient = new StripeSync({
    poolConfig: {
      connectionString,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      max: 10,
    },
    stripeApiVersion,
    stripeSecretKey,
    stripeWebhookSecret,
    schema: "stripe",
    autoExpandLists: true,
    backfillRelatedEntities: true,
  });

  return stripeSyncClient;
}

export function getStripeSyncConfigHealth() {
  return {
    hasConnectionString: Boolean(getDatabaseConnectionString()),
    hasStripeApiVersion: Boolean(
      process.env.STRIPE_API_VERSION ?? "2023-10-16"
    ),
    hasStripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    hasStripeWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
  };
}
