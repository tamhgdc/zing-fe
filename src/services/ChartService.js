import axios from '../utils/httpRequest';
import useSWR from 'swr';

const getChartHomeAPI = () => {
    return axios.get(`/zing-chart/getChartHome`);
};

const useGetChartHome = () => {
    const {
        data: chartHome,
        error,
        mutate,
    } = useSWR(`/zing-chart/getChartHome`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    return {
        chartHome,
        error,
        mutate,
    };
};

const getNewReleaseChartAPI = () => {
    return axios.get(`/zing-chart/getNewReleaseChart`);
};

const useGetNewReleaseChartAPI = () => {
    const {
        data: chartNewRelease,
        error,
        mutate,
    } = useSWR(`/zing-chart/getNewReleaseChart`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    return {
        chartNewRelease,
        error,
        mutate,
    };
};

export { getChartHomeAPI, getNewReleaseChartAPI, useGetChartHome, useGetNewReleaseChartAPI };
