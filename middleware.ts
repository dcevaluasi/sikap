import { NextResponse } from 'next/server'

export function middleware(request: any) {
  const XSRF091 = request.cookies.get('XSRF091')
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
      '/lembaga/dpkakp/admin/dashboard',
      '/lembaga/dpkakp/admin/dashboard/bank-soal',
      '/lembaga/dpkakp/admin/dashboard/master',
      '/lembaga/dpkakp/admin/dashboard/ujian',
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/dpkakp', request.url))
    }
  }

  if (!XSRF096) {
    const protectedPaths = [
      '/lembaga/dpkakp/user/auth/guide',
      '/lembaga/dpkakp/user/auth/exam',
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/lembaga/dpkakp/user/auth', request.url))
    }
  }

  if (!XSRF091) {
    const protectedPaths = [
      '/admin/lemdiklat/dashboard',
      '/admin/lemdiklat/pelatihan',
      '/admin/lemdiklat/pelatihan/tambah-pelatihan',
      '/admin/lemdiklat/pelatihan/penerbitan-sttpl',
      'admin/lemdiklat/pelatihan/[kode-pelatihan]/peserta-pelatihan/[id]'
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
