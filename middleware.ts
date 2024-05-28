import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const XSRF092 = request.cookies.get('XSRF092')
  const XSRF081 = request.cookies.get('XSRF081')

  if (!XSRF081) {
    const protectedPaths = [
      '/dashboard/complete-profile',
      '/dashboard'
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (!XSRF092) {
    const protectedPaths = [
      '/admin/lemdiklat/dashboard',
      '/admin/lemdiklat/pelatihan',
      '/admin/lemdiklat/pelatihan/tambah-pelatihan',
      '/admin/lemdiklat/pelatihan/penerbitan-sttpl',
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    const protectedPaths = ['/admin/auth/login']

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL('/admin/lemdiklat/pelatihan', request.url),
      )
    }
  }

}
