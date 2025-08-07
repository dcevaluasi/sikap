import React from 'react'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { DewanPenguji } from '@/types/dewanPenguji'
import { dpkakpBaseUrl } from '@/constants/urls'

export const useFetchPengujiKeahlianAKP = () => {
  const [dataPenguji, setDataPenguji] = React.useState<DewanPenguji[]>([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const fetchData = async () => {
    setIsFetching(true)
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminpusat/getDataPenguji`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('XSRF095')}`,
          },
        },
      )
      setDataPenguji(response.data.data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return {
    dataPenguji,
    isFetching,
    error,
    refetch: fetchData,
  }
}
