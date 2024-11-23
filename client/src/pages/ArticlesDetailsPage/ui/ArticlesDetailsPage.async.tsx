import {lazy} from "react";

export const ArticlesDetailsPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./ArticlesDetailsPage'));
}));
