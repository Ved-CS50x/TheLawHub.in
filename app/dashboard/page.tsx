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
  LayoutDashboard,
  Bookmark,
  Download,
} from "lucide-react"
import Link from "next/link"
import { FadeInSection } from "@/components/fade-in-section"

interface Activity {
  id: string
  icon: React.ReactNode
  description: string
  time: string
}

interface BookmarkItem {
  id: string
  icon: React.ReactNode
  title: string
  type: string
}

interface DownloadItem {
  id: string
  icon: React.ReactNode
  title: string
  type: string
}

const recentActivity: Activity[] = [
  {
    id: "1",
    icon: <BookOpen className="w-4 h-4 text-black" />,
    description: "Completed Constitutional Law Principles",
    time: "2 hours ago"
  },
  {
    id: "2",
    icon: <MessageSquare className="w-4 h-4 text-black" />,
    description: "Replied to Contract Law Discussion",
    time: "5 hours ago"
  },
  {
    id: "3",
    icon: <Star className="w-4 h-4 text-black" />,
    description: "Bookmarked Supreme Court Landmark Cases",
    time: "1 day ago"
  }
]

const bookmarks: BookmarkItem[] = [
  {
    id: "1",
    icon: <BookOpen className="w-6 h-6 text-gold-600" />,
    title: "Constitutional Law Principles",
    type: "Article"
  },
  {
    id: "2",
    icon: <MessageSquare className="w-6 h-6 text-gold-600" />,
    title: "Contract Law Discussion",
    type: "Forum Post"
  },
  {
    id: "3",
    icon: <Star className="w-6 h-6 text-gold-600" />,
    title: "Supreme Court Landmark Cases",
    type: "Collection"
  }
]

const downloads: DownloadItem[] = [
  {
    id: "1",
    icon: <BookOpen className="w-6 h-6 text-gold-600" />,
    title: "Criminal Law Handbook",
    type: "PDF"
  },
  {
    id: "2",
    icon: <MessageSquare className="w-6 h-6 text-gold-600" />,
    title: "Legal Writing Guide",
    type: "PDF"
  },
  {
    id: "3",
    icon: <Star className="w-6 h-6 text-gold-600" />,
    title: "Case Study Collection",
    type: "ZIP"
  }
]

export default function DashboardPage() {
  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <FadeInSection delay={100}>
            <div className="mb-8 bg-black text-white p-6 rounded-lg text-center">
              <div className="flex items-center justify-center mb-4">
                <LayoutDashboard className="w-12 h-12 text-gold-500 mr-3" />
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                  <p className="text-lg text-gold-500 font-medium">Your Legal Hub</p>
                </div>
              </div>
              <p className="text-gold-500 max-w-2xl mx-auto">
                Track your activities, manage your content, and stay updated with your personalized legal hub.
              </p>
            </div>
          </FadeInSection>

          {/* Quick Stats */}
          <FadeInSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-2 border-black bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">24</div>
                  <p className="text-xs text-gray-500">+2 from last week</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Bookmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">12</div>
                  <p className="text-xs text-gray-500">+3 new this week</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">8</div>
                  <p className="text-xs text-gray-500">Active in 3 topics</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black">15</div>
                  <p className="text-xs text-gray-500">From library</p>
                </CardContent>
              </Card>
            </div>
          </FadeInSection>

          {/* Recent Activity */}
          <FadeInSection delay={300}>
            <Card className="border-2 border-black bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-black">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity: Activity, index: number) => (
                    <FadeInSection key={activity.id} delay={400 + index * 100}>
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Saved Content */}
          <FadeInSection delay={500}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bookmarks */}
              <Card className="border-2 border-black bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black">Recent Bookmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookmarks.map((bookmark: BookmarkItem, index: number) => (
                      <FadeInSection key={bookmark.id} delay={600 + index * 100}>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                            {bookmark.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-black">{bookmark.title}</h4>
                            <p className="text-xs text-gray-500">{bookmark.type}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-600">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Downloads */}
              <Card className="border-2 border-black bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-black">Recent Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {downloads.map((download: DownloadItem, index: number) => (
                      <FadeInSection key={download.id} delay={600 + index * 100}>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                            {download.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-black">{download.title}</h4>
                            <p className="text-xs text-gray-500">{download.type}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-600">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeInSection>
        </div>
      </div>
    </FadeInSection>
  )
}
