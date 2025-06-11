"use client"

import { useState } from "react"
import { FadeInSection } from "@/components/fade-in-section"

export default function AIToolsPage() {
  const [inputText, setInputText] = useState("")
  const [simplifiedText, setSimplifiedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSimplify = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to simplify")
      return
    }

    setIsLoading(true)
    setError("")
    setSimplifiedText("")

    try {
      const response = await fetch("/api/ai-simplify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to simplify text")
      }

      setSimplifiedText(data.simplifiedText)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Legal Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplify complex legal documents and make them more accessible with our AI-powered tools
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Legal Text Simplifier
            </h2>
            <p className="text-gray-600 mb-6">
              Paste your legal text below, and our AI will simplify it while maintaining accuracy and highlighting important legal implications.
            </p>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="input-text"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Original Legal Text
                </label>
                <textarea
                  id="input-text"
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste your legal text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <button
                onClick={handleSimplify}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Simplifying..." : "Simplify Text"}
              </button>

              {error && (
                <div className="text-red-600 bg-red-50 p-4 rounded-md">
                  {error}
                </div>
              )}

              {simplifiedText && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Simplified Text
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                    <div className="prose max-w-none">
                      {simplifiedText.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="text-blue-600 text-2xl font-bold mb-2">1</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Paste Your Text
                </h3>
                <p className="text-gray-600">
                  Copy and paste any legal document, clause, or court text that you want to understand better.
                </p>
              </div>
              <div className="p-4">
                <div className="text-blue-600 text-2xl font-bold mb-2">2</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  AI Processing
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes the text and breaks it down into simpler terms while maintaining legal accuracy.
                </p>
              </div>
              <div className="p-4">
                <div className="text-blue-600 text-2xl font-bold mb-2">3</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Get Simplified Version
                </h3>
                <p className="text-gray-600">
                  Receive a clear, easy-to-understand explanation with important legal implications highlighted.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
} 