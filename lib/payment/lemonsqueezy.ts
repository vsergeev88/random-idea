import crypto from "node:crypto";
import { getAuthenticatedUser, lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

function getLemonSqueezyApiKey() {
  return process.env.LEMONSQUEEZY_API_KEY ?? null;
}

function getLemonSqueezyWebhookSecret() {
  return process.env.LEMONSQUEEZY_WEBHOOK_SECRET ?? null;
}

export function getLemonSqueezyConfigHealth() {
  return {
    hasApiKey: Boolean(getLemonSqueezyApiKey()),
    hasWebhookSecret: Boolean(getLemonSqueezyWebhookSecret()),
    hasStoreId: Boolean(process.env.LEMONSQUEEZY_STORE_ID),
  };
}

export function initLemonSqueezyClient() {
  const apiKey = getLemonSqueezyApiKey();

  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY is not set");
  }

  lemonSqueezySetup({ apiKey });
}

export async function getLemonSqueezyAuthHealth() {
  initLemonSqueezyClient();

  const response = await getAuthenticatedUser();

  if (response.error || !response.data) {
    throw new Error(response.error?.message ?? "Failed to authenticate Lemon Squeezy client");
  }

  return response.data;
}

export function verifyLemonSqueezyWebhookSignature(payload: string, signature: string | null) {
  const secret = getLemonSqueezyWebhookSecret();

  if (!secret) {
    throw new Error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
  }

  if (!signature) {
    return false;
  }

  const digest = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const digestBuffer = Buffer.from(digest, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");

  if (digestBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
}
