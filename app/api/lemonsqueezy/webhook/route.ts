import { NextResponse } from "next/server";
import { verifyLemonSqueezyWebhookSignature } from "@/lib/payment/lemonsqueezy";

export const runtime = "nodejs";

type LemonSqueezyWebhookPayload = {
  meta?: {
    event_name?: string;
  };
};

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("x-signature");
    const isValidSignature = verifyLemonSqueezyWebhookSignature(
      payload,
      signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { ok: false, error: "Invalid Lemon Squeezy webhook signature" },
        { status: 401 }
      );
    }

    const eventPayload = JSON.parse(payload) as LemonSqueezyWebhookPayload;

    return NextResponse.json({
      ok: true,
      received: true,
      eventName: eventPayload.meta?.event_name ?? null,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected Lemon Squeezy webhook error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
