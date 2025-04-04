import { useState, useCallback } from 'react';

const DND_DATA_TYPE = 'application/vnd.test.dnd-item';

interface UseDroppableProps<DragItemType, DropZoneType> {
    dropZoneData: DropZoneType;
    onDrop: (draggedItem: DragItemType, droppedOnItem: DropZoneType) => void;
    canDrop?: (draggedItem: DragItemType, droppedOnItem: DropZoneType) => boolean;
    onDragEnter?: (isPotentialDrop: boolean, dropZoneItem: DropZoneType) => void;
    onDragLeave?: (dropZoneItem: DropZoneType) => void;
}

interface DroppableResult {
    droppableProps: {
        onDragEnter: (event: React.DragEvent<HTMLElement>) => void;
        onDragLeave: (event: React.DragEvent<HTMLElement>) => void;
        onDragOver: (event: React.DragEvent<HTMLElement>) => void;
        onDrop: (event: React.DragEvent<HTMLElement>) => void;
    };
    isOver: boolean;
}

export function useDroppable<DragItemType, DropZoneType>(
    props: UseDroppableProps<DragItemType, DropZoneType>,
): DroppableResult {
    const { dropZoneData, onDrop, canDrop, onDragEnter, onDragLeave } = props;
    const [isOver, setIsOver] = useState(false);

    const getDraggedItem = (event: React.DragEvent<HTMLElement>): DragItemType | null => {
        try {
            if (!event.dataTransfer.types.includes(DND_DATA_TYPE)) {
                return null;
            }
            const dataString = event.dataTransfer.getData(DND_DATA_TYPE);

            if (dataString) {
                const parsedData = JSON.parse(dataString) as DragItemType;
                return parsedData;
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    };

    const handleDragEnter = useCallback(
        (event: React.DragEvent<HTMLElement>) => {
            const isPotentialDrop = event.dataTransfer.types.includes(DND_DATA_TYPE);

            if (isPotentialDrop) {
                event.preventDefault();
                event.stopPropagation();
                setIsOver(true);
                event.dataTransfer.dropEffect = 'move';
                onDragEnter?.(true, dropZoneData);
            } else {
                onDragEnter?.(false, dropZoneData);
            }
        },
        [dropZoneData, onDragEnter],
    );

    const handleDragLeave = useCallback(
        (event: React.DragEvent<HTMLElement>) => {
            const relatedTarget = event.relatedTarget as Node | null;
            if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
                return;
            }

            event.stopPropagation();
            setIsOver(false);
            onDragLeave?.(dropZoneData);
        },
        [dropZoneData, onDragLeave],
    );

    const handleDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
        const isPotentialDrop = event.dataTransfer.types.includes(DND_DATA_TYPE);

        if (isPotentialDrop) {
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = 'move';
        }
    }, []);

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLElement>) => {
            if (!event.dataTransfer.types.includes(DND_DATA_TYPE)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            setIsOver(false);

            const draggedItem = getDraggedItem(event);

            if (draggedItem) {
                if (!canDrop || canDrop(draggedItem, dropZoneData)) {
                    onDrop(draggedItem, dropZoneData);
                }
            }
        },
        [dropZoneData, onDrop, canDrop, getDraggedItem],
    );

    return {
        droppableProps: {
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: handleDrop,
        },
        isOver: isOver,
    };
}
