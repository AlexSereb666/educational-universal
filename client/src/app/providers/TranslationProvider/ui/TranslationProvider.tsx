import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useJsonSettingByKey } from '@/entities/User';
import { Language } from '@/shared/const/language';

interface TranslationProviderProps {
    children: ReactNode;
}

export const TranslationProvider = (props: TranslationProviderProps) => {
    const { children } = props;
    const { i18n } = useTranslation();
    const currentLanguage = useJsonSettingByKey('language') || Language.RU;

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage, i18n]);

    return <>{children}</>;
};
