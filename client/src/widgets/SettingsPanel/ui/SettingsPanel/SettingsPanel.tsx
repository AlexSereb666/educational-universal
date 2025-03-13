import { memo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getSettingsCurrentTab } from '@/entities/Settings';
import { SettingsTabs } from '@/shared/const/settings';
import { MainSettings } from '../MainSettings/MainSettings';
import { ThemesSettings } from '../ThemesSettings/ThemesSettings';
import * as cls from './SettingsPanel.module.scss';

export const SettingsPanel = memo(() => {
    const currentTab = useSelector(getSettingsCurrentTab);

    const settingsComponents: Record<SettingsTabs, ReactNode> = {
        [SettingsTabs.main]: <MainSettings />,
        [SettingsTabs.themes]: <ThemesSettings />,
    };

    return <div className={cls.SettingsPanel}>{settingsComponents[currentTab]}</div>;
});
