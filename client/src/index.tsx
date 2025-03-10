import { createRoot } from 'react-dom/client';
import {App} from './app/App';
import { BrowserRouter } from "react-router-dom";
import {ErrorBoundary} from "@/app/providers/ErrorBoundary";
import '@/app/styles/index.scss';
import {StoreProvider} from "@/app/providers/StoreProvider";

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    );
} else {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать React приложение')
}
