import {memo, useMemo} from "react";
import {Select, SelectOption} from "shared/ui/Select/Select";
import * as cls from './ArticleSortSelector.module.scss';
import {SortOrder} from "shared/types/order";
import {ArticleSortField} from "../../model/const/articles";

interface ArticleSortSelectorProps {
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        sort,
        order,
        onChangeOrder,
        onChangeSort
    } = props;

    const orderOptions = useMemo<SelectOption[]>(() => [
        {
            value: 'asc',
            label: 'возрастанию'
        },
        {
            value: 'desc',
            label: 'убыванию'
        }
    ], []);

    const sortOptions = useMemo<SelectOption[]>(() => [
        {
            value: ArticleSortField.CREATED,
            label: 'дате создания'
        },
        {
            value: ArticleSortField.TITLE,
            label: 'названию'
        },
        {
            value: ArticleSortField.VIEWS,
            label: 'просмотрам'
        },
    ], []);

    return (
        <div className={cls.ArticleSortSelector}>
            <Select
                label={'Сортировать ПО'}
                placeholder={'Выберите поле'}
                options={sortOptions}
                value={sort}
                size={'medium'}
                labelPosition={'left'}
                onChange={onChangeSort}
                width={200}
            />
            <Select
                label={'по'}
                placeholder={'Выберите направление'}
                options={orderOptions}
                value={order}
                size={'medium'}
                labelPosition={'left'}
                onChange={onChangeOrder}
                width={200}
            />
        </div>
    )
});
