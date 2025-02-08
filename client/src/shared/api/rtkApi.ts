import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { ACCESS_TOKEN_KEY } from "shared/const/localstorage";

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error as FetchBaseQueryError).status === 401) {
        try {
            const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

            if (refreshResult.data) {
                const newToken = (refreshResult.data as { accessToken: string }).accessToken;
                localStorage.setItem(ACCESS_TOKEN_KEY, newToken);

                return baseQuery(args, api, extraOptions);
            } else {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            window.location.href = '/';
        }
    }

    return result;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
