import { blankoAkapiBaseUrl } from "@/constants/urls";
import { BlankoKeluar } from "@/types/blanko";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetchBlankoKeluar = () => {
  const [data, setData] = useState<BlankoKeluar[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleFetchingBlankoKeluar = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${blankoAkapiBaseUrl}/adminpusat/getBlankoKeluar`
      );
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  useEffect(() => {
    handleFetchingBlankoKeluar();
  }, []);

  return {
    data,
    isFetching,
    refetch: handleFetchingBlankoKeluar,
  };
};

export default useFetchBlankoKeluar;
