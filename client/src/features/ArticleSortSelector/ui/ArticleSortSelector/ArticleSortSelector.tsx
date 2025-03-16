import { memo, useMemo } from 'react';
import { Select, SelectOption } from '@/shared/ui/Select';
import { SortOrder } from 'shared/types/order';
import { ArticleSortField } from '@/entities/Articles';
import { VStack } from '@/shared/ui/Stack';

interface ArticleSortSelectorProps {
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { sort, order, onChangeOrder, onChangeSort } = props;

    const orderOptions = useMemo<SelectOption[]>(
        () => [
            {
                value: 'asc',
                label: 'возрастанию',
            },
            {
                value: 'desc',
                label: 'убыванию',
            },
        ],
        [],
    );

    const sortOptions = useMemo<SelectOption[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                label: 'дате создания',
            },
            {
                value: ArticleSortField.TITLE,
                label: 'названию',
            },
            {
                value: ArticleSortField.VIEWS,
                label: 'просмотрам',
            },
        ],
        [],
    );

    return (
        <VStack>
            <Select
                label={'по'}
                placeholder={'Выберите поле'}
                options={sortOptions}
                value={sort}
                size={'small'}
                labelPosition={'left'}
                onChange={onChangeSort}
                width={200}
            />
            <Select
                label={'по'}
                placeholder={'Выберите направление'}
                options={orderOptions}
                value={order}
                size={'small'}
                labelPosition={'left'}
                onChange={onChangeOrder}
                width={200}
            />
        </VStack>
    );
});
