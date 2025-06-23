import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: List all posts
export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// POST: Create a new post
export async function POST(req: Request) {
  const body = await req.json();
  const { author_id, content, image_url, is_anonymous } = body;
  const { data, error } = await supabase
    .from("posts")
    .insert([{ author_id, content, image_url, is_anonymous }])
    .select()
    .single();
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// PATCH: Edit a post
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, content, image_url } = body;
  const { data, error } = await supabase
    .from("posts")
    .update({ content, image_url, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: Delete a post
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);
  if (error) return new NextResponse(error.message, { status: 500 });
  return NextResponse.json({ success: true });
} 