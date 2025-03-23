import { memo, useCallback, useState } from 'react';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import * as cls from './CloudStorageAddFolder.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addFolder } from '@/entities/Storage';

export const CloudStorageAddFolder = memo(() => {
    const { t } = useTranslation('CloudStorageAddFolder');
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onClick = useCallback(
        (value: string) => {
            if (value) {
                dispatch(addFolder(value));
                setValue('');
                closeModal();
            }
        },
        [dispatch],
    );

    const onChange = (nameFolder: string) => setValue(nameFolder);

    return (
        <>
            <Button
                size={'small'}
                onClick={openModal}
            >
                {t('Создать папку')}
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className={cls.modal}
                lazy
            >
                <VStack
                    max
                    gap={'32'}
                >
                    <Input
                        value={value}
                        onChange={onChange}
                        label={t('Название папки')}
                    />
                    <VStack
                        max
                        align={'end'}
                    >
                        <Button onClick={() => onClick(value)}>{t('Создать')}</Button>
                    </VStack>
                </VStack>
            </Modal>
        </>
    );
});
