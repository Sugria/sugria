'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from './ui/button'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image
          src={isScrolled || isMenuOpen ? '/logo-black.png' : '/logo.png'}
          alt="Sugria Logo"
          width={180}
          height={77}
          className="transition-opacity duration-300"
        />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {['About Us', 'Impact', 'Blog'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`hover:underline transition-all ${
                isScrolled || isMenuOpen ? 'text-gray-600' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
          <Button className="bg-[#2E8A57] hover:bg-opacity-90">
            <a href="#contact">Contact us</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-5 flex flex-col justify-between ${isScrolled || isMenuOpen ? 'text-gray-600' : 'text-white'}`}>
            {isMenuOpen ? (
              <>
                <span className={`w-full h-0.5 ${isScrolled || isMenuOpen ? 'bg-gray-600' : 'bg-white'} transition-all duration-300 transform rotate-45 translate-y-2`}></span>
                <span className={`w-full h-0.5 ${isScrolled || isMenuOpen ? 'bg-gray-600' : 'bg-white'} transition-all duration-300 opacity-0`}></span>
                <span className={`w-full h-0.5 ${isScrolled || isMenuOpen ? 'bg-gray-600' : 'bg-white'} transition-all duration-300 transform -rotate-45 -translate-y-2`}></span>
              </>
            ) : (
              <>
                <span className={`w-full h-0.5 ${isScrolled || isMenuOpen ? 'bg-gray-600' : 'bg-white'} transition-all duration-300`}></span>
                <span className={`w-full h-0.5 ${isScrolled || isMenuOpen ? 'bg-gray-600' : 'bg-white'} transition-all duration-300`}></span>
                <span className={`w-full h-0.5 ${isScrolled || isMenuOpen ? 'bg-gray-600' : 'bg-white'} transition-all duration-300`}></span>
              </>
            )}
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ${
            isMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible'
          }`}
        >
          <div className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {['About Us', 'Impact', 'Blog'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-600 hover:underline transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button className="bg-[#2E8A57] hover:bg-opacity-90" onClick={() => setIsMenuOpen(false)}>
                <a href="#contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header