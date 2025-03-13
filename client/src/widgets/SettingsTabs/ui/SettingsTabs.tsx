import { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import * as cls from './SettingsTabs.module.scss';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { useSelector } from 'react-redux';
import { getSettingsCurrentTab, settingsActions } from '@/entities/Settings';
import { SettingsTabs as CSettingsTabs } from '@/shared/const/settings';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface SettingsTabsProps {
    className?: string;
}

export const SettingsTabs = memo((props: SettingsTabsProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const currentTab = useSelector(getSettingsCurrentTab);

    const tabs = useMemo<TabItem[]>(() => {
        return [
            { value: CSettingsTabs.main, content: CSettingsTabs.main },
            { value: CSettingsTabs.themes, content: CSettingsTabs.themes },
        ];
    }, [currentTab]);

    const onChangeTab = useCallback(
        (tab: TabItem) => {
            dispatch(settingsActions.setCurrentTab(tab.value as CSettingsTabs));
        },
        [dispatch],
    );

    return (
        <div className={classNames(cls.SettingsTabs, {}, [className])}>
            <Tabs
                tabs={tabs}
                value={currentTab}
                onTabClick={onChangeTab}
                size={'small'}
                equalWidth={true}
                orientation={'vertical'}
            />
        </div>
    );
});
