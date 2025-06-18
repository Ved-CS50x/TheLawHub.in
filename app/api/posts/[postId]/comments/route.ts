import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabaseClient";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1).max(1000),
});

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { content } = commentSchema.parse(body);

    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, image')
      .eq('email', session.user.email)
      .single();
    if (userError || !user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check post exists
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', params.postId)
      .single();
    if (postError || !post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Insert comment
    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .insert([
        {
          content,
          author_id: user.id,
          post_id: params.postId,
        },
      ])
      .select('*, author:users(id, name, image)')
      .single();
    if (commentError) {
      return new NextResponse("Failed to create comment", { status: 500 });
    }

    return NextResponse.json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fetch comments with author info
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*, author:users(id, name, image)')
      .eq('post_id', params.postId)
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) {
      return new NextResponse("Failed to fetch comments", { status: 500 });
    }

    // Get total count
    const { count } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', params.postId);

    return NextResponse.json({
      comments,
      total: count || 0,
      pages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
} 