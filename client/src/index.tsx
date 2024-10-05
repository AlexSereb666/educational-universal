import { render } from 'react-dom';
import {App} from './app/App';
import {HashRouter} from "react-router-dom";
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import '@/app/styles/index.scss';
import {StoreProvider} from "@/app/providers/StoreProvider";

render(
    <HashRouter>
        <StoreProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </StoreProvider>
    </HashRouter>,
    document.getElementById('root'),
);
