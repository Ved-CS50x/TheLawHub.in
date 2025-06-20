import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabaseClient";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { plan } = await req.json();
  if (!plan) {
    return new NextResponse("Plan is required", { status: 400 });
  }
  // Get user id
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();
  if (userError || !user) {
    return new NextResponse("User not found", { status: 404 });
  }
  // Calculate end_date based on plan
  let months = 1;
  if (plan === "6months") months = 6;
  if (plan === "yearly") months = 12;
  const start_date = new Date();
  const end_date = new Date();
  end_date.setMonth(end_date.getMonth() + months);
  // Insert subscription
  const { error: subError } = await supabase
    .from("subscriptions")
    .insert([
      {
        user_id: user.id,
        plan,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        status: "active",
      },
    ]);
  if (subError) {
    return new NextResponse("Failed to create subscription", { status: 500 });
  }
  return NextResponse.json({ success: true });
} 