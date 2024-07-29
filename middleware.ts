import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const XSRF092 = request.cookies.get('XSRF092')
  const XSRF081 = request.cookies.get('XSRF081')

  const XSRF095 = request.cookies.get('XSRF095') // DPKAKP ADMIN
  const XSRF096 = request.cookies.get('XSRF096') // DPKAKP USERS


  if (!XSRF081) {
    const protectedPaths = ['/dashboard/complete-profile', '/dashboard']

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    const protectedPaths = ['/registrasi', '/login']

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (!XSRF095) {
    const protectedPaths = [
      '/dpkakp/admin/dashboard',
      '/dpkakp/admin/dashboard/bank-soal',
      '/dpkakp/admin/dashboard/master',
      '/dpkakp/admin/dashboard/ujian',
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dpkakp', request.url))
    }
  }

  if (!XSRF096) {
    const protectedPaths = [
      '/dpkakp/user/auth/guide',
      '/dpkakp/user/auth/exam',
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dpkakp/user/auth', request.url))
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
