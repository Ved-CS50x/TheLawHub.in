"use client"

import { useEffect, useState } from "react"
import { NewsArticleCard } from "@/components/news-article-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { FadeInSection } from "@/components/fade-in-section"

interface Article {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const pageSize = 9

  const fetchNews = async (page: number, query: string = "") => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/news?page=${page}&pageSize=${pageSize}&q=${encodeURIComponent(query)}`
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch news")
      }

      setArticles(data.articles)
      setTotalResults(data.totalResults)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(currentPage, searchQuery)
  }, [currentPage, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchNews(1, searchQuery)
  }

  const totalPages = Math.ceil(totalResults / pageSize)

  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <FadeInSection delay={100}>
            <div className="mb-8 bg-black text-white p-6 rounded-lg">
              <h1 className="text-4xl font-serif font-bold text-white mb-2">Legal News</h1>
              <p className="text-gold-500 font-serif">Stay updated with the latest legal developments and court proceedings</p>
            </div>
          </FadeInSection>

          {/* Search and Filters */}
          <FadeInSection delay={200}>
            <div className="mb-8 space-y-4">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search news articles..."
                    className="pl-10 border-2 border-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-gold-500 text-black hover:bg-gold-600">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button type="button" variant="outline" className="border-2 border-black">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </form>
            </div>
          </FadeInSection>

          {/* Error Message */}
          {error && (
            <FadeInSection>
              <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            </FadeInSection>
          )}

          {/* Loading State */}
          {loading ? (
            <FadeInSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          ) : (
            <>
              {/* News Grid */}
              <FadeInSection delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {articles.map((article, index) => (
                    <NewsArticleCard key={article.url + index} article={article} />
                  ))}
                </div>
              </FadeInSection>

              {/* Pagination */}
              {totalPages > 1 && (
                <FadeInSection delay={400}>
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <Button
                        variant="outline"
                        className="border-2 border-black"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="mx-4 flex items-center">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        className="border-2 border-black"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </Pagination>
                  </div>
                </FadeInSection>
              )}
            </>
          )}
        </div>
      </div>
    </FadeInSection>
  )
} 