import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: List all reports (for moderation)
export async function GET() {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// POST: Create a new report
export async function POST(req: Request) {
  const body = await req.json();
  const { reported_id, reported_type, reporter_id, reason } = body;
  const { data, error } = await supabase
    .from("reports")
    .insert([{ reported_id, reported_type, reporter_id, reason }])
    .select()
    .single();
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
} 