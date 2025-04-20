import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/verify-email',      
  '/verify-email/code',
]

const publicPaths = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const authCookie = request.cookies.get('auth_token') 

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath && !authCookie) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isPublicPath && authCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|images|favicon.ico).*)',
  ],
} 