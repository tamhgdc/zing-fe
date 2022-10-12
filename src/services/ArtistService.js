import axios from '../utils/httpRequest';
import useSWR from 'swr';

const getArtistAPI = (artist) => {
    return axios.get(`/artist/getArtist?artist=${artist}`);
};

const useGetArtist = (artist) => {
    const {
        data: Artist,
        error,
        mutate,
    } = useSWR(`/artist/getArtist?artist=${artist}`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    return {
        Artist,
        error,
        mutate,
    };
};

export { getArtistAPI, useGetArtist };
