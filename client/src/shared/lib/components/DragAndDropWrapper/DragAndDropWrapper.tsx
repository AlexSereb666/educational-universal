import { ReactNode, useState } from 'react';
import classNames from 'classnames';

interface DragAndDropWrapperProps {
    className?: string;
    onDrop: (files: File[]) => void;
    children: ReactNode;
    renderDragOverContent?: () => ReactNode;
}

export const DragAndDropWrapper = (props: DragAndDropWrapperProps) => {
    const { className, onDrop, children, renderDragOverContent } = props;
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);

        const files = Array.from(event.dataTransfer.files);
        if (files.length > 0) {
            onDrop(files);
        }
    };

    return (
        <div
            className={classNames({}, className, {})}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isDragOver && renderDragOverContent ? renderDragOverContent() : children}
        </div>
    );
};
