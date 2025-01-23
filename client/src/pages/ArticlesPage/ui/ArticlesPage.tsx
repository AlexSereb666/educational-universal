import {ArticleList, ArticleView, ArticleViewSelector} from "@/entities/Articles";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlePageActions, articlePageReducer, getArticles} from "@/pages/ArticlesPage/model/slices/ArticlePageSlice";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useCallback, useEffect} from "react";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "@/pages/ArticlesPage";
import {useSelector} from "react-redux";
import {fetchNextArticlesPage} from "@/pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import {initArticlesPage} from "@/pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";

const reducers: ReducersList = {
    articlesPage: articlePageReducer,
};

const ArticlesPage = () => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);

    useEffect(() => {
        dispatch(initArticlesPage());
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, []);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <br/>
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    onScrollToEnd={onLoadNextPart}
                />
            </div>
        </DynamicModuleLoader>
    )
};

export default ArticlesPage;
