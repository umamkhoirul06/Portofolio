import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recruiterName, company, email, message } = body;

    if (!recruiterName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(inquiries).values({ recruiterName, company, email, message });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
