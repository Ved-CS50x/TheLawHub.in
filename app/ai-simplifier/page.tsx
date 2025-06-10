"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bot, Copy, RefreshCw, Sparkles, FileText } from "lucide-react"

export default function AISimplifierPage() {
  const [inputText, setInputText] = useState("")
  const [simplifiedText, setSimplifiedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSimplify = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setSimplifiedText(
        `Simplified version: ${inputText.substring(0, 100)}... (This is a demo - in production, this would connect to an AI service to simplify complex legal text into easier-to-understand language.)`,
      )
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(simplifiedText)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 bg-black text-white p-6 rounded-lg text-center">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-gold-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">AI Text Simplifier</h1>
          </div>
          <p className="text-gold-500 max-w-2xl mx-auto">
            Transform complex legal texts into clear, easy-to-understand language using our AI-powered simplification
            tool
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-2 border-black bg-white">
            <CardContent className="p-6">
              <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Smart Simplification</h3>
              <p className="text-sm text-gray-600">
                AI-powered analysis that maintains legal accuracy while improving readability
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-black bg-white">
            <CardContent className="p-6">
              <FileText className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Context Aware</h3>
              <p className="text-sm text-gray-600">Understands legal context to provide appropriate simplifications</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-black bg-white">
            <CardContent className="p-6">
              <RefreshCw className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2">Instant Results</h3>
              <p className="text-sm text-gray-600">Get simplified text in seconds, perfect for quick understanding</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tool */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2 border-black bg-white">
            <CardHeader>
              <CardTitle className="text-black">Original Text</CardTitle>
              <CardDescription className="text-gray-700">
                Paste your complex legal text here to simplify it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your legal text here... For example: 'The aforementioned party of the first part hereby agrees to indemnify and hold harmless the party of the second part against any and all claims, damages, losses, and expenses...'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none border-2 border-black"
              />
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{inputText.length} characters</div>
                <Button
                  onClick={handleSimplify}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gold-500 text-black hover:bg-gold-600"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Simplifying...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4 mr-2" />
                      Simplify Text
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="border-2 border-black bg-white">
            <CardHeader>
              <CardTitle className="text-black">Simplified Text</CardTitle>
              <CardDescription className="text-gray-700">AI-generated simplified version of your text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[300px] p-4 bg-gold-50 rounded-lg border-2 border-gold-500">
                {simplifiedText ? (
                  <p className="text-gray-800 leading-relaxed">{simplifiedText}</p>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Simplified text will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              {simplifiedText && (
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-500 text-white">Simplified Successfully</Badge>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-black text-black hover:bg-black hover:text-gold-500"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Text
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage Tips */}
        <Card className="mt-8 border-2 border-black bg-white">
          <CardHeader>
            <CardTitle className="text-black">How to Use the AI Simplifier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-black mb-3">Best Practices:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Paste complete sentences or paragraphs for better context</li>
                  <li>• Include relevant legal terms that need simplification</li>
                  <li>• Review simplified text for accuracy and completeness</li>
                  <li>• Use for study purposes and initial understanding</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-3">Perfect For:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Complex case law and judgments</li>
                  <li>• Legal articles and research papers</li>
                  <li>• Statutory provisions and amendments</li>
                  <li>• Contract clauses and legal documents</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
