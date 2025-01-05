import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { BlankoRusak } from "@/types/blanko";
import { blankoAkapiBaseUrl } from "@/constants/urls";

const useFetchBlankoRusak = () => {
  const [data, setData] = useState<BlankoRusak[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleFetchingBlankoRusak = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${blankoAkapiBaseUrl}/adminpusat/getBlankoRusak`
      );
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  useEffect(() => {
    handleFetchingBlankoRusak();
  }, []);

  return {
    data,
    isFetching,
    refetch: handleFetchingBlankoRusak,
  };
};

export default useFetchBlankoRusak;
