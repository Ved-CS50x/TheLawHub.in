"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, Star } from "lucide-react"

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 69,
    duration: "1 Month",
    description: "Access for 1 month. Cancel anytime.",
    featured: false,
  },
  {
    id: "6months",
    name: "6 Months",
    price: 400,
    duration: "6 Months",
    description: "Best value. Save more with 6 months access!",
    featured: true,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 830,
    duration: "12 Months",
    description: "Full year unlimited access.",
    featured: false,
  },
]

export default function SubscribePage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    setLoading(planId)
    try {
      const res = await fetch("/api/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      if (!res.ok) throw new Error(await res.text())
      toast({
        title: "Subscription successful!",
        description: "You now have full access to the library.",
        duration: 4000,
      })
    } catch (err: any) {
      toast({
        title: "Subscription failed",
        description: err.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-2 text-black">Choose Your Subscription</h1>
      <p className="text-lg text-gold-600 mb-8">Unlock the full library with a plan that suits you</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`rounded-3xl shadow-lg border-2 border-black/10 bg-white relative flex flex-col transition-all ${plan.featured ? "scale-105 border-gold-500 ring-2 ring-gold-400" : "hover:scale-105"}`}
          >
            {plan.featured && (
              <Badge className="absolute top-4 right-4 bg-gold-500 text-black font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star className="w-4 h-4 mr-1" /> Best Value
              </Badge>
            )}
            <CardHeader className="flex-1 flex flex-col items-center justify-center pb-0">
              <CardTitle className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
                {plan.name}
                {plan.featured && <Star className="w-5 h-5 text-gold-500" />}
              </CardTitle>
              <CardDescription className="text-lg text-gold-600 font-semibold mb-2">
                ₹{plan.price} <span className="text-base text-gray-500 font-normal">/ {plan.duration}</span>
              </CardDescription>
              <div className="text-gray-700 text-center mb-4">{plan.description}</div>
            </CardHeader>
            <CardFooter className="flex flex-col items-center pb-6">
              <Button
                className={`w-full rounded-full px-6 py-2 font-bold text-lg shadow-md transition-all ${plan.featured ? "bg-gold-500 hover:bg-gold-600 text-black" : "bg-black hover:bg-gray-900 text-white"}`}
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? (
                  <span className="flex items-center gap-2"><CheckCircle className="animate-spin w-5 h-5" /> Processing...</span>
                ) : (
                  <>Buy {plan.name}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 