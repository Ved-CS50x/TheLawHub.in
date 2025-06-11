import { NextResponse } from 'next/server'

const NEWS_API_KEY = 'pub_71a04e3e9deb4936a5980591223d042c'
const NEWS_API_BASE_URL = 'https://newsdata.io/api/1'

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

interface TransformedArticle {
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  source: {
    name: string
  }
  content: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const page = parseInt(searchParams.get('page') || '1')
  const query = searchParams.get('q') || ''

  try {
    // First, try to get Indian legal news
    const indianLegalQuery = query 
      ? `(${query}) AND (India OR Indian) AND (legal OR law OR court OR judiciary OR "supreme court" OR "high court" OR "bar council")`
      : '(India OR Indian) AND (legal OR law OR court OR judiciary OR "supreme court" OR "high court" OR "bar council")'

    // Calculate the next page token based on the page number
    // newsdata.io uses a nextPage token for pagination
    const nextPage = page > 1 ? (page - 1).toString() : undefined

    const indianUrl = `${NEWS_API_BASE_URL}/news?` + 
      new URLSearchParams({
        q: indianLegalQuery,
        size: pageSize.toString(),
        ...(nextPage && { nextPage }),
        language: 'en',
        apikey: NEWS_API_KEY
      })

    console.log('Fetching Indian legal news from NewsData:', indianUrl)

    const indianResponse = await fetch(indianUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TheLawHub/1.0'
      },
      cache: 'no-store'
    })

    if (!indianResponse.ok) {
      const errorText = await indianResponse.text()
      console.error('NewsData Error:', {
        status: indianResponse.status,
        statusText: indianResponse.statusText,
        error: errorText,
        url: indianUrl
      })
      throw new Error(`NewsData error: ${indianResponse.status} ${indianResponse.statusText}`)
    }

    const indianData = await indianResponse.json()
    console.log('NewsData Response (Indian Legal):', {
      totalResults: indianData.totalResults,
      articleCount: indianData.results?.length || 0,
      query: indianLegalQuery,
      nextPage: indianData.nextPage
    })

    let articles: TransformedArticle[] = []
    let totalResults = 0
    let nextPageToken = indianData.nextPage

    if (indianData.results && Array.isArray(indianData.results) && indianData.results.length > 0) {
      // If we have Indian legal news, use those articles
      articles = indianData.results.map((article: NewsDataArticle): TransformedArticle => ({
        title: article.title || 'Untitled Article',
        description: article.description || 'No description available',
        url: article.link || '#',
        urlToImage: article.image_url || null,
        publishedAt: article.pubDate || new Date().toISOString(),
        source: {
          name: article.source_id || 'Legal News Source'
        },
        content: article.content || ''
      })).filter((article: TransformedArticle): boolean => article.title !== 'Untitled Article')
      totalResults = indianData.totalResults || articles.length
    } else {
      // If no Indian legal news found, try general legal news
      console.log('No Indian legal news found, trying general legal news...')
      const generalLegalQuery = query 
        ? `${query} AND (legal OR law OR court OR judiciary)`
        : 'legal OR law OR court OR judiciary'

      const generalUrl = `${NEWS_API_BASE_URL}/news?` + 
        new URLSearchParams({
          q: generalLegalQuery,
          size: pageSize.toString(),
          ...(nextPage && { nextPage }),
          language: 'en',
          apikey: NEWS_API_KEY
        })

      const generalResponse = await fetch(generalUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TheLawHub/1.0'
        },
        cache: 'no-store'
      })

      if (generalResponse.ok) {
        const generalData = await generalResponse.json()
        if (generalData.results && Array.isArray(generalData.results)) {
          articles = generalData.results.map((article: NewsDataArticle): TransformedArticle => ({
            title: article.title || 'Untitled Article',
            description: article.description || 'No description available',
            url: article.link || '#',
            urlToImage: article.image_url || null,
            publishedAt: article.pubDate || new Date().toISOString(),
            source: {
              name: article.source_id || 'Legal News Source'
            },
            content: article.content || ''
          })).filter((article: TransformedArticle): boolean => article.title !== 'Untitled Article')
          totalResults = generalData.totalResults || articles.length
          nextPageToken = generalData.nextPage
        }
      }
    }

    // If still no articles found, try a fallback query
    if (articles.length === 0) {
      console.log('No articles found, trying fallback query...')
      const fallbackUrl = `${NEWS_API_BASE_URL}/news?` + 
        new URLSearchParams({
          q: 'India legal news',
          size: pageSize.toString(),
          language: 'en',
          apikey: NEWS_API_KEY
        })

      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'TheLawHub/1.0'
        },
        cache: 'no-store'
      })

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        if (fallbackData.results && Array.isArray(fallbackData.results)) {
          articles = fallbackData.results.map((article: NewsDataArticle): TransformedArticle => ({
            title: article.title || 'Untitled Article',
            description: article.description || 'No description available',
            url: article.link || '#',
            urlToImage: article.image_url || null,
            publishedAt: article.pubDate || new Date().toISOString(),
            source: {
              name: article.source_id || 'Legal News Source'
            },
            content: article.content || ''
          })).filter((article: TransformedArticle): boolean => article.title !== 'Untitled Article')
          totalResults = fallbackData.totalResults || articles.length
          nextPageToken = fallbackData.nextPage
        }
      }
    }

    return NextResponse.json({
      articles,
      totalResults,
      status: 'ok',
      isIndianNews: articles.length > 0 && articles[0].title.toLowerCase().includes('india'),
      nextPage: nextPageToken
    })
  } catch (error) {
    console.error('News API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch news',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 