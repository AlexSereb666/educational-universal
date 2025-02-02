import axios from 'axios';
import {ACCESS_TOKEN_KEY} from "shared/const/localstorage";

export const $api = axios.create({
    withCredentials: true,
    baseURL: __API__,
} as any);

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $api.get('/auth/refresh');

            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Пользователь не авторизован');
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            window.location.href = '/';
        }
    }
    throw error;
});
