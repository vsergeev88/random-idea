import { NextResponse } from "next/server";
import {
  getLemonSqueezyAuthHealth,
  getLemonSqueezyConfigHealth,
} from "@/lib/payment/lemonsqueezy";

export async function GET() {
  const config = getLemonSqueezyConfigHealth();

  if (!config.hasApiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Lemon Squeezy API key is not configured",
        data: config,
      },
      { status: 500 }
    );
  }

  try {
    const user = await getLemonSqueezyAuthHealth();

    return NextResponse.json({
      ok: true,
      data: {
        ...config,
        userEmail: user.data.attributes.email,
        userName: user.data.attributes.name,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected Lemon Squeezy setup error";

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
