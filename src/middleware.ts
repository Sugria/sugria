import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add console log for debugging
  console.log('Middleware checking path:', request.nextUrl.pathname)

  // Check if it's an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the main admin page (login page)
    if (request.nextUrl.pathname === '/admin') {
      console.log('Allowing access to main admin page')
      return NextResponse.next()
    }

    // Check for authentication
    const isAuthenticated = request.cookies.get('isAdminAuthenticated')?.value === 'true'
    console.log('Auth check:', { isAuthenticated })
    
    if (!isAuthenticated) {
      console.log('Redirecting to admin login')
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 