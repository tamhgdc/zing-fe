//import axios from '../utils/httpRequest';
import useSWR from 'swr';

function useAlbum(inputId) {
    const {
        data: album,
        error,
        mutate,
    } = useSWR(`/album/getDetailPlaylist?id=${inputId}`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });
    return { album, error, mutate };
}

export { useAlbum };
