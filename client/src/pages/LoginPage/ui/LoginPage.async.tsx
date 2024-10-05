import { lazy } from 'react';

export const LoginPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./LoginPage'))
}));

