import Link from "next/link"
import { Scale, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-amber-400" />
              <span className="text-xl font-bold">The Law Hub</span>
            </Link>
            <p className="text-gray-400">
              Empowering law students across India's National Law Universities with comprehensive resources and
              community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/library" className="block text-gray-400 hover:text-white transition-colors">
                Legal Library
              </Link>
              <Link href="/forum" className="block text-gray-400 hover:text-white transition-colors">
                Discussion Forum
              </Link>
              <Link href="/news" className="block text-gray-400 hover:text-white transition-colors">
                Legal News
              </Link>
              <Link href="/dictionary" className="block text-gray-400 hover:text-white transition-colors">
                Legal Dictionary
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Resources</h3>
            <div className="space-y-2">
              <Link href="/jobs" className="block text-gray-400 hover:text-white transition-colors">
                Jobs & Internships
              </Link>
              <Link href="/ai-simplifier" className="block text-gray-400 hover:text-white transition-colors">
                AI Text Simplifier
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Connect</h3>
            <div className="space-y-4">
              <p className="text-gray-400">Join our community of law students and legal professionals.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Law Hub. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
