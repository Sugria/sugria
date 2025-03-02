import { Inter } from 'next/font/google'
import './globals.css'
import { CLOUDINARY_URLS } from '@/config/cloudinary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sugria',
  description: 'Sustainable Green Revolution in Africa',
  icons: {
    icon: [
      { url: CLOUDINARY_URLS.favicon + '.ico' },
      { url: CLOUDINARY_URLS.favicon + '-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: CLOUDINARY_URLS.favicon + '-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: CLOUDINARY_URLS.favicon + '-apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: 'Sugria',
    description: 'Sustainable Green Revolution in Africa',
    url: 'https://sugria.vercel.app',
    siteName: 'Sugria',
    images: [
      {
        url: CLOUDINARY_URLS.thumbnail + '.jpg',
        width: 1200,
        height: 630,
        alt: 'Sugria - Sustainable Green Revolution in Africa',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sugria',
    description: 'Sustainable Green Revolution in Africa',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}