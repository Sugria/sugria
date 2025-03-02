'use client'
import AnimatedSection from './AnimatedSection'
import Image from 'next/image'
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <AnimatedSection className="bg-black text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div>
            <div className="flex">
              <Image 
                src="/logo.png"
                alt="Sugria Logo"
                width={140}
                height={60}
                className="mb-4"
              />
            </div>
            <p className="text-gray-400">
              Cultivating Sustainability,<br />
              Harvesting Hope
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:gap-16">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#impact" className="hover:text-white transition-colors">
                    Impact
                  </a>
                </li>
                <li>
                  <a href="#get-involved" className="hover:text-white transition-colors">
                    Get Involved
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sustainable Growers, 24 KG 2 Ave, Kigali, Rwanda</li>
                <li>Phone: +250 788 307 765</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <FaTwitter className="text-white text-xl" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <FaFacebook className="text-white text-xl" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <FaLinkedin className="text-white text-xl" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                <FaInstagram className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sugria. All rights reserved.</p>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Footer