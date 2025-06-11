"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageSquare, Users, Clock, Filter, Eye, Bookmark } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Discussion {
  id: string
  title: string
  category: string
  description: string
  author: string
  date: string
  participants: number
  tags: string[]
  status: "active" | "closed" | "hot"
  startDate: string
  content: string
  replies: number
  views: number
  lastUpdated: string
}

interface NewDiscussion {
  title: string
  category: string
  content: string
  tags: string[]
}

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [newDiscussion, setNewDiscussion] = useState<NewDiscussion>({
    title: "",
    category: "",
    content: "",
    tags: []
  })

  // Mock data for discussions
  const discussions: Discussion[] = [
    {
      id: "1",
      title: "New Criminal Procedure Code Amendments",
      category: "Criminal Law",
      description: "Discussion about recent changes in CrPC and their implications for criminal justice...",
      author: "Adv. Rahul Sharma",
      date: "2 hours ago",
      participants: 45,
      tags: ["Criminal Law", "CrPC", "Amendments"],
      status: "hot",
      startDate: "2024-03-15",
      content: "The recent amendments to the CrPC have significant implications...",
      replies: 23,
      views: 156,
      lastUpdated: "2 hours ago"
    },
    {
      id: "2",
      title: "Internship Opportunities at Top Firms",
      category: "Careers",
      description: "Sharing internship openings and experiences from leading law firms...",
      author: "Prof. Priya Singh",
      date: "4 hours ago",
      participants: 78,
      tags: ["Internships", "Career", "Law Firms"],
      status: "active",
      startDate: "2024-03-14",
      content: "Several top law firms have announced their summer internship programs...",
      replies: 45,
      views: 289,
      lastUpdated: "4 hours ago"
    },
    {
      id: "3",
      title: "Constitutional Law Case Analysis",
      category: "Constitutional Law",
      description: "Analysis of recent Supreme Court judgments on fundamental rights...",
      author: "Dr. Amit Kumar",
      date: "1 day ago",
      participants: 32,
      tags: ["Constitutional Law", "Supreme Court", "Fundamental Rights"],
      status: "active",
      startDate: "2024-03-13",
      content: "The recent judgment on Article 21 has far-reaching implications...",
      replies: 18,
      views: 124,
      lastUpdated: "1 day ago"
    }
  ]

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter(discussion => {
      const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          discussion.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = category === "all" || discussion.category.toLowerCase() === category.toLowerCase()
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return b.participants - a.participants
    })

  const handleCreateDiscussion = () => {
    // In a real app, this would send the data to an API
    console.log("Creating new discussion:", newDiscussion)
    setNewDiscussion({
      title: "",
      category: "",
      content: "",
      tags: []
    })
  }

  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <FadeInSection delay={100}>
            <div className="mb-8 bg-black text-white p-6 rounded-lg text-center">
              <div className="flex items-center justify-center mb-4">
                <MessageSquare className="w-12 h-12 text-gold-500 mr-3" />
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white">Forum</h1>
                  <p className="text-lg text-gold-500 font-medium">Legal Discussions</p>
                </div>
              </div>
              <p className="text-gold-500 max-w-2xl mx-auto">
                Join discussions with fellow law students, share insights, and engage in meaningful legal debates.
              </p>
            </div>
          </FadeInSection>

          {/* Search and Categories */}
          <FadeInSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-2 border-black"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="moot">Moot Court</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="active">Most Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FadeInSection>

          {/* Discussions Grid */}
          <FadeInSection delay={300}>
            <div className="grid gap-6">
              {filteredDiscussions.map((discussion, index) => (
                <FadeInSection key={discussion.id} delay={400 + index * 100}>
                  <Card className="border-2 border-black bg-white">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-black mb-2">{discussion.title}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-gold-500 text-black">{discussion.category}</Badge>
                            <Badge variant="outline" className="border-black">
                              {discussion.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Started by {discussion.author} • {discussion.startDate}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-600">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-2">{discussion.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {discussion.views} views
                          </span>
                        </div>
                        <span>Last updated {discussion.lastUpdated}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 pt-4">
                      <Button className="w-full bg-gold-500 text-black hover:bg-gold-600">
                        Join Discussion
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>

          {/* Create New Discussion */}
          <FadeInSection delay={500}>
            <div className="mt-8">
              <Card className="border-2 border-black bg-white">
                <CardHeader>
                  <h3 className="text-xl font-bold text-black">Start a New Discussion</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter discussion title..."
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        className="border-2 border-black mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newDiscussion.category}
                        onValueChange={(value) => setNewDiscussion({ ...newDiscussion, category: value })}
                      >
                        <SelectTrigger className="border-2 border-black mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="career">Career</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="moot">Moot Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your discussion content..."
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        className="border-2 border-black mt-1 resize-none"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., constitutional law, career advice, moot court"
                        value={newDiscussion.tags.join(", ")}
                        onChange={(e) =>
                          setNewDiscussion({
                            ...newDiscussion,
                            tags: e.target.value.split(",").map((tag) => tag.trim()),
                          })
                        }
                        className="border-2 border-black mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gold-500 text-black hover:bg-gold-600" onClick={handleCreateDiscussion}>Create Discussion</Button>
                </CardFooter>
              </Card>
            </div>
          </FadeInSection>
        </div>
      </div>
    </FadeInSection>
  )
}
