import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const randomId = Math.random().toString(36).substring(2, 10);
  res.redirect(307, `/${randomId}/auth/login`);
}

export function middleware(request: any) {
  const XSRF091 = request.cookies.get('XSRF091')
  const XSRF081 = request.cookies.get('XSRF081')

  const XSRF095 = request.cookies.get('XSRF095') // DPKAKP ADMIN
  const XSRF096 = request.cookies.get('XSRF096') // DPKAKP USERS
  const XSRF097 = request.cookies.get('XSRF097') // DPKAKP USERS


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
      '/lembaga/pukakp/admin/dashboard/ujian',
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/lembaga/dpkakp/admin/auth/login', request.url))
    }
  }




  if (!XSRF091) {
    const protectedPaths = [
      '/admin/lemdiklat/dashboard',
      '/admin/pusat/dashboard',
      '/admin/pusat/pelatihan/penerbitan-sertifikat',
      '/admin/lemdiklat/pelatihan',
      '/admin/lemdiklat/pelatihan/penerbitan-sttpl',
      'admin/lemdiklat/pelatihan/[kode-pelatihan]/peserta-pelatihan/[id]'
    ]

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/admin/auth/login', request.url))
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
