import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, Clock, Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FadeInSection } from "@/components/fade-in-section"
import { Badge } from "@/components/ui/badge"
import { Bookmark } from "lucide-react"
import { CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobsComingSoonPage() {
  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-gold-500">
              <Link href="/home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Coming Soon Card */}
          <Card className="border-2 border-black bg-white text-center">
            <CardHeader className="pb-8">
              <div className="mx-auto mb-6 w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-black" />
              </div>
              <CardTitle className="text-3xl font-bold text-black mb-4">Jobs & Internships</CardTitle>
              <div className="flex items-center justify-center text-gold-600 mb-4">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-lg font-medium">Coming Soon</span>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We're building an amazing platform to connect NLU students with top law firms, corporate legal
                departments, and internship opportunities across India.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="p-4 bg-gold-50 rounded-lg border border-gold-200">
                  <h3 className="font-semibold text-black mb-2">Job Listings</h3>
                  <p className="text-sm text-gray-600">
                    Browse curated job openings from top law firms and corporate legal teams
                  </p>
                </div>
                <div className="p-4 bg-gold-50 rounded-lg border border-gold-200">
                  <h3 className="font-semibold text-black mb-2">Internship Portal</h3>
                  <p className="text-sm text-gray-600">
                    Find summer internships and clerkship opportunities at leading legal institutions
                  </p>
                </div>
                <div className="p-4 bg-gold-50 rounded-lg border border-gold-200">
                  <h3 className="font-semibold text-black mb-2">Career Guidance</h3>
                  <p className="text-sm text-gray-600">
                    Get expert advice on legal career paths and application strategies
                  </p>
                </div>
              </div>

              {/* Notify Me Form */}
              <div className="max-w-md mx-auto">
                <div className="bg-black text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-gold-500" />
                    Get Notified When We Launch
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="border-gold-500 bg-white text-black"
                      />
                    </div>
                    <div>
                      <Label htmlFor="university" className="text-white">
                        University
                      </Label>
                      <Input id="university" placeholder="Your NLU" className="border-gold-500 bg-white text-black" />
                    </div>
                    <Button className="w-full bg-gold-500 text-black hover:bg-gold-600">Notify Me</Button>
                  </form>
                </div>
              </div>

              {/* Timeline */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-4">Expected Launch</h3>
                <div className="inline-flex items-center bg-gold-500 text-black px-6 py-3 rounded-full font-semibold">
                  Q2 2025
                </div>
                <p className="text-gray-600 mt-4">
                  We're working hard to bring you the best job and internship platform for law students.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FadeInSection>
  )
}
