import {typesArticleReducer} from "entities/Articles";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articlePageReducer} from "../../model/slices/ArticlePageSlice";
import {ArticlesPageFilters} from "../ArticlesPageFilters/ArticlesPageFilters";
import {ArticleInfiniteList} from "../ArticleInfiniteList/ArticleInfiniteList";

const reducers: ReducersList = {
    articlesPage: articlePageReducer,
    typesArticle: typesArticleReducer,
};

const ArticlesPage = () => {
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div>
                <ArticlesPageFilters />
                <ArticleInfiniteList />
            </div>
        </DynamicModuleLoader>
    )
};

export default ArticlesPage;
