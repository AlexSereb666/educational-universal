import { ReactNode, useEffect, useMemo } from 'react';
import { useJsonSettingByKey } from '@/entities/User';
import { Theme } from '@/shared/const/themes';

interface ThemeProviderProps {
    children?: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children } = props;

    const systemTheme: Theme = useMemo(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? Theme.dark
                : Theme.light;
        }

        return Theme.light;
    }, []);

    const theme = useJsonSettingByKey('theme') || systemTheme;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <>{children}</>;
};
