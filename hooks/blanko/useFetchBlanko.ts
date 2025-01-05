import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { blankoAkapiBaseUrl } from "@/constants/urls";

const useFetchBlanko = () => {
  const [data, setData] = useState<any[]>([]); // Replace 'any[]' with the appropriate type if available
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleFetchingBlankoMaster = async () => {
    setIsFetching(true);
    try {
      const response: AxiosResponse = await axios.get(
        `${blankoAkapiBaseUrl}/adminpusat/getBlanko`
      );
      setData(response.data.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      throw error;
    }
  };

  useEffect(() => {
    handleFetchingBlankoMaster();
  }, []); // Calls on component mount

  return {
    data,
    isFetching,
    refetch: handleFetchingBlankoMaster, // Expose refetch for manual calls
  };
};

export default useFetchBlanko;
