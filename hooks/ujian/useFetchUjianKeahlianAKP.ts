import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { dpkakpBaseUrl } from '@/constants/urls'
import { Ujian } from '@/types/ujian-keahlian-akp'
import { isTodayBefore, isTodayBetween } from '@/lib/utils'

type ViewType = 'admin' | 'penguji'

export const useFetchUjianKeahlianAKP = (
  view: ViewType = 'admin',
  pathPukakp?: boolean,
) => {
  const [data, setData] = useState<Ujian[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const [countVerified, setCountVerified] = useState(0)
  const [countNotVerified, setCountNotVerified] = useState(0)
  const [countDraft, setCountDraft] = useState(0)
  const [countPilihPenguji, setCountPilihPenguji] = useState(0)

  const [counterFinished, setCounterFinished] = useState(0)
  const [counterWillDo, setCounterWillDo] = useState(0)
  const [counterDoing, setCounterDoing] = useState(0)

  const fetchData = async () => {
    setIsFetching(true)
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/GetUjian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('XSRF095')}`,
          },
        },
      )

      const allData: Ujian[] = response.data.data
      const pukakpCookie = Cookies.get('PUKAKP')
      const namaPenguji = Cookies.get('NamaUsersDpkakp')

      let filteredData: Ujian[] = []

      if (view === 'admin') {
        filteredData =
          pukakpCookie !==
          'DPKAKP - Dewan Penguji Keahlian Awak Kapal Perikanan'
            ? allData.filter((item) => item.PUKAKP === pukakpCookie)
            : allData
      } else {
        filteredData = allData.filter((item) =>
          item.NamaPengawasUjian.includes(namaPenguji ?? ''),
        )
      }

      const sortedData = filteredData.sort((a, b) => {
        if (a.Status === 'Pending' && b.Status !== 'Pending') return -1
        if (a.Status !== 'Pending' && b.Status === 'Pending') return 1
        return new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime()
      })

      // Shared counters
      setCountVerified(
        filteredData.filter((item) => item.Status === 'Aktif').length,
      )
      setCountNotVerified(
        filteredData.filter((item) => item.Status === 'Pending').length,
      )
      setCountDraft(
        filteredData.filter((item) => item.Status === 'Draft').length,
      )
      setCountPilihPenguji(
        filteredData.filter((item) => item.NamaPengawasUjian === '').length,
      )

      // Only for admin view
      if (view === 'admin') {
        setCounterFinished(
          filteredData.filter((item) => item.IsSelesai === '1').length,
        )

        setCounterWillDo(
          filteredData.filter(
            (item) =>
              isTodayBefore(item.TanggalMulaiUjian) && item.IsSelesai === '',
          ).length,
        )

        setCounterDoing(
          filteredData.filter(
            (item) =>
              isTodayBetween(
                item.TanggalMulaiUjian,
                item.TanggalBerakhirUjian,
              ) && item.IsSelesai !== '1',
          ).length,
        )
      }

      // Set final data
      if (pathPukakp) {
        setData(sortedData)
      } else {
        const fallbackSorted = (view === 'admin' ? allData : filteredData).sort(
          (a, b) => {
            if (a.Status === 'Pending' && b.Status !== 'Pending') return -1
            if (a.Status !== 'Pending' && b.Status === 'Pending') return 1
            return (
              new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime()
            )
          },
        )
        setData(fallbackSorted)
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    isFetching,
    error,
    refetch: fetchData,
    counters: {
      verified: countVerified,
      notVerified: countNotVerified,
      draft: countDraft,
      pilihPenguji: countPilihPenguji,
      finished: counterFinished,
      willDo: counterWillDo,
      doing: counterDoing,
    },
  }
}
