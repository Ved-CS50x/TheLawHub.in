import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabaseClient";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse(JSON.stringify({ subscribed: false, reason: "Unauthorized" }), { status: 401 });
  }
  // Get user id
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single();
  if (userError || !user) {
    return new NextResponse(JSON.stringify({ subscribed: false, reason: "User not found" }), { status: 404 });
  }
  // Check for active subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .lte("start_date", new Date().toISOString())
    .gte("end_date", new Date().toISOString())
    .single();
  if (subscription) {
    return NextResponse.json({ subscribed: true, plan: subscription.plan, end_date: subscription.end_date });
  } else {
    return NextResponse.json({ subscribed: false });
  }
} 