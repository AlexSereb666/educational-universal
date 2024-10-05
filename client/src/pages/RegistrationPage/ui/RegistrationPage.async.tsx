import { lazy } from 'react';

export const RegistrationPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./RegistrationPage'))
}));
