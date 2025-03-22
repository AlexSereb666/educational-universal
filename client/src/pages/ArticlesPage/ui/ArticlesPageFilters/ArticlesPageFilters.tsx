import { memo, useCallback, useMemo } from 'react';
import * as cls from './ArticlesPageFilters.module.scss';
import { ArticleSortField, getTypesArticleData } from '@/entities/Articles';
import { articlePageActions } from '../../model/slices/ArticlePageSlice';
import { useSelector } from 'react-redux';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types/order';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { getArticlesPageType } from '../../model/selectors/articlesPageSelectors';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import classNames from 'classnames';
import { VStack } from '@/shared/ui/Stack';
import { ViewSelector } from '@/features/ViewSelector';
import { View } from '@/shared/const/view';

export const ArticlesPageFilters = memo(() => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const typesArticle = useSelector(getTypesArticleData);
    const selectType = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(
            fetchArticlesList({
                replace: true,
            }),
        );
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: View) => {
            dispatch(articlePageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlePageActions.setSort(newSort));
            dispatch(articlePageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlePageActions.setOrder(newOrder));
            dispatch(articlePageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlePageActions.setSearch(search));
            dispatch(articlePageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeType = useCallback(
        (tab: TabItem) => {
            dispatch(articlePageActions.setType(tab.value));
            dispatch(articlePageActions.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const typeTabs = useMemo<TabItem[]>(() => {
        return [
            { value: '0', content: 'Все статьи' },
            ...(Array.isArray(typesArticle)
                ? typesArticle.map((type) => ({
                      value: type.id,
                      content: type.name,
                  }))
                : []),
        ];
    }, [typesArticle]);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [])}>
            <VStack>
                <ViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
                <Input
                    label={'Поиск'}
                    value={search}
                    onChange={onChangeSearch}
                    size={'small'}
                />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
            <Tabs
                tabs={typeTabs}
                value={selectType}
                onTabClick={onChangeType}
                equalWidth={true}
                size={'small'}
                orientation={'vertical'}
            />
        </div>
    );
});
