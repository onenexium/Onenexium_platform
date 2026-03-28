import { NextResponse } from "next/server";

/** ALB target group health check — must stay lightweight (no DB / env validation). */
export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
