import { useTranslation as useI18NextTranslation } from 'react-i18next';
import { useEffect } from 'react';

type Namespace = 'translation' | (string & {});

export const useTranslation = (namespace: Namespace) => {
    const { t, i18n } = useI18NextTranslation(namespace);

    useEffect(() => {
        if (namespace) {
            i18n.loadNamespaces(namespace);
        }
    }, [namespace, i18n]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return { t, changeLanguage };
};
