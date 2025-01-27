import {memo, useCallback} from "react";
import * as cls from './ArticlesPageFilters.module.scss';
import {ArticleSortField, ArticleSortSelector, ArticleView, ArticleViewSelector} from "@/entities/Articles";
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

interface ArticlesPageFiltersProps {}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({
            replace: true,
        }));
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlePageActions.setSort(newSort));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlePageActions.setOrder(newOrder));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search));
        dispatch(articlePageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

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
        </div>
    )
});
