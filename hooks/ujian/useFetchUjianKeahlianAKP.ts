import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { dpkakpBaseUrl } from '@/constants/urls'
import { Ujian } from '@/types/ujian-keahlian-akp'
import { isTodayBefore, isTodayBetween } from '@/lib/utils'

type ViewType = 'admin' | 'penguji'

const DPKAKP_PUSAT = 'DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan'

const sortUjian = (list: Ujian[]): Ujian[] =>
  list
    .map((item) => ({ item, t: new Date(item.CreateAt).getTime() || 0 }))
    .sort((a, b) => {
      const pa = a.item.Status === 'Pending' ? 0 : 1
      const pb = b.item.Status === 'Pending' ? 0 : 1
      return pa - pb || b.t - a.t
    })
    .map((x) => x.item)

export const useFetchUjianKeahlianAKP = (
  view: ViewType = 'admin',
  _pathPukakp?: boolean, // dipertahankan agar kompatibel; hasilnya sama saja
  options?: { includeTryout?: boolean },
) => {
  const [data, setData] = useState<Ujian[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const includeTryout = options?.includeTryout

  const fetchData = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsFetching(true)
    setError(null)
    try {
      const res = await axios.get(`${dpkakpBaseUrl}/adminPusat/GetUjian`, {
        headers: { Authorization: `Bearer ${Cookies.get('XSRF095')}` },
        signal: controller.signal,
      })

      const allData: Ujian[] = res.data?.data ?? []
      const pukakp = Cookies.get('PUKAKP')
      const namaPenguji = Cookies.get('NamaUsersDpkakp') ?? ''
      const isPusat = pukakp === DPKAKP_PUSAT

      // Satu kali loop untuk semua filter
      const filtered = allData.filter((item) => {
        if (view === 'admin') {
          if (!isPusat && item.PUKAKP !== pukakp) return false
        } else if (!(item.NamaPengawasUjian ?? '').includes(namaPenguji)) {
          return false
        }
        if (includeTryout !== undefined) {
          const isTryout = (item.TypeUjian ?? '').toLowerCase().includes('tryout')
          if (isTryout !== includeTryout) return false
        }
        return true
      })

      if (!controller.signal.aborted) setData(sortUjian(filtered))
    } catch (err) {
      if (!axios.isCancel(err)) setError(err as Error)
    } finally {
      if (!controller.signal.aborted) setIsFetching(false)
    }
  }, [view, includeTryout])

  useEffect(() => {
    fetchData()
    return () => abortRef.current?.abort()
  }, [fetchData])

  // Semua counter dalam satu loop, dihitung ulang hanya saat data berubah
  const counters = useMemo(() => {
    const c = { verified: 0, notVerified: 0, draft: 0, pilihPenguji: 0, finished: 0, willDo: 0, doing: 0 }
    for (const item of data) {
      if (item.Status === 'Aktif') c.verified++
      else if (item.Status === 'Pending') c.notVerified++
      else if (item.Status === 'Draft') c.draft++
      if (item.NamaPengawasUjian === '') c.pilihPenguji++

      if (view === 'admin') {
        if (item.IsSelesai === '1') c.finished++
        else {
          if (item.IsSelesai === '' && isTodayBefore(item.TanggalMulaiUjian)) c.willDo++
          if (isTodayBetween(item.TanggalMulaiUjian, item.TanggalBerakhirUjian)) c.doing++
        }
      }
    }
    return c
  }, [data, view])

  return { data, isFetching, error, refetch: fetchData, counters }
}