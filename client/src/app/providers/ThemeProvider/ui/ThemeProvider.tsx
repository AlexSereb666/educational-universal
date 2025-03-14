import { ReactNode, useEffect } from 'react';
import { useJsonSettingByKey } from '@/entities/User';
import { Theme } from '@/shared/const/themes';

interface ThemeProviderProps {
    children?: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children } = props;
    const theme = useJsonSettingByKey('theme') || Theme.light;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <>{children}</>;
};
