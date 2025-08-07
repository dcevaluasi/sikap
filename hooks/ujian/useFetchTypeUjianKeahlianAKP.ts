import React from 'react'

import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { TypeUjian } from '@/types/ujian-keahlian-akp'
import { dpkakpBaseUrl } from '@/constants/urls'

export const useFetchTypeUjianKeahlianAKP = () => {
  const [dataTypeUjian, setDataTypeUjian] = React.useState<TypeUjian[]>([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const fetchData = async () => {
    setIsFetching(true)
    try {
      const response: AxiosResponse = await axios.get(
        `${dpkakpBaseUrl}/adminPusat/getTypeUjian`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('XSRF095')}`,
          },
        },
      )
      setDataTypeUjian(response.data.data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return { dataTypeUjian, isFetching, error, refetch: fetchData }
}
