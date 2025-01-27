import {lazy} from "react";

export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./ArticlesPage'));
}));
