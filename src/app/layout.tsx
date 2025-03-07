import './globals.css'
import { CLOUDINARY_URLS } from '@/config/cloudinary'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata = {
  title: 'SUGRiA',
  description: 'Sustainable Green Revolution in Africa',
  icons: {
    icon: CLOUDINARY_URLS.favicon,
  },
  openGraph: {
    title: 'SUGRiA',
    description: 'Sustainable Green Revolution in Africa',
    images: [CLOUDINARY_URLS.thumbnail],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}