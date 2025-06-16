"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, AlertCircle, ArrowRight, X } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LEGAL_TERMS } from "./legal-terms/legal-terms-index"

// Define a type for legal terms
export interface LegalTerm {
  term: string;
  definition: string;
  link?: string;
  category?: string;
  usage?: string;
}

// Categories for filtering
const CATEGORIES = [
  "All",
  "Constitutional Law",
  "Criminal Law",
  "Civil Procedure",
  "Contract Law",
  "Tort Law",
  "Jurisprudence",
  "Evidence Law",
  "Remedies",
]

// Helper to group terms by first letter
function groupTermsByLetter(terms: LegalTerm[]) {
  const groups: { [letter: string]: LegalTerm[] } = {}
  terms.forEach(term => {
    const letter = term.term[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(term)
  })
  return groups
}

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTerms, setFilteredTerms] = useState<LegalTerm[]>(LEGAL_TERMS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [noResults, setNoResults] = useState(false)
  const sectionRefs = useRef<{ [letter: string]: HTMLDivElement | null }>({})

  // Handle search input change with validation
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric characters, spaces, and some punctuation
    const validatedInput = e.target.value.replace(/[^\w\s.,'-]/gi, "")
    setSearchTerm(validatedInput)
  }

  // Handle search submission to redirect to Wex
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchTerm.trim()) {
      // Create Google site search URL for Wex
      const searchQuery = encodeURIComponent(searchTerm.trim())
      const wexSearchUrl = `https://www.google.com/search?q=site:law.cornell.edu/wex+${searchQuery}`

      // Open in new tab
      window.open(wexSearchUrl, "_blank")
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
  }

  // Filter terms based on search term and category
  useEffect(() => {
    let results = LEGAL_TERMS

    // Filter by category if not "All"
    if (selectedCategory !== "All") {
      results = results.filter((term) => term.category === selectedCategory)
    }

    // Filter by search term if present
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      results = results.filter(
        (term) =>
          term.term.toLowerCase().includes(searchLower) ||
          term.definition.toLowerCase().includes(searchLower) ||
          term.usage?.toLowerCase().includes(searchLower) === true,
      )
    }

    setFilteredTerms(results)
    setNoResults(results.length === 0)
  }, [searchTerm, selectedCategory])

  // Grouped terms for display
  const groupedTerms = groupTermsByLetter(filteredTerms)
  const allLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

  // Scroll to section
  const scrollToLetter = (letter: string) => {
    const ref = sectionRefs.current[letter]
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <FadeInSection>
          <div className="mb-8 bg-black dark:bg-gray-800 text-white p-6 rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-gold-500 dark:text-gold-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">Legal Dictionary</h1>
            </div>
            <p className="text-gold-500 dark:text-gold-400 max-w-2xl mx-auto text-center">
              Comprehensive collection of legal terms and definitions for law students
            </p>
          </div>
        </FadeInSection>

        {/* Search Section */}
        <FadeInSection delay={200}>
          <Card className="mb-8 border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Search Legal Terms</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Search Cornell Law School's Wex Legal Dictionary & Encyclopedia for comprehensive legal definitions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search for legal terms in Wex Legal Dictionary..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10 border-2 border-black dark:border-gray-600 py-6 text-lg"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Powered by{" "}
                    <a
                      href="https://www.law.cornell.edu/wex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-600 hover:underline"
                    >
                      Cornell Law School's Wex
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="bg-gold-500 text-black hover:bg-gold-600"
                    disabled={!searchTerm.trim()}
                  >
                    Search Wex <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </form>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    className={`cursor-pointer ${
                      selectedCategory === category
                        ? "bg-gold-500 dark:bg-gold-600 text-black"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* A-Z Navigation Bar */}
        <FadeInSection delay={100}>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {allLetters.map(letter => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className="px-3 py-1 rounded font-bold text-black dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gold-500 dark:hover:bg-gold-600 transition-colors"
              >
                {letter}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Results Section */}
        <FadeInSection delay={400}>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-black dark:text-white">
              {noResults
                ? "No Results Found"
                : searchTerm
                  ? `Search Results (${filteredTerms.length})`
                  : `All Terms (${filteredTerms.length})`}
            </h2>
            {filteredTerms.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredTerms.length} of {LEGAL_TERMS.length} terms
              </div>
            )}
          </div>

          {/* No Results Message */}
          {noResults ? (
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center py-12">
              <CardContent className="flex flex-col items-center">
                <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Sorry, we couldn't find any legal terms matching "{searchTerm}" in the{" "}
                  {selectedCategory !== "All" ? selectedCategory : "dictionary"}.
                </p>
                <div className="mt-6 space-x-4">
                  <Button onClick={clearSearch} variant="outline">
                    Clear Search
                  </Button>
                  <Button
                    onClick={() => setSelectedCategory("All")}
                    className="bg-gold-500 text-black hover:bg-gold-600"
                  >
                    View All Terms
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              {allLetters.map(letter => (
                groupedTerms[letter] && groupedTerms[letter].length > 0 && (
                  <div
                    key={letter}
                    ref={el => {
                      sectionRefs.current[letter] = el;
                    }}
                    className="mb-10"
                  >
                    <h2 className="text-2xl font-bold text-gold-600 dark:text-gold-400 mb-4 border-b border-gold-400 pb-2">{letter}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {groupedTerms[letter].map((term, index) => (
                        <Card
                          key={term.term}
                          className="border-2 border-black dark:border-gray-700 hover:border-gold-500 dark:hover:border-gold-400 transition-colors bg-white dark:bg-gray-800"
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-black dark:text-white text-xl">{term.term}</CardTitle>
                                {term.link && (
                                  <a
                                    href={term.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline text-sm block mt-1"
                                  >
                                    View Full Definition
                                  </a>
                                )}
                                {term.category && (
                                  <Badge className="mt-2 bg-gold-500 dark:bg-gold-600 text-black">{term.category}</Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Definition</h4>
                              <p className="text-gray-800 dark:text-gray-200">{term.definition}</p>
                            </div>
                            {term.usage && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Usage Example</h4>
                                <p className="text-gray-700 dark:text-gray-300 italic">"{term.usage}"</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Pagination or Load More (for future implementation) */}
          {filteredTerms.length > 10 && (
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-black dark:border-gray-600 text-black dark:text-white">
                Load More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </FadeInSection>
      </div>
    </div>
  )
}
