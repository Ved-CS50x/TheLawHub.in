import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, BookOpen, FileText, Scale, Clock, Star, Download } from "lucide-react"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 bg-black text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Legal Library</h1>
          <p className="text-gold-500">Comprehensive collection of legal articles, cases, and study materials</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input placeholder="Search articles, cases, or topics..." className="pl-10 border-2 border-black" />
            </div>
            <Button className="bg-gold-500 text-black hover:bg-gold-600">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black">
            <TabsTrigger
              value="articles"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-white"
            >
              Articles
            </TabsTrigger>
            <TabsTrigger
              value="cases"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-white"
            >
              Cases
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-white"
            >
              Study Materials
            </TabsTrigger>
            <TabsTrigger
              value="bookmarks"
              className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-white"
            >
              Bookmarks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-2 border-black hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-black">Constitutional Law: Fundamental Rights Analysis</CardTitle>
                      <CardDescription className="text-gray-700">
                        A comprehensive analysis of fundamental rights under the Indian Constitution
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>15 min read</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>Research Article</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gold-500 text-black">Constitutional Law</Badge>
                    <Badge className="bg-gold-500 text-black">Fundamental Rights</Badge>
                    <Badge className="bg-gold-500 text-black">Supreme Court</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This article explores the evolution of fundamental rights in India, examining key Supreme Court
                    judgments and their impact on constitutional interpretation...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">By Prof. Rajesh Kumar • NLSIU Bangalore</div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-gold-500"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                        Read Article
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-black">Contract Law: Essentials and Modern Applications</CardTitle>
                      <CardDescription className="text-gray-700">
                        Understanding the fundamentals of contract law in contemporary legal practice
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>12 min read</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>Study Guide</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gold-500 text-black">Contract Law</Badge>
                    <Badge className="bg-gold-500 text-black">Commercial Law</Badge>
                    <Badge className="bg-gold-500 text-black">Legal Practice</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    A detailed examination of contract law principles, including offer and acceptance, consideration,
                    and breach of contract remedies in modern legal contexts...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">By Dr. Priya Sharma • NALSAR Hyderabad</div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-gold-500"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                        Read Article
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-black">Criminal Law Reforms: Recent Developments</CardTitle>
                      <CardDescription className="text-gray-700">
                        Analysis of recent amendments and their implications for criminal justice
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>20 min read</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>Research Paper</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gold-500 text-black">Criminal Law</Badge>
                    <Badge className="bg-gold-500 text-black">Legal Reforms</Badge>
                    <Badge className="bg-gold-500 text-black">Justice System</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This comprehensive paper examines recent criminal law reforms in India, analyzing their impact on
                    the justice system and procedural changes...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      By Justice (Retd.) A.K. Verma • Former Supreme Court Judge
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-gold-500"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                        Read Article
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-2 border-black hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-black">Kesavananda Bharati v. State of Kerala (1973)</CardTitle>
                      <CardDescription className="text-gray-700">
                        Landmark case establishing the basic structure doctrine
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Scale className="w-4 h-4 mr-1" />
                      <span>Supreme Court</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>Constitutional Law</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gold-500 text-black">Constitutional Law</Badge>
                    <Badge className="bg-gold-500 text-black">Basic Structure</Badge>
                    <Badge className="bg-gold-500 text-black">Landmark Case</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This historic judgment established the basic structure doctrine, limiting Parliament's power to
                    amend the Constitution and protecting its fundamental features...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Citation: AIR 1973 SC 1461</div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-gold-500"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                        Read Case
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-black hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-black">Constitutional Law Study Notes</CardTitle>
                  <CardDescription className="text-gray-700">
                    Comprehensive notes covering all major topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">PDF • 156 pages</div>
                    <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-black">Contract Law Case Compilation</CardTitle>
                  <CardDescription className="text-gray-700">Important cases with detailed analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">PDF • 89 pages</div>
                    <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No bookmarks yet</h3>
              <p className="text-gray-500">Start bookmarking articles and cases to access them quickly</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
