import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStripeSyncClient } from "@/lib/payment/stripe-sync";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature") ?? undefined;

  try {
    const payload = await request.text();
    const stripeSyncClient = getStripeSyncClient();

    await stripeSyncClient.processWebhook(payload, signature);

    return NextResponse.json({ ok: true, received: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected Stripe webhook error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
