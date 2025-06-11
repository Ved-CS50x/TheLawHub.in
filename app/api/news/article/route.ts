import { NextResponse } from "next/server"

const NEWS_API_KEY = "pub_71a04e3e9deb4936a5980591223d042c"
const NEWS_API_BASE_URL = "https://newsdata.io/api/1"

interface NewsDataArticle {
  title: string
  description: string
  link: string
  image_url: string | null
  pubDate: string
  source_id: string
  content: string
  country: string[]
  category: string[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    )
  }

  try {
    // Try to find the article by URL
    const searchUrl = `${NEWS_API_BASE_URL}/news?` + 
      new URLSearchParams({
        q: url,
        size: '1',  // We only need one result
        language: 'en',
        apikey: NEWS_API_KEY
      })
    
    console.log('Fetching article from NewsData:', searchUrl)

    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TheLawHub/1.0'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NewsData Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: searchUrl
      })
      throw new Error(`NewsData error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('NewsData Response:', {
      found: data.results?.length > 0,
      url: url,
      totalResults: data.totalResults
    })

    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      console.log('Article not found:', url)
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }

    // Find the exact article by matching the URL
    const article = data.results.find((article: NewsDataArticle) => 
      article.link === url || article.link.replace(/\/$/, '') === url.replace(/\/$/, '')
    )

    if (!article) {
      console.log('Article not found:', url)
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      title: article.title || 'Untitled Article',
      description: article.description || 'No description available',
      url: article.link || url,
      imageUrl: article.image_url || null,
      publishedAt: article.pubDate || new Date().toISOString(),
      source: article.source_id || 'Legal News Source',
      content: article.content || '',
      country: article.country || [],
      category: article.category || []
    })
  } catch (error) {
    console.error("News API Error:", error)
    return NextResponse.json(
      { 
        error: "Failed to fetch article",
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 