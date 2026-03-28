import { NextResponse } from "next/server";
import { getNeonHealth } from "@/lib/database/neon";

export async function GET() {
  try {
    const health = await getNeonHealth();

    if (!health) {
      return NextResponse.json(
        { ok: false, error: "No response from database" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: {
        database: health.database_name,
        now: health.now,
        postgresVersion: health.postgres_version,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected Neon error";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
