import { useState, useCallback } from 'react';

const DND_DATA_TYPE = 'application/vnd.test.dnd-item';

interface UseDraggableProps<T> {
    itemData: T;
    onDragStart?: (item: T) => void;
    onDragEnd?: (item: T) => void;
}

interface DraggableResult {
    draggableProps: {
        draggable: boolean;
        onDragStart: (event: React.DragEvent<HTMLElement>) => void;
        onDragEnd: (event: React.DragEvent<HTMLElement>) => void;
    };
    isDragging: boolean;
}

export function useDraggable<T>(props: UseDraggableProps<T>): DraggableResult {
    const { itemData, onDragStart, onDragEnd } = props;
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = useCallback(
        (event: React.DragEvent<HTMLElement>) => {
            try {
                const dataString = JSON.stringify(itemData);

                event.dataTransfer.setData(DND_DATA_TYPE, dataString);

                event.dataTransfer.effectAllowed = 'move';
                setIsDragging(true);
                onDragStart?.(itemData);

                // todo задержка, чтобы браузер успел схватить элемент до потенциального скрытия
                // setTimeout(() => {}, 500);
            } catch (e) {
                console.error('Failed to stringify draggable item data:', e);
                event.preventDefault();
            }
        },
        [itemData, onDragStart],
    );

    const handleDragEnd = useCallback(
        (event: React.DragEvent<HTMLElement>) => {
            setIsDragging(false);
            onDragEnd?.(itemData);

            event.dataTransfer.clearData();
        },
        [itemData, onDragEnd],
    );

    return {
        draggableProps: {
            draggable: true,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
        },
        isDragging,
    };
}
