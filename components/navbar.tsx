"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Scale,
  Menu,
  Bell,
  BookOpen,
  MessageSquare,
  Newspaper,
  BookMarked,
  Briefcase,
  Bot,
  User,
  LogOut,
  Users,
} from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Always show navbar when at the top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide navbar when scrolling down (after 100px)
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Show navbar when scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlNavbar)
    return () => window.removeEventListener("scroll", controlNavbar)
  }, [lastScrollY])

  const navItems = [
    { href: "/home", label: "Home", icon: BookOpen },
    { href: "/library", label: "Library", icon: BookOpen },
    { href: "/forum", label: "Forum", icon: MessageSquare },
    { href: "/connect", label: "Connect", icon: Users },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/dictionary", label: "Dictionary", icon: BookMarked },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/ai-simplifier", label: "AI Tool", icon: Bot },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav
      ref={navRef}
      className={`bg-black border-b border-gray-800 sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-gold-500" />
            <span className="text-xl font-bold text-white">The Law Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  isActive(item.href)
                    ? "text-gold-500"
                    : "text-gray-300 hover:text-gold-500"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-gold-500"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="@user" />
                    <AvatarFallback className="bg-gold-500 text-black">
                      AK
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Arjun Kumar</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      NLSIU Bangalore
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="cursor-pointer flex w-full items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/"
                    className="cursor-pointer flex w-full items-center text-red-500 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="border-gold-500 text-gold-500 bg-black"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-black border-gray-800">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
                      <AvatarFallback className="bg-gold-500 text-black">
                        AK
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Arjun Kumar</p>
                      <p className="text-xs text-gray-400">NLSIU Bangalore</p>
                    </div>
                  </div>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 transition-colors ${
                      isActive(item.href)
                        ? "text-gold-500"
                        : "text-gray-300 hover:text-gold-500"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg">{item.label}</span>
                  </Link>
                ))}

                <div className="pt-6 border-t border-gray-800 space-y-4">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 text-gray-300 hover:text-gold-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">Profile</span>
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center space-x-3 text-red-500 hover:text-red-400"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg">Log out</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
