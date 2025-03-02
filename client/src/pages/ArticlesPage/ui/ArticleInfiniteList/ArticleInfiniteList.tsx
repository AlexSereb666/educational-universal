import {memo, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import {fetchNextArticlesPage} from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getArticles} from "../../model/slices/ArticlePageSlice";
import {ArticleList, fetchTypesArticle} from "@/entities/Articles";
import {useSearchParams} from "react-router-dom";
import {initArticlesPage} from "../../model/services/initArticlesPage/initArticlesPage";

export const ArticleInfiniteList = memo(() => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch(initArticlesPage(searchParams));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchTypesArticle());
    }, [dispatch]);

    if (error) {
        return null;
    }

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            onScrollToEnd={onLoadNextPart}
        />
    );
});
