"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, AlertCircle, ArrowRight, X } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"

// Sample dictionary data - in a real app, this would come from an API or database
const LEGAL_TERMS = [
  {
    term: "Habeas Corpus",
    definition:
      "A writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person's release unless lawful grounds are shown for their detention.",
    category: "Constitutional Law",
    usage: "The attorney filed a writ of habeas corpus to challenge the legality of her client's detention.",
  },
  {
    term: "Stare Decisis",
    definition:
      "A legal principle by which judges are obliged to respect the precedent established by prior decisions.",
    category: "Jurisprudence",
    usage: "The Supreme Court relied on stare decisis in upholding the previous ruling.",
  },
  {
    term: "Mens Rea",
    definition: "The intention or knowledge of wrongdoing that constitutes part of a crime.",
    category: "Criminal Law",
    usage: "The prosecution failed to prove mens rea, so the defendant was acquitted.",
  },
  {
    term: "Actus Reus",
    definition: "The action or conduct which is a constituent element of a crime.",
    category: "Criminal Law",
    usage: "The actus reus of theft is taking someone else's property without their consent.",
  },
  {
    term: "Res Judicata",
    definition:
      "A matter that has been adjudicated by a competent court and therefore may not be pursued further by the same parties.",
    category: "Civil Procedure",
    usage: "The defendant argued that the case should be dismissed based on res judicata.",
  },
  {
    term: "Prima Facie",
    definition: "Based on the first impression; accepted as correct until proved otherwise.",
    category: "Evidence Law",
    usage: "The prosecution established a prima facie case against the defendant.",
  },
  {
    term: "Obiter Dictum",
    definition:
      "A judge's expression of opinion uttered in court or in a written judgment, but not essential to the decision and therefore not legally binding as a precedent.",
    category: "Jurisprudence",
    usage: "The judge's comments about the legislation were merely obiter dictum.",
  },
  {
    term: "Ratio Decidendi",
    definition: "The point in a case that determines the judgment or the principle upon which the case was decided.",
    category: "Jurisprudence",
    usage: "Law students must learn to identify the ratio decidendi in court judgments.",
  },
  {
    term: "Tort",
    definition: "A civil wrong that causes someone else to suffer loss or harm, resulting in legal liability.",
    category: "Tort Law",
    usage: "The plaintiff filed a tort claim seeking damages for the injury.",
  },
  {
    term: "Injunction",
    definition: "A judicial order restraining a person from beginning or continuing an action.",
    category: "Remedies",
    usage: "The court granted an injunction preventing the company from using the disputed trademark.",
  },
  {
    term: "Writ",
    definition:
      "A formal written order issued by a court commanding the party to whom it is addressed to perform or cease performing a specified act.",
    category: "Constitutional Law",
    usage: "The Supreme Court issued a writ directing the government to explain its actions.",
  },
  {
    term: "Caveat Emptor",
    definition:
      "A principle that the buyer alone is responsible for checking the quality and suitability of goods before purchase.",
    category: "Contract Law",
    usage: "The doctrine of caveat emptor applied to the sale of the used car.",
  },
]

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

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTerms, setFilteredTerms] = useState(LEGAL_TERMS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [noResults, setNoResults] = useState(false)

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
          term.usage.toLowerCase().includes(searchLower),
      )
    }

    setFilteredTerms(results)
    setNoResults(results.length === 0)
  }, [searchTerm, selectedCategory])

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
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTerms.map((term, index) => (
                <Card
                  key={term.term}
                  className="border-2 border-black dark:border-gray-700 hover:border-gold-500 dark:hover:border-gold-400 transition-colors bg-white dark:bg-gray-800"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-black dark:text-white text-xl">{term.term}</CardTitle>
                        <Badge className="mt-2 bg-gold-500 dark:bg-gold-600 text-black">{term.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Definition</h4>
                      <p className="text-gray-800 dark:text-gray-200">{term.definition}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Usage Example</h4>
                      <p className="text-gray-700 dark:text-gray-300 italic">"{term.usage}"</p>
                    </div>
                  </CardContent>
                </Card>
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
