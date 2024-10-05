import { lazy } from 'react';

export const MainPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./MainPage'))
}));

