import { lazy } from 'react';

export const NotFoundPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./NotFoundPage'))
}));

