"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FadeInSection } from "@/components/fade-in-section"

interface Article {
  title: string
  description: string
  content: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
  author: string | null
}

export default function ArticlePage() {
  const searchParams = useSearchParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const url = searchParams.get("url")
      if (!url) {
        setError("Article URL not provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`/api/news/article?url=${encodeURIComponent(url)}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch article")
        }

        setArticle(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch article")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [searchParams])

  if (loading) {
    return (
      <FadeInSection>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    )
  }

  if (error || !article) {
    return (
      <FadeInSection>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-red-600">
              <h2 className="text-xl font-bold mb-2">Error</h2>
              <p>{error || "Article not found"}</p>
              <Button asChild className="mt-4 bg-gold-500 text-black hover:bg-gold-600">
                <Link href="/news">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to News
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeInSection>
    )
  }

  const publishedDate = new Date(article.publishedAt)
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <FadeInSection delay={100}>
            <Button asChild variant="outline" className="mb-8 border-2 border-black">
              <Link href="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </FadeInSection>

          {/* Article Header */}
          <FadeInSection delay={200}>
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold text-black mb-4">{article.title}</h1>
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{article.source.name}</span>
                  {article.author && <span>• {article.author}</span>}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {formattedDate}
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Article Image */}
          {article.urlToImage && (
            <FadeInSection delay={300}>
              <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeInSection>
          )}

          {/* Article Content */}
          <FadeInSection delay={400}>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-serif">{article.description}</p>
              <div className="text-gray-600 font-serif leading-relaxed">
                {article.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Original Article Link */}
          <FadeInSection delay={500}>
            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <Button asChild className="bg-gold-500 text-black hover:bg-gold-600">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Original Article
                </a>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </FadeInSection>
  )
} 