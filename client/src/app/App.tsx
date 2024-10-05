import React, {Suspense} from 'react';
import {AppRouter} from "./providers/Router";

export const App = () => {

    return (
        <div>
            <Suspense fallback="">
                <AppRouter />
            </Suspense>
        </div>
    );
};
