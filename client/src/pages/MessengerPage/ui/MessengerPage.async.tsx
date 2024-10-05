import { lazy } from 'react';

export const MessengerPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./MessengerPage'))
}));

