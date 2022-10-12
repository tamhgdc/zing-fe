import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

request.interceptors.response.use(
    (response) => {
        return response.data;
    },

    (err) => {
        return Promise.reject(err);
    },
);

export default request;
