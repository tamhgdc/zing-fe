import axios from '../utils/httpRequest';
import useSWR from 'swr';

const getTop100API = () => {
    return axios.get(`/top100/getTop100`);
};

const useGetTop100 = () => {
    const {
        data: Top100,
        error,
        mutate,
    } = useSWR(`/top100/getTop100`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    return {
        Top100,
        error,
        mutate,
    };
};

export { getTop100API, useGetTop100 };
