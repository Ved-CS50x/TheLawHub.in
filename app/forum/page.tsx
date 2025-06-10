import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageSquare, Users, Clock, Filter } from "lucide-react"

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Discussion Forum</h1>
          <p className="text-gray-600">Engage in meaningful discussions with fellow law students</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input placeholder="Search discussions..." className="pl-10 border-2 border-black" />
            </div>
            <Button className="bg-gold-500 text-black hover:bg-gold-600">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gold-500 text-black px-3 py-1 cursor-pointer">Constitutional Law</Badge>
            <Badge className="bg-black text-white px-3 py-1 cursor-pointer">Criminal Law</Badge>
            <Badge className="bg-black text-white px-3 py-1 cursor-pointer">Contract Law</Badge>
            <Badge className="bg-black text-white px-3 py-1 cursor-pointer">International Law</Badge>
            <Badge className="bg-black text-white px-3 py-1 cursor-pointer">Corporate Law</Badge>
            <Badge className="bg-black text-white px-3 py-1 cursor-pointer">Human Rights</Badge>
            <Badge className="bg-black text-white px-3 py-1 cursor-pointer">Environmental Law</Badge>
          </div>
        </div>

        {/* Discussions */}
        <div className="space-y-6">
          <Card className="border-2 border-black hover:border-gold-500 transition-colors">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border-2 border-gold-500">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gold-500 text-black">RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-black text-lg">New Criminal Procedure Code Amendments</CardTitle>
                    <CardDescription className="text-gray-600">
                      Started by Rahul Kumar • NLSIU Bangalore
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white">Hot</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                The recent amendments to the Criminal Procedure Code have significant implications for criminal trials.
                What are your thoughts on how these changes will affect the justice system?
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>32 replies</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>45 participants</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>2 hours ago</span>
                  </div>
                </div>
                <Button className="bg-gold-500 text-black hover:bg-gold-600">View Discussion</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black hover:border-gold-500 transition-colors">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border-2 border-gold-500">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gold-500 text-black">PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-black text-lg">Internship Opportunities at Top Firms</CardTitle>
                    <CardDescription className="text-gray-600">
                      Started by Priya Sharma • NALSAR Hyderabad
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gold-500 text-black">Popular</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Let's share internship openings and experiences from leading law firms. I've compiled a list of firms
                currently accepting applications for summer internships.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>47 replies</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>78 participants</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>4 hours ago</span>
                  </div>
                </div>
                <Button className="bg-gold-500 text-black hover:bg-gold-600">View Discussion</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black hover:border-gold-500 transition-colors">
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border-2 border-gold-500">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gold-500 text-black">AV</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-black text-lg">
                      Analysis of Recent Supreme Court Judgment on Privacy
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Started by Aditya
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gold-500 text-black">Popular</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                The recent amendments to the Criminal Procedure Code have significant implications for criminal trials.
                What are your thoughts on how these changes will affect the justice system?
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>32 replies</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>45 participants</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>2 hours ago</span>
                  </div>
                </div>
                <Button className="bg-gold-500 text-black hover:bg-gold-600">View Discussion</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
