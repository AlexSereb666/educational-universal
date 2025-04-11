import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { moveFile } from '../../../model/services/moveFile/moveFile';
import { moveFolder } from '../../../model/services/moveFolder/moveFolder';
import { StorageItem } from '../../../model/types/CloudStorage';
import { StorageItemType } from '@/shared/const/storage';

interface GenericDropZoneDataWithTargetId {
    id?: number | null;
    parentId?: number | null;
    type?: string;
}

export function useStorageItemDropHandler<T extends GenericDropZoneDataWithTargetId>() {
    const dispatch = useAppDispatch();

    const handleDrop = useCallback(
        (draggedItem: StorageItem, droppedOnItem: T) => {
            let targetFolderId: number | null | undefined = undefined;

            if (!droppedOnItem) {
                return;
            }

            if (
                'type' in droppedOnItem &&
                droppedOnItem.type === StorageItemType.FOLDER &&
                'id' in droppedOnItem
            ) {
                targetFolderId = droppedOnItem.id as number | null;
            } else if ('parentId' in droppedOnItem) {
                targetFolderId = droppedOnItem.parentId;
            }

            if (targetFolderId === undefined) {
                return;
            }

            if (draggedItem.type === StorageItemType.FOLDER) {
                if (draggedItem.id === targetFolderId) {
                    return;
                }
                dispatch(
                    moveFolder({
                        folderId: draggedItem.id,
                        targetParentId: targetFolderId,
                    }),
                );
            } else if (draggedItem.type === StorageItemType.FILE) {
                dispatch(
                    moveFile({
                        fileId: draggedItem.id,
                        targetFolderId: targetFolderId,
                    }),
                );
            }
        },
        [dispatch],
    );

    return handleDrop;
}
