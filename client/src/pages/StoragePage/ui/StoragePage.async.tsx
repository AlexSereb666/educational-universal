import { lazy } from 'react';

export const StoragePageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./StoragePage'))
}));

