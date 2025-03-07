import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value

  // Protect all admin routes except the login page
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin' && 
      !authToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Redirect authenticated users away from login page
  if (request.nextUrl.pathname === '/admin' && authToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 