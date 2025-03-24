import { memo } from 'react';
import classNames from 'classnames';
import * as cls from './UploadWidget.module.scss';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import { Portal } from '@/shared/ui/Portal';
import { Text } from '@/shared/ui/Text';
import { truncateString } from '@/shared/lib/string/truncateString';
import { UploadFile } from '@/entities/Storage';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';

interface UploadWidgetProps {
    className?: string;
    data: UploadFile[];
    isActive: boolean;
    onClose: () => void;
}

export const UploadWidget = memo((props: UploadWidgetProps) => {
    const { className, data, isActive, onClose } = props;

    const { t } = useTranslation('UploadWidget');

    if (!isActive || data.length === 0) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.UploadWidget, {}, [className])}>
                <div className={cls.header}>
                    <Text size="small">{t('Загрузка файлов')}</Text>
                    <button
                        className={cls.closeButton}
                        onClick={onClose}
                    >
                        <Text size="small">×</Text>
                    </button>
                </div>
                <div className={cls.fileList}>
                    {data.map((file) => (
                        <div
                            key={file.fileName}
                            className={cls.fileItem}
                        >
                            <Text size="small">{truncateString(file.fileName, 30)}</Text>
                            <ProgressBar progress={file.progress} />
                        </div>
                    ))}
                </div>
            </div>
        </Portal>
    );
});
