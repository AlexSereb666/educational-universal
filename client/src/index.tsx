import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/config/i18n/i18n';
import { TranslationProvider } from '@/app/providers/TranslationProvider';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <I18nextProvider i18n={i18n}>
                        <TranslationProvider>
                            <App />
                        </TranslationProvider>
                    </I18nextProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>,
    );
} else {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать React приложение');
}
