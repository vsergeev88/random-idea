import { NextResponse } from "next/server";
import {
  getStripeSyncClient,
  getStripeSyncConfigHealth,
} from "@/lib/payment/stripe-sync";

export async function GET() {
  const config = getStripeSyncConfigHealth();

  if (
    !(
      config.hasConnectionString &&
      config.hasStripeSecretKey &&
      config.hasStripeWebhookSecret
    )
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Stripe environment variables are not fully configured",
        data: config,
      },
      { status: 500 }
    );
  }

  try {
    getStripeSyncClient();

    return NextResponse.json({
      ok: true,
      data: {
        ...config,
        schema: "stripe",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected Stripe setup error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
        data: config,
      },
      { status: 500 }
    );
  }
}
