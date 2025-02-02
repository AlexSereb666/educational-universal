import { createRoot } from 'react-dom/client';
import {App} from './app/App';
import {HashRouter} from "react-router-dom";
import {ErrorBoundary} from "app/providers/ErrorBoundary";
import 'app/styles/index.scss';
import {StoreProvider} from "app/providers/StoreProvider";

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <HashRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StoreProvider>
        </HashRouter>
    );
}
