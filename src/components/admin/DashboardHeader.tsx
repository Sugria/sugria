'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Menu, LogOut } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardHeader() {
  const router = useRouter()
  const { logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Image 
              src="/logo-black.png"
              alt="SUGRIA Logo"
              width={120}
              height={40}
              className="h-auto"
            />
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-[#1A5D3A]"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/admin/dashboard" 
                className="text-gray-600 hover:text-[#1A5D3A] px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/members" 
                className="text-gray-600 hover:text-[#1A5D3A] px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Members
              </Link>
              <Link 
                href="/admin/applications" 
                className="text-gray-600 hover:text-[#1A5D3A] px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Applications
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-[#1A5D3A] px-2"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 