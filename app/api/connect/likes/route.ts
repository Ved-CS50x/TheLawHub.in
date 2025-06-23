import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: Get like count for a post (expects ?post_id=...)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");
  if (!post_id) return new NextResponse("Missing post_id", { status: 400 });
  const { count, error } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("post_id", post_id);
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json({ count });
}

// POST: Like a post
export async function POST(req: Request) {
  const body = await req.json();
  const { post_id, user_id } = body;
  const { data, error } = await supabase
    .from("likes")
    .insert([{ post_id, user_id }])
    .select()
    .single();
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: Unlike a post
export async function DELETE(req: Request) {
  const body = await req.json();
  const { post_id, user_id } = body;
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", post_id)
    .eq("user_id", user_id);
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json({ success: true });
} 