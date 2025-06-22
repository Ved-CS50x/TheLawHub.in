"use client"

import { useState, useEffect } from "react"
import { FadeInSection } from "@/components/fade-in-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, Download, Calendar, User, Tag, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

interface LibraryResource {
  id: string
  title: string
  authors: string[]
  subjects: string[]
  description: string[]
  date: string
  type: string
  format: string[]
  url: string
  language: string[]
  rights: string[]
  setSpec: string[]
}

interface LibraryResponse {
  resources: LibraryResource[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resourceType, setResourceType] = useState("all")
  const [subject, setSubject] = useState("all")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<LibraryResponse | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [subscribed, setSubscribed] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      setError(null)
      let query = supabase
        .from('library_resources')
        .select('*')
        .range((page - 1) * 9, page * 9 - 1)
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`)
      }
      if (resourceType !== 'all') {
        query = query.eq('type', resourceType)
      }
      if (subject !== 'all') {
        query = query.contains('subjects', [subject])
      }
      const { data, error, count } = await query
      if (error) setError(error.message)
      else setData({
        resources: data || [],
        total: count || 0,
        page,
        pageSize: 9,
        hasMore: (data?.length || 0) === 9
      })
      setLoading(false)
    }
    const debounceTimer = setTimeout(fetchResources, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, resourceType, subject, page])

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await fetch("/api/subscription/status")
        const json = await res.json()
        setSubscribed(json.subscribed)
      } catch {
        setSubscribed(false)
      }
    }
    checkSubscription()
  }, [])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const handleTypeChange = (value: string) => {
    setResourceType(value)
    setPage(1)
  }

  const handleSubjectChange = (value: string) => {
    setSubject(value)
    setPage(1)
  }

  const handleLoadMore = async () => {
    if (!data?.hasMore || isLoadingMore) return
    
    setIsLoadingMore(true)
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        pageSize: "9",
        q: searchQuery,
        type: resourceType,
        subject: subject
      })

      const response = await fetch(`/api/library?${params}`)
      if (!response.ok) throw new Error("Failed to fetch more resources")
      
      const newData = await response.json()
      setData(prev => prev ? {
        ...newData,
        resources: [...prev.resources, ...newData.resources]
      } : newData)
      setPage(p => p + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more resources")
    } finally {
      setIsLoadingMore(false)
    }
  }

  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <FadeInSection delay={100}>
            <div className="mb-8 bg-black text-white p-6 rounded-lg text-center">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-12 h-12 text-gold-500 mr-3" />
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white">TheLawHub Repository</h1>
                  <p className="text-lg text-gold-500 font-medium">Access Academic Resources tailored for Students</p>
                </div>
              </div>
              <p className="text-gold-500 max-w-2xl mx-auto">
                Explore TheLawHub's repository of academic papers, research articles, and legal resources that is actually useful for Papers and Exams.
              </p>
            </div>
          </FadeInSection>

          {/* Search and Filters */}
          <FadeInSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 border-2 border-black"
                />
              </div>
              <Select value={resourceType} onValueChange={handleTypeChange}>
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Resource Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="thesis">Theses</SelectItem>
                  <SelectItem value="working_paper">Working Papers</SelectItem>
                  <SelectItem value="book">Books</SelectItem>
                  <SelectItem value="conference">Conference Papers</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Subject Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="constitutional">Constitutional Law</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="commercial">Commercial Law</SelectItem>
                  <SelectItem value="international">International Law</SelectItem>
                  <SelectItem value="environmental">Environmental Law</SelectItem>
                  <SelectItem value="human rights">Human Rights</SelectItem>
                  <SelectItem value="intellectual property">Intellectual Property</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FadeInSection>

          {/* Resources Grid */}
          <FadeInSection delay={300}>
            {error ? (
              <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-2 border-black bg-white">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(subscribed === false && data?.resources ? data.resources.slice(0, 5) : data?.resources || []).map(resource => (
                    <Card key={resource.id} className="border-2 border-black bg-white">
                      <CardHeader>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>{resource.authors.join(", ")}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2 text-sm text-gray-700">{resource.description[0]}</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {resource.subjects.map((s, i) => <Badge key={i}>{s}</Badge>)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-4 h-4" /> {resource.date}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" /> View Resource
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                {subscribed === false && (
                  <div className="mt-8 flex flex-col items-center">
                    <div className="bg-white/70 border border-black/10 rounded-xl px-6 py-4 shadow-md backdrop-blur-sm text-center max-w-xl mx-auto">
                      <div className="text-lg font-semibold text-black/80 mb-2">Subscribe to unlock the full library</div>
                      <div className="text-sm text-black/60 mb-4">Get unlimited access to all resources by subscribing. Preview is limited to 5 documents monthly.</div>
                      <Button className="bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full px-6 py-2 shadow-lg transition-all" onClick={() => router.push("/subscribe")}>Buy Subscription</Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </FadeInSection>

          {/* Load More Button */}
          {data?.hasMore && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                className="border-2 border-black"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}

          {data && data.total === 0 && (
            <div className="text-center text-gray-500 py-8">
              No resources found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </FadeInSection>
  )
}
