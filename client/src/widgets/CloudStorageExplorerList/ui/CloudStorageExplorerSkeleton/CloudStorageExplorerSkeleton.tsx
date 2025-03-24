import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { memo } from 'react';
import { View } from '@/shared/const/view';

interface CloudStorageExplorerSkeletonProps {
    view: View;
}

export const CloudStorageExplorerSkeleton = memo(
    (props: CloudStorageExplorerSkeletonProps) => {
        const { view } = props;

        if (view === View.LIST) {
            return (
                <VStack
                    gap={'32'}
                    max
                >
                    {[...Array(5)].map((_, i) => (
                        <Skeleton
                            key={i}
                            width={'100%'}
                            height={50}
                        />
                    ))}
                </VStack>
            );
        }

        if (view === View.GRID) {
            return (
                <VStack
                    gap="32"
                    max
                >
                    {[...Array(2)].map((_, rowIndex) => (
                        <HStack
                            key={rowIndex}
                            max
                            gap="32"
                        >
                            {[...Array(4)].map((_, colIndex) => (
                                <Skeleton
                                    key={colIndex}
                                    width={120}
                                    height={120}
                                />
                            ))}
                        </HStack>
                    ))}
                </VStack>
            );
        }

        return null;
    },
);
