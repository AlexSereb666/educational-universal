import { memo, useCallback } from 'react';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { saveJsonSettings, useJsonSettingByKey } from '@/entities/User';
import { Theme } from '@/shared/const/themes';
import { Switch } from '@/shared/ui/Switch';

export const ThemesSettings = memo(() => {
    const { t } = useTranslation('ThemesSettings');

    const dispatch = useAppDispatch();
    const currentTheme = useJsonSettingByKey('theme') || Theme.light;

    const onThemeChange = useCallback(
        (value: boolean) => {
            dispatch(
                saveJsonSettings({
                    theme: value ? Theme.dark : Theme.light,
                }),
            );
        },
        [dispatch],
    );

    return (
        <VStack
            max
            gap={'32'}
        >
            <Text
                bold={true}
                size={'medium'}
            >
                {t('Настройки оформления')}
            </Text>
            <HStack
                max
                justify={'between'}
            >
                <Text size={'small'}>{t('Темная тема')}</Text>
                <Switch
                    value={currentTheme === Theme.dark}
                    onChange={onThemeChange}
                />
            </HStack>
        </VStack>
    );
});
