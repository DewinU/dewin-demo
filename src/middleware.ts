import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/todos']
  const currentPath = req.nextUrl.pathname
  const isProtected = protectedRoutes.includes(currentPath)

  const cookie = req.cookies.get('session')?.value
  const session = await decrypt(cookie)

  if (isProtected && !session?.id)
    return NextResponse.redirect(new URL('/register', req.nextUrl))

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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
