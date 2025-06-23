import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 12);

  // Check if user already exists
  const { data: existing, error: existingError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();
  if (existing) {
    return new NextResponse("User already exists", { status: 400 });
  }

  // Insert new user with approved: false and role: 'user'
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword, approved: false, role: 'user' }])
    .select()
    .single();

  if (error) return new NextResponse(error.message, { status: 500 });

  return NextResponse.json({ success: true, user: { id: data.id, email: data.email } });
} 