import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  MessageSquare,
  Users,
  Clock,
  Star,
  Bell,
  Calendar,
  Award,
  Newspaper,
  Briefcase,
  Bot,
  ArrowRight,
  Target,
  BookMarked,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-black text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <Badge className="bg-gold-500 text-black">NLSIU Bangalore</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              variant="outline"
              className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
            >
              <Bell className="w-4 h-4 mr-1" />3
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gold-500 text-black">AK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Arjun Kumar!</h1>
                <p className="text-gold-500 text-lg">3rd Year • Constitutional Law Specialization</p>
                <p className="text-gray-300 mt-2">Ready to continue your legal journey today?</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gold-500">Day 15</div>
                <div className="text-sm text-gray-300">Study Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-black bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Articles Read</p>
                  <p className="text-3xl font-bold text-black">47</p>
                  <p className="text-xs text-green-600">+5 this week</p>
                </div>
                <div className="bg-gold-100 p-3 rounded-full">
                  <BookOpen className="w-8 h-8 text-gold-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Forum Posts</p>
                  <p className="text-3xl font-bold text-black">23</p>
                  <p className="text-xs text-green-600">+3 this week</p>
                </div>
                <div className="bg-gold-100 p-3 rounded-full">
                  <MessageSquare className="w-8 h-8 text-gold-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Connections</p>
                  <p className="text-3xl font-bold text-black">156</p>
                  <p className="text-xs text-green-600">+12 this week</p>
                </div>
                <div className="bg-gold-100 p-3 rounded-full">
                  <Users className="w-8 h-8 text-gold-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Study Points</p>
                  <p className="text-3xl font-bold text-black">1,247</p>
                  <p className="text-xs text-green-600">+89 this week</p>
                </div>
                <div className="bg-gold-100 p-3 rounded-full">
                  <Award className="w-8 h-8 text-gold-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Target className="w-5 h-5 mr-2 text-gold-500" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-700">Jump into your most used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button asChild className="h-20 bg-gold-500 text-black hover:bg-gold-600 flex-col">
                    <Link href="/library">
                      <BookOpen className="w-6 h-6 mb-2" />
                      Browse Library
                    </Link>
                  </Button>
                  <Button asChild className="h-20 bg-gold-500 text-black hover:bg-gold-600 flex-col">
                    <Link href="/forum">
                      <MessageSquare className="w-6 h-6 mb-2" />
                      Join Discussion
                    </Link>
                  </Button>
                  <Button asChild className="h-20 bg-gold-500 text-black hover:bg-gold-600 flex-col">
                    <Link href="/ai-simplifier">
                      <Bot className="w-6 h-6 mb-2" />
                      AI Simplifier
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black">Recent Activity</CardTitle>
                <CardDescription className="text-gray-700">Your latest interactions on the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gold-50 rounded-lg border border-gold-200">
                  <div className="bg-gold-500 p-2 rounded-full">
                    <BookOpen className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-black">Completed: Constitutional Law Principles</p>
                    <p className="text-sm text-gray-600">Earned 25 study points • 2 hours ago</p>
                    <Badge className="mt-1 bg-green-100 text-green-800">+25 Points</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gold-50 rounded-lg border border-gold-200">
                  <div className="bg-gold-500 p-2 rounded-full">
                    <MessageSquare className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-black">Replied to: Contract Law Discussion</p>
                    <p className="text-sm text-gray-600">
                      Your insight on breach of contract was helpful • 5 hours ago
                    </p>
                    <Badge className="mt-1 bg-blue-100 text-blue-800">3 Likes</Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gold-50 rounded-lg border border-gold-200">
                  <div className="bg-gold-500 p-2 rounded-full">
                    <Star className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-black">Bookmarked: Supreme Court Landmark Cases</p>
                    <p className="text-sm text-gray-600">Added to your Constitutional Law collection • 1 day ago</p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button variant="outline" className="border-gold-500 text-gold-600 hover:bg-gold-50">
                    View All Activity
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trending Discussions */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black">Trending Discussions</CardTitle>
                <CardDescription className="text-gray-700">Popular topics in the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border-2 border-black rounded-lg hover:bg-gold-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-black">New Criminal Procedure Code Amendments</h3>
                    <Badge className="bg-red-500 text-white">Hot</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Discussion about recent changes in CrPC and their implications for criminal justice...
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>45 participants</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-black"
                    >
                      Join Discussion
                    </Button>
                  </div>
                </div>

                <div className="p-4 border-2 border-black rounded-lg hover:bg-gold-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-black">Internship Opportunities at Top Firms</h3>
                    <Badge className="bg-gold-500 text-black">Popular</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Sharing internship openings and experiences from leading law firms...
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        <span>78 participants</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>4 hours ago</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-black"
                    >
                      Join Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Progress */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black">Study Progress</CardTitle>
                <CardDescription className="text-gray-700">Your learning journey this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-black">Constitutional Law</span>
                    <span className="text-gold-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-black">Contract Law</span>
                    <span className="text-gold-600">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-black">Criminal Law</span>
                    <span className="text-gold-600">58%</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
                <Button asChild size="sm" className="w-full bg-gold-500 text-black hover:bg-gold-600">
                  <Link href="/library">Continue Learning</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gold-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gold-50 rounded-lg border border-gold-200">
                  <h4 className="font-medium text-black text-sm">Constitutional Law Webinar</h4>
                  <p className="text-xs text-gray-600">Tomorrow, 3:00 PM</p>
                  <p className="text-xs text-gold-600 mt-1">By Prof. Rajesh Kumar</p>
                </div>
                <div className="p-3 bg-gold-50 rounded-lg border border-gold-200">
                  <h4 className="font-medium text-black text-sm">Moot Court Competition</h4>
                  <p className="text-xs text-gray-600">Dec 15, 2024</p>
                  <p className="text-xs text-gold-600 mt-1">Registration Open</p>
                </div>
                <div className="p-3 bg-gold-50 rounded-lg border border-gold-200">
                  <h4 className="font-medium text-black text-sm">Legal Writing Workshop</h4>
                  <p className="text-xs text-gray-600">Dec 20, 2024</p>
                  <p className="text-xs text-gold-600 mt-1">Limited Seats</p>
                </div>
                <Button size="sm" variant="outline" className="w-full border-gold-500 text-gold-600 hover:bg-gold-50">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Newspaper className="w-5 h-5 mr-2 text-gold-500" />
                  Latest Legal News
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-black text-sm">Supreme Court Delivers Verdict on Privacy Rights</h4>
                  <p className="text-xs text-gray-600">
                    The Supreme Court has delivered a landmark judgment on digital privacy rights...
                  </p>
                  <p className="text-xs text-gold-600">2 hours ago</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-black text-sm">New Legal Education Policy Announced</h4>
                  <p className="text-xs text-gray-600">
                    The Bar Council of India announces new guidelines for legal education...
                  </p>
                  <p className="text-xs text-gold-600">5 hours ago</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-black text-sm">High Court Rules on Environmental Law</h4>
                  <p className="text-xs text-gray-600">
                    Delhi High Court sets new precedent in environmental protection case...
                  </p>
                  <p className="text-xs text-gold-600">1 day ago</p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full border-gold-500 text-gold-600 hover:bg-gold-50"
                >
                  <Link href="/news">Read All News</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-2 border-black bg-white">
              <CardHeader>
                <CardTitle className="text-black">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-black text-black hover:bg-gold-50"
                >
                  <Link href="/dictionary">
                    <BookMarked className="w-4 h-4 mr-2" />
                    Legal Dictionary
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-black text-black hover:bg-gold-50"
                >
                  <Link href="/jobs">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Jobs & Internships
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start border-black text-black hover:bg-gold-50"
                >
                  <Link href="/profile">
                    <Users className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Study Reminder */}
            <Card className="border-2 border-black bg-gradient-to-br from-gold-50 to-gold-100">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-semibold text-black">Keep Learning!</h3>
                  <p className="text-sm text-gray-700">You have 3 articles in your reading list</p>
                  <Button asChild size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/library/reading-list">Continue Reading</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
