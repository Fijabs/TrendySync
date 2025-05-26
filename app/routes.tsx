import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect(new URL("/landing", "https://yourdomain.com"))
}
