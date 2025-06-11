"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare, Newspaper, Bot, ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeInSection } from "@/components/fade-in-section"
import { NotificationPopup } from "@/components/notification-popup"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Notification Popup */}
      <NotificationPopup />

      {/* Hero Section */}
      <section className="relative py-16 px-4 min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Final%20Merged%20Image-q6UutvmIlX5r93VHvV76SshsozYsFQ.png"
            alt="National Law Universities Collage"
            fill
            className="object-cover"
            priority
          />
          {/* Black tint overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center justify-center text-center min-h-[600px]">
            <div className="space-y-8 max-w-4xl">
              <FadeInSection delay={100}>
                <Badge className="bg-gold-500 text-black border-gold-500">Welcome to The Law Hub</Badge>
              </FadeInSection>

              <FadeInSection delay={300}>
                <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  The Go-To Hub for <span className="text-gold-500">NLU Students</span>
                </h1>
              </FadeInSection>

              <FadeInSection delay={500}>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Simple. Focused. Powerful.
                  <br />
                  One hub. Every NLU. All the action.
                </p>
              </FadeInSection>

              <FadeInSection delay={700}>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild className="bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/library">Explore Library</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500 hover:text-black"
                  >
                    <Link href="/forum">Join Discussions</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500 hover:text-black"
                  >
                    <Link href="/connect">Connect & Share</Link>
                  </Button>
                </div>
              </FadeInSection>

              <FadeInSection delay={900}>
                <div className="mt-16 pt-8 border-t border-gray-600 max-w-2xl mx-auto text-center">
                  <p className="text-white text-sm leading-relaxed">
                    Advocating for the administration of NLUSA - National Law University Student Association
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    <a
                      href="https://www.barandbench.com/Law-School/national-law-universities-students-association-nlusa-an-emerging-reality"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-500 hover:text-gold-400 underline"
                    >
                      For Reference
                    </a>
                  </p>
                </div>
              </FadeInSection>
            </div>
            {/* Remove the slideshow div entirely since we're using the background image */}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Explore The Law Hub</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to enhance your network, legal studies and career development. (You can also find
                the best CommuniTea at TLH)
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection delay={200}>
              <Card className="border-2 border-black hover:border-gold-500 transition-colors">
                <CardHeader>
                  <BookOpen className="w-10 h-10 text-gold-500 mb-3" />
                  <CardTitle className="text-black">Legal Library</CardTitle>
                  <CardDescription className="text-gray-600">
                    Access thousands of legal articles, cases, and study materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/library">Browse Library</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={400}>
              <Card className="border-2 border-black hover:border-gold-500 transition-colors">
                <CardHeader>
                  <MessageSquare className="w-10 h-10 text-gold-500 mb-3" />
                  <CardTitle className="text-black">Discussion Forum</CardTitle>
                  <CardDescription className="text-gray-600">
                    Engage in meaningful discussions with fellow law students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/forum">Join Discussions</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={600}>
              <Card className="border-2 border-black hover:border-gold-500 transition-colors">
                <CardHeader>
                  <Bot className="w-10 h-10 text-gold-500 mb-3" />
                  <CardTitle className="text-black">AI Text Simplifier</CardTitle>
                  <CardDescription className="text-gray-600">
                    Simplify complex legal texts with our AI-powered tool
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/ai-simplifier">Try AI Tool</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <FadeInSection>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black">Latest Legal News</h2>
              <Button asChild variant="link" className="text-gold-600 hover:text-gold-700">
                <Link href="/news">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeInSection delay={200}>
              <Card className="border-2 border-black hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-black text-lg">Supreme Court Delivers Verdict on Privacy Rights</CardTitle>
                  <CardDescription className="text-gray-600">2 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    The Supreme Court has delivered a landmark judgment on digital privacy rights that will have
                    far-reaching implications...
                  </p>
                  <Button asChild variant="link" className="p-0 text-gold-600 hover:text-gold-700">
                    <Link href="/news/1">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={400}>
              <Card className="border-2 border-black hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-black text-lg">New Legal Education Policy Announced</CardTitle>
                  <CardDescription className="text-gray-600">5 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    The Bar Council of India announces new guidelines for legal education that will transform how law is
                    taught across universities...
                  </p>
                  <Button asChild variant="link" className="p-0 text-gold-600 hover:text-gold-700">
                    <Link href="/news/2">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={600}>
              <Card className="border-2 border-black hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-black text-lg">High Court Rules on Environmental Law</CardTitle>
                  <CardDescription className="text-gray-600">1 day ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    Delhi High Court sets new precedent in environmental protection case that will impact industrial
                    regulations...
                  </p>
                  <Button asChild variant="link" className="p-0 text-gold-600 hover:text-gold-700">
                    <Link href="/news/3">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <FadeInSection>
            <h2 className="text-2xl font-bold text-black mb-8">Quick Access</h2>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FadeInSection delay={100}>
              <Button
                asChild
                variant="outline"
                className="h-24 border-2 border-gold-500 text-white bg-black hover:bg-gold-50 flex-col relative overflow-hidden group transition-all duration-300"
              >
                <Link href="/library">
                  <div className="absolute inset-0 bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  <BookOpen className="w-6 h-6 mb-2 text-gold-500 relative z-10" />
                  <span className="font-bold relative z-10 group-hover:text-black transition-colors duration-300">
                    Legal Library
                  </span>
                </Link>
              </Button>
            </FadeInSection>

            <FadeInSection delay={200}>
              <Button
                asChild
                variant="outline"
                className="h-24 border-2 border-gold-500 text-white bg-black hover:bg-gold-50 flex-col relative overflow-hidden group transition-all duration-300"
              >
                <Link href="/forum">
                  <div className="absolute inset-0 bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  <MessageSquare className="w-6 h-6 mb-2 text-gold-500 relative z-10" />
                  <span className="font-bold relative z-10 group-hover:text-black transition-colors duration-300">
                    Discussion Forum
                  </span>
                </Link>
              </Button>
            </FadeInSection>

            <FadeInSection delay={300}>
              <Button
                asChild
                variant="outline"
                className="h-24 border-2 border-gold-500 text-white bg-black hover:bg-gold-50 flex-col relative overflow-hidden group transition-all duration-300"
              >
                <Link href="/connect">
                  <div className="absolute inset-0 bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  <Users className="w-6 h-6 mb-2 text-gold-500 relative z-10" />
                  <span className="font-bold relative z-10 group-hover:text-black transition-colors duration-300">
                    Connect
                  </span>
                </Link>
              </Button>
            </FadeInSection>

            <FadeInSection delay={400}>
              <Button
                asChild
                variant="outline"
                className="h-24 border-2 border-gold-500 text-white bg-black hover:bg-gold-50 flex-col relative overflow-hidden group transition-all duration-300"
              >
                <Link href="/news">
                  <div className="absolute inset-0 bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  <Newspaper className="w-6 h-6 mb-2 text-gold-500 relative z-10" />
                  <span className="font-bold relative z-10 group-hover:text-black transition-colors duration-300">
                    Legal News
                  </span>
                </Link>
              </Button>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeInSection delay={100}>
            <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Legal Knowledge?</h2>
          </FadeInSection>

          <FadeInSection delay={300}>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our comprehensive resources and connect with fellow law students across India.
            </p>
          </FadeInSection>

          <FadeInSection delay={500}>
            <Button asChild size="lg" className="bg-gold-500 text-black hover:bg-gold-600">
              <Link href="/library">Start Exploring</Link>
            </Button>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
