import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { PengirimanSertifikat } from '@/types/blanko';
import { blankoAkapiBaseUrl } from '@/constants/urls';

const useFetchPengirimanSertifikat = () => {
    const [data, setData] = useState<PengirimanSertifikat[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const handleFetchingPengirimanSertifikat = async () => {
        setIsFetching(true);
        try {
            const response: AxiosResponse = await axios.get(
                `${blankoAkapiBaseUrl}/adminpusat/getPengiriman`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('XSRF091')}`,
                    },
                }
            );
            setData(response.data.data);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
            throw error;
        }
    };

    useEffect(() => {
        handleFetchingPengirimanSertifikat();
    }, []); // Calls on component mount

    return {
        data,
        isFetching,
        refetch: handleFetchingPengirimanSertifikat, // Expose refetch for manual calls
    };
};

export default useFetchPengirimanSertifikat;
