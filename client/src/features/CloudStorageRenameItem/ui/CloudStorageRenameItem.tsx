import { memo, useCallback, useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import * as cls from './CloudStorageRenameItem.module.scss';
import { StorageItem } from '@/shared/const/storage';
import { renameFile, renameFolder } from '@/entities/Storage';

interface CloudStorageRenameItemProps {
    id: number;
    type: StorageItem;
    isOpen: boolean;
    onClose: () => void;
}

export const CloudStorageRenameItem = memo((props: CloudStorageRenameItemProps) => {
    const { t } = useTranslation('CloudStorageRenameItem');
    const dispatch = useAppDispatch();
    const { id, type, isOpen, onClose } = props;
    const [value, setValue] = useState('');

    const onClick = useCallback(
        (value: string) => {
            if (value) {
                if (type === StorageItem.FILE) {
                    dispatch(
                        renameFile({
                            fileId: id,
                            newName: value,
                        }),
                    );
                } else if (type === StorageItem.FOLDER) {
                    dispatch(
                        renameFolder({
                            folderId: id,
                            newName: value,
                        }),
                    );
                }
                setValue('');
                onClose();
            }
        },
        [dispatch],
    );

    const onChange = (newName: string) => setValue(newName);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            lazy
            className={cls.CloudStorageRenameItem}
        >
            <VStack
                max
                gap={'32'}
            >
                <Input
                    value={value}
                    onChange={onChange}
                    label={t('Новое название')}
                />
                <VStack
                    max
                    align={'end'}
                >
                    <Button onClick={() => onClick(value)}>{t('Переименовать')}</Button>
                </VStack>
            </VStack>
        </Modal>
    );
});
