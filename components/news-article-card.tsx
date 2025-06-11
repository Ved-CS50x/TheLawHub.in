import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NewsArticleCardProps {
  article: {
    title: string
    description: string
    url: string
    urlToImage: string | null
    publishedAt: string
    source: {
      name: string
    }
  }
}

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  // Format the date
  const publishedDate = new Date(article.publishedAt)
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Truncate description to ~100 words
  const truncatedDescription = article.description
    ? article.description.split(' ').slice(0, 50).join(' ') + '...'
    : ''

  return (
    <Link href={`/news/article?url=${encodeURIComponent(article.url)}`}>
      <Card className="border-2 border-black hover:border-gold-500 transition-all duration-300 hover:shadow-lg bg-white group">
        <CardHeader className="p-6">
          {article.urlToImage && (
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge className="bg-gold-500 text-black">{article.source.name}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
            </div>
            <CardTitle className="text-xl font-serif text-black group-hover:text-gold-600 transition-colors duration-300">
              {article.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-gray-600 font-serif leading-relaxed">
            {truncatedDescription}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
} 