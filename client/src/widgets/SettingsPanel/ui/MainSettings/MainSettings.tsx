import { memo, useCallback } from 'react';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
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
            <VStack
                max
                gap={'8'}
            >
                <Text size={'small'}>Выбор языка</Text>
                <Select
                    value={currentLanguage}
                    options={languageOptions}
                    onChange={onLanguageChange}
                    size={'small'}
                    width={150}
                />
            </VStack>
        </VStack>
    );
});
