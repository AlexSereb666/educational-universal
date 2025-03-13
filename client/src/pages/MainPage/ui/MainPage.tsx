import React from 'react';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';

const MainPage = () => {
    const { t } = useTranslation('MainPage');

    return <div data-testid="MainPage">{t('Главная')}</div>;
};

export default MainPage;
