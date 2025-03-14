import { memo, useCallback } from 'react';
import { Text } from '@/shared/ui/Text';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Select, SelectOption } from '@/shared/ui/Select';
import { Language } from '@/shared/const/language';
import { saveJsonSettings, useJsonSettingByKey } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';

export const MainSettings = memo(() => {
    const { t } = useTranslation('MainSettings');

    const dispatch = useAppDispatch();
    const currentLanguage = useJsonSettingByKey('language') || Language.RU;
    const languageOptions: SelectOption[] = [
        { value: Language.RU, label: 'Русский' },
        { value: Language.EN, label: 'English' },
    ];

    const onLanguageChange = useCallback(
        (value: Language) => {
            dispatch(
                saveJsonSettings({
                    language: value,
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
                {t('Общие настройки')}
            </Text>
            <HStack
                max
                justify={'between'}
            >
                <Text size={'small'}>{t('Выбор языка')}</Text>
                <Select
                    value={currentLanguage}
                    options={languageOptions}
                    onChange={onLanguageChange}
                    size={'small'}
                    width={150}
                />
            </HStack>
        </VStack>
    );
});
