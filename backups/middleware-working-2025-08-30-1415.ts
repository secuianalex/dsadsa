import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /en to root
  if (pathname === '/en' || pathname === '/en/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect /en/languages to /languages
  if (pathname.startsWith('/en/languages')) {
    const newPath = pathname.replace('/en', '')
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // Redirect /en/paths to /paths
  if (pathname.startsWith('/en/paths')) {
    const newPath = pathname.replace('/en', '')
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // Redirect /en/lessons to /lessons
  if (pathname.startsWith('/en/lessons')) {
    const newPath = pathname.replace('/en', '')
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/en',
    '/en/:path*',
  ],
}
