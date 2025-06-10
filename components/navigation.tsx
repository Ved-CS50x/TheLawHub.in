"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Scale, Menu, BookOpen, MessageSquare, Newspaper, BookMarked, Briefcase, Bot } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/library", label: "Library", icon: BookOpen },
    { href: "/forum", label: "Forum", icon: MessageSquare },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/dictionary", label: "Dictionary", icon: BookMarked },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/ai-simplifier", label: "AI Tool", icon: Bot },
  ]

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-gold-500" />
            <span className="text-xl font-bold text-white">The Law Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-300 hover:text-gold-500 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="border-gold-500 text-gold-500 bg-black hover:bg-gold-500 hover:text-black"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gold-500 text-black hover:bg-gold-600">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="border-gold-500 text-gold-500 bg-black">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-black border-gray-800">
              <div className="flex flex-col space-y-6 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-gold-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg">{item.label}</span>
                  </Link>
                ))}
                <div className="pt-6 border-t border-gray-800 space-y-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gold-500 text-gold-500 bg-black hover:bg-gold-500 hover:text-black"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
