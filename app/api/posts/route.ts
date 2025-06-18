import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabaseClient";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { title, content, tags } = postSchema.parse(body);
    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();
    if (userError || !user) {
      return new NextResponse("User not found", { status: 404 });
    }
    // Create post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          tags: tags || [],
          author_id: user.id,
        },
      ])
      .single();
    if (postError) {
      return new NextResponse("Failed to create post", { status: 500 });
    }
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    let query = supabase
      .from('posts')
      .select('*, author:users(id, name, image)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    // Add filters if needed
    const { data: posts, error, count } = await query;
    if (error) {
      return new NextResponse("Failed to fetch posts", { status: 500 });
    }
    return NextResponse.json({
      posts: posts || [],
      total: count || 0,
      pages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
} 