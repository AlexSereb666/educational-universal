import {memo, useCallback, useMemo} from "react";
import * as cls from './ArticlesPageFilters.module.scss';
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleView,
    ArticleViewSelector,
    getTypesArticleData
} from "@/entities/Articles";
import {articlePageActions} from "@/pages/ArticlesPage/model/slices/ArticlePageSlice";
import {useSelector} from "react-redux";
import {
    fetchArticlesList,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageView
} from "@/pages/ArticlesPage";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Input} from "@/shared/ui/Input/Input";
import {SortOrder} from "@/shared/types/order";
import {useDebounce} from "@/shared/lib/hooks/useDebounce/useDebounce";
import {TabItem, Tabs} from "@/shared/ui/Tabs/Tabs";
import {getArticlesPageType} from "@/pages/ArticlesPage/model/selectors/articlesPageSelectors";

interface ArticlesPageFiltersProps {}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const typesArticle = useSelector(getTypesArticleData);
    const selectType = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({
            replace: true,
        }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(newSort));
        dispatch(articlePageActions.setPage(1));
        debounceFetchData();
    }, [dispatch, debounceFetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlePageActions.setOrder(newOrder));
        dispatch(articlePageActions.setPage(1));
        debounceFetchData();
    }, [dispatch, debounceFetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        debounceFetchData();
    }, [dispatch, debounceFetchData]);

    const onChangeType = useCallback((tab: TabItem) => {
        dispatch(articlePageActions.setType(tab.value));
        dispatch(articlePageActions.setPage(1));
        debounceFetchData();
    }, [dispatch, debounceFetchData]);

    const typeTabs = useMemo<TabItem[]>(() => {
        return [
            { value: '0', content: 'Все статьи' },
            ...(Array.isArray(typesArticle) ? typesArticle.map(type => ({
                value: type.id,
                content: type.name
            })) : [])
        ];
    }, [typesArticle]);

    return (
        <div>
            <div className={cls.sort_and_view}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </div>
            <div className={cls.search}>
                <Input
                    label={'Поиск'}
                    value={search}
                    onChange={onChangeSearch}
                />
            </div>
            <Tabs
                tabs={typeTabs}
                value={selectType}
                onTabClick={onChangeType}
            />
        </div>
    )
});
