import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const access_token = request.cookies.get('access_token')

  if (access_token) {
    if (['/', '/log-in', '/sign-up', '/forgot-password'].includes(pathname)) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }
  else {
    if (!['/log-in', '/sign-up', '/forgot-password'].includes(pathname)) {
      return NextResponse.redirect(new URL('/log-in', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|examples).*)',
  ],
}