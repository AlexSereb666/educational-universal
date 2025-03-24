import { memo, ReactNode, useRef } from 'react';
import * as cls from './FileInput.module.scss';

interface FileInputProps {
    onFileSelect: (files: File[]) => void;
    children: ReactNode;
}

export const FileInput = memo((props: FileInputProps) => {
    const { onFileSelect, children } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (files.length > 0) {
            onFileSelect(files);
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                className={cls.FileInput}
                onChange={handleFileChange}
                multiple
            />
            <span onClick={() => fileInputRef.current?.click()}>{children}</span>
        </>
    );
});
