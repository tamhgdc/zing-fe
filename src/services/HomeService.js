import axios from '../utils/httpRequest';
import useSWR from 'swr';

const getHomePage = (inputId) => {
    return axios.get(`/getHomePage?id=${inputId}`);
};

const useGetHome = (inputId) => {
    const { data, error, mutate } = useSWR(`/getHomePage?id=${inputId}`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    return {
        data,
        error,
        mutate,
    };
};

export { getHomePage, useGetHome };
