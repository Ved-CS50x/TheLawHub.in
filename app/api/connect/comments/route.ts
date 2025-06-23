import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: List comments for a post (expects ?post_id=...)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");
  if (!post_id) return new NextResponse("Missing post_id", { status: 400 });
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// POST: Create a new comment
export async function POST(req: Request) {
  const body = await req.json();
  const { post_id, author_id, content } = body;
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id, author_id, content }])
    .select()
    .single();
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// PATCH: Edit a comment
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, content } = body;
  const { data, error } = await supabase
    .from("comments")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: Delete a comment
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id);
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json({ success: true });
} 