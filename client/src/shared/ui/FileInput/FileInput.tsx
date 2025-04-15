import { memo, ReactNode, useRef } from 'react';
import * as cls from './FileInput.module.scss';

interface FileInputProps {
    onFileSelect: (files: File[]) => void;
    children: ReactNode;
    multiple?: boolean;
    acceptType?: 'all' | 'images';
}

export const FileInput = memo((props: FileInputProps) => {
    const { onFileSelect, children, multiple = true, acceptType = 'all' } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (files.length > 0) {
            onFileSelect(files);
        }
    };

    const acceptValue = acceptType === 'images' ? 'image/*' : undefined;

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                className={cls.FileInput}
                onChange={handleFileChange}
                multiple={multiple}
                accept={acceptValue}
            />
            <span onClick={() => fileInputRef.current?.click()}>{children}</span>
        </>
    );
});
